export type ProfileRelation = "self" | "partner" | "parent" | "child" | "other";

export interface Profile {
  id: string;
  name: string;
  relation: ProfileRelation;
  /** Hex color for the avatar circle */
  avatarColor: string;
  createdAt: string;
}

export const DEFAULT_PROFILE_ID = "default";

export const RELATION_LABELS: Record<ProfileRelation, string> = {
  self: "Myself",
  partner: "Partner",
  parent: "Parent",
  child: "Child",
  other: "Other",
};

export const AVATAR_COLORS = [
  "#3BADA8", // teal
  "#FF7E47", // orange
  "#9B86BD", // purple
  "#10B981", // green
  "#3B82F6", // blue
  "#F43F5E", // rose
  "#F59E0B", // amber
  "#6366F1", // indigo
];
