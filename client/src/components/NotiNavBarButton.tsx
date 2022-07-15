import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import produce from "immer";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect } from "react";
import {
  GetNotificationsSubDocument,
  useGetNotificationsLazyQuery,
} from "../generated/graphql";
import NewNotiCount from "./NewNotiCount";
import NotificationBar from "./NotificationBar";
import NotificationBox from "./NotificationBox";

interface NotiNavBarButtonProps {
  user_profile_id: string | undefined;
  newNotiCount: number;
  setNewNotiCount: Dispatch<SetStateAction<number>>;
  toggle: (
    countNotViewedNotifications: number | null | undefined
  ) => Promise<void>;
  hidden: string | undefined;
}

const NotiNavBarButton = ({
  user_profile_id,
  newNotiCount,
  setNewNotiCount,
  toggle,
  hidden,
}: NotiNavBarButtonProps) => {
  const router = useRouter();
  const [
    getNotifications,
    {
      data: getNotificationsData,
      loading: getNotificationsLoading,
      refetch,
      subscribeToMore,
    },
  ] = useGetNotificationsLazyQuery();

  useEffect(() => {
    async function fetchData() {
      await getNotifications({
        variables: {
          where: {
            profile_id: user_profile_id as string,
          },
        },
      });

      subscribeToMore({
        document: GetNotificationsSubDocument,
        variables: {
          where: {
            profile_id: user_profile_id as string,
          },
        },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data.getNotifications?.IOutput.success)
            return prev;

          const newData = subscriptionData.data.getNotifications;
          const merged = produce(prev, (draft) => {
            if (
              draft.getNotifications?.notifications &&
              newData.notifications
            ) {
              draft.getNotifications.notifications = [
                ...draft.getNotifications.notifications,
                ...newData.notifications,
              ];

              draft.getNotifications.countNotViewedNotifications =
                newData.countNotViewedNotifications;
            }
          });

          return merged;
        },
      });
    }

    if (user_profile_id) fetchData();
  }, [user_profile_id]);
  const countNotViewedNotifications =
    getNotificationsData?.getNotifications?.countNotViewedNotifications;

  useEffect(() => {
    if (countNotViewedNotifications)
      setNewNotiCount(countNotViewedNotifications);
  }, [countNotViewedNotifications]);
  return (
    <div>
      <div>
        <div
          className="relative flex items-center justify-center w-10 h-10 bg-gray-400 rounded-full cursor-pointer"
          onClick={
            router.pathname === "/buddies"
              ? () => {}
              : async () => {
                  await toggle(countNotViewedNotifications);
                  await refetch({
                    where: {
                      profile_id: user_profile_id as string,
                    },
                  });
                }
          }
        >
          <FontAwesomeIcon
            icon="bell"
            size="lg"
            className={
              router.pathname === "/buddies"
                ? " bg-blue-400"
                : "cursor-pointer "
            }
          />
          <NewNotiCount count={newNotiCount} />
        </div>

        <NotificationBar hidden={hidden}>
          <NotificationBox
            data={getNotificationsData}
            loading={getNotificationsLoading}
          />
        </NotificationBar>
      </div>
    </div>
  );
};

export default NotiNavBarButton;
