import Image from "next/image";
import Link from "next/link";
import { GlassButton, GlassCircle } from "../components/glass-button";

const values = [
  {
    icon: "🎯",
    title: "Précision",
    text: "Chaque pixel compte. Nous créons des expériences digitales avec une attention obsessionnelle au détail.",
  },
  {
    icon: "✨",
    title: "Émotion",
    text: "Un site web doit faire ressentir quelque chose. Nous concevons des interfaces qui marquent les esprits.",
  },
  {
    icon: "🚀",
    title: "Performance",
    text: "Beauté et vitesse ne sont pas incompatibles. Nos sites sont optimisés pour convertir et performer.",
  },
];

export default function Vision() {
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
          <Link href="/">
            <GlassButton className="!text-[11px] sm:!text-[13px] !px-5 sm:!px-8 !py-2.5 sm:!py-3.5">
              Retour
            </GlassButton>
          </Link>
        </header>

        {/* Title */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
          <h1 className="text-[clamp(1.8rem,5vw,3.5rem)] font-semibold tracking-[-0.03em] text-white drop-shadow-lg">
            Notre vision
          </h1>
          <p className="mt-1.5 text-white/70 text-[12px] sm:text-sm tracking-wide">
            Ce en quoi nous croyons
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-12 sm:h-16 bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* Content */}
      <main className="flex-1 px-4 sm:px-6 pt-3 sm:pt-4 pb-3 sm:pb-4 max-w-4xl mx-auto w-full">
        {/* Intro */}
        <p className="text-center text-[12px] sm:text-[14px] text-black/50 leading-relaxed max-w-xl mx-auto mb-4 sm:mb-6">
          Chez Pulsa, nous croyons que le digital doit provoquer une émotion.
          Pas juste informer — mais inspirer, captiver et convertir.
          Chaque projet est une opportunité de créer quelque chose d&apos;exceptionnel.
        </p>

        {/* Values */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
          {values.map((value) => (
            <div
              key={value.title}
              className="group rounded-xl sm:rounded-2xl border border-black/[0.06] bg-white p-3 sm:p-5 text-center hover:shadow-lg hover:border-black/[0.1] transition-all duration-300 hover:-translate-y-1"
            >
              <span className="text-xl sm:text-2xl">{value.icon}</span>
              <h2 className="text-[12px] sm:text-[14px] font-semibold tracking-tight mt-1.5 sm:mt-2">
                {value.title}
              </h2>
              <p className="mt-1 sm:mt-1.5 text-[9px] sm:text-[11px] text-black/40 leading-relaxed">
                {value.text}
              </p>
              <div className="mt-2 sm:mt-3 h-[2px] w-6 rounded-full bg-black/10 group-hover:w-10 group-hover:bg-black/25 transition-all duration-300 mx-auto" />
            </div>
          ))}
        </div>

        {/* Bottom quote */}
        <div className="mt-4 sm:mt-6 text-center">
          <p className="text-[16px] sm:text-[20px] font-semibold tracking-tight text-black/80 italic">
            &ldquo;Build with emotion.&rdquo;
          </p>
          <p className="mt-1 text-[10px] sm:text-[11px] text-black/30 tracking-wide uppercase">
            Pulsa Creatives
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 py-4 sm:py-5 px-4 sm:px-6">
        <a
          href="https://wa.me/32473236759"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GlassButton className="!bg-black/[0.04] !text-[11px] sm:!text-[13px] !px-5 sm:!px-8 !py-2.5 sm:!py-3.5">
            Discutons de votre projet
          </GlassButton>
        </a>
        <p className="text-[10px] sm:text-[11px] text-black/30 tracking-wide">
          contact@pulsacreatives.com · © Pulsa
        </p>
      </footer>
    </div>
  );
}
