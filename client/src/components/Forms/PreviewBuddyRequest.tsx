import { FormikValues, useFormikContext } from "formik";
import { useGetUserQuery } from "../../generated/graphql";
import Loading from "../Loading/Loading";
import Avatar from "../Profile/Avatar";

const PreviewBuddyRequest = () => {
  const { values } = useFormikContext<FormikValues>();
  const { data: UserData, loading: UserLoading } = useGetUserQuery();
  const profile = UserData?.getUser?.profile;
  const profileAvatar = profile?.profile_avatar;
  const username = UserData?.getUser?.username;
  if (UserLoading) return <Loading />;
  return (
    <>
      <div className="flex flex-col items-center justify-start w-full h-full p-4 bg-yellow-200">
        <div>Preview</div>
        <div className="grid w-full h-full grid-cols-3 ">
          <div className="bg-orange-300 ">
            <Avatar img_url={profileAvatar} />
            <button type="button" onClick={() => {}}>
              View profile
            </button>
          </div>
          <div className="bg-pink-200">
            <div>{username}</div>
            <div>{values.purpose_name}</div>
            <div>{values.purpose_type_name}</div>
          </div>
          <div className="bg-green-200 ">
            <div>Request Information</div>
          </div>
          <div className="col-span-3 bg-indigo-400">{values.description}</div>
        </div>
      </div>
    </>
  );
};

export default PreviewBuddyRequest;
