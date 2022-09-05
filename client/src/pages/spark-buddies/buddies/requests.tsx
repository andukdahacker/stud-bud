import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "../../../components/Layout";
import ProfileCard from "../../../components/ProfileCard";
import ProfileCardSkeleton from "../../../components/ProfileCardSkeleton";
import SearchBar from "../../../components/SearchBar";
import SkeletonLoading from "../../../components/SkeletonLoading";
import SparkBuddiesLayout from "../../../components/SparkBuddiesLayout";
import {
  useGetMyBuddiesRequestsLazyQuery,
  useGetUserQuery,
} from "../../../generated/graphql";
import {
  BUDDIES_REQUESTS_TAKE_LIMIT,
  BUDDIES_TAKE_LIMIT,
} from "../../../utils/constants";
import { SearchInput } from "../../../utils/types";

const BuddiesRequests = () => {
  const router = useRouter();
  const { data: GetUserData, loading: GetUserLoading } = useGetUserQuery();

  const user_profile_id = GetUserData?.getUser?.profile?.id;

  const [
    getMyBuddiesRequests,
    {
      data: GetMyBuddiesRequestsData,
      loading: GetMyBuddiesRequestsLoading,
      refetch: refetchMyBuddiesRequests,
    },
  ] = useGetMyBuddiesRequestsLazyQuery();

  const requests =
    GetMyBuddiesRequestsData?.getMyBuddiesRequests?.relationships;

  const onSubmitRefetchMyBuddiesRequests = ({ search_input }: SearchInput) => {
    if (user_profile_id) {
      router.push(
        `/spark-buddies/buddies/requests?search_input=${search_input}`
      );

      refetchMyBuddiesRequests({
        where: {
          profile_id: user_profile_id,
        },
        input: {
          take: BUDDIES_REQUESTS_TAKE_LIMIT,
          search_input: search_input,
        },
      });
    }
  };

  useEffect(() => {
    if (user_profile_id) {
      getMyBuddiesRequests({
        variables: {
          where: {
            profile_id: user_profile_id,
          },
          input: {
            take: BUDDIES_REQUESTS_TAKE_LIMIT,
            search_input: router.query
              ? (router.query.search_input as string)
              : "",
          },
        },
      });
    }
  }, []);

  if (GetUserLoading || GetMyBuddiesRequestsLoading)
    return (
      <Layout>
        <SparkBuddiesLayout>
          <SkeletonLoading
            take={BUDDIES_TAKE_LIMIT}
            skeleton={<ProfileCardSkeleton />}
            layout="ProfileCard"
          />
        </SparkBuddiesLayout>
      </Layout>
    );
  return (
    <Layout>
      <SparkBuddiesLayout>
        <SearchBar onSubmit={onSubmitRefetchMyBuddiesRequests} />

        <div className="grid w-full max-h-full grid-cols-3 bg-white gap-x-20 gap-y-10 p-7">
          {requests?.map((request, index) => {
            return (
              <ProfileCard
                profileData={request.requester}
                relationshipData={request}
                key={index}
              />
            );
          })}
        </div>
      </SparkBuddiesLayout>
    </Layout>
  );
};

export default BuddiesRequests;
