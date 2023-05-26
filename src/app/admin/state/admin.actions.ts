import { AdminViewStateModel } from "./admin.state";

export class GetAdminViewInfo {
  static readonly type = '[ADMIN] Get admin view info';
}

export class GetAdminViewInfoSuccess {
  static readonly type = '[ADMIN] Get admin view info success';
  constructor(public adminView: AdminViewStateModel[]) {};
}

export class GetAdminViewInfoFailed {
  static readonly type = '[ADMIN] Get admin view info failed';
}
