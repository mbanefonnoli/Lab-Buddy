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
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const switchTab = (t: Tab) => {
    setTab(t);
    setError(null);
    setSuccess(null);
    setConfirmPassword("");
    setFirstName("");
    setLastName("");
    setUsername("");
    setAgreedToTerms(false);
    setAgeConfirmed(false);
    setMarketingConsent(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (tab === "signup") {
      if (!firstName.trim() || !lastName.trim()) {
        setError("Please enter your first and last name.");
        return;
      }
      if (!username.trim()) {
        setError("Please choose a username.");
        return;
      }
      if (!/^[a-zA-Z0-9_]{3,20}$/.test(username.trim())) {
        setError("Username must be 3–20 characters: letters, numbers, or underscores only.");
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      if (password.length < 8) {
        setError("Password must be at least 8 characters.");
        return;
      }
      if (!agreedToTerms) {
        setError("You must agree to the Terms of Service and Privacy Policy.");
        return;
      }
      if (!ageConfirmed) {
        setError("You must confirm you are 16 years of age or older.");
        return;
      }
    }

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
        options: {
          emailRedirectTo: `${window.location.origin}/callback`,
          data: {
            first_name: firstName.trim(),
            last_name: lastName.trim(),
            username: username.trim().toLowerCase(),
            full_name: `${firstName.trim()} ${lastName.trim()}`,
            marketing_consent: marketingConsent,
          },
        },
      });
      if (error) {
        setError(error.message);
        setLoading(false);
      } else {
        setSuccess("Check your email for a confirmation link to activate your account.");
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
              onClick={() => switchTab(t)}
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

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Email */}
          <div>
            <label className="mb-1.5 block text-xs font-black uppercase tracking-widest text-text-main/40">
              Email
            </label>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-2xl border border-pale-mint bg-[#F5F7FA] px-4 py-3 text-sm font-medium text-text-main outline-none transition-all focus:border-deep-mint focus:ring-2 focus:ring-deep-mint/20"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-1.5 block text-xs font-black uppercase tracking-widest text-text-main/40">
              Password
            </label>
            <input
              type="password"
              required
              minLength={tab === "signup" ? 8 : 1}
              autoComplete={tab === "login" ? "current-password" : "new-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-2xl border border-pale-mint bg-[#F5F7FA] px-4 py-3 text-sm font-medium text-text-main outline-none transition-all focus:border-deep-mint focus:ring-2 focus:ring-deep-mint/20"
            />
            {tab === "signup" && (
              <p className="mt-1 text-[11px] text-text-main/40">Minimum 8 characters</p>
            )}
          </div>

          {/* Sign-up only fields */}
          {tab === "signup" && (
            <>
              {/* First + Last name */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block text-xs font-black uppercase tracking-widest text-text-main/40">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="given-name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Ada"
                    className="w-full rounded-2xl border border-pale-mint bg-[#F5F7FA] px-4 py-3 text-sm font-medium text-text-main outline-none transition-all focus:border-deep-mint focus:ring-2 focus:ring-deep-mint/20"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-black uppercase tracking-widest text-text-main/40">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="family-name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Lovelace"
                    className="w-full rounded-2xl border border-pale-mint bg-[#F5F7FA] px-4 py-3 text-sm font-medium text-text-main outline-none transition-all focus:border-deep-mint focus:ring-2 focus:ring-deep-mint/20"
                  />
                </div>
              </div>

              {/* Username */}
              <div>
                <label className="mb-1.5 block text-xs font-black uppercase tracking-widest text-text-main/40">
                  Username
                </label>
                <input
                  type="text"
                  required
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.replace(/\s/g, ""))}
                  placeholder="ada_lovelace"
                  className="w-full rounded-2xl border border-pale-mint bg-[#F5F7FA] px-4 py-3 text-sm font-medium text-text-main outline-none transition-all focus:border-deep-mint focus:ring-2 focus:ring-deep-mint/20"
                />
                <p className="mt-1 text-[11px] text-text-main/40">3–20 characters, letters, numbers, underscores</p>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="mb-1.5 block text-xs font-black uppercase tracking-widest text-text-main/40">
                  Confirm Password
                </label>
                <input
                  type="password"
                  required
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-pale-mint bg-[#F5F7FA] px-4 py-3 text-sm font-medium text-text-main outline-none transition-all focus:border-deep-mint focus:ring-2 focus:ring-deep-mint/20"
                />
              </div>

              {/* GDPR Consent block */}
              <div className="space-y-2.5 rounded-2xl border border-pale-mint bg-[#F5F7FA] p-4">
                {/* Terms + Privacy */}
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-0.5 h-4 w-4 flex-shrink-0 accent-deep-mint"
                  />
                  <span className="text-xs font-medium leading-snug text-text-main/60">
                    I have read and agree to the{" "}
                    <Link href="/terms" target="_blank" className="font-bold text-deep-mint hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy-policy" target="_blank" className="font-bold text-deep-mint hover:underline">
                      Privacy Policy
                    </Link>
                    . I understand that Lab Buddy processes my health data solely to
                    explain my lab results and does not share it with third parties.{" "}
                    <span className="text-rose-500">*</span>
                  </span>
                </label>

                {/* Age */}
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={ageConfirmed}
                    onChange={(e) => setAgeConfirmed(e.target.checked)}
                    className="mt-0.5 h-4 w-4 flex-shrink-0 accent-deep-mint"
                  />
                  <span className="text-xs font-medium leading-snug text-text-main/60">
                    I confirm I am 16 years of age or older.{" "}
                    <span className="text-rose-500">*</span>
                  </span>
                </label>

                {/* Marketing (optional) */}
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={marketingConsent}
                    onChange={(e) => setMarketingConsent(e.target.checked)}
                    className="mt-0.5 h-4 w-4 flex-shrink-0 accent-deep-mint"
                  />
                  <span className="text-xs font-medium leading-snug text-text-main/60">
                    Send me occasional product updates and health tips. (Optional — you
                    can unsubscribe at any time.)
                  </span>
                </label>

                <p className="text-[10px] text-text-main/30">
                  <span className="text-rose-500">*</span> Required
                </p>
              </div>
            </>
          )}

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
        <Link href="/app" className="underline hover:text-text-main">
          Continue as guest →
        </Link>
      </p>
    </div>
  );
}
