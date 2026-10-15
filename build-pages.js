const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, 'pages');
fs.mkdirSync(OUT, { recursive: true });

const SITE = 'https://example.com';
const TOOL = '/index.html';

const PAGES = [
  {
    slug: 'pomodoro-technique',
    title: 'The Pomodoro Technique, Explained (25 Minutes at a Time)',
    h1: 'The Pomodoro Technique: how 25 minutes of focus beats a whole afternoon of drift',
    description: 'What the Pomodoro technique actually is, why 25 minutes works on your attention span, and how to run a full session with a free countdown timer.',
    preset: '25m',
    presetLabel: '25:00',
    adClient: 'ca-pub-0000000000000000',
    slots: { foot: '3333333333' },
    keywords: 'pomodoro technique, pomodoro timer, how to focus, 25 minute timer',
    body: [
      { p: 'Francesco Cirillo built the Pomodoro Technique in the late 1980s and named it after the tomato-shaped kitchen timer he actually used to time his own work. The mechanics are almost embarrassingly simple: pick one task, set a timer for 25 minutes, work until it rings, then take a five-minute break. After four rounds, take a longer one. That is the entire method.' },
      { p: 'What makes it work is not the 25 minutes. It is the commitment device. A task you have been avoiding — the draft, the migration, the tax form — is enormously easier to start when you know you are only committing to 25 minutes of it. Most people do not procrastinate because a task takes four hours. They procrastinate because a task feels unbounded, and unbounded work is terrifying.' },
      { h2: 'Why 25 minutes, specifically' },
      { p: 'Attention research consistently puts the span of uninterrupted focus somewhere between 20 and 45 minutes for most adults, and it gets shorter with fatigue and longer with practice. Twenty-five sits comfortably in that band: long enough to reach genuine depth, short enough that you do not feel the first serious dip in attention setting in. Start there rather than the aspirational 90-minute block most people attempt and abandon by Tuesday.' },
      { p: 'The break is not optional. Five minutes away from the screen, ideally standing and moving, is what lets attention recover. The single most common way people break the technique is treating the break as a reward they have not yet earned, and then spending it back in the same tab they were just working in.' },
      { h2: 'Running a full session' },
      { p: 'Block out four consecutive rounds before you start, because four is where the momentum breaks — this is the part almost everyone under-plans. Clear your desk. Close the tab that tempts you. Set your timer, start round one, and do not look at the countdown once it is running. Watching the clock is a form of anxiety, and it will cost you more than it gives.' },
      { p: 'The timer below is a plain countdown with a progress ring, ambient noise and a distraction-free view. Start it, put your phone in another room, and run the full four rounds.' },
      { p: 'After the fourth round, take fifteen to thirty minutes. Do not fill it with email — that is not a break, that is a lateral move into a different kind of work. When you come back, review what you finished, then either start another set or stop. Stopping on time is part of the discipline.' },
      { h2: 'When to adjust the length' },
      { p: 'If you are consistently finishing rounds early and feeling restless, move to 30 or 35 minutes. If you are losing the thread and drifting at minute 18, drop to 20. The number is a starting point, not a doctrine. Track what you actually complete and tune from there.' },
      { p: 'Finally, measure sessions, not hours. A tracker that counts completed focus rounds is far more motivating than a list of hours worked, because hours worked rewards presence, and rounds completed rewards output. The timer on this site keeps a running count of finished sessions in the current tab for exactly that reason.' }
    ],
    faq: [
      { q: 'How long should a Pomodoro break be?', a: 'Five minutes after each 25-minute round, and 15 to 30 minutes after every fourth round. The break should be away from the screen.' },
      { q: 'Is 25 minutes really enough to finish deep work?', a: 'For most tasks, yes. Complex tasks get several consecutive rounds. The point is that each round is a bounded unit you can actually start.' },
      { q: 'Should I use a Pomodoro timer for email?', a: 'No. Email is shallow work and fits better in a batched block. Reserve Pomodoro rounds for work that requires actual thought.' }
    ]
  },
  {
    slug: 'focus-timer',
    title: 'A Focus Timer That Stays Out of Your Way',
    h1: 'A focus timer that stays out of your way',
    description: 'Deep work blocks are hard to sustain with a cluttered interface. Here is how to run a focused work block that you will not want to escape from.',
    preset: '45m',
    presetLabel: '45:00',
    adClient: 'ca-pub-0000000000000000',
    slots: { foot: '3333333333' },
    keywords: 'focus timer, deep work timer, concentration timer, distraction free',
    body: [
      { p: 'There is an irony in most focus tools: the thing meant to protect your attention ends up demanding some. A ring of notifications, a task list, a streak counter, an achievement system. Every one of those is a small request for your attention, and your attention is the exact resource you are trying to protect.' },
      { p: 'A usable focus timer has to satisfy three requirements. It must be unambiguous about how much time is left. It must not require you to look anywhere other than the clock. And it must be able to disappear completely when you want it to, so that the only thing on screen is the number counting down.' },
      { h2: 'Longer blocks, fewer breaks' },
      { p: 'If Pomodoro intervals feel choppy, work in 45 or 50-minute blocks with a single break between them. The tradeoff is real: longer blocks let you get past the ramp-up cost, where the first fifteen minutes are spent resisting the urge to check something. The cost is that a 60-minute block is much harder to abandon gracefully when it is going badly, so keep blocks under an hour and make your exit explicit.' },
      { p: 'Set the timer, start it, and then do not interact with it again until it finishes. This is the entire discipline. A timer that requires interaction is a tool you will end up using as a procrastination object — opening it, closing it, opening it again, without having worked at all.' },
      { h2: 'Ambient sound is doing real work' },
      { p: 'If your environment has unpredictable noise — traffic, neighbours, a shared office — that unpredictability costs more attention than steady background noise does. Consistent low-level sound masks the interruptions, and the masking effect is genuinely useful rather than a productivity myth.' },
      { p: 'Pink and brown noise work because they have no rhythmic pattern to latch onto, so they do not compete for the same processing resources as speech or music. Rain works for the same reason with a different texture. Generated at low volume and left alone, it fades into the background of your attention rather than occupying it.' },
      { p: 'The timer below has a focus mode that strips the interface down to the countdown and the progress ring. Use the distraction-free toggle, or just press D.' },
      { h2: 'Deciding when you are done' },
      { p: 'The hardest part of a focus block is not starting it, it is deciding it is over. Pick a block length you can genuinely commit to before you start, and when the timer ends, stop — even mid-thought, even with momentum. Ending on a defined boundary is what makes the next block easy to start. Blocks that trail off teach you to negotiate with yourself, which is exactly the wrong habit.' },
      { p: 'Two or three real focus blocks a day is a good target. Trying to schedule eight will not survive contact with a normal week, and a schedule you abandon teaches you to distrust the next one.' }
    ],
    faq: [
      { q: 'What is the best length for a deep work block?', a: 'Between 45 and 90 minutes for most people. Longer than 60 and start-and-stop discipline gets hard; shorter than 40 and the ramp-up cost dominates.' },
      { q: 'Does background noise actually improve focus?', a: 'It does when the noise is steady and rhythmic-free. It is most useful for masking unpredictable environmental noise rather than for adding anything to your concentration.' }
    ]
  },
  {
    slug: 'sleep-timer',
    title: 'Sleep Timer: How Long Should You Give Yourself to Fall Asleep?',
    h1: 'How long should a sleep timer run?',
    description: 'Using a countdown to wind down before bed can help you stop doomscrolling. Here is how long to give yourself and why the wind-down matters more than the number.',
    preset: '15m',
    presetLabel: '15:00',
    adClient: 'ca-pub-0000000000000000',
    slots: { foot: '3333333333' },
    keywords: 'sleep timer, countdown to sleep, wind down before bed, fall asleep faster',
    body: [
      { p: 'A sleep timer is a countdown that starts at bedtime and ends when you intend to be asleep. Used well, it is a boundary rather than a deadline. The most valuable thing it does is give you a defined end to the evening, which is the thing people actually struggle with.' },
      { p: 'Most people do not have trouble falling asleep because they spent six hours on their phone. They have trouble because the last thing they did was consume unpredictable, mildly stimulating content with no natural stopping point. There is no chapter in an infinite feed, so there is no moment at which it feels finished.' },
      { h2: 'How long to give yourself' },
      { p: 'Fifteen minutes of deliberate wind-down is the common recommendation and a reasonable default. Ten is enough for most nights if you are genuinely ready. An hour is for people who have a real transition ritual — a book, a stretch, a conversation. What matters is that the duration is chosen in advance and the timer enforces it.' },
      { p: 'Set the timer, put the phone somewhere you cannot reach it without standing up, and do something boring on purpose. A physical book is ideal. A paper task, a stretching routine, a low-stakes conversation with someone else — anything that is not a screen works, because the light and the content type are both doing work on your arousal level.' },
      { h2: 'Why not just set a wake-up alarm' },
      { p: 'Because an alarm tells you when to start the morning. A sleep timer tells you when to stop the evening. The second one is harder and more valuable. Anyone can manage a fixed wake time; almost nobody manages a fixed wind-down, because an unbounded evening is the default and nobody interrupts it.' },
      { p: 'The timer below has a quiet preset and a soft chime alert, which suits a bedroom better than a harsh beep. Use fifteen minutes, or pick your own.' },
      { h2: 'Consistency matters more than duration' },
      { p: 'A fixed 15-minute wind-down that you actually follow is worth considerably more than an hour-long one you abandon. The habit forms around the duration you keep. Start short enough that you never miss it, and extend only once it is genuinely automatic.' }
    ],
    faq: [
      { q: 'Should I use my phone as a sleep timer?', a: 'You can, but set it then put the phone out of reach. A sleep timer that stays in your hand does not wind anything down.' },
      { q: 'Is 15 minutes enough to fall asleep?', a: 'It is enough for a wind-down, not necessarily for sleep itself. Most people need 20 to 30 minutes after getting into bed, so start your timer before you get in.' }
    ]
  },
  {
    slug: 'study-timer',
    title: 'Study Timer: How to Build a Session That Actually Sticks',
    h1: 'How to build a study session that sticks',
    description: 'A practical structure for studying: how long to work, how to break, and why counting completed sessions beats counting hours.',
    preset: '45m',
    presetLabel: '45:00',
    adClient: 'ca-pub-0000000000000000',
    slots: { foot: '3333333333' },
    keywords: 'study timer, revision timer, exam study technique, study session',
    body: [
      { p: 'Most people study by sitting down with an intention and no structure, and the intention erodes somewhere around the fortieth minute. The gap between "I studied for three hours" and "I retained three hours" is enormous, and it is usually caused by the same thing: no defined unit of work and no defined break.' },
      { p: 'Retrieval practice is what actually moves recall, and it is uncomfortable in a specific way: closing the book and trying to reproduce a thing is much harder than it was to recognise it while reading. A study session should be mostly retrieval, and the timer is what keeps you doing it rather than sliding back into re-reading, which feels productive and is not.' },
      { h2: 'Structure that survives contact with a bad day' },
      { p: 'Do three rounds of 45 minutes with 10-minute breaks, then stop. Do not plan eight hours. The reason is not that eight hours is unachievable in principle, it is that a plan you fail damages your trust in the next plan, and the sessions that get skipped are exactly the ones after a failure.' },
      { p: 'In each round, work one narrow thing: one set of problems, one section retrieved from memory, one essay plan. Write the round goal down before you start. A round with a vague goal becomes a round of browsing, and you will not notice until the timer rings.' },
      { h2: 'The break has rules' },
      { p: 'Ten minutes, away from the material, not on a different input. Standing up and moving matters more than what you do. The failure mode is treating the break as a smaller session — five minutes of scrolling, then twenty minutes of scrolling, and now the break is half the study session.' },
      { p: 'After the third round, stop for the day even if you have energy. This is the part that feels wrong and works. Learning is consolidated after sleep, not during a fourth hour of the same material, and your marginal return in the fourth hour is much worse than your feeling that it would be.' },
      { p: 'Use the timer below, set to 45 minutes, and count completed rounds rather than hours. Hours reward showing up. Completed, specific rounds are the thing that correlates with the exam result.' }
    ],
    faq: [
      { q: 'Is it better to study for one long block or several short ones?', a: 'Several shorter blocks with real breaks. The break is when the material gets consolidated, and long unbroken blocks tend to produce re-reading rather than recall.' },
      { q: 'How long should each study block be?', a: '45 minutes of focused work with a 10-minute break is a good default. Shorter if you are reviewing, longer if you are solving problems.' }
    ]
  },
  {
    slug: 'workout-timer',
    title: 'Workout Interval Timer: Rest Is Part of the Program',
    h1: 'Workout interval timing: rest is part of the program',
    description: 'How long to rest between sets and rounds, and how an interval timer removes the guesswork from a home workout.',
    preset: '3m',
    presetLabel: '03:00',
    adClient: 'ca-pub-0000000000000000',
    slots: { foot: '3333333333' },
    keywords: 'workout timer, interval timer, rest timer, home workout timer',
    body: [
      { p: 'Almost every home workout fails for the same reason: the person is not ready when the interval ends. They are on their phone, or still standing there, and by the time they have rescheduled the next effort the rest period is half gone. The workout is therefore easier than intended and produces less adaptation than the plan promised.' },
      { p: 'An interval timer removes the decision entirely. You start the effort, you stop when it rings, you start the rest when it rings. The interesting consequence is that you stop at the planned moment even when you feel like you could keep going, which is the difference between a programmed session and an improvised one.' },
      { h2: 'How long to rest' },
      { p: 'Between 60 and 120 seconds is the standard for most strength and hypertrophy work. Longer than that if the effort is genuinely maximal, or if the movement is technically demanding and you want the quality high. Shorter — 30 seconds — for conditioning circuits, and shorter still for a tabata-style density block.' },
      { p: 'The rule worth following: rest until your breathing has returned near baseline, and no longer. Training adaptations happen during the work, and rest exists to let you perform the next interval, not to maximise recovery in a single session. Standing around for five minutes between every set is mostly wasted time.' },
      { h2: 'A simple structure that works' },
      { p: 'Four rounds of one effort, three minutes rest between, ten minutes between sets. A three-minute countdown is long enough to breathe properly, hydrate and reset without the session fragmenting, and short enough that you actually finish the set count you planned.' },
      { p: 'The timer below has a short preset, an audio alert you can hear across a room, and a progress ring so you know how much rest is left without having to look at your phone. If you are training in a noisy space, the soft rain ambient will also mask the noise without you having to think about it.' },
      { h2: 'The most common mistake' },
      { p: 'Programming rest you do not actually take, and then interpreting the weak result as insufficient training volume. If the prescribed rest does not fit the session you have, shorten the session. Do not silently compress every rest period and wonder why the last round feels like nothing.' }
    ],
    faq: [
      { q: 'How long should I rest between sets?', a: '60 to 120 seconds for most strength work, up to 3 minutes for maximal lifts, and 30 seconds or less for conditioning work.' },
      { q: 'Is three minutes too long between sets?', a: 'Not if the prescribed effort is genuinely hard. Longer rest preserves movement quality on heavy compound lifts, which usually beats more repetitions at lower quality.' }
    ]
  },
  {
    slug: 'meditation-timer',
    title: 'Meditation Timer: Start With Ten Minutes, Not Thirty',
    h1: 'Meditation timers: start with ten minutes',
    description: 'A short, repeatable meditation practice beats an ambitious one you abandon. Here is how to build a session you will still be doing in a month.',
    preset: '10m',
    presetLabel: '10:00',
    adClient: 'ca-pub-0000000000000000',
    slots: { foot: '3333333333' },
    keywords: 'meditation timer, mindfulness timer, daily meditation, meditation session',
    body: [
      { p: 'The most common meditation failure is ambition. Thirty or forty-five minutes, booked before work, abandoned on the third day, and then a general conviction that "I am bad at meditation". Almost everyone who believes this is bad at meditation is actually bad at committing to a duration that is too long.' },
      { p: 'Ten minutes is not a compromise. It is long enough to get past the settling-in discomfort and long enough that a practice exists. A ten-minute practice done daily outperforms a forty-five-minute practice done twice a month, and it is not close.' },
      { h2: 'What the first few minutes actually feel like' },
      { p: 'You will spend most of the first five minutes thinking about the fact that you are not concentrating. This is not failure and it is not progress you are failing at — noticing that you have drifted is exactly the skill being trained. The practice is the returning, and the returning happens fifty or a hundred times in a ten-minute session.' },
      { p: 'Sitting in silence for ten minutes is genuinely uncomfortable for most people, and that discomfort is not a sign to stop. It is a sign you are doing something slightly unfamiliar. Reduce the duration rather than abandoning the practice entirely.' },
      { h2: 'Practical setup' },
      { p: 'Same time, same place, same posture. The cue-to-routine link is doing a lot of the work, and consistency in the physical details is what makes starting automatic after a couple of weeks.' },
      { p: 'A timer is genuinely more useful here than in most other contexts, because the fear of sitting for an unbounded period is a real obstacle for beginners. Knowing it is ten minutes and not an open-ended commitment is often what makes the start bearable. A soft chime at the end is a good way to finish without a jarring startle.' },
      { p: 'Set ten minutes below, pick a gentle alert, and do it at the same time tomorrow.' }
    ],
    faq: [
      { q: 'How long should I meditate as a beginner?', a: 'Ten minutes daily. Consistency matters far more than duration, and ten minutes is short enough that you will keep doing it.' },
      { q: 'Do I need a special cushion or posture?', a: 'No. Sit somewhere you can be still for ten minutes with a reasonably straight back. The posture matters far less than being in the same place each day.' }
    ]
  },
  {
    slug: 'presentation-timer',
    title: 'Presentation Timer: How to Pace a Talk Without Rushing',
    h1: 'Pacing a presentation without rushing the ending',
    description: 'How long to rehearse per slide, what to do when you run long, and how a visible countdown keeps a talk on time.',
    preset: '15m',
    presetLabel: '15:00',
    adClient: 'ca-pub-0000000000000000',
    slots: { foot: '3333333333' },
    keywords: 'presentation timer, speech timer, talk pacing, rehearse a talk',
    body: [
      { p: 'The reason talks get rushed is that the decision about what to cut is deferred until the moment you are already over. Standing in front of an audience discovering you have four slides left and six minutes is a bad way to make an editorial decision.' },
      { p: 'A visible timer changes where the decision happens. If the countdown is on the wall or the lectern, you make the cut at minute eight of a fifteen-minute slot, calmly, rather than at minute fourteen in front of everyone.' },
      { h2: 'Budget the time before you build' },
      { p: 'Work out the total slot length first, then subtract five minutes of questions if there are any. For a fifteen-minute talk with questions that leaves ten minutes of talking, which is roughly 1,100 words at a measured pace of about 110 words per minute. Speaking faster than that under pressure is the main reason talks feel rushed even when the content was fine.' },
      { p: 'Divide that by your slide count and you have a per-slide budget. A title slide is five seconds. A content slide is 60 to 90 seconds. A slide you cannot summarise in one sentence is usually two slides.' },
      { h2: 'Rehearse with a hard stop' },
      { p: 'Run the talk at least three times with a timer and cut it to the length, not to the content you planned. The cuts are always the same ones: the second example, the caveat, the backup slide you thought you needed. Rehearsal exists to find those cuts while there is still time to make them well.' },
      { p: 'Rehearse standing and out loud, with the actual slides. Silent reading is substantially faster than speaking, which is why a talk you rehearsed in your head runs forty percent long.' },
      { h2: 'When you are running long' },
      { p: 'The recovery move is to state your remaining time and commit to a specific endpoint: "I have three minutes left, so I will cover the last two slides and stop for questions." Announcing it buys you enormous latitude, because the audience now has a shared contract and nobody is silently getting impatient.' },
      { p: 'Put your final slide up permanently in the corner. It is an escape hatch you will probably never need, and knowing it is there means you do not need it.' },
      { p: 'The timer below has a fifteen-minute preset and a discreet, unobtrusive progress ring — usable on a lectern, or on a second screen if you have one.' }
    ],
    faq: [
      { q: 'How many words per minute for a presentation?', a: 'Around 110 to 130 words per minute for a normal speaking pace. Budget for 110 if you are nervous, since people speed up when they are.' },
      { q: 'What if I finish early?', a: 'It is much better than running long. Keep a backup slide or an extended example ready so you can add rather than cut, and never speak faster to fill the slot.' }
    ]
  },
  {
    slug: 'breathing-exercise',
    title: '4-7-8 Breathing: A Two-Minute Downshift',
    h1: 'The 4-7-8 breathing technique, in two minutes',
    description: 'How to do 4-7-8 breathing properly, why the long exhale matters, and when it is genuinely useful versus when it is not.',
    preset: '2m',
    presetLabel: '02:00',
    adClient: 'ca-pub-0000000000000000',
    slots: { foot: '3333333333' },
    keywords: '4-7-8 breathing, breathing exercise, box breathing, calm down breathing',
    body: [
      { p: 'The 4-7-8 pattern is three numbers long. Breathe in through your nose for four counts. Hold for seven. Breathe out through your mouth for eight. That is one cycle, and most people do four to six of them and stop.' },
      { p: 'The reason the long exhale is the important part is physiological rather than mystical. Exhaling longer than you inhale slows your heart rate, because heart rate rises slightly on the inhale and falls on the exhale. Extending the exhale extends the falling phase. The technique is essentially a manual way to shift your autonomic state downward, and it works on that basis whether or not you find it meaningful.' },
      { h2: 'Doing it without getting light-headed' },
      { p: 'Most people breathe 4-7-8 too fast at the start, and then feel woozy and conclude the technique is wrong. The counts must be slow and the breaths must be shallow enough to stay comfortable. If you are counting in your head faster than about one count per second, slow down.' },
      { p: 'Breathe through your nose for the inhale and pursed lips for the exhale, as though blowing out a candle slowly. The resistance keeps the breath from being ragged. Stopping after four cycles is plenty at the beginning; many people find that is all they need.' },
      { h2: 'When it is genuinely useful' },
      { p: 'It is well suited to a short acute spike — before a difficult conversation, the first two minutes after waking, the moment you notice you have been clenching your jaw for twenty minutes. The effect is real but it is a downshift, not a solution, and it lasts for minutes rather than hours.' },
      { p: 'It is much less useful as a daily practice than as a tool for a specific moment. The daily benefit people attribute to it comes more from the ritual of stopping than from the specific ratio.' },
      { h2: 'If you get light-headed' },
      { p: 'Stop, breathe normally for a minute, and return with a shorter ratio. Box breathing — four in, four held, four out, four held — has an equal exhale and is a better default for people who find 4-7-8 too aggressive. Six breaths per minute is the underlying rate that most breathing research settles on, and any pattern that lands there will do.' },
      { p: 'Two minutes is plenty. Set the two-minute countdown below and close your eyes.' }
    ],
    faq: [
      { q: 'How many times should I do 4-7-8 breathing?', a: 'Four cycles is a good starting point. Most people feel the effect within two minutes and there is no benefit to going much longer.' },
      { q: 'Is 4-7-8 better than box breathing?', a: 'Neither is universally better. 4-7-8 has a longer exhale and a stronger downshift, box breathing is easier to sustain and less likely to make you light-headed.' }
    ]
  }
];

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function render(p) {
  const url = SITE + '/' + p.slug + '/';
  const words = p.body.reduce((n, b) => n + (b.p ? b.p.split(/\s+/).length : 0), 0);

  const article = p.body.map(b => {
    if (b.h2 && !b.p) { return '      <h2>' + esc(b.h2) + '</h2>'; }
    if (b.h2) { return '      <h2>' + esc(b.h2) + '</h2>\n      <p>' + esc(b.p) + '</p>'; }
    return '      <p>' + esc(b.p) + '</p>';
  }).join('\n');

  const faqItems = p.faq.map(f =>
    '        {\n          "@type": "Question",\n          "name": "' + esc(f.q) + '",\n          "acceptedAnswer": { "@type": "Answer", "text": "' + esc(f.a) + '" }\n        }'
  ).join(',\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="color-scheme" content="dark">
<meta name="theme-color" content="#09090b">
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.description)}">
<link rel="canonical" href="${url}">
<meta name="robots" content="index,follow,max-snippet:-1">
<meta property="og:type" content="article">
<meta property="og:title" content="${esc(p.title)}">
<meta property="og:description" content="${esc(p.description)}">
<meta property="og:url" content="${url}">
<meta property="og:site_name" content="Online Timer">
<meta name="twitter:card" content="summary">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500&display=swap">
<script src="https://cdn.tailwindcss.com"></script>
<style>
  :root{--ease:cubic-bezier(.22,1,.36,1)}
  body{margin:0;background:#09090b;color:#d4d4d8;font-family:Inter,ui-sans-serif,system-ui,-apple-system,sans-serif;-webkit-font-smoothing:antialiased}
  .wrap{max-width:720px;margin:0 auto;padding:clamp(20px,5vw,48px) clamp(18px,4vw,32px) 80px}
  h1{font-size:clamp(1.75rem,5.2vw,2.6rem);line-height:1.15;letter-spacing:-.028em;font-weight:700;color:#fafafa;margin:0 0 1rem}
  h2{font-size:clamp(1.15rem,3vw,1.4rem);line-height:1.3;letter-spacing:-.02em;font-weight:600;color:#f4f4f5;margin:2.75rem 0 .85rem}
  p{font-size:1.04rem;line-height:1.75;color:#a1a1aa;margin:0 0 1.15rem}
  .eyebrow{display:inline-flex;align-items:center;gap:.5rem;font-size:.68rem;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:#71717a;margin-bottom:1.1rem}
  .cta{display:flex;flex-wrap:wrap;align-items:center;gap:1rem;margin:2.25rem 0;padding:1.4rem 1.5rem;border-radius:22px;border:1px solid rgba(255,255,255,.08);background:linear-gradient(140deg,rgba(99,102,241,.1),rgba(255,255,255,.02))}
  .cta-time{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:2rem;font-weight:500;color:#fafafa;line-height:1;padding:.5rem .85rem;border-radius:14px;background:rgba(9,9,11,.7);border:1px solid rgba(255,255,255,.1)}
  .cta-btn{display:inline-flex;align-items:center;gap:.5rem;padding:.85rem 1.5rem;border-radius:999px;font-weight:600;font-size:.9rem;color:#fff;background:linear-gradient(180deg,#6366f1,#7c3aed);text-decoration:none;box-shadow:0 14px 34px -14px rgba(99,102,241,.95);transition:transform .18s var(--ease)}
  .cta-btn:hover{transform:translateY(-2px)}
  .cta-note{font-size:.75rem;color:#52525b;flex-basis:100%;line-height:1.5}
  .faq{margin-top:3.5rem;padding-top:2rem;border-top:1px solid rgba(255,255,255,.07)}
  .faq h2{margin-top:0}
  .faq-item{margin-bottom:1.5rem}
  .faq-item h3{font-size:.95rem;font-weight:600;color:#e4e4e7;margin:0 0 .4rem}
  .faq-item p{font-size:.92rem;line-height:1.65;margin:0}
  .ad-slot{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.3rem;min-height:100px;margin:2.5rem 0;border:1px dashed rgba(255,255,255,.12);border-radius:18px;background:repeating-linear-gradient(135deg,rgba(255,255,255,.016) 0 10px,rgba(255,255,255,.006) 10px 20px);text-align:center}
  .ad-slot.is-live{border:none;background:transparent}
  .ad-slot.is-live .ad-title,.ad-slot.is-live .ad-meta{display:none}
  .ad-slot.is-live .ad-frame{display:block}
  .ad-frame{display:none;width:100%}
  .ad-title{font-size:.58rem;font-weight:700;letter-spacing:.26em;text-transform:uppercase;color:#52525b}
  .ad-meta{font-size:.58rem;letter-spacing:.14em;color:#3f3f46;text-transform:uppercase}
  footer{margin-top:3.5rem;padding-top:1.5rem;border-top:1px solid rgba(255,255,255,.07);font-size:.76rem;color:#52525b;line-height:1.7}
  footer a{color:#71717a}
  @media (prefers-reduced-motion:reduce){*{transition-duration:.01ms!important}}
</style>
</head>
<body>
<div class="wrap">
  <p class="eyebrow"><a href="${TOOL}" style="color:inherit;text-decoration:none">Online Timer</a> &nbsp;/&nbsp; ${esc(p.keywords.split(',')[0].trim())}</p>
  <h1>${esc(p.h1)}</h1>

  <div class="cta">
    <span class="cta-time">${esc(p.presetLabel)}</span>
    <a class="cta-btn" href="${TOOL}#${p.preset}" rel="nofollow">
      Open the timer
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
    </a>
    <span class="cta-note">Free online countdown with ambient sound and a distraction-free mode. No signup, nothing to install. The timer opens pre-set to ${esc(p.presetLabel)}.</span>
  </div>

  <article>
${article}
  </article>

  <section class="faq">
    <h2>Common questions</h2>
${p.faq.map(f => '    <div class="faq-item">\n      <h3>' + esc(f.q) + '</h3>\n      <p>' + esc(f.a) + '</p>\n    </div>').join('\n')}
  </section>

  <div class="ad-slot" data-ad-slot="foot" data-ad-size="728x90" data-min-h="100">
    <span class="ad-title">Advertisement</span>
    <span class="ad-meta">728 &times; 90</span>
  </div>

  <footer>
    <p>${esc(p.keywords.charAt(0).toUpperCase() + p.keywords.slice(1))} — a free browser tool from <a href="${TOOL}">Online Timer</a>, which also does pomodoro, sleep, workout, study, meditation and presentation countdowns with shareable links like <code>${TOOL}#${p.preset}</code>.</p>
    <p><a href="${TOOL}">Open the full timer</a> &middot; <a href="#privacy">Privacy</a> &middot; <a href="#terms">Terms</a></p>
  </footer>
</div>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "headline": "${esc(p.h1)}",
      "description": "${esc(p.description)}",
      "url": "${url}",
      "datePublished": "2026-01-15",
      "dateModified": "2026-01-15",
      "author": { "@type": "Organization", "name": "Online Timer" },
      "publisher": { "@type": "Organization", "name": "Online Timer" },
      "mainEntityOfPage": { "@type": "WebPage", "@id": "${url}" }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
${faqItems}
      ]
    }
  ]
}
</script>
<script>
(function(){
  'use strict';
  var CLIENT='';
  var SLOTS={foot:'${p.slots.foot}'};
  var KEY='ot.consent.v1';
  var consent='unknown';
  try{ var raw=localStorage.getItem(KEY); if(raw){ var s=JSON.parse(raw); if(s&&Date.now()-s.ts<180*864e5) consent=s.choice; } }catch(e){}
  function fill(el){
    if(consent!=='granted'||!CLIENT||el.getAttribute('data-filled')) return;
    var unit=SLOTS[el.getAttribute('data-ad-slot')];
    if(!unit) return;
    var ins=document.createElement('ins');
    ins.className='adsbygoogle ad-frame';
    ins.style.display='block';ins.style.width='100%';ins.style.minHeight='100px';
    ins.setAttribute('data-ad-client',CLIENT);
    ins.setAttribute('data-ad-slot',unit);
    ins.setAttribute('data-ad-format','horizontal');
    ins.setAttribute('data-full-width-responsive','true');
    el.insertBefore(ins,el.firstChild);
    el.setAttribute('data-filled','true');
    el.classList.add('is-live');
    try{ (window.adsbygoogle=window.adsbygoogle||[]).push({}); }catch(e){}
  }
  if(consent==='granted'&&CLIENT){
    var sc=document.createElement('script');
    sc.async=true;sc.crossOrigin='anonymous';
    sc.src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client='+CLIENT;
    document.head.appendChild(sc);
    if('IntersectionObserver' in window){
      var o=new IntersectionObserver(function(es){ for(var i=0;i<es.length;i++){ if(es[i].isIntersecting){ fill(es[i].target); o.unobserve(es[i].target); } } },{rootMargin:'200px'});
      var s=document.querySelectorAll('.ad-slot'); for(var k=0;k<s.length;k++) o.observe(s[k]);
    }
  }
})();
</script>
</body>
</html>
`;
}

let totalWords = 0;
const titles = new Set();
const descs = new Set();

PAGES.forEach(p => {
  const words = p.body.reduce((n, b) => n + (b.p ? b.p.split(/\s+/).length : 0), 0) +
    p.faq.reduce((n, f) => n + f.q.split(/\s+/).length + f.a.split(/\s+/).length, 0);
  totalWords += words;
  titles.add(p.title);
  descs.add(p.description);
  if (words < 300) { throw new Error(p.slug + ' is thin: ' + words + ' words'); }
  fs.writeFileSync(path.join(OUT, p.slug + '.html'), render(p));
  console.log(String(words).padStart(4) + ' words  ' + p.preset.padEnd(5) + ' /' + p.slug);
});

if (titles.size !== PAGES.length) { throw new Error('duplicate titles'); }
if (descs.size !== PAGES.length) { throw new Error('duplicate descriptions'); }

console.log('\n' + PAGES.length + ' pages, ' + totalWords + ' words total, all titles/descriptions unique');
