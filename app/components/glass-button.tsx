"use client";

import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";

/**
 * Glassmorphism components — CSS-only, no SVG filters.
 * Visible, performant, accessible.
 *
 * Uses: backdrop-blur + semi-transparent bg + border + shadow
 */

export function GlassButton({
  children,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) {
  return (
    <button
      className={`
        relative px-8 py-3.5 text-[13px] font-medium text-black cursor-pointer
        bg-white/40 backdrop-blur-xl
        border border-white/50
        shadow-[0_2px_16px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.6)]
        rounded-full
        transition-all duration-300
        hover:bg-white/55 hover:shadow-[0_4px_24px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.7)]
        hover:scale-[1.02]
        active:scale-[0.98]
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

export function GlassCircle({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <div
      className={`
        rounded-full flex items-center justify-center
        bg-white/35 backdrop-blur-xl
        border border-white/40
        shadow-[0_2px_12px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.5)]
        transition-all duration-300
        hover:bg-white/50 hover:scale-105
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}

export function GlassCard({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <div
      className={`
        rounded-2xl
        bg-white/30 backdrop-blur-xl
        border border-white/40
        shadow-[0_4px_24px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.5)]
        transition-all duration-300
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}
