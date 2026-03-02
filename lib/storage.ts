import type { ExplainResponse } from "@/types/lab";

export const HISTORY_KEY = "labbuddy_history";
export const MAX_HISTORY = 10;

export interface StoredResult {
  id: string;
  result: ExplainResponse;
  analyzedAt: string;
  /** Optional profile this result belongs to */
  profileId?: string;
}

export interface TrendSeries {
  name: string;
  color: string;
  values: (number | null)[];
}

/* ─── CRUD ─────────────────────────────────────────────── */

export function loadHistory(): StoredResult[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? (JSON.parse(raw) as StoredResult[]) : [];
  } catch {
    return [];
  }
}

export function saveToHistory(result: ExplainResponse, profileId?: string): StoredResult {
  const entry: StoredResult = {
    id:
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : Date.now().toString(),
    result,
    analyzedAt: new Date().toISOString(),
    ...(profileId ? { profileId } : {}),
  };
  const history = [entry, ...loadHistory()].slice(0, MAX_HISTORY);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  // Keep backward-compatible last-result key
  localStorage.setItem(
    "labbuddy_last_result",
    JSON.stringify({ result, analyzedAt: entry.analyzedAt })
  );
  return entry;
}

export function deleteFromHistory(id: string): void {
  const history = loadHistory().filter((e) => e.id !== id);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  if (history.length > 0) {
    localStorage.setItem(
      "labbuddy_last_result",
      JSON.stringify({
        result: history[0].result,
        analyzedAt: history[0].analyzedAt,
      })
    );
  } else {
    localStorage.removeItem("labbuddy_last_result");
  }
}

/* ─── TREND DATA ───────────────────────────────────────── */

// Common biomarkers to track as individual lines
const TRACKED: Array<{ key: string; name: string; color: string }> = [
  { key: "hemoglobin", name: "Hemoglobin", color: "#8B5CF6" },
  { key: "glucose", name: "Glucose", color: "#F97316" },
  { key: "cholesterol", name: "Cholesterol", color: "#3B82F6" },
  { key: "creatinine", name: "Creatinine", color: "#EC4899" },
];

function statusToNorm(status: string): number {
  const map: Record<string, number> = {
    normal: 65,
    high: 83,
    low: 28,
    critical: 94,
  };
  return map[status] ?? 65;
}

export function buildTrendSeries(history: StoredResult[]): {
  labels: string[];
  series: TrendSeries[];
} {
  if (history.length < 1) return { labels: [], series: [] };

  const sorted = [...history].reverse();
  const labels = sorted.map((e) =>
    new Date(e.analyzedAt).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    })
  );

  // 1. Health Score Series
  const healthScores: number[] = sorted.map((e) => {
    const total = e.result.values.length;
    if (total === 0) return 100;
    const normal = e.result.values.filter((v) => v.status === "normal").length;
    return Math.round((normal / total) * 100);
  });

  const series: TrendSeries[] = [
    { name: "Health Score", color: "#3BADA8", values: healthScores },
  ];

  // 2. Extract ALL unique biomarkers found in history
  const allNames = new Set<string>();
  for (const entry of history) {
    for (const v of entry.result.values) {
      allNames.add(v.name);
    }
  }

  // 3. Define colors for biomarkers
  const colors = ["#8B5CF6", "#F97316", "#3B82F6", "#EC4899", "#10B981", "#6366F1", "#F43F5E", "#84CC16"];
  let colorIdx = 0;

  // 4. Build a series for each biomarker found
  for (const name of Array.from(allNames)) {
    const values: (number | null)[] = sorted.map((e) => {
      const v = e.result.values.find((val) => val.name === name);
      return v ? statusToNorm(v.status) : null;
    });

    // Only add if it appears in at least 2 reports OR is a major biomarker
    const appearsIn = values.filter((v) => v !== null).length;
    if (appearsIn >= 2 || TRACKED.some(t => name.toLowerCase().includes(t.key))) {
      series.push({
        name,
        color: colors[colorIdx % colors.length],
        values
      });
      colorIdx++;
    }
  }

  return { labels, series };
}
