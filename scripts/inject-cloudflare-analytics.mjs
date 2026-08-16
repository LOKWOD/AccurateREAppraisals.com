import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const token = '7c5ee0b897fd496f8fd769829e77020c';
const marker = 'Cloudflare Web Analytics';
const beacon = `<!-- ${marker} --><script type='module' src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "${token}"}'></script><!-- End ${marker} -->`;

function walk(dir) {
  for (const name of readdirSync(dir)) {
    if (name === '.git' || name === 'node_modules') continue;
    const path = join(dir, name);
    const stat = statSync(path);
    if (stat.isDirectory()) walk(path);
    else if (name.endsWith('.html')) inject(path);
  }
}

function inject(path) {
  let html = readFileSync(path, 'utf8');
  if (html.includes(marker)) return;
  if (!html.includes('</body>')) throw new Error(`Missing </body> in ${path}`);
  html = html.replace('</body>', `${beacon}</body>`);
  writeFileSync(path, html);
  console.log(`Injected analytics: ${path}`);
}

walk(process.cwd());
