import { useRef, useState } from "react";
import {
  useRemoveWallpaperMutation,
  useUpdateWallpaperMutation,
} from "../../generated/graphql";
import Loading from "../Loading/Loading";

interface EditProfileWallpaperProps {
  user_profile_id: string;
  profile_wallpaper_public_id: string | undefined | null;
}

const EditProfileWallpaper = ({
  user_profile_id,
  profile_wallpaper_public_id,
}: EditProfileWallpaperProps) => {
  const wallpaperInput = useRef<HTMLInputElement>(null);
  const [updateWallpaper, { loading: UpdateWallpaperLoading }] =
    useUpdateWallpaperMutation();
  const [removeWallpaper, { loading: RemoveWallpaperLoading }] =
    useRemoveWallpaperMutation();
  const [showEditCoverOptions, setShowEditCoverOptions] = useState(false);
  return (
    <>
      <div className="absolute bottom-0 inline-block w-32 h-20 text-center right-8">
        <div onClick={() => setShowEditCoverOptions(!showEditCoverOptions)}>
          Edit cover
        </div>
        <div
          style={{ display: showEditCoverOptions ? "block" : "none" }}
          className="block "
        >
          <input
            type="file"
            onChange={async (event) => {
              if (event.target.files)
                await updateWallpaper({
                  variables: {
                    where: {
                      profile_id: user_profile_id,
                    },
                    input: {
                      image_file: event.target.files[0],
                    },
                  },
                });
            }}
            className="hidden"
            ref={wallpaperInput}
          />
          <button
            disabled={UpdateWallpaperLoading}
            onClick={() => wallpaperInput.current!.click()}
          >
            {UpdateWallpaperLoading ? <Loading /> : <div>Change cover</div>}
          </button>
          <button
            disabled={RemoveWallpaperLoading}
            onClick={async () => {
              if (profile_wallpaper_public_id) {
                await removeWallpaper({
                  variables: {
                    where: {
                      profile_id: user_profile_id!,
                    },
                    input: {
                      img_public_id: profile_wallpaper_public_id,
                    },
                  },
                });
              }
            }}
          >
            {RemoveWallpaperLoading ? <Loading /> : <div>Remove wallpaper</div>}
          </button>
        </div>
      </div>
    </>
  );
};

export default EditProfileWallpaper;
