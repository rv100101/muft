import ChatMessages from "./chatMessages";
import MessageHeader from "./messageHeader";

import ChatInput from "./chatInput";

const ChatConversation = () => {
  return (
    <div className="sm:border-l w-full min-h-dvh max-h-screen flex flex-col dark:text-white">
      <div className="min-h-min flex-shrink-0">
        <MessageHeader />
      </div>
      <div className=" flex-grow h-max md:flex-1 md:h-full overflow-y-auto">
        <ChatMessages />
      </div>
      <div className="fixed w-full flex-shrink-0 sm:static bottom-0">
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatConversation;
