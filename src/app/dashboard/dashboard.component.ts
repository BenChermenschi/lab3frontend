import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '../core/base/base.component';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent extends BaseComponent implements OnInit {

  isAdmin:boolean | undefined


  constructor(private authService:AuthService,private router:Router) {
    super()
  }

  ngOnInit(): void {
    this.checkAdmin();
  }

  checkAdmin(){
    if (this.authService.isLoggedIn()== true) {
      //is user
      if  (this.authService.isAdmin() == true){
        console.log("hello admin");
        this.isAdmin= true;
        
      }else{
        console.log("hello docent");
        this.isAdmin = false;
      }
    }
  }

}
