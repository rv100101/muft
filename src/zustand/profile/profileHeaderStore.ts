import { ProfileHeader } from "@/types/profileHeader";
import { create } from "zustand";

interface ProfileHeaderState {
  profileHeaderValues: ProfileHeader | null;
  setProfileHeaderValues: (val: ProfileHeader | null) => void;
  headerValues: ProfileHeader | null;
  setHeaderValues: (val: ProfileHeader) => void;
}

const profileHeaderStore = create<ProfileHeaderState>((set) => ({
  profileHeaderValues: null,
  setProfileHeaderValues: (val) =>
    set(() => ({
      profileHeaderValues: val,
    })),
  headerValues: {
    age: null,
    member_uuid: null,
    gallery_uuid: null,
    gender: null,
    nickname: null,
    height: null,
    maritalStatus: null,
    occupation_title: null,
    country_name: null,
    member_id: null,
    is_favored: null,
    is_liked: null,
  },
  setHeaderValues: (val) =>
    set(() => ({
      headerValues: val,
    })),
}));

export default profileHeaderStore;
