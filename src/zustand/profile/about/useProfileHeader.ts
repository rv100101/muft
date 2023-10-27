import { create } from "zustand";

interface formData {
  nickname: string;
  selectedProfilePhoto: string;
  profilePhotoURL: string;
}
export interface ProfileHeaderStore {
  formData: {
    nickname: string;
    selectedProfilePhoto: string;
    profilePhotoURL: string;
  };

  setFormData: (data: formData) => void;
  setEditMode: (val?: boolean) => void;
  // submitForm: (memberId: number) => void;

  globalEditMode: boolean;
}

export const useProfileHeaderStore = create<ProfileHeaderStore>((set) => ({
  formData: {
    nickname: "",
    selectedProfilePhoto: "",
    profilePhotoURL: "",
  },

  globalEditMode: false,
  setFormData: (data: formData) => {
    set({ formData: data });
  },

  // edit profile btn
  setEditMode: (val?: boolean) => {
    set((state) => ({
      globalEditMode: val !== undefined ? val : !state.globalEditMode,
    }));
  },
}));
