import { useApolloClient } from "@apollo/client";
import Link from "next/link";
import { useState } from "react";
import {
  GetProfileQuery,
  GetUserDocument,
  GetUserQuery,
  RelationshipInput,
  RelationshipStatusCode,
  useConnectBuddyMutation,
} from "../generated/graphql";
import Avatar from "./Avatar";
import Loading from "./Loading";
import Wallpaper from "./Wallpaper";

interface ProfilePageProps {
  data: GetProfileQuery | undefined;
  loading?: boolean;
}
const ProfilePage = (props: ProfilePageProps) => {
  const success = props.data?.getProfile?.IOutput.success;
  const profileData = props.data?.getProfile?.Profile;
  const profile_interests = profileData?.profile_interests;
  const profile_wallpaper = profileData?.profile_wallpaper;
  const profile_avatar = profileData?.profile_avatar;
  const username = profileData?.user?.username;
  const profile_id = profileData?.id;
  const profile_bio = profileData?.profile_bio;
  const buddies = profileData?.buddies;

  const client = useApolloClient();
  const user_profile_id = client.readQuery<GetUserQuery>({
    query: GetUserDocument,
  })?.getUser?.profile?.id;
  const [
    connectBuddy,
    { data: connectBuddyData, loading: connectBuddyLoading },
  ] = useConnectBuddyMutation();
  const [status, setStatus] = useState<RelationshipStatusCode>();
  const connect = async ({
    requester_id,
    addressee_id,
    specifier_id,
    status,
  }: RelationshipInput) => {
    await connectBuddy({
      variables: {
        input: {
          requester_id,
          addressee_id,
          specifier_id,
          status,
        },
      },
    });
  };

  if (props.loading) return <Loading />;

  if (user_profile_id !== profile_id)
    return (
      <div>
        <Wallpaper img_url={profile_wallpaper} />
        <Avatar img_url={profile_avatar} />
        <button type="button">Connect</button>
        <h1>{username}</h1>
        <h2>Bio: {profile_bio}</h2>
        <h2>Interest</h2>
        {profile_interests &&
          profile_interests.map((obj, index) => {
            return (
              <div key={index}>
                <span>{obj?.interest.interest_name}</span>
              </div>
            );
          })}
        {success ? null : <div>{props.data?.getProfile?.IOutput?.message}</div>}
      </div>
    );

  return (
    <div>
      <Wallpaper img_url={profile_wallpaper} />
      <Avatar img_url={profile_avatar} />
      <h1>{username}</h1>
      <Link href={`/profile/edit/${profile_id}`}>
        <a>Edit profile</a>
      </Link>
      <h2>Bio: {profile_bio}</h2>
      <h2>Interest</h2>
      {profileData?.profile_interests &&
        profileData.profile_interests.map((profile, index) => {
          return (
            <div key={index}>
              <span>{profile?.interest.interest_name}</span>
            </div>
          );
        })}
      <h2>Buddies: </h2>
    </div>
  );
};

export default ProfilePage;
