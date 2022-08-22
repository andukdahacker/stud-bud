import Image from "next/image";

interface AvatarProps {
  img_url: string | null | undefined;
  width: number | string;
  height: number | string;
  border?: number;
}

const Avatar = ({ img_url, width, height, border }: AvatarProps) => {
  if (img_url) {
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
        <Image src={img_url} layout="fill" />
      </div>
    );
  }

  return (
    <div
      className={`w-${width} h-${height} overflow-hidden rounded-full bg-white ${
        !border
          ? null
          : border == 1
          ? `border border-black`
          : `border-${border} border-black`
      }`}
    ></div>
  );
};

export default Avatar;
