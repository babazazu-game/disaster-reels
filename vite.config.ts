import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

/** Vite ставит crossorigin на скрипты — CDN Яндекса с ним блокирует бандл. Убираем. */
const noCrossorigin = {
  name: 'no-crossorigin',
  transformIndexHtml: { order: 'post' as const, handler: (html: string) => html.replace(/ crossorigin(="[^"]*")?/g, '') },
};

export default defineConfig({
  plugins: [noCrossorigin],
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
      'yg-core': fileURLToPath(new URL('../yg-core/src/index.ts', import.meta.url)),
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
