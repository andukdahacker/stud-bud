import Avatar from "./Avatar";
import ReactModal from "react-modal";
import { useState } from "react";
import {
  ProfileFragment,
  RelationshipFragment,
  useGetProfileLazyQuery,
} from "../generated/graphql";
import ProfilePage from "./ProfilePage";
import { useRouter } from "next/router";
import Link from "next/link";
import MessageButton from "./MessageButton";

interface ProfileCardProps {
  id?: string;
  username?: string;
  avatar?: string;
  interests?: { interest_name: string }[];
  profileData: ProfileFragment | undefined | null;
  relationshipData?: RelationshipFragment | undefined;
}

const ProfileCard = ({ profileData, relationshipData }: ProfileCardProps) => {
  const avatar = profileData?.profile_avatar;
  const id = profileData?.id;
  const username = profileData?.user?.username;
  const interests = profileData?.profile_interests;
  const conversation_id = relationshipData?.conversation_id;
  const requester_id = relationshipData?.requester_id;
  const addressee_id = relationshipData?.addressee_id;
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
    router.push(`/spark-buddies/find`, undefined, { shallow: true });
  };

  return (
    <div className=" w-full h-[15rem] p-3 border-2 border-black ">
      <div className="flex h-full ">
        <div className="w-1/6 ">
          <Avatar img_url={avatar} width={14} height={14} />
        </div>
        <div className="flex flex-col w-5/6 h-full ml-5 font-light">
          <div className="flex items-center h-1/5">
            <b>{username}</b>
          </div>

          <div className=" h-2/5">
            <span className="">Finding buddy for</span>
            <div className="flex flex-wrap items-center h-full pb-5 overflow-auto ">
              {!interests
                ? null
                : interests.map((interest, index) => {
                    return (
                      <div
                        key={index}
                        className="px-2 py-1 my-1 mr-2 bg-gray-200 h-fit w-fit"
                      >
                        {interest?.interest.interest_name}
                      </div>
                    );
                  })}
            </div>
          </div>
          <div className="flex items-center h-2/5">
            {relationshipData ? (
              <MessageButton
                conversation_id={conversation_id}
                requester_id={requester_id}
                addressee_id={addressee_id}
              />
            ) : (
              <button
                type="button"
                className="px-5 py-1 mr-3 font-semibold border-2 border-black bg-blue"
              >
                + ADD
              </button>
            )}

            <Link href={`/spark-buddies/find`} as={`/profile/${id}`}>
              <a>
                <button
                  className="px-5 py-1 font-semibold border-2 border-black "
                  onClick={() => openModal(id!)}
                >
                  VIEW
                </button>
              </a>
            </Link>
          </div>
        </div>
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
