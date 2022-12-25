import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date custom scalar type */
  Date: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type AuthOutput = {
  __typename?: 'AuthOutput';
  ErrorFieldOutput?: Maybe<Array<ErrorFieldOutput>>;
  IOutput: IOutput;
  User?: Maybe<User>;
};

export type BuddyNotificationOutput = {
  __typename?: 'BuddyNotificationOutput';
  IOutput: IOutput;
  PageInfo?: Maybe<PageInfoIdCursor>;
  buddyAccepts?: Maybe<Array<Relationship>>;
  buddyRequests?: Maybe<Array<Relationship>>;
  countNotViewedBuddyNotifications?: Maybe<Scalars['Int']>;
};

export type BuddyRequest = {
  __typename?: 'BuddyRequest';
  buddy_requester: Profile;
  buddy_requester_id: Scalars['String'];
  description: Scalars['String'];
  extended_buddy_request_data?: Maybe<Scalars['JSON']>;
  id: Scalars['ID'];
  purpose: Purpose;
  purpose_id: Scalars['String'];
  purpose_type: PurposeType;
  purpose_type_id: Scalars['String'];
};

export type BuddyRequestWhereUniqueInput = {
  buddy_request_id: Scalars['String'];
};

export type ChangeImageInput = {
  image_file: Scalars['Upload'];
};

export type ChangePasswordInput = {
  password: Scalars['String'];
  token: Scalars['String'];
};

export type CompoundIdEndCursor = {
  __typename?: 'CompoundIDEndCursor';
  id_1?: Maybe<Scalars['String']>;
  id_2?: Maybe<Scalars['String']>;
};

export type ConnectTutorOrderInput = {
  message_content?: InputMaybe<Scalars['String']>;
  student_id: Scalars['String'];
  tutor_id: Scalars['String'];
  tutor_order_id: Scalars['String'];
};

export type Conversation = {
  __typename?: 'Conversation';
  conversation_avatar?: Maybe<Scalars['String']>;
  conversation_latest_message?: Maybe<Message>;
  conversation_member: Array<Profile>;
  conversation_name?: Maybe<Scalars['String']>;
  id: Scalars['String'];
};

export type ConversationGroup = {
  __typename?: 'ConversationGroup';
  conversation: Conversation;
  conversation_id: Scalars['String'];
  conversation_member_id: Scalars['String'];
  isRead: Scalars['Boolean'];
  isViewed: Scalars['Boolean'];
  joined_at: Scalars['Date'];
  left_at?: Maybe<Scalars['Date']>;
};

export type ConversationGroupWhereUniqueInput = {
  conversation_id: Scalars['String'];
  profile_id: Scalars['String'];
};

export type ConversationPageInput = {
  cursor?: InputMaybe<Scalars['String']>;
  take: Scalars['Int'];
};

export type ConversationWhereUniqueInput = {
  conversation_id: Scalars['String'];
  profile_id?: InputMaybe<Scalars['String']>;
};

export type CreateBuddyRequestInput = {
  description: Scalars['String'];
  extended_buddy_request_data: Scalars['JSON'];
  profile_id: Scalars['String'];
  purpose_name: Scalars['String'];
  purpose_type_name: Scalars['String'];
};

export type CreateBuddyRequestOutput = {
  __typename?: 'CreateBuddyRequestOutput';
  IOutput: IOutput;
  buddy_request?: Maybe<BuddyRequest>;
};

export type CreateInterestInput = {
  interest_name: Scalars['String'];
};

export type CreateNotificationInput = {
  entity_id: Scalars['String'];
  notifier_id: Scalars['String'];
  receiver_id: Scalars['String'];
  type_id: Scalars['Int'];
};

export type CreateProfileInput = {
  birthday?: InputMaybe<Scalars['Date']>;
  gender?: InputMaybe<Gender>;
  location_name?: InputMaybe<Scalars['String']>;
  profile_avatar?: InputMaybe<Scalars['Upload']>;
  profile_bio?: InputMaybe<Scalars['String']>;
};

export type CreatePurposeInput = {
  purpose_description: Scalars['String'];
  purpose_name: Scalars['String'];
  purpose_type: Array<CreatePurposeTypeInput>;
};

export type CreatePurposeTypeInput = {
  purpose_name: Scalars['String'];
  purpose_type_description: Scalars['String'];
  purpose_type_name: Scalars['String'];
};

export type CreatePurposeTypeOutput = {
  __typename?: 'CreatePurposeTypeOutput';
  IOutput: IOutput;
  purpose_type?: Maybe<PurposeType>;
};

export type CreateTutorOrderInput = {
  problem: Scalars['String'];
  student_id: Scalars['String'];
  tutor_id?: InputMaybe<Scalars['String']>;
  tutor_order_interests: Array<InputMaybe<CreateInterestInput>>;
  tutor_requirements: Scalars['String'];
};

export type DestroyImageInput = {
  img_public_id: Scalars['String'];
};

export type Education = {
  __typename?: 'Education';
  current: Scalars['Boolean'];
  education_description?: Maybe<Scalars['String']>;
  field_of_study: Scalars['String'];
  id: Scalars['String'];
  institution_name: Scalars['String'];
  joined_at?: Maybe<Scalars['Date']>;
  left_at?: Maybe<Scalars['Date']>;
  logo?: Maybe<Scalars['String']>;
  logo_public_id?: Maybe<Scalars['String']>;
};

export type EducationInput = {
  current?: InputMaybe<Scalars['Boolean']>;
  education_description?: InputMaybe<Scalars['String']>;
  field_of_study: Scalars['String'];
  institution_name: Scalars['String'];
  joined_at?: InputMaybe<Scalars['Date']>;
  left_at?: InputMaybe<Scalars['Date']>;
};

export type EducationWhereUniqueInput = {
  id: Scalars['String'];
};

export type ErrorFieldOutput = {
  __typename?: 'ErrorFieldOutput';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type ForgotPasswordInput = {
  email: Scalars['String'];
};

export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE',
  Others = 'OTHERS'
}

export type GetManyBuddyRequestsInput = {
  cursor?: InputMaybe<Scalars['String']>;
  search_query: Scalars['String'];
  take: Scalars['Int'];
};

export type GetManyBuddyRequestsOutput = {
  __typename?: 'GetManyBuddyRequestsOutput';
  BuddyRequestPageInfo?: Maybe<PageInfoIdCursor>;
  IOutput: IOutput;
  buddy_requests?: Maybe<Array<BuddyRequest>>;
};

export type GetManyInterestOutput = {
  __typename?: 'GetManyInterestOutput';
  IOutput: IOutput;
  Interest?: Maybe<Array<Maybe<Interest>>>;
};

export type GetManyProfilesInput = {
  cursor?: InputMaybe<Scalars['Date']>;
  search_input?: InputMaybe<Scalars['String']>;
  take: Scalars['Int'];
};

export type GetManyProfilesOutput = {
  __typename?: 'GetManyProfilesOutput';
  IOutput: IOutput;
  PageInfo?: Maybe<PageInfoDataCursor>;
  Profile?: Maybe<Array<Maybe<Profile>>>;
};

export type GetManyPurposeTypesInput = {
  partial: Scalars['Boolean'];
  purpose_type: Scalars['String'];
};

export type GetManyPurposeTypesOutput = {
  __typename?: 'GetManyPurposeTypesOutput';
  IOutput: IOutput;
  purpose_types?: Maybe<Array<PurposeType>>;
};

export type GetManyPurposesInput = {
  purpose_name: Scalars['String'];
};

export type GetManyPurposesOutput = {
  __typename?: 'GetManyPurposesOutput';
  IOutput: IOutput;
  purposes?: Maybe<Array<Purpose>>;
};

export type GetManyTutorOrderTutorConnect = {
  __typename?: 'GetManyTutorOrderTutorConnect';
  IOutput: IOutput;
  tutor_order_tutor_connect?: Maybe<Array<Maybe<TutorOrderTutorConnect>>>;
};

export type GetManyTutorOrdersInput = {
  cursor?: InputMaybe<Scalars['String']>;
  search_input?: InputMaybe<Scalars['String']>;
  take: Scalars['Int'];
};

export type GetManyTutorOrdersOutput = {
  __typename?: 'GetManyTutorOrdersOutput';
  IOutput: IOutput;
  PageInfoIDCursor?: Maybe<PageInfoIdCursor>;
  tutor_order?: Maybe<Array<TutorOrder>>;
};

export type GetMyBuddiesInput = {
  addressee_id?: InputMaybe<Scalars['String']>;
  requester_id?: InputMaybe<Scalars['String']>;
  search_input?: InputMaybe<Scalars['String']>;
  take: Scalars['Int'];
};

export type GetMyBuddiesOutput = {
  __typename?: 'GetMyBuddiesOutput';
  IOutput: IOutput;
  PageInfo?: Maybe<PageInfoCompoundIdCursor>;
  relationships?: Maybe<Array<Relationship>>;
};

export type GetMyBuddyRequestsInput = {
  cursor?: InputMaybe<Scalars['String']>;
  search_query: Scalars['String'];
  take: Scalars['Int'];
};

export type GetNotificationOutput = {
  __typename?: 'GetNotificationOutput';
  IOutput: IOutput;
  countNotViewedNotifications?: Maybe<Scalars['Int']>;
  notifications?: Maybe<Array<Maybe<Notification>>>;
};

export type GetRelationshipInput = {
  addressee_id: Scalars['String'];
  requester_id: Scalars['String'];
};

export type GetRelationshipOutput = {
  __typename?: 'GetRelationshipOutput';
  IOutput: IOutput;
  otherEndRelationship?: Maybe<Relationship>;
  relationship?: Maybe<Relationship>;
};

export type GetSuggestedBuddyRequests = {
  cursor?: InputMaybe<Scalars['String']>;
  purpose_name: Array<Scalars['String']>;
  purpose_type_name: Array<Scalars['String']>;
  take: Scalars['Int'];
};

export type GetTutorOrderTutorConnectOutput = {
  __typename?: 'GetTutorOrderTutorConnectOutput';
  IOutput: IOutput;
  tutor_order_tutor_connect?: Maybe<TutorOrderTutorConnect>;
};

export type GetUniquePurposeType = {
  __typename?: 'GetUniquePurposeType';
  IOutput: IOutput;
  purpose_type?: Maybe<PurposeType>;
};

export type GetUniquePurposeTypeInput = {
  purpose_type_name: Scalars['String'];
};

