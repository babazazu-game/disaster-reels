import type { CloudPlayer, LeaderboardEntry } from './types';
export interface Y8User { pid: string; nickname: string; avatars?: Record<string, string | null> }
export interface AdRequest {
  type: 'next' | 'reward'; name: string;
  beforeAd(): void; afterAd(): void;
  beforeReward(show: () => void): void;
  adViewed(): void; adDismissed(): void;
  adBreakDone(info: { breakStatus: string }): void;
}
export interface Y8SDK {
  init(app: { appId: string; autoLogin: boolean }, ads?: { gameId: string; preloadAdBreaks: string; sound: string; onReady(): void }): unknown;
  onAuth(fn: (user: Y8User | null, error?: unknown) => void): void;
  getUser(): Y8User | null;
  login(): unknown;
  getPlatformLocale(): Promise<string>;
  showAd(options: AdRequest): Promise<unknown>;
  loadData(options: { key: string }): Promise<string | null>;
  saveData(options: { key: string; value: string; retries: boolean }): Promise<unknown>;
  saveLeaderboardScore(options: { table: string; points: number; highest: boolean; allowDuplicates: boolean }): Promise<unknown>;
  getLeaderboardScores(options: { table: string; page: number; perPage: number; highest: boolean; mode: string; playerId?: string }): Promise<{ items: { playername: string; points: number; rank: number; playerid: string }[] }>;
}
export interface Y8Host { sdk(): Y8SDK; emitReadyEvent?(): void }
declare global { interface Window { y8?: Y8Host } }
export function cloudPlayer(sdk: Y8SDK, user: Y8User): CloudPlayer {
  const authorized = (): void => { if (sdk.getUser()?.pid !== user.pid) throw new Error('Y8 player changed'); };
  return {
    uniqueID: user.pid, publicName: user.nickname,
    isAuthorized: () => sdk.getUser()?.pid === user.pid,
    getUniqueID: () => user.pid, getName: () => user.nickname,
    getAvatarSrc: () => user.avatars?.medium_secure_url ?? '',
    async getData(keys = []) {
      authorized();
      const result: Record<string, unknown> = {};
      await Promise.all(keys.map(async key => {
        const value = await sdk.loadData({ key }); authorized();
        if (value !== null) result[key] = JSON.parse(value);
      }));
      return result;
    },
    async setData(data) {
      for (const [key, item] of Object.entries(data)) {
        authorized();
        const value = JSON.stringify(item);
        if (new TextEncoder().encode(value).length > 30 * 1024) throw new Error('Y8 cloud value exceeds 30 KB');
        await sdk.saveData({ key, value, retries: true });
        authorized();
      }
    },
  };
}
export function scoreEntry(item: { playername: string; points: number; rank: number; playerid: string }): LeaderboardEntry {
  return { rank: item.rank, score: item.points, player: { publicName: item.playername, uniqueID: item.playerid, getAvatarSrc: () => '' } };
}
