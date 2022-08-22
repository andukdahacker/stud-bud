import { useApolloClient } from "@apollo/client";
import Link from "next/link";
import {
  GetProfileQuery,
  GetUserDocument,
  GetUserQuery,
} from "../generated/graphql";
import Avatar from "./Avatar";
import Loading from "./Loading";
import Wallpaper from "./Wallpaper";
import BuddyButton from "./BuddyButton";
import { useCheckAuth } from "../utils/useCheckAuth";

interface ProfilePageProps {
  data: GetProfileQuery | undefined;
  loading: boolean;
}

const ProfilePage = (props: ProfilePageProps) => {
  const { data: authData, loading: authLoading } = useCheckAuth();

  const user_profile_id = authData?.getUser?.profile?.id;
  const success = props.data?.getProfile?.IOutput.success;
  const profileData = props.data?.getProfile?.Profile;
  const profile_interests = profileData?.profile_interests;
  const profile_wallpaper = profileData?.profile_wallpaper;
  const profile_avatar = profileData?.profile_avatar;
  const username = profileData?.user?.username;
  const profile_id = profileData?.id;
  const profile_bio = profileData?.profile_bio;

  if (props.loading || authLoading) return <Loading />;

  if (!success) return <div>{props.data?.getProfile?.IOutput.message}</div>;

  if (user_profile_id !== profile_id) {
    return (
      <div className="w-full ">
        <div className="relative">
          <Wallpaper img_url={profile_wallpaper} />
          <div className="absolute -bottom-20 left-8">
            <Avatar
              img_url={profile_avatar}
              width="32"
              height="32"
              border={2}
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full p-8 ">
          <div className="flex w-full mb-10 pl-36">
            <h1 className="mr-10 text-2xl">{username}</h1>
            <BuddyButton profile_id={profile_id} />
          </div>
          <div className="w-4/5 border border-black ">
            <div className="p-2 border-b border-black">
              <h2 className="mb-5 text-2xl tracking-widest">About Me </h2>
              <span>{profile_bio}</span>
            </div>
            <div className="flex w-full p-2 bg-gray-100">
              <h2 className="w-1/5">Interest</h2>
              <div className="flex flex-wrap w-4/5">
                {profile_interests?.map((profile, index) => {
                  return (
                    <div
                      key={index}
                      className="px-2 py-1 my-1 mr-2 bg-gray-200 h-fit w-fit"
                    >
                      {profile?.interest.interest_name}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full ">
      <div className="relative">
        <Wallpaper img_url={profile_wallpaper} />
        <div className="absolute w-32 h-32 -bottom-20 left-8">
          <Avatar img_url={profile_avatar} width={32} height={32} border={2} />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full p-8 ">
        <div className="flex justify-between w-full mb-10 pl-36">
          <h1 className="text-2xl ">{username}</h1>
          <Link href={`/profile/edit/${profile_id}`}>
            <a className="px-2 py-1 font-bold border-2 border-black">
              Edit profile
            </a>
          </Link>
        </div>
        <div className="w-4/5 border border-black ">
          <div className="p-2 border-b border-black">
            <h2 className="mb-5 text-2xl tracking-widest">About Me </h2>
            <span>{profile_bio}</span>
          </div>
          <div className="flex w-full p-2 bg-gray-100">
            <h2 className="w-1/5">Interest</h2>
            <div className="flex flex-wrap w-4/5">
              {profile_interests?.map((profile, index) => {
                return (
                  <div
                    key={index}
                    className="px-2 py-1 my-1 mr-2 bg-gray-200 h-fit w-fit"
                  >
                    {profile?.interest.interest_name}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
