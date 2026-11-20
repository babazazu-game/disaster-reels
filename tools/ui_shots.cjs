#!/usr/bin/env node
// Снимки всех экранов на разных устройствах — искать наложения текста и кнопок.
//   node tools/ui_shots.cjs [--lang=en] [--only=phone_port]
// Кадры: art/check/ui/<устройство>_<экран>.jpg и лист-сводка art/check/ui/<устройство>_sheet.jpg.
const path = require('node:path');
const fs = require('node:fs');
const { execFileSync } = require('node:child_process');
function loadPlaywright() {
  const tries = [process.env.PLAYWRIGHT_PATH, 'playwright', path.resolve(__dirname, '../../Одна кнопка/node_modules/playwright'), path.resolve(__dirname, '../../Фура рогалик/node_modules/playwright')];
  for (const t of tries) { if (!t) continue; try { return require(t); } catch { /* дальше */ } }
  throw new Error('playwright не найден');
}
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith(`--${k}=`)); return a ? a.split('=')[1] : d; };
const LANG = arg('lang', 'ru');
const ONLY = arg('only', '');
const OUT = path.resolve(__dirname, '../art/check/ui');
fs.mkdirSync(OUT, { recursive: true });

const DEVICES = [
  ['phone_port', { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }],
  ['phone_land', { viewport: { width: 844, height: 390 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }],
  ['small_land', { viewport: { width: 667, height: 375 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }],
  ['tablet', { viewport: { width: 1024, height: 768 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true }],
  ['desktop', { viewport: { width: 1366, height: 768 }, deviceScaleFactor: 1 }],
  ['square', { viewport: { width: 700, height: 700 }, deviceScaleFactor: 1 }],   // Playgama 1.6.8: работает и в квадратном окне
  ['square_touch', { viewport: { width: 600, height: 600 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }],
];

(async () => {
  const { chromium } = loadPlaywright();
  const browser = await chromium.launch({ headless: true, args: ['--use-angle=d3d11', '--enable-gpu', '--ignore-gpu-blocklist'] });
  for (const [name, opts] of DEVICES) {
    if (ONLY && !ONLY.split(',').includes(name)) continue;
    const ctx = await browser.newContext({ ...opts, locale: LANG === 'en' ? 'en-US' : 'ru-RU' });
    const page = await ctx.newPage();
    page.on('pageerror', (e) => console.log(name, 'ОШИБКА', e.message));
    const shots = [];
    const snap = async (screen) => { const f = path.join(OUT, `${name}_${screen}.jpg`); await page.screenshot({ path: f, type: 'jpeg', quality: 80 }); shots.push(f); };
    await page.goto(`http://127.0.0.1:5210/?lang=${LANG}`);
    await page.waitForTimeout(700);
    await snap('1splash');
    await page.waitForFunction(() => typeof window.__restart === 'function' && document.getElementById('splash')?.classList.contains('done'), null, { timeout: 60000 });
    await page.waitForTimeout(800);
    // первый запуск: сразу раунд — барабан крутится
    await page.evaluate(() => { window.__god = true; window.__ui.round(); });
    await page.waitForTimeout(1200);
    await snap('2reels');
    await page.evaluate(() => { for (let i = 0; i < 3; i++) window.__reels.press(); });
    await page.waitForTimeout(1800);
    await snap('3round');
    await page.waitForTimeout(6000);
    await snap('4round_later');
    await page.evaluate(() => window.__ui.pause());
    await page.waitForTimeout(600);
    await snap('5pause');
    await page.evaluate(() => { window.__ui.round(); window.__ui.result(false); });
    await page.waitForTimeout(1500);
    await snap('6result');
    await page.evaluate(() => window.__ui.main());
    await page.waitForTimeout(800);
    await snap('7menu');
    await page.evaluate(() => window.__ui.chars());
    await page.waitForTimeout(1000);
    await snap('8chars');
    await page.evaluate(() => { document.querySelector('.chr-overlay:not(.enc-overlay) .chr-back')?.click(); window.__ui.enc(); });
    await page.waitForTimeout(800);
    await snap('9enc');
    await ctx.close();
    // лист-сводка
    const sheet = path.join(OUT, `${name}_sheet.jpg`);
    execFileSync('python', ['-c', `
import sys
from PIL import Image
fs=sys.argv[2:]; ims=[Image.open(f) for f in fs]
w,h=ims[0].size; k=min(1, 520/max(w,h)); w2,h2=int(w*k),int(h*k)
cols=4; rows=(len(ims)+cols-1)//cols
S=Image.new('RGB',(cols*w2+(cols-1)*6, rows*h2+(rows-1)*6),'white')
for i,im in enumerate(ims): S.paste(im.resize((w2,h2)), ((i%cols)*(w2+6),(i//cols)*(h2+6)))
S.save(sys.argv[1], quality=82)`, sheet, ...shots]);
    console.log(name, 'готово:', sheet);
  }
  await browser.close();
})();
