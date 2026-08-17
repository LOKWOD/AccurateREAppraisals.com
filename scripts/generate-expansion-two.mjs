import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { pagesA } from "./expansion-two-pages-a.mjs";
import { pagesB } from "./expansion-two-pages-b.mjs";

const root = process.cwd();
const siteUrl = "https://accuratereappraisals.com";
const updated = "2026-08-17";
const pages = [...pagesA, ...pagesB];
const analytics = `<!-- Cloudflare Web Analytics --><script type='module' src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "7c5ee0b897fd496f8fd769829e77020c"}'></script><!-- End Cloudflare Web Analytics -->`;
const esc = (value) => String(value).replace(/[&<>\"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[char]));

function render(page) {
  const canonical = `${siteUrl}/guides/${page.slug}`;
  const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: page.title, description: page.description, url: canonical, dateModified: updated, author: { "@type": "Organization", name: "Accurate Real Estate Appraisals" }, publisher: { "@type": "Organization", name: "Accurate Real Estate Appraisals" } };
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: page.faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) };
  const sections = page.sections.map(([heading, paragraphs]) => `<h2>${esc(heading)}</h2>${paragraphs.map((p) => `<p>${esc(p)}</p>`).join("")}`).join("");
  const checklist = page.checklist.map((item) => `<li>${esc(item)}</li>`).join("");
  const faq = page.faq.map(([q, a]) => `<details class="faq-item"><summary>${esc(q)}</summary><div><p>${esc(a)}</p></div></details>`).join("");
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(page.title)} | Accurate Real Estate Appraisals</title><meta name="description" content="${esc(page.description)}"><link rel="canonical" href="${canonical}"><meta name="theme-color" content="#0a2342"><meta property="og:type" content="article"><meta property="og:site_name" content="Accurate Real Estate Appraisals"><meta property="og:title" content="${esc(page.title)}"><meta property="og:description" content="${esc(page.description)}"><meta property="og:url" content="${canonical}"><meta name="twitter:card" content="summary"><link rel="icon" href="../assets/logo-mark.svg" type="image/svg+xml"><link rel="stylesheet" href="../assets/style.css"><script type="application/ld+json">${JSON.stringify(articleSchema)}</script><script type="application/ld+json">${JSON.stringify(faqSchema)}</script></head><body><a class="skip-link" href="#main">Skip to main content</a><div class="topbar"><div class="wrap topbar-inner"><div class="topbar-contact"><a href="tel:+13154135024">315-413-5024</a><span>•</span><a href="mailto:info@accuratereappraisals.org">info@accuratereappraisals.org</a></div><div class="topbar-area">Serving Central New York</div></div></div><header class="site-header"><div class="wrap nav"><a class="brand" href="../index.html"><span class="brand-fallback"><strong>ACCURATE</strong><span> Real Estate Appraisals</span><small>a division of ARE Appraisals, Inc.</small></span></a><nav class="primary-nav" aria-label="Primary navigation"><a href="../index.html">Home</a><a href="../services/">Services</a><a href="../areas/">Counties</a><a aria-current="page" href="../guides/">Guides</a><a href="../resources.html">Resources</a><a href="../about.html">About</a></nav><a class="request-button" href="../request-appraisal.html">Request an Appraisal</a></div></header><main id="main"><section class="page-hero"><div class="wrap"><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="../index.html">Home</a><span>/</span><a href="index.html">Guides</a><span>/</span><span>${esc(page.title)}</span></nav><p class="eyebrow">${esc(page.eyebrow)}</p><h1>${esc(page.title)}</h1><p class="lead">${esc(page.lead)}</p></div></section><section class="section"><div class="wrap content-grid"><article class="article"><p><strong>Updated August 17, 2026.</strong> Educational information only; not legal, tax, lending, engineering or accounting advice.</p>${sections}<h2>Assignment planning checklist</h2><ul class="check-list">${checklist}</ul><section class="faq-block"><h2>Frequently asked questions</h2><div class="faq-list">${faq}</div></section><div class="callout"><strong>Need a property-specific scope?</strong><p>Send the address, intended use, effective date and material property characteristics before scheduling.</p><a class="btn" href="../request-appraisal.html">Request an Appraisal</a></div></article><aside class="sidebar"><div class="card"><p class="mini">GUIDE LIBRARY</p><h3>Continue reading</h3><a class="text-link" href="index.html">All appraisal guides</a><a class="text-link" href="effective-date-guide.html">Effective dates</a><a class="text-link" href="rural-waterfront-guide.html">Rural and waterfront</a></div><div class="card"><h3>Need a report?</h3><a class="text-link" href="../services/">Appraisal services</a><a class="text-link" href="../request-appraisal.html">Start a request</a></div></aside></div></section></main><footer><div class="wrap footer-grid"><div class="footer-brand"><strong>Accurate Real Estate Appraisals</strong><p>a division of ARE Appraisals, Inc.</p><p>Independent residential valuation throughout Central New York.</p></div><div><strong>Contact</strong><p><a href="tel:+13154135024">315-413-5024</a><br><a href="mailto:info@accuratereappraisals.org">info@accuratereappraisals.org</a></p></div><div><strong>Explore</strong><div class="footer-links"><a href="../services/">Services</a><a href="../areas/">Counties</a><a href="../guides/">Guides</a><a href="../resources.html">Resources</a></div></div><div><strong>Syracuse</strong><p><a href="https://syracuseappraiser.com">SyracuseAppraiser.com</a></p></div></div><div class="wrap footer-bottom"><span>© 2026 Accurate Real Estate Appraisals / ARE Appraisals, Inc.</span><span>Residential real estate appraisal services • Central New York</span></div></footer>${analytics}</body></html>`;
}

function upsert(path, marker, block) {
  const full = join(root, path);
  let html = readFileSync(full, "utf8");
  const start = `<!-- ${marker} START -->`;
  const end = `<!-- ${marker} END -->`;
  const wrapped = `${start}${block}${end}`;
  const pattern = new RegExp(`${start.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${end.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`);
  html = pattern.test(html) ? html.replace(pattern, wrapped) : html.replace("</main>", `${wrapped}</main>`);
  writeFileSync(full, html);
}

for (const page of pages) {
  const full = join(root, "guides", page.slug);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, render(page));
}
const cards = pages.map((page) => `<a class="related-card" href="${page.slug}"><span class="mini">Professional guide</span><strong>${esc(page.title)}</strong><span>${esc(page.description)}</span></a>`).join("");
upsert("guides/index.html", "ACCURATE EXPANSION TWO", `<section class="section alt"><div class="wrap"><p class="eyebrow">ADVANCED VALUATION GUIDES</p><h2>Ten complete resources for legal, financial and complex-property decisions</h2><p class="section-intro">Independent guidance for litigation, bankruptcy, historical dates, trusts, private lending, small income property and difficult residential assignments.</p><div class="grid three">${cards}</div><div class="callout"><strong>Need an assignment reviewed before ordering?</strong><p>Describe the property, decision, users and required date.</p><a class="btn" href="../request-appraisal.html">Request an Appraisal</a></div></div></section>`);
const sitemapPath = join(root, "sitemap.xml");
let sitemap = readFileSync(sitemapPath, "utf8");
for (const page of pages) {
  const loc = `${siteUrl}/guides/${page.slug}`;
  const escaped = loc.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  sitemap = sitemap.replace(new RegExp(`<url>\\s*<loc>${escaped}<\\/loc>[\\s\\S]*?<\\/url>\\s*`, "g"), "");
}
sitemap = sitemap.replace("</urlset>", `${pages.map((page) => `<url><loc>${siteUrl}/guides/${page.slug}</loc><lastmod>${updated}</lastmod><changefreq>monthly</changefreq><priority>0.79</priority></url>`).join("")}</urlset>`);
writeFileSync(sitemapPath, sitemap);
console.log(`Generated ${pages.length} additional Accurate appraisal guides.`);
