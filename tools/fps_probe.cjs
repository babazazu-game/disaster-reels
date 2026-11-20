#!/usr/bin/env node
// Что стоит кадра: тот же раунд, по очереди выключаем по одной вещи и меряем FPS 3 с (GPU этой машины).
//   node tools/fps_probe.cjs [--size=1920x1080] [--q=1] [--qs=aa=0]
const path = require('node:path');
function loadPlaywright() {
  const tries = [process.env.PLAYWRIGHT_PATH, 'playwright', path.resolve(__dirname, '../../Одна кнопка/node_modules/playwright'), path.resolve(__dirname, '../../Фура рогалик/node_modules/playwright')];
  for (const t of tries) { if (!t) continue; try { return require(t); } catch { /* дальше */ } }
  throw new Error('playwright не найден');
}
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith(`--${k}=`)); return a ? a.split('=').slice(1).join('=') : d; };
const [W, H] = arg('size', '1920x1080').split('x').map(Number);
const QS = [`q=${arg('q', '1')}`, arg('qs', '')].filter(Boolean).join('&');

(async () => {
  const { chromium } = loadPlaywright();
  const browser = await chromium.launch({ headless: true, args: ['--use-angle=d3d11', '--enable-gpu', '--ignore-gpu-blocklist'] });
  const page = await (await browser.newContext({ viewport: { width: W, height: H } })).newPage();
  page.on('pageerror', (e) => console.log('ОШИБКА', e.message));
  await page.goto(`http://127.0.0.1:5210/?${QS}`);
  await page.waitForFunction(() => typeof window.__restart === 'function' && document.getElementById('splash')?.classList.contains('done'), null, { timeout: 60000 });
  await page.waitForTimeout(1500);
  // раунд с хаосом: бессмертие, барабан жмём сами, ждём, пока накопится
  await page.evaluate(() => {
    window.__god = true; window.__restart('chaos');
    const s = { frames: 0 }; window.__fp = s;
    const loop = () => { s.frames++; if (window.__reels.spinning && Math.random() < 0.05) window.__reels.press(); requestAnimationFrame(loop); };
    requestAnimationFrame(loop);
  });
  await page.waitForTimeout(14000);
  const fps = async () => { await page.evaluate(() => { window.__fp.frames = 0; }); await page.waitForTimeout(3000); return page.evaluate(() => window.__fp.frames / 3); };
  const variants = [
    ['база', '', ''],
    ['без теней', 'R.shadowMap.enabled=false; upd();', 'R.shadowMap.enabled=true; upd();'],
    ['без env-карты', 'W.__env=S.environment; S.environment=null; upd();', 'S.environment=W.__env; upd();'],
    ['Lambert вместо Standard', `W.__sw=[]; S.traverse(o=>{const m=o.material; if(o.isMesh&&m&&m.isMeshStandardMaterial){const l=new THREE.MeshLambertMaterial({color:m.color,map:m.map,vertexColors:m.vertexColors,transparent:m.transparent,opacity:m.opacity,side:m.side}); W.__sw.push([o,m]); o.material=l;}});`, 'W.__sw.forEach(([o,m])=>o.material=m);'],
    ['без прозрачных', `W.__tr=[]; S.traverse(o=>{const m=o.material; if((o.isMesh||o.isSprite||o.isPoints)&&m&&!Array.isArray(m)&&m.transparent&&o.visible){W.__tr.push(o); o.visible=false;}});`, 'W.__tr.forEach(o=>o.visible=true);'],
    ['без неба-купола', 'S.children[0].visible=false;', 'S.children[0].visible=true;'],
    ['без тонмаппинга', 'W.__tm=R.toneMapping; R.toneMapping=0; upd();', 'R.toneMapping=W.__tm; upd();'],
    ['пиксели ×0.75', 'W.__pr=R.getPixelRatio(); R.setPixelRatio(0.75); R.setSize(innerWidth,innerHeight);', 'R.setPixelRatio(W.__pr); R.setSize(innerWidth,innerHeight);'],
    ['только арена (без существ/ботов/эффектов)', `W.__hid=[]; S.children.forEach((o,i)=>{ if(i>16 && o.visible){W.__hid.push(o); o.visible=false;} });`, 'W.__hid.forEach(o=>o.visible=true);'],
  ];
  for (const [name, on, off] of variants) {
    await page.evaluate((code) => { const W = window, R = W.__renderer, S = W.__scene, THREE = W.__THREE; const upd = () => S.traverse((o) => { const m = o.material; if (m) (Array.isArray(m) ? m : [m]).forEach((x) => { x.needsUpdate = true; }); }); eval(code); }, on);
    await page.waitForTimeout(800);
    const f = await fps();
    console.log(`${name.padEnd(42)} ${f.toFixed(1)} FPS  DC ${await page.evaluate(() => window.__renderer.info.render.calls)}`);
    await page.evaluate((code) => { const W = window, R = W.__renderer, S = W.__scene; const upd = () => S.traverse((o) => { const m = o.material; if (m) (Array.isArray(m) ? m : [m]).forEach((x) => { x.needsUpdate = true; }); }); eval(code); }, off);
    await page.waitForTimeout(500);
  }
  await browser.close();
})();
