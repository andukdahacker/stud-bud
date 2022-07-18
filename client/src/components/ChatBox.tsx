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
    <div className="w-1/2 bg-white">
      <div className="max-h-[calc(100vh_-_8rem)] overflow-y-auto">
        {hasNextPage ? <div onClick={loadMore}>Load more</div> : null}
        <div>
          {messages
            ?.slice()
            .reverse()
            .map((message, index) => {
              if (message.author.id !== user_profile_id)
                return (
                  <div key={index} className="flex justify-start">
                    <Avatar
                      img_url={message.author.profile_avatar}
                      width={40}
                      height={40}
                    />
                    <div className="bg-gray-200 rounded-md">
                      {message.message_content}
                    </div>
                  </div>
                );
              return (
                <div key={index} className="flex justify-end">
                  <div className="bg-blue-500 rounded-md">
                    {message.message_content}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form className="">
          <Field
            type="text"
            name="message_content"
            value={messageContent}
            onChange={handleChange}
          />
          <button type="submit" className="bg-blue-400">
            Send
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default ChatBox;
