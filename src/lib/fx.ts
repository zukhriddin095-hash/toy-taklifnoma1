/* eslint-disable */
// @ts-nocheck — GSAP effektlar jadvali (uslub -> animatsiya). Keyin bosqichma-bosqich tiplanadi.
import gsap from "gsap";

// Har bir uslub: ism animatsiyasi (NM), boʻlim chiqishi (RV), zarrachalar (FX)
export function createFx(inv: HTMLElement, theme: string) {
var TH={silk:{nm:"flip",rv:"up",fx:"sparkle"},atlas:{nm:"slide",rv:"side",fx:"petal"},lola:{nm:"blur",rv:"blur",fx:"petal"},registon:{nm:"zoom",rv:"scale",fx:"fly"},anor:{nm:"drop",rv:"rot",fx:"rise"},paxta:{nm:"type",rv:"fade",fx:"rise"},suzani:{nm:"spin",rv:"flipx",fx:"petal"},tong:{nm:"wave",rv:"rise",fx:"rise"},oltin:{nm:"spread",rv:"skew",fx:"dust"},chinni:{nm:"skew",rv:"zoomout",fx:"fly"}};
var SYM={anor:"♥",suzani:"✦",tong:"✿"};
var NM={
 flip:function(t,c){t.from(c,{opacity:0,rotationX:-90,y:40,transformOrigin:"50% 100%",duration:.9,stagger:.06},"-=.3")},
 slide:function(t){t.from("#gN",{xPercent:-120,opacity:0,duration:1.1,ease:"elastic.out(1,.6)"},"-=.3").from("#bN",{xPercent:120,opacity:0,duration:1.1,ease:"elastic.out(1,.6)"},"<")},
 blur:function(t,c){t.from(c,{opacity:0,filter:"blur(14px)",scale:1.6,duration:1,stagger:.07},"-=.3")},
 zoom:function(t,c){t.from(c,{opacity:0,scale:4,duration:.8,stagger:{each:.07,from:"center"},ease:"expo.out"},"-=.3")},
 drop:function(t,c){t.from(c,{opacity:0,y:-180,duration:1,stagger:.08,ease:"bounce.out"},"-=.3")},
 type:function(t,c){t.from(c,{opacity:0,duration:.01,stagger:.12})},
 spin:function(t,c){t.from(c,{opacity:0,rotationY:180,transformPerspective:600,duration:.9,stagger:.06,ease:"back.out(1.6)"},"-=.3")},
 wave:function(t,c){t.from(c,{opacity:0,y:60,rotation:12,duration:.8,stagger:{each:.06,from:"edges"},ease:"sine.out"},"-=.3")},
 spread:function(t){t.from("h1>span",{opacity:0,letterSpacing:"0.7em",duration:1.6,stagger:.3,ease:"power2.out"},"-=.3")},
 skew:function(t,c){t.from(c,{opacity:0,xPercent:-100,skewX:40,duration:.8,stagger:.05},"-=.3")}
};
var RV={
 up:function(){return{opacity:0,y:60,duration:.9}},
 side:function(i){return{opacity:0,x:i%2?60:-60,duration:.9}},
 blur:function(){return{opacity:0,y:50,filter:"blur(8px)",duration:1.1}},
 scale:function(){return{opacity:0,scale:.8,duration:.9,ease:"back.out(1.4)"}},
 rot:function(i){return{opacity:0,rotation:i%2?4:-4,y:50,duration:.9}},
 fade:function(){return{opacity:0,duration:1.4}},
 flipx:function(){return{opacity:0,rotationX:-50,transformPerspective:800,transformOrigin:"50% 0",duration:1}},
 rise:function(){return{opacity:0,y:120,duration:1.4,ease:"power4.out"}},
 skew:function(){return{opacity:0,skewY:6,y:40,duration:1}},
 zoomout:function(){return{opacity:0,scale:1.25,filter:"blur(6px)",duration:1.1}}
};
function mk(n,fn){for(var i=0;i<n;i++){var e=document.createElement("div");e.className="petal";e.textContent=SYM[theme]||"";inv.appendChild(e);fn(e,i)}}
var R=function(a,b){return gsap.utils.random(a,b)};
var FX={
 sparkle:function(W,H){mk(26,function(e){gsap.set(e,{x:R(0,W),y:R(0,H),opacity:0});gsap.to(e,{opacity:.9,y:"-=40",duration:R(1.5,3.5),repeat:-1,yoyo:true,delay:R(0,3),ease:"sine.inOut"})})},
 petal:function(W,H){mk(18,function(e,i){var c=i%2?"var(--ac)":"var(--ac2)";e.style.color=c;if(!SYM[theme])e.style.background=c;gsap.set(e,{x:R(0,W),y:-40,rotation:R(0,360),scale:R(.6,1.4)});gsap.to(e,{y:H+40,x:"+="+R(-90,90),rotation:"+=360",duration:R(10,20),repeat:-1,delay:R(0,10),ease:"none"})})},
 fly:function(W,H){mk(22,function(e){gsap.set(e,{x:R(0,W),y:R(0,H),opacity:0,rotation:45});gsap.to(e,{x:"+="+R(-140,140),y:"+="+R(-140,140),opacity:.9,duration:R(3,6),repeat:-1,yoyo:true,delay:R(0,3),ease:"sine.inOut"})})},
 rise:function(W,H){mk(16,function(e){gsap.set(e,{x:R(0,W),y:H+40,scale:R(.6,1.4)});gsap.to(e,{y:-60,x:"+="+R(-60,60),duration:R(9,18),repeat:-1,delay:R(0,9),ease:"none"})})},
 dust:function(W,H){mk(40,function(e){gsap.set(e,{x:R(0,W),y:-10});gsap.to(e,{y:H+10,duration:R(5,10),repeat:-1,delay:R(0,8),ease:"none"})})}
};

return { TH, NM, RV, FX };
}
