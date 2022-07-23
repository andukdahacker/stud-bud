import { PropsWithChildren } from "react";

interface NotificationBarProps {
  hidden: string | undefined;
}

const NotificationBar = ({
  hidden,
  children,
}: PropsWithChildren<NotificationBarProps>) => {
  return (
    <div
      className={`${hidden} overflow-auto bg-white z-10 border border-black absolute right-0 w-[24rem]`}
    >
      {children}
    </div>
  );
};

export default NotificationBar;
