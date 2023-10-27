export type Conversation = {
  conversation_id: number;
  conversation_uuid: string;
  initiator_id: number;
  initiator_nickname: string;
  initiator_uuid: string;
  recipient_id: number;
  recipient_nickname: string;
  recipient_uuid: string;
  listed_id: number;
  listed_nickname: string;
  listed_uuid: string;
  listed_age: number;
  created_date: string;
  gallery_uuid: null | string;
  gender: string;
};

export type ConversationMessage = {
  conversation_history_id: number;
  conversation_text: string;
  created_date: string;
  created_user: number;
  nickname: string;
  gender: string;
};
