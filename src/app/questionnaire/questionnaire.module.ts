import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionnaireComponent } from './questionnaire.component';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCheckboxModule} from '@angular/material/checkbox';

const routes: Routes = [
  {
    path: '',
    component: QuestionnaireComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    TranslateModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCheckboxModule
  ],
  declarations: [QuestionnaireComponent]
})
export class QuestionnaireModule { }
