import ChatHistory from "@/components/messaging/chatHistory";
import AuthenticatedLayout from "./layout";
import ChatConversation from "@/components/messaging/chatConversation";
import { cn } from "@/lib/utils";
import useMobileMessagingViewStore from "@/zustand/messaging/mobileStateView";
import { Helmet } from "react-helmet-async";

const MessagingPage = () => {
  const pageView = useMobileMessagingViewStore((state) => state.view);

  return (
    <AuthenticatedLayout>
      <Helmet>
        <title>Messages</title>
      </Helmet>
      {/* Desktop view */}
      <div className="w-full h-full grid-cols-10 grid-rows-1 hidden lg:grid md:grid-cols-11">
        <div className={cn("sm:col-span-3 md:col-span-4")}>
          <ChatHistory />
        </div>
        <div className="col-span-10 sm:col-span-7 md:col-span-7 ">
          <ChatConversation />
        </div>
      </div>
      {/* Mobile View */}
      {pageView == "CHAT-LIST" && (
        <div className="lg:hidden col-span-10 w-full h-full">
          <ChatHistory />
        </div>
      )}
      {pageView == "CHAT-MESSAGES" && (
        <div className="lg:hidden col-span-10 w-full h-full">
          <ChatConversation />
        </div>
      )}
    </AuthenticatedLayout>
  );
};

export default MessagingPage;
