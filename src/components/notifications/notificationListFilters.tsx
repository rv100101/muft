import { notificationFilters } from "@/lib/notificationFilters";
import { cn } from "@/lib/utils";
import { useState } from "react";

const NotificationsListFiters = () => {
  const [selectedFilterId, setSelectedFilterId] = useState(0);
  const filters = notificationFilters.map((filter, index) => (
    <li
      key={index}
      className={cn(
        "rounded-2xl py-1 px-4 hover:cursor-pointer",
        selectedFilterId == index
          ? "text-white bg-primary"
          : "bg-[#E8ECEF] text-[#404040]"
      )}
      onClick={() => {
        setSelectedFilterId(index);
      }}
    >
      {filter}
    </li>
  ));
  return (
    <div className="border-y p-2">
      <ul className="flex space-x-4">{filters}</ul>
    </div>
  );
};

export default NotificationsListFiters;