export type IOutput = {
  __typename?: 'IOutput';
  code: Scalars['Int'];
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type Interest = {
  __typename?: 'Interest';
  id: Scalars['ID'];
  interest_name?: Maybe<Scalars['String']>;
  profile_interests: Array<ProfileInterest>;
};

export type Location = {
  __typename?: 'Location';
  id: Scalars['Int'];
  location_name: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type MarkCompleteTutorOrderInput = {
  student_id: Scalars['String'];
  tutor_id: Scalars['String'];
  tutor_order_id: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  author: Profile;
  conversation_id: Scalars['String'];
  createdAt?: Maybe<Scalars['Date']>;
  id: Scalars['String'];
  message_author_id: Scalars['String'];
  message_content: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword?: Maybe<AuthOutput>;
  connectBuddy?: Maybe<RelationshipOutput>;
  connectTutorOrder?: Maybe<TutorOrderOutput>;
  createBuddyRequest?: Maybe<CreateBuddyRequestOutput>;
  createGroupConversation?: Maybe<InitConversationOutput>;
  createProfile?: Maybe<ProfileMutationOutput>;
  createPurposeType?: Maybe<CreatePurposeTypeOutput>;
  createTutorOrder?: Maybe<TutorOrderOutput>;
  deleteEducation?: Maybe<ProfileMutationOutput>;
  deleteTutorOrder?: Maybe<TutorOrderOutput>;
  deleteTutorOrderConnect?: Maybe<TutorOrderOutput>;
  deleteWorkExperience?: Maybe<ProfileMutationOutput>;
  forgotPassword?: Maybe<AuthOutput>;
  initConversation?: Maybe<InitConversationOutput>;
  login: AuthOutput;
  logout: AuthOutput;
  markCompleteTutorOrder?: Maybe<TutorOrderOutput>;
  readBuddyNotifications?: Maybe<BuddyNotificationOutput>;
  readMessage?: Maybe<IOutput>;
  readNotification?: Maybe<NotificationMutationOutput>;
  register: AuthOutput;
  removeAvatar?: Maybe<ProfileMutationOutput>;
  removeBuddy?: Maybe<RelationshipOutput>;
  removeWallpaper?: Maybe<ProfileMutationOutput>;
  respondBuddy?: Maybe<RelationshipOutput>;
  respondTutorOrderConnect?: Maybe<TutorOrderOutput>;
  sendMessage?: Maybe<SendMessageOutput>;
  updateAvatar?: Maybe<ProfileMutationOutput>;
  updateBuddyRequest?: Maybe<CreateBuddyRequestOutput>;
  updateIntroduction?: Maybe<ProfileMutationOutput>;
  updateTutorOrder?: Maybe<TutorOrderOutput>;
  updateWallpaper?: Maybe<ProfileMutationOutput>;
  upsertAgeLocation?: Maybe<ProfileMutationOutput>;
  upsertEducation?: Maybe<UpsertEducationOutput>;
  upsertWorkExperience?: Maybe<UpsertWorkExperienceOutput>;
  verifyEmail: AuthOutput;
  viewBuddyNotifications?: Maybe<BuddyNotificationOutput>;
  viewMessage?: Maybe<IOutput>;
  viewNotification?: Maybe<NotificationMutationOutput>;
};


export type MutationChangePasswordArgs = {
  input: ChangePasswordInput;
};


export type MutationConnectBuddyArgs = {
  input: RelationshipInput;
};


export type MutationConnectTutorOrderArgs = {
  where: ConnectTutorOrderInput;
};


export type MutationCreateBuddyRequestArgs = {
  input: CreateBuddyRequestInput;
};


export type MutationCreateGroupConversationArgs = {
  input: CreateGroupConversationInput;
};


export type MutationCreateProfileArgs = {
  input: CreateProfileInput;
};


export type MutationCreatePurposeTypeArgs = {
  input: CreatePurposeTypeInput;
};


export type MutationCreateTutorOrderArgs = {
  input: CreateTutorOrderInput;
};


export type MutationDeleteEducationArgs = {
  where: EducationWhereUniqueInput;
};


export type MutationDeleteTutorOrderArgs = {
  where: TutorOrderWhereUniqueInput;
};


export type MutationDeleteTutorOrderConnectArgs = {
  where1: TutorOrderWhereUniqueInput;
  where2: ProfileWhereUniqueInput;
};


export type MutationDeleteWorkExperienceArgs = {
  where: WorkExperienceWhereUniqueInput;
};


export type MutationForgotPasswordArgs = {
  input: ForgotPasswordInput;
};


export type MutationInitConversationArgs = {
  input: InitConversationInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationMarkCompleteTutorOrderArgs = {
  where: MarkCompleteTutorOrderInput;
};


export type MutationReadBuddyNotificationsArgs = {
  where: ReadBuddyNotificationsInput;
};


export type MutationReadMessageArgs = {
  where: ConversationGroupWhereUniqueInput;
};


export type MutationReadNotificationArgs = {
  where: NotificationWhereUniqueInput;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationRemoveAvatarArgs = {
  input: DestroyImageInput;
  where: ProfileWhereUniqueInput;
};


export type MutationRemoveBuddyArgs = {
  input: RelationshipInput;
};


export type MutationRemoveWallpaperArgs = {
  input: DestroyImageInput;
  where: ProfileWhereUniqueInput;
};


export type MutationRespondBuddyArgs = {
  input: RelationshipInput;
};


export type MutationRespondTutorOrderConnectArgs = {
  where: ResondTutorOrderConnectInput;
};


export type MutationSendMessageArgs = {
  input: SendMessageInput;
  where: ProfileWhereUniqueInput;
};


export type MutationUpdateAvatarArgs = {
  input: ChangeImageInput;
  where: ProfileWhereUniqueInput;
};


export type MutationUpdateBuddyRequestArgs = {
  input: UpdateBuddyRequestInput;
  where: BuddyRequestWhereUniqueInput;
};


export type MutationUpdateIntroductionArgs = {
  input: UpdateIntroductionInput;
  where: ProfileWhereUniqueInput;
};


export type MutationUpdateTutorOrderArgs = {
  input: CreateTutorOrderInput;
  where: TutorOrderWhereUniqueInput;
};


export type MutationUpdateWallpaperArgs = {
  input: ChangeImageInput;
  where: ProfileWhereUniqueInput;
};


export type MutationUpsertAgeLocationArgs = {
  input: UpsertAgeLocationInput;
  where: ProfileWhereUniqueInput;
};


export type MutationUpsertEducationArgs = {
  input: UpsertEducationInput;
  where: ProfileWhereUniqueInput;
};


export type MutationUpsertWorkExperienceArgs = {
  input: UpsertWorkExperienceInput;
  where: ProfileWhereUniqueInput;
};


export type MutationVerifyEmailArgs = {
  input: VerifyEmailInput;
};


export type MutationViewBuddyNotificationsArgs = {
  where: ProfileWhereUniqueInput;
};


export type MutationViewMessageArgs = {
  where: ProfileWhereUniqueInput;
};


export type MutationViewNotificationArgs = {
  where: ProfileWhereUniqueInput;
};

export type Notification = {
  __typename?: 'Notification';
  createdAt: Scalars['Date'];
  entity_id?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  isRead: Scalars['Boolean'];
  isViewed: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
  notifier?: Maybe<Profile>;
  notifier_id: Scalars['String'];
  receiver_id: Scalars['String'];
  type_id: Scalars['Int'];
};

export type NotificationMutationOutput = {
  __typename?: 'NotificationMutationOutput';
  IOutput: IOutput;
};

export type NotificationWhereUniqueInput = {
  id: Scalars['String'];
};

export type PageInfoCompoundIdCursor = {
  __typename?: 'PageInfoCompoundIDCursor';
  endCursor?: Maybe<CompoundIdEndCursor>;
  hasNextPage: Scalars['Boolean'];
  lastTake?: Maybe<Scalars['Int']>;
};

export type PageInfoDataCursor = {
  __typename?: 'PageInfoDataCursor';
  endCursor?: Maybe<Scalars['Date']>;
  hasNextPage: Scalars['Boolean'];
  lastTake?: Maybe<Scalars['Int']>;
};

export type PageInfoIdCursor = {
  __typename?: 'PageInfoIDCursor';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  lastTake?: Maybe<Scalars['Int']>;
};

export type Profile = {
  __typename?: 'Profile';
  birthday?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
  education?: Maybe<Array<Maybe<Education>>>;
  gender?: Maybe<Gender>;
  id: Scalars['ID'];
  location?: Maybe<Location>;
  location_id?: Maybe<Scalars['Int']>;
  profile_avatar?: Maybe<Scalars['String']>;
  profile_avatar_public_id?: Maybe<Scalars['String']>;
  profile_bio?: Maybe<Scalars['String']>;
  profile_wallpaper?: Maybe<Scalars['String']>;
  profile_wallpaper_public_id?: Maybe<Scalars['String']>;
  tutor_mode: Scalars['Boolean'];
  user?: Maybe<User>;
  work_experience?: Maybe<Array<Maybe<WorkExperience>>>;
};

export type ProfileInterest = {
  __typename?: 'ProfileInterest';
  interest: Interest;
  interest_id: Scalars['ID'];
  profile: Profile;
  profile_id: Scalars['ID'];
};

export type ProfileMutationOutput = {
  __typename?: 'ProfileMutationOutput';
  IOutput: IOutput;
  Profile?: Maybe<Profile>;
};

export type ProfileWhereUniqueInput = {
  profile_id: Scalars['ID'];
};

export type Purpose = {
  __typename?: 'Purpose';
  id: Scalars['ID'];
  purpose_description: Scalars['String'];
  purpose_name: Scalars['String'];
  purpose_type?: Maybe<Array<Maybe<PurposeType>>>;
};

export type PurposeType = {
  __typename?: 'PurposeType';
  extened_purpose_type_data?: Maybe<Scalars['JSON']>;
  id: Scalars['ID'];
  purpose: Purpose;
  purpose_id: Scalars['String'];
  purpose_type_description: Scalars['String'];
  purpose_type_name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getBuddyNotifications?: Maybe<BuddyNotificationOutput>;
  getConversation?: Maybe<GetConversationOutput>;
  getManyBuddyRequests?: Maybe<GetManyBuddyRequestsOutput>;
  getManyConversations?: Maybe<GetManyConversationPutput>;
  getManyInterests?: Maybe<GetManyInterestOutput>;
  getManyProfiles?: Maybe<GetManyProfilesOutput>;
  getManyPurposeTypes?: Maybe<GetManyPurposeTypesOutput>;
  getManyPurposes?: Maybe<GetManyPurposesOutput>;
  getManyTutorOrderRequests?: Maybe<GetManyTutorOrderTutorConnect>;
  getManyTutorOrders?: Maybe<GetManyTutorOrdersOutput>;
  getMyBuddies?: Maybe<GetMyBuddiesOutput>;
  getMyBuddiesRequests?: Maybe<GetMyBuddiesOutput>;
  getMyBuddyRequests?: Maybe<GetManyBuddyRequestsOutput>;
  getMyTutorOrder?: Maybe<GetManyTutorOrdersOutput>;
  getNotifications?: Maybe<GetNotificationOutput>;
  getProfile?: Maybe<ProfileMutationOutput>;
  getRelationship?: Maybe<GetRelationshipOutput>;
  getSuggestedBuddyRequests?: Maybe<GetManyBuddyRequestsOutput>;
  getTutorOrder?: Maybe<TutorOrderOutput>;
  getTutorOrderTutorConnect?: Maybe<GetTutorOrderTutorConnectOutput>;
  getUniquePurposeType?: Maybe<GetUniquePurposeType>;
  getUser?: Maybe<User>;
};


export type QueryGetBuddyNotificationsArgs = {
  where: ProfileWhereUniqueInput;
};


export type QueryGetConversationArgs = {
  page: ConversationPageInput;
  where: ConversationWhereUniqueInput;
};


export type QueryGetManyBuddyRequestsArgs = {
  where: GetManyBuddyRequestsInput;
};


export type QueryGetManyConversationsArgs = {
  where: ProfileWhereUniqueInput;
};


export type QueryGetManyInterestsArgs = {
  where: GetManyInterestsInput;
};


export type QueryGetManyProfilesArgs = {
  where: GetManyProfilesInput;
};


export type QueryGetManyPurposeTypesArgs = {
  where: GetManyPurposeTypesInput;
};


export type QueryGetManyPurposesArgs = {
  where: GetManyPurposesInput;
};


export type QueryGetManyTutorOrderRequestsArgs = {
  where: TutorOrderWhereUniqueInput;
};


export type QueryGetManyTutorOrdersArgs = {
  where: GetManyTutorOrdersInput;
};


export type QueryGetMyBuddiesArgs = {
  input: GetMyBuddiesInput;
  where: ProfileWhereUniqueInput;
};


export type QueryGetMyBuddiesRequestsArgs = {
  input: GetMyBuddiesInput;
  where: ProfileWhereUniqueInput;
};


export type QueryGetMyBuddyRequestsArgs = {
  input: GetMyBuddyRequestsInput;
};


export type QueryGetMyTutorOrderArgs = {
  where: ProfileWhereUniqueInput;
};


export type QueryGetNotificationsArgs = {
  where: ProfileWhereUniqueInput;
};


export type QueryGetProfileArgs = {
  where: ProfileWhereUniqueInput;
};


export type QueryGetRelationshipArgs = {
  where: GetRelationshipInput;
};


export type QueryGetSuggestedBuddyRequestsArgs = {
  where: GetSuggestedBuddyRequests;
};


export type QueryGetTutorOrderArgs = {
  where: TutorOrderWhereUniqueInput;
};


export type QueryGetTutorOrderTutorConnectArgs = {
  where_1: ProfileWhereUniqueInput;
  where_2: TutorOrderWhereUniqueInput;
};


export type QueryGetUniquePurposeTypeArgs = {
  where: GetUniquePurposeTypeInput;
};

export type ReadBuddyNotificationsInput = {
  addressee_id: Scalars['String'];
  requester_id: Scalars['String'];
};

export type RegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Relationship = {
  __typename?: 'Relationship';
  addressee: Profile;
  addressee_id: Scalars['String'];
  conversation_id?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  isRead: Scalars['Boolean'];
  isViewed: Scalars['Boolean'];
  requester: Profile;
  requester_id: Scalars['String'];
  status: RelationshipStatusCode;
  updatedAt: Scalars['Date'];
};

export type RelationshipInput = {
  addressee_id: Scalars['String'];
  requester_id: Scalars['String'];
  status: RelationshipStatusCode;
};

export type RelationshipOutput = {
  __typename?: 'RelationshipOutput';
  IOutput: IOutput;
  otherEndRelationship?: Maybe<Relationship>;
  relationship?: Maybe<Relationship>;
};

export enum RelationshipStatusCode {
  Accepted = 'ACCEPTED',
  Declined = 'DECLINED',
  Requested = 'REQUESTED'
}

export type ResondTutorOrderConnectInput = {
  status: TutorOrderTutorConnectStatusCode;
  student_id: Scalars['String'];
  tutor_id: Scalars['String'];
  tutor_order_id: Scalars['String'];
};

export type SendMessageInput = {
  conversation_id: Scalars['String'];
  message_content: Scalars['String'];
};

export type SendMessageOutput = {
  __typename?: 'SendMessageOutput';
  IOutput: IOutput;
  Message?: Maybe<Message>;
};

export type Subscription = {
  __typename?: 'Subscription';
  getBuddyNotifications?: Maybe<BuddyNotificationOutput>;
  getConversation?: Maybe<GetConversationOutput>;
  getManyConversations?: Maybe<GetManyConversationPutput>;
  getNotifications?: Maybe<GetNotificationOutput>;
};


export type SubscriptionGetBuddyNotificationsArgs = {
  where: ProfileWhereUniqueInput;
};


export type SubscriptionGetConversationArgs = {
  where: ConversationGroupWhereUniqueInput;
};


export type SubscriptionGetManyConversationsArgs = {
  where: ProfileWhereUniqueInput;
};


export type SubscriptionGetNotificationsArgs = {
  where: ProfileWhereUniqueInput;
};

export type TutorOrder = {
  __typename?: 'TutorOrder';
  createdAt: Scalars['Date'];
  id: Scalars['String'];
  isCompleted: Scalars['Boolean'];
  problem: Scalars['String'];
  student: Profile;
  student_id: Scalars['String'];
  tutor?: Maybe<Profile>;
  tutor_id?: Maybe<Scalars['String']>;
  tutor_order_interest?: Maybe<Array<TutorOrderInterests>>;
  tutor_requirements: Scalars['String'];
  updatedAt: Scalars['Date'];
};

export type TutorOrderInterests = {
  __typename?: 'TutorOrderInterests';
  interest: Interest;
  interest_id: Scalars['String'];
  tutor_order: TutorOrder;
  tutor_order_id: Scalars['String'];
};

export type TutorOrderOutput = {
  __typename?: 'TutorOrderOutput';
  IOutput: IOutput;
  tutor_order?: Maybe<TutorOrder>;
};

export type TutorOrderTutorConnect = {
  __typename?: 'TutorOrderTutorConnect';
  status: TutorOrderTutorConnectStatusCode;
  tutor: Profile;
  tutor_id: Scalars['String'];
  tutor_order: TutorOrder;
  tutor_order_id: Scalars['String'];
};

export enum TutorOrderTutorConnectStatusCode {
  Accepted = 'ACCEPTED',
  Declined = 'DECLINED',
  Requested = 'REQUESTED'
}

export type TutorOrderWhereUniqueInput = {
  id: Scalars['String'];
};

export type UpdateBuddyRequestInput = {
  description: Scalars['String'];
  extended_buddy_request_data: Scalars['JSON'];
  purpose_name: Scalars['String'];
  purpose_type_name: Scalars['String'];
};

export type UpdateProfilePurposesInput = {
  profile_id: Scalars['String'];
};

export type UpdateProfilePurposesOutput = {
  __typename?: 'UpdateProfilePurposesOutput';
  IOutput: IOutput;
};

export type UpsertAgeLocationInput = {
  birthday: Scalars['Date'];
  location_name: Scalars['String'];
};

export type UpsertEducationInput = {
  current: Scalars['Boolean'];
  education_description?: InputMaybe<Scalars['String']>;
  field_of_study: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  institution_name: Scalars['String'];
  joined_at?: InputMaybe<Scalars['Date']>;
  left_at?: InputMaybe<Scalars['Date']>;
  logo?: InputMaybe<Scalars['Upload']>;
};

export type UpsertEducationOutput = {
  __typename?: 'UpsertEducationOutput';
  IOutput: IOutput;
  education?: Maybe<Education>;
};

export type UpsertWorkExperienceInput = {
  current: Scalars['Boolean'];
  id?: InputMaybe<Scalars['String']>;
  joined_at?: InputMaybe<Scalars['Date']>;
  left_at?: InputMaybe<Scalars['Date']>;
  logo?: InputMaybe<Scalars['Upload']>;
  work_description?: InputMaybe<Scalars['String']>;
  work_position?: InputMaybe<Scalars['String']>;
  workplace_name: Scalars['String'];
};

export type UpsertWorkExperienceOutput = {
  __typename?: 'UpsertWorkExperienceOutput';
  IOutput: IOutput;
  work_experience?: Maybe<WorkExperience>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['ID'];
  isVerified: Scalars['Boolean'];
  profile?: Maybe<Profile>;
  username: Scalars['String'];
};

export type VerifyEmailInput = {
  token: Scalars['String'];
};

export type WorkExperience = {
  __typename?: 'WorkExperience';
  current: Scalars['Boolean'];
  id: Scalars['String'];
  joined_at?: Maybe<Scalars['Date']>;
  left_at?: Maybe<Scalars['Date']>;
  logo?: Maybe<Scalars['String']>;
  logo_public_id?: Maybe<Scalars['String']>;
  profile_id: Scalars['String'];
  work_description?: Maybe<Scalars['String']>;
  work_position?: Maybe<Scalars['String']>;
  workplace_name: Scalars['String'];
};

export type WorkExperienceInput = {
  current: Scalars['Boolean'];
  joined_at?: InputMaybe<Scalars['Date']>;
  left_at?: InputMaybe<Scalars['Date']>;
  logo?: InputMaybe<Scalars['Upload']>;
  work_description?: InputMaybe<Scalars['String']>;
  work_position?: InputMaybe<Scalars['String']>;
  workplace_name: Scalars['String'];
};

export type WorkExperienceWhereUniqueInput = {
  id: Scalars['String'];
};

export type CreateGroupConversationInput = {
  creator_id: Scalars['String'];
  member_ids: Array<Scalars['String']>;
  message_content?: InputMaybe<Scalars['String']>;
};

export type CreatePurposeOutput = {
  __typename?: 'createPurposeOutput';
  IOutput: IOutput;
};

export type GetConversationOutput = {
  __typename?: 'getConversationOutput';
  Conversation?: Maybe<Conversation>;
  ConversationPageInfo?: Maybe<PageInfoIdCursor>;
  IOutput: IOutput;
  Messages?: Maybe<Array<Message>>;
};

export type GetManyConversationPutput = {
  __typename?: 'getManyConversationPutput';
  Conversations?: Maybe<Array<ConversationGroup>>;
  IOutput: IOutput;
  countNotViewedConversation?: Maybe<Scalars['Int']>;
};

export type GetManyInterestsInput = {
  search_input?: InputMaybe<Scalars['String']>;
};

export type InitConversationInput = {
  addressee_id: Scalars['String'];
  requester_id: Scalars['String'];
};

export type InitConversationOutput = {
  __typename?: 'initConversationOutput';
  IOutput: IOutput;
  conversation?: Maybe<Conversation>;
};

export type UpdateIntroductionInput = {
  profile_bio: Scalars['String'];
};

export type BuddyRequestFragment = { __typename?: 'BuddyRequest', id: string, description: string, extended_buddy_request_data?: any | null, buddy_requester: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null }, purpose: { __typename?: 'Purpose', id: string, purpose_name: string, purpose_description: string }, purpose_type: { __typename?: 'PurposeType', id: string, purpose_type_name: string, purpose_type_description: string, purpose_id: string, purpose: { __typename?: 'Purpose', id: string, purpose_name: string, purpose_description: string } } };

export type ConversationFragment = { __typename?: 'Conversation', id: string, conversation_name?: string | null, conversation_avatar?: string | null, conversation_latest_message?: { __typename?: 'Message', id: string, conversation_id: string, message_author_id: string, message_content: string, createdAt?: any | null, author: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null } } | null, conversation_member: Array<{ __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null }> };

export type ConversationGroupFragment = { __typename?: 'ConversationGroup', conversation_id: string, conversation_member_id: string, isRead: boolean, isViewed: boolean, joined_at: any, left_at?: any | null, conversation: { __typename?: 'Conversation', id: string, conversation_name?: string | null, conversation_avatar?: string | null, conversation_latest_message?: { __typename?: 'Message', id: string, conversation_id: string, message_author_id: string, message_content: string, createdAt?: any | null, author: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null } } | null, conversation_member: Array<{ __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null }> } };

export type EducationFragment = { __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null };

export type IOutputFragment = { __typename?: 'IOutput', code: number, message: string, success: boolean };

export type InterestFragment = { __typename?: 'Interest', id: string, interest_name?: string | null };

export type LocationFragment = { __typename?: 'Location', id: number, location_name: string };

export type MessageFragment = { __typename?: 'Message', id: string, conversation_id: string, message_author_id: string, message_content: string, createdAt?: any | null, author: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null } };

export type NotificationFragment = { __typename?: 'Notification', id: string, entity_id?: string | null, receiver_id: string, notifier_id: string, type_id: number, message?: string | null, isViewed: boolean, isRead: boolean, createdAt: any, notifier?: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null } | null };

export type ProfileFragment = { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null };

export type ProfileInterestFragment = { __typename?: 'ProfileInterest', interest_id: string, profile_id: string, interest: { __typename?: 'Interest', id: string, interest_name?: string | null } };

export type PurposeFragment = { __typename?: 'Purpose', id: string, purpose_name: string, purpose_description: string };

export type PurposeTypeFragment = { __typename?: 'PurposeType', id: string, purpose_type_name: string, purpose_type_description: string, purpose_id: string, purpose: { __typename?: 'Purpose', id: string, purpose_name: string, purpose_description: string } };

export type RelationshipFragment = { __typename?: 'Relationship', addressee_id: string, requester_id: string, conversation_id?: string | null, status: RelationshipStatusCode, isRead: boolean, isViewed: boolean, createdAt: any, updatedAt: any, addressee: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null }, requester: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null } };

export type TutorOrderFragment = { __typename?: 'TutorOrder', id: string, student_id: string, tutor_id?: string | null, problem: string, tutor_requirements: string, isCompleted: boolean, createdAt: any, updatedAt: any, student: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null }, tutor?: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null } | null, tutor_order_interest?: Array<{ __typename?: 'TutorOrderInterests', interest: { __typename?: 'Interest', id: string, interest_name?: string | null } }> | null };

export type TutorOrderInterestsFragment = { __typename?: 'TutorOrderInterests', interest: { __typename?: 'Interest', id: string, interest_name?: string | null } };

export type TutorOrderTutorConnectFragment = { __typename?: 'TutorOrderTutorConnect', tutor_order_id: string, tutor_id: string, status: TutorOrderTutorConnectStatusCode, tutor_order: { __typename?: 'TutorOrder', id: string, student_id: string, tutor_id?: string | null, problem: string, tutor_requirements: string, isCompleted: boolean, createdAt: any, updatedAt: any, student: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null }, tutor?: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null } | null, tutor_order_interest?: Array<{ __typename?: 'TutorOrderInterests', interest: { __typename?: 'Interest', id: string, interest_name?: string | null } }> | null }, tutor: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null } };

export type UserFragment = { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean };

export type WorkExperienceFragment = { __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null };

export type MarkCompleteTutorOrderMutationVariables = Exact<{
  where: MarkCompleteTutorOrderInput;
}>;


export type MarkCompleteTutorOrderMutation = { __typename?: 'Mutation', markCompleteTutorOrder?: { __typename?: 'TutorOrderOutput', IOutput: { __typename?: 'IOutput', code: number, message: string, success: boolean }, tutor_order?: { __typename?: 'TutorOrder', id: string, student_id: string, tutor_id?: string | null, problem: string, tutor_requirements: string, isCompleted: boolean, createdAt: any, updatedAt: any, student: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null }, tutor?: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null } | null, tutor_order_interest?: Array<{ __typename?: 'TutorOrderInterests', interest: { __typename?: 'Interest', id: string, interest_name?: string | null } }> | null } | null } | null };

export type ChangePasswordMutationVariables = Exact<{
  input: ChangePasswordInput;
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword?: { __typename?: 'AuthOutput', IOutput: { __typename?: 'IOutput', code: number, message: string, success: boolean }, User?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null, ErrorFieldOutput?: Array<{ __typename?: 'ErrorFieldOutput', field: string, message: string }> | null } | null };

export type ConnectBuddyMutationVariables = Exact<{
  input: RelationshipInput;
}>;


export type ConnectBuddyMutation = { __typename?: 'Mutation', connectBuddy?: { __typename?: 'RelationshipOutput', IOutput: { __typename?: 'IOutput', code: number, message: string, success: boolean } } | null };

export type ConnectTutorOrderMutationVariables = Exact<{
  where: ConnectTutorOrderInput;
}>;


export type ConnectTutorOrderMutation = { __typename?: 'Mutation', connectTutorOrder?: { __typename?: 'TutorOrderOutput', IOutput: { __typename?: 'IOutput', code: number, message: string, success: boolean } } | null };

export type CreateBuddyRequestMutationVariables = Exact<{
  input: CreateBuddyRequestInput;
}>;


export type CreateBuddyRequestMutation = { __typename?: 'Mutation', createBuddyRequest?: { __typename?: 'CreateBuddyRequestOutput', IOutput: { __typename?: 'IOutput', code: number, message: string, success: boolean }, buddy_request?: { __typename?: 'BuddyRequest', id: string, description: string, extended_buddy_request_data?: any | null, buddy_requester: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null }, purpose: { __typename?: 'Purpose', id: string, purpose_name: string, purpose_description: string }, purpose_type: { __typename?: 'PurposeType', id: string, purpose_type_name: string, purpose_type_description: string, purpose_id: string, purpose: { __typename?: 'Purpose', id: string, purpose_name: string, purpose_description: string } } } | null } | null };

export type CreateGroupConversationMutationVariables = Exact<{
  input: CreateGroupConversationInput;
}>;


