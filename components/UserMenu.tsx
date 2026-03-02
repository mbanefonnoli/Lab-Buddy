"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";

export default function UserMenu() {
  const { user, signOut, isLoading } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (isLoading) {
    return (
      <div className="h-9 w-9 animate-pulse rounded-full bg-pale-mint" />
    );
  }

  // Guest: show Sign In button
  if (!user) {
    return (
      <Link
        href="/login"
        className="flex h-9 items-center gap-1.5 rounded-full bg-white px-4 shadow-sm text-sm font-black text-text-main hover:bg-pale-mint transition-colors"
      >
        <span className="material-symbols-outlined text-deep-mint text-lg leading-none">
          login
        </span>
        <span className="hidden sm:inline">Sign In</span>
      </Link>
    );
  }

  // Logged in: avatar chip + dropdown
  const initials = user.email
    ? user.email.slice(0, 2).toUpperCase()
    : "LB";

  const handleSignOut = async () => {
    setOpen(false);
    await signOut();
    router.push("/");
  };

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-deep-mint text-sm font-black text-white shadow-sm hover:brightness-105 transition-all"
        aria-label="User menu"
      >
        {initials}
      </button>

      {open && (
        <div className="absolute right-0 top-11 z-50 min-w-[200px] rounded-2xl bg-white p-1.5 shadow-xl ring-1 ring-black/5">
          {/* Email */}
          <div className="px-3 py-2 border-b border-pale-mint mb-1">
            <p className="text-[11px] font-bold text-text-main/40">Signed in as</p>
            <p className="text-sm font-bold text-text-main truncate max-w-[180px]">
              {user.email}
            </p>
          </div>

          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-bold text-text-main hover:bg-pale-mint transition-colors"
          >
            <span className="material-symbols-outlined text-lg text-deep-mint" style={{ fontVariationSettings: "'FILL' 1" }}>
              dashboard
            </span>
            Dashboard
          </Link>

          <Link
            href="/settings"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-bold text-text-main hover:bg-pale-mint transition-colors"
          >
            <span className="material-symbols-outlined text-lg text-text-main/50" style={{ fontVariationSettings: "'FILL' 1" }}>
              settings
            </span>
            Settings
          </Link>

          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-bold text-rose-500 hover:bg-rose-50 transition-colors mt-1 border-t border-pale-mint pt-2"
          >
            <span className="material-symbols-outlined text-lg">logout</span>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
