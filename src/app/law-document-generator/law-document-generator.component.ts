import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DocumentType } from "./models/law-document.model";
import { LawDocumentTypeEnum } from "./enums/law-document.enum";
import { LawDocumentGeneratorService } from "./services/law-document-generator.service";
import { BehaviorSubject, Subject, takeUntil } from "rxjs";

@Component({
  selector: 'app-lwa-documents-generator',
  templateUrl: './law-document-generator.component.html',
  styleUrls: ['./law-document-generator.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LawDocumentGeneratorComponent implements OnDestroy, OnInit {
  public formGroup: FormGroup;
  public options: DocumentType[] = [];
  private destroyed$ = new Subject<void>();
  public isLoading$ = new BehaviorSubject<boolean>(false);
  public fileUrl$ = new Subject<string>();

  constructor(private lawDocGenService: LawDocumentGeneratorService) {
    this.options = [
      {translation: 'LAW_AI_VIEW.DOCUMENT_TYPE_APPEAL', type: LawDocumentTypeEnum.appeal},
      {translation:'LAW_AI_VIEW.DOCUMENT_TYPE_JUSTIFICATION', type: LawDocumentTypeEnum.justification},
    ];

    this.formGroup = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(10)]),
      type: new FormControl('' , [Validators.required]),
      content: new FormControl('', [Validators.required, Validators.minLength(20)]),
      city: new FormControl('', [Validators.required]),
      sender: new FormControl(''),
      senderAddress: new FormControl(''),
      recipient: new FormControl(''),
      recipientAddress: new FormControl(''),
      date: new FormControl(''),
    });
   }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  submit(): void {
    this.isLoading$.next(true);
    this.lawDocGenService.postDocucument(this.formGroup.value)
    .pipe(takeUntil(this.destroyed$))
    .subscribe({
      next: (response) => {
        // TODO: implement blob download
        var file = new Blob([response], { type: 'application/pdf; charset=utf-8' })
        var fileURL = URL.createObjectURL(file);
        this.fileUrl$.next(fileURL);
        var a = document.createElement('a');
        a.href = fileURL;

        a.download = 'law_ai.pdf';
        document.body.appendChild(a);
        a.click();
      },
      complete: () => this.isLoading$.next(false),
    })
   }
}
