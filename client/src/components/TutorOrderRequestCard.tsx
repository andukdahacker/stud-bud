import { useRouter } from "next/router";
import { useState } from "react";
import ReactModal from "react-modal";
import {
  TutorOrderTutorConnectFragment,
  useGetProfileLazyQuery,
} from "../generated/graphql";
import Avatar from "./Avatar";
import ProfilePage from "./ProfilePage";
import TutorOrderRespondButton from "./TutorOrderRespondButton";

interface TutorOrderRequestCardProps {
  data: TutorOrderTutorConnectFragment | undefined | null;
}
const TutorOrderRequestCard = ({ data }: TutorOrderRequestCardProps) => {
  const router = useRouter();
  const tutor = data?.tutor;
  const tutor_id = tutor?.id;
  const tutor_order_id = data?.tutor_order_id;

  const status = data?.status;

  const profile_avatar = tutor?.profile_avatar;
  const username = tutor?.user?.username;

  const student = data?.tutor_order.student;
  const student_id = student?.id;
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
    router.push(`/one-hour-tutor/${tutor_order_id}`, undefined, {
      shallow: true,
    });
  };

  if (!data) return null;
  return (
    <div>
      <div className="cursor-pointer" onClick={() => openModal(tutor_id!)}>
        <Avatar img_url={profile_avatar} width={40} height={40} />
        <div>{username}</div>
      </div>
      <TutorOrderRespondButton
        status={status}
        tutor_order_id={tutor_order_id}
        tutor_id={tutor_id}
        student_id={student_id}
      />

      <ReactModal isOpen={showModal} onRequestClose={closeModal}>
        <button type="button" onClick={closeModal}>
          X
        </button>
        <ProfilePage data={GetProfileData} loading={GetProfileLoading} />
      </ReactModal>
    </div>
  );
};

export default TutorOrderRequestCard;
