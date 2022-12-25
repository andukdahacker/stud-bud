import Image from "next/image";

interface AvatarProps {
  img_url: string | null | undefined;
  width?: number | string;
  height?: number | string;
  border?: number;
}

const Avatar = ({ img_url, width, height, border }: AvatarProps) => {
  return (
    <div
      style={{
        width: `${width ? width : "4"}rem`,
        height: `${height ? height : "4"}rem`,
        borderWidth: `${border ? border : "2"}px`,
      }}
      className="relative overflow-hidden bg-white border-black rounded-full"
    >
      {img_url ? (
        <>
          <Image src={img_url} layout="fill" />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Avatar;
