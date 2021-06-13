import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
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

  //chart stuff
  public barChartLabels =['2006', '2007', '2008', '2009', '2010'];
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataset[] =[
    {data:[],label:'Huidige antwoorden'}
  ];
  


  vragenlijst:VragenlijstDetailed | undefined;
  private routeSub:Subscription | undefined;
  Id:string="";

  constructor(private route:ActivatedRoute,private vragenlijstService:VragenlijstService) {
    super()
    this.routeSub = undefined;
  }

  ngOnInit(): void {
    this.routeSub=this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params=>{
      console.log(params['id']);
      this.Id = params['id'];
      this.getVragenlijstDetailed();

    });



  }

  updateGraphs():void{
    this.updatebenMee();
  }

  updatebenMee():void{
    if (this.vragenlijst != undefined) {
      this.barChartData[0].data=[
        this.vragenlijst?.totalen.benMee.aantal1,
        this.vragenlijst.totalen.benMee.aantal2,
        this.vragenlijst.totalen.benMee.aantal3,
        this.vragenlijst.totalen.benMee.aantal4,
        this.vragenlijst.totalen.benMee.aantal5
      ]
    }
    
  }

  getVragenlijstDetailed():void{
    this.vragenlijstService
    .getById(this.Id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((response:VragenlijstDetailed)=>{
      this.vragenlijst = response;
      console.log(response);
      console.log(this.vragenlijst);
      this.updateGraphs();
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
