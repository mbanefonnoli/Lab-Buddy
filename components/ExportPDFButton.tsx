"use client";

import { useState } from "react";
import type { StoredResult } from "@/lib/storage";

export default function ExportPDFButton({ entry }: { entry: StoredResult }) {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    try {
      const { exportToPDF } = await import("@/lib/pdfExport");
      await exportToPDF(entry);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={loading}
      className="flex items-center gap-1.5 rounded-xl bg-pale-mint px-4 py-2 text-xs font-black text-deep-mint transition-all hover:bg-deep-mint hover:text-white disabled:opacity-60"
    >
      {loading ? (
        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-deep-mint border-t-transparent" />
      ) : (
        <span className="material-symbols-outlined text-base">picture_as_pdf</span>
      )}
      {loading ? "Generating…" : "Export PDF"}
    </button>
  );
}
