export interface PostModel {
  query: string;
}

export interface ResponseModel {
  response: string;
}

export interface AIMessageResponseModel {
  response: MessageAi;
}

export interface MessageModel {
  message: string;
}

export interface MessageAi {
  role: string;
  content: string;
}
