import { GetManyConversationsQuery } from "../../generated/graphql";
import ConversationBox from "./ConversationBox";
import Loading from "../Loading/Loading";

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
    <div className="">
      {sorted?.map((conversation, index) => {
        return (
          <ConversationBox
            key={index}
            data={conversation}
            user_profile_id={user_profile_id}
          />
        );
      })}
    </div>
  );
};

export default ConversationList;
