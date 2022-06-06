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
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type AuthOutput = {
  __typename?: 'AuthOutput';
  ErrorFieldOutput?: Maybe<Array<ErrorFieldOutput>>;
  IOutput: IOutput;
  User?: Maybe<User>;
};

export type BuddyRequestsOutput = {
  __typename?: 'BuddyRequestsOutput';
  IOutput: IOutput;
  Requests?: Maybe<Array<Relationship>>;
};

export type ChangePasswordInput = {
  password: Scalars['String'];
  token: Scalars['String'];
};

export type CreateInterestInput = {
  interest_name: Scalars['String'];
};

export type CreateProfileInput = {
  profile_avatar?: InputMaybe<Scalars['Upload']>;
  profile_bio?: InputMaybe<Scalars['String']>;
  profile_interest: Array<InputMaybe<CreateInterestInput>>;
  profile_wallpaper?: InputMaybe<Scalars['Upload']>;
};

export type DestroyImageInput = {
  img_public_id: Scalars['String'];
};

export type ErrorFieldOutput = {
  __typename?: 'ErrorFieldOutput';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type ForgotPasswordInput = {
  email: Scalars['String'];
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
  PageInfo?: Maybe<PageInfo>;
  Profile?: Maybe<Array<Maybe<Profile>>>;
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

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword?: Maybe<AuthOutput>;
  connectBuddy?: Maybe<RelationshipOutput>;
  createProfile?: Maybe<ProfileMutationOutput>;
  forgotPassword?: Maybe<AuthOutput>;
  login: AuthOutput;
  logout: AuthOutput;
  register: AuthOutput;
  removeAvatar?: Maybe<ProfileMutationOutput>;
  removeBuddy?: Maybe<RelationshipOutput>;
  removeWallpaper?: Maybe<ProfileMutationOutput>;
  respondBuddy?: Maybe<RelationshipOutput>;
  updateProfile?: Maybe<ProfileMutationOutput>;
  verifyEmail: AuthOutput;
};


export type MutationChangePasswordArgs = {
  input: ChangePasswordInput;
};


export type MutationConnectBuddyArgs = {
  input: RelationshipInput;
};


export type MutationCreateProfileArgs = {
  input: CreateProfileInput;
};


export type MutationForgotPasswordArgs = {
  input: ForgotPasswordInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
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


export type MutationUpdateProfileArgs = {
  input: CreateProfileInput;
  where: ProfileWhereUniqueInput;
};


export type MutationVerifyEmailArgs = {
  input: VerifyEmailInput;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['Date']>;
  hasNextPage?: Maybe<Scalars['Boolean']>;
};

export type Profile = {
  __typename?: 'Profile';
  buddies?: Maybe<Array<Relationship>>;
  buddyPendings?: Maybe<Array<Relationship>>;
  buddyRequests?: Maybe<Array<Relationship>>;
  createdAt?: Maybe<Scalars['Date']>;
  id: Scalars['ID'];
  profile_avatar?: Maybe<Scalars['String']>;
  profile_avatar_public_id?: Maybe<Scalars['String']>;
  profile_bio?: Maybe<Scalars['String']>;
  profile_interests?: Maybe<Array<Maybe<ProfileInterest>>>;
  profile_wallpaper?: Maybe<Scalars['String']>;
  profile_wallpaper_public_id?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
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

export type Query = {
  __typename?: 'Query';
  getBuddyRequests?: Maybe<BuddyRequestsOutput>;
  getManyInterests?: Maybe<GetManyInterestOutput>;
  getManyProfiles?: Maybe<GetManyProfilesOutput>;
  getProfile?: Maybe<ProfileMutationOutput>;
  getUser?: Maybe<User>;
};


export type QueryGetBuddyRequestsArgs = {
  where: ProfileWhereUniqueInput;
};


export type QueryGetManyInterestsArgs = {
  where: GetManyInterestsInput;
};


export type QueryGetManyProfilesArgs = {
  where: GetManyProfilesInput;
};


export type QueryGetProfileArgs = {
  where: ProfileWhereUniqueInput;
};

export type RegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Relationship = {
  __typename?: 'Relationship';
  addressee?: Maybe<Profile>;
  addressee_id: Scalars['String'];
  createdAt: Scalars['Date'];
  requester?: Maybe<Profile>;
  requester_id: Scalars['String'];
  specifier_id: Scalars['String'];
  status: RelationshipStatusCode;
  updatedAt: Scalars['Date'];
};

export type RelationshipInput = {
  addressee_id: Scalars['String'];
  requester_id: Scalars['String'];
  specifier_id: Scalars['String'];
  status: RelationshipStatusCode;
};

export type RelationshipOutput = {
  __typename?: 'RelationshipOutput';
  IOutput: IOutput;
  Relationship?: Maybe<Relationship>;
};

export enum RelationshipStatusCode {
  Accepted = 'ACCEPTED',
  Declined = 'DECLINED',
  Requested = 'REQUESTED'
}

export type Subscription = {
  __typename?: 'Subscription';
  buddyRequests?: Maybe<BuddyRequestsOutput>;
};


export type SubscriptionBuddyRequestsArgs = {
  where: ProfileWhereUniqueInput;
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

export type GetManyInterestsInput = {
  search_input?: InputMaybe<Scalars['String']>;
};

export type ChangePasswordMutationVariables = Exact<{
  input: ChangePasswordInput;
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword?: { __typename?: 'AuthOutput', IOutput: { __typename?: 'IOutput', code: number, success: boolean, message: string }, User?: { __typename?: 'User', id: string, username: string, email: string } | null, ErrorFieldOutput?: Array<{ __typename?: 'ErrorFieldOutput', field: string, message: string }> | null } | null };

export type ConnectBuddyMutationVariables = Exact<{
  input: RelationshipInput;
}>;


export type ConnectBuddyMutation = { __typename?: 'Mutation', connectBuddy?: { __typename?: 'RelationshipOutput', IOutput: { __typename?: 'IOutput', code: number, success: boolean, message: string } } | null };

export type CreateProfileMutationVariables = Exact<{
  input: CreateProfileInput;
}>;


export type CreateProfileMutation = { __typename?: 'Mutation', createProfile?: { __typename?: 'ProfileMutationOutput', IOutput: { __typename?: 'IOutput', code: number, success: boolean, message: string }, Profile?: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_wallpaper?: string | null, profile_interests?: Array<{ __typename?: 'ProfileInterest', interest: { __typename?: 'Interest', id: string, interest_name?: string | null } } | null> | null } | null } | null };

export type ForgotPasswordMutationVariables = Exact<{
  input: ForgotPasswordInput;
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword?: { __typename?: 'AuthOutput', IOutput: { __typename?: 'IOutput', code: number, success: boolean, message: string }, ErrorFieldOutput?: Array<{ __typename?: 'ErrorFieldOutput', field: string, message: string }> | null } | null };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthOutput', IOutput: { __typename?: 'IOutput', code: number, success: boolean, message: string }, User?: { __typename?: 'User', id: string, email: string, username: string, profile?: { __typename?: 'Profile', id: string } | null } | null, ErrorFieldOutput?: Array<{ __typename?: 'ErrorFieldOutput', field: string, message: string }> | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'AuthOutput', IOutput: { __typename?: 'IOutput', code: number, success: boolean, message: string } } };

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'AuthOutput', IOutput: { __typename?: 'IOutput', code: number, success: boolean, message: string }, User?: { __typename?: 'User', id: string, username: string, email: string } | null, ErrorFieldOutput?: Array<{ __typename?: 'ErrorFieldOutput', field: string, message: string }> | null } };

export type RemoveAvatarMutationVariables = Exact<{
  where: ProfileWhereUniqueInput;
  input: DestroyImageInput;
}>;


export type RemoveAvatarMutation = { __typename?: 'Mutation', removeAvatar?: { __typename?: 'ProfileMutationOutput', IOutput: { __typename?: 'IOutput', code: number, success: boolean, message: string }, Profile?: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, profile_interests?: Array<{ __typename?: 'ProfileInterest', interest: { __typename?: 'Interest', interest_name?: string | null } } | null> | null, buddies?: Array<{ __typename?: 'Relationship', requester_id: string, addressee_id: string, status: RelationshipStatusCode, createdAt: any, updatedAt: any }> | null, buddyRequests?: Array<{ __typename?: 'Relationship', requester_id: string, addressee_id: string, specifier_id: string, status: RelationshipStatusCode, createdAt: any, updatedAt: any }> | null, buddyPendings?: Array<{ __typename?: 'Relationship', requester_id: string, addressee_id: string, specifier_id: string, status: RelationshipStatusCode, createdAt: any, updatedAt: any }> | null, user?: { __typename?: 'User', id: string, username: string, email: string } | null } | null } | null };

