import NotificationsList from "@/components/notifications/notificationsList";
import AuthenticatedLayout from "./layout";
import Suggestions from "@/components/suggestions";
import membersQuery from "@/queries/home";
import { useQuery } from "@tanstack/react-query";

const NotificationsPage = () => {
  const getMembers = membersQuery.getMembers(69);
  const { data: members, isLoading } = useQuery({
    queryKey: ["home-members"],
    queryFn: () => getMembers,
  });
  return (
    <AuthenticatedLayout>
      <div className="w-full h-full grid grid-cols-9 grid-rows-1">
        <div className="col-span-10 sm:col-span-6 h-full w-full">
          <NotificationsList />
        </div>
        <div className="col-span-3 w-full h-full">
          <Suggestions members={isLoading ? [] : members} />
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default NotificationsPage;
