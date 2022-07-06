import { RelationshipStatusCode } from "../generated/graphql";

export const PROFILES_TAKE_LIMIT = 1;
export const MESSAGES_TAKE_LIMIT = 5;
export const TUTOR_ORDER_TAKE_LIMIT = 5;
export enum BuddyStatus {
  BUDDY,
  REQUESTED,
  PENDING,
}

export enum BuddyRespondOptions {
  ACCEPT,
  DECLINE,
  REMOVE,
  UNDO,
}

export interface BuddyNotificationProps {
  profile_id: string;
  profile_avatar?: string | null;
  username: string;
  status: RelationshipStatusCode;
  isRead: boolean;
}

export type findOptions =
  | "buddies"
  | "tutor orders"
  | "tutors"
  | "roadmaps"
  | null;
