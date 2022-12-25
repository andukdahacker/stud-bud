import { useApolloClient } from "@apollo/client";
import Link from "next/link";
import {
  GetUserDocument,
  GetUserQuery,
  RelationshipStatusCode,
  useReadBuddyNotificationsMutation,
  useRespondBuddyMutation,
} from "../../generated/graphql";
import { BuddyNotificationProps, BuddyRespondOptions } from "../../utils/types";
import Avatar from "../Profile/Avatar";
import UnreadNotiMark from "./UnReadNotiMark";

const BuddyNotification = ({
  profile_id,
  profile_avatar,
  username,
  status,
  isRead,
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

  const [read, {}] = useReadBuddyNotificationsMutation();

  const readBuddyNoti = async () => {
    if (!isRead)
      await read({
        variables: {
          where: {
            requester_id: profile_id,
            addressee_id: user_profile_id as string,
          },
        },
      });
  };

  const respond = async (option: BuddyRespondOptions) => {
    if (option === BuddyRespondOptions.ACCEPT) {
      await respondBuddy({
        variables: {
          input: {
            requester_id: profile_id,
            addressee_id: user_profile_id as string,
            status: RelationshipStatusCode.Accepted,
          },
        },
      });

      //update relationship cache (fix)
    } else if (option === BuddyRespondOptions.DECLINE) {
      await respondBuddy({
        variables: {
          input: {
            requester_id: profile_id,
            addressee_id: user_profile_id as string,
            status: RelationshipStatusCode.Declined,
          },
        },
      });
    }

    //update relationship cache (fix)
  };

  if (status === RelationshipStatusCode.Accepted)
    return (
      <div className="flex items-center justify-center p-2 border-b border-black">
        <Link href={`/profile/${profile_id}`}>
          <a
            className={`flex w-full justify-start items-center`}
            onClick={readBuddyNoti}
          >
            <Avatar img_url={profile_avatar} />

            <div className="ml-2">
              You and <b>{username}</b> have become buddies!
            </div>

            {isRead ? null : (
              <div className="w-2 h-2 bg-blue-700 rounded-full"></div>
            )}
          </a>
        </Link>
      </div>
    );

  return (
    <div className="flex items-center justify-start p-2 border-b border-black">
      <Link href={`/profile/${profile_id}`}>
        <a onClick={readBuddyNoti}>
          <Avatar img_url={profile_avatar} />
        </a>
      </Link>
      <div className="ml-2">
        <b>{username}</b> sent you a buddy request!
        {respondSuccess ? (
          <div>{respondMessage}</div>
        ) : (
          <div>
            <button
              className="h-10 px-3 py-1 ml-5 text-sm font-medium leading-6 text-white rounded shadow-sm bg-blue shadow-blue-300"
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
      </div>

      <UnreadNotiMark isRead={isRead} />
    </div>
  );
};

export default BuddyNotification;
