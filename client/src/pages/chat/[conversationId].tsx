import { useRouter } from "next/router";
import { useEffect } from "react";
import ChatBox from "../../components/ChatBox";
import ConversationInfoBar from "../../components/ConversationInfoBar";
import ConversationList from "../../components/ConversationList";
import ConversationListBar from "../../components/ConversationListBar";
import Layout from "../../components/Layout";
import {
  GetConversationSubDocument,
  GetManyConversationsSubsDocument,
  useGetConversationLazyQuery,
  useGetManyConversationsLazyQuery,
  useGetUserQuery,
} from "../../generated/graphql";
import merge from "deepmerge";
import Loading from "../../components/Loading";
import { MESSAGES_TAKE_LIMIT } from "../../utils/constants";
import produce from "immer";
const ChatWithChatBox = () => {
  const { data: userData, loading: userLoading } = useGetUserQuery();
  const user_profile_id = userData?.getUser?.profile?.id;

  const router = useRouter();

  const [
    getManyConversations,
    {
      data: ManyConversationsData,
      loading: ManyConversationsLoading,
      fetchMore: getMoreManyConversationsData,
      subscribeToMore: subsGetManyConversation,
    },
  ] = useGetManyConversationsLazyQuery();

  const [
    getConversation,
    {
      data: getConversationData,
      loading: getConversationLoading,
      fetchMore: getMoreConversationData,
      subscribeToMore: subsGetConversationData,
    },
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

      subsGetManyConversation({
        document: GetManyConversationsSubsDocument,
        variables: {
          where: {
            profile_id: user_profile_id,
          },
        },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          return subscriptionData.data;
        },
      });
    }

    if (user_profile_id) fetchData();
  }, [user_profile_id]);
  const conversation_id = router.query.conversationId as string;

  useEffect(() => {
    async function fetchData() {
      await getConversation({
        variables: {
          where: {
            conversation_id,
          },
          page: {
            take: MESSAGES_TAKE_LIMIT,
          },
        },
      });

      subsGetConversationData({
        document: GetConversationSubDocument,
        variables: {
          where: {
            conversation_id,
          },
        },
        updateQuery: (prev, { subscriptionData }) => {
          const incoming = subscriptionData.data;

          if (!incoming) return prev;
          if (!prev) return incoming;

          const merged = produce(prev, (draft) => {
            if (
              draft.getConversation?.Messages &&
              incoming.getConversation?.Messages
            ) {
              draft.getConversation.Messages = [
                ...incoming.getConversation.Messages,
                ...draft.getConversation.Messages,
              ];
            }
          });
          return merged;
        },
      });
    }

    if (router.isReady) fetchData();
  }, [router.query, router.isReady]);

  if (userLoading)
    return (
      <Layout>
        <Loading />
      </Layout>
    );

  return (
    <Layout>
      <div className="flex ">
        <ConversationListBar>
          <ConversationList
            data={ManyConversationsData}
            loading={ManyConversationsLoading}
            user_profile_id={user_profile_id}
          />
        </ConversationListBar>

        <ChatBox
          data={getConversationData}
          conversation_id={conversation_id}
          user_profile_id={user_profile_id}
          loading={getConversationLoading}
        />
        <ConversationInfoBar
          data={getConversationData}
          loading={getConversationLoading}
          user_profile_id={user_profile_id}
        />
      </div>
    </Layout>
  );
};

export default ChatWithChatBox;
