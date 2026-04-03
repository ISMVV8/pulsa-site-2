import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import VisionAnimations from "./animations";

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

export default function Vision() {
  return (
    <div className="relative h-[100dvh] overflow-hidden bg-[#060606] text-white">
      <VisionAnimations />

      {/* Background — sakura with dark overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg-sakura.jpg"
          alt=""
          fill
          className="object-cover opacity-15"
          priority
        />
      </div>

      {/* Grain texture */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 sm:px-10 py-5">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-full overflow-hidden ring-1 ring-white/10 group-hover:ring-white/25 transition-all">
            <Image src="/logo-pulsa.png" alt="Pulsa" width={36} height={36} className="object-cover" />
          </div>
        </Link>
        <Link
          href="/"
          className="text-white/40 text-[11px] uppercase tracking-[0.15em] hover:text-white/70 transition-colors"
        >
          ← Retour
        </Link>
      </header>

      {/* Main content — centered */}
      <main className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        {/* Small label */}
        <span data-v-label className="text-[10px] uppercase tracking-[0.3em] text-white/20 mb-6">
          Notre philosophie
        </span>

        {/* Big statement */}
        <h1 data-v-title className="text-[clamp(2.5rem,8vw,5.5rem)] font-semibold tracking-[-0.04em] leading-[1.05] max-w-4xl">
          <span className="text-white">Précision.</span>
          <br />
          <span className="text-white/40">Émotion.</span>
          <br />
          <span className="text-white/15">Performance.</span>
        </h1>

        {/* Manifesto text */}
        <p data-v-text className="mt-8 text-white/35 text-[14px] sm:text-[15px] leading-[1.8] max-w-lg">
          Nous croyons que le digital doit provoquer une émotion.
          Pas juste informer — mais inspirer, captiver et convertir.
          Chaque pixel, chaque interaction, chaque détail compte.
        </p>

        {/* Three pillars */}
        <div data-v-pillars className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 mt-12">
          <div className="flex items-center gap-3">
            <div className="w-8 h-[1px] bg-white/10" />
            <span className="text-white/50 text-[12px] tracking-[0.1em]">Design obsessionnel</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-[1px] bg-white/10" />
            <span className="text-white/50 text-[12px] tracking-[0.1em]">Code performant</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-[1px] bg-white/10" />
            <span className="text-white/50 text-[12px] tracking-[0.1em]">Résultats mesurables</span>
          </div>
        </div>

        {/* CTA */}
        <div data-v-cta className="mt-14 flex flex-col sm:flex-row items-center gap-3">
          <a
            href="https://wa.me/32473236759"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-black text-[13px] font-medium px-8 py-4 rounded-full hover:bg-white/90 active:scale-[0.98] transition-all duration-200"
          >
            Démarrer un projet →
          </a>
          <Link
            href="/portfolio"
            className="bg-white/[0.06] border border-white/10 text-white/60 text-[13px] font-medium px-8 py-4 rounded-full hover:bg-white/10 hover:text-white/80 transition-all duration-200"
          >
            Voir nos réalisations
          </Link>
        </div>
      </main>

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between px-6 sm:px-10 py-5">
        <span className="text-white/15 text-[10px] tracking-[0.15em] uppercase">
          Créer avec émotion
        </span>
        <span className="text-white/15 text-[10px] tracking-wide">
          © Pulsa Creatives
        </span>
      </div>
    </div>
  );
}
