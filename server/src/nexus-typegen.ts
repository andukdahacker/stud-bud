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
  CreateInterestInput: { // input type
    interest_name: string; // String!
  }
  CreateProfileInput: { // input type
    profile_avatar?: NexusGenScalars['Upload'] | null; // Upload
    profile_bio?: string | null; // String
    profile_interest: Array<NexusGenInputs['CreateInterestInput'] | null>; // [CreateInterestInput]!
    profile_wallpaper?: NexusGenScalars['Upload'] | null; // Upload
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
  LoginInput: { // input type
    email: string; // String!
    password: string; // String!
  }
  ProfileWhereUniqueInput: { // input type
    profile_id: string; // ID!
  }
  RegisterInput: { // input type
    email: string; // String!
    password: string; // String!
    username: string; // String!
  }
  RelationshipInput: { // input type
    addressee_id: string; // String!
    requester_id: string; // String!
    specifier_id?: string | null; // String
    status?: NexusGenEnums['RelationshipStatusCode'] | null; // RelationshipStatusCode
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
    PageInfo?: NexusGenRootTypes['PageInfo'] | null; // PageInfo
    Profile?: Array<NexusGenRootTypes['Profile'] | null> | null; // [Profile]
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
  Mutation: {};
  PageInfo: { // root type
    endCursor?: NexusGenScalars['Date'] | null; // Date
    hasNextPage?: boolean | null; // Boolean
  }
  Profile: { // root type
    createdAt?: NexusGenScalars['Date'] | null; // Date
    id: string; // ID!
    profile_avatar?: string | null; // String
    profile_avatar_public_id?: string | null; // String
    profile_bio?: string | null; // String
    profile_wallpaper?: string | null; // String
    profile_wallpaper_public_id?: string | null; // String
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
    requester_id: string; // String!
    specifier_id: string; // String!
    status: NexusGenEnums['RelationshipStatusCode']; // RelationshipStatusCode!
    updatedAt: NexusGenScalars['Date']; // Date!
  }
  RelationshipOutput: { // root type
    IOutput: NexusGenRootTypes['IOutput']; // IOutput!
    Relationship?: NexusGenRootTypes['Relationship'] | null; // Relationship
  }
  Subscription: {};
  User: { // root type
    email: string; // String!
    id: string; // ID!
    isVerified: boolean; // Boolean!
    username: string; // String!
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
    PageInfo: NexusGenRootTypes['PageInfo'] | null; // PageInfo
    Profile: Array<NexusGenRootTypes['Profile'] | null> | null; // [Profile]
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
  Mutation: { // field return type
    changePassword: NexusGenRootTypes['AuthOutput'] | null; // AuthOutput
    connectBuddy: NexusGenRootTypes['RelationshipOutput'] | null; // RelationshipOutput
    createProfile: NexusGenRootTypes['ProfileMutationOutput'] | null; // ProfileMutationOutput
    forgotPassword: NexusGenRootTypes['AuthOutput'] | null; // AuthOutput
    login: NexusGenRootTypes['AuthOutput']; // AuthOutput!
    logout: NexusGenRootTypes['AuthOutput']; // AuthOutput!
    register: NexusGenRootTypes['AuthOutput']; // AuthOutput!
    removeAvatar: NexusGenRootTypes['ProfileMutationOutput'] | null; // ProfileMutationOutput
    removeBuddy: NexusGenRootTypes['RelationshipOutput'] | null; // RelationshipOutput
    removeWallpaper: NexusGenRootTypes['ProfileMutationOutput'] | null; // ProfileMutationOutput
    respondBuddy: NexusGenRootTypes['RelationshipOutput'] | null; // RelationshipOutput
    updateProfile: NexusGenRootTypes['ProfileMutationOutput'] | null; // ProfileMutationOutput
    verifyEmail: NexusGenRootTypes['AuthOutput']; // AuthOutput!
  }
  PageInfo: { // field return type
    endCursor: NexusGenScalars['Date'] | null; // Date
    hasNextPage: boolean | null; // Boolean
  }
  Profile: { // field return type
    buddies: Array<NexusGenRootTypes['Relationship'] | null> | null; // [Relationship]
    buddyPendings: Array<NexusGenRootTypes['Relationship'] | null> | null; // [Relationship]
    buddyRequests: Array<NexusGenRootTypes['Relationship'] | null> | null; // [Relationship]
    createdAt: NexusGenScalars['Date'] | null; // Date
    id: string; // ID!
    profile_avatar: string | null; // String
    profile_avatar_public_id: string | null; // String
    profile_bio: string | null; // String
    profile_interests: Array<NexusGenRootTypes['ProfileInterest'] | null> | null; // [ProfileInterest]
    profile_wallpaper: string | null; // String
    profile_wallpaper_public_id: string | null; // String
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
    getManyInterests: NexusGenRootTypes['GetManyInterestOutput'] | null; // GetManyInterestOutput
    getManyProfiles: NexusGenRootTypes['GetManyProfilesOutput'] | null; // GetManyProfilesOutput
    getProfile: NexusGenRootTypes['ProfileMutationOutput'] | null; // ProfileMutationOutput
    getUser: NexusGenRootTypes['User'] | null; // User
  }
  Relationship: { // field return type
    addressee_id: string; // String!
    createdAt: NexusGenScalars['Date']; // Date!
    requester_id: string; // String!
    specifier_id: string; // String!
    status: NexusGenEnums['RelationshipStatusCode']; // RelationshipStatusCode!
    updatedAt: NexusGenScalars['Date']; // Date!
  }
  RelationshipOutput: { // field return type
    IOutput: NexusGenRootTypes['IOutput']; // IOutput!
    Relationship: NexusGenRootTypes['Relationship'] | null; // Relationship
  }
  Subscription: { // field return type
    truths: boolean | null; // Boolean
  }
  User: { // field return type
    email: string; // String!
    id: string; // ID!
    isVerified: boolean; // Boolean!
    profile: NexusGenRootTypes['Profile'] | null; // Profile
    username: string; // String!
  }
}

export interface NexusGenFieldTypeNames {
  AuthOutput: { // field return type name
    ErrorFieldOutput: 'ErrorFieldOutput'
    IOutput: 'IOutput'
    User: 'User'
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
    PageInfo: 'PageInfo'
    Profile: 'Profile'
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
  Mutation: { // field return type name
    changePassword: 'AuthOutput'
    connectBuddy: 'RelationshipOutput'
    createProfile: 'ProfileMutationOutput'
    forgotPassword: 'AuthOutput'
    login: 'AuthOutput'
    logout: 'AuthOutput'
    register: 'AuthOutput'
    removeAvatar: 'ProfileMutationOutput'
    removeBuddy: 'RelationshipOutput'
    removeWallpaper: 'ProfileMutationOutput'
    respondBuddy: 'RelationshipOutput'
    updateProfile: 'ProfileMutationOutput'
    verifyEmail: 'AuthOutput'
  }
  PageInfo: { // field return type name
    endCursor: 'Date'
    hasNextPage: 'Boolean'
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
    getManyInterests: 'GetManyInterestOutput'
    getManyProfiles: 'GetManyProfilesOutput'
    getProfile: 'ProfileMutationOutput'
    getUser: 'User'
  }
  Relationship: { // field return type name
    addressee_id: 'String'
    createdAt: 'Date'
    requester_id: 'String'
    specifier_id: 'String'
    status: 'RelationshipStatusCode'
    updatedAt: 'Date'
  }
  RelationshipOutput: { // field return type name
    IOutput: 'IOutput'
    Relationship: 'Relationship'
  }
  Subscription: { // field return type name
    truths: 'Boolean'
  }
  User: { // field return type name
    email: 'String'
    id: 'ID'
    isVerified: 'Boolean'
    profile: 'Profile'
    username: 'String'
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
    createProfile: { // args
      input: NexusGenInputs['CreateProfileInput']; // CreateProfileInput!
    }
    forgotPassword: { // args
      input: NexusGenInputs['ForgotPasswordInput']; // ForgotPasswordInput!
    }
    login: { // args
      input: NexusGenInputs['LoginInput']; // LoginInput!
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
    updateProfile: { // args
      input: NexusGenInputs['CreateProfileInput']; // CreateProfileInput!
      where: NexusGenInputs['ProfileWhereUniqueInput']; // ProfileWhereUniqueInput!
    }
    verifyEmail: { // args
      input: NexusGenInputs['VerifyEmailInput']; // VerifyEmailInput!
    }
  }
  Query: {
    getManyInterests: { // args
      where: NexusGenInputs['getManyInterestsInput']; // getManyInterestsInput!
    }
    getManyProfiles: { // args
      where: NexusGenInputs['GetManyProfilesInput']; // GetManyProfilesInput!
    }
    getProfile: { // args
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