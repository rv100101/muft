import ChatHistory from "@/components/messaging/chatHistory";
import AuthenticatedLayout from "./layout";
import ChatConversation from "@/components/messaging/chatConversation";
const MessagingPage = () => {
  return (
    <AuthenticatedLayout>
      <div className="w-full h-full grid grid-cols-10 grid-rows-1">
        <div className="col-span-3">
          <ChatHistory />
        </div>
        <div className="col-span-7">
          <ChatConversation />
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default MessagingPage;
