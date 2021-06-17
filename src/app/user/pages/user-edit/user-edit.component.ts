import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/core/base/base.component';
import { APIResponse } from 'src/app/core/models/APIResponse.model';
import { Gebruiker, GebruikerPut } from 'src/app/core/models/gebruiker.model';
import { Gebruikerstype } from 'src/app/core/models/gebruikerstype.model';
import { GebruikerService } from 'src/app/core/services/gebruiker.service';
import { GebruikerstypeService } from 'src/app/core/services/gebruikerstype.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.sass']
})
export class UserEditComponent extends BaseComponent implements OnInit {
  gebruiker:Gebruiker |undefined;
  myform = new FormGroup({});
  gebruiker$!:Observable<Gebruiker>;
  private routeSub:Subscription | undefined;
  Id:String="";
  
  gebruikerstypes:Gebruikerstype[]=[];

  constructor(private route:ActivatedRoute,
    private gebruikerService:GebruikerService,
    private gebruikerstypeService:GebruikerstypeService,
    private router:Router) {
      super();
      this.routeSub = undefined;
     }

  ngOnInit(): void {
    this.setMyform();
    this.getGebruikerstypes();
  
    

    this.routeSub=this.route.params
    .subscribe(params=>{
      //console.log(params['id']);
      this.Id = params['id'];
      
      this.gebruikerService
      .getById(params['id'])
      .subscribe((response:Gebruiker)=>{

        
        this.gebruiker = response;
        
        this.fillFields();
      });
    });
  }

  setMyform(){
    this.myform = new FormGroup({
      email:new FormControl(),
      naam:new FormControl(),
      voornaam:new FormControl(),
      gebruikerstype:new FormControl()
      
    });

  }
  
  fillFields(){
    this.myform.setValue({
      email:this.gebruiker?.email,
      naam:this.gebruiker?.naam,
      voornaam:this.gebruiker?.voornaam,
      gebruikerstype:this.gebruiker?.gebruikerstype
    });

    this.myform.controls['gebruikerstype'].setValue(this.gebruiker?.gebruikerstype._id)
  }

  getGebruikerstypes():void{
    this.gebruikerstypeService
      .getAll().pipe(takeUntil(this.destroy$))
      .subscribe((response:Gebruikerstype[])=>{
        this.gebruikerstypes = response;
      })
  }

  


  submit(){
    this.editGebruiker();
  }

  editGebruiker(): void{
    let email = this.myform.value.email;
    let naam = this.myform.value.naam;
    let voornaam = this.myform.value.voornaam;
    let gebruikerstype = this.myform.value.gebruikerstype;
    let wachtwoord = this.myform.value.wachtwoord;
    let herwachtwoord = this.myform.value.herwachtwoord;


    const editGebruiker:GebruikerPut={
      email:email,
      naam:naam,
      voornaam:voornaam,
      gebruikerstype:gebruikerstype,
      wachtwoord:wachtwoord
    }

    this.routeSub=this.route.params.subscribe(params=>{
      this.gebruikerService
      .update(params['id'],editGebruiker)
      .subscribe((response:APIResponse)=>{
        //console.log(response);
        if (response.message==="gebruiker updated") {
          this.showMessage("Gebruiker succesvol aangepast");
          this.router.navigate(['/user']);
        }else{
          this.showMessage("Er is iets misgelopen");
        }
      })


    });
  }
  ngOnDestroy() {
    if (this.routeSub !=undefined) {
      this.routeSub.unsubscribe();
    }
    
  }

  

}
