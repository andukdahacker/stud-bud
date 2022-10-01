import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import merge from "deepmerge";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect } from "react";
import {
  GetBuddyNotificationsSubsDocument,
  useGetBuddyNotificationsLazyQuery,
} from "../generated/graphql";
import BuddyNotificationBox from "./BuddyNotificationBox";
import NewNotiCount from "./NewNotiCount";
import NotificationBar from "./NotificationBar";

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
      refetch,
      subscribeToMore: subsGetBuddyNotifications,
    },
  ] = useGetBuddyNotificationsLazyQuery();

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

          //update relationship cache(fix)

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
    <div className="relative ">
      <div
        className={`${
          router.route == "/spark-buddies/buddies"
            ? "bg-black"
            : "cursor-pointer"
        } relative flex items-center justify-center w-10 h-10 rounded-full `}
        onClick={
          router.pathname === "/spark-buddies/buddies"
            ? () => {}
            : async () => {
                await toggle(countNotViewedBuddyNotifications);
                await refetch({
                  where: {
                    profile_id: user_profile_id as string,
                  },
                });
              }
        }
      >
        <FontAwesomeIcon
          icon="user-group"
          size="lg"
          color={`${
            router.route == "/spark-buddies/buddies" ? "white" : "black"
          }`}
        />
        <NewNotiCount count={newBuddyNotiCount} />
      </div>

      <NotificationBar hidden={hidden}>
        <BuddyNotificationBox
          data={getBuddyNotificationsData}
          loading={getBuddyNotificationsLoading}
        />
      </NotificationBar>
    </div>
  );
};

export default BuddyNotiNavBarButton;
