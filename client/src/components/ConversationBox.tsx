import { useRouter } from "next/router";
import Avatar from "./Avatar";

interface ConversationBoxProps {
  conversation_id: string;
  conversation_name?: string | null;
  conversation_avatar?: string | null;
  profile_avatar?: string | null;
  username?: string | null;
  conversation_latest_message?: string | null;
}

const ConversationBox = ({
  conversation_id,
  conversation_name,
  conversation_avatar,
  profile_avatar,
  username,
  conversation_latest_message,
}: ConversationBoxProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/chat/${conversation_id}`);
  };
  return (
    <div onClick={handleClick} className="flex cursor-pointer">
      <Avatar
        img_url={conversation_avatar ? conversation_avatar : profile_avatar}
        width={40}
        height={40}
      />
      <div>{conversation_name ? conversation_name : username}</div>
      <div>
        {conversation_latest_message ? (
          conversation_latest_message
        ) : (
          <div>"No messages yet"</div>
        )}
      </div>
    </div>
  );
};

export default ConversationBox;
