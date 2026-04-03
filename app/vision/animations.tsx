"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function VisionAnimations() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Hero entrance timeline ──
      const tl = gsap.timeline({ delay: 0.3 });

      tl.from("[data-v-label]", {
        y: 15,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      });

      tl.from("[data-v-title] span", {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
      }, "-=0.3");


      tl.from("[data-v-scroll]", {
        y: 15,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      }, "-=0.3");

      // ── Manifesto — word by word reveal on scroll ──
      const words = document.querySelectorAll("[data-v-word]");
      const totalWords = words.length;
      words.forEach((word, i) => {
        gsap.to(word, {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-v-manifesto]",
            start: () => `top+=${(i / totalWords) * 300} 75%`,
            end: () => `top+=${(i / totalWords) * 300 + 80} 55%`,
            scrub: true,
          },
        });
      });

      // ── Value cards — staggered rise ──
      gsap.from("[data-v-card]", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-v-card]",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // ── Stats — staggered rise with scale ──
      gsap.from("[data-v-stat]", {
        y: 50,
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-v-stats]",
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      // ── CTA section — rise in ──
      gsap.from("[data-v-cta] > div > *", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-v-cta]",
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
