"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const PASS = "pulsacreatives2026";
const STORAGE_KEY = "pulsa_access";

export default function MaintenanceGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

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
      setUnlocked(true);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  if (loading) return null;
  if (unlocked) return <>{children}</>;

  return (
    <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center px-6">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image src="/bg-sakura.jpg" alt="" fill className="object-cover" priority />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-md">
        {/* Logo */}
        <Image
          src="/logo-pulsa.jpg"
          alt="Pulsa"
          width={56}
          height={56}
          className="rounded-full mb-8"
        />

        {/* Status badge */}
        <div className="flex items-center gap-2 mb-6">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-[11px] uppercase tracking-[0.2em] text-black/40 font-medium">
            En maintenance
          </span>
        </div>

        {/* Title */}
        <h1 className="text-[clamp(1.8rem,5vw,2.8rem)] font-semibold tracking-[-0.03em] leading-[1.1] mb-3">
          On prépare quelque chose<span className="text-black/15">.</span>
        </h1>
        <p className="text-black/35 text-[13px] leading-relaxed mb-10">
          Notre site est en cours de mise à jour. Entrez le mot de passe pour accéder à la preview.
        </p>

        {/* Password form */}
        <form onSubmit={handleSubmit} className="w-full max-w-xs flex flex-col gap-3">
          <div className="relative">
            <input
              type="password"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Mot de passe"
              className={`w-full bg-white/50 backdrop-blur-xl border ${
                error ? "border-red-300 animate-shake" : "border-black/10"
              } rounded-full px-6 py-3.5 text-[14px] text-black placeholder:text-black/25 outline-none focus:border-black/25 transition-colors`}
              autoFocus
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white text-[13px] font-medium py-3.5 rounded-full hover:bg-black/85 transition-colors"
          >
            Accéder au site
          </button>
          {error && (
            <p className="text-red-400 text-[12px] mt-1">Mot de passe incorrect</p>
          )}
        </form>

        {/* Contact */}
        <p className="mt-10 text-[11px] text-black/20 tracking-wide">
          Contact :{" "}
          <a href="mailto:contact@pulsacreatives.com" className="hover:text-black/40 transition-colors">
            contact@pulsacreatives.com
          </a>
        </p>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-6px); }
          75% { transform: translateX(6px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}
