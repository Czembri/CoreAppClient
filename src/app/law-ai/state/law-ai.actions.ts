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
