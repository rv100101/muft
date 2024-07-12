import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type ReferralCodeInviteStore = {
  referralCode: string | null;
  updateReferralCode: (code: string) => void;
};

export const useReferralInvitedCodeStore = create<ReferralCodeInviteStore>()(
  persist(
    (set) => ({
      referralCode: null,
      updateReferralCode: (code: string) => set({ referralCode: code }),
    }),
    {
      name: "referral-invite-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
