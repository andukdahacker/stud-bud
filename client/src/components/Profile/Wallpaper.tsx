import Image from "next/image";

interface WallpaperProps {
  img_url: string | null | undefined;
}

const Wallpaper = ({ img_url }: WallpaperProps) => {
  return (
    <div className="relative z-0 w-full h-96 bg-blue">
      {img_url ? (
        <>
          <Image src={img_url} layout="fill" priority />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Wallpaper;
