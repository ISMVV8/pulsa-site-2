"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.from("[data-hero-title]", { y: 50, opacity: 0, duration: 1, ease: "power3.out" });
      gsap.from("[data-hero-sub]", { y: 25, opacity: 0, duration: 0.8, delay: 0.25, ease: "power3.out" });

      // Calculate horizontal scroll distance
      const getScrollDistance = () => -(track.scrollWidth - window.innerWidth);

      // Main horizontal scroll tween
      const tween = gsap.to(track, {
        x: getScrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 0.8,
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

      // Animate each card as it comes into view
      const cards = gsap.utils.toArray<HTMLElement>("[data-card]");
      cards.forEach((card, i) => {
        // Card scale + fade
        gsap.fromTo(
          card,
          { opacity: 0.3, scale: 0.88, rotateY: 4 },
          {
            opacity: 1,
            scale: 1,
            rotateY: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              containerAnimation: tween,
              start: "left 90%",
              end: "left 40%",
              scrub: 0.5,
            },
          }
        );

        // Glass overlay slides up
        const glass = card.querySelector("[data-glass]");
        if (glass) {
          gsap.fromTo(
            glass,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                containerAnimation: tween,
                start: "left 75%",
                end: "left 35%",
                scrub: 0.5,
              },
            }
          );
        }

        // Parallax on image
        const img = card.querySelector("[data-img]");
        if (img) {
          gsap.fromTo(
            img,
            { x: 40 },
            {
              x: -40,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: tween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-white text-black">
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

      {/* ═══ HERO — Fullscreen with sakura bg like landing ═══ */}
      <section ref={heroRef} className="relative h-[100dvh] flex flex-col items-center justify-center text-center px-6">
        {/* Background image — same as landing page */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/bg-sakura.jpg"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>

        <h1 data-hero-title className="relative z-10 text-[clamp(2.5rem,8vw,5.5rem)] font-semibold tracking-[-0.04em] leading-[1.05]">
          Nos réalisations<span className="text-black/20">.</span>
        </h1>
        <p data-hero-sub className="relative z-10 mt-4 text-black/40 text-[12px] sm:text-[13px] tracking-[0.04em] max-w-md">
          Scrollez pour explorer nos projets
        </p>

        {/* Scroll hint */}
        <div className="relative z-10 absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-black/25">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>

      {/* ═══ HORIZONTAL SCROLL SECTION ═══ */}
      <section ref={sectionRef} className="relative h-screen overflow-hidden">
        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/10 z-30">
          <div
            className="h-full bg-white/60 transition-[width] duration-100 ease-linear"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        {/* Counter */}
        <div className="absolute top-6 right-10 z-30">
          <span className="bg-black/30 backdrop-blur-xl text-white/80 text-[12px] px-4 py-1.5 rounded-full uppercase tracking-[0.15em]">
            {String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </span>
        </div>

        {/* Dot indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          {projects.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-400 ease-out"
              style={{
                width: activeIndex === i ? "24px" : "8px",
                height: "8px",
                backgroundColor: activeIndex === i ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.2)",
              }}
            />
          ))}
        </div>

        {/* Track */}
        <div
          ref={trackRef}
          className="flex items-center gap-0 h-full"
          style={{ width: "fit-content" }}
        >
          {projects.map((project, i) => (
            <Link
              key={project.slug}
              href={`/portfolio/${project.slug}`}
              data-card
              className="group flex-shrink-0 block h-screen w-screen"
            >
              <div className="relative w-full h-full overflow-hidden">
                {/* Image with parallax container */}
                <div data-img className="absolute inset-[-40px]">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    loading={i < 3 ? "eager" : "lazy"}
                    sizes="(max-width: 768px) 90vw, 800px"
                  />
                </div>

                {/* Gradient — left side only for glass */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent z-10" />

                {/* Hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 z-10" />

                {/* Number watermark */}
                <span className="absolute top-8 right-10 text-white/8 text-[6rem] sm:text-[8rem] md:text-[10rem] font-bold leading-none z-10 select-none pointer-events-none">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* ── Glass — bottom-left, sized for fullscreen ── */}
                <div data-glass className="absolute bottom-8 sm:bottom-10 left-6 sm:left-10 z-20 max-w-[85%] sm:max-w-[45%] md:max-w-[35%] flex flex-col gap-2.5">
                  {/* Pills row */}
                  <div className="flex items-center gap-2">
                    <span className="bg-white/15 backdrop-blur-2xl border border-white/20 text-white/75 px-4 py-1.5 text-[11px] sm:text-[12px] uppercase tracking-[0.1em] rounded-full">
                      {project.year}
                    </span>
                    <span className="bg-white/15 backdrop-blur-2xl border border-white/20 text-white/75 px-4 py-1.5 text-[11px] sm:text-[12px] uppercase tracking-[0.1em] rounded-full">
                      {project.type}
                    </span>
                  </div>

                  {/* Info card */}
                  <div className="bg-white/10 backdrop-blur-2xl border border-white/15 rounded-2xl px-6 py-5 sm:px-7 sm:py-6">
                    <h2 className="text-white text-[22px] sm:text-[28px] md:text-[32px] font-semibold tracking-[-0.02em] leading-tight">
                      {project.name}
                    </h2>
                    <p className="text-white/55 text-[13px] sm:text-[14px] mt-2 leading-relaxed line-clamp-2">
                      {project.longDescription}
                    </p>
                  </div>

                  {/* Service tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.services.map((s) => (
                      <span key={s} className="bg-white/10 backdrop-blur-xl border border-white/15 text-white/70 px-3.5 py-1.5 text-[10px] sm:text-[11px] uppercase tracking-[0.06em] rounded-full">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow CTA — bottom right */}
                <div className="absolute bottom-8 sm:bottom-10 right-6 sm:right-10 z-20 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <div className="bg-white/15 backdrop-blur-2xl border border-white/20 rounded-full w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
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
          <Link href="/legal" className="hover:text-black/50 transition-colors duration-300">Legal</Link>
        </p>
      </footer>

      {/* ═══ FIXED — Vision (left) + Messages (right) ═══ */}
      <Link href="/vision" className="fixed bottom-5 left-5 sm:bottom-6 sm:left-6 z-50" aria-label="Notre vision">
        <div className="w-11 h-11 sm:w-12 sm:h-12 bg-black/85 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:bg-black hover:scale-105 transition-all duration-300">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
          </svg>
        </div>
      </Link>

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
