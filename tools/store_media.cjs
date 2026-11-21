#!/usr/bin/env node
// Материалы витрины Playgama (только локально, НИЧЕГО не загружает):
//   node tools/store_media.cjs [--map=hills|pyramid]
// Английская версия, 1920×1080. Время шагает ровно на 1/30 с на кадр (свой цикл игры остановлен), игрока ведёт
// бот (убегает от существ, на финале лезет на холм), включено бессмертие — запись идёт весь раунд.
// Кадры: store/playgama/frames/00000.jpg …; плюс снимки меню и персонажей: store/playgama/shots/.
// Ролик и обложки собирает tools/store_make.py.
const path = require('node:path');
const fs = require('node:fs');
function loadPlaywright() {
  const tries = [process.env.PLAYWRIGHT_PATH, 'playwright', path.resolve(__dirname, '../../Одна кнопка/node_modules/playwright'), path.resolve(__dirname, '../../Фура рогалик/node_modules/playwright')];
  for (const t of tries) { if (!t) continue; try { return require(t); } catch { /* дальше */ } }
  throw new Error('playwright не найден');
}
const OUT = path.resolve(__dirname, '../store/playgama');
const FRAMES = path.join(OUT, 'frames'), SHOTS = path.join(OUT, 'shots');
// --shots-only: только снимки меню/персонажей/энциклопедии, кадры раунда не трогаем
const SHOTS_ONLY = process.argv.includes('--shots-only');
if (!SHOTS_ONLY) fs.rmSync(FRAMES, { recursive: true, force: true });
fs.mkdirSync(FRAMES, { recursive: true }); fs.mkdirSync(SHOTS, { recursive: true });
const MAP = (process.argv.find((a) => a.startsWith('--map=')) || '--map=hills').split('=')[1];
const SECONDS = Number((process.argv.find((a) => a.startsWith("--seconds=")) || "--seconds=85").split("=")[1]), FPS = 30;

