/**
 * CloudFront Track C serves /404.html. Angular static prerender emits 404/index.html.
 */
import { copyFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const from = join(root, 'dist', '404', 'index.html');
const to = join(root, 'dist', '404.html');

if (!existsSync(from)) {
  throw new Error(`Missing prerendered 404 page at ${from}`);
}

copyFileSync(from, to);