export type CreateGroupConversationMutation = { __typename?: 'Mutation', createGroupConversation?: { __typename?: 'initConversationOutput', IOutput: { __typename?: 'IOutput', code: number, message: string, success: boolean }, conversation?: { __typename?: 'Conversation', id: string, conversation_name?: string | null, conversation_avatar?: string | null, conversation_latest_message?: { __typename?: 'Message', id: string, conversation_id: string, message_author_id: string, message_content: string, createdAt?: any | null, author: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null } } | null, conversation_member: Array<{ __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null }> } | null } | null };

export type CreateProfileMutationVariables = Exact<{
  input: CreateProfileInput;
}>;


export type CreateProfileMutation = { __typename?: 'Mutation', createProfile?: { __typename?: 'ProfileMutationOutput', IOutput: { __typename?: 'IOutput', code: number, message: string, success: boolean }, Profile?: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null } | null } | null };

export type CreatePurposeTypeMutationVariables = Exact<{
  input: CreatePurposeTypeInput;
}>;


export type CreatePurposeTypeMutation = { __typename?: 'Mutation', createPurposeType?: { __typename?: 'CreatePurposeTypeOutput', IOutput: { __typename?: 'IOutput', code: number, message: string, success: boolean }, purpose_type?: { __typename?: 'PurposeType', id: string, purpose_type_name: string, purpose_type_description: string, purpose_id: string, purpose: { __typename?: 'Purpose', id: string, purpose_name: string, purpose_description: string } } | null } | null };

export type CreateTutorOrderMutationVariables = Exact<{
  input: CreateTutorOrderInput;
}>;


export type CreateTutorOrderMutation = { __typename?: 'Mutation', createTutorOrder?: { __typename?: 'TutorOrderOutput', IOutput: { __typename?: 'IOutput', code: number, message: string, success: boolean }, tutor_order?: { __typename?: 'TutorOrder', id: string, student_id: string, tutor_id?: string | null, problem: string, tutor_requirements: string, isCompleted: boolean, createdAt: any, updatedAt: any, student: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null }, tutor?: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null } | null, tutor_order_interest?: Array<{ __typename?: 'TutorOrderInterests', interest: { __typename?: 'Interest', id: string, interest_name?: string | null } }> | null } | null } | null };

export type DeleteEducationMutationVariables = Exact<{
  where: EducationWhereUniqueInput;
}>;


export type DeleteEducationMutation = { __typename?: 'Mutation', deleteEducation?: { __typename?: 'ProfileMutationOutput', IOutput: { __typename?: 'IOutput', code: number, message: string, success: boolean }, Profile?: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null } | null } | null };

export type DeleteTutorOrderMutationVariables = Exact<{
  where: TutorOrderWhereUniqueInput;
}>;


export type DeleteTutorOrderMutation = { __typename?: 'Mutation', deleteTutorOrder?: { __typename?: 'TutorOrderOutput', IOutput: { __typename?: 'IOutput', code: number, message: string, success: boolean } } | null };

export type DeleteTutorOrderConnectMutationVariables = Exact<{
  where1: TutorOrderWhereUniqueInput;
  where2: ProfileWhereUniqueInput;
}>;


export type DeleteTutorOrderConnectMutation = { __typename?: 'Mutation', deleteTutorOrderConnect?: { __typename?: 'TutorOrderOutput', IOutput: { __typename?: 'IOutput', code: number, message: string, success: boolean } } | null };

export type DeleteWorkExperienceMutationVariables = Exact<{
  where: WorkExperienceWhereUniqueInput;
}>;


export type DeleteWorkExperienceMutation = { __typename?: 'Mutation', deleteWorkExperience?: { __typename?: 'ProfileMutationOutput', IOutput: { __typename?: 'IOutput', code: number, message: string, success: boolean }, Profile?: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null } | null } | null };

export type ForgotPasswordMutationVariables = Exact<{
  input: ForgotPasswordInput;
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword?: { __typename?: 'AuthOutput', IOutput: { __typename?: 'IOutput', code: number, message: string, success: boolean }, ErrorFieldOutput?: Array<{ __typename?: 'ErrorFieldOutput', field: string, message: string }> | null } | null };

export type InitConversationMutationVariables = Exact<{
  input: InitConversationInput;
}>;


export type InitConversationMutation = { __typename?: 'Mutation', initConversation?: { __typename?: 'initConversationOutput', IOutput: { __typename?: 'IOutput', code: number, message: string, success: boolean }, conversation?: { __typename?: 'Conversation', id: string, conversation_name?: string | null, conversation_avatar?: string | null, conversation_latest_message?: { __typename?: 'Message', id: string, conversation_id: string, message_author_id: string, message_content: string, createdAt?: any | null, author: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null } } | null, conversation_member: Array<{ __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null }> } | null } | null };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthOutput', IOutput: { __typename?: 'IOutput', code: number, message: string, success: boolean }, User?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean, profile?: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null } | null } | null, ErrorFieldOutput?: Array<{ __typename?: 'ErrorFieldOutput', field: string, message: string }> | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'AuthOutput', IOutput: { __typename?: 'IOutput', code: number, message: string, success: boolean } } };

export type ReadBuddyNotificationsMutationVariables = Exact<{
  where: ReadBuddyNotificationsInput;
}>;


export type ReadBuddyNotificationsMutation = { __typename?: 'Mutation', readBuddyNotifications?: { __typename?: 'BuddyNotificationOutput', IOutput: { __typename?: 'IOutput', code: number, message: string, success: boolean } } | null };

export type ReadNotificationMutationVariables = Exact<{
  where: NotificationWhereUniqueInput;
}>;


export type ReadNotificationMutation = { __typename?: 'Mutation', readNotification?: { __typename?: 'NotificationMutationOutput', IOutput: { __typename?: 'IOutput', code: number, message: string, success: boolean } } | null };

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'AuthOutput', IOutput: { __typename?: 'IOutput', code: number, message: string, success: boolean }, User?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null, ErrorFieldOutput?: Array<{ __typename?: 'ErrorFieldOutput', field: string, message: string }> | null } };

export type RemoveAvatarMutationVariables = Exact<{
  where: ProfileWhereUniqueInput;
  input: DestroyImageInput;
}>;


export type RemoveAvatarMutation = { __typename?: 'Mutation', removeAvatar?: { __typename?: 'ProfileMutationOutput', IOutput: { __typename?: 'IOutput', code: number, message: string, success: boolean }, Profile?: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null } | null } | null };

export type RemoveBuddyMutationVariables = Exact<{
  input: RelationshipInput;
}>;


export type RemoveBuddyMutation = { __typename?: 'Mutation', removeBuddy?: { __typename?: 'RelationshipOutput', IOutput: { __typename?: 'IOutput', code: number, message: string, success: boolean } } | null };

export type RemoveWallpaperMutationVariables = Exact<{
  where: ProfileWhereUniqueInput;
  input: DestroyImageInput;
}>;


export type RemoveWallpaperMutation = { __typename?: 'Mutation', removeWallpaper?: { __typename?: 'ProfileMutationOutput', IOutput: { __typename?: 'IOutput', code: number, message: string, success: boolean }, Profile?: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null } | null } | null };

export type RespondBuddyMutationVariables = Exact<{
  input: RelationshipInput;
}>;


export type RespondBuddyMutation = { __typename?: 'Mutation', respondBuddy?: { __typename?: 'RelationshipOutput', IOutput: { __typename?: 'IOutput', code: number, message: string, success: boolean }, relationship?: { __typename?: 'Relationship', addressee_id: string, requester_id: string, conversation_id?: string | null, status: RelationshipStatusCode, isRead: boolean, isViewed: boolean, createdAt: any, updatedAt: any, addressee: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null }, requester: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null } } | null, otherEndRelationship?: { __typename?: 'Relationship', addressee_id: string, requester_id: string, conversation_id?: string | null, status: RelationshipStatusCode, isRead: boolean, isViewed: boolean, createdAt: any, updatedAt: any, addressee: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null }, requester: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null } } | null } | null };

export type RespondTutorOrderConnectMutationVariables = Exact<{
  where: ResondTutorOrderConnectInput;
}>;


export type RespondTutorOrderConnectMutation = { __typename?: 'Mutation', respondTutorOrderConnect?: { __typename?: 'TutorOrderOutput', IOutput: { __typename?: 'IOutput', code: number, message: string, success: boolean } } | null };

export type SendMessageMutationVariables = Exact<{
  input: SendMessageInput;
  where: ProfileWhereUniqueInput;
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage?: { __typename?: 'SendMessageOutput', IOutput: { __typename?: 'IOutput', code: number, message: string, success: boolean }, Message?: { __typename?: 'Message', id: string, conversation_id: string, message_author_id: string, message_content: string, createdAt?: any | null, author: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null } } | null } | null };

export type UpdateAvatarMutationVariables = Exact<{
  where: ProfileWhereUniqueInput;
  input: ChangeImageInput;
}>;


export type UpdateAvatarMutation = { __typename?: 'Mutation', updateAvatar?: { __typename?: 'ProfileMutationOutput', IOutput: { __typename?: 'IOutput', code: number, message: string, success: boolean }, Profile?: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null } | null } | null };

export type UpdateBuddyRequestMutationVariables = Exact<{
  where: BuddyRequestWhereUniqueInput;
  input: UpdateBuddyRequestInput;
}>;


export type UpdateBuddyRequestMutation = { __typename?: 'Mutation', updateBuddyRequest?: { __typename?: 'CreateBuddyRequestOutput', IOutput: { __typename?: 'IOutput', code: number, message: string, success: boolean }, buddy_request?: { __typename?: 'BuddyRequest', id: string, description: string, extended_buddy_request_data?: any | null, buddy_requester: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null }, purpose: { __typename?: 'Purpose', id: string, purpose_name: string, purpose_description: string }, purpose_type: { __typename?: 'PurposeType', id: string, purpose_type_name: string, purpose_type_description: string, purpose_id: string, purpose: { __typename?: 'Purpose', id: string, purpose_name: string, purpose_description: string } } } | null } | null };

export type UpdateIntroductionMutationVariables = Exact<{
  where: ProfileWhereUniqueInput;
  input: UpdateIntroductionInput;
}>;


export type UpdateIntroductionMutation = { __typename?: 'Mutation', updateIntroduction?: { __typename?: 'ProfileMutationOutput', IOutput: { __typename?: 'IOutput', code: number, message: string, success: boolean }, Profile?: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null } | null } | null };

export type UpdateTutorOrderMutationVariables = Exact<{
  input: CreateTutorOrderInput;
  where: TutorOrderWhereUniqueInput;
}>;


export type UpdateTutorOrderMutation = { __typename?: 'Mutation', updateTutorOrder?: { __typename?: 'TutorOrderOutput', IOutput: { __typename?: 'IOutput', code: number, message: string, success: boolean } } | null };

export type UpdateWallpaperMutationVariables = Exact<{
  where: ProfileWhereUniqueInput;
  input: ChangeImageInput;
}>;


export type UpdateWallpaperMutation = { __typename?: 'Mutation', updateWallpaper?: { __typename?: 'ProfileMutationOutput', IOutput: { __typename?: 'IOutput', code: number, message: string, success: boolean }, Profile?: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null } | null } | null };

export type UpsertAgeLocationMutationVariables = Exact<{
  where: ProfileWhereUniqueInput;
  input: UpsertAgeLocationInput;
}>;


export type UpsertAgeLocationMutation = { __typename?: 'Mutation', upsertAgeLocation?: { __typename?: 'ProfileMutationOutput', IOutput: { __typename?: 'IOutput', code: number, message: string, success: boolean }, Profile?: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null } | null } | null };

export type UpsertEducationMutationVariables = Exact<{
  where: ProfileWhereUniqueInput;
  input: UpsertEducationInput;
}>;


export type UpsertEducationMutation = { __typename?: 'Mutation', upsertEducation?: { __typename?: 'UpsertEducationOutput', IOutput: { __typename?: 'IOutput', code: number, message: string, success: boolean }, education?: { __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null } | null };

export type UpsertWorkExperienceMutationVariables = Exact<{
  where: ProfileWhereUniqueInput;
  input: UpsertWorkExperienceInput;
}>;


export type UpsertWorkExperienceMutation = { __typename?: 'Mutation', upsertWorkExperience?: { __typename?: 'UpsertWorkExperienceOutput', IOutput: { __typename?: 'IOutput', code: number, message: string, success: boolean }, work_experience?: { __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null } | null };

export type VerifyEmailMutationVariables = Exact<{
  input: VerifyEmailInput;
}>;


export type VerifyEmailMutation = { __typename?: 'Mutation', verifyEmail: { __typename?: 'AuthOutput', IOutput: { __typename?: 'IOutput', code: number, message: string, success: boolean }, User?: { __typename?: 'User', isVerified: boolean, id: string, username: string, email: string } | null } };

export type ViewBuddyNotificationsMutationVariables = Exact<{
  where: ProfileWhereUniqueInput;
}>;


export type ViewBuddyNotificationsMutation = { __typename?: 'Mutation', viewBuddyNotifications?: { __typename?: 'BuddyNotificationOutput', IOutput: { __typename?: 'IOutput', code: number, message: string, success: boolean } } | null };

export type ViewMessageMutationVariables = Exact<{
  where: ProfileWhereUniqueInput;
}>;


export type ViewMessageMutation = { __typename?: 'Mutation', viewMessage?: { __typename?: 'IOutput', code: number, message: string, success: boolean } | null };

export type ViewNotificationMutationVariables = Exact<{
  where: ProfileWhereUniqueInput;
}>;


export type ViewNotificationMutation = { __typename?: 'Mutation', viewNotification?: { __typename?: 'NotificationMutationOutput', IOutput: { __typename?: 'IOutput', code: number, message: string, success: boolean } } | null };

export type GetBuddyNotificationsQueryVariables = Exact<{
  where: ProfileWhereUniqueInput;
}>;


export type GetBuddyNotificationsQuery = { __typename?: 'Query', getBuddyNotifications?: { __typename?: 'BuddyNotificationOutput', countNotViewedBuddyNotifications?: number | null, IOutput: { __typename?: 'IOutput', code: number, message: string, success: boolean }, buddyRequests?: Array<{ __typename?: 'Relationship', addressee_id: string, requester_id: string, conversation_id?: string | null, status: RelationshipStatusCode, isRead: boolean, isViewed: boolean, createdAt: any, updatedAt: any, addressee: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null }, requester: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null } }> | null, buddyAccepts?: Array<{ __typename?: 'Relationship', addressee_id: string, requester_id: string, conversation_id?: string | null, status: RelationshipStatusCode, isRead: boolean, isViewed: boolean, createdAt: any, updatedAt: any, addressee: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null }, requester: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null } }> | null } | null };

export type GetConversationQueryVariables = Exact<{
  where: ConversationWhereUniqueInput;
  page: ConversationPageInput;
}>;


export type GetConversationQuery = { __typename?: 'Query', getConversation?: { __typename?: 'getConversationOutput', IOutput: { __typename?: 'IOutput', code: number, message: string, success: boolean }, Conversation?: { __typename?: 'Conversation', id: string, conversation_name?: string | null, conversation_avatar?: string | null, conversation_latest_message?: { __typename?: 'Message', id: string, conversation_id: string, message_author_id: string, message_content: string, createdAt?: any | null, author: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null } } | null, conversation_member: Array<{ __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null }> } | null, Messages?: Array<{ __typename?: 'Message', id: string, conversation_id: string, message_author_id: string, message_content: string, createdAt?: any | null, author: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null } }> | null, ConversationPageInfo?: { __typename?: 'PageInfoIDCursor', endCursor?: string | null, hasNextPage: boolean, lastTake?: number | null } | null } | null };

export type GetManyBuddyRequestsQueryVariables = Exact<{
  where: GetManyBuddyRequestsInput;
}>;


export type GetManyBuddyRequestsQuery = { __typename?: 'Query', getManyBuddyRequests?: { __typename?: 'GetManyBuddyRequestsOutput', IOutput: { __typename?: 'IOutput', code: number, message: string, success: boolean }, buddy_requests?: Array<{ __typename?: 'BuddyRequest', id: string, description: string, extended_buddy_request_data?: any | null, buddy_requester: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null }, purpose: { __typename?: 'Purpose', id: string, purpose_name: string, purpose_description: string }, purpose_type: { __typename?: 'PurposeType', id: string, purpose_type_name: string, purpose_type_description: string, purpose_id: string, purpose: { __typename?: 'Purpose', id: string, purpose_name: string, purpose_description: string } } }> | null, BuddyRequestPageInfo?: { __typename?: 'PageInfoIDCursor', endCursor?: string | null, hasNextPage: boolean, lastTake?: number | null } | null } | null };

export type GetManyConversationsQueryVariables = Exact<{
  where: ProfileWhereUniqueInput;
}>;


export type GetManyConversationsQuery = { __typename?: 'Query', getManyConversations?: { __typename?: 'getManyConversationPutput', countNotViewedConversation?: number | null, IOutput: { __typename?: 'IOutput', code: number, message: string, success: boolean }, Conversations?: Array<{ __typename?: 'ConversationGroup', conversation_id: string, conversation_member_id: string, isRead: boolean, isViewed: boolean, joined_at: any, left_at?: any | null, conversation: { __typename?: 'Conversation', id: string, conversation_name?: string | null, conversation_avatar?: string | null, conversation_latest_message?: { __typename?: 'Message', id: string, conversation_id: string, message_author_id: string, message_content: string, createdAt?: any | null, author: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null } } | null, conversation_member: Array<{ __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null }> } }> | null } | null };

export type GetManyInterestsQueryVariables = Exact<{
  where: GetManyInterestsInput;
}>;


export type GetManyInterestsQuery = { __typename?: 'Query', getManyInterests?: { __typename?: 'GetManyInterestOutput', IOutput: { __typename?: 'IOutput', code: number, message: string, success: boolean }, Interest?: Array<{ __typename?: 'Interest', id: string, interest_name?: string | null } | null> | null } | null };

export type GetManyProfilesQueryVariables = Exact<{
  where: GetManyProfilesInput;
}>;


export type GetManyProfilesQuery = { __typename?: 'Query', getManyProfiles?: { __typename?: 'GetManyProfilesOutput', IOutput: { __typename?: 'IOutput', code: number, message: string, success: boolean }, Profile?: Array<{ __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null } | null> | null, PageInfo?: { __typename?: 'PageInfoDataCursor', endCursor?: any | null, hasNextPage: boolean, lastTake?: number | null } | null } | null };

export type GetManyPurposeTypesQueryVariables = Exact<{
  where: GetManyPurposeTypesInput;
}>;


export type GetManyPurposeTypesQuery = { __typename?: 'Query', getManyPurposeTypes?: { __typename?: 'GetManyPurposeTypesOutput', IOutput: { __typename?: 'IOutput', code: number, message: string, success: boolean }, purpose_types?: Array<{ __typename?: 'PurposeType', id: string, purpose_type_name: string, purpose_type_description: string, purpose_id: string, purpose: { __typename?: 'Purpose', id: string, purpose_name: string, purpose_description: string } }> | null } | null };

export type GetManyTutorOrdersQueryVariables = Exact<{
  where: GetManyTutorOrdersInput;
}>;


