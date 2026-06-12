const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const out = path.join(root, 'build');

function copyEntry(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const name of fs.readdirSync(src)) {
      copyEntry(path.join(src, name), path.join(dest, name));
    }
    return;
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

if (fs.existsSync(out)) {
  fs.rmSync(out, { recursive: true, force: true });
}
fs.mkdirSync(out, { recursive: true });

copyEntry(path.join(root, 'index.html'), path.join(out, 'index.html'));

for (const dir of ['images', 'docx_images']) {
  const src = path.join(root, dir);
  if (fs.existsSync(src)) {
    copyEntry(src, path.join(out, dir));
  }
}

console.log('Static build complete -> build/');
