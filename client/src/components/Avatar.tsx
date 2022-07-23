import Image from "next/image";
import defaultAvatar from "../public/default-avatar.jpg";

interface AvatarProps {
  img_url: string | null | undefined;
  width: number | string;
  height: number | string;
  border?: number;
}

const Avatar = ({ img_url, width, height, border }: AvatarProps) => {
  return (
    <div
      className={`w-${width} h-${height} overflow-hidden rounded-full relative ${
        !border
          ? null
          : border == 1
          ? `border border-black`
          : `border-${border} border-black`
      }`}
    >
      <Image src={img_url ? img_url : defaultAvatar} layout="fill" />
    </div>
  );
};

export default Avatar;
