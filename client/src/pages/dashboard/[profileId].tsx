import Link from "next/link";
import { useRouter } from "next/router";
import NavBar from "../../components/NavBar";
import { useGetProfileQuery } from "../../generated/graphql";
import { useCheckAuth } from "../../utils/useCheckAuth";

const Profile = () => {
  const { data: checkAuthData, loading: checkAuthLoading } = useCheckAuth();
  const router = useRouter();
  const profile_id = router.query.profileId as string;

  const { data: getProfileData, loading: getProfileLoading } =
    useGetProfileQuery({
      variables: {
        where: {
          profile_id,
        },
      },
    });
  const success = getProfileData?.getProfile?.IOutput.success;
  const profileData = getProfileData?.getProfile?.Profile;

  if (getProfileLoading || checkAuthLoading)
    return (
      <>
        <NavBar />
        <div>Loading...</div>
      </>
    );
  if (checkAuthData?.getUser?.profile?.id !== profile_id)
    return (
      <>
        <NavBar />
        <div>
          <h1>{profileData?.user?.username}</h1>
          <h2>Bio: {profileData?.profile_bio}</h2>
          <h2>Interest</h2>
          {profileData?.profile_interests &&
            profileData.profile_interests.map((obj, index) => {
              return (
                <div key={index}>
                  <span>{obj?.interest.interest_name}</span>
                </div>
              );
            })}
        </div>
        {success ? null : (
          <div>{getProfileData?.getProfile?.IOutput.message}</div>
        )}
      </>
    );
  return (
    <>
      <NavBar />
      <div>
        <h1>{profileData?.user?.username}</h1>
        <Link href={`/dashboard/edit/${profile_id}`}>
          <a>Edit profile</a>
        </Link>
        <h2>Bio: {profileData?.profile_bio}</h2>
        <h2>Interest</h2>
        {profileData?.profile_interests &&
          profileData.profile_interests.map((obj, index) => {
            return (
              <div key={index}>
                <span>{obj?.interest.interest_name}</span>
              </div>
            );
          })}
      </div>
      {success ? null : (
        <div>{getProfileData?.getProfile?.IOutput.message}</div>
      )}
    </>
  );
};

export default Profile;
