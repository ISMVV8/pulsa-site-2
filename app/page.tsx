import Image from "next/image";
import Link from "next/link";
import { GlassButton, GlassCircle } from "./components/glass-button";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Pulsa Creatives",
  url: "https://pulsacreatives.com",
  logo: "https://pulsacreatives.com/logo-pulsa.jpg",
  description:
    "Agence digitale premium à Bruxelles. Sites web, landing pages, e-commerce, SEO et publicité en ligne.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bruxelles",
    addressCountry: "BE",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    url: "https://wa.me/32473236759",
    availableLanguage: ["French", "English"],
  },
  sameAs: [
    "https://instagram.com/pulsacreatives",
    "https://tiktok.com/@pulsacreatives",
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Web Design & Development",
  provider: {
    "@type": "Organization",
    name: "Pulsa Creatives",
  },
  areaServed: {
    "@type": "Country",
    name: "Belgium",
  },
  description:
    "Création de sites web premium, landing pages, e-commerce, SEO et publicité en ligne.",
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
  },
};

export default function Home() {
  return (
    <div className="relative min-h-[100dvh] flex flex-col text-black">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg-sakura.jpg"
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-5 sm:px-8 py-4 sm:py-6">
        {/* Logo */}
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

        {/* Social Icons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="https://instagram.com/pulsacreatives"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <GlassCircle className="w-9 h-9 sm:w-10 sm:h-10">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </GlassCircle>
          </a>
          <a
            href="https://tiktok.com/@pulsacreatives"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
          >
            <GlassCircle className="w-9 h-9 sm:w-10 sm:h-10">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="black">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.72a8.19 8.19 0 0 0 4.76 1.52V6.79a4.83 4.83 0 0 1-1-.1z" />
              </svg>
            </GlassCircle>
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6">
        <h1 className="text-[clamp(2rem,7vw,4.5rem)] font-semibold tracking-[-0.03em] text-center leading-[1.1]">
          Créer avec émotion.
        </h1>
        <p className="mt-3 sm:mt-4 text-black/40 text-[12px] sm:text-[13px] tracking-[0.04em]">
          Agence digitale premium — Bruxelles
        </p>

      </main>

      {/* Visio Button — Bottom Left */}
      <a
        href="https://calendar.app.google/fMRz2onsyr5DkovW7"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 left-5 sm:bottom-6 sm:left-6 z-50"
        aria-label="Réserver un appel visio"
      >
        <GlassCircle className="w-11 h-11 sm:w-12 sm:h-12">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="23 7 16 12 23 17 23 7" />
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
          </svg>
        </GlassCircle>
      </a>

      {/* Social proof */}
      <div className="relative z-10 flex items-center justify-center gap-6 sm:gap-10 mb-6 sm:mb-8 px-5">
        <div className="text-center">
          <p className="text-[clamp(1.2rem,3vw,1.8rem)] font-semibold tracking-[-0.02em] text-black">20+</p>
          <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.15em] text-black/30">Projets livrés</p>
        </div>
        <div className="w-[1px] h-8 bg-black/10" />
        <div className="text-center">
          <p className="text-[clamp(1.2rem,3vw,1.8rem)] font-semibold tracking-[-0.02em] text-black">100%</p>
          <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.15em] text-black/30">Clients satisfaits</p>
        </div>
        <div className="w-[1px] h-8 bg-black/10" />
        <div className="text-center">
          <p className="text-[clamp(1.2rem,3vw,1.8rem)] font-semibold tracking-[-0.02em] text-black">3 sem</p>
          <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.15em] text-black/30">Délai moyen</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 flex flex-col items-center gap-4 sm:gap-6 pb-6 sm:pb-10 px-5 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
          <a
            href="https://wa.me/32473236759"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-black text-white text-[12px] sm:text-[13px] font-medium px-5 py-3 sm:px-8 sm:py-3.5 rounded-full text-center hover:bg-black/85 transition-colors"
          >
            Créer votre projet
          </a>
          <Link href="/portfolio" className="w-full sm:w-auto">
            <GlassButton className="w-full sm:w-auto !px-5 !py-3 sm:!px-8 sm:!py-3.5 !text-[12px] sm:!text-[13px]">
              Voir notre portfolio
            </GlassButton>
          </Link>
          <Link href="/vision" className="w-full sm:w-auto">
            <GlassButton className="w-full sm:w-auto !px-5 !py-3 sm:!px-8 sm:!py-3.5 !text-[12px] sm:!text-[13px]">
              Notre vision
            </GlassButton>
          </Link>
        </div>
        <p className="text-[10px] sm:text-[11px] text-black/30 tracking-wide text-center">
          contact@pulsacreatives.com · © Pulsa ·{" "}
          <Link
            href="/legal"
            className="hover:text-black/50 transition-colors duration-300"
          >
            Legal
          </Link>
        </p>
      </footer>
    </div>
  );
}
