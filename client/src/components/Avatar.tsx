import Image from "next/image";
import defaultAvatar from "../assets/default-avatar.jpg";

interface AvatarProps {
  img_url?: string;
}

const Avatar = (props: AvatarProps) => {
  return (
    <div>
      <Image
        src={props.img_url ? props.img_url : defaultAvatar}
        className="rounded-full "
        layout="fixed"
        height={50}
        width={50}
      />
    </div>
  );
};

export default Avatar;
