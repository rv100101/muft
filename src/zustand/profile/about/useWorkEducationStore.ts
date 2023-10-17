import { create } from "zustand";

export interface WorkEducationStore {
  workEducationInputs: {
    educationText: string;
    employmentText: string;
    titleText: string;
    incomeText: string;
  };
  workEducationEditModes: {
    educationText: boolean;
    employmentText: boolean;
    titleText: boolean;
    incomeText: boolean;
  };
  globalEditMode: boolean;
  // workEducationSetEditMode: (fieldName: string, editMode: boolean) => void;
  workEducationHandleInputChange: (fieldName: string, value: string) => void;
  handleEditProfileToggle: () => void;
}

export const useWorkEducationStore = create<WorkEducationStore>((set) => ({
  workEducationInputs: {
    educationText: "Add Education Info here",
    employmentText: "Add Employment Info here",
    titleText: "Add Job Title Info here",
    incomeText: "Add Income Info here",
  },
  workEducationEditModes: {
    educationText: false,
    employmentText: false,
    titleText: false,
    incomeText: false,
  },
  globalEditMode: false,

  workEducationHandleInputChange: (fieldName, value) => {
    set((state) => ({
      workEducationInputs: {
        ...state.workEducationInputs,
        [fieldName]: value,
      },
    }));
  },
  // edit profile btn
  handleEditProfileToggle: () => {
    set((state) => ({
      workEducationEditModes: {
        ...state.workEducationEditModes,
        educationText: !state.workEducationEditModes.educationText,
        employmentText: !state.workEducationEditModes.employmentText,
        titleText: !state.workEducationEditModes.titleText,
        incomeText: !state.workEducationEditModes.incomeText,
      },
      globalEditMode: !state.globalEditMode,
    }));
  },
}));
