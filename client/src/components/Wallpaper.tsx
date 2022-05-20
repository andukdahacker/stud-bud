import Image from "next/image";
import defaultWallpaper from "../assets/default-wallpaper.jpg";

interface WallpaperProps {
  img_url: string | null | undefined;
}

const Wallpaper = (props: WallpaperProps) => {
  return (
    <div>
      <Image
        src={props.img_url ? props.img_url : defaultWallpaper}
        layout="fixed"
        height={400}
        width={1450}
      />
    </div>
  );
};

export default Wallpaper;
