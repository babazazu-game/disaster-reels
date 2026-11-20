#!/usr/bin/env node
// Профиль процессора раунда (CDP Profiler) в Chromium с GPU: топ функций по собственному времени.
//   node tools/cpu_profile.cjs [секунд=15]
const path = require('node:path');
function loadPlaywright() {
  const tries = [process.env.PLAYWRIGHT_PATH, 'playwright', path.resolve(__dirname, '../../Одна кнопка/node_modules/playwright'), path.resolve(__dirname, '../../Фура рогалик/node_modules/playwright')];
  for (const t of tries) { if (!t) continue; try { return require(t); } catch { /* дальше */ } }
  throw new Error('playwright не найден');
}
const SECS = Number(process.argv.find((a) => /^\d+$/.test(a)) || 15);
(async () => {
  const { chromium } = loadPlaywright();
  const browser = await chromium.launch({ headless: true, args: ['--use-angle=d3d11', '--enable-gpu', '--ignore-gpu-blocklist'] });
  const page = await (await browser.newContext({ viewport: { width: 1920, height: 1080 } })).newPage();
  await page.goto('http://127.0.0.1:5210/');
  await page.waitForFunction(() => typeof window.__restart === 'function' && document.getElementById('splash')?.classList.contains('done'), null, { timeout: 60000 });
  await page.waitForTimeout(1500);
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('Profiler.enable');
  await cdp.send('Profiler.setSamplingInterval', { interval: 500 });
  await cdp.send('Profiler.start');
  await page.evaluate(() => {
    window.__restart('chaos');
    const loop = () => { if (window.__reels.spinning && Math.random() < 0.05) window.__reels.press(); if (window.__state().state !== 'play') window.__restart('chaos'); requestAnimationFrame(loop); };
    requestAnimationFrame(loop);
  });
  await page.waitForTimeout(SECS * 1000);
  const { profile } = await cdp.send('Profiler.stop');
  const self = new Map();
  const dt = (profile.endTime - profile.startTime) / profile.samples.length / 1000;
  const byId = new Map(profile.nodes.map((n) => [n.id, n]));
  const counts = new Map();
  for (const s of profile.samples) counts.set(s, (counts.get(s) || 0) + 1);
  for (const [id, c] of counts) {
    const n = byId.get(id), f = n.callFrame;
    const key = `${f.functionName || '(anon)'}  ${f.url.split('/').pop()}:${f.lineNumber + 1}`;
    self.set(key, (self.get(key) || 0) + c * dt);
  }
  const top = [...self].sort((a, b) => b[1] - a[1]).slice(0, 25);
  console.log(`всего ${((profile.endTime - profile.startTime) / 1e6).toFixed(1)} с`);
  for (const [k, ms] of top) console.log(`${ms.toFixed(0).padStart(7)} мс  ${k}`);
  await browser.close();
})();
