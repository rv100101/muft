import { create } from "zustand";

type Member = {
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
};
interface ViewState {
  selectedProfileId: number | null;
  modifiedMemberList: Array<Member>;
  setSelectedProfileId: (id: number | null) => void;
  setModifiedMemberList: (member: Member[]) => void;
  toggleIsLiked: () => void;
  toggleIsFavored: () => void;
  isLiked: boolean;
  isFavored: boolean;
}
const useHomepageViewStore = create<ViewState>()((set) => ({
  selectedProfileId: null,
  isLiked: false,
  isFavored: false,
  modifiedMemberList: [],

  setSelectedProfileId: (id) =>
    set(() => ({
      selectedProfileId: id,
    })),

  setModifiedMemberList: (members: Member[]) => {
    set(() => ({
      modifiedMemberList: members,
    }));
  },

  toggleIsLiked: () => {
    set((state) => ({
      isLiked: !state.isLiked,
    }));
  },

  toggleIsFavored: () => {
    set((state) => ({
      isFavored: !state.isFavored,
    }));
  },
}));

export default useHomepageViewStore;
