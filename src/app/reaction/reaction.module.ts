import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactionCreateComponent } from './pages/reaction-create/reaction-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ReactionCreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class ReactionModule { }
