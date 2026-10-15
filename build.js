const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ENTRIES = [
  { src: 'index.html', out: 'build/index.prod.html' },
  { src: '7-minute-timer.html', out: 'build/7-minute-timer.prod.html' }
];

fs.mkdirSync(path.join(__dirname, 'build'), { recursive: true });

const kb = (n) => (n / 1024).toFixed(1) + ' KB';

ENTRIES.forEach(({ src, out }) => {
  const input = fs.readFileSync(path.join(__dirname, src), 'utf8');
  const styleMatch = input.match(/<style>([\s\S]*?)<\/style>/);
  if (!styleMatch) { throw new Error('no <style> block in ' + src); }

  const inputPath = path.join(__dirname, 'build-input.css');
  const outPath = path.join(__dirname, 'build-out.css');
  fs.writeFileSync(inputPath, '@tailwind base;\n@tailwind components;\n@tailwind utilities;\n' + styleMatch[1]);

  execFileSync(path.join(__dirname, 'node_modules/.bin/tailwindcss'), [
    '-c', path.join(__dirname, 'tailwind.config.js'),
    '-i', inputPath,
    '-o', outPath,
    '--minify'
  ], { stdio: ['ignore', 'ignore', 'ignore'] });

  let css = fs.readFileSync(outPath, 'utf8').replace(/sourceMappingURL=.*$/gm, '').trim();

  const html = input
    .replace(/<script src="https:\/\/cdn\.tailwindcss\.com"><\/script>\s*/i, '')
    .replace(/<script>\s*tailwind\.config[\s\S]*?<\/script>\s*/i, '')
    .replace(/<style>[\s\S]*?<\/style>/, '<style>' + css + '</style>');

  fs.writeFileSync(path.join(__dirname, out), html);
  fs.unlinkSync(inputPath);
  fs.unlinkSync(outPath);

  console.log(
    src.padEnd(22) + '-> ' + out.padEnd(34) +
    kb(input.length) + ' -> ' + kb(html.length) +
    '  (css ' + kb(css.length) + ')' +
    '  cdn removed: ' + !/cdn\.tailwindcss\.com/.test(html)
  );
});
