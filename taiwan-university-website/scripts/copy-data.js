import { copyFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const src = resolve(__dirname, '../../taiwan-university-db/data/final');
const dest = resolve(__dirname, '../src/data');

mkdirSync(dest, { recursive: true });

const files = ['schools.json', 'departments.json', 'department-groups.json'];
for (const f of files) {
  copyFileSync(resolve(src, f), resolve(dest, f));
  console.log(`Copied ${f}`);
}
