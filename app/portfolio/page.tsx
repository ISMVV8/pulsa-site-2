"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { GlassButton, GlassCircle } from "../components/glass-button";
import { ProjectModal, type Project } from "../components/project-modal";

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

export default function Portfolio() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <div className="min-h-[100dvh] flex flex-col bg-white text-black">
      {/* Banner — Sakura */}
      <div className="relative h-[22vh] sm:h-[28vh] min-h-[150px] sm:min-h-[190px] w-full overflow-hidden">
        <Image
          src="/bg-sakura.jpg"
          alt="Sakura"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/10" />

        {/* Header */}
        <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-5 sm:px-8 py-4 sm:py-5">
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
            <GlassButton>Retour</GlassButton>
          </Link>
        </header>

        {/* Title */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
          <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-[-0.03em] text-white drop-shadow-lg">
            Portfolio
          </h1>
          <p className="mt-1.5 text-white/70 text-sm tracking-wide">
            Nos réalisations récentes
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* Projects Grid */}
      <main className="flex-1 px-4 sm:px-6 pt-1 sm:pt-2 pb-3 sm:pb-4 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4">
          {projects.map((project) => (
            <button
              key={project.name}
              onClick={() => setSelected(project)}
              className="group relative rounded-2xl overflow-hidden bg-white border border-black/[0.05] hover:shadow-xl transition-all duration-400 hover:-translate-y-1.5 cursor-pointer text-left"
            >
              {/* Image preview */}
              <div className="relative h-[80px] sm:h-[110px] w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Color overlay on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-400"
                  style={{ backgroundColor: project.color }}
                />
                {/* Year badge */}
                <span className="absolute top-2.5 right-2.5 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider bg-white/80 backdrop-blur-sm rounded-full text-black/60">
                  {project.year}
                </span>
              </div>

              {/* Info */}
              <div className="px-3 sm:px-4 py-2 sm:py-3">
                <span className="text-[8px] sm:text-[9px] font-semibold uppercase tracking-[0.12em] text-black/30">
                  {project.type}
                </span>
                <h2 className="text-[12px] sm:text-[14px] font-semibold tracking-tight mt-0.5">
                  {project.name}
                </h2>
                <p className="text-[10px] sm:text-[11px] text-black/35 mt-0.5 leading-snug hidden sm:block">
                  {project.description}
                </p>
              </div>

              {/* Bottom accent */}
              <div
                className="h-[3px] w-0 group-hover:w-full transition-all duration-500"
                style={{ backgroundColor: project.color }}
              />
            </button>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 py-3 sm:py-4 px-4 sm:px-6">
        <a
          href="https://wa.me/32473236759"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GlassButton className="!bg-black/[0.04] !text-[11px] sm:!text-[13px] !px-5 sm:!px-8 !py-2.5 sm:!py-3.5">
            Lancer votre projet
          </GlassButton>
        </a>
        <p className="text-[10px] sm:text-[11px] text-black/30 tracking-wide">
          contact@pulsacreatives.com · © Pulsa
        </p>
      </footer>

      {/* Modal */}
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
