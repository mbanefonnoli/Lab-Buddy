"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import type { Biomarker } from "@/lib/biomarkers";
import { CATEGORY_META } from "@/lib/biomarkers";

function Section({
  icon,
  title,
  color,
  children,
}: {
  icon: string;
  title: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5 overflow-hidden rounded-[2rem] bg-white p-6 shadow-sm">
      <div className="mb-3 flex items-center gap-2.5">
        <span
          className="material-symbols-outlined text-xl leading-none"
          style={{ color, fontVariationSettings: "'FILL' 1" }}
        >
          {icon}
        </span>
        <h2 className="text-base font-black text-text-main">{title}</h2>
      </div>
      {children}
    </div>
  );
}

export default function BiomarkerContent({
  b,
  relatedBiomarkers,
}: {
  b: Biomarker;
  relatedBiomarkers: Biomarker[];
}) {
  const { t } = useLanguage();
  const es = t.encyclopediaSlug;
  const meta = CATEGORY_META[b.category];

  return (
    <article className="mx-auto w-full max-w-2xl pb-10">

      {/* Breadcrumb */}
      <nav className="mb-5 flex items-center gap-2 text-xs font-bold text-text-main/40">
        <Link href="/encyclopedia" className="hover:text-text-main transition-colors">
          {es.breadcrumb}
        </Link>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span style={{ color: meta.color }}>{b.category}</span>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span className="text-text-main/60">{b.name}</span>
      </nav>

      {/* Hero */}
      <header className="mb-7 overflow-hidden rounded-[2.5rem] bg-white p-7 shadow-sm">
        <div className="flex items-start gap-5">
          <div
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-white text-2xl font-black shadow-sm"
            style={{ background: meta.color }}
          >
            {b.name.slice(0, 2).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <span
                className="flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider"
                style={{ background: `${meta.color}18`, color: meta.color }}
              >
                <span className="material-symbols-outlined text-sm leading-none" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {meta.icon}
                </span>
                {b.category}
              </span>
            </div>
            <h1 className="text-2xl font-black text-text-main">{b.name}</h1>
            {b.aliases.length > 0 && (
              <p className="mt-0.5 text-xs font-medium text-text-main/40">
                Also known as: {b.aliases.join(", ")}
              </p>
            )}
          </div>
        </div>

        {/* Normal Range highlight */}
        <div
          className="mt-5 grid gap-2 rounded-2xl p-4 sm:grid-cols-2"
          style={{ background: `${meta.color}0e` }}
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-lg" style={{ color: meta.color, fontVariationSettings: "'FILL' 1" }}>
              straighten
            </span>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-text-main/40">{es.unit}</p>
              <p className="text-sm font-bold text-text-main">{b.unit}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="material-symbols-outlined mt-0.5 text-lg" style={{ color: meta.color, fontVariationSettings: "'FILL' 1" }}>
              check_circle
            </span>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-text-main/40">{es.normalRange}</p>
              {b.normalRange.general && (
                <p className="text-sm font-bold text-text-main">{b.normalRange.general}</p>
              )}
              {b.normalRange.male && (
                <p className="text-sm font-bold text-text-main">
                  <span className="text-text-main/40 font-medium">{es.male}: </span>{b.normalRange.male}
                </p>
              )}
              {b.normalRange.female && (
                <p className="text-sm font-bold text-text-main">
                  <span className="text-text-main/40 font-medium">{es.female}: </span>{b.normalRange.female}
                </p>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* What is it? */}
      <Section icon="info" title={es.whatIsIt} color={meta.color}>
        <p className="text-sm font-medium leading-relaxed text-text-main/80">{b.description}</p>
      </Section>

      {/* Low meaning */}
      <Section icon="trending_down" title={es.lowMeaning} color="#6366F1">
        <p className="text-sm font-medium leading-relaxed text-text-main/80">{b.lowMeaning}</p>
      </Section>

      {/* High meaning */}
      <Section icon="trending_up" title={es.highMeaning} color="#F97316">
        <p className="text-sm font-medium leading-relaxed text-text-main/80">{b.highMeaning}</p>
      </Section>

      {/* How to improve */}
      <Section icon="tips_and_updates" title={es.howToImprove} color="#10B981">
        <ul className="space-y-2">
          {b.howToImprove.map((tip, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm font-medium text-text-main/80">
              <span
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-black text-white"
                style={{ background: "#10B981" }}
              >
                {i + 1}
              </span>
              {tip}
            </li>
          ))}
        </ul>
      </Section>

      {/* Disclaimer */}
      <div className="mb-6 rounded-2xl bg-[#F5F0FF] px-5 py-4">
        <p className="text-xs font-bold leading-relaxed text-[#6B4FA0]/70">
          <span className="font-black">{es.disclaimerLabel} </span>
          {es.disclaimer}
        </p>
      </div>

      {/* Related tests */}
      {relatedBiomarkers.length > 0 && (
        <div className="mb-6">
          <p className="mb-3 text-[10px] font-black uppercase tracking-widest text-text-main/30">
            {es.relatedTests}
          </p>
          <div className="flex flex-wrap gap-2">
            {relatedBiomarkers.map((rb) => {
              const rm = CATEGORY_META[rb.category];
              return (
                <Link
                  key={rb.slug}
                  href={`/encyclopedia/${rb.slug}`}
                  className="flex items-center gap-2 rounded-full border-2 border-white bg-white px-4 py-2 text-sm font-bold text-text-main shadow-sm transition-all hover:shadow-md"
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: rm.color }}
                  />
                  {rb.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Back + CTA */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/encyclopedia"
          className="flex items-center justify-center gap-2 rounded-2xl border-2 border-white bg-white px-5 py-3 text-sm font-black text-text-main/60 shadow-sm transition-all hover:shadow-md"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          {es.backToEncyclopedia}
        </Link>
        <Link
          href="/app"
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-magic-orange px-5 py-3 text-sm font-black text-white shadow-[0_4px_0_0_#D15C2A] transition-all hover:brightness-105 active:translate-y-0.5 active:shadow-none"
        >
          <span className="material-symbols-outlined text-base">biotech</span>
          {es.analyzeMyReport}
        </Link>
      </div>
    </article>
  );
}
