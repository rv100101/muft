import { ConversationMessage } from "@/types/conversation";
import { create } from "zustand";

interface Sender {
  senderInfo: ConversationMessage | null;
  setInfo: (val: ConversationMessage) => void;
}
export const useSenderInfo = create<Sender>((set) => ({
  senderInfo: null,
  setInfo: (val) => set(() => ({ senderInfo: val })),
}));
