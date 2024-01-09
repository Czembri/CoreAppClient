export interface MessageAi {
  role: string;
  content: string;
}

export interface AIMessageResponseModel {
  response: MessageAi;
}

export interface MessagesResponseModel {
  response: MessageAi[];
  id: number;
  creationDate?: Date;
}
