import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../core/base/base.component';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent extends BaseComponent implements OnInit {

  isAdministrator:boolean | undefined;

  constructor(private authService:AuthService) {
    super();
   }

  ngOnInit(): void {
    this.checkIfAdmin();

  }

  checkIfAdmin(){
    this.isAdministrator =this.authService.isAdmin();
    
  }

}
