import { NetworkStatus } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineUndo, AiOutlineUserAdd } from "react-icons/ai";
import {
  RelationshipStatusCode,
  useConnectBuddyMutation,
  useGetRelationshipLazyQuery,
  useGetUserQuery,
  useRemoveBuddyMutation,
  useRespondBuddyMutation,
} from "../../generated/graphql";
import { BuddyRespondOptions } from "../../utils/types";
import Loading from "../Loading/Loading";

interface BuddyButtonProps {
  profile_id: string | undefined;
}
const BuddyButton = ({ profile_id }: BuddyButtonProps) => {
  const [connectBuddy, { loading: ConnectBuddyLoading }] =
    useConnectBuddyMutation();
  const [respondBuddy, { loading: RespondBuddyLoading }] =
    useRespondBuddyMutation();
  const [removeBuddy, { loading: RemoveBuddyLoading }] =
    useRemoveBuddyMutation();

  const [
    getRelationship,
    {
      data: GetRelationshipData,
      loading: GetRelationshipLoading,
      refetch: refetchRelationship,
      networkStatus,
    },
  ] = useGetRelationshipLazyQuery();

  const { data: GetUserData, loading: GetUserLoading } = useGetUserQuery();
  const user_profile_id = GetUserData?.getUser?.profile?.id;

  const router = useRouter();
  const [hideButton, setHideButton] = useState<string>("hidden");
  const respondButtonHandleClick = () => {
    if (hideButton === "hidden") setHideButton("");
    if (hideButton === "") setHideButton("hidden");
  };

  useEffect(() => {
    async function fetchData() {
      await getRelationship({
        variables: {
          where: {
            requester_id: user_profile_id as string,
            addressee_id: profile_id as string,
          },
        },
        fetchPolicy: "cache-and-network",
        notifyOnNetworkStatusChange: true,
      });
    }

    if (user_profile_id && profile_id) fetchData();
  }, [user_profile_id, profile_id]);

  const refetchRelationshipLoading = networkStatus === NetworkStatus.refetch;

  const getRelationshipSuccess =
    GetRelationshipData?.getRelationship?.IOutput.success;
  const getRelationshipMessage =
    GetRelationshipData?.getRelationship?.IOutput.message;

  const relationship = GetRelationshipData?.getRelationship?.relationship;
  const otherEndRelationship =
    GetRelationshipData?.getRelationship?.otherEndRelationship;

  const isRequested = relationship?.status === RelationshipStatusCode.Requested;
  const isRespond =
    otherEndRelationship?.status === RelationshipStatusCode.Requested;
  const isBuddy =
    relationship?.status === RelationshipStatusCode.Accepted &&
    otherEndRelationship?.status === RelationshipStatusCode.Accepted;

  const connect = async () => {
    if (!user_profile_id) {
      router.push("/login");
    } else {
      await connectBuddy({
        variables: {
          input: {
            requester_id: user_profile_id as string,
            addressee_id: profile_id as string,

            status: RelationshipStatusCode.Requested,
          },
        },
      });

      await refetchRelationship({
        where: {
          requester_id: user_profile_id as string,
          addressee_id: profile_id as string,
        },
      });

      setHideButton("hidden");
    }
  };

  const respond = async (option: BuddyRespondOptions) => {
    if (option === BuddyRespondOptions.ACCEPT) {
      await respondBuddy({
        variables: {
          input: {
            requester_id: profile_id as string,
            addressee_id: user_profile_id as string,
            status: RelationshipStatusCode.Accepted,
          },
        },
      });

      await refetchRelationship({
        where: {
          requester_id: user_profile_id as string,
          addressee_id: profile_id as string,
        },
      });

      setHideButton("hidden");
    } else if (option === BuddyRespondOptions.DECLINE) {
      await respondBuddy({
        variables: {
          input: {
            requester_id: profile_id as string,
            addressee_id: user_profile_id as string,
            status: RelationshipStatusCode.Declined,
          },
        },
      });

      await refetchRelationship({
        where: {
          requester_id: user_profile_id as string,
          addressee_id: profile_id as string,
        },
      });

      setHideButton("hidden");
    } else if (option === BuddyRespondOptions.UNDO) {
      await respondBuddy({
        variables: {
          input: {
            requester_id: user_profile_id as string,
            addressee_id: profile_id as string,
            status: RelationshipStatusCode.Declined,
          },
        },
      });

      await refetchRelationship({
        where: {
          requester_id: user_profile_id as string,
          addressee_id: profile_id as string,
        },
      });

      setHideButton("hidden");
    } else if (option === BuddyRespondOptions.REMOVE) {
      await removeBuddy({
        variables: {
          input: {
            requester_id: user_profile_id as string,
            addressee_id: profile_id as string,
            status: RelationshipStatusCode.Declined,
          },
        },
      });

      await refetchRelationship({
        where: {
          requester_id: user_profile_id as string,
          addressee_id: profile_id as string,
        },
      });

      setHideButton("hidden");
    }
  };

  if (
    GetUserLoading ||
    GetRelationshipLoading ||
    ConnectBuddyLoading ||
    RespondBuddyLoading ||
    RemoveBuddyLoading ||
    refetchRelationshipLoading
  )
    return <Loading />;
  if (!getRelationshipSuccess) return <div>{getRelationshipMessage}</div>;
  if (profile_id == user_profile_id) return null;
  if (isBuddy)
    return (
      <div className="relative">
        <button
          type="button"
          onClick={respondButtonHandleClick}
          className="purpleButton"
        >
          Buddy
        </button>
        <button
          type="button"
          className={
            hideButton ? "hidden" : ` absolute whiteButton -bottom-16 right-0`
          }
          onClick={() => respond(BuddyRespondOptions.REMOVE)}
        >
          Remove buddy?
        </button>
      </div>
    );

  if (isRequested)
    return (
      <div className="relative">
        <button
          type="button"
          onClick={respondButtonHandleClick}
          className="purpleButton"
        >
          Requested
        </button>
        <button
          type="button"
          className={
            hideButton
              ? "hidden"
              : ` absolute whiteButton -bottom-10 right-0 flex`
          }
          onClick={() => respond(BuddyRespondOptions.UNDO)}
        >
          <AiOutlineUndo size={25} />
          Undo
        </button>
      </div>
    );

  if (isRespond)
    return (
      <>
        <button
          type="button"
          onClick={respondButtonHandleClick}
          className="purpleButton"
        >
          Respond
        </button>
        <div className={hideButton ? "hidden" : ` absolute whiteButton `}>
          <div className="flex flex-col ">
            <button
              type="button"
              onClick={() => respond(BuddyRespondOptions.ACCEPT)}
              className="border-b "
            >
              Accept
            </button>
            <button
              type="button"
              onClick={() => respond(BuddyRespondOptions.DECLINE)}
              className=""
            >
              Decline
            </button>
          </div>
        </div>
      </>
    );

  return (
    <button
      type="button"
      onClick={() => connect()}
      className="flex text-center purpleButton"
    >
      <AiOutlineUserAdd size={25} />
      ADD
    </button>
  );
};

export default BuddyButton;
