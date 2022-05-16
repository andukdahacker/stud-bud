import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import { useGetProfileQuery } from "../../generated/graphql";
import { useCheckAuth } from "../../utils/useCheckAuth";
import Image from "next/image";
import defaultAvatar from "../../assets/default-avatar.jpg";
import Avatar from "../../components/Avatar";

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
  const username = getProfileData?.getProfile?.Profile?.user?.username;
  const profile_avatar = getProfileData?.getProfile?.Profile?.profile_avatar
    ? getProfileData.getProfile.Profile.profile_avatar
    : undefined;
  const profile_bio = getProfileData?.getProfile?.Profile?.profile_bio;

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
        <Head>
          <title>{username} | StudBud</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>

        <NavBar />
        <div>
          <Avatar img_url={profile_avatar} />
          <h1>{username}</h1>
          <h2>Bio: {profile_bio}</h2>
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
      <Head>
        <title>{username} | StudBud</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NavBar />
      <div>
        <Avatar img_url={profile_avatar} />
        <h1>{username}</h1>
        <Link href={`/profile/edit/${profile_id}`}>
          <a>Edit profile</a>
        </Link>
        <h2>Bio: {profile_bio}</h2>
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
      <Footer />
    </>
  );
};

export default Profile;
