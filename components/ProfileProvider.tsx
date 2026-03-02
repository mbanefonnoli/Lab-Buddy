"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { DEFAULT_PROFILE_ID, type Profile } from "@/types/profile";
import {
  loadProfiles,
  saveProfile,
  deleteProfile as storageDelete,
  getActiveProfileId,
  setActiveProfileId,
  createProfile,
} from "@/lib/profiles";

interface ProfileContextValue {
  profiles: Profile[];
  activeProfile: Profile;
  setActive: (id: string) => void;
  addProfile: (name: string, relation: Profile["relation"], avatarColor: string) => Profile;
  updateProfile: (profile: Profile) => void;
  removeProfile: (id: string) => void;
}

const ProfileContext = createContext<ProfileContextValue | null>(null);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [activeId, setActiveId] = useState(DEFAULT_PROFILE_ID);

  // Hydrate from localStorage on mount
  useEffect(() => {
    setProfiles(loadProfiles());
    setActiveId(getActiveProfileId());
  }, []);

  const activeProfile =
    profiles.find((p) => p.id === activeId) ?? profiles[0];

  const setActive = useCallback((id: string) => {
    setActiveProfileId(id);
    setActiveId(id);
  }, []);

  const addProfile = useCallback(
    (name: string, relation: Profile["relation"], avatarColor: string) => {
      const p = createProfile(name, relation, avatarColor);
      setProfiles(loadProfiles());
      return p;
    },
    []
  );

  const updateProfile = useCallback((profile: Profile) => {
    saveProfile(profile);
    setProfiles(loadProfiles());
  }, []);

  const removeProfile = useCallback((id: string) => {
    storageDelete(id);
    setProfiles(loadProfiles());
    setActiveId(getActiveProfileId());
  }, []);

  if (!activeProfile) return null;

  return (
    <ProfileContext.Provider
      value={{ profiles, activeProfile, setActive, addProfile, updateProfile, removeProfile }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be used inside ProfileProvider");
  return ctx;
}
