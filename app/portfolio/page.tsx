"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GlassButton, GlassCircle } from "../components/glass-button";
import { ProjectModal, type Project } from "../components/project-modal";
import { SmoothScroll } from "../components/smooth-scroll";
import "./portfolio.css";

gsap.registerPlugin(ScrollTrigger);

const projects: Project[] = [
  {
    name: "City Smile",
    type: "Site vitrine",
    year: "2025",
    description: "Cabinet dentaire haut de gamme",
    longDescription:
      "Refonte complète du site vitrine pour un cabinet dentaire premium à Bruxelles. Design épuré, prise de rendez-vous en ligne, et optimisation SEO locale pour maximiser la visibilité.",
    image: "/projects/city-smile.jpg",
    color: "#4A90D9",
    tags: ["Next.js", "SEO", "Design UI/UX", "Responsive"],
  },
  {
    name: "Success Talent",
    type: "Plateforme RH",
    year: "2025",
    description: "Mise en relation talents & entreprises",
    longDescription:
      "Plateforme de recrutement connectant les meilleurs talents aux entreprises. Dashboard candidat, système de matching intelligent, et interface administration complète.",
    image: "/projects/success-talent.jpg",
    color: "#6C5CE7",
    tags: ["React", "Node.js", "Base de données", "Dashboard"],
  },
  {
    name: "Terra Sky",
    type: "Immobilier",
    year: "2024",
    description: "Agence immobilière premium",
    longDescription:
      "Site immobilier haut de gamme avec recherche avancée de biens, visites virtuelles 360°, estimation en ligne et espace propriétaire dédié.",
    image: "/projects/terra-sky.jpg",
    color: "#2D3436",
    tags: ["Next.js", "API Maps", "Filtres avancés", "CMS"],
  },
  {
    name: "Sweety Délice",
    type: "E-commerce",
    year: "2024",
    description: "Pâtisserie artisanale en ligne",
    longDescription:
      "Boutique en ligne pour une pâtisserie artisanale. Catalogue produits avec photos HD, commandes personnalisées, click & collect et livraison à domicile.",
    image: "/projects/sweety-delice.jpg",
    color: "#E17055",
    tags: ["Shopify", "E-commerce", "Paiement", "Design"],
  },
  {
    name: "8lab Ecosystem",
    type: "Plateforme",
    year: "2025",
    description: "Écosystème e-commerce & formation",
    longDescription:
      "Écosystème complet pour entrepreneurs e-commerce : formation, coaching, networking, sourcing et outils. +2 400 membres actifs sur la plateforme.",
    image: "/projects/8lab.jpg",
    color: "#0A0A0A",
    tags: ["Next.js", "Supabase", "Stripe", "Dashboard"],
  },
  {
    name: "Podium",
    type: "E-commerce",
    year: "2025",
    description: "Thème Shopify sur-mesure",
    longDescription:
      "Thème Shopify premium entièrement custom avec des performances optimisées, animations fluides, et un design conversion-oriented pour maximiser les ventes.",
    image: "/projects/podium.jpg",
    color: "#636E72",
    tags: ["Shopify", "Liquid", "Performance", "Conversion"],
  },
];

const horizontalProjects = projects.slice(0, 3);
const featuredProject = projects[4]; // 8lab
const gridProjects = [projects[3], projects[5], projects[0]]; // Sweety, Podium, City Smile

// ─── Marquee Component ───
function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current) return;

    const tl = gsap.to(trackRef.current, {
      xPercent: -50,
      duration: 20,
      ease: "none",
      repeat: -1,
    });

    // Speed up/slow down based on scroll velocity
    ScrollTrigger.create({
      trigger: trackRef.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const velocity = Math.abs(self.getVelocity());
        const speed = gsap.utils.clamp(0.5, 3, velocity / 500);
        gsap.to(tl, { timeScale: speed, duration: 0.3 });
      },
    });

    return () => {
      tl.kill();
    };
  }, []);

  const items = [
    { text: "PULSA CREATIVES", stroke: false },
    { text: "DESIGN", stroke: true },
    { text: "DEVELOP", stroke: false },
    { text: "DEPLOY", stroke: true },
    { text: "BRANDING", stroke: false },
    { text: "STRATEGY", stroke: true },
  ];

  const renderItems = () =>
    items.map((item, i) => (
      <span key={i} className="flex items-center gap-8">
        <span
          className={`text-[clamp(2rem,6vw,5rem)] font-bold tracking-tight whitespace-nowrap ${
            item.stroke ? "marquee-stroke" : ""
          }`}
        >
          {item.text}
        </span>
        <span className="text-[clamp(1rem,3vw,2rem)] opacity-20">·</span>
      </span>
    ));

  return (
    <div className="overflow-hidden py-12 md:py-20 border-y border-black/[0.06]">
      <div ref={trackRef} className="marquee-track flex items-center gap-8 w-max">
        {renderItems()}
        {renderItems()}
      </div>
    </div>
  );
}

