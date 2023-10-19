import { create } from "zustand";

interface formData {
  country: string;
  state: string;
}
export interface LocationStore {
  formData: {
    country: string;
    state: string;
  };
  setFormData: (data: formData) => void;
  setEditMode: () => void;
  // submitForm: (memberId: number) => void;

  globalEditMode: boolean;
}
export const useLocationStore = create<LocationStore>((set) => ({
  formData: {
    country: "",
    state: "",
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
