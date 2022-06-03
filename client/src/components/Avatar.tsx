import Image from "next/image";
import defaultAvatar from "../assets/default-avatar.jpg";

interface AvatarProps {
  img_url: string | null | undefined;
  width: number | string;
  height: number | string;
}

const Avatar = (props: AvatarProps) => {
  return (
    <div className={`relative w-${props.width} h-${props.height}`}>
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
