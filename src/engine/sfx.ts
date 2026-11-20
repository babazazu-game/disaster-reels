import { core } from '../core.ts';

/**
 * Звуковые эффекты серии — только Web Audio (AudioContext + AudioBufferSourceNode).
 *
 * НЕ <audio>: тег поднимает системный медиаплеер браузера (значок ноты,
 * панель в уведомлениях телефона) — это нарушение п. 1.6.1.6/1.6.2.5.
 *
 * Тишину решает каркас (`core.audio`): уход со вкладки, потеря фокуса, реклама
 * (пп. 1.3, 4.7) и кнопка звука в игре. Здесь только «как» — общий узел
 * громкости, который каркас опускает в ноль и поднимает обратно.
 *
 * Звуки: Kenney (CC0) + сгенерированные ElevenLabs + Freesound CC0 (этап 7), см. assets/sfx/SOURCES.md.
 */

const NAMES = ['jump', 'land', 'click', 'denied', 'place', 'remove', 'bounce', 'lava', 'checkpoint', 'coin', 'finish', 'respawn',
  // этап 7: барабан, катастрофы, голоса существ, итог
  'spin', 'reelstop', 'boom', 'whoosh', 'thud', 'bubble', 'fire', 'freeze', 'zap', 'splash', 'cluck', 'meow', 'boing', 'hurt', 'cheer', 'fail', 'tada'] as const;
export type SfxName = typeof NAMES[number];
// громкости подобраны по замеру LUFS (earshot): громкие записи (взрыв, курица, кот) приглушены, тихий лёд — нет
const VOLUME: Partial<Record<SfxName, number>> = { land: 0.45, jump: 0.55, click: 0.6, finish: 0.8, coin: 0.5,
  boom: 0.6, cluck: 0.5, meow: 0.5, fail: 0.6, zap: 0.5, cheer: 0.65, whoosh: 0.6, spin: 0.6, tada: 0.75, hurt: 0.8, thud: 0.8 };

/** Музыка — Opus 48k; браузеру без Opus (Safari старше 18.4) — запасной mp3 (3 петли по 30 с, +1 МБ). */
const MUSIC_OK = (() => {
  try { return !!document.createElement('audio').canPlayType('audio/ogg; codecs=opus'); } catch { return false; }
})();

class Sfx {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private buffers = new Map<SfxName, AudioBuffer>();
  private last = new Map<SfxName, number>();

  /** Загрузить все звуки. Ошибка одного файла не должна валить игру (п. 1.14). */
  async load(): Promise<void> {
    try {
      this.ctx = new AudioContext();
      this.master = this.ctx.createGain();
      this.master.connect(this.ctx.destination);
      // свой регулятор у звуков и у музыки (настройки игры); master — общий «тишина» каркаса
      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.value = this.sfxVol;
      this.sfxGain.connect(this.master);
    } catch { return; }   // браузер без Web Audio — играем без звука
    core.audio.setHandlers({
      // не только тишина, но и остановка контекста: площадка проверяет, что AudioContext не «running»
      onSuspend: () => { if (this.master) this.master.gain.value = 0; void this.ctx?.suspend(); },
      onResume: () => { if (this.master) this.master.gain.value = 1; void this.ctx?.resume(); },
    });
    // Браузер не даёт звучать до первого касания: будим контекст на первом жесте.
    const unlock = () => { void this.ctx?.resume(); };
    addEventListener('pointerdown', unlock, { once: false, passive: true });
    addEventListener('keydown', unlock, { passive: true });
    await Promise.all(NAMES.map(async (n) => {
      try {
        const res = await fetch(`./assets/sfx/${n}.mp3`);
        const buf = await this.ctx!.decodeAudioData(await res.arrayBuffer());
        this.buffers.set(n, buf);
      } catch { /* нет файла — просто молчим этот звук */ }
    }));
  }

