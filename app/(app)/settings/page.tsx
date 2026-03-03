"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { LANGUAGES, type Locale } from "@/lib/i18n";
import { useProfile } from "@/components/ProfileProvider";
import { AVATAR_COLORS, type ProfileRelation } from "@/types/profile";

const NOTIF_KEY = "labbuddy_notifications";

function ProfileAvatar({ name, color, size = 36 }: { name: string; color: string; size?: number }) {
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full font-black text-white"
      style={{ width: size, height: size, background: color, fontSize: size * 0.36 }}
    >
      {initials}
    </div>
  );
}

export default function SettingsPage() {
  const { locale, setLocale, t } = useLanguage();
  const s = t.settingsPage;
  const { profiles, activeProfile, setActive, addProfile, removeProfile } = useProfile();

  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newRelation, setNewRelation] = useState<ProfileRelation>("partner");
  const [newColor, setNewColor] = useState(AVATAR_COLORS[1]);

  const handleAddProfile = () => {
    if (!newName.trim()) return;
    addProfile(newName.trim(), newRelation, newColor);
    setNewName("");
    setNewRelation("partner");
    setNewColor(AVATAR_COLORS[1]);
    setShowAddForm(false);
  };

  const [notificationsOn, setNotificationsOn] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(NOTIF_KEY) === "true";
    }
    return false;
  });
  const [showLangPicker, setShowLangPicker] = useState(false);
  const [notifBlocked, setNotifBlocked] = useState(() => {
    if (typeof window !== "undefined") {
      return "Notification" in window && Notification.permission === "denied";
    }
    return false;
  });

  useEffect(() => {
    // Permission sync handled by initializer
  }, []);

  const handleNotificationsToggle = async () => {
    if (!notificationsOn) {
      if (!("Notification" in window)) {
        // Browser doesn't support notifications — just store preference
        setNotificationsOn(true);
        localStorage.setItem(NOTIF_KEY, "true");
        return;
      }

      if (Notification.permission === "denied") {
        setNotifBlocked(true);
        return;
      }

      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        setNotificationsOn(true);
        setNotifBlocked(false);
        localStorage.setItem(NOTIF_KEY, "true");
        new Notification("Lab Buddy", {
          body: "Notifications are now on!",
          icon: "/favicon.ico",
        });
      } else {
        setNotifBlocked(permission === "denied");
      }
    } else {
      setNotificationsOn(false);
      localStorage.setItem(NOTIF_KEY, "false");
    }
  };

  const handleLocaleChange = (code: Locale) => {
    setLocale(code);
    setShowLangPicker(false);
  };

  const currentLang = LANGUAGES.find((l) => l.code === locale);

  return (
    <div className="mx-auto w-full max-w-md pt-4">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-blob bg-white shadow-inner">
          <span className="material-symbols-outlined text-[52px] text-soft-purple">
            settings
          </span>
        </div>
        <h1 className="text-3xl font-black tracking-tight text-text-main dark:text-zinc-100">
          {s.title}
        </h1>
        <p className="mt-1 text-base font-medium text-text-main/60 dark:text-zinc-400">
          {s.subtitle}
        </p>
      </div>

      {/* Settings list */}
      <div className="mb-6 overflow-hidden rounded-[2.5rem] border-4 border-white bg-white/80 shadow-[0_8px_20px_rgba(0,0,0,0.04)] dark:bg-zinc-900/60 dark:border-zinc-800">

        {/* Notifications row */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-pale-mint dark:border-zinc-800">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-pale-mint dark:bg-zinc-800">
              <span className="material-symbols-outlined text-xl text-soft-purple">
                notifications
              </span>
            </div>
            <div>
              <span className="text-base font-bold text-text-main dark:text-zinc-100">
                {s.notifications}
              </span>
              {notifBlocked && (
                <p className="text-[11px] font-semibold text-magic-orange mt-0.5">
                  {s.notifBlocked}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={handleNotificationsToggle}
            disabled={notifBlocked}
            className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors disabled:opacity-40 ${notificationsOn ? "bg-deep-mint" : "bg-zinc-300 dark:bg-zinc-700"
              }`}
            role="switch"
            aria-checked={notificationsOn}
            aria-label={s.notifications}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${notificationsOn ? "translate-x-6" : "translate-x-1"
                }`}
            />
          </button>
        </div>

        {/* Language row */}
        <div className="border-b border-pale-mint dark:border-zinc-800">
          <button
            onClick={() => setShowLangPicker((v) => !v)}
            className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-pale-mint/30 dark:hover:bg-zinc-800/40"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-pale-mint dark:bg-zinc-800">
                <span className="material-symbols-outlined text-xl text-buddy-blue">
                  language
                </span>
              </div>
              <span className="text-base font-bold text-text-main dark:text-zinc-100">
                {s.language}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-text-main/40 dark:text-zinc-500">
              <span>{currentLang?.nativeLabel}</span>
              <span
                className={`material-symbols-outlined text-lg transition-transform duration-200 ${showLangPicker ? "rotate-90" : ""
                  }`}
              >
                chevron_right
              </span>
            </div>
          </button>

          {/* Inline language picker */}
          {showLangPicker && (
            <div className="bg-pale-mint/20 dark:bg-zinc-800/30">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLocaleChange(lang.code)}
                  className="flex w-full items-center justify-between px-8 py-4 transition-colors hover:bg-pale-mint/50 dark:hover:bg-zinc-700/30"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-base font-bold text-text-main dark:text-zinc-100">
                      {lang.nativeLabel}
                    </span>
                    <span className="text-xs font-semibold text-text-main/40 dark:text-zinc-500">
                      {lang.label}
                    </span>
                  </div>
                  {locale === lang.code && (
                    <span className="material-symbols-outlined text-lg text-deep-mint">
                      check
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Data & Privacy row */}
        <Link
          href="/settings/privacy"
          className="flex items-center justify-between px-6 py-5 transition-colors hover:bg-pale-mint/30 dark:hover:bg-zinc-800/40"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-pale-mint dark:bg-zinc-800">
              <span className="material-symbols-outlined text-xl text-deep-mint">
                security
              </span>
            </div>
            <span className="text-base font-bold text-text-main dark:text-zinc-100">
              {s.dataPrivacy}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-text-main/40 dark:text-zinc-500">
            <span>{s.viewPolicy}</span>
            <span className="material-symbols-outlined text-lg">chevron_right</span>
          </div>
        </Link>
      </div>

      {/* Family Profiles card */}
      <div className="mb-6 overflow-hidden rounded-[2.5rem] border-4 border-white bg-white/80 shadow-[0_8px_20px_rgba(0,0,0,0.04)] dark:bg-zinc-900/60 dark:border-zinc-800">
        <div className="flex items-center justify-between px-6 py-5 border-b border-pale-mint dark:border-zinc-800">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-pale-mint dark:bg-zinc-800">
              <span className="material-symbols-outlined text-xl text-magic-orange">group</span>
            </div>
            <span className="text-base font-bold text-text-main dark:text-zinc-100">{s.familyProfiles}</span>
          </div>
          <button
            onClick={() => setShowAddForm((v) => !v)}
            className="flex items-center gap-1 rounded-xl bg-pale-mint px-3 py-1.5 text-xs font-black text-deep-mint transition-all hover:bg-deep-mint hover:text-white"
          >
            <span className="material-symbols-outlined text-base">add</span>
            {s.add}
          </button>
        </div>

        {/* Existing profiles */}
        <div className="divide-y divide-pale-mint dark:divide-zinc-800">
          {profiles.map((p) => (
            <div key={p.id} className="flex items-center gap-3 px-6 py-4">
              <ProfileAvatar name={p.name} color={p.avatarColor} />
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-bold text-text-main dark:text-zinc-100">{p.name}</p>
                <p className="text-[10px] font-medium text-text-main/40">{t.profileRelations[p.relation]}</p>
              </div>
              {p.id === activeProfile.id ? (
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-black text-emerald-600">{s.active}</span>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActive(p.id)}
                    className="rounded-xl bg-pale-mint px-3 py-1 text-[10px] font-black text-deep-mint hover:bg-deep-mint hover:text-white transition-all"
                  >
                    {s.switchProfile}
                  </button>
                  <button
                    onClick={() => removeProfile(p.id)}
                    className="flex h-7 w-7 items-center justify-center rounded-xl bg-rose-50 text-rose-400 hover:bg-rose-100 transition-all"
                    aria-label={`Remove ${p.name}`}
                  >
                    <span className="material-symbols-outlined text-base">close</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add profile form */}
        {showAddForm && (
          <div className="border-t border-pale-mint dark:border-zinc-800 bg-pale-mint/20 dark:bg-zinc-800/20 px-6 py-5 space-y-4">
            <p className="text-xs font-black uppercase tracking-widest text-text-main/40">{s.newProfile}</p>
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder={s.namePlaceholder}
              className="w-full rounded-2xl border-2 border-pale-mint bg-white px-4 py-2.5 text-sm font-bold text-text-main placeholder:text-text-main/30 outline-none focus:border-deep-mint dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100"
            />
            <div className="flex flex-wrap gap-2">
              {(Object.entries(t.profileRelations) as [ProfileRelation, string][]).map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => setNewRelation(val)}
                  className={`rounded-full px-3 py-1 text-xs font-bold transition-all ${
                    newRelation === val
                      ? "bg-deep-mint text-white"
                      : "bg-white text-text-main/60 hover:bg-pale-mint dark:bg-zinc-800 dark:text-zinc-400"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-text-main/40">{s.color}</span>
              {AVATAR_COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => setNewColor(c)}
                  className={`h-6 w-6 rounded-full transition-all ${newColor === c ? "ring-2 ring-offset-2 ring-text-main/40 scale-110" : ""}`}
                  style={{ background: c }}
                  aria-label={`Color ${c}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleAddProfile}
                disabled={!newName.trim()}
                className="flex-1 rounded-2xl bg-magic-orange py-2.5 text-sm font-black text-white shadow-[0_3px_0_0_#D15C2A] transition-all hover:brightness-105 active:translate-y-0.5 active:shadow-none disabled:opacity-40"
              >
                {s.addProfile}
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="rounded-2xl bg-white px-4 py-2.5 text-sm font-bold text-text-main/50 hover:bg-pale-mint transition-all dark:bg-zinc-800"
              >
                {s.cancel}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* About card */}
      <div className="rounded-[2.5rem] border-4 border-white bg-white/80 p-7 shadow-[0_8px_20px_rgba(0,0,0,0.04)] dark:bg-zinc-900/60 dark:border-zinc-800">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pale-mint dark:bg-zinc-800">
            <span className="material-symbols-outlined text-2xl text-magic-orange">
              medical_services
            </span>
          </div>
          <div>
            <p className="text-lg font-black text-text-main dark:text-zinc-100">
              {s.appName}
            </p>
            <p className="text-xs font-semibold text-text-main/40 dark:text-zinc-500">
              {s.version}
            </p>
          </div>
        </div>
        <p className="text-sm font-medium leading-relaxed text-text-main/60 dark:text-zinc-400">
          {s.aboutText}
        </p>
      </div>

      {/* Disclaimer */}
      <p className="mt-6 text-center text-xs font-medium text-text-main/40 dark:text-zinc-600">
        {s.noDataStored}
      </p>
    </div>
  );
}
