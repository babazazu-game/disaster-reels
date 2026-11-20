#!/usr/bin/env node
// Отдать Codex CLI кусок кода: он правит файлы проекта сам (песочница workspace-write), мы потом проверяем.
//
//   node tools/codex_code.cjs tools/codex_tasks/<задание>.md [модель=gpt-6.2-sol] [усилие=medium]
//
// Итоговый ответ Codex — рядом с заданием: <задание>.answer.md. Git ему трогать запрещено в тексте задания.
const { spawnSync } = require('node:child_process');
const path = require('node:path');
const fs = require('node:fs');

const [task, model = 'gpt-6.2-sol', effort = 'medium'] = process.argv.slice(2);
if (!task) { console.error('нужен файл задания'); process.exit(2); }
const root = path.resolve(__dirname, '..');
const prompt = fs.readFileSync(task, 'utf8');
const out = task.replace(/\.md$/, '') + '.answer.md';
const win = process.platform === 'win32';
// codex на Windows — обёртка .cmd: зовём его JS напрямую, как в codex_image.cjs
const npmRoot = spawnSync(win ? 'npm.cmd' : 'npm', ['root', '-g'], { encoding: 'utf8', shell: win }).stdout.trim();
const entry = path.join(npmRoot, '@openai', 'codex', 'bin', 'codex.js');
const args = ['exec', '--skip-git-repo-check', '-C', root, '-s', 'workspace-write', '-m', model, '-c', `model_reasoning_effort=${effort}`, '-o', path.resolve(out), '-'];
const t0 = Date.now();
const r = spawnSync(process.execPath, [entry, ...args], { input: prompt, encoding: 'utf8', timeout: 1800000, maxBuffer: 128 * 1024 * 1024, cwd: root });
if (r.error) console.error(String(r.error));
console.log(`codex: код ${r.status}, ${Math.round((Date.now() - t0) / 1000)} с, ответ → ${out}`);
if (r.status !== 0) console.log((r.stderr || '').slice(-3000));
