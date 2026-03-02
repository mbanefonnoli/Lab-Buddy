"use client";

import { useState } from "react";
import type { TrendSeries } from "@/lib/storage";

interface TrendChartProps {
  labels: string[];
  series: TrendSeries[];
  isDemo?: boolean;
  height?: number;
}

const W = 560;
const ML = 40, MR = 16, MT = 16, MB = 38;
const GRID = [0, 25, 50, 75, 100];

function xOf(i: number, n: number, w: number): number {
  if (n <= 1) return ML + (w - ML - MR) / 2;
  return ML + (i / (n - 1)) * (w - ML - MR);
}

function yOf(v: number, h: number): number {
  const IH = h - MT - MB;
  return MT + IH - (Math.min(Math.max(v, 0), 100) / 100) * IH;
}

export default function TrendChart({
  labels,
  series,
  isDemo,
  height = 220,
}: TrendChartProps) {
  const [hidden, setHidden] = useState<Set<string>>(new Set());

  const toggle = (name: string) =>
    setHidden((prev) => {
      const next = new Set(prev);
      const visibleCount = series.filter((s) => !next.has(s.name)).length;
      if (next.has(name)) {
        next.delete(name);
      } else if (visibleCount > 1) {
        next.add(name);
      }
      return next;
    });

  const visible = series.filter((s) => !hidden.has(s.name));
  const n = labels.length;
  const H = height;

  return (
    <div className="relative w-full">
      {isDemo && (
        <span className="absolute right-0 top-0 z-10 rounded-full bg-magic-orange/10 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-magic-orange">
          Sample Data
        </span>
      )}

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        style={{ maxHeight: H, overflow: "visible" }}
        aria-label="Health trends chart"
      >
        {/* Horizontal grid lines */}
        {GRID.map((v) => (
          <g key={v}>
            <line
              x1={ML}
              y1={yOf(v, H)}
              x2={W - MR}
              y2={yOf(v, H)}
              stroke={v === 50 ? "#CBD5E1" : "#F1F5F9"}
              strokeWidth={1}
              strokeDasharray={v === 0 ? undefined : "4 4"}
            />
            <text
              x={ML - 6}
              y={yOf(v, H) + 4}
              textAnchor="end"
              style={{ fontSize: 9, fill: "#94A3B8", fontWeight: 700 }}
            >
              {v}
            </text>
          </g>
        ))}

        {/* X-axis labels */}
        {labels.map((lbl, i) => (
          <text
            key={i}
            x={xOf(i, n, W)}
            y={H - 6}
            textAnchor="middle"
            style={{ fontSize: 9, fill: "#94A3B8", fontWeight: 700 }}
          >
            {lbl}
          </text>
        ))}

        {/* Area fills (behind lines) */}
        {visible.map((s) => {
          const pts = s.values
            .map((v, i) =>
              v !== null ? { x: xOf(i, n, W), y: yOf(v, H) } : null
            )
            .filter(Boolean) as { x: number; y: number }[];
          if (pts.length < 2) return null;
          const line = pts
            .map((p, j) => `${j === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
            .join(" ");
          const area = `${line} L${pts[pts.length - 1].x.toFixed(1)},${(H - MB).toFixed(1)} L${pts[0].x.toFixed(1)},${(H - MB).toFixed(1)} Z`;
          return (
            <path key={`area-${s.name}`} d={area} fill={s.color} opacity={0.07} />
          );
        })}

        {/* Lines */}
        {visible.map((s) => {
          const pts = s.values
            .map((v, i) =>
              v !== null ? { x: xOf(i, n, W), y: yOf(v, H) } : null
            )
            .filter(Boolean) as { x: number; y: number }[];
          if (pts.length < 2) return null;
          const d = pts
            .map((p, j) => `${j === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
            .join(" ");
          return (
            <path
              key={`line-${s.name}`}
              d={d}
              fill="none"
              stroke={s.color}
              strokeWidth={2.5}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          );
        })}

        {/* 3D sphere data points */}
        {visible.map((s) =>
          s.values.map((v, i) => {
            if (v === null) return null;
            const cx = xOf(i, n, W);
            const cy = yOf(v, H);
            return (
              <g key={`pt-${s.name}-${i}`}>
                {/* Shadow */}
                <circle cx={cx} cy={cy + 1.5} r={7} fill={s.color} opacity={0.2} />
                {/* Main sphere */}
                <circle cx={cx} cy={cy} r={6.5} fill={s.color} />
                {/* Highlight (3D effect) */}
                <circle cx={cx - 2} cy={cy - 2} r={2.2} fill="white" opacity={0.6} />
              </g>
            );
          })
        )}
      </svg>

      {/* Legend — clickable biomarker selector */}
      <div className="mt-3 flex flex-wrap items-center gap-2 px-1">
        {series.map((s) => {
          const isHidden = hidden.has(s.name);
          return (
            <button
              key={s.name}
              onClick={() => toggle(s.name)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold transition-all ${isHidden
                  ? "bg-[#F5F7FA] text-text-main/25 line-through"
                  : "bg-[#F5F7FA] text-text-main/60 hover:opacity-75"
                }`}
              aria-pressed={!isHidden}
              title={isHidden ? `Show ${s.name}` : `Hide ${s.name}`}
            >
              <div
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: s.color, opacity: isHidden ? 0.25 : 1 }}
              />
              {s.name}
            </button>
          );
        })}

        {series.length > 2 && (
          <button
            onClick={() => setHidden(new Set(series.slice(1).map(s => s.name)))}
            className="text-[10px] font-black uppercase tracking-widest text-magic-orange hover:opacity-70 ml-1"
          >
            Clear All
          </button>
        )}
        {hidden.size > 0 && (
          <button
            onClick={() => setHidden(new Set())}
            className="text-[10px] font-black uppercase tracking-widest text-deep-mint hover:opacity-70 ml-1"
          >
            Show All
          </button>
        )}
      </div>
      {series.length > 1 && (
        <p className="mt-1 px-1 text-[9px] font-medium text-text-main/25">
          Tap a biomarker to show / hide it
        </p>
      )}
    </div>
  );
}
