import { useRouter } from "next/router";
import { ConversationGroupFragment } from "../generated/graphql";
import Avatar from "./Avatar";

interface ConversationBoxProps {
  data: ConversationGroupFragment | undefined;
  user_profile_id: string | undefined;
}

const ConversationBox = ({ data, user_profile_id }: ConversationBoxProps) => {
  const router = useRouter();

  const buddy_profile = data?.conversation.conversation_member.filter(
    (conversation) => conversation.id !== user_profile_id
  );

  const profile_avatar =
    buddy_profile?.length === 1 ? buddy_profile[0].profile_avatar : null;

  const username =
    buddy_profile?.length === 1 ? buddy_profile[0].user?.username : null;
  const conversation_id = data?.conversation.id;
  const conversation_name = data?.conversation.conversation_name;
  const conversation_avatar = data?.conversation.conversation_avatar;
  const conversation_latest_message =
    data?.conversation.conversation_latest_message;
  const conversation_latest_message_content =
    conversation_latest_message?.message_content;
  const conversation_latest_message_author_username =
    conversation_latest_message?.author.user?.username;
  const conversation_latest_message_author_id =
    conversation_latest_message?.author.id;

  const handleClick = () => {
    router.push(`/chat/${conversation_id}`);
  };
  return (
    <div
      onClick={handleClick}
      className={` ${
        router.query.conversationId == conversation_id ? "bg-gray-200" : null
      } flex items-center justify-start p-2 border-b border-black cursor-pointer hover:bg-gray-200`}
    >
      <Avatar
        img_url={conversation_avatar ? conversation_avatar : profile_avatar}
      />
      <div className="flex flex-col ml-2">
        <div>{conversation_name ? conversation_name : username}</div>
        {conversation_latest_message ? (
          <div className="flex font-light">
            <div>
              {conversation_latest_message_author_id === user_profile_id ? (
                <div>You:</div>
              ) : (
                <div>{conversation_latest_message_author_username}:</div>
              )}
            </div>
            <div className="ml-1">{conversation_latest_message_content}</div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ConversationBox;
