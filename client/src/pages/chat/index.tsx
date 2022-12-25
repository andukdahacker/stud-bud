import { useEffect } from "react";
import ConversationList from "../../components/Chat/ConversationList";
import ConversationListBar from "../../components/Chat/ConversationListBar";
import Layout from "../../components/Layouts/Layout";
import Loading from "../../components/Loading/Loading";
import {
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
