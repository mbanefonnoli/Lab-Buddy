/** Severity level for a single lab value. */
export type LabValueStatus = "normal" | "low" | "high" | "critical";

/** One extracted and explained lab value. */
export interface LabValue {
  /** Human-readable test name, e.g. "Hemoglobin" */
  name: string;
  /** Raw result as a string, e.g. "13.2" */
  result: string;
  /** Unit of measurement, e.g. "g/dL" — empty string if none */
  unit: string;
  /** Reference range string, e.g. "12.0–16.0 g/dL" — empty string if unknown */
  referenceRange: string;
  /** Whether the value is within normal limits */
  status: LabValueStatus;
  /** Plain-English explanation, 2–4 sentences, no medical jargon */
  explanation: string;
}

/** Full structured response from the /api/explain route. */
export interface ExplainResponse {
  values: LabValue[];
  /** Boilerplate disclaimer returned verbatim from Claude */
  disclaimer: string;
}

/** Request body accepted by POST /api/explain. */
export interface LabInput {
  /** Raw lab report text (max 20 000 characters) */
  text: string;
}

/** Error shape returned by /api/explain on 4xx / 5xx. */
export interface ApiError {
  error: string;
}
