import { NetworkStatus } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import BuddyCard from "../../../components/BuddyCard";
import Layout from "../../../components/Layout";
import Loading from "../../../components/Loading";
import LoadMoreTrigger from "../../../components/LoadMoreTrigger";
import ProfileCard from "../../../components/ProfileCard";
import SearchBar from "../../../components/SearchBar";
import {
  useGetMyBuddiesLazyQuery,
  useGetUserQuery,
} from "../../../generated/graphql";
import { BUDDIES_TAKE_LIMIT } from "../../../utils/constants";

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
            search_input: router.query
              ? (router.query.search_input as string)
              : "",
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
      <div className="flex items-center justify-around py-5 border-b border-black">
        <Link href={`/spark-buddies/find`}>
          <a
            className={`${
              router.route == "/spark-buddies/find"
                ? "text-white bg-black py-1 px-2"
                : null
            } font-bold `}
          >
            Find Buddy
          </a>
        </Link>
        <Link href={`/spark-buddies/buddies`}>
          <a
            className={`${
              router.route == "/spark-buddies/buddies"
                ? "text-white bg-black py-1 px-2"
                : null
            } font-bold `}
          >
            My Buddies
          </a>
        </Link>
      </div>
      <SearchBar
        findOption={"relationships"}
        refetchMyBuddies={refetchMyBuddies}
      />

      {GetMyBuddiesLoading || refetchMyBuddiesLoading ? (
        <Loading />
      ) : (
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
