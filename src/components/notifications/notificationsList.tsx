import NotificationsListHeader from "./notificationListHeader";
import NotificationsListFiters from "./notificationListFilters";
import { notificationsData } from "@/lib/dummies/notificationsData";

const NotificationsList = () => {
  const notifications = notificationsData.map((notification, index) => {
    return (
      <div
        key={index}
        className="flex items-center justify-start space-x-2 p-8 m-4 bg-white"
      >
        <img
          className="rounded-2xl"
          src={notification.avatar}
          alt="user avatar"
        />
        <div>
          <p className="font-bold text-md">{notification.title}</p>
          <p className="text-sm">{notification.description}</p>
        </div>
      </div>
    );
  });
  return (
    <div className="w-full h-full flex flex-col">
      <NotificationsListHeader />
      <NotificationsListFiters />
      <div className="space-y-4 overflow-y-scroll bg-[#F7F8FA]">
        {notifications}
      </div>
    </div>
  );
};

export default NotificationsList;
