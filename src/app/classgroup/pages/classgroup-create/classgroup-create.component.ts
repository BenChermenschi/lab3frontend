import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/core/base/base.component';
import { APIResponse } from 'src/app/core/models/APIResponse.model';
import { Klasgroep, KlasgroepPost } from 'src/app/core/models/klasgroep.model';
import { KlasgroepService } from 'src/app/core/services/klasgroep.service';

@Component({
  selector: 'app-classgroup-create',
  templateUrl: './classgroup-create.component.html',
  styleUrls: ['./classgroup-create.component.sass']
})
export class ClassgroupCreateComponent extends BaseComponent implements OnInit {
  myform = new FormGroup({});


  constructor(private klasgroepService: KlasgroepService, private router:Router) {
    super()
  }

  ngOnInit(): void {
    this.myform = new FormGroup({
      naam:new FormControl(),
      aantalStudenten:new FormControl()
    });
  }

  clearForm(){
    this.myform.reset();
  }

  submit(){
    this.createKlasgroep();
  }

  createKlasgroep() {
    let naam = this.myform.value.naam;
    let aantalStudenten = this.myform.value.aantalStudenten;
    
    const valid = this.validateFields();

    if(valid ===true){
    const newKlasgroep: KlasgroepPost = {
      naam: naam,
      aantalStudenten: aantalStudenten
    }

    this.klasgroepService
      .create(newKlasgroep)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: APIResponse) => {
        console.log(response)
        if (response.message==="klasgroep created") {
          this.showMessage("Klasgroep succesvol aangemaakt");
          this.router.navigate(['/classgroup']);
        }else{
          this.showMessage("Er is iets misgelopen");
        }
      })
    }else{
      this.showMessage("Incorrect ingevuld");
    }
  }

  validateFields(){
    let valid = true;
    if (this.myform.value.naam === null || this.myform.value.naam==="") {
      valid = false;
    }
    if (this.myform.value.aantalStudenten === null || this.myform.value.aantalStudenten===""){
      valid = false;
    }
    return valid;
  }


  


}
