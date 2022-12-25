import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import logo from "../../../public/Logo.png";
import {
  useViewBuddyNotificationsMutation,
  useViewMessageMutation,
} from "../../generated/graphql";
import { useCheckAuth } from "../../utils/useCheckAuth";
import Avatar from "../Profile/Avatar";
import LogOut from "../Forms/Logout";

import BuddyNotiNavBarButton from "./BuddyNotiNavBarButton";
import ChatNotiNavBarButton from "./ChatNotiNavBarButton";
import Loading from "../Loading/Loading";
import Modal from "../Modals/Modal";
import { HiMenu, HiOutlineLogout, HiOutlineUserGroup } from "react-icons/hi";
import NavBarSidebar from "./NavBarSideBar";

const NavBar = () => {
  const { data: authData, loading: authLoading } = useCheckAuth();
  const router = useRouter();
  const profile = authData?.getUser?.profile;
  const user_profile_id = authData?.getUser?.profile?.id;
  const [sideBar, setSideBar] = useState(false);
  const [viewBuddyNoti, {}] = useViewBuddyNotificationsMutation();
  const [viewChatNoti, {}] = useViewMessageMutation();

  const [newBuddyNotiCount, setNewBuddyNotiCount] = useState<number>(0);
  const [newChatNotiCount, setNewChatNotiCount] = useState<number>(0);

  const [hiddenBuddyNotification, setHiddenBuddyNotification] = useState<
    string | undefined
  >("hidden");

  const [hiddenChatNotification, setHiddenChatNotification] = useState<
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

    setHiddenBuddyNotification("hidden");
  };

  const [showModal, setShowModal] = useState<boolean>(false);
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const SparkBuddyNavBarButton = () => {
    return (
      <>
        <Link href="/spark-buddies/find-buddy">
          <a
            className={
              router.route == "/spark-buddies/find-buddy" ||
              router.route == "/spark-buddies/your-buddy-requests" ||
              router.route == "/sparkl-buddies/create-buddy-request"
                ? " text-white bg-black px-2 py-1 flex font-bold uppercase items-center justify-center rounded-md"
                : "flex text-black uppercase font-bold items-center justify-center"
            }
          >
            <HiOutlineUserGroup size={30} />
            <div className="ml-5">Spark buddy</div>
          </a>
        </Link>
      </>
    );
  };

  const BuddyNoti = () => {
    if (!profile) return null;
    return (
      <BuddyNotiNavBarButton
        user_profile_id={user_profile_id}
        newBuddyNotiCount={newBuddyNotiCount}
        setNewBuddyNotiCount={setNewBuddyNotiCount}
        toggle={toggleBuddyNotification}
        hidden={hiddenBuddyNotification}
      />
    );
  };

  const ChatNoti = () => {
    if (
      router.route == "/chat" ||
      router.route == "/chat/[conversationId]" ||
      !profile
    )
      return null;
    return (
      <ChatNotiNavBarButton
        user_profile_id={user_profile_id}
        newChatNotiCount={newChatNotiCount}
        setNewChatNotiCount={setNewChatNotiCount}
        toggle={toggleChatNotification}
        hidden={hiddenChatNotification}
      />
    );
  };

  const NavBarActions = () => {
    if (authLoading) return <Loading />;
    if (router.route == "/login" || router.route == "/register") return null;

    if (authData?.getUser)
      return (
        <>
          <div className="flex items-center justify-between w-full ">
            <BuddyNoti />

            <ChatNoti />

            <Link href={profile ? `/profile/${profile.id}` : "/create-profile"}>
              <a>
                <Avatar
                  img_url={profile?.profile_avatar}
                  width={3}
                  height={3}
                />
              </a>
            </Link>
            <button onClick={openModal}>
              <HiOutlineLogout size={30} />
            </button>
          </div>
          <Modal isOpen={showModal} onRequestClose={closeModal}>
            <LogOut>
              <button onClick={closeModal} className="whiteButton">
                No
              </button>
            </LogOut>
          </Modal>
        </>
      );

    return (
      <div className="hidden md:flex">
        <Link href="/register">
          <a className="px-2 py-1 mr-4 font-bold border-2 border-black rounded-md min-w-fit ">
            SIGN UP
          </a>
        </Link>
        <Link href="/login">
          <a className="px-2 py-1 font-bold text-white border-2 border-black rounded-md min-w-fit bg-purple">
            SIGN IN
          </a>
        </Link>
      </div>
    );
  };

  return (
    <div className="flex items-center justify-between w-full h-20 p-4 border-b border-black">
      <Link href="/">
        <a className="flex items-center justify-start md:basis-1/4">
          <Image src={logo} width={40} height={60} />
        </a>
      </Link>

      <div className="hidden md:flex md:basis-2/4 md:justify-center md:items-center">
        <SparkBuddyNavBarButton />
      </div>

      <div className="hidden md:flex md:justify-center md:items-center md:basis-1/4 ">
        <NavBarActions />
      </div>

      <div
        className={
          sideBar ? "hidden" : "flex items-center justify-around md:hidden "
        }
      >
        <HiMenu size={30} onClick={() => setSideBar(!sideBar)} />
      </div>
      <NavBarSidebar
        authData={authData}
        sideNav={sideBar}
        setSideNav={setSideBar}
      />
    </div>
  );
};

export default NavBar;
