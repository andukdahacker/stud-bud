import { PropsWithChildren } from "react";

interface ChatBarProps {
  hidden: string | undefined;
}
const ChatBar = ({ hidden, children }: PropsWithChildren<ChatBarProps>) => {
  return (
    <div className={`${hidden} overflow-auto fixed bg-white top-20 z-10`}>
      <div>{children}</div>
    </div>
  );
};

export default ChatBar;
