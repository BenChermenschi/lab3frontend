import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ChartsModule } from 'ng2-charts';
import { SurveyModule } from '../survey/survey.module';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ChartsModule,
    SurveyModule
  ]
})
export class DashboardModule { }
