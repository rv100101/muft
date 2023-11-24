import { ConversationMessage } from "@/types/conversation";
import { create } from "zustand";

interface SelectedConversationData {
  messages: ConversationMessage[] | null;
  appendNewMessage: (val: ConversationMessage) => void;
  setMessages: (val: ConversationMessage[]) => void;
  updateMessageStatus: (val: string) => void;
}
export const useSelectedConversationData = create<SelectedConversationData>(
  (set) => ({
    messages: null,
    setMessages: (val: ConversationMessage[]) => {
      set(() => {
        return { messages: val };
      });
    },
    appendNewMessage: (val: ConversationMessage) => {
      set((state) => {
        if (state.messages) {
          return { messages: state.messages.concat(val) };
        }
        return { messages: state.messages };
      });
    },
    updateMessageStatus: (val: string) => {
      set((state) => {
        if (state.messages) {
          const messages = state.messages;
          const lastMessage = state.messages[state.messages.length - 1];
          messages[messages.length - 1] = { ...lastMessage, created_date: val };

          return {
            messages: [...state.messages],
          };
        } else {
          return { messages: state.messages };
        }
      });
    },
  })
);
