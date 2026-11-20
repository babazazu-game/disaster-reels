Изменил только [src/game/chaos.ts](/D:/work/CLAUDE/GAME/disaster-reels/src/game/chaos.ts).

- Добавил воду, электризацию и слизь, их таймеры и реакции с огнём и льдом. `onReact` получает координаты центра клетки.
- Разряд распространяется по четырём соседям на 80 связанных клеток максимум. За кадр рисуется до 40 молний на случайно выбранных клетках без повторов.
- Добавил три `InstancedMesh` для новых состояний. Матрицы экземпляров обновляются при изменении сетки.

**Публичный API `Surface`**

- `constructor(scene, half, flames, bolts)` и `onReact(id, x, z)` с событиями `steam`, `melt`, `shock`, `slimeFire`.
- Действия `ignite(x, z, time?)`, `freeze(k): boolean`, `freezeAt(x, z): boolean`, `wetAt(x, z)`, `shockAt(x, z): number`, `slimeAt(x, z)`.
- Чтение `at(x, z): Cell`, `center(k, out)`, `counts()` с полями `fire`, `ice`, `wet`, `shock`, `slime`, а также `n` и `burning`.
- Обновление и сброс `update(dt)` и `reset()`.

`npx tsc --noEmit -p .` прошёл без ошибок. Изолированная проверка подтвердила реакции, таймеры, лимиты разряда и молний, а также сброс. Внешний вид в браузере не проверял.