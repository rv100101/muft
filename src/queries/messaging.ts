import { Conversation, ConversationMessage } from "@/types/conversation";
import axiosQuery from "./axios";

const getConversations = async (id: number) => {
  try {
    const res = await axiosQuery.post("/Conversations", { member: id });
    const data: Conversation[] = res.data;
    return data;
  } catch (error) {
    return null;
  }
};

const getConversationHistory = async (
  conversationId: number | null,
  memberId: number
) => {
  try {
    const res = await axiosQuery.post("/ConversationHistory", {
      conversation: conversationId,
      member: memberId,
    });
    const data: ConversationMessage[] = res.data;
    return data;
  } catch (error) {
    return null;
  }
};

const sendMessage = async (formData: FormData) => {
  return await axiosQuery.post("/NewConversation", formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const getConversation = async (member: number, chat_member: number) => {
  return await axiosQuery.post('/GetConversation', {
    member, chat_member
  });
}

const messagingQuery = {
  getConversations,
  getConversation,
  getConversationHistory,
  sendMessage,
};

export default messagingQuery;
