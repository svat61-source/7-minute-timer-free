const fs = require('fs');
const { JSDOM, VirtualConsole } = require('jsdom');

const FILE = process.argv[2] || __dirname + '/index.html';
const html = fs.readFileSync(FILE, 'utf8');

function boot(hash) {
  const vc = new VirtualConsole();
  const errors = [];
  vc.on('jsdomError', e => {
    if (!/tailwind is not defined/.test(e.message)) { errors.push(e.message); }
  });
  const dom = new JSDOM(html, {
    url: 'https://example.com/' + (hash || ''),
    runScripts: 'dangerously',
    pretendToBeVisual: true,
    virtualConsole: vc
  });
  const w = dom.window;
  w.AudioContext = undefined;
  w.requestAnimationFrame = () => 0;
  w.cancelAnimationFrame = () => {};
  return new Promise(resolve => {
    if (w.document.readyState === 'complete') { setTimeout(() => resolve({ w, errors }), 30); }
    else { w.addEventListener('load', () => setTimeout(() => resolve({ w, errors }), 30)); }
  });
}

let pass = 0, fail = 0;
function t(name, got, want) {
  const ok = String(got) === String(want);
  if (ok) { pass++; console.log('  ok   ' + name + '  -> ' + got); }
  else { fail++; console.log('  FAIL ' + name + '  got "' + got + '" want "' + want + '"'); }
}

const ALPHA = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
function checksum(body) {
  let h = 2166136261;
  for (let i = 0; i < body.length; i++) { h ^= body.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; }
  let out = '';
  for (let j = 0; j < 4; j++) out += ALPHA.charAt((h >>> (j * 5)) & 31);
  return out;
}
const BODY = 'ABCD1234EFGH';
const GOOD_KEY = BODY.slice(0,4) + '-' + BODY.slice(4,8) + '-' + BODY.slice(8,12) + '-' + checksum(BODY);

