interface UnreadNotiMarkProps {
  isRead: boolean | undefined;
}
const UnreadNotiMark = ({ isRead }: UnreadNotiMarkProps) => {
  if (isRead) return null;
  return <div className="w-2 h-2 bg-blue-700 rounded-full"></div>;
};

export default UnreadNotiMark;