export type GetManyTutorOrdersQuery = { __typename?: 'Query', getManyTutorOrders?: { __typename?: 'GetManyTutorOrdersOutput', IOutput: { __typename?: 'IOutput', code: number, message: string, success: boolean }, tutor_order?: Array<{ __typename?: 'TutorOrder', id: string, student_id: string, tutor_id?: string | null, problem: string, tutor_requirements: string, isCompleted: boolean, createdAt: any, updatedAt: any, student: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null }, tutor?: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null } | null, tutor_order_interest?: Array<{ __typename?: 'TutorOrderInterests', interest: { __typename?: 'Interest', id: string, interest_name?: string | null } }> | null }> | null } | null };

export type GetManyTutorOrderRequestsQueryVariables = Exact<{
  where: TutorOrderWhereUniqueInput;
}>;


export type GetManyTutorOrderRequestsQuery = { __typename?: 'Query', getManyTutorOrderRequests?: { __typename?: 'GetManyTutorOrderTutorConnect', IOutput: { __typename?: 'IOutput', code: number, message: string, success: boolean }, tutor_order_tutor_connect?: Array<{ __typename?: 'TutorOrderTutorConnect', tutor_order_id: string, tutor_id: string, status: TutorOrderTutorConnectStatusCode, tutor_order: { __typename?: 'TutorOrder', id: string, student_id: string, tutor_id?: string | null, problem: string, tutor_requirements: string, isCompleted: boolean, createdAt: any, updatedAt: any, student: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null }, tutor?: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null } | null, tutor_order_interest?: Array<{ __typename?: 'TutorOrderInterests', interest: { __typename?: 'Interest', id: string, interest_name?: string | null } }> | null }, tutor: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null } } | null> | null } | null };

export type GetMyBuddiesQueryVariables = Exact<{
  where: ProfileWhereUniqueInput;
  input: GetMyBuddiesInput;
}>;


export type GetMyBuddiesQuery = { __typename?: 'Query', getMyBuddies?: { __typename?: 'GetMyBuddiesOutput', IOutput: { __typename?: 'IOutput', code: number, message: string, success: boolean }, relationships?: Array<{ __typename?: 'Relationship', addressee_id: string, requester_id: string, conversation_id?: string | null, status: RelationshipStatusCode, isRead: boolean, isViewed: boolean, createdAt: any, updatedAt: any, addressee: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null }, requester: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null } }> | null, PageInfo?: { __typename?: 'PageInfoCompoundIDCursor', hasNextPage: boolean, lastTake?: number | null, endCursor?: { __typename?: 'CompoundIDEndCursor', id_1?: string | null, id_2?: string | null } | null } | null } | null };

export type GetMyBuddiesRequestsQueryVariables = Exact<{
  where: ProfileWhereUniqueInput;
  input: GetMyBuddiesInput;
}>;


export type GetMyBuddiesRequestsQuery = { __typename?: 'Query', getMyBuddiesRequests?: { __typename?: 'GetMyBuddiesOutput', IOutput: { __typename?: 'IOutput', code: number, message: string, success: boolean }, relationships?: Array<{ __typename?: 'Relationship', addressee_id: string, requester_id: string, conversation_id?: string | null, status: RelationshipStatusCode, isRead: boolean, isViewed: boolean, createdAt: any, updatedAt: any, addressee: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null }, requester: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null } }> | null, PageInfo?: { __typename?: 'PageInfoCompoundIDCursor', hasNextPage: boolean, lastTake?: number | null, endCursor?: { __typename?: 'CompoundIDEndCursor', id_1?: string | null, id_2?: string | null } | null } | null } | null };

export type GetMyBuddyRequestsQueryVariables = Exact<{
  input: GetMyBuddyRequestsInput;
}>;


export type GetMyBuddyRequestsQuery = { __typename?: 'Query', getMyBuddyRequests?: { __typename?: 'GetManyBuddyRequestsOutput', IOutput: { __typename?: 'IOutput', code: number, message: string, success: boolean }, buddy_requests?: Array<{ __typename?: 'BuddyRequest', id: string, description: string, extended_buddy_request_data?: any | null, buddy_requester: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null }, purpose: { __typename?: 'Purpose', id: string, purpose_name: string, purpose_description: string }, purpose_type: { __typename?: 'PurposeType', id: string, purpose_type_name: string, purpose_type_description: string, purpose_id: string, purpose: { __typename?: 'Purpose', id: string, purpose_name: string, purpose_description: string } } }> | null, BuddyRequestPageInfo?: { __typename?: 'PageInfoIDCursor', endCursor?: string | null, hasNextPage: boolean, lastTake?: number | null } | null } | null };

export type GetMyTutorOrderQueryVariables = Exact<{
  where: ProfileWhereUniqueInput;
}>;


export type GetMyTutorOrderQuery = { __typename?: 'Query', getMyTutorOrder?: { __typename?: 'GetManyTutorOrdersOutput', IOutput: { __typename?: 'IOutput', code: number, message: string, success: boolean }, tutor_order?: Array<{ __typename?: 'TutorOrder', id: string, student_id: string, tutor_id?: string | null, problem: string, tutor_requirements: string, isCompleted: boolean, createdAt: any, updatedAt: any, student: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null }, tutor?: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null } | null, tutor_order_interest?: Array<{ __typename?: 'TutorOrderInterests', interest: { __typename?: 'Interest', id: string, interest_name?: string | null } }> | null }> | null } | null };

export type GetNotificationsQueryVariables = Exact<{
  where: ProfileWhereUniqueInput;
}>;


export type GetNotificationsQuery = { __typename?: 'Query', getNotifications?: { __typename?: 'GetNotificationOutput', countNotViewedNotifications?: number | null, IOutput: { __typename?: 'IOutput', code: number, message: string, success: boolean }, notifications?: Array<{ __typename?: 'Notification', id: string, entity_id?: string | null, receiver_id: string, notifier_id: string, type_id: number, message?: string | null, isViewed: boolean, isRead: boolean, createdAt: any, notifier?: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null } | null } | null> | null } | null };

export type GetProfileQueryVariables = Exact<{
  where: ProfileWhereUniqueInput;
}>;


export type GetProfileQuery = { __typename?: 'Query', getProfile?: { __typename?: 'ProfileMutationOutput', IOutput: { __typename?: 'IOutput', code: number, message: string, success: boolean }, Profile?: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null } | null } | null };

export type GetRelationshipQueryVariables = Exact<{
  where: GetRelationshipInput;
}>;


export type GetRelationshipQuery = { __typename?: 'Query', getRelationship?: { __typename?: 'GetRelationshipOutput', IOutput: { __typename?: 'IOutput', code: number, message: string, success: boolean }, relationship?: { __typename?: 'Relationship', addressee_id: string, requester_id: string, conversation_id?: string | null, status: RelationshipStatusCode, isRead: boolean, isViewed: boolean, createdAt: any, updatedAt: any, addressee: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null }, requester: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null } } | null, otherEndRelationship?: { __typename?: 'Relationship', addressee_id: string, requester_id: string, conversation_id?: string | null, status: RelationshipStatusCode, isRead: boolean, isViewed: boolean, createdAt: any, updatedAt: any, addressee: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null }, requester: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null } } | null } | null };

export type GetSuggestedBuddyRequestsQueryVariables = Exact<{
  where: GetSuggestedBuddyRequests;
}>;


export type GetSuggestedBuddyRequestsQuery = { __typename?: 'Query', getSuggestedBuddyRequests?: { __typename?: 'GetManyBuddyRequestsOutput', IOutput: { __typename?: 'IOutput', code: number, message: string, success: boolean }, buddy_requests?: Array<{ __typename?: 'BuddyRequest', id: string, description: string, extended_buddy_request_data?: any | null, buddy_requester: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null }, purpose: { __typename?: 'Purpose', id: string, purpose_name: string, purpose_description: string }, purpose_type: { __typename?: 'PurposeType', id: string, purpose_type_name: string, purpose_type_description: string, purpose_id: string, purpose: { __typename?: 'Purpose', id: string, purpose_name: string, purpose_description: string } } }> | null, BuddyRequestPageInfo?: { __typename?: 'PageInfoIDCursor', endCursor?: string | null, hasNextPage: boolean, lastTake?: number | null } | null } | null };

export type GetTutorOrderQueryVariables = Exact<{
  where: TutorOrderWhereUniqueInput;
}>;


export type GetTutorOrderQuery = { __typename?: 'Query', getTutorOrder?: { __typename?: 'TutorOrderOutput', IOutput: { __typename?: 'IOutput', code: number, message: string, success: boolean }, tutor_order?: { __typename?: 'TutorOrder', id: string, student_id: string, tutor_id?: string | null, problem: string, tutor_requirements: string, isCompleted: boolean, createdAt: any, updatedAt: any, student: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null }, tutor?: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null } | null, tutor_order_interest?: Array<{ __typename?: 'TutorOrderInterests', interest: { __typename?: 'Interest', id: string, interest_name?: string | null } }> | null } | null } | null };

export type GetTutorOrderTutorConnectQueryVariables = Exact<{
  where1: ProfileWhereUniqueInput;
  where2: TutorOrderWhereUniqueInput;
}>;


export type GetTutorOrderTutorConnectQuery = { __typename?: 'Query', getTutorOrderTutorConnect?: { __typename?: 'GetTutorOrderTutorConnectOutput', IOutput: { __typename?: 'IOutput', code: number, message: string, success: boolean }, tutor_order_tutor_connect?: { __typename?: 'TutorOrderTutorConnect', tutor_order_id: string, tutor_id: string, status: TutorOrderTutorConnectStatusCode, tutor_order: { __typename?: 'TutorOrder', id: string, student_id: string, tutor_id?: string | null, problem: string, tutor_requirements: string, isCompleted: boolean, createdAt: any, updatedAt: any, student: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null }, tutor?: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null } | null, tutor_order_interest?: Array<{ __typename?: 'TutorOrderInterests', interest: { __typename?: 'Interest', id: string, interest_name?: string | null } }> | null }, tutor: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null } } | null } | null };

export type GetUniquePurposeTypeQueryVariables = Exact<{
  where: GetUniquePurposeTypeInput;
}>;


export type GetUniquePurposeTypeQuery = { __typename?: 'Query', getUniquePurposeType?: { __typename?: 'GetUniquePurposeType', IOutput: { __typename?: 'IOutput', code: number, message: string, success: boolean }, purpose_type?: { __typename?: 'PurposeType', id: string, purpose_type_name: string, purpose_type_description: string, purpose_id: string, purpose: { __typename?: 'Purpose', id: string, purpose_name: string, purpose_description: string } } | null } | null };

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', getUser?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean, profile?: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null } | null } | null };

export type GetBuddyNotificationsSubsSubscriptionVariables = Exact<{
  where: ProfileWhereUniqueInput;
}>;


export type GetBuddyNotificationsSubsSubscription = { __typename?: 'Subscription', getBuddyNotifications?: { __typename?: 'BuddyNotificationOutput', countNotViewedBuddyNotifications?: number | null, IOutput: { __typename?: 'IOutput', code: number, message: string, success: boolean }, buddyRequests?: Array<{ __typename?: 'Relationship', addressee_id: string, requester_id: string, conversation_id?: string | null, status: RelationshipStatusCode, isRead: boolean, isViewed: boolean, createdAt: any, updatedAt: any, addressee: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null }, requester: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null } }> | null, buddyAccepts?: Array<{ __typename?: 'Relationship', addressee_id: string, requester_id: string, conversation_id?: string | null, status: RelationshipStatusCode, isRead: boolean, isViewed: boolean, createdAt: any, updatedAt: any, addressee: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null }, requester: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null } }> | null } | null };

export type GetConversationSubSubscriptionVariables = Exact<{
  where: ConversationGroupWhereUniqueInput;
}>;


export type GetConversationSubSubscription = { __typename?: 'Subscription', getConversation?: { __typename?: 'getConversationOutput', IOutput: { __typename?: 'IOutput', code: number, message: string, success: boolean }, Conversation?: { __typename?: 'Conversation', id: string, conversation_name?: string | null, conversation_avatar?: string | null, conversation_latest_message?: { __typename?: 'Message', id: string, conversation_id: string, message_author_id: string, message_content: string, createdAt?: any | null, author: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null } } | null, conversation_member: Array<{ __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null }> } | null, Messages?: Array<{ __typename?: 'Message', id: string, conversation_id: string, message_author_id: string, message_content: string, createdAt?: any | null, author: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null } }> | null, ConversationPageInfo?: { __typename?: 'PageInfoIDCursor', endCursor?: string | null, hasNextPage: boolean, lastTake?: number | null } | null } | null };

export type GetManyConversationsSubsSubscriptionVariables = Exact<{
  where: ProfileWhereUniqueInput;
}>;


export type GetManyConversationsSubsSubscription = { __typename?: 'Subscription', getManyConversations?: { __typename?: 'getManyConversationPutput', countNotViewedConversation?: number | null, IOutput: { __typename?: 'IOutput', code: number, message: string, success: boolean }, Conversations?: Array<{ __typename?: 'ConversationGroup', conversation_id: string, conversation_member_id: string, isRead: boolean, isViewed: boolean, joined_at: any, left_at?: any | null, conversation: { __typename?: 'Conversation', id: string, conversation_name?: string | null, conversation_avatar?: string | null, conversation_latest_message?: { __typename?: 'Message', id: string, conversation_id: string, message_author_id: string, message_content: string, createdAt?: any | null, author: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null } } | null, conversation_member: Array<{ __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null }> } }> | null } | null };

export type GetNotificationsSubSubscriptionVariables = Exact<{
  where: ProfileWhereUniqueInput;
}>;


export type GetNotificationsSubSubscription = { __typename?: 'Subscription', getNotifications?: { __typename?: 'GetNotificationOutput', countNotViewedNotifications?: number | null, IOutput: { __typename?: 'IOutput', code: number, message: string, success: boolean }, notifications?: Array<{ __typename?: 'Notification', id: string, entity_id?: string | null, receiver_id: string, notifier_id: string, type_id: number, message?: string | null, isViewed: boolean, isRead: boolean, createdAt: any, notifier?: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, tutor_mode: boolean, birthday?: any | null, gender?: Gender | null, location?: { __typename?: 'Location', id: number, location_name: string } | null, work_experience?: Array<{ __typename?: 'WorkExperience', id: string, workplace_name: string, work_position?: string | null, work_description?: string | null, current: boolean, logo?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, education?: Array<{ __typename?: 'Education', id: string, institution_name: string, field_of_study: string, education_description?: string | null, current: boolean, logo?: string | null, logo_public_id?: string | null, joined_at?: any | null, left_at?: any | null } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string, isVerified: boolean } | null } | null } | null> | null } | null };

export const LocationFragmentDoc = gql`
    fragment Location on Location {
  id
  location_name
}
    `;
export const WorkExperienceFragmentDoc = gql`
    fragment WorkExperience on WorkExperience {
  id
  workplace_name
  work_position
  work_description
  current
  logo
  joined_at
  left_at
}
    `;
export const EducationFragmentDoc = gql`
    fragment Education on Education {
  id
  institution_name
  field_of_study
  education_description
  current
  logo
  logo_public_id
  joined_at
  left_at
}
    `;
export const UserFragmentDoc = gql`
    fragment User on User {
  id
  username
  email
  isVerified
}
    `;
export const ProfileFragmentDoc = gql`
    fragment Profile on Profile {
  id
  profile_bio
  profile_avatar
  profile_avatar_public_id
  profile_wallpaper
  profile_wallpaper_public_id
  tutor_mode
  birthday
  location {
    ...Location
  }
  gender
  work_experience {
    ...WorkExperience
  }
  education {
    ...Education
  }
  user {
    ...User
  }
}
    ${LocationFragmentDoc}
${WorkExperienceFragmentDoc}
${EducationFragmentDoc}
${UserFragmentDoc}`;
export const PurposeFragmentDoc = gql`
    fragment Purpose on Purpose {
  id
  purpose_name
  purpose_description
}
    `;
export const PurposeTypeFragmentDoc = gql`
    fragment PurposeType on PurposeType {
  id
  purpose_type_name
  purpose_type_description
  purpose_id
  purpose {
    ...Purpose
  }
}
    ${PurposeFragmentDoc}`;
export const BuddyRequestFragmentDoc = gql`
    fragment BuddyRequest on BuddyRequest {
  id
  description
  buddy_requester {
    ...Profile
  }
  purpose {
    ...Purpose
  }
  purpose_type {
    ...PurposeType
  }
  extended_buddy_request_data
}
    ${ProfileFragmentDoc}
${PurposeFragmentDoc}
${PurposeTypeFragmentDoc}`;
export const MessageFragmentDoc = gql`
    fragment Message on Message {
  id
  conversation_id
  message_author_id
  author {
    ...Profile
  }
  message_content
  createdAt
}
    ${ProfileFragmentDoc}`;
export const ConversationFragmentDoc = gql`
    fragment Conversation on Conversation {
  id
  conversation_name
  conversation_avatar
  conversation_latest_message {
    ...Message
  }
  conversation_member {
    ...Profile
  }
}
    ${MessageFragmentDoc}
${ProfileFragmentDoc}`;
export const ConversationGroupFragmentDoc = gql`
    fragment ConversationGroup on ConversationGroup {
  conversation_id
  conversation_member_id
  conversation {
    ...Conversation
  }
  isRead
  isViewed
  joined_at
  left_at
}
    ${ConversationFragmentDoc}`;
export const IOutputFragmentDoc = gql`
    fragment IOutput on IOutput {
  code
  message
  success
}
    `;
export const NotificationFragmentDoc = gql`
    fragment Notification on Notification {
  id
  entity_id
  receiver_id
  notifier_id
  notifier {
    ...Profile
  }
  type_id
  message
  isViewed
  isRead
  createdAt
}
    ${ProfileFragmentDoc}`;
export const InterestFragmentDoc = gql`
    fragment Interest on Interest {
  id
  interest_name
}
    `;
export const ProfileInterestFragmentDoc = gql`
    fragment ProfileInterest on ProfileInterest {
  interest_id
  interest {
    ...Interest
  }
  profile_id
}
    ${InterestFragmentDoc}`;
export const RelationshipFragmentDoc = gql`
    fragment Relationship on Relationship {
  addressee_id
  addressee {
    ...Profile
  }
  requester_id
  requester {
    ...Profile
  }
  conversation_id
  status
  isRead
  isViewed
  createdAt
  updatedAt
}
    ${ProfileFragmentDoc}`;
export const TutorOrderInterestsFragmentDoc = gql`
    fragment TutorOrderInterests on TutorOrderInterests {
  interest {
    ...Interest
  }
}
    ${InterestFragmentDoc}`;
export const TutorOrderFragmentDoc = gql`
    fragment TutorOrder on TutorOrder {
  id
  student_id
  student {
    ...Profile
  }
  tutor_id
  tutor {
    ...Profile
  }
  tutor_order_interest {
    ...TutorOrderInterests
  }
  problem
  tutor_requirements
  isCompleted
  createdAt
  updatedAt
}
    ${ProfileFragmentDoc}
${TutorOrderInterestsFragmentDoc}`;
export const TutorOrderTutorConnectFragmentDoc = gql`
    fragment TutorOrderTutorConnect on TutorOrderTutorConnect {
  tutor_order_id
  tutor_order {
    ...TutorOrder
  }
  tutor_id
  tutor {
    ...Profile
  }
  status
}
    ${TutorOrderFragmentDoc}
${ProfileFragmentDoc}`;
export const MarkCompleteTutorOrderDocument = gql`
    mutation MarkCompleteTutorOrder($where: MarkCompleteTutorOrderInput!) {
  markCompleteTutorOrder(where: $where) {
    IOutput {
      ...IOutput
    }
    tutor_order {
      ...TutorOrder
    }
  }
}
    ${IOutputFragmentDoc}
${TutorOrderFragmentDoc}`;
export type MarkCompleteTutorOrderMutationFn = Apollo.MutationFunction<MarkCompleteTutorOrderMutation, MarkCompleteTutorOrderMutationVariables>;

