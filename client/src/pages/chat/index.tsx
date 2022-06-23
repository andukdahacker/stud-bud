import { useApolloClient } from "@apollo/client";
import { useEffect } from "react";
import ChatBox from "../../components/ChatBox";
import ConversationList from "../../components/ConversationList";
import ConversationListBar from "../../components/ConversationListBar";
import Layout from "../../components/Layout";
import {
  GetUserDocument,
  GetUserQuery,
  useGetManyConversationsLazyQuery,
} from "../../generated/graphql";

const Chat = () => {
  const client = useApolloClient();
  const user_profile_id = client.readQuery<GetUserQuery>({
    query: GetUserDocument,
  })?.getUser?.profile?.id;

  const [
    getManyConversations,
    { data: ManyConversationsData, loading: ManyConversationsLoading },
  ] = useGetManyConversationsLazyQuery();

  useEffect(() => {
    async function fetchData() {
      await getManyConversations({
        variables: {
          where: {
            profile_id: user_profile_id as string,
          },
        },
      });
    }

    if (user_profile_id) fetchData();
  }, [user_profile_id]);

  console.log("here", user_profile_id);

  return (
    <Layout>
      <ConversationListBar>
        <ConversationList
          data={ManyConversationsData}
          loading={ManyConversationsLoading}
        />
      </ConversationListBar>
    </Layout>
  );
};

export default Chat;
