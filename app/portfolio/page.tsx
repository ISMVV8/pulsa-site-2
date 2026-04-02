"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/app/lib/projects";
import { GlassButton, GlassCircle } from "@/app/components/glass-button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
  const projectsRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

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

      // Project cards — staggered reveal on scroll
      const cards = gsap.utils.toArray<HTMLElement>("[data-project-card]");
      cards.forEach((card, i) => {
        const image = card.querySelector("[data-project-image]");
        const info = card.querySelector("[data-project-info]");
        const tags = card.querySelector("[data-project-tags]");

        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          y: 80,
          opacity: 0,
          duration: 0.9,
          delay: i % 2 === 1 ? 0.15 : 0,
          ease: "power3.out",
        });

        if (image) {
          gsap.from(image, {
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            scale: 1.15,
            duration: 1.2,
            ease: "power2.out",
          });
        }

        if (info) {
          gsap.from(info, {
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none none",
            },
            y: 20,
            opacity: 0,
            duration: 0.7,
            delay: 0.3,
            ease: "power2.out",
          });
        }

        if (tags) {
          gsap.from(tags.children, {
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none none",
            },
            y: 10,
            opacity: 0,
            duration: 0.5,
            stagger: 0.08,
            delay: 0.5,
            ease: "power2.out",
          });
        }
      });

      // Parallax on project images
      cards.forEach((card) => {
        const image = card.querySelector("[data-project-image]");
        if (image) {
          gsap.to(image, {
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
            y: -30,
            ease: "none",
          });
        }
      });

      // CTA section
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

  // Row-based layout: each row has 2 items with matching heights
  const rows: [number, number][] = [];
  for (let i = 0; i < projects.length; i += 2) {
    rows.push([i, i + 1]);
  }

  // Alternating patterns per row
  const getRowLayout = (rowIndex: number): [string, string] => {
    return rowIndex % 2 === 0
      ? ["md:w-[58%]", "md:w-[40%]"]   // large left, small right
      : ["md:w-[40%]", "md:w-[58%]"];   // small left, large right
  };

  return (
    <div className="relative min-h-[100dvh] bg-white text-black overflow-hidden">
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
      </section>

      {/* ═══ PROJECTS — Full-image cards with glass overlay ═══ */}
      <section ref={projectsRef} className="px-5 sm:px-8 md:px-12 lg:px-16 pb-24 max-w-[1500px] mx-auto">
        <div className="flex flex-col gap-6 md:gap-8">
          {rows.map(([leftIdx, rightIdx], rowIndex) => {
            const [leftSize, rightSize] = getRowLayout(rowIndex);
            const leftProject = projects[leftIdx];
            const rightProject = projects[rightIdx];

            const renderCard = (project: typeof projects[0], idx: number, size: string) => (
              <Link
                href={`/portfolio/${project.slug}`}
                data-project-card
                className={`group block w-full ${size}`}
              >
                <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden">
                  {/* Full background image */}
                  <div data-project-image className="absolute inset-[-20px]">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                      loading={idx < 2 ? "eager" : "lazy"}
                    />
                  </div>

                  {/* Subtle gradient at bottom for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />

                  {/* Hover darken */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-500 z-10" />

                  {/* Number watermark */}
                  <span className="absolute top-4 right-5 text-white/15 text-[clamp(3rem,5vw,5rem)] font-bold leading-none z-10 select-none pointer-events-none">
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  {/* ── Glass overlay bottom-left ── */}
                  <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col gap-2.5">
                    {/* Info glass card */}
                    <div className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-2xl px-5 py-4 max-w-[85%]">
                      <h2 className="text-white text-[17px] sm:text-[20px] font-semibold tracking-[-0.01em] leading-tight">
                        {project.name}
                      </h2>
                      <p className="text-white/70 text-[12px] sm:text-[13px] mt-1.5 leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    {/* Tags as glass pills */}
                    <div data-project-tags className="flex flex-wrap gap-1.5">
                      {project.services.map((service) => (
                        <span
                          key={service}
                          className="bg-white/15 backdrop-blur-xl border border-white/20 text-white/90 px-3 py-1.5 text-[10px] sm:text-[11px] uppercase tracking-[0.06em] rounded-full"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            );

            return (
              <div key={rowIndex} className="flex flex-col md:flex-row gap-5 md:gap-6">
                {leftProject && renderCard(leftProject, leftIdx, leftSize)}
                {rightProject && renderCard(rightProject, rightIdx, rightSize)}
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <footer data-cta className="flex flex-col items-center gap-4 sm:gap-6 pb-8 sm:pb-12 px-5 sm:px-6">
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
