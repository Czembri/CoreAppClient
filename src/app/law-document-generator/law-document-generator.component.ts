import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DocumentType } from "./models/law-document.model";
import { LawDocumentTypeEnum } from "./enums/law-document.enum";
import { LawDocumentGeneratorService } from "./services/law-document-generator.service";
import { BehaviorSubject, Subject, forkJoin, switchMap, takeUntil, tap } from "rxjs";

@Component({
  selector: 'app-lwa-documents-generator',
  templateUrl: './law-document-generator.component.html',
  styleUrls: ['./law-document-generator.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LawDocumentGeneratorComponent implements OnDestroy, OnInit {
  public formGroup: FormGroup;
  public options: DocumentType[] = [];
  public isLoading$ = new BehaviorSubject<boolean>(false);
  public fileUrl$ = new Subject<string>();


  private destroyed$ = new Subject<void>();
  private typeChanged$ = new Subject<string>();

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
      senderPhone: new FormControl(''),
      recipient: new FormControl(''),
      recipientAddress: new FormControl(''), //add validation
      recipientPhone: new FormControl(''), //add validation
      date: new FormControl(''),
    });
   }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  submit(type: string): void {
    this.isLoading$.next(true);
    this.lawDocGenService.postDocucument(type, this.formGroup.value)
    .pipe(takeUntil(this.destroyed$))
    .subscribe({
      next: (response) => {
        this.downloadBlod(response, `law_ai.${type}`)
      },
      complete: () => this.isLoading$.next(false),
    })
   }

   private downloadBlod(blob: Blob, fileName: string) {
    const url = window.URL.createObjectURL(blob);

    this.fileUrl$.next(url); // doesnt work

    const anchor = document.createElement('a');
    anchor.download = fileName;
    anchor.href = url;
    anchor.click();
    window.URL.revokeObjectURL(url);
   }
}
