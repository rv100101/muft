import { create } from "zustand";

interface MessageInput {
  value: string;
  setInputValue: (val: string) => void;
}
export const useMessageInputStore = create<MessageInput>((set) => ({
  value: "",
  setInputValue: (val) => set(() => ({ value: val })),
}));
