import ChatConversation from "@/components/messaging/chatConversation";
import NotificationsList from "@/components/notifications/notificationsList";
import AuthenticatedLayout from "./layout";

const NotificationsPage = () => {
  return (
    <AuthenticatedLayout>
      <div className="w-full h-full grid grid-cols-10 grid-rows-1">
        <div className="col-span-7 h-full w-full">
          <NotificationsList />
        </div>
        <div className="col-span-3 w-full h-full">
          <ChatConversation />
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default NotificationsPage;
