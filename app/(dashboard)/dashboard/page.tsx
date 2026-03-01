"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CircularProgress from "@/components/CircularProgress";
import TrendChart from "@/components/TrendChart";
import {
  loadHistory,
  buildTrendSeries,
  deleteFromHistory,
  type StoredResult,
} from "@/lib/storage";

/* ── helpers ─────────────────────────────────────── */

function statusBadge(result: StoredResult) {
  const total = result.result.values.length;
  if (total === 0) return { label: "No Data", color: "bg-zinc-100 text-zinc-400" };
  const normal = result.result.values.filter((v) => v.status === "normal").length;
  const pct = (normal / total) * 100;
  if (pct === 100) return { label: "Everything Great!", color: "bg-emerald-100 text-emerald-600" };
  if (pct >= 75) return { label: "Mostly Good", color: "bg-sky-100 text-sky-600" };
  if (pct >= 50) return { label: "Heads Up!", color: "bg-amber-100 text-amber-600" };
  return { label: "Needs Attention", color: "bg-rose-100 text-rose-600" };
}

function healthScore(entry: StoredResult) {
  const total = entry.result.values.length;
  if (total === 0) return 100;
  return Math.round(
    (entry.result.values.filter((v) => v.status === "normal").length / total) * 100
  );
}

/* Derive up to 3 biomarker ring values from the latest entry */
function getRings(entry: StoredResult) {
  const statusPct: Record<string, number> = {
    normal: 100,
    high: 72,
    low: 38,
    critical: 18,
  };
  const tracked = [
    { key: "hemoglobin", label: "Hemoglobin", color: "#8B5CF6" },
    { key: "glucose", label: "Glucose", color: "#F97316" },
    { key: "cholesterol", label: "Cholesterol", color: "#3B82F6" },
    { key: "creatinine", label: "Creatinine", color: "#EC4899" },
    { key: "vitamin", label: "Vitamin D", color: "#10B981" },
    { key: "iron", label: "Iron", color: "#6366F1" },
  ];
  const rings: { label: string; value: number; color: string; status: string }[] = [];
  for (const t of tracked) {
    if (rings.length >= 3) break;
    const v = entry.result.values.find((v) => v.name.toLowerCase().includes(t.key));
    if (v) {
      rings.push({
        label: t.label,
        value: statusPct[v.status] ?? 100,
        color: t.color,
        status: v.status,
      });
    }
  }
  return rings;
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
  const [history, setHistory] = useState<StoredResult[]>(() => {
    if (typeof window !== "undefined") {
      return loadHistory();
    }
    return [];
  });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReady(true);
  }, []);

  const isDemo = history.length === 0;
  const displayHistory = isDemo ? DEMO_HISTORY : history;
  const latest = displayHistory[0];
  const score = healthScore(latest);
  const rings = getRings(latest);
  const { labels, series } = buildTrendSeries(displayHistory);
  const badge = statusBadge(latest);
  const recentUploads = displayHistory.slice(0, 4);

  const handleDelete = (id: string) => {
    deleteFromHistory(id);
    setHistory(loadHistory());
  };

  if (!ready) return null;

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-text-main">Overview</h1>
          <p className="text-sm font-medium text-text-main/40">
            {isDemo ? "Showing sample data — run an analysis to see real results" : "Your health at a glance"}
          </p>
        </div>
        {isDemo && (
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-black uppercase tracking-wider text-amber-600">
            Sample Data
          </span>
        )}
      </div>

      {/* Bento grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">

        {/* ── Welcome / last analysis card ── */}
        <div className="flex flex-col justify-between rounded-3xl bg-white p-6 shadow-sm md:col-span-2 xl:col-span-1">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-text-main/30">
              Last Analysis
            </p>
            <p className="mt-1 text-sm font-semibold text-text-main/60">
              {new Date(latest.analyzedAt).toLocaleDateString(undefined, {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {/* Score ring */}
          <div className="my-6 flex flex-col items-center gap-3">
            <CircularProgress percentage={score} color="#3BADA8" size={120} value={`${score}%`} label="Normal" />
            <span className={`rounded-full px-4 py-1 text-xs font-black ${badge.color}`}>
              {badge.label}
            </span>
          </div>

          <Link
            href="/app"
            className="flex items-center justify-center gap-2 rounded-2xl bg-magic-orange px-4 py-3 text-sm font-black text-white shadow-[0_4px_0_0_#D15C2A] transition-all hover:brightness-105 active:translate-y-0.5 active:shadow-none"
          >
            <span className="material-symbols-outlined text-base">add</span>
            New Analysis
          </Link>
        </div>

        {/* ── Health Snapshot rings ── */}
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="mb-4 text-xs font-black uppercase tracking-widest text-text-main/30">
            Health Snapshot
          </p>
          {rings.length > 0 ? (
            <div className="flex flex-col gap-5">
              {rings.map((r) => (
                <div key={r.label} className="flex items-center gap-4">
                  <CircularProgress percentage={r.value} color={r.color} size={64} value="" label="" />
                  <div>
                    <p className="text-sm font-bold text-text-main">{r.label}</p>
                    <p
                      className="text-xs font-semibold capitalize"
                      style={{ color: r.color }}
                    >
                      {r.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-text-main/40">
              No tracked biomarkers found. Run an analysis to see your snapshot.
            </p>
          )}
        </div>

        {/* ── Trend chart ── (full-width on xl) */}
        <div className="rounded-3xl bg-white p-6 shadow-sm md:col-span-2 xl:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs font-black uppercase tracking-widest text-text-main/30">
              Health Trends
            </p>
            <Link
              href="/dashboard/trends"
              className="text-xs font-bold text-deep-mint hover:underline"
            >
              View full chart →
            </Link>
          </div>
          <TrendChart labels={labels} series={series} isDemo={isDemo} />
        </div>
      </div>

      {/* ── Recent Uploads ── */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-black uppercase tracking-widest text-text-main/30">
            Recent Uploads
          </p>
          <Link
            href="/dashboard/reports"
            className="text-xs font-bold text-deep-mint hover:underline"
          >
            See all →
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {recentUploads.map((entry) => {
            const b = statusBadge(entry);
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
                    {total} value{total !== 1 ? "s" : ""} · {normal} normal
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
