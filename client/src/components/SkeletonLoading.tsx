import { PropsWithChildren, ReactNode, useEffect } from "react";

interface SkeletonLoadingProps {
  take: number;
  skeleton: ReactNode;
  layout: "ProfileCard" | "ProfilePage";
}

const SkeletonLoading = ({
  take,
  skeleton,
  layout,
}: PropsWithChildren<SkeletonLoadingProps>) => {
  let skeletons = [];

  for (let i = 0; i < take; i++) {
    skeletons.push(skeleton);
  }

  if (layout == "ProfileCard") {
    return (
      <div className="w-full h-full">
        <div className="grid w-full h-full grid-cols-3 bg-white gap-x-20 gap-y-10 p-7">
          {skeletons.map((s, index) => {
            return <div key={index}>{s}</div>;
          })}
        </div>
      </div>
    );
  }

  return null;
};

export default SkeletonLoading;
