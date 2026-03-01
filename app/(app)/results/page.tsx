"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import ResultsPanel from "@/components/ResultsPanel";
import type { ExplainResponse } from "@/types/lab";

const STORAGE_KEY = "labbuddy_last_result";

interface SavedResult {
  result: ExplainResponse;
  analyzedAt: string;
}

export default function ResultsPage() {
  const { t, locale } = useLanguage();
  const r = t.resultsPage;
  const [saved, setSaved] = useState<SavedResult | null>(() => {
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) return JSON.parse(raw);
      } catch {
        return null;
      }
    }
    return null;
  });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReady(true);
  }, []);

  const handleClear = () => {
    localStorage.removeItem(STORAGE_KEY);
    setSaved(null);
  };

  // Avoid flash of empty state before localStorage is read
  if (!ready) return null;

  if (saved) {
    const date = new Date(saved.analyzedAt).toLocaleString(locale, {
      dateStyle: "medium",
      timeStyle: "short",
    });

    return (
      <div className="mx-auto w-full max-w-2xl">
        {/* Meta bar */}
        <div className="mb-6 flex items-center justify-between gap-4 rounded-[2rem] border-4 border-white bg-white/70 px-5 py-3 shadow-sm dark:bg-zinc-900/60 dark:border-zinc-800">
          <div className="flex items-center gap-2 text-sm font-bold text-text-main/50 dark:text-zinc-500">
            <span className="material-symbols-outlined text-base text-deep-mint">
              history
            </span>
            <span>
              {r.savedLabel}: {date}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="flex items-center gap-1.5 rounded-2xl bg-magic-orange px-4 py-2 text-xs font-black uppercase tracking-wider text-white shadow-[0_3px_0_0_#D15C2A] transition-all hover:brightness-105 active:translate-y-0.5 active:shadow-none"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              {r.analyzeNew}
            </Link>
            <button
              onClick={handleClear}
              className="flex h-8 w-8 items-center justify-center rounded-2xl bg-white text-zinc-400 shadow-sm transition-all hover:bg-red-50 hover:text-red-400 active:scale-95 dark:bg-zinc-800 dark:text-zinc-500"
              aria-label={r.clearResult}
              title={r.clearResult}
            >
              <span className="material-symbols-outlined text-base">delete</span>
            </button>
          </div>
        </div>

        <ResultsPanel
          status="success"
          results={saved.result}
          errorMessage={null}
          onRetry={() => { }}
        />
      </div>
    );
  }

  // Empty state
  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center gap-8 pt-8 text-center">
      {/* Icon */}
      <div className="relative">
        <div className="flex h-32 w-32 items-center justify-center rounded-blob bg-white shadow-inner">
          <span className="material-symbols-outlined text-[72px] text-deep-mint">
            analytics
          </span>
        </div>
        <div className="absolute -bottom-2 -right-2 flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-soft-purple text-white shadow-lg">
          <span className="material-symbols-outlined text-2xl">history</span>
        </div>
      </div>

      {/* Text */}
      <div className="space-y-2">
        <h1 className="text-3xl font-black tracking-tight text-text-main dark:text-zinc-100">
          {r.title}
        </h1>
        <p className="text-base font-medium text-text-main/60 dark:text-zinc-400">
          {r.subtitle}
        </p>
      </div>

      {/* CTA */}
      <Link
        href="/"
        className="flex h-16 w-full items-center justify-center gap-3 rounded-3xl bg-magic-orange text-xl font-bold text-white shadow-[0_8px_0_0_#D15C2A] transition-all hover:brightness-105 active:translate-y-1 active:shadow-none"
      >
        <span>{r.cta}</span>
        <span className="material-symbols-outlined">auto_fix_high</span>
      </Link>

      {/* Tip */}
      <div className="w-full rounded-[2rem] border-4 border-white bg-white/60 p-6 text-left backdrop-blur-sm dark:bg-zinc-900/40 dark:border-zinc-800">
        <div className="mb-2 flex items-center gap-2 text-soft-purple">
          <span className="material-symbols-outlined text-lg">tips_and_updates</span>
          <span className="text-xs font-black uppercase tracking-widest">{r.tipLabel}</span>
        </div>
        <p className="text-sm font-medium leading-relaxed text-text-main/70 dark:text-zinc-400">
          {r.tipText}
        </p>
      </div>
    </div>
  );
}
