import { useApolloClient } from "@apollo/client";
import Link from "next/link";
import { useEffect } from "react";
import {
  GetUserDocument,
  GetUserQuery,
  useGetMyBuddiesRequestsLazyQuery,
  useGetUserQuery,
} from "../../generated/graphql";
import { BUDDIES_REQUESTS_TAKE_LIMIT } from "../../utils/constants";
import Loading from "../Loading/Loading";
import BuddyButton from "../Profile/BuddyButton";

const MyRelationshipRequests = () => {
  const { data: GetUserData, loading: GetUserLoading } = useGetUserQuery();
  const user_profile_id = GetUserData?.getUser?.profile?.id;
  const [
    getMyBuddiesRequests,
    {
      data: GetMyRelationshipRequestsData,
      loading: GetMyRelationshipRequestsLoading,
    },
  ] = useGetMyBuddiesRequestsLazyQuery();

  const GetMyRelationshipRequestsSuccess =
    GetMyRelationshipRequestsData?.getMyBuddiesRequests?.IOutput.success;
  const GetMyRelationshipRequestsMessage =
    GetMyRelationshipRequestsData?.getMyBuddiesRequests?.IOutput.message;

  const relationshipRequests =
    GetMyRelationshipRequestsData?.getMyBuddiesRequests?.relationships;

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
    <>
      <div>
        <div>My buddy requests</div>
        <Link href={"/spark-buddies/add-buddy-requests"}>
          <a>See all</a>
        </Link>
        {relationshipRequests?.map((relationshipRequest, index) => {
          const requester = relationshipRequest.requester;
          return (
            <div key={index}>
              <div>{relationshipRequest.requester.user?.username}</div>
              <BuddyButton profile_id={requester.id} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MyRelationshipRequests;
