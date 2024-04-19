import { create } from "zustand";

interface PageNumber {
  value: number;
  setPageNumber: (pageNumber: number) => void;
  memberCount: number;
  setMemberCount: (count: number) => void;
}
const useHomePageNumber = create<PageNumber>()((set) => ({
  value: 1,
  setPageNumber: (pageNumber) =>
    set(() => ({
      value: pageNumber,
    })),
  memberCount: 0,
  setMemberCount: (count) =>
    set(() => ({
      memberCount: count,
    })),
}));

export default useHomePageNumber;
