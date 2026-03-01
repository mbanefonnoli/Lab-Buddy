"use client";

import { useRef, useState } from "react";
import InputPanel from "@/components/InputPanel";
import ResultsPanel from "@/components/ResultsPanel";
import { useLanguage } from "@/components/LanguageProvider";
import { saveToHistory } from "@/lib/storage";
import type { ExplainResponse } from "@/types/lab";

type Status = "idle" | "loading" | "success" | "error";

export default function Home() {
  const [status, setStatus] = useState<Status>("idle");
  const [results, setResults] = useState<ExplainResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lastText, setLastText] = useState("");
  const resultsRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const analyze = async (text: string) => {
    setLastText(text);
    setStatus("loading");
    setResults(null);
    setErrorMessage(null);

    setTimeout(
      () => resultsRef.current?.scrollIntoView({ behavior: "smooth" }),
      100
    );

    try {
      const res = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Server error.");
      }

      setResults(data);
      setStatus("success");
      saveToHistory(data);
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
      setStatus("error");
    }
  };

  const handleStartOver = () => {
    setStatus("idle");
    setResults(null);
    setErrorMessage(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      {/* Hero text */}
      <div className="mb-6 mt-2 text-center">
        <h1 className="mb-2 text-3xl font-bold text-text-main dark:text-zinc-50">
          {t.home.title}
        </h1>
        <p className="font-medium text-text-main/70 dark:text-zinc-400">
          {t.home.subtitle}
        </p>
      </div>

      {/* Input / Results */}
      <section>
        {status === "idle" || (status === "loading" && !results) ? (
          <InputPanel onSubmit={analyze} isLoading={status === "loading"} />
        ) : (
          <div ref={resultsRef} className="animate-in fade-in zoom-in-95 duration-500">
            <div className="mb-8 flex justify-center">
              <button
                onClick={handleStartOver}
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-black uppercase tracking-widest text-text-main shadow-sm transition-all hover:bg-pale-mint dark:bg-zinc-900"
              >
                <span className="material-symbols-outlined text-lg transition-transform group-hover:-translate-x-1">
                  arrow_back
                </span>
                {t.home.newAnalysis}
              </button>
            </div>
            <ResultsPanel
              status={status === "loading" ? "loading" : status === "error" ? "error" : "success"}
              results={results}
              errorMessage={errorMessage}
              onRetry={() => analyze(lastText)}
            />
          </div>
        )}
      </section>
    </div>
  );
}
