"use client";

import Image from "next/image";
import { useEffect } from "react";
import { GlassButton } from "./glass-button";

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
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md animate-fade-in" />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-2xl bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl animate-modal-in max-h-[90dvh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image Preview */}
        <div className="relative h-[180px] sm:h-[240px] w-full overflow-hidden">
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover"
          />
          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, ${project.color}dd 0%, transparent 60%)`,
            }}
          />
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors cursor-pointer"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          {/* Project name on image */}
          <div className="absolute bottom-3 sm:bottom-4 left-4 sm:left-6 right-4 sm:right-6">
            <span className="text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.15em] text-white/70">
              {project.type} · {project.year}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-0.5 tracking-tight">
              {project.name}
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          <p className="text-[13px] sm:text-[14px] text-black/60 leading-relaxed">
            {project.longDescription}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-[11px] font-medium rounded-full bg-black/[0.04] text-black/50"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3 mt-4 sm:mt-6">
            {project.url && (
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                <GlassButton className="!bg-black/[0.04]">
                  Voir le site
                </GlassButton>
              </a>
            )}
            <a
              href="https://wa.me/32473236759"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GlassButton className="!bg-black/[0.04]">
                Un projet similaire ?
              </GlassButton>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
