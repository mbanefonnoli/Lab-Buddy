"use client";

import { useState } from "react";
import Link from "next/link";
import type { Biomarker } from "@/lib/biomarkers";
import { CATEGORY_META } from "@/lib/biomarkers";

interface SearchStrings {
  searchPlaceholder: string;
  moreResults: (n: number) => string;
  noResults: (q: string) => string;
}

export default function EncyclopediaSearch({
  biomarkers,
  searchStrings,
}: {
  biomarkers: Biomarker[];
  searchStrings: SearchStrings;
}) {
  const [query, setQuery] = useState("");

  const results = query.trim().length > 0
    ? biomarkers.filter((b) => {
        const q = query.toLowerCase();
        return (
          b.name.toLowerCase().includes(q) ||
          b.aliases.some((a) => a.toLowerCase().includes(q)) ||
          b.category.toLowerCase().includes(q)
        );
      })
    : [];

  return (
    <div className="mb-6 relative">
      {/* Input */}
      <div className="flex items-center gap-3 rounded-2xl border-2 border-white bg-white px-4 py-3 shadow-sm focus-within:border-deep-mint/40">
        <span className="material-symbols-outlined text-xl text-text-main/30">search</span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={searchStrings.searchPlaceholder}
          className="flex-1 bg-transparent text-sm font-bold text-text-main outline-none placeholder:text-text-main/30"
        />
        {query && (
          <button onClick={() => setQuery("")} className="text-text-main/30 hover:text-text-main/60">
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        )}
      </div>

      {/* Results dropdown */}
      {results.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-2xl bg-white shadow-xl">
          {results.slice(0, 8).map((b) => {
            const meta = CATEGORY_META[b.category];
            return (
              <Link
                key={b.slug}
                href={`/encyclopedia/${b.slug}`}
                onClick={() => setQuery("")}
                className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-pale-mint/40"
              >
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-white text-xs font-black"
                  style={{ background: meta.color }}
                >
                  {b.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-text-main">{b.name}</p>
                  <p className="text-[10px] font-medium text-text-main/40">{b.category}</p>
                </div>
                <span className="material-symbols-outlined text-base text-text-main/20">
                  chevron_right
                </span>
              </Link>
            );
          })}
          {results.length > 8 && (
            <p className="px-4 py-2 text-center text-[10px] font-bold text-text-main/40">
              {searchStrings.moreResults(results.length - 8)}
            </p>
          )}
        </div>
      )}

      {query.trim().length > 0 && results.length === 0 && (
        <div className="absolute left-0 right-0 top-full z-20 mt-2 rounded-2xl bg-white px-4 py-5 text-center shadow-xl">
          <p className="text-sm font-bold text-text-main/40">{searchStrings.noResults(query)}</p>
        </div>
      )}
    </div>
  );
}
