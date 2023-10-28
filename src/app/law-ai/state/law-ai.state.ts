import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { BaseState } from "src/app/_models/base-state.model"
import { LawAIService } from "../services/law-ai.service";
import { ClearMemory, LoadData, PatchQuery, PostConstitutionAi,
  PostConstitutionAiFailed, PostConstitutionAiSuccess, SaveChatOnDispose } from "./law-ai.actions";
import { catchError, finalize, map, tap, throwError } from "rxjs";
import produce from "immer";

export interface LawAIStateModel extends BaseState {
  responsesAndQuestions: Array<string>,
}

@State<LawAIStateModel>({
  name: 'LawAI',
  defaults: {
    // responsesAndQuestions: ['czy mogę zabijać?', 'nie nie możesz', 'dlaczego?', 'bo tak', 'ale dlaczego?',
    //   'bo konstytucja tak mówi essa', 'a co to jest konstytucja?', 'to jest zbiór praw i obowiązków'],
    responsesAndQuestions:[],
    errors: [],
    message: '',
    isLoading: false,
  }
})
@Injectable()
export class LawAIState {
  constructor(private lawAIService: LawAIService) {}

  @Selector()
  public static arrayOfData(state: LawAIStateModel): Array<string> {
    return state.responsesAndQuestions;
  }

  @Selector()
  public static isLoading(state: LawAIStateModel): boolean {
    return state.isLoading;
  }


  @Action(SaveChatOnDispose)
  public saveChat(ctx: StateContext<LawAIStateModel>) {
    if(ctx.getState().responsesAndQuestions.length === 0) return;
    ctx.patchState({isLoading: true});
    return this.lawAIService.saveChat(ctx.getState().responsesAndQuestions.join(';;'))
    .pipe(
      tap(res => ctx.patchState({message: res.response})),
      finalize(() => ctx.patchState({isLoading: false})),
    );
  }


  @Action(PatchQuery)
  public patchQuery(ctx: StateContext<LawAIStateModel>, {query} : PatchQuery ) {
    ctx.patchState(produce(ctx.getState(), (draft: LawAIStateModel) => {
      draft.isLoading = true;
      draft.responsesAndQuestions = [...draft.responsesAndQuestions, query];
     }));

     ctx.dispatch(new PostConstitutionAi(query));
  }


  @Action(PostConstitutionAi)
  public postConstitutionAI(ctx: StateContext<LawAIStateModel>, {query} : PostConstitutionAi ) {
    return this.lawAIService.postQuery(query).pipe(
      map(response => response.response),
      tap(response => ctx.dispatch(new PostConstitutionAiSuccess(response))),
      catchError(error => {
        ctx.dispatch(new PostConstitutionAiFailed());
        return throwError(() => error)
      }),
    );
  }

  @Action(PostConstitutionAiSuccess)
  public postConstitutionAiSuccess(ctx: StateContext<LawAIStateModel>, { response }: PostConstitutionAiSuccess) {
    ctx.patchState(produce(ctx.getState(), (draft: LawAIStateModel) => {
      draft.isLoading = false;
      draft.responsesAndQuestions = [...ctx.getState()?.responsesAndQuestions, response];
     }));
  }

  @Action(ClearMemory)
  public clearMemory(ctx: StateContext<LawAIStateModel>) {
    ctx.patchState({isLoading: true});
    return this.lawAIService.clearMemory().pipe(
      tap(_ => ctx.dispatch(new SaveChatOnDispose())),
      tap(res => ctx.patchState({
        errors: [res.response],
        isLoading: false,
      })),
    );
  }

  @Action(LoadData)
  public loadData(ctx: StateContext<LawAIStateModel>) {
    return this.lawAIService.loadData().pipe(
      tap(res => {
        ctx.setState({
          ...ctx.getState(),
          message: res.message,
        });
      }),
    );
  }
}
