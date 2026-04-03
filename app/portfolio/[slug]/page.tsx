import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/app/lib/projects";
import type { Metadata } from "next";
import GlassHeader from "@/app/components/glass-header";
import CaseStudyAnimations from "./animations";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.name} — Étude de cas`,
    description: project.longDescription,
    openGraph: {
      title: `${project.name} — Étude de cas | Pulsa Creatives`,
      description: project.longDescription,
      url: `https://pulsacreatives.com/portfolio/${slug}`,
      images: [
        {
          url: project.image,
          width: 1920,
          height: 1080,
          alt: project.name,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} — Pulsa Creatives`,
      description: project.longDescription,
      images: [project.image],
    },
    alternates: {
      canonical: `https://pulsacreatives.com/portfolio/${slug}`,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const next = projects.find((p) => p.slug === project.nextSlug);
  const projectIndex = projects.findIndex((p) => p.slug === slug);

  const caseStudySchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${project.name} — Étude de cas`,
    description: project.longDescription,
    url: `https://pulsacreatives.com/portfolio/${slug}`,
    image: `https://pulsacreatives.com${project.image}`,
    author: {
      "@type": "Organization",
      name: "Pulsa Creatives",
      url: "https://pulsacreatives.com",
    },
    datePublished: `${project.year}-01-01`,
    genre: project.type,
    keywords: project.services.join(", "),
  };

  return (
    <div className="bg-white text-black min-h-screen overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudySchema) }}
      />
      <CaseStudyAnimations />

      {/* ═══ HERO — Fullscreen with project image ═══ */}
      <section className="relative h-[85vh] sm:h-[90vh] overflow-hidden">
        {/* Header overlay */}
        <div className="absolute top-0 left-0 right-0 z-30">
          <header className="flex items-center justify-between px-5 sm:px-8 py-4 sm:py-5">
            <Link href="/">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white/12 backdrop-blur-2xl border border-white/20 rounded-full flex items-center justify-center">
                <Image src="/logo-pulsa.jpg" alt="Pulsa" width={28} height={28} className="object-contain rounded-full" />
              </div>
            </Link>
            <Link href="/portfolio" className="bg-white/12 backdrop-blur-2xl border border-white/20 text-white/80 px-4 py-2 text-[11px] uppercase tracking-[0.1em] rounded-full hover:bg-white/25 transition-colors">
              ← Portfolio
            </Link>
          </header>
        </div>

        {/* Background image */}
        <Image
          src={project.image}
          alt={project.name}
          fill
          className="object-cover object-top"
          priority
          sizes="100vw"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10 z-10" />

        {/* Hero content — bottom */}
        <div data-hero className="absolute bottom-10 sm:bottom-14 left-6 sm:left-12 right-6 sm:right-12 z-20">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-white/12 backdrop-blur-2xl border border-white/15 text-white/70 px-4 py-1.5 text-[11px] uppercase tracking-[0.1em] rounded-full">
              {project.type}
            </span>
            <span className="bg-white/12 backdrop-blur-2xl border border-white/15 text-white/70 px-4 py-1.5 text-[11px] uppercase tracking-[0.1em] rounded-full">
              {project.year}
            </span>
            <span className="bg-white/12 backdrop-blur-2xl border border-white/15 text-white/70 px-4 py-1.5 text-[11px] uppercase tracking-[0.1em] rounded-full">
              {project.duree}
            </span>
          </div>

          <h1 className="text-white text-[clamp(2.5rem,7vw,5rem)] font-semibold tracking-[-0.04em] leading-[1.05]">
            {project.name}
          </h1>
          <p className="text-white/50 text-[14px] sm:text-[16px] mt-3 max-w-2xl leading-relaxed">
            {project.longDescription}
          </p>

          {/* Services */}
          <div className="flex flex-wrap gap-1.5 mt-5">
            {project.services.map((s) => (
              <span key={s} className="bg-white/8 backdrop-blur-xl border border-white/10 text-white/60 px-3.5 py-1.5 text-[10px] uppercase tracking-[0.06em] rounded-full">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Number watermark */}
        <span className="absolute top-[15%] right-[5%] text-white/[0.04] text-[15rem] sm:text-[20rem] font-black leading-none z-10 select-none pointer-events-none">
          {String(projectIndex + 1).padStart(2, "0")}
        </span>
      </section>

      {/* ═══ BRIEF CLIENT ═══ */}
      <section data-section className="px-6 sm:px-12 lg:px-20 py-20 sm:py-28 max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-12 md:gap-20">
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-black/30 block mb-3">Brief client</span>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-semibold tracking-[-0.03em] leading-[1.1]">
              Le contexte<span className="text-black/15">.</span>
            </h2>
          </div>
          <div>
            <p className="text-[15px] text-black/50 leading-[1.8]">
              {project.brief}
            </p>
            <div className="grid grid-cols-2 gap-8 mt-8 pt-8 border-t border-black/5">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-black/45 block mb-1">Secteur</span>
                <span className="text-[14px] font-medium">{project.secteur}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-black/45 block mb-1">Durée</span>
                <span className="text-[14px] font-medium">{project.duree}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ DÉFI ═══ */}
      <section data-section className="px-6 sm:px-12 lg:px-20 py-20 sm:py-28 max-w-[1200px] mx-auto border-t border-black/5">
        <div className="max-w-3xl">
          <span className="text-[11px] uppercase tracking-[0.2em] text-black/30 block mb-3">Le défi</span>
          <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-semibold tracking-[-0.03em] leading-[1.1] mb-8">
            Problématique<span className="text-black/15">.</span>
          </h2>
          <p className="text-[15px] text-black/50 leading-[1.8]">
            {project.defi}
          </p>
        </div>
      </section>

      {/* ═══ APPROCHE ═══ */}
      <section data-section className="px-6 sm:px-12 lg:px-20 py-20 sm:py-28 max-w-[1200px] mx-auto border-t border-black/5">
        <span className="text-[11px] uppercase tracking-[0.2em] text-black/30 block mb-3">Notre approche</span>
        <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-semibold tracking-[-0.03em] leading-[1.1] mb-16">
          Méthodologie<span className="text-black/15">.</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-10 md:gap-14">
          {project.approche.map((step, i) => (
            <div key={i} data-step className="relative">
              <span className="text-[5rem] font-black text-black/[0.03] leading-none absolute -top-6 -left-2 select-none pointer-events-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="relative">
                <div className="w-8 h-[2px] bg-black/10 mb-6" />
                <h3 className="text-[17px] font-semibold tracking-[-0.01em] mb-3">
                  {step.title}
                </h3>
                <p className="text-[14px] text-black/40 leading-[1.7]">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ RÉSULTATS ═══ */}
      <section data-section className="px-6 sm:px-12 lg:px-20 py-20 sm:py-28 max-w-[1200px] mx-auto border-t border-black/5">
        <span className="text-[11px] uppercase tracking-[0.2em] text-black/30 block mb-3">Les résultats</span>
        <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-semibold tracking-[-0.03em] leading-[1.1] mb-16">
          Impact mesurable<span className="text-black/15">.</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {project.resultats.map((stat, i) => (
            <div
              key={i}
              data-stat
              className="relative bg-black/[0.02] border border-black/5 rounded-2xl p-6 sm:p-8 text-center overflow-hidden group hover:border-black/10 transition-colors duration-300"
            >
              <p className="text-[clamp(1.8rem,4vw,2.8rem)] font-semibold tracking-[-0.02em] text-black leading-none mb-2">
                {stat.value}
              </p>
              <p className="text-[11px] uppercase tracking-[0.1em] text-black/30">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ PROJET SUIVANT ═══ */}
      {next && (
        <section className="relative h-[50vh] sm:h-[60vh] overflow-hidden group">
          <Link href={`/portfolio/${next.slug}`} className="block w-full h-full">
            <Image
              src={next.image}
              alt={next.name}
              fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-500 z-10" />

            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
              <span className="text-white/40 text-[11px] uppercase tracking-[0.2em] mb-4">Projet suivant</span>
              <h2 className="text-white text-[clamp(2rem,5vw,4rem)] font-semibold tracking-[-0.03em] leading-[1.05]">
                {next.name}
              </h2>
              <span className="mt-4 bg-white/12 backdrop-blur-2xl border border-white/20 text-white/80 px-5 py-2 text-[12px] uppercase tracking-[0.1em] rounded-full group-hover:bg-white/25 transition-colors">
                Voir l&apos;étude de cas →
              </span>
            </div>
          </Link>
        </section>
      )}

      {/* ═══ CTA ═══ */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/bg-sakura.jpg" alt="" fill className="object-cover" />
        </div>
        <div className="relative z-10 flex flex-col items-center text-center px-6">
          <span className="text-[11px] uppercase tracking-[0.2em] text-black/30 mb-4">Votre projet</span>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-[-0.03em] leading-[1.1]">
            Votre site, le prochain<span className="text-black/15">.</span>
          </h2>
          <a
            href="https://wa.me/32473236759"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 bg-black text-white text-[13px] font-medium px-8 py-4 rounded-full hover:bg-black/85 transition-colors"
          >
            Démarrer un projet
            <span>→</span>
          </a>
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
