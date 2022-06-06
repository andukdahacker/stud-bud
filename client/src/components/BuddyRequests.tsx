import { ApolloQueryResult, useApolloClient } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";
import {
  Exact,
  GetUserDocument,
  GetUserQuery,
  RelationshipStatusCode,
  useRespondBuddyMutation,
} from "../generated/graphql";
import { BuddyRespondOptions } from "../utils/constants";

interface BuddyRequestsProps {
  data?: GetUserQuery;
}
const BuddyRequests = ({ data }: BuddyRequestsProps) => {
  const buddyRequests = data?.getUser?.profile?.buddyRequests;
  const user_profile_id = data?.getUser?.profile?.id;

  const [respondBuddy, {}] = useRespondBuddyMutation();
  const [hideBuddyRequests, setHideBuddyRequests] = useState<
    string | undefined
  >("hidden");

  const BuddyRequestsButtonHandleClick = () => {
    if (hideBuddyRequests === "hidden") setHideBuddyRequests(undefined);
    if (hideBuddyRequests === undefined) setHideBuddyRequests("hidden");
  };
  const isPopulated = !!buddyRequests!.length;

  const [clicked, setClicked] = useState<string>();
  const [acceptClicked, setAcceptClicked] = useState<string | undefined>(
    "hidden"
  );
  const [declineClicked, setDeclineClicked] = useState<string | undefined>(
    "hidden"
  );

  const respond = async (option: BuddyRespondOptions, requester_id: string) => {
    if (option === BuddyRespondOptions.ACCEPT) {
      await respondBuddy({
        variables: {
          input: {
            requester_id,
            addressee_id: user_profile_id as string,
            status: RelationshipStatusCode.Accepted,
            specifier_id: user_profile_id as string,
          },
        },
      });

      setClicked("hidden");
      setAcceptClicked(undefined);
    } else if (option === BuddyRespondOptions.DECLINE) {
      await respondBuddy({
        variables: {
          input: {
            requester_id,
            addressee_id: user_profile_id as string,
            status: RelationshipStatusCode.Declined,
            specifier_id: user_profile_id as string,
          },
        },
      });
      setClicked("hidden");
      setDeclineClicked(undefined);
    }
  };

  return (
    <div className="flex flex-col mr-3 ">
      <div
        onClick={BuddyRequestsButtonHandleClick}
        className="hover:cursor-pointer"
      >
        <FontAwesomeIcon icon={"user-group"} size={"1x"} />
      </div>
      <div
        className={`${hideBuddyRequests} overflow-auto fixed bg-white top-20 z-10`}
      >
        {isPopulated ? (
          buddyRequests?.map((request, index) => {
            return (
              <div key={index}>
                <div>
                  <Link href={`/profile/${request.requester_id}`}>
                    <a className="font-bold">
                      {request.requester?.user?.username}
                    </a>
                  </Link>{" "}
                  has sent you a buddy request
                </div>
                <div className={`${clicked}`}>
                  <button
                    className="h-10 px-3 py-1 ml-5 text-sm font-medium leading-6 text-white bg-blue-700 rounded shadow-sm shadow-blue-300"
                    type="button"
                    onClick={() =>
                      respond(BuddyRespondOptions.ACCEPT, request.requester_id)
                    }
                  >
                    Accept
                  </button>
                  <button
                    className="h-10 px-3 py-1 ml-5 text-sm font-medium leading-6 text-black bg-gray-300 rounded shadow-sm shadow-blue-300"
                    type="button"
                    onClick={() =>
                      respond(BuddyRespondOptions.DECLINE, request.requester_id)
                    }
                  >
                    Decline
                  </button>
                </div>
                <div className={`${acceptClicked}`}>
                  You have become buddies
                </div>
                <div className={`${declineClicked}`}>Request declined</div>
              </div>
            );
          })
        ) : (
          <div>You currently have no buddy request</div>
        )}
      </div>
    </div>
  );
};

export default BuddyRequests;
