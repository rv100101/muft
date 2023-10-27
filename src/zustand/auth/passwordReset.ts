import { create } from "zustand";

interface ResetState {
  phase: "SEND" | "VERIFY" | "CHANGE";
  email: string;
  setEmail: (val: string) => void;
  changeState: (val: "SEND" | "VERIFY" | "CHANGE") => void;
}

export const usePasswordResetState = create<ResetState>((set) => ({
  phase: "SEND",
  email: "",
  setEmail: (
    val: string,
  ) => set(() => ({ email: val })),
  changeState: (
    val: "SEND" | "VERIFY" | "CHANGE",
  ) => set(() => ({ phase: val })),
}));
