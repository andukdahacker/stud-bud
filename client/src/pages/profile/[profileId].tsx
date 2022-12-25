import { useRouter } from "next/router";
import { useGetProfileLazyQuery } from "../../generated/graphql";
import ProfilePage from "../../components/Profile/ProfilePage";
import Layout from "../../components/Layouts/Layout";
import { useEffect } from "react";
import Loading from "../../components/Loading/Loading";

const Profile = () => {
  const router = useRouter();
  const profile_id = router.query.profileId as string;

  const [getProfile, { data: GetProfileData, loading: GetProfileLoading }] =
    useGetProfileLazyQuery();
  const profile = GetProfileData?.getProfile?.Profile;
  useEffect(() => {
    if (router.isReady)
      getProfile({
        variables: {
          where: {
            profile_id,
          },
        },
      });
  }, [router.isReady, router, getProfile, profile_id]);
  const username = GetProfileData?.getProfile?.Profile?.user?.username;

  return (
    <Layout username={username}>
      {GetProfileLoading ? (
        <Loading />
      ) : !profile ? (
        <div>Cannot fetch profile</div>
      ) : (
        <ProfilePage profile={profile} />
      )}
    </Layout>
  );
};

export default Profile;
