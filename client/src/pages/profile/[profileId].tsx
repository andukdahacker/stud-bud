import { useRouter } from "next/router";
import { useGetProfileLazyQuery } from "../../generated/graphql";
import ProfilePage from "../../components/ProfilePage";
import Layout from "../../components/Layout";
import { useEffect } from "react";

const Profile = () => {
  const router = useRouter();
  const profile_id = router.query.profileId as string;

  const [getProfile, { data: getProfileData, loading: getProfileLoading }] =
    useGetProfileLazyQuery();

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
  const username = getProfileData?.getProfile?.Profile?.user?.username;

  return (
    <Layout username={username}>
      <ProfilePage data={getProfileData} loading={getProfileLoading} />
    </Layout>
  );
};

export default Profile;
