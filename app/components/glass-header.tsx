"use client";

import Image from "next/image";
import Link from "next/link";
import { GlassCircle } from "./glass-button";

export default function GlassHeader() {
  return (
    <header className="relative z-10 flex items-center justify-between px-5 sm:px-8 py-4 sm:py-6">
      {/* Logo */}
      <Link href="/">
        <GlassCircle className="w-9 h-9 sm:w-10 sm:h-10 p-0.5">
          <Image
            src="/logo-pulsa.jpg"
            alt="Pulsa"
            width={32}
            height={32}
            className="object-contain mix-blend-multiply"
          />
        </GlassCircle>
      </Link>

      {/* Social Icons */}
      <div className="flex items-center gap-2 sm:gap-3">
        <a
          href="https://instagram.com/pulsacreatives"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <GlassCircle className="w-9 h-9 sm:w-10 sm:h-10">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </GlassCircle>
        </a>
        <a
          href="https://tiktok.com/@pulsacreatives"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="TikTok"
        >
          <GlassCircle className="w-9 h-9 sm:w-10 sm:h-10">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="black">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.72a8.19 8.19 0 0 0 4.76 1.52V6.79a4.83 4.83 0 0 1-1-.1z" />
            </svg>
          </GlassCircle>
        </a>
      </div>
    </header>
  );
}
