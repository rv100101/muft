import { FavoriteFood, Interest, Languages, Pets } from "@/types/profile";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const initialState: ProfileAbout = {
  nickname: "",
  gender: "",
  nationality: "",
  birthInfo: "",
  religion: "",
  ethnicity: "",
  maritalStatus: "",
  language: [],
  education: "",
  employmentStatus: "",
  occupationTitle: "",
  income: "",
  height: "",
  weight: "",
  bodyType: "",
  interest: [],
  favoriteFood: [],
  country: "",
  country_code: "",
  region: "",
  hair: "",
  eyes: "",
  bodyArt: "",
  haveChildren: "",
  wantChildren: "",
  workout: "",
  disability: "",
  pets: [],
  drinking: "",
  smoking: "",
  livingStatus: "",
  car: "",
  age: "",
  member_uuid: null,
  member_id: null,
  gallery_uuid: null,
  is_liked: null,
  is_favored: null,
};

export type ProfileAbout = {
  nickname: string;
  gender: string;
  nationality: string;
  birthInfo: string;
  religion: string;
  ethnicity: string;
  maritalStatus: string;
  language: Languages[];
  education: string;
  employmentStatus: string;
  occupationTitle: string;
  income: string;
  height: number | string;
  weight: number | string;
  bodyType: string;
  interest: Interest[];
  favoriteFood: FavoriteFood[];
  country: string;
  country_code: string;
  region: string;
  hair: string;
  eyes: string;
  bodyArt: string;
  haveChildren: string;
  wantChildren: string;
  workout: string;
  disability: string;
  pets: Pets[];
  drinking: string;
  smoking: string;
  livingStatus: string;
  car: string;
  age: number | string;
  member_uuid: string | null;
  member_id: string | null;
  gallery_uuid: string | null;
  is_liked: boolean | null;
  is_favored: boolean | null;
};

interface ProfileAboutState {
  data: ProfileAbout | null;
  setData: (val: ProfileAbout) => void;
  profileData: ProfileAbout | null;
  setProfileData: (val: ProfileAbout | null) => void;
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
  refetch: boolean;
  setRefetch: (val: boolean) => void;
  editMode: boolean;
  toggleEditMode: () => void;
  setEditModeFalse: () => void;
  isSaving: boolean;
  setIsSaving: (val: boolean) => void;
}

const profileAboutContentStore = create(
  persist<ProfileAboutState>(
    (set) => ({
      data: null,
      setData: (val) =>
        set(() => ({
          data: val,
        })),
      profileData: null,
      setProfileData: (val) =>
        set(() => ({
          profileData: val,
        })),
      isLoading: true,
      setIsLoading: (val) =>
        set(() => ({
          isLoading: val,
        })),
      refetch: false,
      setRefetch: (val) =>
        set(() => ({
          isLoading: val,
        })),
      editMode: false,
      toggleEditMode: () => {
        console.log("this is triggered");
        set((state) => ({
          editMode: !state.editMode,
        }));
      },

      setEditModeFalse: () =>
        set(() => ({
          editMode: false,
        })),
      isSaving: false,
      setIsSaving: (val: boolean) =>
        set(() => {
          return { isSaving: val };
        }),
    }),
    {
      name: "profile-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
export default profileAboutContentStore;
