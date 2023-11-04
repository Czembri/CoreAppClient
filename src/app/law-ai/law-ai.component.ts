import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Store } from "@ngxs/store";
import { LawAIState } from "./state/law-ai.state";
import { ClearMemory, LoadData, PostConstitutionAi } from "./state/law-ai.actions";

@Component({
  selector: 'app-products',
  templateUrl: './law-ai.component.html',
  styleUrls: ['./law-ai.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LawAIComponent implements OnDestroy, OnInit {
  public lawForm: FormGroup;
  public isLoading$ = this.store.select(LawAIState.isLoading);
  public data$ = this.store.select(LawAIState.messages);

  constructor(private store: Store) {
    this.lawForm = new FormGroup({
      query: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadData());
  }

  ngOnDestroy(): void {
    this.store.dispatch(new ClearMemory());
  }

  submitQuery(): void {
    this.store.dispatch(new PostConstitutionAi(this.lawForm.value.query));
    this.lawForm.controls.query.setValue('');
  }
}
