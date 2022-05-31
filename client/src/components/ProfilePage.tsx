import { useApolloClient } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  GetProfileQuery,
  GetUserDocument,
  GetUserQuery,
  RelationshipStatusCode,
  useConnectBuddyMutation,
  useRespondBuddyMutation,
  useRemoveBuddyMutation,
} from "../generated/graphql";
import Avatar from "./Avatar";
import Loading from "./Loading";
import Wallpaper from "./Wallpaper";
import { BuddyStatus, BuddyRespondOptions } from "../utils/constants";

interface ProfilePageProps {
  data: GetProfileQuery | undefined;
  loading?: boolean;
}

const ProfilePage = (props: ProfilePageProps) => {
  const client = useApolloClient();
  const router = useRouter();
  const [status, setStatus] = useState<BuddyStatus>();
  const [hideButton, setHideButton] = useState<string>("hidden");
  const [connectBuddy, {}] = useConnectBuddyMutation();
  const [respondBuddy, {}] = useRespondBuddyMutation();
  const [removeBuddy, {}] = useRemoveBuddyMutation();

  const user_profile_id = client.readQuery<GetUserQuery>({
    query: GetUserDocument,
  })?.getUser?.profile?.id;
  const success = props.data?.getProfile?.IOutput.success;
  const profileData = props.data?.getProfile?.Profile;
  const profile_interests = profileData?.profile_interests;
  const profile_wallpaper = profileData?.profile_wallpaper;
  const profile_avatar = profileData?.profile_avatar;
  const username = profileData?.user?.username;
  const profile_id = profileData?.id;
  const profile_bio = profileData?.profile_bio;
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

  const respondButtonHandleClick = () => {
    if (hideButton === "hidden") setHideButton("");
    if (hideButton === "") setHideButton("hidden");
  };

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

  if (props.loading) return <Loading />;

  if (user_profile_id !== profile_id)
    return (
      <div>
        <Wallpaper img_url={profile_wallpaper} />
        <Avatar img_url={profile_avatar} />
        {status === BuddyStatus.BUDDY ? (
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
        ) : status === BuddyStatus.REQUESTED ? (
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
        ) : status === BuddyStatus.PENDING ? (
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
        ) : (
          <button type="button" onClick={() => connect()}>
            Connect
          </button>
        )}
        <h1>{username}</h1>
        <h2>Bio: {profile_bio}</h2>
        <h2>Interest</h2>
        {profile_interests &&
          profile_interests.map((obj, index) => {
            return (
              <div key={index}>
                <span>{obj?.interest.interest_name}</span>
              </div>
            );
          })}
        {success ? null : <div>{props.data?.getProfile?.IOutput?.message}</div>}
      </div>
    );

  return (
    <div>
      <Wallpaper img_url={profile_wallpaper} />
      <Avatar img_url={profile_avatar} />
      <h1>{username}</h1>
      <Link href={`/profile/edit/${profile_id}`}>
        <a>Edit profile</a>
      </Link>
      <h2>Bio: {profile_bio}</h2>
      <h2>Interest</h2>
      {profileData?.profile_interests &&
        profileData.profile_interests.map((profile, index) => {
          return (
            <div key={index}>
              <span>{profile?.interest.interest_name}</span>
            </div>
          );
        })}
      <h2>Buddies: </h2>
      {buddies
        ? buddies.map((buddy, index) => {
            return <div key={index}>{buddy?.addressee_id}</div>;
          })
        : null}
      <h2>They requested to be your buddies: </h2>
      {buddiesRequests
        ? buddiesRequests.map((requests, index) => {
            return <div key={index}>{requests?.requester_id}</div>;
          })
        : null}
      <h2>You requested to be their buddies: </h2>
      {buddiesPendings
        ? buddiesPendings.map((pending, index) => {
            return <div key={index}>{pending?.addressee_id}</div>;
          })
        : null}
    </div>
  );
};

export default ProfilePage;
