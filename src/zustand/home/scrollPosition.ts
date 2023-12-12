import { create } from "zustand";

interface ScrollPosition {
  value: number;
  setScrollPosition: (value: number) => void;
}
const useHomePageScrollPosition = create<ScrollPosition>()((set) => ({
  value: 0,
  setScrollPosition: (searchValue) =>
    set(() => ({
      value: searchValue,
    })),
}));

export default useHomePageScrollPosition;
