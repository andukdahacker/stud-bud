import Link from "next/link";
import { BuddyNotificationProps } from "../utils/constants";
import Avatar from "./Avatar";

const BuddyAcceptNotification = ({
  profile_id,
  profile_avatar,
  username,
}: BuddyNotificationProps) => {
  return (
    <Link href={`/profile/${profile_id}`}>
      <a>
        <Avatar img_url={profile_avatar} width={40} height={40} />
        <div>You and {username} have become buddies!</div>
      </a>
    </Link>
  );
};

export default BuddyAcceptNotification;
