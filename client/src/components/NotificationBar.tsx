interface NotificationBarProps {
  hidden: string | undefined;
}

const NotificationBar = ({ hidden }: NotificationBarProps) => {
  return (
    <div className={`${hidden} overflow-auto fixed bg-white top-20 z-10`}>
      <div>Notifications</div>
    </div>
  );
};

export default NotificationBar;
