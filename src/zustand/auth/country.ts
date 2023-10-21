import { create } from "zustand";

interface UserCountry {
  country: string | null,
  setCountry: (val: string) => void;
}
export const useUserCountry = create<UserCountry>((set) => ({
  country: null,
  setCountry: (val) => set(() => ({ country: val })),
}));
