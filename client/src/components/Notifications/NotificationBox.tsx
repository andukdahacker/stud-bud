import { GetNotificationsQuery } from "../../generated/graphql";
import Loading from "../Loading/Loading";
import Notification from "./Notification";

interface NotificationBoxProps {
  data: GetNotificationsQuery | undefined;
  loading: boolean;
}
const NotificationBox = ({ data, loading }: NotificationBoxProps) => {
  const notifications = data?.getNotifications?.notifications;

  const success = data?.getNotifications?.IOutput.success;
  const message = data?.getNotifications?.IOutput.message;

  if (loading) return <Loading />;
  if (!success) return <div>{message}</div>;
  if (notifications && notifications.length === 0)
    return <div>You don't have any notification</div>;
  return (
    <div>
      {notifications?.map((noti, index) => {
        return <Notification key={index} data={noti} />;
      })}
    </div>
  );
};

export default NotificationBox;
