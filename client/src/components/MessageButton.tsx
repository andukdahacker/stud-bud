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
  const router = useRouter();
  const [initConversation, { loading: initConversationLoading }] =
    useInitConversationMutation();
  if (!conversation_id) {
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
        className="px-5 py-1 mr-3 font-semibold border-2 border-black bg-blue"
      >
        {initConversationLoading ? <Loading /> : <div>Message</div>}
      </button>
    );
  }
  return (
    <Link href={`/chat/${conversation_id}`}>
      <a>
        <button
          type="button"
          className="px-5 py-1 mr-3 font-bold border-2 border-black bg-blue"
        >
          MESSAGE
        </button>
      </a>
    </Link>
  );
};

export default MessageButton;
