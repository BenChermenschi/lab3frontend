import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/base/base.component';

@Component({
  selector: 'app-survey-edit',
  templateUrl: './survey-edit.component.html',
  styleUrls: ['./survey-edit.component.sass']
})
export class SurveyEditComponent extends BaseComponent implements OnInit {

  constructor() {
    super()
  }

  ngOnInit(): void {
  }

}
