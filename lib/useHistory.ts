"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/components/AuthProvider";
import {
  loadHistory,
  saveToHistory as localSave,
  deleteFromHistory as localDelete,
  type StoredResult,
} from "@/lib/storage";
import {
  dbLoadHistory,
  dbSaveToHistory,
  dbDeleteFromHistory,
  dbMigrateFromLocalStorage,
} from "@/lib/db";
import type { ExplainResponse } from "@/types/lab";
import { DEFAULT_PROFILE_ID } from "@/types/profile";

const MIGRATED_KEY = "labbuddy_migrated";

export function useHistory(profileId?: string) {
  const { user, supabase } = useAuth();
  const [history, setHistory] = useState<StoredResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (user) {
      const rows = await dbLoadHistory(supabase);
      setHistory(rows);
    } else {
      setHistory(loadHistory());
    }
    setIsLoading(false);
  }, [user, supabase]);

  // Migrate localStorage → DB on first login
  useEffect(() => {
    if (!user) return;
    const alreadyMigrated = localStorage.getItem(MIGRATED_KEY) === user.id;
    if (alreadyMigrated) return;

    const localEntries = loadHistory();
    if (localEntries.length > 0) {
      dbMigrateFromLocalStorage(supabase, localEntries).then(() => {
        localStorage.removeItem("labbuddy_history");
        localStorage.removeItem("labbuddy_last_result");
        localStorage.setItem(MIGRATED_KEY, user.id);
      });
    } else {
      localStorage.setItem(MIGRATED_KEY, user.id);
    }
  }, [user, supabase]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // Filter by profileId when provided
  const filteredHistory = profileId
    ? history.filter((e) =>
        profileId === DEFAULT_PROFILE_ID
          ? !e.profileId || e.profileId === DEFAULT_PROFILE_ID
          : e.profileId === profileId
      )
    : history;

  const save = useCallback(
    async (result: ExplainResponse, pid?: string) => {
      if (user) {
        const entry = await dbSaveToHistory(supabase, result);
        if (entry) {
          const withProfile = pid ? { ...entry, profileId: pid } : entry;
          setHistory((prev) => [withProfile, ...prev]);
        }
      } else {
        const entry = localSave(result, pid);
        setHistory((prev) => [entry, ...prev.slice(0, 9)]);
      }
    },
    [user, supabase]
  );

  const remove = useCallback(
    async (id: string) => {
      if (user) {
        await dbDeleteFromHistory(supabase, id);
      } else {
        localDelete(id);
      }
      setHistory((prev) => prev.filter((e) => e.id !== id));
    },
    [user, supabase]
  );

  return { history: filteredHistory, save, remove, isLoading, refresh };
}
