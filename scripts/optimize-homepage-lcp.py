#!/usr/bin/env python3
"""Self-host and preload the AccurateREAppraisals.com homepage LCP image."""

from __future__ import annotations

import shutil
import sys
import urllib.request
from pathlib import Path

REMOTE_IMAGE = (
    "https://commons.wikimedia.org/wiki/Special:FilePath/"
    "New_housing_development%2C_Clay%2C_NY.jpg"
)
LOCAL_WEB_PATH = "/assets/images/central-new-york-homes.jpg"
LOCAL_SOCIAL_URL = (
    "https://accuratereappraisals.com/assets/images/central-new-york-homes.jpg"
)
LOCAL_FILE = Path("assets/images/central-new-york-homes.jpg")
CSS_FILE = Path("assets/style.css")
INDEX_FILE = Path("index.html")
PRECONNECT = '<link href="https://commons.wikimedia.org" rel="preconnect"/>'
PRELOAD = (
    '<link as="image" fetchpriority="high" '
    'href="/assets/images/central-new-york-homes.jpg" '
    'rel="preload" type="image/jpeg"/>'
)
STYLESHEET = '<link href="assets/style.css" rel="stylesheet"/>'


def download_image() -> None:
    """Download the public-domain source image only when the local copy is absent."""
    if LOCAL_FILE.is_file() and LOCAL_FILE.stat().st_size >= 10_000:
        print(f"Using existing local hero image: {LOCAL_FILE}")
        return

    LOCAL_FILE.parent.mkdir(parents=True, exist_ok=True)
    request = urllib.request.Request(
        REMOTE_IMAGE,
        headers={"User-Agent": "AccurateREAppraisals.com performance optimizer"},
    )
    temporary = LOCAL_FILE.with_suffix(".download")

    try:
        with urllib.request.urlopen(request, timeout=45) as response, temporary.open(
            "wb"
        ) as output:
            if response.status != 200:
                raise RuntimeError(f"Unexpected HTTP status: {response.status}")
            shutil.copyfileobj(response, output)

        size = temporary.stat().st_size
        if size < 10_000 or size > 2_000_000:
            raise RuntimeError(f"Unexpected downloaded image size: {size} bytes")

        with temporary.open("rb") as image_file:
            if image_file.read(2) != b"\xff\xd8":
                raise RuntimeError("Downloaded file is not a JPEG")

        temporary.replace(LOCAL_FILE)
        print(f"Downloaded local hero image: {LOCAL_FILE} ({size} bytes)")
    finally:
        temporary.unlink(missing_ok=True)


def patch_css() -> None:
    css = CSS_FILE.read_text(encoding="utf-8")
    css = css.replace(REMOTE_IMAGE, LOCAL_WEB_PATH)

    if LOCAL_WEB_PATH not in css:
        raise RuntimeError("Could not install the local hero image in assets/style.css")
    if REMOTE_IMAGE in css:
        raise RuntimeError("The remote homepage hero image remains in assets/style.css")

    CSS_FILE.write_text(css, encoding="utf-8")


def patch_homepage() -> None:
    html = INDEX_FILE.read_text(encoding="utf-8")

    html = html.replace(
        f'<meta content="{REMOTE_IMAGE}" property="og:image"/>',
        f'<meta content="{LOCAL_SOCIAL_URL}" property="og:image"/>',
    )
    html = html.replace(REMOTE_IMAGE, LOCAL_WEB_PATH)
    html = html.replace(PRECONNECT + "\n", "")
    html = html.replace(PRECONNECT, "")

    if PRELOAD not in html:
        if STYLESHEET not in html:
            raise RuntimeError("Could not find the homepage stylesheet link")
        html = html.replace(STYLESHEET, PRELOAD + "\n" + STYLESHEET, 1)

    if LOCAL_SOCIAL_URL not in html:
        raise RuntimeError("The local Open Graph image was not installed")
    if html.count(PRELOAD) != 1:
        raise RuntimeError("The homepage hero preload is missing or duplicated")
    if REMOTE_IMAGE in html:
        raise RuntimeError("The remote homepage hero image remains in index.html")

    INDEX_FILE.write_text(html, encoding="utf-8")


def validate() -> None:
    if not LOCAL_FILE.is_file() or LOCAL_FILE.stat().st_size < 10_000:
        raise RuntimeError("The local hero image is missing or unexpectedly small")

    css = CSS_FILE.read_text(encoding="utf-8")
    html = INDEX_FILE.read_text(encoding="utf-8")

    checks = {
        "local CSS hero": LOCAL_WEB_PATH in css,
        "high-priority preload": PRELOAD in html,
        "local social image": LOCAL_SOCIAL_URL in html,
        "no remote LCP image in CSS": REMOTE_IMAGE not in css,
        "no remote LCP image in homepage": REMOTE_IMAGE not in html,
    }
    failed = [name for name, passed in checks.items() if not passed]
    if failed:
        raise RuntimeError("Performance validation failed: " + ", ".join(failed))

    print("Homepage LCP image is local, preloaded, and validated.")


def main() -> int:
    try:
        download_image()
        patch_css()
        patch_homepage()
        validate()
    except Exception as exc:  # noqa: BLE001 - fail the workflow with useful context
        print(f"ERROR: {exc}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
