/**
 * Capture wizard screenshots + end-to-end GIF via Puppeteer + ffmpeg
 */
import puppeteer from 'puppeteer';
import { writeFileSync, mkdirSync, readdirSync, unlinkSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, 'public', 'capture');
const GIF_FRAMES = join(OUT, 'frames');
mkdirSync(OUT, { recursive: true });
mkdirSync(GIF_FRAMES, { recursive: true });
readdirSync(GIF_FRAMES).forEach(f => unlinkSync(join(GIF_FRAMES, f)));

const BASE = 'http://localhost:3001';
const W = 1200, H = 800;
const FFMPEG = '/opt/homebrew/bin/ffmpeg';
const pause = ms => new Promise(r => setTimeout(r, ms));

// Verified-working evaluate-and-wait pattern (matches debug test)
async function ev(page, fn) {
  await page.evaluate(fn);
  await pause(1500);
}

function save(buf, name) {
  writeFileSync(join(OUT, name), buf);
  console.log('✓', name, `(${Math.round(buf.length / 1024)}KB)`);
}

let fi = 1;
function saveFrame(buf, hold = 1) {
  for (let i = 0; i < hold; i++) {
    writeFileSync(join(GIF_FRAMES, `frame-${String(fi++).padStart(4, '0')}.png`), buf);
  }
}

async function freshPage(browser) {
  const p = await browser.newPage();
  await p.setViewport({ width: W, height: H });
  await p.goto(BASE, { waitUntil: 'networkidle0' });
  await pause(1000);
  return p;
}

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  // ═══════════════════════════════════════════════════════════
  // SCREENSHOTS
  // ═══════════════════════════════════════════════════════════
  console.log('\n── Screenshots ──');
  const pg = await freshPage(browser);

  // 1 · Sales Overview + amber banner
  save(await pg.screenshot({ type: 'png' }), '01-sales-overview-banner.png');

  // → Open wizard (Step 1 · timeline)
  await ev(pg, () => document.querySelector('.xero-banner-cta').click());
  save(await pg.screenshot({ type: 'png' }), '02-step1-timeline.png');

  // → Step 2 · fork
  await ev(pg, () => [...document.querySelectorAll('.wiz-footer button')]
    .find(b => b.textContent.includes('See options')).click());
  save(await pg.screenshot({ type: 'png' }), '03-step2-fork.png');

  // → Step 3 · fee comparison (select explore path first)
  await ev(pg, () => document.querySelectorAll('.wiz-fork-options .oc')[1].click());
  await ev(pg, () => [...document.querySelectorAll('.wiz-footer button')]
    .find(b => b.textContent.includes('Continue')).click());
  save(await pg.screenshot({ type: 'png' }), '04-step3-fee-table.png');

  // ← Back · select card path · Step 4 confirmation
  await ev(pg, () => [...document.querySelectorAll('.wiz-footer button')]
    .find(b => b.textContent.includes('Back')).click());
  await ev(pg, () => document.querySelectorAll('.wiz-fork-options .oc')[0].click());
  await ev(pg, () => [...document.querySelectorAll('.wiz-footer button')]
    .find(b => b.textContent.includes('Continue')).click());
  save(await pg.screenshot({ type: 'png' }), '05-step4-card-confirmation.png');

  // · Toast · close wizard → re-open → Email me a reminder
  await ev(pg, () => document.querySelector('.wiz-close').click());
  await ev(pg, () => document.querySelector('.xero-banner-cta').click());
  await ev(pg, () => [...document.querySelectorAll('button')]
    .find(b => b.textContent.includes('Email me a reminder')).click());
  await pause(400);
  save(await pg.screenshot({ type: 'png' }), '06-toast-notification.png');

  // ═══════════════════════════════════════════════════════════
  // GIF FRAMES  (card happy path end-to-end)
  // ═══════════════════════════════════════════════════════════
  console.log('\n── GIF frames ──');
  const gp = await freshPage(browser);

  saveFrame(await gp.screenshot({ type: 'png' }), 5);               // Sales Overview

  await ev(gp, () => document.querySelector('.xero-banner-cta').click());
  saveFrame(await gp.screenshot({ type: 'png' }), 4);               // Step 1

  await ev(gp, () => [...document.querySelectorAll('.wiz-footer button')]
    .find(b => b.textContent.includes('See options')).click());
  saveFrame(await gp.screenshot({ type: 'png' }), 3);               // Step 2 unselected

  await ev(gp, () => document.querySelectorAll('.wiz-fork-options .oc')[0].click());
  saveFrame(await gp.screenshot({ type: 'png' }), 3);               // Step 2 card selected

  await ev(gp, () => [...document.querySelectorAll('.wiz-footer button')]
    .find(b => b.textContent.includes('Continue')).click());
  saveFrame(await gp.screenshot({ type: 'png' }), 5);               // Step 4

  await ev(gp, () => [...document.querySelectorAll('.wiz-footer button')]
    .find(b => b.textContent.includes('Finish')).click());
  await pause(500);
  saveFrame(await gp.screenshot({ type: 'png' }), 3);               // Back on Sales Overview

  await browser.close();
  console.log(`  ${fi - 1} frames`);

  // ═══════════════════════════════════════════════════════════
  // BUILD GIF
  // ═══════════════════════════════════════════════════════════
  console.log('\n── Building GIF ──');
  const gifOut = join(OUT, 'happy-path.gif');
  execSync(
    `${FFMPEG} -y -framerate 1 -pattern_type glob -i '${GIF_FRAMES}/frame-*.png' ` +
    `-vf "fps=1,scale=900:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" ` +
    `"${gifOut}"`,
    { stdio: 'pipe' }
  );
  console.log(`✓ happy-path.gif (${Math.round(statSync(gifOut).size / 1024)} KB)`);
  console.log('\nAll done → public/capture/');
})();
