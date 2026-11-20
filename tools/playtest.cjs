#!/usr/bin/env node
// Автопрогон «Крути хаос!»: бот сам играет раунды в безоконном Chromium и считает баланс и баги.
//
//   node tools/playtest.cjs [раундов=12] [--shots]
//
// Нужен запущенный dev-сервер (npm run dev → http://127.0.0.1:5210). Время гоняется через __tick()
// без отрисовки — раунд в 60 с проходит за секунды. Боты:
//   smart — убегает от существ и меток падения, обходит огонь и край, на лаве лезет на холм;
//   idle  — стоит на месте (нижняя граница: если idle часто выживает — слишком легко).
// Результат: playtest/report.json и сводка в консоль; с --shots — кадры в playtest/shots/.
//
// Playwright берём из соседнего проекта (браузер уже скачан), чтобы не тянуть его сюда.

const path = require('node:path');
const fs = require('node:fs');

function loadPlaywright() {
  const tries = [process.env.PLAYWRIGHT_PATH, 'playwright', path.resolve(__dirname, '../../Одна кнопка/node_modules/playwright'), path.resolve(__dirname, '../../Фура рогалик/node_modules/playwright')];
  for (const t of tries) { if (!t) continue; try { return require(t); } catch { /* дальше */ } }
  throw new Error('playwright не найден: задайте PLAYWRIGHT_PATH');
}

const ROUNDS = Number(process.argv.find((a) => /^\d+$/.test(a)) || 12);
const SHOTS = process.argv.includes('--shots');
const URL = process.env.GAME_URL || 'http://127.0.0.1:5210/?q=0';
const OUT = path.resolve(__dirname, '../playtest');

