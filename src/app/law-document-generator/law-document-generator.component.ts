import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngxs/store";
import { DocumentType } from "./models/law-document.model";
import { LawDocumentTypeEnum } from "./enums/law-document.enum";
import { LawDocumentGeneratorState } from "./state/law-document-generator.state";
import { PostDocumentInfo } from "./state/law-document-generator.actions";

@Component({
  selector: 'app-lwa-documents-generator',
  templateUrl: './law-document-generator.component.html',
  styleUrls: ['./law-document-generator.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LawDocumentGeneratorComponent implements OnDestroy, OnInit {
  public formGroup: FormGroup;
  public options: DocumentType[] = [];
  public isLoading$ = this.store.select(LawDocumentGeneratorState.isLoading);

  constructor(private store: Store) {
    this.options = [
      {translation: 'LAW_AI_VIEW.DOCUMENT_TYPE_APPEAL', type: LawDocumentTypeEnum.appeal},
      {translation:'LAW_AI_VIEW.DOCUMENT_TYPE_JUSTIFICATION', type: LawDocumentTypeEnum.justification},
    ];

    this.formGroup = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(10)]),
      type: new FormControl('' , [Validators.required]),
      content: new FormControl('', [Validators.required, Validators.minLength(20)]),
    });
   }

  ngOnInit(): void { }

  ngOnDestroy(): void { }

  submit(): void {
    this.store.dispatch(new PostDocumentInfo());
   }
}
