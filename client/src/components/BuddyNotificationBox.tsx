import { GetBuddyNotificationsQuery } from "../generated/graphql";
import BuddyNotification from "./BuddyNotification";
import Loading from "./Loading";

interface BuddyNotificationBoxProps {
  data?: GetBuddyNotificationsQuery;
  loading: boolean;
}

const BuddyNotificationBox = ({ data, loading }: BuddyNotificationBoxProps) => {
  const buddyRequests = data?.getBuddyNotifications?.buddyRequests;
  const buddyAccepts = data?.getBuddyNotifications?.buddyAccepts;

  if (loading) return <Loading />;
  return (
    <div>
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

export default BuddyNotificationBox;
