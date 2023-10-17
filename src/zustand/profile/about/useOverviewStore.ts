import { create } from "zustand";

export interface OverviewStore {
  overviewInputs: {
    locationText: string;
    educationText: string;
    careerText: string;
    relationshipText: string;
    contactText: string;
    birthInfoText: string;
    languageText: string;
  };
  overviewEditModes: {
    locationText: boolean;
    educationText: boolean;
    careerText: boolean;
    relationshipText: boolean;
    contactText: boolean;
    birthInfoText: boolean;
    languageText: boolean;
  };
  globalEditMode: boolean;
  // overviewSetEditMode: (fieldName: string, editMode: boolean) => void;
  overviewHandleInputChange: (fieldName: string, value: string) => void;
  handleEditProfileToggle: () => void;
}

export const useOverviewStore = create<OverviewStore>((set) => ({
  overviewInputs: {
    locationText: "Add Address Info here",
    educationText: "Add Education Info here",
    careerText: "Add Career Info here",
    relationshipText: "Add Relationship Info here",
    contactText: "Add Contact Info here",
    birthInfoText: "Add Birth Info here",
    languageText: "Add Language Info here",
  },
  overviewEditModes: {
    locationText: false,
    educationText: false,
    careerText: false,
    relationshipText: false,
    contactText: false,
    birthInfoText: false,
    languageText: false,
  },
  globalEditMode: false,

  // reducers
  // overviewSetEditMode: (fieldName, editMode) => {
  //   const { globalEditMode } = get();
  //   if (globalEditMode) {
  //     set((state) => ({
  //       overviewEditModes: {
  //         ...state.overviewEditModes,
  //         [fieldName]: editMode,
  //       },
  //     }));
  //   }
  // },
  overviewHandleInputChange: (fieldName, value) => {
    set((state) => ({
      overviewInputs: {
        ...state.overviewInputs,
        [fieldName]: value,
      },
    }));
  },
  // edit profile btn
  handleEditProfileToggle: () => {
    set((state) => ({
      overviewEditModes: {
        ...state.overviewEditModes,
        locationText: !state.overviewEditModes.locationText,
        educationText: !state.overviewEditModes.educationText,
        careerText: !state.overviewEditModes.careerText,
        relationshipText: !state.overviewEditModes.relationshipText,
        contactText: !state.overviewEditModes.contactText,
        birthInfoText: !state.overviewEditModes.birthInfoText,
        languageText: !state.overviewEditModes.languageText,
      },
      globalEditMode: !state.globalEditMode,
    }));
  },
}));
