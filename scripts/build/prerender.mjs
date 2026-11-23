import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { missingShots } from './shots.mjs';

const root = process.cwd();
const { languages, render, meta } = await import(pathToFileURL(join(root, 'dist-ssr', 'entry-server.js')).href);

const stylesheet = /<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/;
const rootElement = '<div id="root"></div>';
const escapeText = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const escapeAttr = (s) => escapeText(s).replace(/"/g, '&quot;');

for (const lang of languages) {
  const file = join(root, 'dist', lang === 'en' ? 'index.html' : `${lang}/index.html`);
  const { title, description } = meta(lang);
  const template = readFileSync(file, 'utf8');
  if (!template.includes(rootElement)) throw new Error(`${lang}: missing empty React root in ${file}`);
  const html = template
    .replace(stylesheet, (_, href) => `<style>${readFileSync(join(root, 'dist', href.replace(/^\/my-voice-info\//, '')), 'utf8')}</style>`)
    .replace(rootElement, () => `<div id="root">${render(lang)}</div>`)
    .replace('<title></title>', () => `<title>${escapeText(title)}</title>`)
    .replace('<meta name="description" content="">', () => `<meta name="description" content="${escapeAttr(description)}">`);
  const missing = missingShots(html, join(root, 'dist'));
  if (missing.length) throw new Error(`${lang}: the page uses screenshots that are not in dist: ${missing.join(', ')}`);
  writeFileSync(file, html);
}
