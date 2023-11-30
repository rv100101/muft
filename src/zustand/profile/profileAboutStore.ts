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
};

interface ProfileAboutState {
  data: ProfileAbout | null;
  setData: (val: ProfileAbout) => void;
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
  toggleEditMode: () =>
    set((state) => ({
      editMode: !state.editMode,
    })),
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
