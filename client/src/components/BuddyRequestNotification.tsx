import { useApolloClient } from "@apollo/client";
import Link from "next/link";
import {
  GetUserDocument,
  GetUserQuery,
  RelationshipStatusCode,
  useGetProfileLazyQuery,
  useRespondBuddyMutation,
} from "../generated/graphql";
import {
  BuddyNotificationProps,
  BuddyRespondOptions,
} from "../utils/constants";
import Avatar from "./Avatar";

const BuddyRequestNotification = ({
  profile_id,
  profile_avatar,
  username,
}: BuddyNotificationProps) => {
  const [
    respondBuddy,
    { data: respondBuddyData, loading: respondBuddyLoading },
  ] = useRespondBuddyMutation();

  const respondSuccess = respondBuddyData?.respondBuddy?.IOutput.success;
  const respondMessage = respondBuddyData?.respondBuddy?.IOutput.message;

  const client = useApolloClient();
  const user_profile_id = client.readQuery<GetUserQuery>({
    query: GetUserDocument,
  })?.getUser?.profile?.id;

  const [getProfile, {}] = useGetProfileLazyQuery();

  const respond = async (option: BuddyRespondOptions) => {
    if (option === BuddyRespondOptions.ACCEPT) {
      await respondBuddy({
        variables: {
          input: {
            requester_id: profile_id,
            addressee_id: user_profile_id as string,
            status: RelationshipStatusCode.Accepted,
            specifier_id: user_profile_id as string,
          },
        },
      });

      await getProfile({
        variables: {
          where: {
            profile_id,
          },
        },
      });
    } else if (option === BuddyRespondOptions.DECLINE) {
      await respondBuddy({
        variables: {
          input: {
            requester_id: profile_id,
            addressee_id: user_profile_id as string,
            status: RelationshipStatusCode.Declined,
            specifier_id: user_profile_id as string,
          },
        },
      });

      await getProfile({
        variables: {
          where: {
            profile_id,
          },
        },
      });
    }
  };

  return (
    <Link href={`/profile/${profile_id}`}>
      <a>
        <Avatar img_url={profile_avatar} width={40} height={40} />
        <div>{username} sent you a buddy request!</div>
        {respondSuccess ? (
          <div>{respondMessage}</div>
        ) : (
          <div>
            <button
              className="h-10 px-3 py-1 ml-5 text-sm font-medium leading-6 text-white bg-blue-700 rounded shadow-sm shadow-blue-300"
              type="button"
              disabled={respondBuddyLoading ? true : false}
              onClick={() => respond(BuddyRespondOptions.ACCEPT)}
            >
              Accept
            </button>
            <button
              className="h-10 px-3 py-1 ml-5 text-sm font-medium leading-6 text-black bg-gray-300 rounded shadow-sm shadow-blue-300"
              type="button"
              disabled={respondBuddyLoading ? true : false}
              onClick={() => respond(BuddyRespondOptions.DECLINE)}
            >
              Decline
            </button>
          </div>
        )}
      </a>
    </Link>
  );
};

export default BuddyRequestNotification;
