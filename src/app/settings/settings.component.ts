import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from '../core/base/base.component';
import { APIResponse } from '../core/models/APIResponse.model';
import { GebruikerPatchPass } from '../core/models/gebruiker.model';
import { AuthService } from '../core/services/auth.service';
import { GebruikerService } from '../core/services/gebruiker.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent extends BaseComponent implements OnInit {

  myform = new FormGroup({});

  constructor(private gebruikerService:GebruikerService,
    private router:Router,
    private authService:AuthService) {
    super()
  }

  ngOnInit(): void {
    this.initialiseForm();
  }

  initialiseForm(){
    this.myform=new FormGroup({
      wachtwoord:new FormControl(),
      herwachtwoord:new FormControl()
    });
  }

  getGebruiker(){
    return this.authService.getGebruikersId();
  }

  validateFields(){
    let valid = true;
    if (this.validatePass() === false) {
      valid = false;
    }
    return valid;
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

  clearForm(){
    this.myform.reset();
  }

  submit(){
    if  (this.validateFields()===true){
      this.updatePass();
    }else{
      this.showMessage("Please fill in all fields correctly");
    }
  
  }

  updatePass(){
    const id = this.getGebruiker();
    const editGebruiker:GebruikerPatchPass={
      wachtwoord:this.myform.value.wachtwoord
    };

    this.gebruikerService
    .patchPass(id,editGebruiker)
    .pipe(takeUntil(this.destroy$))
    .subscribe((response:APIResponse)=>{
      console.log(response);
      if (response.message === "pass updated") {
        this.showMessage("Success");
        this.router.navigate(['/dashboard']);
      }else{
        this.showMessage("something has gone wrong");
      }

    })  
  }


  showMessage(message:string){
    alert(message);
  }

}
