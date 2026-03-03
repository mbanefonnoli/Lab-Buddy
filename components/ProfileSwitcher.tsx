"use client";

import { useState } from "react";
import { useProfile } from "@/components/ProfileProvider";
import { useLanguage } from "@/components/LanguageProvider";

function Avatar({
  name,
  color,
  size = 32,
}: {
  name: string;
  color: string;
  size?: number;
}) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full font-black text-white"
      style={{ width: size, height: size, background: color, fontSize: size * 0.36 }}
    >
      {initials}
    </div>
  );
}

export default function ProfileSwitcher() {
  const { profiles, activeProfile, setActive } = useProfile();
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  if (profiles.length <= 1) return null; // only show when there are multiple profiles

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-2xl bg-white px-3 py-1.5 shadow-sm transition-all hover:shadow-md"
        aria-label={t.settingsPage.switchProfile}
      >
        <Avatar name={activeProfile.name} color={activeProfile.avatarColor} size={28} />
        <span className="max-w-[96px] truncate text-sm font-bold text-text-main">
          {activeProfile.name}
        </span>
        <span
          className={`material-symbols-outlined text-base text-text-main/40 transition-transform ${open ? "rotate-180" : ""}`}
        >
          expand_more
        </span>
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
          />
          {/* Dropdown */}
          <div className="absolute left-0 top-full z-20 mt-2 w-52 overflow-hidden rounded-2xl bg-white shadow-xl">
            {profiles.map((p) => (
              <button
                key={p.id}
                onClick={() => { setActive(p.id); setOpen(false); }}
                className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-pale-mint/40 ${
                  p.id === activeProfile.id ? "bg-pale-mint/60" : ""
                }`}
              >
                <Avatar name={p.name} color={p.avatarColor} size={30} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-text-main">{p.name}</p>
                  <p className="text-[10px] font-medium text-text-main/40">
                    {t.profileRelations[p.relation]}
                  </p>
                </div>
                {p.id === activeProfile.id && (
                  <span className="material-symbols-outlined text-base text-deep-mint">check</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
