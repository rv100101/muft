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

const sendMessage = async (
  conversation_uuid: string,
  text: string,
  member: number
) => {
  return await axiosQuery.post("/NewConversation", {
    conversation: conversation_uuid,
    text,
    member,
  });
};

const messagingQuery = {
  getConversations,
  getConversationHistory,
  sendMessage,
};

export default messagingQuery;
