import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import ReactModal from "react-modal";
import {
  TutorOrderTutorConnectFragment,
  TutorOrderTutorConnectStatusCode,
  useGetProfileLazyQuery,
  useRespondTutorOrderConnectMutation,
} from "../generated/graphql";
import Avatar from "./Avatar";
import Loading from "./Loading";
import ProfilePage from "./ProfilePage";

interface TutorOrderRequestCardProps {
  data: TutorOrderTutorConnectFragment | undefined | null;
}
const TutorOrderRequestCard = ({ data }: TutorOrderRequestCardProps) => {
  const router = useRouter();
  const tutor = data?.tutor;
  const tutor_order_id = data?.tutor_order_id;
  const profile_id = tutor?.id;

  const profile_avatar = tutor?.profile_avatar;
  const username = tutor?.user?.username;

  const [getProfile, { data: GetProfileData, loading: GetProfileLoading }] =
    useGetProfileLazyQuery();

  const [
    respond,
    {
      data: RespondTutorOrderRequestData,
      loading: RespondTutorOrderRequestLoading,
    },
  ] = useRespondTutorOrderConnectMutation();

  const respondSuccess =
    RespondTutorOrderRequestData?.respondTutorOrderConnect?.IOutput.success;
  const respondMessage =
    RespondTutorOrderRequestData?.respondTutorOrderConnect?.IOutput.message;

  const respondTutorOrderRequest = async (
    option: TutorOrderTutorConnectStatusCode
  ) => {
    await respond({
      variables: {
        where: {
          id: tutor_order_id as string,
        },
        input: {
          tutor_id: profile_id as string,
          status: option,
        },
      },
    });
  };

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
      <div className="cursor-pointer" onClick={() => openModal(profile_id!)}>
        <Avatar img_url={profile_avatar} width={40} height={40} />
        <div>{username}</div>
      </div>
      {RespondTutorOrderRequestLoading ? (
        <Loading />
      ) : respondSuccess ? (
        <div>{respondMessage}</div>
      ) : (
        <div>
          <button
            type="button"
            onClick={() =>
              respondTutorOrderRequest(
                TutorOrderTutorConnectStatusCode.Accepted
              )
            }
          >
            Accept
          </button>
          <button
            type="button"
            onClick={() =>
              respondTutorOrderRequest(
                TutorOrderTutorConnectStatusCode.Declined
              )
            }
          >
            Decline
          </button>
        </div>
      )}

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
