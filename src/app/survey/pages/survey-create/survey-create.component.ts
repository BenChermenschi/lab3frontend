import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/base/base.component';

@Component({
  selector: 'app-survey-create',
  templateUrl: './survey-create.component.html',
  styleUrls: ['./survey-create.component.sass']
})
export class SurveyCreateComponent extends BaseComponent implements OnInit {

  constructor() {
    super()
   }

  ngOnInit(): void {
  }

}
