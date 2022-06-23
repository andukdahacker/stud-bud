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
  loading: boolean;
}

const ConversationList = ({ data, loading }: ConversationListProps) => {
  const conversations = data?.getManyConversations?.Conversations;

  const client = useApolloClient();
  const user_profile_id = client.readQuery<GetUserQuery>({
    query: GetUserDocument,
  })?.getUser?.profile?.id;

  if (loading) return <Loading />;

  console.log(conversations);
  return (
    <div>
      {conversations?.map((conversation, index) => {
        const buddy_profile =
          conversation.conversation.conversation_member.filter(
            (conversation) => conversation.id !== user_profile_id
          );

        const profile_avatar =
          buddy_profile.length === 1 ? buddy_profile[0].profile_avatar : null;

        const username =
          buddy_profile.length === 1 ? buddy_profile[0].user?.username : null;
        return (
          <ConversationBox
            key={index}
            conversation_id={conversation.conversation_id}
            conversation_name={conversation.conversation.conversation_name}
            conversation_avatar={conversation.conversation.conversation_avatar}
            profile_avatar={profile_avatar}
            username={username}
            conversation_latest_message={
              conversation.conversation.conversation_latest_message
                ?.message_content
            }
          />
        );
      })}
    </div>
  );
};

export default ConversationList;
