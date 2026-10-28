var Np=Object.defineProperty;var Pp=(n,e,t)=>e in n?Np(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var k=(n,e,t)=>Pp(n,typeof e!="symbol"?e+"":e,t);var oh=()=>{};var uh=function(n){let e=[],t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Fp=function(n){let e=[],t=0,r=0;for(;t<n.length;){let s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){let i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){let i=n[t++],a=n[t++],u=n[t++],c=((s&7)<<18|(i&63)<<12|(a&63)<<6|u&63)-65536;e[r++]=String.fromCharCode(55296+(c>>10)),e[r++]=String.fromCharCode(56320+(c&1023))}else{let i=n[t++],a=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|a&63)}}return e.join("")},ch={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();let t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){let i=n[s],a=s+1<n.length,u=a?n[s+1]:0,c=s+2<n.length,l=c?n[s+2]:0,f=i>>2,d=(i&3)<<4|u>>4,y=(u&15)<<2|l>>6,R=l&63;c||(R=64,a||(y=64)),r.push(t[f],t[d],t[y],t[R])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(uh(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Fp(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();let t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){let i=t[n.charAt(s++)],u=s<n.length?t[n.charAt(s)]:0;++s;let l=s<n.length?t[n.charAt(s)]:64;++s;let d=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||u==null||l==null||d==null)throw new Ba;let y=i<<2|u>>4;if(r.push(y),l!==64){let R=u<<4&240|l>>2;if(r.push(R),d!==64){let v=l<<6&192|d;r.push(v)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}},Ba=class extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}},xp=function(n){let e=uh(n);return ch.encodeByteArray(e,!0)},ss=function(n){return xp(n).replace(/\./g,"")},Bh=function(n){try{return ch.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};function mi(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}var Lp=()=>mi().__FIREBASE_DEFAULTS__,kp=()=>{if(typeof process>"u"||typeof process.env>"u")return;let n=process.env.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Vp=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}let e=n&&Bh(n[1]);return e&&JSON.parse(e)},la=()=>{try{return oh()||Lp()||kp()||Vp()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Mp=n=>la()?.emulatorHosts?.[n],lh=n=>{let e=Mp(n);if(!e)return;let t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);let r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},ha=()=>la()?.config;var is=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}};function hh(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');let t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");let a={iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...n};return[ss(JSON.stringify(t)),ss(JSON.stringify(a)),""].join(".")}function fh(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Gp(){let n=la()?.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function dh(){return!Gp()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function fa(){try{return typeof indexedDB=="object"}catch{return!1}}function Ch(){return new Promise((n,e)=>{try{let t=!0,r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(t){e(t)}})}var Hp="FirebaseError",pt=class n extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=Hp,Object.setPrototypeOf(this,n.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,os.prototype.create)}},os=class{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){let r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],a=i?Up(i,r):"Error",u=`${this.serviceName}: ${a} (${s}).`;return new pt(s,u,r)}};function Up(n,e){try{let t=0,r="";for(;t<n.length;){let s=n.indexOf("{$",t);if(s===-1){r+=n.substring(t);break}let i=n.indexOf("}",s+2);if(i===-1){r+=n.substring(t);break}let a=n.substring(s+2,i),u=e[a];r+=n.substring(t,s)+(u!=null?String(u):`<${a}?>`),t=i+1}return r}catch{return n}}function Tn(n,e){if(n===e)return!0;let t=Object.keys(n),r=Object.keys(e);for(let s of t){if(!r.includes(s))return!1;let i=n[s],a=e[s];if(ah(i)&&ah(a)){if(!Tn(i,a))return!1}else if(i!==a)return!1}for(let s of r)if(!t.includes(s))return!1;return!0}function ah(n){return n!==null&&typeof n=="object"}var fD=4*60*60*1e3;function xt(n){return n&&n._delegate?n._delegate:n}function da(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function ph(n){return(await fetch(n,{credentials:"include"})).ok}var gt=class{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}};var An="[DEFAULT]";var Ca=class{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){let t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){let r=new is;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{let s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){let t=this.normalizeInstanceIdentifier(e?.identifier),r=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(jp(e))try{this.getOrInitializeService({instanceIdentifier:An})}catch{}for(let[t,r]of this.instancesDeferred.entries()){let s=this.normalizeInstanceIdentifier(t);try{let i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=An){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){let e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=An){return this.instances.has(e)}getOptions(e=An){return this.instancesOptions.get(e)||{}}initialize(e={}){let{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(let[i,a]of this.instancesDeferred.entries()){let u=this.normalizeInstanceIdentifier(i);r===u&&a.resolve(s)}return s}onInit(e,t){let r=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(r)??new Set;s.add(e),this.onInitCallbacks.set(r,s);let i=this.instances.get(r);return i&&e(i,r),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){let r=this.onInitCallbacks.get(t);if(r)for(let s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:qp(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=An){return this.component?this.component.multipleInstances?e:An:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}};function qp(n){return n===An?void 0:n}function jp(n){return n.instantiationMode==="EAGER"}var Ei=class{constructor(e){this.name=e,this.providers=new Map}addComponent(e){let t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);let t=new Ca(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}};var Jp=[],ie;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(ie||(ie={}));var Kp={debug:ie.DEBUG,verbose:ie.VERBOSE,info:ie.INFO,warn:ie.WARN,error:ie.ERROR,silent:ie.SILENT},zp=ie.INFO,Qp={[ie.DEBUG]:"log",[ie.VERBOSE]:"log",[ie.INFO]:"info",[ie.WARN]:"warn",[ie.ERROR]:"error"},$p=(n,e,...t)=>{if(e<n.logLevel)return;let r=new Date().toISOString(),s=Qp[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)},Zt=class{constructor(e){this.name=e,this._logLevel=zp,this._logHandler=$p,this._userLogHandler=null,Jp.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ie))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Kp[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ie.DEBUG,...e),this._logHandler(this,ie.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ie.VERBOSE,...e),this._logHandler(this,ie.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ie.INFO,...e),this._logHandler(this,ie.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ie.WARN,...e),this._logHandler(this,ie.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ie.ERROR,...e),this._logHandler(this,ie.ERROR,...e)}};var Wp=(n,e)=>e.some(t=>n instanceof t),gh,mh;function Yp(){return gh||(gh=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Xp(){return mh||(mh=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}var Eh=new WeakMap,ga=new WeakMap,_h=new WeakMap,pa=new WeakMap,Ea=new WeakMap;function Zp(n){let e=new Promise((t,r)=>{let s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",a)},i=()=>{t(bt(n.result)),s()},a=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&Eh.set(t,n)}).catch(()=>{}),Ea.set(e,n),e}function eg(n){if(ga.has(n))return;let e=new Promise((t,r)=>{let s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",a),n.removeEventListener("abort",a)},i=()=>{t(),s()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",a),n.addEventListener("abort",a)});ga.set(n,e)}var ma={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return ga.get(n);if(e==="objectStoreNames")return n.objectStoreNames||_h.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return bt(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Dh(n){ma=n(ma)}function tg(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){let r=n.call(_i(this),e,...t);return _h.set(r,e.sort?e.sort():[e]),bt(r)}:Xp().includes(n)?function(...e){return n.apply(_i(this),e),bt(Eh.get(this))}:function(...e){return bt(n.apply(_i(this),e))}}function ng(n){return typeof n=="function"?tg(n):(n instanceof IDBTransaction&&eg(n),Wp(n,Yp())?new Proxy(n,ma):n)}function bt(n){if(n instanceof IDBRequest)return Zp(n);if(pa.has(n))return pa.get(n);let e=ng(n);return e!==n&&(pa.set(n,e),Ea.set(e,n)),e}var _i=n=>Ea.get(n);function wh(n,e,{blocked:t,upgrade:r,blocking:s,terminated:i}={}){let a=indexedDB.open(n,e),u=bt(a);return r&&a.addEventListener("upgradeneeded",c=>{r(bt(a.result),c.oldVersion,c.newVersion,bt(a.transaction),c)}),t&&a.addEventListener("blocked",c=>t(c.oldVersion,c.newVersion,c)),u.then(c=>{i&&c.addEventListener("close",()=>i()),s&&c.addEventListener("versionchange",l=>s(l.oldVersion,l.newVersion,l))}).catch(()=>{}),u}var rg=["get","getKey","getAll","getAllKeys","count"],sg=["put","add","delete","clear"],_a=new Map;function yh(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(_a.get(e))return _a.get(e);let t=e.replace(/FromIndex$/,""),r=e!==t,s=sg.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||rg.includes(t)))return;let i=async function(a,...u){let c=this.transaction(a,s?"readwrite":"readonly"),l=c.store;return r&&(l=l.index(u.shift())),(await Promise.all([l[t](...u),s&&c.done]))[0]};return _a.set(e,i),i}Dh(n=>({...n,get:(e,t,r)=>yh(e,t)||n.get(e,t,r),has:(e,t)=>!!yh(e,t)||n.has(e,t)}));var ya=class{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(ig(t)){let r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}};function ig(n){return n.getComponent()?.type==="VERSION"}var wa="@firebase/app",Ih="0.16.2";var kt=new Zt("@firebase/app"),og="@firebase/app-compat",ag="@firebase/analytics-compat",ug="@firebase/analytics",cg="@firebase/app-check-compat",Bg="@firebase/app-check",lg="@firebase/auth",hg="@firebase/auth-compat",fg="@firebase/database",dg="@firebase/data-connect",Cg="@firebase/database-compat",pg="@firebase/functions",gg="@firebase/functions-compat",mg="@firebase/installations",Eg="@firebase/installations-compat",_g="@firebase/messaging",Dg="@firebase/messaging-compat",yg="@firebase/performance",wg="@firebase/performance-compat",Ig="@firebase/remote-config",Tg="@firebase/remote-config-compat",Ag="@firebase/storage",bg="@firebase/storage-compat",Rg="@firebase/firestore",Sg="@firebase/ai",vg="@firebase/firestore-compat",Og="firebase",Ng="12.19.0";var Ia="[DEFAULT]",Pg={[wa]:"fire-core",[og]:"fire-core-compat",[ug]:"fire-analytics",[ag]:"fire-analytics-compat",[Bg]:"fire-app-check",[cg]:"fire-app-check-compat",[lg]:"fire-auth",[hg]:"fire-auth-compat",[fg]:"fire-rtdb",[dg]:"fire-data-connect",[Cg]:"fire-rtdb-compat",[pg]:"fire-fn",[gg]:"fire-fn-compat",[mg]:"fire-iid",[Eg]:"fire-iid-compat",[_g]:"fire-fcm",[Dg]:"fire-fcm-compat",[yg]:"fire-perf",[wg]:"fire-perf-compat",[Ig]:"fire-rc",[Tg]:"fire-rc-compat",[Ag]:"fire-gcs",[bg]:"fire-gcs-compat",[Rg]:"fire-fst",[vg]:"fire-fst-compat",[Sg]:"fire-vertex","fire-js":"fire-js",[Og]:"fire-js-all"};var Di=new Map,Fg=new Map,Ta=new Map;function Th(n,e){try{n.container.addComponent(e)}catch(t){kt.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function bn(n){let e=n.name;if(Ta.has(e))return kt.debug(`There were multiple attempts to register component ${e}.`),!1;Ta.set(e,n);for(let t of Di.values())Th(t,n);for(let t of Fg.values())Th(t,n);return!0}function yi(n,e){let t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function wi(n){return n==null?!1:n.settings!==void 0}var xg={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different {$mismatchedParam}. Existing: '{$oldValue}'. New: '{$newValue}'.","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Lt=new os("app","Firebase",xg);var Aa=class{constructor(e,t,r){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new gt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Lt.create("app-deleted",{appName:this._name})}};var Sh=Ng;function Sa(n,e={}){let t=n;typeof e!="object"&&(e={name:e});let r={name:Ia,automaticDataCollectionEnabled:!0,...e},s=r.name;if(typeof s!="string"||!s)throw Lt.create("bad-app-name",{appName:String(s)});if(t||(t=ha()),!t)throw Lt.create("no-options");let i=Di.get(s);if(i)if(Tn(t,i.options)){if(Tn(r,i.config))return i;throw Lt.create("duplicate-app",{appName:s,mismatchedParam:"config",oldValue:JSON.stringify(i.config),newValue:JSON.stringify(r)})}else throw Lt.create("duplicate-app",{appName:s,mismatchedParam:"options",oldValue:JSON.stringify(i.options),newValue:JSON.stringify(t)});let a=new Ei(s);for(let c of Ta.values())a.addComponent(c);let u=new Aa(t,r,a);return Di.set(s,u),u}function Ii(n=Ia){let e=Di.get(n);if(!e&&n===Ia&&ha())return Sa();if(!e)throw Lt.create("no-app",{appName:n});return e}function mt(n,e,t){let r=Pg[n]??n;t&&(r+=`-${t}`);let s=r.match(/\s|\//),i=e.match(/\s|\//);if(s||i){let a=[`Unable to register library "${r}" with version "${e}":`];s&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&a.push("and"),i&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),kt.warn(a.join(" "));return}bn(new gt(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}var Lg="firebase-heartbeat-database",kg=1,as="firebase-heartbeat-store",Da=null;function vh(){return Da||(Da=wh(Lg,kg,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(as)}catch(t){console.warn(t)}}}}).catch(n=>{throw Lt.create("idb-open",{originalErrorMessage:n.message})})),Da}async function Vg(n){try{let t=(await vh()).transaction(as),r=await t.objectStore(as).get(Oh(n));return await t.done,r}catch(e){if(e instanceof pt)kt.warn(e.message);else{let t=Lt.create("idb-get",{originalErrorMessage:e?.message});kt.warn(t.message)}}}async function Ah(n,e){try{let r=(await vh()).transaction(as,"readwrite");await r.objectStore(as).put(e,Oh(n)),await r.done}catch(t){if(t instanceof pt)kt.warn(t.message);else{let r=Lt.create("idb-set",{originalErrorMessage:t?.message});kt.warn(r.message)}}}function Oh(n){return`${n.name}!${n.options.appId}`}var Mg=1024,Gg=30,ba=class{constructor(e){this.container=e,this._heartbeatsCache=null;let t=this.container.getProvider("app").getImmediate();this._storage=new Ra(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){try{let t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=bh();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(s=>s.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:t}),this._heartbeatsCache.heartbeats.length>Gg){let s=Ug(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){kt.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";let e=bh(),{heartbeatsToSend:t,unsentEntries:r}=Hg(this._heartbeatsCache.heartbeats),s=ss(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return kt.warn(e),""}}};function bh(){return new Date().toISOString().substring(0,10)}function Hg(n,e=Mg){let t=[],r=n.slice();for(let s of n){let i=t.find(a=>a.agent===s.agent);if(i){if(i.dates.push(s.date),Rh(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Rh(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}var Ra=class{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return fa()?Ch().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){let t=await Vg(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){let r=await this.read();return Ah(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){let r=await this.read();return Ah(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}};function Rh(n){return ss(JSON.stringify({version:2,heartbeats:n})).length}function Ug(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}function qg(n){bn(new gt("platform-logger",e=>new ya(e),"PRIVATE")),bn(new gt("heartbeat",e=>new ba(e),"PRIVATE")),mt(wa,Ih,n),mt(wa,Ih,"esm2020"),mt("fire-js","")}qg("");var jg="firebase",Jg="12.19.0";mt(jg,Jg,"app");var Nh=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},Ph={};var Ti,Fh;(function(){var n;function e(I,m){function _(){}_.prototype=m.prototype,I.F=m.prototype,I.prototype=new _,I.prototype.constructor=I,I.D=function(A,w,S){for(var E=Array(arguments.length-2),Ze=2;Ze<arguments.length;Ze++)E[Ze-2]=arguments[Ze];return m.prototype[w].apply(A,E)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(r,t),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(I,m,_){_||(_=0);let A=Array(16);if(typeof m=="string")for(var w=0;w<16;++w)A[w]=m.charCodeAt(_++)|m.charCodeAt(_++)<<8|m.charCodeAt(_++)<<16|m.charCodeAt(_++)<<24;else for(w=0;w<16;++w)A[w]=m[_++]|m[_++]<<8|m[_++]<<16|m[_++]<<24;m=I.g[0],_=I.g[1],w=I.g[2];let S=I.g[3],E;E=m+(S^_&(w^S))+A[0]+3614090360&4294967295,m=_+(E<<7&4294967295|E>>>25),E=S+(w^m&(_^w))+A[1]+3905402710&4294967295,S=m+(E<<12&4294967295|E>>>20),E=w+(_^S&(m^_))+A[2]+606105819&4294967295,w=S+(E<<17&4294967295|E>>>15),E=_+(m^w&(S^m))+A[3]+3250441966&4294967295,_=w+(E<<22&4294967295|E>>>10),E=m+(S^_&(w^S))+A[4]+4118548399&4294967295,m=_+(E<<7&4294967295|E>>>25),E=S+(w^m&(_^w))+A[5]+1200080426&4294967295,S=m+(E<<12&4294967295|E>>>20),E=w+(_^S&(m^_))+A[6]+2821735955&4294967295,w=S+(E<<17&4294967295|E>>>15),E=_+(m^w&(S^m))+A[7]+4249261313&4294967295,_=w+(E<<22&4294967295|E>>>10),E=m+(S^_&(w^S))+A[8]+1770035416&4294967295,m=_+(E<<7&4294967295|E>>>25),E=S+(w^m&(_^w))+A[9]+2336552879&4294967295,S=m+(E<<12&4294967295|E>>>20),E=w+(_^S&(m^_))+A[10]+4294925233&4294967295,w=S+(E<<17&4294967295|E>>>15),E=_+(m^w&(S^m))+A[11]+2304563134&4294967295,_=w+(E<<22&4294967295|E>>>10),E=m+(S^_&(w^S))+A[12]+1804603682&4294967295,m=_+(E<<7&4294967295|E>>>25),E=S+(w^m&(_^w))+A[13]+4254626195&4294967295,S=m+(E<<12&4294967295|E>>>20),E=w+(_^S&(m^_))+A[14]+2792965006&4294967295,w=S+(E<<17&4294967295|E>>>15),E=_+(m^w&(S^m))+A[15]+1236535329&4294967295,_=w+(E<<22&4294967295|E>>>10),E=m+(w^S&(_^w))+A[1]+4129170786&4294967295,m=_+(E<<5&4294967295|E>>>27),E=S+(_^w&(m^_))+A[6]+3225465664&4294967295,S=m+(E<<9&4294967295|E>>>23),E=w+(m^_&(S^m))+A[11]+643717713&4294967295,w=S+(E<<14&4294967295|E>>>18),E=_+(S^m&(w^S))+A[0]+3921069994&4294967295,_=w+(E<<20&4294967295|E>>>12),E=m+(w^S&(_^w))+A[5]+3593408605&4294967295,m=_+(E<<5&4294967295|E>>>27),E=S+(_^w&(m^_))+A[10]+38016083&4294967295,S=m+(E<<9&4294967295|E>>>23),E=w+(m^_&(S^m))+A[15]+3634488961&4294967295,w=S+(E<<14&4294967295|E>>>18),E=_+(S^m&(w^S))+A[4]+3889429448&4294967295,_=w+(E<<20&4294967295|E>>>12),E=m+(w^S&(_^w))+A[9]+568446438&4294967295,m=_+(E<<5&4294967295|E>>>27),E=S+(_^w&(m^_))+A[14]+3275163606&4294967295,S=m+(E<<9&4294967295|E>>>23),E=w+(m^_&(S^m))+A[3]+4107603335&4294967295,w=S+(E<<14&4294967295|E>>>18),E=_+(S^m&(w^S))+A[8]+1163531501&4294967295,_=w+(E<<20&4294967295|E>>>12),E=m+(w^S&(_^w))+A[13]+2850285829&4294967295,m=_+(E<<5&4294967295|E>>>27),E=S+(_^w&(m^_))+A[2]+4243563512&4294967295,S=m+(E<<9&4294967295|E>>>23),E=w+(m^_&(S^m))+A[7]+1735328473&4294967295,w=S+(E<<14&4294967295|E>>>18),E=_+(S^m&(w^S))+A[12]+2368359562&4294967295,_=w+(E<<20&4294967295|E>>>12),E=m+(_^w^S)+A[5]+4294588738&4294967295,m=_+(E<<4&4294967295|E>>>28),E=S+(m^_^w)+A[8]+2272392833&4294967295,S=m+(E<<11&4294967295|E>>>21),E=w+(S^m^_)+A[11]+1839030562&4294967295,w=S+(E<<16&4294967295|E>>>16),E=_+(w^S^m)+A[14]+4259657740&4294967295,_=w+(E<<23&4294967295|E>>>9),E=m+(_^w^S)+A[1]+2763975236&4294967295,m=_+(E<<4&4294967295|E>>>28),E=S+(m^_^w)+A[4]+1272893353&4294967295,S=m+(E<<11&4294967295|E>>>21),E=w+(S^m^_)+A[7]+4139469664&4294967295,w=S+(E<<16&4294967295|E>>>16),E=_+(w^S^m)+A[10]+3200236656&4294967295,_=w+(E<<23&4294967295|E>>>9),E=m+(_^w^S)+A[13]+681279174&4294967295,m=_+(E<<4&4294967295|E>>>28),E=S+(m^_^w)+A[0]+3936430074&4294967295,S=m+(E<<11&4294967295|E>>>21),E=w+(S^m^_)+A[3]+3572445317&4294967295,w=S+(E<<16&4294967295|E>>>16),E=_+(w^S^m)+A[6]+76029189&4294967295,_=w+(E<<23&4294967295|E>>>9),E=m+(_^w^S)+A[9]+3654602809&4294967295,m=_+(E<<4&4294967295|E>>>28),E=S+(m^_^w)+A[12]+3873151461&4294967295,S=m+(E<<11&4294967295|E>>>21),E=w+(S^m^_)+A[15]+530742520&4294967295,w=S+(E<<16&4294967295|E>>>16),E=_+(w^S^m)+A[2]+3299628645&4294967295,_=w+(E<<23&4294967295|E>>>9),E=m+(w^(_|~S))+A[0]+4096336452&4294967295,m=_+(E<<6&4294967295|E>>>26),E=S+(_^(m|~w))+A[7]+1126891415&4294967295,S=m+(E<<10&4294967295|E>>>22),E=w+(m^(S|~_))+A[14]+2878612391&4294967295,w=S+(E<<15&4294967295|E>>>17),E=_+(S^(w|~m))+A[5]+4237533241&4294967295,_=w+(E<<21&4294967295|E>>>11),E=m+(w^(_|~S))+A[12]+1700485571&4294967295,m=_+(E<<6&4294967295|E>>>26),E=S+(_^(m|~w))+A[3]+2399980690&4294967295,S=m+(E<<10&4294967295|E>>>22),E=w+(m^(S|~_))+A[10]+4293915773&4294967295,w=S+(E<<15&4294967295|E>>>17),E=_+(S^(w|~m))+A[1]+2240044497&4294967295,_=w+(E<<21&4294967295|E>>>11),E=m+(w^(_|~S))+A[8]+1873313359&4294967295,m=_+(E<<6&4294967295|E>>>26),E=S+(_^(m|~w))+A[15]+4264355552&4294967295,S=m+(E<<10&4294967295|E>>>22),E=w+(m^(S|~_))+A[6]+2734768916&4294967295,w=S+(E<<15&4294967295|E>>>17),E=_+(S^(w|~m))+A[13]+1309151649&4294967295,_=w+(E<<21&4294967295|E>>>11),E=m+(w^(_|~S))+A[4]+4149444226&4294967295,m=_+(E<<6&4294967295|E>>>26),E=S+(_^(m|~w))+A[11]+3174756917&4294967295,S=m+(E<<10&4294967295|E>>>22),E=w+(m^(S|~_))+A[2]+718787259&4294967295,w=S+(E<<15&4294967295|E>>>17),E=_+(S^(w|~m))+A[9]+3951481745&4294967295,I.g[0]=I.g[0]+m&4294967295,I.g[1]=I.g[1]+(w+(E<<21&4294967295|E>>>11))&4294967295,I.g[2]=I.g[2]+w&4294967295,I.g[3]=I.g[3]+S&4294967295}r.prototype.v=function(I,m){m===void 0&&(m=I.length);let _=m-this.blockSize,A=this.C,w=this.h,S=0;for(;S<m;){if(w==0)for(;S<=_;)s(this,I,S),S+=this.blockSize;if(typeof I=="string"){for(;S<m;)if(A[w++]=I.charCodeAt(S++),w==this.blockSize){s(this,A),w=0;break}}else for(;S<m;)if(A[w++]=I[S++],w==this.blockSize){s(this,A),w=0;break}}this.h=w,this.o+=m},r.prototype.A=function(){var I=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);I[0]=128;for(var m=1;m<I.length-8;++m)I[m]=0;m=this.o*8;for(var _=I.length-8;_<I.length;++_)I[_]=m&255,m/=256;for(this.v(I),I=Array(16),m=0,_=0;_<4;++_)for(let A=0;A<32;A+=8)I[m++]=this.g[_]>>>A&255;return I};function i(I,m){var _=u;return Object.prototype.hasOwnProperty.call(_,I)?_[I]:_[I]=m(I)}function a(I,m){this.h=m;let _=[],A=!0;for(let w=I.length-1;w>=0;w--){let S=I[w]|0;A&&S==m||(_[w]=S,A=!1)}this.g=_}var u={};function c(I){return-128<=I&&I<128?i(I,function(m){return new a([m|0],m<0?-1:0)}):new a([I|0],I<0?-1:0)}function l(I){if(isNaN(I)||!isFinite(I))return d;if(I<0)return j(l(-I));let m=[],_=1;for(let A=0;I>=_;A++)m[A]=I/_|0,_*=4294967296;return new a(m,0)}function f(I,m){if(I.length==0)throw Error("number format error: empty string");if(m=m||10,m<2||36<m)throw Error("radix out of range: "+m);if(I.charAt(0)=="-")return j(f(I.substring(1),m));if(I.indexOf("-")>=0)throw Error('number format error: interior "-" character');let _=l(Math.pow(m,8)),A=d;for(let S=0;S<I.length;S+=8){var w=Math.min(8,I.length-S);let E=parseInt(I.substring(S,S+w),m);w<8?(w=l(Math.pow(m,w)),A=A.j(w).add(l(E))):(A=A.j(_),A=A.add(l(E)))}return A}var d=c(0),y=c(1),R=c(16777216);n=a.prototype,n.m=function(){if(L(this))return-j(this).m();let I=0,m=1;for(let _=0;_<this.g.length;_++){let A=this.i(_);I+=(A>=0?A:4294967296+A)*m,m*=4294967296}return I},n.toString=function(I){if(I=I||10,I<2||36<I)throw Error("radix out of range: "+I);if(v(this))return"0";if(L(this))return"-"+j(this).toString(I);let m=l(Math.pow(I,6));var _=this;let A="";for(;;){let w=be(_,m).g;_=z(_,w.j(m));let S=((_.g.length>0?_.g[0]:_.h)>>>0).toString(I);if(_=w,v(_))return S+A;for(;S.length<6;)S="0"+S;A=S+A}},n.i=function(I){return I<0?0:I<this.g.length?this.g[I]:this.h};function v(I){if(I.h!=0)return!1;for(let m=0;m<I.g.length;m++)if(I.g[m]!=0)return!1;return!0}function L(I){return I.h==-1}n.l=function(I){return I=z(this,I),L(I)?-1:v(I)?0:1};function j(I){let m=I.g.length,_=[];for(let A=0;A<m;A++)_[A]=~I.g[A];return new a(_,~I.h).add(y)}n.abs=function(){return L(this)?j(this):this},n.add=function(I){let m=Math.max(this.g.length,I.g.length),_=[],A=0;for(let w=0;w<=m;w++){let S=A+(this.i(w)&65535)+(I.i(w)&65535),E=(S>>>16)+(this.i(w)>>>16)+(I.i(w)>>>16);A=E>>>16,S&=65535,E&=65535,_[w]=E<<16|S}return new a(_,_[_.length-1]&-2147483648?-1:0)};function z(I,m){return I.add(j(m))}n.j=function(I){if(v(this)||v(I))return d;if(L(this))return L(I)?j(this).j(j(I)):j(j(this).j(I));if(L(I))return j(this.j(j(I)));if(this.l(R)<0&&I.l(R)<0)return l(this.m()*I.m());let m=this.g.length+I.g.length,_=[];for(var A=0;A<2*m;A++)_[A]=0;for(A=0;A<this.g.length;A++)for(let w=0;w<I.g.length;w++){let S=this.i(A)>>>16,E=this.i(A)&65535,Ze=I.i(w)>>>16,En=I.i(w)&65535;_[2*A+2*w]+=E*En,W(_,2*A+2*w),_[2*A+2*w+1]+=S*En,W(_,2*A+2*w+1),_[2*A+2*w+1]+=E*Ze,W(_,2*A+2*w+1),_[2*A+2*w+2]+=S*Ze,W(_,2*A+2*w+2)}for(I=0;I<m;I++)_[I]=_[2*I+1]<<16|_[2*I];for(I=m;I<2*m;I++)_[I]=0;return new a(_,0)};function W(I,m){for(;(I[m]&65535)!=I[m];)I[m+1]+=I[m]>>>16,I[m]&=65535,m++}function he(I,m){this.g=I,this.h=m}function be(I,m){if(v(m))throw Error("division by zero");if(v(I))return new he(d,d);if(L(I))return m=be(j(I),m),new he(j(m.g),j(m.h));if(L(m))return m=be(I,j(m)),new he(j(m.g),m.h);if(I.g.length>30){if(L(I)||L(m))throw Error("slowDivide_ only works with positive integers.");for(var _=y,A=m;A.l(I)<=0;)_=Xe(_),A=Xe(A);var w=Re(_,1),S=Re(A,1);for(A=Re(A,2),_=Re(_,2);!v(A);){var E=S.add(A);E.l(I)<=0&&(w=w.add(_),S=E),A=Re(A,1),_=Re(_,1)}return m=z(I,w.j(m)),new he(w,m)}for(w=d;I.l(m)>=0;){for(_=Math.max(1,Math.floor(I.m()/m.m())),A=Math.ceil(Math.log(_)/Math.LN2),A=A<=48?1:Math.pow(2,A-48),S=l(_),E=S.j(m);L(E)||E.l(I)>0;)_-=A,S=l(_),E=S.j(m);v(S)&&(S=y),w=w.add(S),I=z(I,E)}return new he(w,I)}n.B=function(I){return be(this,I).h},n.and=function(I){let m=Math.max(this.g.length,I.g.length),_=[];for(let A=0;A<m;A++)_[A]=this.i(A)&I.i(A);return new a(_,this.h&I.h)},n.or=function(I){let m=Math.max(this.g.length,I.g.length),_=[];for(let A=0;A<m;A++)_[A]=this.i(A)|I.i(A);return new a(_,this.h|I.h)},n.xor=function(I){let m=Math.max(this.g.length,I.g.length),_=[];for(let A=0;A<m;A++)_[A]=this.i(A)^I.i(A);return new a(_,this.h^I.h)};function Xe(I){let m=I.g.length+1,_=[];for(let A=0;A<m;A++)_[A]=I.i(A)<<1|I.i(A-1)>>>31;return new a(_,I.h)}function Re(I,m){let _=m>>5;m%=32;let A=I.g.length-_,w=[];for(let S=0;S<A;S++)w[S]=m>0?I.i(S+_)>>>m|I.i(S+_+1)<<32-m:I.i(S+_);return new a(w,I.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,Fh=Ph.Md5=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.B,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=l,a.fromString=f,Ti=Ph.Integer=a}).apply(typeof Nh<"u"?Nh:typeof self<"u"?self:typeof window<"u"?window:{});var Ai=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},Vt={};var va,Kg,ur,Oa,us,bi,Na,Pa,Fa;(function(){var n,e=Object.defineProperty;function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof Ai=="object"&&Ai];for(var B=0;B<o.length;++B){var h=o[B];if(h&&h.Math==Math)return h}throw Error("Cannot find global object")}var r=t(this);function s(o,B){if(B)e:{var h=r;o=o.split(".");for(var C=0;C<o.length-1;C++){var b=o[C];if(!(b in h))break e;h=h[b]}o=o[o.length-1],C=h[o],B=B(C),B!=C&&B!=null&&e(h,o,{configurable:!0,writable:!0,value:B})}}s("Symbol.dispose",function(o){return o||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(o){return o||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(o){return o||function(B){var h=[],C;for(C in B)Object.prototype.hasOwnProperty.call(B,C)&&h.push([C,B[C]]);return h}});var i=i||{},a=this||self;function u(o){var B=typeof o;return B=="object"&&o!=null||B=="function"}function c(o,B,h){return o.call.apply(o.bind,arguments)}function l(o,B,h){return l=c,l.apply(null,arguments)}function f(o,B){var h=Array.prototype.slice.call(arguments,1);return function(){var C=h.slice();return C.push.apply(C,arguments),o.apply(this,C)}}function d(o,B){function h(){}h.prototype=B.prototype,o.Z=B.prototype,o.prototype=new h,o.prototype.constructor=o,o.Ob=function(C,b,O){for(var U=Array(arguments.length-2),re=2;re<arguments.length;re++)U[re-2]=arguments[re];return B.prototype[b].apply(C,U)}}var y=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?o=>o&&AsyncContext.Snapshot.wrap(o):o=>o;function R(o){let B=o.length;if(B>0){let h=Array(B);for(let C=0;C<B;C++)h[C]=o[C];return h}return[]}function v(o,B){for(let C=1;C<arguments.length;C++){let b=arguments[C];var h=typeof b;if(h=h!="object"?h:b?Array.isArray(b)?"array":h:"null",h=="array"||h=="object"&&typeof b.length=="number"){h=o.length||0;let O=b.length||0;o.length=h+O;for(let U=0;U<O;U++)o[h+U]=b[U]}else o.push(b)}}class L{constructor(B,h){this.i=B,this.j=h,this.h=0,this.g=null}get(){let B;return this.h>0?(this.h--,B=this.g,this.g=B.next,B.next=null):B=this.i(),B}}function j(o){a.setTimeout(()=>{throw o},0)}function z(){var o=I;let B=null;return o.g&&(B=o.g,o.g=o.g.next,o.g||(o.h=null),B.next=null),B}class W{constructor(){this.h=this.g=null}add(B,h){let C=he.get();C.set(B,h),this.h?this.h.next=C:this.g=C,this.h=C}}var he=new L(()=>new be,o=>o.reset());class be{constructor(){this.next=this.g=this.h=null}set(B,h){this.h=B,this.g=h,this.next=null}reset(){this.next=this.g=this.h=null}}let Xe,Re=!1,I=new W,m=()=>{let o=Promise.resolve(void 0);Xe=()=>{o.then(_)}};function _(){for(var o;o=z();){try{o.h.call(o.g)}catch(h){j(h)}var B=he;B.j(o),B.h<100&&(B.h++,o.next=B.g,B.g=o)}Re=!1}function A(){this.u=this.u,this.C=this.C}A.prototype.u=!1,A.prototype.dispose=function(){this.u||(this.u=!0,this.N())},A.prototype[Symbol.dispose]=function(){this.dispose()},A.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function w(o,B){this.type=o,this.g=this.target=B,this.defaultPrevented=!1}w.prototype.h=function(){this.defaultPrevented=!0};var S=function(){if(!a.addEventListener||!Object.defineProperty)return!1;var o=!1,B=Object.defineProperty({},"passive",{get:function(){o=!0}});try{let h=()=>{};a.addEventListener("test",h,B),a.removeEventListener("test",h,B)}catch{}return o}();function E(o){return/^[\s\xa0]*$/.test(o)}function Ze(o,B){w.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o&&this.init(o,B)}d(Ze,w),Ze.prototype.init=function(o,B){let h=this.type=o.type,C=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;this.target=o.target||o.srcElement,this.g=B,B=o.relatedTarget,B||(h=="mouseover"?B=o.fromElement:h=="mouseout"&&(B=o.toElement)),this.relatedTarget=B,C?(this.clientX=C.clientX!==void 0?C.clientX:C.pageX,this.clientY=C.clientY!==void 0?C.clientY:C.pageY,this.screenX=C.screenX||0,this.screenY=C.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=o.pointerType,this.state=o.state,this.i=o,o.defaultPrevented&&Ze.Z.h.call(this)},Ze.prototype.h=function(){Ze.Z.h.call(this);let o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var En="closure_listenable_"+(Math.random()*1e6|0),ep=0;function tp(o,B,h,C,b){this.listener=o,this.proxy=null,this.src=B,this.type=h,this.capture=!!C,this.ha=b,this.key=++ep,this.da=this.fa=!1}function ni(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function ri(o,B,h){for(let C in o)B.call(h,o[C],C,o)}function np(o,B){for(let h in o)B.call(void 0,o[h],h,o)}function il(o){let B={};for(let h in o)B[h]=o[h];return B}let ol="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function al(o,B){let h,C;for(let b=1;b<arguments.length;b++){C=arguments[b];for(h in C)o[h]=C[h];for(let O=0;O<ol.length;O++)h=ol[O],Object.prototype.hasOwnProperty.call(C,h)&&(o[h]=C[h])}}function si(o){this.src=o,this.g={},this.h=0}si.prototype.add=function(o,B,h,C,b){let O=o.toString();o=this.g[O],o||(o=this.g[O]=[],this.h++);let U=Uo(o,B,C,b);return U>-1?(B=o[U],h||(B.fa=!1)):(B=new tp(B,this.src,O,!!C,b),B.fa=h,o.push(B)),B};function Ho(o,B){let h=B.type;if(h in o.g){var C=o.g[h],b=Array.prototype.indexOf.call(C,B,void 0),O;(O=b>=0)&&Array.prototype.splice.call(C,b,1),O&&(ni(B),o.g[h].length==0&&(delete o.g[h],o.h--))}}function Uo(o,B,h,C){for(let b=0;b<o.length;++b){let O=o[b];if(!O.da&&O.listener==B&&O.capture==!!h&&O.ha==C)return b}return-1}var qo="closure_lm_"+(Math.random()*1e6|0),jo={};function ul(o,B,h,C,b){if(Array.isArray(B)){for(let O=0;O<B.length;O++)ul(o,B[O],h,C,b);return null}return h=ll(h),o&&o[En]?o.J(B,h,u(C)?!!C.capture:!1,b):rp(o,B,h,!1,C,b)}function rp(o,B,h,C,b,O){if(!B)throw Error("Invalid event type");let U=u(b)?!!b.capture:!!b,re=Ko(o);if(re||(o[qo]=re=new si(o)),h=re.add(B,h,C,U,O),h.proxy)return h;if(C=sp(),h.proxy=C,C.src=o,C.listener=h,o.addEventListener)S||(b=U),b===void 0&&(b=!1),o.addEventListener(B.toString(),C,b);else if(o.attachEvent)o.attachEvent(Bl(B.toString()),C);else if(o.addListener&&o.removeListener)o.addListener(C);else throw Error("addEventListener and attachEvent are unavailable.");return h}function sp(){function o(h){return B.call(o.src,o.listener,h)}let B=ip;return o}function cl(o,B,h,C,b){if(Array.isArray(B))for(var O=0;O<B.length;O++)cl(o,B[O],h,C,b);else C=u(C)?!!C.capture:!!C,h=ll(h),o&&o[En]?(o=o.i,O=String(B).toString(),O in o.g&&(B=o.g[O],h=Uo(B,h,C,b),h>-1&&(ni(B[h]),Array.prototype.splice.call(B,h,1),B.length==0&&(delete o.g[O],o.h--)))):o&&(o=Ko(o))&&(B=o.g[B.toString()],o=-1,B&&(o=Uo(B,h,C,b)),(h=o>-1?B[o]:null)&&Jo(h))}function Jo(o){if(typeof o!="number"&&o&&!o.da){var B=o.src;if(B&&B[En])Ho(B.i,o);else{var h=o.type,C=o.proxy;B.removeEventListener?B.removeEventListener(h,C,o.capture):B.detachEvent?B.detachEvent(Bl(h),C):B.addListener&&B.removeListener&&B.removeListener(C),(h=Ko(B))?(Ho(h,o),h.h==0&&(h.src=null,B[qo]=null)):ni(o)}}}function Bl(o){return o in jo?jo[o]:jo[o]="on"+o}function ip(o,B){if(o.da)o=!0;else{B=new Ze(B,this);let h=o.listener,C=o.ha||o.src;o.fa&&Jo(o),o=h.call(C,B)}return o}function Ko(o){return o=o[qo],o instanceof si?o:null}var zo="__closure_events_fn_"+(Math.random()*1e9>>>0);function ll(o){return typeof o=="function"?o:(o[zo]||(o[zo]=function(B){return o.handleEvent(B)}),o[zo])}function Ue(){A.call(this),this.i=new si(this),this.M=this,this.G=null}d(Ue,A),Ue.prototype[En]=!0,Ue.prototype.removeEventListener=function(o,B,h,C){cl(this,o,B,h,C)};function ze(o,B){var h,C=o.G;if(C)for(h=[];C;C=C.G)h.push(C);if(o=o.M,C=B.type||B,typeof B=="string")B=new w(B,o);else if(B instanceof w)B.target=B.target||o;else{var b=B;B=new w(C,o),al(B,b)}b=!0;let O,U;if(h)for(U=h.length-1;U>=0;U--)O=B.g=h[U],b=ii(O,C,!0,B)&&b;if(O=B.g=o,b=ii(O,C,!0,B)&&b,b=ii(O,C,!1,B)&&b,h)for(U=0;U<h.length;U++)O=B.g=h[U],b=ii(O,C,!1,B)&&b}Ue.prototype.N=function(){if(Ue.Z.N.call(this),this.i){var o=this.i;for(let B in o.g){let h=o.g[B];for(let C=0;C<h.length;C++)ni(h[C]);delete o.g[B],o.h--}}this.G=null},Ue.prototype.J=function(o,B,h,C){return this.i.add(String(o),B,!1,h,C)},Ue.prototype.K=function(o,B,h,C){return this.i.add(String(o),B,!0,h,C)};function ii(o,B,h,C){if(B=o.i.g[String(B)],!B)return!0;B=B.concat();let b=!0;for(let O=0;O<B.length;++O){let U=B[O];if(U&&!U.da&&U.capture==h){let re=U.listener,Ne=U.ha||U.src;U.fa&&Ho(o.i,U),b=re.call(Ne,C)!==!1&&b}}return b&&!C.defaultPrevented}function op(o,B){if(typeof o!="function")if(o&&typeof o.handleEvent=="function")o=l(o.handleEvent,o);else throw Error("Invalid listener argument");return Number(B)>2147483647?-1:a.setTimeout(o,B||0)}function hl(o){o.g=op(()=>{o.g=null,o.i&&(o.i=!1,hl(o))},o.l);let B=o.h;o.h=null,o.m.apply(null,B)}class ap extends A{constructor(B,h){super(),this.m=B,this.l=h,this.h=null,this.i=!1,this.g=null}j(B){this.h=arguments,this.g?this.i=!0:hl(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Ur(o){A.call(this),this.h=o,this.g={}}d(Ur,A);var fl=[];function dl(o){ri(o.g,function(B,h){this.g.hasOwnProperty(h)&&Jo(B)},o),o.g={}}Ur.prototype.N=function(){Ur.Z.N.call(this),dl(this)},Ur.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Qo=a.JSON.stringify,up=a.JSON.parse,cp=class{stringify(o){return a.JSON.stringify(o,void 0)}parse(o){return a.JSON.parse(o,void 0)}};function Cl(){}function pl(){}var qr={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function $o(){w.call(this,"d")}d($o,w);function Wo(){w.call(this,"c")}d(Wo,w);var _n={},gl=null;function oi(){return gl=gl||new Ue}_n.Ia="serverreachability";function ml(o){w.call(this,_n.Ia,o)}d(ml,w);function jr(o){let B=oi();ze(B,new ml(B))}_n.STAT_EVENT="statevent";function El(o,B){w.call(this,_n.STAT_EVENT,o),this.stat=B}d(El,w);function Qe(o){let B=oi();ze(B,new El(B,o))}_n.Ja="timingevent";function _l(o,B){w.call(this,_n.Ja,o),this.size=B}d(_l,w);function Jr(o,B){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){o()},B)}function Kr(){this.g=!0}Kr.prototype.ua=function(){this.g=!1};function Bp(o,B,h,C,b,O){o.info(function(){if(o.g)if(O){var U="",re=O.split("&");for(let fe=0;fe<re.length;fe++){var Ne=re[fe].split("=");if(Ne.length>1){let Le=Ne[0];Ne=Ne[1];let At=Le.split("_");U=At.length>=2&&At[1]=="type"?U+(Le+"="+Ne+"&"):U+(Le+"=redacted&")}}}else U=null;else U=O;return"XMLHTTP REQ ("+C+") [attempt "+b+"]: "+B+`
`+h+`
`+U})}function lp(o,B,h,C,b,O,U){o.info(function(){return"XMLHTTP RESP ("+C+") [ attempt "+b+"]: "+B+`
`+h+`
`+O+" "+U})}function ir(o,B,h,C){o.info(function(){return"XMLHTTP TEXT ("+B+"): "+fp(o,h)+(C?" "+C:"")})}function hp(o,B){o.info(function(){return"TIMEOUT: "+B})}Kr.prototype.info=function(){};function fp(o,B){if(!o.g)return B;if(!B)return null;try{let O=JSON.parse(B);if(O){for(o=0;o<O.length;o++)if(Array.isArray(O[o])){var h=O[o];if(!(h.length<2)){var C=h[1];if(Array.isArray(C)&&!(C.length<1)){var b=C[0];if(b!="noop"&&b!="stop"&&b!="close")for(let U=1;U<C.length;U++)C[U]=""}}}}return Qo(O)}catch{return B}}var ai={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},Dl={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},yl;function Yo(){}d(Yo,Cl),Yo.prototype.g=function(){return new XMLHttpRequest},yl=new Yo;function zr(o){return encodeURIComponent(String(o))}function dp(o){var B=1;o=o.split(":");let h=[];for(;B>0&&o.length;)h.push(o.shift()),B--;return o.length&&h.push(o.join(":")),h}function zt(o,B,h,C){this.j=o,this.i=B,this.l=h,this.S=C||1,this.V=new Ur(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new wl}function wl(){this.i=null,this.g="",this.h=!1}var Il={},Xo={};function Zo(o,B,h){o.M=1,o.A=ci(Tt(B)),o.u=h,o.R=!0,Tl(o,null)}function Tl(o,B){o.F=Date.now(),ui(o),o.B=Tt(o.A);var h=o.B,C=o.S;Array.isArray(C)||(C=[String(C)]),Vl(h.i,"t",C),o.C=0,h=o.j.L,o.h=new wl,o.g=nh(o.j,h?B:null,!o.u),o.P>0&&(o.O=new ap(l(o.Y,o,o.g),o.P)),B=o.V,h=o.g,C=o.ba;var b="readystatechange";Array.isArray(b)||(b&&(fl[0]=b.toString()),b=fl);for(let O=0;O<b.length;O++){let U=ul(h,b[O],C||B.handleEvent,!1,B.h||B);if(!U)break;B.g[U.key]=U}B=o.J?il(o.J):{},o.u?(o.v||(o.v="POST"),B["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.B,o.v,o.u,B)):(o.v="GET",o.g.ea(o.B,o.v,null,B)),jr(),Bp(o.i,o.v,o.B,o.l,o.S,o.u)}zt.prototype.ba=function(o){o=o.target;let B=this.O;B&&Wt(o)==3?B.j():this.Y(o)},zt.prototype.Y=function(o){try{if(o==this.g)e:{let re=Wt(this.g),Ne=this.g.ya(),fe=this.g.ca();if(!(re<3)&&(re!=3||this.g&&(this.h.h||this.g.la()||Jl(this.g)))){this.K||re!=4||Ne==7||(Ne==8||fe<=0?jr(3):jr(2)),ea(this);var B=this.g.ca();this.X=B;var h=Cp(this);if(this.o=B==200,lp(this.i,this.v,this.B,this.l,this.S,re,B),this.o){if(this.U&&!this.L){t:{if(this.g){var C,b=this.g;if((C=b.g?b.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!E(C)){var O=C;break t}}O=null}if(o=O)ir(this.i,this.l,o,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,ta(this,o);else{this.o=!1,this.m=3,Qe(12),Dn(this),Qr(this);break e}}if(this.R){o=!0;let Le;for(;!this.K&&this.C<h.length;)if(Le=pp(this,h),Le==Xo){re==4&&(this.m=4,Qe(14),o=!1),ir(this.i,this.l,null,"[Incomplete Response]");break}else if(Le==Il){this.m=4,Qe(15),ir(this.i,this.l,h,"[Invalid Chunk]"),o=!1;break}else ir(this.i,this.l,Le,null),ta(this,Le);if(Al(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),re!=4||h.length!=0||this.h.h||(this.m=1,Qe(16),o=!1),this.o=this.o&&o,!o)ir(this.i,this.l,h,"[Invalid Chunked Response]"),Dn(this),Qr(this);else if(h.length>0&&!this.W){this.W=!0;var U=this.j;U.g==this&&U.aa&&!U.P&&(U.j.info("Great, no buffering proxy detected. Bytes received: "+h.length),ua(U),U.P=!0,Qe(11))}}else ir(this.i,this.l,h,null),ta(this,h);re==4&&Dn(this),this.o&&!this.K&&(re==4?Xl(this.j,this):(this.o=!1,ui(this)))}else vp(this.g),B==400&&h.indexOf("Unknown SID")>0?(this.m=3,Qe(12)):(this.m=0,Qe(13)),Dn(this),Qr(this)}}}catch{}finally{}};function Cp(o){if(!Al(o))return o.g.la();let B=Jl(o.g);if(B==="")return"";let h="",C=B.length,b=Wt(o.g)==4;if(!o.h.i){if(typeof TextDecoder>"u")return Dn(o),Qr(o),"";o.h.i=new a.TextDecoder}for(let O=0;O<C;O++)o.h.h=!0,h+=o.h.i.decode(B[O],{stream:!(b&&O==C-1)});return B.length=0,o.h.g+=h,o.C=0,o.h.g}function Al(o){return o.g?o.v=="GET"&&o.M!=2&&o.j.Aa:!1}function pp(o,B){var h=o.C,C=B.indexOf(`
`,h);return C==-1?Xo:(h=Number(B.substring(h,C)),isNaN(h)?Il:(C+=1,C+h>B.length?Xo:(B=B.slice(C,C+h),o.C=C+h,B)))}zt.prototype.cancel=function(){this.K=!0,Dn(this)};function ui(o){o.T=Date.now()+o.H,bl(o,o.H)}function bl(o,B){if(o.D!=null)throw Error("WatchDog timer not null");o.D=Jr(l(o.aa,o),B)}function ea(o){o.D&&(a.clearTimeout(o.D),o.D=null)}zt.prototype.aa=function(){this.D=null;let o=Date.now();o-this.T>=0?(hp(this.i,this.B),this.M!=2&&(jr(),Qe(17)),Dn(this),this.m=2,Qr(this)):bl(this,this.T-o)};function Qr(o){o.j.I==0||o.K||Xl(o.j,o)}function Dn(o){ea(o);var B=o.O;B&&typeof B.dispose=="function"&&B.dispose(),o.O=null,dl(o.V),o.g&&(B=o.g,o.g=null,B.abort(),B.dispose())}function ta(o,B){try{var h=o.j;if(h.I!=0&&(h.g==o||na(h.h,o))){if(!o.L&&na(h.h,o)&&h.I==3){try{var C=h.Ba.g.parse(B)}catch{C=null}if(Array.isArray(C)&&C.length==3){var b=C;if(b[0]==0){e:if(!h.v){if(h.g)if(h.g.F+3e3<o.F)Ci(h),fi(h);else break e;aa(h),Qe(18)}}else h.xa=b[1],0<h.xa-h.K&&b[2]<37500&&h.F&&h.A==0&&!h.C&&(h.C=Jr(l(h.Va,h),6e3));vl(h.h)<=1&&h.ta&&(h.ta=void 0)}else wn(h,11)}else if((o.L||h.g==o)&&Ci(h),!E(B))for(b=h.Ba.g.parse(B),B=0;B<b.length;B++){let fe=b[B],Le=fe[0];if(!(Le<=h.K))if(h.K=Le,fe=fe[1],h.I==2)if(fe[0]=="c"){h.M=fe[1],h.ba=fe[2];let At=fe[3];At!=null&&(h.ka=At,h.j.info("VER="+h.ka));let In=fe[4];In!=null&&(h.za=In,h.j.info("SVER="+h.za));let Yt=fe[5];Yt!=null&&typeof Yt=="number"&&Yt>0&&(C=1.5*Yt,h.O=C,h.j.info("backChannelRequestTimeoutMs_="+C)),C=h;let Xt=o.g;if(Xt){let gi=Xt.g?Xt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(gi){var O=C.h;O.g||gi.indexOf("spdy")==-1&&gi.indexOf("quic")==-1&&gi.indexOf("h2")==-1||(O.j=O.l,O.g=new Set,O.h&&(ra(O,O.h),O.h=null))}if(C.G){let ca=Xt.g?Xt.g.getResponseHeader("X-HTTP-Session-Id"):null;ca&&(C.wa=ca,Ee(C.J,C.G,ca))}}h.I=3,h.l&&h.l.ra(),h.aa&&(h.T=Date.now()-o.F,h.j.info("Handshake RTT: "+h.T+"ms")),C=h;var U=o;if(C.na=th(C,C.L?C.ba:null,C.W),U.L){Ol(C.h,U);var re=U,Ne=C.O;Ne&&(re.H=Ne),re.D&&(ea(re),ui(re)),C.g=U}else Wl(C);h.i.length>0&&di(h)}else fe[0]!="stop"&&fe[0]!="close"||wn(h,7);else h.I==3&&(fe[0]=="stop"||fe[0]=="close"?fe[0]=="stop"?wn(h,7):oa(h):fe[0]!="noop"&&h.l&&h.l.qa(fe),h.A=0)}}jr(4)}catch{}}var gp=class{constructor(o,B){this.g=o,this.map=B}};function Rl(o){this.l=o||10,a.PerformanceNavigationTiming?(o=a.performance.getEntriesByType("navigation"),o=o.length>0&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function Sl(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function vl(o){return o.h?1:o.g?o.g.size:0}function na(o,B){return o.h?o.h==B:o.g?o.g.has(B):!1}function ra(o,B){o.g?o.g.add(B):o.h=B}function Ol(o,B){o.h&&o.h==B?o.h=null:o.g&&o.g.has(B)&&o.g.delete(B)}Rl.prototype.cancel=function(){if(this.i=Nl(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(let o of this.g.values())o.cancel();this.g.clear()}};function Nl(o){if(o.h!=null)return o.i.concat(o.h.G);if(o.g!=null&&o.g.size!==0){let B=o.i;for(let h of o.g.values())B=B.concat(h.G);return B}return R(o.i)}var Pl=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function mp(o,B){if(o){o=o.split("&");for(let h=0;h<o.length;h++){let C=o[h].indexOf("="),b,O=null;C>=0?(b=o[h].substring(0,C),O=o[h].substring(C+1)):b=o[h],B(b,O?decodeURIComponent(O.replace(/\+/g," ")):"")}}}function Qt(o){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let B;o instanceof Qt?(this.l=o.l,$r(this,o.j),this.o=o.o,this.g=o.g,Wr(this,o.u),this.h=o.h,sa(this,Ml(o.i)),this.m=o.m):o&&(B=String(o).match(Pl))?(this.l=!1,$r(this,B[1]||"",!0),this.o=Yr(B[2]||""),this.g=Yr(B[3]||"",!0),Wr(this,B[4]),this.h=Yr(B[5]||"",!0),sa(this,B[6]||"",!0),this.m=Yr(B[7]||"")):(this.l=!1,this.i=new Zr(null,this.l))}Qt.prototype.toString=function(){let o=[];var B=this.j;B&&o.push(Xr(B,Fl,!0),":");var h=this.g;return(h||B=="file")&&(o.push("//"),(B=this.o)&&o.push(Xr(B,Fl,!0),"@"),o.push(zr(h).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),h=this.u,h!=null&&o.push(":",String(h))),(h=this.h)&&(this.g&&h.charAt(0)!="/"&&o.push("/"),o.push(Xr(h,h.charAt(0)=="/"?Dp:_p,!0))),(h=this.i.toString())&&o.push("?",h),(h=this.m)&&o.push("#",Xr(h,wp)),o.join("")},Qt.prototype.resolve=function(o){let B=Tt(this),h=!!o.j;h?$r(B,o.j):h=!!o.o,h?B.o=o.o:h=!!o.g,h?B.g=o.g:h=o.u!=null;var C=o.h;if(h)Wr(B,o.u);else if(h=!!o.h){if(C.charAt(0)!="/")if(this.g&&!this.h)C="/"+C;else{var b=B.h.lastIndexOf("/");b!=-1&&(C=B.h.slice(0,b+1)+C)}if(b=C,b==".."||b==".")C="";else if(b.indexOf("./")!=-1||b.indexOf("/.")!=-1){C=b.lastIndexOf("/",0)==0,b=b.split("/");let O=[];for(let U=0;U<b.length;){let re=b[U++];re=="."?C&&U==b.length&&O.push(""):re==".."?((O.length>1||O.length==1&&O[0]!="")&&O.pop(),C&&U==b.length&&O.push("")):(O.push(re),C=!0)}C=O.join("/")}else C=b}return h?B.h=C:h=o.i.toString()!=="",h?sa(B,Ml(o.i)):h=!!o.m,h&&(B.m=o.m),B};function Tt(o){return new Qt(o)}function $r(o,B,h){o.j=h?Yr(B,!0):B,o.j&&(o.j=o.j.replace(/:$/,""))}function Wr(o,B){if(B){if(B=Number(B),isNaN(B)||B<0)throw Error("Bad port number "+B);o.u=B}else o.u=null}function sa(o,B,h){B instanceof Zr?(o.i=B,Ip(o.i,o.l)):(h||(B=Xr(B,yp)),o.i=new Zr(B,o.l))}function Ee(o,B,h){o.i.set(B,h)}function ci(o){return Ee(o,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),o}function Yr(o,B){return o?B?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function Xr(o,B,h){return typeof o=="string"?(o=encodeURI(o).replace(B,Ep),h&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function Ep(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var Fl=/[#\/\?@]/g,_p=/[#\?:]/g,Dp=/[#\?]/g,yp=/[#\?@]/g,wp=/#/g;function Zr(o,B){this.h=this.g=null,this.i=o||null,this.j=!!B}function yn(o){o.g||(o.g=new Map,o.h=0,o.i&&mp(o.i,function(B,h){o.add(decodeURIComponent(B.replace(/\+/g," ")),h)}))}n=Zr.prototype,n.add=function(o,B){yn(this),this.i=null,o=or(this,o);let h=this.g.get(o);return h||this.g.set(o,h=[]),h.push(B),this.h+=1,this};function xl(o,B){yn(o),B=or(o,B),o.g.has(B)&&(o.i=null,o.h-=o.g.get(B).length,o.g.delete(B))}function Ll(o,B){return yn(o),B=or(o,B),o.g.has(B)}n.forEach=function(o,B){yn(this),this.g.forEach(function(h,C){h.forEach(function(b){o.call(B,b,C,this)},this)},this)};function kl(o,B){yn(o);let h=[];if(typeof B=="string")Ll(o,B)&&(h=h.concat(o.g.get(or(o,B))));else for(o=Array.from(o.g.values()),B=0;B<o.length;B++)h=h.concat(o[B]);return h}n.set=function(o,B){return yn(this),this.i=null,o=or(this,o),Ll(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[B]),this.h+=1,this},n.get=function(o,B){return o?(o=kl(this,o),o.length>0?String(o[0]):B):B};function Vl(o,B,h){xl(o,B),h.length>0&&(o.i=null,o.g.set(or(o,B),R(h)),o.h+=h.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";let o=[],B=Array.from(this.g.keys());for(let C=0;C<B.length;C++){var h=B[C];let b=zr(h);h=kl(this,h);for(let O=0;O<h.length;O++){let U=b;h[O]!==""&&(U+="="+zr(h[O])),o.push(U)}}return this.i=o.join("&")};function Ml(o){let B=new Zr;return B.i=o.i,o.g&&(B.g=new Map(o.g),B.h=o.h),B}function or(o,B){return B=String(B),o.j&&(B=B.toLowerCase()),B}function Ip(o,B){B&&!o.j&&(yn(o),o.i=null,o.g.forEach(function(h,C){let b=C.toLowerCase();C!=b&&(xl(this,C),Vl(this,b,h))},o)),o.j=B}function Tp(o,B){let h=new Kr;if(a.Image){let C=new Image;C.onload=f($t,h,"TestLoadImage: loaded",!0,B,C),C.onerror=f($t,h,"TestLoadImage: error",!1,B,C),C.onabort=f($t,h,"TestLoadImage: abort",!1,B,C),C.ontimeout=f($t,h,"TestLoadImage: timeout",!1,B,C),a.setTimeout(function(){C.ontimeout&&C.ontimeout()},1e4),C.src=o}else B(!1)}function Ap(o,B){let h=new Kr,C=new AbortController,b=setTimeout(()=>{C.abort(),$t(h,"TestPingServer: timeout",!1,B)},1e4);fetch(o,{signal:C.signal}).then(O=>{clearTimeout(b),O.ok?$t(h,"TestPingServer: ok",!0,B):$t(h,"TestPingServer: server error",!1,B)}).catch(()=>{clearTimeout(b),$t(h,"TestPingServer: error",!1,B)})}function $t(o,B,h,C,b){try{b&&(b.onload=null,b.onerror=null,b.onabort=null,b.ontimeout=null),C(h)}catch{}}function bp(){this.g=new cp}function Bi(o){this.i=o.Sb||null,this.h=o.ab||!1}d(Bi,Cl),Bi.prototype.g=function(){return new li(this.i,this.h)};function li(o,B){Ue.call(this),this.H=o,this.o=B,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}d(li,Ue),n=li.prototype,n.open=function(o,B){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=o,this.D=B,this.readyState=1,ts(this)},n.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;let B={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};o&&(B.body=o),(this.H||a).fetch(new Request(this.D,B)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,es(this)),this.readyState=0},n.Pa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,ts(this)),this.g&&(this.readyState=3,ts(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;Gl(this)}else o.text().then(this.Oa.bind(this),this.ga.bind(this))};function Gl(o){o.j.read().then(o.Ma.bind(o)).catch(o.ga.bind(o))}n.Ma=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var B=o.value?o.value:new Uint8Array(0);(B=this.B.decode(B,{stream:!o.done}))&&(this.response=this.responseText+=B)}o.done?es(this):ts(this),this.readyState==3&&Gl(this)}},n.Oa=function(o){this.g&&(this.response=this.responseText=o,es(this))},n.Na=function(o){this.g&&(this.response=o,es(this))},n.ga=function(){this.g&&es(this)};function es(o){o.readyState=4,o.l=null,o.j=null,o.B=null,ts(o)}n.setRequestHeader=function(o,B){this.A.append(o,B)},n.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";let o=[],B=this.h.entries();for(var h=B.next();!h.done;)h=h.value,o.push(h[0]+": "+h[1]),h=B.next();return o.join(`\r
`)};function ts(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(li.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function Hl(o){let B="";return ri(o,function(h,C){B+=C,B+=":",B+=h,B+=`\r
`}),B}function ia(o,B,h){e:{for(C in h){var C=!1;break e}C=!0}C||(h=Hl(h),typeof o=="string"?h!=null&&zr(h):Ee(o,B,h))}function we(o){Ue.call(this),this.headers=new Map,this.L=o||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}d(we,Ue);var Rp=/^https?$/i,Sp=["POST","PUT"];n=we.prototype,n.Fa=function(o){this.H=o},n.ea=function(o,B,h,C){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);B=B?B.toUpperCase():"GET",this.D=o,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():yl.g(),this.g.onreadystatechange=y(l(this.Ca,this));try{this.B=!0,this.g.open(B,String(o),!0),this.B=!1}catch(O){Ul(this,O);return}if(o=h||"",h=new Map(this.headers),C)if(Object.getPrototypeOf(C)===Object.prototype)for(var b in C)h.set(b,C[b]);else if(typeof C.keys=="function"&&typeof C.get=="function")for(let O of C.keys())h.set(O,C.get(O));else throw Error("Unknown input type for opt_headers: "+String(C));C=Array.from(h.keys()).find(O=>O.toLowerCase()=="content-type"),b=a.FormData&&o instanceof a.FormData,!(Array.prototype.indexOf.call(Sp,B,void 0)>=0)||C||b||h.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(let[O,U]of h)this.g.setRequestHeader(O,U);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(o),this.v=!1}catch(O){Ul(this,O)}};function Ul(o,B){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=B,o.o=5,ql(o),hi(o)}function ql(o){o.A||(o.A=!0,ze(o,"complete"),ze(o,"error"))}n.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=o||7,ze(this,"complete"),ze(this,"abort"),hi(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),hi(this,!0)),we.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?jl(this):this.Xa())},n.Xa=function(){jl(this)};function jl(o){if(o.h&&typeof i<"u"){if(o.v&&Wt(o)==4)setTimeout(o.Ca.bind(o),0);else if(ze(o,"readystatechange"),Wt(o)==4){o.h=!1;try{let O=o.ca();e:switch(O){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var B=!0;break e;default:B=!1}var h;if(!(h=B)){var C;if(C=O===0){let U=String(o.D).match(Pl)[1]||null;!U&&a.self&&a.self.location&&(U=a.self.location.protocol.slice(0,-1)),C=!Rp.test(U?U.toLowerCase():"")}h=C}if(h)ze(o,"complete"),ze(o,"success");else{o.o=6;try{var b=Wt(o)>2?o.g.statusText:""}catch{b=""}o.l=b+" ["+o.ca()+"]",ql(o)}}finally{hi(o)}}}}function hi(o,B){if(o.g){o.m&&(clearTimeout(o.m),o.m=null);let h=o.g;o.g=null,B||ze(o,"ready");try{h.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function Wt(o){return o.g?o.g.readyState:0}n.ca=function(){try{return Wt(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(o){if(this.g){var B=this.g.responseText;return o&&B.indexOf(o)==0&&(B=B.substring(o.length)),up(B)}};function Jl(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.F){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function vp(o){let B={};o=(o.g&&Wt(o)>=2&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let C=0;C<o.length;C++){if(E(o[C]))continue;var h=dp(o[C]);let b=h[0];if(h=h[1],typeof h!="string")continue;h=h.trim();let O=B[b]||[];B[b]=O,O.push(h)}np(B,function(C){return C.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function ns(o,B,h){return h&&h.internalChannelParams&&h.internalChannelParams[o]||B}function Kl(o){this.za=0,this.i=[],this.j=new Kr,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=ns("failFast",!1,o),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=ns("baseRetryDelayMs",5e3,o),this.Za=ns("retryDelaySeedMs",1e4,o),this.Ta=ns("forwardChannelMaxRetries",2,o),this.va=ns("forwardChannelRequestTimeoutMs",2e4,o),this.ma=o&&o.xmlHttpFactory||void 0,this.Ua=o&&o.Rb||void 0,this.Aa=o&&o.useFetchStreams||!1,this.O=void 0,this.L=o&&o.supportsCrossDomainXhr||!1,this.M="",this.h=new Rl(o&&o.concurrentRequestLimit),this.Ba=new bp,this.S=o&&o.fastHandshake||!1,this.R=o&&o.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=o&&o.Pb||!1,o&&o.ua&&this.j.ua(),o&&o.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&o&&o.detectBufferingProxy||!1,this.ia=void 0,o&&o.longPollingTimeout&&o.longPollingTimeout>0&&(this.ia=o.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=Kl.prototype,n.ka=8,n.I=1,n.connect=function(o,B,h,C){Qe(0),this.W=o,this.H=B||{},h&&C!==void 0&&(this.H.OSID=h,this.H.OAID=C),this.F=this.X,this.J=th(this,null,this.W),di(this)};function oa(o){if(zl(o),o.I==3){var B=o.V++,h=Tt(o.J);if(Ee(h,"SID",o.M),Ee(h,"RID",B),Ee(h,"TYPE","terminate"),rs(o,h),B=new zt(o,o.j,B),B.M=2,B.A=ci(Tt(h)),h=!1,a.navigator&&a.navigator.sendBeacon)try{h=a.navigator.sendBeacon(B.A.toString(),"")}catch{}!h&&a.Image&&(new Image().src=B.A,h=!0),h||(B.g=nh(B.j,null),B.g.ea(B.A)),B.F=Date.now(),ui(B)}eh(o)}function fi(o){o.g&&(ua(o),o.g.cancel(),o.g=null)}function zl(o){fi(o),o.v&&(a.clearTimeout(o.v),o.v=null),Ci(o),o.h.cancel(),o.m&&(typeof o.m=="number"&&a.clearTimeout(o.m),o.m=null)}function di(o){if(!Sl(o.h)&&!o.m){o.m=!0;var B=o.Ea;Xe||m(),Re||(Xe(),Re=!0),I.add(B,o),o.D=0}}function Op(o,B){return vl(o.h)>=o.h.j-(o.m?1:0)?!1:o.m?(o.i=B.G.concat(o.i),!0):o.I==1||o.I==2||o.D>=(o.Sa?0:o.Ta)?!1:(o.m=Jr(l(o.Ea,o,B),Zl(o,o.D)),o.D++,!0)}n.Ea=function(o){if(this.m)if(this.m=null,this.I==1){if(!o){this.V=Math.floor(Math.random()*1e5),o=this.V++;let b=new zt(this,this.j,o),O=this.o;if(this.U&&(O?(O=il(O),al(O,this.U)):O=this.U),this.u!==null||this.R||(b.J=O,O=null),this.S)e:{for(var B=0,h=0;h<this.i.length;h++){t:{var C=this.i[h];if("__data__"in C.map&&(C=C.map.__data__,typeof C=="string")){C=C.length;break t}C=void 0}if(C===void 0)break;if(B+=C,B>4096){B=h;break e}if(B===4096||h===this.i.length-1){B=h+1;break e}}B=1e3}else B=1e3;B=$l(this,b,B),h=Tt(this.J),Ee(h,"RID",o),Ee(h,"CVER",22),this.G&&Ee(h,"X-HTTP-Session-Id",this.G),rs(this,h),O&&(this.R?B="headers="+zr(Hl(O))+"&"+B:this.u&&ia(h,this.u,O)),ra(this.h,b),this.Ra&&Ee(h,"TYPE","init"),this.S?(Ee(h,"$req",B),Ee(h,"SID","null"),b.U=!0,Zo(b,h,null)):Zo(b,h,B),this.I=2}}else this.I==3&&(o?Ql(this,o):this.i.length==0||Sl(this.h)||Ql(this))};function Ql(o,B){var h;B?h=B.l:h=o.V++;let C=Tt(o.J);Ee(C,"SID",o.M),Ee(C,"RID",h),Ee(C,"AID",o.K),rs(o,C),o.u&&o.o&&ia(C,o.u,o.o),h=new zt(o,o.j,h,o.D+1),o.u===null&&(h.J=o.o),B&&(o.i=B.G.concat(o.i)),B=$l(o,h,1e3),h.H=Math.round(o.va*.5)+Math.round(o.va*.5*Math.random()),ra(o.h,h),Zo(h,C,B)}function rs(o,B){o.H&&ri(o.H,function(h,C){Ee(B,C,h)}),o.l&&ri({},function(h,C){Ee(B,C,h)})}function $l(o,B,h){h=Math.min(o.i.length,h);let C=o.l?l(o.l.Ka,o.l,o):null;e:{var b=o.i;let re=-1;for(;;){let Ne=["count="+h];re==-1?h>0?(re=b[0].g,Ne.push("ofs="+re)):re=0:Ne.push("ofs="+re);let fe=!0;for(let Le=0;Le<h;Le++){var O=b[Le].g;let At=b[Le].map;if(O-=re,O<0)re=Math.max(0,b[Le].g-100),fe=!1;else try{O="req"+O+"_"||"";try{var U=At instanceof Map?At:Object.entries(At);for(let[In,Yt]of U){let Xt=Yt;u(Yt)&&(Xt=Qo(Yt)),Ne.push(O+In+"="+encodeURIComponent(Xt))}}catch(In){throw Ne.push(O+"type="+encodeURIComponent("_badmap")),In}}catch{C&&C(At)}}if(fe){U=Ne.join("&");break e}}U=void 0}return o=o.i.splice(0,h),B.G=o,U}function Wl(o){if(!o.g&&!o.v){o.Y=1;var B=o.Da;Xe||m(),Re||(Xe(),Re=!0),I.add(B,o),o.A=0}}function aa(o){return o.g||o.v||o.A>=3?!1:(o.Y++,o.v=Jr(l(o.Da,o),Zl(o,o.A)),o.A++,!0)}n.Da=function(){if(this.v=null,Yl(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var o=4*this.T;this.j.info("BP detection timer enabled: "+o),this.B=Jr(l(this.Wa,this),o)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Qe(10),fi(this),Yl(this))};function ua(o){o.B!=null&&(a.clearTimeout(o.B),o.B=null)}function Yl(o){o.g=new zt(o,o.j,"rpc",o.Y),o.u===null&&(o.g.J=o.o),o.g.P=0;var B=Tt(o.na);Ee(B,"RID","rpc"),Ee(B,"SID",o.M),Ee(B,"AID",o.K),Ee(B,"CI",o.F?"0":"1"),!o.F&&o.ia&&Ee(B,"TO",o.ia),Ee(B,"TYPE","xmlhttp"),rs(o,B),o.u&&o.o&&ia(B,o.u,o.o),o.O&&(o.g.H=o.O);var h=o.g;o=o.ba,h.M=1,h.A=ci(Tt(B)),h.u=null,h.R=!0,Tl(h,o)}n.Va=function(){this.C!=null&&(this.C=null,fi(this),aa(this),Qe(19))};function Ci(o){o.C!=null&&(a.clearTimeout(o.C),o.C=null)}function Xl(o,B){var h=null;if(o.g==B){Ci(o),ua(o),o.g=null;var C=2}else if(na(o.h,B))h=B.G,Ol(o.h,B),C=1;else return;if(o.I!=0){if(B.o)if(C==1){h=B.u?B.u.length:0,B=Date.now()-B.F;var b=o.D;C=oi(),ze(C,new _l(C,h)),di(o)}else Wl(o);else if(b=B.m,b==3||b==0&&B.X>0||!(C==1&&Op(o,B)||C==2&&aa(o)))switch(h&&h.length>0&&(B=o.h,B.i=B.i.concat(h)),b){case 1:wn(o,5);break;case 4:wn(o,10);break;case 3:wn(o,6);break;default:wn(o,2)}}}function Zl(o,B){let h=o.Qa+Math.floor(Math.random()*o.Za);return o.isActive()||(h*=2),h*B}function wn(o,B){if(o.j.info("Error code "+B),B==2){var h=l(o.bb,o),C=o.Ua;let b=!C;C=new Qt(C||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||$r(C,"https"),ci(C),b?Tp(C.toString(),h):Ap(C.toString(),h)}else Qe(2);o.I=0,o.l&&o.l.pa(B),eh(o),zl(o)}n.bb=function(o){o?(this.j.info("Successfully pinged google.com"),Qe(2)):(this.j.info("Failed to ping google.com"),Qe(1))};function eh(o){if(o.I=0,o.ja=[],o.l){let B=Nl(o.h);(B.length!=0||o.i.length!=0)&&(v(o.ja,B),v(o.ja,o.i),o.h.i.length=0,R(o.i),o.i.length=0),o.l.oa()}}function th(o,B,h){var C=h instanceof Qt?Tt(h):new Qt(h);if(C.g!="")B&&(C.g=B+"."+C.g),Wr(C,C.u);else{var b=a.location;C=b.protocol,B=B?B+"."+b.hostname:b.hostname,b=+b.port;let O=new Qt(null);C&&$r(O,C),B&&(O.g=B),b&&Wr(O,b),h&&(O.h=h),C=O}return h=o.G,B=o.wa,h&&B&&Ee(C,h,B),Ee(C,"VER",o.ka),rs(o,C),C}function nh(o,B,h){if(B&&!o.L)throw Error("Can't create secondary domain capable XhrIo object.");return B=o.Aa&&!o.ma?new we(new Bi({ab:h})):new we(o.ma),B.Fa(o.L),B}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function rh(){}n=rh.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function pi(){}pi.prototype.g=function(o,B){return new st(o,B)};function st(o,B){Ue.call(this),this.g=new Kl(B),this.l=o,this.h=B&&B.messageUrlParams||null,o=B&&B.messageHeaders||null,B&&B.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=B&&B.initMessageHeaders||null,B&&B.messageContentType&&(o?o["X-WebChannel-Content-Type"]=B.messageContentType:o={"X-WebChannel-Content-Type":B.messageContentType}),B&&B.sa&&(o?o["X-WebChannel-Client-Profile"]=B.sa:o={"X-WebChannel-Client-Profile":B.sa}),this.g.U=o,(o=B&&B.Qb)&&!E(o)&&(this.g.u=o),this.A=B&&B.supportsCrossDomainXhr||!1,this.v=B&&B.sendRawJson||!1,(B=B&&B.httpSessionIdParam)&&!E(B)&&(this.g.G=B,o=this.h,o!==null&&B in o&&(o=this.h,B in o&&delete o[B])),this.j=new ar(this)}d(st,Ue),st.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},st.prototype.close=function(){oa(this.g)},st.prototype.o=function(o){var B=this.g;if(typeof o=="string"){var h={};h.__data__=o,o=h}else this.v&&(h={},h.__data__=Qo(o),o=h);B.i.push(new gp(B.Ya++,o)),B.I==3&&di(B)},st.prototype.N=function(){this.g.l=null,delete this.j,oa(this.g),delete this.g,st.Z.N.call(this)};function sh(o){$o.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var B=o.__sm__;if(B){e:{for(let h in B){o=h;break e}o=void 0}(this.i=o)&&(o=this.i,B=B!==null&&o in B?B[o]:void 0),this.data=B}else this.data=o}d(sh,$o);function ih(){Wo.call(this),this.status=1}d(ih,Wo);function ar(o){this.g=o}d(ar,rh),ar.prototype.ra=function(){ze(this.g,"a")},ar.prototype.qa=function(o){ze(this.g,new sh(o))},ar.prototype.pa=function(o){ze(this.g,new ih)},ar.prototype.oa=function(){ze(this.g,"b")},pi.prototype.createWebChannel=pi.prototype.g,st.prototype.send=st.prototype.o,st.prototype.open=st.prototype.m,st.prototype.close=st.prototype.close,Fa=Vt.createWebChannelTransport=function(){return new pi},Pa=Vt.getStatEventTarget=function(){return oi()},Na=Vt.Event=_n,bi=Vt.Stat={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},ai.NO_ERROR=0,ai.TIMEOUT=8,ai.HTTP_ERROR=6,us=Vt.ErrorCode=ai,Dl.COMPLETE="complete",Oa=Vt.EventType=Dl,pl.EventType=qr,qr.OPEN="a",qr.CLOSE="b",qr.ERROR="c",qr.MESSAGE="d",Ue.prototype.listen=Ue.prototype.J,ur=Vt.WebChannel=pl,Kg=Vt.FetchXmlHttpFactory=Bi,we.prototype.listenOnce=we.prototype.K,we.prototype.getLastError=we.prototype.Ha,we.prototype.getLastErrorCode=we.prototype.ya,we.prototype.getStatus=we.prototype.ca,we.prototype.getResponseJson=we.prototype.La,we.prototype.getResponseText=we.prototype.la,we.prototype.send=we.prototype.ea,we.prototype.setWithCredentials=we.prototype.Fa,va=Vt.XhrIo=we}).apply(typeof Ai<"u"?Ai:typeof self<"u"?self:typeof window<"u"?window:{});var Ce,F=(Ce=class{},k(Ce,"FOLD_CASE",1),k(Ce,"LITERAL",2),k(Ce,"CLASS_NL",4),k(Ce,"DOT_NL",8),k(Ce,"ONE_LINE",16),k(Ce,"NON_GREEDY",32),k(Ce,"PERL_X",64),k(Ce,"UNICODE_GROUPS",128),k(Ce,"WAS_DOLLAR",256),k(Ce,"LOOKBEHIND",512),k(Ce,"MATCH_NL",Ce.CLASS_NL|Ce.DOT_NL),k(Ce,"PERL",Ce.CLASS_NL|Ce.ONE_LINE|Ce.PERL_X|Ce.UNICODE_GROUPS),k(Ce,"POSIX",0),k(Ce,"UNANCHORED",0),k(Ce,"ANCHOR_START",1),k(Ce,"ANCHOR_BOTH",2),Ce),Et={CASE_INSENSITIVE:1,DOTALL:2,MULTILINE:4,DISABLE_UNICODE_GROUPS:8,LONGEST_MATCH:16,LOOKBEHINDS:512},hs=128,Ga=new Int32Array(hs),Ha=new Int32Array(hs),Ri=65535;for(let n=0;n<hs;n++)n>=97&&n<=122?Ga[n]=n-32:Ga[n]=n,n>=65&&n<=90?Ha[n]=n+32:Ha[n]=n;var Ma,x=(Ma=class{static toUpperCase(n){if(n<hs)return Ga[n];let e=String.fromCodePoint(n).toUpperCase(),t=e.codePointAt(0)>Ri?2:1;if(e.length>t)return n;let r=String.fromCodePoint(e.codePointAt(0)).toLowerCase(),s=r.codePointAt(0)>Ri?2:1;return r.length>s||r.codePointAt(0)!==n?n:e.codePointAt(0)}static toLowerCase(n){if(n<hs)return Ha[n];let e=String.fromCodePoint(n).toLowerCase(),t=e.codePointAt(0)>Ri?2:1;if(e.length>t)return n;let r=String.fromCodePoint(e.codePointAt(0)).toUpperCase(),s=r.codePointAt(0)>Ri?2:1;return r.length>s||r.codePointAt(0)!==n?n:e.codePointAt(0)}},k(Ma,"CODES",Object.freeze({"\x07":7,"\b":8,"	":9,"\n":10,"\v":11,"\f":12,"\r":13," ":32,'"':34,$:36,"&":38,"'":39,"(":40,")":41,"*":42,"+":43,"-":45,".":46,0:48,1:49,2:50,3:51,4:52,5:53,6:54,7:55,8:56,9:57,":":58,"<":60,">":62,"?":63,A:65,B:66,C:67,F:70,P:80,Q:81,U:85,Z:90,"[":91,"\\":92,"]":93,"^":94,_:95,"`":96,a:97,b:98,f:102,i:105,m:109,n:110,r:114,s:115,t:116,v:118,x:120,z:122,"{":123,"|":124,"}":125})),Ma),p=class{constructor(n,e=!1){this.data=n,this.isStride1=e,this.SIZE=e?2:3}getLo(n){return this.data[n*this.SIZE]}getHi(n){return this.data[n*this.SIZE+1]}getStride(n){return this.isStride1?1:this.data[n*this.SIZE+2]}get length(){return this.data.length/this.SIZE}},zg="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-",lf=new Uint8Array(256);for(let n=0;n<64;n++)lf[zg.charCodeAt(n)]=n;var hf=n=>{let e=[],t=0,r=0;for(let s=0;s<n.length;s++){let i=lf[n.charCodeAt(s)];t|=(i&31)<<r,i&32?r+=5:(e.push(t),t=0,r=0)}return e},g=(n,e)=>{let t=hf(n),r=e?t.length/2:t.length/3,s=new Uint32Array(r*3),i=0,a=0;for(let u=0;u<r;u++)i+=t[a++],s[u*3]=i,i+=t[a++],s[u*3+1]=i,s[u*3+2]=e?1:t[a++];return s},Qg=n=>{let e=hf(n),t=new Map,r=0;for(let s=0;s<e.length;s+=2){r+=e[s];let i=e[s+1],a=i>>>1^-(i&1);t.set(r,r+a)}return t},Si=class{constructor(n){this.initializer=n,this.cache=new Map}has(n){return n in this.initializer}get(n){if(this.cache.has(n))return this.cache.get(n);let e=this.initializer[n],t=e?e():null;return this.cache.set(n,t),t}},en,it=(en=class{static get CASE_ORBIT(){return this._CASE_ORBIT||(this._CASE_ORBIT=Qg("rCgCIgCY+rQI4QiCuuBLgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCCgCBgCBgCBgCBgCBgCBgCB+7OB-BB-BB-BB-BB-BBskQB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BC-BB-BB-BB-BB-BB-BB-BByHBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBDCBBBCBBBCBBCCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBCCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBxHBCBBBCBBBCBBB3SBmMBkNBCBBBCBBB8MBCBBB6MB6MBCBBC+EB0MB2MBCBBB6MB+MBiGBmNBiNBCBBBmKBikzCBmNBqNBkIBsNBCBBBCBBBCBBB0NBCBBB0NDCBBB0NBCBBByNByNBCBBBCBBB2NBCBBDCBBCwDFCBCBDBCBCBDBCBCBDBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBB9EBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBCCBCBDBCBBBhGBvDBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBjICCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBH2iVBCBBBlKBwiVB+jVB+jVBCBBBlMBqEBuEBCBBBCBBBCBBBCBBBCBBB+hVB4hVB8hVBjNB7MC5MB5MCzMC1MB+0yCE5MB20yCC9MBu2yCBwyyCBo0yCChNBlNBo0yCBu-UBi0yCDlNC6-UBpNDrNIu+UDzNCm0yCBzNE0yyCBzNBpEBxNBxNBtEG1NLqxyCBkxyCnFoFrBCBBBCBBDCBBEkIBkIBkICoHHsCCqCBqCBqCCgEC+DB+DBmkOBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCC+BBgCBgCBgCBgCBgCBgCBgCBgCBrCBpCBpCBpCBmjOB-BB8BB-BB-BBgEB-BB-BByBBqgOBsDB-BBtwBB-BB-BB-BBsBBgDBCB-BB-BB-BBeB-BB-BB61OB-BB-BB-DB9DB9DBQB7DBmCE9CBrDBPBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBrFB-EBOBnHB3FB-FCCBBBNBCBBCjIBjIBjIBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCB-BB-BB8kMB-BB6kMB-BB-BB-BB-BB-BB-BB-BB-BB-BBokMB-BB-BBkkMBkkMB-BB-BB-BB-BB-BB-BB-BB4jMB-BB-BB-BB-BB-BB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EBCBBBCBoiMBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBJCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBeBCBBBCBBBCBBBCBBBCBBBCBBBCBBBdBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBCgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDL-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-C64CgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOCgmOGgmODg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FDg8FBg8FBg8FhVg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBQBQBQBQBQBQDPBPBPBPBPBPjkC7mMB5mMBnmMBjmMBCBlmMB3lMBpiMBk8kCBCBBG-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FD-7FB-7FB-7F6FoglCEsuHRwjlCyDCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCB0DBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBG1DD97OCCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQBQBQBQBQDPBPBPBPBPBPDQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQBQBQBQBQDPBPBPBPBPBPEQCQCQCQCPCPCPCPBQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPB0EB0EBsFBsFBsFBsFBoGBoGBgIBgIBgHBgHB8HB8HDQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQCSFPBPBzEBzEBRCxnOFSFrFBrFBrFBrFBREQBQClkOFPBPBnGBnGFQBQCljOCODPBPB-GB-GBNHSF-HB-HB7HB7HBRqJ53OE9tQBrmQH4Bc3BSgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBfBfBfBfBfBfBfBfBfBfBfBfBfBfBfBfECBByZ0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzB34BgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CBCBBBt-UBruHBt+UB1iVBviVBCBBBCBBBCBBB3hVB5-UB9hVB7hVCCBBCCBBI9jVB9jVBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBICBBBCBBECBBN-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOC-lOG-lOzoeCBBBCBBBCBBBCBBBCBBBCBl8kCBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBTCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBnECBBBCBBBCBBBCBBBCBBBCBBBCBBDCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBKCBBBCBBBnglCBCBBBCBBBCBBBCBBBCBBECBBBvyyCDCBBBCBBBgDCCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBn0yCB90yCB10yCBh0yCBn0yCCjxyCBzyyCBpxyCBg6BBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBB-CBl0yCBvjlCBCBBBCBBBt2yCBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBhkzCZCBB9a-5Bd-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCm6TCBB7gBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCH-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BmlBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvChDwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCFvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvC1DuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCCuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCCuCBuCBuCBuCBuCBuCBuCCuCBuCCtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCCtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCCtCBtCBtCBtCBtCBtCBtCCtCBtCk2BgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEO-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-D+CgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCL-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-B74CgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BhrVgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BhB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BD1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BtxekCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjC")),this._CASE_ORBIT}static get Print(){return this._Print||(this._Print=new p(g("hB9CBjBLBCpWBDFBFGBCCCBSBCsMBClBBDxBBDCBC2BBJaBFFBSVBC-FBCvBBD6BBDkDBP6BBDwBBDOBCbBDCCBJBGfBIqCBCgFBCHBDBBDVBCGBCEEBCBDIBDBBDDBJFFBCCBDBDYBDCBCFBFBBDVBCGBCBBCBBCBBDCCBDBFBBDCBEIIBCBCIIBPBLCBCIBCCBCVBCGBCBBCEBDJBCCBCCBDQQBCBDLBIGBCCBCHBDBBDVBCGBCBBCEBDIBDBBDCBICBFBBCEBDRBLBBCFBECBCDBEBBCCCBEEBEEBBBELBFEBECBCDBDHHPUBGMBCCBCWBCPBDIBCCBCDBIBBCCBCBBDDBDJBIVBCCBCWBCJBCEBDIBCCBCDBIBBGCBCDBDJBCCBNMBCCBCyBBCCBCFBFPBDZBCCBCRBEXBCIBCDDBFBEFFBEBCCCBGBHJBDCBN5BBFcBmBBBCCCBDBCXBCCCBVBDEBCCCBFBCJBDDBhBnCBCjBBFmBBCjBBCOBCMBmBlGBCGGD4LBCDBDGBCCCBCBDoBBCDBDgBBCDBDGBCCCBCBDOBC4BBCDBDiCBDfBEZBH1CBDFBD-TBCbBE4CBIVBKXBKTBNMBCCBCBBN9CBDJBHJBHNBCKBH4CBIqBBGlCBLeBCLBFLBFEEBoBBDEBMrBBFZBHKBE9BBDgCBCcBDKBHJBHNBDtBBDLBVsCBClFBJ7BBEOBE9BBGqBBDKBJqBBG1QBDFBDlBBDFBDHBCGCBdBD0BBCOBCNBDFBCSBDCBCIBSXBJuBBSBBDaBCMBEhBBPgBBQrEBF5UBXKBWz4BBD9LBGsBBCGGD3BBIBBPXBKGBCGBCGBCGBCGBCGBCGBCGBC9DBjBZBC4CBN1GBbPBC+BBC1CBDmDBGqBBC9CBC1CBKvBBCszcBE2BBK7KBV3FBJ8GBV7BBEJBH3BBJlCBJLBHzDBMdBEtCBCKBFgBBC2BBKNBDJBDmDBZbBLFBDFBDFBKGBCGBC7BBF9DBDJBHj9KBNWBFwBBloItLBDpDBnBGBNEBGZBCEBCCCBCCBCCBoUBhBpBBHyBBCSBCDBFEBCmEBF9FBEFBDFBDFBDCBEGBCGBOBBDLBCZBCSBCBBCOBDNBjB6DBGCBFsBBE3CBCMBEwBwBBsBBjEcBEwBBQbBFjBBKdBGqBBGdBCkBBFNBrB9EBDJBHjBBFjBBFnBBJzBBMLBCOBCGBCBBCKBCOBCGBCBBEzBBN2JBKVBLHBZFBCpBBCIBmCFBDCCBqBBCBBEDDBVBCnCBJIBxBSBCBBGgBBEaBGaBnB3BBFTBDxBBCBBGHBCCBCcBDCBFJBIIBI-BBhBmBBFLBK1BBEcBDaBGZBIDBNGBxCoCB4ByBBOyBBItBBJJBHlBBEcBJBBxGeBCpBBCCBDBBRFBJIBiBtBBJpBBXZBnBbBVWBKtCBFjBBK9BBCEBOYBIJBH0BBCRBJmBBK-CBCTBMRBCuBB-BGBCCCBCBCOBCKBH6BBGJBHDBCHBDBBDVBCGBCBBCEBCJBDBBDCBDHHGGBDGBEEBMJBCDDClBBCJBCDDCDBCJBCBBJBBe7CBCEBfnCBJJBnF1BBDlBBjBkCBMJBHMBU5BBHJBHTBdaBDOBFWB6F7BBlDyCBNHBDDDBGBCBBCdBCBBDLBKJBnCHBDtBBDKBcnCBJyCBOoCBIJB3CHB5ChBBPJBHIBCsBBCNBLcBEfBDVBCNBqCGBCBBCrBBECCBCCBHBJJBHFBCBBCkBBCBBCFBIJBHrBBFJB3HYBIQBCoBBEcB2CQQBwBBO6cBnDuDBCEBMjGBtyCiDBOvhBBRVBL68DBGmSB61G5BBn2B4RBIeBCJBFwCBCJBHdBDFBLlCBLJBCGBCUBGSBxN5BBnG6CBGYBDYBtBqCBF4BBIQBhCEBMGBK1mHBqBfBiDyDB+vIDBCGBCBBCiJBQeeBBBDPPBCBJrMBloCqDBGMBEIBIJBDDBh7D8HBEzNBHWBQQBQtBBDWBKzDB9B1HBLmBBDpCBJvDBWlCB7DTBNTBN2CBKYBoE0CBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDjJBD9VBQEBCOBxiBeBHFB2GGBCQBDGBCBBCEBG9BBiBxDxDBrBBENBDJBFBBhKeBS5BBGxOxOBoBB3GqBBFhGhGBdBCVBJBBhHGBCDBCBBCOBCkGBDPBqBrCBFJBFBByYjCBtC8BBjGDBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQB1BBBvIrBBFjDBNOBDOBCOBCkBBLtFB5BcBOrBBFIBIBBPFB7E4eBEQBEMBE5GBHLBFQQBKBF3BBJJBHnBBJdBDLBFBBPIBoB3KBJNBDMBEKBE4BBCFFBOBDLBFJBIyEBCmDBmgB-2pBBhB9oEBDt0FBDwpHBQtTBjtC9QBjvBq6EBGppIBnkzVvHB",!1))),this._Print}},k(en,"_CASE_ORBIT",null),k(en,"_Print",null),k(en,"CATEGORIES",new Si({C:()=>new p(g("AfBgDgBBOrWrWBHHBCBICCVuMuMnBBBzBBBE4B4BBGBcDBHQBXhGhGxBBB8BBBmDNB8BBByBBBQddBCCMEBhBGBsCiFiFJBBDBBXIICCBFBBKBBDBBFHBCDBDGGBaaBEEHDBDBBXIIDGDBCCGDBDBBECBCGBFCCBFBSJBEKKEXXIDDGBBLIEBCCBNBFBBNGBIEEJBBDBBXIIDGGBKKBDDBEEBFBEDBDGGBTTBIBDHHBBBEFFBBBDCCDCBDCBECBNDBGCBEFFBCCBEBCNBWEBOEEYRRBKKEFFBFBDEEDBBFBBLGBXEEYLLGBBKEEFGBDEBEFFBLLELBOEE0BEEHDBRBBbEETCBZKKCBBICBCDBHCCJFBLBBELB7BDBekBBDCCGZZCYYBGGCIILBBFfBpClBlBBCBoBlBlBQOOBjBBnGCCBDBCBB6LFFBIICFFBqBqBFBBiBFFBIICFFBQQ6BFFBkCkCBhBhBBBBbFB3CBBHBB+UCB6CGBXIBZIBVLBOEEDLB-CBBLFBLFBPMMBEB6CGBsBEBnCJBgBNNBCBNDBCCBrBBBGKBtBDBbFBMCB-BBBiCeeBMMBEBLFBPBBvBBBNTBuCnFnFBGB9BCBQCB-BEBsBBBMHBsBEB3QBBHBBnBBBHBBJGCgBBB2BQQPBBHUUBEEKMMBDBbEByBPBDBBcOOBBBjBNBiBOBtEDB7UVBMUB14BBB-LEBuBCCBDBCBB5BGBDNBZIBI4BI-DhBBb6C6CBKB3GZBxC3C3CBoDoDBDBsB-C-C3CIBxBuzcuzcBBB4BIB9KTB5FHB+GTB9BCBLFB5BHBnCHBNFB1DKBfCBvCMMBCBiB4B4BBHBPBBLBBoDXBdJBHBBHBBHIBIII9BDB-DBBLFBl9KLBYDByBjoIBvLBBrDlBBILBGEBbGGCGDrUfBrBFB0BUUFDBGoEoEBCB-FCBHBBHBBHBBECBIIIBLBDBBNbbUDDQBBPhBB8DEBEDBuBCB5COOBBBCuBBvBhEBeCByBOBdDBlBIBfEBsBEBfmBmBBCBPpBB-EBBLFBlBDBlBDBpBHB1BKBNQQIDDMQQIDDBBB1BLB4JIBXJBJXBHrBrBKkCBHBBCtBtBDCBCBBYpCpCBGBKvBBUDDBDBiBCBcEBclBB5BDBVBBzBDDBDBJEEeBBEDBLGBKGBhCfBoBDBNIB3BCBeBBcEBbGBFLBIvCBqC2BB0BMB0BGBvBHBLFBnBCBeHBDvGBgBrBrBEBBDPBHHBKgBBvBHBrBVBblBBdTBYIBvCDBlBIB-BGGBLBaGBLFB2BTTBGBoBIBhDVVBJBTwBwBB8BBICCFQQMFB8BEBLFBFJJBDDBXXIDDGLLBDDBEEBCCBEBCEBIBBICBGKBLCCBCCnBLLCBBCFFLDDBGBDcB9CGGBcBpCHBLlFB3BBBnBhBBmCKBLFBOSB7BFBLFBVbBcBBQDBY4FB9BjDB0CLBJBBCBBJDDfDDBNNBHBLlCBJBBvBBBMaBpCHB0CMBqCGBL1CBJ3CBjBNBLFBKuBuBPJBeCBhBBBXPPBnCBIDDtBCBCDDKHBLFBHDDmBDDHGBLFBtBDBL1HBaGBSqBqBBBBe0CBCOBzBMB8clDBwDGGBJBlGryCBkDMBxhBPBXJB88DEBoS41GB7Bl2BB6RGBgBLLBCByCLLBEBfBBHJBnCJBLIIWEBUvNB7BlGB8CEBaBBarBBsCDB6BGBS-BBGKBIIB3mHoBBhBgDB0D8vIBFIIDkJkJBNBCcBEBBCNBFHBtMjoCBsDEBOCBKGBLBBF-6DB+HCB1NFBYOBSOBvBBBYIB1D7BB3HJBoBBBrCHBxDUBnC5DBVLBVLB4CIBamEB2CoCoCDBBCBBDBBFNNCIIiCFFBJJIddFGGCCBI1K1KBlJlJB-V-VBNBGQQBuiBBgBFBH0GBISSBIIDGGBDB-BgBBCvDBuBCBPBBLDBD-JBgBQB7BEBCvOBrB1GBsBDBC-FBgBXXBGBD-GBIFFDQQmGBBRoBBtCDBLDBDwYBlCrCB+BhGBFccDCCBCCLFFCCCBEBCDBCECEDDCBBCICDCCBFFIKFCLLSEBEGGSzBBDtIBtBDBlDLBQBBQQQmBJBvF3BBeMBtBDBKGBDNBH5EB6eCBSCBOCB7GFBNDBCOBNDB5BHBLFBpBHBfBBNDBDNBKmBB5KHBPBBOCBMCB6BCCBCBRBBNDBLGB0EoDoDBjgBBh3pBfB-oEBBv0FBBypHOBvThtCB-QhvBBs6EEBrpIlkzVBxHvw-FB",!1)),Cc:()=>new p(g("AfgDgB",!0)),Cf:()=>new p(g("tFzqBzqBBEBXhGhGyBhMhMBxCxCs5D9-B9-BBDBbEByBEBCJBw03B6H6HBBBimEQQj7IPBhjiBDBwmFHBn0rYffB+CB",!1)),Cn:()=>new p(g("4bBBHDBICCVuMuMnBBBzBBBE4B4BBGBcDBHKBvI9B9BBmDmDBMB8BBByBBBQddBCCMEBjBEBuHJJBDDBXXICCBBBFBBKBBDBBFHBCDBDGGBaaBEEHDBDBBXIIDGDBCCGDBDBBECBCGBFCCBFBSJBEKKEXXIDDGBBLIEBCCBNBFBBNGBIEEJBBDBBXIIDGGBKKBDDBEEBFBEDBDGGBTTBIBDHHBBBEFFBBBDCCDCBDCBECBNDBGCBEFFBCCBEBCNBWEBOEEYRRBKKEFFBFBDEEDBBFBBLGBXEEYLLGBBKEEFGBDEBEFFBLLELBOEE0BEEHDBRBBbEETCBZKKCBBICBCDBHCCJFBLBBELB7BDBekBBDCCGZZCYYBGGCIILBBFfBpClBlBBCBoBlBlBQOOBjBBnGCCBDBCBB6LFFBIICFFBqBqBFBBiBFFBIICFFBQQ6BFFBkCkCBhBhBBBBbFB3CBBHBB+UCB6CGBXIBZIBVLBOEEDLB-CBBLFBLFBbFB6CGBsBEBnCJBgBNNBCBNDBCCBrBBBGKBtBDBbFBMCB-BBBiCeeBMMBEBLFBPBBvBBBNTBuCnFnFBGB9BCBQCB-BEBsBBBMHBsBEB3QBBHBBnBBBHBBJGCgBBB2BQQPBBHUUBEEKmDmDNBBcOOBBBjBNBiBOBtEDB7UVBMUB14BBB-LEBuBCCBDBCBB5BGBDNBZIBI4BI-DhBBb6C6CBKB3GZBxC3C3CBoDoDBDBsB-C-C3CIBxBuzcuzcBBB4BIB9KTB5FHB+GTB9BCBLFB5BHBnCHBNFB1DKBfCBvCMMBCBiB4B4BBHBPBBLBBoDXBdJBHBBHBBHIBIII9BDB-DBBLFBl9KLBYDByBDBvzIBBrDlBBILBGEBbGGCGDrUfBrBFB0BUUFDBGoEoEBCC-FCBHBBHBBHBBECBIIIBIBGBBNbbUDDQBBPhBB8DEBEDBuBCB5COOBBBCuBBvBhEBeCByBOBdDBlBIBfEBsBEBfmBmBBCBPpBB-EBBLFBlBDBlBDBpBHB1BKBNQQIDDMQQIDDBBB1BLB4JIBXJBJXBHrBrBKkCBHBBCtBtBDCBCBBYpCpCBGBKvBBUDDBDBiBCBcEBclBB5BDBVBBzBDDBDBJEEeBBEDBLGBKGBhCfBoBDBNIB3BCBeBBcEBbGBFLBIvCBqC2BB0BMB0BGBvBHBLFBnBCBeHBDvGBgBrBrBEBBDPBHHBKgBBvBHBrBVBblBBdTBYIBvCDBlBIBlCJBCBBaGBLFB2BTTBGBoBIBhDVVBJBTwBwBB8BBICCFQQMFB8BEBLFBFJJBDDBXXIDDGLLBDDBEEBCCBEBCEBIBBICBGKBLCCBCCnBLLCBBCFFLDDBGBDcB9CGGBcBpCHBLlFB3BBBnBhBBmCKBLFBOSB7BFBLFBVbBcBBQDBY4FB9BjDB0CLBJBBCBBJDDfDDBNNBHBLlCBJBBvBBBMaBpCHB0CMBqCGBL1CBJ3CBjBNBLFBKuBuBPJBeCBhBBBXPPBnCBIDDtBCBCDDKHBLFBHDDmBDDHGBLFBtBDBL1HBaGBSqBqBBBBe0CBCOBzBMB8clDBwDGGBJBlGryCBkDMB3iBJB88DEBoS41GB7Bl2BB6RGBgBLLBCByCLLBEBfBBHJBnCJBLIIWEBUvNB7BlGB8CEBaBBarBBsCDB6BGBS-BBGKBIIB3mHoBBhBgDB0D8vIBFIIDkJkJBNBCcBEBBCNBFHBtMjoCBsDEBOCBKGBLBBJ76DB+HCB1NFBYOBSOBvBBBYIB1D7BB3HJBoBBBjGUBnC5DBVLBVLB4CIBamEB2CoCoCDBBCBBDBBFNNCIIiCFFBJJIddFGGCCBI1K1KBlJlJB-V-VBNBGQQBuiBBgBFBH0GBISSBIIDGGBDB-BgBBCvDBuBCBPBBLDBD-JBgBQB7BEBCvOBrB1GBsBDBC-FBgBXXBGBD-GBIFFDQQmGBBRoBBtCDBLDBDwYBlCrCB+BhGBFccDCCBCCLFFCCCBEBCDBCECEDDCBBCICDCCBFFIKFCLLSEBEGGSzBBDtIBtBDBlDLBQBBQQQmBJBvF3BBeMBtBDBKGBDNBH5EB6eCBSCBOCB7GFBNDBCOBNDB5BHBLFBpBHBfBBNDBDNBKmBB5KHBPBBOCBMCB6BCCBCBRBBNDBLGB0EoDoDBjgBBh3pBfB-oEBBv0FBBypHOBvThtCB-QhvBBs6EEBrpIm8yVBCdBhD-DBxHvw-BB---BBB---BBB",!1)),Co:()=>new p(g("gg4B-nGh4hc9--BD9--B",!0)),Cs:()=>new p(g("gg2B--B",!0)),L:()=>new p(g("hCZBHZBwBLLFGGBVBCeBCpOBFLBPEBICCiEEBCBBDDBCHHCCBCCCBSBCyCBCqEBJlFBClBBDHHBnBBoCaBFDBuBqBBkBBBCiDBCQQBIIBLLBBBDRRCdBe4CBMZZBfBKBBFGGBUBFKKEYYBXBIKBGXBCGBRpBB7B1BBETTIJBQPBFHBDBBDVBCGBCEEBCBERROBBCCBPBBLJJBEBFBBDVBCGBCBBCBBCBBgBDBCUUBBBRIBCCBCVBCGBCBBCEBETTQBBYMMBGBDBBDVBCGBCBBCEBEffBCCBBBQSSCFBECBCDBEBBCCCBEEBEEBBBELBX1B1BBGBCCBCWBCPBEbbBBBCBBDBBfFFBGBCCBCWBCJBCEBEffBBBCBBQBBSIBCCBCoBBDRRGCBJCBZFBGRBEXBCIBCDDBFB7BvBBCBBNGB7BBBCCCBDBCXBCCCBIBCBBKDDBDBCWWBCBhBgCgCBGBCjBBcEB0DqBBVRRBEBFDBEEEBIIBBBFMBNSSBkBBCGGDqBBCsKBCDBDGBCCCBCBDoBBCDBDgBBCDBDGBCCCBCBDOBC4BBCDBDiCBmBPBR1CBDFBErTBDQBCZBGqCBHHBIRBOSBPRBPMBCCBQzBBkBFFkC4CBIEBDhBBCGGBkCBLeByBdBDEBMrBBFZB3BWBK0BBzC+C+CBtBBSHB3BdBOBBLrBBbjBBqBCBLjBBDKBGqBBDCBqBDBCFBCBBEGGB+FBhC1IBDFBDlBBDFBDHBCGCBdBD0BBCGBCEEBBBCGBEDBDFBFMBGCBCGB1DOORMBmDFFDJBCEEBDBHGCBCBCKBDDBGEBF1B1BB8zC8zCBjHBHDBEBBNlBBCGGD3BBIRRBVBKGBCGBCGBCGBCGBCGBCGBCGBxC2O2OBrBrBBDBGBBF1CBHCBC5CBCDBGqBBC9CBSfBxBPBhQ-tGBhCs0VBkCtBBDsIBEPBLBBVuBBReBDlCByBIBDmDBDxCBVQBCCBCDBCWBezBBPxBB-BFBECCBMMBaBLWBacBIuBBdRRBDBCJBLEBCoBBYCBCHBVWBEEEBwBBCEEBDDBDBDCCZCBDKBICBNFBDFBDFBKGBCGBCqBBCNBHyDBej9KBNWBFwBBloItLBDpDBnBGBNEBGCCBIBCMBCEBCCCBCCBCCBqDBiBqLBT-BBD1BBpBLB1DEBCmEBlBZBHZBM4CBEFBDFBDFBDCBkBLBCZBCSBCBBCOBDNBjB6DBmMcBEwBBwBfBOTBCHBHlBBLdBDjBBFHBxB9EBTjBBFjBBFnBBJzBBNKBCOBCGBCBBCKBCOBCGBCBBEzBBN2JBKVBLHBZFBCpBBCIBmCFBDCCBqBBCBBEDDBVBLWBKeBiCSBCBBLVBLZBHZBnB3BBHBBhCQQBCBCCBCcBrBcBEcBkBHBCbBc1BBLVBLSBORBvDoCB4ByBBOyBBOjBBnBbBKWB7HpBBHBBRFB5BcBLJJBUBrBRBvBUBcWBN0BB6BBBDOOBrBBhBYBbjBBeDDJiBBENNBuBBPDBWCCkBRBCYBUBBgCGBCCCBCBCOBCJBIuBBnBHBDBBDVBCGBCBBCEBETTNEBfJBCDDClBBCaaCtBtBBzBBTDBVCBfvBBVBBC5F5FBtBBqBDBlBvBBV8B8BBpBBOoCoCBZBmBGB6FrBB1D-BBgBHBDDDBGBCBBCXBQCC-CHBDmBBRCCdLLBmBBIWWMtBBUTTBnCBoGgBBgBIBCkBBSyByBBcBxDGBCBBClBBWaaBEBCBBCfBPYYBqBBlISBQCCBLBChBB9DwCwCB4cBnHjGBtyCgDBQvhBBSFBa68DBGmSB61GdBj3B4RBIeBSuCBSdBTvBBRDBgBUBGSBxNsBB0G-BBhBYBDYBtBqCBGjCjCBLBhCBBCPPBNNB0mHBqBfBiDyDB+vIDBCGBCBBCiJBQeeBBBDPPBCBJrMBloCqDBGMBEIBIJBn7F0CBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDYBCYBCeBCYBCeBCYBCeBCYBCeBCYBCHB15BeBHFBmI9BBzEsBBLGBRiKiKBcBTrBBlPbBlHdBDwGwGBdBCCBCBBCGBDEBKBBhHGBCDBCBBCOBCkGB8BjCBI1lB1lBBCBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQBlqE-2pBBhB9oEBDt0FBDwpHBQtTBjtC9QBjvBq6EBGppIB",!1)),LC:()=>new p(g("hCZBHZB7BLLBVBCeBCiGBCDBFvGBDZBhGDBDBBECBCHHCCBCCCBSBCyCBCqEBJlFBClBBKoBB44ClBBCGGDqBBDCBhV1CBDFBjkCKBGqBBDCBhCrBBgCMBChBBmD1IBDFBDlBBDFBDHBCGCBdBD0BBCGBCEEBBBCGBEDBDFBFMBGCBCGBmIFFDJBCEEBDBHGCBCBCFBFDDBCBGEBF1B1BB8zC8zCB6DBDmDBHDBEBBNlBBCGGzoetBBTbBnEtCBCWBEDBCsCBZBBE2Z2ZBpBBGIBIvCBh6TGBNEBqgBZBHZBmlBvCBhDjBBFjBB1DKBCOBCGBCBBCKBCOBCGBCBBk2ByBBOyBB+CVBLVB74C-BBhrV-BBhBYBDYBtpZ0CBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDYBCYBCeBCYBCeBCYBCeBCYBCeBCYBCHB15BJBCTBHFB2uCjCB",!1)),Ll:()=>new p(g("hDZB7BqBqBBWBCHBC2BCBQCBuBCDECBBBDCCDEEBFFDEEBBBDDDCCCDCCBCCDEECDDBDDBBBHGDCOCBSCBDDCEEC4BCBFBDDDBCCFICBjCBDZBiGCCEEEBBBTccBhBBCBBECBCWCBDBCGDB0B0BBuBBCgBCK0BCDMCBgDCxBoBBo6CqBBDCB5XFBjkCIBC2D2DBqBBgCMBChBBnD0ECBHBCgDCBHBJFBLHBJHBJFBLHBJHBJNBDHBJHBJHBJEBCBBHEEBBBCBBJDBDBBJHBLCBCBBzIEEBEEcKFDBBJDBF2B2Bs1CvBBCEEBGCFCCBCCBEBGiDCBIICFFNlBBCGG0oesBCUaCoEMCBBBC+BCBGBCCCDICFCCDCCBBBCSCGGGCMCFCCDOCbEE2ZqBBGIBIvCBh6TGBNEBqhBZBumBnBBpEjBB8EKBCOBCGBCBBk4ByBB+DVB75CfBhsVfB8BYBnqZZBbGBCRBbZBbDBCCCBFBCKBbZBbZBbZBbZBbZBbZBbZBbZBbbBdYBCFBbYBCFBbYBCFBbYBCFBbYBCFBC15B15BBIBCTBHFB4vChBB",!1)),Lm:()=>new p(g("wVRBFLBPEBICCmEGG-OnHnHlFBBuIBBFgBgBKEEhFoFoF1mBgEgE2R72B72BsDkTkTxOFBvF+BBOjBjBBjBByVOORMBg-CBByHgGgG2OsBsBBDBGiDiDB+C+CBBB34bjnBjnBBEBvIzDzDdBB6DIBxCYYpDDBEBB2OXXqEtDtDWBBoDDBKngVngVuBBBh-BFBCpBBCIB0sBhBhB2K04D04DnrTDB9PCBpBBBnRMBhCBBCPPB9-P9-PBCBCGBCBByhM9BBqGGBud0Q0QsSAB",!1)),Lo:()=>new p(g("qFQQhIFFBCBxGBB7ZaBFDBuBfBCJBkBBBCiDBCZZBLLBBBDRRCdBe4CBMZZBfBWVBrBYBIKBGXBCGBRoBB8B1BBETTIJBROBFHBDBBDVBCGBCEEBCBERROBBCCBPBBLJJBEBFBBDVBCGBCBBCBBCBBgBDBCUUBBBRIBCCBCVBCGBCBBCEBETTQBBYMMBGBDBBDVBCGBCBBCEBEffBCCBBBQSSCFBECBCDBEBBCCCBEEBEEBBBELBX1B1BBGBCCBCWBCPBEbbBBBCBBDBBfFFBGBCCBCWBCJBCEBEffBBBCBBQBBSIBCCBCoBBDRRGCBJCBZFBGRBEXBCIBCDDBFB7BvBBCBBNFB8BBBCCCBDBCXBCCCBIBCBBKDDBDBYDBhBgCgCBGBCjBBcEB0DqBBVRRBEBFDBEEEBIIBBBFMBNyDyDBnKBCDBDGBCCCBCBDoBBCDBDgBBCDBDGBCCCBCBDOBC4BBCDBDiCBmBPByDrTBDQBCZBGqCBHHBIRBOSBPRBPMBCCBQzBBpBkCkCBhBBC0BBIEBDhBBCGGBkCBLeByBdBDEBMrBBFZB3BWBK0BBxFuBBSHB3BdBOBBLrBBbjBBqBCBLdByDDBCFBCBBE7hB7hBBCB4-C3BBZWBKGBCGBCGBCGBCGBCGBCGBCGBoR2B2BF1CBJCCB4CBFGGBpBBC9CBSfBxBPBhQ-tGBhC0wUBC2jBBkCnBBJrIBFPBLBBjCyByBBkCBqFoDoDEGBCCBCDBCWBezBBPxBB-BFBECCBMMBaBLWBacBIuBBuBEBDIBLEBCoBBYCBCHBVPBCFBEEEBwBBCEEBDDBDBDCCZBBEKBIPPBEBDFBDFBKGBCGByEiBBej9KBNWBFwBBloItLBDpDBkCCCBIBCMBCEBCCCBCCBCCBqDBiBqLBT-BBD1BBpBLB1DEBCmEBqDJBCsBBDeBEFBDFBDFBDCBkBLBCZBCSBCBBCOBDNBjB6DBmMcBEwBBwBfBOTBCHBHlBBLdBDjBBFHBhEtCBjDnBBJzBB9CzBBN2JBKVBLHB5EFBDCCBqBBCBBEDDBVBLWBKeBiCSBCBBLVBLZBHZBnB3BBHBBhCQQBCBCCBCcBrBcBEcBkBHBCbBc1BBLVBLSBORBvDoCB4FjBBnBDBCxJxJBoBBHBBRCBCBB5BcBLJJBUBrBRBvBUBcWBN0BB6BBBDOOBrBBhBYBbjBBeDDJiBBENNBuBBPDBWCCkBRBCYBUBBgCGBCCCBCBCOBCJBIuBBnBHBDBBDVBCGBCBBCEBETTNEBfJBCDDClBBCaaCtBtBBzBBTDBVCBfvBBVBBC5F5FBtBBqBDBlBvBBV8B8BBpBBOoCoCBZBmBGB6FrBB0GHBDDDBGBCBBCXBQCC-CHBDmBBRCCdLLBmBBIWWMtBBUTTBnCBoGgBBgBIBCkBBSyByBBcBxDGBCBBClBBWaaBEBCBBCfBPYYBnBBCBBlISBQCCBLBChBB9DwCwCB4cBnHjGBtyCgDBQvhBBSFBa68DBGmSB61GdBj3B4RBIeBSuCBSdBTvBB0BUBGSB0NnBB2MqCBGwFwFB0mHBqBfBiDyDBuwIiJBQeeBBBDPPBCBJrMBloCqDBGMBEIBIJBxzI2P2PBrBBiBiKiKBcBTrBBlPaBmHdBDwGwGBdBCCBCBBCGBDEBKiHiHBFBCDBCBBCOBCkGB8pBDBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQBlqE-2pBBhB9oEBDt0FBDwpHBQtTBjtC9QBjvBq6EBGppIB",!1)),Lt:()=>new p(g("lOGDnB2sH2sHBGBJHBJHBNQQwBAB",!1)),Lu:()=>new p(g("hCZBmDWBCGBiB2BCDOCDuBCBECEBBCCCBCCBBBDDBCBBCCBEBBCBBCECBCCDCCBCCBBBCCCBEEIJDCMCDQCDDDCCBC4BCIBBCBBDCCBCBCGCiJCCEJJHCCBBBCCCBCCBPBCIBkBDDBBBEWCGDDCBBDyBBxBgBCK2BCBMCD+CCDlBBq6ClBBCGGzW1CB0kCHHBpBBDCBhK0ECKgDCKHBJFBLHBJHBJFBMGCJHBpCDBNDBNDBNEBMDBnIFFECBDCBDEEBDBHGCBCBDDBLBBG+B+B9zCvBBxBCCBBBDGCBCBCDDJCBCgDCJCCFuqeuqeCqBCUaCoEMCE8BCLECBICFCCDCCEUCBDBCEBCOCBCBCCCBQCZs5Vs5VBYBmmBnBBpEjBB9EKBCOBCGBCBBr3ByBB+EVB75CfBhsVfBhCYBoqZZBbZBbZBbCCBGDBDDBCBCHBbZBbBBCDBDHBCGBcBBCDBCEBCEEBFBcZBbZBbZBbZBbZBbZBfYBiBYBiBYBiBYBiBYBiB2pE2pEBgBB",!1)),M:()=>new p(g("gYvDB0IGBoIsBBCCCBCCBCCpCKBxBUBRmDmDBFBDFBDBBCDBkBffBZB8CKB7BIBKZZBCBCIBCCBCEBsBCB8BIBrBXBCgBB3BCBCRBCGBLBBeCB5BCCBFBDBBDCBKLLBbbDCB5BCCBDBFBBDCBEffBEEMCB5BCCBGBCCBCCBVBBXFBCCB5BCCBFBDBBDCBICBLBBf8B8BBDBECBCDBKpBpBBDB4BCCBFBCCBCDBIBBMBBeCB5BCCBFBCCBCDBIBBMBBQNNBCB4BBBCGBCCBCDBKLLBeeBBBnCFFBEBCCCBGBTBB+BDDBFBNHBjDDDBHBMGBqCBBcECFBByBTBCBBGKBCjBBKlDlDBSBYDBFCBCCBDGBEDBOLBCLLBCBgWCBzdDBdCBeBBfBBhCfBKuBuBBBBC2D2DBjBjB3DLBFLB8GEB6BJBCcBDxBxBBsBBDLBVEBwBQBnBIBNCBfMB5BNBxBTB5ECBCUBFHHDCBnG-BBxWgBB--CCBuEhDhDBeBrRFBqDBB1udDBCJBhBBBxCBBxIEEFYYBDBF0C0CBzBzBBQBbRBOnBnBBGBaMBtBDBwBNBlBkCkCBMBNJJBuBuBBBBzBCCBBBDBBGBBCqBqBBDBGBBtHHBCBBx5TiXiXBOBRPBuejHjH2EEBn0BCBCBBGDBpBCBFmFmFB+R+RBCBiCEB+JBBuCFBnCKByBDB7DCB2BOBqBDDBLLBCBuBKBI+B+BBBBlBNBRBBtBNNBBBxBNBJDBCBB9CLBHDD+ELBWDB4BBBCGBDBBDCBKLLBDDBFBEEBkCIBCDDCDBCEBCPPBzCzCBQBYyCyCBSBsHGBDIBcBBzCQBrDMBmDOBhIOB2HFBCBBDDBCCCBuEuEBFBDGBEddBIBpBGBCDBJKKBJBvBPBnGHBoGHBCHBzCVBCNB7DFBECCBCCBFBCjCjCBDBCBBCEB8KDBKBBCxBxBBFBEEBYmnFmnFHOBpmLRBhuCEB8BGB5gBCCB1BBIDByCMMBslTslTBizEizEBsBBDWB-QEBEFBJHBDGBfDB1ECB89B2BBFxBBJPPXEBCOBxqBGBCQBDGBCBBCEBlDhFhFBFB4L+B+BBCB9PDB-HBB0HDDIBBG7O7OBFBuDGB29lYvHB",!1)),Mc:()=>new p(g("joC4B4BDCBJDBCBBzBBB7BCBHBBDBBLsBsB7BCBjC7B7BBBBJCCB2B2BB7B7BCHHBDDBLLnDBBCBBECBCCBLqBqBBBB+BDB+BBB7BCCBDBDBBCBBKBBdPPB7B7BBBBGCBCCBLrBrBBsCsCBBBHHBTBBrKBBgCsFsFBFFHDDBaaBLLBBBDGBWBBDFBDLLBBB5zBffiEIIBGBCBB7KDBDCBFBBCFBhHBB7BCCKCCBJJBEByExBxBGCCBDBCBB+BffFBBD9B9BDCBCEEBxBxBBGBJBBsFWW35EBB0-dBBD5C5CBzBzBBOBvEBBwBxBxBBFFBDDBBBvDBBDBBZuBuBCuDuDDBBGuHuHBCCBCCBCC0gZCCgEuBuBBBBFBB0DZZB8B8BxBCBKBBO+C+CBBBEBBCrFrFBBBgBBB7BBBCDBDBBDCBKLLB1C1CBBBIDDCDBCBBCmDmDBBBJBBErDrDBBBHCCBCBDuHuHBBBHDBDyDyDBBBJBBCuDuDCBBHoDoDCBBFmImIBBBK4H4HBEBCBBFDDCvEvEBBBJDBF1C1CeBB-BqGqGECCoGPPrDIID2G2GBDBFBBC-K-KBNNxBBBJBBCpvQpvQBBBlxD2BBpDBB0rYBBHFB",!1)),Me:()=>new p(g("okBBB1xF-wB-wBBCBCCBsshBCB",!1)),Mn:()=>new p(g("gYvDB0IEBqIsBBCCCBCCBCCpCKBxBUBRmDmDBFBDFBDBBCDBkBffBZB8CKB7BIBKZZBCBCIBCCBCEBsBCB8BIBrBXBCfB4BCCFHBFEEBFBLBBe7B7BFDBJVVBbbDBB6BFFBFFBDDBBBEffBEEMBB6BFFBDBCBBFVVBXXBEBC7B7BDCCBCBJIIBMMBff+BNNzBEE4BCCBBBGCBCDBIBBMBBe7B7BDHHGBBVBBdBB6BBBFDBJVVBeepCIIBBBC7C7CDGBNHBjDDDBHBMGBqCBBcEC4BNBCEBCBBGKBCjBBKnDnDBCBCFBCBBDBBaBBFCBRDBODDBHHQgWgWBBBzdCBeBBfBBfBBhCBBCGBJDDBJBKuBuBBBBC2D2DBjBjB3DCBFBBKHHBBB8GBBD7B7BCGBCCCDHBHJBDxBxBBMBCeBDLBVDBxBCCBDBCGGpBIBNBBhBDBDBBCCB5BCCBEECCB7BHBDBB5ECBCMBCGBFHHEBBnG-BBxWMBFEEBKB--CCBuEhDhDBeBrRDBsDBB1udFFBIBhBBBxCBBxIEEFaaBGG4EBBbRBOnBnBBGBaKBvBCBxBDDBCBDBBoBkCkCBEBDBBDBBNJJwB0B0BCCBDBBGBBCrBrBBJJvHDDFx5Tx5TiXPBRPBuejHjH2EEBn0BCBCBBGDBpBCBFmFmFB+R+RBCBiCEB+JBBuCFBnCKByBDB8D3B3BBNBqBDDBLLBBByBDBDBBI+B+BBBBlBEBCHB-BNNB1B1BBHBLDBDgDgDBBBDCCBHHD+E+EEHBWBB6BBBEmBmBBFBEEBnCFBOECPBB2CHBDCBCYY1CFBCFFBCCBvHvHBCBHBBCBBcBB2CHBDCCBrDrDCDDBEBCmDmDCDDBCBCEBkIIBCBBhIBBCFFxEDBDBBFhBhBBIBpBFBDDBJKKBEBDCBvBMBCBBnGCCBBBCqGqGBFBCFBCzCzCBUBDGBCBBCBB7DFBECCBCCBFBCpCpCBEEC8K8KBMMB1B1BBDBGCCYmnFmnFHOBpmLLBECBhuCEB8BGB5gBgCgCBCByC5lT5lTBizEizEBsBBDWBhRCBSHBDGBfDB1ECB89B2BBFxBBJPPXEBCOBxqBGBCQBDGBCBBCEBlDhFhFBFB4L+B+BBCB9PDB-HBB0HDDIBBG7O7OBFBuDGB29lYvHB",!1)),N:()=>new p(g("wBJB5DBBGDDBBBitBJBnEJBnGJB9MJB3DJBFFBtDJB3DJB3DJBDFBvDMB0DJBJGBoDJBpDGBISBuDJBhDJB3DJBnCTBtIJBnCJBwWTBybCBwHJBHJBXJBtJJBhEKBmFJBHJB3FJB3CJBnEJBHJB3gBEEBEBHJBnGyBBDEB3W7BBvCVB3TdBqrBqYqYaIBPCB4KDBrEJBfHBCOBhBJBoBOBh7cJB9FJBhKFB7EJBnBJBnGJBXJB3CJB3MJB34UJBuPsBBN4BBSBB2KaBlBDBeJJnEEBrGJBvdHBaGBoBIBsCEBXFBhFBBDPBDtBBhCIB1BBBfCBsCEBpDHBZHBqBGBrKFBxBJBHJB3IeB-EJBrBDBxDGBnEdBhEJB9BJBxEJBITB8HJB3KJB3DJB3LJBnDJBHTBtCLBlNSB+CJB3UJB3CcBkHJBnCJB3BJBnLJBnDUBshBuDBimPJBnpCJB3CJBnEJBCGBvQJBnIWB+KCB6nXJBnuBTBNTBtDYB2iBxBBhqCJBnNJB3PJB4HJBtWIBhEJB4Y6BBCCBCDBtCsBBCOBjeMBk3CJB",!1)),Nd:()=>new p(g("wBJnxBJnEJnGJ9MJ3DJ3DJ3DJ3DJ3DJ3DJ3DJ3DJ3DJhDJ3DJnCJ3IJnCJn6BJnBJtJJhEJnFJHJ3FJ3CJnEJHJnuiBJnVJnBJnGJXJ3CJ3MJ34UJnsBJnkCJHJ9YJhEJ9BJxEJ3IJ3KJ3DJ3LJnDJHTtCJnNJnDJ3UJ3CJ3HJnCJ3BJnLJ3uQJnpCJ3CJnEJ3QJ37XJ12CxBhqCJnNJ3PJ4HJ2aJ30EJ",!0)),Nl:()=>new p(g("u3FCBwzCiBBDDB-zDaaBHBPCBs1dJBxyW0BBtOJJnEEBrhIuDBm8SCB",!1)),No:()=>new p(g("yFBBGDDBBB2pCFB5LFB5DCBmEGB6GGBSIByNJB2hBTB0jBJBhP20B20BEFBHJBnGPBqB3W3WB6BBvCVB3TdBqrB1kB1kBBCBrEJBfHBCOBhBJBoBOBxrdFBymWsBBiCDBSBB2KaBlBDB1pBHBaGBoBIBsCEBXFBhFBBDPBDtBBhCIB1BBBfCBsCEBpDHBZHBqBGBrKFBhLeB-EJBrBDBxDGBnETB8LTBmqBBBvNIBobSB0aUBn8SGB-YWBqhZTBNTBtDYBvqFIBid6BBCCBCDBtCsBBCOBjeMB",!1)),P:()=>new p(g("hBCBCFBCDBLBBEBBbCBCccCkBkBGEELBBEEE-VJJzOFBqBBB0BCCDDDtBBBVBBCBBOCCBBBrCDBnDsBsBBMBqHCB3BOBgBmImIBLLtE5D5D6DnMnMNwLwL7CLLBpFpFBNBCmBmBBCBoCrCrCBDBFBBwDFBsFlTlTBHB4EuTuTtBBBvCCBoCBB+ECBCCBmBKB6JBB5GBBhEGBCFBhFBBLGBdCB9DDB8BEB-BBBhCHBM9Z9ZBWBJTBCMBCLBfBBPBB6TDBeBB+hBNBwCBBgBJB0MVBgCDBhBBB8XDBCBBxDwEwEBtBBCfBDLBkNCBFJBDLBRNNjD7C7CjgdBBuICBkDLL0DFB9LDB3CBBpBCBCyByBBwBwBiDMBRBB9DDB-DBBRBB6HzqUzqUBxGxGBIBXiBBCNBCFFCBB2ECBCFBCDBLBBEBBbCBCccCCCBFB7MCB9UxBxB-MoXoXoGgBgBxIIBnBxDxDBFBjCGB6CDByO-J-JjBlElEBDBtBDB+FGBuDBBCDB-DDBxBBBwCDBFOOCCB5CFBsDrJrJBCCBzDzDBDBLBBCpDpD7HWBqDCBdMBtCjEjEBBB9HpIpIBBB8E9C9CBGB0CCBCEB+CJB4GgDgDBDBrBBBmUBBrCMBwFxjBxjBBDB97CBB8zOBBmEiCiCBDBJpRpRBBBoJDBoK9lT9lTovHEB07C-a-aBAB",!1)),Pc:()=>new p(g("-Cg-Hg-HBUU-u3BBBZCBwHAB",!1)),Pd:()=>new p(g("tB9qB9qB0BiyDiyDmgBqgCqgCBEBiwDDDgBBBFdd-NUUwDxszBxszBBmBmBLqFqFhzD-J-J",!1)),Pe:()=>new p(g("pB0B0BgB+1D+1DC-6B-6BqtC4B4BQ7T7TCff-hBMCxChBhBCGC1MUChCCCiBmhBmhBCECtBGCtNICEGCDBB-ozB6G6GeOCESSCCCrF0B0BgBGD",!1)),Pf:()=>new p(g("7F+6H+6HEddpuDCCFDDQEE",!1)),Pi:()=>new p(g("rFt7Ht7HDBBDaapuDCCFDDQEE",!1)),Po:()=>new p(g("hBCBCCBDECBLLBEEBcclCGGPBBI-V-VJzOzOBEBqB3B3BDDDtBBBVBBCBBOCCBBBrCDBnDsBsBBMBqHCB3BOBgBmImIBLLtE5D5D6DnMnMNwLwL7CLLBpFpFBNBCxDxDrCEBFBBwDFBsFlTlTBHBmY9D9DBBBoCBB+ECBCCBmBFBCDB6JBB5GBBhEGBCFBhFBBLGBdCB9DDB8BEB-BBBhCHBMjajaBJJBGBJIBDDBDCBEKBCCCBIB7kDDBCBBxDwEwEBFFBBBDDDBHBCBBCDDBLLBDBCJBDDBCCCBLBDCBtNCB6B+F+FjgdBBuICBkDLL0DFB9LDB3CBBpBCBCyByBBwBwBiDMBRBB9DDB-DBBRBB6HlxUlxUBFBDXXVBBDDBECBCDBICBHCCB2E2EBBBCCBDECBLLBEEBcclBDDB7M7MBBB9UxBxB-MoXoXoGgBgBxIIBnBxDxDBFBjCGB6CDB0ZlElEBDBtBDB+FGBuDBBCDB-DDBxBBBwCDBFOOCCB5CFBsDrJrJBCCBzDzDBDBLBBCpDpD7HWBqDCBdMBtCjEjEBBB9HpIpIBBB8E9C9CBGB0CCBCEB+CJB4GgDgDBDBrBBBmUBBrCMBwFxjBxjBBDB97CBB8zOBBmEiCiCBDBJpRpRBBBoJDBoK9lT9lTovHEB07C-a-aBAB",!1)),Ps:()=>new p(g("oBzBzBgB-1D-1DC-6B-6B-rCEEnB4B4BQ7T7TCff-hBMCxChBhBCGC1MUChCCCiBmhBmhBCECaTTCECtNICEGCDipzBipzB4GeeCMCESSCCCrFzBzBgBEEDAB",!1)),S:()=>new p(g("kBHHRCBgBCCcCCkBEBCBBDCCBCBDEEfgBgBrODBNNBGGBCCCBPB2DPPBxDxDsErIrIBBB3DCBDDDBvGvGLUUB4H4HIBBpEqLqLBHHB2H2H-DjEjEBGBlEwGwGqBmGmGiGCBQCCBBBDFBVECmEHBCFBCBBGDBmGBBxXJB0WuLuLlL+E+EBgBBiLJBKIBhiBCCBBBMCBOCBOCBOBBmCOOoBCBOCBUhBB-BBBCDBCBBLCCBBBGFBCECFMMBFFBDBGDBC7B7BBFFB2LBFcBD+HBXKByCtCBXnTBtBwBBDeBLyMBX+BBFfBD1LBDpEBmHFBmLBBvBZBC4CBN1GBbPBFOOBNNWBBHBB8CBB0HBBFJBhBlBBKRRBdBMdBJQQBeBLmBBQ-JBhuG-BBx0V2BB6RWBKBBoDBB+EDBLDB+RCBiHPPB+9T+9TpEgBBuLPBhCBB3BHBtBDBjDCCBBBD7E7EHRRBBBgBCCcCCiEGBCGBOBB6JIB6BQBDCBCMBEwBwBBrBB7zBBBwSmWmWBiKiKBGBnjC2kC2kCBbBr6SDBG3qU3qUk7DvHBLCBEzNBHWBQQBgDzDB9B1HBLmBBD7BBGCBXBBIdBF8BBWhCBE7F7FB1CBrbaagBaagBaagBaagBaa9B-PB4BDBzBHBCNBCBBp2BwNwNttCEE+DiOiOBvIvIBqBBFjDBNOBDOBCOBCkBBYgFB5BcBOrBBFIBIBBPFB7E4eBEQBEMBE5GBHLBFQQBKBF3BBJJBHnBBJdBDLBFBBPIBoB3KBJNBDMBEKBE4BBCFFBOBDLBFJBIyEBC7CBLAB",!1)),Sc:()=>new p(g("kB+D+DBCBqnB8D8DzPBBzPBBI2H2HoImSmS8sClmClmCBgBB37hBkuVkuVtD7E7E8GBBEBB3-HDB-4wBxtCxtC",!1)),Sk:()=>new p(g("+CCCoCHHFEEqQDBNNBGGBCCCBPB2DPPBjoBjoB15FCCBBBMCBOCBOCBOBB9kEBBkzdWBKBBoDBBxePPBniUniUBPB8bCCjF4g9B4g9BBDB",!1)),Sm:()=>new p(g("rBRRBBB+BCCuBFFmBgBgB-XwQwQBBB8xGOOoBCBOCBsEoBoBBDBHlClCBDBGBBFGDIgBgBBDDCgBgBBqIBhBBB7CffBXBpBFB2OKK3BHBwDxKxKBDBDeBLPBhIiEBX+BBFfBDhIBxBUBDFB9+zB5Z5ZCCBlFRRBBB+BCCkEHHBCBitDBBhrwBx+Bx+BagBgBagBgBagBgBagBgBat5Ft5FB-uC-uCBHB",!1)),So:()=>new p(g("mFDDFCCyerIrIBgEgEBvGvGLUUB4H4HkQ2L2LjEFBClElEwGqBqBoMCBQCCBBBDFBVECmEHBCFBCBBGDBmGBBxXJB0WzWzW+EhBBiLJBKIBksBBBCDBCBBLCCBHHBEBCECFMMBPPCBBC7B7BBKKBDBDDBCBBCBBCGBCeBDBBCCCBdBtIHBFTBDGBDwCBCdBanBBHnCBXKByCtCBX2FBCIBC1BBJuDBC3HBtBrBBhC-HBhQvBBWBBHmBBDpEBmHFBmLBBvBZBC4CBN1GBbPBFOOBNNWBBHBBxKBBFJBhBlBBKRRBdBMdBJQQBeBLmBBQ-JBhuG-BBx0V2BBibDBLBBC+R+RBBBqqUPBuLPBhCBB3BHBuBCBlPEEFBBOBB6JIB6BQBDCBCMBEwBwBBrBB7zBBBwSpgBpgBBGBnjC2kC2kCBGBFQBr6SDBG3qU3qUk7DvHBLCBEzNBHWBQPBhDzDB9B1HBLmBBD7BBGCBXBBIdBF8BBWhCBE7F7FB1CBqlB-PB4BDBzBHBCNBCBBp2B96C96CiEyWyWBqBBFjDBNOBDOBCOBCkBBYgFB5BcBOrBBFIBIBBPFB7E6HBG4WBEQBEMBE5GBHLBFQQBKBF3BBJJBHnBBJdBDLBFBB-B3KBJNBDMBEKBE4BBCFFBOBDLBFJBIyEBC7CBLAB",!1)),Z:()=>new p(g("gBgEgEgvFgsCgsCBJBeBBGwBwBh9DAB",!1)),Zl:()=>new p(g("ohIA",!0)),Zp:()=>new p(g("phIA",!0)),Zs:()=>new p(g("gBgEgEgvFgsCgsCBJBlBwBwBh9DAB",!1)),ASCII_Hex_Digit:()=>new p(g("wBJIFbF",!0)),Alphabetic:()=>new p(g("hCZBHZBwBLLFGGBVBCeBCpOBFLBPEBICC3CeeBQBCBBDDBCHHCCBCCCBSBCyCBCqEBJlFBClBBDHHBnBBoBNBCCCBCCBCCJaBFDBeKBG3BBCGBPlDBCHBFHBFCBLCBDRRBuBBOkDBZgBBKBBFGGBWBDSBUYBIKBGXBCGBIJJBoBBLLBEGBHrCBCPBCCBFOBOSBCHBDBBDVBCGBCEEBCBEHBDBBDBBCJJFBBCEBNBBLFFBBBCFBFBBDVBCGBCBBCBBCBBFEBFBBDBBFIIBCBCSSBEBMCBCIBCCBCVBCGBCBBCEBEIBCCBCBBEQQBCBWDBFCBCHBDBBDVBCGBCBBCEBEHBDBBDBBKBBFBBCEBORRBCCBEBECBCDBEBBCCCBEEBEEBBBELBFEBECBCCBEHHpBMBCCBCWBCPBEHBCCBCCBJBBCCBCBBDDBdDBCHBCCBCWBCJBCEBEHBCCBCCBJBBGCBCDBOCBNMBCCBCoBBDHBCCBCCBCGGBCBIEBXFBCCBCRBEXBCIBCDDBFBJFBCCCBGBTBBO5BBGGBH0B0BBECBDBCXBCCCBRBCCBDEBCHHPDBhBgCgCBGBCjBBFSBFPBCjBBkC2BBCDDBDBR-BBLDBDlBBCGGDqBBCsKBCDBDGBCCCBCBDoBBCDBDgBBCDBDGBCCCBCBDOBC4BBCDBDiCBmBPBR1CBDFBErTBDQBCZBGqCBEKBITBMUBNTBNMBCCBCBBNzBBDSBPFFkC4CBIqBBGlCBLeBCLBFIBYdBDEBMrBBFZB3BbBF+BBDTBzBYYBMMBBByBzBBCOBCHB0BpBBDDBLrBBCKBP2BBXCBLjBBDKBGqBBDCBqBDBCFBCBBEGGB+FBUhBBM1IBDFBDlBBDFBDHBCGCBdBD0BBCGBCEEBBBCGBEDBDFBFMBGCBCGB1DOORMBmDFFDJBCEEBDBHGCBCBCKBDDBGEBFSSBnBBuZzBB34BkHBHDBEBBNlBBCGGD3BBIRRBVBKGBCGBCGBCGBCGBCGBCGBCGBCfBwB2O2OBBBaIBIEBDEBF1CBHCBC5CBCDBGqBBC9CBSfBxBPBhQ-tGBhCs0VBkCtBBDsIBEPBLBBVuBBGHBEwDBoBIBDmDBDxCBVUBCgBBZzBBNjCBCtBtBBEBECCBBBLgBBGiBBOcBEyBBCLBQRRBOBLEBC2BBKNBTWBEkCBCCCZCBDPBDDBMFBDFBDFBKGBCGBCqBBCNBH6DBWj9KBNWBFwBBloItLBDpDBnBGBNEBGLBCMBCEBCCCBCCBCCBqDBiBqLBT-BBD1BBpBLB1DEBCmEBlBZBHZBM4CBEFBDFBDFBDCBkBLBCZBCSBCBBCOBDNBjB6DBmC0BBsIcBEwBBwBfBOdBGqBBGdBDjBBFHBCEBrB9EBTjBBFjBBFnBBJzBBNKBCOBCGBCBBCKBCOBCGBCBBEzBBN2JBKVBLHBZFBCpBBCIBmCFBDCCBqBBCBBEDDBVBLWBKeBiCSBCBBLVBLZBHZBnB3BBHBBhCDBCBBGHBCCBCcBrBcBEcBkBHBCbBc1BBLVBLSBORBvDoCB4ByBBOyBBOnBBjBbBEGGBVB7HpBBCBBEBBRFBzBCBEcBLJJBUBrBRBvBUBcWBKlCBsBEBL4BBKOOBXBYyBBSDBJiBBEKKB+BBCDBKBBLCCkBRBChBBDHHBCB-BGBCCCBCBCOBCJBI4BBYDBCHBDBBDVBCGBCBBCEBEHBDBBDBBEHHGGBdJBCDDClBBCJBCDDCDBCBBECCtBhCBCCBCDBVCBfhCBDBBC5F5FB0BBDGBaFBjB+BBCEE8B1BBDoCoCBZBDNBWGB6F4BBoD-BBgBHBDDDBGBCBBCdBCBBDBBDDB+CHBDtBBDFBCCCBccBxBBDJBSnCBGTTBnCBoDHB5CgBBgBIBCsBBCGBCyByBBcBDVBCNBqCGBCBBCrBBECCBCCBBBCDDBZZBEBCBBCkBBCBBCDBCYYBqBBlIWBKQBCoBBECBwDwCwCB4cBnDuDBSjGBtyCgDBQvhBBSFBa68DBGmSB61GuBBy2B4RBIeBSuCBSdBTvBBRDBgBUBGSBxNsBB0G-BBhBYBDYBtBqCBF4BBIQBhCBBCNNBFBK1mHBqBfBiDyDB+vIDBCGBCBBCiJBQeeBBBDPPBCBJrMBloCqDBGMBEIBIJBFi7Fi7FBzCBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDYBCYBCeBCYBCeBCYBCeBCYBCeBCYBCHB15BeBHFB2GGBCQBDGBCBBCEBG9BBiBxDxDBrBBLGBRiKiKBcBTrBBlPbBlHdBDwGwGBdBCVBJBBhHGBCDBCBBCOBCkGB8BjCBEEE1lBDBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQB1TZBHZBHZB3zD-2pBBhB9oEBDt0FBDwpHBQtTBjtC9QBjvBq6EBGppIB",!1)),Dash:()=>new p(g("tB9qB9qB0BiyDiyDmgBqgCqgCBEB+BoBoBQnMnMlgDDDgBBBFdd-NUUwDxszBxszBBmBmBLqFqFhzD-J-J",!1)),Emoji:()=>new p(g("jBHHGJBwDFFu8HNN5GXX7CFBQBBwLBBNnFnFaKBFCBoGoHoHBLLK7B7BBCBCEBKGDBDDFDDCBBDIEBJJBBBGCCGLBMBBDCCBCCTDDBTTBEBCCCBEEBGGDBBFBBMBBGBBDGGBECBVVBGGBEBCDBDFFDDDBEBCDDCCCHEEHLLBQQDFFCFFBBBCMMBxBxBBBBKeP1LBBwOCBUBB0BFF7mBNN6SCCrrvDrGrGhFBBNBBPDDBIBsCZBCBBYVVDIBWBBvFhBBDvDBDBBCCBDyCBDCBCmIBC+BBMFBCXBIBBDHBNDDBCBDFFBOOBDDJBBKGGBBBNCBJCBDCCFHHEHHB0CBxBlCBGHBDDBEJBECCBEEDJBkHLBF8I8IBtBBCJBC4FBxDMBEKBE4BBCFFBOBDLBFJB",!1)),Emoji_Component:()=>new p(g("jBHHGJB0+H2G2Gsp3B3+8B3+8BBYB8PEBxtBDBtzhY-CB",!1)),Emoji_Modifier:()=>new p(g("7-8DE",!0)),Emoji_Modifier_Base:()=>new p(g("9wJ8G8GRDB4jzD9B9BBBBDDDBBB2DBBDKBWSBEFFBBBCCBICCZqGqGBFFWFFBvFvFBBBEEB0CRRBBBKMMgSDDJHBHKKBIBDCB5B+B+BBCCBCCSCBCMBmHCBrBIB",!1)),Emoji_Presentation:()=>new p(g("64IBBuGDBEDDqQBBWBBzBLBsBUUOJJBSSBGGBJJGWWIBBCFFDIIFBBdkBkBCFFBBBC+B+BBBBZPP8aBB0BFFvlxDrGrG-FDDBIBsCZBCZZVDDBDBCCBWBBvFgBBNIBClCBCVBNqBBFEBNQBEEEBlCBCCCB5FBD+BBODBCXBTbbBOO3C0CBxBlCBHEEBBBDDBEDBMBBIIBkHLBF8I8IBtBBCJBC4FBxDMBEKBE4BBCFFBOBDLBFJB",!1)),Extended_Pictographic:()=>new p(g("pFFFu8HNN5GXX7CFBQBBwLBBNnFnFaKBFCBoGoHoHBLLK7B7BBCBCEBKGDBDDFDDCBBDIEBJJBBBGCCGLBMBBDCCBCCTDDBTTBEBCCCBEEBGGDBBFBBMBBGBBDGGBECBVVBGGBEBCDBDFFDDDBEBCDDCCCHEEHLLBQQDFFCFFBBBCMMBxBxBBBBKeP1LBBwOCBUBB0BFF7mBNN6SCCrrvDoBoBBCBlDLBQBBQPPBmBmBBIBxDBBNBBPDDBIBU3BBcOBLVVDIBCDBKWBH7FBDvDBDBBCCBDyCBDCBCDBG9HBC+BBMFBCXBIBBDHBNDDBCBDFFBOOBDDJBBKGGBBBNCBJCBDCCFHHEHHB0CBxBlCBGHBDQBECCBEBDMB7GlBBNDB5BHBLFBpBHBfBBNDBDNBKmBBNuBBCJBC4FB5CHBPxEBhI9fB",!1)),Hex_Digit:()=>new p(g("wBJIFbFq1-BJIFbF",!0)),Lowercase:()=>new p(g("hDZBwBLLFlBlBBWBCHBC2BCBQCBuBCDECBBBDCCDEEBFFDEEBBBDDDCCCDCCBCCDEECDDBDDBBBHGDCOCBSCBDDCEEC4BCBFBDDDBCCFICBjCBDiBBIBBfEBhDsBsBCEEDDBTccBhBBCBBECBCWCBDBCGDB0B0BBuBBCgBCK0BCDMCBgDCxBoBBo6CqBBCDB5XFBjkCIBC2D2DB+FBiC0ECBHBCgDCBHBJFBLHBJHBJFBLHBJHBJNBDHBJHBJHBJEBCBBHEEBBBCBBJDBDBBJHBLCBCBB6DOORMBuDEEBEEcKFDBBJDBFiBiBBOBFsasaBYBn6BvBBCEEBGCFCCBCCBGBEiDCBIICFFNlBBCGG0oesBCUaCBBBmEMCBBBC8BCBIBCCCDICFCCDCCBBBCSCGGGCMCFCCDOCWDBCCCBBB2ZqBBCNBHvCBh6TGBNEBqhBZBumBnBBpEjBB8EKBCOBCGBCBBkODDBBBCpBBCIBmoByBB+DVB75CfBhsVfB8BYBnqZZBbGBCRBbZBbDBCCCBFBCKBbZBbZBbZBbZBbZBbZBbZBbZBbbBdYBCFBbYBCFBbYBCFBbYBCFBbYBCFBC15B15BBIBCTBHFBmI9BB1lChBB",!1)),Math:()=>new p(g("rBRRBBBgBeeCuBuBFmBmBgB5W5WBBBDbbBDDBBBwQCBuwGccBBBMEEOPPBCBWEBMEBiCMBFEEBFFBDBTFFDJBCDDBEBHEEBDDBCCBBBCFBENBClClCBWBCFBCBBFBBFfBCHHBPPBqIBJDBVBB7CffBZBCZZMGB+NBBNJBFFBFBBDBBEEBPCCDFBMHBGBB6BCCeDBKCBxK-BBhI-PBxBUBDFB9+zB4Z4ZBEBCjFjFRCBeCCeCCkEHHBCBitDBBhrwBwoBwoBBzCBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDjJBDxBBhwFDBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQB1BBB-uCIB",!1)),Quotation_Mark:()=>new p(g("iBFFkEQQ96HHBaBBowDqOqOBCBOCBixzBDB+FFF7CBB",!1)),Terminal_Punctuation:()=>new p(g("hBLLCMMBEE-ZJJiQ6B6BpCPPCCB1FsBsBBJBCsHsHB3B3BBEBCHBgBmImIB1nB1nBBtFtFFFB4JBB2YHBmY9D9DBBBoCBB+ECBEoBoBBCBDBB7JBBjLDBjFBBLBBCCBeCB8FEB-BBBldYYBKKBBBwlDCBzJOOFLLCBBEBBtNBB8ndBBuICBkHEB-LBB3CBBgD4E4EBBB0ECBgERRB6H6HnxUDDB6B6BBBBCDBqFLLCMMBEEiCDD7hBxBxBnkBoGoG3JBB5EFBlCFB6CDB5dEBtBDB+FGBxDDBgECBiEBBHRRB5C5CBDBtDrJrJB2D2DBBBNBBnLDBEOBqDBB6HCBmQCC8HBB4CBBFBB-MCBuBmUmUBrCrCBspBspBBDB6vRBBmEiCiCBBBLqRqRBoJoJBnwTnwTovHDB",!1)),Uppercase:()=>new p(g("hCZBmDWBCGBiB2BCDOCDuBCBECEBBCCCBCCBBBDDBCBBCCBEBBCBBCECBCCDCCBCCBBBCCCBEEIJDCMCDQCDDDCCBC4BCIBBCBBDCCBCBCGCiJCCEJJHCCBBBCCCBCCBPBCIBkBDDBBBEWCGDDCBBDyBBxBgBCK2BCBMCD+CCDlBBq6ClBBCGGzW1CB0kCHHBpBBDCBhK0ECKgDCKHBJFBLHBJHBJFBMGCJHBpCDBNDBNDBNEBMDBnIFFECBDCBDEEBDBHGCBCBDDBLBBGbbBOBUzZzZBYBx5BvBBxBCCBBBDGCBCBCDDJCBCgDCJCCFuqeuqeCqBCUaCoEMCE8BCLECBICFCCDCCEUCBDBCEBCOCBCBCCCBQCZs5Vs5VBYBmmBnBBpEjBB9EKBCOBCGBCBBr3ByBB+EVB75CfBhsVfBhCYBoqZZBbZBbZBbCCBGDBDDBCBCHBbZBbBBCDBDHBCGBcBBCDBCEBCEEBFBcZBbZBbZBbZBbZBbZBfYBiBYBiBYBiBYBiBYBiB2pE2pEBgBBvgCZBHZBHZB",!1)),White_Space:()=>new p(g("JEBTlDlDbgvFgvFgsCKBeBBGwBwBh9DAB",!1))})),k(en,"SCRIPTS",new Si({Adlam:()=>new p(g("go6DrCFJFB",!0)),Ahom:()=>new p(g("g4lCaDOFW",!0)),Anatolian_Hieroglyphs:()=>new p(g("ggxCmS",!0)),Arabic:()=>new p(g("gwBEBCFBCNBCCBCfBCJBMZBCrDBChBBxCvBBxHhBBGqCBCcBxy8BtPBDvEBhBPBxDEBCmEBk7DeBkCFBJIBiBFBh43BDBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQB1BBB",!1)),Armenian:()=>new p(g("xpBlBDxBDCks9BE",!0)),Avestan:()=>new p(g("g4iC1BEG",!0)),Balinese:()=>new p(g("g4GsCCxB",!0)),Bamum:()=>new p(g("g1pB3CpowB4R",!0)),Bassa_Vah:()=>new p(g("w26CdDF",!0)),Batak:()=>new p(g("g+GzBJD",!0)),Bengali:()=>new p(g("gsCDBCHBDBBDVBCGBCEEBCBDIBDBBDDBJFFBCCBDBDYB",!1)),Beria_Erfe:()=>new p(g("g17CYDY",!0)),Bhaiksuki:()=>new p(g("ggnCICsBCNLc",!0)),Bopomofo:()=>new p(g("qXB6wLqBxDf",!0)),Brahmi:()=>new p(g("ggkCtCFjBKA",!0)),Braille:()=>new p(g("ggK-H",!0)),Buginese:()=>new p(g("gwGbDB",!0)),Buhid:()=>new p(g("g6FT",!0)),Canadian_Aboriginal:()=>new p(g("ggF-TxRlC7tgCP",!0)),Carian:()=>new p(g("g1gCwB",!0)),Caucasian_Albanian:()=>new p(g("wphCzBMA",!0)),Chakma:()=>new p(g("gokC0BCR",!0)),Cham:()=>new p(g("gwqB2BKNDJDD",!0)),Cherokee:()=>new p(g("g9E1CDFz7lBvC",!0)),Chorasmian:()=>new p(g("w9jCb",!0)),Common:()=>new p(g("AgCBbFBbuBBCOBCEBYgBgBiOmBBGEBDTB1DKKHCC+THHPEEhB9E9ElQiEiEB6mB6mB2MDBjJwvBwvBBBBoCBBsGBBCumBumBOIIBCBCFBCCBDmYmYBKBD2CBCKBEKBCOBShBB-BlBBCCBDFBCaBCQBqBCBF5UBXKBW-cBhIzTBDpEBhQ9CBzMUBCCCBXBQHBFDB8CBBE7C7CB0E0EBOBhBlBBKxBxBB+BBgBwCBwB5C5CBmFBhuG-BBhoWhBBnDCBmFJB1HhFhFsMPPBzuUzuUBxGxGBIBXiBBCSBCDB0ECCBeBbFBbKBLuBuBBhChCBFBCGBLEBjICBFsBBEIBxCMB0BsBBlHaBltuBDB96D8HBEzNBHWBQQBgDzDB9B1HBLmBBD9BBEQBJBBIdBF8BB2GTBNTBN2CBKYBoE0CBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDjJBDxBByjFjCBtC8BBjWrBBFjDBNOBDOBCOBCkBBLtFB5BZBCBBOrBBFIBIBBPFB7E4eBEQBEMBE5GBHLBFQQBKBF3BBJJBHnBBJdBDLBFBBPIBoB3KBJNBDMBEKBE4BBCFFBOBDLBFJBIyEBCmDBnghYffB+CB",!1)),Coptic:()=>new p(g("ifNxkKzDGG",!0)),Cuneiform:()=>new p(g("ggoC5cnDuDCEMjG",!0)),Cypriot:()=>new p(g("ggiCFBDCCBqBBCBBEDD",!1)),Cypro_Minoan:()=>new p(g("w8rCiD",!0)),Cyrillic:()=>new p(g("ggBkEBDoFBx6FKBhFtCtCojEfBhie-CBv8VBBhw4B9BBiBAB",!1)),Deseret:()=>new p(g("gghCvC",!0)),Devanagari:()=>new p(g("goCwCFODZh7nBfhwcJ",!0)),Dives_Akuru:()=>new p(g("gomCGBDDDBGBCBBCdBCBBDLBKJB",!1)),Dogra:()=>new p(g("ggmC7B",!0)),Duployan:()=>new p(g("ggvDqDGMEIIJDD",!0)),Egyptian_Hieroglyphs:()=>new p(g("ggsC1iBL68D",!0)),Elbasan:()=>new p(g("gohCnB",!0)),Elymaic:()=>new p(g("g-jCW",!0)),Ethiopic:()=>new p(g("gwEoCBCDBDGBCCCBCBDoBBCDBDgBBCDBDGBCCCBCBDOBC4BBCDBDiCBDfBEZBnvGWBKGBCGBCGBCGBCGBCGBCGBCGBjpfFBDFBDFBKGBCGBylvCGBCDBCBBCOB",!1)),Garay:()=>new p(g("gqjClBEcJB",!0)),Georgian:()=>new p(g("glElBBCGGDqBBCDBx8CqBBDCBhiElBBCGG",!1)),Glagolitic:()=>new p(g("ggL-Ch9sDGCQDGCBCE",!0)),Gothic:()=>new p(g("w5gCa",!0)),Grantha:()=>new p(g("g4kCDBCHBDBBDVBCGBCBBCEBDIBDBBDCBDHHGGBDGBEEB",!1)),Greek:()=>new p(g("wbDBCCBDDBCFFCCCBBBCCCBSBC+BBPPBnpGEBzBEBFEB1ChKhKBUBDFBDlBBDFBDHBCGCBdBD0BBCOBCNBDFBCSBDCBCIBoJ-xiB-xiB7uVuCBSgj0Bgj0BBkCB",!1)),Gujarati:()=>new p(g("h0CCBCIBCCBCVBCGBCBBCEBDJBCCBCCBDQQBCBDLBIGB",!1)),Gunjala_Gondi:()=>new p(g("grnCFCBCkBCBCFIJ",!0)),Gurmukhi:()=>new p(g("hwCCBCFBFBBDVBCGBCBBCBBCBBDCCBDBFBBDCBEIIBCBCIIBPB",!1)),Gurung_Khema:()=>new p(g("go4C5B",!0)),Han:()=>new p(g("g0LZBC4CBN1GBwBCCaIBPDBle-tGBhC-vUBhoWtLBDpDBpodBBNGBqgkB-2pBBhB9oEBDt0FBDwpHBQtTBjtC9QBjvBq6EBGppIB",!1)),Hangul:()=>new p(g("goE-HvxHBiI9CyDeiCei3dckUj9KNWFwBl9JeEFDFDFDC",!0)),Hanifi_Rohingya:()=>new p(g("gojCnBJJ",!0)),Hanunoo:()=>new p(g("g5FU",!0)),Hatran:()=>new p(g("gniCSCBGE",!0)),Hebrew:()=>new p(g("xsB2BBJaBFFBpp9BZBCEBCCCBCCBCCBIB",!1)),Hiragana:()=>new p(g("hiM1CBHCBi7-C+IBTeeBBBulQAB",!1)),Imperial_Aramaic:()=>new p(g("giiCVCI",!0)),Inherited:()=>new p(g("gYvDB2IBBlOKBbhXhXBCB8qEtBBDLBlPCBCMBCGBFHHEBBnG-BBtQBBjGgBB65DDBsDBBmrzBPBRNBwejHjH7iEl+uBl+uBBsBBDWBhRCBSHBDGBfDBz6rYvHB",!1)),Inscriptional_Pahlavi:()=>new p(g("g7iCSGH",!0)),Inscriptional_Parthian:()=>new p(g("g6iCVDH",!0)),Javanese:()=>new p(g("gsqBtCDJFB",!0)),Kaithi:()=>new p(g("gkkCiCLA",!0)),Kannada:()=>new p(g("gkDMCCCWCJCEDICCCDIBGCCDDJCC",!0)),Katakana:()=>new p(g("hlM5CBDCBxHPBxGuBBC3CBvgzBJBCsBBzisBDBCGBCBBCgJgJBBBzBPPBCB",!1)),Kawi:()=>new p(g("g4nCQCoBEc",!0)),Kayah_Li:()=>new p(g("goqBtBCA",!0)),Kharoshthi:()=>new p(g("gwiCDCBGHCCCcDCFJII",!0)),Khitan_Small_Script:()=>new p(g("k-7C84G84GB0OBqBAB",!1)),Khmer:()=>new p(g("g8F9CDJHJnPf",!0)),Khojki:()=>new p(g("gwkCRCuB",!0)),Khudawadi:()=>new p(g("w1kC6BGJ",!0)),Kirat_Rai:()=>new p(g("gq7C5B",!0)),Lao:()=>new p(g("h0DBBCCCBDBCXBCCCBVBDEBCCCBFBCJBDDB",!1)),Latin:()=>new p(g("hCZBHZBwBQQGWBCeBCgOBoBEB8wGlBBHwBBGDBGMBClCBiC-HByLOORMBuEBBHccSoBB42CfBj1elDBExCBVOBxZqBBCIBCDB38TGB7gBZBHZBmhCFBCpBBCIBm61BeBHFB",!1)),Lepcha:()=>new p(g("ggH3BEOEC",!0)),Limbu:()=>new p(g("goGeBCLBFLBFEEBKB",!1)),Linear_A:()=>new p(g("gwhC2JKVLH",!0)),Linear_B:()=>new p(g("gggCLCZCSCBCODNjB6D",!0)),Lisu:()=>new p(g("wmpBvBx1eA",!0)),Lycian:()=>new p(g("g0gCc",!0)),Lydian:()=>new p(g("gpiCZGA",!0)),Mahajani:()=>new p(g("wqkCmB",!0)),Makasar:()=>new p(g("g3nCY",!0)),Malayalam:()=>new p(g("goDMCCCyBCCCFFPDZ",!0)),Mandaic:()=>new p(g("giCbDA",!0)),Manichaean:()=>new p(g("g2iCmBFL",!0)),Marchen:()=>new p(g("wjnCfDVCN",!0)),Masaram_Gondi:()=>new p(g("gonCGBCBBCrBBECCBCCBHBJJB",!1)),Medefaidrin:()=>new p(g("gy7C6C",!0)),Meetei_Mayek:()=>new p(g("g3qBWqGtBDJ",!0)),Mende_Kikakui:()=>new p(g("gg6DkGDP",!0)),Meroitic_Cursive:()=>new p(g("gtiCXFTDtB",!0)),Meroitic_Hieroglyphs:()=>new p(g("gsiCf",!0)),Miao:()=>new p(g("g47CqCF4BIQ",!0)),Modi:()=>new p(g("gwlCkCMJ",!0)),Mongolian:()=>new p(g("ggGBBDCCBSBH4CBIqBB2t-BMB",!1)),Mro:()=>new p(g("gy6CeCJFB",!0)),Multani:()=>new p(g("g0kCGBCCCBCBCOBCKB",!1)),Myanmar:()=>new p(g("ggE-EhqmBeiDfxibT",!0)),Nabataean:()=>new p(g("gkiCeJI",!0)),Nag_Mundari:()=>new p(g("wm5DpB",!0)),Nandinagari:()=>new p(g("gtmCHDtBDK",!0)),New_Tai_Lue:()=>new p(g("gsGrBFZHKEB",!0)),Newa:()=>new p(g("gglC7CCE",!0)),Nko:()=>new p(g("g+B6BDC",!0)),Nushu:()=>new p(g("h-7CvsQvsQBqMB",!1)),Nyiakeng_Puachue_Hmong:()=>new p(g("go4DsBENDJFB",!0)),Ogham:()=>new p(g("g0Fc",!0)),Ol_Chiki:()=>new p(g("wiHvB",!0)),Ol_Onal:()=>new p(g("wu5DqBFA",!0)),Old_Hungarian:()=>new p(g("gkjCyBOyBIF",!0)),Old_Italic:()=>new p(g("g4gCjBKC",!0)),Old_North_Arabian:()=>new p(g("g0iCf",!0)),Old_Permic:()=>new p(g("w6gCqB",!0)),Old_Persian:()=>new p(g("g9gCjBFN",!0)),Old_Sogdian:()=>new p(g("g4jCnB",!0)),Old_South_Arabian:()=>new p(g("gziCf",!0)),Old_Turkic:()=>new p(g("ggjCoC",!0)),Old_Uyghur:()=>new p(g("w7jCZ",!0)),Oriya:()=>new p(g("h4CCCHDBDVCGCBCEDIDBDCICFBCEDR",!0)),Osage:()=>new p(g("wlhCjBFjB",!0)),Osmanya:()=>new p(g("gkhCdDJ",!0)),Pahawh_Hmong:()=>new p(g("g46ClCLJCGCUGS",!0)),Palmyrene:()=>new p(g("gjiCf",!0)),Pau_Cin_Hau:()=>new p(g("g2mC4B",!0)),Phags_Pa:()=>new p(g("giqB3B",!0)),Phoenician:()=>new p(g("goiCbEA",!0)),Psalter_Pahlavi:()=>new p(g("g8iCRIDNG",!0)),Rejang:()=>new p(g("wpqBjBMA",!0)),Runic:()=>new p(g("g1FqCEK",!0)),Samaritan:()=>new p(g("ggCtBDO",!0)),Saurashtra:()=>new p(g("gkqBlCJL",!0)),Sharada:()=>new p(g("gskC-ChsCH",!0)),Shavian:()=>new p(g("wihCvB",!0)),Siddham:()=>new p(g("gslC1BDlB",!0)),Sidetic:()=>new p(g("gqiCZ",!0)),SignWriting:()=>new p(g("gg2DrUQECO",!0)),Sinhala:()=>new p(g("hsDCBCRBEXBCIBCDDBFBEFFBEBCCCBGBHJBDCBt-gCTB",!1)),Sogdian:()=>new p(g("w5jCpB",!0)),Sora_Sompeng:()=>new p(g("wmkCYIJ",!0)),Soyombo:()=>new p(g("wymCyC",!0)),Sundanese:()=>new p(g("g8G-BhIH",!0)),Sunuwar:()=>new p(g("g+mChBPJ",!0)),Syloti_Nagri:()=>new p(g("ggqBsB",!0)),Syriac:()=>new p(g("g4BNC7BDCxIK",!0)),Tagalog:()=>new p(g("g4FVKA",!0)),Tagbanwa:()=>new p(g("g7FMCCCB",!0)),Tai_Le:()=>new p(g("wqGdDE",!0)),Tai_Tham:()=>new p(g("gxG+BCcDKHJHN",!0)),Tai_Viet:()=>new p(g("g0qBiCZE",!0)),Tai_Yo:()=>new p(g("g25DeCVJB",!0)),Takri:()=>new p(g("g0lC5BHJ",!0)),Tamil:()=>new p(g("i8CBBCFBECBCDBEBBCCCBEEBEEBBBELBFEBECBCDBDHHPUBm+kCxBBOAB",!1)),Tangsa:()=>new p(g("wz6CuCCJ",!0)),Tangut:()=>new p(g("g-7CgBgBB+3GBhQeBiDyDB",!1)),Telugu:()=>new p(g("ggDMCCCWCPDICCCDIBCCCBDDDJII",!0)),Thaana:()=>new p(g("g8BxB",!0)),Thai:()=>new p(g("hwD5BGb",!0)),Tibetan:()=>new p(g("g4DnCCjBFmBCjBCOCGFB",!0)),Tifinagh:()=>new p(g("wpL3BIBPA",!0)),Tirhuta:()=>new p(g("gklCnCJJ",!0)),Todhri:()=>new p(g("guhCzB",!0)),Tolong_Siki:()=>new p(g("wtnCrBFJ",!0)),Toto:()=>new p(g("w04De",!0)),Tulu_Tigalari:()=>new p(g("g8kCJBCDDClBBCJBCDDCDBCJBCBBJBB",!1)),Ugaritic:()=>new p(g("g8gCdCA",!0)),Unknown:()=>new p(g("4bBBHDBICCVuMuMnBBBzBBBE4B4BBGBcDBHKBvI9B9BBmDmDBMB8BBByBBBQddBCCMEBjBEBuHJJBDDBXXICCBBBFBBKBBDBBFHBCDBDGGBaaBEEHDBDBBXIIDGDBCCGDBDBBECBCGBFCCBFBSJBEKKEXXIDDGBBLIEBCCBNBFBBNGBIEEJBBDBBXIIDGGBKKBDDBEEBFBEDBDGGBTTBIBDHHBBBEFFBBBDCCDCBDCBECBNDBGCBEFFBCCBEBCNBWEBOEEYRRBKKEFFBFBDEEDBBFBBLGBXEEYLLGBBKEEFGBDEBEFFBLLELBOEE0BEEHDBRBBbEETCBZKKCBBICBCDBHCCJFBLBBELB7BDBekBBDCCGZZCYYBGGCIILBBFfBpClBlBBCBoBlBlBQOOBjBBnGCCBDBCBB6LFFBIICFFBqBqBFBBiBFFBIICFFBQQ6BFFBkCkCBhBhBBBBbFB3CBBHBB+UCB6CGBXIBZIBVLBOEEDLB-CBBLFBLFBbFB6CGBsBEBnCJBgBNNBCBNDBCCBrBBBGKBtBDBbFBMCB-BBBiCeeBMMBEBLFBPBBvBBBNTBuCnFnFBGB9BCBQCB-BEBsBBBMHBsBEB3QBBHBBnBBBHBBJGCgBBB2BQQPBBHUUBEEKmDmDNBBcOOBBBjBNBiBOBtEDB7UVBMUB14BBB-LEBuBCCBDBCBB5BGBDNBZIBI4BI-DhBBb6C6CBKB3GZBxC3C3CBoDoDBDBsB-C-C3CIBxBuzcuzcBBB4BIB9KTB5FHB+GTB9BCBLFB5BHBnCHBNFB1DKBfCBvCMMBCBiB4B4BBHBPBBLBBoDXBdJBHBBHBBHIBIII9BDB-DBBLFBl9KLBYDByBjoIBvLBBrDlBBILBGEBbGGCGDrUfBrBFB0BUUFDBGoEoEBCC-FCBHBBHBBHBBECBIIIBIBGBBNbbUDDQBBPhBB8DEBEDBuBCB5COOBBBCuBBvBhEBeCByBOBdDBlBIBfEBsBEBfmBmBBCBPpBB-EBBLFBlBDBlBDBpBHB1BKBNQQIDDMQQIDDBBB1BLB4JIBXJBJXBHrBrBKkCBHBBCtBtBDCBCBBYpCpCBGBKvBBUDDBDBiBCBcEBclBB5BDBVBBzBDDBDBJEEeBBEDBLGBKGBhCfBoBDBNIB3BCBeBBcEBbGBFLBIvCBqC2BB0BMB0BGBvBHBLFBnBCBeHBDvGBgBrBrBEBBDPBHHBKgBBvBHBrBVBblBBdTBYIBvCDBlBIBlCJBCBBaGBLFB2BTTBGBoBIBhDVVBJBTwBwBB8BBICCFQQMFB8BEBLFBFJJBDDBXXIDDGLLBDDBEEBCCBEBCEBIBBICBGKBLCCBCCnBLLCBBCFFLDDBGBDcB9CGGBcBpCHBLlFB3BBBnBhBBmCKBLFBOSB7BFBLFBVbBcBBQDBY4FB9BjDB0CLBJBBCBBJDDfDDBNNBHBLlCBJBBvBBBMaBpCHB0CMBqCGBL1CBJ3CBjBNBLFBKuBuBPJBeCBhBBBXPPBnCBIDDtBCBCDDKHBLFBHDDmBDDHGBLFBtBDBL1HBaGBSqBqBBBBe0CBCOBzBMB8clDBwDGGBJBlGryCBkDMB3iBJB88DEBoS41GB7Bl2BB6RGBgBLLBCByCLLBEBfBBHJBnCJBLIIWEBUvNB7BlGB8CEBaBBarBBsCDB6BGBS-BBGKBIIB3mHoBBhBgDB0D8vIBFIIDkJkJBNBCcBEBBCNBFHBtMjoCBsDEBOCBKGBLBBJ76DB+HCB1NFBYOBSOBvBBBYIB1D7BB3HJBoBBBjGUBnC5DBVLBVLB4CIBamEB2CoCoCDBBCBBDBBFNNCIIiCFFBJJIddFGGCCBI1K1KBlJlJB-V-VBNBGQQBuiBBgBFBH0GBISSBIIDGGBDB-BgBBCvDBuBCBPBBLDBD-JBgBQB7BEBCvOBrB1GBsBDBC-FBgBXXBGBD-GBIFFDQQmGBBRoBBtCDBLDBDwYBlCrCB+BhGBFccDCCBCCLFFCCCBEBCDBCECEDDCBBCICDCCBFFIKFCLLSEBEGGSzBBDtIBtBDBlDLBQBBQQQmBJBvF3BBeMBtBDBKGBDNBH5EB6eCBSCBOCB7GFBNDBCOBNDB5BHBLFBpBHBfBBNDBDNBKmBB5KHBPBBOCBMCB6BCCBCBRBBNDBLGB0EoDoDBjgBBh3pBfB-oEBBv0FBBypHOBvThtCB-QhvBBs6EEBrpIm8yVBCdBhD-DBxHvw-FB",!1)),Vai:()=>new p(g("gopBrJ",!0)),Vithkuqi:()=>new p(g("wrhCKCOCGCBCKCOCGCB",!0)),Wancho:()=>new p(g("g24D5BGA",!0)),Warang_Citi:()=>new p(g("glmCyCNA",!0)),Yezidi:()=>new p(g("g0jCpBCCDB",!0)),Yi:()=>new p(g("ggoBskBE2B",!0)),Zanabazar_Square:()=>new p(g("gwmCnC",!0))})),k(en,"FOLD_CATEGORIES",new Si({L:()=>new p(g("laA",!0)),LC:()=>new p(g("laA",!0)),Ll:()=>new p(g("hCZBmDWBCGBiBuBCEECDOCDuBCBECEBBCCCBCCBBBDDBCBBCCBEBBCBBCECBCCDCCBCCBBBCCCBEEIBBCBBCBBCOCDQCDBBCCCBBBC4BCIBBCBBDCCBCBCGC3HrBrBCEEJHHCCBCCCBCCBPBCIBkBJJCUCGDDCBBDyBBxBgBCK2BCBMCD+CCDlBBq6ClBBCGGzW1CB0kCHHBpBBDCBhK0ECKgDCKHBJFBLHBJHBJFBMGCJHBZHBJHBJHBJEBMEBMDBNEBMEBqJEEBHHxC9zC9zCBuBBxBCCBBBDGCBCBCDDJCBCgDCJCCFuqeuqeCqBCUaCoEMCE8BCLECBICFCCDCCEUCBDBCEBCOCBCBCCCBQCZs5Vs5VBYBmmBnBBpEjBB9EKBCOBCGBCBBr3ByBB+EVB75CfBhsVfBhCYBoyehBB",!1)),Lt:()=>new p(g("kOCCBCCBCClBCCtsHHBJHBJHBMQQwBAB",!1)),Lu:()=>new p(g("hDZB7BqBqBBWBCHBCuBCEECDOCDsBCDECBBBDCCDEEGDDECBDDDCCCDFFDEECDDECCGBBCBBCBBCOCBSCDBBCEECkBCEQCJDDBCCFICBEBCBBCCCBEEBCCBCBCEBDCCBDDIDDCBBEFBGLLBnFnFsBCCEEEBBBvBDBCdBCBBECBCWCBDBCGD1BvBBCgBCK0BCDMCBgDCyBlBBq6CqBBDCB5XFBjkCIBCvHvHERRzD0ECGGGC8CCBHBJFBLHBJHBJFBMGCJHBJNBzBBBNSSBPPBEEpL2B2Bs1CvBBCEEBGCHDDLiDCJCCFNNBkBBCGG0oesBCUaCoEMCE8BCLCCDICFFFCBBDSCMOCFCCDOCb9a9advCBi8UZBumBnBBpEjBB8EKBCOBCGBCBBk4ByBB+DVB75CfBhsVfB8BYBvyehBB",!1)),M:()=>new p(g("5cgBgBlgHAB",!1)),Mn:()=>new p(g("5cgBgBlgHAB",!1)),Emoji:()=>new p(g("8mJA",!0)),Extended_Pictographic:()=>new p(g("8mJA",!0)),Lowercase:()=>new p(g("hCZBmDWBCGBiBuBCEECDOCDuBCBECEBBCCCBCCBBBDDBCBBCCBEBBCBBCECBCCDCCBCCBBBCCCBEEIBBCBBCBBCOCDQCDBBCCCBBBC4BCIBBCBBDCCBCBCGCiJCCEJJHCCBBBCCCBCCBPBCIBkBJJCUCGDDCBBDyBBxBgBCK2BCBMCD+CCDlBBq6ClBBCGGzW1CB0kCHHBpBBDCBhK0ECKgDCKHBJFBLHBJHBJFBMGCJHBZHBJHBJHBJEBMEBMDBNEBMEBqJEEBHHuBPBUzZzZBYBx5BvBBxBCCBBBDGCBCBCDDJCBCgDCJCCFuqeuqeCqBCUaCoEMCE8BCLECBICFCCDCCEUCBDBCEBCOCBCBCCCBQCZs5Vs5VBYBmmBnBBpEjBB9EKBCOBCGBCBBr3ByBB+EVB75CfBhsVfBhCYBoyehBB",!1)),Math:()=>new p(g("ycGDCHHFMMDDDCHHFAB",!1)),Uppercase:()=>new p(g("hDZB7BqBqBBWBCHBCuBCEECDOCDsBCDECBBBDCCDEEGDDECBDDDCCCDFFDEECDDECCGBBCBBCBBCOCBSCDBBCEECkBCEQCJDDBCCFICBEBCBBCCCBEEBCCBCBCEBDCCBDDIDDCBBEFBGLLBnFnFsBCCEEEBBBvBDBCdBCBBECBCWCBDBCGD1BvBBCgBCK0BCDMCBgDCyBlBBq6CqBBDCB5XFBjkCIBCvHvHERRzD0ECGGGC8CCBHBJFBLHBJHBJFBMGCJHBJNBzBBBNSSBPPBEEpLiBiBBOBFsasaBYBn6BvBBCEEBGCHDDLiDCJCCFNNBkBBCGG0oesBCUaCoEMCE8BCLCCDICFFFCBBDSCMOCFCCDOCb9a9advCBi8UZBumBnBBpEjBB8EKBCOBCGBCBBk4ByBB+DVB75CfBhsVfB8BYBvyehBB",!1))})),k(en,"FOLD_SCRIPT",new Si({Common:()=>new p(g("8cgBgB",!1)),Greek:()=>new p(g("1FwUwU",!1)),Inherited:()=>new p(g("5cgBgBlgHAB",!1))})),en),Be,J=(Be=class{static isUnsearchable(e){return e===Be.RUNE_ERROR||e>=Be.MIN_HIGH_SURROGATE&&e<=Be.MAX_LOW_SURROGATE}static is32(e,t){let r=0,s=e.length;for(;r<s;){let i=r+Math.floor((s-r)/2),a=e.getLo(i),u=e.getHi(i);if(a<=t&&t<=u){let c=e.getStride(i);return(t-a)%c===0}t<a?s=i:r=i+1}return!1}static is(e,t){if(t<=Be.MAX_LATIN1){for(let r=0;r<e.length;r++){if(t>e.getHi(r))continue;let s=e.getLo(r);if(t<s)return!1;let i=e.getStride(r);return(t-s)%i===0}return!1}return e.length>0&&t>=e.getLo(0)&&Be.is32(e,t)}static isPrint(e){return e<=Be.MAX_LATIN1?e>=32&&e<Be.MAX_ASCII||e>=161&&e!==173:Be.is(it.Print,e)}static simpleFold(e){if(it.CASE_ORBIT.has(e))return it.CASE_ORBIT.get(e);if(e<=Be.MAX_ASCII){let t=x.toLowerCase(e);return t!==e?t:x.toUpperCase(e)}return e}static equalsIgnoreCase(e,t){if(e===t)return!0;if(e<0||t<0)return!1;if(e<=Be.MAX_ASCII&&t<=Be.MAX_ASCII)return 65<=e&&e<=90&&(e|=32),65<=t&&t<=90&&(t|=32),e===t;for(let r=Be.simpleFold(e);r!==e;r=Be.simpleFold(r))if(r===t)return!0;return!1}},k(Be,"MAX_RUNE",1114111),k(Be,"RUNE_ERROR",65533),k(Be,"MAX_ASCII",127),k(Be,"MAX_LATIN1",255),k(Be,"MAX_BMP",65535),k(Be,"MIN_FOLD",65),k(Be,"MAX_FOLD",125251),k(Be,"MIN_HIGH_SURROGATE",55296),k(Be,"MAX_HIGH_SURROGATE",56319),k(Be,"MIN_LOW_SURROGATE",56320),k(Be,"MAX_LOW_SURROGATE",57343),k(Be,"MIN_SUPPLEMENTARY_CODE_POINT",65536),Be),qa=256,ff=new Uint8Array(qa);for(let n=0;n<qa;n++)ff[n]=97<=n&&n<=122||65<=n&&n<=90||48<=n&&n<=57||n===95?1:0;var xa=null,La=null,_e,q=(_e=class{static emptyInts(){return[]}static isByteArray(e){return Array.isArray(e)||Object.prototype.toString.call(e)==="[object Uint8Array]"}static isalnum(e){return x.CODES[0]<=e&&e<=x.CODES[9]||x.CODES.a<=e&&e<=x.CODES.z||x.CODES.A<=e&&e<=x.CODES.Z}static unhex(e){return x.CODES[0]<=e&&e<=x.CODES[9]?e-x.CODES[0]:x.CODES.a<=e&&e<=x.CODES.f?e-x.CODES.a+10:x.CODES.A<=e&&e<=x.CODES.F?e-x.CODES.A+10:-1}static escapeRune(e){let t="";if(J.isPrint(e))_e.METACHARACTERS.indexOf(String.fromCodePoint(e))>=0&&(t+="\\"),t+=String.fromCodePoint(e);else switch(e){case x.CODES['"']:t+='\\"';break;case x.CODES["\\"]:t+="\\\\";break;case x.CODES["	"]:t+="\\t";break;case x.CODES[`
`]:t+="\\n";break;case x.CODES["\r"]:t+="\\r";break;case x.CODES["\b"]:t+="\\b";break;case x.CODES["\f"]:t+="\\f";break;default:{let r=e.toString(16);e<256?(t+="\\x",r.length===1&&(t+="0"),t+=r):t+=`\\x{${r}}`;break}}return t}static stringToRunes(e){let t=String(e),r=[],s=0;for(;s<t.length;){let i=t.codePointAt(s);r.push(i),s+=i>J.MAX_BMP?2:1}return new Int32Array(r)}static runeToString(e){return String.fromCodePoint(e)}static isWordRune(e){return e<qa?ff[e]===1:!1}static emptyOpContext(e,t){let r=0;return e<0&&(r|=_e.EMPTY_BEGIN_TEXT|_e.EMPTY_BEGIN_LINE),e===10&&(r|=_e.EMPTY_BEGIN_LINE),t<0&&(r|=_e.EMPTY_END_TEXT|_e.EMPTY_END_LINE),t===10&&(r|=_e.EMPTY_END_LINE),_e.isWordRune(e)!==_e.isWordRune(t)?r|=_e.EMPTY_WORD_BOUNDARY:r|=_e.EMPTY_NO_WORD_BOUNDARY,r}static quoteMeta(e){return e.split("").map(t=>_e.METACHARACTERS.indexOf(t)>=0?`\\${t}`:t).join("")}static charCount(e){return e>J.MAX_BMP?2:1}static toArray(e){let t=e.length,r=new Array(t);for(let s=0;s<t;s++)r[s]=e[s];return r}static stringToUtf8ByteArray(e){if(globalThis.TextEncoder)return xa||(xa=new TextEncoder),xa.encode(e);{let t=[],r=0;for(let s=0;s<e.length;s++){let i=e.charCodeAt(s);i<128?t[r++]=i:i<2048?(t[r++]=i>>6|192,t[r++]=i&63|128):(i&64512)===J.MIN_HIGH_SURROGATE&&s+1<e.length&&(e.charCodeAt(s+1)&64512)===J.MIN_LOW_SURROGATE?(i=J.MIN_SUPPLEMENTARY_CODE_POINT+((i&1023)<<10)+(e.charCodeAt(++s)&1023),t[r++]=i>>18|240,t[r++]=i>>12&63|128,t[r++]=i>>6&63|128,t[r++]=i&63|128):(t[r++]=i>>12|224,t[r++]=i>>6&63|128,t[r++]=i&63|128)}return t}}static utf8ByteArrayToString(e){if(globalThis.TextDecoder){La||(La=new TextDecoder("utf-8"));let t=e instanceof Uint8Array?e:new Uint8Array(e);return La.decode(t)}else{let t=[],r=0,s=0;for(;r<e.length;){let i=e[r++];if(i<128)t[s++]=String.fromCharCode(i);else if(i>191&&i<224){let a=e[r++];t[s++]=String.fromCharCode((i&31)<<6|a&63)}else if(i>239&&i<365){let a=e[r++],u=e[r++],c=e[r++],l=((i&7)<<18|(a&63)<<12|(u&63)<<6|c&63)-J.MIN_SUPPLEMENTARY_CODE_POINT;t[s++]=String.fromCharCode(J.MIN_HIGH_SURROGATE+(l>>10)),t[s++]=String.fromCharCode(J.MIN_LOW_SURROGATE+(l&1023))}else{let a=e[r++],u=e[r++];t[s++]=String.fromCharCode((i&15)<<12|(a&63)<<6|u&63)}}return t.join("")}}},k(_e,"METACHARACTERS","\\.+*?()|[]{}^$"),k(_e,"EMPTY_BEGIN_LINE",1),k(_e,"EMPTY_END_LINE",2),k(_e,"EMPTY_BEGIN_TEXT",4),k(_e,"EMPTY_END_TEXT",8),k(_e,"EMPTY_WORD_BOUNDARY",16),k(_e,"EMPTY_NO_WORD_BOUNDARY",32),k(_e,"EMPTY_ALL",-1),_e),df=(n=[],e=0)=>{let t=Object.create(null);for(let r=0;r<n.length;r++){let s=n[r],i=e+r;t[s]=i,t[i]=s}return Object.freeze(t)},tn,Pn=(tn=class{getEncoding(){throw Error("not implemented")}asCharSequence(){throw Error("not implemented")}asBytes(){throw Error("not implemented")}length(){throw Error("not implemented")}isUTF8Encoding(){return this.getEncoding()===tn.Encoding.UTF_8}isUTF16Encoding(){return this.getEncoding()===tn.Encoding.UTF_16}},k(tn,"Encoding",df(["UTF_16","UTF_8"])),tn),xh=class extends Pn{constructor(n=null){super(),this.bytes=n}getEncoding(){return Pn.Encoding.UTF_8}asCharSequence(){return q.utf8ByteArrayToString(this.bytes)}asBytes(){return this.bytes}length(){return this.bytes.length}},$g=class extends Pn{constructor(n=null){super(),this.charSequence=n}getEncoding(){return Pn.Encoding.UTF_16}asCharSequence(){return this.charSequence}asBytes(){return q.stringToUtf8ByteArray(this.charSequence.toString())}length(){return this.charSequence.length}},vn=class{static utf16(n){return new $g(n)}static utf8(n){return q.isByteArray(n)?new xh(n):new xh(q.stringToUtf8ByteArray(n))}},$e=class{static EOF(){return-8}constructor(){this.start=0,this.end=0}canCheckPrefix(){return!0}endPos(){return this.end-this.start}hasString(){return!1}hasAnyString(){return!1}prefixLength(){return 0}},Dt,Wg=(Dt=class extends $e{constructor(e,t=0,r=e.length){super(),this.bytes=e,this.start=t,this.end=r}hasString(e,t){let r=e.bytes;if(r.length===0)return!0;let s=this.indexOf(this.bytes,r,this.start+t);return s!==-1&&s<=this.end-r.length}hasAnyString(e,t){return e.automaton8().searchUTF8(this.bytes,this.start+t,this.end)}step(e){if(e+=this.start,e>=this.end)return $e.EOF();let t=this.bytes[e]&255;if(t<128)return t<<3|1;let r,s,i=128,a=191;if(t>=194&&t<=223)r=2,s=t&31;else if(t>=224&&t<=239)r=3,s=t&15,t===224?i=160:t===237&&(a=159);else if(t>=240&&t<=244)r=4,s=t&7,t===240?i=144:t===244&&(a=143);else return Dt.RUNE_ERROR_STEP;if(e+r>this.end)return Dt.RUNE_ERROR_STEP;let u=this.bytes[e+1]&255;if(u<i||u>a)return Dt.RUNE_ERROR_STEP;if(s=s<<6|u&63,r>2){let c=this.bytes[e+2]&255;if((c&192)!==128)return Dt.RUNE_ERROR_STEP;if(s=s<<6|c&63,r>3){let l=this.bytes[e+3]&255;if((l&192)!==128)return Dt.RUNE_ERROR_STEP;s=s<<6|l&63}}return s<<3|r}index(e,t){t+=this.start;let r=this.indexOf(this.bytes,e.prefixUTF8,t);return r<0?r:r-t}context(e){e+=this.start;let t=-1;if(e>this.start&&e<=this.end){let s=e-1;if(t=this.bytes[s--],t>=128){let i=e-4;for(i<this.start&&(i=this.start);s>=i&&(this.bytes[s]&192)===128;)s--;s<this.start&&(s=this.start);let a=this.step(s-this.start);t=s+(a&7)===e?a>>3:J.RUNE_ERROR}}let r=e<this.end?this.step(e-this.start)>>3:-1;return q.emptyOpContext(t,r)}indexOf(e,t,r=0){let s=t.length;if(s===0)return r<=this.end?r:-1;let i=t[0],a=this.end-s,u=typeof e.indexOf=="function",c=r;for(;c<=a;){if(u){if(c=e.indexOf(i,c),c===-1||c>a)return-1}else{for(;c<=a&&e[c]!==i;)c++;if(c>a)return-1}let l=!0;for(let f=1;f<s;f++)if(e[c+f]!==t[f]){l=!1;break}if(l)return c;c++}return-1}prefixLength(e){return e.prefixUTF8.length}},k(Dt,"RUNE_ERROR_STEP",J.RUNE_ERROR<<3|1),Dt),Yg=class extends $e{constructor(n,e=0,t=n.length){super(),this.charSequence=n,this.start=e,this.end=t}hasString(n,e){let t=this.charSequence.indexOf(n.str,this.start+e);return t!==-1&&t<=this.end-n.str.length}hasAnyString(n,e){return n.automaton16().searchUTF16(this.charSequence,this.start+e,this.end)}step(n){if(n+=this.start,n>=this.end)return $e.EOF();let e=this.charSequence.charCodeAt(n);if(e<J.MIN_HIGH_SURROGATE||e>J.MAX_HIGH_SURROGATE||n+1>=this.end)return e<<3|1;let t=this.charSequence.charCodeAt(n+1);return t>=J.MIN_LOW_SURROGATE&&t<=J.MAX_LOW_SURROGATE?(e-J.MIN_HIGH_SURROGATE)*1024+(t-J.MIN_LOW_SURROGATE)+J.MIN_SUPPLEMENTARY_CODE_POINT<<3|2:e<<3|1}index(n,e){e+=this.start;let t=this.charSequence.indexOf(n.prefix,e);return t<0||t>this.end-n.prefix.length?-1:t-e}context(n){n+=this.start;let e=n>this.start&&n<=this.end?this.charSequence.charCodeAt(n-1):-1,t=n<this.end?this.charSequence.charCodeAt(n):-1;return q.emptyOpContext(e,t)}prefixLength(n){return n.prefix.length}},de=class{static fromUTF8(n,e=0,t=n.length){return new Wg(n,e,t)}static fromUTF16(n,e=0,t=n.length){return new Yg(n,e,t)}},fs=class extends Error{constructor(n){super(n),this.name="RE2JSException"}},pe=class extends fs{constructor(n,e=null){let t=`error parsing regexp: ${n}`;e&&(t+=`: \`${e}\``),super(t),this.name="RE2JSSyntaxException",this.message=t,this.error=n,this.input=e}getDescription(){return this.error}getPattern(){return this.input}},ls=class extends fs{constructor(n){super(n),this.name="RE2JSCompileException"}},et=class extends fs{constructor(n){super(n),this.name="RE2JSGroupException"}},Xg=class extends fs{constructor(n){super(n),this.name="RE2JSFlagsException"}},xi=class extends fs{constructor(n){super(n),this.name="RE2JSInternalException"}},On,Lh=(On=class{static quoteReplacement(e,t=!1){return t?e.indexOf("\\")<0&&e.indexOf("$")<0?e:e.split("").map(r=>{let s=r.codePointAt(0);return s===x.CODES["\\"]||s===x.CODES.$?`\\${r}`:r}).join(""):e.indexOf("$")<0?e:e.split("").map(r=>r.codePointAt(0)===x.CODES.$?"$$":r).join("")}constructor(e,t){if(e===null)throw new Error("pattern is null");this.patternInput=e;let r=this.patternInput.re2();this.patternGroupCount=r.numberOfCapturingGroups(),this.groups=[],this.namedGroups=r.namedGroups,this.hasNamedGroups=Object.keys(this.namedGroups).length>0,this.numberOfInstructions=r.numberOfInstructions(),this.lookbehindState=null,t instanceof Pn?this.resetMatcherInput(t):q.isByteArray(t)?this.resetMatcherInput(vn.utf8(t)):this.resetMatcherInput(vn.utf16(t))}pattern(){return this.patternInput}reset(){return this.matcherInputLength=this.matcherInput.length(),this.appendPos=0,this.hasMatch=!1,this.hasGroups=!1,this.anchorFlag=0,this}resetMatcherInput(e){if(e===null)throw new Error("input is null");return e instanceof Pn||(q.isByteArray(e)?e=vn.utf8(e):e=vn.utf16(e)),this.matcherInput=e,this.lookbehindState!==null?this.lookbehindState.reset():this.lookbehindState=this.patternInput.re2().createLookbehindState(),this.reset(),this}start(e=0){if(typeof e=="string"){let t=this.namedGroups[e];if(!Number.isFinite(t))throw new et(`group '${e}' not found`);e=t}return this.loadGroup(e),this.groups[2*e]}end(e=0){if(typeof e=="string"){let t=this.namedGroups[e];if(!Number.isFinite(t))throw new et(`group '${e}' not found`);e=t}return this.loadGroup(e),this.groups[2*e+1]}programSize(){return this.numberOfInstructions}group(e=0){if(typeof e=="string"){let s=this.namedGroups[e];if(!Number.isFinite(s))throw new et(`group '${e}' not found`);e=s}let t=this.start(e),r=this.end(e);return t<0&&r<0?null:this.substring(t,r)}getNamedGroups(){if(!this.hasMatch)throw new et("perhaps no match attempted");let e=Object.create(null);for(let t of Object.keys(this.namedGroups))e[t]=this.group(t);return e}groupCount(){return this.patternGroupCount}loadGroup(e){if(!Number.isInteger(e)||e<0||e>this.patternGroupCount)throw new et(`Group index out of bounds: ${e}`);if(!this.hasMatch)throw new et("perhaps no match attempted");if(e===0||this.hasGroups)return;let t=this.matcherInputLength,r=this.patternInput.re2().matchMachineInput(this.matcherInput,this.groups[0],t,this.anchorFlag,1+this.patternGroupCount,this.lookbehindState);if(!r[0])throw new et("inconsistency in matching group data");this.groups=r[1],this.hasGroups=!0}matches(){return this.genMatch(0,F.ANCHOR_BOTH)}lookingAt(){return this.genMatch(0,F.ANCHOR_START)}find(e=null){if(e!==null){if(!Number.isInteger(e)||e<0||e>this.matcherInputLength)throw new et(`start index out of bounds: ${e}`);return this.reset(),this.genMatch(e,0)}if(e=0,this.hasMatch&&(e=this.groups[1],this.groups[0]===this.groups[1])){let t=(this.matcherInput.isUTF16Encoding()?de.fromUTF16(this.matcherInput.asCharSequence(),0,this.matcherInputLength):de.fromUTF8(this.matcherInput.asBytes(),0,this.matcherInputLength)).step(e);t<0?e++:e+=t&7}return this.genMatch(e,F.UNANCHORED)}genMatch(e,t){let r=this.patternInput.re2().matchMachineInput(this.matcherInput,e,this.matcherInputLength,t,1,this.lookbehindState);return r[0]?(this.groups=r[1],this.hasMatch=!0,this.hasGroups=this.patternGroupCount===0,this.anchorFlag=t,!0):(this.hasMatch=!1,!1)}substring(e,t){return this.matcherInput.isUTF8Encoding()?q.utf8ByteArrayToString(this.matcherInput.asBytes().slice(e,t)):this.matcherInput.asCharSequence().substring(e,t).toString()}inputLength(){return this.matcherInputLength}appendReplacement(e,t=!1){let r="",s=this.start(),i=this.end();return this.appendPos<s&&(r+=this.substring(this.appendPos,s)),this.appendPos=i,r+=t?this.appendReplacementInternalJava(e):this.appendReplacementInternalJs(e),r}appendReplacementInternalJava(e){let t="",r=0,s=e.length,i=0;for(;i<s;){let a=e.codePointAt(i);if(a===x.CODES["\\"]){if(r<i&&(t+=e.substring(r,i)),i++,i>=s)throw new et("character to be escaped is missing");r=i,i++;continue}if(a===x.CODES.$){if(r<i&&(t+=e.substring(r,i)),i+1>=s)throw new et("Illegal group reference: group index is missing");let u=e.codePointAt(i+1);if(x.CODES[0]<=u&&u<=x.CODES[9]){let c=u-x.CODES[0],l=i+2;for(;l<s;l++){let d=e.codePointAt(l);if(d<x.CODES[0]||d>x.CODES[9]||c*10+d-x.CODES[0]>this.patternGroupCount)break;c=c*10+d-x.CODES[0]}if(c>this.patternGroupCount)throw new et(`n > number of groups: ${c}`);let f=this.group(c);f!==null&&(t+=f),i=l,r=i}else if(u===x.CODES["{"]){let c=i+2;for(;c<s&&e.codePointAt(c)!==x.CODES["}"];)c++;if(c>=s)throw new et("named capture group is missing trailing '}'");let l=e.substring(i+2,c),f=this.group(l);f!==null&&(t+=f),i=c+1,r=i}else throw new et("Illegal group reference");continue}i++}return r<s&&(t+=e.substring(r,s)),t}appendReplacementInternalJs(e){let t=a=>a>=48&&a<=57,r=this.patternGroupCount,s="",i=0;for(;i<e.length;){let a=e.indexOf("$",i);if(a<0)break;s+=e.substring(i,a),i=a;let u=e.charCodeAt(i+1);if(u===x.CODES.$)s+="$",i+=2;else if(u===x.CODES["&"])s+=this.group(0),i+=2;else if(u===x.CODES["`"])s+=this.substring(0,this.start(0)),i+=2;else if(u===x.CODES["'"])s+=this.substring(this.end(0),this.matcherInputLength),i+=2;else if(t(u)){let c=1,l=u-48,f=e.charCodeAt(i+2);if(t(f)&&l*10+f-48<=r&&(c=2,l=l*10+f-48),l>=1&&l<=r){let d=this.group(l);d!==null&&(s+=d)}else s+=e.substring(i,i+1+c);i+=1+c}else if(u===x.CODES["<"]&&this.hasNamedGroups){let c=e.indexOf(">",i+2);if(c<0)s+="$<",i+=2;else{let l=e.substring(i+2,c);if(Object.prototype.hasOwnProperty.call(this.namedGroups,l)){let f=this.group(l);f!==null&&(s+=f)}i=c+1}}else s+="$",i+=1}return s+e.substring(i)}appendTail(){return this.substring(this.appendPos,this.matcherInputLength)}replaceAll(e,t=!1){return this.replace(e,!0,t)}replaceFirst(e,t=!1){return this.replace(e,!1,t)}replace(e,t=!0,r=!1){let s="";this.reset();let i=typeof e=="function",a=null;if(i){if(this.groupCount()>=On.MAX_REPLACER_ARGS)throw new et("Too many capture groups to safely invoke replacer function");a=this.matcherInput.isUTF8Encoding()?this.matcherInput.asBytes():this.matcherInput.asCharSequence()}for(;this.find()&&(s+=i?this.appendReplacementFunc(e,a):this.appendReplacement(e,r),!!t););return s+=this.appendTail(),s}appendReplacementFunc(e,t){let r="",s=this.start(),i=this.end();this.appendPos<s&&(r+=this.substring(this.appendPos,s)),this.appendPos=i;let a=this.matchArray();return a.push(s,t),this.hasNamedGroups&&a.push(this.namedGroupsObject()),r+=String(e(...a)),r}matchArray(){let e=[this.group(0)];for(let t=1;t<=this.patternGroupCount;t++){let r=this.group(t);e.push(r===null?void 0:r)}return e}namedGroupsObject(){if(!this.hasNamedGroups)return;let e=this.getNamedGroups();for(let t in e)e[t]===null&&(e[t]=void 0);return e}},k(On,"MAX_REPLACER_ARGS",65535),On),oe,N=(oe=class{static isRuneOp(e){return oe.RUNE<=e&&e<=oe.RUNE_ANY_NOT_NL}static escapeRunes(e){let t='"';for(let r of e)t+=q.escapeRune(r);return t+='"',t}constructor(e){this.op=e,this.out=0,this.arg=0,this.runes=new Int32Array(0),this.next=null}matchRune(e){if(this.runes.length===1){let a=this.runes[0];return this.arg&F.FOLD_CASE?J.equalsIgnoreCase(a,e):e===a}let t=this.runes.length;if(t===0)return!1;if(t===2||t===4||t===6||t===8){for(let a=0;a<t;a+=2){if(e<this.runes[a])return!1;if(e<=this.runes[a+1])return!0}return!1}let r=0,s=t>>1;for(;s>1;){let a=s>>1;r+=this.runes[r+a<<1]<=e?a:0,s-=a}r+=this.runes[r<<1]<=e?1:0;let i=r-1;return i>=0&&e<=this.runes[i<<1|1]}matchRunePos(e){if(this.runes.length===1){let a=this.runes[0];return this.arg&F.FOLD_CASE?J.equalsIgnoreCase(a,e)?0:-1:e===a?0:-1}let t=this.runes.length;if(t===0)return-1;if(t===2||t===4||t===6||t===8){for(let a=0;a<t;a+=2){if(e<this.runes[a])return-1;if(e<=this.runes[a+1])return Math.floor(a/2)}return-1}let r=0,s=t>>1;for(;s>1;){let a=s>>1;r+=this.runes[r+a<<1]<=e?a:0,s-=a}r+=this.runes[r<<1]<=e?1:0;let i=r-1;return i>=0&&e<=this.runes[i<<1|1]?i:-1}toString(){switch(this.op){case oe.ALT:return`alt -> ${this.out}, ${this.arg}`;case oe.ALT_MATCH:return`altmatch -> ${this.out}, ${this.arg}`;case oe.CAPTURE:return`cap ${this.arg} -> ${this.out}`;case oe.EMPTY_WIDTH:return`empty ${this.arg} -> ${this.out}`;case oe.MATCH:return`match${this.arg!==0?` ${this.arg}`:""}`;case oe.FAIL:return"fail";case oe.NOP:return`nop -> ${this.out}`;case oe.LB_WRITE:return`lbwrite ${this.arg} -> ${this.out}`;case oe.LB_CHECK:return`lbcheck ${this.arg} -> ${this.out}`;case oe.RUNE:return this.runes===null?"rune <null>":["rune ",oe.escapeRunes(this.runes),this.arg&F.FOLD_CASE?"/i":""," -> ",this.out].join("");case oe.RUNE1:return`rune1 ${oe.escapeRunes(this.runes)} -> ${this.out}`;case oe.RUNE_ANY:return`any -> ${this.out}`;case oe.RUNE_ANY_NOT_NL:return`anynotnl -> ${this.out}`;default:throw new Error("unhandled case in Inst.toString")}}},k(oe,"ALT",1),k(oe,"ALT_MATCH",2),k(oe,"CAPTURE",3),k(oe,"EMPTY_WIDTH",4),k(oe,"FAIL",5),k(oe,"MATCH",6),k(oe,"NOP",7),k(oe,"RUNE",8),k(oe,"RUNE1",9),k(oe,"RUNE_ANY",10),k(oe,"RUNE_ANY_NOT_NL",11),k(oe,"LB_WRITE",12),k(oe,"LB_CHECK",13),oe),Nn,kh=(Nn=class{constructor(e){this.sparse=new Int32Array(e),this.densePcs=new Int32Array(e),this.denseCaps=null,this.size=0,this.ncap=0,this.mainThreads=0}init(e){this.ncap=e;let t=Math.min(this.densePcs.length,Nn.INITIAL_THREADS)*e;(!this.denseCaps||this.denseCaps.length<t)&&(this.denseCaps=new Int32Array(t))}growCaps(e){let t=this.densePcs.length*this.ncap,r=new Int32Array(Math.min(t,Math.max(e,2*this.denseCaps.length)));r.set(this.denseCaps),this.denseCaps=r}contains(e){let t=this.sparse[e];return t<this.size&&this.densePcs[t]===e}isEmpty(){return this.size===0}add(e){let t=this.size++;return this.sparse[e]=t,this.densePcs[t]=e,t}clear(){this.size=0,this.mainThreads=0}toString(){let e="{";for(let t=0;t<this.size;t++)t!==0&&(e+=", "),e+=this.densePcs[t];return e+="}",e}},k(Nn,"INITIAL_THREADS",32),Nn),Zg=class{constructor(n){this.pos=-1,this.pcs=new Int32Array(n.numInst()),this.size=0,this.lbTable=new Int32Array(n.numLb+1)}reset(){this.pos=-1,this.size=0}},Cf=class pf{static fromRE2(e){let t=new pf;return t.prog=e.prog,t.re2=e,t.q0=new kh(t.prog.numInst()),t.q1=new kh(t.prog.numInst()),t.addStack=new Int32Array(2*(t.prog.numInst()+1)),t.matched=!1,t.matchcap=new Int32Array(t.prog.numCap<2?2:t.prog.numCap),t.ncap=0,t}constructor(){this.prog=null,this.re2=null,this.q0=null,this.q1=null,this.addStack=null,this.matched=!1,this.matchcap=null,this.ncap=0,this.lbTable=null}init(e){this.ncap=e,e>this.matchcap.length?this.matchcap=new Int32Array(e).fill(-1):this.matchcap.fill(-1),this.q0.init(e),this.q1.init(e),this.prog.numLb>0&&((!this.lbTable||this.lbTable.length<this.prog.numLb+1)&&(this.lbTable=new Int32Array(this.prog.numLb+1)),this.lbTable.fill(-1))}submatches(){return this.ncap===0?q.emptyInts():q.toArray(this.matchcap.subarray(0,this.ncap))}match(e,t,r,s=null){let i=this.re2.cond;if(i===q.EMPTY_ALL||(r===F.ANCHOR_START||r===F.ANCHOR_BOTH)&&t!==0)return!1;this.matched=!1,this.matchcap.fill(-1);let a=this.prog.numLb>0,u=t,c=t,l=!1;a&&(s!==null&&s.pos>=0&&s.pos<=t?(c=s.pos,l=!0):c=0);let f=a&&s!==null,d=this.q0,y=this.q1,R=e.step(c),v=R>>3,L=R&7,j=-1,z=0;R!==$e.EOF()&&(R=e.step(c+L),j=R>>3,z=R&7);let W;for(c===0?W=q.emptyOpContext(-1,v):W=e.context(c),a&&(l?this.restoreLookbehinds(s,d,W):this.spawnLookbehinds(d,c,W));;){if(d.mainThreads===0){if(i&q.EMPTY_BEGIN_TEXT&&c!==0||(r===F.ANCHOR_START||r===F.ANCHOR_BOTH)&&c!==0||this.matched)break;if(this.prog.numLb===0&&d.isEmpty()&&this.re2.prefix.length!==0&&j!==this.re2.prefixRune&&e.canCheckPrefix()){let Xe=e.index(this.re2,c);if(Xe<0)break;c+=Xe,R=e.step(c),v=R>>3,L=R&7,R=e.step(c+L),j=R>>3,z=R&7,W=e.context(c)}}c>=u&&(f&&(this.saveLookbehinds(s,d,c),f=!1),!this.matched&&(c===0||r===F.UNANCHORED)&&(this.ncap>0&&(this.matchcap[0]=c),this.add(d,this.prog.start,c,this.matchcap,0,W)));let he=c+L;if(W=e.context(he),this.step(d,y,c,he,v,W,r,c===e.endPos()),L===0||this.ncap===0&&this.matched)break;c+=L,v=j,L=z,v!==-1&&(R=e.step(c+L),j=R>>3,z=R&7);let be=d;d=y,y=be}return d.clear(),y.clear(),this.matched}matchSet(e,t,r){let s=this.re2.cond;if(s===q.EMPTY_ALL)return[];if((r===F.ANCHOR_START||r===F.ANCHOR_BOTH)&&t!==0)return[];let i=this.prog.numLb>0?0:t,a=t,u=this.q0,c=this.q1,l=e.step(i),f=l>>3,d=l&7,y=-1,R=0;l!==$e.EOF()&&(l=e.step(i+d),y=l>>3,R=l&7);let v=i===0?q.emptyOpContext(-1,f):e.context(i),L=new Set;for(this.prog.numLb>0&&this.spawnLookbehinds(u,i,v);!(u.mainThreads===0&&(s&q.EMPTY_BEGIN_TEXT&&i!==0||(r===F.ANCHOR_START||r===F.ANCHOR_BOTH)&&i!==0));){(i===0||r===F.UNANCHORED)&&i>=a&&this.add(u,this.prog.start,i,this.matchcap,0,v);let j=i+d;v=e.context(j);for(let W=0;W<u.size;W++){let he=u.densePcs[W],be=this.prog.inst[he],Xe=W*this.ncap,Re=!1;switch(be.op){case N.MATCH:if(r===F.ANCHOR_BOTH&&i!==e.endPos())break;L.add(be.arg);break;case N.RUNE:Re=be.matchRune(f);break;case N.RUNE1:Re=f===be.runes[0];break;case N.RUNE_ANY:Re=!0;break;case N.RUNE_ANY_NOT_NL:Re=f!==10;break;default:continue}Re&&this.add(c,be.out,j,u.denseCaps,Xe,v)}if(u.clear(),d===0)break;i+=d,f=y,d=R,f!==-1&&(l=e.step(i+d),y=l>>3,R=l&7);let z=u;u=c,c=z}return c.clear(),Array.from(L).sort((j,z)=>j-z)}step(e,t,r,s,i,a,u,c){let l=this.re2.longest;for(let f=0;f<e.size;f++){let d=e.densePcs[f],y=f*this.ncap;if(l&&this.matched&&this.ncap>0&&this.matchcap[0]<e.denseCaps[y])continue;let R=this.prog.inst[d],v=!1;switch(R.op){case N.MATCH:if(u===F.ANCHOR_BOTH&&!c)break;if(this.ncap>0&&(!l||!this.matched||this.matchcap[1]<r)){e.denseCaps[y+1]=r;for(let L=0;L<this.ncap;L++)this.matchcap[L]=e.denseCaps[y+L]}l||(e.size=0),this.matched=!0;break;case N.RUNE:v=R.matchRune(i);break;case N.RUNE1:v=i===R.runes[0];break;case N.RUNE_ANY:v=!0;break;case N.RUNE_ANY_NOT_NL:v=i!==10;break;default:continue}v&&this.add(t,R.out,s,e.denseCaps,y,a)}e.clear()}spawnLookbehinds(e,t,r){for(let s=0;s<this.prog.lbStarts.length;s++)this.add(e,this.prog.lbStarts[s],t,this.matchcap,0,r)}restoreLookbehinds(e,t,r){this.lbTable.set(e.lbTable);for(let s=0;s<e.size;s++)this.add(t,e.pcs[s],e.pos,this.matchcap,0,r)}saveLookbehinds(e,t,r){let s=0;for(let i=0;i<t.size;i++){let a=t.densePcs[i];this.prog.lbInst[a]===1&&N.isRuneOp(this.prog.inst[a].op)&&(e.pcs[s++]=a)}e.size=s,e.pos=r,e.lbTable.set(this.lbTable)}add(e,t,r,s,i,a){let u=this.addStack,c=0;for(;;){for(;t!==0&&!e.contains(t);){let f=e.add(t),d=this.prog.inst[t];switch(d.op){case N.FAIL:t=0;break;case N.ALT:case N.ALT_MATCH:u[c++]=d.arg,u[c++]=0,t=d.out;break;case N.EMPTY_WIDTH:t=d.arg&~a?0:d.out;break;case N.NOP:t=d.out;break;case N.CAPTURE:d.arg<this.ncap&&(u[c++]=-d.arg-1,u[c++]=s[i+d.arg],s[i+d.arg]=r),t=d.out;break;case N.LB_WRITE:this.lbTable[Math.abs(d.arg)]=r,t=d.out;break;case N.LB_CHECK:d.arg>0?t=this.lbTable[d.arg]===r?d.out:0:t=this.lbTable[-d.arg]!==r?d.out:0;break;case N.MATCH:case N.RUNE:case N.RUNE1:case N.RUNE_ANY:case N.RUNE_ANY_NOT_NL:if(this.prog.lbInst[t]===0&&e.mainThreads++,this.ncap>0){let y=f*this.ncap;y+this.ncap>e.denseCaps.length&&e.growCaps(y+this.ncap);for(let R=0;R<this.ncap;R++)e.denseCaps[y+R]=s[i+R]}t=0;break;default:throw new xi("unhandled")}}if(c===0)return;c-=2;let l=u[c];l<0?(s[i-l-1]=u[c+1],t=0):t=l}}},em=(n,e,t)=>{let r=-2128831035;for(let s=0;s<n.length;s++)r^=n[s],r=Math.imul(r,16777619);r^=e,r=Math.imul(r,16777619);for(let s=0;s<t.length;s++)r^=t[s],r=Math.imul(r,16777619);return r},Vh=(n,e)=>{if(n.length!==e.length)return!1;for(let t=0;t<n.length;t++)if(n[t]!==e[t])return!1;return!0},Mh=(n,e,t,r)=>n.flag===t&&Vh(n.nfaStates,e)&&Vh(n.matchIDs,r),ka=[],cs=-1,vi=class{constructor(n,e,t){this.nfaStates=n,this.flag=e,this.isMatch=(e&ja.FLAG_MATCH)!==0,this.matchIDs=t,this.next=null,this.nextAnchored=null}},ce,ja=(ce=class{constructor(e,t=8388608){this.prog=e,this.maxMem=t,this.stateCache=new Map,this.stateCount=0,this.startStates=new Map,this.failed=!1;for(let r=0;r<e.numInst();r++){let s=e.getInst(r).op;if(s===N.LB_WRITE||s===N.LB_CHECK){this.failed=!0;break}}this.computeRuneClasses(),this.stateBudget=t,this.memBudget=t}computeRuneClasses(){let e=new Set,t=(s,i)=>{e.add(s),e.add(i+1)};for(let s=0;s<this.prog.numInst();s++){let i=this.prog.getInst(s);switch(i.op){case N.RUNE:case N.RUNE1:if(i.runes.length===1){if(t(i.runes[0],i.runes[0]),i.arg&F.FOLD_CASE)for(let a=J.simpleFold(i.runes[0]);a!==i.runes[0];a=J.simpleFold(a))t(a,a)}else for(let a=0;a<i.runes.length;a+=2)t(i.runes[a],i.runes[a+1]);break;case N.RUNE_ANY_NOT_NL:t(10,10);break;case N.EMPTY_WIDTH:i.arg&(q.EMPTY_BEGIN_LINE|q.EMPTY_END_LINE)&&t(10,10),i.arg&(q.EMPTY_WORD_BOUNDARY|q.EMPTY_NO_WORD_BOUNDARY)&&(t(48,57),t(65,90),t(95,95),t(97,122))}}e.delete(0),this.classBounds=Int32Array.from(e).sort(),this.numClasses=this.classBounds.length+1;let r=new Int32Array(J.MAX_LATIN1+1);for(let s=0;s<=J.MAX_LATIN1;s++)r[s]=this.searchClass(s);this.latin1Class=r}runeClass(e){return e<=J.MAX_LATIN1?this.latin1Class[e]:this.searchClass(e)}searchClass(e){let t=this.classBounds,r=0,s=t.length;for(;r<s;){let i=r+s>>1;t[i]<=e?r=i+1:s=i}return r}closure(e,t){let r=new Set,s=Array.from(e),i=0;for(;s.length>0;){let a=s.pop();if(a===0||r.has(a))continue;r.add(a);let u=this.prog.getInst(a);switch(u.op){case N.ALT:case N.ALT_MATCH:s.push(u.out),s.push(u.arg);break;case N.NOP:case N.CAPTURE:s.push(u.out);break;case N.EMPTY_WIDTH:i|=u.arg,u.arg&~t||s.push(u.out)}}return{pcs:Array.from(r).sort((a,u)=>a-u),needflags:i}}getState(e,t,r){let s=em(e,t,r),i=this.stateCache.get(s);if(i instanceof vi){if(Mh(i,e,t,r))return i}else if(i!==void 0){for(let c=0;c<i.length;c++)if(Mh(i[c],e,t,r))return i[c]}let a=ce.stateCost(e,r);if(this.memBudget<a)return null;this.memBudget-=a;let u=new vi(e,t,r);return i===void 0?this.stateCache.set(s,u):i instanceof vi?this.stateCache.set(s,[i,u]):i.push(u),this.stateCount++,u}static stateCost(e,t){let r=t.length===0?0:ce.ARRAY_OVERHEAD+ce.ELEMENT_SIZE*t.length;return ce.STATE_OVERHEAD+ce.ELEMENT_SIZE*e.length+r}*cachedStates(){for(let e of this.stateCache.values())e instanceof vi?yield e:yield*e}makeState(e,t,r){let s=this.closure(e,t&ce.FLAG_EMPTY_MASK),i=t;return s.needflags===0&&(i&=ce.FLAG_MATCH),i|=s.needflags<<ce.FLAG_NEED_SHIFT,this.getState(s.pcs,i,r)}allocTable(e,t){let r=this.numClasses+1,s=ce.TABLE_OVERHEAD+ce.ELEMENT_SIZE*r;if(this.memBudget<s)return null;this.memBudget-=s;let i=new Array(r).fill(null);return t===F.UNANCHORED?e.next=i:e.nextAnchored=i,i}clearCache(){this.stateCache.clear(),this.stateCount=0,this.startStates.clear(),this.memBudget=this.stateBudget}resetCache(e){return this.clearCache(),this.getState(e.nfaStates,e.flag,e.matchIDs)}step(e,t,r,s){let i=s===F.UNANCHORED?e.next:e.nextAnchored;if(i!==null){let W=i[t];if(W!==null)return W}else if(i=this.allocTable(e,s),i===null)return null;let a=e.flag>>>ce.FLAG_NEED_SHIFT,u=e.flag&ce.FLAG_EMPTY_MASK,c=u,l=0;r===10&&(c|=q.EMPTY_END_LINE,l|=q.EMPTY_BEGIN_LINE),r===cs&&(c|=q.EMPTY_END_LINE|q.EMPTY_END_TEXT);let f=(e.flag&ce.FLAG_LAST_WORD)!==0,d=r!==cs&&q.isWordRune(r);c|=d===f?q.EMPTY_NO_WORD_BOUNDARY:q.EMPTY_WORD_BOUNDARY;let y=e.nfaStates;c&~u&a&&(y=this.closure(y,c).pcs);let R=[],v=!1,L=ka;for(let W=0;W<y.length;W++){let he=this.prog.getInst(y[W]);he.op===N.MATCH?(v||(v=!0,L=[]),L.push(he.arg)):r!==cs&&N.isRuneOp(he.op)&&he.matchRune(r)&&R.push(he.out)}L.length>1&&L.sort((W,he)=>W-he),s===F.UNANCHORED&&r!==cs&&R.push(this.prog.start);let j=l;v&&(j|=ce.FLAG_MATCH),d&&(j|=ce.FLAG_LAST_WORD);let z=this.makeState(R,j,L);return z===null?null:(i[t]=z,z)}start(e,t){let r=e.context(t),s;if(r&q.EMPTY_BEGIN_TEXT)s=q.EMPTY_BEGIN_TEXT|q.EMPTY_BEGIN_LINE;else if(r&q.EMPTY_BEGIN_LINE)s=q.EMPTY_BEGIN_LINE;else{let a=e.step(t),u=a>=0&&q.isWordRune(a>>3);s=(r&q.EMPTY_WORD_BOUNDARY)!==0!==u?ce.FLAG_LAST_WORD:0}let i=this.startStates.get(s);if(i===void 0){if(i=this.makeState([this.prog.start],s,ka),i===null&&(this.clearCache(),i=this.makeState([this.prog.start],s,ka),i===null))return null;this.startStates.set(s,i)}return i}stepOrReset(e,t,r,s,i,a){let u=this.step(e,t,r,s);if(u!==null)return u;if(a.resetPos>=0&&i-a.resetPos<ce.PROGRESS_PER_STATE*this.stateCount)return null;a.resetPos=i;let c=this.resetCache(e);return c===null?null:(u=this.step(c,t,r,s),u)}run(e,t,r,s,i){let a=e.endPos(),u=this.latin1Class,c=r===F.UNANCHORED,l={resetPos:-1},f=t;for(;f<a;){let d=e.step(f),y=d>>3,R=d&7;if(R===0)break;let v=y<=J.MAX_LATIN1?u[y]:this.runeClass(y),L=c&&s.next!==null?s.next[v]:null;if(L===null&&(L=this.stepOrReset(s,v,y,r,f,l),L===null))return null;if(s=L,s.isMatch&&i(s,!1))return!0;if(!c&&s.nfaStates.length===0)return!1;f+=R}return s=this.stepOrReset(s,this.numClasses,cs,r,f,l),s===null?null:s.isMatch&&i(s,!0)}match(e,t,r){if(this.failed)return null;if((r===F.ANCHOR_START||r===F.ANCHOR_BOTH)&&t!==0)return!1;let s=this.start(e,t);return s===null?null:this.run(e,t,r,s,(i,a)=>r!==F.ANCHOR_BOTH||a)}matchSet(e,t,r){if(this.failed)return null;if((r===F.ANCHOR_START||r===F.ANCHOR_BOTH)&&t!==0)return[];let s=this.start(e,t);if(s===null)return null;let i=new Set,a=(u,c)=>{if(r!==F.ANCHOR_BOTH||c)for(let l=0;l<u.matchIDs.length;l++)i.add(u.matchIDs[l]);return!1};return this.run(e,t,r,s,a)===null?null:Array.from(i).sort((u,c)=>u-c)}},k(ce,"FLAG_EMPTY_MASK",255),k(ce,"FLAG_MATCH",256),k(ce,"FLAG_LAST_WORD",512),k(ce,"FLAG_NEED_SHIFT",16),k(ce,"STATE_OVERHEAD",150),k(ce,"ARRAY_OVERHEAD",40),k(ce,"ELEMENT_SIZE",8),k(ce,"TABLE_OVERHEAD",48),k(ce,"PROGRESS_PER_STATE",10),ce),tm=32,nm=500,Va=256,rm=262144,sm=class{constructor(){this.end=0,this.cap=new Int32Array(0),this.matchcap=new Int32Array(0),this.ncap=0,this.jobPc=new Int32Array(Va),this.jobArg=new Uint8Array(Va),this.jobPos=new Int32Array(Va),this.jobLen=0,this.visited=new Uint32Array(0)}reset(n,e,t){this.end=e,this.jobLen=0,this.ncap=t;let r=n.numInst()*(e+1)+tm-1>>>5;this.visited.length<r?this.visited=new Uint32Array(r):this.visited.fill(0,0,r),this.cap.length<t?this.cap=new Int32Array(t).fill(-1):this.cap.fill(-1,0,t),this.matchcap.length<t?this.matchcap=new Int32Array(t).fill(-1):this.matchcap.fill(-1,0,t)}shouldVisit(n,e){let t=n*(this.end+1)+e,r=t>>>5,s=1<<(t&31);return this.visited[r]&s?!1:(this.visited[r]|=s,!0)}push(n,e,t,r){if(n.prog.getInst(e).op!==N.FAIL&&(r||this.shouldVisit(e,t))){if(this.jobLen>=this.jobPc.length){let s=this.jobPc.length*2,i=new Int32Array(s);i.set(this.jobPc),this.jobPc=i;let a=new Uint8Array(s);a.set(this.jobArg),this.jobArg=a;let u=new Int32Array(s);u.set(this.jobPos),this.jobPos=u}this.jobPc[this.jobLen]=e,this.jobArg[this.jobLen]=r?1:0,this.jobPos[this.jobLen]=t,this.jobLen++}}tryBacktrack(n,e,t,r,s){let i=n.longest;for(this.push(n,t,r,!1);this.jobLen>0;){this.jobLen--;let a=this.jobPc[this.jobLen],u=this.jobArg[this.jobLen]===1,c=this.jobPos[this.jobLen],l=!0;for(;!(!l&&!this.shouldVisit(a,c));){l=!1;let f=n.prog.getInst(a);switch(f.op){case N.FAIL:break;case N.ALT:if(u){u=!1,a=f.arg;continue}else{this.push(n,a,c,!0),a=f.out;continue}case N.ALT_MATCH:{let d=n.prog.getInst(f.out);if(N.isRuneOp(d.op)){this.push(n,f.arg,c,!1),a=f.arg,c=this.end;continue}this.push(n,f.out,this.end,!1),a=f.out;continue}case N.RUNE:{let d=e.step(c);if(d===$e.EOF()||!f.matchRune(d>>3))break;c+=d&7,a=f.out;continue}case N.RUNE1:{let d=e.step(c);if(d===$e.EOF()||d>>3!==f.runes[0])break;c+=d&7,a=f.out;continue}case N.RUNE_ANY_NOT_NL:{let d=e.step(c);if(d===$e.EOF()||d>>3===10)break;c+=d&7,a=f.out;continue}case N.RUNE_ANY:{let d=e.step(c);if(d===$e.EOF())break;c+=d&7,a=f.out;continue}case N.CAPTURE:if(u){this.cap[f.arg]=c;break}else{f.arg<this.ncap&&(this.push(n,a,this.cap[f.arg],!0),this.cap[f.arg]=c),a=f.out;continue}case N.EMPTY_WIDTH:{let d=e.context(c);if(f.arg&~d)break;a=f.out;continue}case N.NOP:a=f.out;continue;case N.MATCH:{if(s===F.ANCHOR_BOTH&&c!==this.end)break;if(this.ncap===0)return!0;this.ncap>1&&(this.cap[1]=c);let d=this.matchcap[1];if((d===-1||i&&c>0&&c>d)&&this.matchcap.set(this.cap),!i||c===this.end)return!0;break}case N.LB_WRITE:case N.LB_CHECK:throw new xi("Backtracker cannot evaluate Lookbehind instructions");default:throw new xi("bad inst")}break}}return i&&this.matchcap.length>1&&this.matchcap[1]>=0}},Oi=[],Ni=class gf{static shouldBacktrack(e){return e.numInst()<=nm}static maxBitStateLen(e){return gf.shouldBacktrack(e)?Math.floor(rm/e.numInst()):0}static execute(e,t,r,s,i){let a=e.cond;if(a===q.EMPTY_ALL||(s===F.ANCHOR_START||s===F.ANCHOR_BOTH)&&r!==0||a&q.EMPTY_BEGIN_TEXT&&r!==0)return null;let u=Oi.length>0?Oi.pop():new sm,c=t.endPos();u.reset(e.prog,c,i);let l=!1;if(a&q.EMPTY_BEGIN_TEXT||s===F.ANCHOR_START||s===F.ANCHOR_BOTH)u.ncap>0&&(u.cap[0]=r),u.tryBacktrack(e,t,e.prog.start,r,s)&&(l=!0);else{let d=-1;for(;r<=c&&d!==0;r+=d){if(e.prefix.length>0){let R=t.index(e,r);if(R<0)break;r+=R}if(u.ncap>0&&(u.cap[0]=r),u.tryBacktrack(e,t,e.prog.start,r,s)){l=!0;break}let y=t.step(r);d=y===$e.EOF()?0:y&7}}if(!l)return Oi.push(u),null;let f=i===0?[]:q.toArray(u.matchcap.subarray(0,i));return Oi.push(u),f}},Gh=class{constructor(n){this.sparse=new Uint32Array(n),this.dense=new Uint32Array(n),this.size=0,this.nextIndex=0}empty(){return this.nextIndex>=this.size}next(){return this.dense[this.nextIndex++]}clear(){this.size=0,this.nextIndex=0}contains(n){return n<this.sparse.length&&this.sparse[n]<this.size&&this.dense[this.sparse[n]]===n}insert(n){this.contains(n)||this.insertNew(n)}insertNew(n){n>=this.sparse.length||(this.sparse[n]=this.size,this.dense[this.size]=n,this.size++)}},im=(n,e,t,r)=>{let s=n.length,i=e.length,a=0,u=0,c=[],l=[],f=!0,d=-1,y=R=>{let v=R?n:e,L=R?a:u,j=R?t:r;return d>0&&v[L]<=c[d]?!1:(c.push(v[L],v[L+1]),R?a+=2:u+=2,d+=2,l.push(j),!0)};for(;a<s||u<i;)if(u>=i?f=y(!0):a>=s||e[u]<n[a]?f=y(!1):f=y(!0),!f)return null;return{merged:c,next:l}},om=class{constructor(n){this.start=n.start,this.numCap=n.numCap,this.inst=new Array(n.inst.length);for(let e=0;e<n.inst.length;e++){let t=n.inst[e],r=new N(t.op);r.out=t.out,r.arg=t.arg,r.runes=t.runes?new Int32Array(t.runes):new Int32Array(0),r.next=null,this.inst[e]=r}}},am=n=>{let e=new om(n);for(let t=0;t<e.inst.length;t++){let r=e.inst[t];if(r.op!==N.ALT&&r.op!==N.ALT_MATCH)continue;let s="out",i="arg",a=e.inst[r[i]];if(a.op!==N.ALT&&a.op!==N.ALT_MATCH&&(s="arg",i="out",a=e.inst[r[i]],a.op!==N.ALT&&a.op!==N.ALT_MATCH))continue;let u=e.inst[r[s]];if(u.op===N.ALT||u.op===N.ALT_MATCH)continue;let c="out",l="arg",f=!1;a.out===t?f=!0:a.arg===t&&(f=!0,c="arg",l="out"),f&&(a[c]=r[s]),r[s]===a[c]&&(r[i]=a[l])}return e},um=n=>{if(n.inst.length>=1e3)return null;let e=new Gh(n.inst.length),t=new Gh(n.inst.length),r=new Array(n.inst.length),s=new Array(n.inst.length).fill(!1),i=a=>{let u=!0,c=n.inst[a];if(t.contains(a))return!0;switch(t.insert(a),c.op){case N.ALT:case N.ALT_MATCH:{u=i(c.out)&&i(c.arg);let l=s[c.out],f=s[c.arg];if(l&&f)return!1;if(f){let v=c.out;c.out=c.arg,c.arg=v;let L=l;l=f,f=L}l&&(s[a]=!0,c.op=N.ALT_MATCH);let d=r[c.out]||[],y=r[c.arg]||[],R=im(d,y,c.out,c.arg);if(!R)return!1;r[a]=new Int32Array(R.merged),c.next=new Uint32Array(R.next);break}case N.CAPTURE:case N.EMPTY_WIDTH:case N.NOP:u=i(c.out),s[a]=s[c.out],r[a]=r[c.out]?new Int32Array(r[c.out]):new Int32Array(0),c.next=new Uint32Array(Math.floor(r[a].length/2)+1).fill(c.out);break;case N.MATCH:case N.FAIL:s[a]=c.op===N.MATCH;break;case N.RUNE:{if(s[a]=!1,c.next&&c.next.length>0)break;if(e.insert(c.out),!c.runes||c.runes.length===0){r[a]=new Int32Array(0),c.next=new Uint32Array([c.out]);break}let l=[];if(c.runes.length===1&&c.arg&F.FOLD_CASE){let f=c.runes[0];l.push(f,f);for(let d=J.simpleFold(f);d!==f;d=J.simpleFold(d))l.push(d,d);l.sort((d,y)=>d-y)}else for(let f=0;f<c.runes.length;f++)l.push(c.runes[f]);r[a]=new Int32Array(l),c.next=new Uint32Array(Math.floor(l.length/2)+1).fill(c.out),c.op=N.RUNE;break}case N.RUNE1:{if(s[a]=!1,c.next&&c.next.length>0)break;e.insert(c.out);let l=[];if(c.arg&F.FOLD_CASE){let f=c.runes[0];l.push(f,f);for(let d=J.simpleFold(f);d!==f;d=J.simpleFold(d))l.push(d,d);l.sort((d,y)=>d-y)}else l.push(c.runes[0],c.runes[0]);r[a]=new Int32Array(l),c.next=new Uint32Array(Math.floor(l.length/2)+1).fill(c.out),c.op=N.RUNE;break}case N.RUNE_ANY:if(s[a]=!1,c.next&&c.next.length>0)break;e.insert(c.out),r[a]=new Int32Array([0,J.MAX_RUNE]),c.next=new Uint32Array([c.out]);break;case N.RUNE_ANY_NOT_NL:if(s[a]=!1,c.next&&c.next.length>0)break;e.insert(c.out),r[a]=new Int32Array([0,9,11,J.MAX_RUNE]),c.next=new Uint32Array(Math.floor(r[a].length/2)+1).fill(c.out)}return u};for(e.clear(),e.insert(n.start);!e.empty();)if(t.clear(),!i(e.next()))return null;for(let a=0;a<n.inst.length;a++)r[a]&&(n.inst[a].runes=r[a]);return n},cm=(n,e)=>{for(let t=0;t<e.inst.length;t++){let r=e.inst[t];switch(r.op){case N.ALT:case N.ALT_MATCH:case N.RUNE:break;case N.CAPTURE:case N.EMPTY_WIDTH:case N.NOP:case N.MATCH:case N.FAIL:n.inst[t].next=null;break;case N.RUNE1:case N.RUNE_ANY:case N.RUNE_ANY_NOT_NL:n.inst[t].next=null,n.inst[t].op=r.op,n.inst[t].runes=r.runes?new Int32Array(r.runes):new Int32Array(0)}}},Hh=class mf{static compile(e){if(e.start===0||e.numLb>0)return null;let t=e.inst[e.start];if(t.op!==N.EMPTY_WIDTH||!(t.arg&q.EMPTY_BEGIN_TEXT))return null;let r=!1;for(let i=0;i<e.inst.length;i++)if(e.inst[i].op===N.ALT||e.inst[i].op===N.ALT_MATCH){r=!0;break}for(let i=0;i<e.inst.length;i++){let a=e.inst[i],u=e.inst[a.out].op;switch(a.op){case N.ALT:case N.ALT_MATCH:if(u===N.MATCH||e.inst[a.arg].op===N.MATCH)return null;break;case N.EMPTY_WIDTH:if(u===N.MATCH){if((a.arg&q.EMPTY_END_TEXT)===q.EMPTY_END_TEXT)continue;return null}break;default:if(u===N.MATCH&&r)return null}}let s=am(e);return s=um(s),s!==null&&cm(s,e),s}static next(e,t){let r=e.matchRunePos(t);return r>=0?e.next[r]:e.op===N.ALT_MATCH?e.out:0}static execute(e,t,r,s,i){let a=e.onepass;if(!a)return null;let u=new Int32Array(i).fill(-1),c=!1,l=t.step(r),f=l>>3,d=l&7,y=$e.EOF(),R=-1,v=0;l!==$e.EOF()&&(y=t.step(r+d),y!==$e.EOF()&&(R=y>>3,v=y&7));let L=r===0?q.emptyOpContext(-1,f):t.context(r),j=a.start,z;for(;;){switch(z=a.inst[j],j=z.out,z.op){case N.MATCH:return s===F.ANCHOR_BOTH&&r!==t.endPos()?null:(c=!0,u.length>0&&(u[0]=0,u[1]=r),i===0?[]:q.toArray(u));case N.RUNE:if(!z.matchRune(f))return null;break;case N.RUNE1:if(f!==z.runes[0])return null;break;case N.RUNE_ANY:break;case N.RUNE_ANY_NOT_NL:if(f===10)return null;break;case N.ALT:case N.ALT_MATCH:j=mf.next(z,f);continue;case N.FAIL:return null;case N.NOP:continue;case N.EMPTY_WIDTH:if(z.arg&~L)return null;continue;case N.CAPTURE:z.arg<u.length&&(u[z.arg]=r);continue;default:throw new xi("bad inst")}if(d===0)break;L=q.emptyOpContext(f,R),r+=d,f=R,d=v,f!==-1&&(y=t.step(r+d),y!==$e.EOF()?(R=y>>3,v=y&7):(R=-1,v=0))}return c?i===0?[]:q.toArray(u):null}},$,D=($=class{static isPseudoOp(e){return e>=$.Op.LEFT_PAREN}static emptySubs(){return[]}static quoteIfHyphen(e){return e===x.CODES["-"]?"\\":""}static fromRegexp(e){let t=new $(e.op);return t.flags=e.flags,t.subs=e.subs,t.runes=e.runes,t.cap=e.cap,t.min=e.min,t.max=e.max,t.name=e.name,t.namedGroups=e.namedGroups,t.lb=e.lb,t}constructor(e){this.op=e,this.flags=0,this.subs=$.emptySubs(),this.runes=new Int32Array(0),this.min=0,this.max=0,this.cap=0,this.name=null,this.namedGroups=Object.create(null),this.lb=0}reinit(){this.flags=0,this.subs=$.emptySubs(),this.runes=new Int32Array(0),this.cap=0,this.min=0,this.max=0,this.name=null,this.namedGroups=Object.create(null),this.lb=0}toString(){return this.appendTo()}appendTo(){let e="";switch(this.op){case $.Op.NO_MATCH:e+="[^\\x00-\\x{10FFFF}]";break;case $.Op.EMPTY_MATCH:e+="(?:)";break;case $.Op.STAR:case $.Op.PLUS:case $.Op.QUEST:case $.Op.REPEAT:{let t=this.subs[0];switch(t.op>$.Op.CAPTURE||t.op===$.Op.LITERAL&&t.runes.length>1?e+=`(?:${t.appendTo()})`:e+=t.appendTo(),this.op){case $.Op.STAR:e+="*";break;case $.Op.PLUS:e+="+";break;case $.Op.QUEST:e+="?";break;case $.Op.REPEAT:e+=`{${this.min}`,this.min!==this.max&&(e+=",",this.max>=0&&(e+=this.max)),e+="}"}this.flags&F.NON_GREEDY&&(e+="?");break}case $.Op.CONCAT:for(let t of this.subs)t.op===$.Op.ALTERNATE?e+=`(?:${t.appendTo()})`:e+=t.appendTo();break;case $.Op.ALTERNATE:{let t="";for(let r of this.subs)e+=t,t="|",e+=r.appendTo();break}case $.Op.LITERAL:this.flags&F.FOLD_CASE&&(e+="(?i:");for(let t of this.runes)e+=q.escapeRune(t);this.flags&F.FOLD_CASE&&(e+=")");break;case $.Op.ANY_CHAR_NOT_NL:e+="(?-s:.)";break;case $.Op.ANY_CHAR:e+="(?s:.)";break;case $.Op.PLB:e+=`(?<=${this.subs[0].appendTo()})`;break;case $.Op.NLB:e+=`(?<!${this.subs[0].appendTo()})`;break;case $.Op.CAPTURE:this.name===null||this.name.length===0?e+="(":e+=`(?P<${this.name}>`,this.subs[0].op!==$.Op.EMPTY_MATCH&&(e+=this.subs[0].appendTo()),e+=")";break;case $.Op.BEGIN_TEXT:e+="\\A";break;case $.Op.END_TEXT:this.flags&F.WAS_DOLLAR?e+="(?-m:$)":e+="\\z";break;case $.Op.BEGIN_LINE:e+="^";break;case $.Op.END_LINE:e+="$";break;case $.Op.WORD_BOUNDARY:e+="\\b";break;case $.Op.NO_WORD_BOUNDARY:e+="\\B";break;case $.Op.CHAR_CLASS:if(this.runes.length%2!==0){e+="[invalid char class]";break}if(e+="[",this.runes.length===0)e+="^\\x00-\\x{10FFFF}";else if(this.runes[0]===0&&this.runes[this.runes.length-1]===J.MAX_RUNE){e+="^";for(let t=1;t<this.runes.length-1;t+=2){let r=this.runes[t]+1,s=this.runes[t+1]-1;e+=$.quoteIfHyphen(r),e+=q.escapeRune(r),r!==s&&(e+="-",e+=$.quoteIfHyphen(s),e+=q.escapeRune(s))}}else for(let t=0;t<this.runes.length;t+=2){let r=this.runes[t],s=this.runes[t+1];e+=$.quoteIfHyphen(r),e+=q.escapeRune(r),r!==s&&(e+="-",e+=$.quoteIfHyphen(s),e+=q.escapeRune(s))}e+="]";break;default:e+=this.op}return e}maxCap(){let e=0;if(this.op===$.Op.CAPTURE&&(e=this.cap),this.subs!==null)for(let t of this.subs){let r=t.maxCap();e<r&&(e=r)}return e}equals(e){if(!(e!==null&&e instanceof $)||this.op!==e.op)return!1;switch(this.op){case $.Op.END_TEXT:if((this.flags&F.WAS_DOLLAR)!==(e.flags&F.WAS_DOLLAR))return!1;break;case $.Op.LITERAL:case $.Op.CHAR_CLASS:if((this.flags&F.FOLD_CASE)!==(e.flags&F.FOLD_CASE))return!1;if(this.runes===null&&e.runes===null)break;if(this.runes===null||e.runes===null||this.runes.length!==e.runes.length)return!1;for(let t=0;t<this.runes.length;t++)if(this.runes[t]!==e.runes[t])return!1;break;case $.Op.ALTERNATE:case $.Op.CONCAT:if(this.subs.length!==e.subs.length)return!1;for(let t=0;t<this.subs.length;++t)if(!this.subs[t].equals(e.subs[t]))return!1;break;case $.Op.STAR:case $.Op.PLUS:case $.Op.QUEST:if((this.flags&F.NON_GREEDY)!==(e.flags&F.NON_GREEDY)||!this.subs[0].equals(e.subs[0]))return!1;break;case $.Op.REPEAT:if((this.flags&F.NON_GREEDY)!==(e.flags&F.NON_GREEDY)||this.min!==e.min||this.max!==e.max||!this.subs[0].equals(e.subs[0]))return!1;break;case $.Op.CAPTURE:if(this.cap!==e.cap||(this.name===null?e.name!==null:this.name!==e.name)||!this.subs[0].equals(e.subs[0]))return!1;break;case $.Op.PLB:case $.Op.NLB:if(this.lb!==e.lb||!this.subs[0].equals(e.subs[0]))return!1}return!0}},k($,"Op",df(["NO_MATCH","EMPTY_MATCH","LITERAL","CHAR_CLASS","ANY_CHAR_NOT_NL","ANY_CHAR","BEGIN_LINE","END_LINE","BEGIN_TEXT","END_TEXT","WORD_BOUNDARY","NO_WORD_BOUNDARY","CAPTURE","STAR","PLUS","QUEST","REPEAT","CONCAT","ALTERNATE","PLB","NLB","LEFT_PAREN","VERTICAL_BAR"])),$),Ja=class{static walk(n,e){let t=[],r=n,s;for(;;){if(r.subs.length===0)s=e.leaf(r);else{let i=e.enter(r);if(i.result===void 0){t.push({re:r,state:i,i:0}),r=r.subs[0];continue}s=i.result}for(;;){if(t.length===0)return s;let i=t[t.length-1];if(e.child(i.re,i.state,s,i.i),i.i++,i.state.result===void 0&&i.i<i.re.subs.length){r=i.re.subs[i.i];break}t.pop(),s=i.state.result!==void 0?i.state.result:e.leave(i.re,i.state)}}}},Uh=class{constructor(n,e){let t=new Map,r=[0],s=[0],i=[0],a=[0];for(let v of n){let L=0;for(let j=0;j<v.length;j++){let z=L*e+v[j],W=t.get(z);W===void 0&&(W=r.length,t.set(z,W),r.push(L),s.push(v[j]),i.push(i[L]+1),a.push(0)),L=W}a[L]=1}let u=r.length,c=new Int32Array(u-1);for(let v=1;v<u;v++)c[v-1]=v;c.sort((v,L)=>r[v]-r[L]||s[v]-s[L]);let l=new Int32Array(u+1);for(let v=1;v<u;v++)l[r[v]+1]++;for(let v=0;v<u;v++)l[v+1]+=l[v];let f=new Int32Array(u-1);for(let v=0;v<c.length;v++)f[v]=s[c[v]];this.childStart=l,this.childUnit=f,this.childNode=c;let d=new Int32Array(u);for(let v=0;v<u;v++)d[v]=v;d.sort((v,L)=>i[v]-i[L]);let y=new Int32Array(u),R=Uint8Array.from(a);for(let v=1;v<u;v++){let L=d[v],j=r[L];if(j!==0){let z=y[j],W=this.next(z,s[L]);for(;W<0&&z!==0;)z=y[z],W=this.next(z,s[L]);y[L]=W>=0?W:0}R[L]|=R[y[L]]}this.fail=y,this.match=R}next(n,e){let t=this.childStart[n],r=this.childStart[n+1],s=this.childUnit;for(;t<r;){let i=t+r>>1,a=s[i];if(a===e)return this.childNode[i];a<e?t=i+1:r=i}return-1}advance(n,e){for(;;){let t=this.next(n,e);if(t>=0)return t;if(n===0)return 0;n=this.fail[n]}}searchUTF16(n,e,t){let r=0;for(let s=e;s<t;s++)if(r=this.advance(r,n.charCodeAt(s)),this.match[r]===1)return!0;return!1}searchUTF8(n,e,t){let r=0;for(let s=e;s<t;s++)if(r=this.advance(r,n[s]),this.match[r]===1)return!0;return!1}},ot,se=(ot=class{constructor(e){this.type=e,this.subs=[],this.str="",this.bytes=null,this.cost=e===ot.Type.EXACT?1:0,this.allExact=!1,this.ac16=null,this.ac8=null}automaton16(){if(this.ac16===null){let e=this.subs.map(t=>{let r=new Array(t.str.length);for(let s=0;s<t.str.length;s++)r[s]=t.str.charCodeAt(s);return r});this.ac16=new Uh(e,65536)}return this.ac16}automaton8(){return this.ac8===null&&(this.ac8=new Uh(this.subs.map(e=>e.bytes),256)),this.ac8}eval(e,t){switch(this.type){case ot.Type.NONE:return!0;case ot.Type.EXACT:return e.hasString(this,t);case ot.Type.AND:for(let r=0;r<this.subs.length;r++)if(!this.subs[r].eval(e,t))return!1;return!0;case ot.Type.OR:if(this.allExact)return e.hasAnyString(this,t);for(let r=0;r<this.subs.length;r++)if(this.subs[r].eval(e,t))return!0;return!1;default:return!0}}},k(ot,"Type",{NONE:0,EXACT:1,AND:2,OR:3}),k(ot,"MAX_SCANS",32),k(ot,"MAX_AC_UNITS",1<<18),ot),yt,Bm=(yt=class{static build(e){return e?Ja.walk(e,yt.WALKER):new se(se.Type.NONE)}static leaf(e){if(e.op!==D.Op.LITERAL)return new se(se.Type.NONE);if(e.runes.length===0||e.flags&F.FOLD_CASE)return new se(se.Type.NONE);let t="";for(let s=0;s<e.runes.length;s++){if(J.isUnsearchable(e.runes[s]))return new se(se.Type.NONE);t+=String.fromCodePoint(e.runes[s])}let r=new se(se.Type.EXACT);return r.str=t,r.bytes=q.stringToUtf8ByteArray(r.str),r}static enter(e){switch(e.op){case D.Op.CAPTURE:case D.Op.PLUS:return{sub:null};case D.Op.REPEAT:return e.min>=1?{sub:null}:{result:new se(se.Type.NONE)};case D.Op.CONCAT:return{pf:new se(se.Type.AND),subs:[]};case D.Op.ALTERNATE:return{pf:new se(se.Type.OR),subs:[]};default:return{result:new se(se.Type.NONE)}}}static child(e,t,r){if(t.subs===void 0){t.sub=r;return}if(t.pf.type===se.Type.AND){if(r.type===se.Type.NONE)return;if(r.type===se.Type.AND){for(let s=0;s<r.subs.length;s++)t.subs.push(r.subs[s]);return}t.subs.push(r);return}if(r.type===se.Type.NONE){t.result=new se(se.Type.NONE);return}if(r.type===se.Type.OR){for(let s=0;s<r.subs.length;s++)t.subs.push(r.subs[s]);return}t.subs.push(r)}static leave(e,t){if(t.subs===void 0)return t.sub;let r=t.pf,s=new Set,i=[];for(let l of t.subs){if(l.type===se.Type.EXACT){if(s.has(l.str))continue;s.add(l.str)}i.push(l)}if(r.type===se.Type.AND){let l=[],f=0;for(let d of i)f+d.cost>se.MAX_SCANS||(l.push(d),f+=d.cost);return l.length===0?new se(se.Type.NONE):l.length===1?l[0]:(r.subs=l,r.cost=f,r)}if(i.length===0)return new se(se.Type.NONE);if(i.length===1)return i[0];r.subs=i;let a=!0,u=0,c=0;for(let l of i)l.type!==se.Type.EXACT?a=!1:c+=l.bytes.length,u+=l.cost;return a?c>se.MAX_AC_UNITS?new se(se.Type.NONE):(r.allExact=!0,r.cost=1,r):u>se.MAX_SCANS?new se(se.Type.NONE):(r.cost=u,r)}},k(yt,"WALKER",{leaf:e=>yt.leaf(e),enter:e=>yt.enter(e),child:(e,t,r)=>yt.child(e,t,r),leave:(e,t)=>yt.leave(e,t)}),yt),Bt=class{constructor(n=0,e=0){this.head=n,this.tail=e}},lm=class{constructor(){this.inst=[],this.start=0,this.numCap=2,this.lbStarts=[],this.numLb=0,this.lbInst=null}getInst(n){return this.inst[n]}numInst(){return this.inst.length}addInst(n){this.inst.push(new N(n))}markLookbehindInsts(){let n=new Uint8Array(this.inst.length),e=this.lbStarts.slice();for(;e.length>0;){let t=e.pop();if(t===0||n[t]===1)continue;n[t]=1;let r=this.inst[t];switch(r.op){case N.ALT:case N.ALT_MATCH:e.push(r.out,r.arg);break;case N.MATCH:case N.FAIL:break;default:e.push(r.out)}}this.lbInst=n}skipNop(n){let e=this.inst[n];for(;e.op===N.NOP||e.op===N.CAPTURE;)e=this.inst[n],n=e.out;return e}prefix(){let n="",e=this.skipNop(this.start);if(!N.isRuneOp(e.op)||e.runes.length!==1)return[e.op===N.MATCH,n];for(;N.isRuneOp(e.op)&&e.runes.length===1&&!(e.arg&F.FOLD_CASE)&&!J.isUnsearchable(e.runes[0]);)n+=String.fromCodePoint(e.runes[0]),e=this.skipNop(e.out);return[e.op===N.MATCH,n]}startCond(){let n=0,e=this.start;e:for(;;){let t=this.inst[e];switch(t.op){case N.EMPTY_WIDTH:n|=t.arg;break;case N.FAIL:return-1;case N.CAPTURE:case N.NOP:break;default:break e}e=t.out}return n}patch(n,e){let t=n.head;for(;t!==0;){let r=this.inst[t>>1];t&1?(t=r.arg,r.arg=e):(t=r.out,r.out=e)}}append(n,e){if(n.head===0)return e;if(e.head===0)return n;let t=this.inst[n.tail>>1];return n.tail&1?t.arg=e.head:t.out=e.head,new Bt(n.head,e.tail)}toString(){let n="";for(let e=0;e<this.inst.length;e++){let t=n.length;n+=e,e===this.start&&(n+="*"),n+="        ".substring(n.length-t),n+=this.inst[e],n+=`
`}return n}},hm=new Int32Array([0,x.CODES[`
`]-1,x.CODES[`
`]+1,J.MAX_RUNE]),qh=new Int32Array([0,J.MAX_RUNE]),Pi=class{constructor(n=0,e=new Bt,t=!1){this.i=n,this.out=e,this.nullable=t}},Ef=class Ua{static compileRegexp(e){let t=new Ua,r=t.compile(e);return t.prog.patch(r.out,t.newInst(N.MATCH).i),t.prog.start=r.i,t.prog.markLookbehindInsts(),t.prog}static compileSet(e){let t=new Ua;if(e.length===0)return t.prog.start=t.newInst(N.FAIL).i,t.prog.markLookbehindInsts(),t.prog;let r=[];for(let i=0;i<e.length;i++){t.lbOffset=t.prog.numLb;let a=t.compile(e[i]),u=t.newInst(N.MATCH);t.prog.getInst(u.i).arg=i,t.prog.patch(a.out,u.i),r.push(a.i)}let s=r[0];for(let i=1;i<r.length;i++){let a=t.newInst(N.ALT),u=t.prog.getInst(a.i);u.out=s,u.arg=r[i],s=a.i}return t.prog.start=s,t.prog.markLookbehindInsts(),t.prog}constructor(){this.prog=new lm,this.newInst(N.FAIL),this.lbOffset=0,this.runeCache=new Map,this.walker={leaf:e=>this.leaf(e),enter:e=>this.enter(e),child:(e,t,r)=>this.child(e,t,r),leave:(e,t)=>this.leave(e,t)}}newInst(e){return this.prog.addInst(e),new Pi(this.prog.numInst()-1,new Bt,!0)}nop(){let e=this.newInst(N.NOP);return e.out=new Bt(e.i<<1,e.i<<1),e}fail(){return new Pi}cap(e){let t=this.newInst(N.CAPTURE);return t.out=new Bt(t.i<<1,t.i<<1),this.prog.getInst(t.i).arg=e,this.prog.numCap<e+1&&(this.prog.numCap=e+1),t}cat(e,t){return e.i===0||t.i===0?(this.prog.patch(e.out,0),this.prog.patch(t.out,0),this.fail()):(this.prog.patch(e.out,t.i),new Pi(e.i,t.out,e.nullable&&t.nullable))}alt(e,t){if(e.i===0)return t;if(t.i===0)return e;let r=this.newInst(N.ALT),s=this.prog.getInst(r.i);return s.out=e.i,s.arg=t.i,r.out=this.prog.append(e.out,t.out),r.nullable=e.nullable||t.nullable,r}loop(e,t){let r=this.newInst(N.ALT),s=this.prog.getInst(r.i);return t?(s.arg=e.i,r.out=new Bt(r.i<<1,r.i<<1)):(s.out=e.i,r.out=new Bt(r.i<<1|1,r.i<<1|1)),this.prog.patch(e.out,r.i),r}quest(e,t){if(e.i===0)return this.nop();let r=this.newInst(N.ALT),s=this.prog.getInst(r.i);return t?(s.arg=e.i,r.out=new Bt(r.i<<1,r.i<<1)):(s.out=e.i,r.out=new Bt(r.i<<1|1,r.i<<1|1)),r.out=this.prog.append(r.out,e.out),r}star(e,t){return e.i===0?this.nop():e.nullable?this.quest(this.plus(e,t),t):this.loop(e,t)}plus(e,t){return e.i===0?this.fail():new Pi(e.i,this.loop(e,t).out,e.nullable)}empty(e){let t=this.newInst(N.EMPTY_WIDTH);return this.prog.getInst(t.i).arg=e,t.out=new Bt(t.i<<1,t.i<<1),t}rune(e,t){let r=this.newInst(N.RUNE);r.nullable=!1;let s=this.prog.getInst(r.i);return s.runes=e,t&=F.FOLD_CASE,(e.length!==1||J.simpleFold(e[0])===e[0])&&(t&=~F.FOLD_CASE),s.arg=t,r.out=new Bt(r.i<<1,r.i<<1),!(t&F.FOLD_CASE)&&e.length===1||e.length===2&&e[0]===e[1]?s.op=N.RUNE1:e.length===2&&e[0]===0&&e[1]===J.MAX_RUNE?s.op=N.RUNE_ANY:e.length===4&&e[0]===0&&e[1]===x.CODES[`
`]-1&&e[2]===x.CODES[`
`]+1&&e[3]===J.MAX_RUNE&&(s.op=N.RUNE_ANY_NOT_NL),r}lookBehind(e,t){let r=Math.sign(t)*(Math.abs(t)+this.lbOffset),s=this.newInst(N.LB_WRITE);this.prog.getInst(s.i).arg=r;let i=this.rune(qh,0),a=this.star(i,!0),u=this.cat(a,e);this.prog.patch(u.out,s.i);let c=this.newInst(N.LB_CHECK);return this.prog.getInst(c.i).arg=r,this.prog.lbStarts.push(u.i),Math.abs(r)>this.prog.numLb&&(this.prog.numLb=Math.abs(r)),c.out=new Bt(c.i<<1,c.i<<1),c}compile(e){return Ja.walk(e,this.walker)}leaf(e){switch(e.op){case D.Op.NO_MATCH:return this.fail();case D.Op.EMPTY_MATCH:return this.nop();case D.Op.LITERAL:{if(e.runes.length===0)return this.nop();let t=null;for(let r of e.runes){let s=this.runeCache.get(r);s===void 0&&(s=new Int32Array([r]),this.runeCache.set(r,s));let i=this.rune(s,e.flags);t=t===null?i:this.cat(t,i)}return t}case D.Op.CHAR_CLASS:return this.rune(e.runes,e.flags);case D.Op.ANY_CHAR_NOT_NL:return this.rune(hm,0);case D.Op.ANY_CHAR:return this.rune(qh,0);case D.Op.BEGIN_LINE:return this.empty(q.EMPTY_BEGIN_LINE);case D.Op.END_LINE:return this.empty(q.EMPTY_END_LINE);case D.Op.BEGIN_TEXT:return this.empty(q.EMPTY_BEGIN_TEXT);case D.Op.END_TEXT:return this.empty(q.EMPTY_END_TEXT);case D.Op.WORD_BOUNDARY:return this.empty(q.EMPTY_WORD_BOUNDARY);case D.Op.NO_WORD_BOUNDARY:return this.empty(q.EMPTY_NO_WORD_BOUNDARY);case D.Op.CONCAT:case D.Op.ALTERNATE:return this.nop();default:throw new ls("regexp: unhandled case in compile")}}enter(e){switch(e.op){case D.Op.PLB:case D.Op.NLB:case D.Op.STAR:case D.Op.PLUS:case D.Op.QUEST:return{sub:null};case D.Op.CAPTURE:return{bra:this.cap(e.cap<<1),sub:null};case D.Op.CONCAT:case D.Op.ALTERNATE:return{f:null};default:throw new ls("regexp: unhandled case in compile")}}child(e,t,r){e.op===D.Op.CONCAT?t.f=t.f===null?r:this.cat(t.f,r):e.op===D.Op.ALTERNATE?t.f=t.f===null?r:this.alt(t.f,r):t.sub=r}leave(e,t){switch(e.op){case D.Op.PLB:case D.Op.NLB:return this.lookBehind(t.sub,e.lb);case D.Op.CAPTURE:{let r=this.cap(e.cap<<1|1);return this.cat(this.cat(t.bra,t.sub),r)}case D.Op.STAR:return this.star(t.sub,(e.flags&F.NON_GREEDY)!==0);case D.Op.PLUS:return this.plus(t.sub,(e.flags&F.NON_GREEDY)!==0);case D.Op.QUEST:return this.quest(t.sub,(e.flags&F.NON_GREEDY)!==0);case D.Op.CONCAT:case D.Op.ALTERNATE:return t.f;default:throw new ls("regexp: unhandled case in compile")}}},Ae,_f=(Ae=class{static simplify(e){return e===null?null:Ja.walk(e,Ae.WALKER)}static leaf(e){if(e.op===D.Op.CHAR_CLASS){if(e.runes===null)return e;if(e.runes.length===0)return new D(D.Op.NO_MATCH);if(e.runes.length===2&&e.runes[0]===0&&e.runes[1]===J.MAX_RUNE)return new D(D.Op.ANY_CHAR);if(e.runes.length===4&&e.runes[0]===0&&e.runes[1]===x.CODES[`
`]-1&&e.runes[2]===x.CODES[`
`]+1&&e.runes[3]===J.MAX_RUNE)return new D(D.Op.ANY_CHAR_NOT_NL)}return e}static enter(e){switch(e.op){case D.Op.PLB:case D.Op.NLB:case D.Op.CAPTURE:case D.Op.STAR:case D.Op.PLUS:case D.Op.QUEST:return{sub:null};case D.Op.CONCAT:case D.Op.ALTERNATE:return{subs:[],changed:!1};case D.Op.REPEAT:return e.min===0&&e.max===0?{result:new D(D.Op.EMPTY_MATCH)}:{sub:null};default:return{result:e}}}static child(e,t,r,s){if(t.subs===void 0){t.sub=r;return}if(r!==e.subs[s]&&(t.changed=!0),e.op===D.Op.CONCAT){if(r.op===D.Op.NO_MATCH){t.result=new D(D.Op.NO_MATCH);return}if(r.op===D.Op.EMPTY_MATCH){t.changed=!0;return}if(r.op===D.Op.CONCAT){t.changed=!0;for(let i=0;i<r.subs.length;i++)t.subs.push(r.subs[i]);return}}else{if(r.op===D.Op.NO_MATCH){t.changed=!0;return}if(r.op===D.Op.ALTERNATE){t.changed=!0;for(let i=0;i<r.subs.length;i++)t.subs.push(r.subs[i]);return}}t.subs.push(r)}static leave(e,t){switch(e.op){case D.Op.PLB:case D.Op.NLB:case D.Op.CAPTURE:{let r=t.sub;if(r!==e.subs[0]){let s=D.fromRegexp(e);return s.runes=new Int32Array(0),s.subs=[r],s}return e}case D.Op.CONCAT:case D.Op.ALTERNATE:if(t.changed){let r=t.subs;if(r.length===0)return new D(e.op===D.Op.CONCAT?D.Op.EMPTY_MATCH:D.Op.NO_MATCH);if(r.length===1)return r[0];let s=D.fromRegexp(e);return s.runes=new Int32Array(0),s.subs=r,s}return e;case D.Op.STAR:case D.Op.PLUS:case D.Op.QUEST:return Ae.simplify1(e.op,e.flags,t.sub,e);case D.Op.REPEAT:return Ae.simplifyRepeat(e,t.sub);default:return e}}static simplifyRepeat(e,t){if(e.max===-1){if(e.min===0)return Ae.simplify1(D.Op.STAR,e.flags,t,null);if(e.min===1)return Ae.simplify1(D.Op.PLUS,e.flags,t,null);let s=[];for(let i=0;i<e.min-1;i++)s.push(t);return s.push(Ae.simplify1(D.Op.PLUS,e.flags,t,null)),Ae.concat(s)}if(e.min===1&&e.max===1)return t;let r=null;if(e.min>0){r=[];for(let s=0;s<e.min;s++)r.push(t)}if(e.max>e.min){let s=Ae.simplify1(D.Op.QUEST,e.flags,t,null);for(let i=e.min+1;i<e.max;i++)s=Ae.simplify1(D.Op.QUEST,e.flags,Ae.concat([t,s]),null);if(r===null)return s;r.push(s)}return r!==null?Ae.concat(r):new D(D.Op.NO_MATCH)}static concat(e){let t=[];for(let s=0;s<e.length;s++){let i=e[s];if(i.op===D.Op.NO_MATCH)return new D(D.Op.NO_MATCH);if(i.op!==D.Op.EMPTY_MATCH){if(i.op===D.Op.CONCAT){for(let a=0;a<i.subs.length;a++)t.push(i.subs[a]);continue}t.push(i)}}if(t.length===0)return new D(D.Op.EMPTY_MATCH);if(t.length===1)return t[0];let r=new D(D.Op.CONCAT);return r.subs=t,r}static simplify1(e,t,r,s){if(r.op===D.Op.EMPTY_MATCH)return r;if(r.op===D.Op.NO_MATCH)return e===D.Op.PLUS?r:new D(D.Op.EMPTY_MATCH);if(e===r.op&&(t&F.NON_GREEDY)===(r.flags&F.NON_GREEDY))return r;if(s!==null&&s.op===e&&(s.flags&F.NON_GREEDY)===(t&F.NON_GREEDY)&&r===s.subs[0])return s;let i=new D(e);return i.flags=t,i.subs=[r],i}},k(Ae,"WALKER",{leaf:e=>Ae.leaf(e),enter:e=>Ae.enter(e),child:(e,t,r,s)=>Ae.child(e,t,r,s),leave:(e,t)=>Ae.leave(e,t)}),Ae),ae=class{constructor(n,e){this.sign=n,this.cls=e}},jh=[48,57],Jh=[9,10,12,13,32,32],Kh=[48,57,65,90,95,95,97,122],zh=new Map([["\\d",new ae(1,jh)],["\\D",new ae(-1,jh)],["\\s",new ae(1,Jh)],["\\S",new ae(-1,Jh)],["\\w",new ae(1,Kh)],["\\W",new ae(-1,Kh)]]),Qh=[48,57,65,90,97,122],$h=[65,90,97,122],Wh=[0,127],Yh=[9,9,32,32],Xh=[0,31,127,127],Zh=[48,57],ef=[33,126],tf=[97,122],nf=[32,126],rf=[33,47,58,64,91,96,123,126],sf=[9,13,32,32],of=[65,90],af=[48,57,65,90,95,95,97,122],uf=[48,57,65,70,97,102],cf=new Map([["[:alnum:]",new ae(1,Qh)],["[:^alnum:]",new ae(-1,Qh)],["[:alpha:]",new ae(1,$h)],["[:^alpha:]",new ae(-1,$h)],["[:ascii:]",new ae(1,Wh)],["[:^ascii:]",new ae(-1,Wh)],["[:blank:]",new ae(1,Yh)],["[:^blank:]",new ae(-1,Yh)],["[:cntrl:]",new ae(1,Xh)],["[:^cntrl:]",new ae(-1,Xh)],["[:digit:]",new ae(1,Zh)],["[:^digit:]",new ae(-1,Zh)],["[:graph:]",new ae(1,ef)],["[:^graph:]",new ae(-1,ef)],["[:lower:]",new ae(1,tf)],["[:^lower:]",new ae(-1,tf)],["[:print:]",new ae(1,nf)],["[:^print:]",new ae(-1,nf)],["[:punct:]",new ae(1,rf)],["[:^punct:]",new ae(-1,rf)],["[:space:]",new ae(1,sf)],["[:^space:]",new ae(-1,sf)],["[:upper:]",new ae(1,of)],["[:^upper:]",new ae(-1,of)],["[:word:]",new ae(1,af)],["[:^word:]",new ae(-1,af)],["[:xdigit:]",new ae(1,uf)],["[:^xdigit:]",new ae(-1,uf)]]),Rn=class Fi{static charClassToString(e,t){let r="[";for(let s=0;s<t;s+=2){s>0&&(r+=" ");let i=e[s],a=e[s+1];i===a?r+=`0x${i.toString(16)}`:r+=`0x${i.toString(16)}-0x${a.toString(16)}`}return r+="]",r}static sortRanges(e,t){let r=t>>1,s=new Array(r);for(let a=0;a<r;a++)s[a]=a;s.sort((a,u)=>e[2*a]-e[2*u]||e[2*u+1]-e[2*a+1]);let i=e.slice(0,t);for(let a=0;a<r;a++)e[2*a]=i[2*s[a]],e[2*a+1]=i[2*s[a]+1]}constructor(e=q.emptyInts()){this.r=e,this.len=e.length}toArray(){return this.r instanceof Int32Array?this.len===this.r.length?this.r:this.r.subarray(0,this.len):new Int32Array(this.len===this.r.length?this.r:this.r.slice(0,this.len))}toGrowableArray(){return Array.isArray(this.r)?(this.r.length=this.len,this.r):Array.from(this.r.subarray(0,this.len))}cleanClass(){if(this.len<4)return this;Fi.sortRanges(this.r,this.len);let e=2;for(let t=2;t<this.len;t+=2){let r=this.r[t],s=this.r[t+1];if(r<=this.r[e-1]+1){s>this.r[e-1]&&(this.r[e-1]=s);continue}this.r[e]=r,this.r[e+1]=s,e+=2}return this.len=e,this}appendLiteral(e,t){return t&F.FOLD_CASE?this.appendFoldedRange(e,e):this.appendRange(e,e)}appendRange(e,t){if(this.len>0){for(let r=2;r<=4;r+=2)if(this.len>=r){let s=this.r[this.len-r],i=this.r[this.len-r+1];if(e<=i+1&&s<=t+1)return e<s&&(this.r[this.len-r]=e),t>i&&(this.r[this.len-r+1]=t),this}}return this.r[this.len++]=e,this.r[this.len++]=t,this}appendFoldedRange(e,t){if(e<=J.MIN_FOLD&&t>=J.MAX_FOLD)return this.appendRange(e,t);if(t<J.MIN_FOLD||e>J.MAX_FOLD)return this.appendRange(e,t);e<J.MIN_FOLD&&(this.appendRange(e,J.MIN_FOLD-1),e=J.MIN_FOLD),t>J.MAX_FOLD&&(this.appendRange(J.MAX_FOLD+1,t),t=J.MAX_FOLD);for(let r=e;r<=t;r++){this.appendRange(r,r);for(let s=J.simpleFold(r);s!==r;s=J.simpleFold(s))this.appendRange(s,s)}return this}appendClass(e){for(let t=0;t<e.length;t+=2)this.appendRange(e[t],e[t+1]);return this}appendFoldedClass(e){for(let t=0;t<e.length;t+=2)this.appendFoldedRange(e[t],e[t+1]);return this}appendNegatedClass(e){let t=0;for(let r=0;r<e.length;r+=2){let s=e[r],i=e[r+1];t<=s-1&&this.appendRange(t,s-1),t=i+1}return t<=J.MAX_RUNE&&this.appendRange(t,J.MAX_RUNE),this}appendTable(e){for(let t=0;t<e.length;++t){let r=e.getLo(t),s=e.getHi(t),i=e.getStride(t);if(i===1){this.appendRange(r,s);continue}for(let a=r;a<=s;a+=i)this.appendRange(a,a)}return this}appendNegatedTable(e){let t=0;for(let r=0;r<e.length;++r){let s=e.getLo(r),i=e.getHi(r),a=e.getStride(r);if(a===1){t<=s-1&&this.appendRange(t,s-1),t=i+1;continue}for(let u=s;u<=i;u+=a)t<=u-1&&this.appendRange(t,u-1),t=u+1}return t<=J.MAX_RUNE&&this.appendRange(t,J.MAX_RUNE),this}appendTableWithSign(e,t){return t<0?this.appendNegatedTable(e):this.appendTable(e)}negateClass(){let e=0,t=0;for(let r=0;r<this.len;r+=2){let s=this.r[r],i=this.r[r+1];e<=s-1&&(this.r[t]=e,this.r[t+1]=s-1,t+=2),e=i+1}return this.len=t,e<=J.MAX_RUNE&&(this.r[this.len++]=e,this.r[this.len++]=J.MAX_RUNE),this}appendClassWithSign(e,t){return t<0?this.appendNegatedClass(e):this.appendClass(e)}appendGroup(e,t){let r=e.cls;return t&&(r=new Fi().appendFoldedClass(r).cleanClass().toArray()),this.appendClassWithSign(r,e.sign)}toString(){return Fi.charClassToString(this.r,this.len)}},fm=class{constructor(n){this.str=n,this.position=0}pos(){return this.position}rewindTo(n){this.position=n}more(){return this.position<this.str.length}peek(){return this.str.codePointAt(this.position)}skip(n){this.position+=n}skipString(n){this.position+=n.length}pop(){let n=this.str.codePointAt(this.position);return this.position+=q.charCount(n),n}lookingAt(n){return this.str.startsWith(n,this.position)}rest(){return this.str.substring(this.position)}from(n){return this.str.substring(n,this.position)}toString(){return this.rest()}},G,Bs=(G=class{static unicodeTable(e){return e==="Any"?{tab:G.ANY_TABLE,fold:G.ANY_TABLE,sign:1}:e==="Ascii"?{tab:G.ASCII_TABLE,fold:G.ASCII_FOLD_TABLE,sign:1}:e==="Assigned"?{tab:it.CATEGORIES.get("Cn"),fold:it.CATEGORIES.get("Cn"),sign:-1}:e==="Lc"?{tab:it.CATEGORIES.get("LC"),fold:it.FOLD_CATEGORIES.get("LC"),sign:1}:it.CATEGORIES.has(e)?{tab:it.CATEGORIES.get(e),fold:it.FOLD_CATEGORIES.get(e),sign:1}:it.SCRIPTS.has(e)?{tab:it.SCRIPTS.get(e),fold:it.FOLD_SCRIPT.get(e),sign:1}:null}static minFoldRune(e){if(e<J.MIN_FOLD||e>J.MAX_FOLD)return e;let t=e,r=e;for(e=J.simpleFold(e);e!==r;e=J.simpleFold(e))t>e&&(t=e);return t}static leadingRegexp(e){if(e.op===D.Op.EMPTY_MATCH)return null;if(e.op===D.Op.CONCAT&&e.subs.length>0){let t=e.subs[0];return t.op===D.Op.EMPTY_MATCH?null:t}return e}static literalRegexp(e,t){let r=new D(D.Op.LITERAL);return r.flags=t,r.runes=q.stringToRunes(e),r}static parse(e,t){return new G(e,t).parseInternal()}static parseRepeat(e){let t=e.pos();if(!e.more()||!e.lookingAt("{"))return-1;e.skip(1);let r=G.parseInt(e);if(r===-1||!e.more())return-1;let s;if(!e.lookingAt(","))s=r;else{if(e.skip(1),!e.more())return-1;if(e.lookingAt("}"))s=-1;else if((s=G.parseInt(e))===-1)return-1}if(!e.more()||!e.lookingAt("}"))return-1;if(e.skip(1),r<0||r>1e3||s===-2||s>1e3||s>=0&&r>s)throw new pe(G.ERR_INVALID_REPEAT_SIZE,e.from(t));return r<<16|s&J.MAX_BMP}static isValidCaptureName(e){if(e.length===0)return!1;for(let t=0;t<e.length;t++){let r=e.codePointAt(t);if(r!==x.CODES._&&!q.isalnum(r))return!1}return!0}static parseInt(e){let t=e.pos();for(;e.more()&&e.peek()>=x.CODES[0]&&e.peek()<=x.CODES[9];)e.skip(1);let r=e.from(t);return r.length===0||r.length>1&&r.codePointAt(0)===x.CODES[0]?-1:r.length>8?-2:parseInt(r,10)}static isCharClass(e){return e.op===D.Op.LITERAL&&e.runes.length===1||e.op===D.Op.CHAR_CLASS||e.op===D.Op.ANY_CHAR_NOT_NL||e.op===D.Op.ANY_CHAR}static matchRune(e,t){switch(e.op){case D.Op.LITERAL:return e.runes.length===1&&e.runes[0]===t;case D.Op.CHAR_CLASS:for(let r=0;r<e.runes.length;r+=2)if(e.runes[r]<=t&&t<=e.runes[r+1])return!0;return!1;case D.Op.ANY_CHAR_NOT_NL:return t!==x.CODES[`
`];case D.Op.ANY_CHAR:return!0}return!1}static mergeCharClass(e,t){switch(e.op){case D.Op.ANY_CHAR:break;case D.Op.ANY_CHAR_NOT_NL:G.matchRune(t,x.CODES[`
`])&&(e.op=D.Op.ANY_CHAR);break;case D.Op.CHAR_CLASS:{let r=new Rn(Array.isArray(e.runes)?e.runes:Array.from(e.runes));t.op===D.Op.LITERAL?r.appendLiteral(t.runes[0],t.flags):r.appendClass(t.runes),e.runes=r.toGrowableArray();break}case D.Op.LITERAL:if(t.runes[0]===e.runes[0]&&t.flags===e.flags)break;e.op=D.Op.CHAR_CLASS,e.runes=new Rn().appendLiteral(e.runes[0],e.flags).appendLiteral(t.runes[0],t.flags).toGrowableArray()}}static parseEscape(e){let t=e.pos();if(e.skip(1),!e.more())throw new pe(G.ERR_TRAILING_BACKSLASH);let r=e.pop();e:switch(r){case x.CODES[1]:case x.CODES[2]:case x.CODES[3]:case x.CODES[4]:case x.CODES[5]:case x.CODES[6]:case x.CODES[7]:if(!e.more()||e.peek()<x.CODES[0]||e.peek()>x.CODES[7])break;case x.CODES[0]:{let s=r-x.CODES[0];for(let i=1;i<3&&!(!e.more()||e.peek()<x.CODES[0]||e.peek()>x.CODES[7]);i++)s=s*8+e.peek()-x.CODES[0],e.skip(1);return s}case x.CODES.x:{if(!e.more())break;if(r=e.pop(),r===x.CODES["{"]){let a=0,u=0;for(;;){if(!e.more())break e;if(r=e.pop(),r===x.CODES["}"])break;let c=q.unhex(r);if(c<0||(u=u*16+c,u>J.MAX_RUNE))break e;a++}if(a===0)break e;return u}let s=q.unhex(r);if(!e.more())break;r=e.pop();let i=q.unhex(r);if(s<0||i<0)break;return s*16+i}case x.CODES.a:return x.CODES["\x07"];case x.CODES.f:return x.CODES["\f"];case x.CODES.n:return x.CODES[`
`];case x.CODES.r:return x.CODES["\r"];case x.CODES.t:return x.CODES["	"];case x.CODES.v:return x.CODES["\v"];default:if(r<=J.MAX_ASCII&&!q.isalnum(r))return r}throw new pe(G.ERR_INVALID_ESCAPE,e.from(t))}static parseClassChar(e,t){if(!e.more())throw new pe(G.ERR_MISSING_BRACKET,e.from(t));return e.lookingAt("\\")?G.parseEscape(e):e.pop()}static hasCapture(e){if(e===null)return!1;if(e.op===D.Op.CAPTURE)return!0;if(e.subs){for(let t of e.subs)if(G.hasCapture(t))return!0}return!1}constructor(e,t=0){this.wholeRegexp=e,this.flags=t,this.numCap=0,this.namedGroups=Object.create(null),this.stack=[],this.free=null,this.numRegexp=0,this.numRunes=0,this.repeats=0,this.height=null,this.size=null,this.nlb=0}newRegexp(e){let t=this.free;return t!==null&&t.subs!==null&&t.subs.length>0?(this.free=t.subs[0],t.reinit(),t.op=e):(t=new D(e),this.numRegexp+=1),t}reuse(e){this.height!==null&&this.height.has(e)&&this.height.delete(e),e.subs!==null&&e.subs.length>0&&(e.subs[0]=this.free),this.free=e}checkLimits(e){if(this.numRunes>G.MAX_RUNES)throw new pe(G.ERR_LARGE);this.checkSize(e),this.checkHeight(e)}checkSize(e){if(this.size===null){if(this.repeats===0&&(this.repeats=1),e.op===D.Op.REPEAT){let t=e.max;t===-1&&(t=e.min),t<=0&&(t=1),t>Math.floor(G.MAX_SIZE/this.repeats)?this.repeats=G.MAX_SIZE:this.repeats*=t}if(this.numRegexp<Math.floor(G.MAX_SIZE/this.repeats))return;this.size=new Map;for(let t of this.stack)this.checkSize(t)}if(this.calcSize(e,!0)>G.MAX_SIZE)throw new pe(G.ERR_LARGE)}calcSize(e,t=!1){if(!t&&this.size!==null&&this.size.has(e))return this.size.get(e);let r=0;switch(e.op){case D.Op.LITERAL:r=e.runes.length;break;case D.Op.PLB:case D.Op.NLB:case D.Op.CAPTURE:case D.Op.STAR:r=2+this.calcSize(e.subs[0]);break;case D.Op.PLUS:case D.Op.QUEST:r=1+this.calcSize(e.subs[0]);break;case D.Op.CONCAT:for(let s of e.subs)r=r+this.calcSize(s);break;case D.Op.ALTERNATE:for(let s of e.subs)r=r+this.calcSize(s);e.subs.length>1&&(r=r+e.subs.length-1);break;case D.Op.REPEAT:{let s=this.calcSize(e.subs[0]);if(e.max===-1){e.min===0?r=2+s:r=1+e.min*s;break}r=e.max*s+(e.max-e.min);break}}return r=Math.max(1,r),this.size===null&&(this.size=new Map),this.size.set(e,r),r}checkHeight(e){if(!(this.numRegexp<G.MAX_HEIGHT)){if(this.height===null){this.height=new Map;for(let t of this.stack)this.checkHeight(t)}if(this.calcHeight(e,!0)>G.MAX_HEIGHT)throw new pe(G.ERR_NESTING_DEPTH)}}calcHeight(e,t=!1){if(!t&&this.height!==null&&this.height.has(e))return this.height.get(e);let r=1;for(let s of e.subs){let i=this.calcHeight(s);r<1+i&&(r=1+i)}return this.height===null&&(this.height=new Map),this.height.set(e,r),r}pop(){return this.stack.pop()}popToPseudo(){let e=this.stack.length,t=e;for(;t>0&&!D.isPseudoOp(this.stack[t-1].op);)t--;return this.stack.splice(t,e-t)}push(e){if(this.numRunes+=e.runes.length,e.op===D.Op.CHAR_CLASS&&e.runes.length===2&&e.runes[0]===e.runes[1]){if(this.maybeConcat(e.runes[0],this.flags&~F.FOLD_CASE))return null;e.op=D.Op.LITERAL,e.runes=[e.runes[0]],e.flags=this.flags&~F.FOLD_CASE}else if(e.op===D.Op.CHAR_CLASS&&e.runes.length===4&&e.runes[0]===e.runes[1]&&e.runes[2]===e.runes[3]&&J.simpleFold(e.runes[0])===e.runes[2]&&J.simpleFold(e.runes[2])===e.runes[0]||e.op===D.Op.CHAR_CLASS&&e.runes.length===2&&e.runes[0]+1===e.runes[1]&&J.simpleFold(e.runes[0])===e.runes[1]&&J.simpleFold(e.runes[1])===e.runes[0]){if(this.maybeConcat(e.runes[0],this.flags|F.FOLD_CASE))return null;e.op=D.Op.LITERAL,e.runes=[e.runes[0]],e.flags=this.flags|F.FOLD_CASE}else this.maybeConcat(-1,0);return this.stack.push(e),this.checkLimits(e),e}maybeConcat(e,t){let r=this.stack.length;if(r<2)return!1;let s=this.stack[r-1],i=this.stack[r-2];if(s.op!==D.Op.LITERAL||i.op!==D.Op.LITERAL||(s.flags&F.FOLD_CASE)!==(i.flags&F.FOLD_CASE))return!1;Array.isArray(i.runes)||(i.runes=Array.from(i.runes));for(let a=0;a<s.runes.length;a++)i.runes.push(s.runes[a]);return e>=0?(s.runes=[e],s.flags=t,!0):(this.pop(),this.reuse(s),!1)}newLiteral(e,t){let r=this.newRegexp(D.Op.LITERAL);return r.flags=t,t&F.FOLD_CASE&&(e=G.minFoldRune(e)),r.runes=[e],r}literal(e){this.push(this.newLiteral(e,this.flags))}op(e){let t=this.newRegexp(e);return t.flags=this.flags,this.push(t)}repeat(e,t,r,s,i,a){let u=this.flags;if(u&F.PERL_X&&(i.more()&&i.lookingAt("?")&&(i.skip(1),u^=F.NON_GREEDY),a!==-1))throw new pe(G.ERR_INVALID_REPEAT_OP,i.from(a));let c=this.stack.length;if(c===0)throw new pe(G.ERR_MISSING_REPEAT_ARGUMENT,i.from(s));let l=this.stack[c-1];if(D.isPseudoOp(l.op))throw new pe(G.ERR_MISSING_REPEAT_ARGUMENT,i.from(s));let f=this.newRegexp(e);if(f.min=t,f.max=r,f.flags=u,f.subs=[l],this.stack[c-1]=f,this.checkLimits(f),e===D.Op.REPEAT&&(t>=2||r>=2)&&!this.repeatIsValid(f,1e3))throw new pe(G.ERR_INVALID_REPEAT_SIZE,i.from(s))}repeatIsValid(e,t){if(e.op===D.Op.REPEAT){let r=e.max;if(r===0)return!0;if(r<0&&(r=e.min),r>t)return!1;r>0&&(t=Math.trunc(t/r))}for(let r of e.subs)if(!this.repeatIsValid(r,t))return!1;return!0}concat(){this.maybeConcat(-1,0);let e=this.popToPseudo();return e.length===0?this.push(this.newRegexp(D.Op.EMPTY_MATCH)):this.push(this.collapse(e,D.Op.CONCAT))}alternate(){let e=this.popToPseudo();return e.length>0&&this.cleanAlt(e[e.length-1]),e.length===0?this.push(this.newRegexp(D.Op.NO_MATCH)):this.push(this.collapse(e,D.Op.ALTERNATE))}cleanAlt(e){e.op===D.Op.CHAR_CLASS&&(e.runes=new Rn(Array.from(e.runes)).cleanClass().toArray(),e.runes.length===2&&e.runes[0]===0&&e.runes[1]===J.MAX_RUNE?(e.runes=new Int32Array(0),e.op=D.Op.ANY_CHAR):e.runes.length===4&&e.runes[0]===0&&e.runes[1]===x.CODES[`
`]-1&&e.runes[2]===x.CODES[`
`]+1&&e.runes[3]===J.MAX_RUNE&&(e.runes=new Int32Array(0),e.op=D.Op.ANY_CHAR_NOT_NL))}collapse(e,t){if(e.length===1)return e[0];let r=0;for(let u of e)r+=u.op===t?u.subs.length:1;let s=new Array(r).fill(null),i=0;for(let u of e)if(u.op===t){for(let c=0;c<u.subs.length;c++)s[i++]=u.subs[c];this.reuse(u)}else s[i++]=u;let a=this.newRegexp(t);if(a.subs=s,t===D.Op.ALTERNATE&&(a.subs=this.factor(a.subs),a.subs.length===1)){let u=a;a=a.subs[0],this.reuse(u)}return a}factor(e){if(e.length<2)return e;let t=0,r=e.length,s=0,i=null,a=0,u=0,c=0;for(let f=0;f<=r;f++){let d=null,y=0,R=0;if(f<r){let v=e[t+f];if(v.op===D.Op.CONCAT&&v.subs.length>0&&(v=v.subs[0]),v.op===D.Op.LITERAL&&(d=v.runes,y=v.runes.length,R=v.flags&F.FOLD_CASE),R===u){let L=0;for(;L<a&&L<y&&i[L]===d[L];)L++;if(L>0){a=L;continue}}}if(f!==c)if(f===c+1)e[s++]=e[t+c];else{let v=this.newRegexp(D.Op.LITERAL);v.flags=u,v.runes=i.slice(0,a);for(let z=c;z<f;z++)e[t+z]=this.removeLeadingString(e[t+z],a),this.checkLimits(e[t+z]);let L=this.collapse(e.slice(t+c,t+f),D.Op.ALTERNATE),j=this.newRegexp(D.Op.CONCAT);j.subs=[v,L],e[s++]=j}c=f,i=d,a=y,u=R}r=s,t=0,c=0,s=0;let l=null;for(let f=0;f<=r;f++){let d=null;if(!(f<r&&(d=G.leadingRegexp(e[t+f]),l!==null&&l.equals(d)&&(G.isCharClass(l)||l.op===D.Op.REPEAT&&l.min===l.max&&G.isCharClass(l.subs[0]))))){if(f!==c)if(f===c+1)e[s++]=e[t+c];else{let y=l;for(let L=c;L<f;L++){let j=L!==c;e[t+L]=this.removeLeadingRegexp(e[t+L],j),this.checkLimits(e[t+L])}let R=this.collapse(e.slice(t+c,t+f),D.Op.ALTERNATE),v=this.newRegexp(D.Op.CONCAT);v.subs=[y,R],e[s++]=v}c=f,l=d}}r=s,t=0,c=0,s=0;for(let f=0;f<=r;f++)if(!(f<r&&G.isCharClass(e[t+f]))){if(f!==c)if(f===c+1)e[s++]=e[t+c];else{let d=c;for(let R=c+1;R<f;R++){let v=e[t+d],L=e[t+R];(v.op<L.op||v.op===L.op&&(v.runes!==null?v.runes.length:0)<(L.runes!==null?L.runes.length:0))&&(d=R)}let y=e[t+c];e[t+c]=e[t+d],e[t+d]=y;for(let R=c+1;R<f;R++)G.mergeCharClass(e[t+c],e[t+R]),this.reuse(e[t+R]);this.cleanAlt(e[t+c]),e[s++]=e[t+c]}f<r&&(e[s++]=e[t+f]),c=f+1}r=s,t=0,c=0,s=0;for(let f=0;f<r;++f)f+1<r&&e[t+f].op===D.Op.EMPTY_MATCH&&e[t+f+1].op===D.Op.EMPTY_MATCH||(e[s++]=e[t+f]);return r=s,t=0,e.slice(t,r)}removeLeadingString(e,t){if(e.op===D.Op.CONCAT&&e.subs.length>0){let r=this.removeLeadingString(e.subs[0],t);if(e.subs[0]=r,r.op===D.Op.EMPTY_MATCH)switch(this.reuse(r),e.subs.length){case 0:case 1:e.op=D.Op.EMPTY_MATCH,e.subs=D.emptySubs();break;case 2:{let s=e;e=e.subs[1],this.reuse(s);break}default:e.subs=e.subs.slice(1,e.subs.length)}return e}return e.op===D.Op.LITERAL&&(e.runes=e.runes.slice(t,e.runes.length),e.runes.length===0&&(e.op=D.Op.EMPTY_MATCH)),e}removeLeadingRegexp(e,t){if(e.op===D.Op.CONCAT&&e.subs.length>0){switch(t&&this.reuse(e.subs[0]),e.subs=e.subs.slice(1,e.subs.length),e.subs.length){case 0:e.op=D.Op.EMPTY_MATCH,e.subs=D.emptySubs();break;case 1:{let r=e;e=e.subs[0],this.reuse(r);break}}return e}return t&&this.reuse(e),this.newRegexp(D.Op.EMPTY_MATCH)}parseInternal(){if(this.flags&F.LITERAL)return G.literalRegexp(this.wholeRegexp,this.flags);let e=-1,t=-1,r=-1,s=new fm(this.wholeRegexp);for(;s.more();){let i=-1;e:switch(s.peek()){case x.CODES["("]:if(this.flags&F.LOOKBEHIND){if(s.lookingAt("(?<=")){this.parsePosLookBehind(),s.skip(4);break}if(s.lookingAt("(?<!")){this.parseNegLookBehind(),s.skip(4);break}}if(this.flags&F.PERL_X&&s.lookingAt("(?")){this.parsePerlFlags(s);break}this.op(D.Op.LEFT_PAREN).cap=++this.numCap,s.skip(1);break;case x.CODES["|"]:this.parseVerticalBar(),s.skip(1);break;case x.CODES[")"]:this.parseRightParen(),s.skip(1);break;case x.CODES["^"]:this.flags&F.ONE_LINE?this.op(D.Op.BEGIN_TEXT):this.op(D.Op.BEGIN_LINE),s.skip(1);break;case x.CODES.$:this.flags&F.ONE_LINE?this.op(D.Op.END_TEXT).flags|=F.WAS_DOLLAR:this.op(D.Op.END_LINE),s.skip(1);break;case x.CODES["."]:this.flags&F.DOT_NL?this.op(D.Op.ANY_CHAR):this.op(D.Op.ANY_CHAR_NOT_NL),s.skip(1);break;case x.CODES["["]:this.parseClass(s);break;case x.CODES["*"]:case x.CODES["+"]:case x.CODES["?"]:{i=s.pos();let a=null;switch(s.pop()){case x.CODES["*"]:a=D.Op.STAR;break;case x.CODES["+"]:a=D.Op.PLUS;break;case x.CODES["?"]:a=D.Op.QUEST}this.repeat(a,t,r,i,s,e);break}case x.CODES["{"]:{let a=s.pos(),u=G.parseRepeat(s);if(u<0){s.rewindTo(a),this.literal(s.pop());break}i=a,t=u>>16,r=(u&J.MAX_BMP)<<16>>16,this.repeat(D.Op.REPEAT,t,r,i,s,e);break}case x.CODES["\\"]:{let a=s.pos();if(s.skip(1),this.flags&F.PERL_X&&s.more())switch(s.pop()){case x.CODES.A:this.op(D.Op.BEGIN_TEXT);break e;case x.CODES.b:this.op(D.Op.WORD_BOUNDARY);break e;case x.CODES.B:this.op(D.Op.NO_WORD_BOUNDARY);break e;case x.CODES.C:throw new pe(G.ERR_INVALID_ESCAPE,"\\C");case x.CODES.Q:{let l=s.rest(),f=l.indexOf("\\E");f>=0?(l=l.substring(0,f),s.skipString(l),s.skipString("\\E")):s.skipString(l);let d=0;for(;d<l.length;){let y=l.codePointAt(d);this.literal(y),d+=q.charCount(y)}break e}case x.CODES.z:this.op(D.Op.END_TEXT);break e;default:s.rewindTo(a)}else s.rewindTo(a);let u=this.newRegexp(D.Op.CHAR_CLASS);if(u.flags=this.flags,s.lookingAt("\\p")||s.lookingAt("\\P")){let l=new Rn;if(this.parseUnicodeClass(s,l)){u.runes=l.toArray(),this.push(u);break e}}let c=new Rn;if(this.parsePerlClassEscape(s,c)){u.runes=c.toArray(),this.push(u);break e}s.rewindTo(a),this.reuse(u),this.literal(G.parseEscape(s));break}default:this.literal(s.pop())}e=i}if(this.concat(),this.swapVerticalBar()&&this.pop(),this.alternate(),this.stack.length!==1)throw new pe(G.ERR_MISSING_PAREN,this.wholeRegexp);return this.stack[0].namedGroups=this.namedGroups,this.stack[0]}parsePerlFlags(e){let t=e.pos(),r=e.rest();if(r.startsWith("(?P<")||r.startsWith("(?<")){let u=r.charAt(2)==="P"?4:3,c=r.indexOf(">");if(c<0)throw new pe(G.ERR_INVALID_NAMED_CAPTURE,r);let l=r.substring(u,c);if(e.skipString(l),e.skip(u+1),!G.isValidCaptureName(l))throw new pe(G.ERR_INVALID_NAMED_CAPTURE,r.substring(0,c+1));let f=this.op(D.Op.LEFT_PAREN);if(f.cap=++this.numCap,this.namedGroups[l])throw new pe(G.ERR_DUPLICATE_NAMED_CAPTURE,l);this.namedGroups[l]=this.numCap,f.name=l;return}e.skip(2);let s=this.flags,i=1,a=!1;e:for(;e.more();){let u=e.pop();switch(u){case x.CODES.i:s|=F.FOLD_CASE,a=!0;break;case x.CODES.m:s&=~F.ONE_LINE,a=!0;break;case x.CODES.s:s|=F.DOT_NL,a=!0;break;case x.CODES.U:s|=F.NON_GREEDY,a=!0;break;case x.CODES["-"]:if(i<0)break e;i=-1,s=~s,a=!1;break;case x.CODES[":"]:case x.CODES[")"]:if(i<0){if(!a)break e;s=~s}u===x.CODES[":"]&&this.op(D.Op.LEFT_PAREN),this.flags=s;return;default:break e}}throw new pe(G.ERR_INVALID_PERL_OP,e.from(t))}parsePosLookBehind(){let e=this.newRegexp(D.Op.LEFT_PAREN);return e.flags=this.flags,e.lb=++this.nlb,this.push(e)}parseNegLookBehind(){let e=this.newRegexp(D.Op.LEFT_PAREN);return e.flags=this.flags,e.lb=-++this.nlb,this.push(e)}parseVerticalBar(){this.concat(),this.swapVerticalBar()||this.op(D.Op.VERTICAL_BAR)}swapVerticalBar(){let e=this.stack.length;if(e>=3&&this.stack[e-2].op===D.Op.VERTICAL_BAR&&G.isCharClass(this.stack[e-1])&&G.isCharClass(this.stack[e-3])){let t=this.stack[e-1],r=this.stack[e-3];if(t.op>r.op){let s=r;r=t,t=s,this.stack[e-3]=r}return G.mergeCharClass(r,t),this.reuse(t),this.pop(),!0}if(e>=2){let t=this.stack[e-1],r=this.stack[e-2];if(r.op===D.Op.VERTICAL_BAR)return e>=3&&this.cleanAlt(this.stack[e-3]),this.stack[e-2]=t,this.stack[e-1]=r,!0}return!1}parseRightParen(){if(this.concat(),this.swapVerticalBar()&&this.pop(),this.alternate(),this.stack.length<2)throw new pe(G.ERR_UNEXPECTED_PAREN,this.wholeRegexp);let e=this.pop(),t=this.pop();if(t.op!==D.Op.LEFT_PAREN)throw new pe(G.ERR_UNEXPECTED_PAREN,this.wholeRegexp);if(this.flags=t.flags,t.lb!==0){if(G.hasCapture(e))throw new pe(G.ERR_INVALID_CAPTURE_IN_LOOKBEHIND,this.wholeRegexp);t.lb>0?t.op=D.Op.PLB:t.op=D.Op.NLB,t.subs=[e],this.push(t);return}t.cap===0?this.push(e):(t.op=D.Op.CAPTURE,t.subs=[e],this.push(t))}parsePerlClassEscape(e,t){let r=e.pos();if(!(this.flags&F.PERL_X)||!e.more()||e.pop()!==x.CODES["\\"]||!e.more())return!1;e.pop();let s=e.from(r),i=zh.has(s)?zh.get(s):null;return i===null?!1:(t.appendGroup(i,(this.flags&F.FOLD_CASE)!==0),!0)}parseNamedClass(e,t){let r=e.rest(),s=r.indexOf(":]");if(s<0)return!1;let i=r.substring(0,s+2);e.skipString(i);let a=cf.has(i)?cf.get(i):null;if(a===null)throw new pe(G.ERR_INVALID_CHAR_RANGE,i);return t.appendGroup(a,(this.flags&F.FOLD_CASE)!==0),!0}parseUnicodeClass(e,t){let r=e.pos();if(!(this.flags&F.UNICODE_GROUPS)||!e.lookingAt("\\p")&&!e.lookingAt("\\P"))return!1;e.skip(1);let s=1,i=e.pop();if(i===x.CODES.P&&(s=-1),!e.more())throw e.rewindTo(r),new pe(G.ERR_INVALID_CHAR_RANGE,e.rest());i=e.pop();let a;if(i!==x.CODES["{"])a=q.runeToString(i);else{let f=e.rest(),d=f.indexOf("}");if(d<0)throw e.rewindTo(r),new pe(G.ERR_INVALID_CHAR_RANGE,e.rest());a=f.substring(0,d),e.skipString(a),e.skip(1)}a.length!==0&&a.codePointAt(0)===x.CODES["^"]&&(s=0-s,a=a.substring(1));let u=G.unicodeTable(a);if(u===null)throw new pe(G.ERR_INVALID_CHAR_RANGE,e.from(r));u.sign<0&&(s=0-s);let c=u.tab,l=u.fold;if(!(this.flags&F.FOLD_CASE)||l===null)t.appendTableWithSign(c,s);else{let f=new Rn().appendTable(c).appendTable(l).cleanClass().toArray();t.appendClassWithSign(Array.from(f),s)}return!0}parseClass(e){let t=e.pos();e.skip(1);let r=this.newRegexp(D.Op.CHAR_CLASS);r.flags=this.flags;let s=new Rn,i=1;e.more()&&e.lookingAt("^")&&(i=-1,e.skip(1),this.flags&F.CLASS_NL||s.appendRange(x.CODES[`
`],x.CODES[`
`]));let a=!0;for(;!e.more()||e.peek()!==x.CODES["]"]||a;){if(e.more()&&e.lookingAt("-")&&!(this.flags&F.PERL_X)&&!a){let f=e.rest();if(f==="-"||!f.startsWith("-]"))throw e.rewindTo(t),new pe(G.ERR_INVALID_CHAR_RANGE,e.rest())}a=!1;let u=e.pos();if(e.lookingAt("[:")){if(this.parseNamedClass(e,s))continue;e.rewindTo(u)}if(this.parseUnicodeClass(e,s)||this.parsePerlClassEscape(e,s))continue;e.rewindTo(u);let c=G.parseClassChar(e,t),l=c;if(e.more()&&e.lookingAt("-")){if(e.skip(1),e.more()&&e.lookingAt("]"))e.skip(-1);else if(l=G.parseClassChar(e,t),l<c)throw new pe(G.ERR_INVALID_CHAR_RANGE,e.from(u))}this.flags&F.FOLD_CASE?s.appendFoldedRange(c,l):s.appendRange(c,l)}e.skip(1),s.cleanClass(),i<0&&s.negateClass(),r.runes=s.toArray(),this.push(r)}},k(G,"ERR_INTERNAL_ERROR","regexp/syntax: internal error"),k(G,"ERR_INVALID_CHAR_RANGE","invalid character class range"),k(G,"ERR_INVALID_ESCAPE","invalid escape sequence"),k(G,"ERR_INVALID_NAMED_CAPTURE","invalid named capture"),k(G,"ERR_INVALID_PERL_OP","invalid or unsupported Perl syntax"),k(G,"ERR_INVALID_REPEAT_OP","invalid nested repetition operator"),k(G,"ERR_INVALID_REPEAT_SIZE","invalid repeat count"),k(G,"ERR_MISSING_BRACKET","missing closing ]"),k(G,"ERR_MISSING_PAREN","missing closing )"),k(G,"ERR_MISSING_REPEAT_ARGUMENT","missing argument to repetition operator"),k(G,"ERR_TRAILING_BACKSLASH","trailing backslash at end of expression"),k(G,"ERR_DUPLICATE_NAMED_CAPTURE","duplicate capture group name"),k(G,"ERR_UNEXPECTED_PAREN","unexpected )"),k(G,"ERR_NESTING_DEPTH","expression nests too deeply"),k(G,"ERR_LARGE","expression too large"),k(G,"ERR_INVALID_CAPTURE_IN_LOOKBEHIND","invalid capture in lookbehind"),k(G,"MAX_HEIGHT",1e3),k(G,"MAX_SIZE",1398101),k(G,"MAX_RUNES",33554432),k(G,"ANY_TABLE",new p(new Uint32Array([0,J.MAX_RUNE,1]))),k(G,"ASCII_TABLE",new p(new Uint32Array([0,127,1]))),k(G,"ASCII_FOLD_TABLE",new p(new Uint32Array([0,127,1,383,383,1,8490,8490,1]))),G),dm=class Sn{static initTest(e){let t=Sn.compile(e),r=new Sn(t.expr,t.prog,t.numSubexp,t.longest);return r.cond=t.cond,r.prefix=t.prefix,r.prefixUTF8=t.prefixUTF8,r.prefixComplete=t.prefixComplete,r.prefixRune=t.prefixRune,r.prefilter=t.prefilter,r.namedGroups=t.namedGroups,r}static compile(e){return Sn.compileImpl(e,F.PERL,!1)}static compilePOSIX(e){return Sn.compileImpl(e,F.POSIX,!0)}static compileImpl(e,t,r){let s=Bs.parse(e,t),i=s.maxCap(),a=s.namedGroups;s=_f.simplify(s);let u=Bm.build(s),c=Ef.compileRegexp(s),l=new Sn(e,c,i,r);l.prefilter=u.type===se.Type.NONE?null:u;let[f,d]=c.prefix();return l.prefixComplete=f,l.prefix=d,l.prefixUTF8=q.stringToUtf8ByteArray(l.prefix),l.prefix.length>0&&(l.prefixRune=l.prefix.codePointAt(0)),l.namedGroups=a,l}static match(e,t){return Sn.compile(e).match(t)}constructor(e,t,r=0,s=0){this.expr=e,this.prog=t,this.numSubexp=r,this.longest=s,this.cond=t.startCond(),this.prefix=null,this.prefixUTF8=null,this.prefixComplete=!1,this.prefixRune=0,this.namedGroups=Object.create(null),this.machinePool=[],this.lazyDFA=null,this.onepass=Hh.compile(this.prog),this.prefilter=null}get dfa(){return this.lazyDFA===null&&(this.lazyDFA=new ja(this.prog)),this.lazyDFA}matchPrefixComplete(e,t,r,s){if((r===F.ANCHOR_START||r===F.ANCHOR_BOTH)&&t!==0)return null;let i=-1,a=-1,u=e.prefixLength(this);if(r===F.UNANCHORED){let c=e.index(this,t);if(c<0)return null;i=t+c,a=i+u}else if(r===F.ANCHOR_BOTH){if(e.endPos()!==u||e.index(this,0)!==0)return null;i=0,a=u}else if(r===F.ANCHOR_START){if(e.index(this,0)!==0)return null;i=0,a=u}if(i<0)return null;if(s>0){let c=new Int32Array(s).fill(-1);return c[0]=i,c[1]=a,Array.from(c)}return[]}createLookbehindState(){return this.prog.numLb>0?new Zg(this.prog):null}executeEngine(e,t,r,s,i=null){if(this.prefixComplete&&(s===0||this.numSubexp===0))return this.matchPrefixComplete(e,t,r,s);if(this.prefilter!==null&&r===F.UNANCHORED&&!this.prefilter.eval(e,t))return null;if(this.onepass!==null)return Hh.execute(this,e,t,r,s);if(s>0)return this.prog.numLb===0&&e.endPos()<=Ni.maxBitStateLen(this.prog)?Ni.execute(this,e,t,r,s):this.doExecuteNFA(e,t,r,s,i);if(this.prog.numLb===0){let a=this.dfa.match(e,t,r);if(a!==null)return a?[]:null;if(e.endPos()<=Ni.maxBitStateLen(this.prog))return Ni.execute(this,e,t,r,s)}return this.doExecuteNFA(e,t,r,s,i)}numberOfCapturingGroups(){return this.numSubexp}numberOfInstructions(){return this.prog.numInst()}get(){return this.machinePool.length>0?this.machinePool.pop():null}reset(){this.machinePool.length=0}put(e){this.machinePool.push(e)}toString(){return this.expr}doExecuteNFA(e,t,r,s,i=null){let a=this.get();a||(a=Cf.fromRE2(this)),a.init(s);let u=a.match(e,t,r,i)?a.submatches():null;return this.put(a),u}match(e){return this.executeEngine(de.fromUTF16(e),0,F.UNANCHORED,0)!==null}matchWithGroup(e,t,r,s,i,a=null){return e instanceof Pn||(q.isByteArray(e)?e=vn.utf8(e):e=vn.utf16(e)),this.matchMachineInput(e,t,r,s,i,a)}matchMachineInput(e,t,r,s,i,a=null){if(t>r)return[!1,null];let u=e.isUTF16Encoding()?de.fromUTF16(e.asCharSequence(),0,r):de.fromUTF8(e.asBytes(),0,r),c=this.executeEngine(u,t,s,2*i,a);return c===null?[!1,null]:[!0,c]}matchUTF8(e){return this.executeEngine(de.fromUTF8(e),0,F.UNANCHORED,0)!==null}replaceAll(e,t){return this.replaceAllFunc(e,()=>t,2*e.length+1)}replaceFirst(e,t){return this.replaceAllFunc(e,()=>t,1)}replaceAllFunc(e,t,r){let s=0,i=0,a="",u=de.fromUTF16(e),c=this.createLookbehindState(),l=0;for(;i<=e.length;){let f=this.executeEngine(u,i,F.UNANCHORED,2,c);if(f===null||f.length===0)break;a+=e.substring(s,f[0]),(f[1]>s||f[0]===0)&&(a+=t(e.substring(f[0],f[1])),l++),s=f[1];let d=u.step(i)&7;if(i+d>f[1]?i+=d:i+1>f[1]?i++:i=f[1],l>=r)break}return a+=e.substring(s),a}pad(e){if(e===null)return null;let t=(1+this.numSubexp)*2;if(e.length<t){let r=new Array(t).fill(-1);for(let s=0;s<e.length;s++)r[s]=e[s];e=r}return e}allMatches(e,t,r=s=>s){let s=[],i=e.endPos();t<0&&(t=i+1);let a=0,u=0,c=-1,l=this.createLookbehindState();for(;u<t&&a<=i;){let f=this.executeEngine(e,a,F.UNANCHORED,this.prog.numCap,l);if(f===null||f.length===0)break;let d=!0;if(f[1]===a){f[0]===c&&(d=!1);let y=e.step(a);y<0?a=i+1:a+=y&7}else a=f[1];c=f[1],d&&(s.push(r(this.pad(f))),u++)}return s}findUTF8(e){let t=this.executeEngine(de.fromUTF8(e),0,F.UNANCHORED,2);return t===null?null:e.slice(t[0],t[1])}findUTF8Index(e){let t=this.executeEngine(de.fromUTF8(e),0,F.UNANCHORED,2);return t===null?null:t.slice(0,2)}find(e){let t=this.executeEngine(de.fromUTF16(e),0,F.UNANCHORED,2);return t===null?"":e.substring(t[0],t[1])}findIndex(e){return this.executeEngine(de.fromUTF16(e),0,F.UNANCHORED,2)}findUTF8Submatch(e){let t=this.executeEngine(de.fromUTF8(e),0,F.UNANCHORED,this.prog.numCap);if(t===null)return null;let r=new Array(1+this.numSubexp).fill(null);for(let s=0;s<r.length;s++)2*s<t.length&&t[2*s]>=0&&(r[s]=e.slice(t[2*s],t[2*s+1]));return r}findUTF8SubmatchIndex(e){return this.pad(this.executeEngine(de.fromUTF8(e),0,F.UNANCHORED,this.prog.numCap))}findSubmatch(e){let t=this.executeEngine(de.fromUTF16(e),0,F.UNANCHORED,this.prog.numCap);if(t===null)return null;let r=new Array(1+this.numSubexp).fill(null);for(let s=0;s<r.length;s++)2*s<t.length&&t[2*s]>=0&&(r[s]=e.substring(t[2*s],t[2*s+1]));return r}findSubmatchIndex(e){return this.pad(this.executeEngine(de.fromUTF16(e),0,F.UNANCHORED,this.prog.numCap))}findAllUTF8(e,t){let r=this.allMatches(de.fromUTF8(e),t,s=>e.slice(s[0],s[1]));return r.length===0?null:r}findAllUTF8Index(e,t){let r=this.allMatches(de.fromUTF8(e),t,s=>s.slice(0,2));return r.length===0?null:r}findAll(e,t){let r=this.allMatches(de.fromUTF16(e),t,s=>e.substring(s[0],s[1]));return r.length===0?null:r}findAllIndex(e,t){let r=this.allMatches(de.fromUTF16(e),t,s=>s.slice(0,2));return r.length===0?null:r}findAllUTF8Submatch(e,t){let r=this.allMatches(de.fromUTF8(e),t,s=>{let i=new Array(s.length/2|0).fill(null);for(let a=0;a<i.length;a++)s[2*a]>=0&&(i[a]=e.slice(s[2*a],s[2*a+1]));return i});return r.length===0?null:r}findAllUTF8SubmatchIndex(e,t){let r=this.allMatches(de.fromUTF8(e),t);return r.length===0?null:r}findAllSubmatch(e,t){let r=this.allMatches(de.fromUTF16(e),t,s=>{let i=new Array(s.length/2|0).fill(null);for(let a=0;a<i.length;a++)s[2*a]>=0&&(i[a]=e.substring(s[2*a],s[2*a+1]));return i});return r.length===0?null:r}findAllSubmatchIndex(e,t){let r=this.allMatches(de.fromUTF16(e),t);return r.length===0?null:r}},_t,MD=(_t=class{constructor(e=_t.UNANCHORED,t=0,r=8388608){this.anchor=e,this.jsFlags=t,this.maxMem=r;let s=F.PERL;t&Et.DISABLE_UNICODE_GROUPS&&(s&=~F.UNICODE_GROUPS),t&Et.LOOKBEHINDS&&(s|=F.LOOKBEHIND),this.re2Flags=s,this.regexps=[],this.prog=null,this.dfa=null,this.dummyRe2=null}add(e){if(this.prog)throw new ls("Cannot add patterns after compile");let t=e;this.jsFlags&Et.CASE_INSENSITIVE&&(t=`(?i)${t}`),this.jsFlags&Et.DOTALL&&(t=`(?s)${t}`),this.jsFlags&Et.MULTILINE&&(t=`(?m)${t}`);let r=Bs.parse(t,this.re2Flags);return this.regexps.push(_f.simplify(r)),this.regexps.length-1}compile(){if(this.prog)return;let e=Ef.compileSet(this.regexps);if(e.numInst()>Bs.MAX_SIZE)throw new ls(`${Bs.ERR_LARGE}: the set compiles to ${e.numInst()} instructions, more than ${Bs.MAX_SIZE}`);this.prog=e,this.dfa=new ja(this.prog,this.maxMem),this.dummyRe2={prog:this.prog,cond:this.prog.startCond(),prefix:"",prefixRune:0,longest:!1}}match(e){this.prog||this.compile();let t=q.isByteArray(e)?de.fromUTF8(e):de.fromUTF16(e),r=F.UNANCHORED;this.anchor===_t.ANCHOR_START?r=F.ANCHOR_START:this.anchor===_t.ANCHOR_BOTH&&(r=F.ANCHOR_BOTH);let s=this.dfa.matchSet(t,0,r);if(s!==null)return s;let i=Cf.fromRE2(this.dummyRe2);return i.init(0),i.matchSet(t,0,r)}},k(_t,"UNANCHORED",F.UNANCHORED),k(_t,"ANCHOR_START",F.ANCHOR_START),k(_t,"ANCHOR_BOTH",F.ANCHOR_BOTH),_t),Cm=class cr{static isHexadecimal(e){return"0"<=e&&e<="9"||"A"<=e&&e<="F"||"a"<=e&&e<="f"}static translate(e){let t="";if(e instanceof RegExp&&(e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.dotAll&&(t+="s"),e=e.source),typeof e!="string")return e;let r="",s=!1,i=e.length;i===0&&(r="(?:)",s=!0);let a=!1,u=0;for(;u<i;){let l=e[u];if(l==="\\"){if(u+1<i)switch(l=e[u+1],l){case"\\":r+="\\\\",u+=2;continue;case"c":if(u+2<i){let y=e[u+2].charCodeAt(0);if(y>=65&&y<=90||y>=97&&y<=122){let R=y%32;r+="\\x",r+=(R>>4).toString(16).toUpperCase(),r+=(R&15).toString(16).toUpperCase(),u+=3,s=!0;continue}}r+="c",u+=2,s=!0;continue;case"u":if(u+2<i){if(e[u+2]==="{"){let y=u+3,R=!1,v=!1;for(;y<i;){let L=e[y];if(L==="}"){v=!0;break}if(!cr.isHexadecimal(L))break;R=!0,y++}if(v&&R){r+="\\x",u+=2,s=!0;continue}}else if(u+5<i){let y=!0;for(let R=0;R<4;R++)if(!cr.isHexadecimal(e[u+2+R])){y=!1;break}if(y){r+="\\x{"+e.substring(u+2,u+6)+"}",u+=6,s=!0;continue}}}r+="u",u+=2,s=!0;continue;case"x":{let y=!1;if(u+2<i&&e[u+2]==="{"){let R=u+3,v=!1,L=!1;for(;R<i;){let j=e[R];if(j==="}"){L=!0;break}if(!cr.isHexadecimal(j))break;v=!0,R++}L&&v&&(y=!0)}else u+3<i&&cr.isHexadecimal(e[u+2])&&cr.isHexadecimal(e[u+3])&&(y=!0);y?(r+="\\x",u+=2):(r+="x",u+=2,s=!0);continue}case"n":case"r":case"t":case"a":case"f":case"v":case"d":case"D":case"s":case"S":case"w":case"W":case"b":case"B":case"p":case"P":case"A":case"z":case"Q":case"E":case"0":case"1":case"2":case"3":case"4":case"5":case"6":case"7":r+="\\"+l,u+=2;continue;default:{let y=e.codePointAt(u+1);if(y>=48&&y<=57||y>=65&&y<=90||y>=97&&y<=122){let R=q.charCount(y);r+=e.substring(u+1,u+1+R),u+=R+1,s=!0}else{r+="\\";let R=q.charCount(y);r+=e.substring(u+1,u+1+R),u+=R+1}continue}}}else if(l==="/"){r+="\\/",u+=1,s=!0;continue}else if(l==="["){if(!a&&e[u+1]==="]"){r+="[^\\x00-\\x{10FFFF}]",u+=2,s=!0;continue}if(!a&&e[u+1]==="^"&&e[u+2]==="]"){r+="[\\x00-\\x{10FFFF}]",u+=3,s=!0;continue}a=!0}else if(l==="]")a=!1;else if(!a&&l==="("&&u+2<i&&e[u+1]==="?"&&e[u+2]==="<"&&u+3<i&&!"=!>)".includes(e[u+3])){r+="(?P<",u+=3,s=!0;continue}let f=e.codePointAt(u),d=q.charCount(f);r+=e.substring(u,u+d),u+=d}let c=s?r:e;return t.length>0?`(?${t})${c}`:c}},Bf=(n,e)=>{let t=n.matchArray();return t.index=n.start(0),t.input=e,t.groups=n.namedGroupsObject(),t},ge,Li=(ge=class{static quote(e){return q.quoteMeta(e)}static quoteReplacement(e,t=!1){return Lh.quoteReplacement(e,t)}static translateRegExp(e){return Cm.translate(e)}static compile(e,t=0){let r=e;if(t&ge.CASE_INSENSITIVE&&(r=`(?i)${r}`),t&ge.DOTALL&&(r=`(?s)${r}`),t&ge.MULTILINE&&(r=`(?m)${r}`),t&~(ge.MULTILINE|ge.DOTALL|ge.CASE_INSENSITIVE|ge.DISABLE_UNICODE_GROUPS|ge.LONGEST_MATCH|ge.LOOKBEHINDS))throw new Xg("Flags should only be a combination of MULTILINE, DOTALL, CASE_INSENSITIVE, DISABLE_UNICODE_GROUPS, LONGEST_MATCH, LOOKBEHINDS");let s=F.PERL;t&ge.DISABLE_UNICODE_GROUPS&&(s&=~F.UNICODE_GROUPS),t&ge.LOOKBEHINDS&&(s|=F.LOOKBEHIND);let i=new ge(e,t);return i.re2Input=dm.compileImpl(r,s,(t&ge.LONGEST_MATCH)!==0),i}static matches(e,t){return ge.compile(e).testExact(t)}static initTest(e,t,r){if(e==null)throw new Error("pattern is null");if(r==null)throw new Error("re2 is null");let s=new ge(e,t);return s.re2Input=r,s}constructor(e,t){this.patternInput=e,this.flagsInput=t,this.re2Input=null}reset(){this.re2Input.reset()}flags(){return this.flagsInput}pattern(){return this.patternInput}re2(){return this.re2Input}matches(e){return this.testExact(e)}matcher(e){return q.isByteArray(e)&&(e=vn.utf8(e)),new Lh(this,e)}test(e){return q.isByteArray(e)?this.re2Input.matchUTF8(e):this.re2Input.match(e)}testExact(e){let t=q.isByteArray(e)?de.fromUTF8(e):de.fromUTF16(e);return this.re2Input.executeEngine(t,0,F.ANCHOR_BOTH,0)!==null}exec(e){let t=this.matcher(e);return t.find()?Bf(t,e):null}split(e,t=0){let r=this.matcher(e),s=[],i=0,a=0;for(;r.find();){if(a===0&&r.end()===0){a=r.end();continue}if(t>0&&s.length===t-1)break;if(a===r.start()){if(t===0){i+=1,a=r.end();continue}}else for(;i>0;)s.push(""),i-=1;s.push(r.substring(a,r.start())),a=r.end()}if(t===0&&a!==r.inputLength()){for(;i>0;)s.push(""),i-=1;s.push(r.substring(a,r.inputLength()))}return(t!==0||s.length===0&&!(a===r.inputLength()&&a>0))&&s.push(r.substring(a,r.inputLength())),s}*matchAll(e){let t=this.matcher(e);for(;t.find();)yield Bf(t,e)}toString(){return this.patternInput}programSize(){return this.re2Input.numberOfInstructions()}groupCount(){return this.re2Input.numberOfCapturingGroups()}namedGroups(){return this.re2Input.namedGroups}equals(e){return this===e?!0:e===null||this.constructor!==e.constructor?!1:this.flagsInput===e.flagsInput&&this.patternInput===e.patternInput}},k(ge,"CASE_INSENSITIVE",Et.CASE_INSENSITIVE),k(ge,"DOTALL",Et.DOTALL),k(ge,"MULTILINE",Et.MULTILINE),k(ge,"DISABLE_UNICODE_GROUPS",Et.DISABLE_UNICODE_GROUPS),k(ge,"LONGEST_MATCH",Et.LONGEST_MATCH),k(ge,"LOOKBEHINDS",Et.LOOKBEHINDS),ge);var Mr="12.19.0";function Xf(n){Mr=n}var Hn=new Zt("@firebase/firestore");function Br(){return Hn.logLevel}function Q(n,...e){if(Hn.logLevel<=ie.DEBUG){let t=e.map(IB);Hn.debug(`Firestore (${Mr}): ${n}`,...t)}}function Un(n,...e){if(Hn.logLevel<=ie.ERROR){let t=e.map(IB);Hn.error(`Firestore (${Mr}): ${n}`,...t)}}function Nt(n,...e){if(Hn.logLevel<=ie.WARN){let t=e.map(IB);Hn.warn(`Firestore (${Mr}): ${n}`,...t)}}function IB(n){if(typeof n=="string")return n;try{return function(t){return JSON.stringify(t)}(n)}catch{return n}}function ee(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,Zf(n,r,t)}function Zf(n,e,t){let r=`FIRESTORE (${Mr}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw Un(r),new Error(r)}function Y(n,e,t,r){let s="Unexpected state";typeof t=="string"?s=t:r=t,n||Zf(e,s,r)}function me(n,e){return n}function pm(n){let e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}var gr=class{static newId(){let e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516),r="";for(;r.length<20;){let s=pm(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%62))}return r}};function le(n,e){return n<e?-1:n>e?1:0}function Ya(n,e){let t=Math.min(n.length,e.length);for(let r=0;r<t;r++){let s=n.charAt(r),i=e.charAt(r);if(s!==i)return Ka(s)===Ka(i)?le(s,i):Ka(s)?1:-1}return le(n.length,e.length)}var gm=55296,mm=57343;function Ka(n){let e=n.charCodeAt(0);return e>=gm&&e<=mm}function mr(n,e,t){return n.length===e.length&&n.every((r,s)=>t(r,e[s]))}var ut=class n{constructor(e,t){this.comparator=e,this.root=t||Ot.EMPTY}insert(e,t){return new n(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Ot.BLACK,null,null))}remove(e){return new n(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Ot.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){let r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){let s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){let e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new fr(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new fr(this.root,e,this.comparator,!1)}getReverseIterator(){return new fr(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new fr(this.root,e,this.comparator,!0)}},fr=class{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop(),t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;let e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}},Ot=class n{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??n.RED,this.left=s??n.EMPTY,this.right=i??n.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new n(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this,i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return n.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return n.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){let e=this.copy(null,null,n.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){let e=this.copy(null,null,n.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){let e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){let e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw ee(43730,{key:this.key,value:this.value});if(this.right.isRed())throw ee(14113,{key:this.key,value:this.value});let e=this.left.check();if(e!==this.right.check())throw ee(27949);return e+(this.isRed()?0:1)}};Ot.EMPTY=null,Ot.RED=!0,Ot.BLACK=!1;Ot.EMPTY=new class{constructor(){this.size=0}get key(){throw ee(57766)}get value(){throw ee(16141)}get color(){throw ee(16727)}get left(){throw ee(29726)}get right(){throw ee(36894)}copy(e,t,r,s,i){return this}insert(e,t,r){return new Ot(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};var Ge=class n{constructor(e){this.comparator=e,this.data=new ut(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){let r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){let s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){let t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Ji(this.data.getIterator())}getIteratorFrom(e){return new Ji(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof n)||this.size!==e.size)return!1;let t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){let s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){let e=[];return this.forEach(t=>{e.push(t)}),e}toString(){let e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){let t=new n(this.comparator);return t.data=e,t}},Ji=class{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}};var V={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"},K=class extends pt{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}};var Er="__name__",Ki=class n{constructor(e,t,r){t===void 0?t=0:t>e.length&&ee(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&ee(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return n.comparator(this,e)===0}child(e){let t=this.segments.slice(this.offset,this.limit());return e instanceof n?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){let r=Math.min(e.length,t.length);for(let s=0;s<r;s++){let i=n.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return le(e.length,t.length)}static compareSegments(e,t){let r=n.isNumericId(e),s=n.isNumericId(t);return r&&!s?-1:!r&&s?1:r&&s?n.extractNumericId(e).compare(n.extractNumericId(t)):Ya(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Ti.fromString(e.substring(4,e.length-2))}},De=class n extends Ki{construct(e,t,r){return new n(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toStringWithLeadingSlash(){return`/${this.canonicalString()}`}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){let t=[];for(let r of e){if(r.indexOf("//")>=0)throw new K(V.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(s=>s.length>0))}return new n(t)}static emptyPath(){return new n([])}},Em=/^[_a-zA-Z][_a-zA-Z0-9]*$/,tt=class lr extends Ki{construct(e,t,r){return new lr(e,t,r)}static isValidIdentifier(e){return Em.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),lr.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Er}static keyField(){return new lr([Er])}static fromServerFormat(e){let t=[],r="",s=0,i=()=>{if(r.length===0)throw new K(V.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""},a=!1;for(;s<e.length;){let u=e[s];if(u==="\\"){if(s+1===e.length)throw new K(V.INVALID_ARGUMENT,"Path has trailing escape character: "+e);let c=e[s+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new K(V.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=c,s+=2}else u==="`"?(a=!a,s++):u!=="."||a?(r+=u,s++):(i(),s++)}if(i(),a)throw new K(V.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new lr(t)}static emptyPath(){return new lr([])}};var St=class n{constructor(e){this.fields=e,e.sort(tt.comparator)}static empty(){return new n([])}unionWith(e){let t=new Ge(tt.comparator);for(let r of this.fields)t=t.add(r);for(let r of e)t=t.add(r);return new n(t.toArray())}covers(e){for(let t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return mr(this.fields,e.fields,(t,r)=>t.isEqual(r))}};function zi(n){let e=0;for(let t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Gr(n,e){for(let t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function ed(n,e){let t=[];for(let r in n)Object.prototype.hasOwnProperty.call(n,r)&&t.push(e(n[r],r,n));return t}function td(n){for(let e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}var ne=class n{constructor(e){this.path=e}static fromPath(e){return new n(De.fromString(e))}static fromName(e){return new n(De.fromString(e).popFirst(5))}static empty(){return new n(De.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&De.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return De.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new n(new De(e.slice()))}};function nd(n,e,t){if(!t)throw new K(V.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function rd(n,e,t,r){if(e===!0&&r===!0)throw new K(V.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function Df(n){if(!ne.isDocumentKey(n))throw new K(V.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function yf(n){if(ne.isDocumentKey(n))throw new K(V.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function js(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function So(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{let e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":ee(12329,{type:typeof n})}function TB(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new K(V.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{let t=So(n);throw new K(V.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}function Oe(n,e){let t={typeString:n};return e&&(t.value=e),t}function Js(n,e){if(!js(n))throw new K(V.INVALID_ARGUMENT,"JSON must be an object");let t;for(let r in e)if(e[r]){let s=e[r].typeString,i="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}let a=n[r];if(s&&typeof a!==s){t=`JSON field '${r}' must be a ${s}.`;break}if(i!==void 0&&a!==i.value){t=`Expected '${r}' field to equal '${i.value}'`;break}}if(t)throw new K(V.INVALID_ARGUMENT,t);return!0}var wf=-62135596800,If=1e6,Te=class n{static now(){return n.fromMillis(Date.now())}static fromDate(e){return n.fromMillis(e.getTime())}static fromMillis(e){let t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*If);return new n(t,r)}static fromInstant(e){if(!e||typeof e.t!="bigint")throw new K(V.INVALID_ARGUMENT,"Invalid Temporal.Instant object provided.");return n._fromEpochNanoseconds(e.t)}static _fromEpochNanoseconds(e){let t,r;if(e>=0n)t=Number(e/1000000000n),r=Number(e%1000000000n);else{let s=e%1000000000n;s===0n?(t=Number(e/1000000000n),r=0):(t=Number(e/1000000000n-1n),r=Number(s+1000000000n))}return new n(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new K(V.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new K(V.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<wf)throw new K(V.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new K(V.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/If}toInstant(){if(typeof Temporal>"u"||!Temporal.Instant)throw new K(V.FAILED_PRECONDITION,"The Temporal object is not available in the current environment.");let e=1000000000n*BigInt(this.seconds)+BigInt(this.nanoseconds);return Temporal.Instant.__PRIVATE_fromEpochNanoseconds(e)}_compareTo(e){return this.seconds===e.seconds?le(this.nanoseconds,e.nanoseconds):le(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:n._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Js(e,n._jsonSchema))return new n(e.seconds,e.nanoseconds)}valueOf(){let e=this.seconds-wf;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}};Te._jsonSchemaVersion="firestore/timestamp/1.0",Te._jsonSchema={type:Oe("string",Te._jsonSchemaVersion),seconds:Oe("number"),nanoseconds:Oe("number")};var Xa=class extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}};var ct=class n{constructor(e){this.binaryString=e}static fromBase64String(e){let t=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new Xa("Invalid base64 string: "+i):i}}(e);return new n(t)}static fromUint8Array(e){let t=function(s){let i="";for(let a=0;a<s.length;++a)i+=String.fromCharCode(s[a]);return i}(e);return new n(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){let r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return le(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}};ct.EMPTY_BYTE_STRING=new ct("");var _m=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Bn(n){if(Y(!!n,39018),typeof n=="string"){let e=0,t=_m.exec(n);if(Y(!!t,46558,{timestamp:n}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}let r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:Ie(n.seconds),nanos:Ie(n.nanos)}}function Ie(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function qn(n){return typeof n=="string"?ct.fromBase64String(n):ct.fromUint8Array(n)}var sd="server_timestamp",id="__type__",od="__previous_value__",ad="__local_write_time__";function Ks(n){return(n?.mapValue?.fields||{})[id]?.stringValue===sd}function vo(n){let e=n.mapValue.fields[od];return Ks(e)?vo(e):e}function Ds(n){let e=Bn(n.mapValue.fields[ad].timestampValue);return new Te(e.seconds,e.nanos)}var Za=class{constructor(e,t,r,s,i,a,u,c,l,f,d,y,R){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=u,this.longPollingOptions=c,this.useFetchStreams=l,this.isUsingEmulator=f,this.apiKey=d,this._customHeaders=y,this.grpcFlowControlWindow=R}},Qi="(default)",$i=class n{constructor(e,t){this.projectId=e,this.database=t||Qi}static empty(){return new n("","")}get isDefaultDatabase(){return this.database===Qi}isEqual(e){return e instanceof n&&e.projectId===this.projectId&&e.database===this.database}};function ud(n,e){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new K(V.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new $i(n.options.projectId,e)}var AB=-1;function bB(n){return n==null}function _r(n){return n===0&&1/n==-1/0}function Dm(n){return typeof n=="number"&&Number.isInteger(n)&&!_r(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}function ym(n){return typeof n=="string"}var RB="__type__",cd="__max__",ki={mapValue:{fields:{__type__:{stringValue:cd}}}},SB="__vector__",Dr="value",yr={nullValue:"NULL_VALUE"},nt={booleanValue:!0},Ve={booleanValue:!1};function Fe(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Ks(n)?4:Bd(n)?9007199254740991:ws(n)?10:11:ee(28295,{value:n})}function dt(n,e,t){if(n===e)return!0;let r=Fe(n);if(r!==Fe(e))return!1;switch(r){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Ds(n).isEqual(Ds(e));case 3:return function(i,a){if(typeof i.timestampValue=="string"&&typeof a.timestampValue=="string"&&i.timestampValue.length===a.timestampValue.length)return i.timestampValue===a.timestampValue;let u=Bn(i.timestampValue),c=Bn(a.timestampValue);return u.seconds===c.seconds&&u.nanos===c.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(i,a){return qn(i.bytesValue).isEqual(qn(a.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(i,a){return Ie(i.geoPointValue.latitude)===Ie(a.geoPointValue.latitude)&&Ie(i.geoPointValue.longitude)===Ie(a.geoPointValue.longitude)}(n,e);case 2:return function(i,a,u){if("integerValue"in i&&"integerValue"in a)return Ie(i.integerValue)===Ie(a.integerValue);let c,l;if("doubleValue"in i&&"doubleValue"in a)c=Ie(i.doubleValue),l=Ie(a.doubleValue);else{if(!u?.i)return!1;c=Ie(i.integerValue??i.doubleValue),l=Ie(a.integerValue??a.doubleValue)}return c===l?!!u?.o||_r(c)===_r(l):!!(u===void 0||u.u)&&isNaN(c)&&isNaN(l)}(n,e,t);case 9:return mr(n.arrayValue.values||[],e.arrayValue.values||[],(s,i)=>dt(s,i,t));case 10:case 11:return function(i,a,u){let c=i.mapValue.fields||{},l=a.mapValue.fields||{};if(zi(c)!==zi(l))return!1;for(let f in c)if(c.hasOwnProperty(f)&&(l[f]===void 0||!dt(c[f],l[f],u)))return!1;return!0}(n,e,t);default:return ee(52216,{left:n})}}function ys(n,e){return(n.values||[]).find(t=>dt(t,e))!==void 0}function rt(n,e){if(n===e)return 0;let t=Fe(n),r=Fe(e);if(t!==r)return le(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return le(n.booleanValue,e.booleanValue);case 2:return function(i,a){let u=Ie(i.integerValue||i.doubleValue),c=Ie(a.integerValue||a.doubleValue);return u<c?-1:u>c?1:u===c?0:isNaN(u)?isNaN(c)?0:-1:1}(n,e);case 3:return Tf(n.timestampValue,e.timestampValue);case 4:return Tf(Ds(n),Ds(e));case 5:return Ya(n.stringValue,e.stringValue);case 6:return function(i,a){let u=qn(i),c=qn(a);return u.compareTo(c)}(n.bytesValue,e.bytesValue);case 7:return function(i,a){let u=i.split("/"),c=a.split("/");for(let l=0;l<u.length&&l<c.length;l++){let f=le(u[l],c[l]);if(f!==0)return f}return le(u.length,c.length)}(n.referenceValue,e.referenceValue);case 8:return function(i,a){let u=le(Ie(i.latitude),Ie(a.latitude));return u!==0?u:le(Ie(i.longitude),Ie(a.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return Af(n.arrayValue,e.arrayValue);case 10:return function(i,a){let u=i.fields||{},c=a.fields||{},l=u[Dr]?.arrayValue,f=c[Dr]?.arrayValue,d=le(l?.values?.length||0,f?.values?.length||0);return d!==0?d:Af(l,f)}(n.mapValue,e.mapValue);case 11:return function(i,a){if(i===ki.mapValue&&a===ki.mapValue)return 0;if(i===ki.mapValue)return 1;if(a===ki.mapValue)return-1;let u=i.fields||{},c=Object.keys(u),l=a.fields||{},f=Object.keys(l);c.sort(),f.sort();for(let d=0;d<c.length&&d<f.length;++d){let y=Ya(c[d],f[d]);if(y!==0)return y;let R=rt(u[c[d]],l[f[d]]);if(R!==0)return R}return le(c.length,f.length)}(n.mapValue,e.mapValue);default:throw ee(23264,{l:t})}}function Tf(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return le(n,e);let t=Bn(n),r=Bn(e),s=le(t.seconds,r.seconds);return s!==0?s:le(t.nanos,r.nanos)}function Af(n,e){let t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){let i=rt(t[s],r[s]);if(i!==void 0&&i!==0)return i}return le(t.length,r.length)}function wr(n){return eu(n)}function eu(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){let r=Bn(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return qn(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return ne.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",s=!0;for(let i of t.values||[])s?s=!1:r+=",",r+=eu(i);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){let r=Object.keys(t.fields||{}).sort(),s="{",i=!0;for(let a of r)i?i=!1:s+=",",s+=`${a}:${eu(t.fields[a])}`;return s+"}"}(n.mapValue):ee(61005,{value:n})}function Gi(n){switch(Fe(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:let e=vo(n);return e?16+Gi(e):16;case 5:return 2*n.stringValue.length;case 6:return qn(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((s,i)=>s+Gi(i),0)}(n.arrayValue);case 10:case 11:return function(r){let s=0;return Gr(r.fields,(i,a)=>{s+=i.length+Gi(a)}),s}(n.mapValue);default:throw ee(13486,{value:n})}}function vt(n){return!!n&&"integerValue"in n}function Fn(n){return!!n&&"doubleValue"in n}function ln(n){return vt(n)||Fn(n)}function Ir(n){return!!n&&"arrayValue"in n}function wt(n){return!!n&&"nullValue"in n}function Ct(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function kn(n){return!!n&&"mapValue"in n}function ws(n){return(n?.mapValue?.fields||{})[RB]?.stringValue===SB}function tu(n){return(n?.mapValue?.fields||{})[Dr]?.arrayValue}function ps(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){let e={mapValue:{fields:{}}};return Gr(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=ps(r)),e}if(n.arrayValue){let e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=ps(n.arrayValue.values[t]);return e}return{...n}}function Bd(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===cd}var Ty={mapValue:{fields:{[RB]:{stringValue:SB},[Dr]:{arrayValue:{}}}}};var ht=class n{constructor(e){this.value=e}static empty(){return new n({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!kn(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=ps(t)}setAll(e){let t=tt.emptyPath(),r={},s=[];e.forEach((a,u)=>{if(!t.isImmediateParentOf(u)){let c=this.getFieldsMap(t);this.applyChanges(c,r,s),r={},s=[],t=u.popLast()}a?r[u.lastSegment()]=ps(a):s.push(u.lastSegment())});let i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){let t=this.field(e.popLast());kn(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return dt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];kn(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){Gr(t,(s,i)=>e[s]=i);for(let s of r)delete e[s]}clone(){return new n(ps(this.value))}};function ld(n){let e=[];return Gr(n.fields,(t,r)=>{let s=new tt([t]);if(kn(r)){let i=ld(r.mapValue).fields;if(i.length===0)e.push(s);else for(let a of i)e.push(s.child(a))}else e.push(s)}),new St(e)}function Oo(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:_r(e)?"-0":e}}function vB(n){return{integerValue:""+n}}function OB(n,e,t){return Dm(e)?vB(e):Oo(n,e)}var Tr=class{constructor(){this._=void 0}};function wm(n,e,t){return n instanceof jn?function(s,i){let a={fields:{[id]:{stringValue:sd},[ad]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&Ks(i)&&(i=vo(i)),i&&(a.fields[od]=i),{mapValue:a}}(t,e):n instanceof Jn?fd(n,e):n instanceof Kn?dd(n,e):n instanceof zn?function(s,i){let a=hd(s,i),u=Wi(a)+Wi(s.h);return vt(a)&&vt(s.h)?vB(u):Oo(s.serializer,u)}(n,e):n instanceof Ar?function(s,i){return bf(s,i,Math.min)}(n,e):n instanceof br?function(s,i){return bf(s,i,Math.max)}(n,e):void 0}function Im(n,e,t){return n instanceof Jn?fd(n,e):n instanceof Kn?dd(n,e):t}function hd(n,e){return n instanceof zn?ln(e)?e:{integerValue:0}:null}var jn=class extends Tr{},Jn=class extends Tr{constructor(e){super(),this.elements=e}};function fd(n,e){let t=Cd(e);for(let r of n.elements)t.some(s=>dt(s,r))||t.push(r);return{arrayValue:{values:t}}}var Kn=class extends Tr{constructor(e){super(),this.elements=e}};function dd(n,e){let t=Cd(e);for(let r of n.elements)t=t.filter(s=>!dt(s,r));return{arrayValue:{values:t}}}var Is=class extends Tr{constructor(e,t){super(),this.serializer=e,this.h=t}},zn=class extends Is{},Ar=class extends Is{},br=class extends Is{};function bf(n,e,t){if(!ln(e))return n.h;let r=t(Wi(e),Wi(n.h));return vt(e)&&vt(n.h)?vB(r):Oo(n.serializer,r)}function Wi(n){return Ie(n.integerValue||n.doubleValue)}function Cd(n){return Ir(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}var nu=class{constructor(e,t){this.field=e,this.transform=t}};function Tm(n,e){return n.field.isEqual(e.field)&&function(r,s){return r instanceof Jn&&s instanceof Jn||r instanceof Kn&&s instanceof Kn?mr(r.elements,s.elements,dt):r instanceof zn&&s instanceof zn||r instanceof Ar&&s instanceof Ar||r instanceof br&&s instanceof br?dt(r.h,s.h):r instanceof jn&&s instanceof jn}(n.transform,e.transform)}var ru=class{constructor(e,t){this.version=e,this.transformResults=t}},rn=class n{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new n}static exists(e){return new n(void 0,e)}static updateTime(e){return new n(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}};function Hi(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}var Rr=class{};function pd(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new Ts(n.key,rn.none()):new Qn(n.key,n.data,rn.none());{let t=n.data,r=ht.empty(),s=new Ge(tt.comparator);for(let i of e.fields)if(!s.has(i)){let a=t.field(i);a===null&&i.length>1&&(i=i.popLast(),a=t.field(i)),a===null?r.delete(i):r.set(i,a),s=s.add(i)}return new Ht(n.key,r,new St(s.toArray()),rn.none())}}function Am(n,e,t){n instanceof Qn?function(s,i,a){let u=s.value.clone(),c=Sf(s.fieldTransforms,i,a.transformResults);u.setAll(c),i.convertToFoundDocument(a.version,u).setHasCommittedMutations()}(n,e,t):n instanceof Ht?function(s,i,a){if(!Hi(s.precondition,i))return void i.convertToUnknownDocument(a.version);let u=Sf(s.fieldTransforms,i,a.transformResults),c=i.data;c.setAll(gd(s)),c.setAll(u),i.convertToFoundDocument(a.version,c).setHasCommittedMutations()}(n,e,t):function(s,i,a){i.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,t)}function gs(n,e,t,r){return n instanceof Qn?function(i,a,u,c){if(!Hi(i.precondition,a))return u;let l=i.value.clone(),f=vf(i.fieldTransforms,c,a);return l.setAll(f),a.convertToFoundDocument(a.version,l).setHasLocalMutations(),null}(n,e,t,r):n instanceof Ht?function(i,a,u,c){if(!Hi(i.precondition,a))return u;let l=vf(i.fieldTransforms,c,a),f=a.data;return f.setAll(gd(i)),f.setAll(l),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),u===null?null:u.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(d=>d.field))}(n,e,t,r):function(i,a,u){return Hi(i.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):u}(n,e,t)}function bm(n,e){let t=null;for(let r of n.fieldTransforms){let s=e.data.field(r.field),i=hd(r.transform,s||null);i!=null&&(t===null&&(t=ht.empty()),t.set(r.field,i))}return t||null}function Rf(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&mr(r,s,(i,a)=>Tm(i,a))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}var Qn=class extends Rr{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}},Ht=class extends Rr{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}};function gd(n){let e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){let r=n.data.field(t);e.set(t,r)}}),e}function Sf(n,e,t){let r=new Map;Y(n.length===t.length,32656,{T:t.length,P:n.length});for(let s=0;s<t.length;s++){let i=n[s],a=i.transform,u=e.data.field(i.field);r.set(i.field,Im(a,u,t[s]))}return r}function vf(n,e,t){let r=new Map;for(let s of n){let i=s.transform,a=t.data.field(s.field);r.set(s.field,wm(i,a,e))}return r}var Ts=class extends Rr{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}},su=class extends Rr{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}};var $n=class{constructor(e,t){this.position=e,this.inclusive=t}};function Of(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){let i=e[s],a=n.position[s];if(i.field.isKeyField()?r=ne.comparator(ne.fromName(a.referenceValue),t.key):r=rt(a,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function Nf(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!dt(n.position[t],e.position[t]))return!1;return!0}var Yi=class{},Pe=class n extends Yi{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new ou(e,t,r):t==="array-contains"?new cu(e,r):t==="in"?new Bu(e,r):t==="not-in"?new lu(e,r):t==="array-contains-any"?new hu(e,r):new n(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new au(e,r):new uu(e,r)}matches(e){let t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(rt(t,this.value)):t!==null&&Fe(this.value)===Fe(t)&&this.matchesComparison(rt(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return ee(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}},Ut=class n extends Yi{constructor(e,t){super(),this.filters=e,this.op=t,this.I=null}static create(e,t){return new n(e,t)}matches(e){return md(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.I!==null||(this.I=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.I}getFilters(){return Object.assign([],this.filters)}};function md(n){return n.op==="and"}function Ed(n){return Rm(n)&&md(n)}function Rm(n){for(let e of n.filters)if(e instanceof Ut)return!1;return!0}function iu(n){if(n instanceof Pe)return n.field.canonicalString()+n.op.toString()+wr(n.value);if(Ed(n))return n.filters.map(e=>iu(e)).join(",");{let e=n.filters.map(t=>iu(t)).join(",");return`${n.op}(${e})`}}function _d(n,e){return n instanceof Pe?function(r,s){return s instanceof Pe&&r.op===s.op&&r.field.isEqual(s.field)&&dt(r.value,s.value)}(n,e):n instanceof Ut?function(r,s){return s instanceof Ut&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((i,a,u)=>i&&_d(a,s.filters[u]),!0):!1}(n,e):void ee(19439)}function Dd(n){return n instanceof Pe?function(t){return`${t.field.canonicalString()} ${t.op} ${wr(t.value)}`}(n):n instanceof Ut?function(t){return t.op.toString()+" {"+t.getFilters().map(Dd).join(" ,")+"}"}(n):"Filter"}var ou=class extends Pe{constructor(e,t,r){super(e,t,r),this.key=ne.fromName(r.referenceValue)}matches(e){let t=ne.comparator(e.key,this.key);return this.matchesComparison(t)}},au=class extends Pe{constructor(e,t){super(e,"in",t),this.keys=yd("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}},uu=class extends Pe{constructor(e,t){super(e,"not-in",t),this.keys=yd("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}};function yd(n,e){return(e.arrayValue?.values||[]).map(t=>ne.fromName(t.referenceValue))}var cu=class extends Pe{constructor(e,t){super(e,"array-contains",t)}matches(e){let t=e.data.field(this.field);return Ir(t)&&ys(t.arrayValue,this.value)}},Bu=class extends Pe{constructor(e,t){super(e,"in",t)}matches(e){let t=e.data.field(this.field);return t!==null&&ys(this.value.arrayValue,t)}},lu=class extends Pe{constructor(e,t){super(e,"not-in",t)}matches(e){if(ys(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;let t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!ys(this.value.arrayValue,t)}},hu=class extends Pe{constructor(e,t){super(e,"array-contains-any",t)}matches(e){let t=e.data.field(this.field);return!(!Ir(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>ys(this.value.arrayValue,r))}};var Wn=class{constructor(e,t="asc"){this.field=e,this.dir=t}};function Sm(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}var ye=class n{static fromTimestamp(e){return new n(e)}static min(){return new n(new Te(0,0))}static max(){return new n(new Te(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}};var Sr=class n{constructor(e,t,r,s,i,a,u){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=i,this.data=a,this.documentState=u}static newInvalidDocument(e){return new n(e,0,ye.min(),ye.min(),ye.min(),ht.empty(),0)}static newFoundDocument(e,t,r,s){return new n(e,1,t,ye.min(),r,s,0)}static newNoDocument(e,t){return new n(e,2,t,ye.min(),ye.min(),ht.empty(),0)}static newUnknownDocument(e,t){return new n(e,3,t,ye.min(),ye.min(),ht.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(ye.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=ht.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=ht.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=ye.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof n&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new n(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}};var As=-1,Xi=class{constructor(e,t,r,s){this.indexId=e,this.collectionGroup=t,this.fields=r,this.indexState=s}};Xi.UNKNOWN_ID=-1;function vm(n,e){let t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=ye.fromTimestamp(r===1e9?new Te(t+1,0):new Te(t,r));return new Yn(s,ne.empty(),e)}function Om(n){return new Yn(n.readTime,n.key,As)}var Yn=class n{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new n(ye.min(),ne.empty(),As)}static max(){return new n(ye.max(),ne.empty(),As)}};function Nm(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=ne.comparator(n.documentKey,e.documentKey),t!==0?t:le(n.largestBatchId,e.largestBatchId))}var fu=class{constructor(e,t=null,r=[],s=[],i=null,a=null,u=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=a,this.endAt=u,this.R=null}};function Pf(n,e=null,t=[],r=[],s=null,i=null,a=null){return new fu(n,e,t,r,s,i,a)}function wd(n){let e=me(n);if(e.R===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>iu(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(i){return i.field.canonicalString()+i.dir}(r)).join(","),bB(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>wr(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>wr(r)).join(",")),e.R=t}return e.R}function Id(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!Sm(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!_d(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Nf(n.startAt,e.startAt)&&Nf(n.endAt,e.endAt)}function Pm(n){return!!n.isCorePipeline}var vr=class{constructor(e,t=null,r=[],s=[],i=null,a="F",u=null,c=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=a,this.startAt=u,this.endAt=c,this.A=null,this.V=null,this.m=null,this.startAt,this.endAt}};function Fm(n,e,t,r,s,i,a,u){return new vr(n,e,t,r,s,i,a,u)}function Td(n){return new vr(n)}function Ff(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function xm(n){return ne.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function Ad(n){return n.collectionGroup!==null}function dr(n){let e=me(n);if(e.A===null){e.A=[];let t=new Set;for(let i of e.explicitOrderBy)e.A.push(i),t.add(i.field.canonicalString());let r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let u=new Ge(tt.comparator);return a.filters.forEach(c=>{c.getFlattenedFilters().forEach(l=>{l.isInequality()&&(u=u.add(l.field))})}),u})(e).forEach(i=>{t.has(i.canonicalString())||i.isKeyField()||e.A.push(new Wn(i,r))}),t.has(tt.keyField().canonicalString())||e.A.push(new Wn(tt.keyField(),r))}return e.A}function Vn(n){let e=me(n);return e.V||(e.V=Lm(e,dr(n))),e.V}function Lm(n,e){if(n.limitType==="F")return Pf(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(s=>{let i=s.dir==="desc"?"asc":"desc";return new Wn(s.field,i)});let t=n.endAt?new $n(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new $n(n.startAt.position,n.startAt.inclusive):null;return Pf(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function Zi(n,e,t){return new vr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function km(n,e){return Id(Vn(n),Vn(e))&&n.limitType===e.limitType}function Ui(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(s=>Dd(s)).join(", ")}]`),bB(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(s=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(s)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(s=>wr(s)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(s=>wr(s)).join(",")),`Target(${r})`}(Vn(n))}; limitType=${n.limitType})`}function NB(n,e){return e.isFoundDocument()&&function(r,s){let i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):ne.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)}(n,e)&&function(r,s){for(let i of dr(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(n,e)&&function(r,s){for(let i of r.filters)if(!i.matches(s))return!1;return!0}(n,e)&&function(r,s){return!(r.startAt&&!function(a,u,c){let l=Of(a,u,c);return a.inclusive?l<=0:l<0}(r.startAt,dr(r),s)||r.endAt&&!function(a,u,c){let l=Of(a,u,c);return a.inclusive?l>=0:l>0}(r.endAt,dr(r),s))}(n,e)}function bd(n){return(e,t)=>{let r=!1;for(let s of dr(n)){let i=Vm(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function Vm(n,e,t){let r=n.field.isKeyField()?ne.comparator(e.key,t.key):function(i,a,u){let c=a.data.field(i),l=u.data.field(i);return c!==null&&l!==null?rt(c,l):ee(42886)}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return ee(19790,{direction:n.dir})}}var Se,ue;function Mm(n){switch(n){case V.OK:return ee(64938);case V.CANCELLED:case V.UNKNOWN:case V.DEADLINE_EXCEEDED:case V.RESOURCE_EXHAUSTED:case V.INTERNAL:case V.UNAVAILABLE:case V.UNAUTHENTICATED:return!1;case V.INVALID_ARGUMENT:case V.NOT_FOUND:case V.ALREADY_EXISTS:case V.PERMISSION_DENIED:case V.FAILED_PRECONDITION:case V.ABORTED:case V.OUT_OF_RANGE:case V.UNIMPLEMENTED:case V.DATA_LOSS:return!0;default:return ee(15467,{code:n})}}function Gm(n){if(n===void 0)return Un("GRPC error has no .code"),V.UNKNOWN;switch(n){case Se.OK:return V.OK;case Se.CANCELLED:return V.CANCELLED;case Se.UNKNOWN:return V.UNKNOWN;case Se.DEADLINE_EXCEEDED:return V.DEADLINE_EXCEEDED;case Se.RESOURCE_EXHAUSTED:return V.RESOURCE_EXHAUSTED;case Se.INTERNAL:return V.INTERNAL;case Se.UNAVAILABLE:return V.UNAVAILABLE;case Se.UNAUTHENTICATED:return V.UNAUTHENTICATED;case Se.INVALID_ARGUMENT:return V.INVALID_ARGUMENT;case Se.NOT_FOUND:return V.NOT_FOUND;case Se.ALREADY_EXISTS:return V.ALREADY_EXISTS;case Se.PERMISSION_DENIED:return V.PERMISSION_DENIED;case Se.FAILED_PRECONDITION:return V.FAILED_PRECONDITION;case Se.ABORTED:return V.ABORTED;case Se.OUT_OF_RANGE:return V.OUT_OF_RANGE;case Se.UNIMPLEMENTED:return V.UNIMPLEMENTED;case Se.DATA_LOSS:return V.DATA_LOSS;default:return ee(39323,{code:n})}}(ue=Se||(Se={}))[ue.OK=0]="OK",ue[ue.CANCELLED=1]="CANCELLED",ue[ue.UNKNOWN=2]="UNKNOWN",ue[ue.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ue[ue.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ue[ue.NOT_FOUND=5]="NOT_FOUND",ue[ue.ALREADY_EXISTS=6]="ALREADY_EXISTS",ue[ue.PERMISSION_DENIED=7]="PERMISSION_DENIED",ue[ue.UNAUTHENTICATED=16]="UNAUTHENTICATED",ue[ue.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ue[ue.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ue[ue.ABORTED=10]="ABORTED",ue[ue.OUT_OF_RANGE=11]="OUT_OF_RANGE",ue[ue.UNIMPLEMENTED=12]="UNIMPLEMENTED",ue[ue.INTERNAL=13]="INTERNAL",ue[ue.UNAVAILABLE=14]="UNAVAILABLE",ue[ue.DATA_LOSS=15]="DATA_LOSS";var qt=class{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){let t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(let[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){let r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){let t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){Gr(this.inner,(t,r)=>{for(let[s,i]of r)e(s,i)})}isEmpty(){return td(this.inner)}size(){return this.innerSize}};var Hm=new ut(ne.comparator);function ms(){return Hm}var Rd=new ut(ne.comparator);function ds(...n){let e=Rd;for(let t of n)e=e.insert(t.key,t);return e}function Sd(n){let e=Rd;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function nn(){return Es()}function vd(){return Es()}function Es(){return new qt(n=>n.toString(),(n,e)=>n.isEqual(e))}var Um=new ut(ne.comparator),qm=new Ge(ne.comparator);function Me(...n){let e=qm;for(let t of n)e=e.add(t);return e}var jm=new Ge(le);function Jm(){return jm}var Ay=new Ti([4294967295,4294967295],0);var du=class{constructor(e,t){this.databaseId=e,this.useProto3Json=t}};function qi(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function PB(n){let e=Bn(n);return new Te(e.seconds,e.nanos)}function Km(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function ji(n,e){return qi(n,e.toTimestamp())}function Cr(n){return Y(!!n,49232),ye.fromTimestamp(PB(n))}function Od(n,e){return Cu(n,e).canonicalString()}function Cu(n,e){let t=function(s){return new De(["projects",s.projectId,"databases",s.database])}(n).child("documents");return e===void 0?t:t.child(e)}function zm(n){let e=De.fromString(n);return Y(tE(e),10190,{key:e.toString()}),e}function eo(n,e){return Od(n.databaseId,e.path)}function Qm(n){let e=zm(n);return e.length===4?De.emptyPath():Wm(e)}function $m(n){return new De(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Wm(n){return Y(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function xf(n,e,t){return{name:eo(n,e),fields:t.value.mapValue.fields}}function Ym(n,e){let t;if(e instanceof Qn)t={update:xf(n,e.key,e.value)};else if(e instanceof Ts)t={delete:eo(n,e.key)};else if(e instanceof Ht)t={update:xf(n,e.key,e.data),updateMask:eE(e.fieldMask)};else{if(!(e instanceof su))return ee(16599,{be:e.type});t={verify:eo(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(i,a){let u=a.transform;if(u instanceof jn)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(u instanceof Jn)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:u.elements}};if(u instanceof Kn)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:u.elements}};if(u instanceof zn)return{fieldPath:a.field.canonicalString(),increment:u.h};if(u instanceof Ar)return{fieldPath:a.field.canonicalString(),minimum:u.h};if(u instanceof br)return{fieldPath:a.field.canonicalString(),maximum:u.h};throw ee(20930,{transform:a.transform})}(0,r))),e.precondition.isNone||(t.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:ji(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:ee(27497)}(n,e.precondition)),t}function Xm(n,e){return n&&n.length>0?(Y(e!==void 0,14353),n.map(t=>function(s,i){let a=s.updateTime?Cr(s.updateTime):Cr(i);return a.isEqual(ye.min())&&(a=Cr(i)),new ru(a,s.transformResults||[])}(t,e))):[]}function Zm(n){let e=Qm(n.parent),t=n.structuredQuery,r=t.from?t.from.length:0,s=null;if(r>0){Y(r===1,65062);let f=t.from[0];f.allDescendants?s=f.collectionId:e=e.child(f.collectionId)}let i=[];t.where&&(i=function(d){let y=Nd(d);return y instanceof Ut&&Ed(y)?y.getFilters():[y]}(t.where));let a=[];t.orderBy&&(a=function(d){return d.map(y=>function(v){return new Wn(hr(v.field),function(j){switch(j){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(v.direction))}(y))}(t.orderBy));let u=null;t.limit&&(u=function(d){let y;return y=typeof d=="object"?d.value:d,bB(y)?null:y}(t.limit));let c=null;t.startAt&&(c=function(d){let y=!!d.before,R=d.values||[];return new $n(R,y)}(t.startAt));let l=null;return t.endAt&&(l=function(d){let y=!d.before,R=d.values||[];return new $n(R,y)}(t.endAt)),Fm(e,s,a,i,u,"F",c,l)}function Nd(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":let r=hr(t.unaryFilter.field);return Pe.create(r,"==",{doubleValue:NaN});case"IS_NULL":let s=hr(t.unaryFilter.field);return Pe.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":let i=hr(t.unaryFilter.field);return Pe.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":let a=hr(t.unaryFilter.field);return Pe.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return ee(61313);default:return ee(60726)}}(n):n.fieldFilter!==void 0?function(t){return Pe.create(hr(t.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return ee(58110);default:return ee(50506)}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return Ut.create(t.compositeFilter.filters.map(r=>Nd(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return ee(1026)}}(t.compositeFilter.op))}(n):ee(30097,{filter:n})}function hr(n){return tt.fromServerFormat(n.fieldPath)}function eE(n){let e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function tE(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function Pd(n){return!!n&&typeof n._toProto=="function"&&n._protoValueType==="ProtoValue"}function bs(n,e){let t={fields:{}};return e.forEach((r,s)=>{if(typeof s!="string")throw new Error(`Cannot encode map with non-string key: ${s}`);t.fields[s]=r._toProto(n)}),{mapValue:t}}function Fd(n){return{stringValue:n}}function No(n){return new du(n,!0)}var sn=class n{constructor(e){this._byteString=e}static fromBase64String(e){try{return new n(ct.fromBase64String(e))}catch(t){throw new K(V.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new n(ct.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:n._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Js(e,n._jsonSchema))return n.fromBase64String(e.bytes)}};sn._jsonSchemaVersion="firestore/bytes/1.0",sn._jsonSchema={type:Oe("string",sn._jsonSchemaVersion),bytes:Oe("string")};var Or=class{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new K(V.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new tt(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}};function xd(){return new Or(Er)}var Nr=class{constructor(e){this._methodName=e}};var on=class n{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new K(V.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new K(V.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return le(this._lat,e._lat)||le(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:n._jsonSchemaVersion}}static fromJSON(e){if(Js(e,n._jsonSchema))return new n(e.latitude,e.longitude)}};on._jsonSchemaVersion="firestore/geoPoint/1.0",on._jsonSchema={type:Oe("string",on._jsonSchemaVersion),latitude:Oe("number"),longitude:Oe("number")};var ke=class{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}};ke.UNAUTHENTICATED=new ke(null),ke.GOOGLE_CREDENTIALS=new ke("google-credentials-uid"),ke.FIRST_PARTY=new ke("first-party-uid"),ke.MOCK_USER=new ke("mock-user");var Mt=class{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}};var to=class{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}},no=class{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(ke.UNAUTHENTICATED))}shutdown(){}},pu=class{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}},ro=class{constructor(e){this.De=e,this.currentUser=ke.UNAUTHENTICATED,this.xe=0,this.forceRefresh=!1,this.auth=null}start(e,t){Y(this.Ce===void 0,42304);let r=this.xe,s=c=>this.xe!==r?(r=this.xe,t(c)):Promise.resolve(),i=new Mt;this.Ce=()=>{this.xe++,this.currentUser=this.Fe(),i.resolve(),i=new Mt,e.enqueueRetryable(()=>s(this.currentUser))};let a=()=>{let c=i;e.enqueueRetryable(async()=>{await c.promise,await s(this.currentUser)})},u=c=>{Q("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.Ce&&(this.auth.addAuthTokenListener(this.Ce),a())};this.De.onInit(c=>u(c)),setTimeout(()=>{if(!this.auth){let c=this.De.getImmediate({optional:!0});c?u(c):(Q("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Mt)}},0),a()}getToken(){let e=this.xe,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.xe!==e?(Q("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(Y(typeof r.accessToken=="string",31837,{Oe:r}),new to(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.Ce&&this.auth.removeAuthTokenListener(this.Ce),this.Ce=void 0}Fe(){let e=this.auth&&this.auth.getUid();return Y(e===null||typeof e=="string",2055,{Me:e}),new ke(e)}},gu=class{constructor(e,t,r){this.Ne=e,this.Le=t,this.Be=r,this.type="FirstParty",this.user=ke.FIRST_PARTY,this.Ue=new Map}ke(){return this.Be?this.Be():null}get headers(){this.Ue.set("X-Goog-AuthUser",this.Ne);let e=this.ke();return e&&this.Ue.set("Authorization",e),this.Le&&this.Ue.set("X-Goog-Iam-Authorization-Token",this.Le),this.Ue}},mu=class{constructor(e,t,r){this.Ne=e,this.Le=t,this.Be=r}getToken(){return Promise.resolve(new gu(this.Ne,this.Le,this.Be))}start(e,t){e.enqueueRetryable(()=>t(ke.FIRST_PARTY))}shutdown(){}invalidateToken(){}},so=class{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}},io=class{constructor(e,t){this.qe=t,this.forceRefresh=!1,this.appCheck=null,this.$e=null,this.Ke=null,wi(e)&&e.settings.appCheckToken&&(this.Ke=e.settings.appCheckToken)}start(e,t){Y(this.Ce===void 0,3512);let r=i=>{i.error!=null&&Q("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);let a=i.token!==this.$e;return this.$e=i.token,Q("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(i.token):Promise.resolve()};this.Ce=i=>{e.enqueueRetryable(()=>r(i))};let s=i=>{Q("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.Ce&&this.appCheck.addTokenListener(this.Ce)};this.qe.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){let i=this.qe.getImmediate({optional:!0});i?s(i):Q("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.Ke)return Promise.resolve(new so(this.Ke));let e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(Y(typeof t.token=="string",44558,{tokenResult:t}),this.$e=t.token,new so(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.Ce&&this.appCheck.removeTokenListener(this.Ce),this.Ce=void 0}};function Ld(n){let e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}var Eu=class{Qe(e){}shutdown(){}};var Lf="ConnectivityMonitor",oo=class{constructor(){this.We=()=>this.Ge(),this.ze=()=>this.je(),this.He=[],this.Je()}Qe(e){this.He.push(e)}shutdown(){window.removeEventListener("online",this.We),window.removeEventListener("offline",this.ze)}Je(){window.addEventListener("online",this.We),window.addEventListener("offline",this.ze)}Ge(){Q(Lf,"Network connectivity changed: AVAILABLE");for(let e of this.He)e(0)}je(){Q(Lf,"Network connectivity changed: UNAVAILABLE");for(let e of this.He)e(1)}static Ye(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}};var Vi=null;function _u(){return Vi===null?Vi=function(){return 268435456+Math.round(2147483648*Math.random())}():Vi++,"0x"+Vi.toString(16)}var za="RestConnection",nE={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"},Du=class{get Ze(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;let t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Xe=t+"://"+e.host,this.et=`projects/${r}/databases/${s}`,this.tt=this.databaseId.database===Qi?`project_id=${r}`:`project_id=${r}&database_id=${s}`}nt(e,t,r,s,i){let a=_u(),u=this.rt(e,t.toUriEncodedString());Q(za,`Sending RPC '${e}' ${a}:`,u,r);let c={"google-cloud-resource-prefix":this.et,"x-goog-request-params":this.tt};this.it(c,s,i);let{host:l}=new URL(u),f=da(l);return this.st(e,u,c,r,f).then(d=>(Q(za,`Received RPC '${e}' ${a}: `,d),d),d=>{throw Nt(za,`RPC '${e}' ${a} failed with error: `,d,"url: ",u,"request:",r),d})}_t(e,t,r,s,i,a){return this.nt(e,t,r,s,i)}it(e,t,r){if(e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Mr}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((s,i)=>e[i]=s),r&&r.headers.forEach((s,i)=>e[i]=s),this.databaseInfo._customHeaders)for(let s of Object.keys(this.databaseInfo._customHeaders))e[s]=this.databaseInfo._customHeaders[s]}rt(e,t){let r=nE[e],s=`${this.Xe}/v1/${t}:${r}`;return this.databaseInfo.apiKey&&(s=`${s}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),s}terminate(){}};var yu=class{constructor(e){this.ot=e.ot,this.ut=e.ut}ct(e){this.lt=e}Et(e){this.ht=e}Tt(e){this.Pt=e}onMessage(e){this.It=e}close(){this.ut()}send(e){this.ot(e)}Rt(){this.lt()}At(){this.ht()}Vt(e){this.Pt(e)}dt(e){this.It(e)}};var qe="WebChannelConnection",Cs=(n,e,t)=>{n.listen(e,r=>{try{t(r)}catch(s){setTimeout(()=>{throw s},0)}})},ao=class n extends Du{constructor(e){super(e),this.ft=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static gt(){if(!n.yt){let e=Pa();Cs(e,Na.STAT_EVENT,t=>{t.stat===bi.PROXY?Q(qe,"STAT_EVENT: detected buffering proxy"):t.stat===bi.NOPROXY&&Q(qe,"STAT_EVENT: detected no buffering proxy")}),n.yt=!0}}st(e,t,r,s,i){let a=_u();return new Promise((u,c)=>{let l=new va;l.setWithCredentials(!0),l.listenOnce(Oa.COMPLETE,()=>{try{switch(l.getLastErrorCode()){case us.NO_ERROR:let d=l.getResponseJson();Q(qe,`XHR for RPC '${e}' ${a} received:`,JSON.stringify(d)),u(d);break;case us.TIMEOUT:Q(qe,`RPC '${e}' ${a} timed out`),c(new K(V.DEADLINE_EXCEEDED,"Request time out"));break;case us.HTTP_ERROR:let y=l.getStatus();if(Q(qe,`RPC '${e}' ${a} failed with status:`,y,"response text:",l.getResponseText()),y>0){let R=l.getResponseJson();Array.isArray(R)&&(R=R[0]);let v=R?.error;if(v&&v.status&&v.message){let L=function(z){let W=z.toLowerCase().replace(/_/g,"-");return Object.values(V).indexOf(W)>=0?W:V.UNKNOWN}(v.status);c(new K(L,v.message))}else c(new K(V.UNKNOWN,"Server responded with status "+l.getStatus()))}else c(new K(V.UNAVAILABLE,"Connection failed."));break;default:ee(9055,{wt:e,streamId:a,bt:l.getLastErrorCode(),St:l.getLastError()})}}finally{Q(qe,`RPC '${e}' ${a} completed.`)}});let f=JSON.stringify(s);Q(qe,`RPC '${e}' ${a} sending request:`,s),l.send(t,"POST",f,r,15)})}vt(e,t,r){let s=_u(),i=[this.Xe,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=this.createWebChannelTransport(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},c=this.longPollingOptions.timeoutSeconds;c!==void 0&&(u.longPollingTimeout=Math.round(1e3*c)),this.useFetchStreams&&(u.useFetchStreams=!0),this.it(u.initMessageHeaders,t,r),u.encodeInitMessageHeaders=!0;let l=i.join("");Q(qe,`Creating RPC '${e}' stream ${s}: ${l}`,u);let f=a.createWebChannel(l,u);this.Dt(f);let d=!1,y=!1,R=new yu({ot:v=>{y?Q(qe,`Not sending because RPC '${e}' stream ${s} is closed:`,v):(d||(Q(qe,`Opening RPC '${e}' stream ${s} transport.`),f.open(),d=!0),Q(qe,`RPC '${e}' stream ${s} sending:`,v),f.send(v))},ut:()=>f.close()});return Cs(f,ur.EventType.OPEN,()=>{y||(Q(qe,`RPC '${e}' stream ${s} transport opened.`),R.Rt())}),Cs(f,ur.EventType.CLOSE,()=>{y||(y=!0,Q(qe,`RPC '${e}' stream ${s} transport closed`),R.Vt(),this.xt(f))}),Cs(f,ur.EventType.ERROR,v=>{y||(y=!0,Nt(qe,`RPC '${e}' stream ${s} transport errored. Name:`,v.name,"Message:",v.message),R.Vt(new K(V.UNAVAILABLE,"The operation could not be completed")))}),Cs(f,ur.EventType.MESSAGE,v=>{if(!y){let L=v.data[0];Y(!!L,16349);let j=L,z=j?.error||j[0]?.error;if(z){Q(qe,`RPC '${e}' stream ${s} received error:`,z);let W=z.status,he=function(Re){let I=Se[Re];if(I!==void 0)return Gm(I)}(W),be=z.message;W==="NOT_FOUND"&&be.includes("database")&&be.includes("does not exist")&&be.includes(this.databaseId.database)&&Nt(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),he===void 0&&(he=V.INTERNAL,be="Unknown error status: "+W+" with message "+z.message),y=!0,R.Vt(new K(he,be)),f.close()}else Q(qe,`RPC '${e}' stream ${s} received:`,L),R.dt(L)}}),n.gt(),setTimeout(()=>{R.At()},0),R}terminate(){this.ft.forEach(e=>e.close()),this.ft=[]}Dt(e){this.ft.push(e)}xt(e){this.ft=this.ft.filter(t=>t===e)}it(e,t,r){super.it(e,t,r),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return Fa()}};function rE(n){return new ao(n)}ao.yt=!1;var uo=class{constructor(e,t,r=1e3,s=1.5,i=6e4){this.Ct=e,this.timerId=t,this.Ft=r,this.Ot=s,this.Mt=i,this.Nt=0,this.Lt=null,this.Bt=Date.now(),this.reset()}reset(){this.Nt=0}Ut(){this.Nt=this.Mt}kt(e){this.cancel();let t=Math.floor(this.Nt+this.qt()),r=Math.max(0,Date.now()-this.Bt),s=Math.max(0,t-r);s>0&&Q("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Nt} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.Lt=this.Ct.enqueueAfterDelay(this.timerId,s,()=>(this.Bt=Date.now(),e())),this.Nt*=this.Ot,this.Nt<this.Ft&&(this.Nt=this.Ft),this.Nt>this.Mt&&(this.Nt=this.Mt)}$t(){this.Lt!==null&&(this.Lt.skipDelay(),this.Lt=null)}cancel(){this.Lt!==null&&(this.Lt.cancel(),this.Lt=null)}qt(){return(Math.random()-.5)*this.Nt}};var kf="PersistentStream",wu=class{constructor(e,t,r,s,i,a,u,c){this.Ct=e,this.Kt=r,this.Qt=s,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=u,this.listener=c,this.state=0,this.Wt=0,this.Gt=null,this.zt=null,this.stream=null,this.jt=0,this.Ht=new uo(e,t)}Jt(){return this.state===1||this.state===5||this.Yt()}Yt(){return this.state===2||this.state===3}start(){this.jt=0,this.state!==4?this.auth():this.Zt()}async stop(){this.Jt()&&await this.close(0)}Xt(){this.state=0,this.Ht.reset()}en(){this.Yt()&&this.Gt===null&&(this.Gt=this.Ct.enqueueAfterDelay(this.Kt,6e4,()=>this.tn()))}nn(e){this.rn(),this.stream.send(e)}async tn(){if(this.Yt())return this.close(0)}rn(){this.Gt&&(this.Gt.cancel(),this.Gt=null)}sn(){this.zt&&(this.zt.cancel(),this.zt=null)}async close(e,t){this.rn(),this.sn(),this.Ht.cancel(),this.Wt++,e!==4?this.Ht.reset():t&&t.code===V.RESOURCE_EXHAUSTED?(Un(t.toString()),Un("Using maximum backoff delay to prevent overloading the backend."),this.Ht.Ut()):t&&t.code===V.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this._n(),this.stream.close(),this.stream=null),this.state=e,await this.listener.Tt(t)}_n(){}auth(){this.state=1;let e=this.an(this.Wt),t=this.Wt;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.Wt===t&&this.un(r,s)},r=>{e(()=>{let s=new K(V.UNKNOWN,"Fetching auth token failed: "+r.message);return this.cn(s)})})}un(e,t){let r=this.an(this.Wt);this.stream=this.En(e,t),this.stream.ct(()=>{r(()=>this.listener.ct())}),this.stream.Et(()=>{r(()=>(this.state=2,this.zt=this.Ct.enqueueAfterDelay(this.Qt,1e4,()=>(this.Yt()&&(this.state=3),Promise.resolve())),this.listener.Et()))}),this.stream.Tt(s=>{r(()=>this.cn(s))}),this.stream.onMessage(s=>{r(()=>++this.jt==1?this.hn(s):this.onNext(s))})}Zt(){this.state=5,this.Ht.kt(async()=>{this.state=0,this.start()})}cn(e){return Q(kf,`close with error: ${e}`),this.stream=null,this.close(4,e)}an(e){return t=>{this.Ct.enqueueAndForget(()=>this.Wt===e?t():(Q(kf,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}};var Iu=class extends wu{constructor(e,t,r,s,i,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}get Rn(){return this.jt>0}start(){this.lastStreamToken=void 0,super.start()}_n(){this.Rn&&this.An([])}En(e,t){return this.connection.vt("Write",e,t)}hn(e){return Y(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,Y(!e.writeResults||e.writeResults.length===0,55816),this.listener.Vn()}onNext(e){Y(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.Ht.reset();let t=Xm(e.writeResults,e.commitTime),r=Cr(e.commitTime);return this.listener.dn(r,t)}fn(){let e={};e.database=$m(this.serializer),this.nn(e)}An(e){let t={streamToken:this.lastStreamToken,writes:e.map(r=>Ym(this.serializer,r))};this.nn(t)}};var Tu=class{},Au=class extends Tu{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.mn=!1}pn(){if(this.mn)throw new K(V.FAILED_PRECONDITION,"The client has already been terminated.")}nt(e,t,r,s){return this.pn(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,a])=>this.connection.nt(e,Cu(t,r),s,i,a)).catch(i=>{throw i.name==="FirebaseError"?(i.code===V.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new K(V.UNKNOWN,i.toString())})}_t(e,t,r,s,i){return this.pn(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,u])=>this.connection._t(e,Cu(t,r),s,a,u,i)).catch(a=>{throw a.name==="FirebaseError"?(a.code===V.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new K(V.UNKNOWN,a.toString())})}terminate(){this.mn=!0,this.connection.terminate()}};function sE(n,e,t,r){return new Au(n,e,t,r)}var iE="ComponentProvider",Vf=new Map;function oE(n,e,t,r,s){return new Za(n,e,t,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,Ld(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,r,s._customHeaders,s.grpcFlowControlWindow)}var Mf={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},kd=41943040,lt=class n{static withCacheSize(e){return new n(e,n.DEFAULT_COLLECTION_PERCENTILE,n.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}};lt.DEFAULT_COLLECTION_PERCENTILE=10,lt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,lt.DEFAULT=new lt(kd,lt.DEFAULT_COLLECTION_PERCENTILE,lt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),lt.DISABLED=new lt(-1,0,0);var Rs=class{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.gn(r),this.yn=r=>t.writeSequenceNumber(r))}gn(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){let e=++this.previousValue;return this.yn&&this.yn(e),e}};Rs.wn=-1;var aE="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.",bu=class{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}};async function FB(n){if(n.code!==V.FAILED_PRECONDITION||n.message!==aE)throw n;Q("LocalStore","Unexpectedly lost primary lease")}var M=class n{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&ee(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new n((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(r,s)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{let t=e();return t instanceof n?t:n.resolve(t)}catch(t){return n.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):n.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):n.reject(t)}static resolve(e){return new n((t,r)=>{t(e)})}static reject(e){return new n((t,r)=>{r(e)})}static waitFor(e){return new n((t,r)=>{let s=0,i=0,a=!1;e.forEach(u=>{++s,u.next(()=>{++i,a&&i===s&&t()},c=>r(c))}),a=!0,i===s&&t()})}static or(e){let t=n.resolve(!1);for(let r of e)t=t.next(s=>s?n.resolve(s):r());return t}static forEach(e,t){let r=[];return e.forEach((s,i)=>{r.push(t.call(this,s,i))}),this.waitFor(r)}static mapArray(e,t){return new n((r,s)=>{let i=e.length,a=new Array(i),u=0;for(let c=0;c<i;c++){let l=c;t(e[l]).next(f=>{a[l]=f,++u,u===i&&r(a)},f=>s(f))}})}static doWhile(e,t){return new n((r,s)=>{let i=()=>{e()===!0?t().next(()=>{i()},s):r()};i()})}};function uE(n){let e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function zs(n){return n.name==="IndexedDbTransactionError"}var Gf="LruGarbageCollector",cE=1048576;function Hf([n,e],[t,r]){let s=le(n,t);return s===0?le(e,r):s}var Ru=class{constructor(e){this.Yn=e,this.buffer=new Ge(Hf),this.Zn=0}Xn(){return++this.Zn}er(e){let t=[e,this.Xn()];if(this.buffer.size<this.Yn)this.buffer=this.buffer.add(t);else{let r=this.buffer.last();Hf(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}},Su=class{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.tr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.nr(6e4)}stop(){this.tr&&(this.tr.cancel(),this.tr=null)}get started(){return this.tr!==null}nr(e){Q(Gf,`Garbage collection scheduled in ${e}ms`),this.tr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.tr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){zs(t)?Q(Gf,"Ignoring IndexedDB error during garbage collection: ",t):await FB(t)}await this.nr(3e5)})}},vu=class{constructor(e,t){this.rr=e,this.params=t}calculateTargetCount(e,t){return this.rr.ir(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return M.resolve(Rs.wn);let r=new Ru(t);return this.rr.forEachTarget(e,s=>r.er(s.sequenceNumber)).next(()=>this.rr.sr(e,s=>r.er(s))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.rr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.rr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(Q("LruGarbageCollector","Garbage collection skipped; disabled"),M.resolve(Mf)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(Q("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Mf):this._r(e,t))}getCacheSize(e){return this.rr.getCacheSize(e)}_r(e,t){let r,s,i,a,u,c,l,f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(d=>(d>this.params.maximumSequenceNumbersToCollect?(Q("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${d}`),s=this.params.maximumSequenceNumbersToCollect):s=d,a=Date.now(),this.nthSequenceNumber(e,s))).next(d=>(r=d,u=Date.now(),this.removeTargets(e,r,t))).next(d=>(i=d,c=Date.now(),this.removeOrphanedDocuments(e,r))).next(d=>(l=Date.now(),Br()<=ie.DEBUG&&Q("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-f}ms
	Determined least recently used ${s} in `+(u-a)+`ms
	Removed ${i} targets in `+(c-u)+`ms
	Removed ${d} documents in `+(l-c)+`ms
Total Duration: ${l-f}ms`),M.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:d})))}};function BE(n,e){return new vu(n,e)}var Vd="firestore.googleapis.com",Uf=!0,co=class{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new K(V.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Vd,this.ssl=Uf}else this.host=e.host,this.ssl=e.ssl??Uf;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e._customHeaders&&(this._customHeaders={...e._customHeaders}),e.cacheSizeBytes===void 0)this.cacheSizeBytes=kd;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<cE)throw new K(V.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}if(rd("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Ld(e.experimentalLongPollingOptions??{}),function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new K(V.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new K(V.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new K(V.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams,e.grpcFlowControlWindow!==void 0){if(typeof e.grpcFlowControlWindow!="number"||e.grpcFlowControlWindow<=0||e.grpcFlowControlWindow>2147483647||!Number.isInteger(e.grpcFlowControlWindow))throw new K(V.INVALID_ARGUMENT,"grpcFlowControlWindow must be a positive integer and cannot exceed 2147483647");this.grpcFlowControlWindow=e.grpcFlowControlWindow}}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams&&this.grpcFlowControlWindow===e.grpcFlowControlWindow&&function(r,s){if(r===s)return!0;if(!r||!s)return!1;let i=Object.keys(r),a=Object.keys(s);if(i.length!==a.length)return!1;for(let u of i)if(r[u]!==s[u])return!1;return!0}(this._customHeaders,e._customHeaders)}},Po=class{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new co({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new K(V.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new K(V.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new co(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new no;switch(r.type){case"firstParty":return new mu(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new K(V.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){let r=Vf.get(t);r&&(Q(iE,"Removing Datastore"),Vf.delete(t),r.terminate())}(this),Promise.resolve()}};function Md(n,e,t,r={}){n=TB(n,Po);let s=da(e),i=n._getSettings(),a={...i,emulatorOptions:n._getEmulatorOptions()},u=`${e}:${t}`;s&&ph(`https://${u}`),i.host!==Vd&&i.host!==u&&Nt("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");let c={...i,host:u,ssl:s,emulatorOptions:r};if(!Tn(c,a)&&(n._setSettings(c),r.mockUserToken)){let l,f;if(typeof r.mockUserToken=="string")l=r.mockUserToken,f=ke.MOCK_USER;else{l=hh(r.mockUserToken,n._app?.options.projectId);let d=r.mockUserToken.sub||r.mockUserToken.user_id;if(!d)throw new K(V.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");f=new ke(d)}n._authCredentials=new pu(new to(l,f))}}var Bo=class n{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new n(this.firestore,e,this._query)}},We=class n{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Gt(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new n(this.firestore,e,this._key)}toJSON(){return{type:n._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(Js(t,n._jsonSchema))return new n(e,r||null,new ne(De.fromString(t.referencePath)))}};We._jsonSchemaVersion="firestore/documentReference/1.0",We._jsonSchema={type:Oe("string",We._jsonSchemaVersion),referencePath:Oe("string")};var Gt=class n extends Bo{constructor(e,t,r){super(e,t,Td(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){let e=this._path.popLast();return e.isEmpty()?null:new We(this.firestore,null,new ne(e))}withConverter(e){return new n(this.firestore,e,this._path)}};function xB(n,e,...t){if(n=xt(n),nd("collection","path",e),n instanceof Po){let r=De.fromString(e,...t);return yf(r),new Gt(n,null,r)}{if(!(n instanceof We||n instanceof Gt))throw new K(V.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let r=n._path.child(De.fromString(e,...t));return yf(r),new Gt(n.firestore,null,r)}}function Gd(n,e,...t){if(n=xt(n),arguments.length===1&&(e=gr.newId()),nd("doc","path",e),n instanceof Po){let r=De.fromString(e,...t);return Df(r),new We(n,null,new ne(r))}{if(!(n instanceof We||n instanceof Gt))throw new K(V.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let r=n._path.child(De.fromString(e,...t));return Df(r),new We(n.firestore,n instanceof Gt?n.converter:null,new ne(r))}}var ft=class n{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0}(this._values,e._values)}toJSON(){return{type:n._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Js(e,n._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new n(e.vectorValues);throw new K(V.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}};ft._jsonSchemaVersion="firestore/vectorValue/1.0",ft._jsonSchema={type:Oe("string",ft._jsonSchemaVersion),vectorValues:Oe("object")};var lE=/^__.*__$/,Ou=class{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new Ht(e,this.data,this.fieldMask,t,this.fieldTransforms):new Qn(e,this.data,t,this.fieldTransforms)}};function Hd(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw ee(40011,{dataSource:n})}}var Nu=class n{constructor(e,t,r,s,i,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.validatePath(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}contextWith(e){return new n({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}childContextForField(e){let t=this.path?.child(e),r=this.contextWith({path:t,arrayElement:!1});return r.validatePathSegment(e),r}childContextForFieldPath(e){let t=this.path?.child(e),r=this.contextWith({path:t,arrayElement:!1});return r.validatePath(),r}childContextForArray(e){return this.contextWith({path:void 0,arrayElement:!0})}createError(e){return lo(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}validatePath(){if(this.path)for(let e=0;e<this.path.length;e++)this.validatePathSegment(this.path.get(e))}validatePathSegment(e){if(e.length===0)throw this.createError("Document fields must not be empty");if(Hd(this.dataSource)&&lE.test(e))throw this.createError('Document fields cannot begin and end with "__"')}},Pu=class{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||No(e)}createContext(e,t,r,s=!1){return new Nu({dataSource:e,methodName:t,targetDoc:r,path:tt.emptyPath(),arrayElement:!1,hasConverter:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}};function Ud(n){let e=n._freezeSettings(),t=No(n._databaseId);return new Pu(n._databaseId,!!e.ignoreUndefinedProperties,t)}function qd(n,e,t,r,s,i={}){let a=n.createContext(i.merge||i.mergeFields?2:0,e,t,s);zd("Data must be an object, but it was:",a,r);let u=jd(r,a),c,l;if(i.merge)c=new St(a.fieldMask),l=a.fieldTransforms;else if(i.mergeFields){let f=[];for(let d of i.mergeFields){let y=Qs(e,d,t);if(!a.contains(y))throw new K(V.INVALID_ARGUMENT,`Field '${y}' is specified in your field mask but missing from your input data.`);fE(f,y)||f.push(y)}c=new St(f),l=a.fieldTransforms.filter(d=>c.covers(d.field))}else c=null,l=a.fieldTransforms;return new Ou(new ht(u),c,l)}var Fu=class n extends Nr{_toFieldTransform(e){return new nu(e.path,new jn)}isEqual(e){return e instanceof n}};function Ss(n,e,t){if(Kd(n=xt(n)))return zd("Unsupported field value:",e,n),jd(n,e);if(n instanceof Nr)return function(s,i){if(!Hd(i.dataSource))throw i.createError(`${s._methodName}() can only be used with update() and set()`);if(!i.path)throw i.createError(`${s._methodName}() is not currently supported inside arrays`);let a=s._toFieldTransform(i);a&&i.fieldTransforms.push(a)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.createError("Nested arrays are not supported");return function(s,i){let a=[],u=0;for(let c of s){let l=Ss(c,i.childContextForArray(u));l==null&&(l={nullValue:"NULL_VALUE"}),a.push(l),u++}return{arrayValue:{values:a}}}(n,e)}return function(s,i,a){if((s=xt(s))===null)return{nullValue:"NULL_VALUE"};if(typeof s=="number")return OB(i.serializer,s);if(typeof s=="boolean")return{booleanValue:s};if(typeof s=="string")return{stringValue:s};if(s instanceof Date){let u=Te.fromDate(s);return{timestampValue:qi(i.serializer,u)}}if(s instanceof Te){let u=new Te(s.seconds,1e3*Math.floor(s.nanoseconds/1e3));return{timestampValue:qi(i.serializer,u)}}if(Jd(s)){let u=Te.fromInstant(s),c=new Te(u.seconds,1e3*Math.floor(u.nanoseconds/1e3));return{timestampValue:qi(i.serializer,c)}}if(s instanceof on)return{geoPointValue:{latitude:s.latitude,longitude:s.longitude}};if(s instanceof sn)return{bytesValue:Km(i.serializer,s._byteString)};if(s instanceof We){let u=i.databaseId,c=s.firestore._databaseId;if(!c.isEqual(u))throw i.createError(`Document reference is for database ${c.projectId}/${c.database} but should be for database ${u.projectId}/${u.database}`);return{referenceValue:Od(s.firestore._databaseId||i.databaseId,s._key.path)}}if(s instanceof ft)return function(c,l){let f=c instanceof ft?c.toArray():c;return{mapValue:{fields:{[RB]:{stringValue:SB},[Dr]:{arrayValue:{values:f.map(y=>{if(typeof y!="number")throw l.createError("VectorValues must only contain numeric values.");return Oo(l.serializer,y)})}}}}}}(s,i);if(Pd(s))return s._toProto(i.serializer);throw i.createError(`Unsupported field value: ${So(s)}`)}(n,e)}function jd(n,e){let t={};return td(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Gr(n,(r,s)=>{let i=Ss(s,e.childContextForField(r));i!=null&&(t[r]=i)}),{mapValue:{fields:t}}}function Jd(n){if(typeof n!="object"||n===null)return!1;if(typeof Temporal<"u"&&typeof Temporal.Instant=="function"&&n instanceof Temporal.Instant)return!0;let e=n;return e[Symbol.toStringTag]==="Temporal.Instant"&&typeof e.t=="bigint"}function Kd(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof Te||n instanceof on||n instanceof sn||n instanceof We||n instanceof Nr||n instanceof ft||Jd(n)||Pd(n))}function zd(n,e,t){if(!Kd(t)||!js(t)){let r=So(t);throw r==="an object"?e.createError(n+" a custom object"):e.createError(n+" "+r)}}function Qs(n,e,t){if((e=xt(e))instanceof Or)return e._internalPath;if(typeof e=="string")return Qd(n,e);throw lo("Field path arguments must be of type string or ",n,!1,void 0,t)}var hE=new RegExp("[~\\*/\\[\\]]");function Qd(n,e,t){if(e.search(hE)>=0)throw lo(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Or(...e.split("."))._internalPath}catch{throw lo(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function lo(n,e,t,r,s){let i=r&&!r.isEmpty(),a=s!==void 0,u=`Function ${e}() called with invalid data`;t&&(u+=" (via `toFirestore()`)"),u+=". ";let c="";return(i||a)&&(c+=" (found",i&&(c+=` in field ${r}`),a&&(c+=` in document ${s}`),c+=")"),new K(V.INVALID_ARGUMENT,u+n+c)}function fE(n,e){return n.some(t=>t.isEqual(e))}function dE(n){return typeof n._readUserData=="function"}var Je=class n{constructor(e){this.optionDefinitions=e}_getKnownOptions(e,t){let r=ht.empty();for(let s in this.optionDefinitions)if(this.optionDefinitions.hasOwnProperty(s)){let i=this.optionDefinitions[s];if(s in e){let a=e[s],u;i.nestedOptions&&js(a)?u={mapValue:{fields:new n(i.nestedOptions).getOptionsProto(t,a)}}:a&&(u=Ss(a,t)??void 0),u&&r.set(tt.fromServerFormat(i.serverName),u)}}return r}getOptionsProto(e,t,r){let s=this._getKnownOptions(t,e);if(r){let i=new Map(ed(r,(a,u)=>[tt.fromServerFormat(u),a!==void 0?Ss(a,e):null]));s.setAll(i)}return s.value.mapValue.fields??{}}};function CE(n){return typeof n=="object"&&n!==null&&!!("nullValue"in n&&(n.nullValue===null||n.nullValue==="NULL_VALUE")||"booleanValue"in n&&(n.booleanValue===null||typeof n.booleanValue=="boolean")||"integerValue"in n&&(n.integerValue===null||typeof n.integerValue=="number"||typeof n.integerValue=="string")||"doubleValue"in n&&(n.doubleValue===null||typeof n.doubleValue=="number")||"timestampValue"in n&&(n.timestampValue===null||function(t){return typeof t=="object"&&t!==null&&"seconds"in t&&(t.seconds===null||typeof t.seconds=="number"||typeof t.seconds=="string")&&"nanos"in t&&(t.nanos===null||typeof t.nanos=="number")}(n.timestampValue))||"stringValue"in n&&(n.stringValue===null||typeof n.stringValue=="string")||"bytesValue"in n&&(n.bytesValue===null||n.bytesValue instanceof Uint8Array)||"referenceValue"in n&&(n.referenceValue===null||typeof n.referenceValue=="string")||"geoPointValue"in n&&(n.geoPointValue===null||function(t){return typeof t=="object"&&t!==null&&"latitude"in t&&(t.latitude===null||typeof t.latitude=="number")&&"longitude"in t&&(t.longitude===null||typeof t.longitude=="number")}(n.geoPointValue))||"arrayValue"in n&&(n.arrayValue===null||function(t){return typeof t=="object"&&t!==null&&!(!("values"in t)||t.values!==null&&!Array.isArray(t.values))}(n.arrayValue))||"mapValue"in n&&(n.mapValue===null||function(t){return typeof t=="object"&&t!==null&&!(!("fields"in t)||t.fields!==null&&!js(t.fields))}(n.mapValue))||"fieldReferenceValue"in n&&(n.fieldReferenceValue===null||typeof n.fieldReferenceValue=="string")||"functionValue"in n&&(n.functionValue===null||function(t){return typeof t=="object"&&t!==null&&!(!("name"in t)||t.name!==null&&typeof t.name!="string"||!("args"in t)||t.args!==null&&!Array.isArray(t.args))}(n.functionValue))||"pipelineValue"in n&&(n.pipelineValue===null||function(t){return typeof t=="object"&&t!==null&&!(!("stages"in t)||t.stages!==null&&!Array.isArray(t.stages))}(n.pipelineValue)))}function LB(){return new Fu("serverTimestamp")}function $d(n){return new ft(n)}function H(n){let e;return n instanceof jt?n:(e=js(n)?mE(n):n instanceof Array?EE(n):Wd(n,void 0),e)}function Qa(n){if(n instanceof jt)return n;if(n instanceof ft)return vs(n);if(Array.isArray(n))return vs($d(n));throw new Error("Unsupported value: "+typeof n)}function kB(n){return ym(n)?pE(n):H(n)}var jt=class{constructor(){this._protoValueType="ProtoValue"}add(e){return new P("add",[this,H(e)],"add")}asBoolean(){if(this instanceof hn)return this;if(this instanceof Pr)return new fo(this);if(this instanceof Xn)return new ku(this);if(this instanceof P)return new ho(this);throw new K("invalid-argument",`Conversion of type ${typeof this} to BooleanExpression not supported.`)}subtract(e){return new P("subtract",[this,H(e)],"subtract")}multiply(e){return new P("multiply",[this,H(e)],"multiply")}divide(e){return new P("divide",[this,H(e)],"divide")}mod(e){return new P("mod",[this,H(e)],"mod")}equal(e){return new P("equal",[this,H(e)],"equal").asBoolean()}notEqual(e){return new P("not_equal",[this,H(e)],"notEqual").asBoolean()}lessThan(e){return new P("less_than",[this,H(e)],"lessThan").asBoolean()}lessThanOrEqual(e){return new P("less_than_or_equal",[this,H(e)],"lessThanOrEqual").asBoolean()}greaterThan(e){return new P("greater_than",[this,H(e)],"greaterThan").asBoolean()}greaterThanOrEqual(e){return new P("greater_than_or_equal",[this,H(e)],"greaterThanOrEqual").asBoolean()}arrayConcat(e,...t){let r=[e,...t].map(s=>H(s));return new P("array_concat",[this,...r],"arrayConcat")}arrayContains(e){return new P("array_contains",[this,H(e)],"arrayContains").asBoolean()}arrayContainsAll(e){let t=Array.isArray(e)?new xn(e.map(H),"arrayContainsAll"):e;return new P("array_contains_all",[this,t],"arrayContainsAll").asBoolean()}arrayContainsAny(e){let t=Array.isArray(e)?new xn(e.map(H),"arrayContainsAny"):e;return new P("array_contains_any",[this,t],"arrayContainsAny").asBoolean()}arrayReverse(){return new P("array_reverse",[this])}arrayLength(){return new P("array_length",[this],"arrayLength")}equalAny(e){let t=Array.isArray(e)?new xn(e.map(H),"equalAny"):e;return new P("equal_any",[this,t],"equalAny").asBoolean()}notEqualAny(e){let t=Array.isArray(e)?new xn(e.map(H),"notEqualAny"):e;return new P("not_equal_any",[this,t],"notEqualAny").asBoolean()}exists(){return new P("exists",[this],"exists").asBoolean()}charLength(){return new P("char_length",[this],"charLength")}like(e){return new P("like",[this,H(e)],"like").asBoolean()}regexContains(e){return new P("regex_contains",[this,H(e)],"regexContains").asBoolean()}regexFind(e){return new P("regex_find",[this,H(e)],"regexFind")}regexFindAll(e){return new P("regex_find_all",[this,H(e)],"regexFindAll")}regexMatch(e){return new P("regex_match",[this,H(e)],"regexMatch").asBoolean()}stringContains(e){return new P("string_contains",[this,H(e)],"stringContains").asBoolean()}startsWith(e){return new P("starts_with",[this,H(e)],"startsWith").asBoolean()}endsWith(e){return new P("ends_with",[this,H(e)],"endsWith").asBoolean()}toLower(){return new P("to_lower",[this],"toLower")}toUpper(){return new P("to_upper",[this],"toUpper")}trim(e){let t=[this];return e&&t.push(H(e)),new P("trim",t,"trim")}ltrim(e){let t=[this];return e&&t.push(H(e)),new P("ltrim",t,"ltrim")}rtrim(e){let t=[this];return e&&t.push(H(e)),new P("rtrim",t,"rtrim")}type(){return new P("type",[this])}isType(e){return new P("is_type",[this,vs(e)],"isType").asBoolean()}stringConcat(e,...t){let r=[e,...t].map(H);return new P("string_concat",[this,...r],"stringConcat")}stringIndexOf(e){return new P("string_index_of",[this,H(e)],"stringIndexOf")}stringRepeat(e){return new P("string_repeat",[this,H(e)],"stringRepeat")}stringReplaceAll(e,t){return new P("string_replace_all",[this,H(e),H(t)],"stringReplaceAll")}stringReplaceOne(e,t){return new P("string_replace_one",[this,H(e),H(t)],"stringReplaceOne")}concat(e,...t){let r=[e,...t].map(H);return new P("concat",[this,...r],"concat")}reverse(){return new P("reverse",[this],"reverse")}arrayFilter(e,t){return new P("array_filter",[this,H(e),t],"arrayFilter")}arrayTransform(e,t){return new P("array_transform",[this,H(e),t],"arrayTransform")}arrayTransformWithIndex(e,t,r){return new P("array_transform",[this,H(e),H(t),r],"arrayTransformWithIndex")}arraySlice(e,t){let r=[this,H(e)];return t!==void 0&&r.push(H(t)),new P("array_slice",r,"arraySlice")}arrayFirst(){return new P("array_first",[this],"arrayFirst")}arrayFirstN(e){return new P("array_first_n",[this,H(e)],"arrayFirstN")}arrayLast(){return new P("array_last",[this],"arrayLast")}arrayLastN(e){return new P("array_last_n",[this,H(e)],"arrayLastN")}arrayMaximum(){return new P("maximum",[this],"arrayMaximum")}arrayMaximumN(e){return new P("maximum_n",[this,H(e)],"arrayMaximumN")}arrayMinimum(){return new P("minimum",[this],"arrayMinimum")}arrayMinimumN(e){return new P("minimum_n",[this,H(e)],"arrayMinimumN")}arrayIndexOf(e){return new P("array_index_of",[this,H(e),H("first")],"arrayIndexOf")}arrayLastIndexOf(e){return new P("array_index_of",[this,H(e),H("last")],"arrayLastIndexOf")}arrayIndexOfAll(e){return new P("array_index_of_all",[this,H(e)],"arrayIndexOfAll")}byteLength(){return new P("byte_length",[this],"byteLength")}ceil(){return new P("ceil",[this])}floor(){return new P("floor",[this])}abs(){return new P("abs",[this])}exp(){return new P("exp",[this])}mapGet(e){return new P("map_get",[this,vs(e)],"mapGet")}mapSet(e,t,...r){let s=[this,H(e),H(t),...r.map(H)];return new P("map_set",s,"mapSet")}mapKeys(){return new P("map_keys",[this],"mapKeys")}mapValues(){return new P("map_values",[this],"mapValues")}mapEntries(){return new P("map_entries",[this],"mapEntries")}getField(e){return new P("get_field",[this,H(e)],"get_field")}count(){return at._create("count",[this],"count")}sum(){return at._create("sum",[this],"sum")}average(){return at._create("average",[this],"average")}minimum(){return at._create("minimum",[this],"minimum")}maximum(){return at._create("maximum",[this],"maximum")}first(){return at._create("first",[this],"first")}last(){return at._create("last",[this],"last")}arrayAgg(){return at._create("array_agg",[this],"arrayAgg")}arrayAggDistinct(){return at._create("array_agg_distinct",[this],"arrayAggDistinct")}countDistinct(){return at._create("count_distinct",[this],"countDistinct")}logicalMaximum(e,...t){let r=[e,...t];return new P("maximum",[this,...r.map(H)],"logicalMaximum")}logicalMinimum(e,...t){let r=[e,...t];return new P("minimum",[this,...r.map(H)],"minimum")}vectorLength(){return new P("vector_length",[this],"vectorLength")}cosineDistance(e){return new P("cosine_distance",[this,Qa(e)],"cosineDistance")}dotProduct(e){return new P("dot_product",[this,Qa(e)],"dotProduct")}euclideanDistance(e){return new P("euclidean_distance",[this,Qa(e)],"euclideanDistance")}unixMicrosToTimestamp(){return new P("unix_micros_to_timestamp",[this],"unixMicrosToTimestamp")}timestampToUnixMicros(){return new P("timestamp_to_unix_micros",[this],"timestampToUnixMicros")}unixMillisToTimestamp(){return new P("unix_millis_to_timestamp",[this],"unixMillisToTimestamp")}timestampToUnixMillis(){return new P("timestamp_to_unix_millis",[this],"timestampToUnixMillis")}unixSecondsToTimestamp(){return new P("unix_seconds_to_timestamp",[this],"unixSecondsToTimestamp")}timestampToUnixSeconds(){return new P("timestamp_to_unix_seconds",[this],"timestampToUnixSeconds")}timestampAdd(e,t){return new P("timestamp_add",[this,H(e),H(t)],"timestampAdd")}timestampSubtract(e,t){return new P("timestamp_subtract",[this,H(e),H(t)],"timestampSubtract")}timestampDiff(e,t){return new P("timestamp_diff",[this,kB(e),H(t)],"timestampDiff")}timestampExtract(e,t){let r=[this,H(e)];return t&&r.push(H(t)),new P("timestamp_extract",r,"timestampExtract")}documentId(){return new P("document_id",[this],"documentId")}parent(){return new P("parent",[this],"parent")}substring(e,t){let r=H(e);return new P("substring",t===void 0?[this,r]:[this,r,H(t)],"substring")}arrayGet(e){return new P("array_get",[this,H(e)],"arrayGet")}isError(){return new P("is_error",[this],"isError").asBoolean()}ifError(e){let t=new P("if_error",[this,H(e)],"ifError");return e instanceof hn?t.asBoolean():t}isAbsent(){return new P("is_absent",[this],"isAbsent").asBoolean()}mapRemove(e){return new P("map_remove",[this,H(e)],"mapRemove")}mapMerge(e,...t){let r=H(e),s=t.map(H);return new P("map_merge",[this,r,...s],"mapMerge")}pow(e){return new P("pow",[this,H(e)])}trunc(e){return e===void 0?new P("trunc",[this]):new P("trunc",[this,H(e)],"trunc")}round(e){return e===void 0?new P("round",[this]):new P("round",[this,H(e)],"round")}collectionId(){return new P("collection_id",[this])}length(){return new P("length",[this])}ln(){return new P("ln",[this])}sqrt(){return new P("sqrt",[this])}stringReverse(){return new P("string_reverse",[this])}ifAbsent(e){return new P("if_absent",[this,H(e)],"ifAbsent")}ifNull(e){return new P("if_null",[this,H(e)],"ifNull")}coalesce(e,...t){return new P("coalesce",[this,H(e),...t.map(H)],"coalesce")}join(e){return new P("join",[this,H(e)],"join")}log10(){return new P("log10",[this])}arraySum(){return new P("sum",[this])}split(e){return new P("split",[this,H(e)])}timestampTruncate(e,t){let r=[this,H(e)];return t&&r.push(H(t)),new P("timestamp_trunc",r)}ascending(){return _E(this)}descending(){return DE(this)}as(e){return new Lu(this,e,"as")}},at=class n{constructor(e,t){this.name=e,this.params=t,this.exprType="AggregateFunction",this._protoValueType="ProtoValue"}static _create(e,t,r){let s=new n(e,t);return s._methodName=r,s}as(e){return new xu(this,e,"as")}_toProto(e){return{functionValue:{name:this.name,args:this.params.map(t=>t._toProto(e))}}}_readUserData(e){e=this._methodName?e.contextWith({methodName:this._methodName}):e,this.params.forEach(t=>t._readUserData(e))}},xu=class{constructor(e,t,r){this.aggregate=e,this.alias=t,this._methodName=r}_readUserData(e){this.aggregate._readUserData(e)}},Lu=class{constructor(e,t,r){this.expr=e,this.alias=t,this._methodName=r,this.exprType="AliasedExpression",this.selectable=!0}_readUserData(e){this.expr._readUserData(e)}},xn=class extends jt{constructor(e,t){super(),this.cr=e,this._methodName=t,this.expressionType="ListOfExpressions"}_toProto(e){return{arrayValue:{values:this.cr.map(t=>t._toProto(e))}}}_readUserData(e){this.cr.forEach(t=>t._readUserData(e))}},Xn=class extends jt{constructor(e,t){super(),this.fieldPath=e,this._methodName=t,this.expressionType="Field",this.selectable=!0}get _fieldPath(){return this.fieldPath}get fieldName(){return this.fieldPath.canonicalString()}get alias(){return this.fieldName}get expr(){return this}geoDistance(e){return new P("geo_distance",[this,H(e)],"geoDistance")}_toProto(e){return{fieldReferenceValue:this.fieldPath.canonicalString()}}_readUserData(e){}};function pE(n){return gE(n,"field")}function gE(n,e){return new Xn(typeof n=="string"?Er===n?xd()._internalPath:Qs("field",n):n._internalPath,e)}var Pr=class n extends jt{constructor(e,t){super(),this.value=e,this._methodName=t,this.expressionType="Constant"}static _fromProto(e){let t=new n(e,void 0);return t._protoValue=e,t}_toProto(e){return Y(this._protoValue!==void 0,237),this._protoValue}_getValue(){return this._protoValue}_readUserData(e){e=this._methodName?e.contextWith({methodName:this._methodName}):e,CE(this._protoValue)||(this._protoValue=Ss(this.value,e))}};function vs(n,e){return Wd(n,"constant")}function Wd(n,e){let t=new Pr(n,e);return typeof n=="boolean"?new fo(t):t}var P=class extends jt{constructor(e,t,r,s){super(),this.name=e,this.params=t,this.expressionType="Function",this._optionsProto=void 0,r!==void 0&&(this._methodName=r),s!==void 0&&(this._options=s)}get _optionsUtil(){return new Je({})}_toProto(e){let t={functionValue:{name:this.name,args:this.params.map(r=>r._toProto(e))}};return this._optionsProto&&(t.functionValue.options=this._optionsProto),t}_readUserData(e){e=this._methodName?e.contextWith({methodName:this._methodName}):e,this.params.forEach(t=>t._readUserData(e)),this._options&&(this._optionsProto=this._optionsUtil.getOptionsProto(e,this._options))}},hn=class n extends jt{get _methodName(){return this._expr._methodName}countIf(){return at._create("count_if",[this],"countIf")}not(){return new P("not",[this],"not").asBoolean()}conditional(e,t){return new P("conditional",[this,e,t],"conditional")}ifError(e){let t=H(e),r=new P("if_error",[this,t],"ifError");return t instanceof n?r.asBoolean():r}_toProto(e){return this._expr._toProto(e)}_readUserData(e){this._expr._readUserData(e)}},ho=class extends hn{constructor(e){super(),this._expr=e,this.expressionType="Function"}},fo=class extends hn{constructor(e){super(),this._expr=e,this.expressionType="Constant"}_getValue(){return this._expr._getValue()}},ku=class extends hn{constructor(e){super(),this._expr=e,this.expressionType="Field"}};function mE(n,e){let t=[];for(let r in n)if(Object.prototype.hasOwnProperty.call(n,r)){let s=n[r];t.push(vs(r)),t.push(H(s))}return new P("map",t,"map")}function EE(n){return function(t,r){return new P("array",t.map(s=>H(s)),r)}(n,"array")}function _E(n){return new Co(kB(n),"ascending","ascending")}function DE(n){return new Co(kB(n),"descending","descending")}var Co=class{constructor(e,t,r){this.expr=e,this.direction=t,this._methodName=r,this._protoValueType="ProtoValue"}_toProto(e){return{mapValue:{fields:{direction:Fd(this.direction),expression:this.expr._toProto(e)}}}}_readUserData(e){this.expr._readUserData(e)}};var Ye=class{constructor(e){this.optionsProto=void 0,{rawOptions:this.rawOptions,...this.knownOptions}=e}_readUserData(e){this.optionsProto=this._optionsUtil.getOptionsProto(e,this.knownOptions,this.rawOptions)}_toProto(e){return{name:this._name,options:this.optionsProto}}},po=class extends Ye{get _name(){return"add_fields"}get _optionsUtil(){return new Je({})}constructor(e,t){super(t),this.fields=e}_toProto(e){return{...super._toProto(e),args:[bs(e,this.fields)]}}_readUserData(e){super._readUserData(e),fn(this.fields,e)}};var go=class extends Ye{get _name(){return"aggregate"}get _optionsUtil(){return new Je({})}constructor(e,t,r){super(r),this.groups=e,this.accumulators=t}_toProto(e){return{...super._toProto(e),args:[bs(e,this.accumulators),bs(e,this.groups)]}}_readUserData(e){super._readUserData(e),fn(this.groups,e),fn(this.accumulators,e)}},mo=class extends Ye{get _name(){return"distinct"}get _optionsUtil(){return new Je({})}constructor(e,t){super(t),this.groups=e}_toProto(e){return{...super._toProto(e),args:[bs(e,this.groups)]}}_readUserData(e){super._readUserData(e),fn(this.groups,e)}},Fr=class extends Ye{get _name(){return"collection"}get _optionsUtil(){return new Je({forceIndex:{serverName:"force_index"}})}constructor(e,t){super(t),this.hr=e.startsWith("/")?e:"/"+e}_toProto(e){return{...super._toProto(e),args:[{referenceValue:this.hr}]}}_readUserData(e){super._readUserData(e)}},xr=class extends Ye{get _name(){return"collection_group"}get _optionsUtil(){return new Je({forceIndex:{serverName:"force_index"}})}constructor(e,t){super(t),this.collectionId=e}_toProto(e){return{...super._toProto(e),args:[{referenceValue:""},{stringValue:this.collectionId}]}}_readUserData(e){super._readUserData(e)}};var Os=class extends Ye{get _name(){return"database"}get _optionsUtil(){return new Je({})}_toProto(e){return{...super._toProto(e)}}_readUserData(e){super._readUserData(e)}},Ns=class extends Ye{get _name(){return"documents"}get _optionsUtil(){return new Je({})}constructor(e,t){if(super(t),!e||e.length===0)throw new K(V.INVALID_ARGUMENT,"Empty document paths are not allowed in DocumentsSource");let r=e.map(i=>i.startsWith("/")?i:"/"+i),s=new Set(r);if(s.size!==r.length)throw new K(V.INVALID_ARGUMENT,"Duplicate document paths are not allowed in DocumentsSource");this.Tr=r,this.Pr=s}_toProto(e){return{...super._toProto(e),args:this.Tr.map(t=>({referenceValue:t}))}}_readUserData(e){super._readUserData(e)}},Ps=class extends Ye{get _name(){return"where"}get _optionsUtil(){return new Je({})}constructor(e,t){super(t),this.condition=e}_toProto(e){return{...super._toProto(e),args:[this.condition._toProto(e)]}}_readUserData(e){super._readUserData(e),fn(this.condition,e)}};var Lr=class extends Ye{get _name(){return"limit"}get _optionsUtil(){return new Je({})}constructor(e,t){Y(!isNaN(e)&&e!==1/0&&e!==-1/0,34860),super(t),this.limit=e}_toProto(e){return{...super._toProto(e),args:[OB(e,this.limit)]}}},Eo=class extends Ye{get _name(){return"offset"}get _optionsUtil(){return new Je({})}constructor(e,t){super(t),this.offset=e}_toProto(e){return{...super._toProto(e),args:[OB(e,this.offset)]}}},Vu=class extends Ye{get _name(){return"select"}get _optionsUtil(){return new Je({})}constructor(e,t){super(t),this.selections=e}_toProto(e){return{...super._toProto(e),args:[bs(e,this.selections)]}}_readUserData(e){super._readUserData(e),fn(this.selections,e)}},Fs=class extends Ye{get _name(){return"sort"}get _optionsUtil(){return new Je({})}constructor(e,t){super(t),this.orderings=e}_toProto(e){return{...super._toProto(e),args:this.orderings.map(t=>t._toProto(e))}}_readUserData(e){super._readUserData(e),fn(this.orderings,e)}};var Mu=class n extends Ye{get _name(){return"replace_with"}get _optionsUtil(){return new Je({})}constructor(e,t){super(t),this.map=e}_toProto(e){return{...super._toProto(e),args:[this.map._toProto(e),Fd(n.Ir)]}}_readUserData(e){super._readUserData(e),fn(this.map,e)}};Mu.Ir="full_replace";function fn(n,e){return dE(n)?n._readUserData(e):Array.isArray(n)?n.forEach(t=>t._readUserData(e)):n instanceof Map?n.forEach(t=>t._readUserData(e)):Object.values(n).forEach(t=>t._readUserData(e)),n}var je=class{constructor(e,t,r){this.serializer=e,this.stages=t,this.listenOptions=r,this.isCorePipeline=!0}getPipelineCollection(){return Fo(this)}getPipelineCollectionGroup(){return VB(this)}getPipelineCollectionId(){return yE(this)}getPipelineDocuments(){return Gu(this)}getPipelineFlavor(){return function(t){let r="exact";return t.stages.forEach((s,i)=>{s._name!==mo.name&&s._name!==go.name||(r="keyless"),s._name===Vu.name&&r==="exact"&&(r="augmented"),s._name===po.name&&i<t.stages.length-1&&r==="exact"&&(r="augmented")}),r}(this)}getPipelineSourceType(){return an(this)}};function an(n){let e=n.stages[0];return e instanceof Fr||e instanceof xr||e instanceof Os||e instanceof Ns?e._name:"unknown"}function Fo(n){if(an(n)==="collection")return n.stages[0].hr}function VB(n){if(an(n)==="collection_group")return n.stages[0].collectionId}function yE(n){switch(an(n)){case"collection":return De.fromString(Fo(n)).lastSegment();case"collection_group":return VB(n);default:return}}function Gu(n){if(an(n)==="documents")return n.stages[0].Tr}var T=class n{constructor(e,t){this.type=e,this.value=t}static mr(){return new n("ERROR",void 0)}static pr(){return new n("UNSET",void 0)}static gr(){return new n("NULL",yr)}static newValue(e){return wt(e)?new n("NULL",yr):function(r){return!!r&&"booleanValue"in r}(e)?new n("BOOLEAN",e):vt(e)?new n("INT",e):Fn(e)?new n("DOUBLE",e):function(r){return!!r&&"timestampValue"in r&&!!r.timestampValue}(e)?new n("TIMESTAMP",e):function(r){return!!r&&"stringValue"in r}(e)?new n("STRING",e):function(r){return!!r&&"bytesValue"in r}(e)?new n("BYTES",e):e.referenceValue?new n("REFERENCE",e):e.geoPointValue?new n("GEO_POINT",e):Ir(e)?new n("ARRAY",e):ws(e)?new n("VECTOR",e):kn(e)?new n("MAP",e):new n("ERROR",void 0)}yr(){return this.type==="ERROR"||this.type==="UNSET"}wr(){return this.type==="NULL"}};function _s(n){if(!n.yr())return n.value}function Yd(n){return n instanceof hn?n._expr:n}function X(n){if((n=Yd(n))instanceof Xn)return new Hu(n);if(n instanceof Pr)return new Uu(n);if(n instanceof xn)return new qu(n);if(n instanceof P){if(n.name==="add")return new ju(n);if(n.name==="subtract")return new Ju(n);if(n.name==="multiply")return new Ku(n);if(n.name==="divide")return new zu(n);if(n.name==="mod")return new Qu(n);if(n.name==="and")return new $u(n);if(n.name==="equal")return new uc(n);if(n.name==="not_equal")return new cc(n);if(n.name==="less_than")return new Bc(n);if(n.name==="less_than_or_equal")return new lc(n);if(n.name==="greater_than")return new hc(n);if(n.name==="greater_than_or_equal")return new fc(n);if(n.name==="array_concat")return new dc(n);if(n.name==="array_reverse")return new Cc(n);if(n.name==="array_contains")return new pc(n);if(n.name==="array_contains_all")return new gc(n);if(n.name==="array_contains_any")return new mc(n);if(n.name==="array_length")return new Ec(n);if(n.name==="array_element")return new _c(n);if(n.name==="equal_any")return new _o(n);if(n.name==="not_equal_any")return new Xu(n);if(n.name==="is_nan")return new Zu(n);if(n.name==="is_not_nan")return new ec(n);if(n.name==="is_null")return new tc(n);if(n.name==="is_not_null")return new nc(n);if(n.name==="is_error")return new rc(n);if(n.name==="exists")return new sc(n);if(n.name==="not")return new kr(n);if(n.name==="or")return new Wu(n);if(n.name==="xor")return new Yu(n);if(n.name==="conditional")return new ic(n);if(n.name==="maximum")return new oc(n);if(n.name==="minimum")return new ac(n);if(n.name==="reverse")return new Dc(n);if(n.name==="replace_first")return new yc(n);if(n.name==="replace_all")return new wc(n);if(n.name==="char_length")return new Ic(n);if(n.name==="byte_length")return new Tc(n);if(n.name==="like")return new Ac(n);if(n.name==="regex_contains")return new bc(n);if(n.name==="regex_match")return new Rc(n);if(n.name==="string_contains")return new Sc(n);if(n.name==="starts_with")return new vc(n);if(n.name==="ends_with")return new Oc(n);if(n.name==="to_lower")return new Nc(n);if(n.name==="to_upper")return new Pc(n);if(n.name==="trim")return new Fc(n);if(n.name==="string_concat")return new xc(n);if(n.name==="map_get")return new Lc(n);if(n.name==="cosine_distance")return new kc(n);if(n.name==="dot_product")return new Vc(n);if(n.name==="euclidean_distance")return new Mc(n);if(n.name==="vector_length")return new Gc(n);if(n.name==="unix_micros_to_timestamp")return new Hc(n);if(n.name==="timestamp_to_unix_micros")return new jc(n);if(n.name==="unix_millis_to_timestamp")return new Uc(n);if(n.name==="timestamp_to_unix_millis")return new Jc(n);if(n.name==="unix_seconds_to_timestamp")return new qc(n);if(n.name==="timestamp_to_unix_seconds")return new Kc(n);if(n.name==="timestamp_add")return new zc(n);if(n.name==="timestamp_subtract")return new Qc(n)}throw new Error(`Unknown Expr : ${n}`)}var Hu=class{constructor(e){this.expr=e}evaluate(e,t){if(this.expr.fieldName===Er)return T.newValue({referenceValue:eo(e.serializer,t.key)});if(this.expr.fieldName==="__update_time__")return T.newValue({timestampValue:ji(e.serializer,t.version)});if(this.expr.fieldName==="__create_time__")return T.newValue({timestampValue:ji(e.serializer,t.createTime)});let r=t.data.field(this.expr._fieldPath);return r?Ks(r)?T.newValue(function(i,a){if(i.serverTimestampBehavior==="estimate")return{timestampValue:ji(i.serializer,ye.fromTimestamp(Ds(a)))};if(i.serverTimestampBehavior==="previous"){let u=vo(a);if(u)return u}return{nullValue:"NULL_VALUE"}}(e,r)):T.newValue(r):T.pr()}},Uu=class{constructor(e){this.expr=e}evaluate(e,t){return T.newValue(this.expr._getValue())}},qu=class{constructor(e){this.expr=e}evaluate(e,t){let r=this.expr.cr.map(s=>X(s).evaluate(e,t));return r.some(s=>s.yr())?T.mr():T.newValue({arrayValue:{values:r.map(s=>s.value)}})}};function He(n){return Fn(n)?Number(n.doubleValue):Number(n.integerValue)}function Pt(n){return BigInt(n.integerValue)}var wE=BigInt("0x7fffffffffffffff"),IE=-BigInt("0x8000000000000000"),Zn=class{constructor(e){this.expr=e}evaluate(e,t){Y(this.expr.params.length>=2,24778);let r=X(this.expr.params[0]).evaluate(e,t),s=X(this.expr.params[1]).evaluate(e,t),i=this.br(r,s);for(let a of this.expr.params.slice(2)){let u=X(a).evaluate(e,t);i=this.br(i,u)}return i}br(e,t){if(e.yr()||t.yr())return T.mr();if(e.wr()||t.wr())return T.gr();let r=e.value,s=t.value;if(!Fn(r)&&!vt(r)||!Fn(s)&&!vt(s))return T.mr();if(Fn(r)||Fn(s)){let i=this.Sr(r,s);return i?T.newValue(i):T.mr()}if(vt(r)&&vt(s)){let i=this.vr(r,s);return i===void 0?T.mr():typeof i=="number"?T.newValue({doubleValue:i}):i<IE||i>wE?T.mr():T.newValue({integerValue:`${i}`})}return T.mr()}};function Jt(n,e){return Fe(n)!==Fe(e)?"TYPE_MISMATCH":Ct(n)||Ct(e)?"NOT_EQ":wt(n)&&wt(e)?"EQ":wt(n)||wt(e)?"NULL":Ir(n)&&Ir(e)?function(r,s){if(r.values?.length!==s.values?.length)return"NOT_EQ";let i=!1;for(let a=0;a<(r.values?.length??0);a++){let u=r.values[a],c=s.values[a];switch(Jt(u,c)){case"EQ":break;case"NOT_EQ":case"TYPE_MISMATCH":return"NOT_EQ";case"NULL":i=!0;break;default:ee(44609,{Dr:u,Cr:c})}}return i?"NULL":"EQ"}(n.arrayValue,e.arrayValue):ws(n)&&ws(e)||kn(n)&&kn(e)?function(r,s){let i=r.fields||{},a=s.fields||{};if(zi(i)!==zi(a))return"NOT_EQ";let u=!1;for(let c in i)if(i.hasOwnProperty(c)){if(a[c]===void 0)return"NOT_EQ";switch(Jt(i[c],a[c])){case"NOT_EQ":case"TYPE_MISMATCH":return"NOT_EQ";case"NULL":u=!0}}return u?"NULL":"EQ"}(n.mapValue,e.mapValue):function(r,s){return dt(r,s,{u:!1,i:!0,o:!0})}(n,e)?"EQ":"NOT_EQ"}var ju=class extends Zn{vr(e,t){return Pt(e)+Pt(t)}Sr(e,t){return{doubleValue:He(e)+He(t)}}},Ju=class extends Zn{constructor(e){super(e),this.expr=e}vr(e,t){return Pt(e)-Pt(t)}Sr(e,t){return{doubleValue:He(e)-He(t)}}},Ku=class extends Zn{constructor(e){super(e),this.expr=e}vr(e,t){return Pt(e)*Pt(t)}Sr(e,t){return{doubleValue:He(e)*He(t)}}},zu=class extends Zn{constructor(e){super(e),this.expr=e}vr(e,t){let r=Pt(t);if(r!==BigInt(0))return Pt(e)/r}Sr(e,t){let r=He(t);return r===0?{doubleValue:_r(r)?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY}:{doubleValue:He(e)/r}}},Qu=class extends Zn{constructor(e){super(e),this.expr=e}vr(e,t){let r=Pt(t);if(r!==BigInt(0))return Pt(e)%r}Sr(e,t){let r=He(t);if(r!==0)return{doubleValue:He(e)%r}}},$u=class{constructor(e){this.expr=e}evaluate(e,t){let r=!1,s=!1;for(let i of this.expr.params){let a=X(i).evaluate(e,t);switch(a.type){case"BOOLEAN":if(!a.value?.booleanValue)return T.newValue(Ve);break;case"NULL":s=!0;break;default:r=!0}}return r?T.mr():s?T.gr():T.newValue(nt)}},kr=class{constructor(e){this.expr=e}evaluate(e,t){Y(this.expr.params.length===1,9634);let r=X(this.expr.params[0]).evaluate(e,t);switch(r.type){case"BOOLEAN":return T.newValue({booleanValue:!r.value?.booleanValue});case"NULL":return T.gr();default:return T.mr()}}},Wu=class{constructor(e){this.expr=e}evaluate(e,t){let r=!1,s=!1;for(let i of this.expr.params){let a=X(i).evaluate(e,t);switch(a.type){case"BOOLEAN":if(a.value?.booleanValue)return T.newValue(nt);break;case"NULL":s=!0;break;default:r=!0}}return r?T.mr():s?T.gr():T.newValue(Ve)}},Yu=class n{constructor(e){this.expr=e}evaluate(e,t){let r=!1,s=!1;for(let i of this.expr.params){let a=X(i).evaluate(e,t);switch(a.type){case"BOOLEAN":r=n.xor(r,!!a.value?.booleanValue);break;case"NULL":s=!0;break;default:return T.mr()}}return s?T.gr():T.newValue({booleanValue:r})}static xor(e,t){return(e||t)&&!(e&&t)}},_o=class{constructor(e){this.expr=e}evaluate(e,t){Y(this.expr.params.length===2,55094);let r=!1,s=X(this.expr.params[0]).evaluate(e,t);switch(s.type){case"NULL":r=!0;break;case"ERROR":case"UNSET":return T.mr()}let i=X(this.expr.params[1]).evaluate(e,t);switch(i.type){case"ARRAY":break;case"NULL":r=!0;break;default:return T.mr()}if(r)return T.gr();for(let a of i.value?.arrayValue?.values??[])switch(wt(s.value)&&wt(a)?"EQ":Jt(s.value,a)){case"EQ":return T.newValue(nt);case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":r=!0;break;default:ee(44608,{value:s.value,candidate:a})}return r?T.gr():T.newValue(Ve)}},Xu=class{constructor(e){this.expr=e}evaluate(e,t){return new kr(new P("not",[new P("equal_any",this.expr.params)])).evaluate(e,t)}},Zu=class{constructor(e){this.expr=e}evaluate(e,t){Y(this.expr.params.length===1,23322);let r=X(this.expr.params[0]).evaluate(e,t);switch(r.type){case"INT":return T.newValue(Ve);case"DOUBLE":return T.newValue({booleanValue:isNaN(He(r.value))});case"NULL":return T.gr();default:return T.mr()}}},ec=class{constructor(e){this.expr=e}evaluate(e,t){return Y(this.expr.params.length===1,50406),new kr(new P("not",[new P("is_nan",this.expr.params)])).evaluate(e,t)}},tc=class{constructor(e){this.expr=e}evaluate(e,t){switch(Y(this.expr.params.length===1,23123),X(this.expr.params[0]).evaluate(e,t).type){case"NULL":return T.newValue(nt);case"UNSET":case"ERROR":return T.mr();default:return T.newValue(Ve)}}},nc=class{constructor(e){this.expr=e}evaluate(e,t){return Y(this.expr.params.length===1,23167),new kr(new P("not",[new P("is_null",this.expr.params)])).evaluate(e,t)}},rc=class{constructor(e){this.expr=e}evaluate(e,t){return Y(this.expr.params.length===1,5228),X(this.expr.params[0]).evaluate(e,t).type==="ERROR"?T.newValue(nt):T.newValue(Ve)}},sc=class{constructor(e){this.expr=e}evaluate(e,t){switch(Y(this.expr.params.length===1,6877),X(this.expr.params[0]).evaluate(e,t).type){case"ERROR":return T.mr();case"UNSET":return T.newValue(Ve);default:return T.newValue(nt)}}},ic=class{constructor(e){this.expr=e}evaluate(e,t){Y(this.expr.params.length===3,11706);let r=X(this.expr.params[0]).evaluate(e,t);switch(r.type){case"BOOLEAN":return r.value?.booleanValue?X(this.expr.params[1]).evaluate(e,t):X(this.expr.params[2]).evaluate(e,t);case"NULL":return X(this.expr.params[2]).evaluate(e,t);default:return T.mr()}}},oc=class{constructor(e){this.expr=e}evaluate(e,t){let r=this.expr.params.map(i=>X(i).evaluate(e,t)),s;for(let i of r)switch(i.type){case"ERROR":case"UNSET":case"NULL":continue;default:s=s===void 0||rt(i.value,s.value)>0?i:s}return s===void 0?T.gr():s}},ac=class{constructor(e){this.expr=e}evaluate(e,t){let r=this.expr.params.map(i=>X(i).evaluate(e,t)),s;for(let i of r)switch(i.type){case"ERROR":case"UNSET":case"NULL":continue;default:s=s===void 0||rt(i.value,s.value)<0?i:s}return s===void 0?T.gr():s}},dn=class{constructor(e){this.expr=e}evaluate(e,t){Y(this.expr.params.length===2,31033,`${this.expr.name}() function should have exactly 2 params`);let r=X(this.expr.params[0]).evaluate(e,t);switch(r.type){case"ERROR":case"UNSET":return T.mr()}let s=X(this.expr.params[1]).evaluate(e,t);switch(s.type){case"ERROR":case"UNSET":return T.mr()}return this.Fr(r,s)}},uc=class extends dn{constructor(e){super(e),this.expr=e}Fr(e,t){if(e.wr()&&t.wr())return T.newValue(nt);if(e.wr()||t.wr()||Ct(e.value)||Ct(t.value)||Fe(e.value)!==Fe(t.value))return T.newValue(Ve);switch(Jt(e.value,t.value)){case"EQ":return T.newValue(nt);case"NOT_EQ":return T.newValue(Ve);case"NULL":return T.gr();default:ee(44615,{left:e,right:t})}}},cc=class extends dn{constructor(e){super(e),this.expr=e}Fr(e,t){switch(Jt(e.value,t.value)){case"EQ":return T.newValue(Ve);case"NOT_EQ":case"TYPE_MISMATCH":return T.newValue(nt);case"NULL":return T.gr();default:ee(44614,{left:e,right:t})}}},Bc=class extends dn{constructor(e){super(e),this.expr=e}Fr(e,t){return Fe(e.value)!==Fe(t.value)||Ct(e.value)||Ct(t.value)?T.newValue(Ve):T.newValue({booleanValue:rt(e.value,t.value)<0})}},lc=class extends dn{constructor(e){super(e),this.expr=e}Fr(e,t){return Fe(e.value)!==Fe(t.value)||Ct(e.value)||Ct(t.value)?T.newValue(Ve):Jt(e.value,t.value)==="EQ"?T.newValue(nt):T.newValue({booleanValue:rt(e.value,t.value)<0})}},hc=class extends dn{constructor(e){super(e),this.expr=e}Fr(e,t){return Fe(e.value)!==Fe(t.value)||Ct(e.value)||Ct(t.value)?T.newValue(Ve):T.newValue({booleanValue:rt(e.value,t.value)>0})}},fc=class extends dn{constructor(e){super(e),this.expr=e}Fr(e,t){return Fe(e.value)!==Fe(t.value)||Ct(e.value)||Ct(t.value)?T.newValue(Ve):Jt(e.value,t.value)==="EQ"?T.newValue(nt):T.newValue({booleanValue:rt(e.value,t.value)>0})}},dc=class{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}},Cc=class{constructor(e){this.expr=e}evaluate(e,t){Y(this.expr.params.length===1,216);let r=X(this.expr.params[0]).evaluate(e,t);switch(r.type){case"NULL":return T.gr();case"ARRAY":{let s=r.value.arrayValue?.values??[];return T.newValue({arrayValue:{values:[...s].reverse()}})}default:return T.mr()}}},pc=class{constructor(e){this.expr=e}evaluate(e,t){return Y(this.expr.params.length===2,52884),new _o(new P("eq_any",[this.expr.params[1],this.expr.params[0]])).evaluate(e,t)}},gc=class{constructor(e){this.expr=e}evaluate(e,t){Y(this.expr.params.length===2,1392);let r=!1,s=X(this.expr.params[0]).evaluate(e,t);switch(s.type){case"ARRAY":break;case"NULL":r=!0;break;default:return T.mr()}let i=X(this.expr.params[1]).evaluate(e,t);switch(i.type){case"ARRAY":break;case"NULL":r=!0;break;default:return T.mr()}if(r)return T.gr();let a=i.value?.arrayValue?.values??[],u=s.value?.arrayValue?.values??[];for(let c of a){let l=!1;r=!1;for(let f of u){switch(wt(c)&&wt(f)?"EQ":Jt(c,f)){case"EQ":l=!0;break;case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":r=!0;break;default:ee(44613,{value:f,search:c})}if(l)break}if(!l)return T.newValue(Ve)}return T.newValue(nt)}},mc=class{constructor(e){this.expr=e}evaluate(e,t){Y(this.expr.params.length===2,2680);let r=!1,s=X(this.expr.params[0]).evaluate(e,t);switch(s.type){case"ARRAY":break;case"NULL":r=!0;break;default:return T.mr()}let i=X(this.expr.params[1]).evaluate(e,t);switch(i.type){case"ARRAY":break;case"NULL":r=!0;break;default:return T.mr()}if(r)return T.gr();let a=i.value?.arrayValue?.values??[],u=s.value?.arrayValue?.values??[];for(let c of u)for(let l of a)switch(wt(c)&&wt(l)?"EQ":Jt(c,l)){case"EQ":return T.newValue(nt);case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":r=!0;break;default:ee(60403,{value:c,search:l})}return r?T.gr():T.newValue(Ve)}},Ec=class{constructor(e){this.expr=e}evaluate(e,t){Y(this.expr.params.length===1,38605);let r=X(this.expr.params[0]).evaluate(e,t);switch(r.type){case"NULL":return T.gr();case"ARRAY":return T.newValue({integerValue:`${r.value?.arrayValue?.values?.length??0}`});default:return T.mr()}}},_c=class{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}},Dc=class{constructor(e){this.expr=e}evaluate(e,t){Y(this.expr.params.length===1,1508);let r=X(this.expr.params[0]).evaluate(e,t);switch(r.type){case"NULL":return T.gr();case"BYTES":{let s=r.value?.bytesValue;if(typeof s=="string"){let i=ct.fromBase64String(s).toUint8Array();return i.reverse(),T.newValue({bytesValue:ct.fromUint8Array(i).toBase64()})}return T.newValue({bytesValue:new Uint8Array(s).reverse()})}case"STRING":{let s=r.value?.stringValue,i=new Intl.__PRIVATE_Segmenter(void 0,{granularity:"grapheme"}).segment(s),a=Array.from(i,u=>u.segment).reverse();return T.newValue({stringValue:a.join("")})}default:return T.mr()}}},yc=class{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}},wc=class{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}},Ic=class{constructor(e){this.expr=e}evaluate(e,t){Y(this.expr.params.length===1,19400);let r=X(this.expr.params[0]).evaluate(e,t);switch(r.type){case"NULL":return T.gr();case"STRING":{let s=function(a){let u=0;for(let c=0;c<a.length;c++){let l=a.codePointAt(c);if(l===void 0)return;if(l<=65535)if(l>=55296&&l<=57343)if(l<=56319){let f=a.codePointAt(c+1);f!==void 0&&f>=56320&&f<=57343?(u+=1,c++):u+=1}else u+=1;else u+=1;else{if(!(l<=1114111))return;u+=1,c++}}return u}(r.value.stringValue);return s===void 0?T.mr():T.newValue({integerValue:s})}default:return T.mr()}}},Tc=class{constructor(e){this.expr=e}evaluate(e,t){Y(this.expr.params.length===1,8486);let r=X(this.expr.params[0]).evaluate(e,t);switch(r.type){case"BYTES":{let s=r.value?.bytesValue;return typeof s=="string"?T.newValue({integerValue:ct.fromBase64String(s).toUint8Array().length}):T.newValue({integerValue:new Uint8Array(s).length})}case"STRING":{let s=function(a){let u=0;for(let c=0;c<a.length;c++){let l=a.codePointAt(c);if(l===void 0)return;if(l>=55296&&l<=57343){if(!(l<=56319))return;{let f=a.codePointAt(c+1);if(f===void 0||!(f>=56320&&f<=57343))return;u+=4,c++}}else if(l<=127)u+=1;else if(l<=2047)u+=2;else if(l<=65535)u+=3;else{if(!(l<=1114111))return;u+=4,c++}}return u}(r.value?.stringValue);return s===void 0?T.mr():T.newValue({integerValue:s})}case"NULL":return T.gr();default:return T.mr()}}},Cn=class{constructor(e){this.expr=e}evaluate(e,t){Y(this.expr.params.length===2,39773,`${this.expr.name}() function should have exactly two parameters`);let r=!1,s=X(this.expr.params[0]).evaluate(e,t);switch(s.type){case"STRING":break;case"NULL":r=!0;break;default:return T.mr()}let i=X(this.expr.params[1]).evaluate(e,t);switch(i.type){case"STRING":break;case"NULL":r=!0;break;default:return T.mr()}return r?T.gr():this.Or(s.value?.stringValue,i.value?.stringValue)}},Ac=class extends Cn{Or(e,t){try{let r=function(a){let u="";for(let c=0;c<a.length;c++){let l=a.charAt(c);switch(l){case"_":u+=".";break;case"%":u+=".*";break;case"\\":case".":case"*":case"?":case"+":case"^":case"$":case"|":case"(":case")":case"[":case"]":case"{":case"}":u+="\\"+l;break;default:u+=l}}return"^"+u+"$"}(t),s=Li.compile(r);return T.newValue({booleanValue:s.matches(e)})}catch(r){return Nt(`Invalid LIKE pattern converted to regex: ${t}, returning error. Error: ${r}`),T.mr()}}},bc=class extends Cn{Or(e,t){try{let r=Li.compile(t);return T.newValue({booleanValue:r.test(e)})}catch{return Nt(`Invalid regex pattern found in regex_contains: ${t}, returning error`),T.mr()}}},Rc=class extends Cn{Or(e,t){try{return T.newValue({booleanValue:Li.compile(t).matches(e)})}catch{return Nt(`Invalid regex pattern found in regex_match: ${t}, returning error`),T.mr()}}},Sc=class extends Cn{Or(e,t){return T.newValue({booleanValue:e.includes(t)})}},vc=class extends Cn{Or(e,t){return T.newValue({booleanValue:e.startsWith(t)})}},Oc=class extends Cn{Or(e,t){return T.newValue({booleanValue:e.endsWith(t)})}},Nc=class{constructor(e){this.expr=e}evaluate(e,t){Y(this.expr.params.length===1,29079);let r=X(this.expr.params[0]).evaluate(e,t);switch(r.type){case"STRING":return T.newValue({stringValue:r.value?.stringValue?.toLowerCase()});case"NULL":return T.gr();default:return T.mr()}}},Pc=class{constructor(e){this.expr=e}evaluate(e,t){Y(this.expr.params.length===1,60487);let r=X(this.expr.params[0]).evaluate(e,t);switch(r.type){case"STRING":return T.newValue({stringValue:r.value?.stringValue?.toUpperCase()});case"NULL":return T.gr();default:return T.mr()}}},Fc=class{constructor(e){this.expr=e}evaluate(e,t){Y(this.expr.params.length===1,28544);let r=X(this.expr.params[0]).evaluate(e,t);switch(r.type){case"STRING":return T.newValue({stringValue:r.value?.stringValue?.trim()});case"NULL":return T.gr();default:return T.mr()}}},xc=class{constructor(e){this.expr=e}evaluate(e,t){let r=this.expr.params.map(a=>X(a).evaluate(e,t)),s="",i=!1;for(let a of r)switch(a.type){case"STRING":s+=a.value.stringValue;break;case"NULL":i=!0;break;default:return T.mr()}return i?T.gr():T.newValue({stringValue:s})}},Lc=class{constructor(e){this.expr=e}evaluate(e,t){Y(this.expr.params.length===2,4483);let r=X(this.expr.params[0]).evaluate(e,t);switch(r.type){case"UNSET":return T.pr();case"MAP":break;default:return T.mr()}let s=X(this.expr.params[1]).evaluate(e,t);if(s.type!=="STRING")return T.mr();let i=r.value?.mapValue?.fields?.[s.value?.stringValue];return i===void 0?T.pr():T.newValue(i)}},xs=class{constructor(e){this.expr=e}evaluate(e,t){Y(this.expr.params.length===2,25231,`${this.expr.name}() function should have exactly 2 params`);let r=!1,s=X(this.expr.params[0]).evaluate(e,t);switch(s.type){case"VECTOR":break;case"NULL":r=!0;break;default:return T.mr()}let i=X(this.expr.params[1]).evaluate(e,t);switch(i.type){case"VECTOR":break;case"NULL":r=!0;break;default:return T.mr()}if(r)return T.gr();let a=tu(s.value),u=tu(i.value);if(a===void 0||u===void 0||a.values?.length!==u.values?.length)return T.mr();let c=this.Mr(a,u);return c===void 0||isNaN(c)?T.mr():T.newValue({doubleValue:c})}},kc=class extends xs{Mr(e,t){let r=e?.values??[],s=t?.values??[];if(r.length===0)return;let i=0,a=0,u=0;for(let l=0;l<r.length;l++){if(!ln(r[l])||!ln(s[l]))return;let f=He(r[l]),d=He(s[l]);i+=f*d,a+=f*f,u+=d*d}let c=Math.sqrt(a)*Math.sqrt(u);if(c!==0)return 1-Math.max(-1,Math.min(1,i/c))}},Vc=class extends xs{Mr(e,t){let r=e?.values??[],s=t?.values??[];if(r.length===0)return 0;let i=0;for(let a=0;a<r.length;a++){if(!ln(r[a])||!ln(s[a]))return;i+=He(r[a])*He(s[a])}return i}},Mc=class extends xs{Mr(e,t){let r=e?.values??[],s=t?.values??[];if(r.length===0)return 0;let i=0;for(let a=0;a<r.length;a++){if(!ln(r[a])||!ln(s[a]))return;let u=He(r[a]),c=He(s[a]);i+=Math.pow(u-c,2)}return Math.sqrt(i)}},Gc=class{constructor(e){this.expr=e}evaluate(e,t){Y(this.expr.params.length===1,39044);let r=X(this.expr.params[0]).evaluate(e,t);switch(r.type){case"VECTOR":{let s=tu(r.value);return T.newValue({integerValue:s?.values?.length??0})}case"NULL":return T.gr();default:return T.mr()}}},Ls=BigInt(-62135596800),ks=BigInt(253402300799),Do=BigInt(1e3),un=BigInt(1e6),TE=Ls*Do,AE=ks*Do+BigInt(999),bE=Ls*un,RE=ks*un+BigInt(999999);function MB(n){return n>=bE&&n<=RE}function Xd(n){return n>=Ls&&n<=ks}function Vs(n,e){let t=BigInt(n);return!(t<Ls||t>ks)&&!(e<0||e>=1e9)&&(t!==Ls||e===0)&&!(t===ks&&e>999999999)}function Zd(n,e){return e<0?{seconds:n-1,nanos:e+1e9}:{seconds:n,nanos:e}}function GB(n){return BigInt(n.seconds)*un+BigInt(Math.trunc(n.nanoseconds/1e3))}var Ms=class{constructor(e){this.expr=e}evaluate(e,t){Y(this.expr.params.length===1,49262,`${this.expr.name}() function should have exactly one parameter`);let r=X(this.expr.params[0]).evaluate(e,t);switch(r.type){case"INT":return this.toTimestamp(BigInt(r.value.integerValue));case"NULL":return T.gr();default:return T.mr()}}},Hc=class extends Ms{toTimestamp(e){if(!MB(e))return T.mr();let t=Number(e/un),r=Number(e%un*BigInt(1e3)),s=Zd(t,r);return t=s.seconds,r=s.nanos,Vs(t,r)?T.newValue({timestampValue:{seconds:t,nanos:r}}):T.mr()}},Uc=class extends Ms{toTimestamp(e){if(!function(a){return a>=TE&&a<=AE}(e))return T.mr();let t=Number(e/Do),r=Number(e%Do*BigInt(1e6)),s=Zd(t,r);return t=s.seconds,r=s.nanos,Vs(t,r)?T.newValue({timestampValue:{seconds:t,nanos:r}}):T.mr()}},qc=class extends Ms{toTimestamp(e){if(!Xd(e))return T.mr();let t=Number(e);return T.newValue({timestampValue:{seconds:t,nanos:0}})}},Gs=class{constructor(e){this.expr=e}evaluate(e,t){Y(this.expr.params.length===1,1265,`${this.expr.name}() function should have exactly one parameter`);let r=X(this.expr.params[0]).evaluate(e,t);switch(r.type){case"TIMESTAMP":break;case"NULL":return T.gr();default:return T.mr()}let s=PB(r.value.timestampValue);return Vs(s.seconds,s.nanoseconds)?this.Nr(s):T.mr()}},jc=class extends Gs{Nr(e){let t=GB(e);return MB(t)?T.newValue({integerValue:`${t.toString()}`}):T.mr()}},Jc=class extends Gs{Nr(e){let t=GB(e),r=t/BigInt(1e3),s=t%BigInt(1e3);return r>BigInt(0)||s===BigInt(0)?T.newValue({integerValue:r.toString()}):T.newValue({integerValue:(r-BigInt(1)).toString()})}},Kc=class extends Gs{Nr(e){let t=BigInt(e.seconds);return Xd(t)?T.newValue({integerValue:t.toString()}):T.mr()}},yo=class{constructor(e){this.expr=e}evaluate(e,t){Y(this.expr.params.length===3,2775,`${this.expr.name}() function should have exactly 3 parameters`);let r=!1,s=X(this.expr.params[0]).evaluate(e,t);switch(s.type){case"TIMESTAMP":break;case"NULL":r=!0;break;default:return T.mr()}let i=X(this.expr.params[1]).evaluate(e,t),a;switch(i.type){case"STRING":if(a=function(W){switch(W){case"microsecond":return"microsecond";case"millisecond":return"millisecond";case"second":return"second";case"minute":return"minute";case"hour":return"hour";case"day":return"day";default:return}}(i.value.stringValue),a===void 0)return T.mr();break;case"NULL":r=!0;break;default:return T.mr()}let u=X(this.expr.params[2]).evaluate(e,t);switch(u.type){case"INT":break;case"NULL":r=!0;break;default:return T.mr()}if(r)return T.gr();let c=BigInt(u.value.integerValue),l;try{switch(a){case"microsecond":l=c;break;case"millisecond":l=c*BigInt(1e3);break;case"second":l=c*BigInt(1e6);break;case"minute":l=c*BigInt(6e7);break;case"hour":l=c*BigInt(36e8);break;case"day":l=c*BigInt(864e8);break;default:return T.mr()}if(a!=="microsecond"&&c!==BigInt(0)&&l/c!==BigInt(this.Lr(a)))return T.mr()}catch(z){return Nt(`Error during timestamp arithmetic: ${z}`),T.mr()}let f=PB(s.value.timestampValue);if(!Vs(f.seconds,f.nanoseconds))return T.mr();let d=GB(f),y=this.Br(d,l);if(!MB(y))return T.mr();let R=Number(y/un),v=y%un,L=Number((v<0?v+un:v)*BigInt(1e3)),j=v<0?R-1:R;return Vs(j,L)?T.newValue({timestampValue:{seconds:j,nanos:L}}):T.mr()}Lr(e){switch(e){case"millisecond":return 1e3;case"second":return 1e6;case"minute":return 6e7;case"hour":return 36e8;case"day":return 864e8;default:return 1}}},zc=class extends yo{Br(e,t){return e+t}},Qc=class extends yo{Br(e,t){return e-t}};function Hs(n){if((n=Yd(n))instanceof Xn)return`fld(${n.fieldName})`;if(n instanceof Pr)return`cst(${function(t){return t===null?"null":typeof t=="number"?t.toString():typeof t=="string"?`"${t}"`:t instanceof We?`ref(${t.path})`:t instanceof ft?`vec(${JSON.stringify(t)})`:JSON.stringify(t)}(n.value)})`;if(n instanceof P)return`fn(${n.name},[${n.params.map(Hs).join(",")}])`;if(n.expressionType==="ListOfExpressions")return`list([${n.cr.map(Hs).join(",")}])`;throw new Error(`Unrecognized expr ${JSON.stringify(n,null,2)}`)}function SE(n){if(n instanceof po)return`${n._name}(${Mi(n.fields)})`;if(n instanceof go){let e=`${n._name}(${Mi(n.accumulators)})`;return n.groups.size>0&&(e+=`grouping(${Mi(n.groups)})`),e}if(n instanceof mo)return`${n._name}(${Mi(n.groups)})`;if(n instanceof Fr)return`${n._name}(${n.hr})`;if(n instanceof xr)return`${n._name}(${n.collectionId})`;if(n instanceof Os)return`${n._name}()`;if(n instanceof Ns)return`${n._name}(${n.Tr.sort()})`;if(n instanceof Ps)return`${n._name}(${Hs(n.condition)})`;if(n instanceof Lr)return`${n._name}(${n.limit})`;if(n instanceof Fs)return`${n._name}(${function(t){return t.map(r=>`${Hs(r.expr)}${r.direction}`).join(",")}(n.orderings)})`;throw new Error(`Unrecognized stage ${n._name}`)}function Mi(n){return`${Array.from(n.entries()).sort().map(([e,t])=>`${e}=${Hs(t)}`).join(",")}`}function cn(n){return n.stages.map(e=>SE(e)).join("|")}function eC(n,e){return cn(n)===cn(e)}function Rt(n){return n instanceof je}function qf(n){return Rt(n)?cn(n):Ui(n)}function tC(n){return Rt(n)?cn(n):function(t){return`${wd(Vn(t))}|lt:${t.limitType}`}(n)}function nC(n,e){return n instanceof je&&e instanceof je?eC(n,e):!(n instanceof je&&!(e instanceof je)||!(n instanceof je)&&e instanceof je)&&km(n,e)}function rC(n){return Pm(n)?cn(n):wd(n)}function sC(n,e){return n instanceof je&&e instanceof je?eC(n,e):!(n instanceof je&&!(e instanceof je)||!(n instanceof je)&&e instanceof je)&&Id(n,e)}var $c=class{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){let r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){let i=this.mutations[s];i.key.isEqual(e.key)&&Am(i,e,r[s])}}applyToLocalView(e,t){for(let r of this.baseMutations)r.key.isEqual(e.key)&&(t=gs(r,e,t,this.localWriteTime));for(let r of this.mutations)r.key.isEqual(e.key)&&(t=gs(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){let r=vd();return this.mutations.forEach(s=>{let i=e.get(s.key),a=i.overlayedDocument,u=this.applyToLocalView(a,i.mutatedFields);u=t.has(s.key)?null:u;let c=pd(a,u);c!==null&&r.set(s.key,c),a.isValidDocument()||a.convertToNoDocument(ye.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),Me())}isEqual(e){return this.batchId===e.batchId&&mr(this.mutations,e.mutations,(t,r)=>Rf(t,r))&&mr(this.baseMutations,e.baseMutations,(t,r)=>Rf(t,r))}},Wc=class n{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){Y(e.mutations.length===r.length,58842,{Ur:e.mutations.length,kr:r.length});let s=function(){return Um}(),i=e.mutations;for(let a=0;a<i.length;a++)s=s.insert(i[a].key,r[a].version);return new n(e,t,r,s)}};var iC="";function vE(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=jf(e)),e=OE(n.get(t),e);return jf(e)}function OE(n,e){let t=e,r=n.length;for(let s=0;s<r;s++){let i=n.charAt(s);switch(i){case"\0":t+="";break;case iC:t+="";break;default:t+=i}}return t}function jf(n){return n+iC+""}var NE="remoteDocuments",oC="owner";var aC="mutationQueues";var uC="mutations";var cC="documentMutations",PE="remoteDocumentsV14";var BC="remoteDocumentGlobal";var lC="targets";var hC="targetDocuments";var fC="targetGlobal",dC="collectionParents";var CC="clientMetadata";var pC="bundles";var gC="namedQueries";var FE="indexConfiguration";var xE="indexState";var LE="indexEntries";var mC="documentOverlays";var kE="globals";var VE=[aC,uC,cC,NE,lC,oC,fC,hC,CC,BC,dC,pC,gC],Ry=[...VE,mC],ME=[aC,uC,cC,PE,lC,oC,fC,hC,CC,BC,dC,pC,gC,mC],GE=ME,HE=[...GE,FE,xE,LE];var Sy=[...HE,kE];var Yc=class{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}};var Xc=class{constructor(e){this.$r=e}};function UE(n){let e=Zm({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Zi(e,e.limit,"L"):e}var wo=class{constructor(){}ei(e,t){this.ti(e,t),t.ni()}ti(e,t){if("nullValue"in e)this.ri(t,5);else if("booleanValue"in e)this.ri(t,10),t.ii(e.booleanValue?1:0);else if("integerValue"in e)this.ri(t,15),t.ii(Ie(e.integerValue));else if("doubleValue"in e){let r=Ie(e.doubleValue);isNaN(r)?this.ri(t,13):(this.ri(t,15),_r(r)?t.ii(0):t.ii(r))}else if("timestampValue"in e){let r=e.timestampValue;this.ri(t,20),typeof r=="string"&&(r=Bn(r)),t.si(`${r.seconds||""}`),t.ii(r.nanos||0)}else if("stringValue"in e)this._i(e.stringValue,t),this.oi(t);else if("bytesValue"in e)this.ri(t,30),t.ai(qn(e.bytesValue)),this.oi(t);else if("referenceValue"in e)this.ui(e.referenceValue,t);else if("geoPointValue"in e){let r=e.geoPointValue;this.ri(t,45),t.ii(r.latitude||0),t.ii(r.longitude||0)}else"mapValue"in e?Bd(e)?this.ri(t,Number.MAX_SAFE_INTEGER):ws(e)?this.ci(e.mapValue,t):(this.li(e.mapValue,t),this.oi(t)):"arrayValue"in e?(this.Ei(e.arrayValue,t),this.oi(t)):ee(19022,{hi:e})}_i(e,t){this.ri(t,25),this.Ti(e,t)}Ti(e,t){t.si(e)}li(e,t){let r=e.fields||{};this.ri(t,55);for(let s of Object.keys(r))this._i(s,t),this.ti(r[s],t)}ci(e,t){let r=e.fields||{};this.ri(t,53);let s=Dr,i=r[s].arrayValue?.values?.length||0;this.ri(t,15),t.ii(Ie(i)),this._i(s,t),this.ti(r[s],t)}Ei(e,t){let r=e.values||[];this.ri(t,50);for(let s of r)this.ti(s,t)}ui(e,t){this.ri(t,37),ne.fromName(e).path.forEach(r=>{this.ri(t,60),this.Ti(r,t)})}ri(e,t){e.ii(t)}oi(e){e.ii(2)}};wo.Pi=new wo;var Zc=class{constructor(){this.Zi=new eB}addToCollectionParentIndex(e,t){return this.Zi.add(t),M.resolve()}getCollectionParents(e,t){return M.resolve(this.Zi.getEntries(t))}addFieldIndex(e,t){return M.resolve()}deleteFieldIndex(e,t){return M.resolve()}deleteAllFieldIndexes(e){return M.resolve()}createTargetIndexes(e,t){return M.resolve()}getDocumentsMatchingTarget(e,t){return M.resolve(null)}getIndexType(e,t){return M.resolve(0)}getFieldIndexes(e,t){return M.resolve([])}getNextCollectionGroupToUpdate(e){return M.resolve(null)}getMinOffset(e,t){return M.resolve(Yn.min())}getMinOffsetFromCollectionGroup(e,t){return M.resolve(Yn.min())}updateCollectionGroup(e,t,r){return M.resolve()}updateIndexEntries(e,t){return M.resolve()}},eB=class{constructor(){this.index={}}add(e){let t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new Ge(De.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){let t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new Ge(De.comparator)).toArray()}};var vy=new Uint8Array(0);var er=class n{constructor(e){this.ys=e}next(){return this.ys+=2,this.ys}static ws(){return new n(0)}static bs(){return new n(-1)}};function qE(n,e){let t=e;for(let r of n.stages)t=jE({serializer:n.serializer,serverTimestampBehavior:n.listenOptions?.serverTimestampBehavior},r,t);return t}function HB(n,e){return qE(n,[e]).length>0}function jE(n,e,t){if(e instanceof Fr)return function(s,i,a){return a.filter(u=>u.isFoundDocument()&&`/${u.key.getCollectionPath().canonicalString()}`===i.hr)}(0,e,t);if(e instanceof Ps)return function(s,i,a){return a.filter(u=>{let c=_s(X(i.condition).evaluate(s,u));return c!==void 0&&dt(c,nt)})}(n,e,t);if(e instanceof xr)return function(s,i,a){return a.filter(u=>u.isFoundDocument()&&u.key.getCollectionPath().lastSegment()===i.collectionId)}(0,e,t);if(e instanceof Os)return function(s,i,a){return a.filter(u=>u.isFoundDocument())}(0,0,t);if(e instanceof Ns)return function(s,i,a){return a.filter(u=>u.isFoundDocument()&&i.Pr.has(u.key.path.toStringWithLeadingSlash()))}(0,e,t);if(e instanceof Lr)return function(s,i,a){return a.slice(0,i.limit)}(0,e,t);if(e instanceof Fs)return function(s,i,a){let u=i.orderings.map(c=>({Ms:X(c.expr),direction:c.direction}));return[...a].sort((c,l)=>{for(let{Ms:f,direction:d}of u){let y=_s(f.evaluate(s,c)),R=_s(f.evaluate(s,l)),v=rt(y??yr,R??yr);if(v!==0)return d==="ascending"?v:-v}return 0})}(n,e,t);throw new Error(`Unknown stage: ${e._name}`)}function JE(n){let e=function(r){for(let s=r.stages.length-1;s>=0;s--){let i=r.stages[s];if(i instanceof Fs)return i.orderings}throw new Error("Pipeline must contain at least one Sort stage")}(n);return(t,r)=>{for(let s of e){let i=_s(X(s.expr).evaluate({serializer:n.serializer},t)),a=_s(X(s.expr).evaluate({serializer:n.serializer},r)),u=rt(i||yr,a||yr);if(u!==0)return s.direction==="ascending"?u:-u}return 0}}var tB=class{constructor(){this.changes=new qt(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Sr.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();let r=this.changes.get(t);return r!==void 0?M.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}};var nB=class{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}};var rB=class{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,t))).next(s=>(r!==null&&gs(r.mutation,s,St.empty(),Te.now()),s))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,Me()).next(()=>r))}getLocalViewOfDocuments(e,t,r=Me()){let s=nn();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,r).next(i=>{let a=ds();return i.forEach((u,c)=>{a=a.insert(u,c.overlayedDocument)}),a}))}getOverlayedDocuments(e,t){let r=nn();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,Me()))}populateOverlays(e,t,r){let s=[];return r.forEach(i=>{t.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((a,u)=>{t.set(a,u)})})}computeViews(e,t,r,s){let i=ms(),a=Es(),u=function(){return Es()}();return t.forEach((c,l)=>{let f=r.get(l.key);s.has(l.key)&&(f===void 0||f.mutation instanceof Ht)?i=i.insert(l.key,l):f!==void 0?(a.set(l.key,f.mutation.getFieldMask()),gs(f.mutation,l,f.mutation.getFieldMask(),Te.now())):a.set(l.key,St.empty())}),this.recalculateAndSaveOverlays(e,i).next(c=>(c.forEach((l,f)=>a.set(l,f)),t.forEach((l,f)=>u.set(l,new nB(f,a.get(l)??null))),u))}recalculateAndSaveOverlays(e,t){let r=Es(),s=new ut((a,u)=>a-u),i=Me();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(a=>{for(let u of a)u.keys().forEach(c=>{let l=t.get(c);if(l===null)return;let f=r.get(c)||St.empty();f=u.applyToLocalView(l,f),r.set(c,f);let d=(s.get(u.batchId)||Me()).add(c);s=s.insert(u.batchId,d)})}).next(()=>{let a=[],u=s.getReverseIterator();for(;u.hasNext();){let c=u.getNext(),l=c.key,f=c.value,d=vd();f.forEach(y=>{if(!i.has(y)){let R=pd(t.get(y),r.get(y));R!==null&&d.set(y,R),i=i.add(y)}}),a.push(this.documentOverlayCache.saveOverlays(e,l,d))}return M.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,s){return Rt(t)?this.getDocumentsMatchingPipeline(e,t,r,s):xm(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Ad(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next(i=>{let a=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):M.resolve(nn()),u=As,c=i;return a.next(l=>M.forEach(l,(f,d)=>(u<d.largestBatchId&&(u=d.largestBatchId),i.get(f)?M.resolve():this.remoteDocumentCache.getEntry(e,f).next(y=>{c=c.insert(f,y)}))).next(()=>this.populateOverlays(e,l,i)).next(()=>this.computeViews(e,c,l,Me())).next(f=>({batchId:u,changes:Sd(f)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new ne(t)).next(r=>{let s=ds();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){let i=t.collectionGroup,a=ds();return this.indexManager.getCollectionParents(e,i).next(u=>M.forEach(u,c=>{let l=function(d,y){return new vr(y,null,d.explicitOrderBy.slice(),d.filters.slice(),d.limit,d.limitType,d.startAt,d.endAt)}(t,c.child(i));return this.getDocumentsMatchingCollectionQuery(e,l,r,s).next(f=>{f.forEach((d,y)=>{a=a.insert(d,y)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,t,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s))).next(a=>this.retrieveMatchingLocalDocuments(i,a,u=>NB(t,u)))}getDocumentsMatchingPipeline(e,t,r,s){if(an(t)==="collection_group"){let i=VB(t),a=ds();return this.indexManager.getCollectionParents(e,i).next(u=>M.forEach(u,c=>{let l=function(d,y){let R=d.stages.map(v=>v instanceof xr?new Fr(y.canonicalString(),{}):v);return new je(d.serializer,R)}(t,c.child(i));return this.getDocumentsMatchingPipeline(e,l,r,s).next(f=>{f.forEach((d,y)=>{a=a.insert(d,y)})})}).next(()=>a))}{let i;return this.getOverlaysForPipeline(e,t,r.largestBatchId).next(a=>{switch(i=a,an(t)){case"collection":return this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s);case"documents":let u=Me();for(let c of Gu(t))u=u.add(ne.fromPath(c));return this.remoteDocumentCache.getEntries(e,u);case"database":return this.remoteDocumentCache.getAllEntries(e);default:throw new K("invalid-argument",`Invalid pipeline source to execute offline: ${cn(t)}`)}}).next(a=>this.retrieveMatchingLocalDocuments(i,a,u=>HB(t,u)))}}retrieveMatchingLocalDocuments(e,t,r){e.forEach((i,a)=>{let u=a.getKey();t.get(u)===null&&(t=t.insert(u,Sr.newInvalidDocument(u)))});let s=ds();return t.forEach((i,a)=>{let u=e.get(i);u!==void 0&&gs(u.mutation,a,St.empty(),Te.now()),r(a)&&(s=s.insert(i,a))}),s}getOverlaysForPipeline(e,t,r){switch(an(t)){case"collection":return this.documentOverlayCache.getOverlaysForCollection(e,De.fromString(Fo(t)),r);case"collection_group":throw new K("invalid-argument",`Unexpected collection group pipeline: ${cn(t)}`);case"documents":return this.documentOverlayCache.getOverlays(e,Gu(t).map(s=>ne.fromPath(s)));case"database":return this.documentOverlayCache.getAllOverlays(e,r);default:throw new K("invalid-argument",`Failed to get overlays for pipeline: ${cn(t)}`)}}};var sB=class{constructor(e){this.serializer=e,this.Qs=new Map,this.Ws=new Map}getBundleMetadata(e,t){return M.resolve(this.Qs.get(t))}saveBundleMetadata(e,t){return this.Qs.set(t.id,function(s){return{id:s.id,version:s.version,createTime:Cr(s.createTime)}}(t)),M.resolve()}getNamedQuery(e,t){return M.resolve(this.Ws.get(t))}saveNamedQuery(e,t){return this.Ws.set(t.name,function(s){return{name:s.name,query:UE(s.bundledQuery),readTime:Cr(s.readTime)}}(t)),M.resolve()}};var iB=class{constructor(){this.overlays=new ut(ne.comparator),this.Gs=new Map}getOverlay(e,t){return M.resolve(this.overlays.get(t))}getOverlays(e,t){let r=nn();return M.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}getAllOverlays(e,t){let r=nn();return this.overlays.forEach((s,i)=>{i.largestBatchId>t&&r.set(s,i)}),M.resolve(r)}saveOverlays(e,t,r){return r.forEach((s,i)=>{this.Zr(e,t,i)}),M.resolve()}removeOverlaysForBatchId(e,t,r){let s=this.Gs.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.Gs.delete(r)),M.resolve()}getOverlaysForCollection(e,t,r){let s=nn(),i=t.length+1,a=new ne(t.child("")),u=this.overlays.getIteratorFrom(a);for(;u.hasNext();){let c=u.getNext().value,l=c.getKey();if(!t.isPrefixOf(l.path))break;l.path.length===i&&c.largestBatchId>r&&s.set(c.getKey(),c)}return M.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new ut((l,f)=>l-f),a=this.overlays.getIterator();for(;a.hasNext();){let l=a.getNext().value;if(l.getKey().getCollectionGroup()===t&&l.largestBatchId>r){let f=i.get(l.largestBatchId);f===null&&(f=nn(),i=i.insert(l.largestBatchId,f)),f.set(l.getKey(),l)}}let u=nn(),c=i.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach((l,f)=>u.set(l,f)),!(u.size()>=s)););return M.resolve(u)}Zr(e,t,r){let s=this.overlays.get(r.key);if(s!==null){let a=this.Gs.get(s.largestBatchId).delete(r.key);this.Gs.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new Yc(t,r));let i=this.Gs.get(t);i===void 0&&(i=Me(),this.Gs.set(t,i)),this.Gs.set(t,i.add(r.key))}};var oB=class{constructor(){this.sessionToken=ct.EMPTY_BYTE_STRING}getSessionToken(e){return M.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,M.resolve()}};var Us=class{constructor(){this.zs=new Ge(ve.js),this.Hs=new Ge(ve.Js)}isEmpty(){return this.zs.isEmpty()}addReference(e,t){let r=new ve(e,t);this.zs=this.zs.add(r),this.Hs=this.Hs.add(r)}Ys(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Zs(new ve(e,t))}Xs(e,t){e.forEach(r=>this.removeReference(r,t))}e_(e){let t=new ne(new De([])),r=new ve(t,e),s=new ve(t,e+1),i=[];return this.Hs.forEachInRange([r,s],a=>{this.Zs(a),i.push(a.key)}),i}t_(){this.zs.forEach(e=>this.Zs(e))}Zs(e){this.zs=this.zs.delete(e),this.Hs=this.Hs.delete(e)}n_(e){let t=new ne(new De([])),r=new ve(t,e),s=new ve(t,e+1),i=Me();return this.Hs.forEachInRange([r,s],a=>{i=i.add(a.key)}),i}containsKey(e){let t=new ve(e,0),r=this.zs.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}},ve=class{constructor(e,t){this.key=e,this.r_=t}static js(e,t){return ne.comparator(e.key,t.key)||le(e.r_,t.r_)}static Js(e,t){return le(e.r_,t.r_)||ne.comparator(e.key,t.key)}};var aB=class{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Gr=1,this.i_=new Ge(ve.js)}checkEmpty(e){return M.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){let i=this.Gr;this.Gr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];let a=new $c(i,t,r,s);this.mutationQueue.push(a);for(let u of s)this.i_=this.i_.add(new ve(u.key,i)),this.indexManager.addToCollectionParentIndex(e,u.key.path.popLast());return M.resolve(a)}lookupMutationBatch(e,t){return M.resolve(this.s_(t))}getNextMutationBatchAfterBatchId(e,t){let r=t+1,s=this.__(r),i=s<0?0:s;return M.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return M.resolve(this.mutationQueue.length===0?AB:this.Gr-1)}getAllMutationBatches(e){return M.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){let r=new ve(t,0),s=new ve(t,Number.POSITIVE_INFINITY),i=[];return this.i_.forEachInRange([r,s],a=>{let u=this.s_(a.r_);i.push(u)}),M.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new Ge(le);return t.forEach(s=>{let i=new ve(s,0),a=new ve(s,Number.POSITIVE_INFINITY);this.i_.forEachInRange([i,a],u=>{r=r.add(u.r_)})}),M.resolve(this.o_(r))}getAllMutationBatchesAffectingQuery(e,t){let r=t.path,s=r.length+1,i=r;ne.isDocumentKey(i)||(i=i.child(""));let a=new ve(new ne(i),0),u=new Ge(le);return this.i_.forEachWhile(c=>{let l=c.key.path;return!!r.isPrefixOf(l)&&(l.length===s&&(u=u.add(c.r_)),!0)},a),M.resolve(this.o_(u))}o_(e){let t=[];return e.forEach(r=>{let s=this.s_(r);s!==null&&t.push(s)}),t}removeMutationBatch(e,t){Y(this.a_(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.i_;return M.forEach(t.mutations,s=>{let i=new ve(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.i_=r})}Hr(e){}containsKey(e,t){let r=new ve(t,0),s=this.i_.firstAfterOrEqual(r);return M.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,M.resolve()}a_(e,t){return this.__(e)}__(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}s_(e){let t=this.__(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}};var uB=class{constructor(e){this.u_=e,this.docs=function(){return new ut(ne.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){let r=t.key,s=this.docs.get(r),i=s?s.size:0,a=this.u_(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){let t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){let r=this.docs.get(t);return M.resolve(r?r.document.mutableCopy():Sr.newInvalidDocument(t))}getEntries(e,t){let r=ms();return t.forEach(s=>{let i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():Sr.newInvalidDocument(s))}),M.resolve(r)}getAllEntries(e){let t=ms();return this.docs.forEach((r,s)=>{t=t.insert(r,s.document)}),M.resolve(t)}getDocumentsMatchingQuery(e,t,r,s){let i,a;Rt(t)?(i=De.fromString(Fo(t)),a=f=>HB(t,f)):(i=t.path,a=f=>NB(t,f));let u=ms(),c=new ne(i.child("__id-9223372036854775808__")),l=this.docs.getIteratorFrom(c);for(;l.hasNext();){let{key:f,value:{document:d}}=l.getNext();if(!i.isPrefixOf(f.path))break;f.path.length>i.length+1||Nm(Om(d),r)<=0||(s.has(d.key)||a(d))&&(u=u.insert(d.key,d.mutableCopy()))}return M.resolve(u)}getAllFromCollectionGroup(e,t,r,s){ee(9500)}c_(e,t){return M.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new cB(this)}getSize(e){return M.resolve(this.size)}},cB=class extends tB{constructor(e){super(),this.$s=e}applyChanges(e){let t=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?t.push(this.$s.addEntry(e,s)):this.$s.removeEntry(r)}),M.waitFor(t)}getFromCache(e,t){return this.$s.getEntry(e,t)}getAllFromCache(e,t){return this.$s.getEntries(e,t)}};var BB=class{constructor(e){this.persistence=e,this.l_=new qt(t=>rC(t),sC),this.lastRemoteSnapshotVersion=ye.min(),this.highestTargetId=0,this.E_=0,this.h_=new Us,this.targetCount=0,this.T_=er.ws()}forEachTarget(e,t){return this.l_.forEach((r,s)=>t(s)),M.resolve()}getLastRemoteSnapshotVersion(e){return M.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return M.resolve(this.E_)}allocateTargetId(e){return this.highestTargetId=this.T_.next(),M.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.E_&&(this.E_=t),M.resolve()}Ds(e){this.l_.set(e.target,e);let t=e.targetId;t>this.highestTargetId&&(this.T_=new er(t),this.highestTargetId=t),e.sequenceNumber>this.E_&&(this.E_=e.sequenceNumber)}addTargetData(e,t){return this.Ds(t),this.targetCount+=1,M.resolve()}updateTargetData(e,t){return this.Ds(t),M.resolve()}removeTargetData(e,t){return this.l_.delete(t.target),this.h_.e_(t.targetId),this.targetCount-=1,M.resolve()}removeTargets(e,t,r){let s=0,i=[];return this.l_.forEach((a,u)=>{u.sequenceNumber<=t&&r.get(u.targetId)===null&&(this.l_.delete(a),i.push(this.removeMatchingKeysForTargetId(e,u.targetId)),s++)}),M.waitFor(i).next(()=>s)}getTargetCount(e){return M.resolve(this.targetCount)}getTargetData(e,t){let r=this.l_.get(t)||null;return M.resolve(r)}addMatchingKeys(e,t,r){return this.h_.Ys(t,r),M.resolve()}removeMatchingKeys(e,t,r){this.h_.Xs(t,r);let s=this.persistence.referenceDelegate,i=[];return s&&t.forEach(a=>{i.push(s.markPotentiallyOrphaned(e,a))}),M.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.h_.e_(t),M.resolve()}getMatchingKeysForTargetId(e,t){let r=this.h_.n_(t);return M.resolve(r)}containsKey(e,t){return M.resolve(this.h_.containsKey(t))}};var Io=class{constructor(e,t){this.P_={},this.overlays={},this.I_=new Rs(0),this.R_=!1,this.R_=!0,this.A_=new oB,this.referenceDelegate=e(this),this.V_=new BB(this),this.indexManager=new Zc,this.remoteDocumentCache=function(s){return new uB(s)}(r=>this.referenceDelegate.d_(r)),this.serializer=new Xc(t),this.f_=new sB(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.R_=!1,Promise.resolve()}get started(){return this.R_}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new iB,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.P_[e.toKey()];return r||(r=new aB(t,this.referenceDelegate),this.P_[e.toKey()]=r),r}getGlobalsCache(){return this.A_}getTargetCache(){return this.V_}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.f_}runTransaction(e,t,r){Q("MemoryPersistence","Starting transaction:",e);let s=new lB(this.I_.next());return this.referenceDelegate.m_(),r(s).next(i=>this.referenceDelegate.p_(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}g_(e,t){return M.or(Object.values(this.P_).map(r=>()=>r.containsKey(e,t)))}},lB=class extends bu{constructor(e){super(),this.currentSequenceNumber=e}},hB=class n{constructor(e){this.persistence=e,this.y_=new Us,this.w_=null}static b_(e){return new n(e)}get S_(){if(this.w_)return this.w_;throw ee(60996)}addReference(e,t,r){return this.y_.addReference(r,t),this.S_.delete(r.toString()),M.resolve()}removeReference(e,t,r){return this.y_.removeReference(r,t),this.S_.add(r.toString()),M.resolve()}markPotentiallyOrphaned(e,t){return this.S_.add(t.toString()),M.resolve()}removeTarget(e,t){this.y_.e_(t.targetId).forEach(s=>this.S_.add(s.toString()));let r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(s=>{s.forEach(i=>this.S_.add(i.toString()))}).next(()=>r.removeTargetData(e,t))}m_(){this.w_=new Set}p_(e){let t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return M.forEach(this.S_,r=>{let s=ne.fromPath(r);return this.v_(e,s).next(i=>{i||t.removeEntry(s,ye.min())})}).next(()=>(this.w_=null,t.apply(e)))}updateLimboDocument(e,t){return this.v_(e,t).next(r=>{r?this.S_.delete(t.toString()):this.S_.add(t.toString())})}d_(e){return 0}v_(e,t){return M.or([()=>M.resolve(this.y_.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.g_(e,t)])}},To=class n{constructor(e,t){this.persistence=e,this.D_=new qt(r=>vE(r.path),(r,s)=>r.isEqual(s)),this.garbageCollector=BE(this,t)}static b_(e,t){return new n(e,t)}m_(){}p_(e){return M.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}ir(e){let t=this.Cs(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>t.next(s=>r+s))}Cs(e){let t=0;return this.sr(e,r=>{t++}).next(()=>t)}sr(e,t){return M.forEach(this.D_,(r,s)=>this.Os(e,r,s).next(i=>i?M.resolve():t(s)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0,s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.c_(e,a=>this.Os(e,a,t).next(u=>{u||(r++,i.removeEntry(a,ye.min()))})).next(()=>i.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.D_.set(t,e.currentSequenceNumber),M.resolve()}removeTarget(e,t){let r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.D_.set(r,e.currentSequenceNumber),M.resolve()}removeReference(e,t,r){return this.D_.set(r,e.currentSequenceNumber),M.resolve()}updateLimboDocument(e,t){return this.D_.set(t,e.currentSequenceNumber),M.resolve()}d_(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Gi(e.data.value)),t}Os(e,t,r){return M.or([()=>this.persistence.g_(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{let s=this.D_.get(t);return M.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}};var fB=class n{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.Vo=r,this.fo=s}static mo(e,t){let r=Me(),s=Me();for(let i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new n(e,t.fromCache,r,s)}};function KE(n,e){return ne.comparator(n.key,e.key)}var dB=class{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}};var CB=class{constructor(){this.po=!1,this.yo=!1,this.wo=100,this.bo=function(){return dh()?8:uE(fh())>0?6:4}()}initialize(e,t){this.So=e,this.indexManager=t,this.po=!0}getDocumentsMatchingQuery(e,t,r,s){let i={result:null};return this.vo(e,t).next(a=>{i.result=a}).next(()=>{if(!i.result)return this.Do(e,t,s,r).next(a=>{i.result=a})}).next(()=>{if(i.result)return;let a=new dB;return this.xo(e,t,a).next(u=>{if(i.result=u,this.yo)return this.Co(e,t,a,u.size)})}).next(()=>i.result)}Co(e,t,r,s){return Rt(t)?M.resolve():r.documentReadCount<this.wo?(Br()<=ie.DEBUG&&Q("QueryEngine","SDK will not create cache indexes for query:",Ui(t),"since it only creates cache indexes for collection contains","more than or equal to",this.wo,"documents"),M.resolve()):(Br()<=ie.DEBUG&&Q("QueryEngine","Query:",Ui(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.bo*s?(Br()<=ie.DEBUG&&Q("QueryEngine","The SDK decides to create cache indexes for query:",Ui(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Vn(t))):M.resolve())}vo(e,t){if(Rt(t))return M.resolve(null);let r=t;if(Ff(r))return M.resolve(null);let s=Vn(r);return this.indexManager.getIndexType(e,s).next(i=>i===0?null:(r.limit!==null&&i===1&&(r=Zi(r,null,"F"),s=Vn(r)),this.indexManager.getDocumentsMatchingTarget(e,s).next(a=>{let u=Me(...a);return this.So.getDocuments(e,u).next(c=>this.indexManager.getMinOffset(e,s).next(l=>{let f=this.Fo(r,c);return this.Oo(r,f,u,l.readTime)?this.vo(e,Zi(r,null,"F")):this.Mo(e,f,r,l)}))})))}Do(e,t,r,s){return(Rt(t)?function(a){for(let u of a.stages){if(u instanceof Lr||u instanceof Eo)return!1;if(u instanceof Ps){if(u.condition instanceof ho&&u.condition._expr.name==="exists"&&u.condition._expr.params[0]instanceof Xn&&u.condition._expr.params[0].fieldName===Er)continue;return!1}}return!0}(t):Ff(t))||s.isEqual(ye.min())?M.resolve(null):this.So.getDocuments(e,r).next(i=>{let a=this.Fo(t,i);return this.Oo(t,a,r,s)?M.resolve(null):(Br()<=ie.DEBUG&&Q("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),qf(t)),this.Mo(e,a,t,vm(s,As)).next(u=>u))})}Fo(e,t){let r,s;return Rt(e)?(r=new Ge(KE),s=i=>HB(e,i)):(r=new Ge(bd(e)),s=i=>NB(e,i)),t.forEach((i,a)=>{s(a)&&(r=r.add(a))}),r}Oo(e,t,r,s){if(Rt(e))return function(u){return u.stages.some(c=>c instanceof Lr||c instanceof Eo)}(e);if(e.limit===null)return!1;if(r.size!==t.size)return!0;let i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}xo(e,t,r){return Br()<=ie.DEBUG&&Q("QueryEngine","Using full collection scan to execute query:",qf(t)),this.So.getDocumentsMatchingQuery(e,t,Yn.min(),r)}Mo(e,t,r,s){return this.So.getDocumentsMatchingQuery(e,r,s).next(i=>(t.forEach(a=>{i=i.insert(a.key,a)}),i))}};var zE="LocalStore";var pB=class{constructor(e,t,r,s){this.persistence=e,this.No=t,this.serializer=s,this.Lo=new ut(le),this.Bo=new qt(i=>rC(i),sC),this.Uo=new Map,this.ko=e.getRemoteDocumentCache(),this.V_=e.getTargetCache(),this.f_=e.getBundleCache(),this.qo(r)}qo(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new rB(this.ko,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.ko.setIndexManager(this.indexManager),this.No.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Lo))}};function QE(n,e,t,r){return new pB(n,e,t,r)}async function EC(n,e){let t=me(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,t.qo(e),t.mutationQueue.getAllMutationBatches(r))).next(i=>{let a=[],u=[],c=Me();for(let l of s){a.push(l.batchId);for(let f of l.mutations)c=c.add(f.key)}for(let l of i){u.push(l.batchId);for(let f of l.mutations)c=c.add(f.key)}return t.localDocuments.getDocuments(r,c).next(l=>({$o:l,removedBatchIds:a,addedBatchIds:u}))})})}function $E(n,e){let t=me(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{let s=e.batch.keys(),i=t.ko.newChangeBuffer({trackRemovals:!0});return function(u,c,l,f){let d=l.batch,y=d.keys(),R=M.resolve();return y.forEach(v=>{R=R.next(()=>f.getEntry(c,v)).next(L=>{let j=l.docVersions.get(v);Y(j!==null,48541),L.version.compareTo(j)<0&&(d.applyToRemoteDocument(L,l),L.isValidDocument()&&(L.setReadTime(l.commitVersion),f.addEntry(L)))})}),R.next(()=>u.mutationQueue.removeMutationBatch(c,d))}(t,r,e,i).next(()=>i.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(u){let c=Me();for(let l=0;l<u.mutationResults.length;++l)u.mutationResults[l].transformResults.length>0&&(c=c.add(u.batch.mutations[l].key));return c}(e))).next(()=>t.localDocuments.getDocuments(r,s))})}function WE(n){let e=me(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.V_.getLastRemoteSnapshotVersion(t))}function YE(n,e){let t=me(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=AB),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}var gB=class{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.Yo=0,this.Zo=null,this.Xo=!0}ea(){this.Yo===0&&(this.ta("Unknown"),this.Zo=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.Zo=null,this.na("Backend didn't respond within 10 seconds."),this.ta("Offline"),Promise.resolve())))}ra(e){this.state==="Online"?this.ta("Unknown"):(this.Yo++,this.Yo>=1&&(this.ia(),this.na(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ta("Offline")))}set(e){this.ia(),this.Yo=0,e==="Online"&&(this.Xo=!1),this.ta(e)}ta(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}na(e){let t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.Xo?(Un(t),this.Xo=!1):Q("OnlineStateTracker",t)}ia(){this.Zo!==null&&(this.Zo.cancel(),this.Zo=null)}};var $s="RemoteStore",mB=class{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.sa=[],this._a=new Map,this.oa=new Map,this.aa=new Map,this.ua=new er(1e3),this.ca=new er(1001),this.la=new Set,this.Ea=[],this.ha=i,this.ha.Qe(a=>{r.enqueueAndForget(async()=>{Ys(this)&&(Q($s,"Restarting streams for network reachability change."),await async function(c){let l=me(c);l.la.add(4),await Ws(l),l.Ta.set("Unknown"),l.la.delete(4),await xo(l)}(this))})}),this.Ta=new gB(r,s)}};async function xo(n){if(Ys(n))for(let e of n.Ea)await e(!0)}async function Ws(n){for(let e of n.Ea)await e(!1)}function Ys(n){return me(n).la.size===0}async function _C(n,e,t){if(!zs(e))throw e;n.la.add(1),await Ws(n),n.Ta.set("Offline"),t||(t=()=>WE(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{Q($s,"Retrying IndexedDB access"),await t(),n.la.delete(1),await xo(n)})}function DC(n,e){return e().catch(t=>_C(n,t,e))}async function Lo(n){let e=me(n),t=pn(e),r=e.sa.length>0?e.sa[e.sa.length-1].batchId:AB;for(;XE(e);)try{let s=await YE(e.localStore,r);if(s===null){e.sa.length===0&&t.en();break}r=s.batchId,ZE(e,s)}catch(s){await _C(e,s)}yC(e)&&wC(e)}function XE(n){return Ys(n)&&n.sa.length<10}function ZE(n,e){n.sa.push(e);let t=pn(n);t.Yt()&&t.Rn&&t.An(e.mutations)}function yC(n){return Ys(n)&&!pn(n).Jt()&&n.sa.length>0}function wC(n){pn(n).start()}async function e_(n){pn(n).fn()}async function t_(n){let e=pn(n);for(let t of n.sa)e.An(t.mutations)}async function n_(n,e,t){let r=n.sa.shift(),s=Wc.from(r,e,t);await DC(n,()=>n.remoteSyncer.applySuccessfulWrite(s)),await Lo(n)}async function r_(n,e){e&&pn(n).Rn&&await async function(r,s){if(function(a){return Mm(a)&&a!==V.ABORTED}(s.code)){let i=r.sa.shift();pn(r).Xt(),await DC(r,()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s)),await Lo(r)}}(n,e),yC(n)&&wC(n)}async function Jf(n,e){let t=me(n);t.asyncQueue.verifyOperationInProgress(),Q($s,"RemoteStore received new credentials");let r=Ys(t);t.la.add(3),await Ws(t),r&&t.Ta.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.la.delete(3),await xo(t)}async function s_(n,e){let t=me(n);e?(t.la.delete(2),await xo(t)):e||(t.la.add(2),await Ws(t),t.Ta.set("Unknown"))}function pn(n){return n.Ra||(n.Ra=function(t,r,s){let i=me(t);return i.pn(),new Iu(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{ct:()=>Promise.resolve(),Et:e_.bind(null,n),Tt:r_.bind(null,n),Vn:t_.bind(null,n),dn:n_.bind(null,n)}),n.Ea.push(async e=>{e?(n.Ra.Xt(),await Lo(n)):(await n.Ra.stop(),n.sa.length>0&&(Q($s,`Stopping write stream with ${n.sa.length} pending writes`),n.sa=[]))})),n.Ra}var EB=class n{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new Mt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){let a=Date.now()+r,u=new n(e,t,a,s,i);return u.start(r),u}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new K(V.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}};function IC(n,e){if(Un("AsyncQueue",`${e}: ${n}`),zs(n))return new K(V.UNAVAILABLE,`${e}: ${n}`);throw n}var Ao=class{constructor(){this.activeTargetIds=Jm()}Ba(e){this.activeTargetIds=this.activeTargetIds.add(e)}Ua(e){this.activeTargetIds=this.activeTargetIds.delete(e)}La(){let e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}};var _B=class{constructor(){this.fu=new Ao,this.mu={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.fu.Ba(e),this.mu[e]||"not-current"}updateQueryState(e,t,r){this.mu[e]=t}removeLocalQueryTarget(e){this.fu.Ua(e)}isLocalQueryTarget(e){return this.fu.activeTargetIds.has(e)}clearQueryState(e){delete this.mu[e]}getAllActiveQueryTargets(){return this.fu.activeTargetIds}isActiveQueryTarget(e){return this.fu.activeTargetIds.has(e)}start(){return this.fu=new Ao,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}};function $a(){return typeof document<"u"?document:null}var DB=class{constructor(){this.queries=Kf(),this.onlineState="Unknown",this.Du=new Set}terminate(){(function(t,r){let s=me(t),i=s.queries;s.queries=Kf(),i.forEach((a,u)=>{for(let c of u.bu)c.onError(r)})})(this,new K(V.ABORTED,"Firestore shutting down"))}};function Kf(){return new qt(n=>tC(n),nC)}function i_(n){n.Du.forEach(e=>{e.next()})}var zf;(function(n){n.Default="default",n.Cache="cache"})(zf||(zf={}));var o_="SyncEngine";var yB=class{constructor(e,t,r,s,i,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.hc={},this.Tc=new qt(u=>tC(u),nC),this.Pc=new Map,this.Ic=new Set,this.Rc=new ut(ne.comparator),this.Ac=new Map,this.Vc=new Us,this.dc={},this.fc=new Map,this.mc=er.bs(),this.onlineState="Unknown",this.gc=void 0}get isPrimaryClient(){return this.gc===!0}};async function a_(n,e,t){let r=l_(n);try{let s=await function(a,u){let c=me(a),l=Te.now(),f=u.reduce((R,v)=>R.add(v.key),Me()),d,y;return c.persistence.runTransaction("Locally write mutations","readwrite",R=>{let v=ms(),L=Me();return c.ko.getEntries(R,f).next(j=>{v=j,v.forEach((z,W)=>{W.isValidDocument()||(L=L.add(z))})}).next(()=>c.localDocuments.getOverlayedDocuments(R,v)).next(j=>{d=j;let z=[];for(let W of u){let he=bm(W,d.get(W.key).overlayedDocument);he!=null&&z.push(new Ht(W.key,he,ld(he.value.mapValue),rn.exists(!0)))}return c.mutationQueue.addMutationBatch(R,l,z,u)}).next(j=>{y=j;let z=j.applyToLocalDocumentSet(d,L);return c.documentOverlayCache.saveOverlays(R,j.batchId,z)})}).then(()=>({batchId:y.batchId,changes:Sd(d)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(a,u,c){let l=a.dc[a.currentUser.toKey()];l||(l=new ut(le)),l=l.insert(u,c),a.dc[a.currentUser.toKey()]=l}(r,s.batchId,t),await ko(r,s.changes),await Lo(r.remoteStore)}catch(s){let i=IC(s,"Failed to persist write");t.reject(i)}}function Qf(n,e,t){let r=me(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){let s=[];r.Tc.forEach((i,a)=>{let u=a.view.xu(e);u.snapshot&&s.push(u.snapshot)}),function(a,u){let c=me(a);c.onlineState=u;let l=!1;c.queries.forEach((f,d)=>{for(let y of d.bu)y.xu(u)&&(l=!0)}),l&&i_(c)}(r.eventManager,e),s.length&&r.hc.Tn(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function u_(n,e){let t=me(n),r=e.batch.batchId;try{let s=await $E(t.localStore,e);AC(t,r,null),TC(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await ko(t,s)}catch(s){await FB(s)}}async function c_(n,e,t){let r=me(n);try{let s=await function(a,u){let c=me(a);return c.persistence.runTransaction("Reject batch","readwrite-primary",l=>{let f;return c.mutationQueue.lookupMutationBatch(l,u).next(d=>(Y(d!==null,37113),f=d.keys(),c.mutationQueue.removeMutationBatch(l,d))).next(()=>c.mutationQueue.performConsistencyCheck(l)).next(()=>c.documentOverlayCache.removeOverlaysForBatchId(l,f,u)).next(()=>c.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(l,f)).next(()=>c.localDocuments.getDocuments(l,f))})}(r.localStore,e);AC(r,e,t),TC(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await ko(r,s)}catch(s){await FB(s)}}function TC(n,e){(n.fc.get(e)||[]).forEach(t=>{t.resolve()}),n.fc.delete(e)}function AC(n,e,t){let r=me(n),s=r.dc[r.currentUser.toKey()];if(s){let i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),r.dc[r.currentUser.toKey()]=s}}async function ko(n,e,t){let r=me(n),s=[],i=[],a=[];r.Tc.isEmpty()||(r.Tc.forEach((u,c)=>{a.push(r.yc(c,e,t).then(l=>{if((l||t)&&r.isPrimaryClient){let f=l?!l.fromCache:t?.targetChanges.get(c.targetId)?.current;r.sharedClientState.updateQueryState(c.targetId,f?"current":"not-current")}if(l){s.push(l);let f=fB.mo(c.targetId,l);i.push(f)}}))}),await Promise.all(a),r.hc.Tn(s),await async function(c,l){let f=me(c);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",d=>M.forEach(l,y=>M.forEach(y.Vo,R=>f.persistence.referenceDelegate.addReference(d,y.targetId,R)).next(()=>M.forEach(y.fo,R=>f.persistence.referenceDelegate.removeReference(d,y.targetId,R)))))}catch(d){if(!zs(d))throw d;Q(zE,"Failed to update sequence numbers: "+d)}for(let d of l){let y=d.targetId;if(!d.fromCache){let R=f.Lo.get(y),v=R.snapshotVersion,L=R.withLastLimboFreeSnapshotVersion(v);f.Lo=f.Lo.insert(y,L)}}}(r.localStore,i))}async function B_(n,e){let t=me(n);if(!t.currentUser.isEqual(e)){Q(o_,"User change. New user:",e.toKey());let r=await EC(t.localStore,e);t.currentUser=e,function(i,a){i.fc.forEach(u=>{u.forEach(c=>{c.reject(new K(V.CANCELLED,a))})}),i.fc.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await ko(t,r.$o)}}function l_(n){let e=me(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=u_.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=c_.bind(null,e),e}var tr=class{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=No(e.databaseInfo.databaseId),this.sharedClientState=this.vc(e),this.persistence=this.Dc(e),await this.persistence.start(),this.localStore=this.xc(e),this.gcScheduler=this.Cc(e,this.localStore),this.indexBackfillerScheduler=this.Fc(e,this.localStore)}Cc(e,t){return null}Fc(e,t){return null}xc(e){return QE(this.persistence,new CB,e.initialUser,this.serializer)}Dc(e){return new Io(hB.b_,this.serializer)}vc(e){return new _B}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}};tr.provider={build:()=>new tr};var bo=class extends tr{constructor(e){super(),this.cacheSizeBytes=e}Cc(e,t){Y(this.persistence.referenceDelegate instanceof To,46915);let r=this.persistence.referenceDelegate.garbageCollector;return new Su(r,e.asyncQueue,t)}Dc(e){let t=this.cacheSizeBytes!==void 0?lt.withCacheSize(this.cacheSizeBytes):lt.DEFAULT;return new Io(r=>To.b_(r,t),this.serializer)}};var Vr=class{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Qf(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=B_.bind(null,this.syncEngine),await s_(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new DB}()}createDatastore(e){let t=No(e.databaseInfo.databaseId),r=rE(e.databaseInfo);return sE(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,s,i,a,u){return new mB(r,s,i,a,u)}(this.localStore,this.datastore,e.asyncQueue,t=>Qf(this.syncEngine,t,0),function(){return oo.Ye()?new oo:new Eu}())}createSyncEngine(e,t){return function(s,i,a,u,c,l,f){let d=new yB(s,i,a,u,c,l);return f&&(d.gc=!0),d}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){await async function(t){let r=me(t);Q($s,"RemoteStore shutting down."),r.la.add(5),await Ws(r),r.ha.shutdown(),r.Ta.set("Unknown")}(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}};Vr.provider={build:()=>new Vr};var gn="FirestoreClient",wB=class{constructor(e,t,r,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this._databaseInfo=s,this.user=ke.UNAUTHENTICATED,this.clientId=gr.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,async a=>{Q(gn,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>(Q(gn,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();let e=new Mt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){let r=IC(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}};async function Wa(n,e){n.asyncQueue.verifyOperationInProgress(),Q(gn,"Initializing OfflineComponentProvider");let t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async s=>{r.isEqual(s)||(await EC(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function $f(n,e){n.asyncQueue.verifyOperationInProgress();let t=await h_(n);Q(gn,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>Jf(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,s)=>Jf(e.remoteStore,s)),n._onlineComponents=e}async function h_(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){Q(gn,"Using user provided OfflineComponentProvider");try{await Wa(n,n._uninitializedComponentsProvider._offline)}catch(e){let t=e;if(!function(s){return s.name==="FirebaseError"?s.code===V.FAILED_PRECONDITION||s.code===V.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(t))throw t;Nt("Error using user provided cache. Falling back to memory cache: "+t),await Wa(n,new tr)}}else Q(gn,"Using default OfflineComponentProvider"),await Wa(n,new bo(void 0));return n._offlineComponents}async function f_(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(Q(gn,"Using user provided OnlineComponentProvider"),await $f(n,n._uninitializedComponentsProvider._online)):(Q(gn,"Using default OnlineComponentProvider"),await $f(n,new Vr))),n._onlineComponents}function d_(n){return f_(n).then(e=>e.syncEngine)}function bC(n,e){let t=new Mt;return n.asyncQueue.enqueueAndForget(async()=>a_(await d_(n),e,t)),t.promise}var UB=class{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new We(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){let e=new C_(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){return this._document?.data.clone().value.mapValue.fields??void 0}get(e){if(this._document){let t=this._document.data.field(Qs("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}},C_=class extends UB{data(){return super.data()}};function RC(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}var Wf="AsyncQueue",Ro=class{constructor(e=Promise.resolve()){this.$c=[],this.Kc=!1,this.Qc=[],this.Wc=null,this.Gc=!1,this.zc=!1,this.jc=[],this.Ht=new uo(this,"async_queue_retry"),this.Hc=()=>{let r=$a();r&&Q(Wf,"Visibility state changed to "+r.visibilityState),this.Ht.$t()},this.Jc=e;let t=$a();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Hc)}get isShuttingDown(){return this.Kc}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Yc(),this.Zc(e)}enterRestrictedMode(e){if(!this.Kc){this.Kc=!0,this.zc=e||!1;let t=$a();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Hc)}}enqueue(e){if(this.Yc(),this.Kc)return new Promise(()=>{});let t=new Mt;return this.Zc(()=>this.Kc&&this.zc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.$c.push(e),this.Xc()))}async Xc(){if(this.$c.length!==0){try{await this.$c[0](),this.$c.shift(),this.Ht.reset()}catch(e){if(!zs(e))throw e;Q(Wf,"Operation failed with retryable error: "+e)}this.$c.length>0&&this.Ht.kt(()=>this.Xc())}}Zc(e){let t=this.Jc.then(()=>(this.Gc=!0,e().catch(r=>{throw this.Wc=r,this.Gc=!1,Un("INTERNAL UNHANDLED ERROR: ",Yf(r)),r}).then(r=>(this.Gc=!1,r))));return this.Jc=t,t}enqueueAfterDelay(e,t,r){this.Yc(),this.jc.indexOf(e)>-1&&(t=0);let s=EB.createAndSchedule(this,e,t,r,i=>this.el(i));return this.Qc.push(s),s}Yc(){this.Wc&&ee(47125,{tl:Yf(this.Wc)})}verifyOperationInProgress(){}async nl(){let e;do e=this.Jc,await e;while(e!==this.Jc)}rl(e){for(let t of this.Qc)if(t.timerId===e)return!0;return!1}il(e){return this.nl().then(()=>{this.Qc.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(let t of this.Qc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.nl()})}sl(e){this.jc.push(e)}el(e){let t=this.Qc.indexOf(e);this.Qc.splice(t,1)}};function Yf(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}var qs=class extends Po{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new Ro,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){let e=this._firestoreClient.terminate();this._queue=new Ro(e),this._firestoreClient=void 0,await e}}};function qB(n,e){let t=typeof n=="object"?n:Ii(),r=typeof n=="string"?n:e||Qi,s=yi(t,"firestore").getImmediate({identifier:r});if(!s._initialized){let i=lh("firestore");i&&Md(s,...i)}return s}function SC(n){if(n._terminated)throw new K(V.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||p_(n),n._firestoreClient}function p_(n){let e=n._freezeSettings(),t=oE(n._databaseId,n._app?.options.appId||"",n._persistenceKey,n._app?.options.apiKey,e);n._componentsProvider||e.localCache?._offlineComponentProvider&&e.localCache?._onlineComponentProvider&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new wB(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&function(s){let i=s?._online.build();return{_offline:s?._offline.build(i),_online:i}}(n._componentsProvider))}var Ln=class{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}},Mn=class n extends UB{constructor(e,t,r,s,i,a){super(e,t,r,s,a),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){let t=new Gn(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){let r=this._document.data.field(Qs("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new K(V.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");let e=this._document,t={};return t.type=n._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}};Mn._jsonSchemaVersion="firestore/documentSnapshot/1.0",Mn._jsonSchema={type:Oe("string",Mn._jsonSchemaVersion),bundleSource:Oe("string","DocumentSnapshot"),bundleName:Oe("string"),bundle:Oe("string")};var Gn=class extends Mn{data(e={}){return super.data(e)}},pr=class n{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new Ln(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){let e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new Gn(this._firestore,this._userDataWriter,r.key,r,new Ln(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){let t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new K(V.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map(u=>{Rt(s._snapshot.query)?JE(s._snapshot.query):bd(s.query._query);let c=new Gn(s._firestore,s._userDataWriter,u.doc.key,u.doc,new Ln(s._snapshot.mutatedKeys.has(u.doc.key),s._snapshot.fromCache),s.query.converter);return u.doc,{type:"added",doc:c,oldIndex:-1,newIndex:a++}})}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(u=>i||u.type!==3).map(u=>{let c=new Gn(s._firestore,s._userDataWriter,u.doc.key,u.doc,new Ln(s._snapshot.mutatedKeys.has(u.doc.key),s._snapshot.fromCache),s.query.converter),l=-1,f=-1;return u.type!==0&&(l=a.indexOf(u.doc.key),a=a.delete(u.doc.key)),u.type!==1&&(a=a.add(u.doc),f=a.indexOf(u.doc.key)),{type:g_(u.type),doc:c,oldIndex:l,newIndex:f}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new K(V.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");let e={};e.type=n._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=gr.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;let t=[],r=[],s=[];return this.docs.forEach(i=>{i._document!==null&&(t.push(i._document),r.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}};function g_(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return ee(61501,{type:n})}}pr._jsonSchemaVersion="firestore/querySnapshot/1.0",pr._jsonSchema={type:Oe("string",pr._jsonSchemaVersion),bundleSource:Oe("string","QuerySnapshot"),bundleName:Oe("string"),bundle:Oe("string")};function NC(n,e){let t=TB(n.firestore,qs),r=Gd(n),s=RC(n.converter,e),i=Ud(n.firestore);return m_(t,[qd(i,"addDoc",r._key,s,n.converter!==null,{}).toMutation(r._key,rn.exists(!1))]).then(()=>r)}function m_(n,e){let t=SC(n);return bC(t,e)}var vC="@firebase/firestore",OC="4.17.2";(function(e,t=!0){Xf(Sh),bn(new gt("firestore",(r,{instanceIdentifier:s,options:i})=>{let a=r.getProvider("app").getImmediate(),u=new qs(new ro(r.getProvider("auth-internal")),new io(a,r.getProvider("app-check-internal")),ud(a,s),a);return i={useFetchStreams:t,...i},u._setSettings(i),u},"PUBLIC").setMultipleInstances(!0)),mt(vC,OC,e),mt(vC,OC,"esm2020")})();var PC="@firebase/ai",QB="2.16.0";var rr="AI",E_="us-central1",__="global",D_="firebasevertexai.googleapis.com",Hr="v1beta",FC=QB,y_="gl-js",w_="hybrid",I_=180*1e3,T_="gemini-2.5-flash-lite";var te=class n extends pt{constructor(e,t,r){let s=rr,i=`${s}/${e}`,a=`${s}: ${t} (${i})`;super(e,a),this.code=e,this.customErrorData=r,Error.captureStackTrace&&Error.captureStackTrace(this,n),Object.setPrototypeOf(this,n.prototype),this.toString=()=>a}};var xC=["user","model","function","system"];var UC={HARM_SEVERITY_NEGLIGIBLE:"HARM_SEVERITY_NEGLIGIBLE",HARM_SEVERITY_LOW:"HARM_SEVERITY_LOW",HARM_SEVERITY_MEDIUM:"HARM_SEVERITY_MEDIUM",HARM_SEVERITY_HIGH:"HARM_SEVERITY_HIGH",HARM_SEVERITY_UNSUPPORTED:"HARM_SEVERITY_UNSUPPORTED"};var Ke={STOP:"STOP",MAX_TOKENS:"MAX_TOKENS",SAFETY:"SAFETY",RECITATION:"RECITATION",OTHER:"OTHER",BLOCKLIST:"BLOCKLIST",PROHIBITED_CONTENT:"PROHIBITED_CONTENT",SPII:"SPII",MALFORMED_FUNCTION_CALL:"MALFORMED_FUNCTION_CALL",IMAGE_SAFETY:"IMAGE_SAFETY",IMAGE_PROHIBITED_CONTENT:"IMAGE_PROHIBITED_CONTENT",IMAGE_OTHER:"IMAGE_OTHER",NO_IMAGE:"NO_IMAGE",IMAGE_RECITATION:"IMAGE_RECITATION",LANGUAGE:"LANGUAGE",UNEXPECTED_TOOL_CALL:"UNEXPECTED_TOOL_CALL",TOO_MANY_TOOL_CALLS:"TOO_MANY_TOOL_CALLS",MISSING_THOUGHT_SIGNATURE:"MISSING_THOUGHT_SIGNATURE",MALFORMED_RESPONSE:"MALFORMED_RESPONSE"};var It={PREFER_ON_DEVICE:"prefer_on_device",ONLY_ON_DEVICE:"only_on_device",ONLY_IN_CLOUD:"only_in_cloud",PREFER_IN_CLOUD:"prefer_in_cloud"},mn={ON_DEVICE:"on_device",IN_CLOUD:"in_cloud"};var Z={ERROR:"error",REQUEST_ERROR:"request-error",RESPONSE_ERROR:"response-error",FETCH_ERROR:"fetch-error",SESSION_CLOSED:"session-closed",INVALID_CONTENT:"invalid-content",API_NOT_ENABLED:"api-not-enabled",INVALID_SCHEMA:"invalid-schema",NO_API_KEY:"no-api-key",NO_APP_ID:"no-app-id",NO_MODEL:"no-model",NO_PROJECT_ID:"no-project-id",PARSE_FAILED:"parse-failed",UNSUPPORTED:"unsupported"};var Ft={AGENT_PLATFORM:"AGENT_PLATFORM",VERTEX_AI:"VERTEX_AI",GOOGLE_AI:"GOOGLE_AI"};var Zs=class{constructor(e){this.backendType=e}},ei=class extends Zs{constructor(){super(Ft.GOOGLE_AI)}_getModelPath(e,t){return`/${Hr}/projects/${e}/${t}`}_getTemplatePath(e,t){return`/${Hr}/projects/${e}/templates/${t}`}},ti=class extends Zs{constructor(e){super(Ft.VERTEX_AI),this.location=E_,e&&(this.location=e)}_getModelPath(e,t){return`/${Hr}/projects/${e}/locations/${this.location}/${t}`}_getTemplatePath(e,t){return`/${Hr}/projects/${e}/locations/${this.location}/templates/${t}`}},sr=class extends Zs{constructor(e){super(Ft.AGENT_PLATFORM),this.location=__,e&&(this.location=e)}_getModelPath(e,t){return`/${Hr}/projects/${e}/locations/${this.location}/${t}`}_getTemplatePath(e,t){return`/${Hr}/projects/${e}/locations/${this.location}/templates/${t}`}};function A_(n){if(n instanceof ei)return`${rr}/googleai`;if(n instanceof ti)return`${rr}/vertexai/${n.location}`;if(n instanceof sr)return`${rr}/agentplatform/${n.location}`;throw new te(Z.ERROR,`Invalid backend: ${JSON.stringify(n.backendType)}`)}function b_(n){let e=n.split("/");if(e[0]!==rr)throw new te(Z.ERROR,`Invalid instance identifier, unknown prefix '${e[0]}'`);switch(e[1]){case"vertexai":let r=e[2];if(!r)throw new te(Z.ERROR,`Invalid instance identifier, unknown location '${n}'`);return new ti(r);case"agentplatform":let s=e[2];if(!s)throw new te(Z.ERROR,`Invalid instance identifier, unknown location '${n}'`);return new sr(s);case"googleai":return new ei;default:throw new te(Z.ERROR,`Invalid instance identifier string: '${n}'`)}}var xe=new Zt("@firebase/vertexai"),Kt;(function(n){n.UNAVAILABLE="unavailable",n.DOWNLOADABLE="downloadable",n.DOWNLOADING="downloading",n.AVAILABLE="available"})(Kt||(Kt={}));var qC={type:"text",languages:["en"]},jB=[qC,{type:"image"}],JB=[qC],Mo=class n{constructor(e,t,r){this.languageModelProvider=e,this.mode=t,this.downloadPromise=null,this.onDeviceParams={createOptions:{expectedInputs:jB,expectedOutputs:JB}},r&&(this.onDeviceParams=r,this.onDeviceParams.createOptions?(this.onDeviceParams.createOptions.expectedInputs||(this.onDeviceParams.createOptions.expectedInputs=jB),this.onDeviceParams.createOptions.expectedOutputs||(this.onDeviceParams.createOptions.expectedOutputs=JB)):this.onDeviceParams.createOptions={expectedInputs:jB,expectedOutputs:JB})}async isAvailable(e){if(!this.mode)return xe.debug("On-device inference unavailable because mode is undefined."),!1;if(this.mode===It.ONLY_IN_CLOUD)return xe.debug('On-device inference unavailable because mode is "only_in_cloud".'),!1;let t=await this.languageModelProvider?.availability(this.onDeviceParams.createOptions);if(this.mode===It.ONLY_ON_DEVICE){if(t===Kt.UNAVAILABLE)throw new te(Z.API_NOT_ENABLED,"Local LanguageModel API not available in this environment.");if(t===Kt.DOWNLOADABLE||t===Kt.DOWNLOADING){xe.debug("Waiting for download of LanguageModel to complete.");try{await this.downloadPromise}catch(r){throw new te(Z.ERROR,r.message)}return!0}return!0}return t!==Kt.AVAILABLE?(xe.debug(`On-device inference unavailable because availability is "${t}".`),!1):n.isOnDeviceRequest(e)?!0:(xe.debug("On-device inference unavailable because request is incompatible."),!1)}async generateContent(e){let t=await this.createSession(),r=await Promise.all(e.contents.map(n.toLanguageModelMessage)),s=await t.prompt(r,this.onDeviceParams.promptOptions);return n.toResponse(s)}async generateContentStream(e){let t=await this.createSession(),r=await Promise.all(e.contents.map(n.toLanguageModelMessage)),s=t.promptStreaming(r,this.onDeviceParams.promptOptions);return n.toStreamResponse(s)}async countTokens(e){throw new te(Z.REQUEST_ERROR,"Count Tokens is not yet available for on-device model.")}static isOnDeviceRequest(e){if(e.contents.length===0)return xe.debug("Empty prompt rejected for on-device inference."),!1;for(let t of e.contents){if(t.parts.some(r=>"functionResponse"in r))return xe.debug("Content with a function response part rejected for on-device inference."),!1;for(let r of t.parts)if(r.inlineData&&n.SUPPORTED_MIME_TYPES.indexOf(r.inlineData.mimeType)===-1)return xe.debug(`Unsupported mime type "${r.inlineData.mimeType}" rejected for on-device inference.`),!1}return!0}async downloadIfAvailable(e){let t=await this.languageModelProvider?.availability(this.onDeviceParams.createOptions);return(t===Kt.DOWNLOADABLE||t===Kt.DOWNLOADING)&&this.download(e),t}download(e){if(this.downloadPromise)return;let t={...this.onDeviceParams.createOptions};t&&!t.monitor&&e&&(t.monitor=r=>{r.addEventListener("downloadprogress",s=>{e(s.loaded)})}),this.downloadPromise=this.languageModelProvider?.create(t).finally(()=>{this.downloadPromise=null})}static async toLanguageModelMessage(e){let t=await Promise.all(e.parts.map(n.toLanguageModelMessageContent));return{role:n.toLanguageModelMessageRole(e.role),content:t}}static async toLanguageModelMessageContent(e){if(e.text)return{type:"text",value:e.text};if(e.inlineData){let r=await(await fetch(`data:${e.inlineData.mimeType};base64,${e.inlineData.data}`)).blob();return{type:"image",value:await createImageBitmap(r)}}throw new te(Z.REQUEST_ERROR,"Processing of this Part type is not currently supported.")}static toLanguageModelMessageRole(e){return e==="model"?"assistant":"user"}async createSession(){if(!this.languageModelProvider)throw new te(Z.UNSUPPORTED,"Chrome AI requested for unsupported browser version.");let e=await this.languageModelProvider.create(this.onDeviceParams.createOptions);return this.oldSession&&this.oldSession.destroy(),this.oldSession=e,e}static toResponse(e){return{json:async()=>({candidates:[{content:{parts:[{text:e}]}}]})}}static toStreamResponse(e){let t=new TextEncoder;return{body:e.pipeThrough(new TransformStream({transform(r,s){let i=JSON.stringify({candidates:[{content:{role:"model",parts:[{text:r}]}}]});s.enqueue(t.encode(`data: ${i}

`))}}))}}};Mo.SUPPORTED_MIME_TYPES=["image/jpeg","image/png"];function R_(n,e,t){let s=(e||mi()).LanguageModel;if(s&&n)return new Mo(s,n,t)}var $B=class{constructor(e,t,r,s,i){this.app=e,this.backend=t,this.chromeAdapterFactory=i;let a=s?.getImmediate({optional:!0}),u=r?.getImmediate({optional:!0});this.auth=u||null,this.appCheck=a||null,t instanceof ti||t instanceof sr?this.location=t.location:this.location=""}_delete(){return Promise.resolve()}set options(e){this._options=e}get options(){return this._options}};function S_(n,{instanceIdentifier:e}){if(!e)throw new te(Z.ERROR,"AIService instance identifier is undefined.");let t=b_(e),r=n.getProvider("app").getImmediate(),s=n.getProvider("auth-internal"),i=n.getProvider("app-check-internal");return new $B(r,t,s,i,R_)}function v_(n){if(n.app?.options?.apiKey)if(n.app?.options?.projectId){if(!n.app?.options?.appId)throw new te(Z.NO_APP_ID,'The "appId" field is empty in the local Firebase config. Firebase AI requires this field to contain a valid app ID.')}else throw new te(Z.NO_PROJECT_ID,'The "projectId" field is empty in the local Firebase config. Firebase AI requires this field to contain a valid project ID.');else throw new te(Z.NO_API_KEY,'The "apiKey" field is empty in the local Firebase config. Firebase AI requires this field to contain a valid API key.');let e={apiKey:n.app.options.apiKey,project:n.app.options.projectId,appId:n.app.options.appId,automaticDataCollectionEnabled:n.app.automaticDataCollectionEnabled,location:n.location,backend:n.backend};if(wi(n.app)&&n.app.settings.appCheckToken){let t=n.app.settings.appCheckToken;e.getAppCheckToken=()=>Promise.resolve({token:t})}else n.appCheck&&(n.options?.useLimitedUseAppCheckTokens?e.getAppCheckToken=()=>n.appCheck.getLimitedUseToken():e.getAppCheckToken=()=>n.appCheck.getToken());return n.auth&&(e.getAuthToken=()=>n.auth.getToken()),e}var WB=class n{constructor(e,t){this._apiSettings=v_(e),this.model=n.normalizeModelName(t,this._apiSettings.backend.backendType)}static normalizeModelName(e,t){return t===Ft.GOOGLE_AI?n.normalizeGoogleAIModelName(e):n.normalizeVertexAIModelName(e)}static normalizeGoogleAIModelName(e){return`models/${e}`}static normalizeVertexAIModelName(e){let t;return e.includes("/")?e.startsWith("models/")?t=`publishers/google/${e}`:t=e:t=`publishers/google/models/${e}`,t}};var O_="Timeout has expired.",KB="AbortError",YB=class{constructor(e){this.params=e}toString(){let e=new URL(this.baseUrl);return e.pathname=this.pathname,e.search=this.queryParams.toString(),e.toString()}get pathname(){return this.params.templateId?`${this.params.apiSettings.backend._getTemplatePath(this.params.apiSettings.project,this.params.templateId)}:${this.params.task}`:`${this.params.apiSettings.backend._getModelPath(this.params.apiSettings.project,this.params.model)}:${this.params.task}`}get baseUrl(){return this.params.singleRequestOptions?.baseUrl??`https://${D_}`}get queryParams(){let e=new URLSearchParams;return this.params.stream&&e.set("alt","sse"),e}};function N_(n){let e=[];return e.push(`${y_}/${FC}`),e.push(`fire/${FC}`),(n.params.apiSettings.inferenceMode===It.PREFER_ON_DEVICE||n.params.apiSettings.inferenceMode===It.PREFER_IN_CLOUD)&&e.push(w_),e.join(" ")}async function P_(n){let e=new Headers;if(e.append("Content-Type","application/json"),e.append("x-goog-api-client",N_(n)),e.append("x-goog-api-key",n.params.apiSettings.apiKey),n.params.apiSettings.automaticDataCollectionEnabled&&e.append("X-Firebase-Appid",n.params.apiSettings.appId),n.params.apiSettings.getAppCheckToken){let t=await n.params.apiSettings.getAppCheckToken();t&&(e.append("X-Firebase-AppCheck",t.token),t.error&&xe.warn(`Unable to obtain a valid App Check token: ${t.error.message}`))}if(n.params.apiSettings.getAuthToken){let t=await n.params.apiSettings.getAuthToken();t&&e.append("Authorization",`Firebase ${t.accessToken}`)}return e}async function tl(n,e){let t=new YB(n),r,s=n.singleRequestOptions?.signal,i=n.singleRequestOptions?.timeout!=null&&n.singleRequestOptions.timeout>=0?n.singleRequestOptions.timeout:I_,a=new AbortController,u=setTimeout(()=>{a.abort(new DOMException(O_,KB)),xe.debug(`Aborting request to ${t} due to timeout (${i}ms)`)},i),c=AbortSignal.any(s?[s,a.signal]:[a.signal]);if(s&&s.aborted)throw clearTimeout(u),new DOMException(s.reason??"Aborted externally before fetch",KB);try{let l={method:"POST",headers:await P_(t),signal:c,body:e};if(r=await fetch(t.toString(),l),!r.ok){let f="",d;try{let y=await r.json();f=y.error.message,y.error.details&&(f+=` ${JSON.stringify(y.error.details)}`,d=y.error.details)}catch{}throw r.status===403&&d&&d.some(y=>y.reason==="SERVICE_DISABLED")&&d.some(y=>y.links?.[0]?.description.includes("Google developers console API activation"))?new te(Z.API_NOT_ENABLED,`The Firebase AI SDK requires the Firebase AI API ('firebasevertexai.googleapis.com') to be enabled in your Firebase project. Enable this API by visiting the Firebase Console at https://console.firebase.google.com/project/${t.params.apiSettings.project}/ailogic/ and clicking "Get started". If you enabled this API recently, wait a few minutes for the action to propagate to our systems and then retry.`,{status:r.status,statusText:r.statusText,errorDetails:d}):new te(Z.FETCH_ERROR,`Error fetching from ${t}: [${r.status} ${r.statusText}] ${f}`,{status:r.status,statusText:r.statusText,errorDetails:d})}}catch(l){let f=l;throw l.code!==Z.FETCH_ERROR&&l.code!==Z.API_NOT_ENABLED&&l instanceof Error&&l.name!==KB&&(f=new te(Z.ERROR,`Error fetching from ${t.toString()}: ${l.message}`),f.stack=l.stack),f}finally{clearTimeout(u)}return r}function Vo(n){if(n.candidates&&n.candidates.length>0){if(n.candidates.length>1&&xe.warn(`This response had ${n.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`),JC(n.candidates[0]))throw new te(Z.RESPONSE_ERROR,`Response error: ${nr(n)}. Response body stored in error.response`,{response:n});return!0}else return!1}function Go(n,e=mn.IN_CLOUD){n.candidates&&!n.candidates[0].hasOwnProperty("index")&&(n.candidates[0].index=0);let t=F_(n);return t.inferenceSource=e,t}function F_(n){return n.text=()=>{if(Vo(n))return LC(n,e=>!e.thought);if(n.promptFeedback)throw new te(Z.RESPONSE_ERROR,`Text not available. ${nr(n)}`,{response:n});return""},n.thoughtSummary=()=>{if(Vo(n)){let e=LC(n,t=>!!t.thought);return e===""?void 0:e}else if(n.promptFeedback)throw new te(Z.RESPONSE_ERROR,`Thought summary not available. ${nr(n)}`,{response:n})},n.inlineDataParts=()=>{if(Vo(n))return x_(n);if(n.promptFeedback)throw new te(Z.RESPONSE_ERROR,`Data not available. ${nr(n)}`,{response:n})},n.functionCalls=()=>{if(Vo(n))return jC(n);if(n.promptFeedback)throw new te(Z.RESPONSE_ERROR,`Function call not available. ${nr(n)}`,{response:n})},n}function LC(n,e){let t=[];if(n.candidates?.[0].content?.parts)for(let r of n.candidates?.[0].content?.parts)r.text&&e(r)&&t.push(r.text);return t.length>0?t.join(""):""}function jC(n){if(!n)return;let e=[];if(n.candidates?.[0].content?.parts)for(let t of n.candidates?.[0].content?.parts)t.functionCall&&e.push(t.functionCall);if(e.length>0)return e}function x_(n){let e=[];if(n.candidates?.[0].content?.parts)for(let t of n.candidates?.[0].content?.parts)t.inlineData&&e.push(t);if(e.length>0)return e}var L_=[Ke.RECITATION,Ke.SAFETY,Ke.BLOCKLIST,Ke.PROHIBITED_CONTENT,Ke.SPII,Ke.MALFORMED_FUNCTION_CALL,Ke.IMAGE_SAFETY,Ke.IMAGE_PROHIBITED_CONTENT,Ke.IMAGE_OTHER,Ke.NO_IMAGE,Ke.IMAGE_RECITATION,Ke.LANGUAGE,Ke.UNEXPECTED_TOOL_CALL,Ke.TOO_MANY_TOOL_CALLS,Ke.MISSING_THOUGHT_SIGNATURE,Ke.MALFORMED_RESPONSE];function JC(n){return!!n.finishReason&&L_.some(e=>e===n.finishReason)}function nr(n){let e="";if((!n.candidates||n.candidates.length===0)&&n.promptFeedback)e+="Response was blocked",n.promptFeedback?.blockReason&&(e+=` due to ${n.promptFeedback.blockReason}`),n.promptFeedback?.blockReasonMessage&&(e+=`: ${n.promptFeedback.blockReasonMessage}`);else if(n.candidates?.[0]){let t=n.candidates[0];JC(t)&&(e+=`Candidate was blocked due to ${t.finishReason}`,t.finishMessage&&(e+=`: ${t.finishMessage}`))}return e}function KC(n){if(n.safetySettings?.forEach(e=>{if(e.method)throw new te(Z.UNSUPPORTED,"SafetySetting.method is not supported in the the Gemini Developer API. Please remove this property.")}),n.generationConfig?.topK){let e=Math.round(n.generationConfig.topK);e!==n.generationConfig.topK&&(xe.warn("topK in GenerationConfig has been rounded to the nearest integer to match the format for requests to the Gemini Developer API."),n.generationConfig.topK=e)}return n}function nl(n){return{candidates:n.candidates?V_(n.candidates):void 0,prompt:n.promptFeedback?M_(n.promptFeedback):void 0,usageMetadata:n.usageMetadata}}function k_(n,e){return{generateContentRequest:{model:e,...n}}}function V_(n){let e=[],t;return e&&n.forEach(r=>{let s;if(r.citationMetadata&&(s={citations:r.citationMetadata.citationSources}),r.safetyRatings&&(t=r.safetyRatings.map(a=>({...a,severity:a.severity??UC.HARM_SEVERITY_UNSUPPORTED,probabilityScore:a.probabilityScore??0,severityScore:a.severityScore??0}))),r.content?.parts?.some(a=>a?.videoMetadata))throw new te(Z.UNSUPPORTED,"Part.videoMetadata is not supported in the Gemini Developer API. Please remove this property.");let i={index:r.index,content:r.content,finishReason:r.finishReason,finishMessage:r.finishMessage,safetyRatings:t,citationMetadata:s,groundingMetadata:r.groundingMetadata,urlContextMetadata:r.urlContextMetadata};e.push(i)}),e}function M_(n){let e=[];return n.safetyRatings.forEach(r=>{e.push({category:r.category,probability:r.probability,severity:r.severity??UC.HARM_SEVERITY_UNSUPPORTED,probabilityScore:r.probabilityScore??0,severityScore:r.severityScore??0,blocked:r.blocked})}),{blockReason:n.blockReason,safetyRatings:e,blockReasonMessage:n.blockReasonMessage}}var kC=/^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;async function G_(n,e,t){let r=n.body.pipeThrough(new TextDecoderStream("utf8",{fatal:!0})),s=j_(r),[i,a]=s.tee(),{response:u,firstValue:c}=await H_(a,e,t);return{stream:q_(i,e,t),response:u,firstValue:c}}async function H_(n,e,t){let[r,s]=n.tee(),i=r.getReader(),{value:a}=await i.read();return{firstValue:a,response:U_(s,e,t)}}async function U_(n,e,t){let r=[],s=n.getReader();for(;;){let{done:i,value:a}=await s.read();if(i){let u=J_(r);return e.backend.backendType===Ft.GOOGLE_AI&&(u=nl(u)),Go(u,t)}r.push(a)}}async function*q_(n,e,t){let r=n.getReader();for(;;){let{value:s,done:i}=await r.read();if(i)break;let a;e.backend.backendType===Ft.GOOGLE_AI?a=Go(nl(s),t):a=Go(s,t);let u=a.candidates?.[0];!u?.content?.parts&&!u?.finishReason&&!u?.citationMetadata&&!u?.urlContextMetadata||(yield a)}}function j_(n){let e=n.getReader();return new ReadableStream({start(r){let s="";return i();function i(){return e.read().then(({value:a,done:u})=>{if(u){if(s.trim()){r.error(new te(Z.PARSE_FAILED,"Failed to parse stream"));return}r.close();return}s+=a;let c=s.match(kC),l;for(;c;){try{l=JSON.parse(c[1])}catch{r.error(new te(Z.PARSE_FAILED,`Error parsing JSON response: "${c[1]}`));return}r.enqueue(l),s=s.substring(c[0].length),c=s.match(kC)}return i()})}}})}function J_(n){let t={promptFeedback:n[n.length-1]?.promptFeedback};for(let r of n)if(r.candidates)for(let s of r.candidates){let i=s.index||0;t.candidates||(t.candidates=[]),t.candidates[i]||(t.candidates[i]={index:s.index}),t.candidates[i].citationMetadata=s.citationMetadata,t.candidates[i].finishReason=s.finishReason,t.candidates[i].finishMessage=s.finishMessage,t.candidates[i].safetyRatings=s.safetyRatings,t.candidates[i].groundingMetadata=s.groundingMetadata;let a=s.urlContextMetadata;if(typeof a=="object"&&a!==null&&Object.keys(a).length>0&&(t.candidates[i].urlContextMetadata=a),s.content){if(!s.content.parts)continue;t.candidates[i].content||(t.candidates[i].content={role:s.content.role||"user",parts:[]});for(let u of s.content.parts){let c={...u};u.text!==""&&Object.keys(c).length>0&&t.candidates[i].content.parts.push(c)}}}return t}var K_=[Z.FETCH_ERROR,Z.ERROR,Z.API_NOT_ENABLED];async function zC(n,e,t,r){if(!e)return{response:await r(),inferenceSource:mn.IN_CLOUD};switch(e.mode){case It.ONLY_ON_DEVICE:if(await e.isAvailable(n))return{response:await t(),inferenceSource:mn.ON_DEVICE};throw new te(Z.UNSUPPORTED,"Inference mode is ONLY_ON_DEVICE, but an on-device model is not available.");case It.ONLY_IN_CLOUD:return{response:await r(),inferenceSource:mn.IN_CLOUD};case It.PREFER_IN_CLOUD:try{return{response:await r(),inferenceSource:mn.IN_CLOUD}}catch(s){if(s instanceof te&&K_.includes(s.code)&&await e.isAvailable(n))return{response:await t(),inferenceSource:mn.ON_DEVICE};throw s}case It.PREFER_ON_DEVICE:return await e.isAvailable(n)?{response:await t(),inferenceSource:mn.ON_DEVICE}:{response:await r(),inferenceSource:mn.IN_CLOUD};default:throw new te(Z.ERROR,`Unexpected infererence mode: ${e.mode}`)}}async function z_(n,e,t,r){return n.backend.backendType===Ft.GOOGLE_AI&&(t=KC(t)),tl({task:"streamGenerateContent",model:e,apiSettings:n,stream:!0,singleRequestOptions:r},JSON.stringify(t))}async function QC(n,e,t,r,s){let i=await zC(t,r,()=>r.generateContentStream(t),()=>z_(n,e,t,s));return G_(i.response,n,i.inferenceSource)}async function Q_(n,e,t,r){return n.backend.backendType===Ft.GOOGLE_AI&&(t=KC(t)),tl({model:e,task:"generateContent",apiSettings:n,stream:!1,singleRequestOptions:r},JSON.stringify(t))}async function $C(n,e,t,r,s){let i=await zC(t,r,()=>r.generateContent(t),()=>Q_(n,e,t,s)),a=await $_(i.response,n);return{response:Go(a,i.inferenceSource)}}async function $_(n,e){let t=await n.json();return e.backend.backendType===Ft.GOOGLE_AI?nl(t):t}function rl(n){if(n!=null){if(typeof n=="string")return{role:"system",parts:[{text:n}]};if(n.text)return{role:"system",parts:[n]};if(n.parts)return n.role?n:{role:"system",parts:n.parts}}}function Xs(n){let e=[];if(typeof n=="string")e=[{text:n}];else for(let t of n)typeof t=="string"?e.push({text:t}):e.push(t);return W_(e)}function W_(n){let e={role:"user",parts:[]},t=!1,r=!1;for(let s of n)"functionResponse"in s?r=!0:t=!0,e.parts.push(s);if(t&&r)throw new te(Z.INVALID_CONTENT,"Within a single message, FunctionResponse cannot be mixed with other type of Part in the request for sending chat message.");if(!t&&!r)throw new te(Z.INVALID_CONTENT,"No Content is provided for sending chat message.");return e}function zB(n){let e;return n.contents?e=n:e={contents:[Xs(n)]},n.systemInstruction&&(e.systemInstruction=rl(n.systemInstruction)),e}var VC="SILENT_ERROR",MC=10,XB=class{constructor(e,t,r){this.params=t,this.requestOptions=r,this._history=[],this._sendPromise=Promise.resolve(),this._apiSettings=e}async getHistory(){return await this._sendPromise,this._history}async _sendMessage(e,t){let r={};await this._sendPromise;let s=[];return this._sendPromise=this._sendPromise.then(async()=>{let i,a=0,u=this.requestOptions?.maxSequentialFunctionCalls??MC;do{let c;if(i){a++;let d=await this._callFunctionsAsNeeded(i);c=Xs(d)}else c=Xs(e);let l=this._formatRequest(c,[...s]);s.push(c);let f=await this._callGenerateContent(l,t);if(f)if(r=f,i=this._getCallableFunctionCalls(f.response),f.response.candidates&&f.response.candidates.length>0){let d={parts:f.response.candidates?.[0].content.parts||[],role:f.response.candidates?.[0].content.role||"model"};s.push(d)}else{let d=nr(f.response);d&&xe.warn(`sendMessage() was unsuccessful. ${d}. Inspect response object for details.`)}else i=void 0}while(i&&a<u);i&&a>=u&&xe.warn(`Automatic function calling exceeded the limit of ${u} function calls. Returning last model response.`)}),await this._sendPromise,this._history=this._history.concat(s),r}async _sendMessageStream(e,t){await this._sendPromise;let r=[],i=(async()=>{let a,u=0,c=this.requestOptions?.maxSequentialFunctionCalls??MC,l;do{let f;if(a){u++;let y=await this._callFunctionsAsNeeded(a);f=Xs(y)}else f=Xs(e);let d=this._formatRequest(f,[...r]);if(r.push(f),l=await this._callGenerateContentStream(d,t),a=this._getCallableFunctionCalls(l.firstValue),a&&l.firstValue&&l.firstValue.candidates&&l.firstValue.candidates.length>0){let y={...l.firstValue.candidates[0].content};y.role||(y.role="model"),r.push(y)}}while(a&&u<c);return a&&u>=c&&xe.warn(`Automatic function calling exceeded the limit of ${c} function calls. Returning last model response.`),{stream:l.stream,response:l.response}})();return this._sendPromise=this._sendPromise.then(async()=>i).catch(a=>{throw new Error(VC)}).then(a=>a.response).then(a=>{if(a.candidates&&a.candidates.length>0){this._history=this._history.concat(r);let u={...a.candidates[0].content};u.role||(u.role="model"),this._history.push(u)}else{let u=nr(a);u&&xe.warn(`sendMessageStream() was unsuccessful. ${u}. Inspect response object for details.`)}}).catch(a=>{a.message!==VC&&a.name!=="AbortError"&&xe.error(a)}),i}_getCallableFunctionCalls(e){let t=this.params?.tools?.find(s=>s.functionDeclarations);if(!t?.functionDeclarations)return;let r=jC(e);if(r){for(let s of r)if(!t.functionDeclarations?.some(a=>a.name===s.name&&typeof a.functionReference=="function"))return;return r}}async _callFunctionsAsNeeded(e){let t=[],r=[],s=this.params?.tools?.find(i=>i.functionDeclarations);if(s&&s.functionDeclarations){for(let a of e){let u=s.functionDeclarations.find(c=>c.name===a.name);if(u?.functionReference){let c=Promise.resolve(u.functionReference(a.args)).catch(l=>{let f=new te(Z.ERROR,`Error in user-defined function "${u.name}": ${l.message}`);throw f.stack=l.stack,f});t.push({name:a.name,id:a.id,results:c}),r.push(c)}}await Promise.all(r);let i=[];for(let{name:a,id:u,results:c}of t){let l={name:a,response:await c};u&&(l.id=u),i.push({functionResponse:l})}return i}else throw new te(Z.REQUEST_ERROR,'No function declarations were provided in "tools".')}};var GC=["text","inlineData","functionCall","functionResponse","thought","thoughtSignature"],Y_={user:["text","inlineData","functionResponse"],function:["functionResponse"],model:["text","functionCall","thought","thoughtSignature"],system:["text"]},HC={user:["model"],function:["model"],model:["user","function"],system:[]};function X_(n){let e=null;for(let t of n){let{role:r,parts:s}=t;if(!e&&r!=="user")throw new te(Z.INVALID_CONTENT,`First Content should be with role 'user', got ${r}`);if(!xC.includes(r))throw new te(Z.INVALID_CONTENT,`Each item should include role field. Got ${r} but valid roles are: ${JSON.stringify(xC)}`);if(!Array.isArray(s))throw new te(Z.INVALID_CONTENT,"Content should have 'parts' property with an array of Parts");if(s.length===0)throw new te(Z.INVALID_CONTENT,"Each Content should have at least one part");let i={text:0,inlineData:0,functionCall:0,functionResponse:0,thought:0,thoughtSignature:0,executableCode:0,codeExecutionResult:0};for(let u of s)for(let c of GC)c in u&&(i[c]+=1);let a=Y_[r];for(let u of GC)if(!a.includes(u)&&i[u]>0)throw new te(Z.INVALID_CONTENT,`Content with role '${r}' can't contain '${u}' part`);if(e&&!HC[r].includes(e.role))throw new te(Z.INVALID_CONTENT,`Content with role '${r}' can't follow '${e.role}'. Valid previous roles: ${JSON.stringify(HC)}`);e=t}}var ZB=class extends XB{constructor(e,t,r,s,i){super(e,s,i),this.model=t,this.chromeAdapter=r,this.params=s,this.requestOptions=i,s?.history&&(X_(s.history),this._history=s.history),this.params?.systemInstruction!=null&&(this.params={...this.params,systemInstruction:rl(this.params.systemInstruction)})}_formatRequest(e,t){return{safetySettings:this.params?.safetySettings,generationConfig:this.params?.generationConfig,tools:this.params?.tools,toolConfig:this.params?.toolConfig,systemInstruction:this.params?.systemInstruction,contents:[...this._history,...t,e]}}_callGenerateContent(e,t){return $C(this._apiSettings,this.model,e,this.chromeAdapter,{...this.requestOptions,...t})}_callGenerateContentStream(e,t){return QC(this._apiSettings,this.model,e,this.chromeAdapter,{...this.requestOptions,...t})}async sendMessage(e,t){return this._sendMessage(e,t)}async sendMessageStream(e,t){return this._sendMessageStream(e,t)}};async function Z_(n,e,t,r){let s="";if(n.backend.backendType===Ft.GOOGLE_AI){let a=k_(t,e);s=JSON.stringify(a)}else s=JSON.stringify(t);return(await tl({model:e,task:"countTokens",apiSettings:n,stream:!1,singleRequestOptions:r},s)).json()}async function eD(n,e,t,r,s){if(r?.mode===It.ONLY_ON_DEVICE)throw new te(Z.UNSUPPORTED,"countTokens() is not supported for on-device models.");return Z_(n,e,t,s)}var el=class extends WB{constructor(e,t,r,s){super(e,t.model),this.chromeAdapter=s,this.generationConfig=t.generationConfig||{},tD(this.generationConfig),this.safetySettings=t.safetySettings||[],this.tools=t.tools,this.toolConfig=t.toolConfig,this.systemInstruction=rl(t.systemInstruction),this.requestOptions=r||{}}async initializeDeviceModel(e){if(!this.chromeAdapter||this.chromeAdapter.mode===It.ONLY_IN_CLOUD)return;if(await this.chromeAdapter.downloadIfAvailable(e)===Kt.UNAVAILABLE){let r=new te(Z.API_NOT_ENABLED,"Local LanguageModel API not available in this environment.");if(this.chromeAdapter.mode===It.ONLY_ON_DEVICE)throw r;xe.debug(r.message)}await this.chromeAdapter.downloadPromise}async generateContent(e,t){let r=zB(e);return $C(this._apiSettings,this.model,{generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,...r},this.chromeAdapter,{...this.requestOptions,...t})}async generateContentStream(e,t){let r=zB(e),{stream:s,response:i}=await QC(this._apiSettings,this.model,{generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,...r},this.chromeAdapter,{...this.requestOptions,...t});return{stream:s,response:i}}startChat(e){return new ZB(this._apiSettings,this.model,this.chromeAdapter,{tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,generationConfig:this.generationConfig,safetySettings:this.safetySettings,...e},this.requestOptions)}async countTokens(e,t){let r=zB(e);return eD(this._apiSettings,this.model,r,this.chromeAdapter,{...this.requestOptions,...t})}};function tD(n){if(n.thinkingConfig?.thinkingBudget!=null&&n.thinkingConfig?.thinkingLevel)throw new te(Z.UNSUPPORTED,"Cannot set both thinkingBudget and thinkingLevel in a config.");if(n.responseSchema!=null&&n.responseJsonSchema!=null)throw new te(Z.UNSUPPORTED,"Cannot set both responseSchema and responseJsonSchema in a config.");if((n.responseSchema!=null||n.responseJsonSchema!=null)&&n.responseMimeType!=="application/json"&&n.responseMimeType!=="text/x.enum")throw new te(Z.UNSUPPORTED,'responseMimeType must be set to "application/json" or "text/x.enum" if responseSchema or responseJsonSchema are set.')}var nD="audio-processor",eI=`
  class AudioProcessor extends AudioWorkletProcessor {
    constructor(options) {
      super();
      this.targetSampleRate = options.processorOptions.targetSampleRate;
      // 'sampleRate' is a global variable available inside the AudioWorkletGlobalScope,
      // representing the native sample rate of the AudioContext.
      this.inputSampleRate = sampleRate;
    }

    /**
     * This method is called by the browser's audio engine for each block of audio data.
     * Input is a single input, with a single channel (input[0][0]).
     */
    process(inputs) {
      const input = inputs[0];
      if (input && input.length > 0 && input[0].length > 0) {
        const pcmData = input[0]; // Float32Array of raw audio samples.
        
        // Simple linear interpolation for resampling.
        const resampled = new Float32Array(Math.round(pcmData.length * this.targetSampleRate / this.inputSampleRate));
        const ratio = pcmData.length / resampled.length;
        for (let i = 0; i < resampled.length; i++) {
          resampled[i] = pcmData[Math.floor(i * ratio)];
        }

        // Convert Float32 (-1, 1) samples to Int16 (-32768, 32767)
        const resampledInt16 = new Int16Array(resampled.length);
        for (let i = 0; i < resampled.length; i++) {
          const sample = Math.max(-1, Math.min(1, resampled[i]));
          if (sample < 0) {
            resampledInt16[i] = sample * 32768;
          } else {
            resampledInt16[i] = sample * 32767;
          }
        }
        
        this.port.postMessage(resampledInt16);
      }
      // Return true to keep the processor alive and processing the next audio block.
      return true;
    }
  }

  // Register the processor with a name that can be used to instantiate it from the main thread.
  registerProcessor('${nD}', AudioProcessor);
`;function WC(n=Ii(),e){n=xt(n);let t=yi(n,rr),r=e?.backend??new ei,s={useLimitedUseAppCheckTokens:e?.useLimitedUseAppCheckTokens??!1},i=A_(r),a=t.getImmediate({identifier:i});return a.options=s,a}var rD=["mode","onDeviceParams","inCloudParams"];function YC(n,e,t){let r=e,s;if(r.mode){for(let u of Object.keys(e))rD.includes(u)||xe.warn(`When a hybrid inference mode is specified (mode is currently set to ${r.mode}), "${u}" cannot be configured at the top level. Configuration for in-cloud and on-device must be done separately in inCloudParams and onDeviceParams. Configuration values set outside of inCloudParams and onDeviceParams will be ignored.`);s=r.inCloudParams||{model:T_}}else s=e;if(!s.model)throw new te(Z.NO_MODEL,"Must provide a model name. Example: getGenerativeModel({ model: 'my-model-name' })");let i=n.chromeAdapterFactory?.(r.mode,typeof window>"u"?void 0:window,r.onDeviceParams),a=new el(n,s,t,i);return a._apiSettings.inferenceMode=r.mode,a}function sD(){bn(new gt(rr,S_,"PUBLIC").setMultipleInstances(!0)),mt(PC,QB),mt(PC,QB,"esm2020")}sD();var iD=`
SiteToFit (website siteto.fit) is an app for companies that sell, measure and install: kitchens and wardrobes, aluminium and windows, air conditioning, curtains and blinds, CCTV and alarms, flooring, solar and similar trades. It is made in Malta.

WHAT IT DOES, STEP BY STEP
1. Enquiries: every enquiry goes into one list with its next step and date (call back, send a quote, book a visit). Reminders before appointments. Salespeople have the same list on their phone and a sales app to log new sales with documents.
2. Site visits: book the visit, take measurements and notes, attach photos or drawings, mark it done. Pending and done visits on one screen.
3. Jobs: one tap turns a visit into a job. Pick the installer team, the date and the materials, and choose items from the store; they are kept aside for that job straight away. The job appears on the installations calendar and on the team's phone.
4. Store: the store keeper has their own app. Stock in (scan barcodes; appliances one by one by serial number, fixings counted), stock out (scan each item out for each job, every serial number linked to the client), stock (in store, kept for jobs, available, search a serial number), to order (what to order so every booked job is covered, items below a warning level), stock take. Works with a handheld barcode scanner or the phone camera.
5. Installer teams: each team sees only its own jobs on the phone: address with directions, work to do, materials, notes from the office, photo boxes set by the company (no limit on photos). A job can't be finished without photos. The office gets an alert.
6. Payment on the day: the team sees what is still to pay, records the payment (cash, cheque with a photo, bank transfer or Revolut, or card using the company's own card machine) and sends the client a numbered PDF invoice with the company logo, VAT breakdown and bank details by WhatsApp or email. The office confirms each payment when the money reaches them.
7. The office checks the photos of each stage and closes the job. All photos of a job can be downloaded in one file for warranty or disputes.
8. Money to collect: every balance still owed in one list, one-tap polite WhatsApp reminder with the bank details, record payments.
Also included: dashboard, installations calendar, clients in one place (phone, email, every visit, job, photo and payment), targets per salesperson and a one-page monthly report, the company's own name, logo and colours on its own page address (siteto.fit/c/company-name).
Optional parts each company can switch on: Store, Sales app, Targets and monthly report. Trade packs: a Solar pack (REWS grants, Part B deadlines, grant offer letters) is planned.

HOW IT WORKS FOR A COMPANY
- Works in any phone or computer browser. On Android phones it can be added to the home screen like an app. There is no Play Store or App Store app yet.
- Each person has their own login and sees only what their role needs: owner/manager, office, salesperson, store keeper, installer team (one login per team).
- SiteToFit sets up the company: logo, colours, job types, photo boxes, store products and logins. Companies can start in a day.
- Data is stored with Google Firebase in the European Union (Belgium). Each company only sees its own data. Privacy policy at siteto.fit/privacy, terms at siteto.fit/terms.
- Support is local, in Malta, by WhatsApp, phone or email.
- Early companies get a free one-month trial on their own page with their logo, their job types and photo boxes set up for them, and a say in what is built next.

MICRO INVEST (Malta Enterprise scheme, 2026\u20132030)
- SaaS (online software) like SiteToFit counts as a digital investment under Malta Enterprise's Micro Invest scheme. The setup and the first 12 months of the first subscription can earn a tax credit of 65% (85% for companies operating from Gozo). Renewals after the first year don't qualify.
- Example: for every \u20AC1,000 (excluding VAT) spent on setup and the first year, up to \u20AC650 comes back as a tax credit, so it really costs \u20AC350 (\u20AC150 in Gozo).
- Who can claim: companies, partnerships and self-employed people in Malta and Gozo with at least 1 and up to 50 full-time employees, registered for VAT.
- How: try SiteToFit free for a month; if they continue, the setup and first 12 months go on one invoice so it meets the scheme's \u20AC500 minimum per invoice; their accountant (CPA) applies to Malta Enterprise. Claims for 2026 costs open on 1 January 2027. The credit is deducted from the tax on their profits.
- Each company can claim up to \u20AC65,000 over three years (\u20AC85,000 for Gozo, family and female-owned businesses).
- Every claim is subject to Malta Enterprise's approval and rules. SiteToFit is not a tax adviser: always tell them to check with their accountant, and suggest "Ask for a quote" so one of our salespeople can call them back.
- There is a live demo with a made-up kitchen company at siteto.fit/demo.

PRICES
- Prices are not published yet. They depend on the size of the team and the parts switched on. The way to get a price is the "Ask for a quote" button, or contacting us.

CONTACT
- The SiteToFit sales team, phone and WhatsApp 7932 3756 (+356 7932 3756), email sitetofit@gmail.com.
`,XC=`You are the assistant on the SiteToFit website (siteto.fit). You answer visitors' questions about SiteToFit only, using the facts below.
Rules:
- Answer only from the facts. If something isn't covered, say you're not sure and suggest the "Ask for a quote" button or contacting us. Never invent features, prices, discounts, dates, integrations or promises.
- Prices: never give a number. Explain that prices depend on team size and the parts they need, and suggest "Ask for a quote".
- Keep answers short: 1 to 4 sentences, or a few short bullet points. Plain, friendly, professional language. No emojis.
- Reply in the visitor's language.
- If asked about something unrelated to SiteToFit, politely say you can only help with SiteToFit.
- You are an AI assistant, not a person. Say so if asked.
- Never name individual people at SiteToFit; say "our team" or "one of our salespeople".
- Never ask for passwords, card numbers or other sensitive details.
FACTS:
${iD}`;var oD={apiKey:"AIzaSyCj4tTRbCljsDlaVixbBc1UWUg_gzGo7HY",authDomain:"sitetofit.firebaseapp.com",projectId:"sitetofit",storageBucket:"sitetofit.firebasestorage.app",messagingSenderId:"550981635120",appId:"1:550981635120:web:b0da61bf409b27041571f5"},aD="gary.falzon2104@gmail.com",uD=["gemini-3.5-flash-lite","gemini-3.8-flash"],ZC=Sa(oD,"website"),cD=qB(ZC),sl=null;async function cI(n){let e=["New quote request from siteto.fit","",`Name: ${n.name}`,`Company: ${n.company}`,`Trade: ${n.trade}`,`Phone: ${n.phone}`,`Email: ${n.email}`,`Team size: ${n.size}`,"",n.text?`Message:
${n.text}`:"No message.","","Reply to this email to answer them directly."];await NC(xB(cD,"quotes"),{to:aD,replyTo:n.email,message:{subject:`Quote request: ${n.company} (${n.trade})`.slice(0,150),text:e.join(`
`)},name:n.name,company:n.company,trade:n.trade,phone:n.phone,email:n.email,size:n.size,text:n.text,status:"new",page:"siteto.fit",createdAt:LB()})}async function BI(n){sl||(sl=WC(ZC,{backend:new sr}));let e=n.map(r=>({role:r.role,parts:[{text:r.text}]})),t;for(let r of uD)try{let a=(await YC(sl,{model:r,systemInstruction:XC,generationConfig:{maxOutputTokens:400,temperature:.3}}).generateContent({contents:e})).response.text();if(a&&a.trim())return a.trim()}catch(s){t=s,console.warn("assistant",r,s)}throw t||new Error("No answer")}export{aD as QUOTE_TO,BI as ask,cI as saveQuote};
/*! Bundled license information:

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/component/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/logger/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/webchannel-wrapper/dist/bloom-blob/esm/bloom_blob_es2018.js:
  (** @license
  Copyright The Closure Library Authors.
  SPDX-License-Identifier: Apache-2.0
  *)
  (** @license
  
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  *)

@firebase/webchannel-wrapper/dist/webchannel-blob/esm/webchannel_blob_es2018.js:
  (** @license
  Copyright The Closure Library Authors.
  SPDX-License-Identifier: Apache-2.0
  *)
  (** @license
  
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  *)

re2js/build/index.js:
  (*!
  * re2js
  * RE2JS is the JavaScript port of RE2, a regular expression engine that provides linear time matching
  *
  * @version v2.9.0
  * @author Oleksii Vasyliev
  * @homepage https://github.com/le0pard/re2js#readme
  * @repository [object Object]
  * @license MIT
  *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2026 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (* Copyright 2024 Google LLC* @license *)
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law | agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES | CONDITIONS OF ANY KIND, either express | implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (* Copyright 2024 Google LLC* @license *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-CLMydGSF.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/ai/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/ai/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/ai/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/ai/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/ai/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/ai/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2026 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/ai/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/ai/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/ai/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2026 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/ai/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/ai/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/ai/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/ai/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/ai/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
*/