/** Всё, что выполняется внутри страницы: бот и сбор метрик за раунд. */
const PAGE_LIB = () => {
  const W = window;
  const key = (type, code) => dispatchEvent(new KeyboardEvent(type, { code }));
  let held = false;
  const hold = (on) => { if (on !== held) { key(on ? 'keydown' : 'keyup', 'KeyW'); held = on; } };
  let jumpT = 0;   // прыжок держим несколько кадров и отпускаем по счётчику (цикл синхронный, таймеры не успеют)
  const jump = () => { key('keydown', 'Space'); jumpT = 4; };
  // безопасные точки на финале: верх большого холма (3 м), ступени к нему, двойные ящики, башня — по высоте

  W.__pt = {
    round(bot) {
      W.__restart();
      const st = W.__state;
      const HILL = W.__hill();   // расстановка новая каждый раунд
      const log = { hits: 0, bot, survived: false, tDeath: null, cause: '', reels: [], maxMobs: 0, stuck: 0, kinds: {}, tickMs: 0, ticks: 0, stopPresses: 0, errors: [] };
      const last = new Map();   // моб → [x, z, t] для поиска застрявших
      let pressAt = -1, frames = 0, jumpCd = 0;
      const t0 = performance.now();
      for (let guard = 0; guard < 60 * 140; guard++) {
        const s = st();
        if (s.state !== 'play') break;
        frames++;
        // барабан: жмём СТОП с человеческой задержкой
        if (W.__reels.spinning) {
          if (pressAt < 0) pressAt = frames + 30 + Math.floor(Math.random() * 60);
          if (frames >= pressAt) { W.__reels.press(); log.stopPresses++; pressAt = frames + 20 + Math.floor(Math.random() * 30); }
        } else pressAt = -1;
        if (bot === 'smart') {
          const p = W.__ctl.pos;
          let fx = 0, fz = 0;
          const mobs = W.__creatures.mobs.filter((m) => m.live);
          for (const m of mobs) {
            const tx = m.phase === 'fall' ? m.tx : m.x, tz = m.phase === 'fall' ? m.tz : m.z;
            let dx = p.x - tx, dz = p.z - tz;
            if (dx * dx + dz * dz < 1e-4) { dx = 0.1; dz = 0.05; }   // стоим ровно на метке: раньше бот не получал силы и не убегал
            const d2 = dx * dx + dz * dz;
            const R = m.phase === 'fall' ? 4.5 : m.kind === 'tornado' ? 9 : m.kind === 'ufo' ? 5 : 8;
            if (d2 < R * R && d2 > 1e-4) { const k = 1 / d2; fx += dx * k; fz += dz * k; }
          }
          // огонь под ногами и рядом
          const sf = W.__surface;
          for (const [ox, oz] of [[2, 0], [-2, 0], [0, 2], [0, -2]]) if (sf.at(p.x + ox, p.z + oz) === 1) { fx -= ox * 0.15; fz -= oz * 0.15; }
          // край острова
          const H = 24;
          if (p.x > H) fx -= 3; if (p.x < -H) fx += 3; if (p.z > H) fz -= 3; if (p.z < -H) fz += 3;
          // финал: к холму, и не слезать с высоты
          if (s.t > 41) {   // как человек: по предупреждению «ЛАВА СКОРО»
            const goal = HILL.reduce((b, c) => (W.__heightAt(c[0], c[1]) > W.__heightAt(b[0], b[1]) && p.y > W.__heightAt(b[0], b[1]) - 0.2 ? c : b), HILL[0]);
            const g = p.y >= 2.9 ? HILL[2] : goal;
            const gx = g[0] - p.x, gz = g[1] - p.z, gl = Math.hypot(gx, gz);
            if (gl > 0.8) { fx += (gx / gl) * 0.6; fz += (gz / gl) * 0.6; } else { fx *= 0.15; fz *= 0.15; }
          }
          const len = Math.hypot(fx, fz);
          if (len > 0.02) {
            W.__cam.yaw = Math.atan2(-fx / len, -fz / len);
            hold(true);
            // упёрлись в уступ — прыжок
            const ax = p.x + (fx / len) * 1.2, az = p.z + (fz / len) * 1.2;
            if (jumpCd-- <= 0 && W.__heightAt(ax, az) > p.y + 0.3 && W.__ctl.grounded) { jump(); jumpCd = 20; }
          } else hold(false);
        } else hold(false);

        if (jumpT > 0 && --jumpT === 0) key('keyup', 'Space');
        const a = performance.now();
        W.__tick(1 / 60);
        log.tickMs += performance.now() - a; log.ticks++;

        // метрики существ
        const mobs = W.__creatures.mobs.filter((m) => m.live);
        log.maxMobs = Math.max(log.maxMobs, mobs.length);
        if (frames % 60 === 0) {
          for (const m of mobs) {
            if (m.phase !== 'run' || m.kind === 'slime' || m.kind === 'shark') continue;
            const prev = last.get(m);
            if (prev && s.t - prev[2] >= 3) {
              const moved = Math.hypot(m.x - prev[0], m.z - prev[1]);
              const far = Math.hypot(W.__ctl.pos.x - m.x, W.__ctl.pos.z - m.z) > 3;
              if (moved < 0.4 && far) { log.stuck++; if ((log.stuckAt = log.stuckAt || []).length < 6) log.stuckAt.push([m.kind, m.adj, +m.x.toFixed(1), +m.y.toFixed(1), +m.z.toFixed(1), +m.s.toFixed(1), m.steerT > 0 ? 'steer' : '-', W.__heightAt(m.x, m.z)]); }
              last.set(m, [m.x, m.z, s.t]);
            } else if (!prev) last.set(m, [m.x, m.z, s.t]);
          }
        }
      }
      hold(false);
      const s = st();
      log.survived = s.state === 'win';
      if (s.state === 'dead') { log.tDeath = +s.t.toFixed(1); log.cause = s.deathCause; }
      log.reels = s.reels;
      log.hits = s.hits;
      { const q = W.__ctl.pos; log.pos = [+q.x.toFixed(1), +q.y.toFixed(1), +q.z.toFixed(1)]; log.hill = HILL; log.lava = +s.lava.toFixed(2); }
      for (const m of W.__creatures.mobs.filter((q) => q.live)) log.kinds[m.kind] = (log.kinds[m.kind] || 0) + 1;
      log.tickMs = +(log.tickMs / Math.max(1, log.ticks)).toFixed(3);
      log.wallMs = Math.round(performance.now() - t0);
      return log;
    },
    draw() { W.__renderer.render(W.__scene, W.__cam.camera); return W.__renderer.info.render.calls; },
  };
};

