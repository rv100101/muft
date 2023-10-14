import { create } from "zustand";

export interface OverviewStore {
  inputs: {
    locationText: string;
    educationText: string;
    careerText: string;
    relationshipText: string;
    contactText: string;
    birthInfoText: string;
    languageText: string;
  };
  editModes: {
    locationText: boolean;
    educationText: boolean;
    careerText: boolean;
    relationshipText: boolean;
    contactText: boolean;
    birthInfoText: boolean;
    languageText: boolean;
  };
  setEditMode: (fieldName: string, editMode: boolean) => void;
  handleInputChange: (fieldName: string, value: string) => void;
}

export const useOverviewStore = create<OverviewStore>((set) => ({
  inputs: {
    locationText: "Add Address Info here",
    educationText: "Add Education Info here",
    careerText: "Add Career Info here",
    relationshipText: "Add Relationship Info here",
    contactText: "Add Contact Info here",
    birthInfoText: "Add Birth Info here",
    languageText: "Add Language Info here",
  },
  editModes: {
    locationText: false,
    educationText: false,
    careerText: false,
    relationshipText: false,
    contactText: false,
    birthInfoText: false,
    languageText: false,
  },

  // reducers
  setEditMode: (fieldName, editMode) => {
    set((state) => ({
      editModes: {
        ...state.editModes,
        [fieldName]: editMode,
      },
    }));
  },
  handleInputChange: (fieldName, value) => {
    set((state) => ({
      inputs: {
        ...state.inputs,
        [fieldName]: value,
      },
    }));
  },
}));
