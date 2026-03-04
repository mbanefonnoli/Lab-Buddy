"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useLanguage } from "@/components/LanguageProvider";

/* ─── Mock result cards shown in the hero ─── */
const MOCK_VALUES = [
  { name: "Hemoglobin", result: "13.2", unit: "g/dL", badge: "bg-deep-mint", icon: "sentiment_satisfied", label: "Great!" },
  { name: "Cholesterol", result: "218", unit: "mg/dL", badge: "bg-magic-orange", icon: "trending_up", label: "High" },
  { name: "Glucose", result: "94", unit: "mg/dL", badge: "bg-deep-mint", icon: "sentiment_satisfied", label: "Great!" },
];

const FEATURE_META = [
  { icon: "auto_fix_high", color: "text-magic-orange", bg: "bg-magic-orange/10", span: "sm:col-span-2 sm:row-span-2", large: true },
  { icon: "shield_with_heart", color: "text-deep-mint", bg: "bg-deep-mint/10", span: "", large: false },
  { icon: "language", color: "text-buddy-blue", bg: "bg-buddy-blue/10", span: "", large: false },
  { icon: "analytics", color: "text-soft-purple", bg: "bg-soft-purple/10", span: "sm:col-span-2", large: false },
];

const STEP_META = [
  { icon: "upload_file", color: "text-magic-orange", bg: "bg-magic-orange/10" },
  { icon: "smart_toy", color: "text-soft-purple", bg: "bg-soft-purple/10" },
  { icon: "sentiment_satisfied", color: "text-deep-mint", bg: "bg-deep-mint/10" },
];

