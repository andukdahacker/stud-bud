import { GetManyConversationsQuery } from "../generated/graphql";
import ConversationBox from "./ConversationBox";
import Loading from "./Loading";

interface ConversationListProps {
  data: GetManyConversationsQuery;
  loading: boolean;
}

const ConversationList = ({ data, loading }: ConversationListProps) => {
  const conversations = data.getManyConversations?.Conversations;

  if (loading) return <Loading />;
  return (
    <div>
      {conversations?.map((conversation, index) => {
        return <ConversationBox key={index} />;
      })}
    </div>
  );
};

export default ConversationList;
