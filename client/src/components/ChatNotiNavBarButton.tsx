import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect } from "react";
import {
  GetManyConversationsSubsDocument,
  useGetManyConversationsLazyQuery,
} from "../generated/graphql";
import ChatBar from "./ChatBar";
import ConversationList from "./ConversationList";
import NewNotiCount from "./NewNotiCount";

interface ChatNotiNavBarButtonProps {
  user_profile_id: string | undefined;
  newChatNotiCount: number;
  setNewChatNotiCount: Dispatch<SetStateAction<number>>;
  toggle: (
    countNotViewedChatNotifications: number | null | undefined
  ) => Promise<void>;
  hidden: string | undefined;
}
const ChatNotiNavBarButton = ({
  user_profile_id,
  newChatNotiCount,
  setNewChatNotiCount,
  toggle,
  hidden,
}: ChatNotiNavBarButtonProps) => {
  const router = useRouter();
  const [
    getManyConversations,
    {
      data: getManyConversationsData,
      loading: getManyConversationsLoading,

      subscribeToMore: subsGetManyConversation,
    },
  ] = useGetManyConversationsLazyQuery();

  const countNotViewedChatNotifications =
    getManyConversationsData?.getManyConversations?.countNotViewedConversation;

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

  useEffect(() => {
    if (countNotViewedChatNotifications)
      setNewChatNotiCount(countNotViewedChatNotifications);
  }, [countNotViewedChatNotifications]);
  return (
    <div>
      <div
        className="relative flex items-center justify-center w-10 h-10 bg-gray-400 rounded-full cursor-pointer"
        onClick={
          router.pathname === "/chat"
            ? () => {}
            : () => toggle(countNotViewedChatNotifications)
        }
      >
        <FontAwesomeIcon
          icon="message"
          size="lg"
          className={"cursor-pointer"}
        />
        <NewNotiCount count={newChatNotiCount} />
      </div>

      <ChatBar hidden={hidden}>
        <ConversationList
          data={getManyConversationsData}
          loading={getManyConversationsLoading}
          user_profile_id={user_profile_id}
        />
        <Link href={"/chat"}>
          <a className="">Go to Chat</a>
        </Link>
      </ChatBar>
    </div>
  );
};

export default ChatNotiNavBarButton;
