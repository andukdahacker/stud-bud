import { RelationshipStatusCode } from "../generated/graphql";

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

export const NotificationType = {
  TUTOR_ORDER_REQUEST_TO_BE_TUTOR: 1,
  TUTOR_ORDER_ACCEPT_TUTOR_REQUEST: 2,
  TUTOR_ORDER_DECLINE_TUTOR_REQUEST: 3,
  TUTOR_ORDER_COMPLETE_TUTOR_ORDER: 4,
};

export type ProfileModalFormsType =
  | "age_location"
  | "introduction"
  | "work_experience"
  | "education";
