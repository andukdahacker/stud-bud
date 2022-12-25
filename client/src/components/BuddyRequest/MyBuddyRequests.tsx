import Link from "next/link";
import { useEffect } from "react";
import {
  useGetMyBuddyRequestsLazyQuery,
  useGetUserQuery,
} from "../../generated/graphql";
import { BUDDIES_REQUESTS_TAKE_LIMIT } from "../../utils/constants";
import Loading from "../Loading/Loading";
import BuddyRequestCard from "./BuddyRequestCard";

const MyBuddyRequests = () => {
  const { data: GetUserData, loading: GetUserLoading } = useGetUserQuery();
  const user_profile_id = GetUserData?.getUser?.profile?.id;
  const [
    getMyBuddyRequests,
    { data: GetMyBuddyRequestsData, loading: GetMyBuddyRequestsLoading },
  ] = useGetMyBuddyRequestsLazyQuery();

  const buddyRequests =
    GetMyBuddyRequestsData?.getMyBuddyRequests?.buddy_requests;

  useEffect(() => {
    if (user_profile_id)
      getMyBuddyRequests({
        variables: {
          input: {
            search_query: "",
            take: BUDDIES_REQUESTS_TAKE_LIMIT,
          },
        },
      });
  }, [user_profile_id]);

  if (GetUserLoading) return <Loading />;
  return (
    <>
      <div>
        <div>All posted buddy requests</div>
        <Link href={`/spark-buddies/buddy-request`}>
          <a>See all</a>
        </Link>
        {GetMyBuddyRequestsLoading ? (
          <Loading />
        ) : (
          buddyRequests?.map((buddyRequest, index) => {
            return (
              <div key={index}>
                <BuddyRequestCard data={buddyRequest} />
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default MyBuddyRequests;
