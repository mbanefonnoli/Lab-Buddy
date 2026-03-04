import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy – Lab Buddy",
  description: "How Lab Buddy collects, uses, and protects your personal data.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16 text-text-main">
      <Link href="/" className="mb-8 inline-flex items-center gap-1.5 text-sm font-bold text-deep-mint hover:underline">
        ← Back to Lab Buddy
      </Link>

      <h1 className="mb-2 text-3xl font-black">Privacy Policy</h1>
      <p className="mb-10 text-sm text-text-main/40">Last updated: March 2026</p>

      <div className="space-y-8 text-sm leading-relaxed text-text-main/70">

        <section>
          <h2 className="mb-2 text-base font-black text-text-main">1. Who we are</h2>
          <p>
            Lab Buddy (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is a web application that
            helps you understand medical lab results in plain language. We are the data controller for
            the personal data you provide when using this service.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-black text-text-main">2. What data we collect</h2>
          <ul className="list-disc space-y-1 pl-5">
            <li><strong>Account data:</strong> your email address and encrypted password when you create an account.</li>
            <li><strong>Lab report data:</strong> text or PDF content you submit for analysis. This is processed transiently to generate an explanation and, if you are signed in, saved to your secure account.</li>
            <li><strong>Usage data:</strong> standard server logs (IP address, browser type, pages visited) used solely for security and performance monitoring.</li>
          </ul>
          <p className="mt-2">We do not collect your name, date of birth, address, or payment information.</p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-black text-text-main">3. Legal basis for processing (GDPR)</h2>
          <ul className="list-disc space-y-1 pl-5">
            <li><strong>Contract performance</strong> – to provide the core analysis service you signed up for.</li>
            <li><strong>Consent</strong> – for optional marketing communications, which you may withdraw at any time.</li>
            <li><strong>Legitimate interests</strong> – for fraud prevention and service security.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-base font-black text-text-main">4. How we use your data</h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>To generate plain-English explanations of your lab results.</li>
            <li>To store your analysis history so you can review it later (signed-in users only).</li>
            <li>To send you transactional emails (account confirmation, password reset).</li>
            <li>To send you product updates, if you opted in during sign-up.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-base font-black text-text-main">5. Third-party services</h2>
          <ul className="list-disc space-y-1 pl-5">
            <li><strong>Supabase</strong> – authentication and database (EU data residency available). <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-deep-mint hover:underline">Supabase Privacy Policy</a></li>
            <li><strong>Vercel</strong> – hosting and CDN. <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-deep-mint hover:underline">Vercel Privacy Policy</a></li>
            <li><strong>DeepSeek / AI provider</strong> – lab report text is sent to an AI model API to generate explanations. No data is retained by the provider beyond the immediate request.</li>
          </ul>
          <p className="mt-2">We do not sell your data to any third party.</p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-black text-text-main">6. Data retention</h2>
          <p>
            Your account and saved reports are retained for as long as your account is active.
            If you delete your account, all associated data is permanently deleted within 30 days.
            Guest session data is not stored on our servers.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-black text-text-main">7. Your rights (GDPR / CCPA)</h2>
          <p className="mb-2">Depending on your location, you have the right to:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Access a copy of your personal data.</li>
            <li>Rectify inaccurate data.</li>
            <li>Request erasure (&ldquo;right to be forgotten&rdquo;).</li>
            <li>Restrict or object to processing.</li>
            <li>Data portability (receive your data in a machine-readable format).</li>
            <li>Withdraw consent for marketing at any time.</li>
          </ul>
          <p className="mt-2">
            To exercise any of these rights, contact us at{" "}
            <a href="mailto:privacy@labbuddy.app" className="text-deep-mint hover:underline">
              privacy@labbuddy.app
            </a>.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-black text-text-main">8. Cookies</h2>
          <p>
            We use only strictly necessary cookies (session authentication). We do not use
            advertising or tracking cookies. No cookie consent banner is required for
            strictly necessary cookies under the ePrivacy Directive.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-black text-text-main">9. Children&apos;s privacy</h2>
          <p>
            Lab Buddy is not directed at children under 16. We do not knowingly collect data
            from users under 16. If you believe a minor has created an account, please contact
            us and we will delete the account promptly.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-black text-text-main">10. Changes to this policy</h2>
          <p>
            We may update this policy periodically. Material changes will be communicated
            by email or by a prominent notice in the app at least 14 days before taking effect.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-black text-text-main">11. Contact</h2>
          <p>
            For privacy-related questions:{" "}
            <a href="mailto:privacy@labbuddy.app" className="text-deep-mint hover:underline">
              privacy@labbuddy.app
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
