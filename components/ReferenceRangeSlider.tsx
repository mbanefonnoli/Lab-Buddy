"use client";

import type { LabValue, LabValueStatus } from "@/types/lab";

/* ── Reference range parser ─────────────────────────── */

interface ParsedRange {
  min: number;
  max: number;
  value: number;
}

function parseRange(labValue: LabValue): ParsedRange | null {
  const value = parseFloat(labValue.result);
  if (isNaN(value)) return null;
  if (!labValue.referenceRange) return null;

  const ref = labValue.referenceRange;

  // "X – Y" with em dash, en dash, or regular hyphen (ignore unit suffix)
  const rangeMatch = ref.match(/([\d.]+)\s*[–—\-]\s*([\d.]+)/);
  if (rangeMatch) {
    const min = parseFloat(rangeMatch[1]);
    const max = parseFloat(rangeMatch[2]);
    if (!isNaN(min) && !isNaN(max) && max > min) {
      return { min, max, value };
    }
  }

  // "< X" or "≤ X" — treat 0 as floor
  const ltMatch = ref.match(/[<≤]\s*([\d.]+)/);
  if (ltMatch) {
    const max = parseFloat(ltMatch[1]);
    if (!isNaN(max)) return { min: 0, max, value };
  }

  // "> X" or "≥ X" — treat 2× as ceiling
  const gtMatch = ref.match(/[>≥]\s*([\d.]+)/);
  if (gtMatch) {
    const min = parseFloat(gtMatch[1]);
    if (!isNaN(min)) return { min, max: min * 2, value };
  }

  return null;
}

/* ── Color helpers ───────────────────────────────────── */

const TRACK_COLORS: Record<LabValueStatus, string> = {
  normal: "#3BADA8",  // teal
  high:   "#F97316",  // amber
  low:    "#8B5CF6",  // purple
  critical: "#EF4444", // red
};

/* ── Component ───────────────────────────────────────── */

export default function ReferenceRangeSlider({ labValue }: { labValue: LabValue }) {
  const parsed = parseRange(labValue);
  if (!parsed) return null;

  const { min, max, value } = parsed;
  const span = max - min;

  // Pad the display range by 40% of span on each side
  // but ensure the actual value is always visible
  const pad = span * 0.4;
  const dMin = Math.min(value, min) - pad;
  const dMax = Math.max(value, max) + pad;
  const dSpan = dMax - dMin;

  const pct = (v: number) =>
    Math.min(Math.max(((v - dMin) / dSpan) * 100, 0), 100);

  const safeLeft  = pct(min);
  const safeWidth = pct(max) - safeLeft;
  const markerPos = pct(value);

  const color = TRACK_COLORS[labValue.status];
  const isNormal = labValue.status === "normal";

  return (
    <div className="mt-3 space-y-1.5">
      {/* Label row */}
      <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-text-main/30">
        <span>Reference Range</span>
        <span>{labValue.referenceRange}</span>
      </div>

      {/* Track */}
      <div className="relative h-3 w-full rounded-full bg-[#EEF2F7]">
        {/* Safe zone band */}
        <div
          className="absolute top-0 h-full rounded-full"
          style={{
            left: `${safeLeft}%`,
            width: `${safeWidth}%`,
            background: isNormal ? "#3BADA8" : "#E2E8F0",
            opacity: isNormal ? 0.25 : 0.6,
          }}
        />

        {/* Marker */}
        <div
          className="absolute top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${markerPos}%` }}
        >
          {/* Outer ring */}
          <div
            className="flex h-5 w-5 items-center justify-center rounded-full"
            style={{
              background: color,
              boxShadow: `0 0 0 2px white, 0 0 0 3px ${color}40`,
            }}
          >
            {/* Highlight spot */}
            <div className="h-1.5 w-1.5 -translate-x-[1px] -translate-y-[1px] rounded-full bg-white opacity-70" />
          </div>
        </div>
      </div>

      {/* Min / Max labels */}
      <div
        className="relative flex text-[9px] font-bold text-text-main/30"
        style={{ marginLeft: `${safeLeft}%`, width: `${safeWidth}%` }}
      >
        <span>{min}</span>
        <span className="ml-auto">{max}</span>
      </div>
    </div>
  );
}
