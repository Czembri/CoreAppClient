export class PostConstitutionAi {
  static readonly type = '[CONSTITUTION-AI] Post constitution AI';
  constructor(public query: string) {}
}

export class PostConstitutionAiSuccess {
  static readonly type = '[CONSTITUTION-AI] Post constitution AI success';
  constructor(public response: string) {}
}

export class PostConstitutionAiFailed {
  static readonly type = '[CONSTITUTION-AI] Post constitution AI failed';
}

export class ClearMemory {
  static readonly type = '[CONSTITUTION-AI] Clear memory';
}

export class LoadData {
  static readonly type = '[CONSTITUTION-AI] Load data';
}

export class SaveChatOnDispose {
  static readonly type = '[CONSTITUTION-AI] Save chat on dispose';
}
