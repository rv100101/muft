import ChatMessages from "./chatMessages";
import MessageHeader from "./messageHeader";

import ChatInput from "./chatInput";

const ChatConversation = () => {
  return (
    <div className="border-l w-full h-full flex flex-col dark:text-white dark:bg-[#020817]">
      <MessageHeader />
      <ChatMessages />
      <ChatInput />
    </div>
  );
};

export default ChatConversation;