(async () => {
  console.log('\nFILE: ' + FILE);

  console.log('\n[1] hash routing on load');
  for (const [h, want] of [['#7m','07:00'],['#90s','01:30'],['#1h30m','1:30:00'],['#25','25:00'],['#5:00','05:00'],['#12h','12:00:00'],['#1m30s','01:30'],['','05:00'],['#banana','05:00'],['#0s','05:00']]) {
    const { w } = await boot(h);
    t((h || '(none)').padEnd(10), w.document.getElementById('clock').textContent, want);
  }

  console.log('\n[2] presets');
  {
    const { w } = await boot('#7m');
    const chips = [...w.document.querySelectorAll('#presets .chip')].map(c => c.textContent);
    t('8 chips', chips.length, 8);
    t('sequence', chips.join('|'), '1 Min|3 Min|5 Min|7 Min|10 Min|15 Min|25 Min|45 Min');
    const pressed = [...w.document.querySelectorAll('#presets .chip[aria-pressed="true"]')].map(c => c.textContent);
    t('7m chip active', pressed.join(), '7 Min');
  }

  console.log('\n[3] ring + layout');
  {
    const { w } = await boot('#7m');
    const ring = w.document.getElementById('ring');
    t('dasharray = 2pi r', Number(ring.style.strokeDasharray).toFixed(1), (2*Math.PI*146).toFixed(1));
    t('offset 0 at full', Number(ring.style.strokeDashoffset), 0);
    t('3 ad slots', w.document.querySelectorAll('.ad-slot').length, 3);
    t('2 rails', w.document.querySelectorAll('.rail').length, 2);
    t('3 lock veils', w.document.querySelectorAll('.lock-veil').length, 3);
    t('tracker 0', w.document.getElementById('trackerCount').textContent, '0');
    t('sponsor card', !!w.document.getElementById('sponsorCard'), 'true');
    t('history panel', !!w.document.getElementById('historyPanel'), 'true');
    t('consent banner', !!w.document.getElementById('consent'), 'true');
  }

  console.log('\n[4] monetization is inert until configured');
  {
    const { w } = await boot('#5m');
    t('no ins injected', w.document.querySelectorAll('.ad-slot ins.adsbygoogle').length, 0);
    t('no slot marked live', w.document.querySelectorAll('.ad-slot.is-live').length, 0);
    t('no adsbygoogle script tag', w.document.querySelectorAll('script[src*="googlesyndication"]').length, 0);
    t('ads never load before consent', w.document.querySelectorAll('script[src*="googlesyndication"]').length, 0);
  }

  console.log('\n[5] premium license');
  {
    const { w } = await boot('#5m');
    t('4 swatches', w.document.querySelectorAll('#swatches .swatch').length, 4);
    t('3 locked free', w.document.querySelectorAll('#swatches .swatch.locked').length, 3);

    let alerted = null;
    w.alert = m => { alerted = m; };
    w.prompt = () => GOOD_KEY;
    w.document.getElementById('btnPremium').click();
    t('valid key -> pro', w.document.body.classList.contains('premium'), 'true');
    t('label switched', w.document.getElementById('premiumLabel').textContent, 'Pro active');
    t('success alert', /activated/i.test(alerted || ''), 'true');
    t('themes unlocked', w.document.querySelectorAll('#swatches .swatch.locked').length, 0);
  }
  {
    const { w } = await boot('#5m');
    w.alert = () => {};
    w.prompt = () => 'AAAA-BBBB-CCCC-ZZZZ';
    w.document.getElementById('btnPremium').click();
    t('bad checksum rejected', w.document.body.classList.contains('premium'), 'false');
    w.prompt = () => 'SHORT';
    w.document.getElementById('btnPremium').click();
    t('malformed rejected', w.document.body.classList.contains('premium'), 'false');
    t('still free', w.document.getElementById('premiumLabel').textContent, 'Remove ads');
  }
  {
    const { w } = await boot('#5m');
    w.alert = () => {};
    w.prompt = () => GOOD_KEY.replace(/-/g, '').toLowerCase();
    w.document.getElementById('btnPremium').click();
    t('unformatted key normalized', w.document.body.classList.contains('premium'), 'true');
  }

  console.log('\n[6] themes');
  {
    const { w } = await boot('#5m');
    const root = w.document.documentElement;
    t('default accent a', root.style.getPropertyValue('--accent-a'), '#22d3ee');
    w.document.querySelectorAll('#swatches .swatch')[1].click();
    t('locked click ignored', root.style.getPropertyValue('--accent-a'), '#22d3ee');
    w.document.getElementById('btnPremium').click.call;
    w.alert = () => {};
    w.prompt = () => GOOD_KEY;
    w.document.getElementById('btnPremium').click();
    w.document.querySelectorAll('#swatches .swatch')[1].click();
    t('unlocked click applies', root.style.getPropertyValue('--accent-a'), '#fb923c');
    t('stop A synced', w.document.getElementById('stopA').getAttribute('stop-color'), '#fb923c');
    t('aria pressed set', w.document.querySelectorAll('#swatches .swatch[aria-pressed="true"]').length, 1);
  }

  console.log('\n[7] distraction-free toggles');
  {
    const { w } = await boot('#5m');
    w.document.getElementById('btnZen').click();
    t('zen on', w.document.body.classList.contains('zen'), 'true');
    t('aria pressed', w.document.getElementById('btnZen').getAttribute('aria-pressed'), 'true');
    t('label flips', w.document.getElementById('zenLabel').textContent, 'Exit focus mode');
    w.document.getElementById('btnZen').click();
    t('zen off', w.document.body.classList.contains('zen'), 'false');
  }

  console.log('\n[8] runtime errors');
  {
    const { w, errors } = await boot('#25m');
    t('no js errors', errors.length, 0);
    if (errors.length) console.log(errors.slice(0,3).join('\n'));
  }

  console.log('\n' + pass + ' passed, ' + fail + ' failed\n');
  process.exit(fail ? 1 : 0);
})();
