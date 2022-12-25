import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import ReactModal from "react-modal";
import { useGetTutorOrderLazyQuery } from "../../generated/graphql";
import Avatar from "../Profile/Avatar";
import TutorOrderPage from "./TutorOrderPage";

interface TutorOrderCardProps {
  tutor_order_id: string;
  username: string | undefined;
  problem: string;
  tutor_requirements: string;
  profile_avatar: string | undefined | null;
  tutor_order_interests: { interest_name: string }[] | undefined;
}

const TutorOrderCard = ({
  tutor_order_id,
  username,
  problem,
  tutor_requirements,
  profile_avatar,
  tutor_order_interests,
}: TutorOrderCardProps) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [
    getTutorOrder,
    { data: GetTutorOrderData, loading: GetTutorOrderLoading },
  ] = useGetTutorOrderLazyQuery();

  const openModal = async (tutor_order_id: string) => {
    setShowModal(true);
    await getTutorOrder({
      variables: {
        where: {
          id: tutor_order_id,
        },
      },
      fetchPolicy: "cache-and-network",
    });
  };

  const closeModal = () => {
    setShowModal(false);
    router.push(`/find`, undefined, { shallow: true });
  };
  return (
    <div className="flex flex-col w-full p-4 transition duration-300 ease-in-out delay-150 bg-white shadow-xl rounded-xl h-60 hover:bg-blue-800 hover:text-white">
      <div className="flex flex-col items-center h-30">
        <Avatar img_url={profile_avatar} />
        <div className="self-center mx-2 text-xl ">{username}</div>
      </div>
      <div className="flex flex-col items-center h-1/3">
        <div>Problem: {problem}</div>
        <div>Tutor requirements: {tutor_requirements}</div>

        <div className="flex">
          {!tutor_order_interests
            ? null
            : tutor_order_interests.map((interest, index) => {
                return (
                  <div
                    key={index}
                    className="h-5 px-3 mt-3 mx-1.5 text-sm font-semibold text-center text-gray-800 bg-gray-100 rounded-xl  shadow-sm shadow-gray-500"
                  >
                    {interest.interest_name}
                  </div>
                );
              })}
        </div>
      </div>
      <div className="flex items-center justify-center mt-3 h-1/3">
        <Link href={`/find`} as={`/one-hour-tutor/${tutor_order_id}`}>
          <a
            className="h-10 px-3 py-1 text-sm font-medium leading-6 text-gray-700 bg-gray-100 rounded shadow-sm shadow-gray-300"
            onClick={() => openModal(tutor_order_id!)}
          >
            View order
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
        <TutorOrderPage
          data={GetTutorOrderData}
          loading={GetTutorOrderLoading}
        />
      </ReactModal>
    </div>
  );
};

export default TutorOrderCard;
