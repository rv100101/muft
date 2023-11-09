import { create } from "zustand";

interface ViewState {
  value: string;
  setSearchValue: (value: string) => void;
}
const useHomepageSearchStore = create<ViewState>()((set) => ({
  value: "",
  setSearchValue: (searchValue) =>
    set(() => ({
      value: searchValue,
    })),
}));

export default useHomepageSearchStore;
