import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import ChatBox from "../../components/ChatBox";
import ConversationInfoBar from "../../components/ConversationInfoBar";
import ConversationList from "../../components/ConversationList";
import ConversationListBar from "../../components/ConversationListBar";
import Layout from "../../components/Layout";
import {
  GetUserDocument,
  GetUserQuery,
  useGetConversationLazyQuery,
  useGetManyConversationsLazyQuery,
} from "../../generated/graphql";

const ChatWithChatBox = () => {
  const client = useApolloClient();
  const user_profile_id = client.readQuery<GetUserQuery>({
    query: GetUserDocument,
  })?.getUser?.profile?.id;

  const router = useRouter();

  const [
    getManyConversations,
    { data: ManyConversationsData, loading: ManyConversationsLoading },
  ] = useGetManyConversationsLazyQuery();

  const [
    getConversation,
    { data: getConversationData, loading: getConversationLoading },
  ] = useGetConversationLazyQuery();
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
  const conversation_id = router.query.conversationId as string;

  useEffect(() => {
    if (router.isReady)
      getConversation({
        variables: {
          where: {
            conversation_id,
          },
        },
      });
  }, [router.query, router.isReady]);

  return (
    <Layout>
      <div className="flex">
        <ConversationListBar>
          <ConversationList
            data={ManyConversationsData}
            loading={ManyConversationsLoading}
          />
        </ConversationListBar>

        <ChatBox data={getConversationData} loading={getConversationLoading} />
        <ConversationInfoBar
          data={getConversationData}
          loading={getConversationLoading}
        />
      </div>
    </Layout>
  );
};

export default ChatWithChatBox;
