// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"l9Mez":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "ba60c367739bf03c";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && ![
        "localhost",
        "127.0.0.1",
        "0.0.0.0"
    ].includes(hostname) ? "wss" : "ws";
    var ws;
    if (HMR_USE_SSE) ws = new EventSource("/__parcel_hmr");
    else try {
        ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/");
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === "undefined" ? typeof chrome === "undefined" ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                }
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    if (ws instanceof WebSocket) {
        ws.onerror = function(e) {
            if (e.message) console.error(e.message);
        };
        ws.onclose = function() {
            console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
        };
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute("href");
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", // $FlowFixMe
    href.split("?")[0] + "?" + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            });
            // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"ebWYT":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _utilsJs = require("./utils.js");
var _lenis = require("lenis");
var _lenisDefault = parcelHelpers.interopDefault(_lenis);
var _gsap = require("gsap");
var _scrollTrigger = require("gsap/ScrollTrigger");
var _scrollToPlugin = require("gsap/ScrollToPlugin");
let lenis;
(0, _gsap.gsap).registerPlugin((0, _scrollTrigger.ScrollTrigger), (0, _scrollToPlugin.ScrollToPlugin));
const entry = document.querySelector(".entry-animation");
const nav = document.querySelector(".nav");
const grid = document.querySelector(".grid");
const gridImages = grid.querySelectorAll(".grid__item-imgwrap");
const marqueeInner = document.querySelector(".mark > .mark__inner");
const overlay = document.querySelector(".fullscreen-overlay");
const projectContent = overlay.querySelector(".project-content");
const closeOverlayBtn = overlay.querySelector(".close-overlay");
let isOverlayOpen = false;
const isLeftSide = (element)=>{
    const elementCenter = element.getBoundingClientRect().left + element.offsetWidth / 2;
    const viewportCenter = window.innerWidth / 2;
    return elementCenter < viewportCenter;
};
const animateScrollGrid = ()=>{
    gridImages.forEach((imageWrap)=>{
        const imgEl = imageWrap.querySelector(".grid__item-img");
        const leftSide = isLeftSide(imageWrap);
        (0, _gsap.gsap).timeline({
            scrollTrigger: {
                trigger: imageWrap,
                start: "top bottom+=10%",
                end: "bottom top-=25%",
                scrub: true
            }
        }).from(imageWrap, {
            // Initial state when the element enters the viewport
            startAt: {
                filter: "blur(0px) brightness(100%) contrast(100%)"
            },
            z: 300,
            rotateX: 70,
            rotateZ: leftSide ? 5 : -5,
            xPercent: leftSide ? -40 : 40,
            skewX: leftSide ? -20 : 20,
            yPercent: 100,
            filter: "blur(7px) brightness(0%) contrast(400%)",
            ease: "sine"
        }).to(imageWrap, {
            // Animation when the element exits the viewport
            z: 300,
            rotateX: -50,
            rotateZ: leftSide ? -1 : 1,
            xPercent: leftSide ? -20 : 20,
            skewX: leftSide ? 10 : -10,
            filter: "blur(4px) brightness(0%) contrast(500%)",
            ease: "sine.in"
        }).from(imgEl, {
            // Additional animation on the image itself (scale along the Y-axis)
            scaleY: 1.8,
            ease: "sine"
        }, 0).to(imgEl, {
            scaleY: 1.8,
            ease: "sine.in"
        }, ">");
    });
};
// Function to animate the horizontal marquee as the user scrolls
const animateMarquee = ()=>{
    (0, _gsap.gsap).timeline({
        scrollTrigger: {
            trigger: grid,
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    }).fromTo(marqueeInner, {
        x: "200vw" // Start the marquee off-screen to the right
    }, {
        x: "-100%",
        ease: "sine"
    });
};
const localImages = {
    "project1": [
        "img/1.jpg",
        {
            type: "text",
            text: "The design of the museum showcases Suzhou\u2019s Garden tradition as part of the exhibitions, taking visitors on a journey and exploration of art, nature, and water. The museum is scheduled for completion in 2025.\n\nThe museum\u2019s main design element is the ribbon of the roof, which extends into a pattern of eaves that double as sheltered walkways through the site."
        },
        "img/2.jpg",
        {
            type: "quote",
            text: "The museum is a place where art and nature coexist harmoniously."
        },
        "img/8.jpg"
    ],
    "project2": [
        "img/4.jpg",
        "img/5.jpg",
        "img/6.jpg"
    ]
};
const handleGridItemClick = async (imageWrapper)=>{
    document.body.style.overflow = "hidden";
    const projectId = imageWrapper.dataset.projectId;
    const img = imageWrapper.querySelector(".grid__item-img");
    const initialImgSrc = img.style.backgroundImage.slice(5, -2);
    const zoomedImg = imageWrapper.cloneNode(true);
    zoomedImg.classList.add("zoomed-image");
    document.querySelectorAll(".zoomed-image").forEach((el)=>el.remove());
    document.body.appendChild(zoomedImg);
    const rect = imageWrapper.getBoundingClientRect();
    zoomedImg.style.position = "fixed";
    zoomedImg.style.zIndex = "6000";
    zoomedImg.style.transition = "none";
    zoomedImg.style.transform = "scale(1) translate3d(0, 0, 0)";
    zoomedImg.style.top = `${rect.top}px`;
    zoomedImg.style.left = `${rect.left}px`;
    zoomedImg.style.width = `${rect.width}px`;
    zoomedImg.style.height = `${rect.height}px`;
    zoomedImg.style.objectFit = "cover";
    zoomedImg.style.borderRadius = "var(--grid-item-radius)";
    zoomedImg.style.filter = imageWrapper.style.filter;
    zoomedImg.style.transition = "transform 1s ease, opacity 0.5s ease, object-fit 0.5s ease";
    const spinner = document.createElement("div");
    spinner.classList.add("spinner");
    zoomedImg.appendChild(spinner);
    const images = localImages[projectId] || [];
    images[0] = initialImgSrc;
    await new Promise((resolve)=>setTimeout(resolve, 500));
    spinner.remove();
    projectContent.innerHTML = "";
    images.forEach((imgSrc)=>{
        if (imgSrc !== null && typeof imgSrc === "object" && imgSrc.type === "text") {
            // Handle text or quote objects
            const contentElement = document.createElement("div");
            contentElement.classList.add("project-text");
            contentElement.innerText = imgSrc.text;
            projectContent.appendChild(contentElement);
        } else if (imgSrc !== null && typeof imgSrc === "object" && imgSrc.type === "quote") {
            // Handle quote objects
            const quoteElement = document.createElement("blockquote");
            quoteElement.classList.add("project-quote");
            quoteElement.innerText = imgSrc.text;
            projectContent.appendChild(quoteElement);
        } else {
            // Handle image sources
            const imgElement = document.createElement("img");
            imgElement.src = imgSrc;
            imgElement.classList.add("project-image");
            const alt = imgSrc.split("/").pop().split(".")[0]; // Extract alt text from image filename
            imgElement.alt = `${alt}`;
            projectContent.appendChild(imgElement);
        }
    });
    overlay.appendChild(projectContent);
    isOverlayOpen = true;
    // Preload images to prevent visual loading issues
    await (0, _utilsJs.preloadImages)(".project-content img");
    const overlayFirstImg = projectContent.querySelector("img");
    overlayFirstImg.style.opacity = 0; // Start with hidden image
    const firstImgRect = overlayFirstImg.getBoundingClientRect();
    overlay.classList.add("show");
    document.getElementById("main").classList.remove("shadow");
    // animate gspa timeline for zoomed image to overlay image position
    (0, _gsap.gsap).timeline().to(zoomedImg, {
        duration: 0.3,
        ease: "power2.out",
        top: `${firstImgRect.top}px`,
        left: `${firstImgRect.left}px`,
        width: `${firstImgRect.width}px`,
        height: `${firstImgRect.height}px`,
        scale: 1,
        blur: 0,
        skewX: 0,
        skewY: 0,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        translateX: 0,
        translateY: 0,
        translateZ: 0,
        onComplete: ()=>{
            overlayFirstImg.style.opacity = 1; // Fade in the first image
            (0, _gsap.gsap).to(zoomedImg, {
                duration: .2,
                opacity: 0
            }).then(()=>{
                zoomedImg.remove();
            });
        }
    }).then(async ()=>{
        // allow scrolling
        document.body.style.overflow = "auto";
        initLenisHorizontalScroll();
    });
};
const initLenisHorizontalScroll = ()=>{
    if (lenis) lenis.destroy();
    lenis = new (0, _lenisDefault.default)({
        orientation: "horizontal",
        smoothWheel: true,
        gestureOrientation: "vertical",
        wrapper: overlay,
        content: projectContent
    });
    lenis.on("scroll", (e)=>{
        const currentScroll = lenis.animatedScroll;
        const maxScrollValue = lenis.limit;
        // Check if we've reached the end of scroll
        // make sure currentScroll might be half a pixel away from maxScrollValue
        if (currentScroll >= maxScrollValue || currentScroll >= maxScrollValue - 0.5) closeOverlay();
    });
    // Animation frame loop for Lenis
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
};
// Close overlay and reset
const closeOverlay = ()=>{
    // animate overlay fade out
    overlay.classList.add("fade-out");
    setTimeout(()=>{
        overlay.classList.remove("show");
        document.getElementById("main").classList.add("shadow");
        projectContent.innerHTML = "";
        isOverlayOpen = false;
        overlay.classList.remove("fade-out");
    }, 600);
};
document.querySelectorAll(".grid__item-imgwrap").forEach((imageWrap)=>{
    imageWrap.addEventListener("click", ()=>handleGridItemClick(imageWrap));
});
closeOverlayBtn.addEventListener("click", closeOverlay);
function animateGridOnLoad() {
    window.scrollTo(0, 0);
    (0, _gsap.gsap).timeline().delay(1).to(entry, {
        left: "-100vw",
        duration: 1.5,
        opacity: 0,
        ease: "sine.out"
    }).from(nav, {
        translateY: "-100%"
    }, "=-1").to(nav, {
        translateY: "0",
        ease: "sine.out"
    }).to(grid, {
        opacity: 1,
        duration: .5,
        ease: "sine.out"
    }, "=-.5").to(window, {
        scrollTo: {
            y: document.body.clientHeight / 5
        },
        duration: 2,
        ease: "power2.out"
    }, "-=.5");
}
const init = ()=>{
    animateScrollGrid();
    animateMarquee();
    grid.style.opacity = 0;
    nav.style.translateY = "-100%";
    setTimeout(()=>{
        animateGridOnLoad();
    }, 100);
};
(0, _utilsJs.preloadImages)(".grid__item-img").then(()=>{
    document.body.classList.remove("loading");
    setTimeout(()=>{
        init();
    }, 0);
});

},{"./utils.js":"72Dku","lenis":"JS2ak","gsap":"fPSuC","gsap/ScrollTrigger":"7wnFk","gsap/ScrollToPlugin":"9xJDW","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"72Dku":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// Exporting utility functions for use in other modules.
parcelHelpers.export(exports, "preloadImages", ()=>preloadImages);
var _imagesloaded = require("imagesloaded");
var _imagesloadedDefault = parcelHelpers.interopDefault(_imagesloaded);
/**
 * Preloads images specified by the CSS selector.
 * @function
 * @param {string} [selector='img'] - CSS selector for target images.
 * @returns {Promise} - Resolves when all specified images are loaded.
 */ const preloadImages = (selector = "img")=>{
    return new Promise((resolve)=>{
        // The imagesLoaded library is used to ensure all images (including backgrounds) are fully loaded.
        (0, _imagesloadedDefault.default)(document.querySelectorAll(selector), {
            background: true
        }, resolve);
    });
};

},{"imagesloaded":"aYzyZ","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"aYzyZ":[function(require,module,exports) {
/*!
 * imagesLoaded v5.0.0
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */ (function(window1, factory) {
    // universal module definition
    if (0, module.exports) // CommonJS
    module.exports = factory(window1, require("493897767f7120e"));
    else // browser global
    window1.imagesLoaded = factory(window1, window1.EvEmitter);
})(typeof window !== "undefined" ? window : this, function factory(window1, EvEmitter) {
    let $ = window1.jQuery;
    let console = window1.console;
    // -------------------------- helpers -------------------------- //
    // turn element or nodeList into an array
    function makeArray(obj) {
        // use object if already an array
        if (Array.isArray(obj)) return obj;
        let isArrayLike = typeof obj == "object" && typeof obj.length == "number";
        // convert nodeList to array
        if (isArrayLike) return [
            ...obj
        ];
        // array of single index
        return [
            obj
        ];
    }
    // -------------------------- imagesLoaded -------------------------- //
    /**
 * @param {[Array, Element, NodeList, String]} elem
 * @param {[Object, Function]} options - if function, use as callback
 * @param {Function} onAlways - callback function
 * @returns {ImagesLoaded}
 */ function ImagesLoaded(elem, options, onAlways) {
        // coerce ImagesLoaded() without new, to be new ImagesLoaded()
        if (!(this instanceof ImagesLoaded)) return new ImagesLoaded(elem, options, onAlways);
        // use elem as selector string
        let queryElem = elem;
        if (typeof elem == "string") queryElem = document.querySelectorAll(elem);
        // bail if bad element
        if (!queryElem) {
            console.error(`Bad element for imagesLoaded ${queryElem || elem}`);
            return;
        }
        this.elements = makeArray(queryElem);
        this.options = {};
        // shift arguments if no options set
        if (typeof options == "function") onAlways = options;
        else Object.assign(this.options, options);
        if (onAlways) this.on("always", onAlways);
        this.getImages();
        // add jQuery Deferred object
        if ($) this.jqDeferred = new $.Deferred();
        // HACK check async to allow time to bind listeners
        setTimeout(this.check.bind(this));
    }
    ImagesLoaded.prototype = Object.create(EvEmitter.prototype);
    ImagesLoaded.prototype.getImages = function() {
        this.images = [];
        // filter & find items if we have an item selector
        this.elements.forEach(this.addElementImages, this);
    };
    const elementNodeTypes = [
        1,
        9,
        11
    ];
    /**
 * @param {Node} elem
 */ ImagesLoaded.prototype.addElementImages = function(elem) {
        // filter siblings
        if (elem.nodeName === "IMG") this.addImage(elem);
        // get background image on element
        if (this.options.background === true) this.addElementBackgroundImages(elem);
        // find children
        // no non-element nodes, #143
        let { nodeType } = elem;
        if (!nodeType || !elementNodeTypes.includes(nodeType)) return;
        let childImgs = elem.querySelectorAll("img");
        // concat childElems to filterFound array
        for (let img of childImgs)this.addImage(img);
        // get child background images
        if (typeof this.options.background == "string") {
            let children = elem.querySelectorAll(this.options.background);
            for (let child of children)this.addElementBackgroundImages(child);
        }
    };
    const reURL = /url\((['"])?(.*?)\1\)/gi;
    ImagesLoaded.prototype.addElementBackgroundImages = function(elem) {
        let style = getComputedStyle(elem);
        // Firefox returns null if in a hidden iframe https://bugzil.la/548397
        if (!style) return;
        // get url inside url("...")
        let matches = reURL.exec(style.backgroundImage);
        while(matches !== null){
            let url = matches && matches[2];
            if (url) this.addBackground(url, elem);
            matches = reURL.exec(style.backgroundImage);
        }
    };
    /**
 * @param {Image} img
 */ ImagesLoaded.prototype.addImage = function(img) {
        let loadingImage = new LoadingImage(img);
        this.images.push(loadingImage);
    };
    ImagesLoaded.prototype.addBackground = function(url, elem) {
        let background = new Background(url, elem);
        this.images.push(background);
    };
    ImagesLoaded.prototype.check = function() {
        this.progressedCount = 0;
        this.hasAnyBroken = false;
        // complete if no images
        if (!this.images.length) {
            this.complete();
            return;
        }
        /* eslint-disable-next-line func-style */ let onProgress = (image, elem, message)=>{
            // HACK - Chrome triggers event before object properties have changed. #83
            setTimeout(()=>{
                this.progress(image, elem, message);
            });
        };
        this.images.forEach(function(loadingImage) {
            loadingImage.once("progress", onProgress);
            loadingImage.check();
        });
    };
    ImagesLoaded.prototype.progress = function(image, elem, message) {
        this.progressedCount++;
        this.hasAnyBroken = this.hasAnyBroken || !image.isLoaded;
        // progress event
        this.emitEvent("progress", [
            this,
            image,
            elem
        ]);
        if (this.jqDeferred && this.jqDeferred.notify) this.jqDeferred.notify(this, image);
        // check if completed
        if (this.progressedCount === this.images.length) this.complete();
        if (this.options.debug && console) console.log(`progress: ${message}`, image, elem);
    };
    ImagesLoaded.prototype.complete = function() {
        let eventName = this.hasAnyBroken ? "fail" : "done";
        this.isComplete = true;
        this.emitEvent(eventName, [
            this
        ]);
        this.emitEvent("always", [
            this
        ]);
        if (this.jqDeferred) {
            let jqMethod = this.hasAnyBroken ? "reject" : "resolve";
            this.jqDeferred[jqMethod](this);
        }
    };
    // --------------------------  -------------------------- //
    function LoadingImage(img) {
        this.img = img;
    }
    LoadingImage.prototype = Object.create(EvEmitter.prototype);
    LoadingImage.prototype.check = function() {
        // If complete is true and browser supports natural sizes,
        // try to check for image status manually.
        let isComplete = this.getIsImageComplete();
        if (isComplete) {
            // report based on naturalWidth
            this.confirm(this.img.naturalWidth !== 0, "naturalWidth");
            return;
        }
        // If none of the checks above matched, simulate loading on detached element.
        this.proxyImage = new Image();
        // add crossOrigin attribute. #204
        if (this.img.crossOrigin) this.proxyImage.crossOrigin = this.img.crossOrigin;
        this.proxyImage.addEventListener("load", this);
        this.proxyImage.addEventListener("error", this);
        // bind to image as well for Firefox. #191
        this.img.addEventListener("load", this);
        this.img.addEventListener("error", this);
        this.proxyImage.src = this.img.currentSrc || this.img.src;
    };
    LoadingImage.prototype.getIsImageComplete = function() {
        // check for non-zero, non-undefined naturalWidth
        // fixes Safari+InfiniteScroll+Masonry bug infinite-scroll#671
        return this.img.complete && this.img.naturalWidth;
    };
    LoadingImage.prototype.confirm = function(isLoaded, message) {
        this.isLoaded = isLoaded;
        let { parentNode } = this.img;
        // emit progress with parent <picture> or self <img>
        let elem = parentNode.nodeName === "PICTURE" ? parentNode : this.img;
        this.emitEvent("progress", [
            this,
            elem,
            message
        ]);
    };
    // ----- events ----- //
    // trigger specified handler for event type
    LoadingImage.prototype.handleEvent = function(event) {
        let method = "on" + event.type;
        if (this[method]) this[method](event);
    };
    LoadingImage.prototype.onload = function() {
        this.confirm(true, "onload");
        this.unbindEvents();
    };
    LoadingImage.prototype.onerror = function() {
        this.confirm(false, "onerror");
        this.unbindEvents();
    };
    LoadingImage.prototype.unbindEvents = function() {
        this.proxyImage.removeEventListener("load", this);
        this.proxyImage.removeEventListener("error", this);
        this.img.removeEventListener("load", this);
        this.img.removeEventListener("error", this);
    };
    // -------------------------- Background -------------------------- //
    function Background(url, element) {
        this.url = url;
        this.element = element;
        this.img = new Image();
    }
    // inherit LoadingImage prototype
    Background.prototype = Object.create(LoadingImage.prototype);
    Background.prototype.check = function() {
        this.img.addEventListener("load", this);
        this.img.addEventListener("error", this);
        this.img.src = this.url;
        // check if image is already complete
        let isComplete = this.getIsImageComplete();
        if (isComplete) {
            this.confirm(this.img.naturalWidth !== 0, "naturalWidth");
            this.unbindEvents();
        }
    };
    Background.prototype.unbindEvents = function() {
        this.img.removeEventListener("load", this);
        this.img.removeEventListener("error", this);
    };
    Background.prototype.confirm = function(isLoaded, message) {
        this.isLoaded = isLoaded;
        this.emitEvent("progress", [
            this,
            this.element,
            message
        ]);
    };
    // -------------------------- jQuery -------------------------- //
    ImagesLoaded.makeJQueryPlugin = function(jQuery) {
        jQuery = jQuery || window1.jQuery;
        if (!jQuery) return;
        // set local variable
        $ = jQuery;
        // $().imagesLoaded()
        $.fn.imagesLoaded = function(options, onAlways) {
            let instance = new ImagesLoaded(this, options, onAlways);
            return instance.jqDeferred.promise($(this));
        };
    };
    // try making plugin
    ImagesLoaded.makeJQueryPlugin();
    // --------------------------  -------------------------- //
    return ImagesLoaded;
});

},{"493897767f7120e":"7rCHo"}],"7rCHo":[function(require,module,exports) {
/**
 * EvEmitter v2.1.1
 * Lil' event emitter
 * MIT License
 */ (function(global, factory) {
    // universal module definition
    if (0, module.exports) // CommonJS - Browserify, Webpack
    module.exports = factory();
    else // Browser globals
    global.EvEmitter = factory();
})(typeof window != "undefined" ? window : this, function() {
    function EvEmitter() {}
    let proto = EvEmitter.prototype;
    proto.on = function(eventName, listener) {
        if (!eventName || !listener) return this;
        // set events hash
        let events = this._events = this._events || {};
        // set listeners array
        let listeners = events[eventName] = events[eventName] || [];
        // only add once
        if (!listeners.includes(listener)) listeners.push(listener);
        return this;
    };
    proto.once = function(eventName, listener) {
        if (!eventName || !listener) return this;
        // add event
        this.on(eventName, listener);
        // set once flag
        // set onceEvents hash
        let onceEvents = this._onceEvents = this._onceEvents || {};
        // set onceListeners object
        let onceListeners = onceEvents[eventName] = onceEvents[eventName] || {};
        // set flag
        onceListeners[listener] = true;
        return this;
    };
    proto.off = function(eventName, listener) {
        let listeners = this._events && this._events[eventName];
        if (!listeners || !listeners.length) return this;
        let index = listeners.indexOf(listener);
        if (index != -1) listeners.splice(index, 1);
        return this;
    };
    proto.emitEvent = function(eventName, args) {
        let listeners = this._events && this._events[eventName];
        if (!listeners || !listeners.length) return this;
        // copy over to avoid interference if .off() in listener
        listeners = listeners.slice(0);
        args = args || [];
        // once stuff
        let onceListeners = this._onceEvents && this._onceEvents[eventName];
        for (let listener of listeners){
            let isOnce = onceListeners && onceListeners[listener];
            if (isOnce) {
                // remove listener
                // remove before trigger to prevent recursion
                this.off(eventName, listener);
                // unset once flag
                delete onceListeners[listener];
            }
            // trigger listener
            listener.apply(this, args);
        }
        return this;
    };
    proto.allOff = function() {
        delete this._events;
        delete this._onceEvents;
        return this;
    };
    return EvEmitter;
});

},{}],"9xJDW":[function(require,module,exports) {
/*!
 * ScrollToPlugin 3.12.5
 * https://gsap.com
 *
 * @license Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/ /* eslint-disable */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ScrollToPlugin", ()=>ScrollToPlugin);
parcelHelpers.export(exports, "default", ()=>ScrollToPlugin);
var gsap, _coreInitted, _window, _docEl, _body, _toArray, _config, ScrollTrigger, _windowExists = function _windowExists() {
    return typeof window !== "undefined";
}, _getGSAP = function _getGSAP() {
    return gsap || _windowExists() && (gsap = window.gsap) && gsap.registerPlugin && gsap;
}, _isString = function _isString(value) {
    return typeof value === "string";
}, _isFunction = function _isFunction(value) {
    return typeof value === "function";
}, _max = function _max(element, axis) {
    var dim = axis === "x" ? "Width" : "Height", scroll = "scroll" + dim, client = "client" + dim;
    return element === _window || element === _docEl || element === _body ? Math.max(_docEl[scroll], _body[scroll]) - (_window["inner" + dim] || _docEl[client] || _body[client]) : element[scroll] - element["offset" + dim];
}, _buildGetter = function _buildGetter(e, axis) {
    //pass in an element and an axis ("x" or "y") and it'll return a getter function for the scroll position of that element (like scrollTop or scrollLeft, although if the element is the window, it'll use the pageXOffset/pageYOffset or the documentElement's scrollTop/scrollLeft or document.body's. Basically this streamlines things and makes a very fast getter across browsers.
    var p = "scroll" + (axis === "x" ? "Left" : "Top");
    if (e === _window) {
        if (e.pageXOffset != null) p = "page" + axis.toUpperCase() + "Offset";
        else e = _docEl[p] != null ? _docEl : _body;
    }
    return function() {
        return e[p];
    };
}, _clean = function _clean(value, index, target, targets) {
    _isFunction(value) && (value = value(index, target, targets));
    if (typeof value !== "object") return _isString(value) && value !== "max" && value.charAt(1) !== "=" ? {
        x: value,
        y: value
    } : {
        y: value
    }; //if we don't receive an object as the parameter, assume the user intends "y".
    else if (value.nodeType) return {
        y: value,
        x: value
    };
    else {
        var result = {}, p;
        for(p in value)result[p] = p !== "onAutoKill" && _isFunction(value[p]) ? value[p](index, target, targets) : value[p];
        return result;
    }
}, _getOffset = function _getOffset(element, container) {
    element = _toArray(element)[0];
    if (!element || !element.getBoundingClientRect) return console.warn("scrollTo target doesn't exist. Using 0") || {
        x: 0,
        y: 0
    };
    var rect = element.getBoundingClientRect(), isRoot = !container || container === _window || container === _body, cRect = isRoot ? {
        top: _docEl.clientTop - (_window.pageYOffset || _docEl.scrollTop || _body.scrollTop || 0),
        left: _docEl.clientLeft - (_window.pageXOffset || _docEl.scrollLeft || _body.scrollLeft || 0)
    } : container.getBoundingClientRect(), offsets = {
        x: rect.left - cRect.left,
        y: rect.top - cRect.top
    };
    if (!isRoot && container) {
        //only add the current scroll position if it's not the window/body.
        offsets.x += _buildGetter(container, "x")();
        offsets.y += _buildGetter(container, "y")();
    }
    return offsets;
}, _parseVal = function _parseVal(value, target, axis, currentVal, offset) {
    return !isNaN(value) && typeof value !== "object" ? parseFloat(value) - offset : _isString(value) && value.charAt(1) === "=" ? parseFloat(value.substr(2)) * (value.charAt(0) === "-" ? -1 : 1) + currentVal - offset : value === "max" ? _max(target, axis) - offset : Math.min(_max(target, axis), _getOffset(value, target)[axis] - offset);
}, _initCore = function _initCore() {
    gsap = _getGSAP();
    if (_windowExists() && gsap && typeof document !== "undefined" && document.body) {
        _window = window;
        _body = document.body;
        _docEl = document.documentElement;
        _toArray = gsap.utils.toArray;
        gsap.config({
            autoKillThreshold: 7
        });
        _config = gsap.config();
        _coreInitted = 1;
    }
};
var ScrollToPlugin = {
    version: "3.12.5",
    name: "scrollTo",
    rawVars: 1,
    register: function register(core) {
        gsap = core;
        _initCore();
    },
    init: function init(target, value, tween, index, targets) {
        _coreInitted || _initCore();
        var data = this, snapType = gsap.getProperty(target, "scrollSnapType");
        data.isWin = target === _window;
        data.target = target;
        data.tween = tween;
        value = _clean(value, index, target, targets);
        data.vars = value;
        data.autoKill = !!value.autoKill;
        data.getX = _buildGetter(target, "x");
        data.getY = _buildGetter(target, "y");
        data.x = data.xPrev = data.getX();
        data.y = data.yPrev = data.getY();
        ScrollTrigger || (ScrollTrigger = gsap.core.globals().ScrollTrigger);
        gsap.getProperty(target, "scrollBehavior") === "smooth" && gsap.set(target, {
            scrollBehavior: "auto"
        });
        if (snapType && snapType !== "none") {
            // disable scroll snapping to avoid strange behavior
            data.snap = 1;
            data.snapInline = target.style.scrollSnapType;
            target.style.scrollSnapType = "none";
        }
        if (value.x != null) {
            data.add(data, "x", data.x, _parseVal(value.x, target, "x", data.x, value.offsetX || 0), index, targets);
            data._props.push("scrollTo_x");
        } else data.skipX = 1;
        if (value.y != null) {
            data.add(data, "y", data.y, _parseVal(value.y, target, "y", data.y, value.offsetY || 0), index, targets);
            data._props.push("scrollTo_y");
        } else data.skipY = 1;
    },
    render: function render(ratio, data) {
        var pt = data._pt, target = data.target, tween = data.tween, autoKill = data.autoKill, xPrev = data.xPrev, yPrev = data.yPrev, isWin = data.isWin, snap = data.snap, snapInline = data.snapInline, x, y, yDif, xDif, threshold;
        while(pt){
            pt.r(ratio, pt.d);
            pt = pt._next;
        }
        x = isWin || !data.skipX ? data.getX() : xPrev;
        y = isWin || !data.skipY ? data.getY() : yPrev;
        yDif = y - yPrev;
        xDif = x - xPrev;
        threshold = _config.autoKillThreshold;
        if (data.x < 0) //can't scroll to a position less than 0! Might happen if someone uses a Back.easeOut or Elastic.easeOut when scrolling back to the top of the page (for example)
        data.x = 0;
        if (data.y < 0) data.y = 0;
        if (autoKill) {
            //note: iOS has a bug that throws off the scroll by several pixels, so we need to check if it's within 7 pixels of the previous one that we set instead of just looking for an exact match.
            if (!data.skipX && (xDif > threshold || xDif < -threshold) && x < _max(target, "x")) data.skipX = 1; //if the user scrolls separately, we should stop tweening!
            if (!data.skipY && (yDif > threshold || yDif < -threshold) && y < _max(target, "y")) data.skipY = 1; //if the user scrolls separately, we should stop tweening!
            if (data.skipX && data.skipY) {
                tween.kill();
                data.vars.onAutoKill && data.vars.onAutoKill.apply(tween, data.vars.onAutoKillParams || []);
            }
        }
        if (isWin) _window.scrollTo(!data.skipX ? data.x : x, !data.skipY ? data.y : y);
        else {
            data.skipY || (target.scrollTop = data.y);
            data.skipX || (target.scrollLeft = data.x);
        }
        if (snap && (ratio === 1 || ratio === 0)) {
            y = target.scrollTop;
            x = target.scrollLeft;
            snapInline ? target.style.scrollSnapType = snapInline : target.style.removeProperty("scroll-snap-type");
            target.scrollTop = y + 1; // bug in Safari causes the element to totally reset its scroll position when scroll-snap-type changes, so we need to set it to a slightly different value and then back again to work around this bug.
            target.scrollLeft = x + 1;
            target.scrollTop = y;
            target.scrollLeft = x;
        }
        data.xPrev = data.x;
        data.yPrev = data.y;
        ScrollTrigger && ScrollTrigger.update();
    },
    kill: function kill(property) {
        var both = property === "scrollTo", i = this._props.indexOf(property);
        if (both || property === "scrollTo_x") this.skipX = 1;
        if (both || property === "scrollTo_y") this.skipY = 1;
        i > -1 && this._props.splice(i, 1);
        return !this._props.length;
    }
};
ScrollToPlugin.max = _max;
ScrollToPlugin.getOffset = _getOffset;
ScrollToPlugin.buildGetter = _buildGetter;
_getGSAP() && gsap.registerPlugin(ScrollToPlugin);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["l9Mez","ebWYT"], "ebWYT", "parcelRequirebfdf")

//# sourceMappingURL=index.739bf03c.js.map
