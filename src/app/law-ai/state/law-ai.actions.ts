export class PostConstitutionAi {
  static readonly type = '[LAW-AI] Post constitution AI';
  constructor(public query: string) {}
}

export class PostConstitutionAiSuccess {
  static readonly type = '[LAW-AI] Post constitution AI success';
  constructor(public response: string) {}
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
