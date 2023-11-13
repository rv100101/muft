import { create } from "zustand";

interface ViewState {
  selectedProfileId: number | null;
  setSelectedProfileId: (id: number | null) => void;
}
const useHomepageViewStore = create<ViewState>()((set) => ({
  selectedProfileId: null,
  setSelectedProfileId: (id) => set(()=> ({
    selectedProfileId: id
  }))
}));

export default useHomepageViewStore;
