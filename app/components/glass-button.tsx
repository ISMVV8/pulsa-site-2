"use client";

import {
  LiquidGlassProvider,
  LiquidGlassFilters,
} from "@gracefullight/liquid-glass";
import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";

const glassConfig = {
  tintColor: "#ffffff",
  tintOpacity: 0.55,
  frostBlur: "28",
  shadow: "0px 4px 24px rgba(0,0,0,0.15)",
};

export function GlassButton({
  children,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) {
  return (
    <LiquidGlassProvider value={{ ...glassConfig, radius: "9999px" }}>
      <button
        className={`relative overflow-hidden px-8 py-3.5 text-[13px] font-medium text-black cursor-pointer transition-transform duration-300 hover:scale-[1.03] ${className}`}
        style={{ borderRadius: "9999px" }}
        {...props}
      >
        <LiquidGlassFilters
          innerShadowZIndex={0}
          backdropFilterZIndex={-1}
        />
        <span className="relative z-10">{children}</span>
      </button>
    </LiquidGlassProvider>
  );
}

export function GlassCircle({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <LiquidGlassProvider value={{ ...glassConfig, radius: "9999px" }}>
      <div
        className={`relative overflow-hidden rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-105 ${className}`}
        {...props}
      >
        <LiquidGlassFilters
          innerShadowZIndex={0}
          backdropFilterZIndex={-1}
        />
        <span className="relative z-10">{children}</span>
      </div>
    </LiquidGlassProvider>
  );
}

export function GlassCard({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <LiquidGlassProvider value={{ ...glassConfig, radius: "16px" }}>
      <div
        className={`relative overflow-hidden rounded-2xl transition-all duration-300 ${className}`}
        style={{ borderRadius: "16px" }}
        {...props}
      >
        <LiquidGlassFilters
          innerShadowZIndex={0}
          backdropFilterZIndex={-1}
        />
        <div className="relative z-10">{children}</div>
      </div>
    </LiquidGlassProvider>
  );
}