/**
 * __useMarkCompleteTutorOrderMutation__
 *
 * To run a mutation, you first call `useMarkCompleteTutorOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkCompleteTutorOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markCompleteTutorOrderMutation, { data, loading, error }] = useMarkCompleteTutorOrderMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useMarkCompleteTutorOrderMutation(baseOptions?: Apollo.MutationHookOptions<MarkCompleteTutorOrderMutation, MarkCompleteTutorOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkCompleteTutorOrderMutation, MarkCompleteTutorOrderMutationVariables>(MarkCompleteTutorOrderDocument, options);
      }
export type MarkCompleteTutorOrderMutationHookResult = ReturnType<typeof useMarkCompleteTutorOrderMutation>;
export type MarkCompleteTutorOrderMutationResult = Apollo.MutationResult<MarkCompleteTutorOrderMutation>;
export type MarkCompleteTutorOrderMutationOptions = Apollo.BaseMutationOptions<MarkCompleteTutorOrderMutation, MarkCompleteTutorOrderMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation changePassword($input: ChangePasswordInput!) {
  changePassword(input: $input) {
    IOutput {
      ...IOutput
    }
    User {
      ...User
    }
    ErrorFieldOutput {
      field
      message
    }
  }
}
    ${IOutputFragmentDoc}
${UserFragmentDoc}`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const ConnectBuddyDocument = gql`
    mutation connectBuddy($input: RelationshipInput!) {
  connectBuddy(input: $input) {
    IOutput {
      ...IOutput
    }
  }
}
    ${IOutputFragmentDoc}`;
export type ConnectBuddyMutationFn = Apollo.MutationFunction<ConnectBuddyMutation, ConnectBuddyMutationVariables>;

/**
 * __useConnectBuddyMutation__
 *
 * To run a mutation, you first call `useConnectBuddyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConnectBuddyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [connectBuddyMutation, { data, loading, error }] = useConnectBuddyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useConnectBuddyMutation(baseOptions?: Apollo.MutationHookOptions<ConnectBuddyMutation, ConnectBuddyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConnectBuddyMutation, ConnectBuddyMutationVariables>(ConnectBuddyDocument, options);
      }
export type ConnectBuddyMutationHookResult = ReturnType<typeof useConnectBuddyMutation>;
export type ConnectBuddyMutationResult = Apollo.MutationResult<ConnectBuddyMutation>;
export type ConnectBuddyMutationOptions = Apollo.BaseMutationOptions<ConnectBuddyMutation, ConnectBuddyMutationVariables>;
export const ConnectTutorOrderDocument = gql`
    mutation ConnectTutorOrder($where: ConnectTutorOrderInput!) {
  connectTutorOrder(where: $where) {
    IOutput {
      ...IOutput
    }
  }
}
    ${IOutputFragmentDoc}`;
export type ConnectTutorOrderMutationFn = Apollo.MutationFunction<ConnectTutorOrderMutation, ConnectTutorOrderMutationVariables>;

/**
 * __useConnectTutorOrderMutation__
 *
 * To run a mutation, you first call `useConnectTutorOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConnectTutorOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [connectTutorOrderMutation, { data, loading, error }] = useConnectTutorOrderMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useConnectTutorOrderMutation(baseOptions?: Apollo.MutationHookOptions<ConnectTutorOrderMutation, ConnectTutorOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConnectTutorOrderMutation, ConnectTutorOrderMutationVariables>(ConnectTutorOrderDocument, options);
      }
export type ConnectTutorOrderMutationHookResult = ReturnType<typeof useConnectTutorOrderMutation>;
export type ConnectTutorOrderMutationResult = Apollo.MutationResult<ConnectTutorOrderMutation>;
export type ConnectTutorOrderMutationOptions = Apollo.BaseMutationOptions<ConnectTutorOrderMutation, ConnectTutorOrderMutationVariables>;
export const CreateBuddyRequestDocument = gql`
    mutation CreateBuddyRequest($input: CreateBuddyRequestInput!) {
  createBuddyRequest(input: $input) {
    IOutput {
      ...IOutput
    }
    buddy_request {
      ...BuddyRequest
    }
  }
}
    ${IOutputFragmentDoc}
${BuddyRequestFragmentDoc}`;
export type CreateBuddyRequestMutationFn = Apollo.MutationFunction<CreateBuddyRequestMutation, CreateBuddyRequestMutationVariables>;

/**
 * __useCreateBuddyRequestMutation__
 *
 * To run a mutation, you first call `useCreateBuddyRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBuddyRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBuddyRequestMutation, { data, loading, error }] = useCreateBuddyRequestMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateBuddyRequestMutation(baseOptions?: Apollo.MutationHookOptions<CreateBuddyRequestMutation, CreateBuddyRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBuddyRequestMutation, CreateBuddyRequestMutationVariables>(CreateBuddyRequestDocument, options);
      }
export type CreateBuddyRequestMutationHookResult = ReturnType<typeof useCreateBuddyRequestMutation>;
export type CreateBuddyRequestMutationResult = Apollo.MutationResult<CreateBuddyRequestMutation>;
export type CreateBuddyRequestMutationOptions = Apollo.BaseMutationOptions<CreateBuddyRequestMutation, CreateBuddyRequestMutationVariables>;
export const CreateGroupConversationDocument = gql`
    mutation createGroupConversation($input: createGroupConversationInput!) {
  createGroupConversation(input: $input) {
    IOutput {
      ...IOutput
    }
    conversation {
      ...Conversation
    }
  }
}
    ${IOutputFragmentDoc}
${ConversationFragmentDoc}`;
export type CreateGroupConversationMutationFn = Apollo.MutationFunction<CreateGroupConversationMutation, CreateGroupConversationMutationVariables>;

/**
 * __useCreateGroupConversationMutation__
 *
 * To run a mutation, you first call `useCreateGroupConversationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGroupConversationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGroupConversationMutation, { data, loading, error }] = useCreateGroupConversationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateGroupConversationMutation(baseOptions?: Apollo.MutationHookOptions<CreateGroupConversationMutation, CreateGroupConversationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateGroupConversationMutation, CreateGroupConversationMutationVariables>(CreateGroupConversationDocument, options);
      }
export type CreateGroupConversationMutationHookResult = ReturnType<typeof useCreateGroupConversationMutation>;
export type CreateGroupConversationMutationResult = Apollo.MutationResult<CreateGroupConversationMutation>;
export type CreateGroupConversationMutationOptions = Apollo.BaseMutationOptions<CreateGroupConversationMutation, CreateGroupConversationMutationVariables>;
export const CreateProfileDocument = gql`
    mutation createProfile($input: CreateProfileInput!) {
  createProfile(input: $input) {
    IOutput {
      ...IOutput
    }
    Profile {
      ...Profile
    }
  }
}
    ${IOutputFragmentDoc}
${ProfileFragmentDoc}`;
export type CreateProfileMutationFn = Apollo.MutationFunction<CreateProfileMutation, CreateProfileMutationVariables>;

/**
 * __useCreateProfileMutation__
 *
 * To run a mutation, you first call `useCreateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProfileMutation, { data, loading, error }] = useCreateProfileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProfileMutation(baseOptions?: Apollo.MutationHookOptions<CreateProfileMutation, CreateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProfileMutation, CreateProfileMutationVariables>(CreateProfileDocument, options);
      }
export type CreateProfileMutationHookResult = ReturnType<typeof useCreateProfileMutation>;
export type CreateProfileMutationResult = Apollo.MutationResult<CreateProfileMutation>;
export type CreateProfileMutationOptions = Apollo.BaseMutationOptions<CreateProfileMutation, CreateProfileMutationVariables>;
export const CreatePurposeTypeDocument = gql`
    mutation CreatePurposeType($input: CreatePurposeTypeInput!) {
  createPurposeType(input: $input) {
    IOutput {
      ...IOutput
    }
    purpose_type {
      ...PurposeType
    }
  }
}
    ${IOutputFragmentDoc}
${PurposeTypeFragmentDoc}`;
export type CreatePurposeTypeMutationFn = Apollo.MutationFunction<CreatePurposeTypeMutation, CreatePurposeTypeMutationVariables>;

/**
 * __useCreatePurposeTypeMutation__
 *
 * To run a mutation, you first call `useCreatePurposeTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePurposeTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPurposeTypeMutation, { data, loading, error }] = useCreatePurposeTypeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePurposeTypeMutation(baseOptions?: Apollo.MutationHookOptions<CreatePurposeTypeMutation, CreatePurposeTypeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePurposeTypeMutation, CreatePurposeTypeMutationVariables>(CreatePurposeTypeDocument, options);
      }
export type CreatePurposeTypeMutationHookResult = ReturnType<typeof useCreatePurposeTypeMutation>;
export type CreatePurposeTypeMutationResult = Apollo.MutationResult<CreatePurposeTypeMutation>;
export type CreatePurposeTypeMutationOptions = Apollo.BaseMutationOptions<CreatePurposeTypeMutation, CreatePurposeTypeMutationVariables>;
export const CreateTutorOrderDocument = gql`
    mutation createTutorOrder($input: CreateTutorOrderInput!) {
  createTutorOrder(input: $input) {
    IOutput {
      ...IOutput
    }
    tutor_order {
      ...TutorOrder
    }
  }
}
    ${IOutputFragmentDoc}
${TutorOrderFragmentDoc}`;
export type CreateTutorOrderMutationFn = Apollo.MutationFunction<CreateTutorOrderMutation, CreateTutorOrderMutationVariables>;

/**
 * __useCreateTutorOrderMutation__
 *
 * To run a mutation, you first call `useCreateTutorOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTutorOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTutorOrderMutation, { data, loading, error }] = useCreateTutorOrderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTutorOrderMutation(baseOptions?: Apollo.MutationHookOptions<CreateTutorOrderMutation, CreateTutorOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTutorOrderMutation, CreateTutorOrderMutationVariables>(CreateTutorOrderDocument, options);
      }
export type CreateTutorOrderMutationHookResult = ReturnType<typeof useCreateTutorOrderMutation>;
export type CreateTutorOrderMutationResult = Apollo.MutationResult<CreateTutorOrderMutation>;
export type CreateTutorOrderMutationOptions = Apollo.BaseMutationOptions<CreateTutorOrderMutation, CreateTutorOrderMutationVariables>;
export const DeleteEducationDocument = gql`
    mutation DeleteEducation($where: EducationWhereUniqueInput!) {
  deleteEducation(where: $where) {
    IOutput {
      ...IOutput
    }
    Profile {
      ...Profile
    }
  }
}
    ${IOutputFragmentDoc}
${ProfileFragmentDoc}`;
export type DeleteEducationMutationFn = Apollo.MutationFunction<DeleteEducationMutation, DeleteEducationMutationVariables>;

/**
 * __useDeleteEducationMutation__
 *
 * To run a mutation, you first call `useDeleteEducationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEducationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEducationMutation, { data, loading, error }] = useDeleteEducationMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useDeleteEducationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteEducationMutation, DeleteEducationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteEducationMutation, DeleteEducationMutationVariables>(DeleteEducationDocument, options);
      }
export type DeleteEducationMutationHookResult = ReturnType<typeof useDeleteEducationMutation>;
export type DeleteEducationMutationResult = Apollo.MutationResult<DeleteEducationMutation>;
export type DeleteEducationMutationOptions = Apollo.BaseMutationOptions<DeleteEducationMutation, DeleteEducationMutationVariables>;
export const DeleteTutorOrderDocument = gql`
    mutation deleteTutorOrder($where: TutorOrderWhereUniqueInput!) {
  deleteTutorOrder(where: $where) {
    IOutput {
      ...IOutput
    }
  }
}
    ${IOutputFragmentDoc}`;
export type DeleteTutorOrderMutationFn = Apollo.MutationFunction<DeleteTutorOrderMutation, DeleteTutorOrderMutationVariables>;

/**
 * __useDeleteTutorOrderMutation__
 *
 * To run a mutation, you first call `useDeleteTutorOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTutorOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTutorOrderMutation, { data, loading, error }] = useDeleteTutorOrderMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useDeleteTutorOrderMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTutorOrderMutation, DeleteTutorOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTutorOrderMutation, DeleteTutorOrderMutationVariables>(DeleteTutorOrderDocument, options);
      }
export type DeleteTutorOrderMutationHookResult = ReturnType<typeof useDeleteTutorOrderMutation>;
export type DeleteTutorOrderMutationResult = Apollo.MutationResult<DeleteTutorOrderMutation>;
export type DeleteTutorOrderMutationOptions = Apollo.BaseMutationOptions<DeleteTutorOrderMutation, DeleteTutorOrderMutationVariables>;
export const DeleteTutorOrderConnectDocument = gql`
    mutation DeleteTutorOrderConnect($where1: TutorOrderWhereUniqueInput!, $where2: ProfileWhereUniqueInput!) {
  deleteTutorOrderConnect(where1: $where1, where2: $where2) {
    IOutput {
      ...IOutput
    }
  }
}
    ${IOutputFragmentDoc}`;
export type DeleteTutorOrderConnectMutationFn = Apollo.MutationFunction<DeleteTutorOrderConnectMutation, DeleteTutorOrderConnectMutationVariables>;

/**
 * __useDeleteTutorOrderConnectMutation__
 *
 * To run a mutation, you first call `useDeleteTutorOrderConnectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTutorOrderConnectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTutorOrderConnectMutation, { data, loading, error }] = useDeleteTutorOrderConnectMutation({
 *   variables: {
 *      where1: // value for 'where1'
 *      where2: // value for 'where2'
 *   },
 * });
 */
export function useDeleteTutorOrderConnectMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTutorOrderConnectMutation, DeleteTutorOrderConnectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTutorOrderConnectMutation, DeleteTutorOrderConnectMutationVariables>(DeleteTutorOrderConnectDocument, options);
      }
export type DeleteTutorOrderConnectMutationHookResult = ReturnType<typeof useDeleteTutorOrderConnectMutation>;
export type DeleteTutorOrderConnectMutationResult = Apollo.MutationResult<DeleteTutorOrderConnectMutation>;
export type DeleteTutorOrderConnectMutationOptions = Apollo.BaseMutationOptions<DeleteTutorOrderConnectMutation, DeleteTutorOrderConnectMutationVariables>;
export const DeleteWorkExperienceDocument = gql`
    mutation DeleteWorkExperience($where: WorkExperienceWhereUniqueInput!) {
  deleteWorkExperience(where: $where) {
    IOutput {
      ...IOutput
    }
    Profile {
      ...Profile
    }
  }
}
    ${IOutputFragmentDoc}
${ProfileFragmentDoc}`;
export type DeleteWorkExperienceMutationFn = Apollo.MutationFunction<DeleteWorkExperienceMutation, DeleteWorkExperienceMutationVariables>;

