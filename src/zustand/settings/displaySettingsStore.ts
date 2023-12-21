import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type DisplaySettings = {
  darkModeSwitch: boolean;
  lightModeSwitch: boolean;
  autoModeSwitch: boolean;
} | null;

interface DisplayState {
  settings: DisplaySettings;
  systemDark: boolean;
  toggleDarkModeSwitch: (state: DisplaySettings) => void;
  toggleLightModeSwitch: (state: DisplaySettings) => void;
  toggleAutoModeSwitch: (state: DisplaySettings) => void;
  toggleSystemDark: (state: boolean) => void;
}

export const useSettingsStore = create(
  persist<DisplayState>(
    (set) => ({
      settings: {
        darkModeSwitch: false,
        lightModeSwitch: true,
        autoModeSwitch: false,
      },
      systemDark: false,
      toggleDarkModeSwitch: (state: DisplaySettings) =>
        set({ settings: state }),
      toggleLightModeSwitch: (state: DisplaySettings) =>
        set({ settings: state }),
      toggleAutoModeSwitch: (state: DisplaySettings) =>
        set({ settings: state }),

      toggleSystemDark: (val: boolean) => set({ systemDark: val }),
    }),
    {
      name: "settings-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
