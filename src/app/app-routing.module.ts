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
        path: 'detail',
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

  }, {
    path: 'classgroup',
    children: [
      {
        path: 'detail',
        component: ClassgroupDetailComponent,
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
  { path: '**', component: NotFoundPageComponent }

];

@NgModule({
  imports: [
    RouterModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
