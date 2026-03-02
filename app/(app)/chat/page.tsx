"use client";

import { useState, useRef, useEffect } from "react";
import { useHistory } from "@/lib/useHistory";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED = [
  "What does it mean if my Glucose is high?",
  "Can you explain what Hemoglobin measures?",
  "Which of my values should I be most concerned about?",
  "What lifestyle changes can help improve my results?",
];

function buildReportContext(historyEntry: { result: { values: { name: string; result: string; unit: string; referenceRange: string; status: string }[] } } | null): string {
  if (!historyEntry) return "";
  return historyEntry.result.values
    .map((v) => `${v.name}: ${v.result}${v.unit ? " " + v.unit : ""} (ref: ${v.referenceRange || "N/A"}) — ${v.status}`)
    .join("\n");
}

function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";
  return (
    <div className={`flex items-end gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      {/* Avatar */}
      {!isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-buddy-blue text-white text-xs font-black shadow-sm">
          B
        </div>
      )}

      {/* Bubble */}
      <div
        className={`max-w-[80%] rounded-3xl px-5 py-3 text-sm font-medium leading-relaxed shadow-sm ${
          isUser
            ? "rounded-br-lg bg-magic-orange text-white"
            : "rounded-bl-lg bg-white text-text-main"
        }`}
      >
        {msg.content}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-buddy-blue text-white text-xs font-black shadow-sm">
        B
      </div>
      <div className="flex items-center gap-1.5 rounded-3xl rounded-bl-lg bg-white px-5 py-4 shadow-sm">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-2 w-2 rounded-full bg-buddy-blue/50"
            style={{ animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }}
          />
        ))}
      </div>
      <style>{`@keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} }`}</style>
    </div>
  );
}

export default function ChatPage() {
  const { history, isLoading } = useHistory();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hey there! 👋 I'm Buddy, your friendly lab results guide. " +
        (history.length > 0
          ? "I can see your latest report — ask me anything about it!"
          : "Paste or upload a lab report first, then ask me anything about the results!"),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Update greeting once history loads
  useEffect(() => {
    if (!isLoading && messages.length === 1) {
      setMessages([
        {
          role: "assistant",
          content:
            "Hey there! 👋 I'm Buddy, your friendly lab results guide. " +
            (history.length > 0
              ? "I can see your latest report — ask me anything about it!"
              : "Paste or upload a lab report first, then ask me anything about the results!"),
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const reportContext = buildReportContext(history[0] ?? null);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = { role: "user", content: trimmed };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.map((m) => ({ role: m.role, content: m.content })),
          reportContext: reportContext || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to get response");

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I ran into an issue. Please try again in a moment! 😅",
        },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col" style={{ height: "calc(100dvh - 180px)" }}>
      {/* Header */}
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-buddy-blue text-white text-lg font-black shadow-sm">
          B
        </div>
        <div>
          <h1 className="text-xl font-black text-text-main">Ask Buddy</h1>
          <p className="text-xs font-medium text-text-main/40">
            {history.length > 0
              ? `Using your report from ${new Date(history[0].analyzedAt).toLocaleDateString()}`
              : "No report loaded — general questions only"}
          </p>
        </div>
        {history.length > 0 && (
          <span className="ml-auto rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-600">
            Report Loaded
          </span>
        )}
      </div>

      {/* Message list */}
      <div className="flex-1 space-y-4 overflow-y-auto rounded-3xl bg-[#F5F7FA] p-4">
        {messages.map((msg, i) => (
          <MessageBubble key={i} msg={msg} />
        ))}
        {loading && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* Suggested questions (shown only before user sends anything) */}
      {messages.length === 1 && !loading && (
        <div className="mt-3 flex flex-wrap gap-2">
          {SUGGESTED.map((q) => (
            <button
              key={q}
              onClick={() => send(q)}
              className="rounded-full border border-white bg-white px-4 py-2 text-xs font-bold text-text-main/60 shadow-sm transition-all hover:bg-pale-mint hover:text-text-main"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input bar */}
      <div className="mt-3 flex items-end gap-2 rounded-3xl bg-white p-2 shadow-sm">
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Ask Buddy anything about your results…"
          rows={1}
          disabled={loading}
          className="flex-1 resize-none bg-transparent px-3 py-2.5 text-sm font-medium text-text-main outline-none placeholder:text-text-main/30 disabled:opacity-50"
          style={{ maxHeight: 120 }}
          onInput={(e) => {
            const t = e.currentTarget;
            t.style.height = "auto";
            t.style.height = `${Math.min(t.scrollHeight, 120)}px`;
          }}
        />
        <button
          onClick={() => send(input)}
          disabled={loading || !input.trim()}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-magic-orange text-white shadow-[0_4px_0_0_#D15C2A] transition-all hover:brightness-105 active:translate-y-0.5 active:shadow-none disabled:opacity-40 disabled:shadow-none"
          aria-label="Send"
        >
          <span className="material-symbols-outlined text-xl">send</span>
        </button>
      </div>

      <p className="mt-2 text-center text-[10px] font-medium text-text-main/25">
        Buddy is not a medical professional · Not medical advice
      </p>
    </div>
  );
}
