import { Injectable } from "@angular/core";
import { State } from "@ngxs/store";
import { BaseState } from "src/app/_models/base-state.model"
import { DocumentPostInfo, DocumentResponse } from "../models/law-document.model";
import { LawDocumentGeneratorService } from "../services/law-document-generator.service";
import { LawDocumentTypeEnum } from "../enums/law-document.enum";
import * as jsonMock from '../../../assets/json/mocks/document-generator.mock.json';

export interface LawDocumentGeneratorStateModel extends BaseState {
  model: DocumentPostInfo,
  documentHtmlString: DocumentResponse;
}

@State<LawDocumentGeneratorStateModel>({
  name: 'lawDocumentGenerator',
  defaults: {
    model: {
      title: 'Usprawiedliwienie nieobecności na rozprawie',
      content: 'Dnia 15.11.2023 nie mogłam zjawić się na rozprawie w sprawie o sygn. 1x/23 ponieważ byłam chora.',
      type: LawDocumentTypeEnum.justification,
      city: 'Warszawa',
      sender: 'Jan Kowalski',
      senderAddress: 'ul. Kowalskiego 1, 00-001 Warszawa',
      recipient: 'Sąd Okręgowy w Warszawie',
      recipientAddress: 'ul. Marszałkowska 82, 00-001 Warszawa',
      date: undefined,
      senderPhone: '123456789',
      recipientPhone: '987654321',
    },
    documentHtmlString: jsonMock,
    errors: [],
    message: '',
    isLoading: false,
  }
})
@Injectable()
export class LawDocumentGeneratorState {
  constructor(private lawDocumentGeneratorService: LawDocumentGeneratorService) {}

  //TODO - implement state?? may leave it for feature development

  // @Selector()
  // public static isLoading(state: LawDocumentGeneratorStateModel): boolean {
  //   return state.isLoading;
  // }

  // @Selector()
  // public static getDocumentString(state: LawDocumentGeneratorStateModel): string {
  //   return state.documentHtmlString.response.content;
  // }

  // @Action(PostDocumentInfo)
  // public postDocumentInfo(ctx: StateContext<LawDocumentGeneratorStateModel>) {
  //   ctx.patchState(produce(ctx.getState(), (draft: LawDocumentGeneratorStateModel) => {
  //     draft.isLoading = true;
  //    }));
  //    const model = ctx.getState().model;

  //    console.warn('model', model)
  //   return this.lawDocumentGeneratorService.postDocucument(model).pipe(
  //     map(response => response.response),
  //     tap(response => ctx.dispatch(new PostDocumentInfoSuccess(response))),
  //     catchError(error => {
  //       ctx.patchState({ isLoading: false });
  //       ctx.dispatch(new PostDocumentInfoFailed());
  //       return throwError(() => error)
  //     }),
  //   );
  // }

  // @Action(PostDocumentInfoSuccess)
  // public postDocumentInfoSuccess(ctx: StateContext<LawDocumentGeneratorStateModel>, { response }: PostDocumentInfoSuccess) {
  //   ctx.patchState(produce(ctx.getState(), (draft: LawDocumentGeneratorStateModel) => {
  //     draft.isLoading = false;
  //     draft.documentHtmlString = response;
  //    }));
  // }
}
