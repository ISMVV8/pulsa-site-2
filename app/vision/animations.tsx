"use client";

import { useEffect } from "react";
import gsap from "gsap";

export default function VisionAnimations() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      // Label fades in
      tl.from("[data-v-label]", {
        y: 15,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      });

      // Title words stagger — each line
      tl.from("[data-v-title] span", {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
      }, "-=0.3");

      // Manifesto text
      tl.from("[data-v-text]", {
        y: 25,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.4");

      // Pillars cascade
      tl.from("[data-v-pillars] > div", {
        x: -20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "power2.out",
      }, "-=0.3");

      // CTA buttons
      tl.from("[data-v-cta] > *", {
        y: 15,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      }, "-=0.2");
    });

    return () => ctx.revert();
  }, []);

  return null;
}
