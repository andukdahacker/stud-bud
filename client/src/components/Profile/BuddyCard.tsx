import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  RelationshipFragment,
  useGetProfileLazyQuery,
} from "../../generated/graphql";
import Avatar from "./Avatar";
import Modal from "../Modals/Modal";
import ProfilePage from "./ProfilePage";
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

  return (
    <div className="">
      <div className="">
        <Avatar img_url={avatar} />
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

      <Modal isOpen={showModal} onRequestClose={closeModal}>
        <button type="button" onClick={closeModal}>
          X
        </button>
        <ProfilePage data={GetProfileData} loading={GetProfileLoading} />
      </Modal>
    </div>
  );
};

export default BuddyCard;
