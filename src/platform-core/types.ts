export type Lang = 'ru' | 'en';
export interface CloudPlayer {
  readonly uniqueID?: string;
  readonly publicName?: string;
  isAuthorized?(): boolean;
  getUniqueID?(): string;
  getName?(): string;
  getAvatarSrc?(size: string): string;
  getData(keys?: string[]): Promise<Record<string, unknown>>;
  setData(data: Record<string, unknown>, flush?: boolean): Promise<void>;
}
export interface LeaderboardEntry {
  rank: number;
  score: number;
  extraData?: string;
  player: { publicName: string; uniqueID?: string; getAvatarSrc(size: string): string };
}
export interface PlatformOptions {
  platform?: 'neutral' | 'y8' | 'playgama';
  appId?: string;
  gameId?: string;
  leaderboards?: string[] | Record<string, { highest: boolean }>;
  sdkTimeoutMs?: number;
  adRequestTimeoutMs?: number;
}
export type SaveStatus = 'local' | 'loading' | 'saved' | 'pending' | 'saving' | 'error';


