if(!self.define){let e,a={};const i=(i,n)=>(i=new URL(i+".js",n).href,a[i]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=a,document.head.appendChild(e)}else e=i,importScripts(i),a()})).then((()=>{let e=a[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,s)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(a[o])return;let r={};const c=e=>i(e,o),d={module:{uri:o},exports:r,require:c};a[o]=Promise.all(n.map((e=>d[e]||c(e)))).then((e=>(s(...e),r)))}}define(["./workbox-9feaa97c"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/CNAME",revision:"342e2e95de1d0144b6dda41a67fcb3fa"},{url:"/_next/static/KvmPPwgFPBFfDfLEjGpAv/_buildManifest.js",revision:"8ab69c267201dc7bd9996e7eeab0ab55"},{url:"/_next/static/KvmPPwgFPBFfDfLEjGpAv/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/149.a6762daad80016e5.js",revision:"a6762daad80016e5"},{url:"/_next/static/chunks/33.c965fc8231201b4a.js",revision:"c965fc8231201b4a"},{url:"/_next/static/chunks/framework-dc56d7adc2c8b60d.js",revision:"dc56d7adc2c8b60d"},{url:"/_next/static/chunks/main-72fbb6b3e7eef2ec.js",revision:"72fbb6b3e7eef2ec"},{url:"/_next/static/chunks/pages/_app-d1a0b2b4e7455568.js",revision:"d1a0b2b4e7455568"},{url:"/_next/static/chunks/pages/_error-83a42c239446e264.js",revision:"83a42c239446e264"},{url:"/_next/static/chunks/pages/index-5b516b0fc1dcd375.js",revision:"5b516b0fc1dcd375"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-97fc43baeeda75d8.js",revision:"97fc43baeeda75d8"},{url:"/_next/static/css/38d8b5e4c73f9193.css",revision:"38d8b5e4c73f9193"},{url:"/_next/static/css/ae78413178e18df3.css",revision:"ae78413178e18df3"},{url:"/android/android-launchericon-144-144.png",revision:"c49199ad7bd80ed3c0b1b9dd83ec5a98"},{url:"/android/android-launchericon-192-192.png",revision:"49f698fc1ed8366716205e663f67fd2b"},{url:"/android/android-launchericon-48-48.png",revision:"83b8868fe1d4f3aab4b079467dee0fcd"},{url:"/android/android-launchericon-512-512.png",revision:"bdea78a0eee2e523e601115789986f70"},{url:"/android/android-launchericon-72-72.png",revision:"bd53404fbaccc4ee175a35a5776543a2"},{url:"/android/android-launchericon-96-96.png",revision:"5a8b94d4d53e7f7377b83c6c5f9e473c"},{url:"/favicon.ico",revision:"50ccba15ce4a50b98ed822cb29e691de"},{url:"/fonts/Montserrat/Montserrat-Italic-VariableFont_wght.ttf",revision:"c7ef29737ac0c81becc51ffbd2d6feed"},{url:"/fonts/Montserrat/Montserrat-VariableFont_wght.ttf",revision:"a3fcdff002f26cdf718968593b0d9e47"},{url:"/fonts/Montserrat/OFL.txt",revision:"b5170b54aff412cfd0bed5aa23205738"},{url:"/fonts/Montserrat/README.txt",revision:"f4adfe35eaeb5c7b0621cd8dbddb966d"},{url:"/godot-logo.svg",revision:"0e72949874c0cc7747f8551c86623df3"},{url:"/icons.json",revision:"3877111e7542901178e58b30f8e9f53c"},{url:"/ios/100.png",revision:"51f26cb87bdad7919dc945eee5b8615b"},{url:"/ios/1024.png",revision:"adb1486a9ce3c325f430f83611fdc21f"},{url:"/ios/114.png",revision:"b894c7a0f793172cef929b95cfab080d"},{url:"/ios/120.png",revision:"c41a0f069abd63bf69f11dcd79aea3e7"},{url:"/ios/128.png",revision:"01689537d2a7770baa706acf804cd2e7"},{url:"/ios/144.png",revision:"c49199ad7bd80ed3c0b1b9dd83ec5a98"},{url:"/ios/152.png",revision:"bc244aff57464bc8df5a1538658d8d87"},{url:"/ios/16.png",revision:"5731765f8eaa9ffc3ba0e28c4a3e3e26"},{url:"/ios/167.png",revision:"444a342b15be5b1545605b450db1405a"},{url:"/ios/180.png",revision:"60d8d2d45e88b9750bcd6578297d4224"},{url:"/ios/192.png",revision:"49f698fc1ed8366716205e663f67fd2b"},{url:"/ios/20.png",revision:"636baa024560fcfe17b5cd6f65d90b9e"},{url:"/ios/256.png",revision:"c73b22171674a7934e4c8115f4ce724f"},{url:"/ios/29.png",revision:"b106c3f3d0519cb8e70945456818d6b1"},{url:"/ios/32.png",revision:"f420415b9671f4eecbbd530724c0291e"},{url:"/ios/40.png",revision:"b66ab2828ccf1708eb918291b2cc3831"},{url:"/ios/50.png",revision:"2bb1a4adc556f82952c13e321b55fe7b"},{url:"/ios/512.png",revision:"bdea78a0eee2e523e601115789986f70"},{url:"/ios/57.png",revision:"b73334eb1f2f7dcbf22209d471869582"},{url:"/ios/58.png",revision:"0931c8c10366428d2d9ca7d5274fac5b"},{url:"/ios/60.png",revision:"a32a71312ea51b4220ee26129ba1a49a"},{url:"/ios/64.png",revision:"b5d7744fb7455b31f05d160c24c9dac4"},{url:"/ios/72.png",revision:"bd53404fbaccc4ee175a35a5776543a2"},{url:"/ios/76.png",revision:"e0f496825e31f4437dda9ff19154c0a3"},{url:"/ios/80.png",revision:"42402d37240610e8cb84860274ff37de"},{url:"/ios/87.png",revision:"2e617704bcf3f3af103167fe50cc8735"},{url:"/manifest.json",revision:"22797c76920c57698027512bf6b85071"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"},{url:"/windows11/LargeTile.scale-100.png",revision:"f308dd057f39575758e8008ef53d7534"},{url:"/windows11/LargeTile.scale-125.png",revision:"d5ae02329989994d7cb92eb320cab7b5"},{url:"/windows11/LargeTile.scale-150.png",revision:"929a897c8e3b9606761ff79417f4276d"},{url:"/windows11/LargeTile.scale-200.png",revision:"3be8cb679016aca80e6274c5c021d1a7"},{url:"/windows11/LargeTile.scale-400.png",revision:"f74cca8d9bb02e0c0ed75ab5a358611c"},{url:"/windows11/SmallTile.scale-100.png",revision:"a9db838365f719745b0e61ce6622aab7"},{url:"/windows11/SmallTile.scale-125.png",revision:"ded12330820ff9094a99ee6fbaae39c7"},{url:"/windows11/SmallTile.scale-150.png",revision:"282bfa59e66fa714703d57a4decdb694"},{url:"/windows11/SmallTile.scale-200.png",revision:"c7d7041a0e7c3a4d8914cd7fb66abbd2"},{url:"/windows11/SmallTile.scale-400.png",revision:"79837a6d031dd8a1e90b5d31b7bc8632"},{url:"/windows11/SplashScreen.scale-100.png",revision:"690c535b89ccb9eba78c0b61a08c947a"},{url:"/windows11/SplashScreen.scale-125.png",revision:"fbb133a12070e523c869717f69c29424"},{url:"/windows11/SplashScreen.scale-150.png",revision:"afeb73290f71b35f3ac8dd56094f5e7f"},{url:"/windows11/SplashScreen.scale-200.png",revision:"e5d52986cad6416d65282844cde465e9"},{url:"/windows11/SplashScreen.scale-400.png",revision:"1a3a50a20a0b9146a9a4e08fbe461d43"},{url:"/windows11/Square150x150Logo.scale-100.png",revision:"e76e73b1cb5de44953bab9867cd88144"},{url:"/windows11/Square150x150Logo.scale-125.png",revision:"e50f5ea4c82abb55bbb24e5c8f8f5818"},{url:"/windows11/Square150x150Logo.scale-150.png",revision:"3826803f371200b0a58a6aca09886e9e"},{url:"/windows11/Square150x150Logo.scale-200.png",revision:"0f125bd065a8182e66dc93fe618205b4"},{url:"/windows11/Square150x150Logo.scale-400.png",revision:"9169253df261955b86992b87c5c4e07b"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-16.png",revision:"a12468653fa9c8f3e40cb45f557ef51b"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-20.png",revision:"7e8645726e54226ce4f12fa513f83a67"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-24.png",revision:"68f01d90b6b89de67de332877ae63142"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-256.png",revision:"50f49f9701032b4d5fbf8d31bce12f02"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-30.png",revision:"42ff6f10064e307e8cabd7e93e9e5f07"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-32.png",revision:"936857d71ccaefebca656f67f72e9d01"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-36.png",revision:"093396f3eafba5cc32d88bfb43c05c7e"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-40.png",revision:"c3dc6ef31f5ca426c7b8a3eed2931f84"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-44.png",revision:"b7d702cea225fd9bae826b9e821dce0c"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-48.png",revision:"c799d4b6dbf7692d1f67cc3b2509c084"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-60.png",revision:"b56b6aa828677568f0517c8a64739b97"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-64.png",revision:"48433d06a3b29a30760229b97e925eb7"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-72.png",revision:"9ebd9d544e500dec700241c863b7889f"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-80.png",revision:"42b5528e7cc5973b9ff0557e6889afb9"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-96.png",revision:"f5f8afe02c9d590b8b771ea346c23d94"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-16.png",revision:"a12468653fa9c8f3e40cb45f557ef51b"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-20.png",revision:"7e8645726e54226ce4f12fa513f83a67"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-24.png",revision:"68f01d90b6b89de67de332877ae63142"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-256.png",revision:"50f49f9701032b4d5fbf8d31bce12f02"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-30.png",revision:"42ff6f10064e307e8cabd7e93e9e5f07"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-32.png",revision:"936857d71ccaefebca656f67f72e9d01"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-36.png",revision:"093396f3eafba5cc32d88bfb43c05c7e"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-40.png",revision:"c3dc6ef31f5ca426c7b8a3eed2931f84"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-44.png",revision:"b7d702cea225fd9bae826b9e821dce0c"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-48.png",revision:"c799d4b6dbf7692d1f67cc3b2509c084"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-60.png",revision:"b56b6aa828677568f0517c8a64739b97"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-64.png",revision:"48433d06a3b29a30760229b97e925eb7"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-72.png",revision:"9ebd9d544e500dec700241c863b7889f"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-80.png",revision:"42b5528e7cc5973b9ff0557e6889afb9"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-96.png",revision:"f5f8afe02c9d590b8b771ea346c23d94"},{url:"/windows11/Square44x44Logo.scale-100.png",revision:"b7d702cea225fd9bae826b9e821dce0c"},{url:"/windows11/Square44x44Logo.scale-125.png",revision:"f22c6810f027e38749a17101d1af6541"},{url:"/windows11/Square44x44Logo.scale-150.png",revision:"5139b5cf51e13bf7b973776f5213cfec"},{url:"/windows11/Square44x44Logo.scale-200.png",revision:"3c43a206ee521462bea50fbe87687d0a"},{url:"/windows11/Square44x44Logo.scale-400.png",revision:"160ef2b35cb4d7940f90ba252ea9901c"},{url:"/windows11/Square44x44Logo.targetsize-16.png",revision:"a12468653fa9c8f3e40cb45f557ef51b"},{url:"/windows11/Square44x44Logo.targetsize-20.png",revision:"7e8645726e54226ce4f12fa513f83a67"},{url:"/windows11/Square44x44Logo.targetsize-24.png",revision:"68f01d90b6b89de67de332877ae63142"},{url:"/windows11/Square44x44Logo.targetsize-256.png",revision:"50f49f9701032b4d5fbf8d31bce12f02"},{url:"/windows11/Square44x44Logo.targetsize-30.png",revision:"42ff6f10064e307e8cabd7e93e9e5f07"},{url:"/windows11/Square44x44Logo.targetsize-32.png",revision:"936857d71ccaefebca656f67f72e9d01"},{url:"/windows11/Square44x44Logo.targetsize-36.png",revision:"093396f3eafba5cc32d88bfb43c05c7e"},{url:"/windows11/Square44x44Logo.targetsize-40.png",revision:"c3dc6ef31f5ca426c7b8a3eed2931f84"},{url:"/windows11/Square44x44Logo.targetsize-44.png",revision:"b7d702cea225fd9bae826b9e821dce0c"},{url:"/windows11/Square44x44Logo.targetsize-48.png",revision:"c799d4b6dbf7692d1f67cc3b2509c084"},{url:"/windows11/Square44x44Logo.targetsize-60.png",revision:"b56b6aa828677568f0517c8a64739b97"},{url:"/windows11/Square44x44Logo.targetsize-64.png",revision:"48433d06a3b29a30760229b97e925eb7"},{url:"/windows11/Square44x44Logo.targetsize-72.png",revision:"9ebd9d544e500dec700241c863b7889f"},{url:"/windows11/Square44x44Logo.targetsize-80.png",revision:"42b5528e7cc5973b9ff0557e6889afb9"},{url:"/windows11/Square44x44Logo.targetsize-96.png",revision:"f5f8afe02c9d590b8b771ea346c23d94"},{url:"/windows11/StoreLogo.scale-100.png",revision:"2bb1a4adc556f82952c13e321b55fe7b"},{url:"/windows11/StoreLogo.scale-125.png",revision:"981417984d60d5366e0acaf21a7bd20d"},{url:"/windows11/StoreLogo.scale-150.png",revision:"8923b0d74b84511b476f7dfa8f7035f5"},{url:"/windows11/StoreLogo.scale-200.png",revision:"51f26cb87bdad7919dc945eee5b8615b"},{url:"/windows11/StoreLogo.scale-400.png",revision:"6174fe94652d0feaaa69e15e4d79eb3e"},{url:"/windows11/Wide310x150Logo.scale-100.png",revision:"081afac125f33844c1fd05ceff3cf5a7"},{url:"/windows11/Wide310x150Logo.scale-125.png",revision:"e50b56b947c1d068f9de6abce0107b6d"},{url:"/windows11/Wide310x150Logo.scale-150.png",revision:"5c489392a7c62125be8c7a7aa64b9e1b"},{url:"/windows11/Wide310x150Logo.scale-200.png",revision:"690c535b89ccb9eba78c0b61a08c947a"},{url:"/windows11/Wide310x150Logo.scale-400.png",revision:"e5d52986cad6416d65282844cde465e9"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:a,event:i,state:n})=>a&&"opaqueredirect"===a.type?new Response(a.body,{status:200,statusText:"OK",headers:a.headers}):a}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const a=e.pathname;return!a.startsWith("/api/auth/")&&!!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
