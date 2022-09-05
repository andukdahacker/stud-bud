import { NetworkStatus } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "../../../components/Layout";
import LoadMoreTrigger from "../../../components/LoadMoreTrigger";
import ProfileCard from "../../../components/ProfileCard";
import ProfileCardSkeleton from "../../../components/ProfileCardSkeleton";
import SearchBar from "../../../components/SearchBar";
import SkeletonLoading from "../../../components/SkeletonLoading";
import SparkBuddiesLayout from "../../../components/SparkBuddiesLayout";
import {
  useGetMyBuddiesLazyQuery,
  useGetUserQuery,
} from "../../../generated/graphql";
import { BUDDIES_TAKE_LIMIT } from "../../../utils/constants";
import { SearchInput } from "../../../utils/types";

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

  const onSubmitRefetchMyBuddies = ({ search_input }: SearchInput) => {
    if (user_profile_id)
      refetchMyBuddies({
        where: {
          profile_id: user_profile_id,
        },
        input: {
          take: BUDDIES_TAKE_LIMIT,
          search_input: search_input,
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
            search_input: router.query
              ? (router.query.search_input as string)
              : "",
          },
        },
      });
  }, [user_profile_id]);
  if (GetUserLoading || GetMyBuddiesLoading || refetchMyBuddiesLoading)
    return (
      <Layout>
        <SkeletonLoading
          take={BUDDIES_TAKE_LIMIT}
          skeleton={<ProfileCardSkeleton />}
          layout="ProfileCard"
        />
      </Layout>
    );
  return (
    <Layout>
      <SparkBuddiesLayout>
        <SearchBar onSubmit={onSubmitRefetchMyBuddies} />

        <div className="grid w-full max-h-full grid-cols-3 bg-white gap-x-20 gap-y-10 p-7">
          {buddies?.map((buddy, index) => {
            return (
              <ProfileCard
                profileData={buddy.addressee}
                relationshipData={buddy}
                key={index}
              />
            );
          })}
        </div>

        <LoadMoreTrigger
          loading={fetchMoreMyBuddiesLoading}
          hasNextPage={hasNextPage}
          loadMore={loadMore}
        />
      </SparkBuddiesLayout>
    </Layout>
  );
};

export default Buddies;
