import { PropsWithChildren } from "react";

interface NotificationBarProps {
  hidden: string | undefined;
}

const NotificationBar = ({
  hidden,
  children,
}: PropsWithChildren<NotificationBarProps>) => {
  return (
    <div className={`${hidden} overflow-auto fixed bg-white top-20 z-10`}>
      {children}
    </div>
  );
};

export default NotificationBar;