(async () => {
  const { chromium } = loadPlaywright();
  const browser = await chromium.launch({ headless: true, args: ['--use-angle=d3d11', '--enable-gpu', '--ignore-gpu-blocklist'] });
  const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1, locale: 'en-US' });
  const page = await ctx.newPage();
  page.on('pageerror', (e) => console.log('ОШИБКА', e.message));
  await page.goto('http://127.0.0.1:5210/?lang=en&q=3&nofps=1');
  await page.waitForFunction(() => document.getElementById('splash')?.classList.contains('done') && window.__ui, null, { timeout: 60000 });
  // отладочная плашка FPS — только в разработке, на витрине ей не место
  await page.addStyleTag({ content: '.fps-hide{display:none!important}' });
  await page.evaluate(() => { for (const d of document.querySelectorAll('div')) if (/^FPS \d/.test(d.textContent || '')) d.classList.add('fps-hide'); });
  // профиль «бывалого игрока»: без обучения, с парой открытых персонажей и монетами
  await page.evaluate((map) => {
    const W = window;
    W.__ui.round(); W.__ui.result(false);   // отметить «первый раунд сыгран» — обучение в ролик не попадёт
    W.__ui.main();
    if (map === 'pyramid') document.querySelector('.mnu-map')?.click();
  }, MAP);
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(SHOTS, 'menu.jpg'), type: 'jpeg', quality: 92 });
  await page.evaluate(() => window.__ui.chars());
  await page.waitForTimeout(900);
  await page.screenshot({ path: path.join(SHOTS, 'characters.jpg'), type: 'jpeg', quality: 92 });
  // энциклопедия «бывалого игрока»: все существа и свойства уже встречались (с нового профиля там одни «???»)
  await page.evaluate(async () => {
    const { progress } = await import('/src/progress.ts');
    const { ADJ_IDS, NOUN_IDS } = await import('/src/game/words.ts');
    progress.patch({ seen: [...NOUN_IDS, ...ADJ_IDS] });
  });
  await page.evaluate(() => { document.querySelector('.chr-overlay:not(.enc-overlay) .chr-back')?.click(); window.__ui.enc(); });
  await page.waitForTimeout(900);
  await page.screenshot({ path: path.join(SHOTS, 'encyclopedia.jpg'), type: 'jpeg', quality: 92 });
  await page.evaluate(() => document.querySelector('.enc-overlay .chr-back')?.click());
  if (SHOTS_ONLY) { await browser.close(); console.log('снимки готовы:', SHOTS); return; }

  // раунд: свой цикл игры стоп, время двигаем сами
  await page.evaluate(() => {
    const W = window;
    W.__god = true;
    W.__renderer.setAnimationLoop(null);
    W.__restart('normal');
    const key = (type, code) => dispatchEvent(new KeyboardEvent(type, { code }));
    let held = false, jumpT = 0, jumpCd = 0, pressAt = -1, frames = 0, yaw = W.__cam.yaw;
    const hold = (on) => { if (on !== held) { key(on ? 'keydown' : 'keyup', 'KeyW'); held = on; } };
    W.__film = () => {
      frames++;
      const s = W.__state(), p = W.__ctl.pos;
      if (W.__reels.spinning) {
        if (pressAt < 0) pressAt = frames + 25;
        if (frames >= pressAt) { W.__reels.press(); pressAt = frames + 14; }
      } else pressAt = -1;
      let fx = 0, fz = 0;
      for (const m of W.__creatures.mobs.filter((q) => q.live)) {
        const tx = m.phase === 'fall' ? m.tx : m.x, tz = m.phase === 'fall' ? m.tz : m.z;
        const dx = p.x - tx, dz = p.z - tz, d2 = dx * dx + dz * dz, R = m.phase === 'fall' ? 4.5 : 7;
        if (d2 < R * R && d2 > 1e-4) { fx += dx / d2; fz += dz / d2; }
      }
      const H = 22;
      if (p.x > H) fx -= 3; if (p.x < -H) fx += 3; if (p.z > H) fz -= 3; if (p.z < -H) fz += 3;
      const HILL = W.__hill();
      if (s.t > 40) {
        const g = HILL[HILL.length - 1], gx = g[0] - p.x, gz = g[1] - p.z, gl = Math.hypot(gx, gz);
        if (gl > 0.8) { fx += (gx / gl) * 0.8; fz += (gz / gl) * 0.8; } else { fx *= 0.1; fz *= 0.1; }
      } else if (Math.hypot(fx, fz) < 0.05) {
        // спокойно — бежим по кругу, чтобы в кадре было движение
        fx += Math.cos(frames / 70) * 0.3; fz += Math.sin(frames / 70) * 0.3;
      }
      const len = Math.hypot(fx, fz);
      if (len > 0.02 && !W.__reels.spinning) {
        const want = Math.atan2(-fx / len, -fz / len);
        let d = want - yaw; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI;
        yaw += d * 0.07;   // плавная камера для ролика
        W.__cam.yaw = yaw;
        hold(true);
        const ax = p.x + (fx / len) * 1.2, az = p.z + (fz / len) * 1.2;
        if (jumpCd-- <= 0 && W.__heightAt(ax, az) > p.y + 0.3 && W.__ctl.grounded) { key('keydown', 'Space'); jumpT = 4; jumpCd = 20; }
      } else hold(false);
      if (jumpT > 0 && --jumpT === 0) key('keyup', 'Space');
      W.__tick(1 / 30);
      W.__renderer.render(W.__scene, W.__cam.camera);
      return { t: s.t, st: s.state, reels: s.reels.length };
    };
  });
  const log = [];
  for (let f = 0; f < SECONDS * FPS; f++) {
    const s = await page.evaluate(() => window.__film());
    log.push(s);
    await page.screenshot({ path: path.join(FRAMES, String(f).padStart(5, '0') + '.jpg'), type: 'jpeg', quality: 90 });
    if (f % 150 === 0) console.log(`кадр ${f}/${SECONDS * FPS}  t=${s.t.toFixed(1)}  ${s.st}`);
    if (s.st === 'win' && log.filter((q) => q.st === 'win').length > 95) break;
  }
  fs.writeFileSync(path.join(OUT, 'frames.json'), JSON.stringify(log));
  console.log('готово:', FRAMES, log.length, 'кадров');
  await browser.close();
})();
