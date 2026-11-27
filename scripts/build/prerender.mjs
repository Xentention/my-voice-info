import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { missingShots } from './shots.mjs';

const root = process.cwd();
const { pages, render } = await import(pathToFileURL(join(root, 'dist-ssr', 'entry-server.js')).href);

const stylesheet = /<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/;
const rootElement = '<div id="root"></div>';
const escapeText = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const escapeAttr = (s) => escapeText(s).replace(/"/g, '&quot;');

for (const page of pages) {
  const { path, title, description } = page;
  const file = join(root, 'dist', path, 'index.html');
  const template = readFileSync(file, 'utf8');
  if (!template.includes(rootElement)) throw new Error(`Missing empty React root in ${file}`);
  const html = template
    .replace(stylesheet, (_, href) => `<style>${readFileSync(join(root, 'dist', href.replace(/^\/my-voice-info\//, '')), 'utf8')}</style>`)
    .replace(rootElement, () => `<div id="root">${render(page)}</div>`)
    .replace('<title></title>', () => `<title>${escapeText(title)}</title>`)
    .replace('<meta name="description" content="">', () => `<meta name="description" content="${escapeAttr(description)}">`);
  const missing = missingShots(html, join(root, 'dist'));
  if (missing.length) throw new Error(`${file} uses screenshots that are not in dist: ${missing.join(', ')}`);
  writeFileSync(file, html);
}
