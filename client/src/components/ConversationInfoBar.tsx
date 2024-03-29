import { GetConversationQuery } from "../generated/graphql";
import Avatar from "./Avatar";
import Loading from "./Loading";

interface ConversationInfoBarProps {
  data?: GetConversationQuery;
  user_profile_id: string | undefined;
  loading: boolean;
}

const ConversationInfoBar = ({
  data,
  loading,
  user_profile_id,
}: ConversationInfoBarProps) => {
  const conversation_avatar =
    data?.getConversation?.Conversation?.conversation_avatar;
  const conversation_name =
    data?.getConversation?.Conversation?.conversation_name;
  const buddy_profile =
    data?.getConversation?.Conversation?.conversation_member.filter(
      (member) => member.id !== user_profile_id
    );
  const profile_avatar = buddy_profile ? buddy_profile[0].profile_avatar : null;
  const username = buddy_profile && buddy_profile[0].user?.username;

  if (loading) return <Loading />;
  return (
    <div className="flex flex-col items-center justify-start w-1/4 h-full p-5">
      <Avatar
        img_url={conversation_avatar ? conversation_avatar : profile_avatar}
      />

      <div>{conversation_name ? conversation_name : username}</div>
    </div>
  );
};

export default ConversationInfoBar;
