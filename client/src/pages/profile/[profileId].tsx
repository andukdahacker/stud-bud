import { useRouter } from "next/router";
import { useGetProfileQuery } from "../../generated/graphql";
import { useCheckAuth } from "../../utils/useCheckAuth";
import ProfilePage from "../../components/ProfilePage";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";

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

  const username = getProfileData?.getProfile?.Profile?.user?.username;

  if (checkAuthLoading)
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  if (checkAuthData?.getUser?.profile?.id !== profile_id)
    return (
      <Layout username={username}>
        <ProfilePage
          data={getProfileData}
          profileOwner={false}
          loading={getProfileLoading}
        />
      </Layout>
    );

  return (
    <Layout username={username}>
      <ProfilePage
        data={getProfileData}
        profileOwner={true}
        loading={getProfileLoading}
      />
    </Layout>
  );
};

export default Profile;
