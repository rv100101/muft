import { create } from "zustand";

interface AboutErrors {
  basicInfoHasErrors: boolean;
  setBasicInfoHasErrors: (val: boolean) => void;
  workAndEducationHasErrors: boolean;
  setWorkAndEducationHasErrors: (val: boolean) => void;
  detailsInfoHasErrors: boolean;
  setDetailsInfoHasErrors: (val: boolean) => void;
  locationHasErrors: boolean;
  setLocationHasErrors: (val: boolean) => void;
  additionalInfoHasErrors: boolean;
  setAdditionalInfoHasErrors: (val: boolean) => void;
}

const useAboutErrorsStrore = create<AboutErrors>()((set) => ({
  basicInfoHasErrors: false,
  setBasicInfoHasErrors: (val: boolean) => {
    set(() => ({
      basicInfoHasErrors: val,
    }));
  },
  workAndEducationHasErrors: false,
  setWorkAndEducationHasErrors: (val: boolean) => {
    set(() => ({
      workAndEducationHasErrors: val,
    }));
  },
  detailsInfoHasErrors: false,
  setDetailsInfoHasErrors: (val: boolean) => {
    set(() => ({
      detailsInfoHasErrors: val,
    }));
  },
  locationHasErrors: false,
  setLocationHasErrors: (val: boolean) => {
    set(() => ({
      locationHasErrors: val,
    }));
  },
  additionalInfoHasErrors: false,
  setAdditionalInfoHasErrors: (val: boolean) => {
    set(() => ({
      additionalInfoHasErrors: val,
    }));
  },
}));

export default useAboutErrorsStrore;
