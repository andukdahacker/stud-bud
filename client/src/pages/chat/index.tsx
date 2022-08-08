import { useApolloClient } from "@apollo/client";
import { useEffect } from "react";
import ChatBox from "../../components/ChatBox";
import ConversationList from "../../components/ConversationList";
import ConversationListBar from "../../components/ConversationListBar";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";
import {
  GetUserDocument,
  GetUserQuery,
  useGetManyConversationsLazyQuery,
  useGetUserQuery,
} from "../../generated/graphql";

const Chat = () => {
  const { data: userData, loading: userLoading } = useGetUserQuery();
  const user_profile_id = userData?.getUser?.profile?.id;

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
  }, [user_profile_id, getManyConversations]);

  if (userLoading) return <Loading />;

  return (
    <Layout>
      <ConversationListBar>
        <ConversationList
          data={ManyConversationsData}
          loading={ManyConversationsLoading}
          user_profile_id={user_profile_id}
        />
      </ConversationListBar>
    </Layout>
  );
};

export default Chat;
