import { useApolloClient } from "@apollo/client";
import {
  GetManyConversationsQuery,
  GetUserDocument,
  GetUserQuery,
} from "../generated/graphql";
import ConversationBox from "./ConversationBox";
import Loading from "./Loading";

interface ConversationListProps {
  data?: GetManyConversationsQuery;
  user_profile_id: string | undefined;
  loading: boolean;
}

const ConversationList = ({
  data,
  loading,
  user_profile_id,
}: ConversationListProps) => {
  const conversations = data?.getManyConversations?.Conversations;
  const sorted = conversations?.slice(0).sort((a, b) => {
    const dateA = a.conversation.conversation_latest_message?.createdAt;
    const dateB = b.conversation.conversation_latest_message?.createdAt;

    return dateB - dateA;
  });

  if (loading) return <Loading />;

  return (
    <div>
      {sorted?.map((conversation, index) => {
        const buddy_profile =
          conversation.conversation.conversation_member.filter(
            (conversation) => conversation.id !== user_profile_id
          );

        const profile_avatar =
          buddy_profile.length === 1 ? buddy_profile[0].profile_avatar : null;

        const username =
          buddy_profile.length === 1 ? buddy_profile[0].user?.username : null;
        const conversation_id = conversation.conversation.id;
        const conversation_name = conversation.conversation.conversation_name;
        const conversation_avatar =
          conversation.conversation.conversation_avatar;
        const conversation_latest_message =
          conversation.conversation.conversation_latest_message
            ?.message_content;
        return (
          <ConversationBox
            key={index}
            conversation_id={conversation_id}
            conversation_name={conversation_name}
            conversation_avatar={conversation_avatar}
            profile_avatar={profile_avatar}
            username={username}
            conversation_latest_message={conversation_latest_message}
          />
        );
      })}
    </div>
  );
};

export default ConversationList;
