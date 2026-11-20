import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve, sep } from 'node:path';

/**
 * Только в разработке: приёмник кадров. Страница шлёт POST /__shot?name=dir/file.png с dataURL в теле —
 * файл ложится в art/<name>. Так снимаются скриншоты витрин, кадры ролика и проверочные снимки
 * (в скрытом окне браузера кадр иначе не забрать).
 */
const shotSink = {
  name: 'shot-sink',
  apply: 'serve' as const,
  configureServer(server: { middlewares: { use: (path: string, fn: (req: any, res: any) => void) => void } }) {
    const root = resolve(fileURLToPath(new URL('.', import.meta.url)), 'art');
    server.middlewares.use('/__shot', (req, res) => {
      const name = new URL(req.url ?? '', 'http://x').searchParams.get('name') ?? 'shot.png';
      const out = resolve(root, name);
      if (!out.startsWith(root + sep) || !/\.(png|jpg|webp)$/i.test(out)) { res.statusCode = 400; res.end('bad name'); return; }
      const parts: Buffer[] = [];
      req.on('data', (c: Buffer) => parts.push(c));
      req.on('end', () => {
        const body = Buffer.concat(parts).toString();
        const b64 = body.slice(body.indexOf(',') + 1);
        mkdirSync(dirname(out), { recursive: true });
        writeFileSync(out, Buffer.from(b64, 'base64'));
        res.end('ok');
      });
    });
  },
};

/** Vite ставит crossorigin на скрипты — CDN Яндекса с ним блокирует бандл. Убираем. */
const noCrossorigin = {
  name: 'no-crossorigin',
  transformIndexHtml: { order: 'post' as const, handler: (html: string) => html.replace(/ crossorigin(="[^"]*")?/g, '') },
};

export default defineConfig({
  plugins: [noCrossorigin, shotSink],
  // метка сборки: дописывается к ассетам, которые грузятся по строке (атлас барабана)
  define: { __BUILD__: JSON.stringify(Date.now().toString(36)) },
  resolve: {
    alias: {
      // Каркас подключается ИСХОДНИКАМИ, а не собранным пакетом.
      //
      // Так правка в yg-core сразу видна во всех играх, без публикации и
      // переустановки. Обратная сторона: сломав каркас, ломаешь все игры
      // разом, — поэтому в нём есть typecheck, и гонять его надо перед
      // коммитом.
      // Площадка — Playgama: слой Bridge (src/platform-core) подменяет yg-core под тем же именем.
      'yg-core': fileURLToPath(new URL('./src/platform-core/index.ts', import.meta.url)),
    },
  },
  // Площадка распаковывает архив в подкаталог, поэтому все пути обязаны быть
  // относительными. Абсолютные дают чёрный экран.
  base: './',
  build: {
    target: 'es2020',
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        // хэш в имени — иначе браузер и CDN GitHub Pages отдают старый game.js после выкладки
        // (заказчик видел старую версию, хотя новая уже лежала на сайте)
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name][extname]',
      },
    },
  },
  server: { host: '127.0.0.1', port: 5210 },
});
