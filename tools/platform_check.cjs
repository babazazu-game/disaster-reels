#!/usr/bin/env node
// Проверка правил площадки в живом браузере: Bridge поднялся, язык, ошибки консоли, авто-пауза
// (скрытая вкладка, потеря фокуса окна), Esc ничего не делает, P ставит паузу.   node tools/platform_check.cjs [--lang=en]
const path = require('node:path');
function loadPlaywright() {
  const tries = [process.env.PLAYWRIGHT_PATH, 'playwright', path.resolve(__dirname, '../../Одна кнопка/node_modules/playwright'), path.resolve(__dirname, '../../Фура рогалик/node_modules/playwright')];
  for (const t of tries) { if (!t) continue; try { return require(t); } catch { /* дальше */ } }
  throw new Error('playwright не найден');
}
const URL_ = process.argv.find((a) => a.startsWith('http')) || 'http://127.0.0.1:5210/';
(async () => {
  const { chromium } = loadPlaywright();
  const browser = await chromium.launch({ headless: true, args: ['--use-angle=d3d11', '--enable-gpu', '--ignore-gpu-blocklist'] });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 }, locale: process.argv.includes('--lang=en') ? 'en-US' : 'ru-RU' });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  page.on('console', (m) => { if (m.type() === 'error' && !/favicon/.test(m.text())) errors.push(m.text().slice(0, 200)); });
  page.on('response', (r) => { if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`); });
  await page.goto(URL_);
  await page.waitForFunction(() => document.getElementById('splash')?.classList.contains('done'), null, { timeout: 60000 });
  const info = await page.evaluate(() => ({ platform: window.bridge?.platform?.id, lang: window.bridge?.platform?.language, htmlLang: document.documentElement.lang, title: document.title }));
  console.log('Bridge:', JSON.stringify(info));
  console.log('старт:', JSON.stringify(await page.evaluate(() => ({ hidden: document.hidden, paused: window.__paused(), mode: window.__mode(), t: window.__state().t }))));
  const mode = () => page.evaluate(() => window.__mode());
  // в раунде?
  await page.waitForTimeout(1500);
  await page.evaluate(() => { for (let i = 0; i < 3; i++) window.__reels?.press(); });
  await page.waitForTimeout(800);
  // 1) потеря фокуса окна
  await page.evaluate(() => window.dispatchEvent(new Event('blur')));
  await page.waitForTimeout(400);
  console.log('после blur — режим:', await mode(), '(ждём pause)');
  console.log('  мир заморожен:', await page.evaluate(() => window.__paused()));
  await page.evaluate(() => window.dispatchEvent(new Event('focus')));
  await page.waitForTimeout(200);
  console.log('  фокус вернулся — мир заморожен:', await page.evaluate(() => window.__paused()), '(ждём false, экран паузы остаётся до нажатия)');
  await page.keyboard.press('KeyP');
  await page.waitForTimeout(400);
  console.log('после P — режим:', await mode(), '(ждём round)');
  // 2) Esc — ничего
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);
  console.log('после Esc — режим:', await mode(), '(ждём round: Esc не занят)');
  // 3) P — пауза
  await page.keyboard.press('KeyP');
  await page.waitForTimeout(300);
  console.log('после P в игре — режим:', await mode(), '(ждём pause)');
  await page.keyboard.press('KeyP'); await page.waitForTimeout(300);
  console.log('снова P — режим:', await mode(), '(ждём round)');
  // 4) скрытая вкладка
  await page.evaluate(() => { Object.defineProperty(document, 'hidden', { configurable: true, get: () => true }); document.dispatchEvent(new Event('visibilitychange')); });
  await page.waitForTimeout(300);
  console.log('вкладка скрыта — режим:', await mode(), '(ждём pause)', await page.evaluate(() => ({ hidden: document.hidden, isPaused: window.bridge.platform.isPaused, inter: window.bridge.advertisement.interstitialState, t: window.__state().t, paused: window.__paused(), started: window.__state().started, reels: window.__reels.spinning })));
  console.log(errors.length ? 'ОШИБКИ:\n  ' + [...new Set(errors)].join('\n  ') : 'ошибок нет');
  await browser.close();
})();
