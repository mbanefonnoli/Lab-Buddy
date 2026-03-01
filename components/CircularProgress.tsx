"use client";

interface CircularProgressProps {
  percentage: number; // 0–100
  color: string; // hex
  label: string;
  value: string;
  unit?: string;
  size?: number;
}

export default function CircularProgress({
  percentage,
  color,
  label,
  value,
  unit,
  size = 110,
}: CircularProgressProps) {
  const sw = 9;
  const r = (size - sw * 2) / 2;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(Math.max(percentage, 0), 100);
  const offset = circ * (1 - pct / 100);

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          style={{ transform: "rotate(-90deg)" }}
        >
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="#EEF2F7"
            strokeWidth={sw}
          />
          {/* Progress arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth={sw}
            strokeDasharray={circ}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.9s cubic-bezier(.4,0,.2,1)" }}
          />
        </svg>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-black leading-none text-text-main">
            {value}
          </span>
          {unit && (
            <span className="mt-0.5 text-[9px] font-bold text-text-main/40">
              {unit}
            </span>
          )}
        </div>
      </div>

      <p className="max-w-[72px] text-center text-[11px] font-bold leading-tight text-text-main/55">
        {label}
      </p>
    </div>
  );
}
