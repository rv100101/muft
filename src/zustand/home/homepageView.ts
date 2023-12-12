import { create } from "zustand";

export type Member = {
  age: number;
  authorized: boolean;
  country_code: string;
  country_name: string;
  gallery_uuid: string;
  gender: string;
  imagePath: string;
  ip_address: string;
  isLiked: boolean;
  isFavorite: boolean;
  last_active: string;
  member_id: number;
  member_uuid: string;
  nationality: string;
  nickname: string;
  state_name: string;
  countryName: string;
  status: string;
  nationality_code: string;
};

interface ViewState {
  selectedProfileId: number | null;
  modifiedMemberList: Array<Member>;
  setSelectedProfileId: (id: number | null) => void;
  setModifiedMemberList: (member: Member[]) => void;
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

  setModifiedMemberList: (members: Member[]) => {
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
