import { NetworkStatus } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BuddyRequestCard from "../../components/BuddyRequest/BuddyRequestCard";
import SuggestedBuddyRequests from "../../components/BuddyRequest/SuggestedBuddyRequests";
import Layout from "../../components/Layouts/Layout";
import SparkBuddiesLayout from "../../components/Layouts/SparkBuddiesLayout";
import Loading from "../../components/Loading/Loading";
import LoadMoreTrigger from "../../components/Loading/LoadMoreTrigger";
import SearchBar from "../../components/Search/SearchBar";
import SuggestionCard from "../../components/Search/SuggestionCard";
import {
  useGetManyBuddyRequestsLazyQuery,
  useGetManyPurposeTypesLazyQuery,
  useGetMyBuddyRequestsQuery,
} from "../../generated/graphql";
import { BUDDIES_REQUESTS_TAKE_LIMIT } from "../../utils/constants";

const FindBuddy = () => {
  const router = useRouter();

  const search_query_string = router.query.search_query as string;
  const [search, setSearch] = useState("");

  const [
    getManyBuddyRequest,
    {
      data: GetManyBuddyRequestData,
      loading: GetManyBuddyRequestLoading,
      fetchMore: fetchMoreBuddyRequests,
      networkStatus: BuddyRequestNetworkStatus,
      refetch: RefetchBuddyRequests,
    },
  ] = useGetManyBuddyRequestsLazyQuery();

  const buddyRequests =
    GetManyBuddyRequestData?.getManyBuddyRequests?.buddy_requests;
  const endCursor =
    GetManyBuddyRequestData?.getManyBuddyRequests?.BuddyRequestPageInfo
      ?.endCursor;
  const lastTake =
    GetManyBuddyRequestData?.getManyBuddyRequests?.BuddyRequestPageInfo
      ?.lastTake;
  const hasNextPage =
    GetManyBuddyRequestData?.getManyBuddyRequests?.BuddyRequestPageInfo
      ?.hasNextPage;
  const FetchMoreBuddyRequestsLoading =
    BuddyRequestNetworkStatus === NetworkStatus.fetchMore;

  const fetchBuddyRequests = async () => {
    // setSearch(value);
    await getManyBuddyRequest({
      variables: {
        where: {
          take: BUDDIES_REQUESTS_TAKE_LIMIT,

          search_query: search_query_string ?? "",
        },
      },
      fetchPolicy: "cache-first",
      notifyOnNetworkStatusChange: true,
    });
  };

  const refetchBuddyRequests = async (value: string) => {
    router.push(`${router.basePath}?search_query=${value}`, undefined, {
      shallow: true,
    });
    setSearch(value);
    await RefetchBuddyRequests({
      where: {
        take: BUDDIES_REQUESTS_TAKE_LIMIT,
        search_query: value,
      },
    });
  };

  const loadMoreBuddyRequests = async () => {
    await fetchMoreBuddyRequests({
      variables: {
        where: {
          take: lastTake,
          cursor: endCursor,
          search_query: search,
        },
      },
    });
  };

  const [
    getManyPurposeTypes,
    { data: GetManyPurposeTypesData, loading: GetManyPurposeTypesLoading },
  ] = useGetManyPurposeTypesLazyQuery();

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

  const purposeTypes =
    GetManyPurposeTypesData?.getManyPurposeTypes?.purpose_types;

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

  useEffect(() => {
    if (router.isReady) {
      fetchBuddyRequests();
    }
  }, [router.isReady, search_query_string]);

  return (
    <Layout>
      <SparkBuddiesLayout>
        <div className="flex flex-col items-center justify-center w-full h-full ">
          <div className="my-2 text-lg font-bold text-blue">
            Find your study buddy
          </div>

          <div className="w-full max-w-xl px-5 my-2">
            <SearchBar searchQuery={fetchPurposeTypes}>
              {GetManyPurposeTypesLoading ? (
                <Loading />
              ) : (
                purposeTypes?.map((purposeType, index) => {
                  return (
                    <SuggestionCard
                      value={purposeType.purpose_type_name}
                      searchQuery={refetchBuddyRequests}
                      key={index}
                    />
                  );
                })
              )}
            </SearchBar>
          </div>

          {GetMyBuddyRequestsLoading ? (
            <Loading />
          ) : search_query_string ? null : (
            <div className="w-full border-black border-y ">
              <div className="flex items-center px-2">
                <div className="my-2 text-lg font-bold">Suggested Buddies</div>
                <Link href={"/spark-buddies/suggested-buddies"}>
                  <a className="ml-5 text-sm font-light text-blue">See all</a>
                </Link>
              </div>
              <SuggestedBuddyRequests
                profile_purpose_name={profile_purpose_name}
                profile_purpose_types={profile_purpose_types}
              />
            </div>
          )}
          <div className="flex flex-col items-center justify-center w-full h-full sm:grid sm:p-2 sm:justify-items-center sm:grid-cols-2 md:grid-cols-3 sm:mt-5 sm:gap-3 xl:grid-cols-4">
            {GetManyBuddyRequestLoading ? (
              <Loading />
            ) : (
              buddyRequests?.map((buddyRequest, index) => {
                return <BuddyRequestCard data={buddyRequest} key={index} />;
              })
            )}
            <div>
              <LoadMoreTrigger
                loadMore={loadMoreBuddyRequests}
                hasNextPage={hasNextPage}
                loading={FetchMoreBuddyRequestsLoading}
              />
            </div>
          </div>
        </div>
      </SparkBuddiesLayout>
    </Layout>
  );
};

export default FindBuddy;
