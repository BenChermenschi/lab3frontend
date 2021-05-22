import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/base/base.component';

@Component({
  selector: 'app-survey-share',
  templateUrl: './survey-share.component.html',
  styleUrls: ['./survey-share.component.sass']
})
export class SurveyShareComponent extends BaseComponent implements OnInit {

  constructor() {
    super()
  }

  ngOnInit(): void {
  }

}
