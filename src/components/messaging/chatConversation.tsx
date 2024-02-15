import ChatMessages from "./chatMessages";
import MessageHeader from "./messageHeader";

import ChatInput from "./chatInput";

const ChatConversation = () => {
  return (
    <div className="sm:border-l w-full h-screen flex flex-col dark:text-white">
      <div className="min-h-min">
        <MessageHeader />
      </div>
      <div className="h-[calc(100vh-164px)] md:flex-1 md:h-full overflow-y-auto">
        <ChatMessages />
      </div>
      <div className="fixed w-full sm:static bottom-0">
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatConversation;