// ─── Main Portfolio Page ───
export default function Portfolio() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const cardsWrapperRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const scrollArrowRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    setMounted(true);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // ─── GSAP Animations ───
  const initAnimations = useCallback(() => {
    const ctx = gsap.context(() => {
      // ── Hero letter animation ──
      const letters = gsap.utils.toArray<HTMLElement>(".hero-letter");
      gsap.from(letters, {
        y: 80,
        opacity: 0,
        rotateX: -90,
        stagger: 0.04,
        duration: 1,
        ease: "back.out(1.7)",
        delay: 0.3,
      });

      // ── Hero counter fade in ──
      gsap.from(".hero-counter", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 1,
        ease: "power2.out",
      });

      // ── Scroll arrow fade out ──
      if (scrollArrowRef.current) {
        gsap.to(scrollArrowRef.current, {
          scrollTrigger: {
            trigger: scrollArrowRef.current,
            start: "top 80%",
            end: "top 20%",
            scrub: true,
          },
          opacity: 0,
          y: -20,
        });
      }

      // ── Progress line ──
      if (progressRef.current) {
        gsap.to(progressRef.current, {
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.3,
          },
          scaleX: 1,
        });
      }

      // ── Horizontal scroll (desktop only) ──
      if (!isMobile && horizontalRef.current && cardsWrapperRef.current) {
        const cards = gsap.utils.toArray<HTMLElement>(".horizontal-card");
        const totalWidth = cards.length * window.innerWidth * 0.82;

        gsap.to(cardsWrapperRef.current, {
          x: -(totalWidth - window.innerWidth + 100),
          ease: "none",
          scrollTrigger: {
            trigger: horizontalRef.current,
            pin: true,
            scrub: 1,
            end: `+=${totalWidth}`,
            invalidateOnRefresh: true,
          },
        });

        // Individual card animations
        cards.forEach((card) => {
          const img = card.querySelector(".horizontal-card-image");
          const title = card.querySelector(".card-title");
          const meta = card.querySelector(".card-meta");

          if (img) {
            gsap.from(img, {
              scale: 1.3,
              scrollTrigger: {
                trigger: card,
                containerAnimation: gsap.getById("horizontalScroll") || undefined,
                start: "left 80%",
                end: "left 20%",
                scrub: true,
                horizontal: true,
              },
            });
          }

          if (title) {
            gsap.from(title, {
              y: 60,
              opacity: 0,
              scrollTrigger: {
                trigger: card,
                start: "top 70%",
                end: "top 40%",
                scrub: 1,
              },
            });
          }

          if (meta) {
            gsap.from(meta, {
              y: 30,
              opacity: 0,
              scrollTrigger: {
                trigger: card,
                start: "top 65%",
                end: "top 35%",
                scrub: 1,
              },
            });
          }
        });
      }

      // ── Mobile: vertical card reveals ──
      if (isMobile) {
        const mobileCards = gsap.utils.toArray<HTMLElement>(".mobile-project-card");
        mobileCards.forEach((card) => {
          gsap.from(card, {
            y: 60,
            opacity: 0,
            scale: 0.95,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 60%",
              scrub: 1,
            },
          });
        });
      }

      // ── Featured section ──
      if (featuredRef.current) {
        // Pin the featured section
        ScrollTrigger.create({
          trigger: featuredRef.current,
          pin: true,
          start: "top top",
          end: "+=150%",
          scrub: true,
        });

        // Grayscale to color
        const featuredImg = featuredRef.current.querySelector(".featured-image");
        if (featuredImg) {
          gsap.fromTo(
            featuredImg,
            { filter: "grayscale(100%) brightness(0.7)" },
            {
              filter: "grayscale(0%) brightness(1)",
              scrollTrigger: {
                trigger: featuredRef.current,
                start: "top top",
                end: "+=100%",
                scrub: true,
              },
            }
          );
        }

        // Word-by-word reveal
        const words = gsap.utils.toArray<HTMLElement>(
          featuredRef.current.querySelectorAll(".reveal-word")
        );
        words.forEach((word, i) => {
          gsap.from(word, {
            opacity: 0.1,
            y: 20,
            scrollTrigger: {
              trigger: featuredRef.current,
              start: `top+=${i * 8}% top`,
              end: `top+=${i * 8 + 12}% top`,
              scrub: true,
            },
          });
        });

        // Counter animation
        if (counterRef.current) {
          const counter = { val: 0 };
          gsap.to(counter, {
            val: 2400,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: counterRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
            onUpdate: () => {
              if (counterRef.current) {
                counterRef.current.textContent = `+${Math.round(counter.val).toLocaleString("fr-FR")}`;
              }
            },
          });
        }
      }

      // ── Staggered grid ──
      if (gridRef.current) {
        const gridCards = gsap.utils.toArray<HTMLElement>(".stagger-card");
        const animations = [
          { x: -100, y: 40, rotation: -3 },
          { x: 100, y: 40, rotation: 3 },
          { scale: 0.8, y: 80, rotation: 0 },
        ];

        gridCards.forEach((card, i) => {
          const anim = animations[i] || animations[0];
          gsap.from(card, {
            ...anim,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 50%",
              scrub: 1,
            },
          });

          // Parallax on image
          const img = card.querySelector(".stagger-card-image");
          if (img) {
            gsap.to(img, {
              y: isMobile ? -30 : -80,
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            });
          }
        });
      }

      // ── CTA section ──
      if (ctaRef.current) {
        // Background color transition
        gsap.fromTo(
          ctaRef.current,
          { backgroundColor: "#ffffff" },
          {
            backgroundColor: "#0a0a0a",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 80%",
              end: "top 30%",
              scrub: true,
            },
          }
        );

        // Word fade-in
        const ctaWords = gsap.utils.toArray<HTMLElement>(
          ctaRef.current.querySelectorAll(".cta-word")
        );
        ctaWords.forEach((word, i) => {
          gsap.from(word, {
            opacity: 0,
            y: 40,
            scrollTrigger: {
              trigger: ctaRef.current,
              start: `top+=${60 + i * 5}% bottom`,
              end: `top+=${70 + i * 5}% bottom`,
              scrub: true,
            },
          });
        });

        // CTA button glow
        const ctaButton = ctaRef.current.querySelector(".cta-button");
        if (ctaButton) {
          gsap.from(ctaButton, {
            opacity: 0,
            scale: 0.9,
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 20%",
              end: "top 0%",
              scrub: true,
            },
          });
        }
      }
    }, containerRef);

    return ctx;
  }, [isMobile]);

  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const ctx = initAnimations();
      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timer);
  }, [initAnimations]);

  // Split text helper
  const splitLetters = (text: string, italic = false) =>
    text.split("").map((letter, i) => (
      <span
        key={i}
        className={`hero-letter ${italic ? "hero-italic" : ""}`}
        style={{ perspective: "600px" }}
      >
        {letter === " " ? "\u00A0" : letter}
      </span>
    ));

  const splitWords = (text: string, className: string) =>
    text.split(" ").map((word, i) => (
      <span key={i} className={`${className} mr-[0.3em]`}>
        {word}
      </span>
    ));

  return (
    <SmoothScroll>
      <div ref={containerRef} className="bg-white text-black overflow-hidden">
        {/* Noise texture overlay */}
        <div className="noise-overlay" />

        {/* Fixed progress bar */}
        <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-black/5">
          <div
            ref={progressRef}
            className="progress-line h-full bg-black/40"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        {/* Fixed header */}
        <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-5 md:px-10 py-4 md:py-6 mix-blend-difference">
          <Link href="/">
            <GlassCircle className="w-10 h-10 p-0.5">
              <Image
                src="/logo-pulsa.jpg"
                alt="Pulsa"
                width={32}
                height={32}
                className="object-contain mix-blend-multiply"
              />
            </GlassCircle>
          </Link>
          <Link href="/">
            <GlassButton className="!text-[11px] !px-5 !py-2.5">Retour</GlassButton>
          </Link>
        </header>

        {/* ═══ A) HERO ═══ */}
        <section
          ref={heroRef}
          className="relative h-[100dvh] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0">
            <Image
              src="/bg-sakura.jpg"
              alt=""
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]" />
          </div>

          {/* Content */}
          <div className="relative z-10 text-center px-6">
            <p className="text-[10px] md:text-[12px] uppercase tracking-[0.3em] text-black/40 mb-6 hero-counter">
              Portfolio · 2024 — 2025
            </p>

            <h1 className="text-[clamp(3rem,10vw,8rem)] font-bold leading-[0.9] tracking-[-0.04em]">
              <span className="block">{splitLetters("Selected")}</span>
              <span className="block mt-1">{splitLetters("Work", true)}</span>
            </h1>

            <div className="hero-counter mt-8 flex items-center justify-center gap-4 text-[12px] md:text-[14px] text-black/40 font-medium tracking-wide">
              <span>01</span>
              <span className="w-12 h-[1px] bg-black/20" />
              <span>06</span>
            </div>
          </div>

          {/* Scroll arrow */}
          <div
            ref={scrollArrowRef}
            className="scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-black/30">
              Scroll
            </span>
            <svg
              className="scroll-arrow w-5 h-5 text-black/30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7" />
            </svg>
          </div>
        </section>

        {/* ═══ B) HORIZONTAL SCROLL GALLERY (Desktop) / STACKED (Mobile) ═══ */}
        {!mounted ? null : !isMobile ? (
          <section ref={horizontalRef} className="horizontal-section relative h-screen">
            <div
              ref={cardsWrapperRef}
              className="flex items-center h-full gap-8 pl-[10vw]"
            >
              {horizontalProjects.map((project, i) => (
                <button
                  key={project.name}
                  onClick={() => setSelected(project)}
                  className="horizontal-card relative flex-shrink-0 rounded-3xl overflow-hidden cursor-pointer group text-left"
                  style={{ width: "78vw", height: "75vh" }}
                >
                  <div className="absolute inset-0 overflow-hidden rounded-3xl">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="horizontal-card-image object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="card-glass-overlay absolute inset-0" />

                  {/* Card number */}
                  <span className="absolute top-6 left-8 text-white/30 text-[clamp(4rem,8vw,7rem)] font-bold leading-none">
                    0{i + 1}
                  </span>

                  {/* Card info */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                    <span className="card-meta text-[10px] md:text-[12px] uppercase tracking-[0.2em] text-white/50 font-medium">
                      {project.type} · {project.year}
                    </span>
                    <h2 className="card-title text-[clamp(2rem,4vw,4rem)] font-bold text-white mt-2 tracking-tight">
                      {project.name}
                    </h2>
                    <p className="text-white/50 text-[14px] mt-2 max-w-md">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex gap-2 mt-4">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-[10px] rounded-full bg-white/10 text-white/60 backdrop-blur-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Hover arrow */}
                  <div className="absolute top-6 right-8 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </section>
        ) : (
          <section className="px-5 py-12 space-y-6">
            {horizontalProjects.map((project, i) => (
              <button
                key={project.name}
                onClick={() => setSelected(project)}
                className="mobile-project-card relative w-full rounded-2xl overflow-hidden cursor-pointer group text-left"
                style={{ height: "55vh" }}
              >
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="card-glass-overlay absolute inset-0" />

                <span className="absolute top-4 left-5 text-white/20 text-5xl font-bold">
                  0{i + 1}
                </span>

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/50">
                    {project.type} · {project.year}
                  </span>
                  <h2 className="text-2xl font-bold text-white mt-1">{project.name}</h2>
                  <p className="text-white/50 text-[13px] mt-1">{project.description}</p>
                </div>
              </button>
            ))}
          </section>
        )}

        {/* ═══ E) MARQUEE ═══ */}
        <Marquee />

        {/* ═══ C) FEATURED PROJECT — 8lab ═══ */}
        <section
          ref={featuredRef}
          className="featured-section relative h-screen overflow-hidden"
        >
          {/* Background image */}
          <div className="absolute inset-0">
            <Image
              src={featuredProject.image}
              alt={featuredProject.name}
              fill
              className="featured-image object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>

          {/* Content overlay */}
          <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-16 lg:px-24 max-w-6xl">
            <span className="text-[10px] md:text-[12px] uppercase tracking-[0.3em] text-white/40 mb-4">
              Projet vedette
            </span>

            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold text-white leading-[1.1] tracking-tight">
              {splitWords(
                "Un écosystème complet pour entrepreneurs ambitieux",
                "reveal-word"
              )}
            </h2>

            <div className="mt-10 flex flex-wrap items-end gap-10 md:gap-16">
              <div>
                <span
                  ref={counterRef}
                  className="stat-counter text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-white"
                >
                  +0
                </span>
                <p className="text-white/40 text-[12px] md:text-[14px] tracking-wide mt-1">
                  membres actifs
                </p>
              </div>
              <div>
                <span className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-white">
                  4
                </span>
                <p className="text-white/40 text-[12px] md:text-[14px] tracking-wide mt-1">
                  modules intégrés
                </p>
              </div>
              <div>
                <span className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-white">
                  ∞
                </span>
                <p className="text-white/40 text-[12px] md:text-[14px] tracking-wide mt-1">
                  potentiel de croissance
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelected(featuredProject)}
              className="mt-10 self-start"
            >
              <GlassButton className="!text-white !text-[12px] md:!text-[13px]">
                Découvrir le projet
              </GlassButton>
            </button>
          </div>

          {/* Project name watermark */}
          <span className="absolute bottom-6 right-6 md:bottom-10 md:right-16 text-white/[0.06] text-[clamp(4rem,12vw,10rem)] font-bold tracking-tight pointer-events-none">
            8lab
          </span>
        </section>

        {/* ═══ Second MARQUEE ═══ */}
        <Marquee />

        {/* ═══ D) STAGGERED GRID ═══ */}
        <section ref={gridRef} className="px-5 md:px-16 lg:px-24 py-20 md:py-32">
          <div className="max-w-6xl mx-auto">
            <p className="text-[10px] md:text-[12px] uppercase tracking-[0.3em] text-black/30 mb-4">
              Plus de projets
            </p>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-tight mb-12 md:mb-20">
              Chaque projet,<br />
              <span className="text-black/30">une histoire unique.</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {gridProjects.map((project, i) => (
                <button
                  key={project.name}
                  onClick={() => setSelected(project)}
                  className={`stagger-card relative rounded-3xl overflow-hidden cursor-pointer group text-left ${
                    i === 2 ? "md:col-span-2 md:max-w-[60%] md:mx-auto" : ""
                  }`}
                  style={{ height: i === 2 ? "50vh" : "60vh" }}
                >
                  <div className="absolute inset-0 overflow-hidden rounded-3xl">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="stagger-card-image object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      style={{ transform: "translateY(40px)" }}
                    />
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500" />
                  <div className="card-glass-overlay absolute inset-0 opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/50">
                      {project.type} · {project.year}
                    </span>
                    <h3 className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-white mt-1 tracking-tight">
                      {project.name}
                    </h3>
                    <p className="text-white/0 group-hover:text-white/60 transition-colors duration-500 text-[13px] md:text-[14px] mt-2 max-w-sm">
                      {project.longDescription}
                    </p>

                    <div className="flex gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-[10px] rounded-full bg-white/10 text-white/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Arrow icon */}
                  <div className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:rotate-0 rotate-45">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ F) CTA SECTION ═══ */}
        <section
          ref={ctaRef}
          className="relative min-h-screen flex flex-col items-center justify-center px-6 transition-colors"
        >
          <div className="text-center max-w-4xl">
            <h2 className="text-[clamp(2.5rem,7vw,6rem)] font-bold leading-[1] tracking-tight text-white">
              {splitWords("Votre projet est le prochain", "cta-word")}
            </h2>

            <p className="cta-word mt-6 text-white/40 text-[14px] md:text-[16px] max-w-lg mx-auto leading-relaxed">
              Chaque marque mérite une présence digitale qui inspire. Parlons de votre vision.
            </p>

            <div className="cta-button mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/32473236759"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GlassButton className="!text-white !text-[13px] md:!text-[14px] !px-10 !py-4 shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                  Lancer votre projet
                </GlassButton>
              </a>
            </div>

            <div className="cta-word mt-16 flex flex-col items-center gap-2 text-white/20 text-[12px] tracking-wide">
              <span>contact@pulsacreatives.com</span>
              <span>© Pulsa Creatives 2025</span>
            </div>
          </div>
        </section>

        {/* Modal */}
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      </div>
    </SmoothScroll>
  );
}
