import { Component, OnInit, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from '../core/base/base.component';
import { VragenlijstDetailed, VragenlijstRecentRequest } from '../core/models/vragenLijst.model';
import { AuthService } from '../core/services/auth.service';
import { VragenlijstService } from '../core/services/vragenlijst.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent extends BaseComponent implements OnInit {

  isAdmin:boolean | undefined
  recentEntry:VragenlijstDetailed | undefined;

  @ViewChildren('recentBenMeeChart') benMeeChart:any | undefined;

  constructor(private authService:AuthService,private router:Router,private vragenlijstService:VragenlijstService) {
    super()
  }

  ngOnInit(): void {
    this.checkAdmin();
    this.getMostRecent();

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

  grabUserId(){
    let output = this.authService.getGebruikersId();
    return output;
    

  }

  getMostRecent(){
    this.checkAdmin();
    if (this.isAdmin ==false) {
      let user_Id:VragenlijstRecentRequest={user_id:this.authService.getGebruikersId()}
    if(this.isAdmin ==false){
      this.vragenlijstService.getRecentByUser(user_Id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response:VragenlijstDetailed)=>{
        this.recentEntry=response;
        console.log(response);
        this.updateCharts();
      })
    }
    }
    if (this.isAdmin ==true) {
      this.vragenlijstService.getRecent()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response:VragenlijstDetailed)=>{
        this.recentEntry = response;
        console.log(response);
        this.updateCharts();

      })
    }
  }

  getMostRecentByUser(){
    
    
    
  }


  updateCharts(){
    this.updatebenMee();
  }

  updatebenMee(): void {
    if (this.recentEntry != undefined) {
      console.log("updatingBenMee");
      const canvas = <HTMLCanvasElement>document.getElementById('recentBenMeeGraph');
      let ctx: any;
      if (canvas.getContext('2d') != null) {
        ctx = canvas.getContext('2d');
      }


      let chart = new Chart(ctx, {

        type: 'bar',
        data: {
          labels: ['Absoluut Niet ', 'Ik snap er zo goed als niets van', 'Half en Half, moet het nog eens bekijken', 'Ik snap de meerderheid', 'Ik ben volledig mee'],
          datasets: [{
            label: "",
            data: [this.recentEntry.totalen.benMee.aantal1, this.recentEntry.totalen.benMee.aantal2, this.recentEntry.totalen.benMee.aantal3, this.recentEntry.totalen.benMee.aantal4, this.recentEntry.totalen.benMee.aantal5],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      })

    }



  }

}
