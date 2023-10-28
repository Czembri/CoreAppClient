import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Actions, Store, ofActionCompleted } from "@ngxs/store";
import { Subject, debounceTime, takeUntil } from "rxjs";
import { ClearMemory, PatchQuery, SaveChatOnDispose, } from "./state/law-ai.actions";
import { LawAIState } from "./state/law-ai.state";

@Component({
  selector: 'app-products',
  templateUrl: './law-ai.component.html',
  styleUrls: ['./law-ai.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LawAIComponent implements OnDestroy {
  public lawForm: FormGroup;
  public isLoading$ = this.store.select(LawAIState.isLoading);
  public data$ = this.store.select(LawAIState.arrayOfData);

  constructor(private store: Store, private actions$: Actions) {
    this.lawForm = new FormGroup({
      query: new FormControl(''),
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(new ClearMemory());
  }

  submitQuery(): void {
    this.store.dispatch(new PatchQuery(this.lawForm.value.query));
    this.lawForm.controls.query.setValue('');
  }
}
