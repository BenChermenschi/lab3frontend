import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveyCreateComponent } from './pages/survey-create/survey-create.component';
import { SurveyDetailComponent } from './pages/survey-detail/survey-detail.component';
import { SurveyEditComponent } from './pages/survey-edit/survey-edit.component';
import { SurveyListComponent } from './pages/survey-list/survey-list.component';
import { SurveyShareComponent } from './pages/survey-share/survey-share.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';






@NgModule({
  declarations: [
    SurveyCreateComponent,
    SurveyDetailComponent,
    SurveyEditComponent,
    SurveyListComponent,
    SurveyShareComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
   
  ]
})
export class SurveyModule { }