export type RemoveBuddyMutationVariables = Exact<{
  input: RelationshipInput;
}>;


export type RemoveBuddyMutation = { __typename?: 'Mutation', removeBuddy?: { __typename?: 'RelationshipOutput', IOutput: { __typename?: 'IOutput', code: number, success: boolean, message: string } } | null };

export type RemoveWallpaperMutationVariables = Exact<{
  where: ProfileWhereUniqueInput;
  input: DestroyImageInput;
}>;


export type RemoveWallpaperMutation = { __typename?: 'Mutation', removeWallpaper?: { __typename?: 'ProfileMutationOutput', IOutput: { __typename?: 'IOutput', code: number, success: boolean, message: string }, Profile?: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, profile_interests?: Array<{ __typename?: 'ProfileInterest', interest: { __typename?: 'Interest', interest_name?: string | null } } | null> | null, buddies?: Array<{ __typename?: 'Relationship', requester_id: string, addressee_id: string, status: RelationshipStatusCode, createdAt: any, updatedAt: any }> | null, buddyRequests?: Array<{ __typename?: 'Relationship', requester_id: string, addressee_id: string, specifier_id: string, status: RelationshipStatusCode, createdAt: any, updatedAt: any }> | null, buddyPendings?: Array<{ __typename?: 'Relationship', requester_id: string, addressee_id: string, specifier_id: string, status: RelationshipStatusCode, createdAt: any, updatedAt: any }> | null, user?: { __typename?: 'User', id: string, username: string, email: string } | null } | null } | null };

