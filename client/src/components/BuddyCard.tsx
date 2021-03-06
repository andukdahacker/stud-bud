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
    <div className="">
      <div className="">
        <Avatar img_url={avatar} width={14} height={14} />
        <div className="">{username}</div>
      </div>
      <div className="">
        <span>Finding buddy for</span>
        <div className="flex">
          {!interests
            ? null
            : interests.map((interest, index) => {
                return (
                  <div key={index} className="">
                    {interest?.interest.interest_name}
                  </div>
                );
              })}
        </div>
      </div>
      <div className="">
        <Link href={`/spark-buddies/buddies`} as={`/profile/${profile_id}`}>
          <a className="" onClick={() => openModal(profile_id!)}>
            View profile
          </a>
        </Link>
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
