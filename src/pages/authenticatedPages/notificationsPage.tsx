import NotificationsList from "@/components/notifications/notificationsList";
import AuthenticatedLayout from "./layout";
// import Suggestions from "@/components/suggesti
// import { useUserStore } from "@/zustand/auth/user";ons";
// import membersQuery from "@/queries/home";
// import { useQuery } from "@tanstack/react-query";
import HomepageSearchInput from "@/components/homeSearchUsersInput";
import NotificationsListFiters from "@/components/notifications/notificationListFilters";

const NotificationsPage = () => {
  // const { user } = useUserStore();
  // const getMembers = membersQuery.getMembers(user!.member_id);
  // const { data: members, isLoading } = useQuery({
  //   queryKey: ["home-members"],
  //   queryFn: () => getMembers,
  // });
  return (
    <AuthenticatedLayout>
      <div className="w-full h-full grid grid-cols-9 grid-rows-1">
        <div className="col-span-10 sm:col-span-6 h-full w-full">
          <NotificationsList />
        </div>
        <div className="col-span-3 h-max pt-4 px-5 lg:p-4 sm:flex flex-col hidden ">
          <HomepageSearchInput />
          <NotificationsListFiters />

          {/* <Suggestions members={isLoading ? [] : members} /> */}
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default NotificationsPage;
