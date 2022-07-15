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
import { BuddyRespondOptions } from "../utils/constants";
import Loading from "./Loading";
import MessageButton from "./MessageButton";

interface BuddyButtonProps {
  profile_id: string | undefined;
}
const BuddyButton = ({ profile_id }: BuddyButtonProps) => {
  const [
    connectBuddy,
    { data: ConnectBuddyData, loading: ConnectBuddyLoading },
  ] = useConnectBuddyMutation();
  const [
    respondBuddy,
    { data: RespondBuddyData, loading: RespondBuddyLoading },
  ] = useRespondBuddyMutation();
  const [removeBuddy, { data: RemoveBuddyData, loading: RemoveBuddyLoading }] =
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
  if (isBuddy)
    return (
      <div>
        <button type="button" onClick={respondButtonHandleClick}>
          Buddy
        </button>
        <button
          type="button"
          className={`${hideButton}`}
          onClick={() => respond(BuddyRespondOptions.REMOVE)}
        >
          Remove from your buddies list?
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
      <div>
        <button type="button" onClick={respondButtonHandleClick}>
          Requested
        </button>
        <button
          type="button"
          className={`${hideButton}`}
          onClick={() => respond(BuddyRespondOptions.UNDO)}
        >
          Undo Request
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
        <button type="button" onClick={respondButtonHandleClick}>
          Respond
        </button>
        <button
          type="button"
          className={`${hideButton}`}
          onClick={() => respond(BuddyRespondOptions.ACCEPT)}
        >
          Accept
        </button>
        <button
          type="button"
          className={`${hideButton}`}
          onClick={() => respond(BuddyRespondOptions.DECLINE)}
        >
          Decline
        </button>

        <MessageButton
          conversation_id={conversation_id}
          requester_id={user_profile_id}
          addressee_id={profile_id}
        />
      </div>
    );

  return (
    <div>
      <button type="button" onClick={() => connect()}>
        Connect
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
