import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCheckAuth } from "../utils/useCheckAuth";
import logo from "../assets/Mark.jpg";
import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import LogOut from "./Logout";
import Avatar from "./Avatar";
import BuddyNotificationBar from "./BuddyNotificationBar";
import NotificationBar from "./NotificationBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  GetBuddyNotificationsSubsDocument,
  GetManyConversationsSubDocument,
  GetUserDocument,
  GetUserQuery,
  useGetBuddyNotificationsLazyQuery,
  useGetManyConversationsLazyQuery,
  useGetProfileLazyQuery,
  useViewBuddyNotificationsMutation,
  useViewMessageMutation,
} from "../generated/graphql";
import { useApolloClient } from "@apollo/client";
import merge from "deepmerge";
import NewNotiCount from "./NewNotiCount";
import ChatBar from "./ChatBar";
import ConversationList from "./ConversationList";

const NavBar = () => {
  const { data: authData, loading: authLoading } = useCheckAuth();
  const router = useRouter();
  const username = authData?.getUser?.username;
  const profile = authData?.getUser?.profile;
  const user_profile_id = authData?.getUser?.profile?.id;

  const [showModal, setShowModal] = useState<boolean>(false);
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const [viewBuddyNoti, {}] = useViewBuddyNotificationsMutation();
  const [viewChatNoti, {}] = useViewMessageMutation();

  const [
    getBuddyNotifications,
    {
      data: getBuddyNotificationsData,
      loading: getBuddyNotificationsLoading,
      refetch: refetchBuddyNoti,
      subscribeToMore: subsGetBuddyNotifications,
    },
  ] = useGetBuddyNotificationsLazyQuery();
  const [getProfile, {}] = useGetProfileLazyQuery();
  const [
    getManyConversations,
    {
      data: getManyConversationsData,
      loading: getManyConversationsLoading,
      refetch: refetchChatData,
      subscribeToMore: subsGetManyConversation,
    },
  ] = useGetManyConversationsLazyQuery();

  const countNotViewedBuddyNotifications =
    getBuddyNotificationsData?.getBuddyNotifications
      ?.countNotViewedBuddyNotifications;
  const countNotViewedChatNotifications =
    getManyConversationsData?.getManyConversations?.countNotViewedConversation;
  const [newBuddyNotiCount, setNewBuddyNotiCount] = useState<number>(0);
  const [newChatNotiCount, setNewChatNotiCount] = useState<number>(0);
  const [hiddenNotification, setHiddenNotification] = useState<
    string | undefined
  >("hidden");
  const [hiddenBuddyNotification, setHiddenBuddyNotification] = useState<
    string | undefined
  >("hidden");
  const [hiddenChatNotification, setHiddenChatNotification] = useState<
    string | undefined
  >("hidden");
  const toggleNotification = async () => {
    if (hiddenNotification === "hidden") setHiddenNotification(undefined);
    if (hiddenNotification === undefined) setHiddenNotification("hidden");

    setHiddenBuddyNotification("hidden");
    setHiddenChatNotification("hidden");
  };

  const toggleBuddyNotification = async () => {
    if (hiddenBuddyNotification === "hidden")
      setHiddenBuddyNotification(undefined);
    if (hiddenBuddyNotification === undefined)
      setHiddenBuddyNotification("hidden");
    if (countNotViewedBuddyNotifications) {
      if (countNotViewedBuddyNotifications > 0) {
        await viewBuddyNoti({
          variables: {
            where: {
              profile_id: user_profile_id as string,
            },
          },
        });

        refetchBuddyNoti({
          where: {
            profile_id: user_profile_id as string,
          },
        });
      }
    }

    setNewBuddyNotiCount(0);

    setHiddenNotification("hidden");
    setHiddenChatNotification("hidden");
  };

  const toggleChatNotification = async () => {
    if (hiddenChatNotification === "hidden")
      setHiddenChatNotification(undefined);
    if (hiddenChatNotification === undefined)
      setHiddenChatNotification("hidden");

    if (countNotViewedChatNotifications) {
      if (countNotViewedChatNotifications > 0) {
        await viewChatNoti({
          variables: {
            where: {
              profile_id: user_profile_id as string,
            },
          },
        });

        refetchChatData({
          where: {
            profile_id: user_profile_id as string,
          },
        });
      }
    }

    setNewChatNotiCount(0);

    setHiddenBuddyNotification("hidden");
    setHiddenNotification("hidden");
  };

  useEffect(() => {
    async function fetchData() {
      await getBuddyNotifications({
        variables: {
          where: {
            profile_id: user_profile_id as string,
          },
        },
      });

      subsGetBuddyNotifications({
        document: GetBuddyNotificationsSubsDocument,
        variables: {
          where: {
            profile_id: user_profile_id,
          },
        },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const merged = merge(prev, subscriptionData.data);
          const buddyAccepts_subs =
            subscriptionData.data.getBuddyNotifications?.buddyAccepts;
          const buddyRequests_subs =
            subscriptionData.data.getBuddyNotifications?.buddyRequests;
          if (buddyRequests_subs) {
            if (buddyRequests_subs.length > 0) {
              const requester_id = buddyRequests_subs[0].requester_id;
              getProfile({
                variables: {
                  where: {
                    profile_id: requester_id,
                  },
                },
              });
            }
          }

          if (buddyAccepts_subs) {
            if (buddyAccepts_subs.length > 0) {
              const requester_id = buddyAccepts_subs[0].requester_id;
              getProfile({
                variables: {
                  where: {
                    profile_id: requester_id,
                  },
                },
              });
            }
          }
          return merged;
        },
      });
    }

    if (user_profile_id) fetchData();
  }, [user_profile_id]);

  useEffect(() => {
    async function fetchData() {
      await getManyConversations({
        variables: {
          where: {
            profile_id: user_profile_id as string,
          },
        },
      });

      subsGetManyConversation({
        document: GetManyConversationsSubDocument,
        variables: {
          where: {
            profile_id: user_profile_id,
          },
        },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          console.log("subData", subscriptionData.data);
          return subscriptionData.data;
        },
      });
    }

    if (user_profile_id) fetchData();
  }, [user_profile_id]);

  useEffect(() => {
    if (countNotViewedBuddyNotifications)
      setNewBuddyNotiCount(countNotViewedBuddyNotifications);
  }, [countNotViewedBuddyNotifications]);
  useEffect(() => {
    if (countNotViewedChatNotifications)
      setNewChatNotiCount(countNotViewedChatNotifications);
  }, [countNotViewedChatNotifications]);

  return (
    <div className="flex items-center justify-between h-20 px-5 py-5 bg-white ">
      <div className="flex items-center">
        <Link href="/">
          <a className="flex items-center text-sm font-medium leading-5">
            <Image src={logo} />
            <div
              className={`text-center ml-10 ${
                router.route == "/" && `text-blue-700`
              }`}
            >
              Home
            </div>
          </a>
        </Link>
        <Link href="/find-buddy">
          <a
            className={` ml-10 text-sm font-medium ${
              router.route == "/find-buddy"
                ? `text-blue-700`
                : `text-gray-800 hover:text-blue-700`
            }`}
          >
            Find Buddy
          </a>
        </Link>
      </div>
      {authLoading ? (
        <div>Loading</div>
      ) : router.route == "/login" ||
        router.route == "/register" ||
        router.route == "/logout" ? null : authData?.getUser ? (
        <div className="flex justify-around">
          <div
            className="relative flex items-center justify-center w-10 h-10 bg-gray-400 rounded-full cursor-pointer"
            onClick={
              router.pathname === "/buddies"
                ? () => {}
                : toggleBuddyNotification
            }
          >
            <FontAwesomeIcon
              icon="user-group"
              size="lg"
              className={
                router.pathname === "/buddies"
                  ? " bg-blue-400"
                  : "cursor-pointer "
              }
            />
            <NewNotiCount count={newBuddyNotiCount} />
          </div>

          <BuddyNotificationBar
            data={getBuddyNotificationsData}
            loading={getBuddyNotificationsLoading}
            hidden={hiddenBuddyNotification}
          />

          <div
            className="relative flex items-center justify-center w-10 h-10 bg-gray-400 rounded-full cursor-pointer"
            onClick={
              router.pathname === "/notifications"
                ? () => {}
                : toggleNotification
            }
          >
            <FontAwesomeIcon
              icon="bell"
              size="lg"
              className={
                router.pathname === "/notifications"
                  ? " bg-blue-400"
                  : "cursor-pointer "
              }
            />
          </div>

          <NotificationBar hidden={hiddenNotification} />

          <div
            className="relative flex items-center justify-center w-10 h-10 bg-gray-400 rounded-full cursor-pointer"
            onClick={toggleChatNotification}
          >
            <FontAwesomeIcon
              icon="message"
              size="lg"
              className={
                router.pathname === "/chat" ? " bg-blue-400" : "cursor-pointer "
              }
            />

            <NewNotiCount count={newChatNotiCount} />
          </div>

          <ChatBar hidden={hiddenChatNotification}>
            <ConversationList
              data={getManyConversationsData}
              loading={getManyConversationsLoading}
              user_profile_id={user_profile_id}
            />
            <Link href={"/chat"}>
              <a className="">Go to Chat</a>
            </Link>
          </ChatBar>

          <Link href={profile ? `/profile/${profile.id}` : "/create-profile"}>
            <a
              className={` flex text-sm font-medium  ${
                router.asPath == `/profile/${profile?.id}`
                  ? `text-blue-700`
                  : `text-gray-800 hover:text-blue-700`
              }`}
            >
              <Avatar
                img_url={profile?.profile_avatar}
                width={50}
                height={50}
              />

              <div>{username}</div>
            </a>
          </Link>

          <button
            onClick={openModal}
            className="ml-10 text-sm font-medium text-gray-800 hover:text-blue-700"
          >
            Log out
          </button>

          <ReactModal isOpen={showModal} onRequestClose={closeModal}>
            <LogOut>
              <button
                onClick={closeModal}
                className="p-3 ml-5 text-sm font-medium leading-6 text-gray-900 rounded shadow-sm bg-gray-50 shadow-gray-900"
              >
                No
              </button>
            </LogOut>
          </ReactModal>
        </div>
      ) : (
        <div>
          <Link href="/login">
            <a className="text-sm font-medium text-gray-800 hover:text-blue-700">
              Sign in
            </a>
          </Link>
          <Link href="/register">
            <a className="p-3 ml-10 text-sm font-medium leading-6 text-white bg-[#0056FF] shadow-sm shadow-gray-900 rounded ">
              Sign up
            </a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
