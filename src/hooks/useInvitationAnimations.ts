/* eslint-disable */
// @ts-nocheck
import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createFx } from "@/lib/fx";

gsap.registerPlugin(ScrollTrigger);
const reduce = typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Taklifnomaning barcha GSAP animatsiyalari (kirish, scroll, zarrachalar).
 * Marker klasslar: .rv .ch .orn .kicker .bism .hint .band .box .cd .rsvp .links
 */
export function useInvitationAnimations(rootRef: RefObject<HTMLElement>, theme: string, opened: boolean) {
  useEffect(() => {
    if (!opened || reduce) return;
    const root = rootRef.current;
    const $$ = (q) => Array.from(root.querySelectorAll(q));
    const { TH, NM, RV, FX } = createFx(root, theme);
    const clean = () => $$(".petal").forEach((p) => p.remove());
    clean();
    const ctx = gsap.context(() => {
      const inv = root;

    var ch=".hero h1 .ch",tl=gsap.timeline({delay:.8,defaults:{ease:"power3.out"}});
    tl.from(".hero .orn",{scale:0,rotation:-270,opacity:0,duration:1.2,ease:"back.out(1.7)"})
      .from(".hero .kicker",{opacity:0,y:-16,duration:.7},"-=.6");
    NM[TH[theme].nm](tl,ch);
    tl.from("h1 i",{scale:0,rotation:-180,opacity:0,duration:.7,ease:"back.out(2)"},"-=.4")
      .from(".bism",{opacity:0,y:14,duration:.7})
      .from(".hint",{opacity:0,duration:.5});
    gsap.to(".hint",{y:10,repeat:-1,yoyo:true,duration:.9,ease:"sine.inOut"});

    gsap.to(".hero .orn",{rotation:180,y:70,ease:"none",scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:true}});
    gsap.to("#prog",{scaleX:1,ease:"none",scrollTrigger:{start:0,end:"max",scrub:true}});
    $$(".band").forEach(function(el){gsap.from(el,{scaleX:0,duration:1.4,ease:"power3.inOut",scrollTrigger:{trigger:el,start:"top 98%"}})});
    if(theme==="atlas")gsap.to(".band",{backgroundPositionX:"-80px",duration:3,repeat:-1,ease:"none"});

    $$(".rv").forEach(function(el,i){
      var f=RV[TH[theme].rv](i);
      gsap.from(el,Object.assign({ease:"power2.out",scrollTrigger:{trigger:el,start:"top 88%"}},f));
      var k=el.querySelectorAll(".box,li,.cd div,.rsvp button,.links a");
      if(k.length)gsap.from(k,{opacity:0,yPercent:40,scale:.92,duration:.7,stagger:.12,ease:"back.out(1.4)",scrollTrigger:{trigger:el,start:"top 80%"}});
    });

    FX[TH[theme].fx](innerWidth,innerHeight);

    }, root);
    return () => { ctx.revert(); clean(); };
  }, [rootRef, theme, opened]);
}
