import { Languages, Pets, Interest, FavoriteFood } from "@/types/profile";
import { create } from "zustand";

interface DeleteMultiselect {
  languages: Languages[];
  setLanguagesToDelete: (val: Languages) => void;
  pets: Pets[];
  setPetsToDelete: (val: Pets) => void;
  interests: Interest[];
  setInterestsToDelete: (val: Interest) => void;
  favoriteFood: FavoriteFood[];
  setFavoriteFoodToDelete: (val: FavoriteFood) => void;
  reset: () => void;
}

const deleteMultiselectValuesStore = create<DeleteMultiselect>((set) => {
  return {
    languages: [],
    pets: [],
    interests: [],
    favoriteFood: [],
    setLanguagesToDelete: (val) =>
      set((state) => ({
        languages: [...state.languages, val],
      })),
    setPetsToDelete: (val) =>
      set((state) => ({
        pets: [...state.pets, val],
      })),
    setInterestsToDelete: (val) =>
      set((state) => ({
        interests: [...state.interests, val],
      })),
    setFavoriteFoodToDelete: (val) =>
      set((state) => ({
        favoriteFood: [...state.favoriteFood, val],
      })),
    reset: () =>
      set(() => ({
        favoriteFood: [],
        languages: [],
        pets: [],
        interests: [],
      })),
  };
});

export default deleteMultiselectValuesStore;
