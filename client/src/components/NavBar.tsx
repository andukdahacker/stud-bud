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

  return (
    <div className="flex items-center justify-between px-10 py-5 bg-white shadow-md shadow-gray-200 ">
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
        <div className="flex">
          <div className="relative">
            <FontAwesomeIcon icon={"user-group"} size={"1x"} />
            <div>
              {profile?.buddyRequests?.map((request, index) => {
                return (
                  <div key={index}>
                    <div>
                      {request?.requester?.user?.username} sent a request to you
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <Link href={profile ? `/profile/${profile.id}` : "/create-profile"}>
            <a
              className={` flex  text-sm font-medium  ${
                router.asPath == `/profile/${profile?.id}`
                  ? `text-blue-700`
                  : `text-gray-800 hover:text-blue-700`
              }`}
            >
              <div className="w-10 h-10">
                <Avatar
                  img_url={profile?.profile_avatar}
                  width={"full"}
                  height={"full"}
                />
              </div>
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
