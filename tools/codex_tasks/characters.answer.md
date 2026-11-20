Добавил экран с 11 персонажами, выбором, покупкой за монеты и прогрессом за рекламу. В главном меню появились баланс и портрет выбранного персонажа. На экране итога монеты набегают за 0,6 с, а успешный просмотр рекламы удваивает награду и скрывает кнопку `×2`.

Проверил русскую и английскую версии в Chromium на 360×640, 640×360 и 1920×1080. Проверил прокрутку свайпом, заглушки для отсутствующих картинок и состояния рекламных кнопок с тестовыми ответами. Временный демо-файл удалён. `npx tsc --noEmit -p .` прошёл без ошибок.

**API**

- [characters.ts](<D:/work/CLAUDE/GAME/disaster-reels/src/game/characters.ts>) — `new Characters(parent: HTMLElement, L: (ru: string, en: string) => string)`, `show(s: CharState): void`, `hide(): void`, `get open(): boolean`. `CharState` содержит `coins: number`, `owned: string[]`, `selected: string`, `adViews: Record<string, number>`. Колбэки — `onSelect?: (id: string) => void`, `onBuy?: (id: string) => void`, `onAd?: (id: string) => Promise<void>`, `onClose?: () => void`.
- [menu.ts](<D:/work/CLAUDE/GAME/disaster-reels/src/game/menu.ts>) — `showMain(d: Difficulty, muted: boolean, coins: number, skin: string): void`, `setCoins(n: number): void`, `showResult(r: ResultInfo): void`, `onDouble?: () => Promise<boolean>`. В `ResultInfo` добавлены `coins: number` за раунд и `total: number` для общего баланса.