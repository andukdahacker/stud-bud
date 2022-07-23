import { useRouter } from "next/router";
import { useEffect } from "react";
import ChatBox from "../../components/ChatBox";
import ConversationInfoBar from "../../components/ConversationInfoBar";
import ConversationList from "../../components/ConversationList";
import ConversationListBar from "../../components/ConversationListBar";
import Layout from "../../components/Layout";
import {
  GetConversationDocument,
  GetConversationQuery,
  GetConversationSubDocument,
  GetManyConversationsSubsDocument,
  useGetConversationLazyQuery,
  useGetConversationSubSubscription,
  useGetManyConversationsLazyQuery,
  useGetUserQuery,
} from "../../generated/graphql";
import Loading from "../../components/Loading";
import { MESSAGES_TAKE_LIMIT } from "../../utils/constants";
import produce from "immer";
import { cache } from "../../lib/apolloClient";
const ChatWithChatBox = () => {
  const { data: userData, loading: userLoading } = useGetUserQuery();
  const user_profile_id = userData?.getUser?.profile?.id;

  const router = useRouter();

  const [
    getManyConversations,
    {
      data: ManyConversationsData,
      loading: ManyConversationsLoading,
      fetchMore: fetchMoreManyConversationsData,
      subscribeToMore: subsGetManyConversation,
    },
  ] = useGetManyConversationsLazyQuery();

  const [
    getConversation,
    {
      data: getConversationData,
      loading: getConversationLoading,
      fetchMore: fetchMoreConversationData,
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
          if (subscriptionData.data.getManyConversations?.Conversations) {
            const conversations =
              subscriptionData.data.getManyConversations.Conversations;
            const sorted = conversations?.slice(0).sort((a, b) => {
              const dateA =
                a.conversation.conversation_latest_message?.createdAt;
              const dateB =
                b.conversation.conversation_latest_message?.createdAt;

              return dateB - dateA;
            });

            const newConvo = sorted[0];

            const newConvo_id = newConvo.conversation_id;
            const newMessage =
              newConvo.conversation.conversation_latest_message;

            const exact_convo = cache.readQuery<GetConversationQuery>({
              query: GetConversationDocument,
              variables: {
                where: {
                  conversation_id: newConvo_id,
                },
              },
            });

            if (exact_convo) {
              const merged = produce(exact_convo, (draft) => {
                if (draft.getConversation?.Messages && newMessage) {
                  draft.getConversation.Messages.unshift(newMessage);
                }
              });

              cache.writeQuery<GetConversationQuery>({
                query: GetConversationDocument,
                variables: {
                  where: {
                    conversation_id: newConvo_id,
                  },
                },
                data: merged,
              });
            }
          }
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
      <div className="flex items-start justify-center w-full h-full bg-blue">
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
          fetchMore={fetchMoreConversationData}
        />
        {/* <ConversationInfoBar
          data={getConversationData}
          loading={getConversationLoading}
          user_profile_id={user_profile_id}
        /> */}
      </div>
    </Layout>
  );
};

export default ChatWithChatBox;
