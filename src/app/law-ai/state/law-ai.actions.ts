import { MessageAi } from "../models/law-ai.model";

export class PostConstitutionAi {
  static readonly type = '[LAW-AI] Post constitution AI';
  constructor(public query: string) {}
}

export class PostConstitutionAiSuccess {
  static readonly type = '[LAW-AI] Post constitution AI success';
  constructor(public response: MessageAi) {}
}

export class PostConstitutionAiFailed {
  static readonly type = '[LAW-AI] Post constitution AI failed';
}

export class ClearMemory {
  static readonly type = '[LAW-AI] Clear memory';
}

export class LoadData {
  static readonly type = '[LAW-AI] Load data';
}

export class SaveChatOnDispose {
  static readonly type = '[LAW-AI] Save chat on dispose';
  constructor(public chatId?: number) {}
}

export class ClearState {
  static readonly type = '[LAW-AI] Clear state';
}

export class GetChats {
  static readonly type = '[LAW-AI] Get chats';
}

export class GetChat {
  static readonly type = '[LAW-AI] Get chat';
  constructor(public chatId: number) {}
}
