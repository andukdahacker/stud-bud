import Image from "next/image";
import defaultAvatar from "../assets/default-avatar.jpg";

interface AvatarProps {
  img_url: string | null | undefined;
}

const Avatar = (props: AvatarProps) => {
  return (
    <div className="relative w-20 h-20">
      <Image
        src={props.img_url ? props.img_url : defaultAvatar}
        className="rounded-full"
        layout="fill"
        priority
      />
    </div>
  );
};

export default Avatar;
