import Image from "next/image";
import defaultAvatar from "../assets/default-avatar.jpg";

interface ConversationBoxProps {
  conversation_name?: string;
  conversation_avatar?: string;
  profile_avatar?: string;
  username?: string;
  conversation_latest_message?: string;
}

const ConversationBox = ({
  conversation_name,
  conversation_avatar,
  profile_avatar,
  username,
  conversation_latest_message,
}: ConversationBoxProps) => {
  return (
    <div>
      <Image
        src={
          conversation_avatar
            ? conversation_avatar
            : profile_avatar
            ? profile_avatar
            : defaultAvatar
        }
      />
      <div>{conversation_name ? conversation_name : username}</div>
      <div>{conversation_latest_message}</div>
    </div>
  );
};

export default ConversationBox;
