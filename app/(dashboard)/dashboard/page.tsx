"use client";

import Link from "next/link";
import TrendChart from "@/components/TrendChart";
import HealthSnapshot from "@/components/HealthSnapshot";
import { buildTrendSeries, type StoredResult } from "@/lib/storage";
import { useHistory } from "@/lib/useHistory";
import { useLanguage } from "@/components/LanguageProvider";
import type { Translations } from "@/lib/i18n";

/* ── helpers ─────────────────────────────────────── */

function statusBadge(result: StoredResult, sb: Translations["dashboard"]["statusBadge"]) {
  const total = result.result.values.length;
  if (total === 0) return { label: sb.noData, color: "bg-zinc-100 text-zinc-400" };
  const normal = result.result.values.filter((v) => v.status === "normal").length;
  const pct = (normal / total) * 100;
  if (pct === 100) return { label: sb.everythingGreat, color: "bg-emerald-100 text-emerald-600" };
  if (pct >= 75) return { label: sb.mostlyGood, color: "bg-sky-100 text-sky-600" };
  if (pct >= 50) return { label: sb.headsUp, color: "bg-amber-100 text-amber-600" };
  return { label: sb.needsAttention, color: "bg-rose-100 text-rose-600" };
}

function healthScore(entry: StoredResult) {
  const total = entry.result.values.length;
  if (total === 0) return 100;
  return Math.round(
    (entry.result.values.filter((v) => v.status === "normal").length / total) * 100
  );
}

/* ── DEMO data shown when localStorage is empty ───── */

const DEMO_ENTRY: StoredResult = {
  id: "demo",
  analyzedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  result: {
    disclaimer: "",
    values: [
      { name: "Hemoglobin", result: "13.8", unit: "g/dL", referenceRange: "12–16 g/dL", status: "normal", explanation: "" },
      { name: "Glucose", result: "102", unit: "mg/dL", referenceRange: "70–99 mg/dL", status: "high", explanation: "" },
      { name: "Cholesterol", result: "178", unit: "mg/dL", referenceRange: "<200 mg/dL", status: "normal", explanation: "" },
      { name: "Creatinine", result: "0.9", unit: "mg/dL", referenceRange: "0.7–1.2 mg/dL", status: "normal", explanation: "" },
      { name: "Vitamin D", result: "29", unit: "ng/mL", referenceRange: "30–100 ng/mL", status: "low", explanation: "" },
    ],
  },
};

const DEMO_HISTORY: StoredResult[] = [
  {
    ...DEMO_ENTRY,
    id: "demo-1",
    analyzedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    result: { ...DEMO_ENTRY.result, values: DEMO_ENTRY.result.values.map((v) => ({ ...v, status: v.status === "high" ? "normal" : v.status })) },
  },
  {
    ...DEMO_ENTRY,
    id: "demo-2",
    analyzedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  DEMO_ENTRY,
];

/* ── Component ───────────────────────────────────── */

export default function DashboardOverview() {
  const { history, remove, isLoading } = useHistory();
  const { t } = useLanguage();
  const d = t.dashboard;

  const isDemo = history.length === 0;
  const displayHistory = isDemo ? DEMO_HISTORY : history;
  const latest = displayHistory[0];
  const score = healthScore(latest);
  const { labels, series } = buildTrendSeries(displayHistory);
  const badge = statusBadge(latest, d.statusBadge);
  const recentUploads = displayHistory.slice(0, 4);

  const handleDelete = (id: string) => remove(id);

  if (isLoading) return null;

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-text-main">{d.overview}</h1>
          <p className="text-sm font-medium text-text-main/40">
            {isDemo ? d.showingSampleData : d.yourHealthAtGlance}
          </p>
        </div>
        {isDemo && (
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-black uppercase tracking-wider text-amber-600">
            {d.sampleData}
          </span>
        )}
      </div>

      {/* Bento grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

        {/* ── Welcome / CTA card (narrow) ── */}
        <div className="flex flex-col justify-between rounded-3xl bg-white p-6 shadow-sm">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-text-main/30">
              {d.lastAnalysis}
            </p>
            <p className="mt-1 text-sm font-semibold text-text-main/60">
              {new Date(latest.analyzedAt).toLocaleDateString(undefined, {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="my-4 flex-1 flex items-center justify-center">
            <div className="rounded-2xl bg-pale-mint px-5 py-4 text-center">
              <p className="text-3xl font-black text-deep-mint">{score}%</p>
              <p className="text-xs font-bold text-text-main/40 mt-0.5">{d.valuesNormal}</p>
            </div>
          </div>
          <Link
            href="/app"
            className="flex items-center justify-center gap-2 rounded-2xl bg-magic-orange px-4 py-3 text-sm font-black text-white shadow-[0_4px_0_0_#D15C2A] transition-all hover:brightness-105 active:translate-y-0.5 active:shadow-none"
          >
            <span className="material-symbols-outlined text-base">add</span>
            {d.newAnalysis}
          </Link>
        </div>

        {/* ── Health Snapshot (wide) ── */}
        <div className="rounded-3xl bg-white p-6 shadow-sm md:col-span-2">
          <p className="mb-4 text-xs font-black uppercase tracking-widest text-text-main/30">
            {d.healthSnapshot}
          </p>
          <HealthSnapshot values={latest.result.values} />
        </div>

        {/* ── Trend chart (full-width) ── */}
        <div className="rounded-3xl bg-white p-6 shadow-sm md:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs font-black uppercase tracking-widest text-text-main/30">
              {d.healthTrends}
            </p>
            <Link
              href="/dashboard/trends"
              className="text-xs font-bold text-deep-mint hover:underline"
            >
              {d.viewFullChart}
            </Link>
          </div>
          <TrendChart labels={labels} series={series} isDemo={isDemo} />
        </div>
      </div>

      {/* ── Recent Uploads ── */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-black uppercase tracking-widest text-text-main/30">
            {d.recentUploads}
          </p>
          <Link
            href="/dashboard/reports"
            className="text-xs font-bold text-deep-mint hover:underline"
          >
            {d.seeAll}
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {recentUploads.map((entry) => {
            const b = statusBadge(entry, d.statusBadge);
            const s = healthScore(entry);
            const total = entry.result.values.length;
            const normal = entry.result.values.filter((v) => v.status === "normal").length;
            return (
              <div
                key={entry.id}
                className="group relative flex flex-col gap-3 rounded-3xl bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                {/* icon */}
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-pale-mint">
                  <span className="material-symbols-outlined text-deep-mint text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    biotech
                  </span>
                </div>

                {/* date */}
                <div>
                  <p className="text-[11px] font-semibold text-text-main/40">
                    {new Date(entry.analyzedAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <p className="mt-0.5 text-sm font-bold text-text-main">
                    {total} {d.value}{total !== 1 ? "s" : ""} · {normal} {d.normal}
                  </p>
                </div>

                {/* badge */}
                <span className={`self-start rounded-full px-3 py-0.5 text-[11px] font-black ${b.color}`}>
                  {b.label}
                </span>

                {/* score bar */}
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-pale-mint">
                  <div
                    className="h-full rounded-full bg-deep-mint transition-all"
                    style={{ width: `${s}%` }}
                  />
                </div>

                {/* delete (only real data) */}
                {!isDemo && (
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="absolute right-4 top-4 hidden h-7 w-7 items-center justify-center rounded-full bg-rose-50 text-rose-400 transition-all hover:bg-rose-100 group-hover:flex"
                    aria-label="Delete"
                  >
                    <span className="material-symbols-outlined text-base">delete</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
