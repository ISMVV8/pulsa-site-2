"use client";

import Image from "next/image";
import { useEffect } from "react";

export type Project = {
  name: string;
  type: string;
  year: string;
  description: string;
  longDescription: string;
  image: string;
  color: string;
  tags: string[];
  url?: string;
};

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!project) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      {/* Backdrop — dark blur */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-xl animate-fade-in" />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-4xl animate-modal-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Main card — dark glass */}
        <div
          className="relative overflow-hidden rounded-3xl"
          style={{
            background: "rgba(20, 20, 25, 0.85)",
            backdropFilter: "blur(40px) saturate(150%)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: `0 40px 80px rgba(0,0,0,0.5), 0 0 100px ${project.color}15`,
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-30 w-10 h-10 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Layout: image left, content right on desktop */}
          <div className="flex flex-col lg:flex-row">
            {/* Image section */}
            <div className="relative lg:w-[55%] h-[220px] sm:h-[280px] lg:h-auto lg:min-h-[480px] overflow-hidden">
              <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-cover"
              />
              {/* Subtle gradient on edges */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[rgba(20,20,25,0.85)] hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(20,20,25,0.85)] to-transparent lg:hidden" />

              {/* Project number — large, positioned */}
              <div
                className="absolute top-6 left-6 text-[80px] sm:text-[100px] font-black leading-none opacity-20"
                style={{ color: project.color }}
              >
                {String(["City Smile", "Success Talent", "Terra Sky", "Sweety Délice", "8lab Ecosystem", "Podium"].indexOf(project.name) + 1).padStart(2, "0")}
              </div>
            </div>

            {/* Content section */}
            <div className="lg:w-[45%] p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
              {/* Category + year */}
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] rounded-full"
                  style={{
                    background: `${project.color}20`,
                    color: project.color,
                    border: `1px solid ${project.color}30`,
                  }}
                >
                  {project.type}
                </span>
                <span className="text-[12px] text-white/30">{project.year}</span>
              </div>

              {/* Title */}
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
                {project.name}
              </h2>

              {/* Accent line */}
              <div
                className="w-12 h-1 rounded-full mt-4 mb-6"
                style={{ background: project.color }}
              />

              {/* Description */}
              <p className="text-[14px] sm:text-[15px] text-white/50 leading-relaxed">
                {project.longDescription}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 text-[11px] font-medium rounded-full text-white/40 border border-white/10 bg-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 mt-8">
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 px-6 py-3 rounded-full text-[13px] font-medium text-black bg-white hover:bg-white/90 transition-all"
                  >
                    Voir le site
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="transition-transform group-hover:translate-x-0.5">
                      <path d="M7 17l9.2-9.2M17 17V7H7" />
                    </svg>
                  </a>
                )}
                <a
                  href="https://wa.me/32473236759"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-full text-[13px] font-medium text-white/70 border border-white/10 hover:border-white/25 hover:text-white transition-all"
                >
                  Un projet similaire ?
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
