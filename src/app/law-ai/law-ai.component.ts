import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Actions, Store, ofActionCompleted } from "@ngxs/store";
import { BehaviorSubject, Subject, finalize, map, tap } from "rxjs";
import { ClearMemory, PostConstitutionAi } from "./state/law-ai.actions";
import { LawAIState } from "./state/law-ai.state";

@Component({
  selector: 'app-products',
  templateUrl: './law-ai.component.html',
  styleUrls: ['./law-ai.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LawAIComponent implements OnInit, OnDestroy {
  public lawForm: FormGroup;
  public isLoading$ = new BehaviorSubject<boolean>(false);
  public response$ = this.actions$.pipe(
    ofActionCompleted(PostConstitutionAi),
    tap(_ => this.lawForm.controls.query.enable()),
    map(() => this.store.selectSnapshot(LawAIState.response)),
    tap(() => this.isLoading$.next(false)));


  private destroyed$: Subject<void>;

  constructor(private store: Store, private actions$: Actions) {
    this.lawForm = new FormGroup({
      query: new FormControl(''),
    });
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.destroyed$.complete();
    this.destroyed$.next();
    this.store.dispatch(new ClearMemory());
  }

  submitQuery(): void {
    this.isLoading$.next(true);
    this.store.dispatch(new PostConstitutionAi(this.lawForm.value.query));
    this.lawForm.controls.query.setValue('');
    this.lawForm.controls.query.disable();
  }
}
