import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useGetNotificationsLazyQuery } from "../generated/graphql";
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
    { data: getNotificationsData, loading: getNotificationsLoading },
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
              : () => toggle(countNotViewedNotifications)
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