(async () => {
  const { chromium } = loadPlaywright();
  fs.mkdirSync(path.join(OUT, 'shots'), { recursive: true });
  const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const page = await browser.newPage({ viewport: { width: 1000, height: 640 } });
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  page.on('console', (m) => { if (m.type() === 'error' && !/sdk\.js|favicon|404/.test(m.text())) errors.push(m.text()); });
  try { await page.goto(URL, { waitUntil: 'load', timeout: 30000 }); }
  catch (e) { console.error(`Нет игры по ${URL} — запустите dev-сервер (npm run dev). ${e.message}`); process.exit(2); }
  await page.waitForFunction(() => typeof window.__tick === 'function' && window.__state, null, { timeout: 30000 });
  await page.evaluate(() => { document.querySelectorAll('[class*=splash],#splash').forEach((e) => e.remove()); });
  // останавливаем собственный цикл игры: время двигает только бот
  await page.evaluate(() => window.__renderer.setAnimationLoop(null));
  await page.evaluate(PAGE_LIB);

  const rounds = [];
  for (let i = 0; i < ROUNDS; i++) {
    const bot = i % 3 === 2 ? 'idle' : 'smart';
    const r = await page.evaluate((b) => window.__pt.round(b), bot);
    rounds.push(r);
    console.log(`#${i + 1} ${bot.padEnd(5)} ${r.survived ? 'ВЫЖИЛ ' : `погиб на ${String(r.tDeath).padStart(4)} с: ${r.cause}`.padEnd(40)} | ${r.reels.join(' / ')} | ударов ${r.hits}, мобов max ${r.maxMobs}, застряли ${r.stuck}`);
    if (SHOTS && i < 3) {
      const calls = await page.evaluate(() => window.__pt.draw());
      await page.screenshot({ path: path.join(OUT, 'shots', `round${i + 1}_end.png`) });
      r.drawCalls = calls;
    }
  }
  // кадр посреди хаоса: третий барабан + финал
  if (SHOTS) {
    await page.evaluate(() => { window.__god = true; window.__restart(); });
    for (let k = 0; k < 50; k++) await page.evaluate(() => { for (let i = 0; i < 60; i++) { if (window.__reels.spinning && Math.random() < 0.05) window.__reels.press(); window.__tick(1 / 60); } });
    const calls = await page.evaluate(() => window.__pt.draw());
    await page.screenshot({ path: path.join(OUT, 'shots', 'mid_chaos_50s.png') });
    console.log(`кадр на 50-й секунде: вызовов отрисовки ${calls}`);
  }

  const smart = rounds.filter((r) => r.bot === 'smart'), idle = rounds.filter((r) => r.bot === 'idle');
  const rate = (a) => (a.length ? Math.round((100 * a.filter((r) => r.survived).length) / a.length) : 0);
  const causes = {};
  for (const r of rounds) if (r.cause) causes[r.cause] = (causes[r.cause] || 0) + 1;
  const summary = {
    rounds: rounds.length,
    survive: { smart: rate(smart) + '%', idle: rate(idle) + '%' },
    avgDeathSec: { smart: avg(smart.filter((r) => r.tDeath).map((r) => r.tDeath)), idle: avg(idle.filter((r) => r.tDeath).map((r) => r.tDeath)) },
    causes,
    avgHits: avg(rounds.map((r) => r.hits)),
    stuckTotal: rounds.reduce((a, r) => a + r.stuck, 0),
    maxMobs: Math.max(...rounds.map((r) => r.maxMobs)),
    simMsPerTick: avg(rounds.map((r) => r.tickMs)),
    errors: [...new Set(errors)].slice(0, 20),
  };
  fs.writeFileSync(path.join(OUT, 'report.json'), JSON.stringify({ summary, rounds }, null, 2));
  console.log('\nИТОГ', JSON.stringify(summary, null, 2));
  await browser.close();
})();

function avg(a) { return a.length ? +(a.reduce((x, y) => x + y, 0) / a.length).toFixed(1) : null; }
