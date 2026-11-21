#!/usr/bin/env node
// Таблица рекордов: тип у Bridge, кнопка в меню, экран на трёх устройствах, очки растут после раунда.
//   node tools/board_check.cjs   → art/check/board/*.jpg
const path = require('node:path'); const fs = require('node:fs');
function loadPlaywright() {
  for (const t of [process.env.PLAYWRIGHT_PATH, 'playwright', path.resolve(__dirname, '../../Одна кнопка/node_modules/playwright'), path.resolve(__dirname, '../../Фура рогалик/node_modules/playwright')]) { if (!t) continue; try { return require(t); } catch { /* дальше */ } }
  throw new Error('playwright не найден');
}
const OUT = path.resolve(__dirname, '../art/check/board'); fs.mkdirSync(OUT, { recursive: true });
const DEV = [['phone_port', 390, 844, true], ['phone_land', 844, 390, true], ['desktop', 1440, 900, false]];
(async () => {
  const { chromium } = loadPlaywright();
  const browser = await chromium.launch({ headless: true, args: ['--use-angle=d3d11', '--enable-gpu', '--ignore-gpu-blocklist'] });
  let bad = 0;
  for (const [name, w, h, touch] of DEV) {
    const page = await (await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2, hasTouch: touch, isMobile: touch, locale: 'ru-RU' })).newPage();
    const errs = []; page.on('pageerror', (e) => errs.push(e.message));
    await page.goto('http://127.0.0.1:5210/?q=1');
    await page.waitForFunction(() => document.getElementById('splash')?.classList.contains('done') && window.__ui, null, { timeout: 60000 });
    const info = await page.evaluate(() => ({ platform: window.bridge.platform.id, type: window.bridge.leaderboards.type }));
    // раунд → итог (победа) → очки должны вырасти
    const before = await page.evaluate(() => JSON.parse(localStorage.getItem('disaster-reels-v1') || '{}').score ?? 0);
    await page.evaluate(() => { window.__ui.round(); window.__ui.result(true); });
    await page.waitForTimeout(1200);
    await page.evaluate(() => window.__ui.main());
    await page.waitForTimeout(800);
    const btn = await page.evaluate(() => { const b = document.querySelector('.mnu-board'); return b ? !b.hidden && b.getBoundingClientRect().width > 0 : false; });
    await page.screenshot({ path: path.join(OUT, `${name}_menu.jpg`), type: 'jpeg', quality: 80 });
    await page.evaluate(() => document.querySelector('.mnu-board')?.click());
    await page.waitForTimeout(900);
    const rows = await page.evaluate(() => ({ n: document.querySelectorAll('.lb-list .lb-row').length, me: document.querySelector('.lb-list .lb-me .lb-name')?.textContent, note: !document.querySelector('.lb-note')?.hidden, over: [...document.querySelectorAll('.lb-row')].some((r) => r.scrollWidth > r.clientWidth + 1) }));
    await page.screenshot({ path: path.join(OUT, `${name}_board.jpg`), type: 'jpeg', quality: 80 });
    await page.keyboard.press('Enter');   // не должен запустить раунд под окном
    await page.waitForTimeout(300);
    const modeUnder = await page.evaluate(() => window.__mode());
    await page.evaluate(() => document.querySelector('.lb-overlay .chr-back')?.click());
    await page.waitForTimeout(500);
    const closed = await page.evaluate(() => document.querySelector('.lb-overlay').inert && !document.querySelector('.mnu-main').hidden);
    const after = await page.evaluate(() => window.__score?.() ?? null);
    console.log(name, JSON.stringify({ ...info, btn, rows, modeUnder, closed, errs }));
    if (!btn || rows.n < 5 || !closed || modeUnder === 'round' || errs.length || rows.over) bad++;
  }
  await browser.close();
  console.log(bad ? `ПРОБЛЕМ: ${bad}` : 'ошибок нет');
})();
