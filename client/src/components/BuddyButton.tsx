import { NetworkStatus } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  GetProfileQuery,
  RelationshipStatusCode,
  useConnectBuddyMutation,
  useGetRelationshipLazyQuery,
  useGetUserQuery,
  useRemoveBuddyMutation,
  useRespondBuddyMutation,
} from "../generated/graphql";
import { BuddyRespondOptions } from "../utils/types";

import Loading from "./Loading";
import MessageButton from "./MessageButton";

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

  const conversation_id =
    GetRelationshipData?.getRelationship?.relationship?.conversation_id;

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
      <div className="inline-block">
        <button
          type="button"
          onClick={respondButtonHandleClick}
          className="w-32 px-2 py-1 mr-5 font-bold text-white border-2 border-black bg-purple"
        >
          Buddy
        </button>
        <button
          type="button"
          className={`${hideButton} absolute block bg-white border-r border-l border-b border-black px-2 py-1 w-32 `}
          onClick={() => respond(BuddyRespondOptions.REMOVE)}
        >
          Remove buddy?
        </button>

        <MessageButton
          conversation_id={conversation_id}
          requester_id={user_profile_id}
          addressee_id={profile_id}
        />
      </div>
    );

  if (isRequested)
    return (
      <div className="inline-block">
        <button
          type="button"
          onClick={respondButtonHandleClick}
          className="w-32 px-2 py-1 mr-5 font-bold text-white border-2 border-black bg-purple"
        >
          Requested
        </button>
        <button
          type="button"
          className={`${hideButton} w-32 absolute block bg-white border-r border-l border-b  border-black px-2 py-1`}
          onClick={() => respond(BuddyRespondOptions.UNDO)}
        >
          Undo
        </button>

        <MessageButton
          conversation_id={conversation_id}
          requester_id={user_profile_id}
          addressee_id={profile_id}
        />
      </div>
    );

  if (isRespond)
    return (
      <div>
        <div className="inline-block ">
          <button
            type="button"
            onClick={respondButtonHandleClick}
            className="w-32 px-2 py-1 mr-5 font-bold text-white border-2 border-black bg-purple"
          >
            Respond
          </button>
          <div className={`${hideButton} absolute block w-32 bg-white`}>
            <div className="flex flex-col ">
              <button
                type="button"
                onClick={() => respond(BuddyRespondOptions.ACCEPT)}
                className="border-b border-l border-r border-black"
              >
                Accept
              </button>
              <button
                type="button"
                onClick={() => respond(BuddyRespondOptions.DECLINE)}
                className="border-b border-l border-r border-black"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
        <MessageButton
          conversation_id={conversation_id}
          requester_id={user_profile_id}
          addressee_id={profile_id}
        />
      </div>
    );

  return (
    <div>
      <button
        type="button"
        onClick={() => connect()}
        className="px-2 py-1 mr-5 font-bold text-white border-2 border-black bg-purple"
      >
        + ADD
      </button>
      <MessageButton
        conversation_id={conversation_id}
        requester_id={user_profile_id}
        addressee_id={profile_id}
      />
    </div>
  );
};

export default BuddyButton;
