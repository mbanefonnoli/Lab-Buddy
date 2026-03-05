"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { useProfile } from "@/components/ProfileProvider";
import { useAuth } from "@/components/AuthProvider";
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
  const { t } = useLanguage();
  const s = t.settingsPage;
  const { user, supabase } = useAuth();
  const { profiles, activeProfile, setActive, addProfile, removeProfile } = useProfile();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(
    user?.user_metadata?.avatar_url ?? null
  );
  const [uploading, setUploading] = useState(false);
  const [avatarError, setAvatarError] = useState<string | null>(null);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    if (!file.type.startsWith("image/")) {
      setAvatarError("Please select an image file.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setAvatarError("Image must be under 2 MB.");
      return;
    }
    setAvatarError(null);
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `${user.id}/avatar.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(path, file, { upsert: true });
      if (uploadError) throw uploadError;
      const { data } = supabase.storage.from("avatars").getPublicUrl(path);
      const url = `${data.publicUrl}?t=${Date.now()}`;
      await supabase.auth.updateUser({ data: { avatar_url: url } });
      setAvatarUrl(url);
    } catch {
      setAvatarError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

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

      {/* Account / Profile photo card */}
      {user && (
        <div className="mb-6 overflow-hidden rounded-[2.5rem] border-4 border-white bg-white/80 shadow-[0_8px_20px_rgba(0,0,0,0.04)]">
          <div className="flex items-center gap-5 px-6 py-5">
            {/* Avatar */}
            <div className="relative shrink-0">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="Profile photo"
                  className="h-20 w-20 rounded-full object-cover shadow-md"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-deep-mint text-2xl font-black text-white shadow-md">
                  {(user.user_metadata?.full_name ?? user.email ?? "LB")
                    .split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase()}
                </div>
              )}
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-magic-orange text-white shadow-md hover:brightness-105 transition-all"
                aria-label="Change photo"
              >
                {uploading ? (
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <span className="material-symbols-outlined text-sm">photo_camera</span>
                )}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>

            {/* Name + email */}
            <div className="min-w-0">
              <p className="truncate text-base font-black text-text-main">
                {user.user_metadata?.full_name ?? "Your Account"}
              </p>
              {user.user_metadata?.username && (
                <p className="text-sm font-semibold text-deep-mint">
                  @{user.user_metadata.username}
                </p>
              )}
              <p className="truncate text-xs font-medium text-text-main/40">{user.email}</p>
              {avatarError && (
                <p className="mt-1 text-[11px] font-bold text-rose-500">{avatarError}</p>
              )}
            </div>
          </div>
          <div className="border-t border-pale-mint px-6 py-3">
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="text-xs font-bold text-deep-mint hover:underline disabled:opacity-40"
            >
              {uploading ? "Uploading…" : avatarUrl ? "Change profile photo" : "Add profile photo"}
            </button>
          </div>
        </div>
      )}

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
