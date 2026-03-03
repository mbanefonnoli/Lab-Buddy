"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";

type Tab = "login" | "signup";

export default function LoginPage() {
  const { supabase } = useAuth();
  const router = useRouter();

  const [tab, setTab] = useState<Tab>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (tab === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError("Invalid login. Please check your email and password.");
        setLoading(false);
      } else {
        router.push("/app");
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/callback` },
      });
      if (error) {
        setError(error.message);
        setLoading(false);
      } else {
        setSuccess("Check your email for a confirmation link!");
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-full max-w-sm">
      {/* Logo */}
      <div className="mb-8 text-center">
        <Link href="/" className="inline-flex items-center gap-2.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-sm">
            <span
              className="material-symbols-outlined text-2xl text-deep-mint"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              medical_services
            </span>
          </div>
          <span className="text-2xl font-black text-text-main">Lab Buddy</span>
        </Link>
        <p className="mt-2 text-sm font-medium text-text-main/50">
          {tab === "login" ? "Welcome back!" : "Create your free account"}
        </p>
      </div>

      <div className="rounded-3xl bg-white p-8 shadow-sm">
        {/* Tab switcher */}
        <div className="mb-6 flex rounded-2xl bg-pale-mint p-1">
          {(["login", "signup"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); setError(null); setSuccess(null); }}
              className={`flex-1 rounded-xl py-2 text-sm font-black capitalize transition-all ${
                tab === t
                  ? "bg-white text-text-main shadow-sm"
                  : "text-text-main/40 hover:text-text-main"
              }`}
            >
              {t === "login" ? "Sign In" : "Sign Up"}
            </button>
          ))}
        </div>

        {/* Email form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="mb-1.5 block text-xs font-black uppercase tracking-widest text-text-main/40">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-2xl border border-pale-mint bg-[#F5F7FA] px-4 py-3 text-sm font-medium text-text-main outline-none transition-all focus:border-deep-mint focus:ring-2 focus:ring-deep-mint/20"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-black uppercase tracking-widest text-text-main/40">
              Password
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-2xl border border-pale-mint bg-[#F5F7FA] px-4 py-3 text-sm font-medium text-text-main outline-none transition-all focus:border-deep-mint focus:ring-2 focus:ring-deep-mint/20"
            />
          </div>

          {error && (
            <p className="rounded-2xl bg-rose-50 px-4 py-2.5 text-sm font-bold text-rose-500">
              {error}
            </p>
          )}
          {success && (
            <p className="rounded-2xl bg-emerald-50 px-4 py-2.5 text-sm font-bold text-emerald-600">
              {success}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-1 flex w-full items-center justify-center gap-2 rounded-2xl bg-magic-orange px-4 py-3 text-sm font-black text-white shadow-[0_4px_0_0_#D15C2A] transition-all hover:brightness-105 active:translate-y-0.5 active:shadow-none disabled:opacity-60"
          >
            {loading ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : tab === "login" ? (
              "Sign In"
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <p className="mt-4 text-center text-[11px] font-medium text-text-main/30">
          Not medical advice · Free forever
        </p>
      </div>

      <p className="mt-4 text-center text-xs font-medium text-text-main/40">
        <Link href="/app" className="hover:text-text-main underline">
          Continue as guest →
        </Link>
      </p>
    </div>
  );
}
