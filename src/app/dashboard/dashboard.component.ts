import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../core/base/base.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent extends BaseComponent implements OnInit {

  constructor() {
    super()
  }

  ngOnInit(): void {
  }

}
