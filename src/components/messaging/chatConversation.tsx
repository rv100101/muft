import ChatMessages from "./chatMessages";
import MessageHeader from "./messageHeader";

import ChatInput from "./chatInput";

const ChatConversation = () => {
  return (
    <div className="border-l w-full h-full flex flex-col">
      <MessageHeader />
      <ChatMessages />
      <ChatInput />
    </div>
  );
};

export default ChatConversation;