import { ProfileHeader } from "@/types/profileHeader";
import { create } from "zustand";

interface ProfileHeaderState {
  profileHeaderValues: ProfileHeader | null;
  setProfileHeaderValues: (val: ProfileHeader) => void;
  headerValues: ProfileHeader;
  setHeaderValues: (val: ProfileHeader) => void;
}

const profileHeaderStore = create<ProfileHeaderState>((set) => ({
  profileHeaderValues: null,
  setProfileHeaderValues: (val) =>
    set(() => ({
      profileHeaderValues: val,
    })),
  headerValues: {
    member_uuid: null,
    gallery_uuid: null,
    gender: null,
    nickname: null,
    height: null,
    maritalStatus: null,
    occupation_title: null,
    country_name: null,
  },
  setHeaderValues: (val) =>
    set(() => ({
      headerValues: val,
    })),
}));

export default profileHeaderStore;
