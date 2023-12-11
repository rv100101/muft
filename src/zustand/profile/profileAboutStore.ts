import { create } from "zustand";

export type ProfileAbout = {
  nickname: string;
  gender: string;
  nationality: string;
  birthInfo: string;
  age: string;
  religion: string;
  ethnicity: string;
  maritalStatus: string;
  language: string;
  education: string;
  employmentStatus: string;
  occupationTitle: string;
  income: string;
  height: number;
  weight: number;
  bodyType: string;
  interest: string;
  favoriteFood: string;
  country: string;
  region: string;
  hair: string;
  eyes: string;
  bodyArt: string;
  haveChildren: string;
  wantChildren: string;
  workout: string;
  disability: string;
  pets: string;
  drinking: string;
  smoking: string;
  livingStatus: string;
  car: string;
};

interface ProfileAboutState {
  data: ProfileAbout | null;
  setData: (val: ProfileAbout) => void;
  profileData: ProfileAbout | null;
  setProfileData: (val: ProfileAbout) => void;
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

const profileAboutContentStore = create<ProfileAboutState>((set) => ({
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
  isLoading: false,
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
}));
export default profileAboutContentStore;
