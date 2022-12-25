import { useState } from "react";
import { ProfileFragment } from "../../generated/graphql";
import AddEducation from "../Forms/AddEducation";

import Modal from "../Modals/Modal";
import Education from "./Education";

interface EducationListProps {
  isProfileOwner: boolean;
  profile: ProfileFragment;
}

const EducationList = ({ isProfileOwner, profile }: EducationListProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const onRequestClose = () => setIsOpen(false);
  const education = profile.education;
  const profile_id = profile.id;
  return (
    <>
      <div>
        <div>Study Experience</div>
        {isProfileOwner ? (
          <div
            onClick={() => {
              openModal();
            }}
          >
            Add
          </div>
        ) : null}
        <div>
          {!education || education.length < 1 ? (
            <div>No education</div>
          ) : (
            education?.map((studyExperience, index) => {
              return (
                <Education
                  education={studyExperience!}
                  key={index}
                  profile_id={profile_id}
                />
              );
            })
          )}
        </div>
      </div>

      <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
        <AddEducation profile_id={profile_id} onRequestClose={onRequestClose} />
      </Modal>
    </>
  );
};

export default EducationList;
