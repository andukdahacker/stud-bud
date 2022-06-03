import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  GetProfileQuery,
  GetUserDocument,
  GetUserQuery,
  RelationshipStatusCode,
  useConnectBuddyMutation,
  useRemoveBuddyMutation,
  useRespondBuddyMutation,
} from "../generated/graphql";
import { BuddyRespondOptions, BuddyStatus } from "../utils/constants";

interface BuddyButtonProps {
  data: GetProfileQuery | undefined;
}
const BuddyButton = ({ data }: BuddyButtonProps) => {
  const [connectBuddy, {}] = useConnectBuddyMutation();
  const [respondBuddy, {}] = useRespondBuddyMutation();
  const [removeBuddy, {}] = useRemoveBuddyMutation();
  const router = useRouter();
  const client = useApolloClient();
  const user_profile_id = client.readQuery<GetUserQuery>({
    query: GetUserDocument,
  })?.getUser?.profile?.id;

  const [status, setStatus] = useState<BuddyStatus>();

  const [hideButton, setHideButton] = useState<string>("hidden");
  const respondButtonHandleClick = () => {
    if (hideButton === "hidden") setHideButton("");
    if (hideButton === "") setHideButton("hidden");
  };
  const profileData = data?.getProfile?.Profile;
  const profile_id = data?.getProfile?.Profile?.id;
  const buddies = profileData?.buddies;
  const isBuddy = buddies?.find(
    (buddy) => buddy?.addressee_id === user_profile_id
  );
  const buddiesRequests = profileData?.buddyRequests;
  const isRequested = buddiesRequests?.find(
    (request) => request?.requester_id === user_profile_id
  );
  const buddiesPendings = profileData?.buddyPendings;
  const isPending = buddiesPendings?.find(
    (pending) => pending?.addressee_id === user_profile_id
  );

  useEffect(() => {
    if (isBuddy) {
      setStatus(BuddyStatus.BUDDY);
    } else if (isRequested) {
      setStatus(BuddyStatus.REQUESTED);
    } else if (isPending) {
      setStatus(BuddyStatus.PENDING);
    } else {
      setStatus(undefined);
    }
  }, [isBuddy, isRequested, isPending]);

  const connect = async () => {
    if (!user_profile_id) {
      router.push("/login");
    } else {
      await connectBuddy({
        variables: {
          input: {
            requester_id: user_profile_id as string,
            addressee_id: profile_id as string,
            specifier_id: user_profile_id as string,
            status: RelationshipStatusCode.Requested,
          },
        },
      });

      setStatus(BuddyStatus.REQUESTED);
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
            specifier_id: user_profile_id as string,
          },
        },
      });
      setStatus(BuddyStatus.BUDDY);
      setHideButton("hidden");
    } else if (option === BuddyRespondOptions.DECLINE) {
      await respondBuddy({
        variables: {
          input: {
            requester_id: profile_id as string,
            addressee_id: user_profile_id as string,
            status: RelationshipStatusCode.Declined,
            specifier_id: user_profile_id as string,
          },
        },
      });
      setStatus(undefined);
      setHideButton("hidden");
    } else if (option === BuddyRespondOptions.UNDO) {
      await respondBuddy({
        variables: {
          input: {
            requester_id: user_profile_id as string,
            addressee_id: profile_id as string,
            status: RelationshipStatusCode.Declined,
            specifier_id: user_profile_id as string,
          },
        },
      });
      setStatus(undefined);
      setHideButton("hidden");
    } else if (option === BuddyRespondOptions.REMOVE) {
      await removeBuddy({
        variables: {
          input: {
            requester_id: user_profile_id as string,
            addressee_id: profile_id as string,
            specifier_id: user_profile_id as string,
            status: RelationshipStatusCode.Declined,
          },
        },
      });

      setStatus(undefined);
      setHideButton("hidden");
    }
  };

  if (status === BuddyStatus.BUDDY)
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
      </div>
    );

  if (status === BuddyStatus.REQUESTED)
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
      </div>
    );

  if (status === BuddyStatus.PENDING)
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
      </div>
    );

  return (
    <button type="button" onClick={() => connect()}>
      Connect
    </button>
  );
};

export default BuddyButton;
