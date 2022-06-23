import { useApolloClient } from "@apollo/client";
import { Field, Form, Formik } from "formik";
import {
  GetConversationQuery,
  GetUserDocument,
  GetUserQuery,
  SendMessageInput,
  useSendMessageMutation,
} from "../generated/graphql";
import Loading from "./Loading";

interface ChatBoxProps {
  data?: GetConversationQuery;
  loading: boolean;
}

const ChatBox = ({ data, loading }: ChatBoxProps) => {
  const client = useApolloClient();
  const user_profile_id = client.readQuery<GetUserQuery>({
    query: GetUserDocument,
  })?.getUser?.profile?.id;

  const [sendMessage, { data: sendMessageData, loading: sendMessageLoading }] =
    useSendMessageMutation();
  const messages = data?.getConversation?.Messages;
  const conversation_id = data?.getConversation?.Conversation?.id;

  const initialValues = {
    message_content: "",
    conversation_id: conversation_id!,
  };

  const onSubmit = async ({
    message_content,
    conversation_id,
  }: SendMessageInput) => {
    await sendMessage({
      variables: {
        input: {
          message_content,
          conversation_id,
        },
        where: {
          profile_id: user_profile_id as string,
        },
      },
    });
  };

  if (loading) return <Loading />;
  return (
    <div className="relative w-1/2 bg-blue-400">
      <div>
        {messages?.map((message, index) => {
          return <div key={index}>{message.message_content}</div>;
        })}
      </div>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form className="absolute bottom-0">
          <Field name="message_content" />
        </Form>
      </Formik>
    </div>
  );
};

export default ChatBox;
