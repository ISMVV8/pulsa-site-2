import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/app/lib/projects";
import type { Metadata } from "next";
import "../portfolio.css";

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
    title: `${project.name} — Étude de cas | Pulsa Creatives`,
    description: project.longDescription,
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

  return (
    <div className="bg-white text-black min-h-screen">
      {/* ═══ HEADER ═══ */}
      <header className="flex items-center justify-between px-6 md:px-12 py-5">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo-pulsa.jpg"
            alt="Pulsa"
            width={36}
            height={36}
            className="rounded-full"
          />
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-[13px] text-gray-500">
          <Link href="/" className="hover:text-black transition-colors">
            Services
          </Link>
          <Link
            href="/portfolio"
            className="text-black font-medium"
          >
            Réalisations
          </Link>
          <Link href="/" className="hover:text-black transition-colors">
            Blog
          </Link>
          <Link href="/" className="hover:text-black transition-colors">
            Contact
          </Link>
        </nav>
        <a
          href="https://wa.me/32473236759"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black text-white text-[12px] font-medium px-5 py-2.5 rounded-full hover:bg-black/80 transition-colors"
        >
          Réserver ↗
        </a>
      </header>

      {/* ═══ HERO ═══ */}
      <section className="px-6 md:px-12 lg:px-24 pt-12 pb-12 max-w-[1400px] mx-auto">
        <p className="text-[12px] text-gray-400 mb-10">
          <Link href="/" className="hover:text-black transition-colors">
            Accueil
          </Link>{" "}
          &gt;{" "}
          <Link href="/portfolio" className="hover:text-black transition-colors">
            Réalisations
          </Link>{" "}
          &gt;{" "}
          <span className="text-gray-600">{project.name}</span>
        </p>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400 mb-3">
              {project.type} — {project.year}
            </p>
            <h1
              className="font-sans font-black leading-[1.05] tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}
            >
              {project.name}
            </h1>
          </div>
          <div className="flex flex-wrap gap-2 md:pb-2">
            {project.services.map((s) => (
              <span
                key={s}
                className="px-3 py-1.5 text-[11px] uppercase tracking-[0.05em] rounded-full border border-gray-200 text-gray-500"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden">
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* ═══ BRIEF CLIENT ═══ */}
      <section className="px-6 md:px-12 lg:px-24 py-16 max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400 mb-4">
              Brief client
            </p>
            <h2
              className="font-sans font-bold leading-tight tracking-tight"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}
            >
              Le contexte
            </h2>
          </div>
          <div className="flex flex-col gap-6">
            <p className="text-[15px] text-gray-600 leading-relaxed">
              {project.brief}
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-gray-100">
              <div>
                <p className="text-[11px] uppercase tracking-[0.15em] text-gray-400 mb-1">
                  Secteur
                </p>
                <p className="text-[14px] font-medium text-black">
                  {project.secteur}
                </p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.15em] text-gray-400 mb-1">
                  Durée
                </p>
                <p className="text-[14px] font-medium text-black">
                  {project.duree}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ DÉFI ═══ */}
      <section className="px-6 md:px-12 lg:px-24 py-16 max-w-[1400px] mx-auto border-t border-gray-100">
        <div className="max-w-3xl">
          <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400 mb-4">
            Le défi
          </p>
          <h2
            className="font-sans font-bold leading-tight tracking-tight mb-6"
            style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}
          >
            Problématique
          </h2>
          <p className="text-[15px] text-gray-600 leading-relaxed">
            {project.defi}
          </p>
        </div>
      </section>

      {/* ═══ APPROCHE ═══ */}
      <section className="px-6 md:px-12 lg:px-24 py-16 max-w-[1400px] mx-auto border-t border-gray-100">
        <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400 mb-4">
          Notre approche
        </p>
        <h2
          className="font-sans font-bold leading-tight tracking-tight mb-12"
          style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}
        >
          Méthodologie
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {project.approche.map((step, i) => (
            <div key={i} className="flex flex-col gap-4">
              <span className="text-[48px] font-sans font-light text-gray-200 leading-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-[18px] font-semibold text-black">
                {step.title}
              </h3>
              <p className="text-[14px] text-gray-500 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ RÉSULTATS ═══ */}
      <section className="px-6 md:px-12 lg:px-24 py-16 max-w-[1400px] mx-auto border-t border-gray-100">
        <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400 mb-4">
          Les résultats
        </p>
        <h2
          className="font-sans font-bold leading-tight tracking-tight mb-12"
          style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}
        >
          Impact mesurable
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {project.resultats.map((stat, i) => (
            <div
              key={i}
              className="bg-[#f5f5f5] rounded-2xl p-6 md:p-8 text-center"
            >
              <p className="font-sans font-black text-[32px] md:text-[40px] text-black leading-none mb-2">
                {stat.value}
              </p>
              <p className="text-[12px] uppercase tracking-[0.1em] text-gray-500">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ PROJET SUIVANT ═══ */}
      {next && (
        <section className="px-6 md:px-12 lg:px-24 py-16 max-w-[1400px] mx-auto border-t border-gray-100">
          <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400 mb-4">
            Projet suivant
          </p>
          <Link
            href={`/portfolio/${next.slug}`}
            className="group flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <h2
              className="font-sans font-black leading-tight tracking-tight group-hover:opacity-60 transition-opacity"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              {next.name}
            </h2>
            <span className="text-[14px] text-gray-500 group-hover:text-black transition-colors flex items-center gap-2">
              Voir l&apos;étude de cas
              <span className="text-[18px]">→</span>
            </span>
          </Link>
        </section>
      )}

      {/* ═══ CTA DARK BANNER ═══ */}
      <section className="px-6 md:px-12 lg:px-24 py-12 max-w-[1400px] mx-auto">
        <div className="bg-[#1a1a1a] rounded-3xl px-8 md:px-16 py-14 md:py-20 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-white/50 mb-4">
              Votre projet
            </p>
            <h2
              className="font-sans leading-tight tracking-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              <span className="font-bold text-white">Votre site,</span>
              <br />
              <span className="font-light text-white/40">le prochain.</span>
            </h2>
          </div>
          <a
            href="https://wa.me/32473236759"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-black text-[13px] font-medium px-8 py-4 rounded-full hover:bg-white/90 transition-colors flex-shrink-0"
          >
            Démarrer un projet
            <span>→</span>
          </a>
        </div>
      </section>
    </div>
  );
}
