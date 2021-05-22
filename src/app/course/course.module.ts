import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCreateComponent } from './pages/course-create/course-create.component';
import { CourseDetailComponent } from './pages/course-detail/course-detail.component';
import { CourseEditComponent } from './pages/course-edit/course-edit.component';
import { CourseListComponent } from './pages/course-list/course-list.component';



@NgModule({
  declarations: [
    CourseCreateComponent,
    CourseDetailComponent,
    CourseEditComponent,
    CourseListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CourseModule { }
