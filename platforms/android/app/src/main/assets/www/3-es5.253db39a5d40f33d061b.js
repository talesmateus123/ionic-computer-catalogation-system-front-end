(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{AmBJ:function(t,e,n){"use strict";n.r(e),n.d(e,"createSwipeBackGesture",(function(){return i}));var r=n("pM1R"),a=n("oDRl"),i=function(t,e,n,i,o){var c=t.ownerDocument.defaultView;return Object(a.createGesture)({el:t,gestureName:"goback-swipe",gesturePriority:40,threshold:10,canStart:function(t){return t.startX<=50&&e()},onStart:n,onMove:function(t){i(t.deltaX/c.innerWidth)},onEnd:function(t){var e=c.innerWidth,n=t.deltaX/e,a=t.velocityX,i=a>=0&&(a>.2||t.deltaX>e/2),u=(i?1-n:n)*e,s=0;if(u>5){var d=u/Math.abs(a);s=Math.min(d,540)}o(i,n<=0?.01:Object(r.c)(0,n,.9999),s)}})}}}]);