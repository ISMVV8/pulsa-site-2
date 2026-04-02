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
  const titleRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const cursor = cursorRef.current;
    const cursorText = cursorTextRef.current;
    const titleEl = titleRef.current;
    if (!section || !track || !cursor || !cursorText || !titleEl) return;

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
        gsap.to(cursor, { width: 80, height: 80, duration: 0.3, ease: "power2.out" });
        gsap.to(cursorText, { opacity: 1, duration: 0.3 });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(cursor, { width: 16, height: 16, duration: 0.3, ease: "power2.out" });
        gsap.to(cursorText, { opacity: 0, duration: 0.2 });
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
        const number = card.querySelector("[data-number]");
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

        // Number slides in from right
        if (number) {
          gsap.fromTo(number,
            { x: 80, opacity: 0 },
            {
              x: 0, opacity: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                containerAnimation: tween,
                start: "left 80%",
                end: "left 50%",
                scrub: 0.5,
              },
            }
          );
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

  // Update floating title
  useEffect(() => {
    const titleEl = titleRef.current;
    if (!titleEl) return;
    gsap.to(titleEl, {
      opacity: 0,
      duration: 0.15,
      onComplete: () => {
        if (titleRef.current) {
          titleRef.current.textContent = projects[activeIndex]?.name || "";
        }
        gsap.to(titleEl, { opacity: 1, duration: 0.3, y: 0 });
      },
      y: -10,
    });
  }, [activeIndex]);

  return (
    <div className="bg-white text-black">
      {/* ── Custom cursor (hidden on mobile) ── */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:flex items-center justify-center"
      >
        <span ref={cursorTextRef} className="text-[9px] uppercase tracking-[0.1em] text-black font-medium opacity-0">
          View
        </span>
      </div>

      {/* ═══ HEADER ═══ */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-8 py-4 sm:py-5">
        <Link href="/">
          <GlassCircle className="w-9 h-9 sm:w-10 sm:h-10 p-0.5">
            <Image src="/logo-pulsa.jpg" alt="Pulsa" width={32} height={32} className="object-contain mix-blend-multiply" />
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
          {"Nos réalisations.".split("").map((char, i) => (
            <span key={i} className="inline-block" style={{ perspective: "600px" }}>
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>
        <p data-hero-sub className="relative z-10 mt-4 text-black/40 text-[12px] sm:text-[13px] tracking-[0.04em] max-w-md">
          Scrollez pour explorer nos projets
        </p>

        <div data-hero-scroll className="relative z-10 mt-12 flex flex-col items-center gap-2">
          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-black/20 to-black/40 animate-pulse" />
          <span className="text-[9px] uppercase tracking-[0.25em] text-black/25">Scroll</span>
        </div>
      </section>

      {/* ═══ HORIZONTAL SCROLL SECTION ═══ */}
      <section ref={sectionRef} className="relative h-screen overflow-hidden">
        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/10 z-30">
          <div
            className="h-full bg-white/70 ease-linear"
            style={{ width: `${progress * 100}%`, transition: "width 0.1s linear" }}
          />
        </div>

        {/* Floating project title — top center */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 hidden md:block">
          <div
            ref={titleRef}
            className="text-white/50 text-[13px] font-medium tracking-[0.15em] uppercase"
          >
            {projects[0]?.name}
          </div>
        </div>

        {/* Counter — top right */}
        <div className="absolute top-6 right-8 z-30">
          <div className="flex items-center gap-3">
            <span className="text-white/30 text-[11px] tracking-[0.15em] uppercase">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <div className="w-12 h-[1px] bg-white/15 relative">
              <div
                className="absolute top-0 left-0 h-full bg-white/60"
                style={{
                  width: `${((activeIndex + 1) / projects.length) * 100}%`,
                  transition: "width 0.4s ease-out",
                }}
              />
            </div>
            <span className="text-white/20 text-[11px] tracking-[0.15em] uppercase">
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
                  unoptimized
                />
              </div>

              {/* Gradient — bottom-left corner */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-black/5 to-transparent z-10" />

              {/* Number watermark */}
              <span
                data-number
                className="absolute top-[15%] right-[5%] text-white/[0.04] text-[12rem] sm:text-[16rem] md:text-[20rem] font-black leading-none z-10 select-none pointer-events-none"
              >
                {String(i + 1).padStart(2, "0")}
              </span>

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
                  <p className="text-white/50 text-[13px] sm:text-[14px] mt-3 leading-relaxed line-clamp-2">
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

      {/* ═══ CTA — Sakura background like landing ═══ */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/bg-sakura.jpg" alt="" fill className="object-cover" />
        </div>
        <div className="relative z-10 flex flex-col items-center text-center px-6">
          <span className="text-[11px] uppercase tracking-[0.2em] text-black/30 mb-4">Prêt à transformer votre présence digitale ?</span>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-[-0.03em] leading-[1.1]">
            Votre projet, le prochain<span className="text-black/15">.</span>
          </h2>
          <p className="mt-4 text-black/35 text-[13px] sm:text-[14px] max-w-md leading-relaxed">
            Discutons de votre vision et créons quelque chose d&apos;exceptionnel ensemble.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3 mt-8">
            <a href="https://wa.me/32473236759" target="_blank" rel="noopener noreferrer">
              <GlassButton className="!px-8 !py-3.5 !text-[13px]">
                Démarrer un projet →
              </GlassButton>
            </a>
            <Link href="/">
              <GlassButton className="!px-8 !py-3.5 !text-[13px]">
                Retour à l&apos;accueil
              </GlassButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="flex flex-col items-center gap-2 py-6 px-5">
        <p className="text-[10px] sm:text-[11px] text-black/20 tracking-wide text-center">
          © Pulsa Creatives ·{" "}
          <Link href="/legal" className="hover:text-black/40 transition-colors duration-300">Legal</Link>
        </p>
      </footer>

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
