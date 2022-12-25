import { useRouter } from "next/router";
import SuggestedBuddyRequests from "../../components/BuddyRequest/SuggestedBuddyRequests";
import Layout from "../../components/Layouts/Layout";
import SparkBuddiesLayout from "../../components/Layouts/SparkBuddiesLayout";
import Loading from "../../components/Loading/Loading";
import { useGetMyBuddyRequestsQuery } from "../../generated/graphql";
import { BUDDIES_REQUESTS_TAKE_LIMIT } from "../../utils/constants";

const SuggestedBuddies = () => {
  const router = useRouter();
  const onboarding_purpose_name = router.query.purpose_name as string;
  const onboarding_purpose_types = router.query.purpose_types as string[];
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
  const profile_purpose_name = buddy_requests?.map(
    (buddy_request) => buddy_request.purpose.purpose_name
  );
  const profile_purpose_types = buddy_requests?.map(
    (buddy_request) => buddy_request.purpose_type.purpose_type_name
  );

  if (GetMyBuddyRequestsLoading) {
    return (
      <Layout>
        <SparkBuddiesLayout>
          <Loading />
        </SparkBuddiesLayout>
      </Layout>
    );
  }
  return (
    <>
      <Layout>
        <SparkBuddiesLayout>
          <div>Suggested Buddies</div>
          <SuggestedBuddyRequests
            onboarding_purpose_name={[onboarding_purpose_name]}
            onboarding_purpose_types={onboarding_purpose_types}
            profile_purpose_name={profile_purpose_name}
            profile_purpose_types={profile_purpose_types}
            pagination={true}
          />
        </SparkBuddiesLayout>
      </Layout>
    </>
  );
};

export default SuggestedBuddies;
