import { create } from "zustand";

interface AboutErrors {
  tabsWithErrors: number[];
  setTabsWithErrors: (val: number[]) => void;
}

const useAboutErrorsStrore = create<AboutErrors>()((set)=> ({
  tabsWithErrors: [],
  setTabsWithErrors: (val) => set(() => ({tabsWithErrors: val}))
}));

export default useAboutErrorsStrore;