/**
 * __useDeleteWorkExperienceMutation__
 *
 * To run a mutation, you first call `useDeleteWorkExperienceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteWorkExperienceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteWorkExperienceMutation, { data, loading, error }] = useDeleteWorkExperienceMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useDeleteWorkExperienceMutation(baseOptions?: Apollo.MutationHookOptions<DeleteWorkExperienceMutation, DeleteWorkExperienceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteWorkExperienceMutation, DeleteWorkExperienceMutationVariables>(DeleteWorkExperienceDocument, options);
      }
export type DeleteWorkExperienceMutationHookResult = ReturnType<typeof useDeleteWorkExperienceMutation>;
export type DeleteWorkExperienceMutationResult = Apollo.MutationResult<DeleteWorkExperienceMutation>;
export type DeleteWorkExperienceMutationOptions = Apollo.BaseMutationOptions<DeleteWorkExperienceMutation, DeleteWorkExperienceMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation forgotPassword($input: ForgotPasswordInput!) {
  forgotPassword(input: $input) {
    IOutput {
      ...IOutput
    }
    ErrorFieldOutput {
      field
      message
    }
  }
}
    ${IOutputFragmentDoc}`;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const InitConversationDocument = gql`
    mutation InitConversation($input: initConversationInput!) {
  initConversation(input: $input) {
    IOutput {
      ...IOutput
    }
    conversation {
      ...Conversation
    }
  }
}
    ${IOutputFragmentDoc}
${ConversationFragmentDoc}`;
export type InitConversationMutationFn = Apollo.MutationFunction<InitConversationMutation, InitConversationMutationVariables>;

/**
 * __useInitConversationMutation__
 *
 * To run a mutation, you first call `useInitConversationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInitConversationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [initConversationMutation, { data, loading, error }] = useInitConversationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useInitConversationMutation(baseOptions?: Apollo.MutationHookOptions<InitConversationMutation, InitConversationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InitConversationMutation, InitConversationMutationVariables>(InitConversationDocument, options);
      }
export type InitConversationMutationHookResult = ReturnType<typeof useInitConversationMutation>;
export type InitConversationMutationResult = Apollo.MutationResult<InitConversationMutation>;
export type InitConversationMutationOptions = Apollo.BaseMutationOptions<InitConversationMutation, InitConversationMutationVariables>;
export const LoginDocument = gql`
    mutation login($input: LoginInput!) {
  login(input: $input) {
    IOutput {
      ...IOutput
    }
    User {
      ...User
      profile {
        ...Profile
      }
    }
    ErrorFieldOutput {
      field
      message
    }
  }
}
    ${IOutputFragmentDoc}
${UserFragmentDoc}
${ProfileFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation logout {
  logout {
    IOutput {
      ...IOutput
    }
  }
}
    ${IOutputFragmentDoc}`;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const ReadBuddyNotificationsDocument = gql`
    mutation ReadBuddyNotifications($where: ReadBuddyNotificationsInput!) {
  readBuddyNotifications(where: $where) {
    IOutput {
      ...IOutput
    }
  }
}
    ${IOutputFragmentDoc}`;
export type ReadBuddyNotificationsMutationFn = Apollo.MutationFunction<ReadBuddyNotificationsMutation, ReadBuddyNotificationsMutationVariables>;

/**
 * __useReadBuddyNotificationsMutation__
 *
 * To run a mutation, you first call `useReadBuddyNotificationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReadBuddyNotificationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [readBuddyNotificationsMutation, { data, loading, error }] = useReadBuddyNotificationsMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useReadBuddyNotificationsMutation(baseOptions?: Apollo.MutationHookOptions<ReadBuddyNotificationsMutation, ReadBuddyNotificationsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReadBuddyNotificationsMutation, ReadBuddyNotificationsMutationVariables>(ReadBuddyNotificationsDocument, options);
      }
export type ReadBuddyNotificationsMutationHookResult = ReturnType<typeof useReadBuddyNotificationsMutation>;
export type ReadBuddyNotificationsMutationResult = Apollo.MutationResult<ReadBuddyNotificationsMutation>;
export type ReadBuddyNotificationsMutationOptions = Apollo.BaseMutationOptions<ReadBuddyNotificationsMutation, ReadBuddyNotificationsMutationVariables>;
export const ReadNotificationDocument = gql`
    mutation readNotification($where: NotificationWhereUniqueInput!) {
  readNotification(where: $where) {
    IOutput {
      ...IOutput
    }
  }
}
    ${IOutputFragmentDoc}`;
export type ReadNotificationMutationFn = Apollo.MutationFunction<ReadNotificationMutation, ReadNotificationMutationVariables>;

/**
 * __useReadNotificationMutation__
 *
 * To run a mutation, you first call `useReadNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReadNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [readNotificationMutation, { data, loading, error }] = useReadNotificationMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useReadNotificationMutation(baseOptions?: Apollo.MutationHookOptions<ReadNotificationMutation, ReadNotificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReadNotificationMutation, ReadNotificationMutationVariables>(ReadNotificationDocument, options);
      }
export type ReadNotificationMutationHookResult = ReturnType<typeof useReadNotificationMutation>;
export type ReadNotificationMutationResult = Apollo.MutationResult<ReadNotificationMutation>;
export type ReadNotificationMutationOptions = Apollo.BaseMutationOptions<ReadNotificationMutation, ReadNotificationMutationVariables>;
export const RegisterDocument = gql`
    mutation register($input: RegisterInput!) {
  register(input: $input) {
    IOutput {
      ...IOutput
    }
    User {
      ...User
    }
    ErrorFieldOutput {
      field
      message
    }
  }
}
    ${IOutputFragmentDoc}
${UserFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const RemoveAvatarDocument = gql`
    mutation removeAvatar($where: ProfileWhereUniqueInput!, $input: DestroyImageInput!) {
  removeAvatar(where: $where, input: $input) {
    IOutput {
      ...IOutput
    }
    Profile {
      ...Profile
    }
  }
}
    ${IOutputFragmentDoc}
${ProfileFragmentDoc}`;
export type RemoveAvatarMutationFn = Apollo.MutationFunction<RemoveAvatarMutation, RemoveAvatarMutationVariables>;

/**
 * __useRemoveAvatarMutation__
 *
 * To run a mutation, you first call `useRemoveAvatarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveAvatarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeAvatarMutation, { data, loading, error }] = useRemoveAvatarMutation({
 *   variables: {
 *      where: // value for 'where'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveAvatarMutation(baseOptions?: Apollo.MutationHookOptions<RemoveAvatarMutation, RemoveAvatarMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveAvatarMutation, RemoveAvatarMutationVariables>(RemoveAvatarDocument, options);
      }
export type RemoveAvatarMutationHookResult = ReturnType<typeof useRemoveAvatarMutation>;
export type RemoveAvatarMutationResult = Apollo.MutationResult<RemoveAvatarMutation>;
export type RemoveAvatarMutationOptions = Apollo.BaseMutationOptions<RemoveAvatarMutation, RemoveAvatarMutationVariables>;
export const RemoveBuddyDocument = gql`
    mutation removeBuddy($input: RelationshipInput!) {
  removeBuddy(input: $input) {
    IOutput {
      ...IOutput
    }
  }
}
    ${IOutputFragmentDoc}`;
export type RemoveBuddyMutationFn = Apollo.MutationFunction<RemoveBuddyMutation, RemoveBuddyMutationVariables>;

/**
 * __useRemoveBuddyMutation__
 *
 * To run a mutation, you first call `useRemoveBuddyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveBuddyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeBuddyMutation, { data, loading, error }] = useRemoveBuddyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveBuddyMutation(baseOptions?: Apollo.MutationHookOptions<RemoveBuddyMutation, RemoveBuddyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveBuddyMutation, RemoveBuddyMutationVariables>(RemoveBuddyDocument, options);
      }
export type RemoveBuddyMutationHookResult = ReturnType<typeof useRemoveBuddyMutation>;
export type RemoveBuddyMutationResult = Apollo.MutationResult<RemoveBuddyMutation>;
export type RemoveBuddyMutationOptions = Apollo.BaseMutationOptions<RemoveBuddyMutation, RemoveBuddyMutationVariables>;
export const RemoveWallpaperDocument = gql`
    mutation removeWallpaper($where: ProfileWhereUniqueInput!, $input: DestroyImageInput!) {
  removeWallpaper(where: $where, input: $input) {
    IOutput {
      ...IOutput
    }
    Profile {
      ...Profile
    }
  }
}
    ${IOutputFragmentDoc}
${ProfileFragmentDoc}`;
export type RemoveWallpaperMutationFn = Apollo.MutationFunction<RemoveWallpaperMutation, RemoveWallpaperMutationVariables>;

/**
 * __useRemoveWallpaperMutation__
 *
 * To run a mutation, you first call `useRemoveWallpaperMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveWallpaperMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeWallpaperMutation, { data, loading, error }] = useRemoveWallpaperMutation({
 *   variables: {
 *      where: // value for 'where'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveWallpaperMutation(baseOptions?: Apollo.MutationHookOptions<RemoveWallpaperMutation, RemoveWallpaperMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveWallpaperMutation, RemoveWallpaperMutationVariables>(RemoveWallpaperDocument, options);
      }
export type RemoveWallpaperMutationHookResult = ReturnType<typeof useRemoveWallpaperMutation>;
export type RemoveWallpaperMutationResult = Apollo.MutationResult<RemoveWallpaperMutation>;
export type RemoveWallpaperMutationOptions = Apollo.BaseMutationOptions<RemoveWallpaperMutation, RemoveWallpaperMutationVariables>;
export const RespondBuddyDocument = gql`
    mutation respondBuddy($input: RelationshipInput!) {
  respondBuddy(input: $input) {
    IOutput {
      ...IOutput
    }
    relationship {
      ...Relationship
    }
    otherEndRelationship {
      ...Relationship
    }
  }
}
    ${IOutputFragmentDoc}
${RelationshipFragmentDoc}`;
export type RespondBuddyMutationFn = Apollo.MutationFunction<RespondBuddyMutation, RespondBuddyMutationVariables>;

/**
 * __useRespondBuddyMutation__
 *
 * To run a mutation, you first call `useRespondBuddyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRespondBuddyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [respondBuddyMutation, { data, loading, error }] = useRespondBuddyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRespondBuddyMutation(baseOptions?: Apollo.MutationHookOptions<RespondBuddyMutation, RespondBuddyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RespondBuddyMutation, RespondBuddyMutationVariables>(RespondBuddyDocument, options);
      }
export type RespondBuddyMutationHookResult = ReturnType<typeof useRespondBuddyMutation>;
export type RespondBuddyMutationResult = Apollo.MutationResult<RespondBuddyMutation>;
export type RespondBuddyMutationOptions = Apollo.BaseMutationOptions<RespondBuddyMutation, RespondBuddyMutationVariables>;
export const RespondTutorOrderConnectDocument = gql`
    mutation RespondTutorOrderConnect($where: ResondTutorOrderConnectInput!) {
  respondTutorOrderConnect(where: $where) {
    IOutput {
      ...IOutput
    }
  }
}
    ${IOutputFragmentDoc}`;
export type RespondTutorOrderConnectMutationFn = Apollo.MutationFunction<RespondTutorOrderConnectMutation, RespondTutorOrderConnectMutationVariables>;

/**
 * __useRespondTutorOrderConnectMutation__
 *
 * To run a mutation, you first call `useRespondTutorOrderConnectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRespondTutorOrderConnectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [respondTutorOrderConnectMutation, { data, loading, error }] = useRespondTutorOrderConnectMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useRespondTutorOrderConnectMutation(baseOptions?: Apollo.MutationHookOptions<RespondTutorOrderConnectMutation, RespondTutorOrderConnectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RespondTutorOrderConnectMutation, RespondTutorOrderConnectMutationVariables>(RespondTutorOrderConnectDocument, options);
      }
export type RespondTutorOrderConnectMutationHookResult = ReturnType<typeof useRespondTutorOrderConnectMutation>;
export type RespondTutorOrderConnectMutationResult = Apollo.MutationResult<RespondTutorOrderConnectMutation>;
export type RespondTutorOrderConnectMutationOptions = Apollo.BaseMutationOptions<RespondTutorOrderConnectMutation, RespondTutorOrderConnectMutationVariables>;
export const SendMessageDocument = gql`
    mutation sendMessage($input: SendMessageInput!, $where: ProfileWhereUniqueInput!) {
  sendMessage(input: $input, where: $where) {
    IOutput {
      ...IOutput
    }
    Message {
      ...Message
    }
  }
}
    ${IOutputFragmentDoc}
${MessageFragmentDoc}`;
export type SendMessageMutationFn = Apollo.MutationFunction<SendMessageMutation, SendMessageMutationVariables>;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      input: // value for 'input'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useSendMessageMutation(baseOptions?: Apollo.MutationHookOptions<SendMessageMutation, SendMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, options);
      }
export type SendMessageMutationHookResult = ReturnType<typeof useSendMessageMutation>;
export type SendMessageMutationResult = Apollo.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<SendMessageMutation, SendMessageMutationVariables>;
export const UpdateAvatarDocument = gql`
    mutation UpdateAvatar($where: ProfileWhereUniqueInput!, $input: ChangeImageInput!) {
  updateAvatar(where: $where, input: $input) {
    IOutput {
      ...IOutput
    }
    Profile {
      ...Profile
    }
  }
}
    ${IOutputFragmentDoc}
${ProfileFragmentDoc}`;
export type UpdateAvatarMutationFn = Apollo.MutationFunction<UpdateAvatarMutation, UpdateAvatarMutationVariables>;

/**
 * __useUpdateAvatarMutation__
 *
 * To run a mutation, you first call `useUpdateAvatarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAvatarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAvatarMutation, { data, loading, error }] = useUpdateAvatarMutation({
 *   variables: {
 *      where: // value for 'where'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateAvatarMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAvatarMutation, UpdateAvatarMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAvatarMutation, UpdateAvatarMutationVariables>(UpdateAvatarDocument, options);
      }
export type UpdateAvatarMutationHookResult = ReturnType<typeof useUpdateAvatarMutation>;
export type UpdateAvatarMutationResult = Apollo.MutationResult<UpdateAvatarMutation>;
export type UpdateAvatarMutationOptions = Apollo.BaseMutationOptions<UpdateAvatarMutation, UpdateAvatarMutationVariables>;
export const UpdateBuddyRequestDocument = gql`
    mutation UpdateBuddyRequest($where: BuddyRequestWhereUniqueInput!, $input: UpdateBuddyRequestInput!) {
  updateBuddyRequest(where: $where, input: $input) {
    IOutput {
      ...IOutput
    }
    buddy_request {
      ...BuddyRequest
    }
  }
}
    ${IOutputFragmentDoc}
${BuddyRequestFragmentDoc}`;
export type UpdateBuddyRequestMutationFn = Apollo.MutationFunction<UpdateBuddyRequestMutation, UpdateBuddyRequestMutationVariables>;

/**
 * __useUpdateBuddyRequestMutation__
 *
 * To run a mutation, you first call `useUpdateBuddyRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBuddyRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBuddyRequestMutation, { data, loading, error }] = useUpdateBuddyRequestMutation({
 *   variables: {
 *      where: // value for 'where'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateBuddyRequestMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBuddyRequestMutation, UpdateBuddyRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBuddyRequestMutation, UpdateBuddyRequestMutationVariables>(UpdateBuddyRequestDocument, options);
      }
export type UpdateBuddyRequestMutationHookResult = ReturnType<typeof useUpdateBuddyRequestMutation>;
export type UpdateBuddyRequestMutationResult = Apollo.MutationResult<UpdateBuddyRequestMutation>;
export type UpdateBuddyRequestMutationOptions = Apollo.BaseMutationOptions<UpdateBuddyRequestMutation, UpdateBuddyRequestMutationVariables>;
export const UpdateIntroductionDocument = gql`
    mutation UpdateIntroduction($where: ProfileWhereUniqueInput!, $input: updateIntroductionInput!) {
  updateIntroduction(where: $where, input: $input) {
    IOutput {
      ...IOutput
    }
    Profile {
      ...Profile
    }
  }
}
    ${IOutputFragmentDoc}
${ProfileFragmentDoc}`;
export type UpdateIntroductionMutationFn = Apollo.MutationFunction<UpdateIntroductionMutation, UpdateIntroductionMutationVariables>;

/**
 * __useUpdateIntroductionMutation__
 *
 * To run a mutation, you first call `useUpdateIntroductionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateIntroductionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateIntroductionMutation, { data, loading, error }] = useUpdateIntroductionMutation({
 *   variables: {
 *      where: // value for 'where'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateIntroductionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateIntroductionMutation, UpdateIntroductionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateIntroductionMutation, UpdateIntroductionMutationVariables>(UpdateIntroductionDocument, options);
      }
export type UpdateIntroductionMutationHookResult = ReturnType<typeof useUpdateIntroductionMutation>;
export type UpdateIntroductionMutationResult = Apollo.MutationResult<UpdateIntroductionMutation>;
export type UpdateIntroductionMutationOptions = Apollo.BaseMutationOptions<UpdateIntroductionMutation, UpdateIntroductionMutationVariables>;
export const UpdateTutorOrderDocument = gql`
    mutation updateTutorOrder($input: CreateTutorOrderInput!, $where: TutorOrderWhereUniqueInput!) {
  updateTutorOrder(input: $input, where: $where) {
    IOutput {
      ...IOutput
    }
  }
}
    ${IOutputFragmentDoc}`;
export type UpdateTutorOrderMutationFn = Apollo.MutationFunction<UpdateTutorOrderMutation, UpdateTutorOrderMutationVariables>;

/**
 * __useUpdateTutorOrderMutation__
 *
 * To run a mutation, you first call `useUpdateTutorOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTutorOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTutorOrderMutation, { data, loading, error }] = useUpdateTutorOrderMutation({
 *   variables: {
 *      input: // value for 'input'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useUpdateTutorOrderMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTutorOrderMutation, UpdateTutorOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTutorOrderMutation, UpdateTutorOrderMutationVariables>(UpdateTutorOrderDocument, options);
      }
export type UpdateTutorOrderMutationHookResult = ReturnType<typeof useUpdateTutorOrderMutation>;
export type UpdateTutorOrderMutationResult = Apollo.MutationResult<UpdateTutorOrderMutation>;
export type UpdateTutorOrderMutationOptions = Apollo.BaseMutationOptions<UpdateTutorOrderMutation, UpdateTutorOrderMutationVariables>;
export const UpdateWallpaperDocument = gql`
    mutation UpdateWallpaper($where: ProfileWhereUniqueInput!, $input: ChangeImageInput!) {
  updateWallpaper(where: $where, input: $input) {
    IOutput {
      ...IOutput
    }
    Profile {
      ...Profile
    }
  }
}
    ${IOutputFragmentDoc}
${ProfileFragmentDoc}`;
export type UpdateWallpaperMutationFn = Apollo.MutationFunction<UpdateWallpaperMutation, UpdateWallpaperMutationVariables>;

/**
 * __useUpdateWallpaperMutation__
 *
 * To run a mutation, you first call `useUpdateWallpaperMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWallpaperMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateWallpaperMutation, { data, loading, error }] = useUpdateWallpaperMutation({
 *   variables: {
 *      where: // value for 'where'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateWallpaperMutation(baseOptions?: Apollo.MutationHookOptions<UpdateWallpaperMutation, UpdateWallpaperMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateWallpaperMutation, UpdateWallpaperMutationVariables>(UpdateWallpaperDocument, options);
      }
export type UpdateWallpaperMutationHookResult = ReturnType<typeof useUpdateWallpaperMutation>;
export type UpdateWallpaperMutationResult = Apollo.MutationResult<UpdateWallpaperMutation>;
export type UpdateWallpaperMutationOptions = Apollo.BaseMutationOptions<UpdateWallpaperMutation, UpdateWallpaperMutationVariables>;
export const UpsertAgeLocationDocument = gql`
    mutation UpsertAgeLocation($where: ProfileWhereUniqueInput!, $input: UpsertAgeLocationInput!) {
  upsertAgeLocation(where: $where, input: $input) {
    IOutput {
      ...IOutput
    }
    Profile {
      ...Profile
    }
  }
}
    ${IOutputFragmentDoc}
${ProfileFragmentDoc}`;
export type UpsertAgeLocationMutationFn = Apollo.MutationFunction<UpsertAgeLocationMutation, UpsertAgeLocationMutationVariables>;

/**
 * __useUpsertAgeLocationMutation__
 *
 * To run a mutation, you first call `useUpsertAgeLocationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertAgeLocationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertAgeLocationMutation, { data, loading, error }] = useUpsertAgeLocationMutation({
 *   variables: {
 *      where: // value for 'where'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpsertAgeLocationMutation(baseOptions?: Apollo.MutationHookOptions<UpsertAgeLocationMutation, UpsertAgeLocationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpsertAgeLocationMutation, UpsertAgeLocationMutationVariables>(UpsertAgeLocationDocument, options);
      }
export type UpsertAgeLocationMutationHookResult = ReturnType<typeof useUpsertAgeLocationMutation>;
export type UpsertAgeLocationMutationResult = Apollo.MutationResult<UpsertAgeLocationMutation>;
export type UpsertAgeLocationMutationOptions = Apollo.BaseMutationOptions<UpsertAgeLocationMutation, UpsertAgeLocationMutationVariables>;
export const UpsertEducationDocument = gql`
    mutation UpsertEducation($where: ProfileWhereUniqueInput!, $input: UpsertEducationInput!) {
  upsertEducation(where: $where, input: $input) {
    IOutput {
      ...IOutput
    }
    education {
      ...Education
    }
  }
}
    ${IOutputFragmentDoc}
${EducationFragmentDoc}`;
export type UpsertEducationMutationFn = Apollo.MutationFunction<UpsertEducationMutation, UpsertEducationMutationVariables>;

/**
 * __useUpsertEducationMutation__
 *
 * To run a mutation, you first call `useUpsertEducationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertEducationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertEducationMutation, { data, loading, error }] = useUpsertEducationMutation({
 *   variables: {
 *      where: // value for 'where'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpsertEducationMutation(baseOptions?: Apollo.MutationHookOptions<UpsertEducationMutation, UpsertEducationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpsertEducationMutation, UpsertEducationMutationVariables>(UpsertEducationDocument, options);
      }
export type UpsertEducationMutationHookResult = ReturnType<typeof useUpsertEducationMutation>;
export type UpsertEducationMutationResult = Apollo.MutationResult<UpsertEducationMutation>;
export type UpsertEducationMutationOptions = Apollo.BaseMutationOptions<UpsertEducationMutation, UpsertEducationMutationVariables>;
export const UpsertWorkExperienceDocument = gql`
    mutation UpsertWorkExperience($where: ProfileWhereUniqueInput!, $input: UpsertWorkExperienceInput!) {
  upsertWorkExperience(where: $where, input: $input) {
    IOutput {
      ...IOutput
    }
    work_experience {
      ...WorkExperience
    }
  }
}
    ${IOutputFragmentDoc}
${WorkExperienceFragmentDoc}`;
export type UpsertWorkExperienceMutationFn = Apollo.MutationFunction<UpsertWorkExperienceMutation, UpsertWorkExperienceMutationVariables>;

/**
 * __useUpsertWorkExperienceMutation__
 *
 * To run a mutation, you first call `useUpsertWorkExperienceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertWorkExperienceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertWorkExperienceMutation, { data, loading, error }] = useUpsertWorkExperienceMutation({
 *   variables: {
 *      where: // value for 'where'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpsertWorkExperienceMutation(baseOptions?: Apollo.MutationHookOptions<UpsertWorkExperienceMutation, UpsertWorkExperienceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpsertWorkExperienceMutation, UpsertWorkExperienceMutationVariables>(UpsertWorkExperienceDocument, options);
      }
export type UpsertWorkExperienceMutationHookResult = ReturnType<typeof useUpsertWorkExperienceMutation>;
export type UpsertWorkExperienceMutationResult = Apollo.MutationResult<UpsertWorkExperienceMutation>;
export type UpsertWorkExperienceMutationOptions = Apollo.BaseMutationOptions<UpsertWorkExperienceMutation, UpsertWorkExperienceMutationVariables>;
export const VerifyEmailDocument = gql`
    mutation verifyEmail($input: VerifyEmailInput!) {
  verifyEmail(input: $input) {
    IOutput {
      ...IOutput
    }
    User {
      ...User
      isVerified
    }
  }
}
    ${IOutputFragmentDoc}
${UserFragmentDoc}`;
export type VerifyEmailMutationFn = Apollo.MutationFunction<VerifyEmailMutation, VerifyEmailMutationVariables>;

/**
 * __useVerifyEmailMutation__
 *
 * To run a mutation, you first call `useVerifyEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyEmailMutation, { data, loading, error }] = useVerifyEmailMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useVerifyEmailMutation(baseOptions?: Apollo.MutationHookOptions<VerifyEmailMutation, VerifyEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyEmailMutation, VerifyEmailMutationVariables>(VerifyEmailDocument, options);
      }
export type VerifyEmailMutationHookResult = ReturnType<typeof useVerifyEmailMutation>;
export type VerifyEmailMutationResult = Apollo.MutationResult<VerifyEmailMutation>;
export type VerifyEmailMutationOptions = Apollo.BaseMutationOptions<VerifyEmailMutation, VerifyEmailMutationVariables>;
export const ViewBuddyNotificationsDocument = gql`
    mutation ViewBuddyNotifications($where: ProfileWhereUniqueInput!) {
  viewBuddyNotifications(where: $where) {
    IOutput {
      ...IOutput
    }
  }
}
    ${IOutputFragmentDoc}`;
export type ViewBuddyNotificationsMutationFn = Apollo.MutationFunction<ViewBuddyNotificationsMutation, ViewBuddyNotificationsMutationVariables>;

/**
 * __useViewBuddyNotificationsMutation__
 *
 * To run a mutation, you first call `useViewBuddyNotificationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useViewBuddyNotificationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [viewBuddyNotificationsMutation, { data, loading, error }] = useViewBuddyNotificationsMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useViewBuddyNotificationsMutation(baseOptions?: Apollo.MutationHookOptions<ViewBuddyNotificationsMutation, ViewBuddyNotificationsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ViewBuddyNotificationsMutation, ViewBuddyNotificationsMutationVariables>(ViewBuddyNotificationsDocument, options);
      }
export type ViewBuddyNotificationsMutationHookResult = ReturnType<typeof useViewBuddyNotificationsMutation>;
export type ViewBuddyNotificationsMutationResult = Apollo.MutationResult<ViewBuddyNotificationsMutation>;
export type ViewBuddyNotificationsMutationOptions = Apollo.BaseMutationOptions<ViewBuddyNotificationsMutation, ViewBuddyNotificationsMutationVariables>;
export const ViewMessageDocument = gql`
    mutation ViewMessage($where: ProfileWhereUniqueInput!) {
  viewMessage(where: $where) {
    ...IOutput
  }
}
    ${IOutputFragmentDoc}`;
export type ViewMessageMutationFn = Apollo.MutationFunction<ViewMessageMutation, ViewMessageMutationVariables>;

/**
 * __useViewMessageMutation__
 *
 * To run a mutation, you first call `useViewMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useViewMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [viewMessageMutation, { data, loading, error }] = useViewMessageMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useViewMessageMutation(baseOptions?: Apollo.MutationHookOptions<ViewMessageMutation, ViewMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ViewMessageMutation, ViewMessageMutationVariables>(ViewMessageDocument, options);
      }
export type ViewMessageMutationHookResult = ReturnType<typeof useViewMessageMutation>;
export type ViewMessageMutationResult = Apollo.MutationResult<ViewMessageMutation>;
export type ViewMessageMutationOptions = Apollo.BaseMutationOptions<ViewMessageMutation, ViewMessageMutationVariables>;
export const ViewNotificationDocument = gql`
    mutation viewNotification($where: ProfileWhereUniqueInput!) {
  viewNotification(where: $where) {
    IOutput {
      ...IOutput
    }
  }
}
    ${IOutputFragmentDoc}`;
export type ViewNotificationMutationFn = Apollo.MutationFunction<ViewNotificationMutation, ViewNotificationMutationVariables>;

/**
 * __useViewNotificationMutation__
 *
 * To run a mutation, you first call `useViewNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useViewNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [viewNotificationMutation, { data, loading, error }] = useViewNotificationMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useViewNotificationMutation(baseOptions?: Apollo.MutationHookOptions<ViewNotificationMutation, ViewNotificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ViewNotificationMutation, ViewNotificationMutationVariables>(ViewNotificationDocument, options);
      }
export type ViewNotificationMutationHookResult = ReturnType<typeof useViewNotificationMutation>;
export type ViewNotificationMutationResult = Apollo.MutationResult<ViewNotificationMutation>;
export type ViewNotificationMutationOptions = Apollo.BaseMutationOptions<ViewNotificationMutation, ViewNotificationMutationVariables>;
export const GetBuddyNotificationsDocument = gql`
    query getBuddyNotifications($where: ProfileWhereUniqueInput!) {
  getBuddyNotifications(where: $where) {
    IOutput {
      ...IOutput
    }
    buddyRequests {
      ...Relationship
    }
    buddyAccepts {
      ...Relationship
    }
    countNotViewedBuddyNotifications
  }
}
    ${IOutputFragmentDoc}
${RelationshipFragmentDoc}`;

/**
 * __useGetBuddyNotificationsQuery__
 *
 * To run a query within a React component, call `useGetBuddyNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBuddyNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBuddyNotificationsQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetBuddyNotificationsQuery(baseOptions: Apollo.QueryHookOptions<GetBuddyNotificationsQuery, GetBuddyNotificationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBuddyNotificationsQuery, GetBuddyNotificationsQueryVariables>(GetBuddyNotificationsDocument, options);
      }
export function useGetBuddyNotificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBuddyNotificationsQuery, GetBuddyNotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBuddyNotificationsQuery, GetBuddyNotificationsQueryVariables>(GetBuddyNotificationsDocument, options);
        }
export type GetBuddyNotificationsQueryHookResult = ReturnType<typeof useGetBuddyNotificationsQuery>;
export type GetBuddyNotificationsLazyQueryHookResult = ReturnType<typeof useGetBuddyNotificationsLazyQuery>;
export type GetBuddyNotificationsQueryResult = Apollo.QueryResult<GetBuddyNotificationsQuery, GetBuddyNotificationsQueryVariables>;
export const GetConversationDocument = gql`
    query GetConversation($where: ConversationWhereUniqueInput!, $page: ConversationPageInput!) {
  getConversation(where: $where, page: $page) {
    IOutput {
      ...IOutput
    }
    Conversation {
      ...Conversation
    }
    Messages {
      ...Message
    }
    ConversationPageInfo {
      endCursor
      hasNextPage
      lastTake
    }
  }
}
    ${IOutputFragmentDoc}
${ConversationFragmentDoc}
${MessageFragmentDoc}`;

/**
 * __useGetConversationQuery__
 *
 * To run a query within a React component, call `useGetConversationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetConversationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetConversationQuery({
 *   variables: {
 *      where: // value for 'where'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useGetConversationQuery(baseOptions: Apollo.QueryHookOptions<GetConversationQuery, GetConversationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetConversationQuery, GetConversationQueryVariables>(GetConversationDocument, options);
      }
export function useGetConversationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetConversationQuery, GetConversationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetConversationQuery, GetConversationQueryVariables>(GetConversationDocument, options);
        }
export type GetConversationQueryHookResult = ReturnType<typeof useGetConversationQuery>;
export type GetConversationLazyQueryHookResult = ReturnType<typeof useGetConversationLazyQuery>;
export type GetConversationQueryResult = Apollo.QueryResult<GetConversationQuery, GetConversationQueryVariables>;
export const GetManyBuddyRequestsDocument = gql`
    query GetManyBuddyRequests($where: GetManyBuddyRequestsInput!) {
  getManyBuddyRequests(where: $where) {
    IOutput {
      ...IOutput
    }
    buddy_requests {
      ...BuddyRequest
    }
    BuddyRequestPageInfo {
      endCursor
      hasNextPage
      lastTake
    }
  }
}
    ${IOutputFragmentDoc}
${BuddyRequestFragmentDoc}`;

/**
 * __useGetManyBuddyRequestsQuery__
 *
 * To run a query within a React component, call `useGetManyBuddyRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetManyBuddyRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetManyBuddyRequestsQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetManyBuddyRequestsQuery(baseOptions: Apollo.QueryHookOptions<GetManyBuddyRequestsQuery, GetManyBuddyRequestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetManyBuddyRequestsQuery, GetManyBuddyRequestsQueryVariables>(GetManyBuddyRequestsDocument, options);
      }
export function useGetManyBuddyRequestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetManyBuddyRequestsQuery, GetManyBuddyRequestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetManyBuddyRequestsQuery, GetManyBuddyRequestsQueryVariables>(GetManyBuddyRequestsDocument, options);
        }
export type GetManyBuddyRequestsQueryHookResult = ReturnType<typeof useGetManyBuddyRequestsQuery>;
export type GetManyBuddyRequestsLazyQueryHookResult = ReturnType<typeof useGetManyBuddyRequestsLazyQuery>;
export type GetManyBuddyRequestsQueryResult = Apollo.QueryResult<GetManyBuddyRequestsQuery, GetManyBuddyRequestsQueryVariables>;
export const GetManyConversationsDocument = gql`
    query GetManyConversations($where: ProfileWhereUniqueInput!) {
  getManyConversations(where: $where) {
    IOutput {
      ...IOutput
    }
    Conversations {
      ...ConversationGroup
    }
    countNotViewedConversation
  }
}
    ${IOutputFragmentDoc}
${ConversationGroupFragmentDoc}`;

/**
 * __useGetManyConversationsQuery__
 *
 * To run a query within a React component, call `useGetManyConversationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetManyConversationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetManyConversationsQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetManyConversationsQuery(baseOptions: Apollo.QueryHookOptions<GetManyConversationsQuery, GetManyConversationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetManyConversationsQuery, GetManyConversationsQueryVariables>(GetManyConversationsDocument, options);
      }
export function useGetManyConversationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetManyConversationsQuery, GetManyConversationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetManyConversationsQuery, GetManyConversationsQueryVariables>(GetManyConversationsDocument, options);
        }
export type GetManyConversationsQueryHookResult = ReturnType<typeof useGetManyConversationsQuery>;
export type GetManyConversationsLazyQueryHookResult = ReturnType<typeof useGetManyConversationsLazyQuery>;
export type GetManyConversationsQueryResult = Apollo.QueryResult<GetManyConversationsQuery, GetManyConversationsQueryVariables>;
export const GetManyInterestsDocument = gql`
    query getManyInterests($where: getManyInterestsInput!) {
  getManyInterests(where: $where) {
    IOutput {
      ...IOutput
    }
    Interest {
      ...Interest
    }
  }
}
    ${IOutputFragmentDoc}
${InterestFragmentDoc}`;

/**
 * __useGetManyInterestsQuery__
 *
 * To run a query within a React component, call `useGetManyInterestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetManyInterestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetManyInterestsQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetManyInterestsQuery(baseOptions: Apollo.QueryHookOptions<GetManyInterestsQuery, GetManyInterestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetManyInterestsQuery, GetManyInterestsQueryVariables>(GetManyInterestsDocument, options);
      }
export function useGetManyInterestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetManyInterestsQuery, GetManyInterestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetManyInterestsQuery, GetManyInterestsQueryVariables>(GetManyInterestsDocument, options);
        }
export type GetManyInterestsQueryHookResult = ReturnType<typeof useGetManyInterestsQuery>;
export type GetManyInterestsLazyQueryHookResult = ReturnType<typeof useGetManyInterestsLazyQuery>;
export type GetManyInterestsQueryResult = Apollo.QueryResult<GetManyInterestsQuery, GetManyInterestsQueryVariables>;
export const GetManyProfilesDocument = gql`
    query getManyProfiles($where: GetManyProfilesInput!) {
  getManyProfiles(where: $where) {
    IOutput {
      ...IOutput
    }
    Profile {
      ...Profile
    }
    PageInfo {
      endCursor
      hasNextPage
      lastTake
    }
  }
}
    ${IOutputFragmentDoc}
${ProfileFragmentDoc}`;

/**
 * __useGetManyProfilesQuery__
 *
 * To run a query within a React component, call `useGetManyProfilesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetManyProfilesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetManyProfilesQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetManyProfilesQuery(baseOptions: Apollo.QueryHookOptions<GetManyProfilesQuery, GetManyProfilesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetManyProfilesQuery, GetManyProfilesQueryVariables>(GetManyProfilesDocument, options);
      }
export function useGetManyProfilesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetManyProfilesQuery, GetManyProfilesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetManyProfilesQuery, GetManyProfilesQueryVariables>(GetManyProfilesDocument, options);
        }
export type GetManyProfilesQueryHookResult = ReturnType<typeof useGetManyProfilesQuery>;
export type GetManyProfilesLazyQueryHookResult = ReturnType<typeof useGetManyProfilesLazyQuery>;
export type GetManyProfilesQueryResult = Apollo.QueryResult<GetManyProfilesQuery, GetManyProfilesQueryVariables>;
export const GetManyPurposeTypesDocument = gql`
    query GetManyPurposeTypes($where: GetManyPurposeTypesInput!) {
  getManyPurposeTypes(where: $where) {
    IOutput {
      ...IOutput
    }
    purpose_types {
      ...PurposeType
    }
  }
}
    ${IOutputFragmentDoc}
${PurposeTypeFragmentDoc}`;

/**
 * __useGetManyPurposeTypesQuery__
 *
 * To run a query within a React component, call `useGetManyPurposeTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetManyPurposeTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetManyPurposeTypesQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetManyPurposeTypesQuery(baseOptions: Apollo.QueryHookOptions<GetManyPurposeTypesQuery, GetManyPurposeTypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetManyPurposeTypesQuery, GetManyPurposeTypesQueryVariables>(GetManyPurposeTypesDocument, options);
      }
export function useGetManyPurposeTypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetManyPurposeTypesQuery, GetManyPurposeTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetManyPurposeTypesQuery, GetManyPurposeTypesQueryVariables>(GetManyPurposeTypesDocument, options);
        }
export type GetManyPurposeTypesQueryHookResult = ReturnType<typeof useGetManyPurposeTypesQuery>;
export type GetManyPurposeTypesLazyQueryHookResult = ReturnType<typeof useGetManyPurposeTypesLazyQuery>;
export type GetManyPurposeTypesQueryResult = Apollo.QueryResult<GetManyPurposeTypesQuery, GetManyPurposeTypesQueryVariables>;
export const GetManyTutorOrdersDocument = gql`
    query GetManyTutorOrders($where: GetManyTutorOrdersInput!) {
  getManyTutorOrders(where: $where) {
    IOutput {
      ...IOutput
    }
    tutor_order {
      ...TutorOrder
    }
  }
}
    ${IOutputFragmentDoc}
${TutorOrderFragmentDoc}`;

/**
 * __useGetManyTutorOrdersQuery__
 *
 * To run a query within a React component, call `useGetManyTutorOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetManyTutorOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetManyTutorOrdersQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetManyTutorOrdersQuery(baseOptions: Apollo.QueryHookOptions<GetManyTutorOrdersQuery, GetManyTutorOrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetManyTutorOrdersQuery, GetManyTutorOrdersQueryVariables>(GetManyTutorOrdersDocument, options);
      }
export function useGetManyTutorOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetManyTutorOrdersQuery, GetManyTutorOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetManyTutorOrdersQuery, GetManyTutorOrdersQueryVariables>(GetManyTutorOrdersDocument, options);
        }
export type GetManyTutorOrdersQueryHookResult = ReturnType<typeof useGetManyTutorOrdersQuery>;
export type GetManyTutorOrdersLazyQueryHookResult = ReturnType<typeof useGetManyTutorOrdersLazyQuery>;
export type GetManyTutorOrdersQueryResult = Apollo.QueryResult<GetManyTutorOrdersQuery, GetManyTutorOrdersQueryVariables>;
export const GetManyTutorOrderRequestsDocument = gql`
    query GetManyTutorOrderRequests($where: TutorOrderWhereUniqueInput!) {
  getManyTutorOrderRequests(where: $where) {
    IOutput {
      ...IOutput
    }
    tutor_order_tutor_connect {
      ...TutorOrderTutorConnect
    }
  }
}
    ${IOutputFragmentDoc}
${TutorOrderTutorConnectFragmentDoc}`;

/**
 * __useGetManyTutorOrderRequestsQuery__
 *
 * To run a query within a React component, call `useGetManyTutorOrderRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetManyTutorOrderRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetManyTutorOrderRequestsQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetManyTutorOrderRequestsQuery(baseOptions: Apollo.QueryHookOptions<GetManyTutorOrderRequestsQuery, GetManyTutorOrderRequestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetManyTutorOrderRequestsQuery, GetManyTutorOrderRequestsQueryVariables>(GetManyTutorOrderRequestsDocument, options);
      }
export function useGetManyTutorOrderRequestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetManyTutorOrderRequestsQuery, GetManyTutorOrderRequestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetManyTutorOrderRequestsQuery, GetManyTutorOrderRequestsQueryVariables>(GetManyTutorOrderRequestsDocument, options);
        }
export type GetManyTutorOrderRequestsQueryHookResult = ReturnType<typeof useGetManyTutorOrderRequestsQuery>;
export type GetManyTutorOrderRequestsLazyQueryHookResult = ReturnType<typeof useGetManyTutorOrderRequestsLazyQuery>;
export type GetManyTutorOrderRequestsQueryResult = Apollo.QueryResult<GetManyTutorOrderRequestsQuery, GetManyTutorOrderRequestsQueryVariables>;
export const GetMyBuddiesDocument = gql`
    query GetMyBuddies($where: ProfileWhereUniqueInput!, $input: GetMyBuddiesInput!) {
  getMyBuddies(where: $where, input: $input) {
    IOutput {
      ...IOutput
    }
    relationships {
      ...Relationship
    }
    PageInfo {
      endCursor {
        id_1
        id_2
      }
      hasNextPage
      lastTake
    }
  }
}
    ${IOutputFragmentDoc}
${RelationshipFragmentDoc}`;

/**
 * __useGetMyBuddiesQuery__
 *
 * To run a query within a React component, call `useGetMyBuddiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyBuddiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyBuddiesQuery({
 *   variables: {
 *      where: // value for 'where'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetMyBuddiesQuery(baseOptions: Apollo.QueryHookOptions<GetMyBuddiesQuery, GetMyBuddiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyBuddiesQuery, GetMyBuddiesQueryVariables>(GetMyBuddiesDocument, options);
      }
export function useGetMyBuddiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyBuddiesQuery, GetMyBuddiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyBuddiesQuery, GetMyBuddiesQueryVariables>(GetMyBuddiesDocument, options);
        }
export type GetMyBuddiesQueryHookResult = ReturnType<typeof useGetMyBuddiesQuery>;
export type GetMyBuddiesLazyQueryHookResult = ReturnType<typeof useGetMyBuddiesLazyQuery>;
export type GetMyBuddiesQueryResult = Apollo.QueryResult<GetMyBuddiesQuery, GetMyBuddiesQueryVariables>;
export const GetMyBuddiesRequestsDocument = gql`
    query GetMyBuddiesRequests($where: ProfileWhereUniqueInput!, $input: GetMyBuddiesInput!) {
  getMyBuddiesRequests(where: $where, input: $input) {
    IOutput {
      ...IOutput
    }
    relationships {
      ...Relationship
    }
    PageInfo {
      endCursor {
        id_1
        id_2
      }
      hasNextPage
      lastTake
    }
  }
}
    ${IOutputFragmentDoc}
${RelationshipFragmentDoc}`;

/**
 * __useGetMyBuddiesRequestsQuery__
 *
 * To run a query within a React component, call `useGetMyBuddiesRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyBuddiesRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyBuddiesRequestsQuery({
 *   variables: {
 *      where: // value for 'where'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetMyBuddiesRequestsQuery(baseOptions: Apollo.QueryHookOptions<GetMyBuddiesRequestsQuery, GetMyBuddiesRequestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyBuddiesRequestsQuery, GetMyBuddiesRequestsQueryVariables>(GetMyBuddiesRequestsDocument, options);
      }
export function useGetMyBuddiesRequestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyBuddiesRequestsQuery, GetMyBuddiesRequestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyBuddiesRequestsQuery, GetMyBuddiesRequestsQueryVariables>(GetMyBuddiesRequestsDocument, options);
        }
export type GetMyBuddiesRequestsQueryHookResult = ReturnType<typeof useGetMyBuddiesRequestsQuery>;
export type GetMyBuddiesRequestsLazyQueryHookResult = ReturnType<typeof useGetMyBuddiesRequestsLazyQuery>;
export type GetMyBuddiesRequestsQueryResult = Apollo.QueryResult<GetMyBuddiesRequestsQuery, GetMyBuddiesRequestsQueryVariables>;
export const GetMyBuddyRequestsDocument = gql`
    query GetMyBuddyRequests($input: GetMyBuddyRequestsInput!) {
  getMyBuddyRequests(input: $input) {
    IOutput {
      ...IOutput
    }
    buddy_requests {
      ...BuddyRequest
    }
    BuddyRequestPageInfo {
      endCursor
      hasNextPage
      lastTake
    }
  }
}
    ${IOutputFragmentDoc}
${BuddyRequestFragmentDoc}`;

/**
 * __useGetMyBuddyRequestsQuery__
 *
 * To run a query within a React component, call `useGetMyBuddyRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyBuddyRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyBuddyRequestsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetMyBuddyRequestsQuery(baseOptions: Apollo.QueryHookOptions<GetMyBuddyRequestsQuery, GetMyBuddyRequestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyBuddyRequestsQuery, GetMyBuddyRequestsQueryVariables>(GetMyBuddyRequestsDocument, options);
      }
export function useGetMyBuddyRequestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyBuddyRequestsQuery, GetMyBuddyRequestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyBuddyRequestsQuery, GetMyBuddyRequestsQueryVariables>(GetMyBuddyRequestsDocument, options);
        }
export type GetMyBuddyRequestsQueryHookResult = ReturnType<typeof useGetMyBuddyRequestsQuery>;
export type GetMyBuddyRequestsLazyQueryHookResult = ReturnType<typeof useGetMyBuddyRequestsLazyQuery>;
export type GetMyBuddyRequestsQueryResult = Apollo.QueryResult<GetMyBuddyRequestsQuery, GetMyBuddyRequestsQueryVariables>;
export const GetMyTutorOrderDocument = gql`
    query getMyTutorOrder($where: ProfileWhereUniqueInput!) {
  getMyTutorOrder(where: $where) {
    IOutput {
      ...IOutput
    }
    tutor_order {
      ...TutorOrder
    }
  }
}
    ${IOutputFragmentDoc}
${TutorOrderFragmentDoc}`;

/**
 * __useGetMyTutorOrderQuery__
 *
 * To run a query within a React component, call `useGetMyTutorOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyTutorOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyTutorOrderQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetMyTutorOrderQuery(baseOptions: Apollo.QueryHookOptions<GetMyTutorOrderQuery, GetMyTutorOrderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyTutorOrderQuery, GetMyTutorOrderQueryVariables>(GetMyTutorOrderDocument, options);
      }
export function useGetMyTutorOrderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyTutorOrderQuery, GetMyTutorOrderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyTutorOrderQuery, GetMyTutorOrderQueryVariables>(GetMyTutorOrderDocument, options);
        }
export type GetMyTutorOrderQueryHookResult = ReturnType<typeof useGetMyTutorOrderQuery>;
export type GetMyTutorOrderLazyQueryHookResult = ReturnType<typeof useGetMyTutorOrderLazyQuery>;
export type GetMyTutorOrderQueryResult = Apollo.QueryResult<GetMyTutorOrderQuery, GetMyTutorOrderQueryVariables>;
export const GetNotificationsDocument = gql`
    query getNotifications($where: ProfileWhereUniqueInput!) {
  getNotifications(where: $where) {
    IOutput {
      ...IOutput
    }
    notifications {
      ...Notification
    }
    countNotViewedNotifications
  }
}
    ${IOutputFragmentDoc}
${NotificationFragmentDoc}`;

/**
 * __useGetNotificationsQuery__
 *
 * To run a query within a React component, call `useGetNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNotificationsQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetNotificationsQuery(baseOptions: Apollo.QueryHookOptions<GetNotificationsQuery, GetNotificationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNotificationsQuery, GetNotificationsQueryVariables>(GetNotificationsDocument, options);
      }
export function useGetNotificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNotificationsQuery, GetNotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNotificationsQuery, GetNotificationsQueryVariables>(GetNotificationsDocument, options);
        }
export type GetNotificationsQueryHookResult = ReturnType<typeof useGetNotificationsQuery>;
export type GetNotificationsLazyQueryHookResult = ReturnType<typeof useGetNotificationsLazyQuery>;
export type GetNotificationsQueryResult = Apollo.QueryResult<GetNotificationsQuery, GetNotificationsQueryVariables>;
export const GetProfileDocument = gql`
    query getProfile($where: ProfileWhereUniqueInput!) {
  getProfile(where: $where) {
    IOutput {
      ...IOutput
    }
    Profile {
      ...Profile
    }
  }
}
    ${IOutputFragmentDoc}
${ProfileFragmentDoc}`;

/**
 * __useGetProfileQuery__
 *
 * To run a query within a React component, call `useGetProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfileQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetProfileQuery(baseOptions: Apollo.QueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, options);
      }
export function useGetProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, options);
        }
export type GetProfileQueryHookResult = ReturnType<typeof useGetProfileQuery>;
export type GetProfileLazyQueryHookResult = ReturnType<typeof useGetProfileLazyQuery>;
export type GetProfileQueryResult = Apollo.QueryResult<GetProfileQuery, GetProfileQueryVariables>;
export const GetRelationshipDocument = gql`
    query GetRelationship($where: GetRelationshipInput!) {
  getRelationship(where: $where) {
    IOutput {
      ...IOutput
    }
    relationship {
      ...Relationship
    }
    otherEndRelationship {
      ...Relationship
    }
  }
}
    ${IOutputFragmentDoc}
${RelationshipFragmentDoc}`;

/**
 * __useGetRelationshipQuery__
 *
 * To run a query within a React component, call `useGetRelationshipQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRelationshipQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRelationshipQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetRelationshipQuery(baseOptions: Apollo.QueryHookOptions<GetRelationshipQuery, GetRelationshipQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRelationshipQuery, GetRelationshipQueryVariables>(GetRelationshipDocument, options);
      }
export function useGetRelationshipLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRelationshipQuery, GetRelationshipQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRelationshipQuery, GetRelationshipQueryVariables>(GetRelationshipDocument, options);
        }
export type GetRelationshipQueryHookResult = ReturnType<typeof useGetRelationshipQuery>;
export type GetRelationshipLazyQueryHookResult = ReturnType<typeof useGetRelationshipLazyQuery>;
export type GetRelationshipQueryResult = Apollo.QueryResult<GetRelationshipQuery, GetRelationshipQueryVariables>;
export const GetSuggestedBuddyRequestsDocument = gql`
    query GetSuggestedBuddyRequests($where: GetSuggestedBuddyRequests!) {
  getSuggestedBuddyRequests(where: $where) {
    IOutput {
      ...IOutput
    }
    buddy_requests {
      ...BuddyRequest
    }
    BuddyRequestPageInfo {
      endCursor
      hasNextPage
      lastTake
    }
  }
}
    ${IOutputFragmentDoc}
${BuddyRequestFragmentDoc}`;

/**
 * __useGetSuggestedBuddyRequestsQuery__
 *
 * To run a query within a React component, call `useGetSuggestedBuddyRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSuggestedBuddyRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSuggestedBuddyRequestsQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetSuggestedBuddyRequestsQuery(baseOptions: Apollo.QueryHookOptions<GetSuggestedBuddyRequestsQuery, GetSuggestedBuddyRequestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSuggestedBuddyRequestsQuery, GetSuggestedBuddyRequestsQueryVariables>(GetSuggestedBuddyRequestsDocument, options);
      }
export function useGetSuggestedBuddyRequestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSuggestedBuddyRequestsQuery, GetSuggestedBuddyRequestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSuggestedBuddyRequestsQuery, GetSuggestedBuddyRequestsQueryVariables>(GetSuggestedBuddyRequestsDocument, options);
        }
export type GetSuggestedBuddyRequestsQueryHookResult = ReturnType<typeof useGetSuggestedBuddyRequestsQuery>;
export type GetSuggestedBuddyRequestsLazyQueryHookResult = ReturnType<typeof useGetSuggestedBuddyRequestsLazyQuery>;
export type GetSuggestedBuddyRequestsQueryResult = Apollo.QueryResult<GetSuggestedBuddyRequestsQuery, GetSuggestedBuddyRequestsQueryVariables>;
export const GetTutorOrderDocument = gql`
    query getTutorOrder($where: TutorOrderWhereUniqueInput!) {
  getTutorOrder(where: $where) {
    IOutput {
      ...IOutput
    }
    tutor_order {
      ...TutorOrder
    }
  }
}
    ${IOutputFragmentDoc}
${TutorOrderFragmentDoc}`;

/**
 * __useGetTutorOrderQuery__
 *
 * To run a query within a React component, call `useGetTutorOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTutorOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTutorOrderQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetTutorOrderQuery(baseOptions: Apollo.QueryHookOptions<GetTutorOrderQuery, GetTutorOrderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTutorOrderQuery, GetTutorOrderQueryVariables>(GetTutorOrderDocument, options);
      }
export function useGetTutorOrderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTutorOrderQuery, GetTutorOrderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTutorOrderQuery, GetTutorOrderQueryVariables>(GetTutorOrderDocument, options);
        }
export type GetTutorOrderQueryHookResult = ReturnType<typeof useGetTutorOrderQuery>;
export type GetTutorOrderLazyQueryHookResult = ReturnType<typeof useGetTutorOrderLazyQuery>;
export type GetTutorOrderQueryResult = Apollo.QueryResult<GetTutorOrderQuery, GetTutorOrderQueryVariables>;
export const GetTutorOrderTutorConnectDocument = gql`
    query GetTutorOrderTutorConnect($where1: ProfileWhereUniqueInput!, $where2: TutorOrderWhereUniqueInput!) {
  getTutorOrderTutorConnect(where_1: $where1, where_2: $where2) {
    IOutput {
      ...IOutput
    }
    tutor_order_tutor_connect {
      ...TutorOrderTutorConnect
    }
  }
}
    ${IOutputFragmentDoc}
${TutorOrderTutorConnectFragmentDoc}`;

/**
 * __useGetTutorOrderTutorConnectQuery__
 *
 * To run a query within a React component, call `useGetTutorOrderTutorConnectQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTutorOrderTutorConnectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTutorOrderTutorConnectQuery({
 *   variables: {
 *      where1: // value for 'where1'
 *      where2: // value for 'where2'
 *   },
 * });
 */
