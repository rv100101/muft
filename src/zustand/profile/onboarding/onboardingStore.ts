import { create } from "zustand";

interface OnboardingState {
  step: number;
  setStep: (val: number) => void;
  currentFieldHasErrors: boolean;
  setCurrentFieldHasErrors: (val: boolean) => void;
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
}));

export default onboardingStore;
