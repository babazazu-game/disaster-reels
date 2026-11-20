#!/usr/bin/env node
// Замер настоящего FPS на видеокарте этой машины: окно Chromium с GPU (ANGLE D3D11), игра идёт своим циклом.
//
//   node tools/fps.cjs [секунд=25] [--q=2] [--size=1280x720] [--diff=chaos] [--mobile]
//
// Нужен dev-сервер (http://127.0.0.1:5210). Каждые 5 с печатает средний FPS, худший кадр, уровень качества
// и число вызовов отрисовки; барабан останавливает сам (СТОП случайно), чтобы хаос копился как в игре.
const path = require('node:path');

function loadPlaywright() {
  const tries = [process.env.PLAYWRIGHT_PATH, 'playwright', path.resolve(__dirname, '../../Одна кнопка/node_modules/playwright'), path.resolve(__dirname, '../../Фура рогалик/node_modules/playwright')];
  for (const t of tries) { if (!t) continue; try { return require(t); } catch { /* дальше */ } }
  throw new Error('playwright не найден: задайте PLAYWRIGHT_PATH');
}
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith(`--${k}=`)); return a ? a.split('=')[1] : d; };
const SECS = Number(process.argv.find((a) => /^\d+$/.test(a)) || 25);
const Q = arg('q', '');
const [W, H] = arg('size', '1280x720').split('x').map(Number);
const DIFF = arg('diff', 'chaos');
const MOBILE = process.argv.includes('--mobile');
const QS = [Q ? `q=${Q}` : '', arg('qs', '')].filter(Boolean).join('&');   // --qs=aa=0&tex=0 — переключатели замеров

(async () => {
  const { chromium } = loadPlaywright();
  const browser = await chromium.launch({ headless: true, args: ['--use-angle=d3d11', '--enable-gpu', '--ignore-gpu-blocklist', '--disable-frame-rate-limit=false', `--window-size=${W + 20},${H + 140}`] });
  const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: MOBILE ? 2.5 : 1, isMobile: MOBILE, hasTouch: MOBILE });
  const page = await ctx.newPage();
  // Долгие вызовы WebGL (компиляция/линковка шейдеров, ожидание GPU): печатаем, что именно ждали.
  await page.addInitScript(() => {
    const slow = []; window.__glSlow = slow;
    const names = new WeakMap();
    for (const C of [WebGL2RenderingContext, WebGLRenderingContext]) {
      const P = C.prototype;
      const sh = P.shaderSource;
      P.shaderSource = function (s, src) { const m = /SHADER_NAME (\S+)/.exec(src) || /#define (USE_\w+)/.exec(src); names.set(s, (m ? m[1] : '?') + (src.includes('USE_INSTANCING') ? '+inst' : '') + (src.includes('USE_SKINNING') ? '+skin' : '') + (src.includes('DEPTH_PACKING') ? '+depth' : '')); return sh.call(this, s, src); };
      const att = P.attachShader;
      P.attachShader = function (pr, s) { names.set(pr, (names.get(pr) ? names.get(pr) + '|' : '') + (names.get(s) || '?')); return att.call(this, pr, s); };
      for (const fn of ['linkProgram', 'getProgramParameter', 'getShaderParameter', 'getProgramInfoLog', 'readPixels', 'getError', 'finish', 'texImage2D', 'texSubImage2D', 'useProgram', 'drawElements', 'drawArrays', 'drawElementsInstanced', 'drawArraysInstanced', 'bufferData']) {
        const f = P[fn]; if (!f) continue;
        P[fn] = function (...a) { const t = performance.now(); const r = f.apply(this, a); const d = performance.now() - t; if (d > 40) slow.push(`${fn} ${Math.round(d)}мс ${a[0] && names.get(a[0]) ? names.get(a[0]) : ''}`); return r; };
      }
    }
  });
  page.on('pageerror', (e) => console.log('ОШИБКА', e.message));
  await page.goto(`http://127.0.0.1:5210/${QS ? `?${QS}` : ''}`);
  await page.waitForFunction(() => typeof window.__restart === 'function' && document.getElementById('splash')?.classList.contains('done'), null, { timeout: 60000 });
  await page.waitForTimeout(1500);
  const gpu = await page.evaluate(() => { const gl = window.__renderer.getContext(); const e = gl.getExtension('WEBGL_debug_renderer_info'); return e ? gl.getParameter(e.UNMASKED_RENDERER_WEBGL) : '?'; });
  console.log('GPU:', gpu);
  await page.evaluate((d) => {
    window.__restart(d);
    const s = { frames: 0, worst: 0, last: performance.now(), long: 0 };
    window.__fps = s;
    s.lt = [];
    try { new PerformanceObserver((l) => { for (const e of l.getEntries()) if (e.duration > 150) s.lt.push(Math.round(e.duration)); }).observe({ type: 'longtask', buffered: false }); } catch { /* нет longtask */ }
    const loop = () => {
      const now = performance.now(), dt = now - s.last; s.last = now;
      s.frames++; s.worst = Math.max(s.worst, dt); if (dt > 20) s.long++;
      const pr = window.__renderer.info.programs.length;
      if (dt > 250) (s.hitch ||= []).push(`${Math.round(dt)}мс прог ${s.prog}→${pr} тек ${window.__renderer.info.memory.textures} t=${window.__state().t.toFixed(1)} ${(window.__state().reels.slice(-1)[0] || '')}`);
      s.prog = pr;
      if (window.__reels.spinning && Math.random() < 0.03) window.__reels.press();
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }, DIFF);
  const all = [];
  for (let t = 0; t < SECS; t += 5) {
    await page.waitForTimeout(5000);
    const r = await page.evaluate(() => { const s = window.__fps; const o = { gl: window.__glSlow.splice(0), lt: s.lt.splice(0), hitch: (s.hitch || []).splice(0), fps: s.frames / 5, worst: Math.round(s.worst), long: s.long, q: window.__quality.preset.name, pr: window.__renderer.getPixelRatio(), calls: window.__renderer.info.render.calls, st: window.__state().state, mobs: window.__creatures.mobs.filter((m) => m.live).length }; s.frames = 0; s.worst = 0; s.long = 0; return o; });
    all.push(r.fps);
    for (const h of r.hitch) console.log('   РЫВОК', h);
    if (r.lt.length) console.log('   долгие задачи JS, мс:', r.lt.join(' '));
    for (const g of r.gl) console.log('   GL', g);
    console.log(`${t + 5}s  FPS ${r.fps.toFixed(1)}  худший ${r.worst} мс  >20мс: ${r.long}  ${r.q} ×${r.pr}  DC ${r.calls}  мобов ${r.mobs}  ${r.st}`);
    if (r.st !== 'play') await page.evaluate((d) => window.__restart(d), DIFF);
  }
  console.log('Средний FPS:', (all.reduce((a, b) => a + b, 0) / all.length).toFixed(1), ' минимум окна:', Math.min(...all).toFixed(1));
  await browser.close();
})();
