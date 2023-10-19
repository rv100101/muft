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

  setFormData: (data: formData) => void;
  setEditMode: () => void;
  // submitForm: (memberId: number) => void;

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
  globalEditMode: false,

  setFormData: (data) => {
    set({ formData: data });
  },

  // edit profile btn
  setEditMode: () => {
    set((state) => ({
      globalEditMode: !state.globalEditMode,
    }));
  },
  // submitForm: async (memberId: number) => {
  //   const { basicInfoInputs } = get();
  //   console.log("basicInfoInputs: ", basicInfoInputs);
  //   // const response = await axiosQuery.post(
  //   //   "https://muffinfunction.azurewebsites.net/api/SaveGender",
  //   //   { gender: basicInfoInputs.gender, member: memberId }
  //   // );
  //   // console.log("👨‍✈️ ~  submitForm: ~ response:", response);
  // },
}));