export default function LandingPage() {
  const { t } = useLanguage();
  const h = t.home;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <style>{`
        @keyframes twinkle {
          0%, 100% { transform: scale(1) rotate(0deg); }
          25%       { transform: scale(1.45) rotate(22deg); }
          55%       { transform: scale(0.75) rotate(-12deg); }
          78%       { transform: scale(1.25) rotate(10deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%       { transform: translateY(-8px) rotate(5deg); }
        }
        @keyframes draw-line-loop {
          0%   { stroke-dashoffset: 210; opacity: 0; }
          8%   { stroke-dashoffset: 210; opacity: 1; }
          55%  { stroke-dashoffset: 0;   opacity: 1; }
          82%  { stroke-dashoffset: 0;   opacity: 1; }
          99%  { stroke-dashoffset: 0;   opacity: 0; }
          100% { stroke-dashoffset: 210; opacity: 0; }
        }
        @keyframes word-pulse {
          0%, 100% { transform: scale(1)    skewX(0deg); }
          40%      { transform: scale(1.05) skewX(-1deg); }
          70%      { transform: scale(0.98) skewX(0.5deg); }
        }
      `}</style>

      {/* ════════════════ MARKETING NAV ════════════════ */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.06)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white shadow-sm">
              <span className="material-symbols-outlined text-deep-mint text-lg">
                medical_services
              </span>
            </div>
            <span className="text-lg font-black tracking-tight text-text-main">
              Lab Buddy
            </span>
          </Link>

          {/* Links */}
          <nav className="hidden items-center gap-7 md:flex">
            <a
              href="#how-it-works"
              className="text-sm font-bold text-text-main/60 transition-colors hover:text-text-main"
            >
              How it Works
            </a>
            <Link
              href="/settings/privacy"
              className="text-sm font-bold text-text-main/60 transition-colors hover:text-text-main"
            >
              Privacy
            </Link>
            <a
              href="#pricing"
              className="text-sm font-bold text-text-main/60 transition-colors hover:text-text-main"
            >
              Pricing
            </a>
          </nav>

          {/* CTA */}
          <Link
            href="/app"
            className="flex h-10 items-center gap-1.5 rounded-full bg-magic-orange px-5 text-sm font-black text-white shadow-[0_4px_0_0_#D15C2A] transition-all hover:brightness-105 active:translate-y-0.5 active:shadow-none"
          >
            Get Started Free
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </Link>
        </div>
      </header>

      {/* ════════════════ HERO ════════════════ */}
      <section className="relative mx-auto max-w-5xl px-6 pb-16 pt-12 sm:pt-20">
        {/* Soft glow blobs */}
        <div className="pointer-events-none absolute -top-10 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-deep-mint/8 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-magic-orange/6 blur-3xl" />

        <div className="relative grid items-center gap-14 lg:grid-cols-2">

          {/* ── Left: headline + CTAs ── */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {/* Badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border-2 border-white bg-white/70 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-deep-mint shadow-sm backdrop-blur-sm">
              <span className="material-symbols-outlined text-sm">auto_awesome</span>
              AI-Powered · Instant · Private
            </div>

            <h1 className="mb-4 text-5xl font-black leading-[1.1] tracking-tight text-text-main sm:text-6xl">
              {h.heroTitleStart}{" "}
              <span className="relative inline-block text-magic-orange" style={{ animation: "word-pulse 2.5s ease-in-out infinite" }}>
                {h.heroSimplified}
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 8"
                  preserveAspectRatio="none"
                  fill="none"
                >
                  <path
                    d="M0 5 Q25 1 50 5 Q75 9 100 5 Q125 1 150 5 Q175 9 200 5"
                    stroke="#F97316"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray="210"
                    strokeDashoffset="210"
                    style={{ animation: "draw-line-loop 3.5s ease-in-out infinite" }}
                  />
                </svg>
              </span>
            </h1>

            <p className="mb-8 max-w-md text-lg font-medium leading-relaxed text-text-main/60">
              Paste your lab report and get a{" "}
              <strong className="text-text-main">plain-English explanation</strong> of every
              value in seconds. No medical degree needed.
            </p>

            <Link
              href="/app"
              className="flex h-16 items-center gap-3 rounded-3xl bg-magic-orange px-8 text-xl font-black text-white shadow-[0_8px_0_0_#D15C2A] transition-all hover:brightness-105 active:translate-y-1 active:shadow-none"
            >
              <span className="material-symbols-outlined text-2xl">document_scanner</span>
              Scan Your First Report
            </Link>

            <p className="mt-4 flex items-center gap-1.5 text-sm font-bold text-text-main/40">
              <span className="material-symbols-outlined text-base text-deep-mint">check_circle</span>
              No account needed · Always free
            </p>
          </div>

          {/* ── Right: mascot + floating result cards ── */}
          <div className="relative flex items-center justify-center">
            <div className="pointer-events-none absolute inset-0 rounded-[40%] bg-white/50 blur-2xl" />

            <div className="relative z-10 flex flex-col items-center gap-4">
              {/* Robot blob card */}
              <div className="relative">
                <div className="flex h-48 w-48 items-center justify-center rounded-[2.5rem] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
                  <span
                    className="material-symbols-outlined text-soft-purple"
                    style={{ fontSize: 100, fontVariationSettings: "'FILL' 1" }}
                  >
                    smart_toy
                  </span>
                </div>
                {/* Stethoscope badge */}
                <div className="absolute -bottom-3 -right-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-[0_8px_20px_rgba(0,0,0,0.10)]" style={{ animation: "float 3.5s ease-in-out infinite" }}>
                  <span className="material-symbols-outlined text-deep-mint text-[30px]">
                    stethoscope
                  </span>
                </div>
                {/* Sparkle accent */}
                <div className="absolute -left-4 -top-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-magic-orange/10" style={{ animation: "twinkle 3s ease-in-out infinite" }}>
                  <span className="material-symbols-outlined text-magic-orange text-xl">auto_awesome</span>
                </div>
              </div>

              {/* Mock result cards */}
              <div className="flex w-full max-w-[280px] flex-col gap-2.5">
                {MOCK_VALUES.map((v) => (
                  <div
                    key={v.name}
                    className="flex items-center justify-between rounded-[1.5rem] border-4 border-white bg-white/90 px-4 py-3 shadow-[0_6px_16px_rgba(0,0,0,0.06)]"
                  >
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-text-main/30">
                        {v.name}
                      </p>
                      <p className="text-2xl font-black leading-tight text-text-main">
                        {v.result}{" "}
                        <span className="text-sm font-bold text-text-main/40">{v.unit}</span>
                      </p>
                    </div>
                    <div
                      className={`flex items-center gap-1 rounded-2xl px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-white ${v.badge}`}
                    >
                      <span className="material-symbols-outlined text-sm leading-none">{v.icon}</span>
                      {v.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ BENTO GRID ════════════════ */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-black tracking-tight text-text-main">
            Everything you need to understand your results
          </h2>
        </div>

        <div className="grid auto-rows-[180px] gap-4 sm:grid-cols-4">
          {FEATURE_META.map((f, i) => {
            const feat = h.features[i];
            return (
              <div
                key={feat.title}
                className={`flex flex-col justify-between overflow-hidden rounded-[2.5rem] border-4 border-white bg-white/80 p-7 shadow-[0_8px_20px_rgba(0,0,0,0.04)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-3 hover:scale-[1.03] hover:shadow-[0_28px_56px_rgba(0,0,0,0.13)] hover:z-10 ${f.span}`}
              >
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${f.bg}`}>
                  <span className={`material-symbols-outlined text-2xl ${f.color}`}>{f.icon}</span>
                </div>
                <div>
                  <h3 className={`font-black tracking-tight text-text-main ${f.large ? "mb-2 text-2xl" : "mb-1 text-lg"}`}>
                    {feat.title}
                  </h3>
                  <p className={`font-medium leading-relaxed text-text-main/60 ${f.large ? "text-base" : "text-sm"}`}>
                    {feat.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ════════════════ HOW IT WORKS ════════════════ */}
      <section id="how-it-works" className="mx-auto max-w-5xl px-6 pb-20">
        <div className="mb-12 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-deep-mint shadow-sm">
            <span className="material-symbols-outlined text-sm">route</span>
            {h.howLabel}
          </div>
          <h2 className="text-3xl font-black tracking-tight text-text-main">
            {h.howTitle}
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {STEP_META.map((step, i) => {
            const s = h.steps[i];
            return (
              <div
                key={s.label}
                className="relative flex flex-col items-center rounded-[2.5rem] border-4 border-white bg-white/80 p-8 text-center shadow-[0_8px_20px_rgba(0,0,0,0.04)] transition-all duration-200 hover:-translate-y-3 hover:scale-[1.04] hover:shadow-[0_28px_56px_rgba(0,0,0,0.13)] hover:z-10"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md">
                  <span className="text-sm font-black text-text-main">{i + 1}</span>
                </div>
                <div className={`mb-5 mt-2 flex h-16 w-16 items-center justify-center rounded-[1.5rem] ${step.bg}`}>
                  <span className={`material-symbols-outlined text-3xl ${step.color}`}>{step.icon}</span>
                </div>
                <h3 className="mb-2 text-xl font-black text-text-main">{s.label}</h3>
                <p className="text-sm font-medium leading-relaxed text-text-main/60">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ════════════════ PRICING ════════════════ */}
      <section id="pricing" className="mx-auto max-w-5xl px-6 pb-20">
        <div className="mb-10 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-magic-orange shadow-sm">
            <span className="material-symbols-outlined text-sm">sell</span>
            {h.pricingLabel}
          </div>
          <h2 className="text-3xl font-black tracking-tight text-text-main">
            {h.pricingTitle}
          </h2>
        </div>

        <div className="mx-auto max-w-sm">
          <div className="relative overflow-hidden rounded-[2.5rem] border-4 border-white bg-white/90 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
            <div className="group absolute right-6 top-6 cursor-default">
              <div className="rounded-full bg-deep-mint px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white">
                {h.alwaysFree}
              </div>
              <div className="pointer-events-none absolute right-0 top-full mt-2 w-44 rounded-2xl bg-text-main px-3 py-2 text-center text-[11px] font-semibold leading-snug text-white opacity-0 shadow-lg transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 translate-y-1">
                {h.freeForNow}
                <div className="absolute -top-1.5 right-4 h-3 w-3 rotate-45 bg-text-main" />
              </div>
            </div>

            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-magic-orange/10">
              <span className="material-symbols-outlined text-3xl text-magic-orange">
                rocket_launch
              </span>
            </div>

            <p className="mb-1 text-4xl font-black text-text-main">{h.price}</p>
            <p className="mb-6 text-sm font-bold text-text-main/40">{h.priceNote}</p>

            <ul className="mb-8 space-y-3">
              {h.priceFeatures.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm font-bold text-text-main/70">
                  <span className="material-symbols-outlined text-base text-deep-mint">check_circle</span>
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href="/app"
              className="flex h-14 w-full items-center justify-center gap-2 rounded-3xl bg-magic-orange text-lg font-black text-white shadow-[0_6px_0_0_#D15C2A] transition-all hover:brightness-105 active:translate-y-1 active:shadow-none"
            >
              {h.priceCta}
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════ FINAL CTA BAND ════════════════ */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="relative overflow-hidden rounded-[3rem] bg-text-main p-12 text-center shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
          <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/5" />
          <div className="pointer-events-none absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-magic-orange/20" />

          <div className="relative">
            <span className="material-symbols-outlined mb-4 block text-[48px] text-magic-orange"
              style={{ fontVariationSettings: "'FILL' 1" }}>
              favorite
            </span>
            <h2 className="mb-3 text-3xl font-black text-white">
              {h.ctaTitle}
            </h2>
            <p className="mx-auto mb-8 max-w-md text-base font-medium text-white/60">
              {h.ctaSubtitle}
            </p>
            <Link
              href="/app"
              className="inline-flex h-16 items-center gap-3 rounded-3xl bg-magic-orange px-10 text-xl font-black text-white shadow-[0_8px_0_0_rgba(0,0,0,0.3)] transition-all hover:brightness-110 active:translate-y-1 active:shadow-none"
            >
              <span className="material-symbols-outlined text-2xl">document_scanner</span>
              {h.ctaButton}
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════ FOOTER ════════════════ */}
      <footer className="border-t border-black/5 px-6 pb-10 pt-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white shadow-sm">
              <span className="material-symbols-outlined text-deep-mint text-base">
                medical_services
              </span>
            </div>
            <span className="text-sm font-black text-text-main">Lab Buddy</span>
          </div>

          <nav className="flex items-center gap-5">
            <Link
              href="/settings/privacy"
              className="text-xs font-bold text-text-main/40 transition-colors hover:text-text-main"
            >
              Privacy Policy
            </Link>
            <Link
              href="/settings"
              className="text-xs font-bold text-text-main/40 transition-colors hover:text-text-main"
            >
              Settings
            </Link>
            <Link
              href="/app"
              className="text-xs font-bold text-text-main/40 transition-colors hover:text-text-main"
            >
              Open App
            </Link>
          </nav>

          <p className="text-xs font-medium text-text-main/30">
            Not medical advice · © 2026 Lab Buddy
          </p>
        </div>
      </footer>
    </div>
  );
}
