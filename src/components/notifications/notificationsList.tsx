import NotificationsListHeader from "./notificationListHeader";
import NotificationsListFiters from "./notificationListFilters";
import { notificationsData } from "@/lib/dummies/notificationsData";

const NotificationsList = () => {
  const notifications = notificationsData.map((notification, index) => {
    return (
      <div
        key={index}
        className="flex items-center justify-start space-x-2 p-8 m-2 bg-white w-full"
      >
        <img
          className="rounded-full"
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
    <div className="w-full h-full ">
      <NotificationsListHeader />
      <NotificationsListFiters />
      <div className="w-full h-full space-y-4 bg-[#F7F8FA]">
        {notifications}
      </div>
    </div>
  );
};

export default NotificationsList;
