import { JsonPipe } from '@angular/common';
import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartComponent } from 'angular2-chartjs';
import { Chart, ChartDataset,  ChartOptions, ChartType } from 'chart.js';
import { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/core/base/base.component';
import { Klasgroep } from 'src/app/core/models/klasgroep.model';
import { Reactie } from 'src/app/core/models/reactie.model';
import { VragenlijstDetailed } from 'src/app/core/models/vragenLijst.model';
import { VragenlijstService } from 'src/app/core/services/vragenlijst.service';



@Component({
  selector: 'app-survey-detail',
  templateUrl: './survey-detail.component.html',
  styleUrls: ['./survey-detail.component.sass']
})
export class SurveyDetailComponent extends BaseComponent implements OnInit {

  //chart stuff
  
  
  @ViewChildren('benMeeChart') chart:ChartComponent | undefined;
  benMeeType:any;
  benMeeData:any;
  benMeeOptions:any;
  benMeeLabels:any;
  benMeeLegend:any;
  benMeePlugins:any;

  

//old
  public barChartLabels =['2006', '2007', '2008', '2009', '2010'];
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];


  public barChartData: any[] =[{
    data:[5,3,4,7,1],label:"aantal antwoorden"
  }];
  


  vragenlijst:VragenlijstDetailed | undefined;
  private routeSub:Subscription | undefined;
  Id:string="";
  welkOnderdeel:string[] = [];
  andereVragen:string[]=[];
  respondenten:number=0;
  respondentenLimit:number=0;

  constructor(private route:ActivatedRoute,private vragenlijstService:VragenlijstService) {
    super()
   
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
      console.log("updatingBenMee");
      /*
        this.benMeeType='bar';
        this.benMeeLegend = true;
        this.benMeeData={
          labels:["Helemaal niet","niet mee","half half","grotendeels mee","volledig mee"],
          datasets:[ 
            
            this.vragenlijst.totalen.benMee.aantal1,
            this.vragenlijst.totalen.benMee.aantal2,
            this.vragenlijst.totalen.benMee.aantal3,
            this.vragenlijst.totalen.benMee.aantal4,
            this.vragenlijst.totalen.benMee.aantal5
          ]
        };
        this.benMeeOptions={
          responsive: true,
        };

*/

this.benMeeType = 'horizontalBar';
		this.benMeeData = {
			labels: ["5 star", "4 start", "3 start", "2 star", "1 star"],
			datasets: [
				{
					fill: true,
					label: false,
					backgroundColor: ["#a1a7b3", "#a1a7b3", "#a1a7b3", "#a1a7b3", "#a1a7b3"],
					data: [10, 2, 5, 4, 5]
				}
			]
		}
		this.benMeeOptions = {
			maintainAspectRatio: false,
			responsive: false,
			legend: { display: false },
			title: {
				display: false,
				text: ''
			},
			scales:
				{
					yAxes: [{
						// barPercentage: 0.4,
						barThickness: 20,
						barPercentage: .5,
						categoryPercentage: .2,
						isFixedWidth: true,
						//Number - Pixel width of the bar
						barWidth: 20,
						gridLines: {
							display: false
						},
						ticks: {
							min: 0,
							stepSize: 1,
							fixedStepSize: 1,
						}
					}],
					xAxes: [{
						display: false,
						gridLines: {
							display: false
						},
						ticks: {
							min: 0,
							stepSize: 1,
							fixedStepSize: 1,
						}
					}],
				}
		}
	


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

      this.welkOnderdeel = this.filterWelkOnderdeel(this.vragenlijst.reacties);
      this.andereVragen = this.filterAndereVragen(this.vragenlijst.reacties);
      this.respondenten = this.berekenRespondenten(this.vragenlijst.reacties);
      this.respondentenLimit = this.berekenRespondentenUpperlimit(this.vragenlijst.klasgroepen);

    })
  }

  filterWelkOnderdeel(reacties:Reactie[]){
    let resultaat:string[] = [];
    reacties.forEach(reactie => {
      if (reactie.welkOnderdeel != "") {
        resultaat.push(reactie.welkOnderdeel)
      }
    });
    return resultaat;
  }

  filterAndereVragen(reacties:Reactie[]){
    let resultaat:string[] = [];
    reacties.forEach(reactie => {
      if (reactie.andereVragen != "") {
        resultaat.push(reactie.andereVragen)
      }
    });
    return resultaat;
  }

  berekenRespondenten(reacties:Array<Reactie>){
    return reacties.length;
  }

  berekenRespondentenUpperlimit(klasgroepen:Array<Klasgroep>){
    let resultaat = 0;
    klasgroepen.forEach(klasgroep => {
      resultaat +=klasgroep.aantalStudenten;
    });
    return resultaat;
  }

/*
  filterRemoveEmpty(inputArray:string[]){
    let resultaat:string[] = [];
    inputArray.forEach(element => {
      if (element != "") {
        resultaat.push(element)
      }
    });
    return resultaat;
  }
  */


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
