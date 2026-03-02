import { type Profile, DEFAULT_PROFILE_ID } from "@/types/profile";

const PROFILES_KEY = "labbuddy_profiles";
const ACTIVE_KEY = "labbuddy_active_profile";

const DEFAULT_PROFILE: Profile = {
  id: DEFAULT_PROFILE_ID,
  name: "Me",
  relation: "self",
  avatarColor: "#3BADA8",
  createdAt: new Date(0).toISOString(),
};

export function loadProfiles(): Profile[] {
  if (typeof window === "undefined") return [DEFAULT_PROFILE];
  try {
    const raw = localStorage.getItem(PROFILES_KEY);
    const saved = raw ? (JSON.parse(raw) as Profile[]) : [];
    // Always ensure the default profile is present
    if (!saved.find((p) => p.id === DEFAULT_PROFILE_ID)) {
      return [DEFAULT_PROFILE, ...saved];
    }
    return saved;
  } catch {
    return [DEFAULT_PROFILE];
  }
}

export function saveProfile(profile: Profile): void {
  const profiles = loadProfiles();
  const idx = profiles.findIndex((p) => p.id === profile.id);
  if (idx >= 0) {
    profiles[idx] = profile;
  } else {
    profiles.push(profile);
  }
  localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
}

export function deleteProfile(id: string): void {
  if (id === DEFAULT_PROFILE_ID) return; // can't delete default
  const profiles = loadProfiles().filter((p) => p.id !== id);
  localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
  // If deleted profile was active, reset to default
  if (getActiveProfileId() === id) {
    setActiveProfileId(DEFAULT_PROFILE_ID);
  }
}

export function getActiveProfileId(): string {
  if (typeof window === "undefined") return DEFAULT_PROFILE_ID;
  return localStorage.getItem(ACTIVE_KEY) ?? DEFAULT_PROFILE_ID;
}

export function setActiveProfileId(id: string): void {
  localStorage.setItem(ACTIVE_KEY, id);
}

export function createProfile(
  name: string,
  relation: Profile["relation"],
  avatarColor: string
): Profile {
  const profile: Profile = {
    id: crypto.randomUUID(),
    name,
    relation,
    avatarColor,
    createdAt: new Date().toISOString(),
  };
  saveProfile(profile);
  return profile;
}
