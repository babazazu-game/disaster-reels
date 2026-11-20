#!/usr/bin/env node
// Фоны для обложек Playgama: чистый кадр хаоса без интерфейса в трёх форматах (только локально).
//   node tools/store_covers.cjs     → store/playgama/bg_landscape.png (1920×1080), bg_portrait.png (1080×1920), bg_square.png (1200×1200)
// Логотип накладывает tools/store_make.py.
const path = require('node:path');
const fs = require('node:fs');
function loadPlaywright() {
  const tries = [process.env.PLAYWRIGHT_PATH, 'playwright', path.resolve(__dirname, '../../Одна кнопка/node_modules/playwright'), path.resolve(__dirname, '../../Фура рогалик/node_modules/playwright')];
  for (const t of tries) { if (!t) continue; try { return require(t); } catch { /* дальше */ } }
  throw new Error('playwright не найден');
}
const OUT = path.resolve(__dirname, '../store/playgama');
fs.mkdirSync(OUT, { recursive: true });
const SIZES = [['landscape', 1920, 1080], ['portrait', 1080, 1920], ['square', 1200, 1200]];

(async () => {
  const { chromium } = loadPlaywright();
  const browser = await chromium.launch({ headless: true, args: ['--use-angle=d3d11', '--enable-gpu', '--ignore-gpu-blocklist'] });
  for (const [name, w, h] of SIZES) {
    const page = await (await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, locale: 'en-US' })).newPage();
    page.on('pageerror', (e) => console.log('ОШИБКА', e.message));
    await page.goto('http://127.0.0.1:5210/?lang=en&q=3&nofps=1');
    await page.waitForFunction(() => document.getElementById('splash')?.classList.contains('done') && window.__ui, null, { timeout: 60000 });
    const t = await page.evaluate(() => {
      const W = window;
      W.__god = true;
      W.__renderer.setAnimationLoop(null);
      W.__ui.round(); W.__ui.result(false);
      W.__restart('chaos');
      // гоним раунд вслепую до плотного хаоса, барабан жмём сам
      for (let i = 0; i < 30 * 30; i++) { if (W.__reels.spinning && i % 10 === 0) W.__reels.press(); W.__tick(1 / 30); }
      return W.__state().t;
    });
    // кадр без интерфейса: прячем весь DOM поверх холста
    await page.addStyleTag({ content: '#game > :not(canvas){visibility:hidden!important}' });
    await page.evaluate(() => { const W = window; W.__cam.yaw += 0.6; for (let i = 0; i < 20; i++) W.__tick(1 / 30); W.__renderer.render(W.__scene, W.__cam.camera); });
    await page.screenshot({ path: path.join(OUT, `bg_${name}.png`) });
    console.log(name, 't=', t.toFixed(1));
  }
  await browser.close();
})();
