"use client";

import { useState } from "react";
import type { StoredResult } from "@/lib/storage";
import { useLanguage } from "@/components/LanguageProvider";

export default function DoctorSummaryButton({
  entry,
  patientName = "",
}: {
  entry: StoredResult;
  patientName?: string;
}) {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    try {
      const { exportDoctorSummary } = await import("@/lib/doctorExport");
      await exportDoctorSummary(entry, patientName);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={loading}
      className="flex items-center gap-1.5 rounded-xl bg-[#EEF0FF] px-4 py-2 text-xs font-black text-[#4F46E5] transition-all hover:bg-[#4F46E5] hover:text-white disabled:opacity-60"
    >
      {loading ? (
        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#4F46E5] border-t-transparent" />
      ) : (
        <span className="material-symbols-outlined text-base">medical_information</span>
      )}
      {loading ? t.exportButtons.generating : t.exportButtons.doctorSummary}
    </button>
  );
}
