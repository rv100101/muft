import { create } from "zustand";

interface ResetState {
  phase: "SEND" | "VERIFY" | "CHANGE";
  email: string;
  setEmail: (val: string) => void;
  changeState: (val: "SEND" | "VERIFY" | "CHANGE") => void;
  isModalOpen: boolean;
  setIsModalOpen: (val: boolean) => void;
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
  isModalOpen: false,
  setIsModalOpen: (
    val: boolean,
  ) => set(() => ({ isModalOpen: val })),
}));
