import { LazyQueryExecFunction, NetworkStatus } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";

import {
  Exact,
  GetManyProfilesInput,
  GetManyProfilesQuery,
  useGetManyProfilesQuery,
  useGetUserQuery,
} from "../generated/graphql";
import { PROFILES_TAKE_LIMIT } from "../utils/constants";
import Loading from "./Loading";
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

  // const {
  //   data: GetManyProfilesData,
  //   loading: GetManyProfilesLoading,
  //   fetchMore,
  //   networkStatus,
  // } = useGetManyProfilesQuery({
  //   variables: {
  //     where: {
  //       search_input: router.query ? (router.query.search_input as string) : "",
  //       take: PROFILES_TAKE_LIMIT,
  //     },
  //   },
  // });

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
    <div>
      <div className="grid w-full max-h-full grid-cols-3 bg-white gap-x-20 gap-y-10 p-7">
        {noProfilesFound ? (
          <div>Sorry, we found no result</div>
        ) : (
          profiles?.map((profile, index) => {
            const interests = profile?.profile_interests?.map((obj) => {
              return { interest_name: obj?.interest.interest_name as string };
            });
            return (
              <div key={index}>
                <ProfileCard
                  id={profile?.id}
                  username={profile?.user?.username}
                  avatar={
                    profile?.profile_avatar ? profile.profile_avatar : undefined
                  }
                  interests={interests}
                />
              </div>
            );
          })
        )}
      </div>

      {fetchMoreProfilesLoading ? (
        <Loading />
      ) : hasNextPage ? (
        <div onClick={loadMore} className="cursor-pointer">
          Load more
        </div>
      ) : (
        <div>End of list</div>
      )}
    </div>
  );
};

export default FindBuddyPage;
