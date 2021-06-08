import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClassgroupModule } from './classgroup/classgroup.module';
import { CoreModule } from './core/core.module';
import { AuthInterceptor } from './core/interceptors/authInterceptor';
import { AuthService } from './core/services/auth.service';
import { SharedModule } from './shared/shared.module';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginModule } from './login/login.module';
import { HttpRequestInterceptor } from './core/interceptors/HttpRequestInterceptor';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    ClassgroupModule,
    ReactiveFormsModule,
    FormsModule,
    LoginModule
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

//{ provide: HTTP_INTERCEPTORS,useClass: HttpRequestInterceptor,multi:true},