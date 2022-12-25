import { useState } from "react";
import { ProfileFragment } from "../../generated/graphql";
import { getAge } from "../../utils/getAge";
import EditAgeLocation from "../Forms/EditAgeLocation";
import Modal from "../Modals/Modal";

interface AgeLocationProps {
  profile: ProfileFragment;
  isProfileOwner: boolean;
}

const AgeLocation = ({ profile, isProfileOwner }: AgeLocationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const onRequestClose = () => setIsOpen(false);
  const birthday = profile.birthday;
  const location_name = profile.location?.location_name;

  return (
    <>
      <div className="flex">
        <div>{getAge(birthday) ?? <div>Age</div>}</div>
        <div>
          {location_name ? (
            <span> - {location_name}</span>
          ) : (
            <div> - Location</div>
          )}
        </div>
        {isProfileOwner ? (
          <div
            onClick={() => {
              openModal();
            }}
          >
            Edit
          </div>
        ) : null}
      </div>

      <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
        <EditAgeLocation profile={profile} onRequestClose={onRequestClose} />
      </Modal>
    </>
  );
};

export default AgeLocation;
