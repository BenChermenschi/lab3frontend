import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/core/base/base.component';
import { APIResponse } from 'src/app/core/models/APIResponse.model';
import { GebruikerPost } from 'src/app/core/models/gebruiker.model';
import { Gebruikerstype } from 'src/app/core/models/gebruikerstype.model';
import { GebruikerService } from 'src/app/core/services/gebruiker.service';
import { GebruikerstypeService } from 'src/app/core/services/gebruikerstype.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.sass']
})
export class UserCreateComponent extends BaseComponent implements OnInit {

  myform = new FormGroup({});

  gebruikerstypes:Gebruikerstype[]=[];

  constructor(private gebruikerService:GebruikerService,private router:Router, private gebruikerstypeService:GebruikerstypeService) {
    super();
   }

  ngOnInit(): void {
    this.getGebruikerstypes();

    this.myform = new FormGroup({
      email:new FormControl(),
      naam:new FormControl(),
      voornaam:new FormControl(),
      gebruikerstype:new FormControl(),
      wachtwoord:new FormControl(),
      herwachtwoord:new FormControl()
    });
  }

  clearForm(){
    this.myform.reset();
  }

  getGebruikerstypes():void{
    this.gebruikerstypeService
      .getAll().pipe(takeUntil(this.destroy$))
      .subscribe((response:Gebruikerstype[])=>{
        this.gebruikerstypes = response;
      })
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
    let herwachtwoord = this.myform.value.herwachtwoord;

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
          
          if (response.message==="gebruiker created") {
            this.router.navigate(['/user']);
          }
          else{
            this.showMessage("Something went wrong")
          }
        })

    }else{
      this.showMessage("Kijk velden na");
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
    if (this.validatePass() === false) {
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

  validatePass(){
    
    if (this.myform.value.wachtwoord != this.myform.value.herwachtwoord) {
      return false;
    }
    if (this.myform.value.wachtwoord === null || this.myform.value.wachtwoord === "") {
      return false;
    }
    return true;
  }


  showMessage(message:String){
    alert(message);
  }




}



