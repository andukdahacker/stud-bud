import Link from "next/link";
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

  const countNotViewedBuddyNotifications =
    data?.getBuddyNotifications?.countNotViewedBuddyNotifications;
  if (loading) return <Loading />;
  return (
    <div className="">
      <div className="border-b border-black">Requests</div>
      <div>
        {buddyRequests?.length == 0 ? (
          <div className="border-b border-black">No recent requests </div>
        ) : (
          buddyRequests?.map((noti, index) => {
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
          })
        )}
      </div>

      <div className="border-b border-black">Recently accepted</div>
      <div className="w-full">
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

      <Link href={`/spark-buddies/buddies`}>
        <a>
          See all
          {countNotViewedBuddyNotifications &&
          countNotViewedBuddyNotifications > 0 ? (
            <div>({countNotViewedBuddyNotifications})</div>
          ) : null}
        </a>
      </Link>
    </div>
  );
};

export default BuddyNotificationBox;
