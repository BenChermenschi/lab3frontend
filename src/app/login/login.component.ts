import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../core/base/base.component';
import {FormBuilder,ReactiveFormsModule,FormGroup,FormControl,FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent extends BaseComponent implements OnInit {
  myform = new FormGroup({});


  constructor() {
    super()
    
  }
  ngOnInit(): void {
    this.myform = new FormGroup({
      email:new FormControl(),
      wachtwoord:new FormControl()
    });
  }


  submit(){
    console.log(this.myform);
  }

}
