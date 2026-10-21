import fs from 'node:fs';
import path from 'node:path';

const tools = 'Z:\\DSH\\Portfolio\\_tools';
fs.mkdirSync(tools, { recursive: true });
const meta = await (await fetch('https://pypi.org/pypi/imageio-ffmpeg/json')).json();
const wheel = meta.urls.find((x) => x.packagetype === 'bdist_wheel' && x.filename.includes('win_amd64'));
if (!wheel) throw new Error('No Windows wheel found');
const dest = path.join(tools, wheel.filename);
if (!fs.existsSync(dest)) {
  console.log('downloading', wheel.filename, (wheel.size / 1024 / 1024).toFixed(1), 'MB');
  const res = await fetch(wheel.url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buf);
  console.log('downloaded', (buf.length / 1024 / 1024).toFixed(1), 'MB');
} else {
  console.log('already downloaded');
}
