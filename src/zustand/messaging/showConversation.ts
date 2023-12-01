import { create } from "zustand";
interface ConversationHistory {
  conversation: {
    memberId: number;
    conversationId: number | null;
    gallery_uuid: string | null;
    gender: string;
    recipient_uuid: string | null;
    username: string;
    conversation_uuid: string;
  } | null;
  setConversation: (
    memberId: number,
    conversationId: number | null,
    gallery_uuid: string | null,
    gender: string,
    recipient_uuid: string | null,
    username: string,
    conversation_uuid: string,
  ) => void;
  selectedHistoryMemberId: number | null;
  setSelectedHistoryMemberId: (val: number | null) => void;
}

const useConversationHistoryStore = create<ConversationHistory>((set) => ({
  conversation: null,
  setConversation: (
    memberId,
    conversationId,
    gallery_uuid,
    gender,
    recipient_uuid,
    username,
    conversation_uuid,
  ) =>
    set(() => ({
      conversation: {
        memberId,
        conversationId,
        gallery_uuid,
        gender,
        recipient_uuid,
        username,
        conversation_uuid,
      },
    })),
  selectedHistoryMemberId: null,
  setSelectedHistoryMemberId: (val: number | null) => {
    set(() => {
      return {
        selectedHistoryMemberId: val,
      };
    });
  },
}));

export default useConversationHistoryStore;
