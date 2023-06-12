import { IApplicationUser } from "../models/user.model";

export class GetAdminViewInfo {
  static readonly type = '[ADMIN] Get admin view info';
}

export class GetAdminViewInfoSuccess {
  static readonly type = '[ADMIN] Get admin view info success';
  constructor(public adminView: IApplicationUser[]) {};
}

export class GetAdminViewInfoFailed {
  static readonly type = '[ADMIN] Get admin view info failed';
}

export class SaveAdminDetails {
  static readonly type = '[ADMIN] Save admin details';
}

export class SaveAdminDetailsSuccess {
  static readonly type = '[ADMIN] Save admin details success';
}

export class SaveAdminDetailsSuccessFailed {
  static readonly type = '[ADMIN] Save admin details success';
}
