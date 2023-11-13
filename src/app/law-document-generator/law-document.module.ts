import { LawDocumentGeneratorState } from './state/law-document-generator.state';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from '@ngx-translate/core';
import { MaterialsModule } from '../materials.module';
import { HeaderModule } from '../header/header.module';
import { NgxsModule } from '@ngxs/store';
import { SharedModule } from '../shared/shared.module';
import { LawDocumentRoutingModule } from './law-document-routng.module';
import { LawDocumentGeneratorComponent } from './law-document-generator.component';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';


@NgModule({
  declarations: [
    LawDocumentGeneratorComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MaterialsModule,
    TranslateModule,
    FormsModule,
    HeaderModule,
    LawDocumentRoutingModule,
    SharedModule,
    NgxsModule.forFeature([LawDocumentGeneratorState]),
    NgxsFormPluginModule
  ],
})
export class LawDocumentModule { }
