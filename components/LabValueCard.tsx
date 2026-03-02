"use client";

import { useState } from "react";
import type { LabValue, LabValueStatus } from "@/types/lab";
import { useLanguage } from "@/components/LanguageProvider";
import ReferenceRangeSlider from "@/components/ReferenceRangeSlider";

const STATUS_STYLES: Record<
  LabValueStatus,
  { badge: string; border: string; bg: string; icon: string; iconColor: string }
> = {
  normal: {
    badge: "bg-deep-mint text-white",
    border: "border-deep-mint/30",
    bg: "bg-deep-mint/5",
    icon: "sentiment_satisfied",
    iconColor: "text-deep-mint",
  },
  low: {
    badge: "bg-soft-purple text-white",
    border: "border-soft-purple/30",
    bg: "bg-soft-purple/5",
    icon: "trending_down",
    iconColor: "text-soft-purple",
  },
  high: {
    badge: "bg-magic-orange text-white",
    border: "border-magic-orange/30",
    bg: "bg-magic-orange/5",
    icon: "trending_up",
    iconColor: "text-magic-orange",
  },
  critical: {
    badge: "bg-red-500 text-white",
    border: "border-red-200",
    bg: "bg-red-50",
    icon: "warning",
    iconColor: "text-red-500",
  },
};

interface LabValueCardProps {
  value: LabValue;
}

export default function LabValueCard({ value }: LabValueCardProps) {
  const [copied, setCopied] = useState(false);
  const { t } = useLanguage();
  const styles = STATUS_STYLES[value.status];
  const statusLabel = t.status[value.status];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value.explanation);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API unavailable
    }
  };

  return (
    <div
      className="group relative flex flex-col gap-4 overflow-hidden rounded-[2.5rem] border-4 border-white bg-white/90 p-7 shadow-[0_12px_30px_rgba(0,0,0,0.06)] transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] active:scale-[0.98] dark:bg-zinc-900/60 dark:border-zinc-800"
      role="article"
      aria-label={`${value.name}: ${value.result}${value.unit ? " " + value.unit : ""}, ${statusLabel}`}
    >
      {/* Status Badge & Actions */}
      <div className="flex items-center justify-between">
        <div
          className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-[11px] font-black uppercase tracking-wider shadow-sm ${styles.badge}`}
        >
          <span className="material-symbols-outlined text-base leading-none">{styles.icon}</span>
          {statusLabel}
        </div>

        <button
          onClick={handleCopy}
          className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-zinc-400 shadow-[0_4px_0_0_#E2E8F0] transition-all hover:bg-pale-mint hover:text-deep-mint active:translate-y-0.5 active:shadow-none dark:bg-zinc-800 dark:shadow-[0_4px_0_0_#18181b] dark:text-zinc-500"
          aria-label="Copy explanation"
        >
          <span className="material-symbols-outlined text-xl">
            {copied ? "check" : "content_copy"}
          </span>
        </button>
      </div>

      {/* Main Info */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <span className="text-[11px] font-black uppercase tracking-widest text-text-main/30 dark:text-zinc-600">
            Test Name
          </span>
          <h3 className="text-xl font-bold leading-tight text-text-main dark:text-zinc-100">
            {value.name}
          </h3>
        </div>

        <div className="flex items-center gap-4 py-2">
          <div className="flex flex-col">
            <span className="text-[11px] font-black uppercase tracking-widest text-text-main/30 dark:text-zinc-600">
              Result
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-4xl font-black tracking-tighter text-text-main dark:text-zinc-50">
                {value.result}
              </span>
              {value.unit && (
                <span className="text-sm font-black text-text-main/40 dark:text-zinc-400">
                  {value.unit}
                </span>
              )}
            </div>
          </div>

          {value.referenceRange && (
            <div className="h-10 w-[2px] bg-pale-mint dark:bg-zinc-800 mx-2" />
          )}

          {value.referenceRange && (
            <div className="flex flex-col">
              <span className="text-[11px] font-black uppercase tracking-widest text-text-main/30 dark:text-zinc-600">
                Safe Range
              </span>
              <span className="text-sm font-bold text-text-main/60 dark:text-zinc-400">
                {value.referenceRange}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Reference Range Slider */}
      {value.referenceRange && (
        <ReferenceRangeSlider labValue={value} />
      )}

      {/* Explanation Box */}
      <div className={`mt-auto rounded-3xl p-5 ${styles.bg} dark:bg-zinc-800/40 relative overflow-hidden`}>
        <div className="absolute top-0 right-0 p-3 opacity-10">
          <span className="material-symbols-outlined text-4xl">auto_awesome</span>
        </div>
        <p className="relative z-10 text-sm font-bold leading-relaxed text-text-main/80 dark:text-zinc-300">
          {value.explanation}
        </p>
      </div>
    </div>
  );
}
