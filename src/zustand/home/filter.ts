import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type Filter = {
  max_age: number;
  min_age: number;
} | null;

interface FilterState {
  filters: Filter;
  updateFilters: (filters: Filter) => void;
  reset: () => void;
}

export const useFilterStore = create(
  persist<FilterState>(
    (set) => ({
      filters: { max_age: 60, min_age: 23 },
      updateFilters: (filters: Filter) => set({ filters: filters }),
      reset: () => {
        set({ filters: null });
      },
    }),
    {
      name: "filters-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
