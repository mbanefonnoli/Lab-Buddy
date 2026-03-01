"use client";

import { useLanguage } from "@/components/LanguageProvider";

export default function ChatPage() {
  const { t } = useLanguage();
  const c = t.chatPage;

  return (
    <div className="mx-auto w-full max-w-lg pt-4">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-blob bg-white shadow-inner">
          <span className="material-symbols-outlined text-[52px] text-buddy-blue">
            chat_bubble
          </span>
        </div>
        <h1 className="text-3xl font-black tracking-tight text-text-main dark:text-zinc-100">
          {c.title}
        </h1>
        <p className="mt-1 text-base font-medium text-text-main/60 dark:text-zinc-400">
          {c.subtitle}
        </p>
      </div>

      {/* Coming soon banner */}
      <div className="mb-8 flex items-center gap-3 rounded-[2rem] border-4 border-white bg-buddy-blue/10 p-5 dark:bg-buddy-blue/5 dark:border-zinc-800">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-buddy-blue/20 text-buddy-blue">
          <span className="material-symbols-outlined text-xl">construction</span>
        </div>
        <p className="text-sm font-bold text-text-main/70 dark:text-zinc-400">
          {c.comingSoon}
        </p>
      </div>

      {/* FAQ cards */}
      <div className="flex flex-col gap-4">
        {c.faq.map((item, i) => (
          <div
            key={i}
            className="rounded-[2rem] border-4 border-white bg-white/80 p-6 shadow-[0_8px_20px_rgba(0,0,0,0.04)] dark:bg-zinc-900/60 dark:border-zinc-800"
          >
            <div className="mb-3 flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl bg-buddy-blue/10 text-buddy-blue">
                <span className="material-symbols-outlined text-lg">help</span>
              </div>
              <p className="text-base font-bold text-text-main dark:text-zinc-100">
                {item.q}
              </p>
            </div>
            <div className="ml-11 rounded-2xl bg-pale-mint/60 p-4 dark:bg-zinc-800/40">
              <p className="text-sm font-medium leading-relaxed text-text-main/70 dark:text-zinc-400">
                {item.a}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <p className="mt-8 text-center text-xs font-medium text-text-main/40 dark:text-zinc-600">
        {c.disclaimer}
      </p>
    </div>
  );
}
