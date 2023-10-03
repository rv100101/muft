import ChatHistory from "@/components/messaging/chatHistory";
import SideBar from "@/components/sideBar";
import ChatConvsersation from "@/components/messaging/chatConversation";

const MessagingPage = () => {
  return (
    <div className="h-screen overflow-hidden w-full flex">
      <SideBar />
      <div className="w-full h-full grid grid-cols-10 grid-rows-1">
        <div className="col-span-3">
          <ChatHistory />
        </div>
        <div className="col-span-7">
          <ChatConvsersation />
        </div>
      </div>
    </div>
  );
};

export default MessagingPage;
