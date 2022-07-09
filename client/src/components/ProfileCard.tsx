import Avatar from "./Avatar";
import ReactModal from "react-modal";
import { useState } from "react";
import { useGetProfileLazyQuery } from "../generated/graphql";
import ProfilePage from "./ProfilePage";
import { useRouter } from "next/router";
import Link from "next/link";
import SuggestionCard from "./SuggestionCard";

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
    router.push(`/find`, undefined, { shallow: true });
  };

  return (
    <div className="flex flex-col w-full p-4 transition duration-300 ease-in-out delay-150 bg-white shadow-xl rounded-xl h-60 hover:bg-blue-800 hover:text-white">
      <div className="flex flex-col items-center h-30">
        <Avatar img_url={props.avatar} width={50} height={50} />
        <div className="self-center mx-2 text-xl ">{props.username}</div>
      </div>
      <div className="flex flex-col items-center h-1/3">
        <span>Finding buddy for</span>
        <div className="flex">
          {!props.interests
            ? null
            : props.interests.map((interest, index) => {
                return (
                  <SuggestionCard
                    key={index}
                    interest_name={interest?.interest_name as string}
                  />
                );
              })}
        </div>
      </div>
      <div className="flex items-center justify-center mt-3 h-1/3">
        <Link href={`/find`} as={`/profile/${props.id}`}>
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
          Connect
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