export function useGetTutorOrderTutorConnectQuery(baseOptions: Apollo.QueryHookOptions<GetTutorOrderTutorConnectQuery, GetTutorOrderTutorConnectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTutorOrderTutorConnectQuery, GetTutorOrderTutorConnectQueryVariables>(GetTutorOrderTutorConnectDocument, options);
      }
export function useGetTutorOrderTutorConnectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTutorOrderTutorConnectQuery, GetTutorOrderTutorConnectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTutorOrderTutorConnectQuery, GetTutorOrderTutorConnectQueryVariables>(GetTutorOrderTutorConnectDocument, options);
        }
export type GetTutorOrderTutorConnectQueryHookResult = ReturnType<typeof useGetTutorOrderTutorConnectQuery>;
export type GetTutorOrderTutorConnectLazyQueryHookResult = ReturnType<typeof useGetTutorOrderTutorConnectLazyQuery>;
export type GetTutorOrderTutorConnectQueryResult = Apollo.QueryResult<GetTutorOrderTutorConnectQuery, GetTutorOrderTutorConnectQueryVariables>;
export const GetUniquePurposeTypeDocument = gql`
    query GetUniquePurposeType($where: GetUniquePurposeTypeInput!) {
  getUniquePurposeType(where: $where) {
    IOutput {
      ...IOutput
    }
    purpose_type {
      ...PurposeType
    }
  }
}
    ${IOutputFragmentDoc}
${PurposeTypeFragmentDoc}`;

