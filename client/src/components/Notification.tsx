import Link from "next/link";
import { NotificationFragment } from "../generated/graphql";
import { NotificationType } from "../utils/constants";
import Avatar from "./Avatar";
import UnreadNotiMark from "./UnReadNotiMark";

interface NotificationProps {
  data: NotificationFragment | null;
}
const Notification = ({ data }: NotificationProps) => {
  const type = data?.type_id;
  const notifier = data?.notifier;
  const notifier_id = data?.notifier_id;
  const notifier_username = notifier?.user?.username;
  const entity_id = data?.entity_id;
  const isRead = data?.isRead;

  if (!type) return null;

  if (type === NotificationType.TUTOR_ORDER_REQUEST_TO_BE_TUTOR)
    return (
      <Link href={`/one-hour-tutor/${entity_id}`}>
        <a>
          <Avatar img_url={notifier?.profile_avatar} width={40} height={40} />
          <div>
            <b>{notifier_username}</b> sent you a tutor order connect request
          </div>
          <UnreadNotiMark isRead={isRead} />
        </a>
      </Link>
    );

  if (type === NotificationType.TUTOR_ORDER_ACCEPT_TUTOR_REQUEST)
    return (
      <Link href={`/one-hour-tutor/${entity_id}`}>
        <a>
          <div>
            <Avatar img_url={notifier?.profile_avatar} width={40} height={40} />
            <b>{notifier_username}</b> has accepted your tutor order connect
            request!
          </div>
        </a>
      </Link>
    );
  if (type === NotificationType.TUTOR_ORDER_DECLINE_TUTOR_REQUEST)
    return (
      <Link href={`/one-hour-tutor/${entity_id}`}>
        <a>
          <div>
            <Avatar img_url={notifier?.profile_avatar} width={40} height={40} />
            <b>{notifier_username}</b> has declined your tutor order connect
            request!
          </div>
        </a>
      </Link>
    );

  if (type === NotificationType.TUTOR_ORDER_COMPLETE_TUTOR_ORDER)
    return (
      <Link href={`/one-hour-tutor/${entity_id}`}>
        <a>
          <div>
            <Avatar img_url={notifier?.profile_avatar} width={40} height={40} />
            <b>{notifier_username}</b> has marked their tutor order as
            completed!
          </div>
        </a>
      </Link>
    );
  return null;
};

export default Notification;
