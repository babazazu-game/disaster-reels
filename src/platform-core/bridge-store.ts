// Единственный транспорт сохранений: Bridge сам выбирает облако/локальное хранилище.
const keys = ['disaster-reels-v1'];
let loaded=false, values: Record<string, unknown>={}, revision=0, saved=0;
let pending: Promise<void>|null=null;
export async function loadBridgeStore():Promise<void>{
 const result=await window.bridge.storage.get(keys);
 values=Object.fromEntries(keys.map((key,i)=>{let value=result[i];if(typeof value==='string'){try{value=JSON.parse(value)}catch{value=null}}return [key,value]}));loaded=true;
}
export function readBridgeValue(key:string):unknown{return values[key]}
export function writeBridgeValue(key:string,value:unknown):void{
 if(!loaded)throw new Error('Storage not loaded');values[key]=structuredClone(value);revision++;void flushBridgeStore().catch(error=>console.warn('[Playgama storage]',error));
}
export function flushBridgeStore():Promise<void>{
 if(pending)return pending.then(()=>revision!==saved?flushBridgeStore():undefined);
 if(!loaded||revision===saved)return Promise.resolve();
 const version=revision;const payload=keys.map(key=>JSON.stringify(values[key]??null));
 pending=Promise.resolve(window.bridge.storage.set(keys,payload)).then(()=>{saved=version}).finally(()=>{pending=null});
 return pending.then(()=>revision!==saved?flushBridgeStore():undefined);
}
