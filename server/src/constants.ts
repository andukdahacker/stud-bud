export const COOKIE_NAME = "studbud_session_cookie";
export const __prod__ = process.env.NODE_ENV === "production";
export const UNAUTHORISED = "Not Authorised!";
export const FORGOT_PASSWORD_PREFIX = "forgot-password:";
export const EMAIL_VERIFICATION_PREFIX = "email-verify:";
export const FORGOT_PASSWORD_EMAIL_SUBJECT = "StudBud Password Reset Request";
export const EMAIL_VERIFICATION_SUBJECT = "StudBud Email Verification";
export const UNVERIFIED = "User is unverified.";
export const SEND_EMAIL_ERROR =
  "Something is wrong when sending email. Please try again.";
export const INVALID_INPUT = "Invalid inputs";
export const INTERNAL_SERVER_ERROR = {
  IOutput: {
    code: 500,
    success: false,
    message: "Internal server error",
  },
};
export const INVALID_TOKEN = "Invalid or expired token.";
export const RELATIONSHIP_CONNECT = 1;
export const RELATIONSHIP_ACCEPT = 2;
export const CONNECT_BUDDY_EVENT = "CONNECT_BUDDY";
export const ACCEPT_BUDDY_EVENT = "ACCEPT_BUDDY";
export const QUERY_SUCCESS = {
  code: 200,
  success: true,
  message: "Query made successfully",
};
export const UNSUCCESSFUL_QUERY = {
  code: 400,
  success: false,
  message: "Query made unsuccessfully",
};
export const UNSUCCESSFUL_MUTATION = {
  code: 400,
  success: false,
  message: "Mutation made unsuccessfully",
};

export const SUCCESSFUL_MUTATION = {
  code: 200,
  success: true,
  message: "Mutation made successfully",
};
export const NEW_MESSAGE_EVENT = "NEW_MESSAGE";
export const NEW_MESSAGE_EVENT2 = "NEW_MESSAGE2";

export const NotificationType = {
  TUTOR_ORDER_REQUEST_TO_BE_TUTOR: 1,
  TUTOR_ORDER_ACCEPT_TUTOR_REQUEST: 2,
  TUTOR_ORDER_DECLINE_TUTOR_REQUEST: 3,
  TUTOR_ORDER_COMPLETE_TUTOR_ORDER: 4,
};

export const NEW_NOTIFICATION_EVENT = "NEW_NOTIFICATION";
