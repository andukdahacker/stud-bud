import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCheckAuth } from "../utils/useCheckAuth";
import logo from "../assets/Mark.jpg";
import { useState } from "react";
import ReactModal from "react-modal";
import LogOut from "./Logout";
import Avatar from "./Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NotificationBar from "./NotificationBar";

const NavBar = () => {
  const { data: authData, loading: authLoading } = useCheckAuth();
  const router = useRouter();
  const username = authData?.getUser?.username;
  const profile = authData?.getUser?.profile;

  const [showModal, setShowModal] = useState<boolean>(false);
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const [hidden, setHidden] = useState<string | undefined>("hidden");
  const toggleNotification = () => {
    if (hidden === "hidden") setHidden(undefined);
    if (hidden === undefined) setHidden("hidden");
  };

  return (
    <div className="flex items-center justify-between px-10 py-5 bg-white ">
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
          <FontAwesomeIcon
            icon="bell"
            size="1x"
            onClick={
              router.pathname === "/notifications"
                ? () => {}
                : toggleNotification
            }
            className={
              router.pathname === "/notifications"
                ? " bg-blue-400"
                : "cursor-pointer"
            }
          />
          <div className={`${hidden} overflow-auto fixed bg-white top-20 z-10`}>
            <NotificationBar />
          </div>
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
