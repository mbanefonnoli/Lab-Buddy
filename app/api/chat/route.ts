import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const BUDDY_SYSTEM = `You are Buddy, Lab Buddy's friendly and knowledgeable health assistant.
Your role is to help users understand their lab results in plain, simple language.

Guidelines:
- Be warm, friendly, and encouraging — like a knowledgeable friend, not a clinical textbook
- Explain things in simple everyday language, no jargon
- When a user's lab report context is provided, refer to their specific values
- ALWAYS remind users you are not a doctor and this is not medical advice
- Suggest consulting a healthcare professional for anything concerning
- Keep responses concise — 2–4 sentences unless the user asks for more detail
- Use bullet points sparingly; prefer natural conversational prose
- If asked something outside lab results / health education, gently redirect`;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
  reportContext?: string;
}

function getClient() {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) throw new Error("DEEPSEEK_API_KEY is not set.");
  return new OpenAI({ apiKey, baseURL: "https://api.deepseek.com" });
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const { messages, reportContext } = (body ?? {}) as ChatRequest;

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "messages array is required." }, { status: 400 });
  }

  // Cap history to last 20 messages
  const recent = messages.slice(-20);

  // Inject report context into system prompt if provided
  const systemContent = reportContext
    ? `${BUDDY_SYSTEM}\n\nThe user's latest lab report:\n${reportContext}`
    : BUDDY_SYSTEM;

  try {
    const client = getClient();
    const completion = await client.chat.completions.create({
      model: "deepseek-chat",
      max_tokens: 1024,
      messages: [
        { role: "system", content: systemContent },
        ...recent,
      ],
    });

    const reply = completion.choices[0]?.message?.content ?? "";
    return NextResponse.json({ reply });
  } catch (err) {
    const message = err instanceof Error ? err.message : "An unexpected error occurred.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
