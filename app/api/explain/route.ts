import { NextRequest, NextResponse } from "next/server";
import { explainLabResults } from "@/lib/claude";
import type { LabInput, ApiError } from "@/types/lab";

const MAX_CHARS = 20_000;

export async function POST(req: NextRequest): Promise<NextResponse> {
  // Parse body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json<ApiError>(
      { error: "Invalid JSON in request body." },
      { status: 400 }
    );
  }

  // Validate input
  const { text } = (body ?? {}) as LabInput;

  if (typeof text !== "string" || text.trim().length === 0) {
    return NextResponse.json<ApiError>(
      { error: 'Request body must include a non-empty "text" field.' },
      { status: 400 }
    );
  }

  if (text.length > MAX_CHARS) {
    return NextResponse.json<ApiError>(
      {
        error: `Lab text must be ${MAX_CHARS.toLocaleString()} characters or fewer.`,
      },
      { status: 400 }
    );
  }

  // Call Claude
  try {
    const result = await explainLabResults(text);
    return NextResponse.json(result);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "An unexpected error occurred.";
    return NextResponse.json<ApiError>({ error: message }, { status: 500 });
  }
}
