import { ContractorsStateModel } from "./contractors.state";

export class GetContractors {
  static readonly type = '[CONTRACTORS] Get contractors';
}

export class GetContractorsSuccess {
  static readonly type = '[CONTRACTORS] Get contractors success';
  constructor(public contractors: ContractorsStateModel[]) {};
}

export class GetContractorsFailed {
  static readonly type = '[CONTRACTORS] Get contractors failed';
}
