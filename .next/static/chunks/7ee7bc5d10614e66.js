(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,96086,(e,t,s)=>{t.exports=e.r(9187)},94744,e=>{"use strict";let t,s;var a,r=e.i(30668);let i={data:""},o=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,l=/\/\*[^]*?\*\/|  +/g,n=/\n+/g,d=(e,t)=>{let s="",a="",r="";for(let i in e){let o=e[i];"@"==i[0]?"i"==i[1]?s=i+" "+o+";":a+="f"==i[1]?d(o,i):i+"{"+d(o,"k"==i[1]?"":t)+"}":"object"==typeof o?a+=d(o,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=o&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),r+=d.p?d.p(i,o):i+":"+o+";")}return s+(t&&r?t+"{"+r+"}":r)+a},c={},u=e=>{if("object"==typeof e){let t="";for(let s in e)t+=s+u(e[s]);return t}return e};function p(e){let t,s,a=this||{},r=e.call?e(a.p):e;return((e,t,s,a,r)=>{var i;let p=u(e),m=c[p]||(c[p]=(e=>{let t=0,s=11;for(;t<e.length;)s=101*s+e.charCodeAt(t++)>>>0;return"go"+s})(p));if(!c[m]){let t=p!==e?e:(e=>{let t,s,a=[{}];for(;t=o.exec(e.replace(l,""));)t[4]?a.shift():t[3]?(s=t[3].replace(n," ").trim(),a.unshift(a[0][s]=a[0][s]||{})):a[0][t[1]]=t[2].replace(n," ").trim();return a[0]})(e);c[m]=d(r?{["@keyframes "+m]:t}:t,s?"":"."+m)}let f=s&&c.g?c.g:null;return s&&(c.g=c[m]),i=c[m],f?t.data=t.data.replace(f,i):-1===t.data.indexOf(i)&&(t.data=a?i+t.data:t.data+i),m})(r.unshift?r.raw?(t=[].slice.call(arguments,1),s=a.p,r.reduce((e,a,r)=>{let i=t[r];if(i&&i.call){let e=i(s),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":d(e,""):!1===e?"":e}return e+a+(null==i?"":i)},"")):r.reduce((e,t)=>Object.assign(e,t&&t.call?t(a.p):t),{}):r,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i})(a.target),a.g,a.o,a.k)}p.bind({g:1});let m,f,h,b=p.bind({k:1});function g(e,t){let s=this||{};return function(){let a=arguments;function r(i,o){let l=Object.assign({},i),n=l.className||r.className;s.p=Object.assign({theme:f&&f()},l),s.o=/ *go\d+/.test(n),l.className=p.apply(s,a)+(n?" "+n:""),t&&(l.ref=o);let d=e;return e[0]&&(d=l.as||e,delete l.as),h&&d[0]&&h(l),m(d,l)}return t?t(r):r}}var x=(e,t)=>"function"==typeof e?e(t):e,y=(t=0,()=>(++t).toString()),v=()=>{if(void 0===s&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");s=!e||e.matches}return s},w="default",k=(e,t)=>{let{toastLimit:s}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,s)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return k(e,{type:+!!e.toasts.find(e=>e.id===a.id),toast:a});case 3:let{toastId:r}=t;return{...e,toasts:e.toasts.map(e=>e.id===r||void 0===r?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},j=[],N={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},C={},E=(e,t=w)=>{C[t]=k(C[t]||N,e),j.forEach(([e,s])=>{e===t&&s(C[t])})},$=e=>Object.keys(C).forEach(t=>E(e,t)),D=(e=w)=>t=>{E(t,e)},I={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},O=(e={},t=w)=>{let[s,a]=(0,r.useState)(C[t]||N),i=(0,r.useRef)(C[t]);(0,r.useEffect)(()=>(i.current!==C[t]&&a(C[t]),j.push([t,a]),()=>{let e=j.findIndex(([e])=>e===t);e>-1&&j.splice(e,1)}),[t]);let o=s.toasts.map(t=>{var s,a,r;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(s=e[t.type])?void 0:s.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||I[t.type],style:{...e.style,...null==(r=e[t.type])?void 0:r.style,...t.style}}});return{...s,toasts:o}},T=e=>(t,s)=>{let a,r=((e,t="blank",s)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...s,id:(null==s?void 0:s.id)||y()}))(t,e,s);return D(r.toasterId||(a=r.id,Object.keys(C).find(e=>C[e].toasts.some(e=>e.id===a))))({type:2,toast:r}),r.id},A=(e,t)=>T("blank")(e,t);A.error=T("error"),A.success=T("success"),A.loading=T("loading"),A.custom=T("custom"),A.dismiss=(e,t)=>{let s={type:3,toastId:e};t?D(t)(s):$(s)},A.dismissAll=e=>A.dismiss(void 0,e),A.remove=(e,t)=>{let s={type:4,toastId:e};t?D(t)(s):$(s)},A.removeAll=e=>A.remove(void 0,e),A.promise=(e,t,s)=>{let a=A.loading(t.loading,{...s,...null==s?void 0:s.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let r=t.success?x(t.success,e):void 0;return r?A.success(r,{id:a,...s,...null==s?void 0:s.success}):A.dismiss(a),e}).catch(e=>{let r=t.error?x(t.error,e):void 0;r?A.error(r,{id:a,...s,...null==s?void 0:s.error}):A.dismiss(a)}),e};var z=1e3,S=(e,t="default")=>{let{toasts:s,pausedAt:a}=O(e,t),i=(0,r.useRef)(new Map).current,o=(0,r.useCallback)((e,t=z)=>{if(i.has(e))return;let s=setTimeout(()=>{i.delete(e),l({type:4,toastId:e})},t);i.set(e,s)},[]);(0,r.useEffect)(()=>{if(a)return;let e=Date.now(),r=s.map(s=>{if(s.duration===1/0)return;let a=(s.duration||0)+s.pauseDuration-(e-s.createdAt);if(a<0){s.visible&&A.dismiss(s.id);return}return setTimeout(()=>A.dismiss(s.id,t),a)});return()=>{r.forEach(e=>e&&clearTimeout(e))}},[s,a,t]);let l=(0,r.useCallback)(D(t),[t]),n=(0,r.useCallback)(()=>{l({type:5,time:Date.now()})},[l]),d=(0,r.useCallback)((e,t)=>{l({type:1,toast:{id:e,height:t}})},[l]),c=(0,r.useCallback)(()=>{a&&l({type:6,time:Date.now()})},[a,l]),u=(0,r.useCallback)((e,t)=>{let{reverseOrder:a=!1,gutter:r=8,defaultPosition:i}=t||{},o=s.filter(t=>(t.position||i)===(e.position||i)&&t.height),l=o.findIndex(t=>t.id===e.id),n=o.filter((e,t)=>t<l&&e.visible).length;return o.filter(e=>e.visible).slice(...a?[n+1]:[0,n]).reduce((e,t)=>e+(t.height||0)+r,0)},[s]);return(0,r.useEffect)(()=>{s.forEach(e=>{if(e.dismissed)o(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[s,o]),{toasts:s,handlers:{updateHeight:d,startPause:n,endPause:c,calculateOffset:u}}},P=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,L=b`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,R=b`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,M=g("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${P} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${L} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${R} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,_=b`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,H=g("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${_} 1s linear infinite;
`,F=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,B=b`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,K=g("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${F} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${B} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,U=g("div")`
  position: absolute;
`,q=g("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,J=b`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,V=g("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${J} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,Y=({toast:e})=>{let{icon:t,type:s,iconTheme:a}=e;return void 0!==t?"string"==typeof t?r.createElement(V,null,t):t:"blank"===s?null:r.createElement(q,null,r.createElement(H,{...a}),"loading"!==s&&r.createElement(U,null,"error"===s?r.createElement(M,{...a}):r.createElement(K,{...a})))},Z=g("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,G=g("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Q=r.memo(({toast:e,position:t,style:s,children:a})=>{let i=e.height?((e,t)=>{let s=e.includes("top")?1:-1,[a,r]=v()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*s}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*s}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${b(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${b(r)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},o=r.createElement(Y,{toast:e}),l=r.createElement(G,{...e.ariaProps},x(e.message,e));return r.createElement(Z,{className:e.className,style:{...i,...s,...e.style}},"function"==typeof a?a({icon:o,message:l}):r.createElement(r.Fragment,null,o,l))});a=r.createElement,d.p=void 0,m=a,f=void 0,h=void 0;var W=({id:e,className:t,style:s,onHeightUpdate:a,children:i})=>{let o=r.useCallback(t=>{if(t){let s=()=>{a(e,t.getBoundingClientRect().height)};s(),new MutationObserver(s).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return r.createElement("div",{ref:o,className:t,style:s},i)},X=p`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ee=({reverseOrder:e,position:t="top-center",toastOptions:s,gutter:a,children:i,toasterId:o,containerStyle:l,containerClassName:n})=>{let{toasts:d,handlers:c}=S(s,o);return r.createElement("div",{"data-rht-toaster":o||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...l},className:n,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(s=>{let o,l,n=s.position||t,d=c.calculateOffset(s,{reverseOrder:e,gutter:a,defaultPosition:t}),u=(o=n.includes("top"),l=n.includes("center")?{justifyContent:"center"}:n.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:v()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${d*(o?1:-1)}px)`,...o?{top:0}:{bottom:0},...l});return r.createElement(W,{id:s.id,key:s.id,onHeightUpdate:c.updateHeight,className:s.visible?X:"",style:u},"custom"===s.type?x(s.message,s):i?i(s):r.createElement(Q,{toast:s,position:n}))}))};e.s(["CheckmarkIcon",()=>K,"ErrorIcon",()=>M,"LoaderIcon",()=>H,"ToastBar",()=>Q,"ToastIcon",()=>Y,"Toaster",()=>ee,"default",()=>A,"resolveValue",()=>x,"toast",()=>A,"useToaster",()=>S,"useToasterStore",()=>O],94744)},42182,e=>{"use strict";var t=e.i(48277),s=e.i(30668),a=e.i(96086);function r(){let e=(0,a.usePathname)(),r=(0,a.useRouter)(),[i,o]=(0,s.useState)(!1),[l,n]=(0,s.useState)(!1),[d,c]=(0,s.useState)(!1),[u,p]=(0,s.useState)(null),m=(0,s.useRef)(null),f="text-blue-600 font-semibold",h="text-gray-600 hover:text-blue-600";return(0,s.useEffect)(()=>{let e=localStorage.getItem("user");e&&p(JSON.parse(e))},[]),(0,s.useEffect)(()=>{let e=e=>{m.current&&!m.current.contains(e.target)&&c(!1)};return document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[]),(0,t.jsx)("nav",{className:"bg-white shadow-sm border-b fixed top-0 left-0 right-0  z-50",children:(0,t.jsxs)("div",{className:"max-w-9xl mx-auto px-6 py-1 flex items-center justify-between",children:[(0,t.jsx)("img",{src:"/img/lp3i.png",alt:"LP3I",className:"w-32"}),(0,t.jsxs)("ul",{className:"flex gap-10 text-sm font-medium text-gray-600",children:[(0,t.jsx)("li",{onClick:()=>r.push("/dashboard"),className:`cursor-pointer ${"/dashboard"===e?f:h}`,children:"Dashboard"}),(0,t.jsxs)("li",{className:"relative",children:[(0,t.jsx)("button",{type:"button",onClick:()=>o(!i),className:`${["/karyawan","/divisi","/headof","/configuration"].includes(e)?f:h}`,children:"Master"}),i&&(0,t.jsxs)("ul",{className:"absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-xl z-50",children:[(0,t.jsx)("li",{onClick:()=>r.push("/karyawan"),className:`px-4 py-2 cursor-pointer ${"/karyawan"===e?"bg-blue-50 text-blue-600 font-semibold":"hover:bg-blue-50 hover:text-blue-600"}`,children:"Karyawan"}),(0,t.jsx)("li",{onClick:()=>r.push("/divisi"),className:`px-4 py-2 cursor-pointer ${"/divisi"===e?"bg-blue-50 text-blue-600 font-semibold":"hover:bg-blue-50 hover:text-blue-600"}`,children:"Divisi"}),(0,t.jsx)("li",{onClick:()=>r.push("/headof"),className:`px-4 py-2 cursor-pointer ${"/headof"===e?"bg-blue-50 text-blue-600 font-semibold":"hover:bg-blue-50 hover:text-blue-600"}`,children:"Head of Divisi"}),(0,t.jsx)("li",{onClick:()=>r.push("/configuration"),className:`px-4 py-2 cursor-pointer ${"/configuration"===e?"bg-blue-50 text-blue-600 font-semibold":"hover:bg-blue-50 hover:text-blue-600"}`,children:"Konfigurasi"})]})]}),(0,t.jsxs)("li",{className:"relative",children:[(0,t.jsx)("button",{type:"button",onClick:()=>n(!l),className:`${["/assigned","/created"].includes(e)?f:h}`,children:"Ticket"}),l&&(0,t.jsxs)("ul",{className:"absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-xl z-50",children:[(0,t.jsx)("li",{onClick:()=>r.push("/assigned"),className:`px-4 py-2 cursor-pointer ${"/assigned"===e?"bg-blue-50 text-blue-600 font-semibold":"hover:bg-blue-50 hover:text-blue-600"}`,children:"Assigned"}),(0,t.jsx)("li",{onClick:()=>r.push("/created"),className:`px-4 py-2 cursor-pointer ${"/created"===e?"bg-blue-50 text-blue-600 font-semibold":"hover:bg-blue-50 hover:text-blue-600"}`,children:"Created"})]})]}),(0,t.jsx)("li",{onClick:()=>r.push("/ringkasan"),className:`cursor-pointer ${"/ringkasan"===e?f:h}`,children:"Ringkasan"})]}),(0,t.jsxs)("div",{className:"relative",ref:m,children:[(0,t.jsxs)("button",{onClick:()=>c(!d),className:"flex items-center gap-4 hover:bg-gray-100 px-3 py-2 rounded-lg",children:[(0,t.jsxs)("div",{className:"text-right leading-tight",children:[(0,t.jsx)("div",{className:"text-sm font-medium",children:u?.name||"Administrator"}),(0,t.jsx)("div",{className:"text-xs text-gray-500",children:u?.email||"admin@gmail.com"})]}),(0,t.jsx)("img",{src:"/img/icon.png",className:"w-10 h-10 rounded-full"})]}),d&&(0,t.jsxs)("div",{className:"absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-50",children:[(0,t.jsx)("button",{onClick:()=>r.push("/profile"),className:"w-full text-left px-4 py-2 hover:bg-gray-100 text-sm",children:"👤 Profile"}),(0,t.jsx)("button",{onClick:()=>{localStorage.clear(),r.push("/")},className:"w-full text-left px-4 py-2 hover:bg-red-50 text-sm text-red-600",children:"🚪 Logout"})]})]})]})})}e.s(["default",()=>r])}]);