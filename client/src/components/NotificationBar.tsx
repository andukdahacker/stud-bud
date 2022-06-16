import { useApolloClient } from "@apollo/client";
import { useEffect } from "react";
import {
  GetBuddyNotificationsSubsDocument,
  GetUserDocument,
  GetUserQuery,
  useGetBuddyNotificationsLazyQuery,
  useGetProfileLazyQuery,
} from "../generated/graphql";
import merge from "deepmerge";
import Loading from "./Loading";
import BuddyRequestNotification from "./BuddyRequestNotification";
import BuddyAcceptNotification from "./BuddyAcceptNotification";

const NotificationBar = () => {
  const client = useApolloClient();
  const user_profile_id = client.readQuery<GetUserQuery>({
    query: GetUserDocument,
  })?.getUser?.profile?.id;

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

  if (getBuddyNotificationsLoading) return <Loading />;
  return (
    <div>
      <div>Buddies requests</div>
      <div>
        {buddyRequests?.map((noti, index) => {
          return (
            <BuddyRequestNotification
              key={index}
              profile_id={noti.requester_id}
              profile_avatar={noti.requester.profile_avatar}
              username={noti.requester.user!.username}
            />
          );
        })}
      </div>

      <div>Buddies accepts</div>
      {buddyAccepts?.map((noti, index) => {
        return (
          <BuddyAcceptNotification
            key={index}
            profile_id={noti.requester_id}
            profile_avatar={noti.requester.profile_avatar}
            username={noti.requester.user!.username}
          />
        );
      })}
      <div>Notifications</div>
    </div>
  );
};

export default NotificationBar;
