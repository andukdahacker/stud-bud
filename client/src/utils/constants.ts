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

export const NotificationType = {
  TUTOR_ORDER_REQUEST_TO_BE_TUTOR: 1,
  TUTOR_ORDER_ACCEPT_TUTOR_REQUEST: 2,
  TUTOR_ORDER_DECLINE_TUTOR_REQUEST: 3,
  TUTOR_ORDER_COMPLETE_TUTOR_ORDER: 4,
};
