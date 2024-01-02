import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserNickname {
  nickname: string | null;
  setNickname: (val: string) => void;
}
export const useUserNickname = create(
  persist<UserNickname>(
    (set) => ({
      nickname: null,
      setNickname: (val) => set(() => ({ nickname: val })),
    }),
    {
      name: "user-nickname", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
