import type { CloudPlayer, SaveStatus } from './types';
export class Save<T extends Record<string,unknown>>{
 private data:T;private player:CloudPlayer|null=null;private loaded=false;private revision=0;private persisted=0;private writing:Promise<void>|null=null;
 status:SaveStatus='local';lastError:unknown=null;private listeners=new Set<(s:SaveStatus,e?:unknown)=>void>();
 constructor(private key:string,defaults:T){this.data=structuredClone(defaults)}
 onStatusChange(fn:(s:SaveStatus,e?:unknown)=>void){this.listeners.add(fn);fn(this.status);return ()=>this.listeners.delete(fn)}
 private report(s:SaveStatus,e?:unknown){this.status=s;this.lastError=e??null;for(const fn of this.listeners)fn(s,e)}
 async attachCloud(player:CloudPlayer|null){this.player=player;this.loaded=false;if(!player)return;this.report('loading');try{const result=await player.getData([this.key]);const value=result[this.key];if(value&&typeof value==='object'&&!Array.isArray(value))this.data={...this.data,...value as unknown as Partial<T>};this.loaded=true;this.report('saved')}catch(e){this.report('error',e);throw e}}
 get<K extends keyof T>(key:K):T[K]{return this.data[key]}
 set<K extends keyof T>(key:K,value:T[K]){this.patch({[key]:value} as unknown as Partial<T>)}
 patch(part:Partial<T>){Object.assign(this.data,part);(this.data as Record<string,unknown>).updatedAt=Date.now();this.revision++;this.report('pending');void this.flushCloud().catch(()=>{})}
 snapshot():Readonly<T>{return this.data}
 async flushCloud():Promise<void>{if(!this.player||!this.loaded||this.revision===this.persisted)return;if(this.writing){await this.writing;return this.flushCloud()}const revision=this.revision;this.report('saving');this.writing=this.player.setData({[this.key]:structuredClone(this.data)});try{await this.writing;this.persisted=revision;this.report('saved')}catch(e){this.report('error',e);throw e}finally{this.writing=null}if(this.revision!==this.persisted)await this.flushCloud()}
}
