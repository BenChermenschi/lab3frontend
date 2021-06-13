import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/core/base/base.component';
import { VragenlijstDetailed } from 'src/app/core/models/vragenLijst.model';
import { VragenlijstService } from 'src/app/core/services/vragenlijst.service';

@Component({
  selector: 'app-survey-detail',
  templateUrl: './survey-detail.component.html',
  styleUrls: ['./survey-detail.component.sass']
})
export class SurveyDetailComponent extends BaseComponent implements OnInit {

  vragenlijst:VragenlijstDetailed | undefined
  private routeSub:Subscription | undefined;
  Id:string="";

  constructor(private route:ActivatedRoute,private vragenlijstService:VragenlijstService) {
    super()
    this.routeSub = undefined;
  }

  ngOnInit(): void {
    this.routeSub=this.route.params.subscribe(params=>{
      console.log(params['id']);
      this.Id = params['id'];
      this.getVragenlijstDetailed();

    });


    


  }

  getVragenlijstDetailed():void{
    this.vragenlijstService
    .getById(this.Id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((response:VragenlijstDetailed)=>{
      this.vragenlijst = response;
      console.log(response);
      console.log(this.vragenlijst);
    })


  }


  prepareGraphs(){
    this.prepareGraphBenMee();
    this.prepareAndereVragen();
  }

  prepareComments(){
    this.prepareTeHerhalen();
    this.prepareAndereVragen();
  }

  prepareGraphBenMee(){

  }

  prepareGraphHerhaalLes(){

  }

  prepareTeHerhalen(){

  }

  prepareAndereVragen(){

  }

}
