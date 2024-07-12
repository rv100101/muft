import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type ReferralCodeStore = {
  referralCode: string | null;
  referralUrl: string | null;
  updateReferralCode: (code: string) => void;
  updateReferralUrl: (url: string) => void;
};

export const useReferralCodeStore = create<ReferralCodeStore>()(
  persist(
    (set) => ({
      referralCode: null,
      referralUrl: null,
      updateReferralCode: (code: string) => set({ referralCode: code }),
      updateReferralUrl: (url: string) => set({ referralUrl: url }),
    }),
    {
      name: "referral-code-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
//
