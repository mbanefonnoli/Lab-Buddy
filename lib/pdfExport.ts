import type { StoredResult } from "@/lib/storage";
import type { LabValueStatus } from "@/types/lab";

const STATUS_COLOR: Record<LabValueStatus, [number, number, number]> = {
  normal:   [16,  185, 129],   // emerald
  high:     [249, 115,  22],   // amber-orange
  low:      [59,  130, 246],   // blue
  critical: [239,  68,  68],   // red
};

const STATUS_LABEL: Record<LabValueStatus, string> = {
  normal: "Normal",
  high: "High",
  low: "Low",
  critical: "Critical",
};

const TEAL: [number, number, number] = [59, 173, 168];
const WHITE: [number, number, number] = [255, 255, 255];
const DARK: [number, number, number] = [61, 78, 91];
const LIGHT_BG: [number, number, number] = [245, 247, 250];
const MUTED: [number, number, number] = [150, 165, 175];

export async function exportToPDF(entry: StoredResult): Promise<void> {
  // Dynamic import keeps jsPDF out of the SSR bundle
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "pt", format: "a4" });

  const PAGE_W = doc.internal.pageSize.getWidth();
  const PAGE_H = doc.internal.pageSize.getHeight();
  const MARGIN = 40;
  const CONTENT_W = PAGE_W - MARGIN * 2;

  let y = 0;

  // ── Helper functions ──────────────────────────────────────────

  function addPage() {
    doc.addPage();
    y = 0;
    drawHeader();
  }

  function ensureSpace(needed: number) {
    if (y + needed > PAGE_H - 60) addPage();
  }

  function setColor(rgb: [number, number, number]) {
    doc.setTextColor(rgb[0], rgb[1], rgb[2]);
  }

  function setFill(rgb: [number, number, number]) {
    doc.setFillColor(rgb[0], rgb[1], rgb[2]);
  }

  function setDraw(rgb: [number, number, number]) {
    doc.setDrawColor(rgb[0], rgb[1], rgb[2]);
  }

  // Wraps text and returns the final y after rendering
  function addWrappedText(
    text: string,
    x: number,
    startY: number,
    maxW: number,
    lineHeight: number
  ): number {
    const lines = doc.splitTextToSize(text, maxW) as string[];
    lines.forEach((line: string, i: number) => {
      doc.text(line, x, startY + i * lineHeight);
    });
    return startY + lines.length * lineHeight;
  }

  // ── Header band ───────────────────────────────────────────────

  function drawHeader() {
    // Teal top bar
    setFill(TEAL);
    doc.rect(0, 0, PAGE_W, 52, "F");

    // Logo icon placeholder (circle)
    setFill(WHITE);
    doc.circle(MARGIN + 14, 26, 14, "F");
    setColor(TEAL);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("LB", MARGIN + 14, 30, { align: "center" });

    // App name
    setColor(WHITE);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Lab Buddy", MARGIN + 34, 31);

    // Tagline
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text("Not medical advice · For informational purposes only", MARGIN + 34, 43);

    // Date (right side)
    const dateStr = new Date(entry.analyzedAt).toLocaleDateString(undefined, {
      weekday: "long", year: "numeric", month: "long", day: "numeric",
    });
    doc.setFontSize(8);
    doc.text(dateStr, PAGE_W - MARGIN, 31, { align: "right" });

    y = 68;
  }

  // ── Footer ────────────────────────────────────────────────────

  function drawFooter(pageNum: number, totalPages: number) {
    setFill(LIGHT_BG);
    doc.rect(0, PAGE_H - 36, PAGE_W, 36, "F");
    setColor(MUTED);
    doc.setFontSize(7.5);
    doc.setFont("helvetica", "normal");
    doc.text(
      "Lab Buddy · Generated report · Not a substitute for professional medical advice",
      MARGIN,
      PAGE_H - 18
    );
    doc.text(`Page ${pageNum} of ${totalPages}`, PAGE_W - MARGIN, PAGE_H - 18, {
      align: "right",
    });
  }

  // ── First page ────────────────────────────────────────────────

  drawHeader();

  // Summary section title
  setColor(DARK);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Health Summary", MARGIN, y);
  y += 6;

  // Thin separator
  setDraw(TEAL);
  doc.setLineWidth(1.5);
  doc.line(MARGIN, y, MARGIN + 80, y);
  y += 14;

  // Stats row
  const total = entry.result.values.length;
  const normal = entry.result.values.filter((v) => v.status === "normal").length;
  const score = total === 0 ? 100 : Math.round((normal / total) * 100);

  const stats = [
    { label: "Total Values", value: String(total) },
    { label: "Normal", value: String(normal) },
    { label: "Flagged", value: String(total - normal) },
    { label: "Health Score", value: `${score}%` },
  ];

  const boxW = (CONTENT_W - 18) / 4;
  stats.forEach((s, i) => {
    const bx = MARGIN + i * (boxW + 6);
    setFill(LIGHT_BG);
    doc.roundedRect(bx, y, boxW, 44, 6, 6, "F");
    setColor(TEAL);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(s.value, bx + boxW / 2, y + 24, { align: "center" });
    setColor(MUTED);
    doc.setFontSize(7.5);
    doc.setFont("helvetica", "normal");
    doc.text(s.label, bx + boxW / 2, y + 37, { align: "center" });
  });
  y += 56;

  // Section title
  setColor(DARK);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Lab Values", MARGIN, y);
  y += 4;
  setDraw([230, 235, 240]);
  doc.setLineWidth(0.5);
  doc.line(MARGIN, y, PAGE_W - MARGIN, y);
  y += 12;

  // ── Value cards ───────────────────────────────────────────────

  const sorted = [...entry.result.values].sort((a, b) => {
    const order = { critical: 0, high: 1, low: 2, normal: 3 };
    return order[a.status] - order[b.status];
  });

  for (const v of sorted) {
    const color = STATUS_COLOR[v.status];
    const explanationLines = doc.splitTextToSize(v.explanation || "", CONTENT_W - 20) as string[];
    const cardH = 22 + 14 + explanationLines.length * 11 + 12;

    ensureSpace(cardH + 8);

    // Card background
    setFill(LIGHT_BG);
    doc.roundedRect(MARGIN, y, CONTENT_W, cardH, 7, 7, "F");

    // Colored left accent bar
    setFill(color);
    doc.roundedRect(MARGIN, y, 4, cardH, 2, 2, "F");

    // Test name
    setColor(DARK);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text(v.name, MARGIN + 14, y + 16);

    // Status badge (right)
    const badgeW = 48;
    const [br, bg, bb] = color;
    doc.setFillColor(br, bg, bb);
    doc.roundedRect(PAGE_W - MARGIN - badgeW, y + 7, badgeW, 15, 4, 4, "F");
    setColor(WHITE);
    doc.setFontSize(7.5);
    doc.setFont("helvetica", "bold");
    doc.text(STATUS_LABEL[v.status], PAGE_W - MARGIN - badgeW / 2, y + 17, { align: "center" });

    // Result + unit
    setColor(DARK);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text(`${v.result}${v.unit ? " " + v.unit : ""}`, MARGIN + 14, y + 28);

    // Reference range
    if (v.referenceRange) {
      setColor(MUTED);
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.text(`Ref: ${v.referenceRange}`, MARGIN + 80, y + 28);
    }

    // Explanation
    setColor([100, 115, 125]);
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "normal");
    explanationLines.forEach((line: string, i: number) => {
      doc.text(line, MARGIN + 14, y + 40 + i * 11);
    });

    y += cardH + 8;
  }

  // ── Disclaimer ────────────────────────────────────────────────

  if (entry.result.disclaimer) {
    ensureSpace(60);
    y += 8;
    setFill([245, 240, 255]);
    const discLines = doc.splitTextToSize(entry.result.disclaimer, CONTENT_W - 24) as string[];
    const discH = 16 + discLines.length * 10 + 12;
    doc.roundedRect(MARGIN, y, CONTENT_W, discH, 7, 7, "F");
    setColor([120, 90, 160]);
    doc.setFontSize(7.5);
    doc.setFont("helvetica", "bold");
    doc.text("DISCLAIMER", MARGIN + 12, y + 12);
    setColor([100, 80, 140]);
    doc.setFont("helvetica", "normal");
    discLines.forEach((line: string, i: number) => {
      doc.text(line, MARGIN + 12, y + 22 + i * 10);
    });
    y += discH + 10;
  }

  // ── Add footers to all pages ──────────────────────────────────

  const totalPages = (doc.internal as unknown as { getNumberOfPages(): number }).getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    drawFooter(p, totalPages);
  }

  // ── Download ──────────────────────────────────────────────────

  const filename = `lab-buddy-${new Date(entry.analyzedAt).toISOString().slice(0, 10)}.pdf`;
  doc.save(filename);
}
