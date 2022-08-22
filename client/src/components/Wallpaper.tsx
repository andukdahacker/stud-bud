import Image from "next/image";

interface WallpaperProps {
  img_url: string | null | undefined;
}

const Wallpaper = ({ img_url }: WallpaperProps) => {
  if (!img_url)
    return (
      <div className="relative z-0 flex items-center justify-center w-full h-96 bg-blue"></div>
    );
  return (
    <div className="relative z-0 w-full h-96 bg-blue">
      <Image src={img_url} layout="fill" priority />
    </div>
  );
};

export default Wallpaper;
