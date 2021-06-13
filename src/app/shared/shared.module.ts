import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BenMeeChartComponent } from './ben-mee-chart/ben-mee-chart.component';
import { ChartsModule } from 'ng2-charts';




@NgModule({
  declarations: [
    BenMeeChartComponent
  ],
  imports: [
    CommonModule,
    ChartsModule
  ],
  exports:[
    BenMeeChartComponent
  ]
})
export class SharedModule { }
