import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCheckAuth } from "../utils/useCheckAuth";
import logo from "../assets/Mark.jpg";
import { useState } from "react";
import ReactModal from "react-modal";
import LogOut from "./Logout";
import Avatar from "./Avatar";
import {
  useViewBuddyNotificationsMutation,
  useViewMessageMutation,
  useViewNotificationMutation,
} from "../generated/graphql";

import BuddyNotiNavBarButton from "./BuddyNotiNavBarButton";
import ChatNotiNavBarButton from "./ChatNotiNavBarButton";
import Loading from "./Loading";
import NotiNavBarButton from "./NotiNavBarButton";

const NavBar = () => {
  const { data: authData, loading: authLoading } = useCheckAuth();
  const router = useRouter();
  const username = authData?.getUser?.username;
  const profile = authData?.getUser?.profile;
  const user_profile_id = authData?.getUser?.profile?.id;

  const [viewBuddyNoti, {}] = useViewBuddyNotificationsMutation();
  const [viewChatNoti, {}] = useViewMessageMutation();
  const [viewNoti, {}] = useViewNotificationMutation();

  const [newBuddyNotiCount, setNewBuddyNotiCount] = useState<number>(0);
  const [newChatNotiCount, setNewChatNotiCount] = useState<number>(0);
  const [newNotiCount, setNewNotiCount] = useState<number>(0);
  const [hiddenBuddyNotification, setHiddenBuddyNotification] = useState<
    string | undefined
  >("hidden");

  const [hiddenChatNotification, setHiddenChatNotification] = useState<
    string | undefined
  >("hidden");
  const [hiddenNotification, setHiddenNotification] = useState<
    string | undefined
  >("hidden");

  const toggleBuddyNotification = async (
    countNotViewedBuddyNotifications: number | null | undefined
  ) => {
    if (hiddenBuddyNotification === "hidden")
      setHiddenBuddyNotification(undefined);
    if (hiddenBuddyNotification === undefined)
      setHiddenBuddyNotification("hidden");
    if (
      countNotViewedBuddyNotifications &&
      countNotViewedBuddyNotifications > 0
    ) {
      await viewBuddyNoti({
        variables: {
          where: {
            profile_id: user_profile_id as string,
          },
        },
      });
    }

    setNewBuddyNotiCount(0);
    setHiddenNotification("hidden");
    setHiddenChatNotification("hidden");
  };

  const toggleChatNotification = async (
    countNotViewedChatNotifications: number | null | undefined
  ) => {
    if (hiddenChatNotification === "hidden")
      setHiddenChatNotification(undefined);
    if (hiddenChatNotification === undefined)
      setHiddenChatNotification("hidden");

    if (
      countNotViewedChatNotifications &&
      countNotViewedChatNotifications > 0
    ) {
      await viewChatNoti({
        variables: {
          where: {
            profile_id: user_profile_id as string,
          },
        },
      });
    }

    setNewChatNotiCount(0);
    setHiddenNotification("hidden");
    setHiddenBuddyNotification("hidden");
  };

  const toggleNotification = async (
    countNotViewNotification: number | null | undefined
  ) => {
    if (hiddenNotification === "hidden") setHiddenNotification(undefined);
    if (hiddenNotification === undefined) setHiddenNotification("hidden");
    if (countNotViewNotification && countNotViewNotification > 0) {
      await viewNoti({
        variables: {
          where: {
            profile_id: user_profile_id as string,
          },
        },
      });
    }
    setNewNotiCount(0);
    setHiddenBuddyNotification("hidden");
    setHiddenChatNotification("hidden");
  };

  const [showModal, setShowModal] = useState<boolean>(false);
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

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
        <Link href="/find">
          <a
            className={` ml-10 text-sm font-medium ${
              router.route == "/find"
                ? `text-blue-700`
                : `text-gray-800 hover:text-blue-700`
            }`}
          >
            Find
          </a>
        </Link>
      </div>
      {authLoading ? (
        <Loading />
      ) : router.route == "/login" ||
        router.route == "/register" ||
        router.route == "/logout" ? null : authData?.getUser ? (
        <div className="flex justify-around">
          <BuddyNotiNavBarButton
            user_profile_id={user_profile_id}
            newBuddyNotiCount={newBuddyNotiCount}
            setNewBuddyNotiCount={setNewBuddyNotiCount}
            toggle={toggleBuddyNotification}
            hidden={hiddenBuddyNotification}
          />
          {router.route === "/chat" ||
          router.route === "/chat/[conversationId]" ? null : (
            <ChatNotiNavBarButton
              user_profile_id={user_profile_id}
              newChatNotiCount={newChatNotiCount}
              setNewChatNotiCount={setNewChatNotiCount}
              toggle={toggleChatNotification}
              hidden={hiddenChatNotification}
            />
          )}

          {/* <NotiNavBarButton
            user_profile_id={user_profile_id}
            newNotiCount={newNotiCount}
            setNewNotiCount={setNewNotiCount}
            toggle={toggleNotification}
            hidden={hiddenNotification}
          /> */}

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
