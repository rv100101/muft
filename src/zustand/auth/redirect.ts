import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface RedirectUrl {
  url: string | null;
  setURl: (val: string | null) => void;
}
export const useRedirectStore = create(
  persist<RedirectUrl>(
    (set) => ({
      url: null,
      setURl: (val) => set(() => ({ url: val })),
    }),
    {
      name: "redirect", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
