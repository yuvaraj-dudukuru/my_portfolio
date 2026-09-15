import{p as r,v as e,c}from"./index-8s05ARr3.js";/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i=r("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);function o({trail:t}){return e.jsx("nav",{"aria-label":"Breadcrumb",className:"mb-8",children:e.jsx("ol",{className:"flex flex-wrap items-center gap-2 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-faint",children:t.map((a,n)=>{const s=n===t.length-1;return e.jsxs("li",{className:"flex items-center gap-2",children:[s?e.jsx("span",{"aria-current":"page",className:"text-ink",children:a.label}):e.jsx(c,{to:a.to,className:"transition-colors hover:bg-accent hover:text-accent-ink",children:a.label}),s?null:e.jsx("span",{"aria-hidden":"true",className:"text-accent-text",children:"/"})]},a.to)})})})}export{i as A,o as B};
