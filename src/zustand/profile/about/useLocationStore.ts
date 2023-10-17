import { create } from "zustand";

export interface LocationStore {
  locationInputs: {
    country: string;
    state: string;
  };

  locationEditModes: {
    country: boolean;
    state: boolean;
  };
  globalEditMode: boolean;
  locationHandleInputChange: (fieldName: string, value: string) => void;
  handleEditProfileToggle: () => void;
}

export const useLocationStore = create<LocationStore>((set) => ({
  locationInputs: {
    country: "Add Country Info here",
    state: "Add State Info here",
  },
  locationEditModes: {
    country: false,
    state: false,
  },
  globalEditMode: false,

  locationHandleInputChange: (fieldName, value) => {
    set((state) => ({
      locationInputs: {
        ...state.locationInputs,
        [fieldName]: value,
      },
    }));
  },
  // edit profile btn
  handleEditProfileToggle: () => {
    set((state) => ({
      locationEditModes: {
        ...state.locationEditModes,
        country: !state.locationEditModes.country,
        state: !state.locationEditModes.state,
      },
      globalEditMode: !state.globalEditMode,
    }));
  },
}));
