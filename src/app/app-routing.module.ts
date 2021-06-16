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
import { IsAdminGuard, IsLoggedInGuard, IsNotLoggedInGuard } from './core/guards/auth.guard';
import {CommonModule} from '@angular/common';
import { ReactionCreateComponent } from './reaction/pages/reaction-create/reaction-create.component';
import { ReactionDoneComponent } from './reaction/pages/reaction-done/reaction-done.component';

const routes: Routes = [


  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [IsNotLoggedInGuard]

  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [IsLoggedInGuard],
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [IsLoggedInGuard],
  },

  {
    path: 'survey',
    children: [
      {
        path: 'detail/:id',
        component: SurveyDetailComponent,
        canActivate: [IsLoggedInGuard],
      },
      {
        path: 'create',
        component: SurveyCreateComponent,
        canActivate: [IsLoggedInGuard],
      },
      {
        path: 'edit/:id',
        component: SurveyEditComponent,
        canActivate: [IsLoggedInGuard],
      },
      {
        path: 'list',
        component: SurveyListComponent,
        canActivate: [IsLoggedInGuard],
      },
      {
        path: 'share',
        component: SurveyShareComponent,
        canActivate: [IsLoggedInGuard],
      },
      {
        path: '',
        component: SurveyListComponent,
        canActivate: [IsLoggedInGuard],
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
        canActivate:[IsLoggedInGuard,IsAdminGuard],
        resolve: {
          id: IdResolver
        }
      },
      {
        path: 'create',
        component: ClassgroupCreateComponent,
        canActivate:[IsLoggedInGuard,IsAdminGuard],
      },
      {
        path: 'edit/:id',
        component: ClassgroupEditComponent,
        canActivate:[IsLoggedInGuard,IsAdminGuard],
      },
      {
        path: 'list',
        component: ClassgroupListComponent,
        canActivate:[IsLoggedInGuard,IsAdminGuard],
      },
      {
        path: '',
        component: ClassgroupListComponent,
        canActivate:[IsLoggedInGuard,IsAdminGuard],
      }

    ]

  },

  {
    path: 'course',
    children: [
      {
        path: 'detail',
        component: CourseDetailComponent,
        canActivate:[IsLoggedInGuard,IsAdminGuard],
      },
      {
        path: 'create',
        component: CourseCreateComponent,
        canActivate:[IsLoggedInGuard,IsAdminGuard],
      },
      {
        path: 'edit/:id',
        component: CourseEditComponent,
        canActivate:[IsLoggedInGuard,IsAdminGuard],
      },
      {
        path: 'list',
        component: CourseListComponent,
        canActivate:[IsLoggedInGuard,IsAdminGuard],
      },
      {
        path: '',
        component: CourseListComponent,
        canActivate:[IsLoggedInGuard,IsAdminGuard],
      }

    ]

  }, {
    path: 'user',
    children: [
      {
        path: 'detail',
        component: UserDetailComponent,
        canActivate:[IsLoggedInGuard,IsAdminGuard],
      },
      {
        path: 'create',
        component: UserCreateComponent,
        canActivate:[IsLoggedInGuard,IsAdminGuard],
      },
      {
        path: 'edit/:id',
        component: UserEditComponent,
        canActivate:[IsLoggedInGuard,IsAdminGuard],
      },
      {
        path: 'list',
        component: UserListComponent,
        canActivate:[IsLoggedInGuard,IsAdminGuard],
      },
      {
        path: '',
        component: UserListComponent,
        canActivate:[IsLoggedInGuard,IsAdminGuard],
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
