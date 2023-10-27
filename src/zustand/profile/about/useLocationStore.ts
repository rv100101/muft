import { create } from "zustand";

interface formData {
  country: string;
  region: string;
}
export interface LocationStore {
  formData: {
    country: string;
    region: string;
  };
  setFormData: (data: formData) => void;
  setEditMode: (val?: boolean) => void;
  // submitForm: (memberId: number) => void;

  globalEditMode: boolean;
}
export const useLocationStore = create<LocationStore>((set) => ({
  formData: {
    country: "",
    region: "",
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
