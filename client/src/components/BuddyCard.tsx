import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import ReactModal from "react-modal";
import {
  ProfileFragment,
  RelationshipFragment,
  useGetProfileLazyQuery,
} from "../generated/graphql";
import Avatar from "./Avatar";
import ProfilePage from "./ProfilePage";
import MessageButton from "./MessageButton";
interface BuddyCardProps {
  relationshipData: RelationshipFragment | undefined;
}
const BuddyCard = ({ relationshipData }: BuddyCardProps) => {
  const router = useRouter();
  const [getProfile, { data: GetProfileData, loading: GetProfileLoading }] =
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
    router.push(`/buddies`, undefined, { shallow: true });
  };
  const profile = relationshipData?.addressee;
  const profile_id = profile?.id;
  const avatar = profile?.profile_avatar;
  const username = profile?.user?.username;
  const interests = profile?.profile_interests;
  const conversation_id = relationshipData?.conversation_id;
  const requester_id = relationshipData?.requester_id;
  const addressee_id = relationshipData?.addressee_id;
  return (
    <div className="flex flex-col w-full p-4 transition duration-300 ease-in-out delay-150 bg-white shadow-xl rounded-xl h-60 hover:bg-blue-800 hover:text-white">
      <div className="flex flex-col items-center h-30">
        <Avatar img_url={avatar} width={50} height={50} />
        <div className="self-center mx-2 text-xl ">{username}</div>
      </div>
      <div className="flex flex-col items-center h-1/3">
        <span>Finding buddy for</span>
        <div className="flex">
          {!interests
            ? null
            : interests.map((interest, index) => {
                return (
                  <div
                    key={index}
                    className="h-5 px-3 mt-3 mx-1.5 text-sm font-semibold text-center text-gray-800 bg-gray-100 rounded-xl  shadow-sm shadow-gray-500"
                  >
                    {interest?.interest.interest_name}
                  </div>
                );
              })}
        </div>
      </div>
      <div className="flex items-center justify-center mt-3 h-1/3">
        <Link href={`/buddies`} as={`/profile/${profile_id}`}>
          <a
            className="h-10 px-3 py-1 text-sm font-medium leading-6 text-gray-700 bg-gray-100 rounded shadow-sm shadow-gray-300"
            onClick={() => openModal(profile_id!)}
          >
            View profile
          </a>
        </Link>
        <MessageButton
          conversation_id={conversation_id}
          requester_id={requester_id}
          addressee_id={addressee_id}
        />
      </div>

      <ReactModal isOpen={showModal} onRequestClose={closeModal}>
        <button type="button" onClick={closeModal}>
          X
        </button>
        <ProfilePage data={GetProfileData} loading={GetProfileLoading} />
      </ReactModal>
    </div>
  );
};

export default BuddyCard;
