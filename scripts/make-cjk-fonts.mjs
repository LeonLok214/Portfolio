import fs from 'node:fs';
import path from 'node:path';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(p);
    return /\.(jsx?|html)$/.test(entry.name) ? [p] : [];
  });
}

const files = ['index.html', ...walk('src')];
const text = files.map((file) => fs.readFileSync(file, 'utf8')).join('\n');
const chars = [...new Set([...text].filter((char) => /[\u3000-\u303f\u3400-\u9fff\uff00-\uffef]/.test(char)))].join('');
console.log('Chinese glyphs:', [...chars].length);

const encoded = encodeURIComponent(chars);
const css = await (await fetch(
  `https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;600&family=Noto+Serif+SC:wght@400&display=swap&text=${encoded}`,
  { headers: { 'User-Agent': UA } }
)).text();

const blocks = [...css.matchAll(/@font-face\s*\{([^}]+)\}/g)];
console.log('font faces:', blocks.length);

for (const [, body] of blocks) {
  const family = body.match(/font-family:\s*'([^']+)'/)?.[1];
  const weight = body.match(/font-weight:\s*([^;]+);/)?.[1]?.trim();
  const style = body.match(/font-style:\s*([^;]+);/)?.[1]?.trim() || 'normal';
  const url = body.match(/src:\s*url\(([^)]+)\)/)?.[1];
  if (!family || !weight || !url) continue;
  const slug = family.toLowerCase().replace(/\s+/g, '-');
  const filename = `${slug}-${weight}-${style}.woff2`;
  const dest = path.join('public/fonts', filename);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${filename}: ${res.status}`);
  fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
  console.log(filename, fs.statSync(dest).size, 'bytes');
}
