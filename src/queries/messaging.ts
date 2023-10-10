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
  conversationId: number,
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

const messagingQuery = {
  getConversations,
  getConversationHistory,
};

export default messagingQuery;
