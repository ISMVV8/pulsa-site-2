"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/app/lib/projects";
import { GlassButton, GlassCircle } from "@/app/components/glass-button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
  const heroRef = useRef<HTMLDivElement>(null);
  const scrollSectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.from("[data-hero-title]", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
      gsap.from("[data-hero-sub]", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "power3.out",
      });
      gsap.from("[data-hero-counter]", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.5,
        ease: "power3.out",
      });

      // Horizontal scroll section
      const container = scrollContainerRef.current;
      const section = scrollSectionRef.current;
      if (!container || !section) return;

      const cards = gsap.utils.toArray<HTMLElement>("[data-project-card]");
      const totalScroll = container.scrollWidth - window.innerWidth;

      // Pin + horizontal scroll
      const scrollTween = gsap.to(container, {
        x: () => -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          end: () => `+=${totalScroll}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const idx = Math.min(
              Math.floor(progress * projects.length),
              projects.length - 1
            );
            setActiveIndex(idx);
          },
        },
      });

      // Each card animates in as it enters viewport
      cards.forEach((card) => {
        const glass = card.querySelector("[data-glass]");
        const tags = card.querySelector("[data-project-tags]");

        gsap.from(card, {
          opacity: 0,
          scale: 0.92,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            containerAnimation: scrollTween,
            start: "left 85%",
            toggleActions: "play none none reverse",
          },
        });

        if (glass) {
          gsap.from(glass, {
            x: -30,
            opacity: 0,
            duration: 0.5,
            delay: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              containerAnimation: scrollTween,
              start: "left 70%",
              toggleActions: "play none none reverse",
            },
          });
        }

        if (tags) {
          gsap.from(tags.children, {
            y: 10,
            opacity: 0,
            stagger: 0.06,
            duration: 0.4,
            delay: 0.35,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              containerAnimation: scrollTween,
              start: "left 65%",
              toggleActions: "play none none reverse",
            },
          });
        }
      });

      // CTA
      gsap.from("[data-cta]", {
        scrollTrigger: {
          trigger: "[data-cta]",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative min-h-[100dvh] bg-white text-black overflow-x-hidden">
      {/* ═══ HEADER ═══ */}
      <header className="relative z-20 flex items-center justify-between px-5 sm:px-8 py-4 sm:py-6">
        <Link href="/">
          <GlassCircle className="w-9 h-9 sm:w-10 sm:h-10 p-0.5">
            <Image
              src="/logo-pulsa.jpg"
              alt="Pulsa"
              width={32}
              height={32}
              className="object-contain mix-blend-multiply"
            />
          </GlassCircle>
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <a href="https://instagram.com/pulsacreatives" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <GlassCircle className="w-9 h-9 sm:w-10 sm:h-10">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </GlassCircle>
          </a>
          <a href="https://tiktok.com/@pulsacreatives" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
            <GlassCircle className="w-9 h-9 sm:w-10 sm:h-10">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="black">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.72a8.19 8.19 0 0 0 4.76 1.52V6.79a4.83 4.83 0 0 1-1-.1z" />
              </svg>
            </GlassCircle>
          </a>
        </div>
      </header>

      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="flex flex-col items-center justify-center text-center px-6 pt-20 pb-16 sm:pt-28 sm:pb-20">
        <h1
          data-hero-title
          className="text-[clamp(2.5rem,8vw,5.5rem)] font-semibold tracking-[-0.04em] leading-[1.05]"
        >
          Nos réalisations
          <span className="text-black/20">.</span>
        </h1>
        <p
          data-hero-sub
          className="mt-4 text-black/35 text-[13px] sm:text-[14px] tracking-[0.03em] max-w-md"
        >
          Chaque projet est une histoire de transformation digitale
        </p>
        <div data-hero-counter className="flex items-center gap-3 mt-8">
          <span className="text-[clamp(2rem,4vw,3rem)] font-light text-black/10 tracking-[-0.02em]">
            20+
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-black/25">
            projets<br />livrés
          </span>
        </div>

        {/* Scroll hint */}
        <div className="mt-10 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-[10px] uppercase tracking-[0.2em] text-black/20">Scroll</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-black/20">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>

      {/* ═══ HORIZONTAL SCROLL PROJECTS ═══ */}
      <section ref={scrollSectionRef} className="relative overflow-hidden">
        {/* Progress indicator */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          {projects.map((_, i) => (
            <div
              key={i}
              className="h-[3px] rounded-full transition-all duration-500"
              style={{
                width: activeIndex === i ? "24px" : "8px",
                backgroundColor: activeIndex === i ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.1)",
              }}
            />
          ))}
        </div>

        {/* Counter */}
        <div className="absolute top-6 right-8 z-30 text-[12px] text-black/30 font-medium tracking-wide">
          {String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
        </div>

        {/* Scrolling container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 sm:gap-8 pl-6 sm:pl-8 md:pl-16 pt-16 pb-8"
          style={{ width: "fit-content" }}
        >
          {projects.map((project, i) => (
            <Link
              key={project.slug}
              href={`/portfolio/${project.slug}`}
              data-project-card
              className="group block flex-shrink-0"
              style={{ width: "clamp(320px, 75vw, 700px)" }}
            >
              <div className="relative w-full h-[65vh] min-h-[400px] max-h-[600px] rounded-2xl overflow-hidden">
                {/* Full image */}
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  loading={i < 2 ? "eager" : "lazy"}
                />

                {/* Subtle gradient left side for glass readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-transparent z-10" />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 z-10" />

                {/* Number watermark top-right */}
                <span className="absolute top-5 right-6 text-white/10 text-[5rem] font-bold leading-none z-10 select-none pointer-events-none">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* ── Glass info — bottom-left only, compact ── */}
                <div data-glass className="absolute bottom-5 left-5 z-20 flex flex-col gap-2 max-w-[55%]">
                  {/* Year + Type pill */}
                  <div className="flex items-center gap-1.5">
                    <span className="bg-white/15 backdrop-blur-2xl border border-white/20 text-white/75 px-2.5 py-1 text-[9px] uppercase tracking-[0.1em] rounded-full">
                      {project.year}
                    </span>
                    <span className="bg-white/15 backdrop-blur-2xl border border-white/20 text-white/75 px-2.5 py-1 text-[9px] uppercase tracking-[0.1em] rounded-full">
                      {project.type}
                    </span>
                  </div>

                  {/* Main glass card — compact */}
                  <div className="bg-white/12 backdrop-blur-2xl border border-white/20 rounded-xl px-4 py-3">
                    <h2 className="text-white text-[18px] sm:text-[22px] font-semibold tracking-[-0.02em] leading-tight">
                      {project.name}
                    </h2>
                    <p className="text-white/60 text-[11px] sm:text-[12px] mt-1.5 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div data-project-tags className="flex flex-wrap gap-1">
                    {project.services.slice(0, 3).map((service) => (
                      <span
                        key={service}
                        className="bg-white/10 backdrop-blur-2xl border border-white/15 text-white/80 px-2.5 py-1 text-[9px] uppercase tracking-[0.05em] rounded-full"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow CTA — bottom-right */}
                <div className="absolute bottom-5 right-5 z-20 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
                  <div className="bg-white/20 backdrop-blur-2xl border border-white/25 rounded-full w-10 h-10 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {/* End spacer */}
          <div className="flex-shrink-0 w-[10vw]" />
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <footer data-cta className="flex flex-col items-center gap-4 sm:gap-6 py-16 sm:py-20 px-5 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
          <a href="https://wa.me/32473236759" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
            <GlassButton className="w-full sm:w-auto !px-5 !py-3 sm:!px-8 sm:!py-3.5 !text-[12px] sm:!text-[13px]">
              Créer votre projet
            </GlassButton>
          </a>
        </div>
        <p className="text-[10px] sm:text-[11px] text-black/25 tracking-wide text-center">
          contact@pulsacreatives.com · © Pulsa ·{" "}
          <Link href="/legal" className="hover:text-black/50 transition-colors duration-300">
            Legal
          </Link>
        </p>
      </footer>

      {/* ═══ FIXED — Vision (left) + Messages (right) ═══ */}
      <Link
        href="/vision"
        className="fixed bottom-5 left-5 sm:bottom-6 sm:left-6 z-50"
        aria-label="Notre vision"
      >
        <div className="w-11 h-11 sm:w-12 sm:h-12 bg-black/85 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:bg-black hover:scale-105 transition-all duration-300">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
          </svg>
        </div>
      </Link>

      <a
        href="https://wa.me/32473236759"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50"
        aria-label="Nous contacter"
      >
        <div className="w-11 h-11 sm:w-12 sm:h-12 bg-black/85 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:bg-black hover:scale-105 transition-all duration-300">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="none">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        </div>
      </a>
    </div>
  );
}
