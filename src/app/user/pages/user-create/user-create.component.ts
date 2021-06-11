import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/core/base/base.component';
import { APIResponse } from 'src/app/core/models/APIResponse.model';
import { GebruikerPost } from 'src/app/core/models/gebruiker.model';
import { GebruikerService } from 'src/app/core/services/gebruiker.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.sass']
})
export class UserCreateComponent extends BaseComponent implements OnInit {

  myform = new FormGroup({});

  constructor(private gebruikerService:GebruikerService,private router:Router) {
    super();
   }

  ngOnInit(): void {
    this.myform = new FormGroup({
      email:new FormControl(),
      naam:new FormControl(),
      voornaam:new FormControl(),
      gebruikerstype:new FormControl(),
      wachtwoord:new FormControl()
    });
  }

  clearForm(){
    this.myform.reset();
  }

  submit(){
    this.createGebruiker();
  }

  createGebruiker(){
    let email = this.myform.value.email;
    let naam = this.myform.value.naam;
    let voornaam = this.myform.value.voornaam;
    let gebruikerstype = this.myform.value.gebruikerstype;
    let wachtwoord = this.myform.value.wachtwoord;

    const valid = this.validateFields();
    if (valid ===true) {
      const newGebruiker:GebruikerPost={
        email:email,
        naam:naam,
        voornaam:voornaam,
        gebruikerstype:gebruikerstype,
        wachtwoord:wachtwoord
      }

      this.gebruikerService
        .create(newGebruiker)
        .pipe(takeUntil(this.destroy$))
        .subscribe((response:APIResponse)=>{
          console.log(response);
          if (response.message==="") {
            
          }
        })

    }
  }

  validateFields(){
    let valid = true;
    if (this.validateEmail() === false) {
      valid = false;
    }
    if (this.myform.value.naam === null || this.myform.value.naam==="") {
      valid = false;
    }
    if (this.myform.value.voornaam === null || this.myform.value.voornaam==="") {
      valid = false;
    }
    if (this.myform.value.gebruikerstype === null || this.myform.value.gebruikerstype === "") {
      valid = false;
    }
    if (this.myform.value.wachtwoord === null || this.myform.value.wachtwoord === "") {
      valid = false;
    }

    return valid
  }

  validateEmail(){
    //validate email
    if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.myform.value.email)){
      return true;
    }
    return false;
  }





}



