import { existsSync } from 'node:fs';
import { join } from 'node:path';

export function missingShots(html, dist) {
  const referenced = new Set(html.match(/shots\/[^\s,"']+\.webp/g) ?? []);
  return [...referenced].filter((file) => !existsSync(join(dist, file)));
}
