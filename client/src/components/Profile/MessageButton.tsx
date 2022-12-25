import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AiOutlineMessage } from "react-icons/ai";
import {
  useGetRelationshipLazyQuery,
  useGetUserQuery,
  useInitConversationMutation,
} from "../../generated/graphql";
import Loading from "../Loading/Loading";

interface MessageButtonProps {
  profile_id: string;
}

const MessageButton = ({ profile_id }: MessageButtonProps) => {
  const router = useRouter();
  const { data: GetUserData, loading: GetUserLoading } = useGetUserQuery();
  const user_profile_id = GetUserData?.getUser?.profile?.id;
  const [initConversation, { loading: initConversationLoading }] =
    useInitConversationMutation();

  const [
    getRelationship,
    { data: GetRelationshipData, loading: GetRelationshipLoading },
  ] = useGetRelationshipLazyQuery();
  const conversation_id =
    GetRelationshipData?.getRelationship?.relationship?.conversation_id;
  useEffect(() => {
    if (user_profile_id)
      getRelationship({
        variables: {
          where: {
            requester_id: user_profile_id,
            addressee_id: profile_id,
          },
        },
      });
  }, [user_profile_id]);

  if (GetRelationshipLoading || GetUserLoading) return <Loading />;

  const handleClickInitConvo = async () => {
    const result = await initConversation({
      variables: {
        input: {
          requester_id: user_profile_id as string,
          addressee_id: profile_id,
        },
      },
    });

    const success = result.data?.initConversation?.IOutput.success;
    const conversation_id = result.data?.initConversation?.conversation?.id;

    if (success && conversation_id) {
      router.push(`/chat/${conversation_id}`);
    }
  };

  return (
    <>
      {conversation_id ? (
        <Link href={`/chat/${conversation_id}`}>
          <a>
            <button type="button" className="blueButton">
              <AiOutlineMessage size={25} />
            </button>
          </a>
        </Link>
      ) : (
        <button
          onClick={handleClickInitConvo}
          disabled={initConversationLoading}
          className="blueButton"
        >
          {initConversationLoading ? (
            <Loading />
          ) : (
            <AiOutlineMessage size={25} />
          )}
        </button>
      )}
    </>
  );
};

export default MessageButton;
