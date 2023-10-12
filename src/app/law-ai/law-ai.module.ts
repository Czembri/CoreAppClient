import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from '@ngx-translate/core';
import { SlickgridBaseModule } from '../slickgrid-base/slickgrid-base.module';
import { MaterialsModule } from '../materials.module';
import { ActionsFooterButtonsModule } from '../actions-footer-buttons/actions-footer-buttons.module';
import { HeaderModule } from '../header/header.module';
import { LawAIComponent } from './law-ai.component';
import { LawAIRoutingModule } from './law-ai-routng.module';
import { LawAIState } from './state/law-ai.state';
import { NgxsModule } from '@ngxs/store';


@NgModule({
  declarations: [
    LawAIComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MaterialsModule,
    TranslateModule,
    FormsModule,
    HeaderModule,
    LawAIRoutingModule,
    NgxsModule.forFeature([LawAIState]),
  ],
})
export class LawAIModule { }
