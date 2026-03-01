import OpenAI from "openai";
import type { ExplainResponse } from "@/types/lab";
import { SYSTEM_PROMPT, buildUserMessage } from "@/lib/prompts";

function getClient(): OpenAI {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    throw new Error(
      "DEEPSEEK_API_KEY is not set. Add it to .env.local and restart the dev server."
    );
  }
  return new OpenAI({
    apiKey,
    baseURL: "https://api.deepseek.com",
  });
}

export async function explainLabResults(
  text: string
): Promise<ExplainResponse> {
  const client = getClient();

  const completion = await client.chat.completions.create({
    model: "deepseek-chat",
    max_tokens: 4096,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: buildUserMessage(text) },
    ],
    response_format: { type: "json_object" },
  });

  const raw = completion.choices[0]?.message?.content;
  if (!raw) {
    throw new Error("Empty response from DeepSeek.");
  }

  // Strip accidental markdown code fences just in case
  const jsonText = raw
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();

  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonText);
  } catch {
    throw new Error("DeepSeek returned a non-JSON response. Please try again.");
  }

  if (
    typeof parsed !== "object" ||
    parsed === null ||
    !Array.isArray((parsed as { values?: unknown }).values)
  ) {
    throw new Error("DeepSeek returned an unexpected JSON shape.");
  }

  return parsed as ExplainResponse;
}
