import { create } from "zustand";

export interface BasicInfoStore {
  basicInfoInputs: {
    genderText: string;
    nationalityText: string;
    birthInfoText: string;
    ageText: string;
    religionText: string;
    ethnicityText: string;
    maritalStatusText: string;
    languageText: string;
  };
  basicInfoEditModes: {
    genderText: boolean;
    nationalityText: boolean;
    birthInfoText: boolean;
    ageText: boolean;
    religionText: boolean;
    ethnicityText: boolean;
    maritalStatusText: boolean;
    languageText: boolean;
  };
  globalEditMode: boolean;
  basicInfoHandleInputChange: (fieldName: string, value: string) => void;
  handleEditProfileToggle: () => void;
}

export const useBasicInfoStore = create<BasicInfoStore>((set) => ({
  basicInfoInputs: {
    genderText: "Add Gender Info here",
    nationalityText: "Add Nationality Info here",
    birthInfoText: "Add Birth Info here",
    ageText: "Add Age here",
    religionText: "Add Religion Info here",
    ethnicityText: "Add Ethnicity Info here",
    maritalStatusText: "Add Status Info here",
    languageText: "Add Language Info here",
  },
  basicInfoEditModes: {
    genderText: false,
    nationalityText: false,
    birthInfoText: false,
    ageText: false,
    religionText: false,
    ethnicityText: false,
    maritalStatusText: false,
    languageText: false,
  },
  globalEditMode: false,
  // reducers

  basicInfoHandleInputChange: (fieldName, value) => {
    set((state) => ({
      basicInfoInputs: {
        ...state.basicInfoInputs,
        [fieldName]: value,
      },
    }));
  },

  // edit profile btn
  handleEditProfileToggle: () => {
    set((state) => ({
      basicInfoEditModes: {
        ...state.basicInfoEditModes,
        genderText: !state.basicInfoEditModes.genderText,
        nationalityText: !state.basicInfoEditModes.nationalityText,
        birthInfoText: !state.basicInfoEditModes.birthInfoText,
        ageText: !state.basicInfoEditModes.ageText,
        religionText: !state.basicInfoEditModes.religionText,
        ethnicityText: !state.basicInfoEditModes.ethnicityText,
        maritalStatusText: !state.basicInfoEditModes.maritalStatusText,
        languageText: !state.basicInfoEditModes.languageText,
      },
      globalEditMode: !state.globalEditMode,
    }));
  },

  submitForm: () => {},
}));
