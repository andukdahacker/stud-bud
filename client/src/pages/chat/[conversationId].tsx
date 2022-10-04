import { useRouter } from "next/router";
import { useEffect } from "react";
import ChatBox from "../../components/ChatBox";
import ConversationList from "../../components/ConversationList";
import ConversationListBar from "../../components/ConversationListBar";
import Layout from "../../components/Layout";
import {
  GetConversationDocument,
  GetConversationQuery,
  GetManyConversationsSubsDocument,
  useGetConversationLazyQuery,
  useGetManyConversationsLazyQuery,
  useGetManyConversationsSubsSubscription,
  useGetUserQuery,
} from "../../generated/graphql";
import Loading from "../../components/Loading";
import { MESSAGES_TAKE_LIMIT } from "../../utils/constants";
import { NetworkStatus } from "@apollo/client";
import { cache } from "../../lib/apolloClient";
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

      subscribeToMore: subsGetManyConversation,
    },
  ] = useGetManyConversationsLazyQuery();

  const [
    getConversation,
    {
      data: getConversationData,
      loading: getConversationLoading,
      fetchMore: fetchMoreConversationData,
      networkStatus: fetchMoreConversationNetworkStatus,
    },
  ] = useGetConversationLazyQuery();

  const {} = useGetManyConversationsSubsSubscription({
    variables: {
      where: {
        profile_id: user_profile_id as string,
      },
    },
    onSubscriptionData: ({ subscriptionData }) => {
      if (subscriptionData.data?.getManyConversations?.Conversations) {
        const conversations =
          subscriptionData.data.getManyConversations.Conversations;
        const sorted = conversations?.slice(0).sort((a, b) => {
          const dateA = a.conversation.conversation_latest_message?.createdAt;
          const dateB = b.conversation.conversation_latest_message?.createdAt;
          return dateB - dateA;
        });
        const newConvo = sorted[0];
        const newConvo_id = newConvo.conversation_id;
        const newMessage = newConvo.conversation.conversation_latest_message;
        const exact_convo = cache.readQuery<GetConversationQuery>({
          query: GetConversationDocument,
          variables: {
            where: {
              conversation_id: newConvo_id,
            },
          },
        });
        //merge new message to cache
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
    },
  });

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
  }, [user_profile_id, getManyConversations, subsGetManyConversation]);

  const conversation_id = router.query.conversationId as string;
  const fetchMoreConversationLoading =
    fetchMoreConversationNetworkStatus == NetworkStatus.fetchMore;

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
  }, [router.query, router.isReady, conversation_id, getConversation]);

  if (userLoading)
    return (
      <Layout>
        <Loading />
      </Layout>
    );

  return (
    <Layout>
      <div className="flex items-start justify-center w-full h-[calc(100vh_-_115px)] bg-blue">
        <ConversationListBar>
          <ConversationList
            data={ManyConversationsData}
            loading={ManyConversationsLoading}
            user_profile_id={user_profile_id}
          />
        </ConversationListBar>

        <ChatBox
          data={getConversationData}
          loading={getConversationLoading}
          fetchMore={fetchMoreConversationData}
          fetchMoreLoading={fetchMoreConversationLoading}
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
