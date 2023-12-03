import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { BaseState } from "src/app/_models/base-state.model"
import { ClearMemory, ClearState, GetChat, GetChats, LoadData, PostConstitutionAi,
  PostConstitutionAiFailed, PostConstitutionAiSuccess, SaveChatOnDispose } from "./law-ai.actions";
import { catchError, finalize, map, tap, throwError } from "rxjs";
import produce from "immer";
import { MessageAi, MessagesResponseModel } from "../models/law-ai.model";
import { LawAIService } from "../services/law-ai.service";

export interface LawAIStateModel extends BaseState {
  messages: MessageAi[],
  chats: MessagesResponseModel[],
}

@State<LawAIStateModel>({
  name: 'LawAI',
  defaults: {
    // messages: [ { role: 'user', content: 'hej pomóż mi z prawem'}, { role: 'assistant', content: 'Jasne bracie jak mogę Ci pomóc?'},
    // { role: 'user', content: 'hej pomóż mi z prawem'}, { role: 'assistant', content: 'Jasne bracie jak mogę Ci pomóc?'},
    // { role: 'user', content: 'hej pomóż mi z prawem'}, { role: 'assistant', content: 'Jasne bracie jak mogę Ci pomóc?'},
    // { role: 'user', content: 'hej pomóż mi z prawem'}, { role: 'assistant', content: 'Jasne bracie jak mogę Ci pomóc?'}, ],
    chats: [],
    messages:[],
    errors: [],
    message: '',
    isLoading: false,
  }
})
@Injectable()
export class LawAIState {
  constructor(private lawAIService: LawAIService) {}

  @Selector()
  public static messages(state: LawAIStateModel): MessageAi[] {
    return state.messages.map(m => m);
  }

  @Selector()
  public static chats(state: LawAIStateModel): MessagesResponseModel[] {
    return state.chats;
  }

  @Selector()
  public static isLoading(state: LawAIStateModel): boolean {
    return state.isLoading;
  }


  @Action(SaveChatOnDispose)
  public saveChat(ctx: StateContext<LawAIStateModel>, { chatId } : SaveChatOnDispose) {
    if(ctx.getState().messages.length === 0) return;
    ctx.patchState({isLoading: true});
    ctx.dispatch(new ClearState())
    return this.lawAIService.saveChat(chatId)
    .pipe(
      tap(res => ctx.patchState({message: res.response})),
      tap(_ => ctx.dispatch(new ClearMemory())),
      finalize(() => ctx.patchState({isLoading: false})),
    );
  }


  @Action(PostConstitutionAi)
  public postConstitutionAI(ctx: StateContext<LawAIStateModel>, {query} : PostConstitutionAi ) {
    const newMessage: MessageAi =  { content: query, role: 'user'}
    ctx.patchState(produce(ctx.getState(), (draft: LawAIStateModel) => {
      draft.isLoading = true;
      draft.messages = [...draft.messages, newMessage];
     }));
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
      draft.messages = [...ctx.getState()?.messages, { content: response.content, role: 'assistant' } as MessageAi];
     }));
  }

  @Action(GetChats)
  public getChats(ctx: StateContext<LawAIStateModel>) {
    ctx.patchState({isLoading: true});
    return this.lawAIService.getChats().pipe(
      tap(res => {
        ctx.patchState({
          chats: res,
        });
        ctx.patchState({isLoading: false})
      }),
    );
  }

  @Action(GetChat)
  public getChat(ctx: StateContext<LawAIStateModel>, {chatId}: GetChat) {
    ctx.patchState({isLoading: true});
    return this.lawAIService.getChat(chatId).pipe(
      tap(res => {

        if (res.response &&
          res.response.length > 0 &&
          res.response[0].role === 'system') {
          res.response = res.response.slice(1);
        }
        ctx.patchState({
          messages: res.response,
        });
        ctx.patchState({isLoading: false})
      }),
      tap(() => ctx.dispatch(new LoadData()))
    );
  }

  @Action(ClearMemory)
  public clearMemory(ctx: StateContext<LawAIStateModel>) {
    ctx.patchState({isLoading: true});
    return this.lawAIService.clearMemory().pipe(
      tap(() => ctx.patchState({
        message: undefined,
        isLoading: false,
      })),
    );
  }

  @Action(LoadData)
  public loadData(ctx: StateContext<LawAIStateModel>) {
    const state = ctx.getState();
    return this.lawAIService.loadData(state.messages).pipe(
      tap(res => {
        ctx.setState({
          ...ctx.getState(),
          message: res.message,
        });
      }),
    );
  }

  @Action(ClearState)
  public clearState(ctx: StateContext<LawAIStateModel>) {
    return ctx.patchState({
      messages: [],
      errors: [],
      message: '',
      isLoading: false,
    })
  }
}
