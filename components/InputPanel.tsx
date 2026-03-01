"use client";

import { useRef, useState } from "react";
import { extractTextFromPdf } from "@/lib/pdf";
import { useLanguage } from "@/components/LanguageProvider";

const MAX_CHARS = 20_000;

interface InputPanelProps {
  onSubmit: (text: string) => void;
  isLoading: boolean;
}

export default function InputPanel({ onSubmit, isLoading }: InputPanelProps) {
  const [text, setText] = useState("");
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();
  const i = t.input;

  const charCount = text.length;
  const isOverLimit = charCount > MAX_CHARS;
  const isEmpty = text.trim().length === 0;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileError(null);

    try {
      const extracted =
        file.type === "application/pdf"
          ? await extractTextFromPdf(file)
          : await file.text();
      if (extracted) {
        setText(extracted);
      }
    } catch (err) {
      setFileError(i.fileError);
      console.error(err);
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSubmit = () => {
    if (!isEmpty && !isOverLimit && !isLoading) onSubmit(text);
  };

  const handleClear = () => {
    setText("");
    setFileError(null);
  };

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-8">
      {/* Upload Zone */}
      <div className="relative">
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.txt"
          id="file-upload"
          className="hidden"
          onChange={handleFileChange}
          disabled={isLoading}
        />

        <label
          htmlFor="file-upload"
          className="dashed-border relative mx-auto flex aspect-square w-full max-w-[320px] cursor-pointer flex-col items-center justify-center bg-white/40 p-8 text-center transition-transform active:scale-95 group"
        >
          <div className="relative mb-6">
            <div className="relative flex h-32 w-32 items-center justify-center overflow-visible rounded-blob bg-white shadow-inner">
              <span className="material-symbols-outlined text-soft-purple text-[80px]">
                {isLoading ? "sync" : (text ? "description" : "smart_toy")}
              </span>
              <div className="absolute -bottom-2 -right-2 flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-magic-orange text-white shadow-lg">
                <span className="material-symbols-outlined text-2xl">
                  {text ? "edit" : "search"}
                </span>
              </div>
            </div>
          </div>
          <h2 className="mb-1 text-2xl font-bold text-text-main">
            {text ? i.uploadTitleHasFile : i.uploadTitle}
          </h2>
          <p className="text-sm font-medium text-text-main/60">
            {text ? i.uploadSubtitleHasFile : i.uploadSubtitle}
          </p>

          <span className="material-symbols-outlined absolute left-8 top-8 text-xl text-deep-mint/40">
            auto_awesome
          </span>
          <span className="material-symbols-outlined absolute bottom-12 right-10 text-2xl text-deep-mint/40">
            colors_spark
          </span>
        </label>
      </div>

      {/* Manual Paste area */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-2">
          <label htmlFor="lab-text" className="text-sm font-bold text-text-main/50 uppercase tracking-widest">
            {i.orPasteText}
          </label>
          <span className={`text-xs font-bold ${isOverLimit ? "text-red-500" : "text-text-main/30"}`}>
            {charCount.toLocaleString()} / {MAX_CHARS.toLocaleString()}
          </span>
        </div>
        <textarea
          id="lab-text"
          className="w-full min-h-[120px] resize-none rounded-[2rem] border-4 border-white bg-white/60 p-5 text-sm font-medium text-text-main shadow-inner focus:border-deep-mint/50 focus:outline-none dark:bg-zinc-900/40 dark:border-zinc-800"
          placeholder={i.placeholder}
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isLoading}
        />
      </div>

      {fileError && (
        <p className="rounded-2xl border-2 border-red-100 bg-red-50 p-3 text-center text-sm font-bold text-red-500" role="alert">
          {fileError}
        </p>
      )}

      {/* Action Button */}
      <div className="space-y-4">
        <div className="flex items-center justify-center gap-2 font-semibold text-sm text-text-main/50">
          <span className="material-symbols-outlined text-lg">lock</span>
          <span>{i.privacyNote}</span>
        </div>

        <div className="flex gap-3">
          {text.length > 0 && (
            <button
              onClick={handleClear}
              disabled={isLoading}
              className="flex h-16 flex-1 items-center justify-center gap-2 rounded-3xl bg-white text-lg font-bold text-text-main shadow-[0_6px_0_0_#e2e8f0] active:translate-y-1 active:shadow-none transition-all dark:bg-zinc-800 dark:shadow-[0_6px_0_0_#1e293b] dark:text-zinc-300"
            >
              {i.clear}
            </button>
          )}
          <button
            onClick={handleSubmit}
            disabled={isEmpty || isOverLimit || isLoading}
            className="flex h-16 flex-[2] items-center justify-center gap-3 rounded-3xl bg-magic-orange text-xl font-bold text-white shadow-[0_8px_0_0_#D15C2A] transition-all hover:brightness-105 active:translate-y-1 active:shadow-none disabled:opacity-50 disabled:grayscale"
            aria-label="Analyze lab report"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined animate-spin">sync</span>
                {i.thinking}
              </span>
            ) : (
              <>
                <span>{i.analyze}</span>
                <span className="material-symbols-outlined">auto_fix_high</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
