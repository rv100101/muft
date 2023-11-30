import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserAvatar {
  gallery_uuid: string | null;
  setAvatar: (val: string) => void;
}
export const useUserAvatar = create(
  persist<UserAvatar>(
    (set) => ({
      gallery_uuid: null,
      setAvatar: (val) => set(() => ({ gallery_uuid: val })),
    }),
    {
      name: "user-avatar-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);
