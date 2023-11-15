import { ProfileHeader } from "@/types/profileHeader";
import { create } from "zustand";

interface CurrentUserProfileState {
  headerValues: ProfileHeader | null;
  setHeaderValues: (val: ProfileHeader | null) => void;
}

const currentUserProfileStore = create<CurrentUserProfileState>((set) => ({
  headerValues: null,
  setHeaderValues: (val) =>
    set(() => ({
      headerValues: val,
    })),
}));

export default currentUserProfileStore;
