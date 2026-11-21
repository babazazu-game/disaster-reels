// Проверка пальм на «Пирамиде»: с каменного блока рядом можно запрыгнуть на крону и устоять (заказчик 21.11:
// «пальмы прозрачные, не могу на них встать»). Для каждой пальмы: ставим игрока на край блока, жмём прыжок
// и бег к кроне, смотрим, что стоит на высоте кроны. Плюс скриншот сверху.
//
//   node tools/palm_check.cjs      (нужен dev-сервер на 5210)
const path = require('path');
function loadPlaywright() {
  for (const t of [process.env.PLAYWRIGHT_PATH, 'playwright', path.resolve(__dirname, '../../Одна кнопка/node_modules/playwright'), path.resolve(__dirname, '../../Фура рогалик/node_modules/playwright')]) { if (!t) continue; try { return require(t); } catch { /* дальше */ } }
  throw new Error('playwright не найден');
}
const { chromium } = loadPlaywright();

(async () => {
  const browser = await chromium.launch({ headless: true, args: ['--use-angle=d3d11', '--enable-gpu', '--ignore-gpu-blocklist'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('http://127.0.0.1:5210/?nofps=1');
  await page.waitForFunction(() => typeof window.__restart === 'function' && document.getElementById('splash')?.classList.contains('done'), null, { timeout: 90000 });
  const out = [];
  for (let round = 0; round < 4; round++) {
    const r = await page.evaluate(() => {
      const W = window, T = W.__THREE, P = W.__physics;
      W.__god = true;
      W.__map('pyramid');
      W.__restart('easy');
      const crowns = P.solids.filter((s) => s.kind === 'leaf');
      const rows = [];
      for (const c of crowns) {
        const cx = (c.box.min.x + c.box.max.x) / 2, cz = (c.box.min.z + c.box.max.z) / 2;
        // блок-ступенька: твёрдый куб 2×2×2 в 2,5–4,5 м от центра кроны
        const step = P.solids.find((s) => !s.kind && Math.abs(s.box.max.y - 2) < 0.05 && Math.abs(s.box.max.x - s.box.min.x - 2) < 0.1 && Math.abs(s.box.max.z - s.box.min.z - 2) < 0.1
          && Math.hypot((s.box.min.x + s.box.max.x) / 2 - cx, (s.box.min.z + s.box.max.z) / 2 - cz) < 3.6);
        if (!step) { rows.push({ crown: [cx, cz], step: false }); continue; }
        const sx = (step.box.min.x + step.box.max.x) / 2, sz = (step.box.min.z + step.box.max.z) / 2;
        const d = new T.Vector3(cx - sx, 0, cz - sz).normalize();
        // встаём на ближний к кроне край блока и прыгаем вперёд на полной скорости бега (как ребёнок жмёт W + пробел)
        const pos = new T.Vector3(sx + d.x * 0.95, 2.001, sz + d.z * 0.95);
        const vel = new T.Vector3(d.x * 8, 13, d.z * 8);
        let landed = null, t = 0;
        for (; t < 2; t += 1 / 60) {
          vel.y = Math.max(vel.y - 34 / 60, -45);
          vel.x = d.x * 8; vel.z = d.z * 8;   // кнопка вперёд зажата: управление в воздухе снова даёт ход после упора
          const m = P.move(pos, vel, 1 / 60);
          if (m.grounded && t > 0.1) { landed = m.ground; break; }
        }
        // постоять 1 с на месте: не проваливается ли
        let stays = false;
        if (landed && landed.kind === 'leaf') {
          vel.set(0, 0, 0);
          for (let k = 0; k < 60; k++) { vel.y = Math.max(vel.y - 34 / 60, -45); P.move(pos, vel, 1 / 60); }
          stays = Math.abs(pos.y - landed.box.max.y) < 0.05;
        }
        rows.push({ crown: [+cx.toFixed(1), +cz.toFixed(1)], step: true, landedOn: landed ? (landed.kind || 'solid') : 'ground', y: +pos.y.toFixed(2), stays });
      }
      return rows;
    });
    out.push(...r);
  }
  console.log(out.map((r) => JSON.stringify(r)).join('\n'));
  const ok = out.filter((r) => r.step && r.landedOn === 'leaf' && r.stays).length;
  console.log(`пальм: ${out.length}, со ступенькой: ${out.filter((r) => r.step).length}, запрыгнул и устоял: ${ok}`);
  await page.evaluate(() => { window.__god = true; window.__map('pyramid'); window.__restart('easy'); });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.resolve(__dirname, '../art/check/palms.jpg'), quality: 80 });
  if (errors.length) console.log('ОШИБКИ:', errors);
  await browser.close();
})();
