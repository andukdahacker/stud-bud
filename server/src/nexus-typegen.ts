/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context as Context } from "./context"
import type { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * The `Upload` scalar type represents a file upload.
     */
    upload<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "Upload";
    /**
     * Date custom scalar type
     */
    date<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "Date";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * The `Upload` scalar type represents a file upload.
     */
    upload<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Upload";
    /**
     * Date custom scalar type
     */
    date<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Date";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  ChangePasswordInput: { // input type
    password: string; // String!
    token: string; // String!
  }
  ConnectTutorOrderInput: { // input type
    message_content?: string | null; // String
    student_id: string; // String!
    tutor_id: string; // String!
    tutor_order_id: string; // String!
  }
  ConversationGroupWhereUniqueInput: { // input type
    conversation_id: string; // String!
    profile_id: string; // String!
  }
  ConversationPageInput: { // input type
    cursor?: string | null; // String
    take: number; // Int!
  }
  ConversationWhereUniqueInput: { // input type
    conversation_id: string; // String!
  }
  CreateInterestInput: { // input type
    interest_name: string; // String!
  }
  CreateProfileInput: { // input type
    profile_avatar?: NexusGenScalars['Upload'] | null; // Upload
    profile_bio?: string | null; // String
    profile_interest: Array<NexusGenInputs['CreateInterestInput'] | null>; // [CreateInterestInput]!
    profile_wallpaper?: NexusGenScalars['Upload'] | null; // Upload
  }
  CreateTutorOrderInput: { // input type
    problem: string; // String!
    student_id: string; // String!
    tutor_id?: string | null; // String
    tutor_order_interests: Array<NexusGenInputs['CreateInterestInput'] | null>; // [CreateInterestInput]!
    tutor_requirements: string; // String!
  }
  DestroyImageInput: { // input type
    img_public_id: string; // String!
  }
  ForgotPasswordInput: { // input type
    email: string; // String!
  }
  GetManyProfilesInput: { // input type
    cursor?: NexusGenScalars['Date'] | null; // Date
    search_input?: string | null; // String
    take: number; // Int!
  }
  GetManyTutorOrdersInput: { // input type
    cursor?: string | null; // String
    search_input?: string | null; // String
    take: number; // Int!
  }
  LoginInput: { // input type
    email: string; // String!
    password: string; // String!
  }
  NotificationWhereUniqueInput: { // input type
    id: string; // String!
  }
  ProfileWhereUniqueInput: { // input type
    profile_id: string; // ID!
  }
  ReadBuddyNotificationsInput: { // input type
    addressee_id: string; // String!
    requester_id: string; // String!
  }
  RegisterInput: { // input type
    email: string; // String!
    password: string; // String!
    username: string; // String!
  }
  RelationshipInput: { // input type
    addressee_id: string; // String!
    requester_id: string; // String!
    specifier_id: string; // String!
    status: NexusGenEnums['RelationshipStatusCode']; // RelationshipStatusCode!
  }
  ResondTutorOrderConnectInput: { // input type
    status: NexusGenEnums['TutorOrderTutorConnectStatusCode']; // TutorOrderTutorConnectStatusCode!
    tutor_id: string; // String!
  }
  SendMessageInput: { // input type
    conversation_id: string; // String!
    message_content: string; // String!
  }
  TutorOrderWhereUniqueInput: { // input type
    id: string; // String!
  }
  VerifyEmailInput: { // input type
    token: string; // String!
  }
  getManyInterestsInput: { // input type
    search_input?: string | null; // String
  }
}

export interface NexusGenEnums {
  RelationshipStatusCode: "ACCEPTED" | "DECLINED" | "REQUESTED"
  TutorOrderTutorConnectStatusCode: "ACCEPTED" | "DECLINED" | "REQUESTED"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  Date: any
  Upload: any
}

