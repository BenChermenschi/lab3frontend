import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactionCreateComponent } from './pages/reaction-create/reaction-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactionDoneComponent } from './pages/reaction-done/reaction-done.component';
import { ErrorPagesModule } from '../error-pages/error-pages.module';



@NgModule({
  declarations: [
    ReactionCreateComponent,
    ReactionDoneComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ErrorPagesModule
  ]
})
export class ReactionModule { }
