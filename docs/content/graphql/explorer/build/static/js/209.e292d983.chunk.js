"use strict";(self.webpackChunkdocs_app_graphiql=self.webpackChunkdocs_app_graphiql||[]).push([[209],{7209:function(e,r,n){n.r(r),n.d(r,{b:function(){return f}});var t=n(3690),i=Object.defineProperty,o=function(e,r){return i(e,"name",{value:r,configurable:!0})};function l(e,r){for(var n=function(){var n=r[t];if("string"!=typeof n&&!Array.isArray(n)){var i=function(r){if("default"!==r&&!(r in e)){var t=Object.getOwnPropertyDescriptor(n,r);t&&Object.defineProperty(e,r,t.get?t:{enumerable:!0,get:function(){return n[r]}})}};for(var o in n)i(o)}},t=0;t<r.length;t++)n();return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}o(l,"_mergeNamespaces");!function(e){function r(r){return function(n,t){var i=t.line,l=n.getLine(i);function a(r){for(var o,a=t.ch,f=0;;){var u=a<=0?-1:l.lastIndexOf(r[0],a-1);if(-1!=u){if(1==f&&u<t.ch)break;if(o=n.getTokenTypeAt(e.Pos(i,u+1)),!/^(comment|string)/.test(o))return{ch:u+1,tokenType:o,pair:r};a=u-1}else{if(1==f)break;f=1,a=l.length}}}function f(r){var t,o,l=1,a=n.lastLine(),f=r.ch;e:for(var u=i;u<=a;++u)for(var s=n.getLine(u),c=u==i?f:0;;){var g=s.indexOf(r.pair[0],c),p=s.indexOf(r.pair[1],c);if(g<0&&(g=s.length),p<0&&(p=s.length),(c=Math.min(g,p))==s.length)break;if(n.getTokenTypeAt(e.Pos(u,c+1))==r.tokenType)if(c==g)++l;else if(! --l){t=u,o=c;break e}++c}return null==t||i==t?null:{from:e.Pos(i,f),to:e.Pos(t,o)}}o(a,"findOpening"),o(f,"findRange");for(var u=[],s=0;s<r.length;s++){var c=a(r[s]);c&&u.push(c)}for(u.sort((function(e,r){return e.ch-r.ch})),s=0;s<u.length;s++){var g=f(u[s]);if(g)return g}return null}}o(r,"bracketFolding"),e.registerHelper("fold","brace",r([["{","}"],["[","]"]])),e.registerHelper("fold","brace-paren",r([["{","}"],["[","]"],["(",")"]])),e.registerHelper("fold","import",(function(r,n){function t(n){if(n<r.firstLine()||n>r.lastLine())return null;var t=r.getTokenAt(e.Pos(n,1));if(/\S/.test(t.string)||(t=r.getTokenAt(e.Pos(n,t.end+1))),"keyword"!=t.type||"import"!=t.string)return null;for(var i=n,o=Math.min(r.lastLine(),n+10);i<=o;++i){var l=r.getLine(i).indexOf(";");if(-1!=l)return{startCh:t.end,end:e.Pos(i,l)}}}o(t,"hasImport");var i,l=n.line,a=t(l);if(!a||t(l-1)||(i=t(l-2))&&i.end.line==l-1)return null;for(var f=a.end;;){var u=t(f.line+1);if(null==u)break;f=u.end}return{from:r.clipPos(e.Pos(l,a.startCh+1)),to:f}})),e.registerHelper("fold","include",(function(r,n){function t(n){if(n<r.firstLine()||n>r.lastLine())return null;var t=r.getTokenAt(e.Pos(n,1));return/\S/.test(t.string)||(t=r.getTokenAt(e.Pos(n,t.end+1))),"meta"==t.type&&"#include"==t.string.slice(0,8)?t.start+8:void 0}o(t,"hasInclude");var i=n.line,l=t(i);if(null==l||null!=t(i-1))return null;for(var a=i;null!=t(a+1);)++a;return{from:e.Pos(i,l+1),to:r.clipPos(e.Pos(a))}}))}((0,t.r)());var a={},f=l({__proto__:null,default:(0,t.g)(a)},[a])}}]);
//# sourceMappingURL=209.e292d983.chunk.js.map