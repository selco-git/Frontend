(self.webpackChunkhrms=self.webpackChunkhrms||[]).push([[804,119,358],{4659:(e,t,n)=>{"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}n.d(t,{Z:()=>r})},4730:(e,t,n)=>{"use strict";n.d(t,{Z:()=>i});var r=n(3408);function o(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,(0,r.Z)(o.key),o)}}function i(e,t,n){return t&&o(e.prototype,t),n&&o(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}},1119:(e,t,n)=>{"use strict";n.d(t,{Z:()=>o});var r=n(3408);function o(e,t,n){return(t=(0,r.Z)(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}},4530:(e,t,n)=>{"use strict";n.d(t,{Z:()=>o});var r=n(8283);function o(e,t){if(null==e)return{};var n,o,i=(0,r.Z)(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}},8283:(e,t,n)=>{"use strict";function r(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}n.d(t,{Z:()=>r})},513:(e,t,n)=>{"use strict";function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function o(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i,a,c=[],s=!0,u=!1;try{if(i=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;s=!1}else for(;!(s=(r=i.call(n)).done)&&(c.push(r.value),c.length!==t);s=!0);}catch(e){u=!0,o=e}finally{try{if(!s&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(u)throw o}}return c}}(e,t)||function(e,t){if(e){if("string"==typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}n.d(t,{Z:()=>o})},3408:(e,t,n)=>{"use strict";n.d(t,{Z:()=>o});var r=n(929);function o(e){var t=function(e,t){if("object"!==(0,r.Z)(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var o=n.call(e,"string");if("object"!==(0,r.Z)(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"===(0,r.Z)(t)?t:String(t)}},929:(e,t,n)=>{"use strict";function r(e){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(e)}n.d(t,{Z:()=>r})},6863:(e,t,n)=>{"use strict";n.d(t,{A:()=>a});var r="".replace,o=/&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34);/g,i={"&amp;":"&","&#38;":"&","&lt;":"<","&#60;":"<","&gt;":">","&#62;":">","&apos;":"'","&#39;":"'","&quot;":'"',"&#34;":'"'};function a(e){return r.call(e,o,c)}function c(e){return i[e]}},1725:(e,t,n)=>{"use strict";n.d(t,{Z:()=>p});var r=n(4896),o=n.n(r),i=/\s([^'"/\s><]+?)[\s/>]|([^\s=]+)=\s?(".*?"|'.*?')/g;function a(e){var t={type:"tag",name:"",voidElement:!1,attrs:{},children:[]},n=e.match(/<\/?([^\s]+?)[/\s>]/);if(n&&(t.name=n[1],(o()[n[1]]||"/"===e.charAt(e.length-2))&&(t.voidElement=!0),t.name.startsWith("!--"))){var r=e.indexOf("--\x3e");return{type:"comment",comment:-1!==r?e.slice(4,r):""}}for(var a=new RegExp(i),c=null;null!==(c=a.exec(e));)if(c[0].trim())if(c[1]){var s=c[1].trim(),u=[s,""];s.indexOf("=")>-1&&(u=s.split("=")),t.attrs[u[0]]=u[1],a.lastIndex--}else c[2]&&(t.attrs[c[2]]=c[3].trim().substring(1,c[3].length-1));return t}var c=/<[a-zA-Z0-9\-\!\/](?:"[^"]*"|'[^']*'|[^'">])*>/g,s=/^\s*$/,u=Object.create(null);function l(e,t){switch(t.type){case"text":return e+t.content;case"tag":return e+="<"+t.name+(t.attrs?function(e){var t=[];for(var n in e)t.push(n+'="'+e[n]+'"');return t.length?" "+t.join(" "):""}(t.attrs):"")+(t.voidElement?"/>":">"),t.voidElement?e:e+t.children.reduce(l,"")+"</"+t.name+">";case"comment":return e+"\x3c!--"+t.comment+"--\x3e"}}var f={parse:function(e,t){t||(t={}),t.components||(t.components=u);var n,r=[],o=[],i=-1,l=!1;if(0!==e.indexOf("<")){var f=e.indexOf("<");r.push({type:"text",content:-1===f?e:e.substring(0,f)})}return e.replace(c,(function(c,u){if(l){if(c!=="</"+n.name+">")return;l=!1}var f,p="/"!==c.charAt(1),d=c.startsWith("\x3c!--"),y=u+c.length,m=e.charAt(y);if(d){var g=a(c);return i<0?(r.push(g),r):((f=o[i]).children.push(g),r)}if(p&&(i++,"tag"===(n=a(c)).type&&t.components[n.name]&&(n.type="component",l=!0),n.voidElement||l||!m||"<"===m||n.children.push({type:"text",content:e.slice(y,e.indexOf("<",y))}),0===i&&r.push(n),(f=o[i-1])&&f.children.push(n),o[i]=n),(!p||n.voidElement)&&(i>-1&&(n.voidElement||n.name===c.slice(2,-1))&&(i--,n=-1===i?r:o[i]),!l&&"<"!==m&&m)){f=-1===i?r:o[i].children;var v=e.indexOf("<",y),b=e.slice(y,-1===v?void 0:v);s.test(b)&&(b=" "),(v>-1&&i+f.length>=0||" "!==b)&&f.push({type:"text",content:b})}})),r},stringify:function(e){return e.reduce((function(e,t){return e+l("",t)}),"")}};const p=f},4896:e=>{e.exports={area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0}},804:(e,t,n)=>{"use strict";n.r(t),n.d(t,{I18nContext:()=>g,I18nextProvider:()=>G,Trans:()=>B,Translation:()=>Y,composeInitialProps:()=>P,date:()=>ee,getDefaults:()=>b,getI18n:()=>j,getInitialProps:()=>E,initReactI18next:()=>w,number:()=>ne,plural:()=>oe,select:()=>re,selectOrdinal:()=>ie,setDefaults:()=>v,setI18n:()=>O,time:()=>te,useSSR:()=>J,useTranslation:()=>V,withSSR:()=>_,withTranslation:()=>$});var r=n(4530),o=n(929),i=n(1119),a=n(2212),c=n.n(a),s=n(1725),u=n(6863),l=n(4659),f=n(4730);function p(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function d(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?p(Object(n),!0).forEach((function(t){(0,i.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):p(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var y,m={bindI18n:"languageChanged",bindI18nStore:"",transEmptyNodeValue:"",transSupportBasicHtmlNodes:!0,transWrapTextNodes:"",transKeepBasicHtmlNodesFor:["br","strong","i","p"],useSuspense:!0},g=c().createContext();function v(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};m=d(d({},m),e)}function b(){return m}var h=function(){function e(){(0,l.Z)(this,e),this.usedNamespaces={}}return(0,f.Z)(e,[{key:"addUsedNamespaces",value:function(e){var t=this;e.forEach((function(e){t.usedNamespaces[e]||(t.usedNamespaces[e]=!0)}))}},{key:"getUsedNamespaces",value:function(){return Object.keys(this.usedNamespaces)}}]),e}();function O(e){y=e}function j(){return y}var w={type:"3rdParty",init:function(e){v(e.options.react),O(e)}};function P(e){return function(t){return new Promise((function(n){var r=E();e.getInitialProps?e.getInitialProps(t).then((function(e){n(d(d({},e),r))})):n(r)}))}}function E(){var e=j(),t=e.reportNamespaces?e.reportNamespaces.getUsedNamespaces():[],n={},r={};return e.languages.forEach((function(n){r[n]={},t.forEach((function(t){r[n][t]=e.getResourceBundle(n,t)||{}}))})),n.initialI18nStore=r,n.initialLanguage=e.language,n}function S(){if(console&&console.warn){for(var e,t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];"string"==typeof n[0]&&(n[0]="react-i18next:: ".concat(n[0])),(e=console).warn.apply(e,n)}}var x={};function k(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];"string"==typeof t[0]&&x[t[0]]||("string"==typeof t[0]&&(x[t[0]]=new Date),S.apply(void 0,t))}function N(e,t,n){e.loadNamespaces(t,(function(){e.isInitialized?n():e.on("initialized",(function t(){setTimeout((function(){e.off("initialized",t)}),0),n()}))}))}function Z(e){return e.displayName||e.name||("string"==typeof e&&e.length>0?e:"Unknown")}var I=["format"],D=["children","count","parent","i18nKey","context","tOptions","values","defaults","components","ns","i18n","t","shouldUnescape"];function R(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function C(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?R(Object(n),!0).forEach((function(t){(0,i.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):R(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function A(e,t){if(!e)return!1;var n=e.props?e.props.children:e.children;return t?n.length>0:!!n}function T(e){return e?e&&e.children?e.children:e.props&&e.props.children:[]}function z(e){return Array.isArray(e)?e:[e]}function L(e,t){if(!e)return"";var n="",i=z(e),a=t.transSupportBasicHtmlNodes&&t.transKeepBasicHtmlNodesFor?t.transKeepBasicHtmlNodesFor:[];return i.forEach((function(e,i){if("string"==typeof e)n+="".concat(e);else if(c().isValidElement(e)){var s=Object.keys(e.props).length,u=a.indexOf(e.type)>-1,l=e.props.children;if(!l&&u&&0===s)n+="<".concat(e.type,"/>");else if(l||u&&0===s)if(e.props.i18nIsDynamicList)n+="<".concat(i,"></").concat(i,">");else if(u&&1===s&&"string"==typeof l)n+="<".concat(e.type,">").concat(l,"</").concat(e.type,">");else{var f=L(l,t);n+="<".concat(i,">").concat(f,"</").concat(i,">")}else n+="<".concat(i,"></").concat(i,">")}else if(null===e)S("Trans: the passed in value is invalid - seems you passed in a null child.");else if("object"===(0,o.Z)(e)){var p=e.format,d=(0,r.Z)(e,I),y=Object.keys(d);if(1===y.length){var m=p?"".concat(y[0],", ").concat(p):y[0];n+="{{".concat(m,"}}")}else S("react-i18next: the passed in object contained more than one variable - the object should look like {{ value, format }} where format is optional.",e)}else S("Trans: the passed in value is invalid - seems you passed in a variable like {number} - please pass in variables for interpolation as full objects like {{number}}.",e)})),n}function B(e){var t=e.children,n=e.count,i=e.parent,l=e.i18nKey,f=e.context,p=e.tOptions,d=void 0===p?{}:p,y=e.values,m=e.defaults,v=e.components,h=e.ns,O=e.i18n,w=e.t,P=e.shouldUnescape,E=(0,r.Z)(e,D),S=(0,a.useContext)(g)||{},x=S.i18n,N=S.defaultNS,Z=O||x||j();if(!Z)return k("You will need to pass in an i18next instance by using i18nextReactModule"),t;var I=w||Z.t.bind(Z)||function(e){return e};f&&(d.context=f);var R=C(C({},b()),Z.options&&Z.options.react),B=h||I.ns||N||Z.options&&Z.options.defaultNS;B="string"==typeof B?[B]:B||["translation"];var U=m||L(t,R)||R.transEmptyNodeValue||l,H=R.hashTransKey,K=l||(H?H(U):U),V=y?d.interpolation:{interpolation:C(C({},d.interpolation),{},{prefix:"#$?",suffix:"?$#"})},F=C(C(C(C({},d),{},{count:n},y),V),{},{defaultValue:U,ns:B}),W=function(e,t,n,r,i,a){if(""===t)return[];var l=r.transKeepBasicHtmlNodesFor||[],f=t&&new RegExp(l.join("|")).test(t);if(!e&&!f)return[t];var p={};!function e(t){z(t).forEach((function(t){"string"!=typeof t&&(A(t)?e(T(t)):"object"!==(0,o.Z)(t)||c().isValidElement(t)||Object.assign(p,t))}))}(e);var d=s.Z.parse("<0>".concat(t,"</0>")),y=C(C({},p),i);function m(e,t,n){var r=T(e),o=v(r,t.children,n);return function(e){return"[object Array]"===Object.prototype.toString.call(e)&&e.every((function(e){return c().isValidElement(e)}))}(r)&&0===o.length?r:o}function g(e,t,n,r,o){e.dummy&&(e.children=t),n.push(c().cloneElement(e,C(C({},e.props),{},{key:r}),o?void 0:t))}function v(t,i,s){var p=z(t);return z(i).reduce((function(t,i,d){var b,h,O,j=i.children&&i.children[0]&&i.children[0].content&&n.services.interpolator.interpolate(i.children[0].content,y,n.language);if("tag"===i.type){var w=p[parseInt(i.name,10)];!w&&1===s.length&&s[0][i.name]&&(w=s[0][i.name]),w||(w={});var P=0!==Object.keys(i.attrs).length?(b={props:i.attrs},(O=C({},h=w)).props=Object.assign(b.props,h.props),O):w,E=c().isValidElement(P),S=E&&A(i,!0)&&!i.voidElement,x=f&&"object"===(0,o.Z)(P)&&P.dummy&&!E,k="object"===(0,o.Z)(e)&&null!==e&&Object.hasOwnProperty.call(e,i.name);if("string"==typeof P){var N=n.services.interpolator.interpolate(P,y,n.language);t.push(N)}else if(A(P)||S)g(P,m(P,i,s),t,d);else if(x){var Z=v(p,i.children,s);t.push(c().cloneElement(P,C(C({},P.props),{},{key:d}),Z))}else if(Number.isNaN(parseFloat(i.name)))if(k)g(P,m(P,i,s),t,d,i.voidElement);else if(r.transSupportBasicHtmlNodes&&l.indexOf(i.name)>-1)if(i.voidElement)t.push(c().createElement(i.name,{key:"".concat(i.name,"-").concat(d)}));else{var I=v(p,i.children,s);t.push(c().createElement(i.name,{key:"".concat(i.name,"-").concat(d)},I))}else if(i.voidElement)t.push("<".concat(i.name," />"));else{var D=v(p,i.children,s);t.push("<".concat(i.name,">").concat(D,"</").concat(i.name,">"))}else if("object"!==(0,o.Z)(P)||E)1===i.children.length&&j?t.push(c().cloneElement(P,C(C({},P.props),{},{key:d}),j)):t.push(c().cloneElement(P,C(C({},P.props),{},{key:d})));else{var R=i.children[0]?j:null;R&&t.push(R)}}else if("text"===i.type){var T=r.transWrapTextNodes,z=a?(0,u.A)(n.services.interpolator.interpolate(i.content,y,n.language)):n.services.interpolator.interpolate(i.content,y,n.language);T?t.push(c().createElement(T,{key:"".concat(i.name,"-").concat(d)},z)):t.push(z)}return t}),[])}return T(v([{dummy:!0,children:e||[]}],d,z(e||[]))[0])}(v||t,K?I(K,F):U,Z,R,F,P),M=void 0!==i?i:R.defaultTransParent;return M?c().createElement(M,E,W):W}var U=n(513);function H(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function K(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?H(Object(n),!0).forEach((function(t){(0,i.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):H(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function V(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.i18n,r=(0,a.useContext)(g)||{},o=r.i18n,i=r.defaultNS,c=n||o||j();if(c&&!c.reportNamespaces&&(c.reportNamespaces=new h),!c){k("You will need to pass in an i18next instance by using initReactI18next");var s=function(e){return Array.isArray(e)?e[e.length-1]:e},u=[s,{},!1];return u.t=s,u.i18n={},u.ready=!1,u}c.options.react&&void 0!==c.options.react.wait&&k("It seems you are still using the old wait option, you may migrate to the new useSuspense behaviour.");var l=K(K(K({},b()),c.options.react),t),f=l.useSuspense,p=l.keyPrefix,d=e||i||c.options&&c.options.defaultNS;d="string"==typeof d?[d]:d||["translation"],c.reportNamespaces.addUsedNamespaces&&c.reportNamespaces.addUsedNamespaces(d);var y=(c.isInitialized||c.initializedStoreOnce)&&d.every((function(e){return function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(!t.languages||!t.languages.length)return k("i18n.languages were undefined or empty",t.languages),!0;var r=t.languages[0],o=!!t.options&&t.options.fallbackLng,i=t.languages[t.languages.length-1];if("cimode"===r.toLowerCase())return!0;var a=function(e,n){var r=t.services.backendConnector.state["".concat(e,"|").concat(n)];return-1===r||2===r};return!(n.bindI18n&&n.bindI18n.indexOf("languageChanging")>-1&&t.services.backendConnector.backend&&t.isLanguageChangingTo&&!a(t.isLanguageChangingTo,e)||!t.hasResourceBundle(r,e)&&t.services.backendConnector.backend&&(!a(r,e)||o&&!a(i,e)))}(e,c,l)}));function m(){return c.getFixedT(null,"fallback"===l.nsMode?d:d[0],p)}var v=(0,a.useState)(m),O=(0,U.Z)(v,2),w=O[0],P=O[1],E=(0,a.useRef)(!0);(0,a.useEffect)((function(){var e=l.bindI18n,t=l.bindI18nStore;function n(){E.current&&P(m)}return E.current=!0,y||f||N(c,d,(function(){E.current&&P(m)})),e&&c&&c.on(e,n),t&&c&&c.store.on(t,n),function(){E.current=!1,e&&c&&e.split(" ").forEach((function(e){return c.off(e,n)})),t&&c&&t.split(" ").forEach((function(e){return c.store.off(e,n)}))}}),[c,d.join()]);var S=(0,a.useRef)(!0);(0,a.useEffect)((function(){E.current&&!S.current&&P(m),S.current=!1}),[c]);var x=[w,c,y];if(x.t=w,x.i18n=c,x.ready=y,y)return x;if(!y&&!f)return x;throw new Promise((function(e){N(c,d,(function(){e()}))}))}var F=["forwardedRef"];function W(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function M(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?W(Object(n),!0).forEach((function(t){(0,i.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):W(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function $(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return function(n){function o(o){var i=o.forwardedRef,a=(0,r.Z)(o,F),s=V(e,a),u=(0,U.Z)(s,3),l=u[0],f=u[1],p=u[2],d=M(M({},a),{},{t:l,i18n:f,tReady:p});return t.withRef&&i?d.ref=i:!t.withRef&&i&&(d.forwardedRef=i),c().createElement(n,d)}return o.displayName="withI18nextTranslation(".concat(Z(n),")"),o.WrappedComponent=n,t.withRef?c().forwardRef((function(e,t){return c().createElement(o,Object.assign({},e,{forwardedRef:t}))})):o}}var q=["ns","children"];function Y(e){var t=e.ns,n=e.children,o=V(t,(0,r.Z)(e,q)),i=(0,U.Z)(o,3),a=i[0],c=i[1],s=i[2];return n(a,{i18n:c,lng:c.language},s)}function G(e){var t=e.i18n,n=e.defaultNS,r=e.children,o=(0,a.useMemo)((function(){return{i18n:t,defaultNS:n}}),[t,n]);return(0,a.createElement)(g.Provider,{value:o},r)}function J(e,t){var n=(arguments.length>2&&void 0!==arguments[2]?arguments[2]:{}).i18n,r=((0,a.useContext)(g)||{}).i18n,o=n||r||j();o.options&&o.options.isClone||(e&&!o.initializedStoreOnce&&(o.services.resourceStore.data=e,o.options.ns=Object.values(e).reduce((function(e,t){return Object.keys(t).forEach((function(t){e.indexOf(t)<0&&e.push(t)})),e}),o.options.ns),o.initializedStoreOnce=!0,o.isInitialized=!0),t&&!o.initializedLanguageOnce&&(o.changeLanguage(t),o.initializedLanguageOnce=!0))}var Q=["initialI18nStore","initialLanguage"];function X(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function _(){return function(e){function t(t){var n=t.initialI18nStore,o=t.initialLanguage,a=(0,r.Z)(t,Q);return J(n,o),c().createElement(e,function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?X(Object(n),!0).forEach((function(t){(0,i.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):X(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},a))}return t.getInitialProps=P(e),t.displayName="withI18nextSSR(".concat(Z(e),")"),t.WrappedComponent=e,t}}var ee=function(){return""},te=function(){return""},ne=function(){return""},re=function(){return""},oe=function(){return""},ie=function(){return""}}}]);