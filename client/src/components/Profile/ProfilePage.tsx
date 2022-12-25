import { useState } from "react";
import {
  ProfileFragment,
  useGetMyBuddyRequestsQuery,
  useGetUserQuery,
} from "../../generated/graphql";
import { BUDDIES_REQUESTS_TAKE_LIMIT } from "../../utils/constants";
import BuddyRequestCard from "../BuddyRequest/BuddyRequestCard";
import Loading from "../Loading/Loading";
import AgeLocation from "./AgeLocation";
import Avatar from "./Avatar";
import BuddyButton from "./BuddyButton";
import EditProfileAvatar from "./EditProfileAvatar";
import EditProfileWallpaper from "./EditProfileWallpaper";
import EducationList from "./EducationList";
import MyBuddies from "./MyBuddies";
import { ProfileIntroduction } from "./ProfileIntroduction";
import Wallpaper from "./Wallpaper";
import WorkExperienceList from "./WorkExperienceList";

interface ProfilePageProps {
  profile: ProfileFragment;
}

const ProfilePage = ({ profile }: ProfilePageProps) => {
  const { data: GetUserData, loading: GetUserLoading } = useGetUserQuery();
  const profile_id = profile?.id;
  const user_profile_id = GetUserData?.getUser?.profile?.id;
  const isProfileOwner = user_profile_id == profile_id;

  if (GetUserLoading) return <Loading />;

  if (isProfileOwner)
    return (
      <ProfilePageOwnerView
        profile={profile}
        user_profile_id={user_profile_id!}
      />
    );

  return <ProfilePageGuestView profile={profile} />;
};

interface ProfilePageGuestViewProps {
  profile: ProfileFragment;
}

const ProfilePageGuestView = ({ profile }: ProfilePageGuestViewProps) => {
  const profile_id = profile?.id;
  const { data: GetMyBuddyRequestsData, loading: GetMyBuddyRequestsLoading } =
    useGetMyBuddyRequestsQuery({
      variables: {
        input: {
          search_query: "",
          take: BUDDIES_REQUESTS_TAKE_LIMIT,
        },
      },
    });

  const buddy_requests =
    GetMyBuddyRequestsData?.getMyBuddyRequests?.buddy_requests;
  const profile_avatar = profile?.profile_avatar;
  const profile_wallpaper = profile?.profile_wallpaper;
  const username = profile?.user?.username;
  const work_experience = profile?.work_experience;
  const currentWork = work_experience?.find((e) => e?.current == true);

  return (
    <>
      <div className="w-full h-full ">
        <div className="relative w-full h-full">
          <Wallpaper img_url={profile_wallpaper} />
          <div className="absolute -translate-y-1/2 left-8">
            <div className="flex items-center justify-center">
              <Avatar
                img_url={profile_avatar}
                width={16}
                height={16}
                border={3}
              />
              <div>
                <div>{username}</div>
                {currentWork ? (
                  <div>
                    {currentWork.work_position} at {currentWork.workplace_name}
                  </div>
                ) : null}
                <AgeLocation profile={profile} isProfileOwner={false} />
              </div>
            </div>
          </div>
          <div className="absolute mt-10 right-8">
            <BuddyButton profile_id={profile_id} />
          </div>
        </div>

        <div className="mx-20 mt-40">
          <div>Profile</div>
          <div>
            <div>Learning requests</div>
            <div>
              {GetMyBuddyRequestsLoading ? (
                <Loading />
              ) : (
                buddy_requests?.map((buddy_request, index) => {
                  return <BuddyRequestCard data={buddy_request} key={index} />;
                })
              )}
            </div>
          </div>
          <ProfileIntroduction profile={profile} isProfileOwner={false} />
          <WorkExperienceList isProfileOwner={false} profile={profile} />
          <EducationList isProfileOwner={false} profile={profile} />
        </div>
      </div>
    </>
  );
};

interface ProfilePageOwnerViewProps {
  profile: ProfileFragment;
  user_profile_id: string;
}

const ProfilePageOwnerView = ({
  profile,
  user_profile_id,
}: ProfilePageOwnerViewProps) => {
  const profile_wallpaper = profile?.profile_wallpaper;
  const profile_avatar = profile?.profile_avatar;
  const username = profile?.user?.username;
  const currentWork = profile?.work_experience?.find((e) => e?.current == true);
  const [pageIndex, setPageIndex] = useState(0);
  const page = [
    <div>
      <ProfileIntroduction profile={profile} isProfileOwner={true} />

      <WorkExperienceList isProfileOwner={true} profile={profile} />
      <EducationList isProfileOwner={true} profile={profile} />
    </div>,
    <MyBuddies profile_id={profile.id} />,
  ];

  return (
    <>
      <div className="w-full h-full ">
        <div className="relative w-full h-full">
          <Wallpaper img_url={profile_wallpaper} />
          <EditProfileWallpaper
            user_profile_id={user_profile_id!}
            profile_wallpaper_public_id={profile?.profile_wallpaper_public_id}
          />

          <div className="absolute -translate-y-1/2 left-8">
            <div className="flex items-center justify-center">
              <div className="relative">
                <Avatar
                  img_url={profile_avatar}
                  width={16}
                  height={16}
                  border={3}
                />
                <EditProfileAvatar
                  user_profile_id={user_profile_id!}
                  profile_avatar_public_id={profile?.profile_avatar_public_id}
                />
              </div>
              <div>
                <div>{username}</div>
                {currentWork ? (
                  <div>
                    {currentWork.work_position} at {currentWork.workplace_name}
                  </div>
                ) : null}
                <AgeLocation isProfileOwner={true} profile={profile} />
              </div>
            </div>
          </div>
        </div>

        <div className="mx-20 mt-40">
          <div>
            <div onClick={() => setPageIndex(0)}>Profile</div>
            <div onClick={() => setPageIndex(1)}>Buddy</div>
          </div>
          <div>{page[pageIndex]}</div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
