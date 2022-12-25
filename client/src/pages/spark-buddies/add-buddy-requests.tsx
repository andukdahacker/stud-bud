import { NetworkStatus } from "@apollo/client";
import { useEffect } from "react";
import Layout from "../../components/Layouts/Layout";
import SparkBuddiesLayout from "../../components/Layouts/SparkBuddiesLayout";
import Loading from "../../components/Loading/Loading";
import LoadMoreTrigger from "../../components/Loading/LoadMoreTrigger";
import BuddyButton from "../../components/Profile/BuddyButton";

import {
  useGetMyBuddiesRequestsLazyQuery,
  useGetUserQuery,
} from "../../generated/graphql";
import { BUDDIES_REQUESTS_TAKE_LIMIT } from "../../utils/constants";

const AddBuddyRequests = () => {
  const { data: GetUserData, loading: GetUserLoading } = useGetUserQuery();
  const user_profile_id = GetUserData?.getUser?.profile?.id;
  const [
    getMyBuddiesRequests,
    {
      data: GetMyBuddiesRequestsData,
      loading: GetMyBuddiesRequestsLoading,
      fetchMore,
      networkStatus,
    },
  ] = useGetMyBuddiesRequestsLazyQuery();
  const add_buddy_requests =
    GetMyBuddiesRequestsData?.getMyBuddiesRequests?.relationships;
  const endCursor =
    GetMyBuddiesRequestsData?.getMyBuddiesRequests?.PageInfo?.endCursor;
  const hasNextPage =
    GetMyBuddiesRequestsData?.getMyBuddiesRequests?.PageInfo?.hasNextPage;
  const lastTake =
    GetMyBuddiesRequestsData?.getMyBuddiesRequests?.PageInfo?.lastTake;
  const fetchMoreLoading = networkStatus == NetworkStatus.fetchMore;

  const FetchMoreMyBuddiesRequests = async () => {
    await fetchMore({
      variables: {
        where: {
          profile_id: user_profile_id,
        },
        input: {
          search_input: null,
          take: lastTake,
          requester_id: endCursor?.id_1,
          addressee_id: endCursor?.id_2,
        },
      },
    });
  };
  useEffect(() => {
    if (user_profile_id)
      getMyBuddiesRequests({
        variables: {
          where: {
            profile_id: user_profile_id!,
          },
          input: {
            search_input: null,
            take: BUDDIES_REQUESTS_TAKE_LIMIT,
          },
        },
      });
  }, [user_profile_id]);

  if (GetUserLoading) return <Loading />;

  return (
    <Layout>
      <SparkBuddiesLayout>
        <div>
          <div>Buddy requests</div>
        </div>

        <div>
          {GetMyBuddiesRequestsLoading ? (
            <Loading />
          ) : (
            add_buddy_requests?.map((buddy_request, index) => {
              const requester = buddy_request.requester;
              return (
                <div key={index}>
                  <div>{buddy_request.requester.user?.username}</div>
                  <BuddyButton profile_id={requester.id} />
                </div>
              );
            })
          )}
        </div>
        <LoadMoreTrigger
          loadMore={FetchMoreMyBuddiesRequests}
          loading={fetchMoreLoading}
          hasNextPage={hasNextPage}
        />
      </SparkBuddiesLayout>
    </Layout>
  );
};

export default AddBuddyRequests;
