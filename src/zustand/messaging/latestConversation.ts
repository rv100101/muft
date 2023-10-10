import { create } from "zustand";

interface LatestConversation {
  conversation: { memberId: number; conversationId: number } | null;
  setLatestConversation: (memberId: number, conversationId: number) => void;
}

const useLatestConversationStore = create<LatestConversation>((set) => ({
  conversation: null,
  setLatestConversation: (memberId, conversationId) =>
    set(() => ({ conversation: { memberId, conversationId } })),
}));

export default useLatestConversationStore;
