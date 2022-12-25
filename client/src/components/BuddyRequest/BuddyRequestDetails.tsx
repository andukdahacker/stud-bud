import Link from "next/link";
import { BuddyRequestFragment } from "../../generated/graphql";
import Avatar from "../Profile/Avatar";
import BuddyButton from "../Profile/BuddyButton";
import { getAge } from "../../utils/getAge";
import MessageButton from "../Profile/MessageButton";

interface BuddyRequestDetailsProps {
  buddyRequest: BuddyRequestFragment;
}

const BuddyRequestDetails = ({ buddyRequest }: BuddyRequestDetailsProps) => {
  const profile = buddyRequest.buddy_requester;
  const profileAvatar = profile?.profile_avatar;
  const username = buddyRequest.buddy_requester.user?.username;
  const birthday = buddyRequest.buddy_requester.birthday;
  const location_name = buddyRequest.buddy_requester.location?.location_name;
  const purpose_name = buddyRequest.purpose.purpose_name;
  const purpose_type_name = buddyRequest.purpose_type.purpose_type_name;
  const description = buddyRequest.description;

  const profile_view = () => (
    <div className="w-full h-full p-5">
      <Avatar img_url={profileAvatar} />
      <div>{username}</div>
      <div>
        {getAge(birthday)} - {location_name}
      </div>
      <Link href={`/profile/${profile.id}`}>
        <a>View profile</a>
      </Link>
    </div>
  );

  const purpose_view = () => (
    <div>
      <div>{purpose_name}</div>
      <div>{purpose_type_name}</div>
    </div>
  );

  const description_view = () => (
    <div>
      <div>Description:</div>
      {description}
    </div>
  );

  const actions_view = () => (
    <div className="flex">
      <div className="mr-5">
        <BuddyButton profile_id={profile.id} />
      </div>

      <MessageButton profile_id={profile.id} />
    </div>
  );

  return (
    <>
      <div className="grid w-[calc(100vw_-_6rem)] h-full bg-white border border-black">
        <div>{profile_view()}</div>
        <div>{purpose_view()}</div>
        <div>{description_view()}</div>
        <div>{actions_view()}</div>
      </div>
    </>
  );
};

export default BuddyRequestDetails;
