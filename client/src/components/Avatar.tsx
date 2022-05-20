import Image from "next/image";
import defaultAvatar from "../assets/default-avatar.jpg";

interface AvatarProps {
  img_url: string | null | undefined;
}

const Avatar = (props: AvatarProps) => {
  return (
    <div>
      <Image
        src={props.img_url ? props.img_url : defaultAvatar}
        className="rounded-full "
        layout="fixed"
        height={70}
        width={70}
      />
    </div>
  );
};

export default Avatar;
