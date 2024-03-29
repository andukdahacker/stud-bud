import { useApolloClient } from "@apollo/client";
import { Field, Form, Formik } from "formik";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  GetConversationQuery,
  GetUserDocument,
  GetUserQuery,
  useSendMessageMutation,
} from "../generated/graphql";
import Avatar from "./Avatar";
import Loading from "./Loading";
import LoadMoreTrigger from "./LoadMoreTrigger";

interface ChatBoxProps {
  data?: GetConversationQuery;
  loading: boolean;
  fetchMore: any;
  fetchMoreLoading: boolean;
}

const ChatBox = ({
  data,
  loading,

  fetchMore,
  fetchMoreLoading,
}: ChatBoxProps) => {
  const client = useApolloClient();
  const user_profile = client.readQuery<GetUserQuery>({
    query: GetUserDocument,
  })?.getUser?.profile;

  const user_profile_id = user_profile?.id;
  const conversation_id = data?.getConversation?.Conversation?.id;
  const bottomChatBox = useRef<HTMLDivElement | null>(null);
  const chatBox = useRef<HTMLDivElement | null>(null);

  const [messageContent, setMessageContent] = useState<string>("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessageContent(e.target.value);
  };

  const [sendMessage, {}] = useSendMessageMutation();

  const messages = data?.getConversation?.Messages;
  const hasNextPage = data?.getConversation?.ConversationPageInfo?.hasNextPage;
  const cursor = data?.getConversation?.ConversationPageInfo?.endCursor;
  const lastTake = data?.getConversation?.ConversationPageInfo?.lastTake;

  const scrollToBot = () => {
    bottomChatBox.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };

  const initialValues = {
    message_content: "",
  };

  const onSubmit = async () => {
    if (messageContent.trim() === "") return;

    if (conversation_id && user_profile && user_profile_id) {
      await sendMessage({
        variables: {
          input: {
            message_content: messageContent,
            conversation_id,
          },
          where: {
            profile_id: user_profile_id,
          },
        },
      });
      setMessageContent("");
      scrollToBot();
    }
  };

  const loadMore = async () => {
    await fetchMore({
      variables: {
        where: {
          conversation_id,
        },
        page: {
          take: lastTake,
          cursor,
        },
      },
    });
  };

  useEffect(() => {
    if (bottomChatBox.current) {
      bottomChatBox.current?.scrollIntoView({
        behavior: "auto",
        block: "end",
        inline: "nearest",
      });
    }
  }, [conversation_id]);

  return (
    <div className="relative flex flex-col w-3/4 h-full bg-white">
      <div className="px-2 pb-1 overflow-y-auto ">
        {loading ? (
          <Loading />
        ) : (
          <div>
            <LoadMoreTrigger
              loadMore={loadMore}
              loading={fetchMoreLoading}
              hasNextPage={hasNextPage}
            />
            <div className="" ref={chatBox}>
              {messages
                ?.slice()
                .reverse()
                .map((message, index) => {
                  if (message.author.id !== user_profile_id)
                    return (
                      <div
                        key={index}
                        className="flex items-center justify-start mt-2"
                      >
                        <Avatar img_url={message.author.profile_avatar} />
                        <div className="flex justify-start px-2 py-1 ml-2 bg-white border border-black items-starts-center max-w-96 min-w-12 h-fit">
                          {message.message_content}
                        </div>
                      </div>
                    );
                  return (
                    <div key={index} className="flex items-center justify-end">
                      <div className="flex px-2 py-1 mt-2 text-white border border-black bg-purple">
                        {message.message_content}
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="h-1" ref={bottomChatBox}></div>
          </div>
        )}
      </div>
      <div className="w-full p-1 bg-gray-100 border-t border-black">
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          <Form className="flex items-center justify-between">
            <div className="flex items-center justify-center w-1/12 ">
              <button
                type="button"
                className="flex items-center justify-center w-6 h-6 text-2xl text-white border border-black rounded-full bg-purple"
              >
                +
              </button>
            </div>
            <Field
              type="text"
              name="message_content"
              value={messageContent}
              onChange={handleChange}
              className="w-9/12 p-1 mx-2 border border-black"
            />
            <button
              type="submit"
              className="w-2/12 px-2 py-1 font-bold text-white border-2 border-black bg-purple"
            >
              SEND
            </button>
            <button type="button" onClick={scrollToBot}>
              scroll bot
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default ChatBox;
