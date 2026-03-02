import type { SupabaseClient } from "@supabase/supabase-js";
import type { ExplainResponse } from "@/types/lab";
import type { StoredResult } from "@/lib/storage";

interface DbRow {
  id: string;
  data: ExplainResponse;
  analyzed_at: string;
}

function rowToStored(row: DbRow): StoredResult {
  return {
    id: row.id,
    result: row.data,
    analyzedAt: row.analyzed_at,
  };
}

/** Fetch all reports for the logged-in user, newest first (max 50). */
export async function dbLoadHistory(
  supabase: SupabaseClient
): Promise<StoredResult[]> {
  const { data, error } = await supabase
    .from("lab_reports")
    .select("id, data, analyzed_at")
    .order("analyzed_at", { ascending: false })
    .limit(50);

  if (error || !data) return [];
  return (data as DbRow[]).map(rowToStored);
}

/** Insert a new analysis result for the logged-in user. */
export async function dbSaveToHistory(
  supabase: SupabaseClient,
  result: ExplainResponse
): Promise<StoredResult | null> {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return null;

  const { data, error } = await supabase
    .from("lab_reports")
    .insert({
      user_id: userData.user.id,
      data: result,
      analyzed_at: new Date().toISOString(),
    })
    .select("id, data, analyzed_at")
    .single();

  if (error || !data) return null;
  return rowToStored(data as DbRow);
}

/** Delete a single report by id for the logged-in user. */
export async function dbDeleteFromHistory(
  supabase: SupabaseClient,
  id: string
): Promise<void> {
  await supabase.from("lab_reports").delete().eq("id", id);
}

/**
 * Migrate an array of StoredResult entries (from localStorage) into the DB.
 * Skips entries that would conflict on the same analyzed_at timestamp.
 * Safe to call multiple times — ignores duplicates.
 */
export async function dbMigrateFromLocalStorage(
  supabase: SupabaseClient,
  entries: StoredResult[]
): Promise<void> {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user || entries.length === 0) return;

  const rows = entries.map((e) => ({
    user_id: userData.user!.id,
    data: e.result,
    analyzed_at: e.analyzedAt,
  }));

  // onConflict: ignore duplicates (same user_id + analyzed_at)
  await supabase.from("lab_reports").upsert(rows, {
    onConflict: "user_id,analyzed_at",
    ignoreDuplicates: true,
  });
}
