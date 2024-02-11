import {
  BodyArt,
  BodyType,
  Car,
  Country,
  Disability,
  Drink,
  Education,
  Ethnicity,
  Eye,
  FavoriteFood,
  Hair,
  HaveChildren,
  Income,
  Interest,
  Languages,
  LivingStatus,
  MaritalStatus,
  Nationality,
  Occupation,
  Pets,
  Smoke,
  State,
  WantChildren,
  Workout,
  Religion,
  EmploymentStatus,
  Gender,
} from "@/types/profile";
import { create } from "zustand";

interface SelectOptions {
  employmentStatus: EmploymentStatus[];
  setEmploymentStatus: (val: EmploymentStatus[]) => void;
  religion: Religion[];
  setReligion: (val: Religion[]) => void;
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
  hair: Hair[];
  setHair: (val: Hair[]) => void;
  eyes: Eye[];
  setEyes: (val: Eye[]) => void;
  bodyArts: BodyArt[];
  setBodyArts: (val: BodyArt[]) => void;
  haveChildren: HaveChildren[];
  setHaveChildren: (val: HaveChildren[]) => void;
  wantChildren: WantChildren[];
  setWantChildren: (val: WantChildren[]) => void;
  workout: Workout[];
  setWorkout: (val: Workout[]) => void;
  disability: Disability[];
  setDisability: (val: Disability[]) => void;
  pets: Pets[];
  setPets: (val: Pets[]) => void;
  drink: Drink[];
  setDrinks: (val: Drink[]) => void;
  smoke: Smoke[];
  setSmoke: (val: Smoke[]) => void;
  livingStatus: LivingStatus[];
  setLivingStatus: (val: LivingStatus[]) => void;
  car: Car[];
  setCar: (val: Car[]) => void;
  interests: Interest[];
  setInterest: (val: Interest[]) => void;
  gender: Gender[];
  setGender: (val: Gender[]) => void;
}

const selectOptions = create<SelectOptions>((set) => ({
  employmentStatus: [],
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
  hair: [],
  eyes: [],
  bodyArts: [],
  haveChildren: [],
  wantChildren: [],
  workout: [],
  disability: [],
  pets: [],
  drink: [],
  smoke: [],
  livingStatus: [],
  car: [],
  interests: [],
  selectedCountryCode: "",
  religion: [],
  gender: [],
  setEmploymentStatus: (val) =>
    set(() => ({
      employmentStatus: val,
    })),
  setReligion: (val) =>
    set(() => ({
      religion: val,
    })),
  setSelectedCountryCode: (val) =>
    set(() => ({
      selectedCountryCode: val,
    })),
  setHaveChildren: (val) =>
    set(() => ({
      haveChildren: val,
    })),
  setWantChildren: (val) =>
    set(() => ({
      wantChildren: val,
    })),
  setWorkout: (val) =>
    set(() => ({
      workout: val,
    })),
  setDisability: (val) =>
    set(() => ({
      disability: val,
    })),
  setPets: (val) =>
    set(() => ({
      pets: val,
    })),
  setDrinks: (val) =>
    set(() => ({
      drink: val,
    })),
  setSmoke: (val) =>
    set(() => ({
      smoke: val,
    })),
  setLivingStatus: (val) =>
    set(() => ({
      livingStatus: val,
    })),
  setCar: (val) =>
    set(() => ({
      car: val,
    })),
  setHair: (val) =>
    set(() => ({
      hair: val,
    })),
  setEyes: (val) =>
    set(() => ({
      eyes: val,
    })),
  setBodyArts: (val) =>
    set(() => ({
      bodyArts: val,
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
  setInterest: (val) =>
    set(() => ({
      interests: val,
    })),
  setGender: (val) =>
    set(() => ({
      gender: val,
    })),
}));

export default selectOptions;
