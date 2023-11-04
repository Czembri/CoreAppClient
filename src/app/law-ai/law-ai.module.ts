import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from '@ngx-translate/core';
import { MaterialsModule } from '../materials.module';
import { HeaderModule } from '../header/header.module';
import { LawAIComponent } from './law-ai.component';
import { LawAIRoutingModule } from './law-ai-routng.module';
import { NgxsModule } from '@ngxs/store';
import { SharedModule } from '../shared/shared.module';
import { LawAIState } from './state/law-ai.state';
import { ConstitutionAIState } from './state/constitution-ai.state';


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
    SharedModule,
    NgxsModule.forFeature([LawAIState, ConstitutionAIState]),
  ],
})
export class LawAIModule { }
