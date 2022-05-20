import Image from "next/image";
import defaultWallpaper from "../assets/default-wallpaper.jpg";

interface WallpaperProps {
  img_url: string | null | undefined;
}

const Wallpaper = (props: WallpaperProps) => {
  return (
    <div className="relative w-full h-96">
      <Image
        src={props.img_url ? props.img_url : defaultWallpaper}
        layout="fill"
        priority
      />
    </div>
  );
};

export default Wallpaper;
