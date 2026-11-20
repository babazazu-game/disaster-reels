#!/usr/bin/env node
// Что внутри долгого кадра: трасса Chromium (devtools.timeline), печатаем события главного потока дольше 200 мс
// с вложенными событиями дольше 50 мс.   node tools/trace_hitch.cjs [секунд=20]
const path = require('node:path');
const fs = require('node:fs');
function loadPlaywright() {
  const tries = [process.env.PLAYWRIGHT_PATH, 'playwright', path.resolve(__dirname, '../../Одна кнопка/node_modules/playwright'), path.resolve(__dirname, '../../Фура рогалик/node_modules/playwright')];
  for (const t of tries) { if (!t) continue; try { return require(t); } catch { /* дальше */ } }
  throw new Error('playwright не найден');
}
const SECS = Number(process.argv.find((a) => /^\d+$/.test(a)) || 20);
(async () => {
  const { chromium } = loadPlaywright();
  const browser = await chromium.launch({ headless: true, args: ['--use-angle=d3d11', '--enable-gpu', '--ignore-gpu-blocklist'] });
  const page = await (await browser.newContext({ viewport: { width: 1920, height: 1080 } })).newPage();
  await page.goto('http://127.0.0.1:5210/');
  await page.waitForFunction(() => typeof window.__restart === 'function' && document.getElementById('splash')?.classList.contains('done'), null, { timeout: 60000 });
  await page.waitForTimeout(1500);
  const out = path.resolve(__dirname, '../playtest/trace.json');
  await browser.startTracing(page, { path: out, categories: ['devtools.timeline', 'disabled-by-default-devtools.timeline', 'toplevel', 'v8', 'blink', 'gpu', 'cc'] });
  await page.evaluate(() => {
    window.__restart('chaos');
    const loop = () => { if (window.__reels.spinning && Math.random() < 0.05) window.__reels.press(); if (window.__state().state !== 'play') window.__restart('chaos'); requestAnimationFrame(loop); };
    requestAnimationFrame(loop);
  });
  await page.waitForTimeout(SECS * 1000);
  await browser.stopTracing();
  await browser.close();
  const tr = JSON.parse(fs.readFileSync(out, 'utf8'));
  const ev = (tr.traceEvents || tr).filter((e) => e.ph === 'X' && e.dur);
  const names = new Map();
  for (const e of (tr.traceEvents || tr)) if (e.name === 'thread_name') names.set(`${e.pid}:${e.tid}`, e.args.name);
  const big = ev.filter((e) => e.dur > 150000 && /CrRendererMain/.test(names.get(`${e.pid}:${e.tid}`) || ''));
  const seen = new Set();
  for (const b of big.sort((a, c) => a.ts - c.ts)) {
    const key = `${b.tid}:${Math.round(b.ts / 1e5)}`; if (seen.has(key)) continue; seen.add(key);
    console.log(`\n== ${b.name} ${(b.dur / 1000).toFixed(0)} мс`);
    const kids = ev.filter((e) => e.tid === b.tid && e.pid === b.pid && e.ts >= b.ts && e.ts + e.dur <= b.ts + b.dur && e.dur > 20000 && e !== b);
    for (const k of kids.slice(0, 25)) console.log(`   ${k.name} ${(k.dur / 1000).toFixed(0)} мс ${k.args?.data?.functionName || k.args?.data?.url || ''}`);
  }
  // и на GPU-потоке
  const gpuBig = ev.filter((e) => e.dur > 300000 && /CrGpuMain|VizCompositor/.test(names.get(`${e.pid}:${e.tid}`) || ''));
  for (const g of gpuBig.slice(0, 10)) console.log(`GPU ${names.get(`${g.pid}:${g.tid}`)} ${g.name} ${(g.dur / 1000).toFixed(0)} мс`);
})();
