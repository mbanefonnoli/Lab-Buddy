"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { LANGUAGES, type Locale } from "@/lib/i18n";

const NOTIF_KEY = "labbuddy_notifications";

export default function SettingsPage() {
  const { locale, setLocale, t } = useLanguage();
  const s = t.settingsPage;

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
                  Blocked in browser settings
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
