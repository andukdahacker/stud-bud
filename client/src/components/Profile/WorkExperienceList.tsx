import { useState } from "react";
import { ProfileFragment } from "../../generated/graphql";
import AddWorkExperience from "../Forms/AddWorkExperience";
import Modal from "../Modals/Modal";
import WorkExperience from "./WorkExperience";

interface WorkExperienceListProps {
  isProfileOwner: boolean;
  profile: ProfileFragment;
}

const WorkExperienceList = ({
  isProfileOwner,
  profile,
}: WorkExperienceListProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const onRequestClose = () => setIsOpen(false);
  const work_experience = profile.work_experience;
  const profile_id = profile.id;

  return (
    <>
      <div>
        <div>Working Experience</div>
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
          {!work_experience || work_experience.length < 1 ? (
            <div>No work experience</div>
          ) : (
            work_experience.map((work_experience, index) => {
              return (
                <WorkExperience
                  profile_id={profile_id}
                  work_experience={work_experience!}
                  key={index}
                />
              );
            })
          )}
        </div>
      </div>

      <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
        <AddWorkExperience profile_id={profile_id} />
      </Modal>
    </>
  );
};

export default WorkExperienceList;
