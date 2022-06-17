import { useApolloClient } from "@apollo/client";
import { useEffect, useState } from "react";
import {
  GetBuddyNotificationsSubsDocument,
  GetUserDocument,
  GetUserQuery,
  useGetBuddyNotificationsLazyQuery,
  useGetProfileLazyQuery,
  useViewBuddyNotificationsMutation,
} from "../generated/graphql";
import merge from "deepmerge";
import Loading from "./Loading";
import BuddyNotification from "./BuddyNotification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";

const BuddyNotificationBar = () => {
  const client = useApolloClient();
  const user_profile_id = client.readQuery<GetUserQuery>({
    query: GetUserDocument,
  })?.getUser?.profile?.id;

  const router = useRouter();

  const [view, {}] = useViewBuddyNotificationsMutation();

  const [hidden, setHidden] = useState<string | undefined>("hidden");
  const toggleNotification = async () => {
    if (hidden === "hidden") setHidden(undefined);
    if (hidden === undefined) setHidden("hidden");

    if (countNotViewedBuddyNotifications) {
      if (countNotViewedBuddyNotifications > 0) {
        await view({
          variables: {
            where: {
              profile_id: user_profile_id as string,
            },
          },
        });
      }
    }

    setNewNotiCount(0);
  };

  const [
    getBuddyNotifications,
    {
      data: getBuddyNotificationsData,
      loading: getBuddyNotificationsLoading,
      subscribeToMore,
    },
  ] = useGetBuddyNotificationsLazyQuery();
  const [getProfile, {}] = useGetProfileLazyQuery();

  const buddyRequests =
    getBuddyNotificationsData?.getBuddyNotifications?.buddyRequests;
  const buddyAccepts =
    getBuddyNotificationsData?.getBuddyNotifications?.buddyAccepts;
  const countNotViewedBuddyNotifications =
    getBuddyNotificationsData?.getBuddyNotifications
      ?.countNotViewedBuddyNotifications;
  const [newNotiCount, setNewNotiCount] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      await getBuddyNotifications({
        variables: {
          where: {
            profile_id: user_profile_id as string,
          },
        },
      });

      subscribeToMore({
        document: GetBuddyNotificationsSubsDocument,
        variables: {
          where: {
            profile_id: user_profile_id,
          },
        },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const merged = merge(prev, subscriptionData.data);
          const buddyAccepts_subs =
            subscriptionData.data.getBuddyNotifications?.buddyAccepts;
          const buddyRequests_subs =
            subscriptionData.data.getBuddyNotifications?.buddyRequests;
          if (buddyRequests_subs) {
            if (buddyRequests_subs.length > 0) {
              const requester_id = buddyRequests_subs[0].requester_id;
              getProfile({
                variables: {
                  where: {
                    profile_id: requester_id,
                  },
                },
              });
            }
          }

          if (buddyAccepts_subs) {
            if (buddyAccepts_subs.length > 0) {
              const requester_id = buddyAccepts_subs[0].requester_id;
              getProfile({
                variables: {
                  where: {
                    profile_id: requester_id,
                  },
                },
              });
            }
          }
          return merged;
        },
      });
    }
    if (user_profile_id) fetchData();
  }, []);

  useEffect(() => {
    if (countNotViewedBuddyNotifications)
      setNewNotiCount(countNotViewedBuddyNotifications);
  }, [countNotViewedBuddyNotifications]);

  if (getBuddyNotificationsLoading) return <Loading />;

  return (
    <div>
      <div
        className="relative flex items-center justify-center w-10 h-10 bg-gray-400 rounded-full cursor-pointer"
        onClick={
          router.pathname === "/notifications" ? () => {} : toggleNotification
        }
      >
        <FontAwesomeIcon
          icon="user-group"
          size="lg"
          className={
            router.pathname === "/notifications"
              ? " bg-blue-400"
              : "cursor-pointer "
          }
        />

        {newNotiCount > 0 ? (
          <div className="absolute bottom-0 right-0 flex items-center justify-center w-4 h-4 bg-red-900 rounded-full">
            <span className="text-xs text-white">{newNotiCount}</span>
          </div>
        ) : null}
      </div>
      <div className={`${hidden} overflow-auto fixed bg-white top-20 z-10`}>
        <div>Buddies requests</div>
        <div>
          {buddyRequests?.map((noti, index) => {
            return (
              <BuddyNotification
                key={index}
                profile_id={noti.requester_id}
                profile_avatar={noti.requester.profile_avatar}
                username={noti.requester.user!.username}
                status={noti.status}
                isRead={noti.isRead}
              />
            );
          })}
        </div>

        <div>Buddies accepts</div>
        <div>
          {buddyAccepts?.map((noti, index) => {
            return (
              <BuddyNotification
                key={index}
                profile_id={noti.requester_id}
                profile_avatar={noti.requester.profile_avatar}
                username={noti.requester.user!.username}
                status={noti.status}
                isRead={noti.isRead}
              />
            );
          })}
        </div>
        <div>Notification</div>
      </div>
    </div>
  );
};

export default BuddyNotificationBar;
