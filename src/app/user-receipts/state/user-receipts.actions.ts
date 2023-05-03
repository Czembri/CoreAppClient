import { UserReceiptsStateModel } from "./user-receipts.state";

export class GetUserReceipts {
  static readonly type = '[RECEIPTS] Get user receipts';
}

export class GetUserReceiptsSuccess {
  static readonly type = '[RECEIPTS] Get user receipts success';
  constructor(public receipts: UserReceiptsStateModel[]) {};
}

export class GetUserReceiptsFailed {
  static readonly type = '[RECEIPTS] Get user receipts success';
}
