import { NetworkStatus } from "@apollo/client";
import { useEffect, useState } from "react";
import BuddyRequestCard from "../../components/BuddyRequest/BuddyRequestCard";
import Layout from "../../components/Layouts/Layout";
import SparkBuddiesLayout from "../../components/Layouts/SparkBuddiesLayout";
import Loading from "../../components/Loading/Loading";
import LoadMoreTrigger from "../../components/Loading/LoadMoreTrigger";
import SearchBar from "../../components/Search/SearchBar";
import SuggestionCard from "../../components/Search/SuggestionCard";
import {
  useGetManyPurposeTypesLazyQuery,
  useGetMyBuddyRequestsLazyQuery,
  useGetUserQuery,
} from "../../generated/graphql";
import { BUDDIES_REQUESTS_TAKE_LIMIT } from "../../utils/constants";

const BuddyRequest = () => {
  const { data: GetUserData, loading: GetUserLoading } = useGetUserQuery();
  const user_profile_id = GetUserData?.getUser?.profile?.id;
  const [
    getMyBuddyRequests,
    {
      data: GetMyBuddyRequestsData,
      loading: GetMyBuddyRequestsLoading,
      fetchMore: FetchMoreMyBuddyRequests,
      refetch: RefetchMyBuddyRequests,
      networkStatus: MyBuddyRequestNetworkStatus,
    },
  ] = useGetMyBuddyRequestsLazyQuery();

  const [search, setSearch] = useState("");

  const buddy_requests =
    GetMyBuddyRequestsData?.getMyBuddyRequests?.buddy_requests;
  const endCursor =
    GetMyBuddyRequestsData?.getMyBuddyRequests?.BuddyRequestPageInfo?.endCursor;
  const hasNextPage =
    GetMyBuddyRequestsData?.getMyBuddyRequests?.BuddyRequestPageInfo
      ?.hasNextPage;
  const lastTake =
    GetMyBuddyRequestsData?.getMyBuddyRequests?.BuddyRequestPageInfo?.lastTake;
  const FetchMoreMyBuddyRequestsLoading =
    MyBuddyRequestNetworkStatus == NetworkStatus.fetchMore;
  const [
    getManyPurposeTypes,
    { data: GetManyPurposeTypesData, loading: GetManyPurposeTypesLoading },
  ] = useGetManyPurposeTypesLazyQuery();
  const purpose_types =
    GetManyPurposeTypesData?.getManyPurposeTypes?.purpose_types;

  const fetchPurposeTypes = async (value: string) => {
    await getManyPurposeTypes({
      variables: {
        where: {
          purpose_type: value,
          partial: true,
        },
      },
    });
  };

  const fetchBuddyRequests = async () => {
    await getMyBuddyRequests({
      variables: {
        where: {
          profile_id: user_profile_id!,
        },
        input: {
          search_query: "",
          take: BUDDIES_REQUESTS_TAKE_LIMIT,
        },
      },
    });
  };

  const fetchMoreMyBuddyRequests = async () => {
    await FetchMoreMyBuddyRequests({
      variables: {
        where: {
          profile_id: user_profile_id,
        },
        input: {
          search_query: search,
          take: lastTake,
          cursor: endCursor,
        },
      },
    });
  };

  const refetchMyBuddyRequests = async (value: string) => {
    setSearch(value);
    await RefetchMyBuddyRequests({
      where: {
        profile_id: user_profile_id!,
      },
      input: {
        search_query: value,
        take: BUDDIES_REQUESTS_TAKE_LIMIT,
      },
    });
  };

  useEffect(() => {
    if (user_profile_id) fetchBuddyRequests();
  }, [user_profile_id]);
  if (GetUserLoading)
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  return (
    <>
      <Layout>
        <SparkBuddiesLayout>
          <div>
            <div>Buddy requests</div>
            <SearchBar searchQuery={fetchPurposeTypes}>
              {GetManyPurposeTypesLoading ? (
                <Loading />
              ) : (
                purpose_types?.map((purpose_type, index) => {
                  return (
                    <SuggestionCard
                      value={purpose_type.purpose_type_name}
                      searchQuery={refetchMyBuddyRequests}
                      key={index}
                    />
                  );
                })
              )}
            </SearchBar>
          </div>
          <div>
            {GetMyBuddyRequestsLoading ? (
              <Loading />
            ) : (
              buddy_requests?.map((buddy_request, index) => {
                return <BuddyRequestCard data={buddy_request} key={index} />;
              })
            )}
            <LoadMoreTrigger
              loadMore={fetchMoreMyBuddyRequests}
              loading={FetchMoreMyBuddyRequestsLoading}
              hasNextPage={hasNextPage}
            />
          </div>
        </SparkBuddiesLayout>
      </Layout>
    </>
  );
};

export default BuddyRequest;
