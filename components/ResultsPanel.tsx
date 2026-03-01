"use client";

import type { ExplainResponse, LabValue, LabValueStatus } from "@/types/lab";
import LabValueCard from "./LabValueCard";
import { useLanguage } from "@/components/LanguageProvider";

const STATUS_ORDER: Record<LabValueStatus, number> = {
  critical: 0,
  high: 1,
  low: 2,
  normal: 3,
};

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-[2.5rem] border-4 border-white bg-white/50 p-7 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <div className="h-6 w-24 rounded-2xl bg-deep-mint/20" />
          <div className="h-4 w-32 rounded-full bg-deep-mint/10" />
          <div className="h-10 w-20 rounded-xl bg-deep-mint/10" />
        </div>
        <div className="h-10 w-10 rounded-2xl bg-deep-mint/20" />
      </div>
      <div className="mt-6 h-24 w-full rounded-3xl bg-pale-mint/50" />
    </div>
  );
}

interface ResultsPanelProps {
  status: "loading" | "success" | "error";
  results: ExplainResponse | null;
  errorMessage: string | null;
  onRetry: () => void;
}

export default function ResultsPanel({
  status,
  results,
  errorMessage,
  onRetry,
}: ResultsPanelProps) {
  const { t } = useLanguage();
  const r = t.results;

  if (status === "loading") {
    return (
      <section aria-label="Loading results" aria-busy="true" className="w-full">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <div className="h-8 w-48 animate-pulse rounded-full bg-deep-mint/20" />
          <div className="h-4 w-32 animate-pulse rounded-full bg-deep-mint/10" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </section>
    );
  }

  if (status === "error") {
    return (
      <div
        className="flex flex-col items-center gap-8 rounded-[3rem] border-4 border-white bg-white/60 p-12 text-center shadow-[0_12px_40px_rgba(0,0,0,0.04)] backdrop-blur-md dark:bg-zinc-900/40 dark:border-zinc-800"
        role="alert"
      >
        <div className="relative">
          <div className="flex h-24 w-24 items-center justify-center rounded-blob bg-red-100 text-red-500 shadow-inner">
            <span className="material-symbols-outlined text-[50px]">error_med</span>
          </div>
          <div className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-magic-orange text-white shadow-lg">
            <span className="material-symbols-outlined text-xl">refresh</span>
          </div>
        </div>
        <div className="space-y-3">
          <h2 className="text-3xl font-black tracking-tight text-text-main dark:text-zinc-50">{r.oopsieDaisy}</h2>
          <p className="mx-auto max-w-xs text-base font-bold text-text-main/60 dark:text-zinc-400">
            {errorMessage ?? r.errorDefault}
          </p>
        </div>
        <button
          onClick={onRetry}
          className="h-16 w-full max-w-[240px] rounded-3xl bg-red-500 text-xl font-black text-white shadow-[0_8px_0_0_#991b1b] transition-all hover:bg-red-400 active:translate-y-1 active:shadow-none"
        >
          {r.tryAgain}
        </button>
      </div>
    );
  }

  if (!results) return null;

  const sorted = [...results.values].sort(
    (a: LabValue, b: LabValue) =>
      STATUS_ORDER[a.status] - STATUS_ORDER[b.status]
  );

  const flaggedCount = results.values.filter(
    (v: LabValue) => v.status !== "normal"
  ).length;

  return (
    <section aria-label="Lab results" className="w-full pb-10">
      {/* Summary Header */}
      <div className="mb-10 text-center">
        <div className="mb-3 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-deep-mint shadow-sm dark:bg-zinc-800">
            <span className="material-symbols-outlined text-sm">stars</span>
            {r.analysisComplete}
          </div>
        </div>
        <h2 className="text-3xl font-black tracking-tight text-text-main dark:text-zinc-100">
          {r.yourHealthSummary}
        </h2>
        {flaggedCount > 0 ? (
          <p className="mt-2 text-lg font-bold text-magic-orange">
            {r.flaggedItems(flaggedCount)}
          </p>
        ) : (
          <p className="mt-2 text-lg font-bold text-deep-mint">
            {r.everythingLooksWonderful}
          </p>
        )}
      </div>

      {/* Cards Grid */}
      <div className="grid gap-8 sm:grid-cols-2">
        {sorted.map((value, i) => (
          <LabValueCard key={i} value={value} />
        ))}
      </div>

      {/* Disclaimer Section */}
      <div className="mt-20 overflow-hidden rounded-[3rem] border-8 border-white bg-soft-purple/5 p-8 text-center backdrop-blur-sm dark:bg-zinc-900/40 dark:border-zinc-800/50">
        <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-blob bg-white text-soft-purple shadow-sm dark:bg-zinc-800">
          <span className="material-symbols-outlined text-3xl">shield_with_heart</span>
        </div>
        <h3 className="mb-3 text-lg font-black tracking-tight text-soft-purple">
          A Friendly Reminder
        </h3>
        <p className="mx-auto max-w-lg text-sm font-bold leading-relaxed text-text-main/60 dark:text-zinc-400">
          {results.disclaimer}
        </p>
      </div>
    </section>
  );
}
