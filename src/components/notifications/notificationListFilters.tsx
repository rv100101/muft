import { NotificationFilterOptions, notificationFilters } from "@/lib/notificationFilters";
import { cn } from "@/lib/utils";
import useNotificationFilterValueStore from "@/zustand/notification/filterValueStore";
import { useState } from "react";

const NotificationsListFiters = () => {
  const [selectedFilterId, setSelectedFilterId] = useState(0);
  const setSelectedFilter = useNotificationFilterValueStore(state => state.setValue);
  const filters = notificationFilters.map((filter, index) => (
    <li
      key={index}
      className={cn(
        "border mb-2 lg:mb-0 text-sm sm:text-md rounded-2xl py-1 px-4 hover:cursor-pointer w-max",
        selectedFilterId == index
          ? "text-white bg-primary"
          : "bg-[#E8ECEF] text-[#404040]"
      )}
      onClick={() => {
        setSelectedFilter(filter as NotificationFilterOptions);
        setSelectedFilterId(index);
      }}
    >
      {filter}
    </li>
  ));
  return (
    <div className="border-y sm:p-2 pt-2">
      <ul className="justify-start px-1 sm:justify-start items-center flex flex-wrap space-x-4">
        {filters}
      </ul>
    </div>
  );
};

export default NotificationsListFiters;
