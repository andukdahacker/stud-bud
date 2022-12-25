import { useState } from "react";
import { ProfileFragment } from "../../generated/graphql";
import EditIntroduction from "../Forms/EditIntroduction";
import Modal from "../Modals/Modal";

interface ProfileIntroductionProps {
  profile: ProfileFragment;
  isProfileOwner: boolean;
}

export const ProfileIntroduction = ({
  profile,
  isProfileOwner,
}: ProfileIntroductionProps) => {
  const profile_bio = profile.profile_bio;
  const profile_id = profile.id;
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const onRequestClose = () => setIsOpen(false);
  return (
    <>
      <div>
        <div>Introduction</div>
        {isProfileOwner ? <div onClick={openModal}>Edit</div> : null}
        <div>{profile_bio}</div>
      </div>

      <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
        <EditIntroduction
          profile_bio={profile_bio}
          profile_id={profile_id}
          onRequestClose={onRequestClose}
        />
      </Modal>
    </>
  );
};
