import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassgroupCreateComponent } from './pages/classgroup-create/classgroup-create.component';
import { ClassgroupDetailComponent } from './pages/classgroup-detail/classgroup-detail.component';
import { ClassgroupEditComponent } from './pages/classgroup-edit/classgroup-edit.component';
import { ClassgroupListComponent } from './pages/classgroup-list/classgroup-list.component';
import { RouterModule } from '@angular/router';
import { ClassgroupListItemComponent } from './pages/classgroup-list/classgroup-list-item/classgroup-list-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ClassgroupCreateComponent,
    ClassgroupDetailComponent,
    ClassgroupEditComponent,
    ClassgroupListComponent,
    ClassgroupListItemComponent,
    ClassgroupListItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class ClassgroupModule { }
