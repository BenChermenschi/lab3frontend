import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/base/base.component';
import { Klasgroep } from 'src/app/core/models/klasgroep.model';
import { KlasgroepService } from 'src/app/core/services/klasgroep.service';
import { takeUntil } from 'rxjs/operators';
import { Vak } from 'src/app/core/models/vak.model';
import { Gebruiker } from 'src/app/core/models/gebruiker.model';
import { FormControl, FormGroup } from '@angular/forms';
import { VakService } from 'src/app/core/services/vak.service';
import { GebruikerService } from 'src/app/core/services/gebruiker.service';
import { Router } from '@angular/router';
import { VragenLijst, VragenLijstPost } from 'src/app/core/models/vragenLijst.model';
import { VragenlijstService } from 'src/app/core/services/vragenlijst.service';
import { APIResponse } from 'src/app/core/models/APIResponse.model';

@Component({
  selector: 'app-survey-create',
  templateUrl: './survey-create.component.html',
  styleUrls: ['./survey-create.component.sass']
})
export class SurveyCreateComponent extends BaseComponent implements OnInit {


  myform = new FormGroup({});

  klasgroepen: Klasgroep[] = [];
  vakken:Vak[]=[];
  gebruikers:Gebruiker[]=[]; // remove this one once login works again

  


  constructor(private vragenlijstService:VragenlijstService ,private klasgroepService: KlasgroepService,private vakService:VakService,private gebruikerService:GebruikerService,private router:Router) {
    super();
  }

  ngOnInit(): void {
    this.initiateMyForm();
    this.initiateKlasGroepen();
    this.initiateVakken();
    this.initiateGebruikers();


  }

  initiateMyForm(){
    this.myform= new FormGroup({
      klasgroep:new FormControl(),
      vak:new FormControl(),
      gebruiker:new FormControl()
    });
  }

  initiateKlasGroepen() {
    this.klasgroepService.getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe((responseKlasgroeppen: Klasgroep[]) => {
        this.klasgroepen = responseKlasgroeppen;
      
      })
  }

  initiateVakken(){
    this.vakService.getAll()
    .pipe(takeUntil(this.destroy$))
    .subscribe((response:Vak[])=>{
      this.vakken = response;
     
    })
  }

  initiateGebruikers(){
    this.gebruikerService.getAll()
    .pipe(takeUntil(this.destroy$))
    .subscribe((response:Gebruiker[])=>{
      this.gebruikers = response;
     
    })
  }

  clearForm(){
    this.myform.reset();
  }

  submit(){
    this.createVragenlijst();
  }


  createVragenlijst(){
    

    const klasgroep =[this.myform.value.klasgroep];
    const vak = this.myform.value.vak;
    const gebruiker=this.myform.value.gebruiker;
    
    const newVragenlijst:VragenLijstPost={
      klasgroepen:klasgroep,
      vak:vak,
      gebruiker:gebruiker
    }

    this.vragenlijstService
    .create(newVragenlijst)
    .pipe(takeUntil(this.destroy$))
    .subscribe((response:APIResponse)=>{
      if (response.message === "vragenlijst created") {
        this.router.navigate(['/survey']);
      }else{
        this.showMessage("Something went wrong");
      }
    })



    
  }

  showMessage(message:string){
    alert(message);
  }

  
}
