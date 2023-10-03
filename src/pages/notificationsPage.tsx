import ChatConversation from "@/components/messaging/chatConversation";
import NotificationsList from "@/components/notifications/notificationsList";
import SideBar from "@/components/sideBar";

const NotificationsPage = () => {
  return (
    <div className="h-screen overflow-hidden w-full flex">
      <SideBar />
      <div className="w-full h-full grid grid-cols-10 grid-rows-1">
        <div className="col-span-7">
          <NotificationsList />
        </div>
        <div className="col-span-3">
          <ChatConversation />
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
