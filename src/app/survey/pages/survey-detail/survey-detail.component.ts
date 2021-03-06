import { JsonPipe } from '@angular/common';
import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartComponent } from 'angular2-chartjs';
import { Chart, ChartDataset, ChartOptions, ChartType } from 'chart.js';
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


  @ViewChildren('benMeeChart') benMeeChart: any | undefined;
  @ViewChildren('nogVragenChart') nogVragenChart: any | undefined;




  vragenlijst: VragenlijstDetailed | undefined;
  private routeSub: Subscription | undefined;
  Id: string = "";
  welkOnderdeel: string[] = [];
  andereVragen: string[] = [];
  respondenten: number = 0;
  respondentenLimit: number = 0;

  constructor(private route: ActivatedRoute, private vragenlijstService: VragenlijstService) {
    super()

  }

  ngOnInit(): void {
    this.routeSub = this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      //console.log(params['id']);
      this.Id = params['id'];
      this.getVragenlijstDetailed();

    });



  }

  updateGraphs(): void {
    this.updatebenMee();
    this.updateNogVragenChart();
  }

  updatebenMee(): void {
    if (this.vragenlijst != undefined) {
      console.log("updatingBenMee");
      const canvas = <HTMLCanvasElement>document.getElementById('benMeeChart');
      let ctx: any;
      if (canvas.getContext('2d') != null) {
        ctx = canvas.getContext('2d');
      }

 
      let chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Helemaal niet', 'Ik snap een klein stukje', 'Middelmatig, sommige stukken, wel sommige niet', 'Ik ben grotendeels mee', 'Absoluut'],
          datasets: [{
            label: "",
            data: [this.vragenlijst.totalen.benMee.aantal1, this.vragenlijst.totalen.benMee.aantal2, this.vragenlijst.totalen.benMee.aantal3, this.vragenlijst.totalen.benMee.aantal4, this.vragenlijst.totalen.benMee.aantal5],
            backgroundColor: [
              'rgba(255, 13, 13, 0.2)',
              'rgba(255, 78, 17, 0.2)',
              'rgba(255, 142, 21, 0.2)',
              'rgba(172, 179, 52, 0.2)',
              'rgba(105, 179, 76, 0.2)'
            ],
            borderColor: [
              'rgba(255, 13, 13, 1)',
              'rgba(255, 78, 17, 1)',
              'rgba(255, 142, 21, 1)',
              'rgba(172, 179, 52, 1)',
              'rgba(105, 179, 76, 1)'
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
      });






    }
}

  updateNogVragenChart():void{
    if (this.vragenlijst != undefined) {
      console.log("updatingNogVragen");
      const canvas = <HTMLCanvasElement>document.getElementById('nogVragenChart');
      let ctx: any;
      if (canvas.getContext('2d') != null) {
        ctx = canvas.getContext('2d');
      }


      let chart = new Chart(ctx, {

        type: 'pie',
        data: {
          labels: ['Ja','Nee'],
          datasets: [{
            label: "",
            data: [this.vragenlijst.totalen.opnieuwUitleggen.aantalJa,this.vragenlijst.totalen.opnieuwUitleggen.aantalNee],
            backgroundColor: [
              'rgba(255, 13, 13, 0.2)',
              'rgba(105, 179, 76, 0.2)'
            ],
            borderColor: [
              'rgba(255, 13, 13, 1)',
              'rgba(105, 179, 76, 1)'
            ],
            borderWidth: 1
          }]
        }
      })

    }
  }





  getVragenlijstDetailed(): void {
    this.vragenlijstService
      .getById(this.Id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: VragenlijstDetailed) => {
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

  filterWelkOnderdeel(reacties: Reactie[]) {
    let resultaat: string[] = [];
    reacties.forEach(reactie => {
      if (reactie.welkOnderdeel != "") {
        resultaat.push(reactie.welkOnderdeel)
      }
    });
    return resultaat;
  }

  filterAndereVragen(reacties: Reactie[]) {
    let resultaat: string[] = [];
    reacties.forEach(reactie => {
      if (reactie.andereVragen != "") {
        resultaat.push(reactie.andereVragen)
      }
    });
    return resultaat;
  }

  berekenRespondenten(reacties: Array<Reactie>) {
    return reacties.length;
  }

  berekenRespondentenUpperlimit(klasgroepen: Array<Klasgroep>) {
    let resultaat = 0;
    klasgroepen.forEach(klasgroep => {
      resultaat += klasgroep.aantalStudenten;
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


}
