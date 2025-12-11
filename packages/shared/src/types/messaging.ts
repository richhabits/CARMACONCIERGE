export enum MessageType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  FILE = 'FILE',
  SYSTEM = 'SYSTEM',
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  type: MessageType;
  content: string;
  attachments?: string[];
  readAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Conversation {
  id: string;
  participants: string[];
  jobId?: string;
  quoteId?: string;
  lastMessageAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateMessageDto {
  conversationId: string;
  type: MessageType;
  content: string;
  attachments?: string[];
}

export interface CreateConversationDto {
  participants: string[];
  jobId?: string;
  quoteId?: string;
}