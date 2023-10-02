import ChatMessages from "./chatMessages";
import MessageHeader from "./messageHeader";

const ChatConversation = () => {
  return (
    <div className="border-l w-full h-full p-4">
      <MessageHeader />
      <div className="pb-8 h-full w-full">
        <ChatMessages />
      </div>
    </div>
  );
};

export default ChatConversation;
