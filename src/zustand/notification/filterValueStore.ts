import { NotificationFilterOptions} from "@/lib/notificationFilters"; import { create } from "zustand";

type NotificationFilter = {
  value: NotificationFilterOptions ;
  setValue: (newValue: NotificationFilterOptions) => void;
};

const useNotificationFilterValueStore = create<NotificationFilter>(
 (set)=>({
    value: 'All',
    setValue: (newValue) => set(()=>({
     value: newValue 
    }),)
 }));

export default useNotificationFilterValueStore;
