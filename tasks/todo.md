# Lab Result Explainer — Build Plan

## Overview
A web app where users paste or upload a medical lab report, and Claude explains each result in plain English, flags abnormal values, and provides helpful context — with a clear disclaimer that it is not medical advice.

---

## Tech Stack
| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 14 (App Router, TypeScript) | File-based routing, API routes, SSR |
| Styling | Tailwind CSS | Utility-first, fast iteration |
| AI | Anthropic Claude API (`claude-sonnet-4-6`) | Structured JSON output, reasoning |
| PDF parsing | `pdfjs-dist` (browser) | No server-side binary deps |
| State | React `useState` / `useReducer` | Simple enough; no external store needed |
| Deployment | Vercel (or local dev only) | Zero-config Next.js hosting |

---

## Stage 1 — Project Scaffold
Goal: blank Next.js app boots, Claude SDK installed, env wired up.

- [ ] `npx create-next-app@latest lab-result-explainer --typescript --tailwind --app --eslint`
- [ ] Install Anthropic SDK: `npm install @anthropic-ai/sdk`
- [ ] Install PDF parser: `npm install pdfjs-dist`
- [ ] Create `.env.local` with `ANTHROPIC_API_KEY=` placeholder
- [ ] Add `.env.local` to `.gitignore`
- [ ] Create folder structure:
  ```
  app/
    api/explain/route.ts   ← API route
    page.tsx               ← main UI
  components/
    InputPanel.tsx
    ResultsPanel.tsx
    LabValueCard.tsx
  lib/
    claude.ts              ← thin Anthropic client wrapper
    prompts.ts             ← system & user prompt builders
    pdf.ts                 ← PDF → text utility
  types/
    lab.ts                 ← shared TypeScript types
  ```
- [ ] Confirm `npm run dev` starts with no errors

---

## Stage 2 — TypeScript Types
Goal: shared data contracts defined before any implementation.

File: `types/lab.ts`

- [ ] `LabValueStatus`: `"normal" | "low" | "high" | "critical"`
- [ ] `LabValue`: `{ name, result, unit, referenceRange, status, explanation }`
- [ ] `ExplainResponse`: `{ values: LabValue[], disclaimer: string, rawInput: string }`
- [ ] `LabInput`: `{ text: string }` (what the API route receives)

---

## Stage 3 — AI Processing Layer
Goal: `/api/explain` accepts raw lab text and returns structured `ExplainResponse`.

- [ ] Write system prompt in `lib/prompts.ts`
  - Instruct Claude to extract every lab value into a JSON array
  - For each value: name, result, unit, reference range, status flag, plain-English explanation (2–4 sentences, no jargon)
  - Include a `disclaimer` field in the root object
  - Explicitly forbid diagnostic conclusions or treatment advice
- [ ] Write `lib/claude.ts`
  - Instantiate `Anthropic` client from env
  - Export `explainLabResults(text: string): Promise<ExplainResponse>`
  - Use `response_format` / JSON mode or parse Claude's JSON block reliably
- [ ] Write `/api/explain/route.ts`
  - `POST` handler only
  - Validate body has non-empty `text` field (max 20 000 chars)
  - Call `explainLabResults`; return JSON
  - Return typed error responses (`400`, `500`) with `{ error: string }`
- [ ] Manual test: `curl -X POST /api/explain -d '{"text":"..."}'` with a sample report

---

## Stage 4 — Input Layer (UI)
Goal: user can paste text or upload a PDF; "Analyze" is gated on non-empty input.

- [ ] `components/InputPanel.tsx`
  - Textarea for paste (placeholder: "Paste your lab report here…")
  - File picker button accepting `.pdf` and `.txt`
  - On PDF select → call `lib/pdf.ts` to extract text into textarea
  - Character count display + 20 000-char soft warning
  - "Analyze" button: disabled when empty or loading
  - "Clear" button
- [ ] `lib/pdf.ts`
  - Use `pdfjs-dist` to extract plain text from an `ArrayBuffer`
  - Return `string`; throw on parse failure
- [ ] Wire `InputPanel` into `app/page.tsx` with local state

---

## Stage 5 — Results Display (UI)
Goal: structured results render clearly with abnormal values prominent.

- [ ] `components/LabValueCard.tsx`
  - Show: name, result + unit, reference range, status badge, explanation
  - Status badge colors: Normal = green, Low = yellow, High = orange, Critical = red
  - Expandable explanation (collapsed by default on mobile)
  - Copy-to-clipboard button on explanation text
- [ ] `components/ResultsPanel.tsx`
  - Summary header: "X values analyzed — Y flagged"
  - Render `LabValueCard` list sorted: critical → high → low → normal
  - Disclaimer footer (verbatim from API response)
  - Skeleton loader while API call is in-flight
- [ ] Wire `ResultsPanel` into `app/page.tsx`

---

## Stage 6 — Wiring & State
Goal: full end-to-end flow works: input → API → results.

- [ ] In `app/page.tsx`, manage:
  - `inputText: string`
  - `status: "idle" | "loading" | "success" | "error"`
  - `results: ExplainResponse | null`
  - `errorMessage: string | null`
- [ ] On submit: POST to `/api/explain`, set status, handle response
- [ ] Show spinner / progress message during load
- [ ] Show user-friendly error + retry button on failure
- [ ] "Start Over" resets all state

---

## Stage 7 — UX Polish
Goal: usable on mobile, accessible, visually coherent.

- [ ] Mobile-responsive layout (single-column on small screens, side-by-side on md+)
- [ ] Accessible markup: `aria-label`, `role`, keyboard-navigable cards
- [ ] Page `<title>` and `<meta description>`
- [ ] Favicon (simple lab flask SVG or emoji)
- [ ] Dark mode (`dark:` Tailwind classes, respects `prefers-color-scheme`)
- [ ] Smooth scroll to results after analysis completes

---

## Stage 8 — Build Verification
Goal: ship-ready, no type errors, no lint errors.

- [ ] `npm run build` passes with zero errors
- [ ] `npm run lint` passes
- [ ] Test with 3 different real-world lab report formats (blood panel, lipid panel, thyroid panel)
- [ ] Verify `.env.local` is never committed
- [ ] Write brief `README.md`: setup steps, env vars, running locally

---

## Post-MVP Enhancements (out of scope for initial build)
- Image / photo upload + Claude Vision OCR
- Export explained results as PDF
- `localStorage` history of past analyses
- Shareable link (base64-encoded results in URL query param)
- Multi-language output selection

---

## Definition of Done (MVP)
1. User can paste lab text **or** upload a PDF
2. App calls Claude and returns structured, typed explanations
3. Abnormal values are visually prominent and easy to find
4. Disclaimer is always visible with results
5. Works on desktop and mobile
6. No hardcoded secrets; all keys via `.env.local`
7. `npm run build` + `npm run lint` both pass clean
