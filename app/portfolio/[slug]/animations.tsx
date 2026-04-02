"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CaseStudyAnimations() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero content entrance
      gsap.from("[data-hero]", {
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
      });

      // Each section fades in on scroll
      const sections = gsap.utils.toArray<HTMLElement>("[data-section]");
      sections.forEach((section) => {
        gsap.from(section.children, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      });

      // Approach steps — staggered entrance
      const steps = gsap.utils.toArray<HTMLElement>("[data-step]");
      if (steps.length) {
        gsap.from(steps, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: steps[0].parentElement,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });
      }

      // Stats — count up effect
      const stats = gsap.utils.toArray<HTMLElement>("[data-stat]");
      if (stats.length) {
        gsap.from(stats, {
          y: 30,
          opacity: 0,
          scale: 0.95,
          duration: 0.6,
          stagger: 0.12,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: stats[0].parentElement,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return null;
}
