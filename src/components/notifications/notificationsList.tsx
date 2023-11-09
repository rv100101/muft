import NotificationsListHeader from "./notificationListHeader";
// import NotificationsListFiters from "./notificationListFilters";
import { useQuery } from "@tanstack/react-query";
import notificationQuery, { NotificationData } from "@/queries/notification";
import { UserCircle2Icon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const NotificationsList = () => {
  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ["notificationsList"],
    queryFn: () => notificationQuery.getNotifications(74),
  });

  const renderList = () => {
    if (isSuccess) {
      return data.map((notification: NotificationData, index: number) => {
        return (
          <div
            key={index}
            className="flex items-center justify-start space-x-4 p-8 m-4 bg-white rounded-xl"
          >
            {/* <img
                    className="rounded-2xl"
                    src={notification.avatar}
                    alt="user avatar"
                  /> */}
            <UserCircle2Icon height={48} width={48} />
            <div>
              <p className="font-bold text-md">
                {notification.category_description}
              </p>
              <p className="text-sm">{`${notification.nickname} liked you`}</p>
              <p className="text-sm">{`${notification.notification_date}, ${notification.notification_time}`}</p>
            </div>
          </div>
        );
      });
    }
  };

  const renderSkeletonLoading = () => (
    <div className="w-full overflow-hidden">
      <Skeleton className="h-[120px] flex bg-pink-100 items-center justify-start space-x-2 p-8 m-4 rounded-xl" />
      <Skeleton className="h-[120px] flex bg-pink-100 items-center justify-start space-x-2 p-8 m-4  rounded-xl" />
      <Skeleton className="h-[120px] flex bg-pink-100 items-center justify-start space-x-2 p-8 m-4 rounded-xl" />
      <Skeleton className="h-[120px] flex bg-pink-100 items-center justify-start space-x-2 p-8 m-4 rounded-xl" />
    </div>
  );

  return (
    <div className="w-full h-full flex flex-col">
      <NotificationsListHeader />
      {/* <NotificationsListFiters /> */}
      <div className="space-y-4 overflow-y-scroll bg-[#F7F8FA]">
        {isLoading && renderSkeletonLoading()}
        {!isSuccess && data == null ? <p>No notifications</p> : renderList()}
      </div>
    </div>
  );
};

export default NotificationsList;