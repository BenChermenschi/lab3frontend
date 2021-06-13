import { Component, Input, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';

import { ChartsModule } from 'ng2-charts';
import { VragenLijst, VragenlijstDetailed } from 'src/app/core/models/vragenLijst.model';
@Component({
  selector: 'app-ben-mee-chart',
  templateUrl: './ben-mee-chart.component.html',
  styleUrls: ['./ben-mee-chart.component.sass']

})
export class BenMeeChartComponent implements OnInit {

  @Input() vragenlijst:VragenlijstDetailed | undefined;
  


  public barChartLabels =['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataset[] | undefined;

  constructor() { 
    console.log(this.vragenlijst);
    if (this.vragenlijst != undefined) {
      this.barChartData = [
        {data:[this.vragenlijst?.totalen.benMee.aantal1,
          this.vragenlijst?.totalen.benMee.aantal2,
          this.vragenlijst?.totalen.benMee.aantal3,
          this.vragenlijst?.totalen.benMee.aantal4,
          this.vragenlijst?.totalen.benMee.aantal5]},
      ]
    }else{
      alert("data is undefined ?!")
    }
  }

  ngOnInit() {
    if (this.vragenlijst != undefined) {
      this.barChartData = [
        {data:[this.vragenlijst?.totalen.benMee.aantal1,
          this.vragenlijst?.totalen.benMee.aantal2,
          this.vragenlijst?.totalen.benMee.aantal3,
          this.vragenlijst?.totalen.benMee.aantal4,
          this.vragenlijst?.totalen.benMee.aantal5]},
      ]
    }
    
  }


  getBenMeeArray(){
    let dataset:ChartDataset[] = [
      {data: [ ]}
    ]
    return [
    this.vragenlijst?.totalen.benMee.aantal1,
    this.vragenlijst?.totalen.benMee.aantal2,
    this.vragenlijst?.totalen.benMee.aantal3,
    this.vragenlijst?.totalen.benMee.aantal4,
    this.vragenlijst?.totalen.benMee.aantal5
    ];
  }

}
