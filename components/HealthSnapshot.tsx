"use client";

import type { LabValue, LabValueStatus } from "@/types/lab";
import { useLanguage } from "@/components/LanguageProvider";

const STATUS_ORDER: LabValueStatus[] = ["critical", "high", "low", "normal"];

const STATUS_DOT_BADGE: Record<LabValueStatus, { dot: string; badge: string }> = {
  normal:   { dot: "bg-emerald-400",  badge: "bg-emerald-50 text-emerald-600"  },
  high:     { dot: "bg-amber-400",    badge: "bg-amber-50 text-amber-600"      },
  low:      { dot: "bg-violet-400",   badge: "bg-violet-50 text-violet-600"    },
  critical: { dot: "bg-rose-500",     badge: "bg-rose-50 text-rose-600"        },
};

interface HealthSnapshotProps {
  values: LabValue[];
}

function ScoreRing({ score }: { score: number }) {
  const size = 100;
  const sw = 9;
  const r = (size - sw * 2) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - score / 100);

  const color =
    score >= 80 ? "#10B981" :
    score >= 60 ? "#F97316" :
                  "#EF4444";

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        style={{ transform: "rotate(-90deg)" }}
      >
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#EEF2F7" strokeWidth={sw} />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none"
          stroke={color}
          strokeWidth={sw}
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.9s cubic-bezier(.4,0,.2,1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-black leading-none text-text-main">{score}%</span>
        <span className="mt-0.5 text-[9px] font-bold uppercase tracking-widest text-text-main/30">Score</span>
      </div>
    </div>
  );
}

export default function HealthSnapshot({ values }: HealthSnapshotProps) {
  const { t } = useLanguage();
  const hs = t.healthSnapshot;

  if (values.length === 0) {
    return (
      <p className="text-sm text-text-main/40">{hs.noData}</p>
    );
  }

  const normal   = values.filter((v) => v.status === "normal");
  const flagged  = values.filter((v) => v.status !== "normal")
                         .sort((a, b) => STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status));
  const score    = Math.round((normal.length / values.length) * 100);

  return (
    <div className="flex flex-col gap-4">
      {/* Header: score + count summary */}
      <div className="flex items-center gap-5">
        <ScoreRing score={score} />
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2 rounded-2xl bg-emerald-50 px-3 py-2">
            <span
              className="material-symbols-outlined text-lg text-emerald-500"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
            <div>
              <p className="text-xs font-black text-emerald-600">
                {hs.optimized(normal.length)}
              </p>
              <p className="text-[10px] font-medium text-emerald-500/70">
                {hs.withinRange}
              </p>
            </div>
          </div>

          {flagged.length > 0 && (
            <div className="flex items-center gap-2 rounded-2xl bg-amber-50 px-3 py-2">
              <span
                className="material-symbols-outlined text-lg text-amber-500"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                warning
              </span>
              <div>
                <p className="text-xs font-black text-amber-600">
                  {hs.needsAttention(flagged.length)}
                </p>
                <p className="text-[10px] font-medium text-amber-500/70">
                  {hs.outsideRange}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Flagged biomarkers */}
      {flagged.length > 0 && (
        <div>
          <p className="mb-1.5 text-[10px] font-black uppercase tracking-widest text-text-main/30">
            {hs.needsAttentionLabel}
          </p>
          <div className="space-y-1.5">
            {flagged.map((v) => {
              const s = STATUS_DOT_BADGE[v.status];
              return (
                <div
                  key={v.name}
                  className="flex items-center gap-3 rounded-2xl bg-[#F5F7FA] px-3 py-2.5"
                >
                  <div className={`h-2.5 w-2.5 shrink-0 rounded-full ${s.dot}`} />
                  <span className="flex-1 text-sm font-bold text-text-main truncate">
                    {v.name}
                  </span>
                  <span className="text-sm font-bold text-text-main/60">
                    {v.result}
                    {v.unit ? ` ${v.unit}` : ""}
                  </span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-black ${s.badge}`}>
                    {hs.statusLabels[v.status]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Normal biomarkers (collapsed list) */}
      {normal.length > 0 && (
        <div>
          <p className="mb-1.5 text-[10px] font-black uppercase tracking-widest text-text-main/30">
            {hs.optimizedLabel}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {normal.map((v) => (
              <div
                key={v.name}
                className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span className="text-[11px] font-bold text-emerald-600 truncate max-w-[100px]">
                  {v.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
