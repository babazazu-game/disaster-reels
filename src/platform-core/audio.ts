/**
 * Звук.
 *
 * Каркас не проигрывает звук сам — этим занимается движок игры. Здесь только
 * то, что одинаково во всех играх и за что прилетает от модерации:
 *
 * - п. 1.3: при потере фокуса звук обязан замолкать. Причём одного
 *   visibilitychange мало: на десктопе переключение на другое окно вкладку
 *   не скрывает, нужен ещё blur.
 * - п. 4.7: на время показа рекламы звук ставится на паузу.
 *
 * Игра подключает свои обработчики через setHandlers, каркас решает КОГДА
 * их звать. Причины суммируются: если звук заглушен и рекламой, и уходом
 * со вкладки, возврат из рекламы не должен его включить раньше времени.
 */

export type SuspendReason = 'hidden' | 'blur' | 'ad' | 'manual' | 'host';

export interface AudioHandlers {
  onSuspend(): void;
  onResume(): void;
  onMuteChange?(muted: boolean): void;
}

export class AudioGate {
  private handlers: AudioHandlers | null = null;
  private reasons = new Set<SuspendReason>();
  private muted = false;
  private bound = false;

  setHandlers(handlers: AudioHandlers): void {
    this.handlers = handlers;
    this.bind();
    if(this.isSuspended)handlers.onSuspend();
  }

  private bind(): void {
    if (this.bound || typeof document === 'undefined') return;
    this.bound = true;

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') this.suspend('hidden');
      else this.resume('hidden');
    });

    // Вкладка видима, но окно потеряло фокус — звук всё равно надо глушить.
    window.addEventListener('blur', () => this.suspend('blur'));
    window.addEventListener('focus', () => this.resume('blur'));

    /* После сна телефона страница иногда возвращается через pageshow без
       симметричного focus, хотя она уже снова видима и активна. */
    window.addEventListener('pageshow', () => {
      this.resume('hidden');
      this.resume('blur');
      this.retryResume();
    });

    /*
     * Страховка от залипания в тишине.
     *
     * `blur` и `focus` — не пара, на которую можно положиться. Игра живёт
     * в iframe площадки: `blur` прилетает от любого касания за пределами
     * рамки, а обратный `focus` может не прийти вовсе, пока игрок не щёлкнет
     * мимо игры и обратно. На телефоне то же самое устраивают шторка,
     * клавиатура и системные баннеры. Один пропущенный `focus` — и звука
     * нет до конца сессии, причём игра при этом полностью исправна.
     *
     * Поэтому любое действие игрока внутри страницы само снимает причину
     * «нет фокуса»: если человек трогает игру, окно у него точно активно.
     * Остальные причины при этом остаются на месте — из рекламы или
     * скрытой вкладки касание не выводит, там снимает свой обработчик.
     *
     * `capture` обязателен: игра гасит события на своём холсте, и до
     * обычного обработчика на document они бы не дошли.
     */
    const awake = (): void => {
      this.resume('blur');
      // Мобильный браузер иногда сохраняет причину hidden без
      // симметричного события после сна устройства.
      // Если игрок уже касается ВИДИМОЙ страницы, внешнего окна перед игрой
      // точно нет и зависшую причину hidden можно безопасно снять. Причину ad
      // здесь не трогаем: полноэкранная и rewarded-реклама по-прежнему держат
      // звук выключенным до собственного onClose/onError.
      if (document.visibilityState === 'visible') this.resume('hidden');
      /* Мобильный браузер вправе отклонить автоматический resume до нового
         жеста. Причины уже могут быть сняты, поэтому повторяем его напрямую. */
      this.retryResume();
    };
    for (const type of ['pointerdown', 'touchstart', 'keydown'] as const) {
      document.addEventListener(type, awake, { capture: true, passive: true });
    }
  }

  suspend(reason: SuspendReason = 'manual'): void {
    const wasEmpty = this.reasons.size === 0;
    this.reasons.add(reason);
    if (wasEmpty) this.handlers?.onSuspend();
  }

  resume(reason: SuspendReason = 'manual'): void {
    if (!this.reasons.delete(reason)) return;
    // Возобновляем только когда снята ПОСЛЕДНЯЯ причина.
    if (this.reasons.size === 0 && !this.muted) this.handlers?.onResume();
  }

  private retryResume(): void {
    if (this.reasons.size === 0 && !this.muted) this.handlers?.onResume();
  }

  /** Ручное отключение звука игроком — переживает сворачивания вкладки. */
  setMuted(muted: boolean): void {
    if (this.muted === muted) return;
    this.muted = muted;
    this.handlers?.onMuteChange?.(muted);
    if (muted) this.handlers?.onSuspend();
    else if (this.reasons.size === 0) this.handlers?.onResume();
  }

  get isMuted(): boolean {
    return this.muted;
  }

  get isSuspended(): boolean {
    return this.muted || this.reasons.size > 0;
  }
}

