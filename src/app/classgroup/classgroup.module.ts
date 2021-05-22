import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassgroupCreateComponent } from './pages/classgroup-create/classgroup-create.component';
import { ClassgroupDetailComponent } from './pages/classgroup-detail/classgroup-detail.component';
import { ClassgroupEditComponent } from './pages/classgroup-edit/classgroup-edit.component';
import { ClassgroupListComponent } from './pages/classgroup-list/classgroup-list.component';


@NgModule({
  declarations: [
    ClassgroupCreateComponent,
    ClassgroupDetailComponent,
    ClassgroupEditComponent,
    ClassgroupListComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class ClassgroupModule { }