export interface NexusGenObjects {
  AuthOutput: { // root type
    ErrorFieldOutput?: NexusGenRootTypes['ErrorFieldOutput'][] | null; // [ErrorFieldOutput!]
    IOutput: NexusGenRootTypes['IOutput']; // IOutput!
    User?: NexusGenRootTypes['User'] | null; // User
  }
  BuddyNotificationOutput: { // root type
    IOutput: NexusGenRootTypes['IOutput']; // IOutput!
    PageInfo?: NexusGenRootTypes['PageInfoIDCursor'] | null; // PageInfoIDCursor
    buddyAccepts?: NexusGenRootTypes['Relationship'][] | null; // [Relationship!]
    buddyRequests?: NexusGenRootTypes['Relationship'][] | null; // [Relationship!]
    countNotViewedBuddyNotifications?: number | null; // Int
  }
  Conversation: { // root type
    conversation_avatar?: string | null; // String
    conversation_name?: string | null; // String
    id: string; // String!
  }
  ConversationGroup: { // root type
    conversation_id: string; // String!
    conversation_member_id: string; // String!
    isRead: boolean; // Boolean!
    isViewed: boolean; // Boolean!
    joined_at: NexusGenScalars['Date']; // Date!
    left_at?: NexusGenScalars['Date'] | null; // Date
  }
  ErrorFieldOutput: { // root type
    field: string; // String!
    message: string; // String!
  }
  GetManyInterestOutput: { // root type
    IOutput: NexusGenRootTypes['IOutput']; // IOutput!
    Interest?: Array<NexusGenRootTypes['Interest'] | null> | null; // [Interest]
  }
  GetManyProfilesOutput: { // root type
    IOutput: NexusGenRootTypes['IOutput']; // IOutput!
    PageInfo?: NexusGenRootTypes['PageInfoDataCursor'] | null; // PageInfoDataCursor
    Profile?: Array<NexusGenRootTypes['Profile'] | null> | null; // [Profile]
  }
  GetManyTutorOrderTutorConnect: { // root type
    IOutput: NexusGenRootTypes['IOutput']; // IOutput!
    tutor_order_tutor_connect?: Array<NexusGenRootTypes['TutorOrderTutorConnect'] | null> | null; // [TutorOrderTutorConnect]
  }
  GetManyTutorOrdersOutput: { // root type
    IOutput: NexusGenRootTypes['IOutput']; // IOutput!
    PageInfoIDCursor?: NexusGenRootTypes['PageInfoIDCursor'] | null; // PageInfoIDCursor
    tutor_order?: NexusGenRootTypes['TutorOrder'][] | null; // [TutorOrder!]
  }
  GetNotificationOutput: { // root type
    IOutput: NexusGenRootTypes['IOutput']; // IOutput!
    countNotViewedNotifications?: number | null; // Int
    notifications?: Array<NexusGenRootTypes['Notification'] | null> | null; // [Notification]
  }
  GetTutorOrderTutorConnectOutput: { // root type
    IOutput: NexusGenRootTypes['IOutput']; // IOutput!
    tutor_order_tutor_connect?: NexusGenRootTypes['TutorOrderTutorConnect'] | null; // TutorOrderTutorConnect
  }
  IOutput: { // root type
    code: number; // Int!
    message: string; // String!
    success: boolean; // Boolean!
  }
  Interest: { // root type
    id: string; // ID!
    interest_name?: string | null; // String
  }
  Message: { // root type
    conversation_id: string; // String!
    createdAt?: NexusGenScalars['Date'] | null; // Date
    id: string; // String!
    message_author_id: string; // String!
    message_content: string; // String!
  }
  Mutation: {};
  Notification: { // root type
    createdAt: NexusGenScalars['Date']; // Date!
    entity_id?: string | null; // String
    id: string; // String!
    isRead: boolean; // Boolean!
    isViewed: boolean; // Boolean!
    message?: string | null; // String
    notifier_id: string; // String!
    receiver_id: string; // String!
    type_id: number; // Int!
  }
  NotificationMutationOutput: { // root type
    IOutput: NexusGenRootTypes['IOutput']; // IOutput!
  }
  PageInfoDataCursor: { // root type
    endCursor?: NexusGenScalars['Date'] | null; // Date
    hasNextPage: boolean; // Boolean!
    lastTake?: number | null; // Int
  }
  PageInfoIDCursor: { // root type
    endCursor?: string | null; // String
    hasNextPage: boolean; // Boolean!
    lastTake?: number | null; // Int
  }
  Profile: { // root type
    createdAt?: NexusGenScalars['Date'] | null; // Date
    id: string; // ID!
    profile_avatar?: string | null; // String
    profile_avatar_public_id?: string | null; // String
    profile_bio?: string | null; // String
    profile_wallpaper?: string | null; // String
    profile_wallpaper_public_id?: string | null; // String
    tutor_mode: boolean; // Boolean!
  }
  ProfileInterest: { // root type
    interest_id: string; // ID!
    profile_id: string; // ID!
  }
  ProfileMutationOutput: { // root type
    IOutput: NexusGenRootTypes['IOutput']; // IOutput!
    Profile?: NexusGenRootTypes['Profile'] | null; // Profile
  }
  Query: {};
  Relationship: { // root type
    addressee_id: string; // String!
    createdAt: NexusGenScalars['Date']; // Date!
    isRead: boolean; // Boolean!
    isViewed: boolean; // Boolean!
    requester_id: string; // String!
    specifier_id: string; // String!
    status: NexusGenEnums['RelationshipStatusCode']; // RelationshipStatusCode!
    updatedAt: NexusGenScalars['Date']; // Date!
  }
  RelationshipOutput: { // root type
    IOutput: NexusGenRootTypes['IOutput']; // IOutput!
    Relationship?: NexusGenRootTypes['Relationship'][] | null; // [Relationship!]
  }
  SendMessageOutput: { // root type
    IOutput: NexusGenRootTypes['IOutput']; // IOutput!
    Message?: NexusGenRootTypes['Message'] | null; // Message
  }
  Subscription: {};
  TutorOrder: { // root type
    createdAt: NexusGenScalars['Date']; // Date!
    id: string; // String!
    isCompleted: boolean; // Boolean!
    problem: string; // String!
    student_id: string; // String!
    tutor_id?: string | null; // String
    tutor_requirements: string; // String!
    updatedAt: NexusGenScalars['Date']; // Date!
  }
  TutorOrderInterests: { // root type
    interest_id: string; // String!
    tutor_order_id: string; // String!
  }
  TutorOrderOutput: { // root type
    IOutput: NexusGenRootTypes['IOutput']; // IOutput!
    tutor_order?: NexusGenRootTypes['TutorOrder'] | null; // TutorOrder
  }
  TutorOrderTutorConnect: { // root type
    status: NexusGenEnums['TutorOrderTutorConnectStatusCode']; // TutorOrderTutorConnectStatusCode!
    tutor_id: string; // String!
    tutor_order_id: string; // String!
  }
  User: { // root type
    email: string; // String!
    id: string; // ID!
    isVerified: boolean; // Boolean!
    username: string; // String!
  }
  getConversationOutput: { // root type
    Conversation?: NexusGenRootTypes['Conversation'] | null; // Conversation
    ConversationPageInfo?: NexusGenRootTypes['PageInfoIDCursor'] | null; // PageInfoIDCursor
    IOutput: NexusGenRootTypes['IOutput']; // IOutput!
    Messages?: NexusGenRootTypes['Message'][] | null; // [Message!]
  }
  getManyConversationPutput: { // root type
    Conversations?: NexusGenRootTypes['ConversationGroup'][] | null; // [ConversationGroup!]
    IOutput: NexusGenRootTypes['IOutput']; // IOutput!
    countNotViewedConversation?: number | null; // Int
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  AuthOutput: { // field return type
    ErrorFieldOutput: NexusGenRootTypes['ErrorFieldOutput'][] | null; // [ErrorFieldOutput!]
    IOutput: NexusGenRootTypes['IOutput']; // IOutput!
    User: NexusGenRootTypes['User'] | null; // User
  }
  BuddyNotificationOutput: { // field return type
    IOutput: NexusGenRootTypes['IOutput']; // IOutput!
    PageInfo: NexusGenRootTypes['PageInfoIDCursor'] | null; // PageInfoIDCursor
    buddyAccepts: NexusGenRootTypes['Relationship'][] | null; // [Relationship!]
    buddyRequests: NexusGenRootTypes['Relationship'][] | null; // [Relationship!]
    countNotViewedBuddyNotifications: number | null; // Int
  }
  Conversation: { // field return type
    conversation_avatar: string | null; // String
    conversation_latest_message: NexusGenRootTypes['Message'] | null; // Message
    conversation_member: NexusGenRootTypes['Profile'][]; // [Profile!]!
    conversation_name: string | null; // String
    id: string; // String!
  }
  ConversationGroup: { // field return type
    conversation: NexusGenRootTypes['Conversation']; // Conversation!
    conversation_id: string; // String!
    conversation_member_id: string; // String!
    isRead: boolean; // Boolean!
    isViewed: boolean; // Boolean!
    joined_at: NexusGenScalars['Date']; // Date!
    left_at: NexusGenScalars['Date'] | null; // Date
  }
  ErrorFieldOutput: { // field return type
    field: string; // String!
    message: string; // String!
  }
  GetManyInterestOutput: { // field return type
    IOutput: NexusGenRootTypes['IOutput']; // IOutput!
    Interest: Array<NexusGenRootTypes['Interest'] | null> | null; // [Interest]
  }
  GetManyProfilesOutput: { // field return type
    IOutput: NexusGenRootTypes['IOutput']; // IOutput!
    PageInfo: NexusGenRootTypes['PageInfoDataCursor'] | null; // PageInfoDataCursor
    Profile: Array<NexusGenRootTypes['Profile'] | null> | null; // [Profile]
  }
  GetManyTutorOrderTutorConnect: { // field return type
    IOutput: NexusGenRootTypes['IOutput']; // IOutput!
    tutor_order_tutor_connect: Array<NexusGenRootTypes['TutorOrderTutorConnect'] | null> | null; // [TutorOrderTutorConnect]
  }
  GetManyTutorOrdersOutput: { // field return type
    IOutput: NexusGenRootTypes['IOutput']; // IOutput!
    PageInfoIDCursor: NexusGenRootTypes['PageInfoIDCursor'] | null; // PageInfoIDCursor
    tutor_order: NexusGenRootTypes['TutorOrder'][] | null; // [TutorOrder!]
  }
  GetNotificationOutput: { // field return type
    IOutput: NexusGenRootTypes['IOutput']; // IOutput!
    countNotViewedNotifications: number | null; // Int
    notifications: Array<NexusGenRootTypes['Notification'] | null> | null; // [Notification]
  }
  GetTutorOrderTutorConnectOutput: { // field return type
    IOutput: NexusGenRootTypes['IOutput']; // IOutput!
    tutor_order_tutor_connect: NexusGenRootTypes['TutorOrderTutorConnect'] | null; // TutorOrderTutorConnect
  }
  IOutput: { // field return type
    code: number; // Int!
    message: string; // String!
    success: boolean; // Boolean!
  }
  Interest: { // field return type
    id: string; // ID!
    interest_name: string | null; // String
    profile_interests: NexusGenRootTypes['ProfileInterest'][]; // [ProfileInterest!]!
  }
  Message: { // field return type
    author: NexusGenRootTypes['Profile']; // Profile!
    conversation_id: string; // String!
    createdAt: NexusGenScalars['Date'] | null; // Date
    id: string; // String!
    message_author_id: string; // String!
    message_content: string; // String!
  }
  Mutation: { // field return type
    changePassword: NexusGenRootTypes['AuthOutput'] | null; // AuthOutput
    connectBuddy: NexusGenRootTypes['RelationshipOutput'] | null; // RelationshipOutput
    connectTutorOrder: NexusGenRootTypes['TutorOrderOutput'] | null; // TutorOrderOutput
    createProfile: NexusGenRootTypes['ProfileMutationOutput'] | null; // ProfileMutationOutput
    createTutorOrder: NexusGenRootTypes['TutorOrderOutput'] | null; // TutorOrderOutput
    deleteTutorOrder: NexusGenRootTypes['TutorOrderOutput'] | null; // TutorOrderOutput
    forgotPassword: NexusGenRootTypes['AuthOutput'] | null; // AuthOutput
    login: NexusGenRootTypes['AuthOutput']; // AuthOutput!
    logout: NexusGenRootTypes['AuthOutput']; // AuthOutput!
    readBuddyNotifications: NexusGenRootTypes['BuddyNotificationOutput'] | null; // BuddyNotificationOutput
    readMessage: NexusGenRootTypes['IOutput'] | null; // IOutput
    readNotification: NexusGenRootTypes['NotificationMutationOutput'] | null; // NotificationMutationOutput
    register: NexusGenRootTypes['AuthOutput']; // AuthOutput!
    removeAvatar: NexusGenRootTypes['ProfileMutationOutput'] | null; // ProfileMutationOutput
    removeBuddy: NexusGenRootTypes['RelationshipOutput'] | null; // RelationshipOutput
    removeWallpaper: NexusGenRootTypes['ProfileMutationOutput'] | null; // ProfileMutationOutput
    respondBuddy: NexusGenRootTypes['RelationshipOutput'] | null; // RelationshipOutput
    respondTutorOrderConnect: NexusGenRootTypes['TutorOrderOutput'] | null; // TutorOrderOutput
    sendMessage: NexusGenRootTypes['SendMessageOutput'] | null; // SendMessageOutput
    updateProfile: NexusGenRootTypes['ProfileMutationOutput'] | null; // ProfileMutationOutput
    updateTutorOrder: NexusGenRootTypes['TutorOrderOutput'] | null; // TutorOrderOutput
    verifyEmail: NexusGenRootTypes['AuthOutput']; // AuthOutput!
    viewBuddyNotifications: NexusGenRootTypes['BuddyNotificationOutput'] | null; // BuddyNotificationOutput
    viewMessage: NexusGenRootTypes['IOutput'] | null; // IOutput
    viewNotification: NexusGenRootTypes['NotificationMutationOutput'] | null; // NotificationMutationOutput
  }
  Notification: { // field return type
    createdAt: NexusGenScalars['Date']; // Date!
    entity_id: string | null; // String
    id: string; // String!
    isRead: boolean; // Boolean!
    isViewed: boolean; // Boolean!
    message: string | null; // String
    notifier: NexusGenRootTypes['Profile'] | null; // Profile
    notifier_id: string; // String!
    receiver_id: string; // String!
    type_id: number; // Int!
  }
  NotificationMutationOutput: { // field return type
    IOutput: NexusGenRootTypes['IOutput']; // IOutput!
  }
  PageInfoDataCursor: { // field return type
    endCursor: NexusGenScalars['Date'] | null; // Date
    hasNextPage: boolean; // Boolean!
    lastTake: number | null; // Int
  }
  PageInfoIDCursor: { // field return type
    endCursor: string | null; // String
    hasNextPage: boolean; // Boolean!
    lastTake: number | null; // Int
  }
  Profile: { // field return type
    buddies: NexusGenRootTypes['Relationship'][] | null; // [Relationship!]
    buddyPendings: NexusGenRootTypes['Relationship'][] | null; // [Relationship!]
    buddyRequests: NexusGenRootTypes['Relationship'][] | null; // [Relationship!]
    createdAt: NexusGenScalars['Date'] | null; // Date
    id: string; // ID!
    profile_avatar: string | null; // String
    profile_avatar_public_id: string | null; // String
    profile_bio: string | null; // String
    profile_interests: Array<NexusGenRootTypes['ProfileInterest'] | null> | null; // [ProfileInterest]
    profile_wallpaper: string | null; // String
    profile_wallpaper_public_id: string | null; // String
    tutor_mode: boolean; // Boolean!
    user: NexusGenRootTypes['User'] | null; // User
  }
  ProfileInterest: { // field return type
    interest: NexusGenRootTypes['Interest']; // Interest!
    interest_id: string; // ID!
    profile: NexusGenRootTypes['Profile']; // Profile!
    profile_id: string; // ID!
  }
  ProfileMutationOutput: { // field return type
    IOutput: NexusGenRootTypes['IOutput']; // IOutput!
    Profile: NexusGenRootTypes['Profile'] | null; // Profile
  }
  Query: { // field return type
    getBuddyNotifications: NexusGenRootTypes['BuddyNotificationOutput'] | null; // BuddyNotificationOutput
    getConversation: NexusGenRootTypes['getConversationOutput'] | null; // getConversationOutput
    getManyConversations: NexusGenRootTypes['getManyConversationPutput'] | null; // getManyConversationPutput
    getManyInterests: NexusGenRootTypes['GetManyInterestOutput'] | null; // GetManyInterestOutput
    getManyProfiles: NexusGenRootTypes['GetManyProfilesOutput'] | null; // GetManyProfilesOutput
    getManyTutorOrderRequests: NexusGenRootTypes['GetManyTutorOrderTutorConnect'] | null; // GetManyTutorOrderTutorConnect
    getManyTutorOrders: NexusGenRootTypes['GetManyTutorOrdersOutput'] | null; // GetManyTutorOrdersOutput
    getMyTutorOrder: NexusGenRootTypes['GetManyTutorOrdersOutput'] | null; // GetManyTutorOrdersOutput
    getNotifications: NexusGenRootTypes['GetNotificationOutput'] | null; // GetNotificationOutput
    getProfile: NexusGenRootTypes['ProfileMutationOutput'] | null; // ProfileMutationOutput
    getTutorOrder: NexusGenRootTypes['TutorOrderOutput'] | null; // TutorOrderOutput
    getTutorOrderTutorConnect: NexusGenRootTypes['GetTutorOrderTutorConnectOutput'] | null; // GetTutorOrderTutorConnectOutput
    getUser: NexusGenRootTypes['User'] | null; // User
  }
  Relationship: { // field return type
    addressee: NexusGenRootTypes['Profile']; // Profile!
    addressee_id: string; // String!
    createdAt: NexusGenScalars['Date']; // Date!
    isRead: boolean; // Boolean!
    isViewed: boolean; // Boolean!
    requester: NexusGenRootTypes['Profile']; // Profile!
    requester_id: string; // String!
    specifier_id: string; // String!
    status: NexusGenEnums['RelationshipStatusCode']; // RelationshipStatusCode!
    updatedAt: NexusGenScalars['Date']; // Date!
  }
  RelationshipOutput: { // field return type
    IOutput: NexusGenRootTypes['IOutput']; // IOutput!
    Relationship: NexusGenRootTypes['Relationship'][] | null; // [Relationship!]
  }
  SendMessageOutput: { // field return type
    IOutput: NexusGenRootTypes['IOutput']; // IOutput!
    Message: NexusGenRootTypes['Message'] | null; // Message
  }
  Subscription: { // field return type
    getBuddyNotifications: NexusGenRootTypes['BuddyNotificationOutput'] | null; // BuddyNotificationOutput
    getConversation: NexusGenRootTypes['getConversationOutput'] | null; // getConversationOutput
    getManyConversations: NexusGenRootTypes['getManyConversationPutput'] | null; // getManyConversationPutput
  }
  TutorOrder: { // field return type
    createdAt: NexusGenScalars['Date']; // Date!
    id: string; // String!
    isCompleted: boolean; // Boolean!
    problem: string; // String!
    student: NexusGenRootTypes['Profile']; // Profile!
    student_id: string; // String!
    tutor: NexusGenRootTypes['Profile'] | null; // Profile
    tutor_id: string | null; // String
    tutor_order_interest: NexusGenRootTypes['TutorOrderInterests'][] | null; // [TutorOrderInterests!]
    tutor_requirements: string; // String!
    updatedAt: NexusGenScalars['Date']; // Date!
  }
  TutorOrderInterests: { // field return type
    interest: NexusGenRootTypes['Interest']; // Interest!
    interest_id: string; // String!
    tutor_order: NexusGenRootTypes['TutorOrder']; // TutorOrder!
    tutor_order_id: string; // String!
  }
  TutorOrderOutput: { // field return type
    IOutput: NexusGenRootTypes['IOutput']; // IOutput!
    tutor_order: NexusGenRootTypes['TutorOrder'] | null; // TutorOrder
  }
  TutorOrderTutorConnect: { // field return type
    status: NexusGenEnums['TutorOrderTutorConnectStatusCode']; // TutorOrderTutorConnectStatusCode!
    tutor: NexusGenRootTypes['Profile']; // Profile!
    tutor_id: string; // String!
    tutor_order: NexusGenRootTypes['TutorOrder']; // TutorOrder!
    tutor_order_id: string; // String!
  }
  User: { // field return type
    email: string; // String!
    id: string; // ID!
    isVerified: boolean; // Boolean!
    profile: NexusGenRootTypes['Profile'] | null; // Profile
    username: string; // String!
  }
  getConversationOutput: { // field return type
    Conversation: NexusGenRootTypes['Conversation'] | null; // Conversation
    ConversationPageInfo: NexusGenRootTypes['PageInfoIDCursor'] | null; // PageInfoIDCursor
    IOutput: NexusGenRootTypes['IOutput']; // IOutput!
    Messages: NexusGenRootTypes['Message'][] | null; // [Message!]
  }
  getManyConversationPutput: { // field return type
    Conversations: NexusGenRootTypes['ConversationGroup'][] | null; // [ConversationGroup!]
    IOutput: NexusGenRootTypes['IOutput']; // IOutput!
    countNotViewedConversation: number | null; // Int
  }
}

export interface NexusGenFieldTypeNames {
  AuthOutput: { // field return type name
    ErrorFieldOutput: 'ErrorFieldOutput'
    IOutput: 'IOutput'
    User: 'User'
  }
  BuddyNotificationOutput: { // field return type name
    IOutput: 'IOutput'
    PageInfo: 'PageInfoIDCursor'
    buddyAccepts: 'Relationship'
    buddyRequests: 'Relationship'
    countNotViewedBuddyNotifications: 'Int'
  }
  Conversation: { // field return type name
    conversation_avatar: 'String'
    conversation_latest_message: 'Message'
    conversation_member: 'Profile'
    conversation_name: 'String'
    id: 'String'
  }
  ConversationGroup: { // field return type name
    conversation: 'Conversation'
    conversation_id: 'String'
    conversation_member_id: 'String'
    isRead: 'Boolean'
    isViewed: 'Boolean'
    joined_at: 'Date'
    left_at: 'Date'
  }
  ErrorFieldOutput: { // field return type name
    field: 'String'
    message: 'String'
  }
  GetManyInterestOutput: { // field return type name
    IOutput: 'IOutput'
    Interest: 'Interest'
  }
  GetManyProfilesOutput: { // field return type name
    IOutput: 'IOutput'
    PageInfo: 'PageInfoDataCursor'
    Profile: 'Profile'
  }
  GetManyTutorOrderTutorConnect: { // field return type name
    IOutput: 'IOutput'
    tutor_order_tutor_connect: 'TutorOrderTutorConnect'
  }
  GetManyTutorOrdersOutput: { // field return type name
    IOutput: 'IOutput'
    PageInfoIDCursor: 'PageInfoIDCursor'
    tutor_order: 'TutorOrder'
  }
  GetNotificationOutput: { // field return type name
    IOutput: 'IOutput'
    countNotViewedNotifications: 'Int'
    notifications: 'Notification'
  }
  GetTutorOrderTutorConnectOutput: { // field return type name
    IOutput: 'IOutput'
    tutor_order_tutor_connect: 'TutorOrderTutorConnect'
  }
  IOutput: { // field return type name
    code: 'Int'
    message: 'String'
    success: 'Boolean'
  }
  Interest: { // field return type name
    id: 'ID'
    interest_name: 'String'
    profile_interests: 'ProfileInterest'
  }
  Message: { // field return type name
    author: 'Profile'
    conversation_id: 'String'
    createdAt: 'Date'
    id: 'String'
    message_author_id: 'String'
    message_content: 'String'
  }
  Mutation: { // field return type name
    changePassword: 'AuthOutput'
    connectBuddy: 'RelationshipOutput'
    connectTutorOrder: 'TutorOrderOutput'
    createProfile: 'ProfileMutationOutput'
    createTutorOrder: 'TutorOrderOutput'
    deleteTutorOrder: 'TutorOrderOutput'
    forgotPassword: 'AuthOutput'
    login: 'AuthOutput'
    logout: 'AuthOutput'
    readBuddyNotifications: 'BuddyNotificationOutput'
    readMessage: 'IOutput'
    readNotification: 'NotificationMutationOutput'
    register: 'AuthOutput'
    removeAvatar: 'ProfileMutationOutput'
    removeBuddy: 'RelationshipOutput'
    removeWallpaper: 'ProfileMutationOutput'
    respondBuddy: 'RelationshipOutput'
    respondTutorOrderConnect: 'TutorOrderOutput'
    sendMessage: 'SendMessageOutput'
    updateProfile: 'ProfileMutationOutput'
    updateTutorOrder: 'TutorOrderOutput'
    verifyEmail: 'AuthOutput'
    viewBuddyNotifications: 'BuddyNotificationOutput'
    viewMessage: 'IOutput'
    viewNotification: 'NotificationMutationOutput'
  }
  Notification: { // field return type name
    createdAt: 'Date'
    entity_id: 'String'
    id: 'String'
    isRead: 'Boolean'
    isViewed: 'Boolean'
    message: 'String'
    notifier: 'Profile'
    notifier_id: 'String'
    receiver_id: 'String'
    type_id: 'Int'
  }
  NotificationMutationOutput: { // field return type name
    IOutput: 'IOutput'
  }
  PageInfoDataCursor: { // field return type name
    endCursor: 'Date'
    hasNextPage: 'Boolean'
    lastTake: 'Int'
  }
  PageInfoIDCursor: { // field return type name
    endCursor: 'String'
    hasNextPage: 'Boolean'
    lastTake: 'Int'
  }
  Profile: { // field return type name
    buddies: 'Relationship'
    buddyPendings: 'Relationship'
    buddyRequests: 'Relationship'
    createdAt: 'Date'
    id: 'ID'
    profile_avatar: 'String'
    profile_avatar_public_id: 'String'
    profile_bio: 'String'
    profile_interests: 'ProfileInterest'
    profile_wallpaper: 'String'
    profile_wallpaper_public_id: 'String'
    tutor_mode: 'Boolean'
    user: 'User'
  }
  ProfileInterest: { // field return type name
    interest: 'Interest'
    interest_id: 'ID'
    profile: 'Profile'
    profile_id: 'ID'
  }
  ProfileMutationOutput: { // field return type name
    IOutput: 'IOutput'
    Profile: 'Profile'
  }
  Query: { // field return type name
    getBuddyNotifications: 'BuddyNotificationOutput'
    getConversation: 'getConversationOutput'
    getManyConversations: 'getManyConversationPutput'
    getManyInterests: 'GetManyInterestOutput'
    getManyProfiles: 'GetManyProfilesOutput'
    getManyTutorOrderRequests: 'GetManyTutorOrderTutorConnect'
    getManyTutorOrders: 'GetManyTutorOrdersOutput'
    getMyTutorOrder: 'GetManyTutorOrdersOutput'
    getNotifications: 'GetNotificationOutput'
    getProfile: 'ProfileMutationOutput'
    getTutorOrder: 'TutorOrderOutput'
    getTutorOrderTutorConnect: 'GetTutorOrderTutorConnectOutput'
    getUser: 'User'
  }
  Relationship: { // field return type name
    addressee: 'Profile'
    addressee_id: 'String'
    createdAt: 'Date'
    isRead: 'Boolean'
    isViewed: 'Boolean'
    requester: 'Profile'
    requester_id: 'String'
    specifier_id: 'String'
    status: 'RelationshipStatusCode'
    updatedAt: 'Date'
  }
  RelationshipOutput: { // field return type name
    IOutput: 'IOutput'
    Relationship: 'Relationship'
  }
  SendMessageOutput: { // field return type name
    IOutput: 'IOutput'
    Message: 'Message'
  }
  Subscription: { // field return type name
    getBuddyNotifications: 'BuddyNotificationOutput'
    getConversation: 'getConversationOutput'
    getManyConversations: 'getManyConversationPutput'
  }
  TutorOrder: { // field return type name
    createdAt: 'Date'
    id: 'String'
    isCompleted: 'Boolean'
    problem: 'String'
    student: 'Profile'
    student_id: 'String'
    tutor: 'Profile'
    tutor_id: 'String'
    tutor_order_interest: 'TutorOrderInterests'
    tutor_requirements: 'String'
    updatedAt: 'Date'
  }
  TutorOrderInterests: { // field return type name
    interest: 'Interest'
    interest_id: 'String'
    tutor_order: 'TutorOrder'
    tutor_order_id: 'String'
  }
  TutorOrderOutput: { // field return type name
    IOutput: 'IOutput'
    tutor_order: 'TutorOrder'
  }
  TutorOrderTutorConnect: { // field return type name
    status: 'TutorOrderTutorConnectStatusCode'
    tutor: 'Profile'
    tutor_id: 'String'
    tutor_order: 'TutorOrder'
    tutor_order_id: 'String'
  }
  User: { // field return type name
    email: 'String'
    id: 'ID'
    isVerified: 'Boolean'
    profile: 'Profile'
    username: 'String'
  }
  getConversationOutput: { // field return type name
    Conversation: 'Conversation'
    ConversationPageInfo: 'PageInfoIDCursor'
    IOutput: 'IOutput'
    Messages: 'Message'
  }
  getManyConversationPutput: { // field return type name
    Conversations: 'ConversationGroup'
    IOutput: 'IOutput'
    countNotViewedConversation: 'Int'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    changePassword: { // args
      input: NexusGenInputs['ChangePasswordInput']; // ChangePasswordInput!
    }
    connectBuddy: { // args
      input: NexusGenInputs['RelationshipInput']; // RelationshipInput!
    }
    connectTutorOrder: { // args
      where: NexusGenInputs['ConnectTutorOrderInput']; // ConnectTutorOrderInput!
    }
    createProfile: { // args
      input: NexusGenInputs['CreateProfileInput']; // CreateProfileInput!
    }
    createTutorOrder: { // args
      input: NexusGenInputs['CreateTutorOrderInput']; // CreateTutorOrderInput!
    }
    deleteTutorOrder: { // args
      where: NexusGenInputs['TutorOrderWhereUniqueInput']; // TutorOrderWhereUniqueInput!
    }
    forgotPassword: { // args
      input: NexusGenInputs['ForgotPasswordInput']; // ForgotPasswordInput!
    }
    login: { // args
      input: NexusGenInputs['LoginInput']; // LoginInput!
    }
    readBuddyNotifications: { // args
      where: NexusGenInputs['ReadBuddyNotificationsInput']; // ReadBuddyNotificationsInput!
    }
    readMessage: { // args
      where: NexusGenInputs['ConversationGroupWhereUniqueInput']; // ConversationGroupWhereUniqueInput!
    }
    readNotification: { // args
      where: NexusGenInputs['NotificationWhereUniqueInput']; // NotificationWhereUniqueInput!
    }
    register: { // args
      input: NexusGenInputs['RegisterInput']; // RegisterInput!
    }
    removeAvatar: { // args
      input: NexusGenInputs['DestroyImageInput']; // DestroyImageInput!
      where: NexusGenInputs['ProfileWhereUniqueInput']; // ProfileWhereUniqueInput!
    }
    removeBuddy: { // args
      input: NexusGenInputs['RelationshipInput']; // RelationshipInput!
    }
    removeWallpaper: { // args
      input: NexusGenInputs['DestroyImageInput']; // DestroyImageInput!
      where: NexusGenInputs['ProfileWhereUniqueInput']; // ProfileWhereUniqueInput!
    }
    respondBuddy: { // args
      input: NexusGenInputs['RelationshipInput']; // RelationshipInput!
    }
    respondTutorOrderConnect: { // args
      input: NexusGenInputs['ResondTutorOrderConnectInput']; // ResondTutorOrderConnectInput!
      where: NexusGenInputs['TutorOrderWhereUniqueInput']; // TutorOrderWhereUniqueInput!
    }
    sendMessage: { // args
      input: NexusGenInputs['SendMessageInput']; // SendMessageInput!
      where: NexusGenInputs['ProfileWhereUniqueInput']; // ProfileWhereUniqueInput!
    }
    updateProfile: { // args
      input: NexusGenInputs['CreateProfileInput']; // CreateProfileInput!
      where: NexusGenInputs['ProfileWhereUniqueInput']; // ProfileWhereUniqueInput!
    }
    updateTutorOrder: { // args
      input: NexusGenInputs['CreateTutorOrderInput']; // CreateTutorOrderInput!
      where: NexusGenInputs['TutorOrderWhereUniqueInput']; // TutorOrderWhereUniqueInput!
    }
    verifyEmail: { // args
      input: NexusGenInputs['VerifyEmailInput']; // VerifyEmailInput!
    }
    viewBuddyNotifications: { // args
      where: NexusGenInputs['ProfileWhereUniqueInput']; // ProfileWhereUniqueInput!
    }
    viewMessage: { // args
      where: NexusGenInputs['ProfileWhereUniqueInput']; // ProfileWhereUniqueInput!
    }
    viewNotification: { // args
      where: NexusGenInputs['ProfileWhereUniqueInput']; // ProfileWhereUniqueInput!
    }
  }
  Query: {
    getBuddyNotifications: { // args
      where: NexusGenInputs['ProfileWhereUniqueInput']; // ProfileWhereUniqueInput!
    }
    getConversation: { // args
      page: NexusGenInputs['ConversationPageInput']; // ConversationPageInput!
      where: NexusGenInputs['ConversationWhereUniqueInput']; // ConversationWhereUniqueInput!
    }
    getManyConversations: { // args
      where: NexusGenInputs['ProfileWhereUniqueInput']; // ProfileWhereUniqueInput!
    }
    getManyInterests: { // args
      where: NexusGenInputs['getManyInterestsInput']; // getManyInterestsInput!
    }
    getManyProfiles: { // args
      where: NexusGenInputs['GetManyProfilesInput']; // GetManyProfilesInput!
    }
    getManyTutorOrderRequests: { // args
      where: NexusGenInputs['TutorOrderWhereUniqueInput']; // TutorOrderWhereUniqueInput!
    }
    getManyTutorOrders: { // args
      where: NexusGenInputs['GetManyTutorOrdersInput']; // GetManyTutorOrdersInput!
    }
    getMyTutorOrder: { // args
      where: NexusGenInputs['ProfileWhereUniqueInput']; // ProfileWhereUniqueInput!
    }
    getNotifications: { // args
      where: NexusGenInputs['ProfileWhereUniqueInput']; // ProfileWhereUniqueInput!
    }
    getProfile: { // args
      where: NexusGenInputs['ProfileWhereUniqueInput']; // ProfileWhereUniqueInput!
    }
    getTutorOrder: { // args
      where: NexusGenInputs['TutorOrderWhereUniqueInput']; // TutorOrderWhereUniqueInput!
    }
    getTutorOrderTutorConnect: { // args
      where_1: NexusGenInputs['ProfileWhereUniqueInput']; // ProfileWhereUniqueInput!
      where_2: NexusGenInputs['TutorOrderWhereUniqueInput']; // TutorOrderWhereUniqueInput!
    }
  }
  Subscription: {
    getBuddyNotifications: { // args
      where: NexusGenInputs['ProfileWhereUniqueInput']; // ProfileWhereUniqueInput!
    }
    getConversation: { // args
      where: NexusGenInputs['ConversationWhereUniqueInput']; // ConversationWhereUniqueInput!
    }
    getManyConversations: { // args
      where: NexusGenInputs['ProfileWhereUniqueInput']; // ProfileWhereUniqueInput!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}