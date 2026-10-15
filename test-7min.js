const fs = require('fs');
const { JSDOM, VirtualConsole } = require('jsdom');

const FILE = process.argv[2] || __dirname + '/7-minute-timer.html';
const html = fs.readFileSync(FILE, 'utf8');

function boot(hash) {
  const vc = new VirtualConsole();
  const errors = [];
  vc.on('jsdomError', e => {
    if (!/tailwind is not defined|Could not load/.test(e.message)) { errors.push(e.message); }
  });
  const dom = new JSDOM(html, {
    url: 'https://example.com/7-minute-timer/' + (hash || ''),
    runScripts: 'dangerously',
    pretendToBeVisual: true,
    virtualConsole: vc,
    beforeParse(window) {
      window.AudioContext = undefined;
      try { delete window.speechSynthesis; } catch (e) {}
      try { delete window.SpeechSynthesisUtterance; } catch (e) {}
    }
  });
  const w = dom.window;
  let frames = 0;
  w.requestAnimationFrame = () => { frames++; return 1; };
  w.cancelAnimationFrame = () => {};
  return new Promise(res => {
    const go = () => setTimeout(() => res({ w, errors, frames: () => frames }), 30);
    if (w.document.readyState === 'complete') { go(); } else { w.addEventListener('load', go); }
  });
}

let pass = 0, fail = 0;
function t(name, got, want) {
  const ok = String(got) === String(want);
  if (ok) { pass++; console.log('  ok   ' + name + '  -> ' + got); }
  else { fail++; console.log('  FAIL ' + name + '  got "' + got + '" want "' + want + '"'); }
}
function t2(name, cond, detail) {
  if (cond) { pass++; console.log('  ok   ' + name + '  -> ' + (detail !== undefined ? detail : 'true')); }
  else { fail++; console.log('  FAIL ' + name + '  -> ' + detail); }
}

const WORK = 30, REST = 10, ROUND_REST = 60;
const CIRCUIT = WORK * 12 + REST * 11;
const NAMES = [
  'Jumping jacks', 'Wall sit', 'Push-ups', 'Abdominal crunches', 'Step-ups', 'Squats',
  'Triceps dips', 'Plank', 'High knees', 'Lunges', 'Push-up and rotation', 'Side plank'
];

