import { useApolloClient } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  GetNotificationsSubsDocument,
  GetUserDocument,
  GetUserQuery,
  useGetNotificationsLazyQuery,
} from "../generated/graphql";
import Avatar from "./Avatar";
import Loading from "./Loading";
import merge from "deepmerge";

const Notification = () => {
  const client = useApolloClient();
  const user_profile_id = client.readQuery<GetUserQuery>({
    query: GetUserDocument,
  })?.getUser?.profile?.id;
  const [
    getNotifications,
    {
      data: getNotificationsData,
      loading: getNotificationsLoading,
      subscribeToMore,
    },
  ] = useGetNotificationsLazyQuery();

  const buddyNotifications =
    getNotificationsData?.getNotification?.BuddyNotifications;
  const otherNotifications =
    getNotificationsData?.getNotification?.Notifications;

  const [hidden, setHidden] = useState<string | undefined>("hidden");
  const toggleNotification = () => {
    if (hidden === "hidden") setHidden(undefined);
    if (hidden === undefined) setHidden("hidden");
  };

  useEffect(() => {
    async function fetchData() {
      await getNotifications({
        variables: {
          where: {
            profile_id: user_profile_id!,
          },
        },
      });

      subscribeToMore({
        document: GetNotificationsSubsDocument,
        variables: {
          where: {
            profile_id: user_profile_id,
          },
        },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;

          const newBuddyNotification = subscriptionData.data;

          console.log("prev", prev);
          console.log(newBuddyNotification);

          const merged = merge(prev, newBuddyNotification);

          console.log("merged", merged);
          return merged;
        },
      });
    }

    if (user_profile_id) fetchData();
  }, [subscribeToMore, buddyNotifications]);

  return (
    <div>
      <FontAwesomeIcon
        icon="bell"
        size="1x"
        onClick={toggleNotification}
        className="cursor-pointer "
      />
      <div className={`${hidden} overflow-auto fixed bg-white top-20 z-10`}>
        <div>Buddy Requests</div>
        <div>
          {getNotificationsLoading ? (
            <Loading />
          ) : !buddyNotifications ? (
            <div>{getNotificationsData?.getNotification?.IOutput.message}</div>
          ) : buddyNotifications.length === 0 ? (
            <div>You don't have any buddy request</div>
          ) : (
            buddyNotifications.map((noti, index) => {
              return (
                <div key={index}>
                  <Avatar
                    img_url={noti.notifier.profile_avatar}
                    width={50}
                    height={50}
                  />
                  <Link href={`/profile/${noti.notifier_id}`}>
                    <a>
                      <b>{noti.notifier.user?.username}</b> sent a buddy request
                    </a>
                  </Link>
                  <button
                    className="h-10 px-3 py-1 ml-5 text-sm font-medium leading-6 text-white bg-blue-700 rounded shadow-sm shadow-blue-300"
                    type="button"
                  >
                    Accept
                  </button>
                  <button
                    className="h-10 px-3 py-1 ml-5 text-sm font-medium leading-6 text-black bg-gray-300 rounded shadow-sm shadow-blue-300"
                    type="button"
                  >
                    Decline
                  </button>
                </div>
              );
            })
          )}
        </div>
        <div>Notifications</div>
        <div>
          {getNotificationsLoading ? (
            <Loading />
          ) : !otherNotifications ? (
            <div>{getNotificationsData?.getNotification?.IOutput.message}</div>
          ) : otherNotifications.length === 0 ? (
            <div></div>
          ) : (
            otherNotifications.map((noti, index) => {
              return (
                <div key={index} className="flex">
                  <Avatar
                    img_url={noti.notifier.profile_avatar}
                    width={50}
                    height={50}
                  />
                  <div>
                    {noti.notifier.user?.username} {noti.message}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;
