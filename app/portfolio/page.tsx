import Image from "next/image";
import Link from "next/link";
import { projects } from "@/app/lib/projects";
import "./portfolio.css";

export default function Portfolio() {
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
          <Link href="/" className="hover:text-black transition-colors">Services</Link>
          <Link href="/portfolio" className="text-black font-medium">Réalisations</Link>
          <Link href="/" className="hover:text-black transition-colors">Blog</Link>
          <Link href="/" className="hover:text-black transition-colors">Contact</Link>
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
      <section className="px-6 md:px-12 lg:px-24 pt-12 pb-16 md:pt-20 md:pb-24 max-w-[1400px] mx-auto">
        {/* Breadcrumb */}
        <p className="text-[12px] text-gray-400 mb-8">
          🏠 Accueil &gt; Réalisations
        </p>

        {/* Label */}
        <p className="text-[11px] uppercase tracking-[0.25em] text-gray-400 mb-4">
          ✦ PORTFOLIO PULSA CREATIVES
        </p>

        {/* Title */}
        <h1
          className="font-serif leading-[1.05] tracking-tight"
          style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
        >
          <span className="font-black text-black">Nos dernières</span>
          <br />
          <span className="font-light text-[#d1d1d1]">réalisations.</span>
        </h1>

        {/* Sub section: description + counter */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mt-10 gap-8">
          <p className="text-[14px] text-gray-500 max-w-md leading-relaxed">
            Découvrez comment nous aidons nos clients à capturer l&apos;attention
            et dominer leur marché.
          </p>
          <div className="flex items-end gap-3">
            <span
              className="font-serif font-light leading-none"
              style={{
                fontSize: "clamp(3rem, 6vw, 5rem)",
                color: "transparent",
                WebkitTextStroke: "1.5px #d1d1d1",
              }}
            >
              20+
            </span>
            <span className="text-[11px] uppercase tracking-[0.15em] text-gray-400 pb-2">
              Projets<br />livrés
            </span>
          </div>
        </div>
      </section>

      {/* ═══ PROJECTS ═══ */}
      <section className="px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto">
        {projects.map((project, i) => {
          const num = String(i + 1).padStart(2, "0");
          const isOdd = i % 2 === 0;

          return (
            <div key={project.slug}>
              <div
                className={`flex flex-col ${
                  isOdd ? "md:flex-row" : "md:flex-row-reverse"
                } gap-8 md:gap-12 p-6 md:p-10 my-8 md:my-12 bg-[#f5f5f5] rounded-3xl`}
              >
                {/* Image side */}
                <div className="md:w-[55%] flex-shrink-0">
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="relative w-full aspect-[16/10] rounded-xl overflow-hidden shadow-lg block group"
                  >
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      loading={i < 2 ? "eager" : "lazy"}
                    />
                  </Link>
                </div>

                {/* Text side */}
                <div className="md:w-[45%] flex flex-col justify-center">
                  {/* Number + Year */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[13px] text-gray-400 font-medium">{num}</span>
                    <span className="text-[13px] text-gray-400">{project.year}</span>
                  </div>

                  {/* Category */}
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[#888] mb-3">
                    {project.type}
                  </p>

                  {/* Project name */}
                  <Link href={`/portfolio/${project.slug}`}>
                    <h2 className="font-serif font-black text-[36px] md:text-[48px] text-black leading-[1.05] tracking-tight hover:opacity-70 transition-opacity">
                      {project.name}
                    </h2>
                  </Link>

                  {/* Description */}
                  <p className="text-[14px] text-gray-500 leading-relaxed mt-3">
                    {project.longDescription}
                  </p>

                  {/* Services */}
                  <div className="flex flex-wrap gap-2 mt-5">
                    {project.services.map((service) => (
                      <span
                        key={service}
                        className="px-3 py-1.5 text-[11px] uppercase tracking-[0.05em] rounded-full border border-[#ddd] text-gray-500"
                      >
                        {service}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="mt-6">
                    <Link
                      href={`/portfolio/${project.slug}`}
                      className="inline-flex items-center gap-3 bg-[#1a1a1a] text-white text-[14px] font-medium px-8 py-4 rounded-full hover:bg-black transition-colors shadow-sm"
                    >
                      Voir l&apos;étude de cas
                      <span className="text-[16px]">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* ═══ END CTA — DASHED CARD ═══ */}
      <section className="px-6 md:px-12 lg:px-24 py-16 md:py-24 max-w-[1400px] mx-auto">
        <div className="border border-dashed border-gray-200 rounded-3xl py-16 md:py-20 px-6 text-center">
          <p className="text-[18px] text-gray-300 mb-4">✦</p>
          <p className="text-[11px] uppercase tracking-[0.25em] text-gray-400 mb-4">
            Et bien d&apos;autres
          </p>
          <h2
            className="font-serif leading-tight tracking-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            <span className="font-bold text-black">Chaque client a</span>
            <br />
            <span className="font-light text-[#d1d1d1]">une histoire.</span>
          </h2>
          <p className="text-[14px] text-gray-500 mt-4 max-w-md mx-auto leading-relaxed">
            Restaurants, e-commerces, startups... Discutons de votre projet.
          </p>
          <a
            href="https://wa.me/32473236759"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-black text-black text-[13px] font-medium px-6 py-3 rounded-full mt-8 hover:bg-black hover:text-white transition-colors"
          >
            Nous contacter
            <span>→</span>
          </a>
        </div>
      </section>

      {/* ═══ FINAL CTA BANNER ═══ */}
      <section className="px-6 md:px-12 lg:px-24 pb-12 max-w-[1400px] mx-auto">
        <div className="bg-[#1a1a1a] rounded-3xl px-8 md:px-16 py-14 md:py-20 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-white/50 mb-4">
              Votre projet
            </p>
            <h2
              className="font-serif leading-tight tracking-tight"
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
