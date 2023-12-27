import { create } from "zustand";

interface AboutAccordionTabView {
  tabs: boolean[];
  changeTab: (index: number) => void;
}

export const aboutAccordionTabView = create<AboutAccordionTabView>((set) => ({
  tabs: [
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ],
  changeTab: (index) => {
    set((state) => ({
      tabs: state.tabs.map((_, i) => i === index),
    }));
  },
}));
