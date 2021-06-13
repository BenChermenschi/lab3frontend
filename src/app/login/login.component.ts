import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../core/base/base.component';
import { FormBuilder, ReactiveFormsModule, FormGroup, FormControl, FormsModule } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { takeUntil } from 'rxjs/operators';
import { APIAuthResponse, APIResponse } from '../core/models/APIResponse.model';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent extends BaseComponent implements OnInit {
  myform = new FormGroup({});


  constructor(private authService: AuthService, private router: Router) {
    super()

  }
  ngOnInit(): void {
    this.myform = new FormGroup({
      email: new FormControl(),
      wachtwoord: new FormControl()
    });
  }

  clearForm() {
    this.myform.reset();
  }

  submit() {
    let email = this.myform.value.email;
    let wachtwoord = this.myform.value.wachtwoord;
    const emailPlausable = this.validateEmail();
    let valid = true;
    if (emailPlausable === false) {
      valid = false;
    }

    if (valid === true) {
      this.authService.login(email, wachtwoord)
        .pipe(takeUntil(this.destroy$))
        .subscribe((response: APIAuthResponse) => {
          console.log(response)
          this.router.navigate(['dashboard'])
        }, error => this.authenticationFailed(error));
    } else {
      this.showMessage("inloggen mislukt : kijk email na");
    }



  }





  validateEmail() {
    //validate email
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.myform.value.email)) {
      return true;
    }
    return false;
  }

  validationFailed() {

  }

  authenticationFailed(error: APIResponse) {
    console.log(error);
    this.clearForm();
    this.showMessage("Inloggen mislukt, check je gegevens");

  }

  showMessage(message: string) {
    alert(message);
  }



}
