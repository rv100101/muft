import { create } from "zustand";

export interface DetailsStore {
  detailsInputs: {
    appearance: string;
    health: string;
    lifestyle: string;
    interest: string;
    favoriteFood: string;
  };

  detailsEditModes: {
    appearance: boolean;
    health: boolean;
    lifestyle: boolean;
    interest: boolean;
    favoriteFood: boolean;
  };
  globalEditMode: boolean;
  detailsHandleInputChange: (fieldName: string, value: string) => void;
  handleEditProfileToggle: () => void;
}

export const useDetailsStore = create<DetailsStore>((set) => ({
  detailsInputs: {
    appearance: "Add Appearance Info here",
    health: "Add Health Info here",
    lifestyle: "Add LifeStyle Info here",
    interest: "Add Interests here",
    favoriteFood: "Add Favorite Food here",
  },
  detailsEditModes: {
    appearance: false,
    health: false,
    lifestyle: false,
    interest: false,
    favoriteFood: false,
  },
  globalEditMode: false,

  detailsHandleInputChange: (fieldName, value) => {
    set((state) => ({
      detailsInputs: {
        ...state.detailsInputs,
        [fieldName]: value,
      },
    }));
  },
  // edit profile btn
  handleEditProfileToggle: () => {
    set((state) => ({
      detailsEditModes: {
        ...state.detailsEditModes,
        appearance: !state.detailsEditModes.appearance,
        health: !state.detailsEditModes.health,
        lifestyle: !state.detailsEditModes.lifestyle,
        interest: !state.detailsEditModes.interest,
        favoriteFood: !state.detailsEditModes.favoriteFood,
      },
      globalEditMode: !state.globalEditMode,
    }));
  },
}));
