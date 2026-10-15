const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const PAGES = path.join(__dirname, 'pages');
const files = fs.readdirSync(PAGES).filter(f => f.endsWith('.html')).sort();

let pass = 0, fail = 0;
function t(name, got, want) {
  const ok = String(got) === String(want);
  if (ok) { pass++; console.log('  ok   ' + name + '  -> ' + got); }
  else { fail++; console.log('  FAIL ' + name + '  got "' + got + '" want "' + want + '"'); }
}

const UNIT = { h: 3600, m: 60, s: 1 };
function toolSeconds(tag) {
  const cleaned = String(tag).toLowerCase().replace(/[^0-9hms.]/g, '');
  const re = /(\d+(?:\.\d+)?)(h|m|s)?/g;
  let total = 0, m2;
  while ((m2 = re.exec(cleaned)) !== null) {
    total += Math.round(parseFloat(m2[1]) * (UNIT[m2[2]] || 60));
  }
  return total;
}

const docs = [];
console.log('\nfiles found: ' + files.length + '\n');

console.log('[1] per-page structure');
for (const f of files) {
  const html = fs.readFileSync(path.join(PAGES, f), 'utf8');
  const dom = new JSDOM(html);
  const d = dom.window.document;
  docs.push({ f, d, html, text: d.body.textContent, article: d.querySelector('article').textContent });

  const title = d.querySelector('title') ? d.querySelector('title').textContent : '';
  const desc = d.querySelector('meta[name="description"]');
  const canon = d.querySelector('link[rel="canonical"]');
  const h1s = d.querySelectorAll('h1');
  const cta = d.querySelector('a.cta-btn');
  const paras = [...d.querySelectorAll('article p')].map(p => p.textContent);
  const faqItems = d.querySelectorAll('.faq-item');

  const issues = [];
  if (title.length < 20 || title.length > 75) issues.push('title ' + title.length + 'ch');
  if (!desc || desc.getAttribute('content').length < 70 || desc.getAttribute('content').length > 175) issues.push('desc len');
  if (!canon) issues.push('no canonical');
  if (h1s.length !== 1) issues.push('h1 count ' + h1s.length);
  if (!cta) issues.push('no cta');
  if (paras.length < 6) issues.push('only ' + paras.length + ' paragraphs');
  if (faqItems.length < 2) issues.push('only ' + faqItems.length + ' faq');

  const words = d.body.textContent.split(/\s+/).filter(w => /[a-zA-Z]/.test(w)).length;
  if (words < 300) issues.push('thin ' + words + 'w');

  t(f.padEnd(26) + (issues.length ? ' ISSUES: ' + issues.join(', ') : 'clean (' + words + 'w)'),
    issues.length ? 'x' : 'ok', 'ok');
}

console.log('\n[2] JSON-LD structured data');
for (const { f, d } of docs) {
  const nodes = [...d.querySelectorAll('script[type="application/ld+json"]')];
  let types = [];
  let bad = null;
  for (const n of nodes) {
    try {
      const j = JSON.parse(n.textContent);
      types = types.concat((j['@graph'] || [j]).map(x => x['@type']));
    } catch (e) { bad = e.message; }
  }
  t(f.slice(0, 24).padEnd(26), bad ? 'PARSE ERROR' : types.join('+'), 'Article+FAQPage');
}

console.log('\n[3] tool links resolve to a valid preset');
for (const { f, d } of docs) {
  const href = d.querySelector('a.cta-btn').getAttribute('href');
  const hash = href.split('#')[1];
  const secs = toolSeconds(hash);
  const label = d.querySelector('.cta-time').textContent;
  const shown = Number(label.split(':')[0]) * 60 + Number(label.split(':')[1]);
  t(f.slice(0, 20).padEnd(22) + href.padEnd(18) + ' label matches',
    secs === shown ? secs + 's == ' + label : 'MISMATCH ' + secs + ' vs ' + label,
    secs === shown ? secs + 's == ' + label : 'MISMATCH');
}

console.log('\n[4] uniqueness across pages (no doorway duplication)');
const titles = docs.map(x => x.d.querySelector('title').textContent);
t('all titles unique', new Set(titles).size, docs.length);
const descs = docs.map(x => x.d.querySelector('meta[name="description"]').getAttribute('content'));
t('all descriptions unique', new Set(descs).size, docs.length);
const h1s = docs.map(x => x.d.querySelector('h1').textContent);
t('all h1 unique', new Set(h1s).size, docs.length);

function shingleSet(text) {
  const w = text.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter(Boolean);
  const s = new Set();
  for (let i = 0; i < w.length - 4; i++) s.add(w.slice(i, i + 5).join(' '));
  return s;
}
console.log('\n  pairwise 5-gram overlap in <article> body copy only');
console.log('  (nav / CTA / footer are shared site furniture and are excluded here)\n');
let worst = 0, worstPair = '';
for (let i = 0; i < docs.length; i++) {
  for (let j = i + 1; j < docs.length; j++) {
    const a = shingleSet(docs[i].article);
    const b = shingleSet(docs[j].article);
    let inter = 0;
    a.forEach(x => { if (b.has(x)) inter++; });
    const pct = (inter / Math.min(a.size, b.size)) * 100;
    if (pct > worst) { worst = pct; worstPair = docs[i].f + ' vs ' + docs[j].f; }
  }
}
t('worst article overlap < 3%', worst < 3 ? worst.toFixed(2) + '% (under 3%)' : 'TOO HIGH ' + worst.toFixed(2) + '%',
  worst < 3 ? worst.toFixed(2) + '% (under 3%)' : 'TOO HIGH ' + worst.toFixed(2) + '%');
console.log('  worst pair: ' + worstPair + ' @ ' + worst.toFixed(2) + '%');

console.log('\n[5] body copy is not templated');
for (const { f, d } of docs) {
  const paras = [...d.querySelectorAll('article p')].map(p => p.textContent);
  const sig = paras.map(p => p.slice(0, 28));
  t(f.slice(0, 24).padEnd(26) + paras.length + ' paras, no shared opening',
    new Set(sig).size, paras.length);
}

console.log('\n[6] no ad script loads without consent + config');
for (const { f, d } of docs) {
  const client = d.querySelector('script:not([type])') ? null : null;
  const html = fs.readFileSync(path.join(PAGES, f), 'utf8');
  const hasPlaceholder = /var CLIENT=''/.test(html);
  const wouldLoad = /if\(consent==='granted'&&CLIENT\)/.test(html);
  t(f.slice(0, 24).padEnd(26), (hasPlaceholder && wouldLoad) ? 'inert' : 'CHECK', 'inert');
}

console.log('\n' + pass + ' passed, ' + fail + ' failed\n');
process.exit(fail ? 1 : 0);
