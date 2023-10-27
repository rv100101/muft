// import axiosQuery from "@/queries/axios";
import { create } from "zustand";
interface formData {
  nickname: string;
  gender: string;
  nationality: string;
  birthInfo: string;
  age: string;
  religion: string;
  ethnicity: string;
  maritalStatus: string;
  language: string;
}
export interface BasicInfoStore {
  formData: {
    nickname: string;
    gender: string;
    nationality: string;
    birthInfo: string;
    age: string;
    religion: string;
    ethnicity: string;
    maritalStatus: string;
    language: string;
  };

  selectedMaritalStatus: string;
  selectedEthnicity: string;
  selectedLanguage: string;

  setSelectedMaritalStatus: (data: string) => void;
  setSelectedEthnicity: (data: string) => void;
  setSelectedLanguage: (data: string) => void;

  setFormData: (data: formData) => void;
  setEditMode: (val?: boolean) => void;

  globalEditMode: boolean;
}

export const useBasicInfoStore = create<BasicInfoStore>((set) => ({
  formData: {
    nickname: "",
    gender: "",
    nationality: "",
    birthInfo: "",
    age: "",
    religion: "",
    ethnicity: "",
    maritalStatus: "",
    language: "",
  },

  selectedMaritalStatus: "",
  selectedEthnicity: "",
  selectedLanguage: "",
  globalEditMode: false,

  setSelectedMaritalStatus: (data: string) => {
    set({ selectedMaritalStatus: data });
  },

  setSelectedEthnicity: (data: string) => {
    set({ selectedEthnicity: data });
  },

  setSelectedLanguage: (data: string) => {
    set({ selectedLanguage: data });
  },

  setFormData: (data) => {
    set({ formData: data });
  },

  // edit profile btn
  setEditMode: (val?: boolean) => {
    set((state) => ({
      globalEditMode: val !== undefined ? val : !state.globalEditMode,
    }));
  },
}));
