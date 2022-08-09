import { useApolloClient } from "@apollo/client";
import { Field, Form, Formik } from "formik";
import produce from "immer";
import { ChangeEvent, useState } from "react";
import {
  GetConversationDocument,
  GetConversationQuery,
  GetUserDocument,
  GetUserQuery,
  useSendMessageMutation,
} from "../generated/graphql";
import Avatar from "./Avatar";
import Loading from "./Loading";

interface ChatBoxProps {
  data?: GetConversationQuery;
  conversation_id?: string;
  user_profile_id: string | undefined;
  loading: boolean;
  fetchMore: any;
}

const ChatBox = ({
  data,
  loading,
  conversation_id,
  fetchMore,
}: ChatBoxProps) => {
  const client = useApolloClient();
  const user_profile = client.readQuery<GetUserQuery>({
    query: GetUserDocument,
  })?.getUser?.profile;

  const user_profile_id = user_profile?.id;

  const [messageContent, setMessageContent] = useState<string>("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessageContent(e.target.value);
  };

  const [sendMessage, { data: sendMessageData, loading: sendMessageLoading }] =
    useSendMessageMutation();

  const messages = data?.getConversation?.Messages;
  const hasNextPage = data?.getConversation?.ConversationPageInfo?.hasNextPage;
  const cursor = data?.getConversation?.ConversationPageInfo?.endCursor;
  const lastTake = data?.getConversation?.ConversationPageInfo?.lastTake;

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

  if (loading) return <Loading />;

  return (
    <div className="w-3/4 bg-white  h-[calc(100vh_-_115px)] relative flex flex-col justify-end">
      <div className="px-2 pb-12 overflow-y-auto">
        {hasNextPage ? <div onClick={loadMore}>Load more</div> : null}
        <div>
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
                    <Avatar
                      img_url={message.author.profile_avatar}
                      width={10}
                      height={10}
                      border={1}
                    />
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
      </div>
      <div className="absolute bottom-0 w-full h-10 p-1 bg-gray-100 border-t border-black ">
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
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default ChatBox;
