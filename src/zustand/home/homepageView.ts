import { create } from "zustand";

type HomepageView = "HOME" | "PROFILE";

interface ViewState {
  view: HomepageView;
  setView: (view: HomepageView) => void;
  selectedProfileId: number | null;
  setSelectedProfileId: (id: number | null) => void;
}
const useHomepageViewStore = create<ViewState>()((set) => ({
  view: "HOME",
  setView: (view) =>
    set(() => ({
      view: view,
    })),
  selectedProfileId: null,
  setSelectedProfileId: (id) => set(()=> ({
    selectedProfileId: id
  }))
}));

export default useHomepageViewStore;
