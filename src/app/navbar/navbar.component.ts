import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router, RouterEvent } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { BaseComponent } from '../core/base/base.component';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent extends BaseComponent implements OnInit {

  isAdministrator:boolean | undefined;

  constructor(private authService:AuthService, private router:Router) {
    super();
   }

  ngOnInit(): void {
    this.routerEventListener();

  }

  checkIfAdmin(){
    this.isAdministrator =this.authService.isAdmin();
  }

  routerEventListener(){
    this.router.events
    .pipe(
      filter(event => event instanceof NavigationStart),
      takeUntil(this.destroy$)
      )
    .subscribe(event =>{
      this.checkIfAdmin();
    });
  }

}
