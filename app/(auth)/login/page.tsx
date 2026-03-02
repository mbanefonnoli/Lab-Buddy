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
        setError(error.message);
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

  const handleGoogle = async () => {
    setError(null);
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/callback` },
    });
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

        {/* Google OAuth */}
        <button
          onClick={handleGoogle}
          className="mb-4 flex w-full items-center justify-center gap-3 rounded-2xl border border-pale-mint bg-white px-4 py-3 text-sm font-bold text-text-main shadow-sm transition-all hover:bg-pale-mint"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
            <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
            <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        <div className="mb-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-pale-mint" />
          <span className="text-xs font-bold text-text-main/30">or</span>
          <div className="h-px flex-1 bg-pale-mint" />
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
