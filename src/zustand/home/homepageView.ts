import { MemberData } from "@/types/home";
import { create } from "zustand";

interface ViewState {
  selectedProfileId: number | null;
  modifiedMemberList: Array<MemberData>;
  setSelectedProfileId: (id: number | null) => void;
  setModifiedMemberList: (member: MemberData[]) => void;
  toggleIsLiked: (val?: boolean) => void;
  toggleIsFavored: (val?: boolean) => void;
  toggleDialog: () => void;
  isLiked: boolean;
  isFavored: boolean;
  dialogOpen: boolean;
}
const useHomepageViewStore = create<ViewState>()((set) => ({
  selectedProfileId: null,
  isLiked: false,
  isFavored: false,
  modifiedMemberList: [],
  dialogOpen: false,

  setSelectedProfileId: (id) =>
    set(() => ({
      selectedProfileId: id,
    })),

  setModifiedMemberList: (members: MemberData[]) => {
    set(() => ({
      modifiedMemberList: members,
    }));
  },

  toggleIsLiked: (val?: boolean) => {
    if (val) {
      set(() => ({
        isLiked: val,
      }));
    } else {
      set((state) => ({
        isLiked: !state.isLiked,
      }));
    }
  },

  toggleIsFavored: (val?: boolean) => {
    if (val) {
      set(() => ({
        isFavored: val,
      }));
    } else {
      set((state) => ({
        isFavored: !state.isFavored,
      }));
    }
  },

  toggleDialog: () => {
    set((state) => ({
      dialogOpen: !state.dialogOpen,
    }));
  },
}));

export default useHomepageViewStore;
