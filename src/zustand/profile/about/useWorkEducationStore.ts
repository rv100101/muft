import { create } from "zustand";

interface formData {
  education: string;
  employmentStatus: string;
  occupationTitle: string;
  income: string;
}
export interface WorkEducationStore {
  formData: {
    education: string;
    employmentStatus: string;
    occupationTitle: string;
    income: string;
  };

  setFormData: (data: formData) => void;
  setEditMode: () => void;
  // submitForm: (memberId: number) => void;

  globalEditMode: boolean;
}

export const useWorkEducationStore = create<WorkEducationStore>((set) => ({
  formData: {
    education: "",
    employmentStatus: "",
    occupationTitle: "",
    income: "",
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
