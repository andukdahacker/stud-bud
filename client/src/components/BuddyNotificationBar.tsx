import { PropsWithChildren } from "react";

interface BuddyNotificationBarProps {
  hidden: string | undefined;
}

const BuddyNotificationBar = ({
  hidden,
  children,
}: PropsWithChildren<BuddyNotificationBarProps>) => {
  return (
    <div className={`${hidden} overflow-auto fixed bg-white top-20 z-10`}>
      {children}
    </div>
  );
};

export default BuddyNotificationBar;
