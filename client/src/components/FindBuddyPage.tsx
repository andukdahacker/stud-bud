import { LazyQueryExecFunction, NetworkStatus } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

import {
  Exact,
  GetManyProfilesInput,
  GetManyProfilesQuery,
} from "../generated/graphql";
import { PROFILES_TAKE_LIMIT } from "../utils/constants";
import Loading from "./Loading";
import LoadMoreTrigger from "./LoadMoreTrigger";
import ProfileCard from "./ProfileCard";

interface FindBuddyPageProps {
  getManyProfiles: LazyQueryExecFunction<
    GetManyProfilesQuery,
    Exact<{
      where: GetManyProfilesInput;
    }>
  >;

  data: GetManyProfilesQuery | undefined;
  loading: boolean;
  fetchMore: any;
  networkStatus: NetworkStatus;
}

const FindBuddyPage = ({
  getManyProfiles,
  data: GetManyProfilesData,
  loading: GetManyProfilesLoading,
  fetchMore,
  networkStatus,
}: FindBuddyPageProps) => {
  const router = useRouter();

  useEffect(() => {
    getManyProfiles({
      variables: {
        where: {
          search_input: router.query
            ? (router.query.search_input as string)
            : "",
          take: PROFILES_TAKE_LIMIT,
        },
      },
    });
  }, []);

  const profiles = GetManyProfilesData?.getManyProfiles?.Profile;
  const noProfilesFound = profiles?.length == 0;

  const hasNextPage =
    GetManyProfilesData?.getManyProfiles?.PageInfo?.hasNextPage;
  const cursor = GetManyProfilesData?.getManyProfiles?.PageInfo?.endCursor;
  const fetchMoreProfilesLoading = networkStatus === NetworkStatus.fetchMore;
  const refetchManyProfilesLoading = networkStatus === NetworkStatus.refetch;

  const loadMore = () => {
    fetchMore({
      variables: {
        where: {
          search_input: router.query
            ? (router.query.search_input as string)
            : "",
          cursor,
          take: PROFILES_TAKE_LIMIT,
        },
      },
    });
  };

  if (GetManyProfilesLoading || refetchManyProfilesLoading) return <Loading />;

  return (
    <div className="w-full h-full ">
      <div className="grid w-full h-full grid-cols-3 bg-white gap-x-20 gap-y-10 p-7">
        {noProfilesFound ? (
          <div>Sorry, we found no result</div>
        ) : (
          profiles?.map((profile, index) => {
            return <ProfileCard profileData={profile} key={index} />;
          })
        )}
      </div>

      <LoadMoreTrigger
        loading={fetchMoreProfilesLoading}
        hasNextPage={hasNextPage}
        loadMore={loadMore}
      />
    </div>
  );
};

export default FindBuddyPage;
