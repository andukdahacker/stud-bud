import Image from "next/image";
import defaultAvatar from "../assets/default-avatar.jpg";
interface ProfileCardProps {
  username: string;
  interests: { interest_name: string }[] | undefined;
}

const ProfileCard = (props: ProfileCardProps) => {
  return (
    <div className="flex flex-col w-full p-4 transition duration-300 ease-in-out delay-150 bg-white shadow-xl rounded-xl h-60 hover:bg-blue-800 hover:text-white">
      <div className="flex flex-col items-center h-30">
        <Image
          src={defaultAvatar}
          className="rounded-full "
          layout="fixed"
          height={50}
          width={50}
        />
        <div className="self-center mx-2 text-xl ">{props.username}</div>
      </div>
      <div className="flex flex-col items-center h-1/3">
        <span>Finding buddy for</span>
        <div className="flex">
          {!props.interests
            ? null
            : props.interests.map((interest, index) => {
                return (
                  <div
                    key={index}
                    className="h-5 px-3 m-2 text-sm font-semibold text-center text-gray-800 bg-gray-100 shadow-sm rounded-xl shadow-gray-300"
                  >
                    #{interest.interest_name}
                  </div>
                );
              })}
        </div>
      </div>
      <div className="flex items-center justify-center mt-3 h-1/3">
        <button className="h-10 px-3 py-1 text-sm font-medium leading-6 text-gray-700 bg-gray-100 rounded shadow-sm shadow-gray-300">
          View profile
        </button>
        <button className="h-10 px-3 py-1 ml-5 text-sm font-medium leading-6 text-white bg-blue-700 rounded shadow-sm shadow-blue-300">
          Add
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
