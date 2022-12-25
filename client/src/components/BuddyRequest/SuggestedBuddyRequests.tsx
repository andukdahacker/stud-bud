import { NetworkStatus } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useGetSuggestedBuddyRequestsLazyQuery } from "../../generated/graphql";
import { BUDDIES_REQUESTS_TAKE_LIMIT } from "../../utils/constants";
import Loading from "../Loading/Loading";
import LoadMoreTrigger from "../Loading/LoadMoreTrigger";
import BuddyRequestCard from "./BuddyRequestCard";

interface SuggestedBuddyRequestsProps {
  onboarding_purpose_name?: string[];
  onboarding_purpose_types?: string[];
  profile_purpose_name?: string[];
  profile_purpose_types?: string[];
  pagination?: boolean;
}

const SuggestedBuddyRequests = ({
  onboarding_purpose_name,
  onboarding_purpose_types,
  profile_purpose_name,
  profile_purpose_types,
  pagination,
}: SuggestedBuddyRequestsProps) => {
  const router = useRouter();
  const [
    getSuggestedBuddyRequests,
    {
      data: GetSuggestedBuddyRequestsData,
      loading: GetSuggestedBuddyRequestsLoading,
      fetchMore,
      networkStatus,
    },
  ] = useGetSuggestedBuddyRequestsLazyQuery();

  const cursor =
    GetSuggestedBuddyRequestsData?.getSuggestedBuddyRequests
      ?.BuddyRequestPageInfo?.endCursor;
  const hasNextPage =
    GetSuggestedBuddyRequestsData?.getSuggestedBuddyRequests
      ?.BuddyRequestPageInfo?.hasNextPage;
  const lastTake =
    GetSuggestedBuddyRequestsData?.getSuggestedBuddyRequests
      ?.BuddyRequestPageInfo?.lastTake;

  const loadMore = async () => {
    if (onboarding_purpose_name && onboarding_purpose_types) {
      fetchMore({
        variables: {
          where: {
            cursor,
            take: lastTake,
            purpose_name: onboarding_purpose_name,
            purpose_type_name: onboarding_purpose_types,
          },
        },
      });
    } else {
      if (profile_purpose_name && profile_purpose_types) {
        getSuggestedBuddyRequests({
          variables: {
            where: {
              cursor,

              purpose_name: profile_purpose_name,
              purpose_type_name: profile_purpose_types,
              take: lastTake!,
            },
          },
        });
      }
    }
  };

  const fetchMoreLoading = networkStatus == NetworkStatus.fetchMore;

  useEffect(() => {
    if (router.isReady && onboarding_purpose_name && onboarding_purpose_types) {
      getSuggestedBuddyRequests({
        variables: {
          where: {
            purpose_name: onboarding_purpose_name,
            purpose_type_name: onboarding_purpose_types,
            take: BUDDIES_REQUESTS_TAKE_LIMIT,
          },
        },
      });
    } else {
      if (profile_purpose_name && profile_purpose_types) {
        getSuggestedBuddyRequests({
          variables: {
            where: {
              purpose_name: profile_purpose_name,
              purpose_type_name: profile_purpose_types,
              take: BUDDIES_REQUESTS_TAKE_LIMIT,
            },
          },
        });
      }
    }
  }, [router.isReady, onboarding_purpose_name, onboarding_purpose_types]);

  const suggestedBuddyRequests =
    GetSuggestedBuddyRequestsData?.getSuggestedBuddyRequests?.buddy_requests;
  return (
    <>
      <div className="sm:grid-cols-2 sm:gap-3 sm:grid sm:p-2 md:grid-cols-3 xl:grid-cols-4 sm:justify-items-center">
        {GetSuggestedBuddyRequestsLoading ? (
          <Loading />
        ) : suggestedBuddyRequests && suggestedBuddyRequests.length > 0 ? (
          suggestedBuddyRequests.map((sugBuddyRequest, index) => {
            return <BuddyRequestCard data={sugBuddyRequest} key={index} />;
          })
        ) : (
          <div>No suggested buddy</div>
        )}
      </div>
      {pagination ? (
        <LoadMoreTrigger
          loadMore={loadMore}
          hasNextPage={hasNextPage}
          loading={fetchMoreLoading}
        />
      ) : null}
    </>
  );
};

export default SuggestedBuddyRequests;
