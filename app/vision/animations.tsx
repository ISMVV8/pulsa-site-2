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

      // ── Manifesto — words fade in on scroll ──
      gsap.from("[data-v-manifesto] span", {
        opacity: 0.15,
        y: 30,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-v-manifesto]",
          start: "top 75%",
          end: "bottom 50%",
          scrub: 1,
        },
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

      // ── Stats — count up effect ──
      gsap.from("[data-v-stats]", {
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "[data-v-stats]",
          start: "top 80%",
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
