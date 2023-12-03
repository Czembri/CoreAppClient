import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Store } from "@ngxs/store";
import { LawAIState } from "./state/law-ai.state";
import { GetChat, LoadData, PostConstitutionAi, SaveChatOnDispose } from "./state/law-ai.actions";
import { ActivatedRoute } from "@angular/router";
import { Subject, switchMap, takeUntil, tap } from "rxjs";

@Component({
  selector: 'app-law-ai',
  templateUrl: './law-ai.component.html',
  styleUrls: ['./law-ai.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LawAIComponent implements OnDestroy, OnInit {
  public lawForm: FormGroup;
  public isLoading$ = this.store.select(LawAIState.isLoading);
  public data$ = this.store.select(LawAIState.messages);

  private destroyed$ = new Subject<void>();
  private param?: number;

  constructor(private store: Store, private route: ActivatedRoute) {
    this.lawForm = new FormGroup({
      query: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.route.params.pipe(
      takeUntil(this.destroyed$),
      tap(params => {
        if (!!params['id']) {
          this.param = params['id'];
          return this.store.dispatch(new GetChat(params['id']));
        }
        return this.store.dispatch(new LoadData());
      }),
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.store.dispatch(new SaveChatOnDispose(this.param));
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  submitQuery(): void {
    this.store.dispatch(new PostConstitutionAi(this.lawForm.value.query));
    this.lawForm.controls.query.setValue('');
  }
}
