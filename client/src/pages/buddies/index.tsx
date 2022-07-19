import { NetworkStatus } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import BuddyCard from "../../components/BuddyCard";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";
import LoadMoreTrigger from "../../components/LoadMoreTrigger";
import SearchBar from "../../components/SearchBar";
import {
  useGetMyBuddiesLazyQuery,
  useGetUserQuery,
} from "../../generated/graphql";
import { BUDDIES_TAKE_LIMIT } from "../../utils/constants";

const Buddies = () => {
  const router = useRouter();
  const { data: GetUserData, loading: GetUserLoading } = useGetUserQuery();

  const user_profile_id = GetUserData?.getUser?.profile?.id;
  const [
    getMyBuddies,
    {
      data: GetMyBuddiesData,
      loading: GetMyBuddiesLoading,
      fetchMore: fetchMoreMyBuddies,
      networkStatus,
      refetch: refetchMyBuddies,
    },
  ] = useGetMyBuddiesLazyQuery();

  const buddies = GetMyBuddiesData?.getMyBuddies?.relationships;
  const hasNextPage = GetMyBuddiesData?.getMyBuddies?.PageInfo?.hasNextPage;
  const endCursor = GetMyBuddiesData?.getMyBuddies?.PageInfo?.endCursor;
  const refetchMyBuddiesLoading = networkStatus === NetworkStatus.refetch;
  const fetchMoreMyBuddiesLoading = networkStatus === NetworkStatus.fetchMore;

  const loadMore = () => {
    fetchMoreMyBuddies({
      variables: {
        where: {
          profile_id: user_profile_id,
        },
        input: {
          take: BUDDIES_TAKE_LIMIT,
          requester_id: endCursor?.id_1,
          addressee_id: endCursor?.id_2,
          search_input: router.query ? router.query.search_input : "",
        },
      },
    });
  };

  useEffect(() => {
    if (user_profile_id)
      getMyBuddies({
        variables: {
          where: {
            profile_id: user_profile_id as string,
          },
          input: {
            take: BUDDIES_TAKE_LIMIT,
            search_input: "",
          },
        },
      });
  }, [user_profile_id]);
  if (GetUserLoading)
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  return (
    <Layout>
      <SearchBar
        findOption={"relationships"}
        refetchMyBuddies={refetchMyBuddies}
      />
      <div>My buddies:</div>
      {GetMyBuddiesLoading || refetchMyBuddiesLoading ? (
        <Loading />
      ) : (
        <div>
          {buddies?.map((buddy, index) => {
            return <BuddyCard relationshipData={buddy} key={index} />;
          })}
        </div>
      )}

      <LoadMoreTrigger
        loading={fetchMoreMyBuddiesLoading}
        hasNextPage={hasNextPage}
        loadMore={loadMore}
      />
    </Layout>
  );
};

export default Buddies;
