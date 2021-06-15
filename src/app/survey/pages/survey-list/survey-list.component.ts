import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/core/base/base.component';
import {APIResponse} from 'src/app/core/models/APIResponse.model';
import { VragenLijst } from 'src/app/core/models/vragenLijst.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { VragenlijstService } from 'src/app/core/services/vragenlijst.service';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.sass']
})
export class SurveyListComponent extends BaseComponent implements OnInit {




  vragenlijsten:VragenLijst[] = [];
  constructor(private vragenlijstService: VragenlijstService,private router:Router,private authService:AuthService) {
    super()
  }

  ngOnInit(): void {
    this.getVragenlijsten();
  }


  getVragenlijsten(){
    if (this.authService.isLoggedIn()== true) {
      //is user
      if  (this.authService.isAdmin() == true){
        console.log("hello admin");
        this.getAllVragenlijsten();
        
      }else{
        console.log("hello docent");
        this.getVragenlijstenByUser();
      }
    }
  }

  getAllVragenlijsten():void{
    this.vragenlijstService
      .getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response:VragenLijst[]) => {
      this.vragenlijsten = response
    })
  }

  getVragenlijstenByUser(){
    const id = this.authService.getGebruikersId();
    this.vragenlijstService.getByUser(id).pipe(takeUntil(this.destroy$))
    .subscribe((response:VragenLijst[])=>{
      this.vragenlijsten = response;
    })




  }

  hasVragenlijsten(){
    return this.vragenlijsten.length > 0;
  }

  editVragenlijst(id:string){
    this.router.navigate(['/survey/edit/',id]);
  }

  removeVragenlijst(id:string){
    this.vragenlijstService
    .delete(id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((response:APIResponse)=>{
      console.log('msg',response);
      this.getVragenlijsten();
  
    })
  }

  detailsVragenlijst(id:string){
    this.router.navigate(['/survey/detail/',id]);
  }


  showMessage(message:string){
    alert(message);
  }

}
