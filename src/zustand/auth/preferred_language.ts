import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface PreferredLanguage {
  preferred: string | null;
  setPreferredLanguage: (preferred: string) => void;
}

export const usePreferredLanguageStore = create(
  persist<PreferredLanguage>(
    (set) => ({
      preferred: null,
      setPreferredLanguage: (preferred: string) => set({ preferred }),
    }),
    {
      name: "preferred-lang-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
