import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import VisionAnimations from "./animations";
import { GlassCircle } from "../components/glass-button";

export const metadata: Metadata = {
  title: "Notre Vision",
  description:
    "Précision, émotion, performance. Découvrez la philosophie de Pulsa Creatives — agence digitale premium à Bruxelles.",
  openGraph: {
    title: "Notre Vision — Pulsa Creatives",
    description: "Précision, émotion, performance. La philosophie Pulsa Creatives.",
    url: "https://pulsacreatives.com/vision",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Notre Vision — Pulsa Creatives",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://pulsacreatives.com/vision",
  },
};

const values = [
  {
    number: "01",
    title: "On écoute avant de coder",
    text: "Chaque projet commence par une vraie conversation. On cherche à comprendre votre business, vos clients, vos ambitions. Le code vient après.",
  },
  {
    number: "02",
    title: "Le détail, c'est pas un bonus",
    text: "Un bouton bien placé, une animation fluide, un temps de chargement éclair. C'est la somme de ces détails qui fait qu'un site convertit.",
  },
  {
    number: "03",
    title: "On livre, on ne disparaît pas",
    text: "Un site livré, c'est le début — pas la fin. On reste là pour optimiser, ajuster, accompagner. Votre succès, c'est aussi le nôtre.",
  },
];

