export class GetBrowserInfo {
  static readonly type = '[BROWSER] Get browser info';
  constructor(public browserName: string) {}
}

export class GetBrowserInfoSuccess {
  static readonly type = '[BROWSER] Get browser info success';
}

export class GetBrowserInfoFailed {
  static readonly type = '[BROWSER] Get browser info failed';
}
