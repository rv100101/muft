import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ReadConversations {
  read: Record<string, boolean>;
  updateRead: (read: Record<string, boolean>) => void;
}

const useReadConversationsStateStore = create(
  persist<ReadConversations>(
    (set) => ({
      read: {},
      updateRead: (read) => set(() => ({ read })),
    }),
    {
      name: "messages-conversations-read", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export default useReadConversationsStateStore;
