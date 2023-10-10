import { create } from "zustand";

interface ConversationHistory {
  conversation: {
    memberId: number;
    conversationId: number;
    gallery_uuid: string | null;
    gender: string;
    recipient_uuid: string;
    username: string;
  } | null;
  setConversation: (
    memberId: number,
    conversationId: number,
    gallery_uuid: string | null,
    gender: string,
    recepient_uuid: string,
    username: string
  ) => void;
}

const useConversationHistoryStore = create<ConversationHistory>((set) => ({
  conversation: null,
  setConversation: (
    memberId,
    conversationId,
    gallery_uuid,
    gender,
    recipient_uuid,
    username
  ) =>
    set(() => ({
      conversation: {
        memberId,
        conversationId,
        gallery_uuid,
        gender,
        recipient_uuid,
        username,
      },
    })),
}));

export default useConversationHistoryStore;
