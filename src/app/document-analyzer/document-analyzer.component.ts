import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentAnalyzerService } from './services/document-analyzer.service';
import { BehaviorSubject, Observable, Subject, catchError, map, takeUntil, tap, throwError } from 'rxjs';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-document-analyzer',
  standalone: true,
  imports: [CommonModule, SharedModule, TranslateModule],
  templateUrl: './document-analyzer.component.html',
  styleUrl: './document-analyzer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentAnalyzerComponent implements OnDestroy {
  private destroyed$ = new Subject<void>();
  public isLoading$ = new BehaviorSubject<boolean>(false);
  public displayResult$: Observable<string>;

  constructor(private documentAnalyzerService: DocumentAnalyzerService) {}

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  uploadFile(event) {
    this.isLoading$.next(true);
    const file:File = event.target.files[0];
    if (file) {
        const formData = new FormData();
        formData.append('file', file);
        this.displayResult$ = this.documentAnalyzerService.analzyeDocument(formData)
          .pipe(takeUntil(this.destroyed$),
          map(x => x.response),
          tap(() => this.isLoading$.next(false)),
          catchError(err => throwError(() => err)));
    }
  }
}
