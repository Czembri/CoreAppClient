import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { BaseState } from "src/app/_models/base-state.model"
import { ConstitutionAIService } from "../services/constitution-ai.service";
import { ClearMemory, LoadData, PostConstitutionAi,
  PostConstitutionAiFailed, PostConstitutionAiSuccess, SaveChatOnDispose } from "./constitution-ai.actions";
import { catchError, finalize, map, tap, throwError } from "rxjs";
import produce from "immer";

export interface ConstitutionAIStateModel extends BaseState {
  responsesAndQuestions: Array<string>,
}

@State<ConstitutionAIStateModel>({
  name: 'constitutionAI',
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
export class ConstitutionAIState {
  constructor(private lawAIService: ConstitutionAIService) {}

  @Selector()
  public static arrayOfData(state: ConstitutionAIStateModel): Array<string> {
    return state.responsesAndQuestions;
  }

  @Selector()
  public static isLoading(state: ConstitutionAIStateModel): boolean {
    return state.isLoading;
  }


  @Action(SaveChatOnDispose)
  public saveChat(ctx: StateContext<ConstitutionAIStateModel>) {
    if(ctx.getState().responsesAndQuestions.length === 0) return;
    ctx.patchState({isLoading: true});
    return this.lawAIService.saveChat(ctx.getState().responsesAndQuestions.join(';;'))
    .pipe(
      tap(res => ctx.patchState({message: res.response})),
      finalize(() => ctx.patchState({isLoading: false})),
    );
  }

  @Action(PostConstitutionAi)
  public postConstitutionAI(ctx: StateContext<ConstitutionAIStateModel>, {query} : PostConstitutionAi ) {
    return this.lawAIService.postQuery(query).pipe(
      map(response => response.response),
      tap(response => ctx.dispatch(new PostConstitutionAiSuccess(response))),
      tap(_ => {
        ctx.patchState(produce(ctx.getState(), (draft: ConstitutionAIStateModel) => {
          draft.isLoading = true;
          draft.responsesAndQuestions = [...draft.responsesAndQuestions, query];
         }));
      }),
      catchError(error => {
        ctx.dispatch(new PostConstitutionAiFailed());
        return throwError(() => error)
      }),
    );
  }

  @Action(PostConstitutionAiSuccess)
  public postConstitutionAiSuccess(ctx: StateContext<ConstitutionAIStateModel>, { response }: PostConstitutionAiSuccess) {
    ctx.patchState(produce(ctx.getState(), (draft: ConstitutionAIStateModel) => {
      draft.isLoading = false;
      draft.responsesAndQuestions = [...ctx.getState()?.responsesAndQuestions, response];
     }));
  }

  @Action(ClearMemory)
  public clearMemory(ctx: StateContext<ConstitutionAIStateModel>) {
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
  public loadData(ctx: StateContext<ConstitutionAIStateModel>) {
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