export type RespondBuddyMutationVariables = Exact<{
  input: RelationshipInput;
}>;


export type RespondBuddyMutation = { __typename?: 'Mutation', respondBuddy?: { __typename?: 'RelationshipOutput', IOutput: { __typename?: 'IOutput', code: number, success: boolean, message: string } } | null };

export type UpdateProfileMutationVariables = Exact<{
  input: CreateProfileInput;
  where: ProfileWhereUniqueInput;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile?: { __typename?: 'ProfileMutationOutput', IOutput: { __typename?: 'IOutput', code: number, success: boolean, message: string }, Profile?: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, profile_interests?: Array<{ __typename?: 'ProfileInterest', interest: { __typename?: 'Interest', interest_name?: string | null } } | null> | null, buddies?: Array<{ __typename?: 'Relationship', requester_id: string, addressee_id: string, status: RelationshipStatusCode, createdAt: any, updatedAt: any }> | null, buddyRequests?: Array<{ __typename?: 'Relationship', requester_id: string, addressee_id: string, specifier_id: string, status: RelationshipStatusCode, createdAt: any, updatedAt: any }> | null, buddyPendings?: Array<{ __typename?: 'Relationship', requester_id: string, addressee_id: string, specifier_id: string, status: RelationshipStatusCode, createdAt: any, updatedAt: any }> | null, user?: { __typename?: 'User', id: string, username: string, email: string } | null } | null } | null };

export type VerifyEmailMutationVariables = Exact<{
  input: VerifyEmailInput;
}>;


export type VerifyEmailMutation = { __typename?: 'Mutation', verifyEmail: { __typename?: 'AuthOutput', IOutput: { __typename?: 'IOutput', code: number, success: boolean, message: string }, User?: { __typename?: 'User', id: string, isVerified: boolean, email: string } | null } };

export type GetBuddyRequestsQueryVariables = Exact<{
  where: ProfileWhereUniqueInput;
}>;


export type GetBuddyRequestsQuery = { __typename?: 'Query', getBuddyRequests?: { __typename?: 'BuddyRequestsOutput', IOutput: { __typename?: 'IOutput', code: number, success: boolean, message: string }, Requests?: Array<{ __typename?: 'Relationship', requester_id: string, createdAt: any, requester?: { __typename?: 'Profile', profile_avatar?: string | null, user?: { __typename?: 'User', username: string } | null } | null }> | null } | null };