export default function Vision() {
  return (
    <div className="relative bg-[#f5ede3] text-black">
      <VisionAnimations />

      {/* ═══ HERO — Fullscreen with sakura ═══ */}
      <section className="relative h-[100dvh] flex flex-col overflow-hidden">
        {/* Background — sakura natural */}
        <div className="absolute -inset-4 z-0">
          <Image
            src="/bg-sakura.jpg"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Header */}
        <header className="relative z-20 flex items-center justify-between px-5 sm:px-10 py-5">
          <Link href="/">
            <GlassCircle className="w-9 h-9 sm:w-10 sm:h-10 p-0.5">
              <Image src="/logo-pulsa.png" alt="Pulsa" width={32} height={32} className="object-cover rounded-full" />
            </GlassCircle>
          </Link>
          <Link
            href="/"
            className="text-black/50 text-[11px] uppercase tracking-[0.15em] hover:text-black/80 transition-colors"
          >
            ← Retour
          </Link>
        </header>

        {/* Title — centered */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center">
          <span data-v-label className="text-[10px] uppercase tracking-[0.3em] text-black/40 mb-6">
            Ce qui nous anime
          </span>

          <h1 data-v-title className="text-[clamp(2.5rem,8vw,5.5rem)] font-semibold tracking-[-0.04em] leading-[1.05] max-w-4xl text-black">
            <span>Précision.</span>
            <br />
            <span className="text-black/50">Émotion.</span>
            <br />
            <span className="text-black/20">Performance.</span>
          </h1>

          {/* Scroll indicator */}
          <div data-v-scroll className="mt-16 flex flex-col items-center gap-2">
            <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-black/15 to-black/30 animate-pulse" />
            <span className="text-[9px] uppercase tracking-[0.25em] text-black/40">Découvrir</span>
          </div>
        </div>
      </section>

      {/* ═══ MANIFESTO — Word by word reveal ═══ */}
      <section className="relative py-16 sm:py-24 px-6 sm:px-10 overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <p data-v-manifesto className="text-[clamp(2rem,5.5vw,4rem)] font-semibold leading-[1.4] tracking-[-0.03em] text-black">
            {"On ne crée pas juste des sites. On construit des expériences qui donnent envie de rester, de cliquer, d\u2019acheter. Le genre de détail qui transforme un visiteur curieux en client convaincu.".split(" ").map((word, i) => (
              <span key={i} data-v-word className="inline-block mr-[0.3em] opacity-[0.08]">
                {word}
              </span>
            ))}
          </p>
        </div>
      </section>

      {/* ═══ VALUES — Three cards ═══ */}
      <section className="relative px-6 sm:px-10 pb-12 sm:pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
            {values.map((value) => (
              <div
                key={value.number}
                data-v-card
                className="group relative bg-white/50 backdrop-blur-sm border border-black/[0.06] rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:bg-white/80 hover:border-black/[0.1] hover:-translate-y-1 transition-all duration-500"
              >
                {/* Number */}
                <span className="text-[11px] font-medium tracking-[0.15em] text-black/20 uppercase">
                  {value.number}
                </span>

                {/* Title */}
                <h3 className="text-[18px] sm:text-[20px] font-semibold tracking-[-0.02em] mt-4 leading-[1.2]">
                  {value.title}
                </h3>

                {/* Line */}
                <div className="w-10 h-[2px] bg-black/10 group-hover:w-16 group-hover:bg-black/20 transition-all duration-500 mt-4" />

                {/* Text */}
                <p className="text-[13px] sm:text-[14px] text-black/50 leading-[1.7] mt-4">
                  {value.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ STATS — Title + 3 cards with image placeholders ═══ */}
      <section data-v-stats className="relative py-14 sm:py-20 px-6 sm:px-10 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-[clamp(1.8rem,4.5vw,3rem)] font-semibold tracking-[-0.03em] leading-[1.15]">
              <span className="text-black">20+ projets</span>{" "}
              <span className="text-black/40">livrés avec la même exigence.</span>
            </h2>
            <p className="text-black/40 text-[13px] sm:text-[14px] mt-3 max-w-md mx-auto">
              Chaque projet est traité comme s&apos;il était le nôtre. Voici ce qui nous définit.
            </p>
          </div>

          {/* 3 Cards */}
          <div className="grid md:grid-cols-3 gap-4 sm:gap-5">
            {/* Card 1 — Satisfaction */}
            <div data-v-stat className="bg-[#f8f5f0] rounded-2xl sm:rounded-3xl overflow-hidden">
              <div className="aspect-[4/3] relative bg-[#ede8e0] flex items-center justify-center">
                <div className="absolute top-4 left-4">
                  <span className="bg-white text-black text-[11px] font-medium px-3.5 py-1.5 rounded-full shadow-sm">
                    ✨ Satisfaction
                  </span>
                </div>
                {/* Placeholder for generated image */}
                <Image
                  src="/vision/satisfaction.png"
                  alt="100% clients satisfaits"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5 sm:p-6">
                <p className="text-black font-semibold text-[15px]">
                  100% de clients satisfaits.
                </p>
                <p className="text-black/40 text-[13px] mt-1 leading-relaxed">
                  Zéro compromis sur la qualité. On ne livre que ce qui nous rend fiers.
                </p>
              </div>
            </div>

            {/* Card 2 — Rapidité */}
            <div data-v-stat className="bg-[#f8f5f0] rounded-2xl sm:rounded-3xl overflow-hidden">
              <div className="aspect-[4/3] relative bg-[#ede8e0] flex items-center justify-center">
                <div className="absolute top-4 left-4">
                  <span className="bg-white text-black text-[11px] font-medium px-3.5 py-1.5 rounded-full shadow-sm">
                    ⚡ Rapidité
                  </span>
                </div>
                {/* Placeholder for generated image */}
                <Image
                  src="/vision/rapidite.png"
                  alt="3 semaines de délai moyen"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5 sm:p-6">
                <p className="text-black font-semibold text-[15px]">
                  3 semaines, du brief au live.
                </p>
                <p className="text-black/40 text-[13px] mt-1 leading-relaxed">
                  Rapide ne veut pas dire bâclé. On optimise chaque étape pour livrer vite et bien.
                </p>
              </div>
            </div>

            {/* Card 3 — Sur-mesure */}
            <div data-v-stat className="bg-[#f8f5f0] rounded-2xl sm:rounded-3xl overflow-hidden">
              <div className="aspect-[4/3] relative bg-[#ede8e0] flex items-center justify-center">
                <div className="absolute top-4 left-4">
                  <span className="bg-white text-black text-[11px] font-medium px-3.5 py-1.5 rounded-full shadow-sm">
                    ⭐ Sur-mesure
                  </span>
                </div>
                {/* Placeholder for generated image */}
                <Image
                  src="/vision/surmesure.png"
                  alt="Solutions sur-mesure"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5 sm:p-6">
                <p className="text-black font-semibold text-[15px]">
                  Chaque projet est unique.
                </p>
                <p className="text-black/40 text-[13px] mt-1 leading-relaxed">
                  Pas de templates. On construit from scratch, adapté à votre business et vos objectifs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA SECTION ═══ */}
      <section data-v-cta className="relative py-24 sm:py-32 px-6 text-center overflow-hidden">
        {/* Sakura background hint */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/bg-sakura.jpg"
            alt=""
            fill
            className="object-cover opacity-40"
          />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.3em] text-black/35 mb-6 block">
            Prêt ?
          </span>

          <h2 className="text-[clamp(2rem,6vw,3.5rem)] font-semibold tracking-[-0.03em] leading-[1.1] mb-5">
            Votre projet mérite mieux qu&apos;un template.
          </h2>

          <p className="text-black/50 text-[14px] sm:text-[15px] leading-relaxed max-w-md mx-auto mb-10">
            Parlez-nous de ce que vous avez en tête. Même si c&apos;est flou, on est là pour clarifier et construire ensemble.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://wa.me/32473236759"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black text-white text-[13px] font-medium px-8 py-4 rounded-full hover:bg-black/85 active:scale-[0.98] transition-all duration-200"
            >
              Discutons sur WhatsApp →
            </a>
            <a
              href="https://calendar.app.google/fMRz2onsyr5DkovW7"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/60 backdrop-blur-sm border border-black/[0.08] text-black/70 text-[13px] font-medium px-8 py-4 rounded-full hover:bg-white/80 transition-all duration-200 flex items-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></svg>
              Ou en appel visio
            </a>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="py-6 px-6 sm:px-10 flex items-center justify-between bg-[#f5ede3]">
        <span className="text-black/20 text-[10px] tracking-[0.1em]">
          © Pulsa Creatives
        </span>
        <Link href="/legal" className="text-black/20 text-[10px] tracking-wide hover:text-black/40 transition-colors">
          Legal
        </Link>
      </footer>
    </div>
  );
}
