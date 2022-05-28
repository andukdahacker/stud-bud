import Avatar from "./Avatar";
import ReactModal from "react-modal";
import { useState } from "react";
import {
  GetUserDocument,
  GetUserQuery,
  RelationshipInput,
  RelationshipStatusCode,
  useConnectBuddyMutation,
  useGetProfileLazyQuery,
} from "../generated/graphql";
import ProfilePage from "./ProfilePage";
import { useRouter } from "next/router";
import Link from "next/link";
import { useApolloClient } from "@apollo/client";

interface ProfileCardProps {
  id?: string;
  username?: string;
  avatar?: string;
  interests?: { interest_name: string }[];
}

const ProfileCard = (props: ProfileCardProps) => {
  const router = useRouter();
  const [getProfile, { data: getProfileData, loading: getProfileLoading }] =
    useGetProfileLazyQuery();

  const [showModal, setShowModal] = useState<boolean>(false);

  const openModal = async (profile_id: string) => {
    setShowModal(true);
    await getProfile({
      variables: {
        where: {
          profile_id,
        },
      },
    });
  };

  const closeModal = () => {
    setShowModal(false);
    router.push(`/find-buddy`, undefined, { shallow: true });
  };

  return (
    <div className="flex flex-col w-full p-4 transition duration-300 ease-in-out delay-150 bg-white shadow-xl rounded-xl h-60 hover:bg-blue-800 hover:text-white">
      <div className="flex flex-col items-center h-30">
        <Avatar img_url={props.avatar} />
        <div className="self-center mx-2 text-xl ">{props.username}</div>
      </div>
      <div className="flex flex-col items-center h-1/3">
        <span>Finding buddy for</span>
        <div className="flex">
          {!props.interests
            ? null
            : props.interests.map((interest, index) => {
                return (
                  <div
                    key={index}
                    className="h-5 px-3 m-2 text-sm font-semibold text-center text-gray-800 bg-gray-100 shadow-sm rounded-xl shadow-gray-300"
                  >
                    #{interest.interest_name}
                  </div>
                );
              })}
        </div>
      </div>
      <div className="flex items-center justify-center mt-3 h-1/3">
        <Link href={`/find-buddy`} as={`/profile/${props.id}`}>
          <a
            className="h-10 px-3 py-1 text-sm font-medium leading-6 text-gray-700 bg-gray-100 rounded shadow-sm shadow-gray-300"
            onClick={() => openModal(props.id!)}
          >
            View profile
          </a>
        </Link>
        <button
          className="h-10 px-3 py-1 ml-5 text-sm font-medium leading-6 text-white bg-blue-700 rounded shadow-sm shadow-blue-300"
          type="button"
        >
          Add
        </button>
      </div>

      <ReactModal isOpen={showModal} onRequestClose={closeModal}>
        <button type="button" onClick={closeModal}>
          X
        </button>
        <ProfilePage data={getProfileData} loading={getProfileLoading} />
      </ReactModal>
    </div>
  );
};

export default ProfileCard;
