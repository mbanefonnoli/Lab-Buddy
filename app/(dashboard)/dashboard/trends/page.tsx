"use client";

import Link from "next/link";
import TrendChart from "@/components/TrendChart";
import { buildTrendSeries, type StoredResult } from "@/lib/storage";
import { useHistory } from "@/lib/useHistory";

const DEMO_HISTORY: StoredResult[] = Array.from({ length: 5 }, (_, i) => ({
  id: `demo-${i}`,
  analyzedAt: new Date(Date.now() - (4 - i) * 30 * 24 * 60 * 60 * 1000).toISOString(),
  result: {
    disclaimer: "",
    values: [
      { name: "Hemoglobin", result: "13.8", unit: "g/dL", referenceRange: "", status: i < 2 ? "low" : "normal", explanation: "" },
      { name: "Glucose", result: "102", unit: "mg/dL", referenceRange: "", status: i < 3 ? "high" : "normal", explanation: "" },
      { name: "Cholesterol", result: "178", unit: "mg/dL", referenceRange: "", status: "normal", explanation: "" },
    ],
  },
}));

function InsightCard({ icon, label, value, sub, color }: { icon: string; label: string; value: string; sub: string; color: string }) {
  return (
    <div className="flex items-center gap-4 rounded-3xl bg-white p-5 shadow-sm">
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
        style={{ background: `${color}20` }}
      >
        <span
          className="material-symbols-outlined text-2xl"
          style={{ color, fontVariationSettings: "'FILL' 1" }}
        >
          {icon}
        </span>
      </div>
      <div>
        <p className="text-[11px] font-black uppercase tracking-widest text-text-main/30">{label}</p>
        <p className="text-xl font-black text-text-main">{value}</p>
        <p className="text-xs font-medium text-text-main/50">{sub}</p>
      </div>
    </div>
  );
}

export default function TrendsPage() {
  const { history, isLoading } = useHistory();

  if (isLoading) return null;

  const isDemo = history.length === 0;
  const displayHistory = isDemo ? DEMO_HISTORY : history;
  const { labels, series } = buildTrendSeries(displayHistory);

  const healthSeries = series.find((s) => s.name === "Health Score");
  const latestScore = healthSeries ? (healthSeries.values[healthSeries.values.length - 1] ?? 0) : 0;
  const firstScore = healthSeries ? (healthSeries.values[0] ?? 0) : 0;
  const trend = latestScore - (firstScore as number);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-text-main">Health Trends</h1>
          <p className="text-sm font-medium text-text-main/40">
            {isDemo
              ? "Showing sample data — run analyses over time to build your trend"
              : `Based on ${displayHistory.length} report${displayHistory.length !== 1 ? "s" : ""}`}
          </p>
        </div>
        {isDemo && (
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-black uppercase tracking-wider text-amber-600">
            Sample Data
          </span>
        )}
      </div>

      {/* Insight cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <InsightCard
          icon="monitoring"
          label="Latest Score"
          value={`${latestScore}%`}
          sub="of values in normal range"
          color="#3BADA8"
        />
        <InsightCard
          icon={trend >= 0 ? "trending_up" : "trending_down"}
          label="Overall Trend"
          value={`${trend >= 0 ? "+" : ""}${trend}%`}
          sub="since first report"
          color={trend >= 0 ? "#10B981" : "#F97316"}
        />
        <InsightCard
          icon="calendar_month"
          label="Reports"
          value={`${displayHistory.length}`}
          sub="analyses tracked"
          color="#8B5CF6"
        />
      </div>

      {/* Full chart */}
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <p className="mb-6 text-xs font-black uppercase tracking-widest text-text-main/30">
          All Biomarkers Over Time
        </p>
        <TrendChart labels={labels} series={series} isDemo={isDemo} />
      </div>

      {/* CTA when empty */}
      {history.length < 2 && (
        <div className="flex items-center justify-between rounded-3xl bg-pale-mint px-6 py-5">
          <div>
            <p className="text-sm font-black text-text-main">Build your trend line</p>
            <p className="text-xs font-medium text-text-main/50 mt-0.5">
              Run at least 2 analyses to see real trends
            </p>
          </div>
          <Link
            href="/app"
            className="flex items-center gap-2 rounded-2xl bg-magic-orange px-5 py-2.5 text-sm font-black text-white shadow-[0_4px_0_0_#D15C2A] transition-all hover:brightness-105 active:translate-y-0.5 active:shadow-none"
          >
            <span className="material-symbols-outlined text-base">add</span>
            New Analysis
          </Link>
        </div>
      )}
    </div>
  );
}
