import { I18n } from './i18n';
import { AudioGate } from './audio';
import { loadBridgeStore, readBridgeValue, writeBridgeValue, flushBridgeStore } from './bridge-store';
import type { CloudPlayer, LeaderboardEntry, PlatformOptions } from './types';
declare global { interface Window { bridge: any; } }
export class PlatformCore {
 readonly i18n=new I18n();readonly audio=new AudioGate();readonly ready:Promise<void>;
 private initialized=false;private paused=false;private hostPaused=false;private hidden=document.hidden;private busy=false;
 private pauseListeners=new Set<(value:boolean)=>void>();private capsListeners=new Set<()=>void>();
 lastError:unknown=null;lastAdStatus='idle';lastLeaderboardStatus='idle';
 readonly currentPlayer:CloudPlayer={uniqueID:'playgama',isAuthorized:()=>false,getData:async keys=>Object.fromEntries((keys??[]).map(k=>[k,readBridgeValue(k)])),setData:async data=>{for(const [k,v] of Object.entries(data))writeBridgeValue(k,v);await flushBridgeStore()}};
 readonly ads;readonly capabilities;readonly leaderboards;
 constructor(_options:PlatformOptions={}){
  const core=this;
  this.ads={get rewardedAvailable(){return core.initialized&&Boolean(window.bridge.advertisement.isRewardedSupported)},get interstitialAvailable(){return core.initialized&&Boolean(window.bridge.advertisement.isInterstitialSupported)},rewarded:()=>core.showAd(true),interstitial:()=>core.showAd(false),showBanner:async()=>{}};
  this.capabilities={get rewardedAds(){return core.ads.rewardedAvailable},get leaderboards(){return core.boardAvailable},get cloudSave(){return core.initialized}};
  this.leaderboards={get available(){return core.boardAvailable},submit:async(name:string,score:number)=>{if(core.boardAvailable)await window.bridge.leaderboards.setScore(name,score)},fetchTop:async(name:string,count=10):Promise<LeaderboardEntry[]>=>{
   if(!core.boardAvailable)return [];const entries=await window.bridge.leaderboards.getEntries(name);return entries.slice(0,count).map((e:any)=>({rank:e.rank,score:e.score,player:{publicName:e.name||'Player',uniqueID:e.id,getAvatarSrc:()=>e.photo||''}}));
  },playerScore:async(_name:string):Promise<number|null>=>null};
  this.ready=this.initialize();
 }
 get lang(){return this.i18n.current} get isPaused(){return this.paused} get isMobile(){return /Mobi|Android/i.test(navigator.userAgent)} get isTV(){return false}
 private get boardAvailable(){return this.initialized&&window.bridge.leaderboards.type==='in_game'}
 onPlayerChange(_fn:(p:CloudPlayer|null)=>void){return ()=>{}}
 onCapabilitiesChange(fn:()=>void){this.capsListeners.add(fn);return ()=>this.capsListeners.delete(fn)}
 onPauseChange(fn:(value:boolean)=>void){this.pauseListeners.add(fn);if(this.paused)fn(true);return ()=>this.pauseListeners.delete(fn)}
 private syncPause(){const value=this.hostPaused||this.hidden;if(value===this.paused)return;this.paused=value;if(value)this.audio.suspend('host');else this.audio.resume('host');for(const fn of this.pauseListeners)fn(value)}
 private async initialize(){
  if(!window.bridge)throw new Error('Bridge failed to load');
  await window.bridge.initialize();
  this.i18n.setLang(window.bridge.platform.language==='ru'?'ru':'en');
  window.bridge.platform.on(window.bridge.EVENT_NAME.PAUSE_STATE_CHANGED,(paused:boolean)=>{this.hostPaused=paused;this.syncPause()});
  window.bridge.platform.on(window.bridge.EVENT_NAME.AUDIO_STATE_CHANGED,(enabled:boolean)=>{if(enabled)this.audio.resume('manual');else this.audio.suspend('manual')});
  if(window.bridge.platform.isAudioEnabled===false)this.audio.suspend('manual');
  this.hostPaused=Boolean(window.bridge.platform.isPaused)||window.bridge.advertisement.interstitialState==='opened';this.syncPause();
  document.addEventListener('visibilitychange',()=>{this.hidden=document.hidden;this.syncPause()});
  await loadBridgeStore();this.initialized=true;for(const fn of this.capsListeners)fn();
 }
 private showAd(reward:boolean):Promise<boolean>{
  if(this.busy||!(reward?this.ads.rewardedAvailable:this.ads.interstitialAvailable))return Promise.resolve(false);
  this.busy=true;const bridge=window.bridge;const event=reward?bridge.EVENT_NAME.REWARDED_STATE_CHANGED:bridge.EVENT_NAME.INTERSTITIAL_STATE_CHANGED;
  return new Promise(resolve=>{
   let opened=false,settled=false;let timer:ReturnType<typeof setTimeout>;
   const finish=(ok:boolean)=>{if(settled)return;settled=true;clearTimeout(timer);bridge.advertisement.off(event,listener);this.busy=false;this.audio.resume('ad');resolve(ok)};
   this.audio.suspend('ad');   // Playgama 2.1.6: на время рекламы игра молчит, даже если площадка не прислала паузу
   const listener=(state:string)=>{this.lastAdStatus=state;console.info('[Playgama ads]',reward?'rewarded':'interstitial',state);if(state==='opened'){opened=true;clearTimeout(timer)}if(state==='rewarded'&&reward)finish(true);else if(state==='failed'||state==='closed')finish(!reward&&opened&&state==='closed')};
   bridge.advertisement.on(event,listener);timer=setTimeout(()=>{if(!opened)finish(false)},15000);
   try{const response=reward?bridge.advertisement.showRewarded('bonus'):bridge.advertisement.showInterstitial('outpost');Promise.resolve(response).catch(()=>finish(false))}catch{finish(false)}
  });
 }
 loadingReady(){if(this.initialized)window.bridge.platform.sendMessage('game_ready')}
 gameplayStart(){} gameplayStop(){}
}
