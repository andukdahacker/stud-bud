import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import logo from "../../public/Logo.png";
import {
  useViewBuddyNotificationsMutation,
  useViewMessageMutation,
  useViewNotificationMutation,
} from "../generated/graphql";
import { useCheckAuth } from "../utils/useCheckAuth";
import Avatar from "./Avatar";
import LogOut from "./Logout";

import BuddyNotiNavBarButton from "./BuddyNotiNavBarButton";
import ChatNotiNavBarButton from "./ChatNotiNavBarButton";
import Loading from "./Loading";
import Modal from "./Modal";

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
  const [hiddenButtons, setHiddenButtons] = useState<string | undefined>(
    "hidden"
  );

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
    setHiddenButtons("hidden");
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

    setHiddenButtons("hidden");
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

    setHiddenButtons("hidden");
  };

  const toggleButtons = () => {
    if (hiddenButtons === "hidden") setHiddenButtons(undefined);
    if (hiddenButtons === undefined) setHiddenButtons("hidden");

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
    <div className="flex items-center justify-between px-5 py-2 border-b border-black font-lexend ">
      <Link href="/">
        <a className="flex items-center justify-center">
          <Image src={logo} />
          <div className="pl-5">
            <div className="text-2xl tracking-wider font-lexendZetta">
              SPARK<span className=" text-blue">LE</span>
              <div className="text-base tracking-normal font-lexend">
                Spark up your learning journey
              </div>
            </div>
          </div>
        </a>
      </Link>

      <Link href="/spark-buddies/find">
        <a
          className={`${
            router.route == "/spark-buddies/find" ||
            router.route == "/spark-buddies/buddies"
              ? "text-white bg-black px-2 py-1 "
              : null
          } font-bold`}
        >
          SPARK BUDDY
        </a>
      </Link>
      {authLoading ? (
        <Loading />
      ) : router.route == "/login" ||
        router.route == "/register" ||
        router.route == "/logout" ? null : authData?.getUser ? (
        <div className="flex items-center justify-center">
          {profile ? (
            <BuddyNotiNavBarButton
              user_profile_id={user_profile_id}
              newBuddyNotiCount={newBuddyNotiCount}
              setNewBuddyNotiCount={setNewBuddyNotiCount}
              toggle={toggleBuddyNotification}
              hidden={hiddenBuddyNotification}
            />
          ) : null}

          {router.route === "/chat" ||
          router.route === "/chat/[conversationId]" ||
          !profile ? null : (
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

          <div onClick={toggleButtons} className="relative cursor-pointer">
            <Avatar img_url={profile?.profile_avatar} />
            <div
              className={`${hiddenButtons} absolute -bottom-16 -left-8 z-10 bg-white border-black border w-max flex flex-col justify-around items-center p-2`}
            >
              <Link
                href={profile ? `/profile/${profile.id}` : "/create-profile"}
              >
                <a>My Profile</a>
              </Link>
              <button onClick={openModal} className="">
                Log out
              </button>
            </div>
          </div>

          <Modal isOpen={showModal} onRequestClose={closeModal}>
            <LogOut>
              <button
                onClick={closeModal}
                className="px-2 py-1 font-bold border-2 border-black"
              >
                No
              </button>
            </LogOut>
          </Modal>
        </div>
      ) : (
        <div className="">
          <Link href="/register">
            <a className="px-2 py-1 mr-4 font-bold border-2 border-black ">
              SIGN UP
            </a>
          </Link>
          <Link href="/login">
            <a className="px-2 py-1 font-bold text-white border-2 border-black bg-purple">
              SIGN IN
            </a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
