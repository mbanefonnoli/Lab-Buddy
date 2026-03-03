"use client";

import { useState } from "react";
import Link from "next/link";
import { type StoredResult } from "@/lib/storage";
import { useHistory } from "@/lib/useHistory";
import ExportPDFButton from "@/components/ExportPDFButton";
import DoctorSummaryButton from "@/components/DoctorSummaryButton";
import { useLanguage } from "@/components/LanguageProvider";
import type { Translations } from "@/lib/i18n";

function statusBadge(entry: StoredResult, sb: Translations["dashboard"]["statusBadge"]) {
  const total = entry.result.values.length;
  if (total === 0) return { label: sb.noData, color: "bg-zinc-100 text-zinc-400" };
  const normal = entry.result.values.filter((v) => v.status === "normal").length;
  const pct = (normal / total) * 100;
  if (pct === 100) return { label: sb.everythingGreat, color: "bg-emerald-100 text-emerald-600" };
  if (pct >= 75) return { label: sb.mostlyGood, color: "bg-sky-100 text-sky-600" };
  if (pct >= 50) return { label: sb.headsUp, color: "bg-amber-100 text-amber-600" };
  return { label: sb.needsAttention, color: "bg-rose-100 text-rose-600" };
}

const STATUS_STYLES: Record<string, string> = {
  normal: "bg-emerald-100 text-emerald-600",
  high: "bg-amber-100 text-amber-600",
  low: "bg-sky-100 text-sky-600",
  critical: "bg-rose-100 text-rose-600",
};

export default function ReportsPage() {
  const { history, remove, isLoading } = useHistory();
  const { t } = useLanguage();
  const r = t.reportsPage;
  const [expanded, setExpanded] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    remove(id);
    if (expanded === id) setExpanded(null);
  };

  if (isLoading) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-text-main">{r.myReports}</h1>
          <p className="text-sm font-medium text-text-main/40">
            {history.length === 0 ? r.noAnalysesYet : r.savedReports(history.length)}
          </p>
        </div>
        <Link
          href="/app"
          className="flex items-center gap-2 rounded-2xl bg-magic-orange px-5 py-2.5 text-sm font-black text-white shadow-[0_4px_0_0_#D15C2A] transition-all hover:brightness-105 active:translate-y-0.5 active:shadow-none"
        >
          <span className="material-symbols-outlined text-base">add</span>
          {r.newAnalysis}
        </Link>
      </div>

      {/* Empty state */}
      {history.length === 0 && (
        <div className="flex flex-col items-center gap-4 rounded-3xl bg-white py-20 shadow-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-pale-mint">
            <span
              className="material-symbols-outlined text-3xl text-deep-mint"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              folder_open
            </span>
          </div>
          <p className="text-sm font-bold text-text-main/40">{r.noReportsYet}</p>
          <Link
            href="/app"
            className="rounded-2xl bg-magic-orange px-6 py-2.5 text-sm font-black text-white shadow-[0_4px_0_0_#D15C2A] transition-all hover:brightness-105"
          >
            {r.runFirstAnalysis}
          </Link>
        </div>
      )}

      {/* Report list */}
      <div className="space-y-3">
        {history.map((entry) => {
          const b = statusBadge(entry, t.dashboard.statusBadge);
          const total = entry.result.values.length;
          const normal = entry.result.values.filter((v) => v.status === "normal").length;
          const isOpen = expanded === entry.id;
          const score = total === 0 ? 100 : Math.round((normal / total) * 100);

          return (
            <div
              key={entry.id}
              className="overflow-hidden rounded-3xl bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              {/* Row header */}
              <button
                onClick={() => setExpanded(isOpen ? null : entry.id)}
                className="flex w-full items-center gap-4 px-6 py-5 text-left"
              >
                {/* Icon */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-pale-mint">
                  <span
                    className="material-symbols-outlined text-xl text-deep-mint"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    biotech
                  </span>
                </div>

                {/* Meta */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-text-main">
                    {new Date(entry.analyzedAt).toLocaleDateString(undefined, {
                      weekday: "short",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-xs font-medium text-text-main/40">
                    {r.valuesText(total, normal, score)}
                  </p>
                </div>

                {/* Badge */}
                <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-black ${b.color}`}>
                  {b.label}
                </span>

                {/* Chevron */}
                <span
                  className={`material-symbols-outlined shrink-0 text-xl text-text-main/30 transition-transform ${isOpen ? "rotate-180" : ""}`}
                >
                  expand_more
                </span>
              </button>

              {/* Expanded detail */}
              {isOpen && (
                <div className="border-t border-pale-mint px-6 pb-5 pt-4">
                  {/* Score bar */}
                  <div className="mb-4 flex items-center gap-3">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-pale-mint">
                      <div
                        className="h-full rounded-full bg-deep-mint"
                        style={{ width: `${score}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-text-main/60">{score}%</span>
                  </div>

                  {/* Values table */}
                  <div className="space-y-2">
                    {entry.result.values.map((v, i) => (
                      <div
                        key={i}
                        className="flex items-start justify-between gap-3 rounded-2xl bg-[#F5F7FA] px-4 py-3"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-text-main">{v.name}</p>
                          <p className="text-xs text-text-main/50 leading-snug mt-0.5 line-clamp-2">
                            {v.explanation}
                          </p>
                        </div>
                        <div className="shrink-0 text-right">
                          <p className="text-sm font-bold text-text-main">
                            {v.result} {v.unit}
                          </p>
                          <span
                            className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-black capitalize ${STATUS_STYLES[v.status] ?? STATUS_STYLES.normal
                              }`}
                          >
                            {v.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex items-center gap-2">
                    <ExportPDFButton entry={entry} />
                    <DoctorSummaryButton entry={entry} />
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="flex items-center gap-1.5 rounded-xl bg-rose-50 px-4 py-2 text-xs font-black text-rose-400 transition-all hover:bg-rose-100"
                    >
                      <span className="material-symbols-outlined text-base">delete</span>
                      {r.delete}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
