import { Dispatch, SetStateAction, useEffect } from "react";
import {
  GetBuddyNotificationsSubsDocument,
  useGetBuddyNotificationsLazyQuery,
  useGetProfileLazyQuery,
} from "../generated/graphql";
import merge from "deepmerge";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NewNotiCount from "./NewNotiCount";
import BuddyNotificationBox from "./BuddyNotificationBox";
import BuddyNotificationBar from "./BuddyNotificationBar";

interface BuddyNotiNavBarProps {
  user_profile_id: string | undefined;
  newBuddyNotiCount: number;
  setNewBuddyNotiCount: Dispatch<SetStateAction<number>>;
  toggle: (
    countNotViewedBuddyNotifications: number | null | undefined
  ) => Promise<void>;
  hidden: string | undefined;
}
const BuddyNotiNavBarButton = ({
  user_profile_id,
  newBuddyNotiCount,
  setNewBuddyNotiCount,
  toggle,
  hidden,
}: BuddyNotiNavBarProps) => {
  const router = useRouter();
  const [
    getBuddyNotifications,
    {
      data: getBuddyNotificationsData,
      loading: getBuddyNotificationsLoading,
      refetch: refetchBuddyNoti,
      subscribeToMore: subsGetBuddyNotifications,
    },
  ] = useGetBuddyNotificationsLazyQuery();

  const [_, { refetch: refetchGetProfile }] = useGetProfileLazyQuery();
  const countNotViewedBuddyNotifications =
    getBuddyNotificationsData?.getBuddyNotifications
      ?.countNotViewedBuddyNotifications;
  useEffect(() => {
    async function fetchData() {
      await getBuddyNotifications({
        variables: {
          where: {
            profile_id: user_profile_id as string,
          },
        },
      });

      subsGetBuddyNotifications({
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
          if (buddyRequests_subs && buddyRequests_subs.length > 0) {
            const requester_id = buddyRequests_subs[0].requester_id;
            refetchGetProfile({
              where: {
                profile_id: requester_id,
              },
            });
          }

          if (buddyAccepts_subs && buddyAccepts_subs.length > 0) {
            const requester_id = buddyAccepts_subs[0].requester_id;
            refetchGetProfile({
              where: {
                profile_id: requester_id,
              },
            });
          }
          return merged;
        },
      });
    }

    if (user_profile_id) fetchData();
  }, [user_profile_id]);

  useEffect(() => {
    if (countNotViewedBuddyNotifications)
      setNewBuddyNotiCount(countNotViewedBuddyNotifications);
  }, [countNotViewedBuddyNotifications]);

  return (
    <div>
      <div
        className="relative flex items-center justify-center w-10 h-10 bg-gray-400 rounded-full cursor-pointer"
        onClick={
          router.pathname === "/buddies"
            ? () => {}
            : () => toggle(countNotViewedBuddyNotifications)
        }
      >
        <FontAwesomeIcon
          icon="user-group"
          size="lg"
          className={
            router.pathname === "/buddies" ? " bg-blue-400" : "cursor-pointer "
          }
        />
        <NewNotiCount count={newBuddyNotiCount} />
      </div>

      <BuddyNotificationBar hidden={hidden}>
        <BuddyNotificationBox
          data={getBuddyNotificationsData}
          loading={getBuddyNotificationsLoading}
        />
      </BuddyNotificationBar>
    </div>
  );
};

export default BuddyNotiNavBarButton;