export type GetManyInterestsQueryVariables = Exact<{
  where: GetManyInterestsInput;
}>;


export type GetManyInterestsQuery = { __typename?: 'Query', getManyInterests?: { __typename?: 'GetManyInterestOutput', IOutput: { __typename?: 'IOutput', code: number, success: boolean, message: string }, Interest?: Array<{ __typename?: 'Interest', interest_name?: string | null } | null> | null } | null };

export type GetManyProfilesQueryVariables = Exact<{
  where: GetManyProfilesInput;
}>;


export type GetManyProfilesQuery = { __typename?: 'Query', getManyProfiles?: { __typename?: 'GetManyProfilesOutput', IOutput: { __typename?: 'IOutput', code: number, success: boolean, message: string }, Profile?: Array<{ __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, createdAt?: any | null, profile_interests?: Array<{ __typename?: 'ProfileInterest', interest: { __typename?: 'Interest', interest_name?: string | null } } | null> | null, user?: { __typename?: 'User', id: string, username: string, email: string } | null } | null> | null, PageInfo?: { __typename?: 'PageInfo', endCursor?: any | null, hasNextPage?: boolean | null } | null } | null };

export type GetProfileQueryVariables = Exact<{
  where: ProfileWhereUniqueInput;
}>;


export type GetProfileQuery = { __typename?: 'Query', getProfile?: { __typename?: 'ProfileMutationOutput', IOutput: { __typename?: 'IOutput', code: number, success: boolean, message: string }, Profile?: { __typename?: 'Profile', id: string, profile_bio?: string | null, profile_avatar?: string | null, profile_avatar_public_id?: string | null, profile_wallpaper?: string | null, profile_wallpaper_public_id?: string | null, profile_interests?: Array<{ __typename?: 'ProfileInterest', interest: { __typename?: 'Interest', interest_name?: string | null } } | null> | null, buddies?: Array<{ __typename?: 'Relationship', requester_id: string, addressee_id: string, status: RelationshipStatusCode, createdAt: any, updatedAt: any, requester?: { __typename?: 'Profile', profile_avatar?: string | null, user?: { __typename?: 'User', username: string } | null } | null, addressee?: { __typename?: 'Profile', profile_avatar?: string | null, user?: { __typename?: 'User', username: string } | null } | null }> | null, buddyRequests?: Array<{ __typename?: 'Relationship', requester_id: string, addressee_id: string, specifier_id: string, status: RelationshipStatusCode, createdAt: any, updatedAt: any, requester?: { __typename?: 'Profile', profile_avatar?: string | null, user?: { __typename?: 'User', username: string } | null } | null, addressee?: { __typename?: 'Profile', profile_avatar?: string | null, user?: { __typename?: 'User', username: string } | null } | null }> | null, buddyPendings?: Array<{ __typename?: 'Relationship', requester_id: string, addressee_id: string, specifier_id: string, status: RelationshipStatusCode, createdAt: any, updatedAt: any, requester?: { __typename?: 'Profile', profile_avatar?: string | null, user?: { __typename?: 'User', username: string } | null } | null, addressee?: { __typename?: 'Profile', profile_avatar?: string | null, user?: { __typename?: 'User', username: string } | null } | null }> | null, user?: { __typename?: 'User', id: string, username: string, email: string } | null } | null } | null };

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', getUser?: { __typename?: 'User', id: string, username: string, email: string, profile?: { __typename?: 'Profile', id: string, profile_avatar?: string | null } | null } | null };

export type BuddyRequestsSubscriptionVariables = Exact<{
  where: ProfileWhereUniqueInput;
}>;


export type BuddyRequestsSubscription = { __typename?: 'Subscription', buddyRequests?: { __typename?: 'BuddyRequestsOutput', IOutput: { __typename?: 'IOutput', code: number, message: string, success: boolean }, Requests?: Array<{ __typename?: 'Relationship', requester_id: string, createdAt: any, requester?: { __typename?: 'Profile', profile_avatar?: string | null } | null }> | null } | null };


