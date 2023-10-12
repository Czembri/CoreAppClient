import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { BaseState } from "src/app/_models/base-state.model"
import { LawAIService } from "../services/law-ai.service";
import { PostConstitutionAi, PostConstitutionAiFailed, PostConstitutionAiSuccess } from "./law-ai.actions";
import { catchError, map, tap, throwError } from "rxjs";

export interface LawAIStateModel extends BaseState {
  response: string,
}

@State<LawAIStateModel>({
  name: 'LawAI',
  defaults: {
    response: '',
    errors: []
  }
})
@Injectable()
export class LawAIState {
  constructor(private lawAIService: LawAIService) {}

  @Selector()
  public static response(state: LawAIStateModel): string {
    return state.response;
  }


  @Action(PostConstitutionAi)
  public postConstitutionAI(ctx: StateContext<PostConstitutionAi>, {query} : PostConstitutionAi ) {
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
  postConstitutionAiSuccess(ctx: StateContext<LawAIStateModel>, { response }: PostConstitutionAiSuccess) {
    ctx.setState({
      response: response
    });
  }
}
