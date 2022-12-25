import { useState } from "react";
import { BuddyRequestFragment, useGetUserQuery } from "../../generated/graphql";
import { getAge } from "../../utils/getAge";
import EditBuddyRequest from "../Forms/EditBuddyRequest";
import Loading from "../Loading/Loading";
import Modal from "../Modals/Modal";
import Avatar from "../Profile/Avatar";
import BuddyRequestDetails from "./BuddyRequestDetails";

interface BuddyRequestCardProps {
  data: BuddyRequestFragment;
}

const BuddyRequestCard = ({ data }: BuddyRequestCardProps) => {
  const { data: GetUserData, loading: GetUserLoading } = useGetUserQuery();
  const user_profile_id = GetUserData?.getUser?.profile?.id;
  const profile_id = data.buddy_requester.id;
  const userIsRequester = user_profile_id == profile_id;
  const username = data.buddy_requester.user?.username;
  const birthday = data.buddy_requester.birthday;
  const location_name = data.buddy_requester.location?.location_name;
  const profile_avatar = data.buddy_requester.profile_avatar;
  const purpose_name = data.purpose.purpose_name;
  const purpose_type_name = data.purpose_type.purpose_type_name;
  const description = data.description;
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const openDetail = () => {
    setIsOpenDetail(true);
  };

  const onRequestCloseDetail = () => {
    setIsOpenDetail(false);
  };

  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const openEdit = () => setIsOpenEdit(true);
  const onRequestCloseEdit = () => setIsOpenEdit(false);
  if (GetUserLoading) return <Loading />;
  return (
    <>
      <div
        onClick={openDetail}
        className="flex items-center w-full p-2 border-b border-1 sm:rounded-md sm:w-56 sm:h-56 md:w-64 md:h-72 sm:border-2 sm:border-black sm:items-start sm:flex-col"
      >
        <div className="flex items-center mb-2">
          <Avatar img_url={profile_avatar} />
          <div className="ml-2">
            <div>{username}</div>
            <div>
              {getAge(birthday)} - {location_name}
            </div>
          </div>
        </div>
        <div className="ml-5 sm:ml-0 ">
          <div className="px-2 py-1 text-center border-2 border-black rounded-md text-blue w-fit">
            {purpose_name}
          </div>
          <div className="px-2 py-1 my-2 text-center border-2 border-black rounded-md w-fit">
            {purpose_type_name}
          </div>
        </div>

        <div className="hidden truncate md:flex">{description}</div>
        {userIsRequester ? (
          <button type="button" onClick={openEdit}>
            Edit
          </button>
        ) : null}
      </div>

      <Modal isOpen={isOpenEdit} onRequestClose={onRequestCloseEdit}>
        <EditBuddyRequest buddy_request={data} />
      </Modal>

      <Modal isOpen={isOpenDetail} onRequestClose={onRequestCloseDetail}>
        <BuddyRequestDetails buddyRequest={data} />
      </Modal>
    </>
  );
};

export default BuddyRequestCard;
