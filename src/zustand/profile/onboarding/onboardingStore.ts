import { create } from "zustand";

interface OnboardingState {
  step: number;
  setStep: (val: number) => void;
  currentFieldHasErrors: boolean;
  setCurrentFieldHasErrors: (val: boolean) => void;
  isFinished: boolean;
  setIsFinished: (val: boolean) => void;
}

const onboardingStore = create<OnboardingState>((set) => ({
  step: 1,
  setStep: (val: number) =>
    set(() => ({
      step: val,
    })),
  currentFieldHasErrors: false,
  setCurrentFieldHasErrors: (val: boolean) =>
    set(() => ({
      currentFieldHasErrors: val,
    })),
  isFinished: false,
  setIsFinished: (val) => {
    set(() => ({
      isFinished: val,
    }));
  },
}));

export default onboardingStore;
