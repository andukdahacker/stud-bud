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
      className={
        hidden
          ? "hidden"
          : " bg-white z-10 border-2 border-black absolute rounded-md -right-5 max-w-sm w-[24rem] max-h-[35rem] h-fit overflow-y-scroll "
      }
    >
      {children}
    </div>
  );
};

export default NotificationBar;
