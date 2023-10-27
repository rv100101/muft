import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type User = {
  authorized: boolean;
  ip_address: string;
  member_id: number;
  member_uuid: string;
  first_name: string;
  last_name: string;
  gender: null | string; // You can use null or string as the type for gender
  email_address: string;
  is_active: boolean;
  is_blocked: boolean;
  profile_completed: boolean;
  first_time: boolean;
  temporarily_deactivated: boolean;
} | null;

interface UserState {
  user: User;
  updateUser: (user: User) => void;
  reset: () => void;
}

export const useUserStore = create(
  persist<UserState>(
    (set) => ({
      user: null,
      updateUser: (user: User) => set({ user: user }),
      reset: () => {
        set({ user: null });
      },
    }),
    {
      name: "user-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
