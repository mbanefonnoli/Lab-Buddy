"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import EncyclopediaSearch from "./EncyclopediaSearch";
import {
  BIOMARKERS,
  CATEGORY_META,
  ALL_CATEGORIES,
  getBiomarkersByCategory,
} from "@/lib/biomarkers";

const byCategory = getBiomarkersByCategory();

export default function EncyclopediaContent() {
  const { t } = useLanguage();
  const ep = t.encyclopediaPage;
  const es = t.encyclopediaSearch;

  return (
    <div className="mx-auto w-full max-w-3xl pb-8">
      {/* Hero */}
      <div className="mb-8 text-center">
        <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-[2rem] bg-white shadow-inner">
          <span className="material-symbols-outlined text-[52px] text-deep-mint">
            menu_book
          </span>
        </div>
        <h1 className="text-3xl font-black tracking-tight text-text-main">
          {ep.title}
        </h1>
        <p className="mt-2 text-base font-medium text-text-main/60">
          {ep.biomarkersCount(BIOMARKERS.length)}
        </p>
      </div>

      {/* Search */}
      <EncyclopediaSearch biomarkers={BIOMARKERS} searchStrings={es} />

      {/* Category quick nav */}
      <div className="mb-6 flex flex-wrap gap-2">
        {ALL_CATEGORIES.map((cat) => {
          const meta = CATEGORY_META[cat];
          return (
            <a
              key={cat}
              href={`#${cat.replace(/\s+/g, "-").replace(/&/g, "and")}`}
              className="flex items-center gap-1.5 rounded-full border border-white bg-white px-3 py-1.5 text-xs font-bold text-text-main/60 shadow-sm transition-all hover:shadow-md"
            >
              <span
                className="material-symbols-outlined text-sm leading-none"
                style={{ color: meta.color }}
              >
                {meta.icon}
              </span>
              {cat}
            </a>
          );
        })}
      </div>

      {/* Categories */}
      {ALL_CATEGORIES.map((cat) => {
        const markers = byCategory[cat];
        if (!markers?.length) return null;
        const meta = CATEGORY_META[cat];
        const anchor = cat.replace(/\s+/g, "-").replace(/&/g, "and");

        return (
          <section key={cat} id={anchor} className="mb-10 scroll-mt-20">
            {/* Category header */}
            <div className="mb-4 flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-2xl"
                style={{ background: `${meta.color}18` }}
              >
                <span
                  className="material-symbols-outlined text-xl"
                  style={{ color: meta.color, fontVariationSettings: "'FILL' 1" }}
                >
                  {meta.icon}
                </span>
              </div>
              <div>
                <h2 className="text-lg font-black text-text-main">{cat}</h2>
                <p className="text-xs font-medium text-text-main/40">{meta.description}</p>
              </div>
              <span className="ml-auto rounded-full bg-white px-3 py-1 text-xs font-black text-text-main/40 shadow-sm">
                {ep.testsCount(markers.length)}
              </span>
            </div>

            {/* Biomarker cards */}
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {markers.map((b) => (
                <Link
                  key={b.slug}
                  href={`/encyclopedia/${b.slug}`}
                  className="flex items-center gap-3 rounded-2xl border-2 border-white bg-white/80 px-4 py-3.5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white text-xs font-black"
                    style={{ background: meta.color }}
                  >
                    {b.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-text-main">{b.name}</p>
                    <p className="truncate text-[10px] font-medium text-text-main/40">
                      {b.aliases.slice(0, 2).join(", ")}
                    </p>
                  </div>
                  <span
                    className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-black"
                    style={{ background: `${meta.color}15`, color: meta.color }}
                  >
                    {b.unit}
                  </span>
                  <span className="material-symbols-outlined shrink-0 text-base text-text-main/20">
                    chevron_right
                  </span>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <div className="mt-8 overflow-hidden rounded-[2.5rem] bg-white p-8 text-center shadow-sm">
        <div className="mb-3 flex justify-center">
          <span className="material-symbols-outlined text-4xl text-magic-orange" style={{ fontVariationSettings: "'FILL' 1" }}>
            biotech
          </span>
        </div>
        <h3 className="text-xl font-black text-text-main">{ep.haveResults}</h3>
        <p className="mt-1 text-sm font-medium text-text-main/50">
          {ep.pasteOrUpload}
        </p>
        <Link
          href="/app"
          className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-magic-orange px-6 py-3 text-sm font-black text-white shadow-[0_4px_0_0_#D15C2A] transition-all hover:brightness-105 active:translate-y-0.5 active:shadow-none"
        >
          <span className="material-symbols-outlined text-base">auto_fix_high</span>
          {ep.analyzeMyReport}
        </Link>
      </div>
    </div>
  );
}
