import { create } from "zustand";

interface formData {
  appearance: string;
  health: string;
  lifestyle: string;
  interest: string;
  favoriteFood: string;
}

export interface DetailsStore {
  formData: {
    appearance: string;
    health: string;
    lifestyle: string;
    interest: string;
    favoriteFood: string;
  };

  setFormData: (data: formData) => void;
  setEditMode: () => void;
  // submitForm: (memberId: number) => void;

  globalEditMode: boolean;
}

export const useDetailsStore = create<DetailsStore>((set) => ({
  formData: {
    appearance: "",
    health: "",
    lifestyle: "",
    interest: "",
    favoriteFood: "",
  },

  globalEditMode: false,
  setFormData: (data: formData) => {
    set({ formData: data });
  },

  // edit profile btn
  setEditMode: () => {
    set((state) => ({
      globalEditMode: !state.globalEditMode,
    }));
  },
}));