/**
 * __useGetUniquePurposeTypeQuery__
 *
 * To run a query within a React component, call `useGetUniquePurposeTypeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUniquePurposeTypeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUniquePurposeTypeQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetUniquePurposeTypeQuery(baseOptions: Apollo.QueryHookOptions<GetUniquePurposeTypeQuery, GetUniquePurposeTypeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUniquePurposeTypeQuery, GetUniquePurposeTypeQueryVariables>(GetUniquePurposeTypeDocument, options);
      }
export function useGetUniquePurposeTypeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUniquePurposeTypeQuery, GetUniquePurposeTypeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUniquePurposeTypeQuery, GetUniquePurposeTypeQueryVariables>(GetUniquePurposeTypeDocument, options);
        }
export type GetUniquePurposeTypeQueryHookResult = ReturnType<typeof useGetUniquePurposeTypeQuery>;
export type GetUniquePurposeTypeLazyQueryHookResult = ReturnType<typeof useGetUniquePurposeTypeLazyQuery>;
export type GetUniquePurposeTypeQueryResult = Apollo.QueryResult<GetUniquePurposeTypeQuery, GetUniquePurposeTypeQueryVariables>;
export const GetUserDocument = gql`
    query getUser {
  getUser {
    ...User
    profile {
      ...Profile
    }
  }
}
    ${UserFragmentDoc}
${ProfileFragmentDoc}`;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserQuery(baseOptions?: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const GetBuddyNotificationsSubsDocument = gql`
    subscription getBuddyNotificationsSubs($where: ProfileWhereUniqueInput!) {
  getBuddyNotifications(where: $where) {
    IOutput {
      ...IOutput
    }
    buddyRequests {
      ...Relationship
    }
    buddyAccepts {
      ...Relationship
    }
    countNotViewedBuddyNotifications
  }
}
    ${IOutputFragmentDoc}
${RelationshipFragmentDoc}`;

/**
 * __useGetBuddyNotificationsSubsSubscription__
 *
 * To run a query within a React component, call `useGetBuddyNotificationsSubsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGetBuddyNotificationsSubsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBuddyNotificationsSubsSubscription({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetBuddyNotificationsSubsSubscription(baseOptions: Apollo.SubscriptionHookOptions<GetBuddyNotificationsSubsSubscription, GetBuddyNotificationsSubsSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<GetBuddyNotificationsSubsSubscription, GetBuddyNotificationsSubsSubscriptionVariables>(GetBuddyNotificationsSubsDocument, options);
      }
export type GetBuddyNotificationsSubsSubscriptionHookResult = ReturnType<typeof useGetBuddyNotificationsSubsSubscription>;
export type GetBuddyNotificationsSubsSubscriptionResult = Apollo.SubscriptionResult<GetBuddyNotificationsSubsSubscription>;
export const GetConversationSubDocument = gql`
    subscription GetConversationSub($where: ConversationGroupWhereUniqueInput!) {
  getConversation(where: $where) {
    IOutput {
      ...IOutput
    }
    Conversation {
      ...Conversation
    }
    Messages {
      ...Message
    }
    ConversationPageInfo {
      endCursor
      hasNextPage
      lastTake
    }
  }
}
    ${IOutputFragmentDoc}
${ConversationFragmentDoc}
${MessageFragmentDoc}`;

/**
 * __useGetConversationSubSubscription__
 *
 * To run a query within a React component, call `useGetConversationSubSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGetConversationSubSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetConversationSubSubscription({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetConversationSubSubscription(baseOptions: Apollo.SubscriptionHookOptions<GetConversationSubSubscription, GetConversationSubSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<GetConversationSubSubscription, GetConversationSubSubscriptionVariables>(GetConversationSubDocument, options);
      }
export type GetConversationSubSubscriptionHookResult = ReturnType<typeof useGetConversationSubSubscription>;
export type GetConversationSubSubscriptionResult = Apollo.SubscriptionResult<GetConversationSubSubscription>;
export const GetManyConversationsSubsDocument = gql`
    subscription GetManyConversationsSubs($where: ProfileWhereUniqueInput!) {
  getManyConversations(where: $where) {
    IOutput {
      ...IOutput
    }
    Conversations {
      ...ConversationGroup
    }
    countNotViewedConversation
  }
}
    ${IOutputFragmentDoc}
${ConversationGroupFragmentDoc}`;

/**
 * __useGetManyConversationsSubsSubscription__
 *
 * To run a query within a React component, call `useGetManyConversationsSubsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGetManyConversationsSubsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetManyConversationsSubsSubscription({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetManyConversationsSubsSubscription(baseOptions: Apollo.SubscriptionHookOptions<GetManyConversationsSubsSubscription, GetManyConversationsSubsSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<GetManyConversationsSubsSubscription, GetManyConversationsSubsSubscriptionVariables>(GetManyConversationsSubsDocument, options);
      }
export type GetManyConversationsSubsSubscriptionHookResult = ReturnType<typeof useGetManyConversationsSubsSubscription>;
export type GetManyConversationsSubsSubscriptionResult = Apollo.SubscriptionResult<GetManyConversationsSubsSubscription>;
export const GetNotificationsSubDocument = gql`
    subscription GetNotificationsSub($where: ProfileWhereUniqueInput!) {
  getNotifications(where: $where) {
    IOutput {
      ...IOutput
    }
    notifications {
      ...Notification
    }
    countNotViewedNotifications
  }
}
    ${IOutputFragmentDoc}
${NotificationFragmentDoc}`;

/**
 * __useGetNotificationsSubSubscription__
 *
 * To run a query within a React component, call `useGetNotificationsSubSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGetNotificationsSubSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNotificationsSubSubscription({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetNotificationsSubSubscription(baseOptions: Apollo.SubscriptionHookOptions<GetNotificationsSubSubscription, GetNotificationsSubSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<GetNotificationsSubSubscription, GetNotificationsSubSubscriptionVariables>(GetNotificationsSubDocument, options);
      }
export type GetNotificationsSubSubscriptionHookResult = ReturnType<typeof useGetNotificationsSubSubscription>;
export type GetNotificationsSubSubscriptionResult = Apollo.SubscriptionResult<GetNotificationsSubSubscription>;