export const ChangePasswordDocument = gql`
    mutation changePassword($input: ChangePasswordInput!) {
  changePassword(input: $input) {
    IOutput {
      code
      success
      message
    }
    User {
      id
      username
      email
    }
    ErrorFieldOutput {
      field
      message
    }
  }
}
    `;
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
      code
      success
      message
    }
  }
}
    `;
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
export const CreateProfileDocument = gql`
    mutation createProfile($input: CreateProfileInput!) {
  createProfile(input: $input) {
    IOutput {
      code
      success
      message
    }
    Profile {
      id
      profile_bio
      profile_avatar
      profile_wallpaper
      profile_interests {
        interest {
          id
          interest_name
        }
      }
    }
  }
}
    `;
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
export const ForgotPasswordDocument = gql`
    mutation forgotPassword($input: ForgotPasswordInput!) {
  forgotPassword(input: $input) {
    IOutput {
      code
      success
      message
    }
    ErrorFieldOutput {
      field
      message
    }
  }
}
    `;
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
export const LoginDocument = gql`
    mutation login($input: LoginInput!) {
  login(input: $input) {
    IOutput {
      code
      success
      message
    }
    User {
      id
      email
      username
      profile {
        id
      }
    }
    ErrorFieldOutput {
      field
      message
    }
  }
}
    `;
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
      code
      success
      message
    }
  }
}
    `;
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
export const RegisterDocument = gql`
    mutation register($input: RegisterInput!) {
  register(input: $input) {
    IOutput {
      code
      success
      message
    }
    User {
      id
      username
      email
    }
    ErrorFieldOutput {
      field
      message
    }
  }
}
    `;
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
      code
      success
      message
    }
    Profile {
      id
      profile_bio
      profile_avatar
      profile_avatar_public_id
      profile_wallpaper
      profile_wallpaper_public_id
      profile_interests {
        interest {
          interest_name
        }
      }
      buddies {
        requester_id
        addressee_id
        status
        createdAt
        updatedAt
      }
      buddyRequests {
        requester_id
        addressee_id
        specifier_id
        status
        createdAt
        updatedAt
      }
      buddyPendings {
        requester_id
        addressee_id
        specifier_id
        status
        createdAt
        updatedAt
      }
      user {
        id
        username
        email
      }
    }
  }
}
    `;
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
      code
      success
      message
    }
  }
}
    `;
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
      code
      success
      message
    }
    Profile {
      id
      profile_bio
      profile_avatar
      profile_avatar_public_id
      profile_wallpaper
      profile_wallpaper_public_id
      profile_interests {
        interest {
          interest_name
        }
      }
      buddies {
        requester_id
        addressee_id
        status
        createdAt
        updatedAt
      }
      buddyRequests {
        requester_id
        addressee_id
        specifier_id
        status
        createdAt
        updatedAt
      }
      buddyPendings {
        requester_id
        addressee_id
        specifier_id
        status
        createdAt
        updatedAt
      }
      user {
        id
        username
        email
      }
    }
  }
}
    `;
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
      code
      success
      message
    }
  }
}
    `;
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
export const UpdateProfileDocument = gql`
    mutation updateProfile($input: CreateProfileInput!, $where: ProfileWhereUniqueInput!) {
  updateProfile(input: $input, where: $where) {
    IOutput {
      code
      success
      message
    }
    Profile {
      id
      profile_bio
      profile_avatar
      profile_avatar_public_id
      profile_wallpaper
      profile_wallpaper_public_id
      profile_interests {
        interest {
          interest_name
        }
      }
      buddies {
        requester_id
        addressee_id
        status
        createdAt
        updatedAt
      }
      buddyRequests {
        requester_id
        addressee_id
        specifier_id
        status
        createdAt
        updatedAt
      }
      buddyPendings {
        requester_id
        addressee_id
        specifier_id
        status
        createdAt
        updatedAt
      }
      user {
        id
        username
        email
      }
    }
  }
}
    `;
