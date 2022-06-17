import { GetBuddyNotificationsQuery } from "../generated/graphql";
import BuddyNotification from "./BuddyNotification";
import Loading from "./Loading";

interface BuddyNotificationBarProps {
  data?: GetBuddyNotificationsQuery;
  loading: boolean;
  hidden: string | undefined;
}

const BuddyNotificationBar = ({
  data,
  loading,
  hidden,
}: BuddyNotificationBarProps) => {
  const buddyRequests = data?.getBuddyNotifications?.buddyRequests;
  const buddyAccepts = data?.getBuddyNotifications?.buddyAccepts;

  if (loading) return <Loading />;
  return (
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
    </div>
  );
};

export default BuddyNotificationBar;
