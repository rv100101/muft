import { create } from "zustand";

interface SelectedCountry {
  selectedCountry: string;
  setSelectedCountry: (val: string) => void;
}

const useSelectedCountryStore = create<SelectedCountry>()((set)=> ({
  selectedCountry: '',
  setSelectedCountry: (val) => set(() => ({selectedCountry: val}))
}));

export default useSelectedCountryStore;
