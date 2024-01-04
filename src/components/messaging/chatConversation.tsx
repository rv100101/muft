import ChatMessages from "./chatMessages";
import MessageHeader from "./messageHeader";

import ChatInput from "./chatInput";

const ChatConversation = () => {
  return (
    <div className="sm:border-l w-full h-full flex flex-col dark:text-white ">
      <MessageHeader />
      <div className="h-[calc(100dvh-164px)]">
        <ChatMessages />
      </div>
      <div className="fixed sm:static bottom-0 h-30">
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatConversation;
