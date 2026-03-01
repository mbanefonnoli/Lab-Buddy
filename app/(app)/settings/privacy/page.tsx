import Link from "next/link";

export const metadata = { title: "Data & Privacy — Lab Buddy" };

export default function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-lg pt-4 pb-10">
      {/* Back link */}
      <div className="mb-6">
        <Link
          href="/settings"
          className="inline-flex items-center gap-2 text-sm font-bold text-text-main/50 hover:text-text-main transition-colors"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          Back to Settings
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-blob bg-white shadow-inner">
          <span className="material-symbols-outlined text-[52px] text-deep-mint">
            shield_with_heart
          </span>
        </div>
        <h1 className="text-3xl font-black tracking-tight text-text-main dark:text-zinc-100">
          Data &amp; Privacy
        </h1>
        <p className="mt-1 text-base font-medium text-text-main/60 dark:text-zinc-400">
          Your privacy is our priority.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* What we collect */}
        <section className="rounded-[2.5rem] border-4 border-white bg-white/80 p-7 shadow-[0_8px_20px_rgba(0,0,0,0.04)] dark:bg-zinc-900/60 dark:border-zinc-800">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-pale-mint dark:bg-zinc-800">
              <span className="material-symbols-outlined text-xl text-deep-mint">
                database
              </span>
            </div>
            <h2 className="text-lg font-black text-text-main dark:text-zinc-100">
              What We Collect
            </h2>
          </div>
          <p className="text-sm font-medium leading-relaxed text-text-main/70 dark:text-zinc-400">
            Lab Buddy <strong>does not store your lab data</strong>. When you
            paste or upload a report, the text is sent directly to our AI
            service for analysis and is never saved to any database or
            persistent storage.
          </p>
          <ul className="mt-4 space-y-2 text-sm font-medium text-text-main/70 dark:text-zinc-400">
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-base text-deep-mint mt-0.5">
                check_circle
              </span>
              <span>
                Your language preference is saved locally on your device only.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-base text-deep-mint mt-0.5">
                check_circle
              </span>
              <span>
                No account, login, or personal information is required.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-base text-deep-mint mt-0.5">
                check_circle
              </span>
              <span>No cookies are used for tracking or advertising.</span>
            </li>
          </ul>
        </section>

        {/* AI processing */}
        <section className="rounded-[2.5rem] border-4 border-white bg-white/80 p-7 shadow-[0_8px_20px_rgba(0,0,0,0.04)] dark:bg-zinc-900/60 dark:border-zinc-800">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-pale-mint dark:bg-zinc-800">
              <span className="material-symbols-outlined text-xl text-magic-orange">
                smart_toy
              </span>
            </div>
            <h2 className="text-lg font-black text-text-main dark:text-zinc-100">
              How AI Processing Works
            </h2>
          </div>
          <p className="text-sm font-medium leading-relaxed text-text-main/70 dark:text-zinc-400">
            Your lab text is sent to{" "}
            <strong>DeepSeek</strong>, a third-party AI service, to generate
            plain-language explanations. This transmission is encrypted via
            HTTPS. DeepSeek&apos;s own privacy policy governs how they handle
            API requests.
          </p>
          <p className="mt-3 text-sm font-medium leading-relaxed text-text-main/70 dark:text-zinc-400">
            We recommend <strong>not including</strong> personally identifiable
            information (name, date of birth, ID numbers) in the text you
            submit — those details are not needed for Lab Buddy to explain your
            lab values.
          </p>
        </section>

        {/* Medical disclaimer */}
        <section className="rounded-[2.5rem] border-4 border-white bg-soft-purple/5 p-7 shadow-[0_8px_20px_rgba(0,0,0,0.04)] dark:bg-zinc-900/60 dark:border-zinc-800">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-soft-purple/10 dark:bg-zinc-800">
              <span className="material-symbols-outlined text-xl text-soft-purple">
                info
              </span>
            </div>
            <h2 className="text-lg font-black text-text-main dark:text-zinc-100">
              Medical Disclaimer
            </h2>
          </div>
          <p className="text-sm font-medium leading-relaxed text-text-main/70 dark:text-zinc-400">
            Lab Buddy is an educational tool only. The explanations provided
            are <strong>not medical advice</strong>, diagnoses, or treatment
            recommendations. Always consult a qualified healthcare professional
            regarding your health.
          </p>
        </section>

        {/* Your rights */}
        <section className="rounded-[2.5rem] border-4 border-white bg-white/80 p-7 shadow-[0_8px_20px_rgba(0,0,0,0.04)] dark:bg-zinc-900/60 dark:border-zinc-800">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-pale-mint dark:bg-zinc-800">
              <span className="material-symbols-outlined text-xl text-buddy-blue">
                gavel
              </span>
            </div>
            <h2 className="text-lg font-black text-text-main dark:text-zinc-100">
              Your Rights
            </h2>
          </div>
          <p className="text-sm font-medium leading-relaxed text-text-main/70 dark:text-zinc-400">
            Because we do not collect or store personal data, there is no data
            to request, correct, or delete. Your app preferences (language,
            notification setting) exist only in your browser&apos;s local
            storage and can be cleared at any time through your browser
            settings.
          </p>
        </section>

        {/* Contact */}
        <section className="rounded-[2.5rem] border-4 border-white bg-white/80 p-7 shadow-[0_8px_20px_rgba(0,0,0,0.04)] dark:bg-zinc-900/60 dark:border-zinc-800">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-pale-mint dark:bg-zinc-800">
              <span className="material-symbols-outlined text-xl text-buddy-blue">
                mail
              </span>
            </div>
            <h2 className="text-lg font-black text-text-main dark:text-zinc-100">
              Questions?
            </h2>
          </div>
          <p className="text-sm font-medium leading-relaxed text-text-main/70 dark:text-zinc-400">
            If you have questions about this privacy policy or how Lab Buddy
            handles data, please contact us at{" "}
            <strong>privacy@labbuddy.app</strong>.
          </p>
        </section>

        <p className="text-center text-xs font-medium text-text-main/40 dark:text-zinc-600">
          Last updated: February 2026
        </p>
      </div>
    </div>
  );
}