(async () => {
  console.log('\nFILE: ' + FILE);

  console.log('\n[1] workout content (this is the SEO asset)');
  {
    const { w, errors } = await boot('');
    const d = w.document;
    const items = [...d.querySelectorAll('#exList li.ex')];
    t('12 exercises', items.length, 12);
    const names = items.map(li => li.getAttribute('data-name'));
    t('names match the protocol', names.join('|') === NAMES.join('|'), 'true');
    const mods = items.filter(li => li.querySelector('.ex-mod'));
    t('all 12 have a modification', mods.length, 12);
    t('each has a description', items.filter(li => li.querySelector('p')).length, 12);
    t('no js errors', errors.length, 0);
  }

  console.log('\n[2] timing math is honest');
  t('circuit = 470s', CIRCUIT, 470);
  t('= 7m50s', Math.floor(CIRCUIT / 60) + 'm' + (CIRCUIT % 60) + 's', '7m50s');
  {
    const { w } = await boot('#workout');
    const plan = w.document.getElementById('clockSub').textContent;
    t2('default 2 circuits total = 2*470+60 = 1000s', /2 circuits \u00b7 16:40 left of 16:40/.test(plan), plan);
  }

  console.log('\n[3] mode switching');
  {
    const { w } = await boot('');
    t('default clock', w.document.getElementById('clock').textContent, '07:00');
    t('default mode simple', w.document.getElementById('modeSimple').getAttribute('aria-pressed'), 'true');
    t2('dots hidden in simple', w.document.getElementById('dots').hidden === true, 'hidden');
    t2('rounds hidden in simple', w.document.getElementById('roundsWrap').hidden === true, 'hidden');

    w.document.getElementById('modeWorkout').click();
    t('workout pressed', w.document.getElementById('modeWorkout').getAttribute('aria-pressed'), 'true');
    t2('dots shown in workout', w.document.getElementById('dots').hidden === false, 'shown');
    t('12 dots', w.document.querySelectorAll('#dots .dot').length, 12);
    t2('rounds shown', w.document.getElementById('roundsWrap').hidden === false, 'shown');
    t2('custom duration hidden', w.document.getElementById('customWrap').hidden === true, 'hidden');
    t('move name shows first', w.document.getElementById('moveName').textContent, 'Jumping jacks');
    t2('hash updated to workout', w.location.hash === '#workout', w.location.hash);
  }

  console.log('\n[4] hash routing');
  {
    t('#workout -> workout mode', (await boot('#workout')).w.document.getElementById('moveName').textContent, 'Jumping jacks');
    const a = await boot('#12m');
    t('#12m -> 12:00', a.w.document.getElementById('clock').textContent, '12:00');
    const b = await boot('#90s');
    t('#90s -> 01:30', b.w.document.getElementById('clock').textContent, '01:30');
    const c = await boot('#garbage');
    t('garbage -> 07:00 default', c.w.document.getElementById('clock').textContent, '07:00');
  }

  console.log('\n[5] circuit phase plan');
  {
    const { w } = await boot('#workout');
    // 3 circuits
    [...w.document.querySelectorAll('[data-rounds]')].find(b => b.getAttribute('data-rounds') === '3').click();
    const sub = w.document.getElementById('clockSub').textContent;
    t2('3 circuits total = 3*470 + 2*60 = 1530s', sub.indexOf('25:30 left of 25:30') > -1, sub);
  }
  {
    const { w } = await boot('#workout');
    [...w.document.querySelectorAll('[data-rounds]')].find(b => b.getAttribute('data-rounds') === '1').click();
    const sub = w.document.getElementById('clockSub').textContent;
    t2('1 circuit total = 7:50', sub.indexOf('7:50 left of 07:50') > -1, sub);
  }

  console.log('\n[6] controls');
  {
    const { w } = await boot('#7m');
    w.document.getElementById('btnStart').click();
    t2('body running class', w.document.body.classList.contains('running'), 'true');
    t('button -> Pause', w.document.getElementById('btnStart').textContent, 'Pause');
    t2('status label Focus', w.document.getElementById('stateLabel').textContent === 'Focus', 'Focus');
    t2('inputs disabled while running', w.document.getElementById('inMinutes').disabled === true, 'disabled');
    w.document.getElementById('btnStart').click();
    t('button -> Resume', w.document.getElementById('btnStart').textContent, 'Resume');
    t2('body no longer running', w.document.body.classList.contains('running') === false, 'false');
    w.document.getElementById('btnReset').click();
    t('reset -> Start', w.document.getElementById('btnStart').textContent, 'Start');
    t('reset restores 07:00', w.document.getElementById('clock').textContent, '07:00');
  }

  console.log('\n[7] presets + distraction-free');
  {
    const { w } = await boot('#7m');
    const chips = [...w.document.querySelectorAll('#presets .chip')].map(c => c.textContent);
    t('8 presets', chips.length, 8);
    t('7 Min present', chips.join('|'), '1 Min|3 Min|5 Min|7 Min|10 Min|15 Min|25 Min|45 Min');
    const active = [...w.document.querySelectorAll('#presets .chip[aria-pressed="true"]')].map(c => c.textContent);
    t('7 Min active', active.join(), '7 Min');
    w.document.getElementById('btnZen').click();
    t('zen on', w.document.body.classList.contains('zen'), 'true');
    t('zen label', w.document.getElementById('zenLabel').textContent, 'Exit focus mode');
  }

  console.log('\n[8] voice + warning toggles');
  {
    const { w } = await boot('#workout');
    const sw = w.document.getElementById('swVoice');
    t2('voice disabled gracefully when unsupported', sw.getAttribute('aria-checked') === 'false', sw.getAttribute('aria-checked'));
    t2('graceful note shown', /not supported/i.test(w.document.getElementById('voiceNote').textContent), w.document.getElementById('voiceNote').textContent);
    const warn = w.document.getElementById('swWarn');
    t('warn on by default', warn.getAttribute('aria-checked'), 'true');
    warn.click();
    t('warn toggles off', warn.getAttribute('aria-checked'), 'false');
  }

  console.log('\n[9] monetization inert');
  {
    const { w } = await boot('#7m');
    t('no ins injected', w.document.querySelectorAll('.ad-slot ins.adsbygoogle').length, 0);
    t('no adsense script', w.document.querySelectorAll('script[src*="googlesyndication"]').length, 0);
    t('4 ad slots', w.document.querySelectorAll('.ad-slot').length, 4);
    t('consent banner', !!w.document.getElementById('consent'), 'true');
    t('placeholder client only', /ca-pub-0000000000000000/.test(w.document.documentElement.innerHTML), 'true');
  }

  console.log('\n[10] structured data');
  {
    const { w } = await boot('');
    const nodes = [...w.document.querySelectorAll('script[type="application/ld+json"]')];
    let types = [], bad = null;
    for (const n of nodes) {
      try { const j = JSON.parse(n.textContent); types = types.concat((j['@graph'] || [j]).map(x => x['@type'])); }
      catch (e) { bad = e.message; }
    }
    t('json-ld parses', bad || 'ok', 'ok');
    t2('has WebApplication + HowTo + FAQPage', ['WebApplication', 'HowTo', 'FAQPage'].every(x => types.includes(x)), types.join('+'));
    t('canonical', w.document.querySelector('link[rel=canonical]').getAttribute('href'), 'https://example.com/7-minute-timer/');
    const raw = html.match(/<title>([\s\S]*?)<\/title>/)[1];
    t2('static title 30-75 chars', raw.length > 30 && raw.length < 75, raw.length + 'ch: "' + raw + '"');
    const desc = w.document.querySelector('meta[name=description]').content;
    t2('desc 70-175 chars', desc.length > 70 && desc.length < 175, desc.length + 'ch');
    t('h1 count', w.document.querySelectorAll('h1').length, 1);
  }

  console.log('\n' + pass + ' passed, ' + fail + ' failed\n');
  process.exit(fail ? 1 : 0);
})();
