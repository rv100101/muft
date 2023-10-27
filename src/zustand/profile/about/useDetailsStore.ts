import { create } from "zustand";

interface formData {
  height: string;
  weight: string;
  bodyType: string;
  interest: string;
  favoriteFood: string;
}

//height
//weight
//body type
// living status
// interest
//favorite food

export interface DetailsStore {
  // formData: {
  //   appearance: string;
  //   health: string;
  //   lifestyle: string;
  //   interest: string;
  //   favoriteFood: string;
  // };
  formData: {
    height: string;
    weight: string;
    bodyType: string;
    interest: string;
    favoriteFood: string;
  };
  setFormData: (data: formData) => void;
  setEditMode: (val?: boolean) => void;
  // submitForm: (memberId: number) => void;

  globalEditMode: boolean;
}

export const useDetailsStore = create<DetailsStore>((set) => ({
  formData: {
    height: "",
    weight: "",
    bodyType: "",
    interest: "",
    favoriteFood: "",
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