export type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      input: // value for 'input'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, options);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const VerifyEmailDocument = gql`
    mutation verifyEmail($input: VerifyEmailInput!) {
  verifyEmail(input: $input) {
    IOutput {
      code
      success
      message
    }
    User {
      id
      isVerified
      email
    }
  }
}
    `;
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
export const GetBuddyRequestsDocument = gql`
    query getBuddyRequests($where: ProfileWhereUniqueInput!) {
  getBuddyRequests(where: $where) {
    IOutput {
      code
      success
      message
    }
    Requests {
      requester_id
      requester {
        user {
          username
        }
        profile_avatar
      }
      createdAt
    }
  }
}
    `;

/**
 * __useGetBuddyRequestsQuery__
 *
 * To run a query within a React component, call `useGetBuddyRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBuddyRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBuddyRequestsQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetBuddyRequestsQuery(baseOptions: Apollo.QueryHookOptions<GetBuddyRequestsQuery, GetBuddyRequestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBuddyRequestsQuery, GetBuddyRequestsQueryVariables>(GetBuddyRequestsDocument, options);
      }
export function useGetBuddyRequestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBuddyRequestsQuery, GetBuddyRequestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBuddyRequestsQuery, GetBuddyRequestsQueryVariables>(GetBuddyRequestsDocument, options);
        }
export type GetBuddyRequestsQueryHookResult = ReturnType<typeof useGetBuddyRequestsQuery>;
export type GetBuddyRequestsLazyQueryHookResult = ReturnType<typeof useGetBuddyRequestsLazyQuery>;
export type GetBuddyRequestsQueryResult = Apollo.QueryResult<GetBuddyRequestsQuery, GetBuddyRequestsQueryVariables>;
export const GetManyInterestsDocument = gql`
    query getManyInterests($where: getManyInterestsInput!) {
  getManyInterests(where: $where) {
    IOutput {
      code
      success
      message
    }
    Interest {
      interest_name
    }
  }
}
    `;

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
      code
      success
      message
    }
    Profile {
      id
      profile_bio
      profile_avatar
      profile_interests {
        interest {
          interest_name
        }
      }
      createdAt
      user {
        id
        username
        email
      }
    }
    PageInfo {
      endCursor
      hasNextPage
    }
  }
}
    `;

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
export const GetProfileDocument = gql`
    query getProfile($where: ProfileWhereUniqueInput!) {
  getProfile(where: $where) {
    IOutput {
      code
      success
      message
    }
    Profile {
      id
      profile_bio
      profile_avatar
      profile_avatar_public_id
      profile_wallpaper
      profile_wallpaper_public_id
      profile_interests {
        interest {
          interest_name
        }
      }
      buddies {
        requester_id
        requester {
          user {
            username
          }
          profile_avatar
        }
        addressee_id
        addressee {
          user {
            username
          }
          profile_avatar
        }
        status
        createdAt
        updatedAt
      }
      buddyRequests {
        requester_id
        requester {
          user {
            username
          }
          profile_avatar
        }
        addressee_id
        addressee {
          user {
            username
          }
          profile_avatar
        }
        specifier_id
        status
        createdAt
        updatedAt
      }
      buddyPendings {
        requester_id
        requester {
          user {
            username
          }
          profile_avatar
        }
        addressee_id
        addressee {
          user {
            username
          }
          profile_avatar
        }
        specifier_id
        status
        createdAt
        updatedAt
      }
      user {
        id
        username
        email
      }
    }
  }
}
    `;

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
export const GetUserDocument = gql`
    query getUser {
  getUser {
    id
    username
    email
    profile {
      id
      profile_avatar
    }
  }
}
    `;

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
export const BuddyRequestsDocument = gql`
    subscription buddyRequests($where: ProfileWhereUniqueInput!) {
  buddyRequests(where: $where) {
    IOutput {
      code
      message
      success
    }
    Requests {
      requester_id
      requester {
        profile_avatar
      }
      createdAt
    }
  }
}
    `;

/**
 * __useBuddyRequestsSubscription__
 *
 * To run a query within a React component, call `useBuddyRequestsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useBuddyRequestsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBuddyRequestsSubscription({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useBuddyRequestsSubscription(baseOptions: Apollo.SubscriptionHookOptions<BuddyRequestsSubscription, BuddyRequestsSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<BuddyRequestsSubscription, BuddyRequestsSubscriptionVariables>(BuddyRequestsDocument, options);
      }
export type BuddyRequestsSubscriptionHookResult = ReturnType<typeof useBuddyRequestsSubscription>;
export type BuddyRequestsSubscriptionResult = Apollo.SubscriptionResult<BuddyRequestsSubscription>;