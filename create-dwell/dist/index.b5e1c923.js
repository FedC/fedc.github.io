let e,t,n,r,i,s,o,a;var l,h,u,c,f,d,p,g,m,y,v,w,E,b,I,_,T,S,A,k,C,R,x,O,N,P,D,L=globalThis,M={},U={},F=L.parcelRequirebfdf;null==F&&((F=function(e){if(e in M)return M[e].exports;if(e in U){var t=U[e];delete U[e];var n={id:e,exports:{}};return M[e]=n,t.call(n.exports,n,n.exports),n.exports}var r=Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){U[e]=t},L.parcelRequirebfdf=F),(0,F.register)("lthow",function(e,t){var n,r;n="undefined"!=typeof window?window:e.exports,r=function(){function e(){}let t=e.prototype;return t.on=function(e,t){if(!e||!t)return this;let n=this._events=this._events||{},r=n[e]=n[e]||[];return r.includes(t)||r.push(t),this},t.once=function(e,t){if(!e||!t)return this;this.on(e,t);let n=this._onceEvents=this._onceEvents||{};return(n[e]=n[e]||{})[t]=!0,this},t.off=function(e,t){let n=this._events&&this._events[e];if(!n||!n.length)return this;let r=n.indexOf(t);return -1!=r&&n.splice(r,1),this},t.emitEvent=function(e,t){let n=this._events&&this._events[e];if(!n||!n.length)return this;n=n.slice(0),t=t||[];let r=this._onceEvents&&this._onceEvents[e];for(let i of n)r&&r[i]&&(this.off(e,i),delete r[i]),i.apply(this,t);return this},t.allOff=function(){return delete this._events,delete this._onceEvents,this},e},e.exports?e.exports=r():n.EvEmitter=r()});var V={};j="undefined"!=typeof window?window:V,$=function(e,t){let n=e.jQuery,r=e.console;function i(e,t,s){var o;if(!(this instanceof i))return new i(e,t,s);let a=e;if("string"==typeof e&&(a=document.querySelectorAll(e)),!a){r.error(`Bad element for imagesLoaded ${a||e}`);return}this.elements=Array.isArray(o=a)?o:"object"==typeof o&&"number"==typeof o.length?[...o]:[o],this.options={},"function"==typeof t?s=t:Object.assign(this.options,t),s&&this.on("always",s),this.getImages(),n&&(this.jqDeferred=new n.Deferred),setTimeout(this.check.bind(this))}i.prototype=Object.create(t.prototype),i.prototype.getImages=function(){this.images=[],this.elements.forEach(this.addElementImages,this)};let s=[1,9,11];i.prototype.addElementImages=function(e){"IMG"===e.nodeName&&this.addImage(e),!0===this.options.background&&this.addElementBackgroundImages(e);let{nodeType:t}=e;if(t&&s.includes(t)){for(let t of e.querySelectorAll("img"))this.addImage(t);if("string"==typeof this.options.background)for(let t of e.querySelectorAll(this.options.background))this.addElementBackgroundImages(t)}};let o=/url\((['"])?(.*?)\1\)/gi;function a(e){this.img=e}function l(e,t){this.url=e,this.element=t,this.img=new Image}return i.prototype.addElementBackgroundImages=function(e){let t=getComputedStyle(e);if(!t)return;let n=o.exec(t.backgroundImage);for(;null!==n;){let r=n&&n[2];r&&this.addBackground(r,e),n=o.exec(t.backgroundImage)}},i.prototype.addImage=function(e){let t=new a(e);this.images.push(t)},i.prototype.addBackground=function(e,t){let n=new l(e,t);this.images.push(n)},i.prototype.check=function(){if(this.progressedCount=0,this.hasAnyBroken=!1,!this.images.length){this.complete();return}let e=(e,t,n)=>{setTimeout(()=>{this.progress(e,t,n)})};this.images.forEach(function(t){t.once("progress",e),t.check()})},i.prototype.progress=function(e,t,n){this.progressedCount++,this.hasAnyBroken=this.hasAnyBroken||!e.isLoaded,this.emitEvent("progress",[this,e,t]),this.jqDeferred&&this.jqDeferred.notify&&this.jqDeferred.notify(this,e),this.progressedCount===this.images.length&&this.complete(),this.options.debug&&r&&r.log(`progress: ${n}`,e,t)},i.prototype.complete=function(){let e=this.hasAnyBroken?"fail":"done";if(this.isComplete=!0,this.emitEvent(e,[this]),this.emitEvent("always",[this]),this.jqDeferred){let e=this.hasAnyBroken?"reject":"resolve";this.jqDeferred[e](this)}},a.prototype=Object.create(t.prototype),a.prototype.check=function(){if(this.getIsImageComplete()){this.confirm(0!==this.img.naturalWidth,"naturalWidth");return}this.proxyImage=new Image,this.img.crossOrigin&&(this.proxyImage.crossOrigin=this.img.crossOrigin),this.proxyImage.addEventListener("load",this),this.proxyImage.addEventListener("error",this),this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.proxyImage.src=this.img.currentSrc||this.img.src},a.prototype.getIsImageComplete=function(){return this.img.complete&&this.img.naturalWidth},a.prototype.confirm=function(e,t){this.isLoaded=e;let{parentNode:n}=this.img,r="PICTURE"===n.nodeName?n:this.img;this.emitEvent("progress",[this,r,t])},a.prototype.handleEvent=function(e){let t="on"+e.type;this[t]&&this[t](e)},a.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindEvents()},a.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindEvents()},a.prototype.unbindEvents=function(){this.proxyImage.removeEventListener("load",this),this.proxyImage.removeEventListener("error",this),this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},l.prototype=Object.create(a.prototype),l.prototype.check=function(){this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.img.src=this.url,this.getIsImageComplete()&&(this.confirm(0!==this.img.naturalWidth,"naturalWidth"),this.unbindEvents())},l.prototype.unbindEvents=function(){this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},l.prototype.confirm=function(e,t){this.isLoaded=e,this.emitEvent("progress",[this,this.element,t])},i.makeJQueryPlugin=function(t){(t=t||e.jQuery)&&((n=t).fn.imagesLoaded=function(e,t){return new i(this,e,t).jqDeferred.promise(n(this))})},i.makeJQueryPlugin(),i},V?V=$(j,F("lthow")):j.imagesLoaded=$(j,j.EvEmitter);const B=(e="img")=>new Promise(t=>{var n;((n=V)&&n.__esModule?n.default:n)(document.querySelectorAll(e),{background:!0},t)});var j,$,H,q,z,K,G,W,X,Y,J=F("e5yPX"),Q=F("cas9V"),Z=F("dBXGD"),ee=function(){return"undefined"!=typeof window},et=function(){return H||ee()&&(H=window.gsap)&&H.registerPlugin&&H},en=function(e){return"string"==typeof e},er=function(e){return"function"==typeof e},ei=function(e,t){var n="x"===t?"Width":"Height",r="scroll"+n,i="client"+n;return e===z||e===K||e===G?Math.max(K[r],G[r])-(z["inner"+n]||K[i]||G[i]):e[r]-e["offset"+n]},es=function(e,t){var n="scroll"+("x"===t?"Left":"Top");return e===z&&(null!=e.pageXOffset?n="page"+t.toUpperCase()+"Offset":e=null!=K[n]?K:G),function(){return e[n]}},eo=function(e,t,n,r){if(er(e)&&(e=e(t,n,r)),"object"!=typeof e)return en(e)&&"max"!==e&&"="!==e.charAt(1)?{x:e,y:e}:{y:e};if(e.nodeType)return{y:e,x:e};var i,s={};for(i in e)s[i]="onAutoKill"!==i&&er(e[i])?e[i](t,n,r):e[i];return s},ea=function(e,t){if(!(e=W(e)[0])||!e.getBoundingClientRect)return console.warn("scrollTo target doesn't exist. Using 0")||{x:0,y:0};var n=e.getBoundingClientRect(),r=!t||t===z||t===G,i=r?{top:K.clientTop-(z.pageYOffset||K.scrollTop||G.scrollTop||0),left:K.clientLeft-(z.pageXOffset||K.scrollLeft||G.scrollLeft||0)}:t.getBoundingClientRect(),s={x:n.left-i.left,y:n.top-i.top};return!r&&t&&(s.x+=es(t,"x")(),s.y+=es(t,"y")()),s},el=function(e,t,n,r,i){return isNaN(e)||"object"==typeof e?en(e)&&"="===e.charAt(1)?parseFloat(e.substr(2))*("-"===e.charAt(0)?-1:1)+r-i:"max"===e?ei(t,n)-i:Math.min(ei(t,n),ea(e,t)[n]-i):parseFloat(e)-i},eh=function(){H=et(),ee()&&H&&"undefined"!=typeof document&&document.body&&(z=window,G=document.body,K=document.documentElement,W=H.utils.toArray,H.config({autoKillThreshold:7}),X=H.config(),q=1)},eu={version:"3.12.5",name:"scrollTo",rawVars:1,register:function(e){H=e,eh()},init:function(e,t,n,r,i){q||eh();var s=H.getProperty(e,"scrollSnapType");this.isWin=e===z,this.target=e,this.tween=n,t=eo(t,r,e,i),this.vars=t,this.autoKill=!!t.autoKill,this.getX=es(e,"x"),this.getY=es(e,"y"),this.x=this.xPrev=this.getX(),this.y=this.yPrev=this.getY(),Y||(Y=H.core.globals().ScrollTrigger),"smooth"===H.getProperty(e,"scrollBehavior")&&H.set(e,{scrollBehavior:"auto"}),s&&"none"!==s&&(this.snap=1,this.snapInline=e.style.scrollSnapType,e.style.scrollSnapType="none"),null!=t.x?(this.add(this,"x",this.x,el(t.x,e,"x",this.x,t.offsetX||0),r,i),this._props.push("scrollTo_x")):this.skipX=1,null!=t.y?(this.add(this,"y",this.y,el(t.y,e,"y",this.y,t.offsetY||0),r,i),this._props.push("scrollTo_y")):this.skipY=1},render:function(e,t){for(var n,r,i,s,o,a=t._pt,l=t.target,h=t.tween,u=t.autoKill,c=t.xPrev,f=t.yPrev,d=t.isWin,p=t.snap,g=t.snapInline;a;)a.r(e,a.d),a=a._next;n=d||!t.skipX?t.getX():c,i=(r=d||!t.skipY?t.getY():f)-f,s=n-c,o=X.autoKillThreshold,t.x<0&&(t.x=0),t.y<0&&(t.y=0),u&&(!t.skipX&&(s>o||s<-o)&&n<ei(l,"x")&&(t.skipX=1),!t.skipY&&(i>o||i<-o)&&r<ei(l,"y")&&(t.skipY=1),t.skipX&&t.skipY&&(h.kill(),t.vars.onAutoKill&&t.vars.onAutoKill.apply(h,t.vars.onAutoKillParams||[]))),d?z.scrollTo(t.skipX?n:t.x,t.skipY?r:t.y):(t.skipY||(l.scrollTop=t.y),t.skipX||(l.scrollLeft=t.x)),p&&(1===e||0===e)&&(r=l.scrollTop,n=l.scrollLeft,g?l.style.scrollSnapType=g:l.style.removeProperty("scroll-snap-type"),l.scrollTop=r+1,l.scrollLeft=n+1,l.scrollTop=r,l.scrollLeft=n),t.xPrev=t.x,t.yPrev=t.y,Y&&Y.update()},kill:function(e){var t="scrollTo"===e,n=this._props.indexOf(e);return(t||"scrollTo_x"===e)&&(this.skipX=1),(t||"scrollTo_y"===e)&&(this.skipY=1),n>-1&&this._props.splice(n,1),!this._props.length}};eu.max=ei,eu.getOffset=ea,eu.buildGetter=es,et()&&H.registerPlugin(eu);/**
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
 */var ec={},ef=ec={};function ed(){throw Error("setTimeout has not been defined")}function ep(){throw Error("clearTimeout has not been defined")}function eg(e){if(f===setTimeout)return setTimeout(e,0);if((f===ed||!f)&&setTimeout)return f=setTimeout,setTimeout(e,0);try{return f(e,0)}catch(t){try{return f.call(null,e,0)}catch(t){return f.call(this,e,0)}}}!function(){try{f="function"==typeof setTimeout?setTimeout:ed}catch(e){f=ed}try{d="function"==typeof clearTimeout?clearTimeout:ep}catch(e){d=ep}}();var em=[],ey=!1,ev=-1;function ew(){ey&&p&&(ey=!1,p.length?em=p.concat(em):ev=-1,em.length&&eE())}function eE(){if(!ey){var e=eg(ew);ey=!0;for(var t=em.length;t;){for(p=em,em=[];++ev<t;)p&&p[ev].run();ev=-1,t=em.length}p=null,ey=!1,function(e){if(d===clearTimeout)return clearTimeout(e);if((d===ep||!d)&&clearTimeout)return d=clearTimeout,clearTimeout(e);try{d(e)}catch(t){try{return d.call(null,e)}catch(t){return d.call(this,e)}}}(e)}}function eb(e,t){this.fun=e,this.array=t}function eI(){}ef.nextTick=function(e){var t=Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];em.push(new eb(e,t)),1!==em.length||ey||eg(eE)},eb.prototype.run=function(){this.fun.apply(null,this.array)},ef.title="browser",ef.browser=!0,ef.env={},ef.argv=[],ef.version="",ef.versions={},ef.on=eI,ef.addListener=eI,ef.once=eI,ef.off=eI,ef.removeListener=eI,ef.removeAllListeners=eI,ef.emit=eI,ef.prependListener=eI,ef.prependOnceListener=eI,ef.listeners=function(e){return[]},ef.binding=function(e){throw Error("process.binding is not supported")},ef.cwd=function(){return"/"},ef.chdir=function(e){throw Error("process.chdir is not supported")},ef.umask=function(){return 0};/**
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
 */const e_=function(e){let t=[],n=0;for(let r=0;r<e.length;r++){let i=e.charCodeAt(r);i<128?t[n++]=i:(i<2048?t[n++]=i>>6|192:((64512&i)==55296&&r+1<e.length&&(64512&e.charCodeAt(r+1))==56320?(i=65536+((1023&i)<<10)+(1023&e.charCodeAt(++r)),t[n++]=i>>18|240,t[n++]=i>>12&63|128):t[n++]=i>>12|224,t[n++]=i>>6&63|128),t[n++]=63&i|128)}return t},eT=function(e){let t=[],n=0,r=0;for(;n<e.length;){let i=e[n++];if(i<128)t[r++]=String.fromCharCode(i);else if(i>191&&i<224){let s=e[n++];t[r++]=String.fromCharCode((31&i)<<6|63&s)}else if(i>239&&i<365){let s=((7&i)<<18|(63&e[n++])<<12|(63&e[n++])<<6|63&e[n++])-65536;t[r++]=String.fromCharCode(55296+(s>>10)),t[r++]=String.fromCharCode(56320+(1023&s))}else{let s=e[n++],o=e[n++];t[r++]=String.fromCharCode((15&i)<<12|(63&s)<<6|63&o)}}return t.join("")},eS={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();let n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let t=0;t<e.length;t+=3){let i=e[t],s=t+1<e.length,o=s?e[t+1]:0,a=t+2<e.length,l=a?e[t+2]:0,h=i>>2,u=(3&i)<<4|o>>4,c=(15&o)<<2|l>>6,f=63&l;a||(f=64,s||(c=64)),r.push(n[h],n[u],n[c],n[f])}return r.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(e_(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):eT(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();let n=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let t=0;t<e.length;){let i=n[e.charAt(t++)],s=t<e.length?n[e.charAt(t)]:0,o=++t<e.length?n[e.charAt(t)]:64,a=++t<e.length?n[e.charAt(t)]:64;if(++t,null==i||null==s||null==o||null==a)throw new eA;let l=i<<2|s>>4;if(r.push(l),64!==o){let e=s<<4&240|o>>2;if(r.push(e),64!==a){let e=o<<6&192|a;r.push(e)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};class eA extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const ek=function(e){let t=e_(e);return eS.encodeByteArray(t,!0)},eC=function(e){return ek(e).replace(/\./g,"")},eR=function(e){try{return eS.decodeString(e,!0)}catch(e){console.error("base64Decode failed: ",e)}return null},ex=()=>/**
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
 */(function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if(void 0!==L)return L;throw Error("Unable to locate global object.")})().__FIREBASE_DEFAULTS__,eO=()=>{if(void 0===ec||void 0===ec.env)return;let e=void 0;if(e)return JSON.parse(e)},eN=()=>{let e;if("undefined"==typeof document)return;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(e){return}let t=e&&eR(e[1]);return t&&JSON.parse(t)},eP=()=>{try{return ex()||eO()||eN()}catch(e){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);return}},eD=e=>{var t,n;return null===(n=null===(t=eP())||void 0===t?void 0:t.emulatorHosts)||void 0===n?void 0:n[e]},eL=e=>{let t=eD(e);if(!t)return;let n=t.lastIndexOf(":");if(n<=0||n+1===t.length)throw Error(`Invalid host ${t} with no separate hostname and port!`);let r=parseInt(t.substring(n+1),10);return"["===t[0]?[t.substring(1,n-1),r]:[t.substring(0,n),r]},eM=()=>{var e;return null===(e=eP())||void 0===e?void 0:e.config},eU=e=>{var t;return null===(t=eP())||void 0===t?void 0:t[`_${e}`]};/**
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
 */class eF{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),"function"==typeof e&&(this.promise.catch(()=>{}),1===e.length?e(t):e(t,n))}}}/**
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
 */function eV(e,t){if(e.uid)throw Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');let n=t||"demo-project",r=e.iat||0,i=e.sub||e.user_id;if(!i)throw Error("mockUserToken must contain 'sub' or 'user_id' field!");let s=Object.assign({iss:`https://securetoken.google.com/${n}`,aud:n,iat:r,exp:r+3600,auth_time:r,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},e);return[eC(JSON.stringify({alg:"none",type:"JWT"})),eC(JSON.stringify(s)),""].join(".")}/**
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
 */function eB(){return"undefined"!=typeof navigator&&"string"==typeof navigator.userAgent?navigator.userAgent:""}function ej(){let e="object"==typeof chrome?chrome.runtime:"object"==typeof browser?browser.runtime:void 0;return"object"==typeof e&&void 0!==e.id}function e$(){try{return"object"==typeof indexedDB}catch(e){return!1}}function eH(){return new Promise((e,t)=>{try{let n=!0,r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),e(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var e;t((null===(e=i.error)||void 0===e?void 0:e.message)||"")}}catch(e){t(e)}})}class eq extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name="FirebaseError",Object.setPrototypeOf(this,eq.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ez.prototype.create)}}class ez{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){let n=t[0]||{},r=`${this.service}/${e}`,i=this.errors[e],s=i?i.replace(eK,(e,t)=>{let r=n[t];return null!=r?String(r):`<${t}?>`}):"Error",o=`${this.serviceName}: ${s} (${r}).`;return new eq(r,o,n)}}const eK=/\{\$([^}]+)}/g;function eG(e,t){if(e===t)return!0;let n=Object.keys(e),r=Object.keys(t);for(let i of n){if(!r.includes(i))return!1;let n=e[i],s=t[i];if(eW(n)&&eW(s)){if(!eG(n,s))return!1}else if(n!==s)return!1}for(let e of r)if(!n.includes(e))return!1;return!0}function eW(e){return null!==e&&"object"==typeof e}/**
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
 */function eX(e){let t=[];for(let[n,r]of Object.entries(e))Array.isArray(r)?r.forEach(e=>{t.push(encodeURIComponent(n)+"="+encodeURIComponent(e))}):t.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return t.length?"&"+t.join("&"):""}function eY(e){let t={};return e.replace(/^\?/,"").split("&").forEach(e=>{if(e){let[n,r]=e.split("=");t[decodeURIComponent(n)]=decodeURIComponent(r)}}),t}function eJ(e){let t=e.indexOf("?");if(!t)return"";let n=e.indexOf("#",t);return e.substring(t,n>0?n:void 0)}class eQ{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(e=>{this.error(e)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,n){let r;if(void 0===e&&void 0===t&&void 0===n)throw Error("Missing Observer.");void 0===(r=!function(e,t){if("object"!=typeof e||null===e)return!1;for(let n of t)if(n in e&&"function"==typeof e[n])return!0;return!1}(e,["next","error","complete"])?{next:e,error:t,complete:n}:e).next&&(r.next=eZ),void 0===r.error&&(r.error=eZ),void 0===r.complete&&(r.complete=eZ);let i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch(e){}}),this.observers.push(r),i}unsubscribeOne(e){void 0!==this.observers&&void 0!==this.observers[e]&&(delete this.observers[e],this.observerCount-=1,0===this.observerCount&&void 0!==this.onNoObservers&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(void 0!==this.observers&&void 0!==this.observers[e])try{t(this.observers[e])}catch(e){"undefined"!=typeof console&&console.error&&console.error(e)}})}close(e){this.finalized||(this.finalized=!0,void 0!==e&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function eZ(){}function e0(e,t=1e3,n=2){let r=t*Math.pow(n,e),i=Math.round(.5*r*(Math.random()-.5)*2);return Math.min(144e5,r+i)}/**
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
 */function e1(e){return e&&e._delegate?e._delegate:e}class e2{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const e5="[DEFAULT]";/**
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
 */class e6{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){let t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){let e=new eF;if(this.instancesDeferred.set(t,e),this.isInitialized(t)||this.shouldAutoInitialize())try{let n=this.getOrInitializeService({instanceIdentifier:t});n&&e.resolve(n)}catch(e){}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;let n=this.normalizeInstanceIdentifier(null==e?void 0:e.identifier),r=null!==(t=null==e?void 0:e.optional)&&void 0!==t&&t;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(e){if(r)return null;throw e}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,this.shouldAutoInitialize()){if("EAGER"===e.instantiationMode)try{this.getOrInitializeService({instanceIdentifier:e5})}catch(e){}for(let[e,t]of this.instancesDeferred.entries()){let n=this.normalizeInstanceIdentifier(e);try{let e=this.getOrInitializeService({instanceIdentifier:n});t.resolve(e)}catch(e){}}}}clearInstance(e=e5){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){let e=Array.from(this.instances.values());await Promise.all([...e.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...e.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return null!=this.component}isInitialized(e=e5){return this.instances.has(e)}getOptions(e=e5){return this.instancesOptions.get(e)||{}}initialize(e={}){let{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let r=this.getOrInitializeService({instanceIdentifier:n,options:t});for(let[e,t]of this.instancesDeferred.entries())n===this.normalizeInstanceIdentifier(e)&&t.resolve(r);return r}onInit(e,t){var n;let r=this.normalizeInstanceIdentifier(t),i=null!==(n=this.onInitCallbacks.get(r))&&void 0!==n?n:new Set;i.add(e),this.onInitCallbacks.set(r,i);let s=this.instances.get(r);return s&&e(s,r),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){let n=this.onInitCallbacks.get(t);if(n)for(let r of n)try{r(e,t)}catch(e){}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:e===e5?void 0:e,options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch(e){}return n||null}normalizeInstanceIdentifier(e=e5){return this.component?this.component.multipleInstances?e:e5:e}shouldAutoInitialize(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode}}/**
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
 */class e3{constructor(e){this.name=e,this.providers=new Map}addComponent(e){let t=this.getProvider(e.name);if(t.isComponentSet())throw Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);let t=new e6(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
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
 */const e4=[];(l=g||(g={}))[l.DEBUG=0]="DEBUG",l[l.VERBOSE=1]="VERBOSE",l[l.INFO=2]="INFO",l[l.WARN=3]="WARN",l[l.ERROR=4]="ERROR",l[l.SILENT=5]="SILENT";const e8={debug:g.DEBUG,verbose:g.VERBOSE,info:g.INFO,warn:g.WARN,error:g.ERROR,silent:g.SILENT},e7=g.INFO,e9={[g.DEBUG]:"log",[g.VERBOSE]:"log",[g.INFO]:"info",[g.WARN]:"warn",[g.ERROR]:"error"},te=(e,t,...n)=>{if(t<e.logLevel)return;let r=new Date().toISOString(),i=e9[t];if(i)console[i](`[${r}]  ${e.name}:`,...n);else throw Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class tt{constructor(e){this.name=e,this._logLevel=e7,this._logHandler=te,this._userLogHandler=null,e4.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in g))throw TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel="string"==typeof e?e8[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if("function"!=typeof e)throw TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,g.DEBUG,...e),this._logHandler(this,g.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,g.VERBOSE,...e),this._logHandler(this,g.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,g.INFO,...e),this._logHandler(this,g.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,g.WARN,...e),this._logHandler(this,g.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,g.ERROR,...e),this._logHandler(this,g.ERROR,...e)}}const tn=(e,t)=>t.some(t=>e instanceof t),tr=new WeakMap,ti=new WeakMap,ts=new WeakMap,to=new WeakMap,ta=new WeakMap;let tl={get(e,t,n){if(e instanceof IDBTransaction){if("done"===t)return ti.get(e);if("objectStoreNames"===t)return e.objectStoreNames||ts.get(e);if("store"===t)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return th(e[t])},set:(e,t,n)=>(e[t]=n,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function th(n){var r;if(n instanceof IDBRequest)return function(e){let t=new Promise((t,n)=>{let r=()=>{e.removeEventListener("success",i),e.removeEventListener("error",s)},i=()=>{t(th(e.result)),r()},s=()=>{n(e.error),r()};e.addEventListener("success",i),e.addEventListener("error",s)});return t.then(t=>{t instanceof IDBCursor&&tr.set(t,e)}).catch(()=>{}),ta.set(t,e),t}(n);if(to.has(n))return to.get(n);let i="function"==typeof(r=n)?r!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(t||(t=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(r)?function(...e){return r.apply(tu(this),e),th(tr.get(this))}:function(...e){return th(r.apply(tu(this),e))}:function(e,...t){let n=r.call(tu(this),e,...t);return ts.set(n,e.sort?e.sort():[e]),th(n)}:(r instanceof IDBTransaction&&function(e){if(ti.has(e))return;let t=new Promise((t,n)=>{let r=()=>{e.removeEventListener("complete",i),e.removeEventListener("error",s),e.removeEventListener("abort",s)},i=()=>{t(),r()},s=()=>{n(e.error||new DOMException("AbortError","AbortError")),r()};e.addEventListener("complete",i),e.addEventListener("error",s),e.addEventListener("abort",s)});ti.set(e,t)}(r),tn(r,e||(e=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])))?new Proxy(r,tl):r;return i!==n&&(to.set(n,i),ta.set(i,n)),i}const tu=e=>ta.get(e);function tc(e,t,{blocked:n,upgrade:r,blocking:i,terminated:s}={}){let o=indexedDB.open(e,t),a=th(o);return r&&o.addEventListener("upgradeneeded",e=>{r(th(o.result),e.oldVersion,e.newVersion,th(o.transaction),e)}),n&&o.addEventListener("blocked",e=>n(e.oldVersion,e.newVersion,e)),a.then(e=>{s&&e.addEventListener("close",()=>s()),i&&e.addEventListener("versionchange",e=>i(e.oldVersion,e.newVersion,e))}).catch(()=>{}),a}const tf=["get","getKey","getAll","getAllKeys","count"],td=["put","add","delete","clear"],tp=new Map;function tg(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&"string"==typeof t))return;if(tp.get(t))return tp.get(t);let n=t.replace(/FromIndex$/,""),r=t!==n,i=td.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||tf.includes(n)))return;let s=async function(e,...t){let s=this.transaction(e,i?"readwrite":"readonly"),o=s.store;return r&&(o=o.index(t.shift())),(await Promise.all([o[n](...t),i&&s.done]))[0]};return tp.set(t,s),s}tl={...a=tl,get:(e,t,n)=>tg(e,t)||a.get(e,t,n),has:(e,t)=>!!tg(e,t)||a.has(e,t)};/**
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
 */class tm{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(!function(e){let t=e.getComponent();return(null==t?void 0:t.type)==="VERSION"}(e))return null;{let t=e.getImmediate();return`${t.library}/${t.version}`}}).filter(e=>e).join(" ")}}const ty="@firebase/app",tv="0.10.15",tw=new tt("@firebase/app"),tE="[DEFAULT]",tb={[ty]:"fire-core","@firebase/app-compat":"fire-core-compat","@firebase/analytics":"fire-analytics","@firebase/analytics-compat":"fire-analytics-compat","@firebase/app-check":"fire-app-check","@firebase/app-check-compat":"fire-app-check-compat","@firebase/auth":"fire-auth","@firebase/auth-compat":"fire-auth-compat","@firebase/database":"fire-rtdb","@firebase/data-connect":"fire-data-connect","@firebase/database-compat":"fire-rtdb-compat","@firebase/functions":"fire-fn","@firebase/functions-compat":"fire-fn-compat","@firebase/installations":"fire-iid","@firebase/installations-compat":"fire-iid-compat","@firebase/messaging":"fire-fcm","@firebase/messaging-compat":"fire-fcm-compat","@firebase/performance":"fire-perf","@firebase/performance-compat":"fire-perf-compat","@firebase/remote-config":"fire-rc","@firebase/remote-config-compat":"fire-rc-compat","@firebase/storage":"fire-gcs","@firebase/storage-compat":"fire-gcs-compat","@firebase/firestore":"fire-fst","@firebase/firestore-compat":"fire-fst-compat","@firebase/vertexai":"fire-vertex","fire-js":"fire-js",firebase:"fire-js-all"},tI=new Map,t_=new Map,tT=new Map;function tS(e,t){try{e.container.addComponent(t)}catch(n){tw.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function tA(e){let t=e.name;if(tT.has(t))return tw.debug(`There were multiple attempts to register component ${t}.`),!1;for(let n of(tT.set(t,e),tI.values()))tS(n,e);for(let t of t_.values())tS(t,e);return!0}function tk(e,t){let n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}function tC(e){return void 0!==e.settings}const tR=new ez("app","Firebase",{"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."});/**
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
 */class tx{constructor(e,t,n){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new e2("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw tR.create("app-deleted",{appName:this._name})}}/**
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
 */const tO="11.0.1";function tN(e,t={}){let n=e;"object"!=typeof t&&(t={name:t});let r=Object.assign({name:tE,automaticDataCollectionEnabled:!1},t),i=r.name;if("string"!=typeof i||!i)throw tR.create("bad-app-name",{appName:String(i)});if(n||(n=eM()),!n)throw tR.create("no-options");let s=tI.get(i);if(s){if(eG(n,s.options)&&eG(r,s.config))return s;throw tR.create("duplicate-app",{appName:i})}let o=new e3(i);for(let e of tT.values())o.addComponent(e);let a=new tx(n,r,o);return tI.set(i,a),a}function tP(e=tE){let t=tI.get(e);if(!t&&e===tE&&eM())return tN();if(!t)throw tR.create("no-app",{appName:e});return t}function tD(e,t,n){var r;let i=null!==(r=tb[e])&&void 0!==r?r:e;n&&(i+=`-${n}`);let s=i.match(/\s|\//),o=t.match(/\s|\//);if(s||o){let e=[`Unable to register library "${i}" with version "${t}":`];s&&e.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&o&&e.push("and"),o&&e.push(`version name "${t}" contains illegal characters (whitespace or "/")`),tw.warn(e.join(" "));return}tA(new e2(`${i}-version`,()=>({library:i,version:t}),"VERSION"))}const tL="firebase-heartbeat-store";let tM=null;function tU(){return tM||(tM=tc("firebase-heartbeat-database",1,{upgrade:(e,t)=>{if(0===t)try{e.createObjectStore(tL)}catch(e){console.warn(e)}}}).catch(e=>{throw tR.create("idb-open",{originalErrorMessage:e.message})})),tM}async function tF(e){try{let t=(await tU()).transaction(tL),n=await t.objectStore(tL).get(tB(e));return await t.done,n}catch(e){if(e instanceof eq)tw.warn(e.message);else{let t=tR.create("idb-get",{originalErrorMessage:null==e?void 0:e.message});tw.warn(t.message)}}}async function tV(e,t){try{let n=(await tU()).transaction(tL,"readwrite"),r=n.objectStore(tL);await r.put(t,tB(e)),await n.done}catch(e){if(e instanceof eq)tw.warn(e.message);else{let t=tR.create("idb-set",{originalErrorMessage:null==e?void 0:e.message});tw.warn(t.message)}}}function tB(e){return`${e.name}!${e.options.appId}`}class tj{constructor(e){this.container=e,this._heartbeatsCache=null;let t=this.container.getProvider("app").getImmediate();this._storage=new tH(t),this._heartbeatsCachePromise=this._storage.read().then(e=>(this._heartbeatsCache=e,e))}async triggerHeartbeat(){var e,t;try{let n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=t$();if((null===(e=this._heartbeatsCache)||void 0===e?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,(null===(t=this._heartbeatsCache)||void 0===t?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(e=>e.date===r))return;return this._heartbeatsCache.heartbeats.push({date:r,agent:n}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(e=>{let t=new Date(e.date).valueOf();return Date.now()-t<=2592e6}),this._storage.overwrite(this._heartbeatsCache)}catch(e){tw.warn(e)}}async getHeartbeatsHeader(){var e;try{if(null===this._heartbeatsCache&&await this._heartbeatsCachePromise,(null===(e=this._heartbeatsCache)||void 0===e?void 0:e.heartbeats)==null||0===this._heartbeatsCache.heartbeats.length)return"";let t=t$(),{heartbeatsToSend:n,unsentEntries:r}=function(e,t=1024){let n=[],r=e.slice();for(let i of e){let e=n.find(e=>e.agent===i.agent);if(e){if(e.dates.push(i.date),tq(n)>t){e.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),tq(n)>t){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}(this._heartbeatsCache.heartbeats),i=eC(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=t,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(e){return tw.warn(e),""}}}function t$(){return new Date().toISOString().substring(0,10)}class tH{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return!!e$()&&eH().then(()=>!0).catch(()=>!1)}async read(){if(!await this._canUseIndexedDBPromise)return{heartbeats:[]};{let e=await tF(this.app);return(null==e?void 0:e.heartbeats)?e:{heartbeats:[]}}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){let n=await this.read();return tV(this.app,{lastSentHeartbeatDate:null!==(t=e.lastSentHeartbeatDate)&&void 0!==t?t:n.lastSentHeartbeatDate,heartbeats:e.heartbeats})}}async add(e){var t;if(await this._canUseIndexedDBPromise){let n=await this.read();return tV(this.app,{lastSentHeartbeatDate:null!==(t=e.lastSentHeartbeatDate)&&void 0!==t?t:n.lastSentHeartbeatDate,heartbeats:[...n.heartbeats,...e.heartbeats]})}}}function tq(e){return eC(JSON.stringify({version:2,heartbeats:e})).length}tA(new e2("platform-logger",e=>new tm(e),"PRIVATE")),tA(new e2("heartbeat",e=>new tj(e),"PRIVATE")),tD(ty,tv,""),tD(ty,tv,"esm2017"),tD("fire-js",""),/**
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
 */tD("firebase","11.0.1","app");const tz="@firebase/installations",tK="0.6.10",tG=`w:${tK}`,tW="FIS_v2",tX=new ez("installations","Installations",{"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."});function tY(e){return e instanceof eq&&e.code.includes("request-failed")}/**
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
 */function tJ({projectId:e}){return`https://firebaseinstallations.googleapis.com/v1/projects/${e}/installations`}function tQ(e){return{token:e.token,requestStatus:2,expiresIn:Number(e.expiresIn.replace("s","000")),creationTime:Date.now()}}async function tZ(e,t){let n=(await t.json()).error;return tX.create("request-failed",{requestName:e,serverCode:n.code,serverMessage:n.message,serverStatus:n.status})}function t0({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}async function t1(e){let t=await e();return t.status>=500&&t.status<600?e():t}/**
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
 */async function t2({appConfig:e,heartbeatServiceProvider:t},{fid:n}){let r=tJ(e),i=t0(e),s=t.getImmediate({optional:!0});if(s){let e=await s.getHeartbeatsHeader();e&&i.append("x-firebase-client",e)}let o={method:"POST",headers:i,body:JSON.stringify({fid:n,authVersion:tW,appId:e.appId,sdkVersion:tG})},a=await t1(()=>fetch(r,o));if(a.ok){let e=await a.json();return{fid:e.fid||n,registrationStatus:2,refreshToken:e.refreshToken,authToken:tQ(e.authToken)}}throw await tZ("Create Installation",a)}/**
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
 */function t5(e){return new Promise(t=>{setTimeout(t,e)})}/**
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
 */const t6=/^[cdef][\w-]{21}$/;/**
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
 */function t3(e){return`${e.appName}!${e.appId}`}/**
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
 */const t4=new Map;function t8(e,t){let n=t3(e);t7(n,t),function(e,t){let n=(!t9&&"BroadcastChannel"in self&&((t9=new BroadcastChannel("[Firebase] FID Change")).onmessage=e=>{t7(e.data.key,e.data.fid)}),t9);n&&n.postMessage({key:e,fid:t}),0===t4.size&&t9&&(t9.close(),t9=null)}(n,t)}function t7(e,t){let n=t4.get(e);if(n)for(let e of n)e(t)}let t9=null;const ne="firebase-installations-store";let nt=null;function nn(){return nt||(nt=tc("firebase-installations-database",1,{upgrade:(e,t)=>{0===t&&e.createObjectStore(ne)}})),nt}async function nr(e,t){let n=t3(e),r=(await nn()).transaction(ne,"readwrite"),i=r.objectStore(ne),s=await i.get(n);return await i.put(t,n),await r.done,s&&s.fid===t.fid||t8(e,t.fid),t}async function ni(e){let t=t3(e),n=(await nn()).transaction(ne,"readwrite");await n.objectStore(ne).delete(t),await n.done}async function ns(e,t){let n=t3(e),r=(await nn()).transaction(ne,"readwrite"),i=r.objectStore(ne),s=await i.get(n),o=t(s);return void 0===o?await i.delete(n):await i.put(o,n),await r.done,o&&(!s||s.fid!==o.fid)&&t8(e,o.fid),o}/**
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
 */async function no(e){let t;let n=await ns(e.appConfig,n=>{let r=function(e,t){if(0===t.registrationStatus){if(!navigator.onLine)return{installationEntry:t,registrationPromise:Promise.reject(tX.create("app-offline"))};let n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},r=na(e,n);return{installationEntry:n,registrationPromise:r}}return 1===t.registrationStatus?{installationEntry:t,registrationPromise:nl(e)}:{installationEntry:t}}(e,nu(n||{fid:function(){try{let e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;let t=btoa(String.fromCharCode(...e)).replace(/\+/g,"-").replace(/\//g,"_").substr(0,22);return t6.test(t)?t:""}catch(e){return""}}(),registrationStatus:0}));return t=r.registrationPromise,r.installationEntry});return""===n.fid?{installationEntry:await t}:{installationEntry:n,registrationPromise:t}}async function na(e,t){try{let n=await t2(e,t);return nr(e.appConfig,n)}catch(n){throw tY(n)&&409===n.customData.serverCode?await ni(e.appConfig):await nr(e.appConfig,{fid:t.fid,registrationStatus:0}),n}}async function nl(e){let t=await nh(e.appConfig);for(;1===t.registrationStatus;)await t5(100),t=await nh(e.appConfig);if(0===t.registrationStatus){let{installationEntry:t,registrationPromise:n}=await no(e);return n||t}return t}function nh(e){return ns(e,e=>{if(!e)throw tX.create("installation-not-found");return nu(e)})}function nu(e){return 1===e.registrationStatus&&e.registrationTime+1e4<Date.now()?{fid:e.fid,registrationStatus:0}:e}/**
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
 */async function nc({appConfig:e,heartbeatServiceProvider:t},n){let r=function(e,{fid:t}){return`${tJ(e)}/${t}/authTokens:generate`}(e,n),i=function(e,{refreshToken:t}){let n=t0(e);return n.append("Authorization",`${tW} ${t}`),n}(e,n),s=t.getImmediate({optional:!0});if(s){let e=await s.getHeartbeatsHeader();e&&i.append("x-firebase-client",e)}let o={method:"POST",headers:i,body:JSON.stringify({installation:{sdkVersion:tG,appId:e.appId}})},a=await t1(()=>fetch(r,o));if(a.ok)return tQ(await a.json());throw await tZ("Generate Auth Token",a)}/**
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
 */async function nf(e,t=!1){let n;let r=await ns(e.appConfig,r=>{var i;if(!nm(r))throw tX.create("not-registered");let s=r.authToken;if(!t&&2===(i=s).requestStatus&&!function(e){let t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+36e5}(i))return r;if(1===s.requestStatus)return n=nd(e,t),r;{if(!navigator.onLine)throw tX.create("app-offline");let t=function(e){let t={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},e),{authToken:t})}(r);return n=ng(e,t),t}});return n?await n:r.authToken}async function nd(e,t){let n=await np(e.appConfig);for(;1===n.authToken.requestStatus;)await t5(100),n=await np(e.appConfig);let r=n.authToken;return 0===r.requestStatus?nf(e,t):r}function np(e){return ns(e,e=>{var t;if(!nm(e))throw tX.create("not-registered");return 1===(t=e.authToken).requestStatus&&t.requestTime+1e4<Date.now()?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e})}async function ng(e,t){try{let n=await nc(e,t),r=Object.assign(Object.assign({},t),{authToken:n});return await nr(e.appConfig,r),n}catch(n){if(tY(n)&&(401===n.customData.serverCode||404===n.customData.serverCode))await ni(e.appConfig);else{let n=Object.assign(Object.assign({},t),{authToken:{requestStatus:0}});await nr(e.appConfig,n)}throw n}}function nm(e){return void 0!==e&&2===e.registrationStatus}/**
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
 */async function ny(e){let{installationEntry:t,registrationPromise:n}=await no(e);return n?n.catch(console.error):nf(e).catch(console.error),t.fid}/**
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
 */async function nv(e,t=!1){return await nw(e),(await nf(e,t)).token}async function nw(e){let{registrationPromise:t}=await no(e);t&&await t}function nE(e){return tX.create("missing-app-config-values",{valueName:e})}/**
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
 */const nb="installations";tA(new e2(nb,e=>{let t=e.getProvider("app").getImmediate(),n=/**
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
 */function(e){if(!e||!e.options)throw nE("App Configuration");if(!e.name)throw nE("App Name");for(let t of["projectId","apiKey","appId"])if(!e.options[t])throw nE(t);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}(t),r=tk(t,"heartbeat");return{app:t,appConfig:n,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},"PUBLIC")),tA(new e2("installations-internal",e=>{let t=tk(e.getProvider("app").getImmediate(),nb).getImmediate();return{getId:()=>ny(t),getToken:e=>nv(t,e)}},"PRIVATE")),tD(tz,tK),tD(tz,tK,"esm2017");/**
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
 */const nI="analytics",n_="https://www.googletagmanager.com/gtag/js",nT=new tt("@firebase/analytics"),nS=new ez("analytics","Analytics",{"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."});/**
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
 */function nA(e){if(!e.startsWith(n_)){let t=nS.create("invalid-gtag-resource",{gtagURL:e});return nT.warn(t.message),""}return e}function nk(e){return Promise.all(e.map(e=>e.catch(e=>e)))}async function nC(e,t,n,r,i,s){let o=r[i];try{if(o)await t[o];else{let e=(await nk(n)).find(e=>e.measurementId===i);e&&await t[e.appId]}}catch(e){nT.error(e)}e("config",i,s)}async function nR(e,t,n,r,i){try{let s=[];if(i&&i.send_to){let e=i.send_to;Array.isArray(e)||(e=[e]);let r=await nk(n);for(let n of e){let e=r.find(e=>e.measurementId===n),i=e&&t[e.appId];if(i)s.push(i);else{s=[];break}}}0===s.length&&(s=Object.values(t)),await Promise.all(s),e("event",r,i||{})}catch(e){nT.error(e)}}const nx=new class{constructor(e={},t=1e3){this.throttleMetadata=e,this.intervalMillis=t}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,t){this.throttleMetadata[e]=t}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}};async function nO(e){var t;let{appId:n,apiKey:r}=e,i={method:"GET",headers:new Headers({Accept:"application/json","x-goog-api-key":r})},s="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig".replace("{app-id}",n),o=await fetch(s,i);if(200!==o.status&&304!==o.status){let e="";try{let n=await o.json();(null===(t=n.error)||void 0===t?void 0:t.message)&&(e=n.error.message)}catch(e){}throw nS.create("config-fetch-failed",{httpStatus:o.status,responseMessage:e})}return o.json()}async function nN(e,t=nx,n){let{appId:r,apiKey:i,measurementId:s}=e.options;if(!r)throw nS.create("no-app-id");if(!i){if(s)return{measurementId:s,appId:r};throw nS.create("no-api-key")}let o=t.getThrottleMetadata(r)||{backoffCount:0,throttleEndTimeMillis:Date.now()},a=new nD;return setTimeout(async()=>{a.abort()},void 0!==n?n:6e4),nP({appId:r,apiKey:i,measurementId:s},o,a,t)}async function nP(e,{throttleEndTimeMillis:t,backoffCount:n},r,i=nx){var s;let{appId:o,measurementId:a}=e;try{await new Promise((e,n)=>{let i=setTimeout(e,Math.max(t-Date.now(),0));r.addEventListener(()=>{clearTimeout(i),n(nS.create("fetch-throttle",{throttleEndTimeMillis:t}))})})}catch(e){if(a)return nT.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${a} provided in the "measurementId" field in the local Firebase config. [${null==e?void 0:e.message}]`),{appId:o,measurementId:a};throw e}try{let t=await nO(e);return i.deleteThrottleMetadata(o),t}catch(h){if(!function(e){if(!(e instanceof eq)||!e.customData)return!1;let t=Number(e.customData.httpStatus);return 429===t||500===t||503===t||504===t}(h)){if(i.deleteThrottleMetadata(o),a)return nT.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${a} provided in the "measurementId" field in the local Firebase config. [${null==h?void 0:h.message}]`),{appId:o,measurementId:a};throw h}let t=503===Number(null===(s=null==h?void 0:h.customData)||void 0===s?void 0:s.httpStatus)?e0(n,i.intervalMillis,30):e0(n,i.intervalMillis),l={throttleEndTimeMillis:Date.now()+t,backoffCount:n+1};return i.setThrottleMetadata(o,l),nT.debug(`Calling attemptFetch again in ${t} millis`),nP(e,l,r,i)}}class nD{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function nL(e,t,n,r,i){if(i&&i.global){e("event",n,r);return}{let i=await t;e("event",n,Object.assign(Object.assign({},r),{send_to:i}))}}/**
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
 */async function nM(){if(!e$())return nT.warn(nS.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;try{await eH()}catch(e){return nT.warn(nS.create("indexeddb-unavailable",{errorInfo:null==e?void 0:e.toString()}).message),!1}return!0}async function nU(e,t,i,s,o,a,l){var h;let u=nN(e);u.then(t=>{i[t.measurementId]=t.appId,e.options.measurementId&&t.measurementId!==e.options.measurementId&&nT.warn(`The measurement ID in the local Firebase config (${e.options.measurementId}) does not match the measurement ID fetched from the server (${t.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(e=>nT.error(e)),t.push(u);let c=nM().then(e=>e?s.getId():void 0),[f,d]=await Promise.all([u,c]);!function(e){for(let t of Object.values(window.document.getElementsByTagName("script")))if(t.src&&t.src.includes(n_)&&t.src.includes(e))return t;return null}(a)&&function(e,t){var n,r;let i;let s=(n="firebase-js-sdk-policy",r={createScriptURL:nA},window.trustedTypes&&(i=window.trustedTypes.createPolicy(n,r)),i),o=document.createElement("script"),a=`${n_}?l=${e}&id=${t}`;o.src=s?null==s?void 0:s.createScriptURL(a):a,o.async=!0,document.head.appendChild(o)}(a,f.measurementId),r&&(o("consent","default",r),r=void 0),o("js",new Date);let p=null!==(h=null==l?void 0:l.config)&&void 0!==h?h:{};return p.origin="firebase",p.update=!0,null!=d&&(p.firebase_id=d),o("config",f.measurementId,p),n&&(o("set",n),n=void 0),f.measurementId}/**
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
 */class nF{constructor(e){this.app=e}_delete(){return delete nV[this.app.options.appId],Promise.resolve()}}let nV={},nB=[];const nj={};let n$="dataLayer",nH=!1;const nq="@firebase/analytics",nz="0.10.9";function nK(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&0>t.indexOf(r)&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var i=0,r=Object.getOwnPropertySymbols(e);i<r.length;i++)0>t.indexOf(r[i])&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(n[r[i]]=e[r[i]]);return n}function nG(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}tA(new e2(nI,(e,{options:t})=>(function(e,t,n){!function(){let e=[];if(ej()&&e.push("This is a browser extension environment."),"undefined"!=typeof navigator&&navigator.cookieEnabled||e.push("Cookies are not available."),e.length>0){let t=e.map((e,t)=>`(${t+1}) ${e}`).join(" "),n=nS.create("invalid-analytics-context",{errorInfo:t});nT.warn(n.message)}}();let r=e.options.appId;if(!r)throw nS.create("no-app-id");if(!e.options.apiKey){if(e.options.measurementId)nT.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${e.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw nS.create("no-api-key")}if(null!=nV[r])throw nS.create("already-exists",{id:r});if(!nH){var o,a;let e,t;e=[],Array.isArray(window[n$])?e=window[n$]:window[n$]=e;let{wrappedGtag:n,gtagCore:r}=(o="gtag",t=function(...e){window[n$].push(arguments)},window[o]&&"function"==typeof window[o]&&(t=window[o]),window[o]=(a=t,async function(e,...t){try{if("event"===e){let[e,n]=t;await nR(a,nV,nB,e,n)}else if("config"===e){let[e,n]=t;await nC(a,nV,nB,nj,e,n)}else if("consent"===e){let[e,n]=t;a("consent",e,n)}else if("get"===e){let[e,n,r]=t;a("get",e,n,r)}else if("set"===e){let[e]=t;a("set",e)}else a(e,...t)}catch(e){nT.error(e)}}),{gtagCore:t,wrappedGtag:window[o]});s=n,i=r,nH=!0}return nV[r]=nU(e,nB,nj,t,i,n$,n),new nF(e)})(e.getProvider("app").getImmediate(),e.getProvider("installations-internal").getImmediate(),t),"PUBLIC")),tA(new e2("analytics-internal",function(e){try{let t=e.getProvider(nI).getImmediate();return{logEvent:(e,n,r)=>{var i;return i=t,void(i=e1(i),nL(s,nV[i.app.options.appId],e,n,r).catch(e=>nT.error(e)))}}}catch(e){throw nS.create("interop-component-reg-failed",{reason:e})}},"PRIVATE")),tD(nq,nz),tD(nq,nz,"esm2017"),"function"==typeof SuppressedError&&SuppressedError;const nW=new ez("auth","Firebase",nG()),nX=new tt("@firebase/auth");function nY(e,...t){nX.logLevel<=g.ERROR&&nX.error(`Auth (${tO}): ${e}`,...t)}/**
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
 */function nJ(e,...t){throw n1(e,...t)}function nQ(e,...t){return n1(e,...t)}function nZ(e,t,n){return new ez("auth","Firebase",Object.assign(Object.assign({},nG()),{[t]:n})).create(t,{appName:e.name})}function n0(e){return nZ(e,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function n1(e,...t){if("string"!=typeof e){let n=t[0],r=[...t.slice(1)];return r[0]&&(r[0].appName=e.name),e._errorFactory.create(n,...r)}return nW.create(e,...t)}function n2(e,t,...n){if(!e)throw n1(t,...n)}function n5(e){let t="INTERNAL ASSERTION FAILED: "+e;throw nY(t),Error(t)}/**
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
 */function n6(){var e;return"undefined"!=typeof self&&(null===(e=self.location)||void 0===e?void 0:e.href)||""}function n3(){var e;return"undefined"!=typeof self&&(null===(e=self.location)||void 0===e?void 0:e.protocol)||null}/**
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
 */class n4{constructor(e,t){var n;this.shortDelay=e,this.longDelay=t,n="Short delay should be less than long delay!",t>e||n5(n),this.isMobile="undefined"!=typeof window&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(eB())||"object"==typeof navigator&&"ReactNative"===navigator.product}get(){return!("undefined"!=typeof navigator&&navigator&&"onLine"in navigator&&"boolean"==typeof navigator.onLine&&("http:"===n3()||"https:"===n3()||ej()||"connection"in navigator))||navigator.onLine?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function n8(e,t){var n,r;n=e.emulator,r="Emulator should always be set here",n||n5(r);let{url:i}=e.emulator;return t?`${i}${t.startsWith("/")?t.slice(1):t}`:i}/**
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
 */class n7{static initialize(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)}static fetch(){return this.fetchImpl?this.fetchImpl:"undefined"!=typeof self&&"fetch"in self?self.fetch:"undefined"!=typeof globalThis&&globalThis.fetch?globalThis.fetch:"undefined"!=typeof fetch?fetch:void n5("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){return this.headersImpl?this.headersImpl:"undefined"!=typeof self&&"Headers"in self?self.Headers:"undefined"!=typeof globalThis&&globalThis.Headers?globalThis.Headers:"undefined"!=typeof Headers?Headers:void n5("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){return this.responseImpl?this.responseImpl:"undefined"!=typeof self&&"Response"in self?self.Response:"undefined"!=typeof globalThis&&globalThis.Response?globalThis.Response:"undefined"!=typeof Response?Response:void n5("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const n9={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"},re=new n4(3e4,6e4);function rt(e,t){return e.tenantId&&!t.tenantId?Object.assign(Object.assign({},t),{tenantId:e.tenantId}):t}async function rn(e,t,n,r,i={}){return rr(e,i,async()=>{let i={},s={};r&&("GET"===t?s=r:i={body:JSON.stringify(r)});let o=eX(Object.assign({key:e.config.apiKey},s)).slice(1),a=await e._getAdditionalHeaders();a["Content-Type"]="application/json",e.languageCode&&(a["X-Firebase-Locale"]=e.languageCode);let l=Object.assign({method:t,headers:a},i);return"undefined"!=typeof navigator&&"Cloudflare-Workers"===navigator.userAgent||(l.referrerPolicy="no-referrer"),n7.fetch()(rs(e,e.config.apiHost,n,o),l)})}async function rr(e,t,n){e._canInitEmulator=!1;let r=Object.assign(Object.assign({},n9),t);try{let t=new ro(e),i=await Promise.race([n(),t.promise]);t.clearNetworkTimeout();let s=await i.json();if("needConfirmation"in s)throw ra(e,"account-exists-with-different-credential",s);if(i.ok&&!("errorMessage"in s))return s;{let[t,n]=(i.ok?s.errorMessage:s.error.message).split(" : ");if("FEDERATED_USER_ID_ALREADY_LINKED"===t)throw ra(e,"credential-already-in-use",s);if("EMAIL_EXISTS"===t)throw ra(e,"email-already-in-use",s);if("USER_DISABLED"===t)throw ra(e,"user-disabled",s);let o=r[t]||t.toLowerCase().replace(/[_\s]+/g,"-");if(n)throw nZ(e,o,n);nJ(e,o)}}catch(t){if(t instanceof eq)throw t;nJ(e,"network-request-failed",{message:String(t)})}}async function ri(e,t,n,r,i={}){let s=await rn(e,t,n,r,i);return"mfaPendingCredential"in s&&nJ(e,"multi-factor-auth-required",{_serverResponse:s}),s}function rs(e,t,n,r){let i=`${t}${n}?${r}`;return e.config.emulator?n8(e.config,i):`${e.config.apiScheme}://${i}`}class ro{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((e,t)=>{this.timer=setTimeout(()=>t(nQ(this.auth,"network-request-failed")),re.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function ra(e,t,n){let r={appName:e.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);let i=nQ(e,t,r);return i.customData._tokenResponse=n,i}function rl(e){return void 0!==e&&void 0!==e.enterprise}class rh{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],void 0===e.recaptchaKey)throw Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||0===this.recaptchaEnforcementState.length)return null;for(let t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return function(e){switch(e){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}(t.enforcementState);return null}isProviderEnabled(e){return"ENFORCE"===this.getProviderEnforcementState(e)||"AUDIT"===this.getProviderEnforcementState(e)}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function ru(e,t){return rn(e,"GET","/v2/recaptchaConfig",rt(e,t))}/**
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
 */async function rc(e,t){return rn(e,"POST","/v1/accounts:delete",t)}async function rf(e,t){return rn(e,"POST","/v1/accounts:lookup",t)}/**
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
 */function rd(e){if(e)try{let t=new Date(Number(e));if(!isNaN(t.getTime()))return t.toUTCString()}catch(e){}}async function rp(e,t=!1){let n=e1(e),r=await n.getIdToken(t),i=rm(r);n2(i&&i.exp&&i.auth_time&&i.iat,n.auth,"internal-error");let s="object"==typeof i.firebase?i.firebase:void 0,o=null==s?void 0:s.sign_in_provider;return{claims:i,token:r,authTime:rd(rg(i.auth_time)),issuedAtTime:rd(rg(i.iat)),expirationTime:rd(rg(i.exp)),signInProvider:o||null,signInSecondFactor:(null==s?void 0:s.sign_in_second_factor)||null}}function rg(e){return 1e3*Number(e)}function rm(e){let[t,n,r]=e.split(".");if(void 0===t||void 0===n||void 0===r)return nY("JWT malformed, contained fewer than 3 sections"),null;try{let e=eR(n);if(!e)return nY("Failed to decode base64 JWT payload"),null;return JSON.parse(e)}catch(e){return nY("Caught error parsing JWT payload as JSON",null==e?void 0:e.toString()),null}}function ry(e){let t=rm(e);return n2(t,"internal-error"),n2(void 0!==t.exp,"internal-error"),n2(void 0!==t.iat,"internal-error"),Number(t.exp)-Number(t.iat)}/**
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
 */async function rv(e,t,n=!1){if(n)return t;try{return await t}catch(t){throw t instanceof eq&&function({code:e}){return"auth/user-disabled"===e||"auth/user-token-expired"===e}(t)&&e.auth.currentUser===e&&await e.auth.signOut(),t}}/**
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
 */class rw{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,null!==this.timerId&&clearTimeout(this.timerId))}getInterval(e){var t;if(!e)return this.errorBackoff=3e4,Math.max(0,(null!==(t=this.user.stsTokenManager.expirationTime)&&void 0!==t?t:0)-Date.now()-3e5);{let e=this.errorBackoff;return this.errorBackoff=Math.min(2*this.errorBackoff,96e4),e}}schedule(e=!1){if(!this.isRunning)return;let t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(null==e?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class rE{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=rd(this.lastLoginAt),this.creationTime=rd(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function rb(e){var t;let n=e.auth,r=await e.getIdToken(),i=await rv(e,rf(n,{idToken:r}));n2(null==i?void 0:i.users.length,n,"internal-error");let s=i.users[0];e._notifyReloadListener(s);let o=(null===(t=s.providerUserInfo)||void 0===t?void 0:t.length)?r_(s.providerUserInfo):[],a=[...e.providerData.filter(e=>!o.some(t=>t.providerId===e.providerId)),...o],l=e.isAnonymous,h=!(e.email&&s.passwordHash)&&!(null==a?void 0:a.length);Object.assign(e,{uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new rE(s.createdAt,s.lastLoginAt),isAnonymous:!!l&&h})}async function rI(e){let t=e1(e);await rb(t),await t.auth._persistUserIfCurrent(t),t.auth._notifyListenersIfCurrent(t)}function r_(e){return e.map(e=>{var{providerId:t}=e,n=nK(e,["providerId"]);return{providerId:t,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}})}/**
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
 */async function rT(e,t){let n=await rr(e,{},async()=>{let n=eX({grant_type:"refresh_token",refresh_token:t}).slice(1),{tokenApiHost:r,apiKey:i}=e.config,s=rs(e,r,"/v1/token",`key=${i}`),o=await e._getAdditionalHeaders();return o["Content-Type"]="application/x-www-form-urlencoded",n7.fetch()(s,{method:"POST",headers:o,body:n})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function rS(e,t){return rn(e,"POST","/v2/accounts:revokeToken",rt(e,t))}/**
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
 */class rA{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){n2(e.idToken,"internal-error"),n2(void 0!==e.idToken,"internal-error"),n2(void 0!==e.refreshToken,"internal-error");let t="expiresIn"in e&&void 0!==e.expiresIn?Number(e.expiresIn):ry(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){n2(0!==e.length,"internal-error");let t=ry(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return t||!this.accessToken||this.isExpired?(n2(this.refreshToken,e,"user-token-expired"),this.refreshToken)?(await this.refresh(e,this.refreshToken),this.accessToken):null:this.accessToken}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){let{accessToken:n,refreshToken:r,expiresIn:i}=await rT(e,t);this.updateTokensAndExpiration(n,r,Number(i))}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+1e3*n}static fromJSON(e,t){let{refreshToken:n,accessToken:r,expirationTime:i}=t,s=new rA;return n&&(n2("string"==typeof n,"internal-error",{appName:e}),s.refreshToken=n),r&&(n2("string"==typeof r,"internal-error",{appName:e}),s.accessToken=r),i&&(n2("number"==typeof i,"internal-error",{appName:e}),s.expirationTime=i),s}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new rA,this.toJSON())}_performRefresh(){return n5("not implemented")}}/**
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
 */function rk(e,t){n2("string"==typeof e||void 0===e,"internal-error",{appName:t})}class rC{constructor(e){var{uid:t,auth:n,stsTokenManager:r}=e,i=nK(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new rw(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=n,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new rE(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){let t=await rv(this,this.stsTokenManager.getToken(this.auth,e));return n2(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return rp(this,e)}reload(){return rI(this)}_assign(e){this!==e&&(n2(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(e=>Object.assign({},e)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){let t=new rC(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){n2(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t&&await rb(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(tC(this.auth.app))return Promise.reject(n0(this.auth));let e=await this.getIdToken();return await rv(this,rc(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var n,r,i,s,o,a,l,h;let u=null!==(n=t.displayName)&&void 0!==n?n:void 0,c=null!==(r=t.email)&&void 0!==r?r:void 0,f=null!==(i=t.phoneNumber)&&void 0!==i?i:void 0,d=null!==(s=t.photoURL)&&void 0!==s?s:void 0,p=null!==(o=t.tenantId)&&void 0!==o?o:void 0,g=null!==(a=t._redirectEventId)&&void 0!==a?a:void 0,m=null!==(l=t.createdAt)&&void 0!==l?l:void 0,y=null!==(h=t.lastLoginAt)&&void 0!==h?h:void 0,{uid:v,emailVerified:w,isAnonymous:E,providerData:b,stsTokenManager:I}=t;n2(v&&I,e,"internal-error");let _=rA.fromJSON(this.name,I);n2("string"==typeof v,e,"internal-error"),rk(u,e.name),rk(c,e.name),n2("boolean"==typeof w,e,"internal-error"),n2("boolean"==typeof E,e,"internal-error"),rk(f,e.name),rk(d,e.name),rk(p,e.name),rk(g,e.name),rk(m,e.name),rk(y,e.name);let T=new rC({uid:v,auth:e,email:c,emailVerified:w,displayName:u,isAnonymous:E,photoURL:d,phoneNumber:f,tenantId:p,stsTokenManager:_,createdAt:m,lastLoginAt:y});return b&&Array.isArray(b)&&(T.providerData=b.map(e=>Object.assign({},e))),g&&(T._redirectEventId=g),T}static async _fromIdTokenResponse(e,t,n=!1){let r=new rA;r.updateFromServerResponse(t);let i=new rC({uid:t.localId,auth:e,stsTokenManager:r,isAnonymous:n});return await rb(i),i}static async _fromGetAccountInfoResponse(e,t,n){let r=t.users[0];n2(void 0!==r.localId,"internal-error");let i=void 0!==r.providerUserInfo?r_(r.providerUserInfo):[],s=!(r.email&&r.passwordHash)&&!(null==i?void 0:i.length),o=new rA;o.updateFromIdToken(n);let a=new rC({uid:r.localId,auth:e,stsTokenManager:o,isAnonymous:s});return Object.assign(a,{uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:i,metadata:new rE(r.createdAt,r.lastLoginAt),isAnonymous:!(r.email&&r.passwordHash)&&!(null==i?void 0:i.length)}),a}}/**
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
 */const rR=new Map;function rx(e){var t,n;t="Expected a class definition",e instanceof Function||n5(t);let r=rR.get(e);return r?(n="Instance stored in cache mismatched with class",r instanceof e||n5(n)):(r=new e,rR.set(e,r)),r}/**
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
 */class rO{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){let t=this.storage[e];return void 0===t?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}/**
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
 */function rN(e,t,n){return`firebase:${e}:${t}:${n}`}rO.type="NONE";class rP{constructor(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;let{config:r,name:i}=this.auth;this.fullUserKey=rN(this.userKey,r.apiKey,i),this.fullPersistenceKey=rN("persistence",r.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){let e=await this.persistence._get(this.fullUserKey);return e?rC._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;let t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,n="authUser"){if(!t.length)return new rP(rx(rO),e,n);let r=(await Promise.all(t.map(async e=>{if(await e._isAvailable())return e}))).filter(e=>e),i=r[0]||rx(rO),s=rN(n,e.config.apiKey,e.name),o=null;for(let n of t)try{let t=await n._get(s);if(t){let r=rC._fromJSON(e,t);n!==i&&(o=r),i=n;break}}catch(e){}let a=r.filter(e=>e._shouldAllowMigration);return i._shouldAllowMigration&&a.length&&(i=a[0],o&&await i._set(s,o.toJSON()),await Promise.all(t.map(async e=>{if(e!==i)try{await e._remove(s)}catch(e){}}))),new rP(i,e,n)}}/**
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
 */function rD(e){let t=e.toLowerCase();if(t.includes("opera/")||t.includes("opr/")||t.includes("opios/"))return"Opera";{if(rF(t))return"IEMobile";if(t.includes("msie")||t.includes("trident/"))return"IE";if(t.includes("edge/"))return"Edge";if(rL(t))return"Firefox";if(t.includes("silk/"))return"Silk";if(rB(t))return"Blackberry";if(rj(t))return"Webos";if(rM(t))return"Safari";if((t.includes("chrome/")||rU(t))&&!t.includes("edge/"))return"Chrome";if(rV(t))return"Android";let n=e.match(/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/);if((null==n?void 0:n.length)===2)return n[1]}return"Other"}function rL(e=eB()){return/firefox\//i.test(e)}function rM(e=eB()){let t=e.toLowerCase();return t.includes("safari/")&&!t.includes("chrome/")&&!t.includes("crios/")&&!t.includes("android")}function rU(e=eB()){return/crios\//i.test(e)}function rF(e=eB()){return/iemobile/i.test(e)}function rV(e=eB()){return/android/i.test(e)}function rB(e=eB()){return/blackberry/i.test(e)}function rj(e=eB()){return/webos/i.test(e)}function r$(e=eB()){return/iphone|ipad|ipod/i.test(e)||/macintosh/i.test(e)&&/mobile/i.test(e)}function rH(e=eB()){return r$(e)||rV(e)||rj(e)||rB(e)||/windows phone/i.test(e)||rF(e)}/**
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
 */function rq(e,t=[]){let n;switch(e){case"Browser":n=rD(eB());break;case"Worker":n=`${rD(eB())}-${e}`;break;default:n=e}let r=t.length?t.join(","):"FirebaseCore-web";return`${n}/JsCore/${tO}/${r}`}/**
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
 */class rz{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){let n=t=>new Promise((n,r)=>{try{let r=e(t);n(r)}catch(e){r(e)}});n.onAbort=t,this.queue.push(n);let r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;let t=[];try{for(let n of this.queue)await n(e),n.onAbort&&t.push(n.onAbort)}catch(e){for(let e of(t.reverse(),t))try{e()}catch(e){}throw this.auth._errorFactory.create("login-blocked",{originalMessage:null==e?void 0:e.message})}}}/**
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
 */async function rK(e,t={}){return rn(e,"GET","/v2/passwordPolicy",rt(e,t))}class rG{constructor(e){var t,n,r,i;let s=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=null!==(t=s.minPasswordLength)&&void 0!==t?t:6,s.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=s.maxPasswordLength),void 0!==s.containsLowercaseCharacter&&(this.customStrengthOptions.containsLowercaseLetter=s.containsLowercaseCharacter),void 0!==s.containsUppercaseCharacter&&(this.customStrengthOptions.containsUppercaseLetter=s.containsUppercaseCharacter),void 0!==s.containsNumericCharacter&&(this.customStrengthOptions.containsNumericCharacter=s.containsNumericCharacter),void 0!==s.containsNonAlphanumericCharacter&&(this.customStrengthOptions.containsNonAlphanumericCharacter=s.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,"ENFORCEMENT_STATE_UNSPECIFIED"===this.enforcementState&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=null!==(r=null===(n=e.allowedNonAlphanumericCharacters)||void 0===n?void 0:n.join(""))&&void 0!==r?r:"",this.forceUpgradeOnSignin=null!==(i=e.forceUpgradeOnSignin)&&void 0!==i&&i,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,n,r,i,s,o;let a={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,a),this.validatePasswordCharacterOptions(e,a),a.isValid&&(a.isValid=null===(t=a.meetsMinPasswordLength)||void 0===t||t),a.isValid&&(a.isValid=null===(n=a.meetsMaxPasswordLength)||void 0===n||n),a.isValid&&(a.isValid=null===(r=a.containsLowercaseLetter)||void 0===r||r),a.isValid&&(a.isValid=null===(i=a.containsUppercaseLetter)||void 0===i||i),a.isValid&&(a.isValid=null===(s=a.containsNumericCharacter)||void 0===s||s),a.isValid&&(a.isValid=null===(o=a.containsNonAlphanumericCharacter)||void 0===o||o),a}validatePasswordLengthOptions(e,t){let n=this.customStrengthOptions.minPasswordLength,r=this.customStrengthOptions.maxPasswordLength;n&&(t.meetsMinPasswordLength=e.length>=n),r&&(t.meetsMaxPasswordLength=e.length<=r)}validatePasswordCharacterOptions(e,t){let n;this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);for(let r=0;r<e.length;r++)n=e.charAt(r),this.updatePasswordCharacterOptionsStatuses(t,n>="a"&&n<="z",n>="A"&&n<="Z",n>="0"&&n<="9",this.allowedNonAlphanumericCharacters.includes(n))}updatePasswordCharacterOptionsStatuses(e,t,n,r,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=n)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=r)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
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
 */class rW{constructor(e,t,n,r){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=n,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new rX(this),this.idTokenSubscription=new rX(this),this.beforeStateQueue=new rz(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=nW,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=rx(t)),this._initializationPromise=this.queue(async()=>{var n,r;if(!this._deleted&&(this.persistenceManager=await rP.create(this,e),!this._deleted)){if(null===(n=this._popupRedirectResolver)||void 0===n?void 0:n._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch(e){}await this.initializeCurrentUser(t),this.lastNotifiedUid=(null===(r=this.currentUser)||void 0===r?void 0:r.uid)||null,this._deleted||(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;let e=await this.assertedPersistence.getCurrentUser();if(this.currentUser||e){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{let t=await rf(this,{idToken:e}),n=await rC._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(n)}catch(e){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",e),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(tC(this.app)){let e=this.app.settings.authIdToken;return e?new Promise(t=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(e).then(t,t))}):this.directlySetCurrentUser(null)}let n=await this.assertedPersistence.getCurrentUser(),r=n,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();let n=null===(t=this.redirectUser)||void 0===t?void 0:t._redirectEventId,s=null==r?void 0:r._redirectEventId,o=await this.tryRedirectSignIn(e);(!n||n===s)&&(null==o?void 0:o.user)&&(r=o.user,i=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(r)}catch(e){r=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(e))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return(n2(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId)?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch(e){await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await rb(e)}catch(e){if((null==e?void 0:e.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=function(){if("undefined"==typeof navigator)return null;let e=navigator;return e.languages&&e.languages[0]||e.language||null}()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(tC(this.app))return Promise.reject(n0(this));let t=e?e1(e):null;return t&&n2(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&n2(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return tC(this.app)?Promise.reject(n0(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return tC(this.app)?Promise.reject(n0(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(rx(e))})}_getRecaptchaConfig(){return null==this.tenantId?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();let t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return null===this.tenantId?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){let e=new rG(await rK(this));null===this.tenantId?this._projectPasswordPolicy=e:this._tenantPasswordPolicies[this.tenantId]=e}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new ez("auth","Firebase",e())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{let n=this.onAuthStateChanged(()=>{n(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){let t={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:await this.currentUser.getIdToken()};null!=this.tenantId&&(t.tenantId=this.tenantId),await rS(this,t)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:null===(e=this._currentUser)||void 0===e?void 0:e.toJSON()}}async _setRedirectUser(e,t){let n=await this.getOrInitRedirectPersistenceManager(t);return null===e?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){let t=e&&rx(e)||this._popupRedirectResolver;n2(t,this,"argument-error"),this.redirectPersistenceManager=await rP.create(this,[rx(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,n;return(this._isInitialized&&await this.queue(async()=>{}),(null===(t=this._currentUser)||void 0===t?void 0:t._redirectEventId)===e)?this._currentUser:(null===(n=this.redirectUser)||void 0===n?void 0:n._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);let n=null!==(t=null===(e=this.currentUser)||void 0===e?void 0:e.uid)&&void 0!==t?t:null;this.lastNotifiedUid!==n&&(this.lastNotifiedUid=n,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,n,r){if(this._deleted)return()=>{};let i="function"==typeof t?t:t.next.bind(t),s=!1,o=this._isInitialized?Promise.resolve():this._initializationPromise;if(n2(o,this,"internal-error"),o.then(()=>{s||i(this.currentUser)}),"function"==typeof t){let i=e.addObserver(t,n,r);return()=>{s=!0,i()}}{let n=e.addObserver(t);return()=>{s=!0,n()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return n2(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=rq(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;let t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);let n=await (null===(e=this.heartbeatServiceProvider.getImmediate({optional:!0}))||void 0===e?void 0:e.getHeartbeatsHeader());n&&(t["X-Firebase-Client"]=n);let r=await this._getAppCheckToken();return r&&(t["X-Firebase-AppCheck"]=r),t}async _getAppCheckToken(){var e;let t=await (null===(e=this.appCheckServiceProvider.getImmediate({optional:!0}))||void 0===e?void 0:e.getToken());return(null==t?void 0:t.error)&&function(e,...t){nX.logLevel<=g.WARN&&nX.warn(`Auth (${tO}): ${e}`,...t)}(`Error while retrieving App Check token: ${t.error}`),null==t?void 0:t.token}}class rX{constructor(e){this.auth=e,this.observer=null,this.addObserver=function(e,t){let n=new eQ(e,void 0);return n.subscribe.bind(n)}(e=>this.observer=e)}get next(){return n2(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let rY={async loadJS(){throw Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function rJ(e){return`__${e}${Math.floor(1e6*Math.random())}`}class rQ{constructor(){this.enterprise=new rZ}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class rZ{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const r0="NO_RECAPTCHA";class r1{constructor(e){this.type="recaptcha-enterprise",this.auth=e1(e)}async verify(e="verify",t=!1){async function n(e){if(!t){if(null==e.tenantId&&null!=e._agentRecaptchaConfig)return e._agentRecaptchaConfig.siteKey;if(null!=e.tenantId&&void 0!==e._tenantRecaptchaConfigs[e.tenantId])return e._tenantRecaptchaConfigs[e.tenantId].siteKey}return new Promise(async(t,n)=>{ru(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(r=>{if(void 0===r.recaptchaKey)n(Error("recaptcha Enterprise site key undefined"));else{let n=new rh(r);return null==e.tenantId?e._agentRecaptchaConfig=n:e._tenantRecaptchaConfigs[e.tenantId]=n,t(n.siteKey)}}).catch(e=>{n(e)})})}function r(t,n,r){let i=window.grecaptcha;rl(i)?i.enterprise.ready(()=>{i.enterprise.execute(t,{action:e}).then(e=>{n(e)}).catch(()=>{n(r0)})}):r(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new rQ().execute("siteKey",{action:"verify"}):new Promise((e,i)=>{n(this.auth).then(n=>{if(!t&&rl(window.grecaptcha))r(n,e,i);else{var s;if("undefined"==typeof window){i(Error("RecaptchaVerifier is only supported in browser"));return}let t=rY.recaptchaEnterpriseScript;0!==t.length&&(t+=n),(s=t,rY.loadJS(s)).then(()=>{r(n,e,i)}).catch(e=>{i(e)})}}).catch(e=>{i(e)})})}}async function r2(e,t,n,r=!1,i=!1){let s;let o=new r1(e);if(i)s=r0;else try{s=await o.verify(n)}catch(e){s=await o.verify(n,!0)}let a=Object.assign({},t);if("mfaSmsEnrollment"===n||"mfaSmsSignIn"===n){if("phoneEnrollmentInfo"in a){let e=a.phoneEnrollmentInfo.phoneNumber,t=a.phoneEnrollmentInfo.recaptchaToken;Object.assign(a,{phoneEnrollmentInfo:{phoneNumber:e,recaptchaToken:t,captchaResponse:s,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in a){let e=a.phoneSignInInfo.recaptchaToken;Object.assign(a,{phoneSignInInfo:{recaptchaToken:e,captchaResponse:s,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return a}return r?Object.assign(a,{captchaResp:s}):Object.assign(a,{captchaResponse:s}),Object.assign(a,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(a,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),a}async function r5(e,t,n,r,i){var s,o;if("EMAIL_PASSWORD_PROVIDER"===i){if(null===(s=e._getRecaptchaConfig())||void 0===s||!s.isProviderEnabled("EMAIL_PASSWORD_PROVIDER"))return r(e,t).catch(async i=>{if("auth/missing-recaptcha-token"!==i.code)return Promise.reject(i);{console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);let i=await r2(e,t,n,"getOobCode"===n);return r(e,i)}});{let i=await r2(e,t,n,"getOobCode"===n);return r(e,i)}}if("PHONE_PROVIDER"!==i)return Promise.reject(i+" provider is not supported.");if(null===(o=e._getRecaptchaConfig())||void 0===o?void 0:o.isProviderEnabled("PHONE_PROVIDER")){let i=await r2(e,t,n);return r(e,i).catch(async i=>{var s;if((null===(s=e._getRecaptchaConfig())||void 0===s?void 0:s.getProviderEnforcementState("PHONE_PROVIDER"))==="AUDIT"&&("auth/missing-recaptcha-token"===i.code||"auth/invalid-app-credential"===i.code)){console.log(`Failed to verify with reCAPTCHA Enterprise. Automatically triggering the reCAPTCHA v2 flow to complete the ${n} flow.`);let i=await r2(e,t,n,!1,!0);return r(e,i)}return Promise.reject(i)})}{let i=await r2(e,t,n,!1,!0);return r(e,i)}}async function r6(e){let t=e1(e),n=new rh(await ru(t,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}));null==t.tenantId?t._agentRecaptchaConfig=n:t._tenantRecaptchaConfigs[t.tenantId]=n,n.isAnyProviderEnabled()&&new r1(t).verify()}function r3(e){let t=e.indexOf(":");return t<0?"":e.substr(0,t+1)}function r4(e){if(!e)return null;let t=Number(e);return isNaN(t)?null:t}/**
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
 */class r8{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return n5("not implemented")}_getIdTokenResponse(e){return n5("not implemented")}_linkToIdToken(e,t){return n5("not implemented")}_getReauthenticationResolver(e){return n5("not implemented")}}async function r7(e,t){return rn(e,"POST","/v1/accounts:signUp",t)}/**
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
 */async function r9(e,t){return ri(e,"POST","/v1/accounts:signInWithPassword",rt(e,t))}/**
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
 */async function ie(e,t){return ri(e,"POST","/v1/accounts:signInWithEmailLink",rt(e,t))}async function it(e,t){return ri(e,"POST","/v1/accounts:signInWithEmailLink",rt(e,t))}/**
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
 */class ir extends r8{constructor(e,t,n,r=null){super("password",n),this._email=e,this._password=t,this._tenantId=r}static _fromEmailAndPassword(e,t){return new ir(e,t,"password")}static _fromEmailAndCode(e,t,n=null){return new ir(e,t,"emailLink",n)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){let t="string"==typeof e?JSON.parse(e):e;if((null==t?void 0:t.email)&&(null==t?void 0:t.password)){if("password"===t.signInMethod)return this._fromEmailAndPassword(t.email,t.password);if("emailLink"===t.signInMethod)return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":return r5(e,{returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"},"signInWithPassword",r9,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return ie(e,{email:this._email,oobCode:this._password});default:nJ(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":return r5(e,{idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",r7,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return it(e,{idToken:t,email:this._email,oobCode:this._password});default:nJ(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
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
 */async function ii(e,t){return ri(e,"POST","/v1/accounts:signInWithIdp",rt(e,t))}class is extends r8{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){let t=new is(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):nJ("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){let t="string"==typeof e?JSON.parse(e):e,{providerId:n,signInMethod:r}=t,i=nK(t,["providerId","signInMethod"]);if(!n||!r)return null;let s=new is(n,r);return s.idToken=i.idToken||void 0,s.accessToken=i.accessToken||void 0,s.secret=i.secret,s.nonce=i.nonce,s.pendingToken=i.pendingToken||null,s}_getIdTokenResponse(e){return ii(e,this.buildRequest())}_linkToIdToken(e,t){let n=this.buildRequest();return n.idToken=t,ii(e,n)}_getReauthenticationResolver(e){let t=this.buildRequest();return t.autoCreate=!1,ii(e,t)}buildRequest(){let e={requestUri:"http://localhost",returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{let t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=eX(t)}return e}}/**
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
 */async function io(e,t){return rn(e,"POST","/v1/accounts:sendVerificationCode",rt(e,t))}async function ia(e,t){return ri(e,"POST","/v1/accounts:signInWithPhoneNumber",rt(e,t))}async function il(e,t){let n=await ri(e,"POST","/v1/accounts:signInWithPhoneNumber",rt(e,t));if(n.temporaryProof)throw ra(e,"account-exists-with-different-credential",n);return n}const ih={USER_NOT_FOUND:"user-not-found"};async function iu(e,t){return ri(e,"POST","/v1/accounts:signInWithPhoneNumber",rt(e,Object.assign(Object.assign({},t),{operation:"REAUTH"})),ih)}/**
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
 */class ic extends r8{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new ic({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new ic({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return ia(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return il(e,Object.assign({idToken:t},this._makeVerificationRequest()))}_getReauthenticationResolver(e){return iu(e,this._makeVerificationRequest())}_makeVerificationRequest(){let{temporaryProof:e,phoneNumber:t,verificationId:n,verificationCode:r}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:n,code:r}}toJSON(){let e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){"string"==typeof e&&(e=JSON.parse(e));let{verificationId:t,verificationCode:n,phoneNumber:r,temporaryProof:i}=e;return n||t||r||i?new ic({verificationId:t,verificationCode:n,phoneNumber:r,temporaryProof:i}):null}}class id{constructor(e){var t,n,r,i,s,o;let a=eY(eJ(e)),l=null!==(t=a.apiKey)&&void 0!==t?t:null,h=null!==(n=a.oobCode)&&void 0!==n?n:null,u=/**
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
 */function(e){switch(e){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}(null!==(r=a.mode)&&void 0!==r?r:null);n2(l&&h&&u,"argument-error"),this.apiKey=l,this.operation=u,this.code=h,this.continueUrl=null!==(i=a.continueUrl)&&void 0!==i?i:null,this.languageCode=null!==(s=a.languageCode)&&void 0!==s?s:null,this.tenantId=null!==(o=a.tenantId)&&void 0!==o?o:null}static parseLink(e){let t=function(e){let t=eY(eJ(e)).link,n=t?eY(eJ(t)).deep_link_id:null,r=eY(eJ(e)).deep_link_id;return(r?eY(eJ(r)).link:null)||r||n||t||e}(e);try{return new id(t)}catch(e){return null}}}/**
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
 */class ip{constructor(){this.providerId=ip.PROVIDER_ID}static credential(e,t){return ir._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){let n=id.parseLink(t);return n2(n,"argument-error"),ir._fromEmailAndCode(e,n.code,n.tenantId)}}ip.PROVIDER_ID="password",ip.EMAIL_PASSWORD_SIGN_IN_METHOD="password",ip.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
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
 */class ig{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class im extends ig{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class iy extends im{constructor(){super("facebook.com")}static credential(e){return is._fromParams({providerId:iy.PROVIDER_ID,signInMethod:iy.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return iy.credentialFromTaggedObject(e)}static credentialFromError(e){return iy.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return iy.credential(e.oauthAccessToken)}catch(e){return null}}}iy.FACEBOOK_SIGN_IN_METHOD="facebook.com",iy.PROVIDER_ID="facebook.com";/**
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
 */class iv extends im{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return is._fromParams({providerId:iv.PROVIDER_ID,signInMethod:iv.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return iv.credentialFromTaggedObject(e)}static credentialFromError(e){return iv.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthIdToken:t,oauthAccessToken:n}=e;if(!t&&!n)return null;try{return iv.credential(t,n)}catch(e){return null}}}iv.GOOGLE_SIGN_IN_METHOD="google.com",iv.PROVIDER_ID="google.com";/**
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
 */class iw extends im{constructor(){super("github.com")}static credential(e){return is._fromParams({providerId:iw.PROVIDER_ID,signInMethod:iw.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return iw.credentialFromTaggedObject(e)}static credentialFromError(e){return iw.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return iw.credential(e.oauthAccessToken)}catch(e){return null}}}iw.GITHUB_SIGN_IN_METHOD="github.com",iw.PROVIDER_ID="github.com";/**
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
 */class iE extends im{constructor(){super("twitter.com")}static credential(e,t){return is._fromParams({providerId:iE.PROVIDER_ID,signInMethod:iE.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return iE.credentialFromTaggedObject(e)}static credentialFromError(e){return iE.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthAccessToken:t,oauthTokenSecret:n}=e;if(!t||!n)return null;try{return iE.credential(t,n)}catch(e){return null}}}iE.TWITTER_SIGN_IN_METHOD="twitter.com",iE.PROVIDER_ID="twitter.com";/**
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
 */class ib{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,n,r=!1){return new ib({user:await rC._fromIdTokenResponse(e,n,r),providerId:iI(n),_tokenResponse:n,operationType:t})}static async _forOperation(e,t,n){return await e._updateTokensIfNecessary(n,!0),new ib({user:e,providerId:iI(n),_tokenResponse:n,operationType:t})}}function iI(e){return e.providerId?e.providerId:"phoneNumber"in e?"phone":null}/**
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
 */class i_ extends eq{constructor(e,t,n,r){var i;super(t.code,t.message),this.operationType=n,this.user=r,Object.setPrototypeOf(this,i_.prototype),this.customData={appName:e.name,tenantId:null!==(i=e.tenantId)&&void 0!==i?i:void 0,_serverResponse:t.customData._serverResponse,operationType:n}}static _fromErrorAndOperation(e,t,n,r){return new i_(e,t,n,r)}}function iT(e,t,n,r){return("reauthenticate"===t?n._getReauthenticationResolver(e):n._getIdTokenResponse(e)).catch(n=>{if("auth/multi-factor-auth-required"===n.code)throw i_._fromErrorAndOperation(e,n,t,r);throw n})}async function iS(e,t,n=!1){let r=await rv(e,t._linkToIdToken(e.auth,await e.getIdToken()),n);return ib._forOperation(e,"link",r)}/**
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
 */async function iA(e,t,n=!1){let{auth:r}=e;if(tC(r.app))return Promise.reject(n0(r));let i="reauthenticate";try{let s=await rv(e,iT(r,i,t,e),n);n2(s.idToken,r,"internal-error");let o=rm(s.idToken);n2(o,r,"internal-error");let{sub:a}=o;return n2(e.uid===a,r,"user-mismatch"),ib._forOperation(e,i,s)}catch(e){throw(null==e?void 0:e.code)==="auth/user-not-found"&&nJ(r,"user-mismatch"),e}}/**
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
 */async function ik(e,t,n=!1){if(tC(e.app))return Promise.reject(n0(e));let r="signIn",i=await iT(e,r,t),s=await ib._fromIdTokenResponse(e,r,i);return n||await e._updateCurrentUser(s.user),s}/**
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
 */function iC(e,t){return rn(e,"POST","/v2/accounts/mfaEnrollment:start",rt(e,t))}new WeakMap;const iR="__sak";/**
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
 */class ix{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{if(!this.storage)return Promise.resolve(!1);return this.storage.setItem(iR,"1"),this.storage.removeItem(iR),Promise.resolve(!0)}catch(e){return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){let t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}class iO extends ix{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=rH(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(let t of Object.keys(this.listeners)){let n=this.storage.getItem(t),r=this.localCache[t];n!==r&&e(t,r,n)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((e,t,n)=>{this.notifyListeners(e,n)});return}let n=e.key;t?this.detachListener():this.stopPolling();let r=()=>{let e=this.storage.getItem(n);(t||this.localCache[n]!==e)&&this.notifyListeners(n,e)},i=this.storage.getItem(n);(function(){let e=eB();return e.indexOf("MSIE ")>=0||e.indexOf("Trident/")>=0})()&&10===document.documentMode&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,10):r()}notifyListeners(e,t){this.localCache[e]=t;let n=this.listeners[e];if(n)for(let e of Array.from(n))e(t?JSON.parse(t):t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:n}),!0)})},1e3)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){0===Object.keys(this.listeners).length&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){let t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}iO.type="LOCAL";/**
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
 */class iN extends ix{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}iN.type="SESSION";/**
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
 */class iP{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){let t=this.receivers.find(t=>t.isListeningto(e));if(t)return t;let n=new iP(e);return this.receivers.push(n),n}isListeningto(e){return this.eventTarget===e}async handleEvent(e){let{eventId:t,eventType:n,data:r}=e.data,i=this.handlersMap[n];if(!(null==i?void 0:i.size))return;e.ports[0].postMessage({status:"ack",eventId:t,eventType:n});let s=Array.from(i).map(async t=>t(e.origin,r)),o=await Promise.all(s.map(async e=>{try{let t=await e;return{fulfilled:!0,value:t}}catch(e){return{fulfilled:!1,reason:e}}}));e.ports[0].postMessage({status:"done",eventId:t,eventType:n,response:o})}_subscribe(e,t){0===Object.keys(this.handlersMap).length&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),t&&0!==this.handlersMap[e].size||delete this.handlersMap[e],0===Object.keys(this.handlersMap).length&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}/**
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
 */function iD(e="",t=10){let n="";for(let e=0;e<t;e++)n+=Math.floor(10*Math.random());return e+n}iP.receivers=[];/**
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
 */class iL{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,n=50){let r,i;let s="undefined"!=typeof MessageChannel?new MessageChannel:null;if(!s)throw Error("connection_unavailable");return new Promise((o,a)=>{let l=iD("",20);s.port1.start();let h=setTimeout(()=>{a(Error("unsupported_event"))},n);i={messageChannel:s,onMessage(e){if(e.data.eventId===l)switch(e.data.status){case"ack":clearTimeout(h),r=setTimeout(()=>{a(Error("timeout"))},3e3);break;case"done":clearTimeout(r),o(e.data.response);break;default:clearTimeout(h),clearTimeout(r),a(Error("invalid_response"))}}},this.handlers.add(i),s.port1.addEventListener("message",i.onMessage),this.target.postMessage({eventType:e,eventId:l,data:t},[s.port2])}).finally(()=>{i&&this.removeMessageHandler(i)})}}/**
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
 */function iM(){return window}/**
 * @license
 * Copyright 2020 Google LLC.
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
 */function iU(){return void 0!==iM().WorkerGlobalScope&&"function"==typeof iM().importScripts}async function iF(){if(!(null==navigator?void 0:navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch(e){return null}}/**
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
 */const iV="firebaseLocalStorageDb",iB="firebaseLocalStorage",ij="fbase_key";class i${constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function iH(e,t){return e.transaction([iB],t?"readwrite":"readonly").objectStore(iB)}function iq(){let e=indexedDB.open(iV,1);return new Promise((t,n)=>{e.addEventListener("error",()=>{n(e.error)}),e.addEventListener("upgradeneeded",()=>{let t=e.result;try{t.createObjectStore(iB,{keyPath:ij})}catch(e){n(e)}}),e.addEventListener("success",async()=>{let n=e.result;n.objectStoreNames.contains(iB)?t(n):(n.close(),await new i$(indexedDB.deleteDatabase(iV)).toPromise(),t(await iq()))})})}async function iz(e,t,n){return new i$(iH(e,!0).put({[ij]:t,value:n})).toPromise()}async function iK(e,t){let n=iH(e,!1).get(t),r=await new i$(n).toPromise();return void 0===r?null:r.value}function iG(e,t){return new i$(iH(e,!0).delete(t)).toPromise()}class iW{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db||(this.db=await iq()),this.db}async _withRetries(e){let t=0;for(;;)try{let t=await this._openDb();return await e(t)}catch(e){if(t++>3)throw e;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return iU()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=iP._getInstance(iU()?self:null),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await iF(),!this.activeServiceWorker)return;this.sender=new iL(this.activeServiceWorker);let n=await this.sender._send("ping",{},800);n&&(null===(e=n[0])||void 0===e?void 0:e.fulfilled)&&(null===(t=n[0])||void 0===t?void 0:t.value.includes("keyChanged"))&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){var t;if(this.sender&&this.activeServiceWorker&&((null===(t=null==navigator?void 0:navigator.serviceWorker)||void 0===t?void 0:t.controller)||null)===this.activeServiceWorker)try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch(e){}}async _isAvailable(){try{if(!indexedDB)return!1;let e=await iq();return await iz(e,iR,"1"),await iG(e,iR),!0}catch(e){}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(n=>iz(n,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){let t=await this._withRetries(t=>iK(t,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>iG(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){let e=await this._withRetries(e=>new i$(iH(e,!1).getAll()).toPromise());if(!e||0!==this.pendingWrites)return[];let t=[],n=new Set;if(0!==e.length)for(let{fbase_key:r,value:i}of e)n.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(i)&&(this.notifyListeners(r,i),t.push(r));for(let e of Object.keys(this.localCache))this.localCache[e]&&!n.has(e)&&(this.notifyListeners(e,null),t.push(e));return t}notifyListeners(e,t){this.localCache[e]=t;let n=this.listeners[e];if(n)for(let e of Array.from(n))e(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),800)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){0===Object.keys(this.listeners).length&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&this.stopPolling()}}/**
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
 */function iX(e,t){return rn(e,"POST","/v2/accounts/mfaSignIn:start",rt(e,t))}iW.type="LOCAL",rJ("rcb"),new n4(3e4,6e4);/**
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
 */const iY="recaptcha";async function iJ(e,t,n){var r;if(!e._getRecaptchaConfig())try{await r6(e)}catch(e){console.log("Failed to initialize reCAPTCHA Enterprise config. Triggering the reCAPTCHA v2 verification.")}try{let i;if(i="string"==typeof t?{phoneNumber:t}:t,"session"in i){let t=i.session;if("phoneNumber"in i){n2("enroll"===t.type,e,"internal-error");let r={idToken:t.credential,phoneEnrollmentInfo:{phoneNumber:i.phoneNumber,clientType:"CLIENT_TYPE_WEB"}},s=async(e,t)=>{if(t.phoneEnrollmentInfo.captchaResponse===r0){n2((null==n?void 0:n.type)===iY,e,"argument-error");let r=await iQ(e,t,n);return iC(e,r)}return iC(e,t)},o=r5(e,r,"mfaSmsEnrollment",s,"PHONE_PROVIDER");return(await o.catch(e=>Promise.reject(e))).phoneSessionInfo.sessionInfo}{n2("signin"===t.type,e,"internal-error");let s=(null===(r=i.multiFactorHint)||void 0===r?void 0:r.uid)||i.multiFactorUid;n2(s,e,"missing-multi-factor-info");let o={mfaPendingCredential:t.credential,mfaEnrollmentId:s,phoneSignInInfo:{clientType:"CLIENT_TYPE_WEB"}},a=async(e,t)=>{if(t.phoneSignInInfo.captchaResponse===r0){n2((null==n?void 0:n.type)===iY,e,"argument-error");let r=await iQ(e,t,n);return iX(e,r)}return iX(e,t)},l=r5(e,o,"mfaSmsSignIn",a,"PHONE_PROVIDER");return(await l.catch(e=>Promise.reject(e))).phoneResponseInfo.sessionInfo}}{let t={phoneNumber:i.phoneNumber,clientType:"CLIENT_TYPE_WEB"},r=async(e,t)=>{if(t.captchaResponse===r0){n2((null==n?void 0:n.type)===iY,e,"argument-error");let r=await iQ(e,t,n);return io(e,r)}return io(e,t)},s=r5(e,t,"sendVerificationCode",r,"PHONE_PROVIDER");return(await s.catch(e=>Promise.reject(e))).sessionInfo}}finally{null==n||n._reset()}}async function iQ(e,t,n){n2(n.type===iY,e,"argument-error");let r=await n.verify();n2("string"==typeof r,e,"argument-error");let i=Object.assign({},t);if("phoneEnrollmentInfo"in i){let e=i.phoneEnrollmentInfo.phoneNumber,t=i.phoneEnrollmentInfo.captchaResponse,n=i.phoneEnrollmentInfo.clientType,s=i.phoneEnrollmentInfo.recaptchaVersion;return Object.assign(i,{phoneEnrollmentInfo:{phoneNumber:e,recaptchaToken:r,captchaResponse:t,clientType:n,recaptchaVersion:s}}),i}if(!("phoneSignInInfo"in i))return Object.assign(i,{recaptchaToken:r}),i;{let e=i.phoneSignInInfo.captchaResponse,t=i.phoneSignInInfo.clientType,n=i.phoneSignInInfo.recaptchaVersion;return Object.assign(i,{phoneSignInInfo:{recaptchaToken:r,captchaResponse:e,clientType:t,recaptchaVersion:n}}),i}}/**
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
 */class iZ{constructor(e){this.providerId=iZ.PROVIDER_ID,this.auth=e1(e)}verifyPhoneNumber(e,t){return iJ(this.auth,e,e1(t))}static credential(e,t){return ic._fromVerification(e,t)}static credentialFromResult(e){return iZ.credentialFromTaggedObject(e)}static credentialFromError(e){return iZ.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{phoneNumber:t,temporaryProof:n}=e;return t&&n?ic._fromTokenResponse(t,n):null}}iZ.PROVIDER_ID="phone",iZ.PHONE_SIGN_IN_METHOD="phone";/**
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
 */class i0 extends r8{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return ii(e,this._buildIdpRequest())}_linkToIdToken(e,t){return ii(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return ii(e,this._buildIdpRequest())}_buildIdpRequest(e){let t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function i1(e){return ik(e.auth,new i0(e),e.bypassAuthState)}function i2(e){let{auth:t,user:n}=e;return n2(n,t,"internal-error"),iA(n,new i0(e),e.bypassAuthState)}async function i5(e){let{auth:t,user:n}=e;return n2(n,t,"internal-error"),iS(n,new i0(e),e.bypassAuthState)}/**
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
 */class i6{constructor(e,t,n,r,i=!1){this.auth=e,this.resolver=n,this.user=r,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(e){this.reject(e)}})}async onAuthEvent(e){let{urlResponse:t,sessionId:n,postBody:r,tenantId:i,error:s,type:o}=e;if(s){this.reject(s);return}let a={auth:this.auth,requestUri:t,sessionId:n,tenantId:i||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(o)(a))}catch(e){this.reject(e)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return i1;case"linkViaPopup":case"linkViaRedirect":return i5;case"reauthViaPopup":case"reauthViaRedirect":return i2;default:nJ(this.auth,"internal-error")}}resolve(e){var t,n;t=this.pendingPromise,n="Pending promise was never set",t||n5(n),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){var t,n;t=this.pendingPromise,n="Pending promise was never set",t||n5(n),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const i3=new n4(2e3,1e4);class i4 extends i6{constructor(e,t,n,r,i){super(e,t,r,i),this.provider=n,this.authWindow=null,this.pollId=null,i4.currentPopupAction&&i4.currentPopupAction.cancel(),i4.currentPopupAction=this}async executeNotNull(){let e=await this.execute();return n2(e,this.auth,"internal-error"),e}async onExecution(){var e,t;e=1===this.filter.length,t="Popup operations only handle one event",e||n5(t);let n=iD();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],n),this.authWindow.associatedEvent=n,this.resolver._originValidation(this.auth).catch(e=>{this.reject(e)}),this.resolver._isIframeWebStorageSupported(this.auth,e=>{e||this.reject(nQ(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return(null===(e=this.authWindow)||void 0===e?void 0:e.associatedEvent)||null}cancel(){this.reject(nQ(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,i4.currentPopupAction=null}pollUserCancellation(){let e=()=>{var t,n;if(null===(n=null===(t=this.authWindow)||void 0===t?void 0:t.window)||void 0===n?void 0:n.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(nQ(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,i3.get())};e()}}i4.currentPopupAction=null;const i8=new Map;class i7 extends i6{constructor(e,t,n=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,n),this.eventId=null}async execute(){let e=i8.get(this.auth._key());if(!e){try{let t=await i9(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(t)}catch(t){e=()=>Promise.reject(t)}i8.set(this.auth._key(),e)}return this.bypassAuthState||i8.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if("signInViaRedirect"===e.type)return super.onAuthEvent(e);if("unknown"===e.type){this.resolve(null);return}if(e.eventId){let t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function i9(e,t){let n=rN("pendingRedirect",t.config.apiKey,t.name),r=rx(e._redirectPersistence);if(!await r._isAvailable())return!1;let i=await r._get(n)==="true";return await r._remove(n),i}function se(e,t){i8.set(e._key(),t)}async function st(e,t,n=!1){if(tC(e.app))return Promise.reject(n0(e));let r=e1(e),i=t?rx(t):(n2(r._popupRedirectResolver,r,"argument-error"),r._popupRedirectResolver),s=new i7(r,i,n),o=await s.execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,t)),o}class sn{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(n=>{this.isEventForConsumer(e,n)&&(t=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!function(e){switch(e.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return si(e);default:return!1}}(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var n;if(e.error&&!si(e)){let r=(null===(n=e.error.code)||void 0===n?void 0:n.split("auth/")[1])||"internal-error";t.onError(nQ(this.auth,r))}else t.onAuthEvent(e)}isEventForConsumer(e,t){let n=null===t.eventId||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=6e5&&this.cachedEventUids.clear(),this.cachedEventUids.has(sr(e))}saveEventToCache(e){this.cachedEventUids.add(sr(e)),this.lastProcessedEventTime=Date.now()}}function sr(e){return[e.type,e.eventId,e.sessionId,e.tenantId].filter(e=>e).join("-")}function si({type:e,error:t}){return"unknown"===e&&(null==t?void 0:t.code)==="auth/no-auth-event"}/**
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
 */async function ss(e,t={}){return rn(e,"GET","/v1/projects",t)}/**
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
 */const so=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,sa=/^https?/;async function sl(e){if(e.config.emulator)return;let{authorizedDomains:t}=await ss(e);for(let e of t)try{if(function(e){let t=n6(),{protocol:n,hostname:r}=new URL(t);if(e.startsWith("chrome-extension://")){let i=new URL(e);return""===i.hostname&&""===r?"chrome-extension:"===n&&e.replace("chrome-extension://","")===t.replace("chrome-extension://",""):"chrome-extension:"===n&&i.hostname===r}if(!sa.test(n))return!1;if(so.test(e))return r===e;let i=e.replace(/\./g,"\\.");return RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}(e))return}catch(e){}nJ(e,"unauthorized-domain")}/**
 * @license
 * Copyright 2020 Google LLC.
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
 */const sh=new n4(3e4,6e4);function su(){let e=iM().___jsl;if(null==e?void 0:e.H){for(let t of Object.keys(e.H))if(e.H[t].r=e.H[t].r||[],e.H[t].L=e.H[t].L||[],e.H[t].r=[...e.H[t].L],e.CP)for(let t=0;t<e.CP.length;t++)e.CP[t]=null}}let sc=null;/**
 * @license
 * Copyright 2020 Google LLC.
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
 */const sf=new n4(5e3,15e3),sd={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},sp=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);async function sg(e){let t=await (sc=sc||new Promise((t,n)=>{var r,i,s,o;function a(){su(),gapi.load("gapi.iframes",{callback:()=>{t(gapi.iframes.getContext())},ontimeout:()=>{su(),n(nQ(e,"network-request-failed"))},timeout:sh.get()})}if(null===(i=null===(r=iM().gapi)||void 0===r?void 0:r.iframes)||void 0===i?void 0:i.Iframe)t(gapi.iframes.getContext());else if(null===(s=iM().gapi)||void 0===s?void 0:s.load)a();else{let t=rJ("iframefcb");return iM()[t]=()=>{gapi.load?a():n(nQ(e,"network-request-failed"))},(o=`${rY.gapiScript}?onload=${t}`,rY.loadJS(o)).catch(e=>n(e))}}).catch(e=>{throw sc=null,e})),n=iM().gapi;return n2(n,e,"internal-error"),t.open({where:document.body,url:function(e){let t=e.config;n2(t.authDomain,e,"auth-domain-config-required");let n=t.emulator?n8(t,"emulator/auth/iframe"):`https://${e.config.authDomain}/__/auth/iframe`,r={apiKey:t.apiKey,appName:e.name,v:tO},i=sp.get(e.config.apiHost);i&&(r.eid=i);let s=e._getFrameworks();return s.length&&(r.fw=s.join(",")),`${n}?${eX(r).slice(1)}`}(e),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:sd,dontclear:!0},t=>new Promise(async(n,r)=>{await t.restyle({setHideOnLeave:!1});let i=nQ(e,"network-request-failed"),s=iM().setTimeout(()=>{r(i)},sf.get());function o(){iM().clearTimeout(s),n(t)}t.ping(o).then(o,()=>{r(i)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
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
 */const sm={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"};class sy{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch(e){}}}const sv=encodeURIComponent("fac");async function sw(e,t,n,r,i,s){n2(e.config.authDomain,e,"auth-domain-config-required"),n2(e.config.apiKey,e,"invalid-api-key");let o={apiKey:e.config.apiKey,appName:e.name,authType:n,redirectUrl:r,v:tO,eventId:i};if(t instanceof ig)for(let[n,r]of(t.setDefaultLanguage(e.languageCode),o.providerId=t.providerId||"",!function(e){for(let t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}(t.getCustomParameters())&&(o.customParameters=JSON.stringify(t.getCustomParameters())),Object.entries(s||{})))o[n]=r;if(t instanceof im){let e=t.getScopes().filter(e=>""!==e);e.length>0&&(o.scopes=e.join(","))}for(let t of(e.tenantId&&(o.tid=e.tenantId),Object.keys(o)))void 0===o[t]&&delete o[t];let a=await e._getAppCheckToken(),l=a?`#${sv}=${encodeURIComponent(a)}`:"";return`${function({config:e}){return e.emulator?n8(e,"emulator/auth/handler"):`https://${e.authDomain}/__/auth/handler`}(e)}?${eX(o).slice(1)}${l}`}/**
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
 */const sE="webStorageSupport",sb=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=iN,this._completeRedirectFn=st,this._overrideRedirectResult=se}async _openPopup(e,t,n,r){var i,s,o;s=null===(i=this.eventManagers[e._key()])||void 0===i?void 0:i.manager,o="_initialize() not called before _openPopup()",s||n5(o);let a=await sw(e,t,n,n6(),r);return function(e,t,n,r=500,i=600){let s=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString(),a="",l=Object.assign(Object.assign({},sm),{width:r.toString(),height:i.toString(),top:s,left:o}),h=eB().toLowerCase();n&&(a=rU(h)?"_blank":n),rL(h)&&(t=t||"http://localhost",l.scrollbars="yes");let u=Object.entries(l).reduce((e,[t,n])=>`${e}${t}=${n},`,"");if(function(e=eB()){var t;return r$(e)&&!!(null===(t=window.navigator)||void 0===t?void 0:t.standalone)}(h)&&"_self"!==a)return function(e,t){let n=document.createElement("a");n.href=e,n.target=t;let r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}(t||"",a),new sy(null);let c=window.open(t||"",a,u);n2(c,e,"popup-blocked");try{c.focus()}catch(e){}return new sy(c)}(e,a,iD())}async _openRedirect(e,t,n,r){var i;return await this._originValidation(e),i=await sw(e,t,n,n6(),r),iM().location.href=i,new Promise(()=>{})}_initialize(e){let t=e._key();if(this.eventManagers[t]){var n;let{manager:e,promise:r}=this.eventManagers[t];return e?Promise.resolve(e):(n="If manager is not set, promise should be",r||n5(n),r)}let r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){let t=await sg(e),n=new sn(e);return t.register("authEvent",t=>(n2(null==t?void 0:t.authEvent,e,"invalid-auth-event"),{status:n.onEvent(t.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,n}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(sE,{type:sE},n=>{var r;let i=null===(r=null==n?void 0:n[0])||void 0===r?void 0:r[sE];void 0!==i&&t(!!i),nJ(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){let t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=sl(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return rH()||rM()||r$()}};class sI{constructor(e){this.factorId=e}_process(e,t,n){switch(t.type){case"enroll":return this._finalizeEnroll(e,t.credential,n);case"signin":return this._finalizeSignIn(e,t.credential);default:return n5("unexpected MultiFactorSessionType")}}}class s_ extends sI{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new s_(e)}_finalizeEnroll(e,t,n){return rn(e,"POST","/v2/accounts/mfaEnrollment:finalize",rt(e,{idToken:t,displayName:n,phoneVerificationInfo:this.credential._makeVerificationRequest()}))}_finalizeSignIn(e,t){return rn(e,"POST","/v2/accounts/mfaSignIn:finalize",rt(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()}))}}class sT extends sI{constructor(e,t,n){super("totp"),this.otp=e,this.enrollmentId=t,this.secret=n}static _fromSecret(e,t){return new sT(t,void 0,e)}static _fromEnrollmentId(e,t){return new sT(t,e)}async _finalizeEnroll(e,t,n){return n2(void 0!==this.secret,e,"argument-error"),rn(e,"POST","/v2/accounts/mfaEnrollment:finalize",rt(e,{idToken:t,displayName:n,totpVerificationInfo:this.secret._makeTotpVerificationInfo(this.otp)}))}async _finalizeSignIn(e,t){n2(void 0!==this.enrollmentId&&void 0!==this.otp,e,"argument-error");let n={verificationCode:this.otp};return rn(e,"POST","/v2/accounts/mfaSignIn:finalize",rt(e,{mfaPendingCredential:t,mfaEnrollmentId:this.enrollmentId,totpVerificationInfo:n}))}}class sS{constructor(e,t,n,r,i,s,o){this.sessionInfo=s,this.auth=o,this.secretKey=e,this.hashingAlgorithm=t,this.codeLength=n,this.codeIntervalSeconds=r,this.enrollmentCompletionDeadline=i}static _fromStartTotpMfaEnrollmentResponse(e,t){return new sS(e.totpSessionInfo.sharedSecretKey,e.totpSessionInfo.hashingAlgorithm,e.totpSessionInfo.verificationCodeLength,e.totpSessionInfo.periodSec,new Date(e.totpSessionInfo.finalizeEnrollmentTime).toUTCString(),e.totpSessionInfo.sessionInfo,t)}_makeTotpVerificationInfo(e){return{sessionInfo:this.sessionInfo,verificationCode:e}}generateQrCodeUrl(e,t){var n;let r=!1;return(sA(e)||sA(t))&&(r=!0),r&&(sA(e)&&(e=(null===(n=this.auth.currentUser)||void 0===n?void 0:n.email)||"unknownuser"),sA(t)&&(t=this.auth.name)),`otpauth://totp/${t}:${e}?secret=${this.secretKey}&issuer=${t}&algorithm=${this.hashingAlgorithm}&digits=${this.codeLength}`}}function sA(e){return void 0===e||(null==e?void 0:e.length)===0}var sk="@firebase/auth",sC="1.8.0";/**
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
 */class sR{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),(null===(e=this.auth.currentUser)||void 0===e?void 0:e.uid)||null}async getToken(e){return(this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser)?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;let t=this.auth.onIdTokenChanged(t=>{e((null==t?void 0:t.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();let t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){n2(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}const sx=eU("authIdTokenMaxAge")||300;let sO=null;const sN=e=>async t=>{let n=t&&await t.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>sx)return;let i=null==n?void 0:n.token;sO!==i&&(sO=i,await fetch(e,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};rY={loadJS:e=>new Promise((t,n)=>{var r,i;let s=document.createElement("script");s.setAttribute("src",e),s.onload=t,s.onerror=e=>{let t=nQ("internal-error");t.customData=e,n(t)},s.type="text/javascript",s.charset="UTF-8",(null!==(i=null===(r=document.getElementsByTagName("head"))||void 0===r?void 0:r[0])&&void 0!==i?i:document).appendChild(s)}),gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="},h="Browser",tA(new e2("auth",(e,{options:t})=>{let n=e.getProvider("app").getImmediate(),r=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:s,authDomain:o}=n.options;n2(s&&!s.includes(":"),"invalid-api-key",{appName:n.name});let a=new rW(n,r,i,{apiKey:s,authDomain:o,clientPlatform:h,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:rq(h)});return function(e,t){let n=(null==t?void 0:t.persistence)||[],r=(Array.isArray(n)?n:[n]).map(rx);(null==t?void 0:t.errorMap)&&e._updateErrorMap(t.errorMap),e._initializeWithPersistence(r,null==t?void 0:t.popupRedirectResolver)}(a,t),a},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,n)=>{e.getProvider("auth-internal").initialize()})),tA(new e2("auth-internal",e=>new sR(e1(e.getProvider("auth").getImmediate())),"PRIVATE").setInstantiationMode("EXPLICIT")),tD(sk,sC,/**
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
 */function(e){switch(e){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}(h)),tD(sk,sC,"esm2017");var sP="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:void 0!==L?L:"undefined"!=typeof self?self:{},sD={};(function(){function e(){this.blockSize=-1,this.blockSize=64,this.g=[,,,,],this.B=Array(this.blockSize),this.o=this.h=0,this.s()}function t(e,t,n){n||(n=0);var r=Array(16);if("string"==typeof t)for(var i=0;16>i;++i)r[i]=t.charCodeAt(n++)|t.charCodeAt(n++)<<8|t.charCodeAt(n++)<<16|t.charCodeAt(n++)<<24;else for(i=0;16>i;++i)r[i]=t[n++]|t[n++]<<8|t[n++]<<16|t[n++]<<24;t=e.g[0],n=e.g[1],i=e.g[2];var s=e.g[3],o=t+(s^n&(i^s))+r[0]+0xd76aa478&0xffffffff;o=s+(i^(t=n+(o<<7&0xffffffff|o>>>25))&(n^i))+r[1]+0xe8c7b756&0xffffffff,o=i+(n^(s=t+(o<<12&0xffffffff|o>>>20))&(t^n))+r[2]+0x242070db&0xffffffff,o=n+(t^(i=s+(o<<17&0xffffffff|o>>>15))&(s^t))+r[3]+0xc1bdceee&0xffffffff,o=t+(s^(n=i+(o<<22&0xffffffff|o>>>10))&(i^s))+r[4]+0xf57c0faf&0xffffffff,o=s+(i^(t=n+(o<<7&0xffffffff|o>>>25))&(n^i))+r[5]+0x4787c62a&0xffffffff,o=i+(n^(s=t+(o<<12&0xffffffff|o>>>20))&(t^n))+r[6]+0xa8304613&0xffffffff,o=n+(t^(i=s+(o<<17&0xffffffff|o>>>15))&(s^t))+r[7]+0xfd469501&0xffffffff,o=t+(s^(n=i+(o<<22&0xffffffff|o>>>10))&(i^s))+r[8]+0x698098d8&0xffffffff,o=s+(i^(t=n+(o<<7&0xffffffff|o>>>25))&(n^i))+r[9]+0x8b44f7af&0xffffffff,o=i+(n^(s=t+(o<<12&0xffffffff|o>>>20))&(t^n))+r[10]+0xffff5bb1&0xffffffff,o=n+(t^(i=s+(o<<17&0xffffffff|o>>>15))&(s^t))+r[11]+0x895cd7be&0xffffffff,o=t+(s^(n=i+(o<<22&0xffffffff|o>>>10))&(i^s))+r[12]+0x6b901122&0xffffffff,o=s+(i^(t=n+(o<<7&0xffffffff|o>>>25))&(n^i))+r[13]+0xfd987193&0xffffffff,o=i+(n^(s=t+(o<<12&0xffffffff|o>>>20))&(t^n))+r[14]+0xa679438e&0xffffffff,o=n+(t^(i=s+(o<<17&0xffffffff|o>>>15))&(s^t))+r[15]+0x49b40821&0xffffffff,n=i+(o<<22&0xffffffff|o>>>10),o=t+(i^s&(n^i))+r[1]+0xf61e2562&0xffffffff,t=n+(o<<5&0xffffffff|o>>>27),o=s+(n^i&(t^n))+r[6]+0xc040b340&0xffffffff,s=t+(o<<9&0xffffffff|o>>>23),o=i+(t^n&(s^t))+r[11]+0x265e5a51&0xffffffff,i=s+(o<<14&0xffffffff|o>>>18),o=n+(s^t&(i^s))+r[0]+0xe9b6c7aa&0xffffffff,n=i+(o<<20&0xffffffff|o>>>12),o=t+(i^s&(n^i))+r[5]+0xd62f105d&0xffffffff,t=n+(o<<5&0xffffffff|o>>>27),o=s+(n^i&(t^n))+r[10]+0x2441453&0xffffffff,s=t+(o<<9&0xffffffff|o>>>23),o=i+(t^n&(s^t))+r[15]+0xd8a1e681&0xffffffff,i=s+(o<<14&0xffffffff|o>>>18),o=n+(s^t&(i^s))+r[4]+0xe7d3fbc8&0xffffffff,n=i+(o<<20&0xffffffff|o>>>12),o=t+(i^s&(n^i))+r[9]+0x21e1cde6&0xffffffff,t=n+(o<<5&0xffffffff|o>>>27),o=s+(n^i&(t^n))+r[14]+0xc33707d6&0xffffffff,s=t+(o<<9&0xffffffff|o>>>23),o=i+(t^n&(s^t))+r[3]+0xf4d50d87&0xffffffff,i=s+(o<<14&0xffffffff|o>>>18),o=n+(s^t&(i^s))+r[8]+0x455a14ed&0xffffffff,n=i+(o<<20&0xffffffff|o>>>12),o=t+(i^s&(n^i))+r[13]+0xa9e3e905&0xffffffff,t=n+(o<<5&0xffffffff|o>>>27),o=s+(n^i&(t^n))+r[2]+0xfcefa3f8&0xffffffff,s=t+(o<<9&0xffffffff|o>>>23),o=i+(t^n&(s^t))+r[7]+0x676f02d9&0xffffffff,i=s+(o<<14&0xffffffff|o>>>18),o=n+(s^t&(i^s))+r[12]+0x8d2a4c8a&0xffffffff,o=t+((n=i+(o<<20&0xffffffff|o>>>12))^i^s)+r[5]+0xfffa3942&0xffffffff,o=s+((t=n+(o<<4&0xffffffff|o>>>28))^n^i)+r[8]+0x8771f681&0xffffffff,o=i+((s=t+(o<<11&0xffffffff|o>>>21))^t^n)+r[11]+0x6d9d6122&0xffffffff,o=n+((i=s+(o<<16&0xffffffff|o>>>16))^s^t)+r[14]+0xfde5380c&0xffffffff,o=t+((n=i+(o<<23&0xffffffff|o>>>9))^i^s)+r[1]+0xa4beea44&0xffffffff,o=s+((t=n+(o<<4&0xffffffff|o>>>28))^n^i)+r[4]+0x4bdecfa9&0xffffffff,o=i+((s=t+(o<<11&0xffffffff|o>>>21))^t^n)+r[7]+0xf6bb4b60&0xffffffff,o=n+((i=s+(o<<16&0xffffffff|o>>>16))^s^t)+r[10]+0xbebfbc70&0xffffffff,o=t+((n=i+(o<<23&0xffffffff|o>>>9))^i^s)+r[13]+0x289b7ec6&0xffffffff,o=s+((t=n+(o<<4&0xffffffff|o>>>28))^n^i)+r[0]+0xeaa127fa&0xffffffff,o=i+((s=t+(o<<11&0xffffffff|o>>>21))^t^n)+r[3]+0xd4ef3085&0xffffffff,o=n+((i=s+(o<<16&0xffffffff|o>>>16))^s^t)+r[6]+0x4881d05&0xffffffff,o=t+((n=i+(o<<23&0xffffffff|o>>>9))^i^s)+r[9]+0xd9d4d039&0xffffffff,o=s+((t=n+(o<<4&0xffffffff|o>>>28))^n^i)+r[12]+0xe6db99e5&0xffffffff,o=i+((s=t+(o<<11&0xffffffff|o>>>21))^t^n)+r[15]+0x1fa27cf8&0xffffffff,o=n+((i=s+(o<<16&0xffffffff|o>>>16))^s^t)+r[2]+0xc4ac5665&0xffffffff,n=i+(o<<23&0xffffffff|o>>>9),o=t+(i^(n|~s))+r[0]+0xf4292244&0xffffffff,t=n+(o<<6&0xffffffff|o>>>26),o=s+(n^(t|~i))+r[7]+0x432aff97&0xffffffff,s=t+(o<<10&0xffffffff|o>>>22),o=i+(t^(s|~n))+r[14]+0xab9423a7&0xffffffff,i=s+(o<<15&0xffffffff|o>>>17),o=n+(s^(i|~t))+r[5]+0xfc93a039&0xffffffff,n=i+(o<<21&0xffffffff|o>>>11),o=t+(i^(n|~s))+r[12]+0x655b59c3&0xffffffff,t=n+(o<<6&0xffffffff|o>>>26),o=s+(n^(t|~i))+r[3]+0x8f0ccc92&0xffffffff,s=t+(o<<10&0xffffffff|o>>>22),o=i+(t^(s|~n))+r[10]+0xffeff47d&0xffffffff,i=s+(o<<15&0xffffffff|o>>>17),o=n+(s^(i|~t))+r[1]+0x85845dd1&0xffffffff,n=i+(o<<21&0xffffffff|o>>>11),o=t+(i^(n|~s))+r[8]+0x6fa87e4f&0xffffffff,t=n+(o<<6&0xffffffff|o>>>26),o=s+(n^(t|~i))+r[15]+0xfe2ce6e0&0xffffffff,s=t+(o<<10&0xffffffff|o>>>22),o=i+(t^(s|~n))+r[6]+0xa3014314&0xffffffff,i=s+(o<<15&0xffffffff|o>>>17),o=n+(s^(i|~t))+r[13]+0x4e0811a1&0xffffffff,n=i+(o<<21&0xffffffff|o>>>11),o=t+(i^(n|~s))+r[4]+0xf7537e82&0xffffffff,t=n+(o<<6&0xffffffff|o>>>26),o=s+(n^(t|~i))+r[11]+0xbd3af235&0xffffffff,s=t+(o<<10&0xffffffff|o>>>22),o=i+(t^(s|~n))+r[2]+0x2ad7d2bb&0xffffffff,i=s+(o<<15&0xffffffff|o>>>17),o=n+(s^(i|~t))+r[9]+0xeb86d391&0xffffffff,e.g[0]=e.g[0]+t&0xffffffff,e.g[1]=e.g[1]+(i+(o<<21&0xffffffff|o>>>11))&0xffffffff,e.g[2]=e.g[2]+i&0xffffffff,e.g[3]=e.g[3]+s&0xffffffff}function n(e,t){this.h=t;for(var n=[],r=!0,i=e.length-1;0<=i;i--){var s=0|e[i];r&&s==t||(n[i]=s,r=!1)}this.g=n}!function(e,t){function n(){}n.prototype=t.prototype,e.D=t.prototype,e.prototype=new n,e.prototype.constructor=e,e.C=function(e,n,r){for(var i=Array(arguments.length-2),s=2;s<arguments.length;s++)i[s-2]=arguments[s];return t.prototype[n].apply(e,i)}}(e,function(){this.blockSize=-1}),e.prototype.s=function(){this.g[0]=0x67452301,this.g[1]=0xefcdab89,this.g[2]=0x98badcfe,this.g[3]=0x10325476,this.o=this.h=0},e.prototype.u=function(e,n){void 0===n&&(n=e.length);for(var r=n-this.blockSize,i=this.B,s=this.h,o=0;o<n;){if(0==s)for(;o<=r;)t(this,e,o),o+=this.blockSize;if("string"==typeof e){for(;o<n;)if(i[s++]=e.charCodeAt(o++),s==this.blockSize){t(this,i),s=0;break}}else for(;o<n;)if(i[s++]=e[o++],s==this.blockSize){t(this,i),s=0;break}}this.h=s,this.o+=n},e.prototype.v=function(){var e=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);e[0]=128;for(var t=1;t<e.length-8;++t)e[t]=0;var n=8*this.o;for(t=e.length-8;t<e.length;++t)e[t]=255&n,n/=256;for(this.u(e),e=Array(16),t=n=0;4>t;++t)for(var r=0;32>r;r+=8)e[n++]=this.g[t]>>>r&255;return e};var r,i={};function s(e){var t;return -128<=e&&128>e?(t=function(e){return new n([0|e],0>e?-1:0)},Object.prototype.hasOwnProperty.call(i,e)?i[e]:i[e]=t(e)):new n([0|e],0>e?-1:0)}function o(e){if(isNaN(e)||!isFinite(e))return a;if(0>e)return f(o(-e));for(var t=[],r=1,i=0;e>=r;i++)t[i]=e/r|0,r*=0x100000000;return new n(t,0)}var a=s(0),l=s(1),h=s(0x1000000);function u(e){if(0!=e.h)return!1;for(var t=0;t<e.g.length;t++)if(0!=e.g[t])return!1;return!0}function c(e){return -1==e.h}function f(e){for(var t=e.g.length,r=[],i=0;i<t;i++)r[i]=~e.g[i];return new n(r,~e.h).add(l)}function d(e,t){return e.add(f(t))}function p(e,t){for(;(65535&e[t])!=e[t];)e[t+1]+=e[t]>>>16,e[t]&=65535,t++}function g(e,t){this.g=e,this.h=t}function y(e,t){if(u(t))throw Error("division by zero");if(u(e))return new g(a,a);if(c(e))return t=y(f(e),t),new g(f(t.g),f(t.h));if(c(t))return t=y(e,f(t)),new g(f(t.g),t.h);if(30<e.g.length){if(c(e)||c(t))throw Error("slowDivide_ only works with positive integers.");for(var n=l,r=t;0>=r.l(e);)n=v(n),r=v(r);var i=w(n,1),s=w(r,1);for(r=w(r,2),n=w(n,2);!u(r);){var h=s.add(r);0>=h.l(e)&&(i=i.add(n),s=h),r=w(r,1),n=w(n,1)}return t=d(e,i.j(t)),new g(i,t)}for(i=a;0<=e.l(t);){for(r=48>=(r=Math.ceil(Math.log(n=Math.max(1,Math.floor(e.m()/t.m())))/Math.LN2))?1:Math.pow(2,r-48),h=(s=o(n)).j(t);c(h)||0<h.l(e);)n-=r,h=(s=o(n)).j(t);u(s)&&(s=l),i=i.add(s),e=d(e,h)}return new g(i,e)}function v(e){for(var t=e.g.length+1,r=[],i=0;i<t;i++)r[i]=e.i(i)<<1|e.i(i-1)>>>31;return new n(r,e.h)}function w(e,t){var r=t>>5;t%=32;for(var i=e.g.length-r,s=[],o=0;o<i;o++)s[o]=0<t?e.i(o+r)>>>t|e.i(o+r+1)<<32-t:e.i(o+r);return new n(s,e.h)}(r=n.prototype).m=function(){if(c(this))return-f(this).m();for(var e=0,t=1,n=0;n<this.g.length;n++){var r=this.i(n);e+=(0<=r?r:0x100000000+r)*t,t*=0x100000000}return e},r.toString=function(e){if(2>(e=e||10)||36<e)throw Error("radix out of range: "+e);if(u(this))return"0";if(c(this))return"-"+f(this).toString(e);for(var t=o(Math.pow(e,6)),n=this,r="";;){var i=y(n,t).g,s=((0<(n=d(n,i.j(t))).g.length?n.g[0]:n.h)>>>0).toString(e);if(u(n=i))return s+r;for(;6>s.length;)s="0"+s;r=s+r}},r.i=function(e){return 0>e?0:e<this.g.length?this.g[e]:this.h},r.l=function(e){return c(e=d(this,e))?-1:u(e)?0:1},r.abs=function(){return c(this)?f(this):this},r.add=function(e){for(var t=Math.max(this.g.length,e.g.length),r=[],i=0,s=0;s<=t;s++){var o=i+(65535&this.i(s))+(65535&e.i(s)),a=(o>>>16)+(this.i(s)>>>16)+(e.i(s)>>>16);i=a>>>16,o&=65535,a&=65535,r[s]=a<<16|o}return new n(r,-0x80000000&r[r.length-1]?-1:0)},r.j=function(e){if(u(this)||u(e))return a;if(c(this))return c(e)?f(this).j(f(e)):f(f(this).j(e));if(c(e))return f(this.j(f(e)));if(0>this.l(h)&&0>e.l(h))return o(this.m()*e.m());for(var t=this.g.length+e.g.length,r=[],i=0;i<2*t;i++)r[i]=0;for(i=0;i<this.g.length;i++)for(var s=0;s<e.g.length;s++){var l=this.i(i)>>>16,d=65535&this.i(i),g=e.i(s)>>>16,m=65535&e.i(s);r[2*i+2*s]+=d*m,p(r,2*i+2*s),r[2*i+2*s+1]+=l*m,p(r,2*i+2*s+1),r[2*i+2*s+1]+=d*g,p(r,2*i+2*s+1),r[2*i+2*s+2]+=l*g,p(r,2*i+2*s+2)}for(i=0;i<t;i++)r[i]=r[2*i+1]<<16|r[2*i];for(i=t;i<2*t;i++)r[i]=0;return new n(r,0)},r.A=function(e){return y(this,e).h},r.and=function(e){for(var t=Math.max(this.g.length,e.g.length),r=[],i=0;i<t;i++)r[i]=this.i(i)&e.i(i);return new n(r,this.h&e.h)},r.or=function(e){for(var t=Math.max(this.g.length,e.g.length),r=[],i=0;i<t;i++)r[i]=this.i(i)|e.i(i);return new n(r,this.h|e.h)},r.xor=function(e){for(var t=Math.max(this.g.length,e.g.length),r=[],i=0;i<t;i++)r[i]=this.i(i)^e.i(i);return new n(r,this.h^e.h)},e.prototype.digest=e.prototype.v,e.prototype.reset=e.prototype.s,e.prototype.update=e.prototype.u,sD.Md5=e,n.prototype.add=n.prototype.add,n.prototype.multiply=n.prototype.j,n.prototype.modulo=n.prototype.A,n.prototype.compare=n.prototype.l,n.prototype.toNumber=n.prototype.m,n.prototype.toString=n.prototype.toString,n.prototype.getBits=n.prototype.i,n.fromNumber=o,n.fromString=function e(t,n){if(0==t.length)throw Error("number format error: empty string");if(2>(n=n||10)||36<n)throw Error("radix out of range: "+n);if("-"==t.charAt(0))return f(e(t.substring(1),n));if(0<=t.indexOf("-"))throw Error('number format error: interior "-" character');for(var r=o(Math.pow(n,8)),i=a,s=0;s<t.length;s+=8){var l=Math.min(8,t.length-s),h=parseInt(t.substring(s,s+l),n);8>l?(l=o(Math.pow(n,l)),i=i.j(l).add(o(h))):i=(i=i.j(r)).add(o(h))}return i},m=sD.Integer=n}).apply(void 0!==sP?sP:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});var sL="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:void 0!==L?L:"undefined"!=typeof self?self:{},sM={};(function(){var e,t,n,r="function"==typeof Object.defineProperties?Object.defineProperty:function(e,t,n){return e==Array.prototype||e==Object.prototype||(e[t]=n.value),e},i=function(e){e=["object"==typeof globalThis&&globalThis,e,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof sL&&sL];for(var t=0;t<e.length;++t){var n=e[t];if(n&&n.Math==Math)return n}throw Error("Cannot find global object")}(this);!function(e,t){if(t)e:{var n=i;e=e.split(".");for(var s=0;s<e.length-1;s++){var o=e[s];if(!(o in n))break e;n=n[o]}(t=t(s=n[e=e[e.length-1]]))!=s&&null!=t&&r(n,e,{configurable:!0,writable:!0,value:t})}}("Array.prototype.values",function(e){return e||function(){var e,t,n,r,i;return e=this,t=function(e,t){return t},e instanceof String&&(e+=""),n=0,r=!1,(i={next:function(){if(!r&&n<e.length){var i=n++;return{value:t(i,e[i]),done:!1}}return r=!0,{done:!0,value:void 0}}})[Symbol.iterator]=function(){return i},i}});var s=s||{},o=this||self;function a(e){var t=typeof e;return"array"==(t="object"!=t?t:e?Array.isArray(e)?"array":t:"null")||"object"==t&&"number"==typeof e.length}function l(e){var t=typeof e;return"object"==t&&null!=e||"function"==t}function h(e,t,n){return e.call.apply(e.bind,arguments)}function u(e,t,n){if(!e)throw Error();if(2<arguments.length){var r=Array.prototype.slice.call(arguments,2);return function(){var n=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(n,r),e.apply(t,n)}}return function(){return e.apply(t,arguments)}}function c(e,t,n){return(c=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?h:u).apply(null,arguments)}function f(e,t){var n=Array.prototype.slice.call(arguments,1);return function(){var t=n.slice();return t.push.apply(t,arguments),e.apply(this,t)}}function d(e,t){function n(){}n.prototype=t.prototype,e.aa=t.prototype,e.prototype=new n,e.prototype.constructor=e,e.Qb=function(e,n,r){for(var i=Array(arguments.length-2),s=2;s<arguments.length;s++)i[s-2]=arguments[s];return t.prototype[n].apply(e,i)}}function p(e){let t=e.length;if(0<t){let n=Array(t);for(let r=0;r<t;r++)n[r]=e[r];return n}return[]}function g(e,t){for(let t=1;t<arguments.length;t++){let n=arguments[t];if(a(n)){let t=e.length||0,r=n.length||0;e.length=t+r;for(let i=0;i<r;i++)e[t+i]=n[i]}else e.push(n)}}function m(e){return/^[\s\xa0]*$/.test(e)}function S(){var e=o.navigator;return e&&(e=e.userAgent)?e:""}function A(e){return A[" "](e),e}A[" "]=function(){};var k=-1!=S().indexOf("Gecko")&&!(-1!=S().toLowerCase().indexOf("webkit")&&-1==S().indexOf("Edge"))&&!(-1!=S().indexOf("Trident")||-1!=S().indexOf("MSIE"))&&-1==S().indexOf("Edge");function C(e,t,n){for(let r in e)t.call(n,e[r],r,e)}function R(e){let t={};for(let n in e)t[n]=e[n];return t}let x="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function O(e,t){let n,r;for(let t=1;t<arguments.length;t++){for(n in r=arguments[t])e[n]=r[n];for(let t=0;t<x.length;t++)n=x[t],Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}}var N=new class{constructor(e,t){this.i=e,this.j=t,this.h=0,this.g=null}get(){let e;return 0<this.h?(this.h--,e=this.g,this.g=e.next,e.next=null):e=this.i(),e}}(()=>new P,e=>e.reset());class P{constructor(){this.next=this.g=this.h=null}set(e,t){this.h=e,this.g=t,this.next=null}reset(){this.next=this.g=this.h=null}}let D,L=!1,M=new class{constructor(){this.h=this.g=null}add(e,t){let n=N.get();n.set(e,t),this.h?this.h.next=n:this.g=n,this.h=n}},U=()=>{let e=o.Promise.resolve(void 0);D=()=>{e.then(F)}};var F=()=>{let e;for(var t;e=null,M.g&&(e=M.g,M.g=M.g.next,M.g||(M.h=null),e.next=null),t=e;){try{t.h.call(t.g)}catch(e){!function(e){o.setTimeout(()=>{throw e},0)}(e)}N.j(t),100>N.h&&(N.h++,t.next=N.g,N.g=t)}L=!1};function V(){this.s=this.s,this.C=this.C}function B(e,t){this.type=e,this.g=this.target=t,this.defaultPrevented=!1}V.prototype.s=!1,V.prototype.ma=function(){this.s||(this.s=!0,this.N())},V.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()},B.prototype.h=function(){this.defaultPrevented=!0};var j=function(){if(!o.addEventListener||!Object.defineProperty)return!1;var e=!1,t=Object.defineProperty({},"passive",{get:function(){e=!0}});try{let e=()=>{};o.addEventListener("test",e,t),o.removeEventListener("test",e,t)}catch(e){}return e}();function $(e,t){if(B.call(this,e?e.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,e){var n=this.type=e.type,r=e.changedTouches&&e.changedTouches.length?e.changedTouches[0]:null;if(this.target=e.target||e.srcElement,this.g=t,t=e.relatedTarget){if(k){e:{try{A(t.nodeName);var i=!0;break e}catch(e){}i=!1}i||(t=null)}}else"mouseover"==n?t=e.fromElement:"mouseout"==n&&(t=e.toElement);this.relatedTarget=t,r?(this.clientX=void 0!==r.clientX?r.clientX:r.pageX,this.clientY=void 0!==r.clientY?r.clientY:r.pageY,this.screenX=r.screenX||0,this.screenY=r.screenY||0):(this.clientX=void 0!==e.clientX?e.clientX:e.pageX,this.clientY=void 0!==e.clientY?e.clientY:e.pageY,this.screenX=e.screenX||0,this.screenY=e.screenY||0),this.button=e.button,this.key=e.key||"",this.ctrlKey=e.ctrlKey,this.altKey=e.altKey,this.shiftKey=e.shiftKey,this.metaKey=e.metaKey,this.pointerId=e.pointerId||0,this.pointerType="string"==typeof e.pointerType?e.pointerType:H[e.pointerType]||"",this.state=e.state,this.i=e,e.defaultPrevented&&$.aa.h.call(this)}}d($,B);var H={2:"touch",3:"pen",4:"mouse"};$.prototype.h=function(){$.aa.h.call(this);var e=this.i;e.preventDefault?e.preventDefault():e.returnValue=!1};var q="closure_listenable_"+(1e6*Math.random()|0),z=0;function K(e,t,n,r,i){this.listener=e,this.proxy=null,this.src=t,this.type=n,this.capture=!!r,this.ha=i,this.key=++z,this.da=this.fa=!1}function G(e){e.da=!0,e.listener=null,e.proxy=null,e.src=null,e.ha=null}function W(e){this.src=e,this.g={},this.h=0}function X(e,t){var n=t.type;if(n in e.g){var r,i=e.g[n],s=Array.prototype.indexOf.call(i,t,void 0);(r=0<=s)&&Array.prototype.splice.call(i,s,1),r&&(G(t),0==e.g[n].length&&(delete e.g[n],e.h--))}}function Y(e,t,n,r){for(var i=0;i<e.length;++i){var s=e[i];if(!s.da&&s.listener==t&&!!n==s.capture&&s.ha==r)return i}return -1}W.prototype.add=function(e,t,n,r,i){var s=e.toString();(e=this.g[s])||(e=this.g[s]=[],this.h++);var o=Y(e,t,r,i);return -1<o?(t=e[o],n||(t.fa=!1)):((t=new K(t,this.src,s,!!r,i)).fa=n,e.push(t)),t};var J="closure_lm_"+(1e6*Math.random()|0),Q={};function Z(e,t,n,r,i,s){if(!t)throw Error("Invalid event type");var o=l(i)?!!i.capture:!!i,a=er(e);if(a||(e[J]=a=new W(e)),(n=a.add(t,n,r,o,s)).proxy)return n;if(r=function e(t){return en.call(e.src,e.listener,t)},n.proxy=r,r.src=e,r.listener=n,e.addEventListener)j||(i=o),void 0===i&&(i=!1),e.addEventListener(t.toString(),r,i);else if(e.attachEvent)e.attachEvent(et(t.toString()),r);else if(e.addListener&&e.removeListener)e.addListener(r);else throw Error("addEventListener and attachEvent are unavailable.");return n}function ee(e){if("number"!=typeof e&&e&&!e.da){var t=e.src;if(t&&t[q])X(t.i,e);else{var n=e.type,r=e.proxy;t.removeEventListener?t.removeEventListener(n,r,e.capture):t.detachEvent?t.detachEvent(et(n),r):t.addListener&&t.removeListener&&t.removeListener(r),(n=er(t))?(X(n,e),0==n.h&&(n.src=null,t[J]=null)):G(e)}}}function et(e){return e in Q?Q[e]:Q[e]="on"+e}function en(e,t){if(e.da)e=!0;else{t=new $(t,this);var n=e.listener,r=e.ha||e.src;e.fa&&ee(e),e=n.call(r,t)}return e}function er(e){return(e=e[J])instanceof W?e:null}var ei="__closure_events_fn_"+(1e9*Math.random()>>>0);function es(e){return"function"==typeof e?e:(e[ei]||(e[ei]=function(t){return e.handleEvent(t)}),e[ei])}function eo(){V.call(this),this.i=new W(this),this.M=this,this.F=null}function ea(e,t){var n,r=e.F;if(r)for(n=[];r;r=r.F)n.push(r);if(e=e.M,r=t.type||t,"string"==typeof t)t=new B(t,e);else if(t instanceof B)t.target=t.target||e;else{var i=t;O(t=new B(r,e),i)}if(i=!0,n)for(var s=n.length-1;0<=s;s--){var o=t.g=n[s];i=el(o,r,!0,t)&&i}if(i=el(o=t.g=e,r,!0,t)&&i,i=el(o,r,!1,t)&&i,n)for(s=0;s<n.length;s++)i=el(o=t.g=n[s],r,!1,t)&&i}function el(e,t,n,r){if(!(t=e.i.g[String(t)]))return!0;t=t.concat();for(var i=!0,s=0;s<t.length;++s){var o=t[s];if(o&&!o.da&&o.capture==n){var a=o.listener,l=o.ha||o.src;o.fa&&X(e.i,o),i=!1!==a.call(l,r)&&i}}return i&&!r.defaultPrevented}function eh(e,t,n){if("function"==typeof e)n&&(e=c(e,n));else if(e&&"function"==typeof e.handleEvent)e=c(e.handleEvent,e);else throw Error("Invalid listener argument");return 0x7fffffff<Number(t)?-1:o.setTimeout(e,t||0)}d(eo,V),eo.prototype[q]=!0,eo.prototype.removeEventListener=function(e,t,n,r){!function e(t,n,r,i,s){if(Array.isArray(n))for(var o=0;o<n.length;o++)e(t,n[o],r,i,s);else(i=l(i)?!!i.capture:!!i,r=es(r),t&&t[q])?(t=t.i,(n=String(n).toString())in t.g&&-1<(r=Y(o=t.g[n],r,i,s))&&(G(o[r]),Array.prototype.splice.call(o,r,1),0==o.length&&(delete t.g[n],t.h--))):t&&(t=er(t))&&(n=t.g[n.toString()],t=-1,n&&(t=Y(n,r,i,s)),(r=-1<t?n[t]:null)&&ee(r))}(this,e,t,n,r)},eo.prototype.N=function(){if(eo.aa.N.call(this),this.i){var e,t=this.i;for(e in t.g){for(var n=t.g[e],r=0;r<n.length;r++)G(n[r]);delete t.g[e],t.h--}}this.F=null},eo.prototype.K=function(e,t,n,r){return this.i.add(String(e),t,!1,n,r)},eo.prototype.L=function(e,t,n,r){return this.i.add(String(e),t,!0,n,r)};class eu extends V{constructor(e,t){super(),this.m=e,this.l=t,this.h=null,this.i=!1,this.g=null}j(e){this.h=arguments,this.g?this.i=!0:function e(t){t.g=eh(()=>{t.g=null,t.i&&(t.i=!1,e(t))},t.l);let n=t.h;t.h=null,t.m.apply(null,n)}(this)}N(){super.N(),this.g&&(o.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function ec(e){V.call(this),this.h=e,this.g={}}d(ec,V);var ef=[];function ed(e){C(e.g,function(e,t){this.g.hasOwnProperty(t)&&ee(e)},e),e.g={}}ec.prototype.N=function(){ec.aa.N.call(this),ed(this)},ec.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var ep=o.JSON.stringify,eg=o.JSON.parse,em=class{stringify(e){return o.JSON.stringify(e,void 0)}parse(e){return o.JSON.parse(e,void 0)}};function ey(){}function ev(e){return e.h||(e.h=e.i())}function ew(){}ey.prototype.h=null;var eE={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function eb(){B.call(this,"d")}function eI(){B.call(this,"c")}d(eb,B),d(eI,B);var e_={},eT=null;function eS(){return eT=eT||new eo}function eA(e){B.call(this,e_.La,e)}function ek(e){let t=eS();ea(t,new eA(t))}function eC(e,t){B.call(this,e_.STAT_EVENT,e),this.stat=t}function eR(e){let t=eS();ea(t,new eC(t,e))}function ex(e,t){B.call(this,e_.Ma,e),this.size=t}function eO(e,t){if("function"!=typeof e)throw Error("Fn must not be null and must be a function");return o.setTimeout(function(){e()},t)}function eN(){this.g=!0}function eP(e,t,n,r){e.info(function(){return"XMLHTTP TEXT ("+t+"): "+function(e,t){if(!e.g)return t;if(!t)return null;try{var n=JSON.parse(t);if(n){for(e=0;e<n.length;e++)if(Array.isArray(n[e])){var r=n[e];if(!(2>r.length)){var i=r[1];if(Array.isArray(i)&&!(1>i.length)){var s=i[0];if("noop"!=s&&"stop"!=s&&"close"!=s)for(var o=1;o<i.length;o++)i[o]=""}}}}return ep(n)}catch(e){return t}}(e,n)+(r?" "+r:"")})}e_.La="serverreachability",d(eA,B),e_.STAT_EVENT="statevent",d(eC,B),e_.Ma="timingevent",d(ex,B),eN.prototype.xa=function(){this.g=!1},eN.prototype.info=function(){};var eD={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},eL={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"};function eM(){}function eU(e,t,n,r){this.j=e,this.i=t,this.l=n,this.R=r||1,this.U=new ec(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new eF}function eF(){this.i=null,this.g="",this.h=!1}d(eM,ey),eM.prototype.g=function(){return new XMLHttpRequest},eM.prototype.i=function(){return{}},t=new eM;var eV={},eB={};function ej(e,t,n){e.L=1,e.v=tn(e8(t)),e.m=n,e.P=!0,e$(e,null)}function e$(e,t){e.F=Date.now(),eq(e),e.A=e8(e.v);var n=e.A,r=e.R;Array.isArray(r)||(r=[String(r)]),tg(n.i,"t",r),e.C=0,n=e.j.J,e.h=new eF,e.g=t1(e.j,n?t:null,!e.m),0<e.O&&(e.M=new eu(c(e.Y,e,e.g),e.O)),t=e.U,n=e.g,r=e.ca;var i="readystatechange";Array.isArray(i)||(i&&(ef[0]=i.toString()),i=ef);for(var s=0;s<i.length;s++){var o=function e(t,n,r,i,s){if(i&&i.once)return function e(t,n,r,i,s){if(Array.isArray(n)){for(var o=0;o<n.length;o++)e(t,n[o],r,i,s);return null}return r=es(r),t&&t[q]?t.L(n,r,l(i)?!!i.capture:!!i,s):Z(t,n,r,!0,i,s)}(t,n,r,i,s);if(Array.isArray(n)){for(var o=0;o<n.length;o++)e(t,n[o],r,i,s);return null}return r=es(r),t&&t[q]?t.K(n,r,l(i)?!!i.capture:!!i,s):Z(t,n,r,!1,i,s)}(n,i[s],r||t.handleEvent,!1,t.h||t);if(!o)break;t.g[o.key]=o}t=e.H?R(e.H):{},e.m?(e.u||(e.u="POST"),t["Content-Type"]="application/x-www-form-urlencoded",e.g.ea(e.A,e.u,e.m,t)):(e.u="GET",e.g.ea(e.A,e.u,null,t)),ek(),function(e,t,n,r,i,s){e.info(function(){if(e.g){if(s)for(var o="",a=s.split("&"),l=0;l<a.length;l++){var h=a[l].split("=");if(1<h.length){var u=h[0];h=h[1];var c=u.split("_");o=2<=c.length&&"type"==c[1]?o+(u+"=")+h+"&":o+(u+"=redacted&")}}else o=null}else o=s;return"XMLHTTP REQ ("+r+") [attempt "+i+"]: "+t+"\n"+n+"\n"+o})}(e.i,e.u,e.A,e.l,e.R,e.m)}function eH(e){return!!e.g&&"GET"==e.u&&2!=e.L&&e.j.Ca}function eq(e){e.S=Date.now()+e.I,ez(e,e.I)}function ez(e,t){if(null!=e.B)throw Error("WatchDog timer not null");e.B=eO(c(e.ba,e),t)}function eK(e){e.B&&(o.clearTimeout(e.B),e.B=null)}function eG(e){0==e.j.G||e.J||tY(e.j,e)}function eW(e){eK(e);var t=e.M;t&&"function"==typeof t.ma&&t.ma(),e.M=null,ed(e.U),e.g&&(t=e.g,e.g=null,t.abort(),t.ma())}function eX(e,t){try{var n=e.j;if(0!=n.G&&(n.g==e||e0(n.h,e))){if(!e.K&&e0(n.h,e)&&3==n.G){try{var r=n.Da.g.parse(t)}catch(e){r=null}if(Array.isArray(r)&&3==r.length){var i=r;if(0==i[0]){e:if(!n.u){if(n.g){if(n.g.F+3e3<e.F)tX(n),tV(n);else break e}tK(n),eR(18)}}else n.za=i[1],0<n.za-n.T&&37500>i[2]&&n.F&&0==n.v&&!n.C&&(n.C=eO(c(n.Za,n),6e3));if(1>=eZ(n.h)&&n.ca){try{n.ca()}catch(e){}n.ca=void 0}}else tQ(n,11)}else if((e.K||n.g==e)&&tX(n),!m(t))for(i=n.Da.g.parse(t),t=0;t<i.length;t++){let a=i[t];if(n.T=a[0],a=a[1],2==n.G){if("c"==a[0]){n.K=a[1],n.ia=a[2];let t=a[3];null!=t&&(n.la=t,n.j.info("VER="+n.la));let i=a[4];null!=i&&(n.Aa=i,n.j.info("SVER="+n.Aa));let l=a[5];null!=l&&"number"==typeof l&&0<l&&(r=1.5*l,n.L=r,n.j.info("backChannelRequestTimeoutMs_="+r)),r=n;let h=e.g;if(h){let e=h.g?h.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(e){var s=r.h;s.g||-1==e.indexOf("spdy")&&-1==e.indexOf("quic")&&-1==e.indexOf("h2")||(s.j=s.l,s.g=new Set,s.h&&(e1(s,s.h),s.h=null))}if(r.D){let e=h.g?h.g.getResponseHeader("X-HTTP-Session-Id"):null;e&&(r.ya=e,tt(r.I,r.D,e))}}if(n.G=3,n.l&&n.l.ua(),n.ba&&(n.R=Date.now()-e.F,n.j.info("Handshake RTT: "+n.R+"ms")),(r=n).qa=t0(r,r.J?r.ia:null,r.W),e.K){e2(r.h,e);var o=r.L;o&&(e.I=o),e.B&&(eK(e),eq(e)),r.g=e}else tz(r);0<n.i.length&&tj(n)}else"stop"!=a[0]&&"close"!=a[0]||tQ(n,7)}else 3==n.G&&("stop"==a[0]||"close"==a[0]?"stop"==a[0]?tQ(n,7):tF(n):"noop"!=a[0]&&n.l&&n.l.ta(a),n.v=0)}}ek(4)}catch(e){}}eU.prototype.ca=function(e){e=e.target;let t=this.M;t&&3==tD(e)?t.j():this.Y(e)},eU.prototype.Y=function(e){try{if(e==this.g)e:{let f=tD(this.g);var t=this.g.Ba();let d=this.g.Z();if(!(3>f)&&(3!=f||this.g&&(this.h.h||this.g.oa()||tL(this.g)))){this.J||4!=f||7==t||(8==t||0>=d?ek(3):ek(2)),eK(this);var n=this.g.Z();this.X=n;t:if(eH(this)){var r=tL(this.g);e="";var i=r.length,s=4==tD(this.g);if(!this.h.i){if("undefined"==typeof TextDecoder){eW(this),eG(this);var a="";break t}this.h.i=new o.TextDecoder}for(t=0;t<i;t++)this.h.h=!0,e+=this.h.i.decode(r[t],{stream:!(s&&t==i-1)});r.length=0,this.h.g+=e,this.C=0,a=this.h.g}else a=this.g.oa();if(this.o=200==n,function(e,t,n,r,i,s,o){e.info(function(){return"XMLHTTP RESP ("+r+") [ attempt "+i+"]: "+t+"\n"+n+"\n"+s+" "+o})}(this.i,this.u,this.A,this.l,this.R,f,n),this.o){if(this.T&&!this.K){t:{if(this.g){var l,h=this.g;if((l=h.g?h.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!m(l)){var u=l;break t}}u=null}if(n=u)eP(this.i,this.l,n,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,eX(this,n);else{this.o=!1,this.s=3,eR(12),eW(this),eG(this);break e}}if(this.P){let e;for(n=!0;!this.J&&this.C<a.length;)if((e=function(e,t){var n=e.C,r=t.indexOf("\n",n);return -1==r?eB:isNaN(n=Number(t.substring(n,r)))?eV:(r+=1)+n>t.length?eB:(t=t.slice(r,r+n),e.C=r+n,t)}(this,a))==eB){4==f&&(this.s=4,eR(14),n=!1),eP(this.i,this.l,null,"[Incomplete Response]");break}else if(e==eV){this.s=4,eR(15),eP(this.i,this.l,a,"[Invalid Chunk]"),n=!1;break}else eP(this.i,this.l,e,null),eX(this,e);if(eH(this)&&0!=this.C&&(this.h.g=this.h.g.slice(this.C),this.C=0),4!=f||0!=a.length||this.h.h||(this.s=1,eR(16),n=!1),this.o=this.o&&n,n){if(0<a.length&&!this.W){this.W=!0;var c=this.j;c.g==this&&c.ba&&!c.M&&(c.j.info("Great, no buffering proxy detected. Bytes received: "+a.length),tG(c),c.M=!0,eR(11))}}else eP(this.i,this.l,a,"[Invalid Chunked Response]"),eW(this),eG(this)}else eP(this.i,this.l,a,null),eX(this,a);4==f&&eW(this),this.o&&!this.J&&(4==f?tY(this.j,this):(this.o=!1,eq(this)))}else(function(e){let t={};e=(e.g&&2<=tD(e)&&e.g.getAllResponseHeaders()||"").split("\r\n");for(let r=0;r<e.length;r++){if(m(e[r]))continue;var n=function(e){var t=1;e=e.split(":");let n=[];for(;0<t&&e.length;)n.push(e.shift()),t--;return e.length&&n.push(e.join(":")),n}(e[r]);let i=n[0];if("string"!=typeof(n=n[1]))continue;n=n.trim();let s=t[i]||[];t[i]=s,s.push(n)}!function(e,t){for(let n in e)t.call(void 0,e[n],n,e)}(t,function(e){return e.join(", ")})})(this.g),400==n&&0<a.indexOf("Unknown SID")?(this.s=3,eR(12)):(this.s=0,eR(13)),eW(this),eG(this)}}}catch(e){}finally{}},eU.prototype.cancel=function(){this.J=!0,eW(this)},eU.prototype.ba=function(){this.B=null;let e=Date.now();0<=e-this.S?(function(e,t){e.info(function(){return"TIMEOUT: "+t})}(this.i,this.A),2!=this.L&&(ek(),eR(17)),eW(this),this.s=2,eG(this)):ez(this,this.S-e)};var eY=class{constructor(e,t){this.g=e,this.map=t}};function eJ(e){this.l=e||10,e=o.PerformanceNavigationTiming?0<(e=o.performance.getEntriesByType("navigation")).length&&("hq"==e[0].nextHopProtocol||"h2"==e[0].nextHopProtocol):!!(o.chrome&&o.chrome.loadTimes&&o.chrome.loadTimes()&&o.chrome.loadTimes().wasFetchedViaSpdy),this.j=e?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function eQ(e){return!!e.h||!!e.g&&e.g.size>=e.j}function eZ(e){return e.h?1:e.g?e.g.size:0}function e0(e,t){return e.h?e.h==t:!!e.g&&e.g.has(t)}function e1(e,t){e.g?e.g.add(t):e.h=t}function e2(e,t){e.h&&e.h==t?e.h=null:e.g&&e.g.has(t)&&e.g.delete(t)}function e5(e){if(null!=e.h)return e.i.concat(e.h.D);if(null!=e.g&&0!==e.g.size){let t=e.i;for(let n of e.g.values())t=t.concat(n.D);return t}return p(e.i)}function e6(e,t){if(e.forEach&&"function"==typeof e.forEach)e.forEach(t,void 0);else if(a(e)||"string"==typeof e)Array.prototype.forEach.call(e,t,void 0);else for(var n=function(e){if(e.na&&"function"==typeof e.na)return e.na();if(!e.V||"function"!=typeof e.V){if("undefined"!=typeof Map&&e instanceof Map)return Array.from(e.keys());if(!("undefined"!=typeof Set&&e instanceof Set)){if(a(e)||"string"==typeof e){var t=[];e=e.length;for(var n=0;n<e;n++)t.push(n);return t}for(let r in t=[],n=0,e)t[n++]=r;return t}}}(e),r=function(e){if(e.V&&"function"==typeof e.V)return e.V();if("undefined"!=typeof Map&&e instanceof Map||"undefined"!=typeof Set&&e instanceof Set)return Array.from(e.values());if("string"==typeof e)return e.split("");if(a(e)){for(var t=[],n=e.length,r=0;r<n;r++)t.push(e[r]);return t}for(r in t=[],n=0,e)t[n++]=e[r];return t}(e),i=r.length,s=0;s<i;s++)t.call(void 0,r[s],n&&n[s],e)}eJ.prototype.cancel=function(){if(this.i=e5(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&0!==this.g.size){for(let e of this.g.values())e.cancel();this.g.clear()}};var e3=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function e4(e){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,e instanceof e4){this.h=e.h,e7(this,e.j),this.o=e.o,this.g=e.g,e9(this,e.s),this.l=e.l;var t=e.i,n=new tc;n.i=t.i,t.g&&(n.g=new Map(t.g),n.h=t.h),te(this,n),this.m=e.m}else e&&(t=String(e).match(e3))?(this.h=!1,e7(this,t[1]||"",!0),this.o=tr(t[2]||""),this.g=tr(t[3]||"",!0),e9(this,t[4]),this.l=tr(t[5]||"",!0),te(this,t[6]||"",!0),this.m=tr(t[7]||"")):(this.h=!1,this.i=new tc(null,this.h))}function e8(e){return new e4(e)}function e7(e,t,n){e.j=n?tr(t,!0):t,e.j&&(e.j=e.j.replace(/:$/,""))}function e9(e,t){if(t){if(isNaN(t=Number(t))||0>t)throw Error("Bad port number "+t);e.s=t}else e.s=null}function te(e,t,n){var r,i;t instanceof tc?(e.i=t,r=e.i,(i=e.h)&&!r.j&&(tf(r),r.i=null,r.g.forEach(function(e,t){var n=t.toLowerCase();t!=n&&(td(this,t),tg(this,n,e))},r)),r.j=i):(n||(t=ti(t,th)),e.i=new tc(t,e.h))}function tt(e,t,n){e.i.set(t,n)}function tn(e){return tt(e,"zx",Math.floor(0x80000000*Math.random()).toString(36)+Math.abs(Math.floor(0x80000000*Math.random())^Date.now()).toString(36)),e}function tr(e,t){return e?t?decodeURI(e.replace(/%25/g,"%2525")):decodeURIComponent(e):""}function ti(e,t,n){return"string"==typeof e?(e=encodeURI(e).replace(t,ts),n&&(e=e.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),e):null}function ts(e){return"%"+((e=e.charCodeAt(0))>>4&15).toString(16)+(15&e).toString(16)}e4.prototype.toString=function(){var e=[],t=this.j;t&&e.push(ti(t,to,!0),":");var n=this.g;return(n||"file"==t)&&(e.push("//"),(t=this.o)&&e.push(ti(t,to,!0),"@"),e.push(encodeURIComponent(String(n)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),null!=(n=this.s)&&e.push(":",String(n))),(n=this.l)&&(this.g&&"/"!=n.charAt(0)&&e.push("/"),e.push(ti(n,"/"==n.charAt(0)?tl:ta,!0))),(n=this.i.toString())&&e.push("?",n),(n=this.m)&&e.push("#",ti(n,tu)),e.join("")};var to=/[#\/\?@]/g,ta=/[#\?:]/g,tl=/[#\?]/g,th=/[#\?@]/g,tu=/#/g;function tc(e,t){this.h=this.g=null,this.i=e||null,this.j=!!t}function tf(e){e.g||(e.g=new Map,e.h=0,e.i&&function(e,t){if(e){e=e.split("&");for(var n=0;n<e.length;n++){var r=e[n].indexOf("="),i=null;if(0<=r){var s=e[n].substring(0,r);i=e[n].substring(r+1)}else s=e[n];t(s,i?decodeURIComponent(i.replace(/\+/g," ")):"")}}}(e.i,function(t,n){e.add(decodeURIComponent(t.replace(/\+/g," ")),n)}))}function td(e,t){tf(e),t=tm(e,t),e.g.has(t)&&(e.i=null,e.h-=e.g.get(t).length,e.g.delete(t))}function tp(e,t){return tf(e),t=tm(e,t),e.g.has(t)}function tg(e,t,n){td(e,t),0<n.length&&(e.i=null,e.g.set(tm(e,t),p(n)),e.h+=n.length)}function tm(e,t){return t=String(t),e.j&&(t=t.toLowerCase()),t}function ty(e,t,n,r,i){try{i&&(i.onload=null,i.onerror=null,i.onabort=null,i.ontimeout=null),r(n)}catch(e){}}function tv(){this.g=new em}function tw(e){this.l=e.Ub||null,this.j=e.eb||!1}function tE(e,t){eo.call(this),this.D=e,this.o=t,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}function tb(e){e.j.read().then(e.Pa.bind(e)).catch(e.ga.bind(e))}function tI(e){e.readyState=4,e.l=null,e.j=null,e.v=null,t_(e)}function t_(e){e.onreadystatechange&&e.onreadystatechange.call(e)}function tT(e){let t="";return C(e,function(e,n){t+=n,t+=":",t+=e,t+="\r\n"}),t}function tS(e,t,n){e:{for(r in n){var r=!1;break e}r=!0}r||(n=tT(n),"string"==typeof e?null!=n&&encodeURIComponent(String(n)):tt(e,t,n))}function tA(e){eo.call(this),this.headers=new Map,this.o=e||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}(n=tc.prototype).add=function(e,t){tf(this),this.i=null,e=tm(this,e);var n=this.g.get(e);return n||this.g.set(e,n=[]),n.push(t),this.h+=1,this},n.forEach=function(e,t){tf(this),this.g.forEach(function(n,r){n.forEach(function(n){e.call(t,n,r,this)},this)},this)},n.na=function(){tf(this);let e=Array.from(this.g.values()),t=Array.from(this.g.keys()),n=[];for(let r=0;r<t.length;r++){let i=e[r];for(let e=0;e<i.length;e++)n.push(t[r])}return n},n.V=function(e){tf(this);let t=[];if("string"==typeof e)tp(this,e)&&(t=t.concat(this.g.get(tm(this,e))));else{e=Array.from(this.g.values());for(let n=0;n<e.length;n++)t=t.concat(e[n])}return t},n.set=function(e,t){return tf(this),this.i=null,tp(this,e=tm(this,e))&&(this.h-=this.g.get(e).length),this.g.set(e,[t]),this.h+=1,this},n.get=function(e,t){return e&&0<(e=this.V(e)).length?String(e[0]):t},n.toString=function(){if(this.i)return this.i;if(!this.g)return"";let e=[],t=Array.from(this.g.keys());for(var n=0;n<t.length;n++){var r=t[n];let s=encodeURIComponent(String(r)),o=this.V(r);for(r=0;r<o.length;r++){var i=s;""!==o[r]&&(i+="="+encodeURIComponent(String(o[r]))),e.push(i)}}return this.i=e.join("&")},d(tw,ey),tw.prototype.g=function(){return new tE(this.l,this.j)},tw.prototype.i=(e={},function(){return e}),d(tE,eo),(n=tE.prototype).open=function(e,t){if(0!=this.readyState)throw this.abort(),Error("Error reopening a connection");this.B=e,this.A=t,this.readyState=1,t_(this)},n.send=function(e){if(1!=this.readyState)throw this.abort(),Error("need to call open() first. ");this.g=!0;let t={headers:this.u,method:this.B,credentials:this.m,cache:void 0};e&&(t.body=e),(this.D||o).fetch(new Request(this.A,t)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&4!=this.readyState&&(this.g=!1,tI(this)),this.readyState=0},n.Sa=function(e){if(this.g&&(this.l=e,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=e.headers,this.readyState=2,t_(this)),this.g&&(this.readyState=3,t_(this),this.g))){if("arraybuffer"===this.responseType)e.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(void 0!==o.ReadableStream&&"body"in e){if(this.j=e.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;tb(this)}else e.text().then(this.Ra.bind(this),this.ga.bind(this))}},n.Pa=function(e){if(this.g){if(this.o&&e.value)this.response.push(e.value);else if(!this.o){var t=e.value?e.value:new Uint8Array(0);(t=this.v.decode(t,{stream:!e.done}))&&(this.response=this.responseText+=t)}e.done?tI(this):t_(this),3==this.readyState&&tb(this)}},n.Ra=function(e){this.g&&(this.response=this.responseText=e,tI(this))},n.Qa=function(e){this.g&&(this.response=e,tI(this))},n.ga=function(){this.g&&tI(this)},n.setRequestHeader=function(e,t){this.u.append(e,t)},n.getResponseHeader=function(e){return this.h&&this.h.get(e.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";let e=[],t=this.h.entries();for(var n=t.next();!n.done;)e.push((n=n.value)[0]+": "+n[1]),n=t.next();return e.join("\r\n")},Object.defineProperty(tE.prototype,"withCredentials",{get:function(){return"include"===this.m},set:function(e){this.m=e?"include":"same-origin"}}),d(tA,eo);var tk=/^https?$/i,tC=["POST","PUT"];function tR(e,t){e.h=!1,e.g&&(e.j=!0,e.g.abort(),e.j=!1),e.l=t,e.m=5,tx(e),tN(e)}function tx(e){e.A||(e.A=!0,ea(e,"complete"),ea(e,"error"))}function tO(e){if(e.h&&void 0!==s&&(!e.v[1]||4!=tD(e)||2!=e.Z())){if(e.u&&4==tD(e))eh(e.Ea,0,e);else if(ea(e,"readystatechange"),4==tD(e)){e.h=!1;try{let s=e.Z();switch(s){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var t,n,r=!0;break;default:r=!1}if(!(t=r)){if(n=0===s){var i=String(e.D).match(e3)[1]||null;!i&&o.self&&o.self.location&&(i=o.self.location.protocol.slice(0,-1)),n=!tk.test(i?i.toLowerCase():"")}t=n}if(t)ea(e,"complete"),ea(e,"success");else{e.m=6;try{var a=2<tD(e)?e.g.statusText:""}catch(e){a=""}e.l=a+" ["+e.Z()+"]",tx(e)}}finally{tN(e)}}}}function tN(e,t){if(e.g){tP(e);let n=e.g,r=e.v[0]?()=>{}:null;e.g=null,e.v=null,t||ea(e,"ready");try{n.onreadystatechange=r}catch(e){}}}function tP(e){e.I&&(o.clearTimeout(e.I),e.I=null)}function tD(e){return e.g?e.g.readyState:0}function tL(e){try{if(!e.g)return null;if("response"in e.g)return e.g.response;switch(e.H){case"":case"text":return e.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in e.g)return e.g.mozResponseArrayBuffer}return null}catch(e){return null}}function tM(e,t,n){return n&&n.internalChannelParams&&n.internalChannelParams[e]||t}function tU(e){this.Aa=0,this.i=[],this.j=new eN,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=tM("failFast",!1,e),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=tM("baseRetryDelayMs",5e3,e),this.cb=tM("retryDelaySeedMs",1e4,e),this.Wa=tM("forwardChannelMaxRetries",2,e),this.wa=tM("forwardChannelRequestTimeoutMs",2e4,e),this.pa=e&&e.xmlHttpFactory||void 0,this.Xa=e&&e.Tb||void 0,this.Ca=e&&e.useFetchStreams||!1,this.L=void 0,this.J=e&&e.supportsCrossDomainXhr||!1,this.K="",this.h=new eJ(e&&e.concurrentRequestLimit),this.Da=new tv,this.P=e&&e.fastHandshake||!1,this.O=e&&e.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=e&&e.Rb||!1,e&&e.xa&&this.j.xa(),e&&e.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&e&&e.detectBufferingProxy||!1,this.ja=void 0,e&&e.longPollingTimeout&&0<e.longPollingTimeout&&(this.ja=e.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}function tF(e){if(tB(e),3==e.G){var t=e.U++,n=e8(e.I);if(tt(n,"SID",e.K),tt(n,"RID",t),tt(n,"TYPE","terminate"),tH(e,n),(t=new eU(e,e.j,t)).L=2,t.v=tn(e8(n)),n=!1,o.navigator&&o.navigator.sendBeacon)try{n=o.navigator.sendBeacon(t.v.toString(),"")}catch(e){}!n&&o.Image&&((new Image).src=t.v,n=!0),n||(t.g=t1(t.j,null),t.g.ea(t.v)),t.F=Date.now(),eq(t)}tZ(e)}function tV(e){e.g&&(tG(e),e.g.cancel(),e.g=null)}function tB(e){tV(e),e.u&&(o.clearTimeout(e.u),e.u=null),tX(e),e.h.cancel(),e.s&&("number"==typeof e.s&&o.clearTimeout(e.s),e.s=null)}function tj(e){if(!eQ(e.h)&&!e.s){e.s=!0;var t=e.Ga;D||U(),L||(D(),L=!0),M.add(t,e),e.B=0}}function t$(e,t){var n;n=t?t.l:e.U++;let r=e8(e.I);tt(r,"SID",e.K),tt(r,"RID",n),tt(r,"AID",e.T),tH(e,r),e.m&&e.o&&tS(r,e.m,e.o),n=new eU(e,e.j,n,e.B+1),null===e.m&&(n.H=e.o),t&&(e.i=t.D.concat(e.i)),t=tq(e,n,1e3),n.I=Math.round(.5*e.wa)+Math.round(.5*e.wa*Math.random()),e1(e.h,n),ej(n,r,t)}function tH(e,t){e.H&&C(e.H,function(e,n){tt(t,n,e)}),e.l&&e6({},function(e,n){tt(t,n,e)})}function tq(e,t,n){n=Math.min(e.i.length,n);var r=e.l?c(e.l.Na,e.l,e):null;e:{var i=e.i;let t=-1;for(;;){let e=["count="+n];-1==t?0<n?(t=i[0].g,e.push("ofs="+t)):t=0:e.push("ofs="+t);let s=!0;for(let o=0;o<n;o++){let n=i[o].g,a=i[o].map;if(0>(n-=t))t=Math.max(0,i[o].g-100),s=!1;else try{!function(e,t,n){let r=n||"";try{e6(e,function(e,n){let i=e;l(e)&&(i=ep(e)),t.push(r+n+"="+encodeURIComponent(i))})}catch(e){throw t.push(r+"type="+encodeURIComponent("_badmap")),e}}(a,e,"req"+n+"_")}catch(e){r&&r(a)}}if(s){r=e.join("&");break e}}}return e=e.i.splice(0,n),t.D=e,r}function tz(e){if(!e.g&&!e.u){e.Y=1;var t=e.Fa;D||U(),L||(D(),L=!0),M.add(t,e),e.v=0}}function tK(e){return!e.g&&!e.u&&!(3<=e.v)&&(e.Y++,e.u=eO(c(e.Fa,e),tJ(e,e.v)),e.v++,!0)}function tG(e){null!=e.A&&(o.clearTimeout(e.A),e.A=null)}function tW(e){e.g=new eU(e,e.j,"rpc",e.Y),null===e.m&&(e.g.H=e.o),e.g.O=0;var t=e8(e.qa);tt(t,"RID","rpc"),tt(t,"SID",e.K),tt(t,"AID",e.T),tt(t,"CI",e.F?"0":"1"),!e.F&&e.ja&&tt(t,"TO",e.ja),tt(t,"TYPE","xmlhttp"),tH(e,t),e.m&&e.o&&tS(t,e.m,e.o),e.L&&(e.g.I=e.L);var n=e.g;e=e.ia,n.L=1,n.v=tn(e8(t)),n.m=null,n.P=!0,e$(n,e)}function tX(e){null!=e.C&&(o.clearTimeout(e.C),e.C=null)}function tY(e,t){var n=null;if(e.g==t){tX(e),tG(e),e.g=null;var r=2}else{if(!e0(e.h,t))return;n=t.D,e2(e.h,t),r=1}if(0!=e.G){if(t.o){if(1==r){n=t.m?t.m.length:0,t=Date.now()-t.F;var i,s=e.B;ea(r=eS(),new ex(r,n)),tj(e)}else tz(e)}else if(3==(s=t.s)||0==s&&0<t.X||!(1==r&&(i=t,!(eZ(e.h)>=e.h.j-(e.s?1:0))&&(e.s?(e.i=i.D.concat(e.i),!0):1!=e.G&&2!=e.G&&!(e.B>=(e.Va?0:e.Wa))&&(e.s=eO(c(e.Ga,e,i),tJ(e,e.B)),e.B++,!0)))||2==r&&tK(e)))switch(n&&0<n.length&&((t=e.h).i=t.i.concat(n)),s){case 1:tQ(e,5);break;case 4:tQ(e,10);break;case 3:tQ(e,6);break;default:tQ(e,2)}}}function tJ(e,t){let n=e.Ta+Math.floor(Math.random()*e.cb);return e.isActive()||(n*=2),n*t}function tQ(e,t){if(e.j.info("Error code "+t),2==t){var n=c(e.fb,e),r=e.Xa;let t=!r;r=new e4(r||"//www.google.com/images/cleardot.gif"),o.location&&"http"==o.location.protocol||e7(r,"https"),tn(r),t?function(e,t){let n=new eN;if(o.Image){let r=new Image;r.onload=f(ty,n,"TestLoadImage: loaded",!0,t,r),r.onerror=f(ty,n,"TestLoadImage: error",!1,t,r),r.onabort=f(ty,n,"TestLoadImage: abort",!1,t,r),r.ontimeout=f(ty,n,"TestLoadImage: timeout",!1,t,r),o.setTimeout(function(){r.ontimeout&&r.ontimeout()},1e4),r.src=e}else t(!1)}(r.toString(),n):function(e,t){let n=new eN,r=new AbortController,i=setTimeout(()=>{r.abort(),ty(n,"TestPingServer: timeout",!1,t)},1e4);fetch(e,{signal:r.signal}).then(e=>{clearTimeout(i),e.ok?ty(n,"TestPingServer: ok",!0,t):ty(n,"TestPingServer: server error",!1,t)}).catch(()=>{clearTimeout(i),ty(n,"TestPingServer: error",!1,t)})}(r.toString(),n)}else eR(2);e.G=0,e.l&&e.l.sa(t),tZ(e),tB(e)}function tZ(e){if(e.G=0,e.ka=[],e.l){let t=e5(e.h);(0!=t.length||0!=e.i.length)&&(g(e.ka,t),g(e.ka,e.i),e.h.i.length=0,p(e.i),e.i.length=0),e.l.ra()}}function t0(e,t,n){var r=n instanceof e4?e8(n):new e4(n);if(""!=r.g)t&&(r.g=t+"."+r.g),e9(r,r.s);else{var i=o.location;r=i.protocol,t=t?t+"."+i.hostname:i.hostname,i=+i.port;var s=new e4(null);r&&e7(s,r),t&&(s.g=t),i&&e9(s,i),n&&(s.l=n),r=s}return n=e.D,t=e.ya,n&&t&&tt(r,n,t),tt(r,"VER",e.la),tH(e,r),r}function t1(e,t,n){if(t&&!e.J)throw Error("Can't create secondary domain capable XhrIo object.");return(t=new tA(e.Ca&&!e.pa?new tw({eb:n}):e.pa)).Ha(e.J),t}function t2(){}function t5(){}function t6(e,t){eo.call(this),this.g=new tU(t),this.l=e,this.h=t&&t.messageUrlParams||null,e=t&&t.messageHeaders||null,t&&t.clientProtocolHeaderRequired&&(e?e["X-Client-Protocol"]="webchannel":e={"X-Client-Protocol":"webchannel"}),this.g.o=e,e=t&&t.initMessageHeaders||null,t&&t.messageContentType&&(e?e["X-WebChannel-Content-Type"]=t.messageContentType:e={"X-WebChannel-Content-Type":t.messageContentType}),t&&t.va&&(e?e["X-WebChannel-Client-Profile"]=t.va:e={"X-WebChannel-Client-Profile":t.va}),this.g.S=e,(e=t&&t.Sb)&&!m(e)&&(this.g.m=e),this.v=t&&t.supportsCrossDomainXhr||!1,this.u=t&&t.sendRawJson||!1,(t=t&&t.httpSessionIdParam)&&!m(t)&&(this.g.D=t,null!==(e=this.h)&&t in e&&t in(e=this.h)&&delete e[t]),this.j=new t8(this)}function t3(e){eb.call(this),e.__headers__&&(this.headers=e.__headers__,this.statusCode=e.__status__,delete e.__headers__,delete e.__status__);var t=e.__sm__;if(t){e:{for(let n in t){e=n;break e}e=void 0}(this.i=e)&&(e=this.i,t=null!==t&&e in t?t[e]:void 0),this.data=t}else this.data=e}function t4(){eI.call(this),this.status=1}function t8(e){this.g=e}(n=tA.prototype).Ha=function(e){this.J=e},n.ea=function(e,n,r,i){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+e);n=n?n.toUpperCase():"GET",this.D=e,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():t.g(),this.v=this.o?ev(this.o):ev(t),this.g.onreadystatechange=c(this.Ea,this);try{this.B=!0,this.g.open(n,String(e),!0),this.B=!1}catch(e){tR(this,e);return}if(e=r||"",r=new Map(this.headers),i){if(Object.getPrototypeOf(i)===Object.prototype)for(var s in i)r.set(s,i[s]);else if("function"==typeof i.keys&&"function"==typeof i.get)for(let e of i.keys())r.set(e,i.get(e));else throw Error("Unknown input type for opt_headers: "+String(i))}for(let[t,a]of(i=Array.from(r.keys()).find(e=>"content-type"==e.toLowerCase()),s=o.FormData&&e instanceof o.FormData,!(0<=Array.prototype.indexOf.call(tC,n,void 0))||i||s||r.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8"),r))this.g.setRequestHeader(t,a);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{tP(this),this.u=!0,this.g.send(e),this.u=!1}catch(e){tR(this,e)}},n.abort=function(e){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=e||7,ea(this,"complete"),ea(this,"abort"),tN(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),tN(this,!0)),tA.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?tO(this):this.bb())},n.bb=function(){tO(this)},n.isActive=function(){return!!this.g},n.Z=function(){try{return 2<tD(this)?this.g.status:-1}catch(e){return -1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch(e){return""}},n.Oa=function(e){if(this.g){var t=this.g.responseText;return e&&0==t.indexOf(e)&&(t=t.substring(e.length)),eg(t)}},n.Ba=function(){return this.m},n.Ka=function(){return"string"==typeof this.l?this.l:String(this.l)},(n=tU.prototype).la=8,n.G=1,n.connect=function(e,t,n,r){eR(0),this.W=e,this.H=t||{},n&&void 0!==r&&(this.H.OSID=n,this.H.OAID=r),this.F=this.X,this.I=t0(this,null,this.W),tj(this)},n.Ga=function(e){if(this.s){if(this.s=null,1==this.G){if(!e){this.U=Math.floor(1e5*Math.random()),e=this.U++;let i=new eU(this,this.j,e),s=this.o;if(this.S&&(s?O(s=R(s),this.S):s=this.S),null!==this.m||this.O||(i.H=s,s=null),this.P)e:{for(var t=0,n=0;n<this.i.length;n++){t:{var r=this.i[n];if("__data__"in r.map&&"string"==typeof(r=r.map.__data__)){r=r.length;break t}r=void 0}if(void 0===r)break;if(4096<(t+=r)){t=n;break e}if(4096===t||n===this.i.length-1){t=n+1;break e}}t=1e3}else t=1e3;t=tq(this,i,t),tt(n=e8(this.I),"RID",e),tt(n,"CVER",22),this.D&&tt(n,"X-HTTP-Session-Id",this.D),tH(this,n),s&&(this.O?t="headers="+encodeURIComponent(String(tT(s)))+"&"+t:this.m&&tS(n,this.m,s)),e1(this.h,i),this.Ua&&tt(n,"TYPE","init"),this.P?(tt(n,"$req",t),tt(n,"SID","null"),i.T=!0,ej(i,n,null)):ej(i,n,t),this.G=2}}else 3==this.G&&(e?t$(this,e):0==this.i.length||eQ(this.h)||t$(this))}},n.Fa=function(){if(this.u=null,tW(this),this.ba&&!(this.M||null==this.g||0>=this.R)){var e=2*this.R;this.j.info("BP detection timer enabled: "+e),this.A=eO(c(this.ab,this),e)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,eR(10),tV(this),tW(this))},n.Za=function(){null!=this.C&&(this.C=null,tV(this),tK(this),eR(19))},n.fb=function(e){e?(this.j.info("Successfully pinged google.com"),eR(2)):(this.j.info("Failed to ping google.com"),eR(1))},n.isActive=function(){return!!this.l&&this.l.isActive(this)},(n=t2.prototype).ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){},t5.prototype.g=function(e,t){return new t6(e,t)},d(t6,eo),t6.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},t6.prototype.close=function(){tF(this.g)},t6.prototype.o=function(e){var t=this.g;if("string"==typeof e){var n={};n.__data__=e,e=n}else this.u&&((n={}).__data__=ep(e),e=n);t.i.push(new eY(t.Ya++,e)),3==t.G&&tj(t)},t6.prototype.N=function(){this.g.l=null,delete this.j,tF(this.g),delete this.g,t6.aa.N.call(this)},d(t3,eb),d(t4,eI),d(t8,t2),t8.prototype.ua=function(){ea(this.g,"a")},t8.prototype.ta=function(e){ea(this.g,new t3(e))},t8.prototype.sa=function(e){ea(this.g,new t4)},t8.prototype.ra=function(){ea(this.g,"b")},t5.prototype.createWebChannel=t5.prototype.g,t6.prototype.send=t6.prototype.o,t6.prototype.open=t6.prototype.m,t6.prototype.close=t6.prototype.close,T=sM.createWebChannelTransport=function(){return new t5},_=sM.getStatEventTarget=function(){return eS()},I=sM.Event=e_,b=sM.Stat={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},eD.NO_ERROR=0,eD.TIMEOUT=8,eD.HTTP_ERROR=6,E=sM.ErrorCode=eD,eL.COMPLETE="complete",w=sM.EventType=eL,ew.EventType=eE,eE.OPEN="a",eE.CLOSE="b",eE.ERROR="c",eE.MESSAGE="d",eo.prototype.listen=eo.prototype.K,v=sM.WebChannel=ew,sM.FetchXmlHttpFactory=tw,tA.prototype.listenOnce=tA.prototype.L,tA.prototype.getLastError=tA.prototype.Ka,tA.prototype.getLastErrorCode=tA.prototype.Ba,tA.prototype.getStatus=tA.prototype.Z,tA.prototype.getResponseJson=tA.prototype.Oa,tA.prototype.getResponseText=tA.prototype.oa,tA.prototype.send=tA.prototype.ea,tA.prototype.setWithCredentials=tA.prototype.Ha,y=sM.XhrIo=tA}).apply(void 0!==sL?sL:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{}),S=function(e){var t,n,r=function(e){var t=e.length;if(t%4>0)throw Error("Invalid string. Length must be a multiple of 4");var n=e.indexOf("=");-1===n&&(n=t);var r=n===t?0:4-n%4;return[n,r]}(e),i=r[0],s=r[1],o=new sV((i+s)*3/4-s),a=0,l=s>0?i-4:i;for(n=0;n<l;n+=4)t=sF[e.charCodeAt(n)]<<18|sF[e.charCodeAt(n+1)]<<12|sF[e.charCodeAt(n+2)]<<6|sF[e.charCodeAt(n+3)],o[a++]=t>>16&255,o[a++]=t>>8&255,o[a++]=255&t;return 2===s&&(t=sF[e.charCodeAt(n)]<<2|sF[e.charCodeAt(n+1)]>>4,o[a++]=255&t),1===s&&(t=sF[e.charCodeAt(n)]<<10|sF[e.charCodeAt(n+1)]<<4|sF[e.charCodeAt(n+2)]>>2,o[a++]=t>>8&255,o[a++]=255&t),o},A=function(e){for(var t,n=e.length,r=n%3,i=[],s=0,o=n-r;s<o;s+=16383)i.push(function(e,t,n){for(var r,i=[],s=t;s<n;s+=3)i.push(sU[(r=(e[s]<<16&0xff0000)+(e[s+1]<<8&65280)+(255&e[s+2]))>>18&63]+sU[r>>12&63]+sU[r>>6&63]+sU[63&r]);return i.join("")}(e,s,s+16383>o?o:s+16383));return 1===r?i.push(sU[(t=e[n-1])>>2]+sU[t<<4&63]+"=="):2===r&&i.push(sU[(t=(e[n-2]<<8)+e[n-1])>>10]+sU[t>>4&63]+sU[t<<2&63]+"="),i.join("")};for(var sU=[],sF=[],sV="undefined"!=typeof Uint8Array?Uint8Array:Array,sB="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",sj=0,s$=sB.length;sj<s$;++sj)sU[sj]=sB[sj],sF[sB.charCodeAt(sj)]=sj;sF["-".charCodeAt(0)]=62,sF["_".charCodeAt(0)]=63,k=function(e,t,n,r,i){var s,o,a=8*i-r-1,l=(1<<a)-1,h=l>>1,u=-7,c=n?i-1:0,f=n?-1:1,d=e[t+c];for(c+=f,s=d&(1<<-u)-1,d>>=-u,u+=a;u>0;s=256*s+e[t+c],c+=f,u-=8);for(o=s&(1<<-u)-1,s>>=-u,u+=r;u>0;o=256*o+e[t+c],c+=f,u-=8);if(0===s)s=1-h;else{if(s===l)return o?NaN:1/0*(d?-1:1);o+=Math.pow(2,r),s-=h}return(d?-1:1)*o*Math.pow(2,s-r)},C=function(e,t,n,r,i,s){var o,a,l,h=8*s-i-1,u=(1<<h)-1,c=u>>1,f=23===i?5960464477539062e-23:0,d=r?0:s-1,p=r?1:-1,g=t<0||0===t&&1/t<0?1:0;for(isNaN(t=Math.abs(t))||t===1/0?(a=isNaN(t)?1:0,o=u):(o=Math.floor(Math.log(t)/Math.LN2),t*(l=Math.pow(2,-o))<1&&(o--,l*=2),o+c>=1?t+=f/l:t+=f*Math.pow(2,1-c),t*l>=2&&(o++,l/=2),o+c>=u?(a=0,o=u):o+c>=1?(a=(t*l-1)*Math.pow(2,i),o+=c):(a=t*Math.pow(2,c-1)*Math.pow(2,i),o=0));i>=8;e[n+d]=255&a,d+=p,a/=256,i-=8);for(o=o<<i|a,h+=i;h>0;e[n+d]=255&o,d+=p,o/=256,h-=8);e[n+d-p]|=128*g};const sH="function"==typeof Symbol&&"function"==typeof Symbol.for?Symbol.for("nodejs.util.inspect.custom"):null;function sq(e){if(e>0x7fffffff)throw RangeError('The value "'+e+'" is invalid for option "size"');let t=new Uint8Array(e);return Object.setPrototypeOf(t,sz.prototype),t}function sz(e,t,n){if("number"==typeof e){if("string"==typeof t)throw TypeError('The "string" argument must be of type string. Received type number');return sW(e)}return sK(e,t,n)}function sK(e,t,n){if("string"==typeof e)return function(e,t){if(("string"!=typeof t||""===t)&&(t="utf8"),!sz.isEncoding(t))throw TypeError("Unknown encoding: "+t);let n=0|sQ(e,t),r=sq(n),i=r.write(e,t);return i!==n&&(r=r.slice(0,i)),r}(e,t);if(ArrayBuffer.isView(e))return function(e){if(oc(e,Uint8Array)){let t=new Uint8Array(e);return sY(t.buffer,t.byteOffset,t.byteLength)}return sX(e)}(e);if(null==e)throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof e);if(oc(e,ArrayBuffer)||e&&oc(e.buffer,ArrayBuffer)||"undefined"!=typeof SharedArrayBuffer&&(oc(e,SharedArrayBuffer)||e&&oc(e.buffer,SharedArrayBuffer)))return sY(e,t,n);if("number"==typeof e)throw TypeError('The "value" argument must not be of type number. Received type number');let r=e.valueOf&&e.valueOf();if(null!=r&&r!==e)return sz.from(r,t,n);let i=function(e){var t;if(sz.isBuffer(e)){let t=0|sJ(e.length),n=sq(t);return 0===n.length||e.copy(n,0,0,t),n}return void 0!==e.length?"number"!=typeof e.length||(t=e.length)!=t?sq(0):sX(e):"Buffer"===e.type&&Array.isArray(e.data)?sX(e.data):void 0}(e);if(i)return i;if("undefined"!=typeof Symbol&&null!=Symbol.toPrimitive&&"function"==typeof e[Symbol.toPrimitive])return sz.from(e[Symbol.toPrimitive]("string"),t,n);throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof e)}function sG(e){if("number"!=typeof e)throw TypeError('"size" argument must be of type number');if(e<0)throw RangeError('The value "'+e+'" is invalid for option "size"')}function sW(e){return sG(e),sq(e<0?0:0|sJ(e))}function sX(e){let t=e.length<0?0:0|sJ(e.length),n=sq(t);for(let r=0;r<t;r+=1)n[r]=255&e[r];return n}function sY(e,t,n){let r;if(t<0||e.byteLength<t)throw RangeError('"offset" is outside of buffer bounds');if(e.byteLength<t+(n||0))throw RangeError('"length" is outside of buffer bounds');return Object.setPrototypeOf(r=void 0===t&&void 0===n?new Uint8Array(e):void 0===n?new Uint8Array(e,t):new Uint8Array(e,t,n),sz.prototype),r}function sJ(e){if(e>=0x7fffffff)throw RangeError("Attempt to allocate Buffer larger than maximum size: 0x7fffffff bytes");return 0|e}function sQ(e,t){if(sz.isBuffer(e))return e.length;if(ArrayBuffer.isView(e)||oc(e,ArrayBuffer))return e.byteLength;if("string"!=typeof e)throw TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof e);let n=e.length,r=arguments.length>2&&!0===arguments[2];if(!r&&0===n)return 0;let i=!1;for(;;)switch(t){case"ascii":case"latin1":case"binary":return n;case"utf8":case"utf-8":return ol(e).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*n;case"hex":return n>>>1;case"base64":return oh(e).length;default:if(i)return r?-1:ol(e).length;t=(""+t).toLowerCase(),i=!0}}function sZ(e,t,n){let r=!1;if((void 0===t||t<0)&&(t=0),t>this.length||((void 0===n||n>this.length)&&(n=this.length),n<=0||(n>>>=0)<=(t>>>=0)))return"";for(e||(e="utf8");;)switch(e){case"hex":return function(e,t,n){let r=e.length;(!t||t<0)&&(t=0),(!n||n<0||n>r)&&(n=r);let i="";for(let r=t;r<n;++r)i+=of[e[r]];return i}(this,t,n);case"utf8":case"utf-8":return s5(this,t,n);case"ascii":return function(e,t,n){let r="";n=Math.min(e.length,n);for(let i=t;i<n;++i)r+=String.fromCharCode(127&e[i]);return r}(this,t,n);case"latin1":case"binary":return function(e,t,n){let r="";n=Math.min(e.length,n);for(let i=t;i<n;++i)r+=String.fromCharCode(e[i]);return r}(this,t,n);case"base64":var i,s;return i=t,s=n,0===i&&s===this.length?A(this):A(this.slice(i,s));case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return function(e,t,n){let r=e.slice(t,n),i="";for(let e=0;e<r.length-1;e+=2)i+=String.fromCharCode(r[e]+256*r[e+1]);return i}(this,t,n);default:if(r)throw TypeError("Unknown encoding: "+e);e=(e+"").toLowerCase(),r=!0}}function s0(e,t,n){let r=e[t];e[t]=e[n],e[n]=r}function s1(e,t,n,r,i){var s;if(0===e.length)return -1;if("string"==typeof n?(r=n,n=0):n>0x7fffffff?n=0x7fffffff:n<-0x80000000&&(n=-0x80000000),(s=n=+n)!=s&&(n=i?0:e.length-1),n<0&&(n=e.length+n),n>=e.length){if(i)return -1;n=e.length-1}else if(n<0){if(!i)return -1;n=0}if("string"==typeof t&&(t=sz.from(t,r)),sz.isBuffer(t))return 0===t.length?-1:s2(e,t,n,r,i);if("number"==typeof t)return(t&=255,"function"==typeof Uint8Array.prototype.indexOf)?i?Uint8Array.prototype.indexOf.call(e,t,n):Uint8Array.prototype.lastIndexOf.call(e,t,n):s2(e,[t],n,r,i);throw TypeError("val must be string, number or Buffer")}function s2(e,t,n,r,i){let s,o=1,a=e.length,l=t.length;if(void 0!==r&&("ucs2"===(r=String(r).toLowerCase())||"ucs-2"===r||"utf16le"===r||"utf-16le"===r)){if(e.length<2||t.length<2)return -1;o=2,a/=2,l/=2,n/=2}function h(e,t){return 1===o?e[t]:e.readUInt16BE(t*o)}if(i){let r=-1;for(s=n;s<a;s++)if(h(e,s)===h(t,-1===r?0:s-r)){if(-1===r&&(r=s),s-r+1===l)return r*o}else -1!==r&&(s-=s-r),r=-1}else for(n+l>a&&(n=a-l),s=n;s>=0;s--){let n=!0;for(let r=0;r<l;r++)if(h(e,s+r)!==h(t,r)){n=!1;break}if(n)return s}return -1}function s5(e,t,n){n=Math.min(e.length,n);let r=[],i=t;for(;i<n;){let t=e[i],s=null,o=t>239?4:t>223?3:t>191?2:1;if(i+o<=n){let n,r,a,l;switch(o){case 1:t<128&&(s=t);break;case 2:(192&(n=e[i+1]))==128&&(l=(31&t)<<6|63&n)>127&&(s=l);break;case 3:n=e[i+1],r=e[i+2],(192&n)==128&&(192&r)==128&&(l=(15&t)<<12|(63&n)<<6|63&r)>2047&&(l<55296||l>57343)&&(s=l);break;case 4:n=e[i+1],r=e[i+2],a=e[i+3],(192&n)==128&&(192&r)==128&&(192&a)==128&&(l=(15&t)<<18|(63&n)<<12|(63&r)<<6|63&a)>65535&&l<1114112&&(s=l)}}null===s?(s=65533,o=1):s>65535&&(s-=65536,r.push(s>>>10&1023|55296),s=56320|1023&s),r.push(s),i+=o}return function(e){let t=e.length;if(t<=4096)return String.fromCharCode.apply(String,e);let n="",r=0;for(;r<t;)n+=String.fromCharCode.apply(String,e.slice(r,r+=4096));return n}(r)}function s6(e,t,n){if(e%1!=0||e<0)throw RangeError("offset is not uint");if(e+t>n)throw RangeError("Trying to access beyond buffer length")}function s3(e,t,n,r,i,s){if(!sz.isBuffer(e))throw TypeError('"buffer" argument must be a Buffer instance');if(t>i||t<s)throw RangeError('"value" argument is out of bounds');if(n+r>e.length)throw RangeError("Index out of range")}function s4(e,t,n,r,i){oi(t,r,i,e,n,7);let s=Number(t&BigInt(0xffffffff));e[n++]=s,s>>=8,e[n++]=s,s>>=8,e[n++]=s,s>>=8,e[n++]=s;let o=Number(t>>BigInt(32)&BigInt(0xffffffff));return e[n++]=o,o>>=8,e[n++]=o,o>>=8,e[n++]=o,o>>=8,e[n++]=o,n}function s8(e,t,n,r,i){oi(t,r,i,e,n,7);let s=Number(t&BigInt(0xffffffff));e[n+7]=s,s>>=8,e[n+6]=s,s>>=8,e[n+5]=s,s>>=8,e[n+4]=s;let o=Number(t>>BigInt(32)&BigInt(0xffffffff));return e[n+3]=o,o>>=8,e[n+2]=o,o>>=8,e[n+1]=o,o>>=8,e[n]=o,n+8}function s7(e,t,n,r,i,s){if(n+r>e.length||n<0)throw RangeError("Index out of range")}function s9(e,t,n,r,i){return t=+t,n>>>=0,i||s7(e,t,n,4,34028234663852886e22,-34028234663852886e22),C(e,t,n,r,23,4),n+4}function oe(e,t,n,r,i){return t=+t,n>>>=0,i||s7(e,t,n,8,17976931348623157e292,-17976931348623157e292),C(e,t,n,r,52,8),n+8}sz.TYPED_ARRAY_SUPPORT=function(){try{let e=new Uint8Array(1),t={foo:function(){return 42}};return Object.setPrototypeOf(t,Uint8Array.prototype),Object.setPrototypeOf(e,t),42===e.foo()}catch(e){return!1}}(),sz.TYPED_ARRAY_SUPPORT||"undefined"==typeof console||"function"!=typeof console.error||console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."),Object.defineProperty(sz.prototype,"parent",{enumerable:!0,get:function(){if(sz.isBuffer(this))return this.buffer}}),Object.defineProperty(sz.prototype,"offset",{enumerable:!0,get:function(){if(sz.isBuffer(this))return this.byteOffset}}),sz.poolSize=8192,sz.from=function(e,t,n){return sK(e,t,n)},Object.setPrototypeOf(sz.prototype,Uint8Array.prototype),Object.setPrototypeOf(sz,Uint8Array),sz.alloc=function(e,t,n){return(sG(e),e<=0)?sq(e):void 0!==t?"string"==typeof n?sq(e).fill(t,n):sq(e).fill(t):sq(e)},sz.allocUnsafe=function(e){return sW(e)},sz.allocUnsafeSlow=function(e){return sW(e)},sz.isBuffer=function(e){return null!=e&&!0===e._isBuffer&&e!==sz.prototype},sz.compare=function(e,t){if(oc(e,Uint8Array)&&(e=sz.from(e,e.offset,e.byteLength)),oc(t,Uint8Array)&&(t=sz.from(t,t.offset,t.byteLength)),!sz.isBuffer(e)||!sz.isBuffer(t))throw TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');if(e===t)return 0;let n=e.length,r=t.length;for(let i=0,s=Math.min(n,r);i<s;++i)if(e[i]!==t[i]){n=e[i],r=t[i];break}return n<r?-1:r<n?1:0},sz.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},sz.concat=function(e,t){let n;if(!Array.isArray(e))throw TypeError('"list" argument must be an Array of Buffers');if(0===e.length)return sz.alloc(0);if(void 0===t)for(n=0,t=0;n<e.length;++n)t+=e[n].length;let r=sz.allocUnsafe(t),i=0;for(n=0;n<e.length;++n){let t=e[n];if(oc(t,Uint8Array))i+t.length>r.length?(sz.isBuffer(t)||(t=sz.from(t)),t.copy(r,i)):Uint8Array.prototype.set.call(r,t,i);else if(sz.isBuffer(t))t.copy(r,i);else throw TypeError('"list" argument must be an Array of Buffers');i+=t.length}return r},sz.byteLength=sQ,sz.prototype._isBuffer=!0,sz.prototype.swap16=function(){let e=this.length;if(e%2!=0)throw RangeError("Buffer size must be a multiple of 16-bits");for(let t=0;t<e;t+=2)s0(this,t,t+1);return this},sz.prototype.swap32=function(){let e=this.length;if(e%4!=0)throw RangeError("Buffer size must be a multiple of 32-bits");for(let t=0;t<e;t+=4)s0(this,t,t+3),s0(this,t+1,t+2);return this},sz.prototype.swap64=function(){let e=this.length;if(e%8!=0)throw RangeError("Buffer size must be a multiple of 64-bits");for(let t=0;t<e;t+=8)s0(this,t,t+7),s0(this,t+1,t+6),s0(this,t+2,t+5),s0(this,t+3,t+4);return this},sz.prototype.toString=function(){let e=this.length;return 0===e?"":0==arguments.length?s5(this,0,e):sZ.apply(this,arguments)},sz.prototype.toLocaleString=sz.prototype.toString,sz.prototype.equals=function(e){if(!sz.isBuffer(e))throw TypeError("Argument must be a Buffer");return this===e||0===sz.compare(this,e)},sz.prototype.inspect=function(){let e="";return e=this.toString("hex",0,50).replace(/(.{2})/g,"$1 ").trim(),this.length>50&&(e+=" ... "),"<Buffer "+e+">"},sH&&(sz.prototype[sH]=sz.prototype.inspect),sz.prototype.compare=function(e,t,n,r,i){if(oc(e,Uint8Array)&&(e=sz.from(e,e.offset,e.byteLength)),!sz.isBuffer(e))throw TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type '+typeof e);if(void 0===t&&(t=0),void 0===n&&(n=e?e.length:0),void 0===r&&(r=0),void 0===i&&(i=this.length),t<0||n>e.length||r<0||i>this.length)throw RangeError("out of range index");if(r>=i&&t>=n)return 0;if(r>=i)return -1;if(t>=n)return 1;if(t>>>=0,n>>>=0,r>>>=0,i>>>=0,this===e)return 0;let s=i-r,o=n-t,a=Math.min(s,o),l=this.slice(r,i),h=e.slice(t,n);for(let e=0;e<a;++e)if(l[e]!==h[e]){s=l[e],o=h[e];break}return s<o?-1:o<s?1:0},sz.prototype.includes=function(e,t,n){return -1!==this.indexOf(e,t,n)},sz.prototype.indexOf=function(e,t,n){return s1(this,e,t,n,!0)},sz.prototype.lastIndexOf=function(e,t,n){return s1(this,e,t,n,!1)},sz.prototype.write=function(e,t,n,r){var i,s,o,a,l,h,u,c;if(void 0===t)r="utf8",n=this.length,t=0;else if(void 0===n&&"string"==typeof t)r=t,n=this.length,t=0;else if(isFinite(t))t>>>=0,isFinite(n)?(n>>>=0,void 0===r&&(r="utf8")):(r=n,n=void 0);else throw Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");let f=this.length-t;if((void 0===n||n>f)&&(n=f),e.length>0&&(n<0||t<0)||t>this.length)throw RangeError("Attempt to write outside buffer bounds");r||(r="utf8");let d=!1;for(;;)switch(r){case"hex":return function(e,t,n,r){let i;n=Number(n)||0;let s=e.length-n;r?(r=Number(r))>s&&(r=s):r=s;let o=t.length;for(r>o/2&&(r=o/2),i=0;i<r;++i){let r=parseInt(t.substr(2*i,2),16);if(r!=r)break;e[n+i]=r}return i}(this,e,t,n);case"utf8":case"utf-8":return i=t,s=n,ou(ol(e,this.length-i),this,i,s);case"ascii":case"latin1":case"binary":return o=t,a=n,ou(function(e){let t=[];for(let n=0;n<e.length;++n)t.push(255&e.charCodeAt(n));return t}(e),this,o,a);case"base64":return l=t,h=n,ou(oh(e),this,l,h);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return u=t,c=n,ou(function(e,t){let n,r;let i=[];for(let s=0;s<e.length&&!((t-=2)<0);++s)r=(n=e.charCodeAt(s))>>8,i.push(n%256),i.push(r);return i}(e,this.length-u),this,u,c);default:if(d)throw TypeError("Unknown encoding: "+r);r=(""+r).toLowerCase(),d=!0}},sz.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}},sz.prototype.slice=function(e,t){let n=this.length;e=~~e,t=void 0===t?n:~~t,e<0?(e+=n)<0&&(e=0):e>n&&(e=n),t<0?(t+=n)<0&&(t=0):t>n&&(t=n),t<e&&(t=e);let r=this.subarray(e,t);return Object.setPrototypeOf(r,sz.prototype),r},sz.prototype.readUintLE=sz.prototype.readUIntLE=function(e,t,n){e>>>=0,t>>>=0,n||s6(e,t,this.length);let r=this[e],i=1,s=0;for(;++s<t&&(i*=256);)r+=this[e+s]*i;return r},sz.prototype.readUintBE=sz.prototype.readUIntBE=function(e,t,n){e>>>=0,t>>>=0,n||s6(e,t,this.length);let r=this[e+--t],i=1;for(;t>0&&(i*=256);)r+=this[e+--t]*i;return r},sz.prototype.readUint8=sz.prototype.readUInt8=function(e,t){return e>>>=0,t||s6(e,1,this.length),this[e]},sz.prototype.readUint16LE=sz.prototype.readUInt16LE=function(e,t){return e>>>=0,t||s6(e,2,this.length),this[e]|this[e+1]<<8},sz.prototype.readUint16BE=sz.prototype.readUInt16BE=function(e,t){return e>>>=0,t||s6(e,2,this.length),this[e]<<8|this[e+1]},sz.prototype.readUint32LE=sz.prototype.readUInt32LE=function(e,t){return e>>>=0,t||s6(e,4,this.length),(this[e]|this[e+1]<<8|this[e+2]<<16)+0x1000000*this[e+3]},sz.prototype.readUint32BE=sz.prototype.readUInt32BE=function(e,t){return e>>>=0,t||s6(e,4,this.length),0x1000000*this[e]+(this[e+1]<<16|this[e+2]<<8|this[e+3])},sz.prototype.readBigUInt64LE=od(function(e){os(e>>>=0,"offset");let t=this[e],n=this[e+7];(void 0===t||void 0===n)&&oo(e,this.length-8);let r=t+256*this[++e]+65536*this[++e]+0x1000000*this[++e],i=this[++e]+256*this[++e]+65536*this[++e]+0x1000000*n;return BigInt(r)+(BigInt(i)<<BigInt(32))}),sz.prototype.readBigUInt64BE=od(function(e){os(e>>>=0,"offset");let t=this[e],n=this[e+7];(void 0===t||void 0===n)&&oo(e,this.length-8);let r=0x1000000*t+65536*this[++e]+256*this[++e]+this[++e],i=0x1000000*this[++e]+65536*this[++e]+256*this[++e]+n;return(BigInt(r)<<BigInt(32))+BigInt(i)}),sz.prototype.readIntLE=function(e,t,n){e>>>=0,t>>>=0,n||s6(e,t,this.length);let r=this[e],i=1,s=0;for(;++s<t&&(i*=256);)r+=this[e+s]*i;return r>=(i*=128)&&(r-=Math.pow(2,8*t)),r},sz.prototype.readIntBE=function(e,t,n){e>>>=0,t>>>=0,n||s6(e,t,this.length);let r=t,i=1,s=this[e+--r];for(;r>0&&(i*=256);)s+=this[e+--r]*i;return s>=(i*=128)&&(s-=Math.pow(2,8*t)),s},sz.prototype.readInt8=function(e,t){return(e>>>=0,t||s6(e,1,this.length),128&this[e])?-((255-this[e]+1)*1):this[e]},sz.prototype.readInt16LE=function(e,t){e>>>=0,t||s6(e,2,this.length);let n=this[e]|this[e+1]<<8;return 32768&n?0xffff0000|n:n},sz.prototype.readInt16BE=function(e,t){e>>>=0,t||s6(e,2,this.length);let n=this[e+1]|this[e]<<8;return 32768&n?0xffff0000|n:n},sz.prototype.readInt32LE=function(e,t){return e>>>=0,t||s6(e,4,this.length),this[e]|this[e+1]<<8|this[e+2]<<16|this[e+3]<<24},sz.prototype.readInt32BE=function(e,t){return e>>>=0,t||s6(e,4,this.length),this[e]<<24|this[e+1]<<16|this[e+2]<<8|this[e+3]},sz.prototype.readBigInt64LE=od(function(e){os(e>>>=0,"offset");let t=this[e],n=this[e+7];return(void 0===t||void 0===n)&&oo(e,this.length-8),(BigInt(this[e+4]+256*this[e+5]+65536*this[e+6]+(n<<24))<<BigInt(32))+BigInt(t+256*this[++e]+65536*this[++e]+0x1000000*this[++e])}),sz.prototype.readBigInt64BE=od(function(e){os(e>>>=0,"offset");let t=this[e],n=this[e+7];return(void 0===t||void 0===n)&&oo(e,this.length-8),(BigInt((t<<24)+65536*this[++e]+256*this[++e]+this[++e])<<BigInt(32))+BigInt(0x1000000*this[++e]+65536*this[++e]+256*this[++e]+n)}),sz.prototype.readFloatLE=function(e,t){return e>>>=0,t||s6(e,4,this.length),k(this,e,!0,23,4)},sz.prototype.readFloatBE=function(e,t){return e>>>=0,t||s6(e,4,this.length),k(this,e,!1,23,4)},sz.prototype.readDoubleLE=function(e,t){return e>>>=0,t||s6(e,8,this.length),k(this,e,!0,52,8)},sz.prototype.readDoubleBE=function(e,t){return e>>>=0,t||s6(e,8,this.length),k(this,e,!1,52,8)},sz.prototype.writeUintLE=sz.prototype.writeUIntLE=function(e,t,n,r){if(e=+e,t>>>=0,n>>>=0,!r){let r=Math.pow(2,8*n)-1;s3(this,e,t,n,r,0)}let i=1,s=0;for(this[t]=255&e;++s<n&&(i*=256);)this[t+s]=e/i&255;return t+n},sz.prototype.writeUintBE=sz.prototype.writeUIntBE=function(e,t,n,r){if(e=+e,t>>>=0,n>>>=0,!r){let r=Math.pow(2,8*n)-1;s3(this,e,t,n,r,0)}let i=n-1,s=1;for(this[t+i]=255&e;--i>=0&&(s*=256);)this[t+i]=e/s&255;return t+n},sz.prototype.writeUint8=sz.prototype.writeUInt8=function(e,t,n){return e=+e,t>>>=0,n||s3(this,e,t,1,255,0),this[t]=255&e,t+1},sz.prototype.writeUint16LE=sz.prototype.writeUInt16LE=function(e,t,n){return e=+e,t>>>=0,n||s3(this,e,t,2,65535,0),this[t]=255&e,this[t+1]=e>>>8,t+2},sz.prototype.writeUint16BE=sz.prototype.writeUInt16BE=function(e,t,n){return e=+e,t>>>=0,n||s3(this,e,t,2,65535,0),this[t]=e>>>8,this[t+1]=255&e,t+2},sz.prototype.writeUint32LE=sz.prototype.writeUInt32LE=function(e,t,n){return e=+e,t>>>=0,n||s3(this,e,t,4,0xffffffff,0),this[t+3]=e>>>24,this[t+2]=e>>>16,this[t+1]=e>>>8,this[t]=255&e,t+4},sz.prototype.writeUint32BE=sz.prototype.writeUInt32BE=function(e,t,n){return e=+e,t>>>=0,n||s3(this,e,t,4,0xffffffff,0),this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e,t+4},sz.prototype.writeBigUInt64LE=od(function(e,t=0){return s4(this,e,t,BigInt(0),BigInt("0xffffffffffffffff"))}),sz.prototype.writeBigUInt64BE=od(function(e,t=0){return s8(this,e,t,BigInt(0),BigInt("0xffffffffffffffff"))}),sz.prototype.writeIntLE=function(e,t,n,r){if(e=+e,t>>>=0,!r){let r=Math.pow(2,8*n-1);s3(this,e,t,n,r-1,-r)}let i=0,s=1,o=0;for(this[t]=255&e;++i<n&&(s*=256);)e<0&&0===o&&0!==this[t+i-1]&&(o=1),this[t+i]=(e/s>>0)-o&255;return t+n},sz.prototype.writeIntBE=function(e,t,n,r){if(e=+e,t>>>=0,!r){let r=Math.pow(2,8*n-1);s3(this,e,t,n,r-1,-r)}let i=n-1,s=1,o=0;for(this[t+i]=255&e;--i>=0&&(s*=256);)e<0&&0===o&&0!==this[t+i+1]&&(o=1),this[t+i]=(e/s>>0)-o&255;return t+n},sz.prototype.writeInt8=function(e,t,n){return e=+e,t>>>=0,n||s3(this,e,t,1,127,-128),e<0&&(e=255+e+1),this[t]=255&e,t+1},sz.prototype.writeInt16LE=function(e,t,n){return e=+e,t>>>=0,n||s3(this,e,t,2,32767,-32768),this[t]=255&e,this[t+1]=e>>>8,t+2},sz.prototype.writeInt16BE=function(e,t,n){return e=+e,t>>>=0,n||s3(this,e,t,2,32767,-32768),this[t]=e>>>8,this[t+1]=255&e,t+2},sz.prototype.writeInt32LE=function(e,t,n){return e=+e,t>>>=0,n||s3(this,e,t,4,0x7fffffff,-0x80000000),this[t]=255&e,this[t+1]=e>>>8,this[t+2]=e>>>16,this[t+3]=e>>>24,t+4},sz.prototype.writeInt32BE=function(e,t,n){return e=+e,t>>>=0,n||s3(this,e,t,4,0x7fffffff,-0x80000000),e<0&&(e=0xffffffff+e+1),this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e,t+4},sz.prototype.writeBigInt64LE=od(function(e,t=0){return s4(this,e,t,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))}),sz.prototype.writeBigInt64BE=od(function(e,t=0){return s8(this,e,t,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))}),sz.prototype.writeFloatLE=function(e,t,n){return s9(this,e,t,!0,n)},sz.prototype.writeFloatBE=function(e,t,n){return s9(this,e,t,!1,n)},sz.prototype.writeDoubleLE=function(e,t,n){return oe(this,e,t,!0,n)},sz.prototype.writeDoubleBE=function(e,t,n){return oe(this,e,t,!1,n)},sz.prototype.copy=function(e,t,n,r){if(!sz.isBuffer(e))throw TypeError("argument should be a Buffer");if(n||(n=0),r||0===r||(r=this.length),t>=e.length&&(t=e.length),t||(t=0),r>0&&r<n&&(r=n),r===n||0===e.length||0===this.length)return 0;if(t<0)throw RangeError("targetStart out of bounds");if(n<0||n>=this.length)throw RangeError("Index out of range");if(r<0)throw RangeError("sourceEnd out of bounds");r>this.length&&(r=this.length),e.length-t<r-n&&(r=e.length-t+n);let i=r-n;return this===e&&"function"==typeof Uint8Array.prototype.copyWithin?this.copyWithin(t,n,r):Uint8Array.prototype.set.call(e,this.subarray(n,r),t),i},sz.prototype.fill=function(e,t,n,r){let i;if("string"==typeof e){if("string"==typeof t?(r=t,t=0,n=this.length):"string"==typeof n&&(r=n,n=this.length),void 0!==r&&"string"!=typeof r)throw TypeError("encoding must be a string");if("string"==typeof r&&!sz.isEncoding(r))throw TypeError("Unknown encoding: "+r);if(1===e.length){let t=e.charCodeAt(0);("utf8"===r&&t<128||"latin1"===r)&&(e=t)}}else"number"==typeof e?e&=255:"boolean"==typeof e&&(e=Number(e));if(t<0||this.length<t||this.length<n)throw RangeError("Out of range index");if(n<=t)return this;if(t>>>=0,n=void 0===n?this.length:n>>>0,e||(e=0),"number"==typeof e)for(i=t;i<n;++i)this[i]=e;else{let s=sz.isBuffer(e)?e:sz.from(e,r),o=s.length;if(0===o)throw TypeError('The value "'+e+'" is invalid for argument "value"');for(i=0;i<n-t;++i)this[i+t]=s[i%o]}return this};const ot={};function on(e,t,n){ot[e]=class extends n{constructor(){super(),Object.defineProperty(this,"message",{value:t.apply(this,arguments),writable:!0,configurable:!0}),this.name=`${this.name} [${e}]`,this.stack,delete this.name}get code(){return e}set code(e){Object.defineProperty(this,"code",{configurable:!0,enumerable:!0,value:e,writable:!0})}toString(){return`${this.name} [${e}]: ${this.message}`}}}function or(e){let t="",n=e.length,r="-"===e[0]?1:0;for(;n>=r+4;n-=3)t=`_${e.slice(n-3,n)}${t}`;return`${e.slice(0,n)}${t}`}function oi(e,t,n,r,i,s){if(e>n||e<t){let r;let i="bigint"==typeof t?"n":"";throw r=s>3?0===t||t===BigInt(0)?`>= 0${i} and < 2${i} ** ${(s+1)*8}${i}`:`>= -(2${i} ** ${(s+1)*8-1}${i}) and < 2 ** ${(s+1)*8-1}${i}`:`>= ${t}${i} and <= ${n}${i}`,new ot.ERR_OUT_OF_RANGE("value",r,e)}os(i,"offset"),(void 0===r[i]||void 0===r[i+s])&&oo(i,r.length-(s+1))}function os(e,t){if("number"!=typeof e)throw new ot.ERR_INVALID_ARG_TYPE(t,"number",e)}function oo(e,t,n){if(Math.floor(e)!==e)throw os(e,n),new ot.ERR_OUT_OF_RANGE(n||"offset","an integer",e);if(t<0)throw new ot.ERR_BUFFER_OUT_OF_BOUNDS;throw new ot.ERR_OUT_OF_RANGE(n||"offset",`>= ${n?1:0} and <= ${t}`,e)}on("ERR_BUFFER_OUT_OF_BOUNDS",function(e){return e?`${e} is outside of buffer bounds`:"Attempt to access memory outside buffer bounds"},RangeError),on("ERR_INVALID_ARG_TYPE",function(e,t){return`The "${e}" argument must be of type number. Received type ${typeof t}`},TypeError),on("ERR_OUT_OF_RANGE",function(e,t,n){let r=`The value of "${e}" is out of range.`,i=n;return Number.isInteger(n)&&Math.abs(n)>0x100000000?i=or(String(n)):"bigint"==typeof n&&(i=String(n),(n>BigInt(2)**BigInt(32)||n<-(BigInt(2)**BigInt(32)))&&(i=or(i)),i+="n"),r+=` It must be ${t}. Received ${i}`},RangeError);const oa=/[^+/0-9A-Za-z-_]/g;function ol(e,t){let n;t=t||1/0;let r=e.length,i=null,s=[];for(let o=0;o<r;++o){if((n=e.charCodeAt(o))>55295&&n<57344){if(!i){if(n>56319||o+1===r){(t-=3)>-1&&s.push(239,191,189);continue}i=n;continue}if(n<56320){(t-=3)>-1&&s.push(239,191,189),i=n;continue}n=(i-55296<<10|n-56320)+65536}else i&&(t-=3)>-1&&s.push(239,191,189);if(i=null,n<128){if((t-=1)<0)break;s.push(n)}else if(n<2048){if((t-=2)<0)break;s.push(n>>6|192,63&n|128)}else if(n<65536){if((t-=3)<0)break;s.push(n>>12|224,n>>6&63|128,63&n|128)}else if(n<1114112){if((t-=4)<0)break;s.push(n>>18|240,n>>12&63|128,n>>6&63|128,63&n|128)}else throw Error("Invalid code point")}return s}function oh(e){return S(function(e){if((e=(e=e.split("=")[0]).trim().replace(oa,"")).length<2)return"";for(;e.length%4!=0;)e+="=";return e}(e))}function ou(e,t,n,r){let i;for(i=0;i<r&&!(i+n>=t.length)&&!(i>=e.length);++i)t[i+n]=e[i];return i}function oc(e,t){return e instanceof t||null!=e&&null!=e.constructor&&null!=e.constructor.name&&e.constructor.name===t.name}const of=function(){let e="0123456789abcdef",t=Array(256);for(let n=0;n<16;++n){let r=16*n;for(let i=0;i<16;++i)t[r+i]=e[n]+e[i]}return t}();function od(e){return"undefined"==typeof BigInt?op:e}function op(){throw Error("BigInt not supported")}const og="@firebase/firestore";/**
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
 */class om{constructor(e){this.uid=e}isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}om.UNAUTHENTICATED=new om(null),om.GOOGLE_CREDENTIALS=new om("google-credentials-uid"),om.FIRST_PARTY=new om("first-party-uid"),om.MOCK_USER=new om("mock-user");/**
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
 */let oy="11.0.0";/**
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
 */const ov=new tt("@firebase/firestore");function ow(){return ov.logLevel}function oE(e,...t){if(ov.logLevel<=g.DEBUG){let n=t.map(o_);ov.debug(`Firestore (${oy}): ${e}`,...n)}}function ob(e,...t){if(ov.logLevel<=g.ERROR){let n=t.map(o_);ov.error(`Firestore (${oy}): ${e}`,...n)}}function oI(e,...t){if(ov.logLevel<=g.WARN){let n=t.map(o_);ov.warn(`Firestore (${oy}): ${e}`,...n)}}function o_(e){if("string"==typeof e)return e;try{/**
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
 */return JSON.stringify(e)}catch(t){return e}}/**
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
 */function oT(e="Unexpected state"){let t=`FIRESTORE (${oy}) INTERNAL ASSERTION FAILED: `+e;throw ob(t),Error(t)}/**
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
 */const oS={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class oA extends eq{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class ok{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
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
 */class oC{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class oR{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(om.UNAUTHENTICATED))}shutdown(){}}class ox{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class oO{constructor(e){this.t=e,this.currentUser=om.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){void 0===this.o||oT();let n=this.i,r=e=>this.i!==n?(n=this.i,t(e)):Promise.resolve(),i=new ok;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new ok,e.enqueueRetryable(()=>r(this.currentUser))};let s=()=>{let t=i;e.enqueueRetryable(async()=>{await t.promise,await r(this.currentUser)})},o=e=>{oE("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=e,this.o&&(this.auth.addAuthTokenListener(this.o),s())};this.t.onInit(e=>o(e)),setTimeout(()=>{if(!this.auth){let e=this.t.getImmediate({optional:!0});e?o(e):(oE("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new ok)}},0),s()}getToken(){let e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(t=>this.i!==e?(oE("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):t?("string"==typeof t.accessToken||oT(),new oC(t.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){let e=this.auth&&this.auth.getUid();return null===e||"string"==typeof e||oT(),new om(e)}}class oN{constructor(e,t,n){this.l=e,this.h=t,this.P=n,this.type="FirstParty",this.user=om.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);let e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class oP{constructor(e,t,n){this.l=e,this.h=t,this.P=n}getToken(){return Promise.resolve(new oN(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(om.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class oD{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class oL{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,t){void 0===this.o||oT();let n=e=>{null!=e.error&&oE("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${e.error.message}`);let n=e.token!==this.R;return this.R=e.token,oE("FirebaseAppCheckTokenProvider",`Received ${n?"new":"existing"} token.`),n?t(e.token):Promise.resolve()};this.o=t=>{e.enqueueRetryable(()=>n(t))};let r=e=>{oE("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=e,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(e=>r(e)),setTimeout(()=>{if(!this.appCheck){let e=this.A.getImmediate({optional:!0});e?r(e):oE("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){let e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(e=>e?("string"==typeof e.token||oT(),this.R=e.token,new oD(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}function oM(e,t){return e<t?-1:e>t?1:0}function oU(e,t,n){return e.length===t.length&&e.every((e,r)=>n(e,t[r]))}/**
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
 */class oF{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0||t>=1e9)throw new oA(oS.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-0xe7791f700||e>=0x3afff44180)throw new oA(oS.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return oF.fromMillis(Date.now())}static fromDate(e){return oF.fromMillis(e.getTime())}static fromMillis(e){let t=Math.floor(e/1e3),n=Math.floor(1e6*(e-1e3*t));return new oF(t,n)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?oM(this.nanoseconds,e.nanoseconds):oM(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){return String(this.seconds- -0xe7791f700).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
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
 */class oV{constructor(e){this.timestamp=e}static fromTimestamp(e){return new oV(e)}static min(){return new oV(new oF(0,0))}static max(){return new oV(new oF(0x3afff4417f,0x3b9ac9ff))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */class oB{constructor(e,t,n){void 0===t?t=0:t>e.length&&oT(),void 0===n?n=e.length-t:n>e.length-t&&oT(),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(e){return 0===oB.comparator(this,e)}child(e){let t=this.segments.slice(this.offset,this.limit());return e instanceof oB?e.forEach(e=>{t.push(e)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=void 0===e?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return 0===this.length}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){let n=Math.min(e.length,t.length);for(let r=0;r<n;r++){let n=e.get(r),i=t.get(r);if(n<i)return -1;if(n>i)return 1}return e.length<t.length?-1:e.length>t.length?1:0}}class oj extends oB{construct(e,t,n){return new oj(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){let t=[];for(let n of e){if(n.indexOf("//")>=0)throw new oA(oS.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);t.push(...n.split("/").filter(e=>e.length>0))}return new oj(t)}static emptyPath(){return new oj([])}}const o$=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class oH extends oB{construct(e,t,n){return new oH(e,t,n)}static isValidIdentifier(e){return o$.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),oH.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&"__name__"===this.get(0)}static keyField(){return new oH(["__name__"])}static fromServerFormat(e){let t=[],n="",r=0,i=()=>{if(0===n.length)throw new oA(oS.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(n),n=""},s=!1;for(;r<e.length;){let t=e[r];if("\\"===t){if(r+1===e.length)throw new oA(oS.INVALID_ARGUMENT,"Path has trailing escape character: "+e);let t=e[r+1];if("\\"!==t&&"."!==t&&"`"!==t)throw new oA(oS.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=t,r+=2}else"`"===t?s=!s:"."!==t||s?n+=t:i(),r++}if(i(),s)throw new oA(oS.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new oH(t)}static emptyPath(){return new oH([])}}/**
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
 */class oq{constructor(e){this.path=e}static fromPath(e){return new oq(oj.fromString(e))}static fromName(e){return new oq(oj.fromString(e).popFirst(5))}static empty(){return new oq(oj.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return null!==e&&0===oj.comparator(this.path,e.path)}toString(){return this.path.toString()}static comparator(e,t){return oj.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new oq(new oj(e.slice()))}}class oz{constructor(e,t,n){this.readTime=e,this.documentKey=t,this.largestBatchId=n}static min(){return new oz(oV.min(),oq.empty(),-1)}static max(){return new oz(oV.max(),oq.empty(),-1)}}class oK{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
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
 */class oG{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&oT(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new oG((n,r)=>{this.nextCallback=t=>{this.wrapSuccess(e,t).next(n,r)},this.catchCallback=e=>{this.wrapFailure(t,e).next(n,r)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{let t=e();return t instanceof oG?t:oG.resolve(t)}catch(e){return oG.reject(e)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):oG.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):oG.reject(t)}static resolve(e){return new oG((t,n)=>{t(e)})}static reject(e){return new oG((t,n)=>{n(e)})}static waitFor(e){return new oG((t,n)=>{let r=0,i=0,s=!1;e.forEach(e=>{++r,e.next(()=>{++i,s&&i===r&&t()},e=>n(e))}),s=!0,i===r&&t()})}static or(e){let t=oG.resolve(!1);for(let n of e)t=t.next(e=>e?oG.resolve(e):n());return t}static forEach(e,t){let n=[];return e.forEach((e,r)=>{n.push(t.call(this,e,r))}),this.waitFor(n)}static mapArray(e,t){return new oG((n,r)=>{let i=e.length,s=Array(i),o=0;for(let a=0;a<i;a++){let l=a;t(e[l]).next(e=>{s[l]=e,++o===i&&n(s)},e=>r(e))}})}static doWhile(e,t){return new oG((n,r)=>{let i=()=>{!0===e()?t().next(()=>{i()},r):n()};i()})}}function oW(e){return"IndexedDbTransactionError"===e.name}/**
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
 */class oX{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=e=>this.ie(e),this.se=e=>t.writeSequenceNumber(e))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){let e=++this.previousValue;return this.se&&this.se(e),e}}function oY(e){return 0===e&&1/e==-1/0}/**
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
 */function oJ(e){let t=0;for(let n in e)Object.prototype.hasOwnProperty.call(e,n)&&t++;return t}function oQ(e,t){for(let n in e)Object.prototype.hasOwnProperty.call(e,n)&&t(n,e[n])}oX.oe=-1;/**
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
 */class oZ{constructor(e,t){this.comparator=e,this.root=t||o1.EMPTY}insert(e,t){return new oZ(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,o1.BLACK,null,null))}remove(e){return new oZ(this.comparator,this.root.remove(e,this.comparator).copy(null,null,o1.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){let n=this.comparator(e,t.key);if(0===n)return t.value;n<0?t=t.left:n>0&&(t=t.right)}return null}indexOf(e){let t=0,n=this.root;for(;!n.isEmpty();){let r=this.comparator(e,n.key);if(0===r)return t+n.left.size;r<0?n=n.left:(t+=n.left.size+1,n=n.right)}return -1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,n)=>(e(t,n),!1))}toString(){let e=[];return this.inorderTraversal((t,n)=>(e.push(`${t}:${n}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new o0(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new o0(this.root,e,this.comparator,!1)}getReverseIterator(){return new o0(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new o0(this.root,e,this.comparator,!0)}}class o0{constructor(e,t,n,r){this.isReverse=r,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?n(e.key,t):1,t&&r&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(0===i){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop(),t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(0===this.nodeStack.length)return null;let e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class o1{constructor(e,t,n,r,i){this.key=e,this.value=t,this.color=null!=n?n:o1.RED,this.left=null!=r?r:o1.EMPTY,this.right=null!=i?i:o1.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,n,r,i){return new o1(null!=e?e:this.key,null!=t?t:this.value,null!=n?n:this.color,null!=r?r:this.left,null!=i?i:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let r=this,i=n(e,r.key);return(r=i<0?r.copy(null,null,null,r.left.insert(e,t,n),null):0===i?r.copy(null,t,null,null,null):r.copy(null,null,null,null,r.right.insert(e,t,n))).fixUp()}removeMin(){if(this.left.isEmpty())return o1.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),(e=e.copy(null,null,null,e.left.removeMin(),null)).fixUp()}remove(e,t){let n,r=this;if(0>t(e,r.key))r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(e,t),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),0===t(e,r.key)){if(r.right.isEmpty())return o1.EMPTY;n=r.right.min(),r=r.copy(n.key,n.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(e,t))}return r.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=(e=(e=e.copy(null,null,null,null,e.right.rotateRight())).rotateLeft()).colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=(e=e.rotateRight()).colorFlip()),e}rotateLeft(){let e=this.copy(null,null,o1.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){let e=this.copy(null,null,o1.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){let e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){return Math.pow(2,this.check())<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw oT();let e=this.left.check();if(e!==this.right.check())throw oT();return e+(this.isRed()?0:1)}}o1.EMPTY=null,o1.RED=!0,o1.BLACK=!1,o1.EMPTY=new class{constructor(){this.size=0}get key(){throw oT()}get value(){throw oT()}get color(){throw oT()}get left(){throw oT()}get right(){throw oT()}copy(e,t,n,r,i){return this}insert(e,t,n){return new o1(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class o2{constructor(e){this.comparator=e,this.data=new oZ(this.comparator)}has(e){return null!==this.data.get(e)}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,n)=>(e(t),!1))}forEachInRange(e,t){let n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){let r=n.getNext();if(this.comparator(r.key,e[1])>=0)return;t(r.key)}}forEachWhile(e,t){let n;for(n=void 0!==t?this.data.getIteratorFrom(t):this.data.getIterator();n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){let t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new o5(this.data.getIterator())}getIteratorFrom(e){return new o5(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(e=>{t=t.add(e)}),t}isEqual(e){if(!(e instanceof o2)||this.size!==e.size)return!1;let t=this.data.getIterator(),n=e.data.getIterator();for(;t.hasNext();){let e=t.getNext().key,r=n.getNext().key;if(0!==this.comparator(e,r))return!1}return!0}toArray(){let e=[];return this.forEach(t=>{e.push(t)}),e}toString(){let e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){let t=new o2(this.comparator);return t.data=e,t}}class o5{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */class o6{constructor(e){this.fields=e,e.sort(oH.comparator)}static empty(){return new o6([])}unionWith(e){let t=new o2(oH.comparator);for(let e of this.fields)t=t.add(e);for(let n of e)t=t.add(n);return new o6(t.toArray())}covers(e){for(let t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return oU(this.fields,e.fields,(e,t)=>e.isEqual(t))}}/**
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
 */class o3 extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class o4{constructor(e){this.binaryString=e}static fromBase64String(e){return new o4(function(e){try{return atob(e)}catch(e){throw"undefined"!=typeof DOMException&&e instanceof DOMException?new o3("Invalid base64 string: "+e):e}}(e))}static fromUint8Array(e){return new o4(function(e){let t="";for(let n=0;n<e.length;++n)t+=String.fromCharCode(e[n]);return t}(e))}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return btoa(this.binaryString)}toUint8Array(){return function(e){let t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return oM(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}o4.EMPTY_BYTE_STRING=new o4("");const o8=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function o7(e){if(e||oT(),"string"==typeof e){let t=0,n=o8.exec(e);if(n||oT(),n[1]){let e=n[1];t=Number(e=(e+"000000000").substr(0,9))}return{seconds:Math.floor(new Date(e).getTime()/1e3),nanos:t}}return{seconds:o9(e.seconds),nanos:o9(e.nanos)}}function o9(e){return"number"==typeof e?e:"string"==typeof e?Number(e):0}function ae(e){return"string"==typeof e?o4.fromBase64String(e):o4.fromUint8Array(e)}/**
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
 */function at(e){var t,n;return"server_timestamp"===(null===(n=((null===(t=null==e?void 0:e.mapValue)||void 0===t?void 0:t.fields)||{}).__type__)||void 0===n?void 0:n.stringValue)}function an(e){let t=o7(e.mapValue.fields.__local_write_time__.timestampValue);return new oF(t.seconds,t.nanos)}class ar{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new ar("","")}get isDefaultDatabase(){return"(default)"===this.database}isEqual(e){return e instanceof ar&&e.projectId===this.projectId&&e.database===this.database}}/**
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
 */const ai={mapValue:{fields:{__type__:{stringValue:"__max__"}}}};function as(e){return"nullValue"in e?0:"booleanValue"in e?1:"integerValue"in e||"doubleValue"in e?2:"timestampValue"in e?3:"stringValue"in e?5:"bytesValue"in e?6:"referenceValue"in e?7:"geoPointValue"in e?8:"arrayValue"in e?9:"mapValue"in e?at(e)?4:ay(e)?0x1fffffffffffff:ag(e)?10:11:oT()}function ao(e,t){if(e===t)return!0;let n=as(e);if(n!==as(t))return!1;switch(n){case 0:case 0x1fffffffffffff:return!0;case 1:return e.booleanValue===t.booleanValue;case 4:return an(e).isEqual(an(t));case 3:return function(e,t){if("string"==typeof e.timestampValue&&"string"==typeof t.timestampValue&&e.timestampValue.length===t.timestampValue.length)return e.timestampValue===t.timestampValue;let n=o7(e.timestampValue),r=o7(t.timestampValue);return n.seconds===r.seconds&&n.nanos===r.nanos}(e,t);case 5:return e.stringValue===t.stringValue;case 6:return ae(e.bytesValue).isEqual(ae(t.bytesValue));case 7:return e.referenceValue===t.referenceValue;case 8:return o9(e.geoPointValue.latitude)===o9(t.geoPointValue.latitude)&&o9(e.geoPointValue.longitude)===o9(t.geoPointValue.longitude);case 2:return function(e,t){if("integerValue"in e&&"integerValue"in t)return o9(e.integerValue)===o9(t.integerValue);if("doubleValue"in e&&"doubleValue"in t){let n=o9(e.doubleValue),r=o9(t.doubleValue);return n===r?oY(n)===oY(r):isNaN(n)&&isNaN(r)}return!1}(e,t);case 9:return oU(e.arrayValue.values||[],t.arrayValue.values||[],ao);case 10:case 11:return function(e,t){let n=e.mapValue.fields||{},r=t.mapValue.fields||{};if(oJ(n)!==oJ(r))return!1;for(let e in n)if(n.hasOwnProperty(e)&&(void 0===r[e]||!ao(n[e],r[e])))return!1;return!0}(e,t);default:return oT()}}function aa(e,t){return void 0!==(e.values||[]).find(e=>ao(e,t))}function al(e,t){if(e===t)return 0;let n=as(e),r=as(t);if(n!==r)return oM(n,r);switch(n){case 0:case 0x1fffffffffffff:return 0;case 1:return oM(e.booleanValue,t.booleanValue);case 2:return function(e,t){let n=o9(e.integerValue||e.doubleValue),r=o9(t.integerValue||t.doubleValue);return n<r?-1:n>r?1:n===r?0:isNaN(n)?isNaN(r)?0:-1:1}(e,t);case 3:return ah(e.timestampValue,t.timestampValue);case 4:return ah(an(e),an(t));case 5:return oM(e.stringValue,t.stringValue);case 6:return function(e,t){let n=ae(e),r=ae(t);return n.compareTo(r)}(e.bytesValue,t.bytesValue);case 7:return function(e,t){let n=e.split("/"),r=t.split("/");for(let e=0;e<n.length&&e<r.length;e++){let t=oM(n[e],r[e]);if(0!==t)return t}return oM(n.length,r.length)}(e.referenceValue,t.referenceValue);case 8:return function(e,t){let n=oM(o9(e.latitude),o9(t.latitude));return 0!==n?n:oM(o9(e.longitude),o9(t.longitude))}(e.geoPointValue,t.geoPointValue);case 9:return au(e.arrayValue,t.arrayValue);case 10:return function(e,t){var n,r,i,s;let o=e.fields||{},a=t.fields||{},l=null===(n=o.value)||void 0===n?void 0:n.arrayValue,h=null===(r=a.value)||void 0===r?void 0:r.arrayValue,u=oM((null===(i=null==l?void 0:l.values)||void 0===i?void 0:i.length)||0,(null===(s=null==h?void 0:h.values)||void 0===s?void 0:s.length)||0);return 0!==u?u:au(l,h)}(e.mapValue,t.mapValue);case 11:return function(e,t){if(e===ai.mapValue&&t===ai.mapValue)return 0;if(e===ai.mapValue)return 1;if(t===ai.mapValue)return -1;let n=e.fields||{},r=Object.keys(n),i=t.fields||{},s=Object.keys(i);r.sort(),s.sort();for(let e=0;e<r.length&&e<s.length;++e){let t=oM(r[e],s[e]);if(0!==t)return t;let o=al(n[r[e]],i[s[e]]);if(0!==o)return o}return oM(r.length,s.length)}(e.mapValue,t.mapValue);default:throw oT()}}function ah(e,t){if("string"==typeof e&&"string"==typeof t&&e.length===t.length)return oM(e,t);let n=o7(e),r=o7(t),i=oM(n.seconds,r.seconds);return 0!==i?i:oM(n.nanos,r.nanos)}function au(e,t){let n=e.values||[],r=t.values||[];for(let e=0;e<n.length&&e<r.length;++e){let t=al(n[e],r[e]);if(t)return t}return oM(n.length,r.length)}function ac(e){var t,n;return"nullValue"in e?"null":"booleanValue"in e?""+e.booleanValue:"integerValue"in e?""+e.integerValue:"doubleValue"in e?""+e.doubleValue:"timestampValue"in e?function(e){let t=o7(e);return`time(${t.seconds},${t.nanos})`}(e.timestampValue):"stringValue"in e?e.stringValue:"bytesValue"in e?ae(e.bytesValue).toBase64():"referenceValue"in e?(t=e.referenceValue,oq.fromName(t).toString()):"geoPointValue"in e?(n=e.geoPointValue,`geo(${n.latitude},${n.longitude})`):"arrayValue"in e?function(e){let t="[",n=!0;for(let r of e.values||[])n?n=!1:t+=",",t+=ac(r);return t+"]"}(e.arrayValue):"mapValue"in e?function(e){let t=Object.keys(e.fields||{}).sort(),n="{",r=!0;for(let i of t)r?r=!1:n+=",",n+=`${i}:${ac(e.fields[i])}`;return n+"}"}(e.mapValue):oT()}function af(e){return!!e&&"integerValue"in e}function ad(e){return!!e&&"arrayValue"in e}function ap(e){return!!e&&"mapValue"in e}function ag(e){var t,n;return"__vector__"===(null===(n=((null===(t=null==e?void 0:e.mapValue)||void 0===t?void 0:t.fields)||{}).__type__)||void 0===n?void 0:n.stringValue)}function am(e){if(e.geoPointValue)return{geoPointValue:Object.assign({},e.geoPointValue)};if(e.timestampValue&&"object"==typeof e.timestampValue)return{timestampValue:Object.assign({},e.timestampValue)};if(e.mapValue){let t={mapValue:{fields:{}}};return oQ(e.mapValue.fields,(e,n)=>t.mapValue.fields[e]=am(n)),t}if(e.arrayValue){let t={arrayValue:{values:[]}};for(let n=0;n<(e.arrayValue.values||[]).length;++n)t.arrayValue.values[n]=am(e.arrayValue.values[n]);return t}return Object.assign({},e)}function ay(e){return"__max__"===(((e.mapValue||{}).fields||{}).__type__||{}).stringValue}/**
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
 */class av{constructor(e){this.value=e}static empty(){return new av({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let n=0;n<e.length-1;++n)if(!ap(t=(t.mapValue.fields||{})[e.get(n)]))return null;return(t=(t.mapValue.fields||{})[e.lastSegment()])||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=am(t)}setAll(e){let t=oH.emptyPath(),n={},r=[];e.forEach((e,i)=>{if(!t.isImmediateParentOf(i)){let e=this.getFieldsMap(t);this.applyChanges(e,n,r),n={},r=[],t=i.popLast()}e?n[i.lastSegment()]=am(e):r.push(i.lastSegment())});let i=this.getFieldsMap(t);this.applyChanges(i,n,r)}delete(e){let t=this.field(e.popLast());ap(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return ao(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let n=0;n<e.length;++n){let r=t.mapValue.fields[e.get(n)];ap(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},t.mapValue.fields[e.get(n)]=r),t=r}return t.mapValue.fields}applyChanges(e,t,n){for(let r of(oQ(t,(t,n)=>e[t]=n),n))delete e[r]}clone(){return new av(am(this.value))}}/**
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
 */class aw{constructor(e,t,n,r,i,s,o){this.key=e,this.documentType=t,this.version=n,this.readTime=r,this.createTime=i,this.data=s,this.documentState=o}static newInvalidDocument(e){return new aw(e,0,oV.min(),oV.min(),oV.min(),av.empty(),0)}static newFoundDocument(e,t,n,r){return new aw(e,1,t,oV.min(),n,r,0)}static newNoDocument(e,t){return new aw(e,2,t,oV.min(),oV.min(),av.empty(),0)}static newUnknownDocument(e,t){return new aw(e,3,t,oV.min(),oV.min(),av.empty(),2)}convertToFoundDocument(e,t){return this.createTime.isEqual(oV.min())&&(2===this.documentType||0===this.documentType)&&(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=av.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=av.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=oV.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return 1===this.documentState}get hasCommittedMutations(){return 2===this.documentState}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return 0!==this.documentType}isFoundDocument(){return 1===this.documentType}isNoDocument(){return 2===this.documentType}isUnknownDocument(){return 3===this.documentType}isEqual(e){return e instanceof aw&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new aw(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class aE{constructor(e,t){this.position=e,this.inclusive=t}}function ab(e,t,n){let r=0;for(let i=0;i<e.position.length;i++){let s=t[i],o=e.position[i];if(r=s.field.isKeyField()?oq.comparator(oq.fromName(o.referenceValue),n.key):al(o,n.data.field(s.field)),"desc"===s.dir&&(r*=-1),0!==r)break}return r}function aI(e,t){if(null===e)return null===t;if(null===t||e.inclusive!==t.inclusive||e.position.length!==t.position.length)return!1;for(let n=0;n<e.position.length;n++)if(!ao(e.position[n],t.position[n]))return!1;return!0}/**
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
 */class a_{constructor(e,t="asc"){this.field=e,this.dir=t}}/**
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
 */class aT{}class aS extends aT{constructor(e,t,n){super(),this.field=e,this.op=t,this.value=n}static create(e,t,n){return e.isKeyField()?"in"===t||"not-in"===t?this.createKeyFieldInFilter(e,t,n):new aR(e,t,n):"array-contains"===t?new aP(e,n):"in"===t?new aD(e,n):"not-in"===t?new aL(e,n):"array-contains-any"===t?new aM(e,n):new aS(e,t,n)}static createKeyFieldInFilter(e,t,n){return"in"===t?new ax(e,n):new aO(e,n)}matches(e){let t=e.data.field(this.field);return"!="===this.op?null!==t&&this.matchesComparison(al(t,this.value)):null!==t&&as(this.value)===as(t)&&this.matchesComparison(al(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return 0===e;case"!=":return 0!==e;case">":return e>0;case">=":return e>=0;default:return oT()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class aA extends aT{constructor(e,t){super(),this.filters=e,this.op=t,this.ae=null}static create(e,t){return new aA(e,t)}matches(e){return ak(this)?void 0===this.filters.find(t=>!t.matches(e)):void 0!==this.filters.find(t=>t.matches(e))}getFlattenedFilters(){return null!==this.ae||(this.ae=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function ak(e){return"and"===e.op}function aC(e){for(let t of e.filters)if(t instanceof aA)return!1;return!0}class aR extends aS{constructor(e,t,n){super(e,t,n),this.key=oq.fromName(n.referenceValue)}matches(e){let t=oq.comparator(e.key,this.key);return this.matchesComparison(t)}}class ax extends aS{constructor(e,t){super(e,"in",t),this.keys=aN("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class aO extends aS{constructor(e,t){super(e,"not-in",t),this.keys=aN("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function aN(e,t){var n;return((null===(n=t.arrayValue)||void 0===n?void 0:n.values)||[]).map(e=>oq.fromName(e.referenceValue))}class aP extends aS{constructor(e,t){super(e,"array-contains",t)}matches(e){let t=e.data.field(this.field);return ad(t)&&aa(t.arrayValue,this.value)}}class aD extends aS{constructor(e,t){super(e,"in",t)}matches(e){let t=e.data.field(this.field);return null!==t&&aa(this.value.arrayValue,t)}}class aL extends aS{constructor(e,t){super(e,"not-in",t)}matches(e){if(aa(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;let t=e.data.field(this.field);return null!==t&&!aa(this.value.arrayValue,t)}}class aM extends aS{constructor(e,t){super(e,"array-contains-any",t)}matches(e){let t=e.data.field(this.field);return!(!ad(t)||!t.arrayValue.values)&&t.arrayValue.values.some(e=>aa(this.value.arrayValue,e))}}/**
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
 */class aU{constructor(e,t=null,n=[],r=[],i=null,s=null,o=null){this.path=e,this.collectionGroup=t,this.orderBy=n,this.filters=r,this.limit=i,this.startAt=s,this.endAt=o,this.ue=null}}function aF(e,t=null,n=[],r=[],i=null,s=null,o=null){return new aU(e,t,n,r,i,s,o)}function aV(e){if(null===e.ue){let t=e.path.canonicalString();null!==e.collectionGroup&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(e=>(function e(t){if(t instanceof aS)return t.field.canonicalString()+t.op.toString()+ac(t.value);if(aC(t)&&ak(t))return t.filters.map(t=>e(t)).join(",");{let n=t.filters.map(t=>e(t)).join(",");return`${t.op}(${n})`}})(e)).join(","),t+="|ob:",t+=e.orderBy.map(e=>e.field.canonicalString()+e.dir).join(","),null==e.limit||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(e=>ac(e)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(e=>ac(e)).join(",")),e.ue=t}return e.ue}function aB(e,t){if(e.limit!==t.limit||e.orderBy.length!==t.orderBy.length)return!1;for(let i=0;i<e.orderBy.length;i++){var n,r;if(n=e.orderBy[i],r=t.orderBy[i],!(n.dir===r.dir&&n.field.isEqual(r.field)))return!1}if(e.filters.length!==t.filters.length)return!1;for(let n=0;n<e.filters.length;n++)if(!function e(t,n){return t instanceof aS?n instanceof aS&&t.op===n.op&&t.field.isEqual(n.field)&&ao(t.value,n.value):t instanceof aA?n instanceof aA&&t.op===n.op&&t.filters.length===n.filters.length&&t.filters.reduce((t,r,i)=>t&&e(r,n.filters[i]),!0):void oT()}(e.filters[n],t.filters[n]))return!1;return e.collectionGroup===t.collectionGroup&&!!e.path.isEqual(t.path)&&!!aI(e.startAt,t.startAt)&&aI(e.endAt,t.endAt)}/**
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
 */class aj{constructor(e,t=null,n=[],r=[],i=null,s="F",o=null,a=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=r,this.limit=i,this.limitType=s,this.startAt=o,this.endAt=a,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function a$(e){return 0===e.filters.length&&null===e.limit&&null==e.startAt&&null==e.endAt&&(0===e.explicitOrderBy.length||1===e.explicitOrderBy.length&&e.explicitOrderBy[0].field.isKeyField())}function aH(e){if(null===e.ce){let t;e.ce=[];let n=new Set;for(let t of e.explicitOrderBy)e.ce.push(t),n.add(t.field.canonicalString());let r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(t=new o2(oH.comparator),e.filters.forEach(e=>{e.getFlattenedFilters().forEach(e=>{e.isInequality()&&(t=t.add(e.field))})}),t).forEach(t=>{n.has(t.canonicalString())||t.isKeyField()||e.ce.push(new a_(t,r))}),n.has(oH.keyField().canonicalString())||e.ce.push(new a_(oH.keyField(),r))}return e.ce}function aq(e){return e.le||(e.le=function(e,t){if("F"===e.limitType)return aF(e.path,e.collectionGroup,t,e.filters,e.limit,e.startAt,e.endAt);{t=t.map(e=>{let t="desc"===e.dir?"asc":"desc";return new a_(e.field,t)});let n=e.endAt?new aE(e.endAt.position,e.endAt.inclusive):null,r=e.startAt?new aE(e.startAt.position,e.startAt.inclusive):null;return aF(e.path,e.collectionGroup,t,e.filters,e.limit,n,r)}}(e,aH(e))),e.le}function az(e,t,n){return new aj(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),t,n,e.startAt,e.endAt)}function aK(e,t){return aB(aq(e),aq(t))&&e.limitType===t.limitType}function aG(e){return`${aV(aq(e))}|lt:${e.limitType}`}function aW(e){var t;let n;return`Query(target=${n=(t=aq(e)).path.canonicalString(),null!==t.collectionGroup&&(n+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(n+=`, filters: [${t.filters.map(e=>(function e(t){return t instanceof aS?`${t.field.canonicalString()} ${t.op} ${ac(t.value)}`:t instanceof aA?t.op.toString()+" {"+t.getFilters().map(e).join(" ,")+"}":"Filter"})(e)).join(", ")}]`),null==t.limit||(n+=", limit: "+t.limit),t.orderBy.length>0&&(n+=`, orderBy: [${t.orderBy.map(e=>`${e.field.canonicalString()} (${e.dir})`).join(", ")}]`),t.startAt&&(n+=", startAt: ",n+=t.startAt.inclusive?"b:":"a:",n+=t.startAt.position.map(e=>ac(e)).join(",")),t.endAt&&(n+=", endAt: ",n+=t.endAt.inclusive?"a:":"b:",n+=t.endAt.position.map(e=>ac(e)).join(",")),`Target(${n})`}; limitType=${e.limitType})`}function aX(e,t){return t.isFoundDocument()&&function(e,t){let n=t.key.path;return null!==e.collectionGroup?t.key.hasCollectionId(e.collectionGroup)&&e.path.isPrefixOf(n):oq.isDocumentKey(e.path)?e.path.isEqual(n):e.path.isImmediateParentOf(n)}(e,t)&&function(e,t){for(let n of aH(e))if(!n.field.isKeyField()&&null===t.data.field(n.field))return!1;return!0}(e,t)&&function(e,t){for(let n of e.filters)if(!n.matches(t))return!1;return!0}(e,t)&&(!e.startAt||!!function(e,t,n){let r=ab(e,t,n);return e.inclusive?r<=0:r<0}(e.startAt,aH(e),t))&&(!e.endAt||!!function(e,t,n){let r=ab(e,t,n);return e.inclusive?r>=0:r>0}(e.endAt,aH(e),t))}/**
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
 */class aY{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){let t=this.mapKeyFn(e),n=this.inner[t];if(void 0!==n){for(let[t,r]of n)if(this.equalsFn(t,e))return r}}has(e){return void 0!==this.get(e)}set(e,t){let n=this.mapKeyFn(e),r=this.inner[n];if(void 0===r)return this.inner[n]=[[e,t]],void this.innerSize++;for(let n=0;n<r.length;n++)if(this.equalsFn(r[n][0],e))return void(r[n]=[e,t]);r.push([e,t]),this.innerSize++}delete(e){let t=this.mapKeyFn(e),n=this.inner[t];if(void 0===n)return!1;for(let r=0;r<n.length;r++)if(this.equalsFn(n[r][0],e))return 1===n.length?delete this.inner[t]:n.splice(r,1),this.innerSize--,!0;return!1}forEach(e){oQ(this.inner,(t,n)=>{for(let[t,r]of n)e(t,r)})}isEmpty(){return function(e){for(let t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}(this.inner)}size(){return this.innerSize}}/**
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
 */const aJ=new oZ(oq.comparator),aQ=new oZ(oq.comparator);function aZ(...e){let t=aQ;for(let n of e)t=t.insert(n.key,n);return t}function a0(){return new aY(e=>e.toString(),(e,t)=>e.isEqual(t))}new oZ(oq.comparator);const a1=new o2(oq.comparator);function a2(...e){let t=a1;for(let n of e)t=t.add(n);return t}const a5=new o2(oM);/**
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
 */class a6{constructor(){this._=void 0}}class a3 extends a6{}class a4 extends a6{constructor(e){super(),this.elements=e}}function a8(e,t){let n=ln(t);for(let t of e.elements)n.some(e=>ao(e,t))||n.push(t);return{arrayValue:{values:n}}}class a7 extends a6{constructor(e){super(),this.elements=e}}function a9(e,t){let n=ln(t);for(let t of e.elements)n=n.filter(e=>!ao(e,t));return{arrayValue:{values:n}}}class le extends a6{constructor(e,t){super(),this.serializer=e,this.Pe=t}}function lt(e){return o9(e.integerValue||e.doubleValue)}function ln(e){return ad(e)&&e.arrayValue.values?e.arrayValue.values.slice():[]}class lr{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new lr}static exists(e){return new lr(void 0,e)}static updateTime(e){return new lr(e)}get isNone(){return void 0===this.updateTime&&void 0===this.exists}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function li(e,t){return void 0!==e.updateTime?t.isFoundDocument()&&t.version.isEqual(e.updateTime):void 0===e.exists||e.exists===t.isFoundDocument()}class ls{}function lo(e,t){if(!e.hasLocalMutations||t&&0===t.fields.length)return null;if(null===t)return e.isNoDocument()?new lp(e.key,lr.none()):new lh(e.key,e.data,lr.none());{let n=e.data,r=av.empty(),i=new o2(oH.comparator);for(let e of t.fields)if(!i.has(e)){let t=n.field(e);null===t&&e.length>1&&(e=e.popLast(),t=n.field(e)),null===t?r.delete(e):r.set(e,t),i=i.add(e)}return new lu(e.key,r,new o6(i.toArray()),lr.none())}}function la(e,t,n,r){return e instanceof lh?function(e,t,n,r){if(!li(e.precondition,t))return n;let i=e.value.clone(),s=ld(e.fieldTransforms,r,t);return i.setAll(s),t.convertToFoundDocument(t.version,i).setHasLocalMutations(),null}(e,t,n,r):e instanceof lu?function(e,t,n,r){if(!li(e.precondition,t))return n;let i=ld(e.fieldTransforms,r,t),s=t.data;return(s.setAll(lc(e)),s.setAll(i),t.convertToFoundDocument(t.version,s).setHasLocalMutations(),null===n)?null:n.unionWith(e.fieldMask.fields).unionWith(e.fieldTransforms.map(e=>e.field))}(e,t,n,r):li(e.precondition,t)?(t.convertToNoDocument(t.version).setHasLocalMutations(),null):n}function ll(e,t){var n,r;return e.type===t.type&&!!e.key.isEqual(t.key)&&!!e.precondition.isEqual(t.precondition)&&(n=e.fieldTransforms,r=t.fieldTransforms,!!(void 0===n&&void 0===r||!(!n||!r)&&oU(n,r,(e,t)=>{var n,r;return e.field.isEqual(t.field)&&(n=e.transform,r=t.transform,n instanceof a4&&r instanceof a4||n instanceof a7&&r instanceof a7?oU(n.elements,r.elements,ao):n instanceof le&&r instanceof le?ao(n.Pe,r.Pe):n instanceof a3&&r instanceof a3)})))&&(0===e.type?e.value.isEqual(t.value):1!==e.type||e.data.isEqual(t.data)&&e.fieldMask.isEqual(t.fieldMask))}class lh extends ls{constructor(e,t,n,r=[]){super(),this.key=e,this.value=t,this.precondition=n,this.fieldTransforms=r,this.type=0}getFieldMask(){return null}}class lu extends ls{constructor(e,t,n,r,i=[]){super(),this.key=e,this.data=t,this.fieldMask=n,this.precondition=r,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function lc(e){let t=new Map;return e.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){let r=e.data.field(n);t.set(n,r)}}),t}function lf(e,t,n){var r;let i=new Map;e.length===n.length||oT();for(let s=0;s<n.length;s++){let o=e[s],a=o.transform,l=t.data.field(o.field);i.set(o.field,(r=n[s],a instanceof a4?a8(a,l):a instanceof a7?a9(a,l):r))}return i}function ld(e,t,n){let r=new Map;for(let i of e){let e=i.transform,s=n.data.field(i.field);r.set(i.field,e instanceof a3?function(e,t){let n={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:e.seconds,nanos:e.nanoseconds}}}};return t&&at(t)&&(t=function e(t){let n=t.mapValue.fields.__previous_value__;return at(n)?e(n):n}(t)),t&&(n.fields.__previous_value__=t),{mapValue:n}}(t,s):e instanceof a4?a8(e,s):e instanceof a7?a9(e,s):function(e,t){var n,r;let i=(n=e,r=t,n instanceof le?af(r)||r&&"doubleValue"in r?r:{integerValue:0}:null),s=lt(i)+lt(e.Pe);return af(i)&&af(e.Pe)?{integerValue:""+s}:/**
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
 */function(e,t){if(e.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:oY(t)?"-0":t}}(e.serializer,s)}(e,s))}return r}class lp extends ls{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class lg{constructor(e,t,n,r){this.batchId=e,this.localWriteTime=t,this.baseMutations=n,this.mutations=r}applyToRemoteDocument(e,t){let n=t.mutationResults;for(let t=0;t<this.mutations.length;t++){let i=this.mutations[t];if(i.key.isEqual(e.key)){var r;r=n[t],i instanceof lh?function(e,t,n){let r=e.value.clone(),i=lf(e.fieldTransforms,t,n.transformResults);r.setAll(i),t.convertToFoundDocument(n.version,r).setHasCommittedMutations()}(i,e,r):i instanceof lu?function(e,t,n){if(!li(e.precondition,t))return void t.convertToUnknownDocument(n.version);let r=lf(e.fieldTransforms,t,n.transformResults),i=t.data;i.setAll(lc(e)),i.setAll(r),t.convertToFoundDocument(n.version,i).setHasCommittedMutations()}(i,e,r):function(e,t,n){t.convertToNoDocument(n.version).setHasCommittedMutations()}(0,e,r)}}}applyToLocalView(e,t){for(let n of this.baseMutations)n.key.isEqual(e.key)&&(t=la(n,e,t,this.localWriteTime));for(let n of this.mutations)n.key.isEqual(e.key)&&(t=la(n,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){let n=a0();return this.mutations.forEach(r=>{let i=e.get(r.key),s=i.overlayedDocument,o=this.applyToLocalView(s,i.mutatedFields),a=lo(s,o=t.has(r.key)?null:o);null!==a&&n.set(r.key,a),s.isValidDocument()||s.convertToNoDocument(oV.min())}),n}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),a2())}isEqual(e){return this.batchId===e.batchId&&oU(this.mutations,e.mutations,(e,t)=>ll(e,t))&&oU(this.baseMutations,e.baseMutations,(e,t)=>ll(e,t))}}/**
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
 */class lm{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return null!==e&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}(x=R||(R={}))[x.OK=0]="OK",x[x.CANCELLED=1]="CANCELLED",x[x.UNKNOWN=2]="UNKNOWN",x[x.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",x[x.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",x[x.NOT_FOUND=5]="NOT_FOUND",x[x.ALREADY_EXISTS=6]="ALREADY_EXISTS",x[x.PERMISSION_DENIED=7]="PERMISSION_DENIED",x[x.UNAUTHENTICATED=16]="UNAUTHENTICATED",x[x.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",x[x.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",x[x.ABORTED=10]="ABORTED",x[x.OUT_OF_RANGE=11]="OUT_OF_RANGE",x[x.UNIMPLEMENTED=12]="UNIMPLEMENTED",x[x.INTERNAL=13]="INTERNAL",x[x.UNAVAILABLE=14]="UNAVAILABLE",x[x.DATA_LOSS=15]="DATA_LOSS",new m([0xffffffff,0xffffffff],0);class ly{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function lv(e){return e||oT(),oV.fromTimestamp(function(e){let t=o7(e);return new oF(t.seconds,t.nanos)}(e))}function lw(e,t){let n=new oj(["projects",e.projectId,"databases",e.database]).child("documents");return void 0===t?n:n.child(t)}function lE(e){return oH.fromServerFormat(e.fieldPath)}/**
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
 */class lb{constructor(e){this.ct=e}}/**
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
 */class lI{constructor(){}It(e,t){this.Tt(e,t),t.Et()}Tt(e,t){if("nullValue"in e)this.dt(t,5);else if("booleanValue"in e)this.dt(t,10),t.At(e.booleanValue?1:0);else if("integerValue"in e)this.dt(t,15),t.At(o9(e.integerValue));else if("doubleValue"in e){let n=o9(e.doubleValue);isNaN(n)?this.dt(t,13):(this.dt(t,15),oY(n)?t.At(0):t.At(n))}else if("timestampValue"in e){let n=e.timestampValue;this.dt(t,20),"string"==typeof n&&(n=o7(n)),t.Rt(`${n.seconds||""}`),t.At(n.nanos||0)}else if("stringValue"in e)this.Vt(e.stringValue,t),this.ft(t);else if("bytesValue"in e)this.dt(t,30),t.gt(ae(e.bytesValue)),this.ft(t);else if("referenceValue"in e)this.yt(e.referenceValue,t);else if("geoPointValue"in e){let n=e.geoPointValue;this.dt(t,45),t.At(n.latitude||0),t.At(n.longitude||0)}else"mapValue"in e?ay(e)?this.dt(t,Number.MAX_SAFE_INTEGER):ag(e)?this.wt(e.mapValue,t):(this.St(e.mapValue,t),this.ft(t)):"arrayValue"in e?(this.bt(e.arrayValue,t),this.ft(t)):oT()}Vt(e,t){this.dt(t,25),this.Dt(e,t)}Dt(e,t){t.Rt(e)}St(e,t){let n=e.fields||{};for(let e of(this.dt(t,55),Object.keys(n)))this.Vt(e,t),this.Tt(n[e],t)}wt(e,t){var n,r;let i=e.fields||{};this.dt(t,53);let s="value",o=(null===(r=null===(n=i[s].arrayValue)||void 0===n?void 0:n.values)||void 0===r?void 0:r.length)||0;this.dt(t,15),t.At(o9(o)),this.Vt(s,t),this.Tt(i[s],t)}bt(e,t){let n=e.values||[];for(let e of(this.dt(t,50),n))this.Tt(e,t)}yt(e,t){this.dt(t,37),oq.fromName(e).path.forEach(e=>{this.dt(t,60),this.Dt(e,t)})}dt(e,t){e.At(t)}ft(e){e.At(2)}}lI.vt=new lI;/**
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
 */class l_{constructor(){this.un=new lT}addToCollectionParentIndex(e,t){return this.un.add(t),oG.resolve()}getCollectionParents(e,t){return oG.resolve(this.un.getEntries(t))}addFieldIndex(e,t){return oG.resolve()}deleteFieldIndex(e,t){return oG.resolve()}deleteAllFieldIndexes(e){return oG.resolve()}createTargetIndexes(e,t){return oG.resolve()}getDocumentsMatchingTarget(e,t){return oG.resolve(null)}getIndexType(e,t){return oG.resolve(0)}getFieldIndexes(e,t){return oG.resolve([])}getNextCollectionGroupToUpdate(e){return oG.resolve(null)}getMinOffset(e,t){return oG.resolve(oz.min())}getMinOffsetFromCollectionGroup(e,t){return oG.resolve(oz.min())}updateCollectionGroup(e,t,n){return oG.resolve()}updateIndexEntries(e,t){return oG.resolve()}}class lT{constructor(){this.index={}}add(e){let t=e.lastSegment(),n=e.popLast(),r=this.index[t]||new o2(oj.comparator),i=!r.has(n);return this.index[t]=r.add(n),i}has(e){let t=e.lastSegment(),n=e.popLast(),r=this.index[t];return r&&r.has(n)}getEntries(e){return(this.index[e]||new o2(oj.comparator)).toArray()}}new Uint8Array(0);class lS{constructor(e,t,n){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=n}static withCacheSize(e){return new lS(e,lS.DEFAULT_COLLECTION_PERCENTILE,lS.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}}/**
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
 */lS.DEFAULT_COLLECTION_PERCENTILE=10,lS.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,lS.DEFAULT=new lS(0x2800000,lS.DEFAULT_COLLECTION_PERCENTILE,lS.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),lS.DISABLED=new lS(-1,0,0);/**
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
 */class lA{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new lA(0)}static kn(){return new lA(-1)}}/**
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
 */class lk{constructor(){this.changes=new aY(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,aw.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();let n=this.changes.get(t);return void 0!==n?oG.resolve(n):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 *//**
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
 */class lC{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
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
 */class lR{constructor(e,t,n,r){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=n,this.indexManager=r}getDocument(e,t){let n=null;return this.documentOverlayCache.getOverlay(e,t).next(r=>(n=r,this.remoteDocumentCache.getEntry(e,t))).next(e=>(null!==n&&la(n.mutation,e,o6.empty(),oF.now()),e))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.getLocalViewOfDocuments(e,t,a2()).next(()=>t))}getLocalViewOfDocuments(e,t,n=a2()){let r=a0();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,n).next(e=>{let t=aZ();return e.forEach((e,n)=>{t=t.insert(e,n.overlayedDocument)}),t}))}getOverlayedDocuments(e,t){let n=a0();return this.populateOverlays(e,n,t).next(()=>this.computeViews(e,t,n,a2()))}populateOverlays(e,t,n){let r=[];return n.forEach(e=>{t.has(e)||r.push(e)}),this.documentOverlayCache.getOverlays(e,r).next(e=>{e.forEach((e,n)=>{t.set(e,n)})})}computeViews(e,t,n,r){let i=aJ,s=a0(),o=a0();return t.forEach((e,t)=>{let o=n.get(t.key);r.has(t.key)&&(void 0===o||o.mutation instanceof lu)?i=i.insert(t.key,t):void 0!==o?(s.set(t.key,o.mutation.getFieldMask()),la(o.mutation,t,o.mutation.getFieldMask(),oF.now())):s.set(t.key,o6.empty())}),this.recalculateAndSaveOverlays(e,i).next(e=>(e.forEach((e,t)=>s.set(e,t)),t.forEach((e,t)=>{var n;return o.set(e,new lC(t,null!==(n=s.get(e))&&void 0!==n?n:null))}),o))}recalculateAndSaveOverlays(e,t){let n=a0(),r=new oZ((e,t)=>e-t),i=a2();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(e=>{for(let i of e)i.keys().forEach(e=>{let s=t.get(e);if(null===s)return;let o=n.get(e)||o6.empty();o=i.applyToLocalView(s,o),n.set(e,o);let a=(r.get(i.batchId)||a2()).add(e);r=r.insert(i.batchId,a)})}).next(()=>{let s=[],o=r.getReverseIterator();for(;o.hasNext();){let r=o.getNext(),a=r.key,l=r.value,h=a0();l.forEach(e=>{if(!i.has(e)){let r=lo(t.get(e),n.get(e));null!==r&&h.set(e,r),i=i.add(e)}}),s.push(this.documentOverlayCache.saveOverlays(e,a,h))}return oG.waitFor(s)}).next(()=>n)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.recalculateAndSaveOverlays(e,t))}getDocumentsMatchingQuery(e,t,n,r){return oq.isDocumentKey(t.path)&&null===t.collectionGroup&&0===t.filters.length?this.getDocumentsMatchingDocumentQuery(e,t.path):null!==t.collectionGroup?this.getDocumentsMatchingCollectionGroupQuery(e,t,n,r):this.getDocumentsMatchingCollectionQuery(e,t,n,r)}getNextDocuments(e,t,n,r){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,n,r).next(i=>{let s=r-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,n.largestBatchId,r-i.size):oG.resolve(a0()),o=-1,a=i;return s.next(t=>oG.forEach(t,(t,n)=>(o<n.largestBatchId&&(o=n.largestBatchId),i.get(t)?oG.resolve():this.remoteDocumentCache.getEntry(e,t).next(e=>{a=a.insert(t,e)}))).next(()=>this.populateOverlays(e,t,i)).next(()=>this.computeViews(e,a,t,a2())).next(e=>{let t;return{batchId:o,changes:(t=aQ,e.forEach((e,n)=>t=t.insert(e,n.overlayedDocument)),t)}}))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new oq(t)).next(e=>{let t=aZ();return e.isFoundDocument()&&(t=t.insert(e.key,e)),t})}getDocumentsMatchingCollectionGroupQuery(e,t,n,r){let i=t.collectionGroup,s=aZ();return this.indexManager.getCollectionParents(e,i).next(o=>oG.forEach(o,o=>{let a=new aj(o.child(i),null,t.explicitOrderBy.slice(),t.filters.slice(),t.limit,t.limitType,t.startAt,t.endAt);return this.getDocumentsMatchingCollectionQuery(e,a,n,r).next(e=>{e.forEach((e,t)=>{s=s.insert(e,t)})})}).next(()=>s))}getDocumentsMatchingCollectionQuery(e,t,n,r){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,n.largestBatchId).next(s=>(i=s,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,n,i,r))).next(e=>{i.forEach((t,n)=>{let r=n.getKey();null===e.get(r)&&(e=e.insert(r,aw.newInvalidDocument(r)))});let n=aZ();return e.forEach((e,r)=>{let s=i.get(e);void 0!==s&&la(s.mutation,r,o6.empty(),oF.now()),aX(t,r)&&(n=n.insert(e,r))}),n})}}/**
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
 */class lx{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,t){return oG.resolve(this.hr.get(t))}saveBundleMetadata(e,t){return this.hr.set(t.id,{id:t.id,version:t.version,createTime:lv(t.createTime)}),oG.resolve()}getNamedQuery(e,t){return oG.resolve(this.Pr.get(t))}saveNamedQuery(e,t){return this.Pr.set(t.name,{name:t.name,query:function(e){let t=function(e){var t;let n,r=function(e){let t=function(e){let t=oj.fromString(e);return t.length>=4&&"projects"===t.get(0)&&"databases"===t.get(2)||oT(),t}(e);return 4===t.length?oj.emptyPath():(t.length>4&&"documents"===t.get(4)||oT(),t.popFirst(5))}(e.parent),i=e.structuredQuery,s=i.from?i.from.length:0,o=null;if(s>0){1===s||oT();let e=i.from[0];e.allDescendants?o=e.collectionId:r=r.child(e.collectionId)}let a=[];i.where&&(a=function(e){var t;let n=function e(t){return void 0!==t.unaryFilter?function(e){switch(e.unaryFilter.op){case"IS_NAN":let t=lE(e.unaryFilter.field);return aS.create(t,"==",{doubleValue:NaN});case"IS_NULL":let n=lE(e.unaryFilter.field);return aS.create(n,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":let r=lE(e.unaryFilter.field);return aS.create(r,"!=",{doubleValue:NaN});case"IS_NOT_NULL":let i=lE(e.unaryFilter.field);return aS.create(i,"!=",{nullValue:"NULL_VALUE"});default:return oT()}}(t):void 0!==t.fieldFilter?aS.create(lE(t.fieldFilter.field),function(e){switch(e){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return oT()}}(t.fieldFilter.op),t.fieldFilter.value):void 0!==t.compositeFilter?aA.create(t.compositeFilter.filters.map(t=>e(t)),function(e){switch(e){case"AND":return"and";case"OR":return"or";default:return oT()}}(t.compositeFilter.op)):oT()}(e);return n instanceof aA&&aC(t=n)&&ak(t)?n.getFilters():[n]}(i.where));let l=[];i.orderBy&&(l=i.orderBy.map(e=>new a_(lE(e.field),function(e){switch(e){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(e.direction))));let h=null;i.limit&&(h=null==(n="object"==typeof(t=i.limit)?t.value:t)?null:n);let u=null;i.startAt&&(u=function(e){let t=!!e.before;return new aE(e.values||[],t)}(i.startAt));let c=null;return i.endAt&&(c=function(e){let t=!e.before;return new aE(e.values||[],t)}(i.endAt)),new aj(r,o,l,a,h,"F",u,c)}({parent:e.parent,structuredQuery:e.structuredQuery});return"LAST"===e.limitType?az(t,t.limit,"L"):t}(t.bundledQuery),readTime:lv(t.readTime)}),oG.resolve()}}/**
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
 */class lO{constructor(){this.overlays=new oZ(oq.comparator),this.Ir=new Map}getOverlay(e,t){return oG.resolve(this.overlays.get(t))}getOverlays(e,t){let n=a0();return oG.forEach(t,t=>this.getOverlay(e,t).next(e=>{null!==e&&n.set(t,e)})).next(()=>n)}saveOverlays(e,t,n){return n.forEach((n,r)=>{this.ht(e,t,r)}),oG.resolve()}removeOverlaysForBatchId(e,t,n){let r=this.Ir.get(n);return void 0!==r&&(r.forEach(e=>this.overlays=this.overlays.remove(e)),this.Ir.delete(n)),oG.resolve()}getOverlaysForCollection(e,t,n){let r=a0(),i=t.length+1,s=new oq(t.child("")),o=this.overlays.getIteratorFrom(s);for(;o.hasNext();){let e=o.getNext().value,s=e.getKey();if(!t.isPrefixOf(s.path))break;s.path.length===i&&e.largestBatchId>n&&r.set(e.getKey(),e)}return oG.resolve(r)}getOverlaysForCollectionGroup(e,t,n,r){let i=new oZ((e,t)=>e-t),s=this.overlays.getIterator();for(;s.hasNext();){let e=s.getNext().value;if(e.getKey().getCollectionGroup()===t&&e.largestBatchId>n){let t=i.get(e.largestBatchId);null===t&&(t=a0(),i=i.insert(e.largestBatchId,t)),t.set(e.getKey(),e)}}let o=a0(),a=i.getIterator();for(;a.hasNext()&&(a.getNext().value.forEach((e,t)=>o.set(e,t)),!(o.size()>=r)););return oG.resolve(o)}ht(e,t,n){let r=this.overlays.get(n.key);if(null!==r){let e=this.Ir.get(r.largestBatchId).delete(n.key);this.Ir.set(r.largestBatchId,e)}this.overlays=this.overlays.insert(n.key,new lm(t,n));let i=this.Ir.get(t);void 0===i&&(i=a2(),this.Ir.set(t,i)),this.Ir.set(t,i.add(n.key))}}/**
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
 */class lN{constructor(){this.sessionToken=o4.EMPTY_BYTE_STRING}getSessionToken(e){return oG.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,oG.resolve()}}/**
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
 */class lP{constructor(){this.Tr=new o2(lD.Er),this.dr=new o2(lD.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,t){let n=new lD(e,t);this.Tr=this.Tr.add(n),this.dr=this.dr.add(n)}Rr(e,t){e.forEach(e=>this.addReference(e,t))}removeReference(e,t){this.Vr(new lD(e,t))}mr(e,t){e.forEach(e=>this.removeReference(e,t))}gr(e){let t=new oq(new oj([])),n=new lD(t,e),r=new lD(t,e+1),i=[];return this.dr.forEachInRange([n,r],e=>{this.Vr(e),i.push(e.key)}),i}pr(){this.Tr.forEach(e=>this.Vr(e))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){let t=new oq(new oj([])),n=new lD(t,e),r=new lD(t,e+1),i=a2();return this.dr.forEachInRange([n,r],e=>{i=i.add(e.key)}),i}containsKey(e){let t=new lD(e,0),n=this.Tr.firstAfterOrEqual(t);return null!==n&&e.isEqual(n.key)}}class lD{constructor(e,t){this.key=e,this.wr=t}static Er(e,t){return oq.comparator(e.key,t.key)||oM(e.wr,t.wr)}static Ar(e,t){return oM(e.wr,t.wr)||oq.comparator(e.key,t.key)}}/**
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
 */class lL{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Sr=1,this.br=new o2(lD.Er)}checkEmpty(e){return oG.resolve(0===this.mutationQueue.length)}addMutationBatch(e,t,n,r){let i=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];let s=new lg(i,t,n,r);for(let t of(this.mutationQueue.push(s),r))this.br=this.br.add(new lD(t.key,i)),this.indexManager.addToCollectionParentIndex(e,t.key.path.popLast());return oG.resolve(s)}lookupMutationBatch(e,t){return oG.resolve(this.Dr(t))}getNextMutationBatchAfterBatchId(e,t){let n=this.vr(t+1),r=n<0?0:n;return oG.resolve(this.mutationQueue.length>r?this.mutationQueue[r]:null)}getHighestUnacknowledgedBatchId(){return oG.resolve(0===this.mutationQueue.length?-1:this.Sr-1)}getAllMutationBatches(e){return oG.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){let n=new lD(t,0),r=new lD(t,Number.POSITIVE_INFINITY),i=[];return this.br.forEachInRange([n,r],e=>{let t=this.Dr(e.wr);i.push(t)}),oG.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new o2(oM);return t.forEach(e=>{let t=new lD(e,0),r=new lD(e,Number.POSITIVE_INFINITY);this.br.forEachInRange([t,r],e=>{n=n.add(e.wr)})}),oG.resolve(this.Cr(n))}getAllMutationBatchesAffectingQuery(e,t){let n=t.path,r=n.length+1,i=n;oq.isDocumentKey(i)||(i=i.child(""));let s=new lD(new oq(i),0),o=new o2(oM);return this.br.forEachWhile(e=>{let t=e.key.path;return!!n.isPrefixOf(t)&&(t.length===r&&(o=o.add(e.wr)),!0)},s),oG.resolve(this.Cr(o))}Cr(e){let t=[];return e.forEach(e=>{let n=this.Dr(e);null!==n&&t.push(n)}),t}removeMutationBatch(e,t){0===this.Fr(t.batchId,"removed")||oT(),this.mutationQueue.shift();let n=this.br;return oG.forEach(t.mutations,r=>{let i=new lD(r.key,t.batchId);return n=n.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,r.key)}).next(()=>{this.br=n})}On(e){}containsKey(e,t){let n=new lD(t,0),r=this.br.firstAfterOrEqual(n);return oG.resolve(t.isEqual(r&&r.key))}performConsistencyCheck(e){return this.mutationQueue.length,oG.resolve()}Fr(e,t){return this.vr(e)}vr(e){return 0===this.mutationQueue.length?0:e-this.mutationQueue[0].batchId}Dr(e){let t=this.vr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
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
 */class lM{constructor(e){this.Mr=e,this.docs=new oZ(oq.comparator),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){let n=t.key,r=this.docs.get(n),i=r?r.size:0,s=this.Mr(t);return this.docs=this.docs.insert(n,{document:t.mutableCopy(),size:s}),this.size+=s-i,this.indexManager.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){let t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){let n=this.docs.get(t);return oG.resolve(n?n.document.mutableCopy():aw.newInvalidDocument(t))}getEntries(e,t){let n=aJ;return t.forEach(e=>{let t=this.docs.get(e);n=n.insert(e,t?t.document.mutableCopy():aw.newInvalidDocument(e))}),oG.resolve(n)}getDocumentsMatchingQuery(e,t,n,r){let i=aJ,s=t.path,o=new oq(s.child("")),a=this.docs.getIteratorFrom(o);for(;a.hasNext();){let{key:e,value:{document:o}}=a.getNext();if(!s.isPrefixOf(e.path))break;e.path.length>s.length+1||0>=function(e,t){let n=e.readTime.compareTo(t.readTime);return 0!==n?n:0!==(n=oq.comparator(e.documentKey,t.documentKey))?n:oM(e.largestBatchId,t.largestBatchId)}(new oz(o.readTime,o.key,-1),n)||(r.has(o.key)||aX(t,o))&&(i=i.insert(o.key,o.mutableCopy()))}return oG.resolve(i)}getAllFromCollectionGroup(e,t,n,r){oT()}Or(e,t){return oG.forEach(this.docs,e=>t(e))}newChangeBuffer(e){return new lU(this)}getSize(e){return oG.resolve(this.size)}}class lU extends lk{constructor(e){super(),this.cr=e}applyChanges(e){let t=[];return this.changes.forEach((n,r)=>{r.isValidDocument()?t.push(this.cr.addEntry(e,r)):this.cr.removeEntry(n)}),oG.waitFor(t)}getFromCache(e,t){return this.cr.getEntry(e,t)}getAllFromCache(e,t){return this.cr.getEntries(e,t)}}/**
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
 */class lF{constructor(e){this.persistence=e,this.Nr=new aY(e=>aV(e),aB),this.lastRemoteSnapshotVersion=oV.min(),this.highestTargetId=0,this.Lr=0,this.Br=new lP,this.targetCount=0,this.kr=lA.Bn()}forEachTarget(e,t){return this.Nr.forEach((e,n)=>t(n)),oG.resolve()}getLastRemoteSnapshotVersion(e){return oG.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return oG.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),oG.resolve(this.highestTargetId)}setTargetsMetadata(e,t,n){return n&&(this.lastRemoteSnapshotVersion=n),t>this.Lr&&(this.Lr=t),oG.resolve()}Kn(e){this.Nr.set(e.target,e);let t=e.targetId;t>this.highestTargetId&&(this.kr=new lA(t),this.highestTargetId=t),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,t){return this.Kn(t),this.targetCount+=1,oG.resolve()}updateTargetData(e,t){return this.Kn(t),oG.resolve()}removeTargetData(e,t){return this.Nr.delete(t.target),this.Br.gr(t.targetId),this.targetCount-=1,oG.resolve()}removeTargets(e,t,n){let r=0,i=[];return this.Nr.forEach((s,o)=>{o.sequenceNumber<=t&&null===n.get(o.targetId)&&(this.Nr.delete(s),i.push(this.removeMatchingKeysForTargetId(e,o.targetId)),r++)}),oG.waitFor(i).next(()=>r)}getTargetCount(e){return oG.resolve(this.targetCount)}getTargetData(e,t){let n=this.Nr.get(t)||null;return oG.resolve(n)}addMatchingKeys(e,t,n){return this.Br.Rr(t,n),oG.resolve()}removeMatchingKeys(e,t,n){this.Br.mr(t,n);let r=this.persistence.referenceDelegate,i=[];return r&&t.forEach(t=>{i.push(r.markPotentiallyOrphaned(e,t))}),oG.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.Br.gr(t),oG.resolve()}getMatchingKeysForTargetId(e,t){let n=this.Br.yr(t);return oG.resolve(n)}containsKey(e,t){return oG.resolve(this.Br.containsKey(t))}}/**
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
 */class lV{constructor(e,t){this.qr={},this.overlays={},this.Qr=new oX(0),this.Kr=!1,this.Kr=!0,this.$r=new lN,this.referenceDelegate=e(this),this.Ur=new lF(this),this.indexManager=new l_,this.remoteDocumentCache=new lM(e=>this.referenceDelegate.Wr(e)),this.serializer=new lb(t),this.Gr=new lx(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new lO,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let n=this.qr[e.toKey()];return n||(n=new lL(t,this.referenceDelegate),this.qr[e.toKey()]=n),n}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,t,n){oE("MemoryPersistence","Starting transaction:",e);let r=new lB(this.Qr.next());return this.referenceDelegate.zr(),n(r).next(e=>this.referenceDelegate.jr(r).next(()=>e)).toPromise().then(e=>(r.raiseOnCommittedEvent(),e))}Hr(e,t){return oG.or(Object.values(this.qr).map(n=>()=>n.containsKey(e,t)))}}class lB extends oK{constructor(e){super(),this.currentSequenceNumber=e}}class lj{constructor(e){this.persistence=e,this.Jr=new lP,this.Yr=null}static Zr(e){return new lj(e)}get Xr(){if(this.Yr)return this.Yr;throw oT()}addReference(e,t,n){return this.Jr.addReference(n,t),this.Xr.delete(n.toString()),oG.resolve()}removeReference(e,t,n){return this.Jr.removeReference(n,t),this.Xr.add(n.toString()),oG.resolve()}markPotentiallyOrphaned(e,t){return this.Xr.add(t.toString()),oG.resolve()}removeTarget(e,t){this.Jr.gr(t.targetId).forEach(e=>this.Xr.add(e.toString()));let n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,t.targetId).next(e=>{e.forEach(e=>this.Xr.add(e.toString()))}).next(()=>n.removeTargetData(e,t))}zr(){this.Yr=new Set}jr(e){let t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return oG.forEach(this.Xr,n=>{let r=oq.fromPath(n);return this.ei(e,r).next(e=>{e||t.removeEntry(r,oV.min())})}).next(()=>(this.Yr=null,t.apply(e)))}updateLimboDocument(e,t){return this.ei(e,t).next(e=>{e?this.Xr.delete(t.toString()):this.Xr.add(t.toString())})}Wr(e){return 0}ei(e,t){return oG.or([()=>oG.resolve(this.Jr.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Hr(e,t)])}}/**
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
 */class l${constructor(e,t,n,r){this.targetId=e,this.fromCache=t,this.$i=n,this.Ui=r}static Wi(e,t){let n=a2(),r=a2();for(let e of t.docChanges)switch(e.type){case 0:n=n.add(e.doc.key);break;case 1:r=r.add(e.doc.key)}return new l$(e,t.fromCache,n,r)}}/**
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
 */class lH{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class lq{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=!function(){var e;let t=null===(e=eP())||void 0===e?void 0:e.forceEnvironment;if("node"===t)return!0;if("browser"===t)return!1;try{return"[object process]"===Object.prototype.toString.call(L.process)}catch(e){return!1}}()&&navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")?8:function(e){let t=e.match(/Android ([\d.]+)/i);return Number(t?t[1].split(".").slice(0,2).join("."):"-1")}(eB())>0?6:4}initialize(e,t){this.Ji=e,this.indexManager=t,this.Gi=!0}getDocumentsMatchingQuery(e,t,n,r){let i={result:null};return this.Yi(e,t).next(e=>{i.result=e}).next(()=>{if(!i.result)return this.Zi(e,t,r,n).next(e=>{i.result=e})}).next(()=>{if(i.result)return;let n=new lH;return this.Xi(e,t,n).next(r=>{if(i.result=r,this.zi)return this.es(e,t,n,r.size)})}).next(()=>i.result)}es(e,t,n,r){return n.documentReadCount<this.ji?(ow()<=g.DEBUG&&oE("QueryEngine","SDK will not create cache indexes for query:",aW(t),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),oG.resolve()):(ow()<=g.DEBUG&&oE("QueryEngine","Query:",aW(t),"scans",n.documentReadCount,"local documents and returns",r,"documents as results."),n.documentReadCount>this.Hi*r?(ow()<=g.DEBUG&&oE("QueryEngine","The SDK decides to create cache indexes for query:",aW(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,aq(t))):oG.resolve())}Yi(e,t){if(a$(t))return oG.resolve(null);let n=aq(t);return this.indexManager.getIndexType(e,n).next(r=>0===r?null:(null!==t.limit&&1===r&&(n=aq(t=az(t,null,"F"))),this.indexManager.getDocumentsMatchingTarget(e,n).next(r=>{let i=a2(...r);return this.Ji.getDocuments(e,i).next(r=>this.indexManager.getMinOffset(e,n).next(n=>{let s=this.ts(t,r);return this.ns(t,s,i,n.readTime)?this.Yi(e,az(t,null,"F")):this.rs(e,s,t,n)}))})))}Zi(e,t,n,r){return a$(t)||r.isEqual(oV.min())?oG.resolve(null):this.Ji.getDocuments(e,n).next(i=>{let s=this.ts(t,i);return this.ns(t,s,n,r)?oG.resolve(null):(ow()<=g.DEBUG&&oE("QueryEngine","Re-using previous result from %s to execute query: %s",r.toString(),aW(t)),this.rs(e,s,t,function(e,t){let n=e.toTimestamp().seconds,r=e.toTimestamp().nanoseconds+1;return new oz(oV.fromTimestamp(1e9===r?new oF(n+1,0):new oF(n,r)),oq.empty(),-1)}(r,0)).next(e=>e))})}ts(e,t){let n=new o2((t,n)=>{let r=!1;for(let i of aH(e)){let e=function(e,t,n){let r=e.field.isKeyField()?oq.comparator(t.key,n.key):function(e,t,n){let r=t.data.field(e),i=n.data.field(e);return null!==r&&null!==i?al(r,i):oT()}(e.field,t,n);switch(e.dir){case"asc":return r;case"desc":return -1*r;default:return oT()}}(i,t,n);if(0!==e)return e;r=r||i.field.isKeyField()}return 0});return t.forEach((t,r)=>{aX(e,r)&&(n=n.add(r))}),n}ns(e,t,n,r){if(null===e.limit)return!1;if(n.size!==t.size)return!0;let i="F"===e.limitType?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(r)>0)}Xi(e,t,n){return ow()<=g.DEBUG&&oE("QueryEngine","Using full collection scan to execute query:",aW(t)),this.Ji.getDocumentsMatchingQuery(e,t,oz.min(),n)}rs(e,t,n,r){return this.Ji.getDocumentsMatchingQuery(e,n,r).next(e=>(t.forEach(t=>{e=e.insert(t.key,t)}),e))}}/**
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
 */class lz{constructor(e,t,n,r){this.persistence=e,this.ss=t,this.serializer=r,this.os=new oZ(oM),this._s=new aY(e=>aV(e),aB),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(n)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new lR(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.os))}}async function lK(e,t){return await e.persistence.runTransaction("Handle user change","readonly",n=>{let r;return e.mutationQueue.getAllMutationBatches(n).next(i=>(r=i,e.ls(t),e.mutationQueue.getAllMutationBatches(n))).next(t=>{let i=[],s=[],o=a2();for(let e of r)for(let t of(i.push(e.batchId),e.mutations))o=o.add(t.key);for(let e of t)for(let t of(s.push(e.batchId),e.mutations))o=o.add(t.key);return e.localDocuments.getDocuments(n,o).next(e=>({hs:e,removedBatchIds:i,addedBatchIds:s}))})})}class lG{constructor(){this.activeTargetIds=a5}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){return JSON.stringify({activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()})}}class lW{constructor(){this.so=new lG,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,n){}addLocalQueryTarget(e,t=!0){return t&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,t,n){this.oo[e]=t}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new lG,Promise.resolve()}handleUserChange(e,t,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class lX{_o(e){}shutdown(){}}/**
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
 */class lY{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){for(let e of(oE("ConnectivityMonitor","Network connectivity changed: AVAILABLE"),this.ho))e(0)}lo(){for(let e of(oE("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE"),this.ho))e(1)}static D(){return"undefined"!=typeof window&&void 0!==window.addEventListener&&void 0!==window.removeEventListener}}/**
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
 */let lJ=null;function lQ(){return null===lJ?lJ=0x10000000+Math.round(0x80000000*Math.random()):lJ++,"0x"+lJ.toString(16)}/**
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
 */const lZ={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
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
 */class l0{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
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
 */const l1="WebChannelConnection";class l2 extends class{constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;let t=e.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),r=encodeURIComponent(this.databaseId.database);this.Do=t+"://"+e.host,this.vo=`projects/${n}/databases/${r}`,this.Co="(default)"===this.databaseId.database?`project_id=${n}`:`project_id=${n}&database_id=${r}`}get Fo(){return!1}Mo(e,t,n,r,i){let s=lQ(),o=this.xo(e,t.toUriEncodedString());oE("RestConnection",`Sending RPC '${e}' ${s}:`,o,n);let a={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(a,r,i),this.No(e,o,a,n).then(t=>(oE("RestConnection",`Received RPC '${e}' ${s}: `,t),t),t=>{throw oI("RestConnection",`RPC '${e}' ${s} failed with error: `,t,"url: ",o,"request:",n),t})}Lo(e,t,n,r,i,s){return this.Mo(e,t,n,r,i)}Oo(e,t,n){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+oy}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((t,n)=>e[n]=t),n&&n.headers.forEach((t,n)=>e[n]=t)}xo(e,t){let n=lZ[e];return`${this.Do}/v1/${t}:${n}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,t,n,r){let i=lQ();return new Promise((s,o)=>{let a=new y;a.setWithCredentials(!0),a.listenOnce(w.COMPLETE,()=>{try{switch(a.getLastErrorCode()){case E.NO_ERROR:let t=a.getResponseJson();oE(l1,`XHR for RPC '${e}' ${i} received:`,JSON.stringify(t)),s(t);break;case E.TIMEOUT:oE(l1,`RPC '${e}' ${i} timed out`),o(new oA(oS.DEADLINE_EXCEEDED,"Request time out"));break;case E.HTTP_ERROR:let n=a.getStatus();if(oE(l1,`RPC '${e}' ${i} failed with status:`,n,"response text:",a.getResponseText()),n>0){let e=a.getResponseJson();Array.isArray(e)&&(e=e[0]);let t=null==e?void 0:e.error;if(t&&t.status&&t.message){let e=function(e){let t=e.toLowerCase().replace(/_/g,"-");return Object.values(oS).indexOf(t)>=0?t:oS.UNKNOWN}(t.status);o(new oA(e,t.message))}else o(new oA(oS.UNKNOWN,"Server responded with status "+a.getStatus()))}else o(new oA(oS.UNAVAILABLE,"Connection failed."));break;default:oT()}}finally{oE(l1,`RPC '${e}' ${i} completed.`)}});let l=JSON.stringify(r);oE(l1,`RPC '${e}' ${i} sending request:`,r),a.send(t,"POST",l,n,15)})}Bo(e,t,n){let r=lQ(),i=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],s=T(),o=_(),a={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},l=this.longPollingOptions.timeoutSeconds;void 0!==l&&(a.longPollingTimeout=Math.round(1e3*l)),this.useFetchStreams&&(a.useFetchStreams=!0),this.Oo(a.initMessageHeaders,t,n),a.encodeInitMessageHeaders=!0;let h=i.join("");oE(l1,`Creating RPC '${e}' stream ${r}: ${h}`,a);let u=s.createWebChannel(h,a),c=!1,f=!1,d=new l0({Io:t=>{f?oE(l1,`Not sending because RPC '${e}' stream ${r} is closed:`,t):(c||(oE(l1,`Opening RPC '${e}' stream ${r} transport.`),u.open(),c=!0),oE(l1,`RPC '${e}' stream ${r} sending:`,t),u.send(t))},To:()=>u.close()}),p=(e,t,n)=>{e.listen(t,e=>{try{n(e)}catch(e){setTimeout(()=>{throw e},0)}})};return p(u,v.EventType.OPEN,()=>{f||(oE(l1,`RPC '${e}' stream ${r} transport opened.`),d.yo())}),p(u,v.EventType.CLOSE,()=>{f||(f=!0,oE(l1,`RPC '${e}' stream ${r} transport closed`),d.So())}),p(u,v.EventType.ERROR,t=>{f||(f=!0,oI(l1,`RPC '${e}' stream ${r} transport errored:`,t),d.So(new oA(oS.UNAVAILABLE,"The operation could not be completed")))}),p(u,v.EventType.MESSAGE,t=>{var n;if(!f){let i=t.data[0];i||oT();let s=i.error||(null===(n=i[0])||void 0===n?void 0:n.error);if(s){oE(l1,`RPC '${e}' stream ${r} received error:`,s);let t=s.status,n=function(e){let t=R[e];if(void 0!==t)return function(e){if(void 0===e)return ob("GRPC error has no .code"),oS.UNKNOWN;switch(e){case R.OK:return oS.OK;case R.CANCELLED:return oS.CANCELLED;case R.UNKNOWN:return oS.UNKNOWN;case R.DEADLINE_EXCEEDED:return oS.DEADLINE_EXCEEDED;case R.RESOURCE_EXHAUSTED:return oS.RESOURCE_EXHAUSTED;case R.INTERNAL:return oS.INTERNAL;case R.UNAVAILABLE:return oS.UNAVAILABLE;case R.UNAUTHENTICATED:return oS.UNAUTHENTICATED;case R.INVALID_ARGUMENT:return oS.INVALID_ARGUMENT;case R.NOT_FOUND:return oS.NOT_FOUND;case R.ALREADY_EXISTS:return oS.ALREADY_EXISTS;case R.PERMISSION_DENIED:return oS.PERMISSION_DENIED;case R.FAILED_PRECONDITION:return oS.FAILED_PRECONDITION;case R.ABORTED:return oS.ABORTED;case R.OUT_OF_RANGE:return oS.OUT_OF_RANGE;case R.UNIMPLEMENTED:return oS.UNIMPLEMENTED;case R.DATA_LOSS:return oS.DATA_LOSS;default:return oT()}}(t)}(t),i=s.message;void 0===n&&(n=oS.INTERNAL,i="Unknown error status: "+t+" with message "+s.message),f=!0,d.So(new oA(n,i)),u.close()}else oE(l1,`RPC '${e}' stream ${r} received:`,i),d.bo(i)}}),p(o,I.STAT_EVENT,t=>{t.stat===b.PROXY?oE(l1,`RPC '${e}' stream ${r} detected buffering proxy`):t.stat===b.NOPROXY&&oE(l1,`RPC '${e}' stream ${r} detected no buffering proxy`)}),setTimeout(()=>{d.wo()},0),d}}function l5(){return"undefined"!=typeof document?document:null}/**
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
 */class l6{constructor(e,t,n=1e3,r=1.5,i=6e4){this.ui=e,this.timerId=t,this.ko=n,this.qo=r,this.Qo=i,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();let t=Math.floor(this.Ko+this.zo()),n=Math.max(0,Date.now()-this.Uo),r=Math.max(0,t-n);r>0&&oE("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.Ko} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,r,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){null!==this.$o&&(this.$o.skipDelay(),this.$o=null)}cancel(){null!==this.$o&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
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
 */class l3 extends class{}{constructor(e,t,n,r){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=n,this.serializer=r,this.y_=!1}w_(){if(this.y_)throw new oA(oS.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,t,n,r){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,s])=>this.connection.Mo(e,lw(t,n),r,i,s)).catch(e=>{throw"FirebaseError"===e.name?(e.code===oS.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new oA(oS.UNKNOWN,e.toString())})}Lo(e,t,n,r,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,o])=>this.connection.Lo(e,lw(t,n),r,s,o,i)).catch(e=>{throw"FirebaseError"===e.name?(e.code===oS.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new oA(oS.UNKNOWN,e.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class l4{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){0===this.S_&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(e){"Online"===this.state?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,"Online"===e&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){let t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(ob(t),this.D_=!1):oE("OnlineStateTracker",t)}x_(){null!==this.b_&&(this.b_.cancel(),this.b_=null)}}/**
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
 */class l8{constructor(e,t,n,r,i){this.localStore=e,this.datastore=t,this.asyncQueue=n,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=i,this.k_._o(e=>{n.enqueueAndForget(async()=>{he(this)&&(oE("RemoteStore","Restarting streams for network reachability change."),await async function(e){e.L_.add(4),await l9(e),e.q_.set("Unknown"),e.L_.delete(4),await l7(e)}(this))})}),this.q_=new l4(n,r)}}async function l7(e){if(he(e))for(let t of e.B_)await t(!0)}async function l9(e){for(let t of e.B_)await t(!1)}function he(e){return 0===e.L_.size}async function ht(e,t){t?(e.L_.delete(2),await l7(e)):t||(e.L_.add(2),await l9(e),e.q_.set("Unknown"))}/**
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
 */class hn{constructor(e,t,n,r,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=r,this.removalCallback=i,this.deferred=new ok,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(e=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,n,r,i){let s=new hn(e,t,Date.now()+n,r,i);return s.start(n),s}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new oA(oS.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}class hr{constructor(){this.queries=hi(),this.onlineState="Unknown",this.Y_=new Set}terminate(){!function(e,t){let n=e.queries;e.queries=hi(),n.forEach((e,n)=>{for(let e of n.j_)e.onError(t)})}(this,new oA(oS.ABORTED,"Firestore shutting down"))}}function hi(){return new aY(e=>aG(e),aK)}(N=O||(O={})).ea="default",N.Cache="cache";class hs{constructor(e,t,n,r,i,s){this.localStore=e,this.remoteStore=t,this.eventManager=n,this.sharedClientState=r,this.currentUser=i,this.maxConcurrentLimboResolutions=s,this.Ca={},this.Fa=new aY(e=>aG(e),aK),this.Ma=new Map,this.xa=new Set,this.Oa=new oZ(oq.comparator),this.Na=new Map,this.La=new lP,this.Ba={},this.ka=new Map,this.qa=lA.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return!0===this.Qa}}function ho(e,t,n){var r;if(e.isPrimaryClient&&0===n||!e.isPrimaryClient&&1===n){let n;let i=[];e.Fa.forEach((e,n)=>{let r=n.view.Z_(t);r.snapshot&&i.push(r.snapshot)}),(r=e.eventManager).onlineState=t,n=!1,r.queries.forEach((e,r)=>{for(let e of r.j_)e.Z_(t)&&(n=!0)}),n&&function(e){e.Y_.forEach(e=>{e.next()})}(r),i.length&&e.Ca.d_(i),e.onlineState=t,e.isPrimaryClient&&e.sharedClientState.setOnlineState(t)}}async function ha(e,t,n){let r=[],i=[],s=[];e.Fa.isEmpty()||(e.Fa.forEach((o,a)=>{s.push(e.Ka(a,t,n).then(t=>{var s;if((t||n)&&e.isPrimaryClient){let r=t?!t.fromCache:null===(s=null==n?void 0:n.targetChanges.get(a.targetId))||void 0===s?void 0:s.current;e.sharedClientState.updateQueryState(a.targetId,r?"current":"not-current")}if(t){r.push(t);let e=l$.Wi(a.targetId,t);i.push(e)}}))}),await Promise.all(s),e.Ca.d_(r),await async function(e,t){try{await e.persistence.runTransaction("notifyLocalViewChanges","readwrite",n=>oG.forEach(t,t=>oG.forEach(t.$i,r=>e.persistence.referenceDelegate.addReference(n,t.targetId,r)).next(()=>oG.forEach(t.Ui,r=>e.persistence.referenceDelegate.removeReference(n,t.targetId,r)))))}catch(e){if(!oW(e))throw e;oE("LocalStore","Failed to update sequence numbers: "+e)}for(let n of t){let t=n.targetId;if(!n.fromCache){let n=e.os.get(t),r=n.snapshotVersion,i=n.withLastLimboFreeSnapshotVersion(r);e.os=e.os.insert(t,i)}}}(e.localStore,i))}async function hl(e,t){var n;if(!e.currentUser.isEqual(t)){oE("SyncEngine","User change. New user:",t.toKey());let r=await lK(e.localStore,t);e.currentUser=t,n="'waitForPendingWrites' promise is rejected due to a user change.",e.ka.forEach(e=>{e.forEach(e=>{e.reject(new oA(oS.CANCELLED,n))})}),e.ka.clear(),e.sharedClientState.handleUserChange(t,r.removedBatchIds,r.addedBatchIds),await ha(e,r.hs)}}class hh{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=new ly(e.databaseInfo.databaseId,!0),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,t){return null}Ha(e,t){return null}za(e){var t;return t=this.persistence,new lz(t,new lq,e.initialUser,this.serializer)}Ga(e){return new lV(lj.Zr,this.serializer)}Wa(e){return new lW}async terminate(){var e,t;null===(e=this.gcScheduler)||void 0===e||e.stop(),null===(t=this.indexBackfillerScheduler)||void 0===t||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}hh.provider={build:()=>new hh};class hu{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=e=>ho(this.syncEngine,e,1),this.remoteStore.remoteSyncer.handleCredentialChange=hl.bind(null,this.syncEngine),await ht(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return new hr}createDatastore(e){let t=new ly(e.databaseInfo.databaseId,!0),n=new l2(e.databaseInfo);return new l3(e.authCredentials,e.appCheckCredentials,n,t)}createRemoteStore(e){var t;return t=this.localStore,new l8(t,this.datastore,e.asyncQueue,e=>ho(this.syncEngine,e,0),lY.D()?new lY:new lX)}createSyncEngine(e,t){return function(e,t,n,r,i,s,o){let a=new hs(e,t,n,r,i,s);return o&&(a.Qa=!0),a}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(e){oE("RemoteStore","RemoteStore shutting down."),e.L_.add(5),await l9(e),e.k_.shutdown(),e.q_.set("Unknown")}(this.remoteStore),null===(e=this.datastore)||void 0===e||e.terminate(),null===(t=this.eventManager)||void 0===t||t.terminate()}}hu.provider={build:()=>new hu};/**
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
 */const hc=new Map;/**
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
 */class hf{constructor(e){var t,n;if(void 0===e.host){if(void 0!==e.ssl)throw new oA(oS.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=null===(t=e.ssl)||void 0===t||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,void 0===e.cacheSizeBytes)this.cacheSizeBytes=0x2800000;else{if(-1!==e.cacheSizeBytes&&e.cacheSizeBytes<1048576)throw new oA(oS.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}(function(e,t,n,r){if(!0===t&&!0===r)throw new oA(oS.INVALID_ARGUMENT,`${e} and ${n} cannot be used together.`)})("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:void 0===e.experimentalAutoDetectLongPolling?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=/**
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
 */function(e){let t={};return void 0!==e.timeoutSeconds&&(t.timeoutSeconds=e.timeoutSeconds),t}(null!==(n=e.experimentalLongPollingOptions)&&void 0!==n?n:{}),function(e){if(void 0!==e.timeoutSeconds){if(isNaN(e.timeoutSeconds))throw new oA(oS.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (must not be NaN)`);if(e.timeoutSeconds<5)throw new oA(oS.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (minimum allowed value is 5)`);if(e.timeoutSeconds>30)throw new oA(oS.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){var t,n;return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(t=this.experimentalLongPollingOptions,n=e.experimentalLongPollingOptions,t.timeoutSeconds===n.timeoutSeconds)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class hd{constructor(e,t,n,r){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=n,this._app=r,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new hf({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new oA(oS.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return"notTerminated"!==this._terminateTask}_setSettings(e){if(this._settingsFrozen)throw new oA(oS.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new hf(e),void 0!==e.credentials&&(this._authCredentials=function(e){if(!e)return new oR;switch(e.type){case"firstParty":return new oP(e.sessionIndex||"0",e.iamToken||null,e.authTokenFactory||null);case"provider":return e.client;default:throw new oA(oS.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return"notTerminated"===this._terminateTask&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){"notTerminated"===this._terminateTask?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){let t=hc.get(e);t&&(oE("ComponentProvider","Removing Datastore"),hc.delete(e),t.terminate())}(this),Promise.resolve()}}/**
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
 */class hp{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new l6(this,"async_queue_retry"),this.Vu=()=>{let e=l5();e&&oE("AsyncQueue","Visibility state changed to "+e.visibilityState),this.t_.jo()},this.mu=e;let t=l5();t&&"function"==typeof t.addEventListener&&t.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;let t=l5();t&&"function"==typeof t.removeEventListener&&t.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});let t=new ok;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(0!==this.Pu.length){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!oW(e))throw e;oE("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){let t=this.mu.then(()=>(this.du=!0,e().catch(e=>{let t;throw this.Eu=e,this.du=!1,ob("INTERNAL UNHANDLED ERROR: ",(t=e.message||"",e.stack&&(t=e.stack.includes(e.message)?e.stack:e.message+"\n"+e.stack),t)),e}).then(e=>(this.du=!1,e))));return this.mu=t,t}enqueueAfterDelay(e,t,n){this.fu(),this.Ru.indexOf(e)>-1&&(t=0);let r=hn.createAndSchedule(this,e,t,n,e=>this.yu(e));return this.Tu.push(r),r}fu(){this.Eu&&oT()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(let t of this.Tu)if(t.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{for(let t of(this.Tu.sort((e,t)=>e.targetTimeMs-t.targetTimeMs),this.Tu))if(t.skipDelay(),"all"!==e&&t.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){let t=this.Tu.indexOf(e);this.Tu.splice(t,1)}}class hg extends hd{constructor(e,t,n,r){super(e,t,n,r),this.type="firestore",this._queue=new hp,this._persistenceKey=(null==r?void 0:r.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){let e=this._firestoreClient.terminate();this._queue=new hp(e),this._firestoreClient=void 0,await e}}}RegExp("[~\\*/\\[\\]]"),new WeakMap,function(e=!0){oy=tO,tA(new e2("firestore",(t,{instanceIdentifier:n,options:r})=>{let i=t.getProvider("app").getImmediate(),s=new hg(new oO(t.getProvider("auth-internal")),new oL(t.getProvider("app-check-internal")),function(e,t){if(!Object.prototype.hasOwnProperty.apply(e.options,["projectId"]))throw new oA(oS.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new ar(e.options.projectId,t)}(i,n),i);return r=Object.assign({useFetchStreams:e},r),s._setSettings(r),s},"PUBLIC").setMultipleInstances(!0)),tD(og,"4.7.4",void 0),tD(og,"4.7.4","esm2017")}();/**
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
 */const hm="firebasestorage.googleapis.com",hy="storageBucket";/**
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
 */class hv extends eq{constructor(e,t,n=0){super(hw(e),`Firebase Storage: ${t} (${hw(e)})`),this.status_=n,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,hv.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return hw(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}function hw(e){return"storage/"+e}function hE(){return new hv(P.UNKNOWN,"An unknown error occurred, please check the error payload for server response.")}function hb(e){return new hv(P.INVALID_ARGUMENT,e)}function hI(){return new hv(P.APP_DELETED,"The Firebase app was deleted.")}function h_(e){throw new hv(P.INTERNAL_ERROR,"Internal error: "+e)}(u=P||(P={})).UNKNOWN="unknown",u.OBJECT_NOT_FOUND="object-not-found",u.BUCKET_NOT_FOUND="bucket-not-found",u.PROJECT_NOT_FOUND="project-not-found",u.QUOTA_EXCEEDED="quota-exceeded",u.UNAUTHENTICATED="unauthenticated",u.UNAUTHORIZED="unauthorized",u.UNAUTHORIZED_APP="unauthorized-app",u.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",u.INVALID_CHECKSUM="invalid-checksum",u.CANCELED="canceled",u.INVALID_EVENT_NAME="invalid-event-name",u.INVALID_URL="invalid-url",u.INVALID_DEFAULT_BUCKET="invalid-default-bucket",u.NO_DEFAULT_BUCKET="no-default-bucket",u.CANNOT_SLICE_BLOB="cannot-slice-blob",u.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",u.NO_DOWNLOAD_URL="no-download-url",u.INVALID_ARGUMENT="invalid-argument",u.INVALID_ARGUMENT_COUNT="invalid-argument-count",u.APP_DELETED="app-deleted",u.INVALID_ROOT_OPERATION="invalid-root-operation",u.INVALID_FORMAT="invalid-format",u.INTERNAL_ERROR="internal-error",u.UNSUPPORTED_ENVIRONMENT="unsupported-environment";/**
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
 */class hT{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return 0===this.path.length}fullServerUrl(){let e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let n;try{n=hT.makeFromUrl(e,t)}catch(t){return new hT(e,"")}if(""===n.path)return n;throw new hv(P.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+e+"'.")}static makeFromUrl(e,t){let n=null,r="([A-Za-z0-9.\\-_]+)",i=RegExp("^gs://"+r+"(/(.*))?$","i");function s(e){e.path_=decodeURIComponent(e.path)}let o=t.replace(/[.]/g,"\\."),a=RegExp(`^https?://${o}/v[A-Za-z0-9_]+/b/${r}/o(/([^?#]*).*)?$`,"i"),l=t===hm?"(?:storage.googleapis.com|storage.cloud.google.com)":t,h=[{regex:i,indices:{bucket:1,path:3},postModify:function(e){"/"===e.path.charAt(e.path.length-1)&&(e.path_=e.path_.slice(0,-1))}},{regex:a,indices:{bucket:1,path:3},postModify:s},{regex:RegExp(`^https?://${l}/${r}/([^?#]*)`,"i"),indices:{bucket:1,path:2},postModify:s}];for(let t=0;t<h.length;t++){let r=h[t],i=r.regex.exec(e);if(i){let e=i[r.indices.bucket],t=i[r.indices.path];t||(t=""),n=new hT(e,t),r.postModify(n);break}}if(null==n)throw new hv(P.INVALID_URL,"Invalid URL '"+e+"'.");return n}}class hS{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}function hA(e){return"string"==typeof e||e instanceof String}function hk(e,t,n,r){if(r<t)throw hb(`Invalid value for '${e}'. Expected ${t} or greater.`);if(r>n)throw hb(`Invalid value for '${e}'. Expected ${n} or less.`)}/**
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
 */function hC(e,t,n){let r=t;return null==n&&(r=`https://${t}`),`${n}://${r}/v0${e}`}function hR(e){let t=encodeURIComponent,n="?";for(let r in e)e.hasOwnProperty(r)&&(n=n+(t(r)+"=")+t(e[r])+"&");return n.slice(0,-1)}(c=D||(D={}))[c.NO_ERROR=0]="NO_ERROR",c[c.NETWORK_ERROR=1]="NETWORK_ERROR",c[c.ABORT=2]="ABORT";/**
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
 */class hx{constructor(e,t,n,r,i,s,o,a,l,h,u,c=!0){this.url_=e,this.method_=t,this.headers_=n,this.body_=r,this.successCodes_=i,this.additionalRetryCodes_=s,this.callback_=o,this.errorCallback_=a,this.timeout_=l,this.progressCallback_=h,this.connectionFactory_=u,this.retry=c,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((e,t)=>{this.resolve_=e,this.reject_=t,this.start_()})}start_(){let e=(e,t)=>{let n=this.resolve_,r=this.reject_,i=t.connection;if(t.wasSuccessCode)try{let e=this.callback_(i,i.getResponse());void 0!==e?n(e):n()}catch(e){r(e)}else if(null!==i){let e=hE();e.serverResponse=i.getErrorText(),r(this.errorCallback_?this.errorCallback_(i,e):e)}else r(t.canceled?this.appDelete_?hI():new hv(P.CANCELED,"User canceled the upload/download."):new hv(P.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again."))};this.canceled_?e(!1,new hO(!1,null,!0)):this.backoffId_=/**
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
 */function(e,t,n){let r=1,i=null,s=null,o=!1,a=0,l=!1;function h(...e){l||(l=!0,t.apply(null,e))}function u(t){i=setTimeout(()=>{i=null,e(f,2===a)},t)}function c(){s&&clearTimeout(s)}function f(e,...t){let n;if(l){c();return}if(e||2===a||o){c(),h.call(null,e,...t);return}r<64&&(r*=2),1===a?(a=2,n=0):n=(r+Math.random())*1e3,u(n)}let d=!1;function p(e){!d&&(d=!0,c(),l||(null!==i?(e||(a=2),clearTimeout(i),u(0)):e||(a=1)))}return u(0),s=setTimeout(()=>{o=!0,p(!0)},n),p}((e,t)=>{if(t){e(!1,new hO(!1,null,!0));return}let n=this.connectionFactory_();this.pendingConnection_=n;let r=e=>{let t=e.loaded,n=e.lengthComputable?e.total:-1;null!==this.progressCallback_&&this.progressCallback_(t,n)};null!==this.progressCallback_&&n.addUploadProgressListener(r),n.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{null!==this.progressCallback_&&n.removeUploadProgressListener(r),this.pendingConnection_=null;let t=n.getErrorCode()===D.NO_ERROR,i=n.getStatus();if(!t||/**
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
 */function(e,t){let n=e>=500&&e<600,r=-1!==[408,429].indexOf(e),i=-1!==t.indexOf(e);return n||r||i}(i,this.additionalRetryCodes_)&&this.retry){e(!1,new hO(!1,null,n.getErrorCode()===D.ABORT));return}e(!0,new hO(-1!==this.successCodes_.indexOf(i),n))})},e,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,null!==this.backoffId_&&(0,this.backoffId_)(!1),null!==this.pendingConnection_&&this.pendingConnection_.abort()}}class hO{constructor(e,t,n){this.wasSuccessCode=e,this.connection=t,this.canceled=!!n}}/**
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
 */function hN(e){var t;let n;try{n=JSON.parse(e)}catch(e){return null}return"object"!=typeof(t=n)||Array.isArray(t)?null:n}function hP(e){let t=e.lastIndexOf("/",e.length-2);return -1===t?e:e.slice(t+1)}/**
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
 */function hD(e,t){return t}class hL{constructor(e,t,n,r){this.server=e,this.local=t||e,this.writable=!!n,this.xform=r||hD}}let hM=null;/**
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
 */const hU="prefixes",hF="items";class hV{constructor(e,t,n,r){this.url=e,this.method=t,this.handler=n,this.timeout=r,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
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
 */function hB(e){if(!e)throw hE()}function hj(e){return function(t,n){var r,i;let s;return 401===t.getStatus()?s=t.getErrorText().includes("Firebase App Check token is invalid")?new hv(P.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project."):new hv(P.UNAUTHENTICATED,"User is not authenticated, please authenticate using Firebase Authentication and try again."):402===t.getStatus()?(r=e.bucket,s=new hv(P.QUOTA_EXCEEDED,"Quota for bucket '"+r+"' exceeded, please view quota on https://firebase.google.com/pricing/.")):403===t.getStatus()?(i=e.path,s=new hv(P.UNAUTHORIZED,"User does not have permission to access '"+i+"'.")):s=n,s.status=t.getStatus(),s.serverResponse=n.serverResponse,s}}class h${constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=D.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=D.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=D.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,t,n,r){if(this.sent_)throw h_("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(t,e,!0),void 0!==r)for(let e in r)r.hasOwnProperty(e)&&this.xhr_.setRequestHeader(e,r[e].toString());return void 0!==n?this.xhr_.send(n):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw h_("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw h_("cannot .getStatus() before sending");try{return this.xhr_.status}catch(e){return -1}}getResponse(){if(!this.sent_)throw h_("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw h_("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){null!=this.xhr_.upload&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){null!=this.xhr_.upload&&this.xhr_.upload.removeEventListener("progress",e)}}class hH extends h${initXhr(){this.xhr_.responseType="text"}}function hq(){return new hH}/**
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
 */class hz{constructor(e,t){this._service=e,t instanceof hT?this._location=t:this._location=hT.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new hz(e,t)}get root(){let e=new hT(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return hP(this._location.path)}get storage(){return this._service}get parent(){let e=/**
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
 */function(e){if(0===e.length)return null;let t=e.lastIndexOf("/");return -1===t?"":e.slice(0,t)}(this._location.path);if(null===e)return null;let t=new hT(this._location.bucket,e);return new hz(this._service,t)}_throwIfRoot(e){if(""===this._location.path)throw new hv(P.INVALID_ROOT_OPERATION,"The operation '"+e+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}}async function hK(e,t,n){let r=await function(e,t){null!=t&&"number"==typeof t.maxResults&&hk("options.maxResults",1,1e3,t.maxResults);let n=t||{},r=function(e,t,n,r,i){var s;let o={};t.isRoot?o.prefix="":o.prefix=t.path+"/",o.delimiter="/",r&&(o.pageToken=r),i&&(o.maxResults=i);let a=hC(t.bucketOnlyServerUrl(),e.host,e._protocol),l=e.maxOperationRetryTime,h=new hV(a,"GET",(s=t.bucket,function(t,n){let r=function(e,t,n){let r=hN(n);return null===r?null:function(e,t,n){let r={prefixes:[],items:[],nextPageToken:n.nextPageToken};if(n[hU])for(let i of n[hU]){let n=i.replace(/\/$/,""),s=e._makeStorageReference(new hT(t,n));r.prefixes.push(s)}if(n[hF])for(let i of n[hF]){let n=e._makeStorageReference(new hT(t,i.name));r.items.push(n)}return r}(e,t,r)}(e,s,n);return hB(null!==r),r}),l);return h.urlParams=o,h.errorHandler=hj(t),h}(e.storage,e._location,"/",n.pageToken,n.maxResults);return e.storage.makeRequestWithTokens(r,hq)}(e,{pageToken:n});t.prefixes.push(...r.prefixes),t.items.push(...r.items),null!=r.nextPageToken&&await hK(e,t,r.nextPageToken)}function hG(e,t){let n=null==t?void 0:t[hy];return null==n?null:hT.makeFromBucketSpec(n,e)}class hW{constructor(e,t,n,r,i){this.app=e,this._authProvider=t,this._appCheckProvider=n,this._url=r,this._firebaseVersion=i,this._bucket=null,this._host=hm,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=12e4,this._maxUploadRetryTime=6e5,this._requests=new Set,null!=r?this._bucket=hT.makeFromBucketSpec(r,this._host):this._bucket=hG(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,null!=this._url?this._bucket=hT.makeFromBucketSpec(this._url,e):this._bucket=hG(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){hk("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){hk("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;let e=this._authProvider.getImmediate({optional:!0});if(e){let t=await e.getToken();if(null!==t)return t.accessToken}return null}async _getAppCheckToken(){let e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new hz(this,e)}_makeRequest(e,t,n,r,i=!0){if(this._deleted)return new hS(hI());{let s=function(e,t,n,r,i,s,o=!0){let a=hR(e.urlParams),l=e.url+a,h=Object.assign({},e.headers);return t&&(h["X-Firebase-GMPID"]=t),null!==n&&n.length>0&&(h.Authorization="Firebase "+n),h["X-Firebase-Storage-Version"]="webjs/"+(null!=s?s:"AppManager"),null!==r&&(h["X-Firebase-AppCheck"]=r),new hx(l,e.method,h,e.body,e.successCodes,e.additionalRetryCodes,e.handler,e.errorHandler,e.timeout,e.progressCallback,i,o)}(e,this._appId,n,r,t,this._firebaseVersion,i);return this._requests.add(s),s.getPromise().then(()=>this._requests.delete(s),()=>this._requests.delete(s)),s}}async makeRequestWithTokens(e,t){let[n,r]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,n,r).getPromise()}}const hX="@firebase/storage",hY="0.13.3",hJ="storage";tA(new e2(hJ,function(e,{instanceIdentifier:t}){return new hW(e.getProvider("app").getImmediate(),e.getProvider("auth-internal"),e.getProvider("app-check-internal"),t,tO)},"PUBLIC").setMultipleInstances(!0)),tD(hX,hY,""),tD(hX,hY,"esm2017");/**
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
 */const hQ="functions";/**
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
 */class hZ{constructor(e,t,n){this.auth=null,this.messaging=null,this.appCheck=null,this.auth=e.getImmediate({optional:!0}),this.messaging=t.getImmediate({optional:!0}),this.auth||e.get().then(e=>this.auth=e,()=>{}),this.messaging||t.get().then(e=>this.messaging=e,()=>{}),this.appCheck||n.get().then(e=>this.appCheck=e,()=>{})}async getAuthToken(){if(this.auth)try{let e=await this.auth.getToken();return null==e?void 0:e.accessToken}catch(e){return}}async getMessagingToken(){if(this.messaging&&"Notification"in self&&"granted"===Notification.permission)try{return await this.messaging.getToken()}catch(e){return}}async getAppCheckToken(e){if(this.appCheck){let t=e?await this.appCheck.getLimitedUseToken():await this.appCheck.getToken();return t.error?null:t.token}return null}async getContext(e){return{authToken:await this.getAuthToken(),messagingToken:await this.getMessagingToken(),appCheckToken:await this.getAppCheckToken(e)}}}/**
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
 */const h0="us-central1";class h1{constructor(e,t,n,r,i=h0){this.app=e,this.emulatorOrigin=null,this.contextProvider=new hZ(t,n,r),this.cancelAllRequests=new Promise(e=>{this.deleteService=()=>Promise.resolve(e())});try{let e=new URL(i);this.customDomain=e.origin+("/"===e.pathname?"":e.pathname),this.region=h0}catch(e){this.customDomain=null,this.region=i}}_delete(){return this.deleteService()}_url(e){let t=this.app.options.projectId;if(null!==this.emulatorOrigin){let n=this.emulatorOrigin;return`${n}/${t}/${this.region}/${e}`}return null!==this.customDomain?`${this.customDomain}/${e}`:`https://${this.region}-${t}.cloudfunctions.net/${e}`}}const h2="@firebase/functions",h5="0.11.9";tA(new e2(hQ,(e,{instanceIdentifier:t})=>{let n=e.getProvider("app").getImmediate();return new h1(n,e.getProvider("auth-internal"),e.getProvider("messaging-internal"),e.getProvider("app-check-internal"),t)},"PUBLIC").setMultipleInstances(!0)),tD(h2,h5,void 0),tD(h2,h5,"esm2017");const h6=tN({apiKey:"AIzaSyDaj2yyd9V1ZewtTzi0HzJMqF18iD2cZe8",authDomain:"create-dwell.firebaseapp.com",projectId:"create-dwell",storageBucket:"create-dwell.appspot.com",messagingSenderId:"455762932168",appId:"1:455762932168:web:cefc0f7470159c6f1ad0fd",measurementId:"G-E5G32KQR13"});!function(e=tP()){let t=tk(e=e1(e),nI);t.isInitialized()?t.getImmediate():function(e,t={}){let n=tk(e,nI);if(n.isInitialized()){let e=n.getImmediate();if(eG(t,n.getOptions()))return e;throw nS.create("already-initialized")}return n.initialize({options:t})}(e)}(h6),function(e=tP()){let t=tk(e,"auth");if(t.isInitialized())return t.getImmediate();let n=/**
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
 */function(e,t){let n=tk(e,"auth");if(n.isInitialized()){let e=n.getImmediate();if(eG(n.getOptions(),null!=t?t:{}))return e;nJ(e,"already-initialized")}return n.initialize({options:t})}(e,{popupRedirectResolver:sb,persistence:[iW,iO,iN]}),r=eU("authTokenSyncURL");if(r&&"boolean"==typeof isSecureContext&&isSecureContext){let e=new URL(r,location.origin);if(location.origin===e.origin){var i,s;let t=sN(e.toString());i=()=>t(n.currentUser),e1(n).beforeAuthStateChanged(t,i),s=e=>t(e),e1(n).onIdTokenChanged(s,void 0,void 0)}}let o=eD("auth");o&&function(e,t,n){let r=e1(e);n2(r._canInitEmulator,r,"emulator-config-failed"),n2(/^https?:\/\//.test(t),r,"invalid-emulator-scheme");let i=r3(t),{host:s,port:o}=function(e){let t=r3(e),n=/(\/\/)?([^?#/]+)/.exec(e.substr(t.length));if(!n)return{host:"",port:null};let r=n[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){let e=i[1];return{host:e,port:r4(r.substr(e.length+1))}}{let[e,t]=r.split(":");return{host:e,port:r4(t)}}}(t),a=null===o?"":`:${o}`;r.config.emulator={url:`${i}//${s}${a}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:s,port:o,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:!1})}),function(){function e(){let e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}"undefined"!=typeof console&&"function"==typeof console.info&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),"undefined"!=typeof window&&"undefined"!=typeof document&&("loading"===document.readyState?window.addEventListener("DOMContentLoaded",e):e())}()}(n,`http://${o}`)}(h6),function(e,t){let n=tk("object"==typeof e?e:tP(),"firestore").getImmediate({identifier:"string"==typeof e?e:"(default)"});if(!n._initialized){let e=eL("firestore");e&&function(e,t,n,r={}){var i;let s=(e=function(e,t){if("_delegate"in e&&(e=e._delegate),!(e instanceof t)){if(t.name===e.constructor.name)throw new oA(oS.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{let n=function(e){if(void 0===e)return"undefined";if(null===e)return"null";if("string"==typeof e)return e.length>20&&(e=`${e.substring(0,20)}...`),JSON.stringify(e);if("number"==typeof e||"boolean"==typeof e)return""+e;if("object"==typeof e){if(e instanceof Array)return"an array";{var t;let n=(t=e).constructor?t.constructor.name:null;return n?`a custom ${n} object`:"an object"}}return"function"==typeof e?"a function":oT()}(e);throw new oA(oS.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${n}`)}}return e}(e,hd))._getSettings(),o=`${t}:${n}`;if("firestore.googleapis.com"!==s.host&&s.host!==o&&oI("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),e._setSettings(Object.assign(Object.assign({},s),{host:o,ssl:!1})),r.mockUserToken){let t,n;if("string"==typeof r.mockUserToken)t=r.mockUserToken,n=om.MOCK_USER;else{t=eV(r.mockUserToken,null===(i=e._app)||void 0===i?void 0:i.options.projectId);let s=r.mockUserToken.sub||r.mockUserToken.user_id;if(!s)throw new oA(oS.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");n=new om(s)}e._authCredentials=new ox(new oC(t,n))}}(n,...e)}}(h6);const h3=function(e=tP(),t){let n=tk(e=e1(e),hJ).getImmediate({identifier:void 0}),r=eL("storage");return r&&function(e,t,n,r={}){!function(e,t,n,r={}){e.host=`${t}:${n}`,e._protocol="http";let{mockUserToken:i}=r;i&&(e._overrideAuthToken="string"==typeof i?i:eV(i,e.app.options.projectId))}(e,t,n,r)}(n,...r),n}(h6);async function h4(e){try{var t,n,r;let i=(t=h3,n=`projects/${e}/images`,function(e,t){if(!(t&&/^[A-Za-z]+:\/\//.test(t)))return function e(t,n){if(t instanceof hW){if(null==t._bucket)throw new hv(P.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+hy+"' property when initializing the app?");let r=new hz(t,t._bucket);return null!=n?e(r,n):r}return void 0!==n?function(e,t){let n=function(e,t){let n=t.split("/").filter(e=>e.length>0).join("/");return 0===e.length?n:e+"/"+n}(e._location.path,t),r=new hT(e._location.bucket,n);return new hz(e.storage,r)}(t,n):t}(e,t);if(e instanceof hW)return new hz(e,t);throw hb("To use ref(service, url), the first argument must be a Storage instance.")}(t=e1(t),n)),s=await (r=i,function(e){let t={prefixes:[],items:[]};return hK(e,t).then(()=>t)}(r=e1(r))),o=await Promise.all(s.items.map(e=>{var t;return t=e,function(e){e._throwIfRoot("getDownloadURL");let t=function(e,t,n){let r=hC(t.fullServerUrl(),e.host,e._protocol),i=e.maxOperationRetryTime,s=new hV(r,"GET",function(t,r){let i=function(e,t,n){let r=hN(t);return null===r?null:function(e,t,n){let r={};r.type="file";let i=n.length;for(let e=0;e<i;e++){let i=n[e];r[i.local]=i.xform(r,t[i.server])}return Object.defineProperty(r,"ref",{get:function(){let t=r.bucket,n=new hT(t,r.fullPath);return e._makeStorageReference(n)}}),r}(e,r,n)}(e,r,n);return hB(null!==i),function(e,t,n,r){let i=hN(t);if(null===i||!hA(i.downloadTokens))return null;let s=i.downloadTokens;if(0===s.length)return null;let o=encodeURIComponent;return s.split(",").map(t=>{let i=e.bucket,s=e.fullPath;return hC("/b/"+o(i)+"/o/"+o(s),n,r)+hR({alt:"media",token:t})})[0]}(i,r,e.host,e._protocol)},i);return s.errorHandler=function(e){let t=hj(e);return function(n,r){let i=t(n,r);if(404===n.getStatus()){var s;s=e.path,i=new hv(P.OBJECT_NOT_FOUND,"Object '"+s+"' does not exist.")}return i.serverResponse=r.serverResponse,i}}(t),s}(e.storage,e._location,function(){if(hM)return hM;let e=[];e.push(new hL("bucket")),e.push(new hL("generation")),e.push(new hL("metageneration")),e.push(new hL("name","fullPath",!0));let t=new hL("name");t.xform=function(e,t){return!hA(t)||t.length<2?t:hP(t)},e.push(t);let n=new hL("size");return n.xform=function(e,t){return void 0!==t?Number(t):t},e.push(n),e.push(new hL("timeCreated")),e.push(new hL("updated")),e.push(new hL("md5Hash",null,!0)),e.push(new hL("cacheControl",null,!0)),e.push(new hL("contentDisposition",null,!0)),e.push(new hL("contentEncoding",null,!0)),e.push(new hL("contentLanguage",null,!0)),e.push(new hL("contentType",null,!0)),e.push(new hL("metadata","customMetadata",!0)),hM=e}());return e.storage.makeRequestWithTokens(t,hq).then(e=>{if(null===e)throw new hv(P.NO_DOWNLOAD_URL,"The given file does not have any download URLs.");return e})}(t=e1(t))}));return console.log("Project Images:",o),o}catch(e){console.error("Error fetching project images:",e)}}!function(e=tP(),t=h0){let n=tk(e1(e),hQ).getImmediate({identifier:t}),r=eL("functions");r&&function(e,t,n){e1(e).emulatorOrigin=`http://${t}:${n}`}(n,...r)}(h6),(0,Q.gsap).registerPlugin(Z.ScrollTrigger,eu);const h8=document.querySelector(".entry-animation"),h7=document.querySelector(".nav"),h9=document.querySelector(".grid"),ue=h9.querySelectorAll(".grid__item-imgwrap"),ut=document.querySelector(".mark > .mark__inner"),un=document.querySelector(".fullscreen-overlay"),ur=un.querySelector(".project-content"),ui=un.querySelector(".close-overlay"),us=e=>e.getBoundingClientRect().left+e.offsetWidth/2<window.innerWidth/2,uo=()=>{ue.forEach(e=>{let t=e.querySelector(".grid__item-img"),n=us(e);(0,Q.gsap).timeline({scrollTrigger:{trigger:e,start:"top bottom+=10%",end:"bottom top-=25%",scrub:!0}}).from(e,{startAt:{filter:"blur(0px) brightness(100%) contrast(100%)"},z:300,rotateX:70,rotateZ:n?5:-5,xPercent:n?-40:40,skewX:n?-20:20,yPercent:100,filter:"blur(7px) brightness(0%) contrast(400%)",ease:"sine"}).to(e,{z:300,rotateX:-50,rotateZ:n?-1:1,xPercent:n?-20:20,skewX:n?10:-10,filter:"blur(4px) brightness(0%) contrast(500%)",ease:"sine.in"}).from(t,{scaleY:1.8,ease:"sine"},0).to(t,{scaleY:1.8,ease:"sine.in"},">")})},ua=()=>{(0,Q.gsap).timeline({scrollTrigger:{trigger:h9,start:"top bottom",end:"bottom top",scrub:!0}}).fromTo(ut,{x:"200vw"},{x:"-100%",ease:"sine"})},ul=async e=>{document.body.style.overflow="hidden";let t=e.dataset.projectId;e.querySelector(".grid__item-img").style.backgroundImage.slice(5,-2);let n=e.cloneNode(!0);n.classList.add("zoomed-image"),document.querySelectorAll(".zoomed-image").forEach(e=>e.remove()),document.body.appendChild(n);let r=e.getBoundingClientRect();n.style.position="fixed",n.style.zIndex="6000",n.style.transition="none",n.style.transform="scale(1) translate3d(0, 0, 0)",n.style.top=`${r.top}px`,n.style.left=`${r.left}px`,n.style.width=`${r.width}px`,n.style.height=`${r.height}px`,n.style.objectFit="cover",n.style.borderRadius="var(--grid-item-radius)",n.style.filter=e.style.filter,n.style.transition="transform 1s ease, opacity 0.5s ease, object-fit 0.5s ease";let i=document.createElement("div");i.classList.add("spinner"),n.appendChild(i);let s=[];try{s=await h4(t)}catch(e){console.error("Error fetching project data:",e)}i.remove(),ur.innerHTML="",s.forEach(e=>{if(null!==e&&"object"==typeof e&&"text"===e.type){let t=document.createElement("div");t.classList.add("project-text"),t.innerText=e.text,ur.appendChild(t)}else if(null!==e&&"object"==typeof e&&"quote"===e.type){let t=document.createElement("blockquote");t.classList.add("project-quote"),t.innerText=e.text,ur.appendChild(t)}else{let t=document.createElement("img");t.src=e,t.classList.add("project-image");let n=e.split("/").pop().split(".")[0];t.alt=`${n}`,ur.appendChild(t)}}),un.appendChild(ur),await B(".project-content img");let o=ur.querySelector("img");o.style.opacity=0;let a=o.getBoundingClientRect();un.classList.add("show"),document.getElementById("main").classList.remove("shadow"),(0,Q.gsap).timeline().to(n,{duration:.3,ease:"power2.out",top:`${a.top}px`,left:`${a.left}px`,width:`${a.width}px`,height:`${a.height}px`,scale:1,blur:0,skewX:0,skewY:0,rotateX:0,rotateY:0,rotateZ:0,translateX:0,translateY:0,translateZ:0,onComplete:()=>{o.style.opacity=1,(0,Q.gsap).to(n,{duration:.2,opacity:0}).then(()=>{n.remove()})}}).then(async()=>{document.body.style.overflow="auto",uh()})},uh=()=>{o&&o.destroy(),(o=new J.default({orientation:"horizontal",smoothWheel:!0,gestureOrientation:"vertical",wrapper:un,content:ur})).on("scroll",e=>{let t=o.animatedScroll,n=o.limit;(t>=n||t>=n-.5)&&uu()}),requestAnimationFrame(function e(t){o.raf(t),requestAnimationFrame(e)})},uu=()=>{un.classList.add("fade-out"),setTimeout(()=>{un.classList.remove("show"),document.getElementById("main").classList.add("shadow"),ur.innerHTML="",un.classList.remove("fade-out")},600)};document.querySelectorAll(".grid__item-imgwrap").forEach(e=>{e.addEventListener("click",()=>ul(e))}),ui.addEventListener("click",uu);const uc=()=>{uo(),ua(),h9.style.opacity=0,h7.style.translateY="-100%",setTimeout(()=>{window.scrollTo(0,0),(0,Q.gsap).timeline().delay(1).to(h8,{left:"-100vw",duration:1.5,opacity:0,ease:"sine.out"}).from(h7,{translateY:"-100%"},"=-1").to(h7,{translateY:"0",ease:"sine.out"}).to(h9,{opacity:1,duration:.5,ease:"sine.out"},"=-.5").to(window,{scrollTo:{y:document.body.clientHeight/5},duration:2,ease:"power2.out"},"-=.5")},100)};B(".grid__item-img").then(()=>{document.body.classList.remove("loading"),setTimeout(()=>{uc()},0)});