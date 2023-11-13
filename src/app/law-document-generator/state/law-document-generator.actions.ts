export class PostDocumentInfo {
  static readonly type = '[LAW-DOCUMENT-GENERATOR] Post document info';
}

export class PostDocumentInfoSuccess {
  static readonly type = '[LAW-DOCUMENT-GENERATOR] Post document info success';
  constructor(public response: any) {}
}

export class PostDocumentInfoFailed {
  static readonly type = '[LAW-DOCUMENT-GENERATOR] Post document info failed';
}
