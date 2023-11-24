import {
  BodyType,
  Country,
  Education,
  Ethnicity,
  FavoriteFood,
  Income,
  Languages,
  MaritalStatus,
  Nationality,
  Occupation,
  State,
} from "@/types/profile";
import { create } from "zustand";

interface SelectOptions {
  nationalities: Nationality[];
  setNationalities: (val: Nationality[]) => void;
  ethnicities: Ethnicity[];
  setEthnicities: (val: Ethnicity[]) => void;
  maritalStatus: MaritalStatus[];
  setMaritalStatus: (val: MaritalStatus[]) => void;
  languages: Languages[];
  setLanguages: (val: Languages[]) => void;
  educations: Education[];
  setEducations: (val: Education[]) => void;
  incomes: Income[];
  setIncomes: (val: Income[]) => void;
  occupations: Occupation[];
  setOccupations: (val: Occupation[]) => void;
  bodyTypes: BodyType[];
  setBodyTypes: (val: BodyType[]) => void;
  favoriteFoods: FavoriteFood[];
  setFavoriteFoods: (val: FavoriteFood[]) => void;
  countries: Country[];
  setCountries: (val: Country[]) => void;
  states: State[];
  setStates: (val: State[]) => void;
  selectedCountryCode: string;
  setSelectedCountryCode: (val: string) => void;
}

const selectOptions = create<SelectOptions>((set) => ({
  nationalities: [],
  ethnicities: [],
  maritalStatus: [],
  languages: [],
  occupations: [],
  educations: [],
  incomes: [],
  bodyTypes: [],
  favoriteFoods: [],
  countries: [],
  states: [],
  selectedCountryCode: '',
  setSelectedCountryCode:  (val) =>
    set(() => ({
      selectedCountryCode: val,
    })),
  setNationalities: (val) =>
    set(() => ({
      nationalities: val,
    })),
  setEthnicities: (val) =>
    set(() => ({
      ethnicities: val,
    })),
  setMaritalStatus: (val) =>
    set(() => ({
      maritalStatus: val,
    })),
  setLanguages: (val) =>
    set(() => ({
      languages: val,
    })),
  setOccupations: (val) =>
    set(() => ({
      occupations: val,
    })),
  setIncomes: (val) =>
    set(() => ({
      incomes: val,
    })),
  setEducations: (val) =>
    set(() => ({
      educations: val,
    })),
  setBodyTypes: (val) =>
    set(() => ({
      bodyTypes: val,
    })),
  setFavoriteFoods: (val) =>
    set(() => ({
      favoriteFoods: val,
    })),
  setCountries: (val) =>
    set(() => ({
      countries: val,
    })),
  setStates: (val) =>
    set(() => ({
      states: val,
    })),
}));

export default selectOptions;
