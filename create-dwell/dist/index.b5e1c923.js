let e;var t=globalThis,o={},i={},r=t.parcelRequirebfdf;null==r&&((r=function(e){if(e in o)return o[e].exports;if(e in i){var t=i[e];delete i[e];var r={id:e,exports:{}};return o[e]=r,t.call(r.exports,r,r.exports),r.exports}var s=Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(e,t){i[e]=t},t.parcelRequirebfdf=r),(0,r.register)("lthow",function(e,t){var o,i;o="undefined"!=typeof window?window:e.exports,i=function(){function e(){}let t=e.prototype;return t.on=function(e,t){if(!e||!t)return this;let o=this._events=this._events||{},i=o[e]=o[e]||[];return i.includes(t)||i.push(t),this},t.once=function(e,t){if(!e||!t)return this;this.on(e,t);let o=this._onceEvents=this._onceEvents||{};return(o[e]=o[e]||{})[t]=!0,this},t.off=function(e,t){let o=this._events&&this._events[e];if(!o||!o.length)return this;let i=o.indexOf(t);return -1!=i&&o.splice(i,1),this},t.emitEvent=function(e,t){let o=this._events&&this._events[e];if(!o||!o.length)return this;o=o.slice(0),t=t||[];let i=this._onceEvents&&this._onceEvents[e];for(let r of o)i&&i[r]&&(this.off(e,r),delete i[r]),r.apply(this,t);return this},t.allOff=function(){return delete this._events,delete this._onceEvents,this},e},e.exports?e.exports=i():o.EvEmitter=i()});var s={};l="undefined"!=typeof window?window:s,a=function(e,t){let o=e.jQuery,i=e.console;function r(e,t,s){var n;if(!(this instanceof r))return new r(e,t,s);let l=e;if("string"==typeof e&&(l=document.querySelectorAll(e)),!l){i.error(`Bad element for imagesLoaded ${l||e}`);return}this.elements=Array.isArray(n=l)?n:"object"==typeof n&&"number"==typeof n.length?[...n]:[n],this.options={},"function"==typeof t?s=t:Object.assign(this.options,t),s&&this.on("always",s),this.getImages(),o&&(this.jqDeferred=new o.Deferred),setTimeout(this.check.bind(this))}r.prototype=Object.create(t.prototype),r.prototype.getImages=function(){this.images=[],this.elements.forEach(this.addElementImages,this)};let s=[1,9,11];r.prototype.addElementImages=function(e){"IMG"===e.nodeName&&this.addImage(e),!0===this.options.background&&this.addElementBackgroundImages(e);let{nodeType:t}=e;if(t&&s.includes(t)){for(let t of e.querySelectorAll("img"))this.addImage(t);if("string"==typeof this.options.background)for(let t of e.querySelectorAll(this.options.background))this.addElementBackgroundImages(t)}};let n=/url\((['"])?(.*?)\1\)/gi;function l(e){this.img=e}function a(e,t){this.url=e,this.element=t,this.img=new Image}return r.prototype.addElementBackgroundImages=function(e){let t=getComputedStyle(e);if(!t)return;let o=n.exec(t.backgroundImage);for(;null!==o;){let i=o&&o[2];i&&this.addBackground(i,e),o=n.exec(t.backgroundImage)}},r.prototype.addImage=function(e){let t=new l(e);this.images.push(t)},r.prototype.addBackground=function(e,t){let o=new a(e,t);this.images.push(o)},r.prototype.check=function(){if(this.progressedCount=0,this.hasAnyBroken=!1,!this.images.length){this.complete();return}let e=(e,t,o)=>{setTimeout(()=>{this.progress(e,t,o)})};this.images.forEach(function(t){t.once("progress",e),t.check()})},r.prototype.progress=function(e,t,o){this.progressedCount++,this.hasAnyBroken=this.hasAnyBroken||!e.isLoaded,this.emitEvent("progress",[this,e,t]),this.jqDeferred&&this.jqDeferred.notify&&this.jqDeferred.notify(this,e),this.progressedCount===this.images.length&&this.complete(),this.options.debug&&i&&i.log(`progress: ${o}`,e,t)},r.prototype.complete=function(){let e=this.hasAnyBroken?"fail":"done";if(this.isComplete=!0,this.emitEvent(e,[this]),this.emitEvent("always",[this]),this.jqDeferred){let e=this.hasAnyBroken?"reject":"resolve";this.jqDeferred[e](this)}},l.prototype=Object.create(t.prototype),l.prototype.check=function(){if(this.getIsImageComplete()){this.confirm(0!==this.img.naturalWidth,"naturalWidth");return}this.proxyImage=new Image,this.img.crossOrigin&&(this.proxyImage.crossOrigin=this.img.crossOrigin),this.proxyImage.addEventListener("load",this),this.proxyImage.addEventListener("error",this),this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.proxyImage.src=this.img.currentSrc||this.img.src},l.prototype.getIsImageComplete=function(){return this.img.complete&&this.img.naturalWidth},l.prototype.confirm=function(e,t){this.isLoaded=e;let{parentNode:o}=this.img,i="PICTURE"===o.nodeName?o:this.img;this.emitEvent("progress",[this,i,t])},l.prototype.handleEvent=function(e){let t="on"+e.type;this[t]&&this[t](e)},l.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindEvents()},l.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindEvents()},l.prototype.unbindEvents=function(){this.proxyImage.removeEventListener("load",this),this.proxyImage.removeEventListener("error",this),this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},a.prototype=Object.create(l.prototype),a.prototype.check=function(){this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.img.src=this.url,this.getIsImageComplete()&&(this.confirm(0!==this.img.naturalWidth,"naturalWidth"),this.unbindEvents())},a.prototype.unbindEvents=function(){this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},a.prototype.confirm=function(e,t){this.isLoaded=e,this.emitEvent("progress",[this,this.element,t])},r.makeJQueryPlugin=function(t){(t=t||e.jQuery)&&((o=t).fn.imagesLoaded=function(e,t){return new r(this,e,t).jqDeferred.promise(o(this))})},r.makeJQueryPlugin(),r},s?s=a(l,r("lthow")):l.imagesLoaded=a(l,l.EvEmitter);const n=(e="img")=>new Promise(t=>{var o;((o=s)&&o.__esModule?o.default:o)(document.querySelectorAll(e),{background:!0},t)});var l,a,c,h,d,p,u,m,g,f,y=r("e5yPX"),v=r("cas9V"),x=r("dBXGD"),w=function(){return"undefined"!=typeof window},E=function(){return c||w()&&(c=window.gsap)&&c.registerPlugin&&c},b=function(e){return"string"==typeof e},k=function(e){return"function"==typeof e},L=function(e,t){var o="x"===t?"Width":"Height",i="scroll"+o,r="client"+o;return e===d||e===p||e===u?Math.max(p[i],u[i])-(d["inner"+o]||p[r]||u[r]):e[i]-e["offset"+o]},T=function(e,t){var o="scroll"+("x"===t?"Left":"Top");return e===d&&(null!=e.pageXOffset?o="page"+t.toUpperCase()+"Offset":e=null!=p[o]?p:u),function(){return e[o]}},_=function(e,t,o,i){if(k(e)&&(e=e(t,o,i)),"object"!=typeof e)return b(e)&&"max"!==e&&"="!==e.charAt(1)?{x:e,y:e}:{y:e};if(e.nodeType)return{y:e,x:e};var r,s={};for(r in e)s[r]="onAutoKill"!==r&&k(e[r])?e[r](t,o,i):e[r];return s},I=function(e,t){if(!(e=m(e)[0])||!e.getBoundingClientRect)return console.warn("scrollTo target doesn't exist. Using 0")||{x:0,y:0};var o=e.getBoundingClientRect(),i=!t||t===d||t===u,r=i?{top:p.clientTop-(d.pageYOffset||p.scrollTop||u.scrollTop||0),left:p.clientLeft-(d.pageXOffset||p.scrollLeft||u.scrollLeft||0)}:t.getBoundingClientRect(),s={x:o.left-r.left,y:o.top-r.top};return!i&&t&&(s.x+=T(t,"x")(),s.y+=T(t,"y")()),s},j=function(e,t,o,i,r){return isNaN(e)||"object"==typeof e?b(e)&&"="===e.charAt(1)?parseFloat(e.substr(2))*("-"===e.charAt(0)?-1:1)+i-r:"max"===e?L(t,o)-r:Math.min(L(t,o),I(e,t)[o]-r):parseFloat(e)-r},q=function(){c=E(),w()&&c&&"undefined"!=typeof document&&document.body&&(d=window,u=document.body,p=document.documentElement,m=c.utils.toArray,c.config({autoKillThreshold:7}),g=c.config(),h=1)},A={version:"3.12.5",name:"scrollTo",rawVars:1,register:function(e){c=e,q()},init:function(e,t,o,i,r){h||q();var s=c.getProperty(e,"scrollSnapType");this.isWin=e===d,this.target=e,this.tween=o,t=_(t,i,e,r),this.vars=t,this.autoKill=!!t.autoKill,this.getX=T(e,"x"),this.getY=T(e,"y"),this.x=this.xPrev=this.getX(),this.y=this.yPrev=this.getY(),f||(f=c.core.globals().ScrollTrigger),"smooth"===c.getProperty(e,"scrollBehavior")&&c.set(e,{scrollBehavior:"auto"}),s&&"none"!==s&&(this.snap=1,this.snapInline=e.style.scrollSnapType,e.style.scrollSnapType="none"),null!=t.x?(this.add(this,"x",this.x,j(t.x,e,"x",this.x,t.offsetX||0),i,r),this._props.push("scrollTo_x")):this.skipX=1,null!=t.y?(this.add(this,"y",this.y,j(t.y,e,"y",this.y,t.offsetY||0),i,r),this._props.push("scrollTo_y")):this.skipY=1},render:function(e,t){for(var o,i,r,s,n,l=t._pt,a=t.target,c=t.tween,h=t.autoKill,p=t.xPrev,u=t.yPrev,m=t.isWin,y=t.snap,v=t.snapInline;l;)l.r(e,l.d),l=l._next;o=m||!t.skipX?t.getX():p,r=(i=m||!t.skipY?t.getY():u)-u,s=o-p,n=g.autoKillThreshold,t.x<0&&(t.x=0),t.y<0&&(t.y=0),h&&(!t.skipX&&(s>n||s<-n)&&o<L(a,"x")&&(t.skipX=1),!t.skipY&&(r>n||r<-n)&&i<L(a,"y")&&(t.skipY=1),t.skipX&&t.skipY&&(c.kill(),t.vars.onAutoKill&&t.vars.onAutoKill.apply(c,t.vars.onAutoKillParams||[]))),m?d.scrollTo(t.skipX?o:t.x,t.skipY?i:t.y):(t.skipY||(a.scrollTop=t.y),t.skipX||(a.scrollLeft=t.x)),y&&(1===e||0===e)&&(i=a.scrollTop,o=a.scrollLeft,v?a.style.scrollSnapType=v:a.style.removeProperty("scroll-snap-type"),a.scrollTop=i+1,a.scrollLeft=o+1,a.scrollTop=i,a.scrollLeft=o),t.xPrev=t.x,t.yPrev=t.y,f&&f.update()},kill:function(e){var t="scrollTo"===e,o=this._props.indexOf(e);return(t||"scrollTo_x"===e)&&(this.skipX=1),(t||"scrollTo_y"===e)&&(this.skipY=1),o>-1&&this._props.splice(o,1),!this._props.length}};A.max=L,A.getOffset=I,A.buildGetter=T,E()&&c.registerPlugin(A);var S=r("kTus4"),C=r("2hFRm");async function P(e){try{let t=(0,C.ref)(S.storage,`projects/${e}/images`),o=await (0,C.listAll)(t),i=await Promise.all(o.items.map(e=>(0,C.getDownloadURL)(e)));return console.log("Project Images:",i),i}catch(e){console.error("Error fetching project images:",e)}}(0,v.gsap).registerPlugin(x.ScrollTrigger,A);const X=document.querySelector(".entry-animation"),B=document.querySelector(".nav"),Y=document.querySelector(".grid"),O=Y.querySelectorAll(".grid__item-imgwrap"),D=document.querySelector(".mark > .mark__inner"),R=document.querySelector(".fullscreen-overlay"),$=R.querySelector(".project-content"),W=R.querySelector(".close-overlay"),K=e=>e.getBoundingClientRect().left+e.offsetWidth/2<window.innerWidth/2,N=()=>{O.forEach(e=>{let t=e.querySelector(".grid__item-img"),o=K(e);(0,v.gsap).timeline({scrollTrigger:{trigger:e,start:"top bottom+=10%",end:"bottom top-=25%",scrub:!0}}).from(e,{startAt:{filter:"blur(0px) brightness(100%) contrast(100%)"},z:300,rotateX:70,rotateZ:o?5:-5,xPercent:o?-40:40,skewX:o?-20:20,yPercent:100,filter:"blur(7px) brightness(0%) contrast(400%)",ease:"sine"}).to(e,{z:300,rotateX:-50,rotateZ:o?-1:1,xPercent:o?-20:20,skewX:o?10:-10,filter:"blur(4px) brightness(0%) contrast(500%)",ease:"sine.in"}).from(t,{scaleY:1.8,ease:"sine"},0).to(t,{scaleY:1.8,ease:"sine.in"},">")})},F=()=>{(0,v.gsap).timeline({scrollTrigger:{trigger:Y,start:"top bottom",end:"bottom top",scrub:!0}}).fromTo(D,{x:"200vw"},{x:"-100%",ease:"sine"})},M=async e=>{document.body.style.overflow="hidden";let t=e.dataset.projectId;e.querySelector(".grid__item-img").style.backgroundImage.slice(5,-2);let o=e.cloneNode(!0);o.classList.add("zoomed-image"),document.querySelectorAll(".zoomed-image").forEach(e=>e.remove()),document.body.appendChild(o);let i=e.getBoundingClientRect();o.style.position="fixed",o.style.zIndex="6000",o.style.transition="none",o.style.transform="scale(1) translate3d(0, 0, 0)",o.style.top=`${i.top}px`,o.style.left=`${i.left}px`,o.style.width=`${i.width}px`,o.style.height=`${i.height}px`,o.style.objectFit="cover",o.style.borderRadius="var(--grid-item-radius)",o.style.filter=e.style.filter,o.style.transition="transform 1s ease, opacity 0.5s ease, object-fit 0.5s ease";let r=document.createElement("div");r.classList.add("spinner"),o.appendChild(r);let s=[];try{s=await P(t)}catch(e){console.error("Error fetching project data:",e)}r.remove(),$.innerHTML="",s.forEach(e=>{if(null!==e&&"object"==typeof e&&"text"===e.type){let t=document.createElement("div");t.classList.add("project-text"),t.innerText=e.text,$.appendChild(t)}else if(null!==e&&"object"==typeof e&&"quote"===e.type){let t=document.createElement("blockquote");t.classList.add("project-quote"),t.innerText=e.text,$.appendChild(t)}else{let t=document.createElement("img");t.src=e,t.classList.add("project-image");let o=e.split("/").pop().split(".")[0];t.alt=`${o}`,$.appendChild(t)}}),R.appendChild($),await n(".project-content img");let l=$.querySelector("img");l.style.opacity=0;let a=l.getBoundingClientRect();R.classList.add("show"),document.getElementById("main").classList.remove("shadow"),(0,v.gsap).timeline().to(o,{duration:.3,ease:"power2.out",top:`${a.top}px`,left:`${a.left}px`,width:`${a.width}px`,height:`${a.height}px`,scale:1,blur:0,skewX:0,skewY:0,rotateX:0,rotateY:0,rotateZ:0,translateX:0,translateY:0,translateZ:0,onComplete:()=>{l.style.opacity=1,(0,v.gsap).to(o,{duration:.2,opacity:0}).then(()=>{o.remove()})}}).then(async()=>{document.body.style.overflow="auto",z()})},z=()=>{e&&e.destroy(),(e=new y.default({orientation:"horizontal",smoothWheel:!0,gestureOrientation:"vertical",wrapper:R,content:$})).on("scroll",t=>{let o=e.animatedScroll,i=e.limit;(o>=i||o>=i-.5)&&U()}),requestAnimationFrame(function t(o){e.raf(o),requestAnimationFrame(t)})},U=()=>{R.classList.add("fade-out"),setTimeout(()=>{R.classList.remove("show"),document.getElementById("main").classList.add("shadow"),$.innerHTML="",R.classList.remove("fade-out")},600)};document.querySelectorAll(".grid__item-imgwrap").forEach(e=>{e.addEventListener("click",()=>M(e))}),W.addEventListener("click",U);const H=()=>{N(),F(),Y.style.opacity=0,B.style.translateY="-100%",setTimeout(()=>{window.scrollTo(0,0),(0,v.gsap).timeline().delay(1).to(X,{left:"-100vw",duration:1.5,opacity:0,ease:"sine.out"}).from(B,{translateY:"-100%"},"=-1").to(B,{translateY:"0",ease:"sine.out"}).to(Y,{opacity:1,duration:.5,ease:"sine.out"},"=-.5").to(window,{scrollTo:{y:document.body.clientHeight/5},duration:2,ease:"power2.out"},"-=.5")},100)};n(".grid__item-img").then(()=>{document.body.classList.remove("loading"),setTimeout(()=>{H()},0)});