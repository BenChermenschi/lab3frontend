import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../core/base/base.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent extends BaseComponent implements OnInit {

  constructor() {
    super()
  }
  ngOnInit(): void {
  }

}
