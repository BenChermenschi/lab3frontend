import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassgroupCreateComponent } from './classgroup/pages/classgroup-create/classgroup-create.component';
import { ClassgroupEditComponent } from './classgroup/pages/classgroup-edit/classgroup-edit.component';
import { ClassgroupDetailComponent } from './classgroup/pages/classgroup-detail/classgroup-detail.component';
import { ClassgroupListComponent } from './classgroup/pages/classgroup-list/classgroup-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundPageComponent } from './error-pages/not-found-page/not-found-page.component';
import { LoginComponent } from './login/login.component';
import { SettingsComponent } from './settings/settings.component';
import { SurveyCreateComponent } from './survey/pages/survey-create/survey-create.component';
import { SurveyDetailComponent } from './survey/pages/survey-detail/survey-detail.component';
import { SurveyEditComponent } from './survey/pages/survey-edit/survey-edit.component';
import { SurveyListComponent } from './survey/pages/survey-list/survey-list.component';
import { SurveyShareComponent } from './survey/pages/survey-share/survey-share.component';
import { CourseDetailComponent } from './course/pages/course-detail/course-detail.component';
import { CourseCreateComponent } from './course/pages/course-create/course-create.component';
import { CourseEditComponent } from './course/pages/course-edit/course-edit.component';
import { CourseListComponent } from './course/pages/course-list/course-list.component';
import { UserCreateComponent } from './user/pages/user-create/user-create.component';
import { UserDetailComponent } from './user/pages/user-detail/user-detail.component';
import { UserEditComponent } from './user/pages/user-edit/user-edit.component';
import { UserListComponent } from './user/pages/user-list/user-list.component';
import { IdResolver } from './core/resolvers/idResolver';
import {CommonModule} from '@angular/common';
import { ReactionCreateComponent } from './reaction/pages/reaction-create/reaction-create.component';
import { ReactionDoneComponent } from './reaction/pages/reaction-done/reaction-done.component';

const routes: Routes = [


  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  },

  {
    path: 'survey',
    children: [
      {
        path: 'detail/:id',
        component: SurveyDetailComponent,
      },
      {
        path: 'create',
        component: SurveyCreateComponent,
      },
      {
        path: 'edit/:id',
        component: SurveyEditComponent,
      },
      {
        path: 'list',
        component: SurveyListComponent,
      },
      {
        path: 'share',
        component: SurveyShareComponent,
      },
      {
        path: '',
        component: SurveyListComponent
      }

    ]

  },
  {
    path:'reaction',
    children:[
      {
        path:'create/:id',
        component:ReactionCreateComponent
      },
      {
        path:'done',
        component:ReactionDoneComponent
      }
    ]
  }, 
  {
    path: 'classgroup',
    children: [
      {
        path: 'detail/:id',
        component: ClassgroupDetailComponent,
        resolve: {
          id: IdResolver
        }
      },
      {
        path: 'create',
        component: ClassgroupCreateComponent,
      },
      {
        path: 'edit/:id',
        component: ClassgroupEditComponent,
      },
      {
        path: 'list',
        component: ClassgroupListComponent,
      },
      {
        path: '',
        component: ClassgroupListComponent
      }

    ]

  },

  {
    path: 'course',
    children: [
      {
        path: 'detail',
        component: CourseDetailComponent,
      },
      {
        path: 'create',
        component: CourseCreateComponent,
      },
      {
        path: 'edit/:id',
        component: CourseEditComponent,
      },
      {
        path: 'list',
        component: CourseListComponent,
      },
      {
        path: '',
        component: CourseListComponent
      }

    ]

  }, {
    path: 'user',
    children: [
      {
        path: 'detail',
        component: UserDetailComponent,
      },
      {
        path: 'create',
        component: UserCreateComponent,
      },
      {
        path: 'edit/:id',
        component: UserEditComponent,
      },
      {
        path: 'list',
        component: UserListComponent,
      },
      {
        path: '',
        component: UserListComponent
      }

    ]

  },
  { path: '**', component: NotFoundPageComponent }

];

@NgModule({
  imports: [
    RouterModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
