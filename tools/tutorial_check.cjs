#!/usr/bin/env node
// Мини-обучение первого раунда: чистый профиль (runs 0), снимок на каждом шаге.  node tools/tutorial_check.cjs
// Кадры: art/check/tut/<устройство>_<шаг>.jpg
const path = require('node:path');
const fs = require('node:fs');
function loadPlaywright() {
  const tries = [process.env.PLAYWRIGHT_PATH, 'playwright', path.resolve(__dirname, '../../Одна кнопка/node_modules/playwright'), path.resolve(__dirname, '../../Фура рогалик/node_modules/playwright')];
  for (const t of tries) { if (!t) continue; try { return require(t); } catch { /* дальше */ } }
  throw new Error('playwright не найден');
}
const OUT = path.resolve(__dirname, '../art/check/tut');
fs.mkdirSync(OUT, { recursive: true });
const DEVICES = [
  ['desktop', { viewport: { width: 1366, height: 768 } }],
  ['phone_port', { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }],
  ['phone_land', { viewport: { width: 844, height: 390 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }],
];
(async () => {
  const { chromium } = loadPlaywright();
  const browser = await chromium.launch({ headless: true, args: ['--use-angle=d3d11', '--enable-gpu', '--ignore-gpu-blocklist'] });
  for (const [name, opts] of DEVICES) {
    const ctx = await browser.newContext({ ...opts, locale: process.argv.includes('--lang=en') ? 'en-US' : 'ru-RU' });
    const page = await ctx.newPage();
    page.on('pageerror', (e) => console.log(name, 'ОШИБКА', e.message));
    await page.goto('http://127.0.0.1:5210/');
    await page.waitForFunction(() => document.getElementById('splash')?.classList.contains('done') && window.__tut, null, { timeout: 60000 });
    await page.evaluate(() => { window.__god = true; });
    const tut = () => page.evaluate(() => window.__tut());
    const shot = async (s) => page.screenshot({ path: path.join(OUT, `${name}_${s}.jpg`), type: 'jpeg', quality: 80 });
    await page.waitForTimeout(2200);
    console.log(name, 'шаг:', await tut()); await shot('1stop');
    for (let i = 0; i < 3; i++) { await page.evaluate(() => window.__reels.press()); await page.waitForTimeout(250); }
    await page.waitForFunction(() => !window.__reels.spinning, null, { timeout: 10000 });
    await page.waitForTimeout(500);
    console.log(name, 'шаг:', await tut()); await shot('2move');
    await page.keyboard.down('KeyW'); await page.waitForTimeout(1600); await page.keyboard.up('KeyW');
    await page.waitForTimeout(300);
    console.log(name, 'шаг:', await tut()); await shot('3jump');
    await page.keyboard.down('Space'); await page.waitForTimeout(150); await page.keyboard.up('Space'); await page.waitForTimeout(300);
    console.log(name, 'шаг:', await tut()); await shot('4goal');
    await page.waitForTimeout(4000);
    console.log(name, 'шаг:', await tut());
    await ctx.close();
  }
  await browser.close();
})();
