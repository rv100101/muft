import { ChangeEvent } from "react";
import { create } from "zustand";

interface OverviewStore {
  locationText: string;
  EducationText: string;
  careerText: string;
  relationshipText: string;
  contactText: string;
  birthInfoText: string;
  languageText: string;
  editMode: boolean;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleDoubleClick: () => void;
  handleInputBlur: () => void;
}

export const useOverviewStore = create<OverviewStore>((set) => ({
  locationText: "",
  EducationText: "",
  careerText: "",
  relationshipText: "",
  contactText: "",
  birthInfoText: "",
  languageText: "",

  text: "Add Relationship Status",
  editMode: false,
  // reducers
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(
      "🚀 ~ file: useOverviewStore.ts:32 ~ useOverviewStore ~ name:",
      name
    );
    set({ [name]: value });
  },

  handleDoubleClick: () => {
    set({ editMode: true });
  },

  handleInputBlur: () => {
    set({ editMode: false });
  },
}));
