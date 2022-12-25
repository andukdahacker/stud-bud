import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { SetStateAction, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import {
  // HiLogout,
  HiOutlineChat,
  HiOutlineLogin,
  HiOutlineLogout,
  HiOutlineUserGroup,
  HiOutlineUsers,
} from "react-icons/hi";
import { GetUserQuery } from "../../generated/graphql";
import LogOut from "../Forms/Logout";
import Modal from "../Modals/Modal";
import Avatar from "../Profile/Avatar";

interface NavBarSidebarProps {
  sideNav: boolean;
  setSideNav: (value: SetStateAction<boolean>) => void;
  authData?: GetUserQuery;
}

const NavBarSidebar = ({
  setSideNav,
  sideNav,
  authData,
}: NavBarSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const onRequestClose = () => setIsOpen(false);
  const profile = authData?.getUser?.profile;
  return (
    <>
      <AnimatePresence>
        {sideNav ? (
          <>
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              transition={{ duration: 0.5, type: "spring" }}
              className={
                "flex flex-col z-10 items-center justify-start h-screen absolute right-0 top-0 bg-white border-x border-black w-3/4 py-2 md:hidden"
              }
            >
              <button
                className="flex items-center justify-end w-full p-5 border-b border-black "
                onClick={() => setSideNav(false)}
              >
                <AiOutlineClose color={"black"} size={20} />
              </button>

              <Link href={"/spark-buddies/find-buddy"}>
                <a className="flex items-center justify-start w-full h-20 p-2 border-b border-black">
                  <HiOutlineUserGroup size={30} />
                  <div className="ml-5 uppercase">Spark Buddy</div>
                </a>
              </Link>
              {authData?.getUser ? (
                <>
                  <Link
                    href={
                      profile ? `/profile/${profile.id}` : "/create-profile"
                    }
                  >
                    <a className="flex items-center justify-start w-full h-20 p-2 border-b border-black">
                      <Avatar
                        img_url={profile?.profile_avatar}
                        width={3}
                        height={3}
                      />
                      <div className="ml-3">{authData.getUser.username}</div>
                    </a>
                  </Link>

                  <Link href={"/spark-buddies/add-buddy-requests"}>
                    <a className="flex items-center justify-start w-full h-20 p-2 border-b border-black">
                      <HiOutlineUsers size={30} />
                      <div className="ml-5">Your buddy requests</div>
                    </a>
                  </Link>
                  <Link href={"/chat"}>
                    <a className="flex items-center justify-start w-full h-20 p-2 border-b border-black">
                      <HiOutlineChat size={30} />
                      <div className="ml-5">Messages</div>
                    </a>
                  </Link>

                  <button
                    onClick={() => {
                      openModal();
                      setSideNav(false);
                    }}
                    className="flex items-center justify-start w-full h-20 p-2 border-b border-black"
                  >
                    <HiOutlineLogout size={30} />
                    <div className="ml-5">Log out</div>
                  </button>
                </>
              ) : (
                <Link href={"/login"}>
                  <a className="flex items-center justify-start w-full h-20 p-2 border-b border-black">
                    <HiOutlineLogin size={30} />
                    <div className="ml-5">Login</div>
                  </a>
                </Link>
              )}
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
      <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
        <LogOut>
          <button onClick={onRequestClose} className="whiteButton">
            No
          </button>
        </LogOut>
      </Modal>
    </>
  );
};

export default NavBarSidebar;
