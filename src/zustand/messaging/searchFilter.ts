import { create } from "zustand";

interface SearchFilter {
  value: string;
  setSearchValue: (val: string) => void;
}
export const useSearchFilterStore = create<SearchFilter>((set) => ({
  value: "",
  setSearchValue: (val) => set(() => ({ value: val })),
}));
