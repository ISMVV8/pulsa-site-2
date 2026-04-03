"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const PASS = "pulsacreatives2026";
const STORAGE_KEY = "pulsa_access";

export default function MaintenanceGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === PASS) setUnlocked(true);
      setLoading(false);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === PASS) {
      localStorage.setItem(STORAGE_KEY, PASS);
      setFadeOut(true);
      setTimeout(() => setUnlocked(true), 600);
    } else {
      setError(true);
      setInput("");
      inputRef.current?.focus();
      setTimeout(() => setError(false), 1500);
    }
  };

  if (loading) return null;
  if (unlocked) return <>{children}</>;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Dark elegant background */}
      <div className="absolute inset-0 bg-[#0a0a0a]" />

      {/* Subtle grain texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Gradient accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-b from-white/[0.03] via-transparent to-transparent rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-md w-full">
        {/* Logo */}
        <div className="w-14 h-14 rounded-full overflow-hidden ring-1 ring-white/10 mb-12">
          <Image
            src="/logo-pulsa.jpg"
            alt="Pulsa"
            width={56}
            height={56}
            className="object-cover"
            priority
          />
        </div>

        {/* Status */}
        <div className="flex items-center gap-2.5 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-[10px] uppercase tracking-[0.25em] text-white/30 font-medium">
            Site en maintenance
          </span>
        </div>

        {/* Title */}
        <h1 className="text-white text-[clamp(2rem,6vw,3.2rem)] font-semibold tracking-[-0.04em] leading-[1.1] mb-4">
          Bientôt disponible
        </h1>
        <p className="text-white/30 text-[14px] leading-relaxed mb-12">
          Nous travaillons sur quelque chose de nouveau.
          <br />
          Entrez le mot de passe pour accéder à la preview.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-[280px] flex flex-col gap-3">
          <div className="relative">
            <label htmlFor="maintenance-password" className="sr-only">
              Mot de passe
            </label>
            <input
              ref={inputRef}
              id="maintenance-password"
              type="password"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Mot de passe"
              aria-label="Mot de passe pour accéder au site"
              aria-invalid={error}
              className={`w-full bg-white/[0.06] border ${
                error ? "border-red-500/50" : "border-white/[0.08]"
              } rounded-full px-5 py-3.5 text-[14px] text-white placeholder:text-white/20 outline-none focus:border-white/20 focus:bg-white/[0.08] transition-all duration-300`}
              autoFocus
            />
            {error && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(239,68,68,0.6)" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
              </div>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-white text-black text-[13px] font-medium py-3.5 rounded-full hover:bg-white/90 active:scale-[0.98] transition-all duration-200"
          >
            Accéder
          </button>
        </form>

        {/* Bottom info */}
        <div className="mt-16 flex flex-col items-center gap-4">
          <div className="w-8 h-[1px] bg-white/[0.06]" />
          <a
            href="mailto:contact@pulsacreatives.com"
            className="text-[11px] tracking-[0.1em] text-white/15 hover:text-white/30 transition-colors duration-300"
          >
            contact@pulsacreatives.com
          </a>
        </div>
      </div>
    </div>
  );
}
