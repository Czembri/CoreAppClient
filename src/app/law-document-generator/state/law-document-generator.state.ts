import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { BaseState } from "src/app/_models/base-state.model"
import { PostDocumentInfo, PostDocumentInfoFailed, PostDocumentInfoSuccess } from "./law-document-generator.actions";
import { catchError, map, tap, throwError } from "rxjs";
import produce from "immer";
import { DocumentPostInfo } from "../models/law-document.model";
import { LawDocumentGeneratorService } from "../services/law-document-generator.service";

export interface LawDocumentGeneratorStateModel extends BaseState {
  model: DocumentPostInfo,
}

@State<LawDocumentGeneratorStateModel>({
  name: 'lawDocumentGenerator',
  defaults: {
    model: undefined,
    errors: [],
    message: '',
    isLoading: false,
  }
})
@Injectable()
export class LawDocumentGeneratorState {
  constructor(private lawDocumentGeneratorService: LawDocumentGeneratorService) {}

  @Selector()
  public static isLoading(state: LawDocumentGeneratorStateModel): boolean {
    return state.isLoading;
  }


  @Action(PostDocumentInfo)
  public postDocumentInfo(ctx: StateContext<LawDocumentGeneratorStateModel>) {
    ctx.patchState(produce(ctx.getState(), (draft: LawDocumentGeneratorStateModel) => {
      draft.isLoading = true;
     }));
    return this.lawDocumentGeneratorService.postDocucument(ctx.getState().model).pipe(
      map(response => response.response),
      tap(response => ctx.dispatch(new PostDocumentInfoSuccess(response))),
      catchError(error => {
        ctx.dispatch(new PostDocumentInfoFailed());
        return throwError(() => error)
      }),
    );
  }

  @Action(PostDocumentInfoSuccess)
  public postDocumentInfoSuccess(ctx: StateContext<LawDocumentGeneratorStateModel>, { response }: PostDocumentInfoSuccess) {
    ctx.patchState(produce(ctx.getState(), (draft: LawDocumentGeneratorStateModel) => {
      draft.isLoading = false;
      draft.message = response;
     }));
  }
}
