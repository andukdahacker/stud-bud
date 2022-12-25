import { useRef, useState } from "react";
import {
  useRemoveAvatarMutation,
  useUpdateAvatarMutation,
} from "../../generated/graphql";
import Loading from "../Loading/Loading";

interface EditProfileAvatarProps {
  user_profile_id: string;
  profile_avatar_public_id: string | undefined | null;
}

const EditProfileAvatar = ({
  user_profile_id,
  profile_avatar_public_id,
}: EditProfileAvatarProps) => {
  const [removeAvatar, { loading: RemoveAvatarLoading }] =
    useRemoveAvatarMutation();

  const [showEditAvatarOptions, setShowEditAvatarOptions] = useState(false);

  const avatarInput = useRef<HTMLInputElement>(null);
  const [updateAvatar, { loading: UpdateAvatarLoading }] =
    useUpdateAvatarMutation();
  return (
    <div className="absolute inline-block w-32 h-20 text-center -bottom-5 -right-5">
      <div onClick={() => setShowEditAvatarOptions(!showEditAvatarOptions)}>
        Edit
      </div>
      <div
        style={{
          display: showEditAvatarOptions ? "block" : "none",
        }}
        className="block "
      >
        <input
          type="file"
          onChange={async (event) => {
            if (event.target.files)
              await updateAvatar({
                variables: {
                  where: {
                    profile_id: user_profile_id!,
                  },
                  input: {
                    image_file: event.target.files[0],
                  },
                },
              });
          }}
          className="hidden"
          ref={avatarInput}
        />
        <button
          type="button"
          onClick={() => avatarInput.current!.click()}
          disabled={UpdateAvatarLoading}
        >
          {UpdateAvatarLoading ? <Loading /> : <div>Change avatar</div>}
        </button>
        <button
          type="button"
          disabled={RemoveAvatarLoading}
          onClick={async () => {
            if (profile_avatar_public_id) {
              await removeAvatar({
                variables: {
                  where: {
                    profile_id: user_profile_id,
                  },
                  input: {
                    img_public_id: profile_avatar_public_id,
                  },
                },
              });
            }
          }}
        >
          {RemoveAvatarLoading ? <Loading /> : <div>Remove avatar</div>}
        </button>
      </div>
    </div>
  );
};

export default EditProfileAvatar;
