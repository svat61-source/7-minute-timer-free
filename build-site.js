const fs = require('fs');
const path = require('path');

const SITE = 'https://example.com';
const SITE_DIR = path.join(__dirname, 'site');
const PAGES_DIR = path.join(__dirname, 'pages');

fs.rmSync(SITE_DIR, { recursive: true, force: true });
fs.mkdirSync(SITE_DIR, { recursive: true });

fs.copyFileSync(path.join(__dirname, 'build/index.prod.html'), path.join(SITE_DIR, 'index.html'));

const sevenDir = path.join(SITE_DIR, '7-minute-timer');
fs.mkdirSync(sevenDir, { recursive: true });
fs.copyFileSync(path.join(__dirname, 'build/7-minute-timer.prod.html'), path.join(sevenDir, 'index.html'));

const slugs = fs.readdirSync(PAGES_DIR).filter(f => f.endsWith('.html')).map(f => f.replace(/\.html$/, ''));
slugs.forEach(slug => {
  const dir = path.join(SITE_DIR, slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.copyFileSync(path.join(PAGES_DIR, slug + '.html'), path.join(dir, 'index.html'));
});

const today = '2026-01-15';
const urls = [
  { loc: SITE + '/', priority: '1.0', freq: 'weekly' },
  { loc: SITE + '/7-minute-timer/', priority: '0.9', freq: 'weekly' },
  ...slugs.map(s => ({ loc: SITE + '/' + s + '/', priority: '0.8', freq: 'monthly' }))
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.freq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(SITE_DIR, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(SITE_DIR, 'robots.txt'), `User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml
`);

let count = 0;
(function walk(dir) {
  fs.readdirSync(dir).forEach(f => {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) { walk(p); }
    else { count++; }
  });
})(SITE_DIR);

console.log('site/ assembled: ' + count + ' files, ' + urls.length + ' URLs in sitemap');
urls.forEach(u => console.log('  ' + u.priority + '  ' + u.loc));
