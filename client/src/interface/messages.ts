export interface Message {
  _id: string;
  message: string;
  createdAt: string;
  receiverId: string;
  senderId: string;
  user: {
    name: string;
    photo: string;
    isOnline: boolean;
  };
}

export interface Conversation {
  _id: string;
  receiverId: string;
  senderId: string;
  user: {
    name: string;
    photo: string;
    isOnline: boolean;
  };
  message: {
    message: string;
    createdAt: string;
  };
}

export interface Conversations {
  conversations: Conversation[];
}

export interface ChatRoomI {
  conversation: Conversation;
}

export interface TextMessage {
  senderId: string;
  message: string;
  photo: string;
  name: string;
}
