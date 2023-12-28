import ChatMessages from "./chatMessages";
import MessageHeader from "./messageHeader";

import ChatInput from "./chatInput";

const ChatConversation = () => {
  return (
    <div className="border-l w-full h-full flex flex-col dark:text-white ">
      <MessageHeader />
      <ChatMessages />
      <div className="flex-1">
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatConversation;
