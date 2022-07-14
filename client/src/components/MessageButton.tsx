import Link from "next/link";
import { useRouter } from "next/router";
import { useInitConversationMutation } from "../generated/graphql";
import Loading from "./Loading";

interface MessageButtonProps {
  conversation_id: string | undefined | null;
  requester_id: string | undefined;
  addressee_id: string | undefined;
}

const MessageButton = ({
  conversation_id,
  requester_id,
  addressee_id,
}: MessageButtonProps) => {
  if (!conversation_id) {
    const router = useRouter();
    const [initConversation, { loading: initConversationLoading }] =
      useInitConversationMutation();

    const handleClick = async () => {
      if (requester_id && addressee_id) {
        const result = await initConversation({
          variables: {
            input: {
              requester_id,
              addressee_id,
            },
          },
        });

        const success = result.data?.initConversation?.IOutput.success;
        const conversation_id = result.data?.initConversation?.conversation?.id;

        if (success && conversation_id) {
          router.push(`/chat/${conversation_id}`);
        }
      }
    };
    return (
      <button
        type="button"
        disabled={initConversationLoading ? true : false}
        onClick={handleClick}
      >
        {initConversationLoading ? <Loading /> : <div>Message</div>}
      </button>
    );
  }
  return (
    <Link href={`/chat/${conversation_id}`}>
      <a>Message</a>
    </Link>
  );
};

export default MessageButton;
