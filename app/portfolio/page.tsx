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
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLSpanElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const cursor = cursorRef.current;
    const cursorText = cursorTextRef.current;
    if (!section || !track || !cursor || !cursorText) return;

    // ── Custom cursor ──
    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power2.out",
      });
    };
    window.addEventListener("mousemove", moveCursor);

    // Cursor grow on card hover
    const cards = document.querySelectorAll("[data-card]");
    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        gsap.to(cursor, { width: 60, height: 60, duration: 0.4, ease: "power3.out" });
        gsap.to(cursorText, { opacity: 1, scale: 1, duration: 0.3, delay: 0.1 });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(cursor, { width: 12, height: 12, duration: 0.3, ease: "power2.out" });
        gsap.to(cursorText, { opacity: 0, scale: 0.8, duration: 0.2 });
      });
    });

    const ctx = gsap.context(() => {
      // Hero entrance — staggered
      const tl = gsap.timeline();
      tl.from("[data-hero-title] span", {
        y: 120,
        rotateX: -80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.08,
        ease: "power4.out",
      })
      .from("[data-hero-sub]", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.5")
      .from("[data-hero-scroll]", {
        y: 15,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      }, "-=0.3");

      // Calculate horizontal scroll distance
      const getScrollDistance = () => -(track.scrollWidth - window.innerWidth);

      // Main horizontal scroll tween
      const tween = gsap.to(track, {
        x: getScrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          end: () => "+=" + track.scrollWidth,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            setProgress(self.progress);
            const idx = Math.min(
              Math.floor(self.progress * projects.length),
              projects.length - 1
            );
            setActiveIndex(idx);
          },
        },
      });

      // ── Per-card animations ──
      const cardEls = gsap.utils.toArray<HTMLElement>("[data-card]");
      cardEls.forEach((card) => {
        const glass = card.querySelector("[data-glass]");
        const pills = card.querySelectorAll("[data-pill]");
        const tags = card.querySelectorAll("[data-tag]");
        const imgEl = card.querySelector("[data-img]");

        // Image subtle parallax via translate (no scale)
        if (imgEl) {
          gsap.fromTo(imgEl, { xPercent: 3 }, {
            xPercent: -3,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              containerAnimation: tween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          });
        }

        // Glass overlay — staggered reveal
        if (glass) {
          gsap.fromTo(glass,
            { y: 50, opacity: 0 },
            {
              y: 0, opacity: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                containerAnimation: tween,
                start: "left 70%",
                end: "left 35%",
                scrub: 0.5,
              },
            }
          );
        }

        // Pills cascade in
        if (pills.length) {
          gsap.fromTo(pills,
            { y: 20, opacity: 0, scale: 0.8 },
            {
              y: 0, opacity: 1, scale: 1,
              stagger: 0.1,
              ease: "back.out(1.5)",
              scrollTrigger: {
                trigger: card,
                containerAnimation: tween,
                start: "left 65%",
                end: "left 30%",
                scrub: 0.5,
              },
            }
          );
        }

        // Tags slide in from left
        if (tags.length) {
          gsap.fromTo(tags,
            { x: -20, opacity: 0 },
            {
              x: 0, opacity: 1,
              stagger: 0.06,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                containerAnimation: tween,
                start: "left 60%",
                end: "left 25%",
                scrub: 0.5,
              },
            }
          );
        }
      });
    });

    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);



  return (
    <div className="bg-white text-black">
      {/* ── Custom cursor (hidden on mobile) ── */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center"
      >
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border border-black/30 transition-all duration-300" />
        {/* Inner dot */}
        <div className="w-1 h-1 rounded-full bg-black/60" />
        {/* "View" label — shown on card hover */}
        <span
          ref={cursorTextRef}
          className="absolute whitespace-nowrap text-[9px] uppercase tracking-[0.12em] font-medium text-white bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-full opacity-0 transition-opacity duration-200"
        >
          Voir ↗
        </span>
      </div>

      {/* ═══ HEADER ═══ */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-8 py-4 sm:py-5">
        <Link href="/">
          <GlassCircle className="w-9 h-9 sm:w-10 sm:h-10 p-0.5">
            <Image src="/logo-pulsa.png" alt="Pulsa" width={32} height={32} className="object-cover rounded-full" />
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

      {/* ═══ HERO — Fullscreen with sakura bg ═══ */}
      <section ref={heroRef} className="relative h-[100dvh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/bg-sakura.jpg" alt="" fill className="object-cover" priority />
        </div>

        <h1 data-hero-title className="relative z-10 text-[clamp(2.5rem,8vw,5.5rem)] font-semibold tracking-[-0.04em] leading-[1.05] overflow-hidden">
          {"Ils nous ont fait confiance.".split("").map((char, i) => (
            <span key={i} className="inline-block" style={{ perspective: "600px" }}>
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>
        <p data-hero-sub className="relative z-10 mt-4 text-black text-[14px] sm:text-[15px] font-medium tracking-[0.02em] max-w-md">
          Découvrez les projets qu&apos;on a construits ensemble
        </p>

        <div data-hero-scroll className="relative z-10 mt-12 flex flex-col items-center gap-2">
          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-black/20 to-black/40 animate-pulse" />
          <span className="text-[9px] uppercase tracking-[0.25em] text-black/80">Scroll</span>
        </div>
      </section>

      {/* ═══ HORIZONTAL SCROLL SECTION ═══ */}
      <section ref={sectionRef} className="relative h-screen overflow-hidden" role="region" aria-label="Galerie de projets" aria-roledescription="carousel">
        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/8 z-30">
          <div
            className="h-full bg-white/70 ease-linear"
            style={{ width: `${progress * 100}%`, transition: "width 0.1s linear" }}
          />
        </div>

        {/* Counter — top right */}
        <div className="absolute top-6 right-8 z-30">
          <div className="flex items-center gap-3">
            <span className="text-white/60 text-[11px] tracking-[0.15em] uppercase">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <div className="w-12 h-[1px] bg-white/12 relative">
              <div
                className="absolute top-0 left-0 h-full bg-white/60"
                style={{
                  width: `${((activeIndex + 1) / projects.length) * 100}%`,
                  transition: "width 0.4s ease-out",
                }}
              />
            </div>
            <span className="text-white/45 text-[11px] tracking-[0.15em] uppercase">
              {String(projects.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Dot indicators — bottom center */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          {projects.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-500 ease-out"
              style={{
                width: activeIndex === i ? "28px" : "6px",
                height: "6px",
                backgroundColor: activeIndex === i ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.15)",
              }}
            />
          ))}
        </div>

        {/* Track */}
        <div
          ref={trackRef}
          className="flex items-center gap-0 h-full will-change-transform"
          style={{ width: "fit-content" }}
        >
          {projects.map((project, i) => (
            <Link
              key={project.slug}
              href={`/portfolio/${project.slug}`}
              data-card
              role="group"
              aria-roledescription="slide"
              aria-label={`Projet ${i + 1} sur ${projects.length}: ${project.name}`}
              className="group flex-shrink-0 block h-screen w-screen relative"
            >
              {/* Image */}
              <div data-img className="absolute inset-0">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover object-top"
                  loading={i < 3 ? "eager" : "lazy"}
                  sizes="100vw"
                />
              </div>

              {/* Gradient — bottom-left corner */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-black/5 to-transparent z-10" />



              {/* ── Glass — bottom-left ── */}
              <div data-glass className="absolute bottom-8 sm:bottom-12 left-6 sm:left-12 z-20 max-w-[85%] sm:max-w-[42%] md:max-w-[32%] flex flex-col gap-3">
                {/* Year + Type pills */}
                <div className="flex items-center gap-2">
                  <span data-pill className="bg-white/12 backdrop-blur-2xl border border-white/15 text-white/70 px-4 py-2 text-[11px] uppercase tracking-[0.1em] rounded-full">
                    {project.year}
                  </span>
                  <span data-pill className="bg-white/12 backdrop-blur-2xl border border-white/15 text-white/70 px-4 py-2 text-[11px] uppercase tracking-[0.1em] rounded-full">
                    {project.type}
                  </span>
                </div>

                {/* Info card */}
                <div className="bg-white/8 backdrop-blur-2xl border border-white/12 rounded-2xl px-6 py-5 sm:px-8 sm:py-7">
                  <h2 className="text-white text-[24px] sm:text-[30px] md:text-[36px] font-semibold tracking-[-0.03em] leading-[1.1]">
                    {project.name}
                  </h2>
                  <p className="text-white/75 text-[13px] sm:text-[14px] mt-3 leading-relaxed line-clamp-2">
                    {project.longDescription}
                  </p>
                </div>

                {/* Service tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.services.map((s) => (
                    <span data-tag key={s} className="bg-white/8 backdrop-blur-xl border border-white/10 text-white/60 px-3.5 py-1.5 text-[10px] sm:text-[11px] uppercase tracking-[0.06em] rounded-full">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Arrow CTA — bottom right */}
              <div className="absolute bottom-8 sm:bottom-12 right-6 sm:right-12 z-20 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
                <div className="bg-white/12 backdrop-blur-2xl border border-white/15 rounded-full w-14 h-14 flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══ CREATIVE FOOTER ═══ */}
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a]">
        {/* Subtle gradient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-white/[0.04] via-transparent to-transparent rounded-full blur-3xl" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-8">
            Votre tour ?
          </span>

          <h2 className="text-white text-[clamp(2.5rem,7vw,5rem)] font-semibold tracking-[-0.04em] leading-[1.05] mb-6">
            Le prochain, c&apos;est vous<span className="text-white/15">.</span>
          </h2>

          <p className="text-white/45 text-[14px] sm:text-[15px] leading-relaxed max-w-md mb-10">
            Vous avez une idée, un projet, une envie ? On adore transformer ça en quelque chose de concret. Un simple message et c&apos;est parti.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <a
              href="https://wa.me/32473236759"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black text-[13px] font-medium px-8 py-4 rounded-full hover:bg-white/90 active:scale-[0.98] transition-all duration-200"
            >
              Parlons-en sur WhatsApp →
            </a>
            <a
              href="https://calendar.app.google/fMRz2onsyr5DkovW7"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/[0.06] border border-white/10 text-white/70 text-[13px] font-medium px-8 py-4 rounded-full hover:bg-white/10 hover:text-white/90 transition-all duration-200"
            >
              Ou en appel visio 📹
            </a>
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-8 sm:gap-12 mt-16">
            <div className="text-center">
              <p className="text-white/80 text-[clamp(1.2rem,3vw,1.6rem)] font-semibold tracking-[-0.02em]">20+</p>
              <p className="text-white/40 text-[9px] uppercase tracking-[0.15em] mt-1">Projets</p>
            </div>
            <div className="w-[1px] h-8 bg-white/[0.06]" />
            <div className="text-center">
              <p className="text-white/80 text-[clamp(1.2rem,3vw,1.6rem)] font-semibold tracking-[-0.02em]">100%</p>
              <p className="text-white/40 text-[9px] uppercase tracking-[0.15em] mt-1">Satisfaits</p>
            </div>
            <div className="w-[1px] h-8 bg-white/[0.06]" />
            <div className="text-center">
              <p className="text-white/80 text-[clamp(1.2rem,3vw,1.6rem)] font-semibold tracking-[-0.02em]">3 sem</p>
              <p className="text-white/40 text-[9px] uppercase tracking-[0.15em] mt-1">Délai moyen</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-6 sm:px-10 py-5 border-t border-white/[0.04]">
          <Link href="/" className="text-white/40 text-[11px] hover:text-white/60 transition-colors">
            Pulsa Creatives
          </Link>
          <div className="flex items-center gap-5">
            <a href="https://instagram.com/pulsacreatives" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white/60 transition-colors" aria-label="Instagram">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a href="https://tiktok.com/@pulsacreatives" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white/60 transition-colors" aria-label="TikTok">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.72a8.19 8.19 0 0 0 4.76 1.52V6.79a4.83 4.83 0 0 1-1-.1z" />
              </svg>
            </a>
            <Link href="/legal" className="text-white/40 text-[11px] hover:text-white/60 transition-colors">
              Legal
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ FIXED — Messages ═══ */}
      <a href="https://wa.me/32473236759" target="_blank" rel="noopener noreferrer" className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50" aria-label="Nous contacter">
        <div className="w-11 h-11 sm:w-12 sm:h-12 bg-black/85 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:bg-black hover:scale-105 transition-all duration-300">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="none">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        </div>
      </a>
    </div>
  );
}
