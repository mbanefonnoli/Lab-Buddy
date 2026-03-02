import type { StoredResult } from "@/lib/storage";
import type { LabValueStatus } from "@/types/lab";

/* ── Color palette ────────────────────────────────── */
const TEAL: [number, number, number]     = [30, 100, 110];
const DARK: [number, number, number]     = [30,  40,  50];
const WHITE: [number, number, number]    = [255, 255, 255];
const LIGHT: [number, number, number]    = [248, 250, 252];
const MUTED: [number, number, number]    = [120, 135, 145];
const BORDER: [number, number, number]   = [220, 228, 235];

const STATUS_RGB: Record<LabValueStatus, [number, number, number]> = {
  normal:   [16, 185, 129],
  high:     [245, 158, 11],
  low:      [99,  102, 241],
  critical: [239,  68,  68],
};

const STATUS_LABEL: Record<LabValueStatus, string> = {
  normal: "Normal", high: "High", low: "Low", critical: "Critical",
};

export async function exportDoctorSummary(entry: StoredResult, patientName = ""): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "pt", format: "a4" });

  const PAGE_W = doc.internal.pageSize.getWidth();
  const PAGE_H = doc.internal.pageSize.getHeight();
  const ML = 45, MR = 45, MT = 0;
  const COL_W = PAGE_W - ML - MR;
  let y = MT;

  /* ── Helpers ────────────────────────────────────── */

  function setFill(rgb: [number, number, number]) { doc.setFillColor(...rgb); }
  function setDraw(rgb: [number, number, number]) { doc.setDrawColor(...rgb); }
  function setColor(rgb: [number, number, number]) { doc.setTextColor(...rgb); }

  function newPage() {
    doc.addPage();
    y = 0;
    drawHeader();
  }

  function ensureSpace(h: number) {
    if (y + h > PAGE_H - 55) newPage();
  }

  /* ── Page header ────────────────────────────────── */

  function drawHeader() {
    // Deep teal top stripe
    setFill(TEAL);
    doc.rect(0, 0, PAGE_W, 56, "F");

    // Left: title
    setColor(WHITE);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("MEDICAL LAB REPORT SUMMARY", ML, 24);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.text("Prepared by Lab Buddy · For clinical reference only · Not a substitute for original lab report", ML, 38);

    // Right: date
    const dateStr = new Date(entry.analyzedAt).toLocaleDateString(undefined, {
      year: "numeric", month: "long", day: "numeric",
    });
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.text(`Report Date: ${dateStr}`, PAGE_W - MR, 24, { align: "right" });
    doc.setFont("helvetica", "normal");
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, PAGE_W - MR, 36, { align: "right" });

    y = 70;
  }

  /* ── Footer ─────────────────────────────────────── */

  function drawFooter(page: number, total: number) {
    setFill(LIGHT);
    doc.rect(0, PAGE_H - 32, PAGE_W, 32, "F");
    setColor(MUTED);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.text(
      "CONFIDENTIAL — For healthcare provider use · Lab Buddy is an informational tool and not a certified medical device.",
      ML, PAGE_H - 16
    );
    doc.text(`Page ${page} / ${total}`, PAGE_W - MR, PAGE_H - 16, { align: "right" });
  }

  /* ── Patient block ───────────────────────────────── */

  drawHeader();

  // Patient info box
  setFill(LIGHT);
  setDraw(BORDER);
  doc.setLineWidth(0.5);
  doc.rect(ML, y, COL_W, 44, "FD");

  setColor(MUTED);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.text("PATIENT", ML + 12, y + 13);
  doc.text("COLLECTION DATE", ML + 200, y + 13);
  doc.text("REPORT ID", ML + 360, y + 13);

  setColor(DARK);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text(patientName || "Anonymous Patient", ML + 12, y + 30);
  doc.setFontSize(9);
  doc.text(
    new Date(entry.analyzedAt).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }),
    ML + 200, y + 30
  );
  doc.text(entry.id.slice(0, 12).toUpperCase(), ML + 360, y + 30);

  y += 56;

  /* ── Summary stats row ───────────────────────────── */

  const total = entry.result.values.length;
  const normal = entry.result.values.filter((v) => v.status === "normal").length;
  const flagged = total - normal;
  const critical = entry.result.values.filter((v) => v.status === "critical").length;

  const stats = [
    { label: "Total Tests",  value: String(total),   color: TEAL },
    { label: "Normal",       value: String(normal),  color: STATUS_RGB.normal },
    { label: "Flagged",      value: String(flagged), color: STATUS_RGB.high },
    { label: "Critical",     value: String(critical),color: STATUS_RGB.critical },
  ];

  const bw = (COL_W - 18) / 4;
  stats.forEach((s, i) => {
    const bx = ML + i * (bw + 6);
    setFill(LIGHT);
    setDraw(BORDER);
    doc.rect(bx, y, bw, 38, "FD");

    const [r, g, b] = s.color;
    doc.setTextColor(r, g, b);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(s.value, bx + bw / 2, y + 22, { align: "center" });

    setColor(MUTED);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.text(s.label, bx + bw / 2, y + 33, { align: "center" });
  });

  y += 50;

  /* ── Results table ───────────────────────────────── */

  // Section header
  setColor(DARK);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("LABORATORY RESULTS", ML, y);
  y += 4;
  setFill(TEAL);
  doc.rect(ML, y, COL_W, 1.5, "F");
  y += 10;

  // Column config
  const cols = { name: 0, result: 185, ref: 265, status: 380, flag: 420 };

  // Table header row
  setFill([235, 242, 245]);
  doc.rect(ML, y, COL_W, 18, "F");
  setColor(MUTED);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  [
    ["TEST NAME",       cols.name],
    ["RESULT / UNIT",   cols.result],
    ["REFERENCE RANGE", cols.ref],
    ["STATUS",          cols.status],
  ].forEach(([label, x]) =>
    doc.text(label as string, ML + (x as number) + 6, y + 12)
  );
  y += 18;

  // Sort: critical → high → low → normal
  const ORDER: Record<LabValueStatus, number> = { critical: 0, high: 1, low: 2, normal: 3 };
  const sorted = [...entry.result.values].sort(
    (a, b) => ORDER[a.status] - ORDER[b.status]
  );

  let rowAlt = false;
  for (const v of sorted) {
    const isNormal = v.status === "normal";

    // Explanation text height
    const expLines = doc.splitTextToSize(v.explanation || "", 160) as string[];
    const rowH = 18 + expLines.length * 9 + 6;

    ensureSpace(rowH);

    // Row background
    if (rowAlt) {
      setFill([248, 252, 254]);
      doc.rect(ML, y, COL_W, rowH, "F");
    }

    // Left accent bar for flagged rows
    if (!isNormal) {
      const [r, g, b] = STATUS_RGB[v.status];
      doc.setFillColor(r, g, b);
      doc.rect(ML, y, 3, rowH, "F");
    }

    // Test name
    setColor(DARK);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text(v.name, ML + cols.name + 8, y + 13);

    // Explanation (small, grey)
    setColor(MUTED);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    expLines.forEach((line: string, li: number) => {
      doc.text(line, ML + cols.name + 8, y + 22 + li * 9);
    });

    // Result
    setColor(DARK);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text(
      `${v.result}${v.unit ? " " + v.unit : ""}`,
      ML + cols.result + 6, y + 13
    );

    // Reference range
    setColor(MUTED);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text(v.referenceRange || "—", ML + cols.ref + 6, y + 13);

    // Status badge
    const [sr, sg, sb] = STATUS_RGB[v.status];
    doc.setFillColor(sr, sg, sb);
    doc.roundedRect(ML + cols.status + 4, y + 4, 52, 13, 3, 3, "F");
    setColor(WHITE);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.text(STATUS_LABEL[v.status], ML + cols.status + 30, y + 12, { align: "center" });

    // Row bottom border
    setDraw(BORDER);
    doc.setLineWidth(0.4);
    doc.line(ML, y + rowH, ML + COL_W, y + rowH);

    y += rowH;
    rowAlt = !rowAlt;
  }

  y += 10;

  /* ── Disclaimer ──────────────────────────────────── */

  ensureSpace(60);
  setFill([245, 240, 255]);
  setDraw([200, 185, 230]);
  const discText = entry.result.disclaimer ||
    "These results were processed by an AI tool (Lab Buddy) and are intended for informational purposes only. " +
    "This summary does not replace a certified lab report, a clinical assessment, or professional medical advice. " +
    "Please refer to the original laboratory report for authoritative values.";
  const discLines = doc.splitTextToSize(discText, COL_W - 24) as string[];
  const discH = 14 + discLines.length * 10 + 10;
  doc.rect(ML, y, COL_W, discH, "FD");
  setColor([100, 70, 160]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text("DISCLAIMER", ML + 12, y + 12);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  discLines.forEach((line: string, i: number) => doc.text(line, ML + 12, y + 22 + i * 10));

  /* ── Add footers ─────────────────────────────────── */

  const totalPages = (doc.internal as unknown as { getNumberOfPages(): number }).getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    drawFooter(p, totalPages);
  }

  const filename = `lab-buddy-doctor-summary-${new Date(entry.analyzedAt).toISOString().slice(0, 10)}.pdf`;
  doc.save(filename);
}