  /**
   * Проиграть. pitch — небольшой разброс высоты: один и тот же звук подряд
   * (шаги, монеты) с ним не звучит «пулемётом».
   */
  /** vol — множитель громкости этого звука (вход в мир — вдвое тише остальных). */
  /** rate — точная высота (барабан: каждая следующая лента встаёт чуть выше — слышно «доходит до конца»). */
  play(n: SfxName, pitch = 0.06, vol = 1, rate = 1): void {
    const ctx = this.ctx, buf = this.buffers.get(n);
    if (!ctx || !buf || !this.master || ctx.state !== 'running') return;
    // один и тот же звук чаще 60 мс — склеивается в треск, пропускаем
    const now = ctx.currentTime;
    if (now - (this.last.get(n) ?? -1) < 0.06) return;
    this.last.set(n, now);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.playbackRate.value = rate * (1 + (Math.random() * 2 - 1) * pitch);
    const g = ctx.createGain();
    g.gain.value = (VOLUME[n] ?? 1) * vol;
    src.connect(g).connect(this.sfxGain ?? this.master);
    src.start();
  }

  setMuted(m: boolean): void { core.audio.setMuted(m); }

  /*
   * Музыка: 5 петель по 30 с (ElevenLabs). Играют подряд в СЛУЧАЙНОМ порядке, со случайной первой:
   * каждая звучит два круга (~1 мин), затем плавно сменяется другой (не той же, что сейчас).
   * Меню и раунд музыку не переключают — она идёт фоном всю игру (просьба заказчика).
   * Тоже Web Audio: <audio> поднял бы системный медиаплеер. В памяти — одна-две петли.
   */
  private musicGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  /** Громкости из настроек (0..1). Музыка ещё × базовую: фон, не главное. */
  private sfxVol = 1;
  private musicVol = 1;
  private duck = 1;
  private static readonly MUSIC_BASE = 0.3;
  private static readonly TRACKS = 5;
  private static readonly LOOPS = 2;
  private lastTrack = -1;
  private musicOn = false;
  private cur: { src: AudioBufferSourceNode; g: GainNode } | null = null;

  setSfxVolume(v: number): void { this.sfxVol = v; if (this.sfxGain) this.sfxGain.gain.value = v; }
  setMusicVolume(v: number): void { this.musicVol = v; this.applyMusic(); }
  /** Пауза: музыка тише, но не обрывается. */
  setDuck(on: boolean): void { this.duck = on ? 0.35 : 1; this.applyMusic(); }
  private applyMusic(): void {
    if (this.musicGain && this.ctx) this.musicGain.gain.setTargetAtTime(this.musicVol * this.duck * Sfx.MUSIC_BASE, this.ctx.currentTime, 0.08);
  }

  startMusic(): void {
    if (!this.ctx || !this.master || this.musicOn) return;
    this.musicOn = true;
    this.musicGain = this.ctx.createGain();
    this.musicGain.connect(this.master);
    this.applyMusic();
    void this.nextTrack();
  }

  private async nextTrack(): Promise<void> {
    const ctx = this.ctx!;
    let i = Math.floor(Math.random() * Sfx.TRACKS);
    if (i === this.lastTrack) i = (i + 1 + Math.floor(Math.random() * (Sfx.TRACKS - 1))) % Sfx.TRACKS;
    this.lastTrack = i;
    let buf: AudioBuffer | null = null;
    try {
      const res = await fetch(`./assets/music/music${i + 1}.${MUSIC_OK ? 'ogg' : 'mp3'}?v=${__BUILD__}`);
      if (!res.ok) throw new Error('нет трека');
      buf = await ctx.decodeAudioData(await res.arrayBuffer());
    } catch {
      setTimeout(() => void this.nextTrack(), 20000);   // нет файла/сети — попробуем другой позже, игра без музыки
      return;
    }
    // старая петля плавно гаснет, новая плавно входит
    const old = this.cur;
    if (old) { old.g.gain.setTargetAtTime(0, ctx.currentTime, 0.4); old.src.stop(ctx.currentTime + 2.5); }
    const g = ctx.createGain();
    g.gain.value = 0;
    g.gain.setTargetAtTime(1, ctx.currentTime, old ? 0.4 : 0.15);
    g.connect(this.musicGain!);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.loop = true;
    src.connect(g);
    src.start();
    this.cur = { src, g };
    // время по часам контекста: в паузе вкладки (контекст остановлен) смена не убегает вперёд
    const end = ctx.currentTime + buf.duration * Sfx.LOOPS - 1.5;
    const wait = () => { if (ctx.currentTime >= end) void this.nextTrack(); else setTimeout(wait, 500); };
    setTimeout(wait, 500);
  }
}

export const sfx = new Sfx();
