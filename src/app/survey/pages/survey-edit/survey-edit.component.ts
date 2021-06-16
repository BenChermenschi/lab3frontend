import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/core/base/base.component';
import { APIResponse } from 'src/app/core/models/APIResponse.model';
import { Klasgroep } from 'src/app/core/models/klasgroep.model';
import { Vak } from 'src/app/core/models/vak.model';
import { VragenLijst, VragenLijstPut } from 'src/app/core/models/vragenLijst.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { KlasgroepService } from 'src/app/core/services/klasgroep.service';
import { VakService } from 'src/app/core/services/vak.service';
import { VragenlijstService } from 'src/app/core/services/vragenlijst.service';

@Component({
  selector: 'app-survey-edit',
  templateUrl: './survey-edit.component.html',
  styleUrls: ['./survey-edit.component.sass']
})
export class SurveyEditComponent extends BaseComponent implements OnInit {


  vragenlijst: VragenLijst|undefined;
  myform = new FormGroup({});

  vragenlijst$!:Observable<VragenLijst>;
  private routeSub:Subscription|undefined;

  klasgroepen:Klasgroep[]=[];
  vakken:Vak[]=[];

  Id:string="";

  constructor(
    private route:ActivatedRoute,
    private authService:AuthService,
    private vragenlijstService:VragenlijstService,
    private klasgroepService:KlasgroepService,
    private vakService:VakService,
    private router:Router) {
    super()
  }

  ngOnInit(): void {
    this.initiateMyForm();

    this.routeSub=this.route.params
    .pipe(takeUntil(this.destroy$))
    .subscribe(params=>{
      console.log(params['id']);
      this.Id = params['id'];
      this.getVragenlijst(params['id']);
    });
    
    this.initiateKlasGroepen();
    this.initiateVakken();
    


  }


  initiateMyForm(){
    this.myform= new FormGroup({
      klasgroep:new FormControl(),
      vak:new FormControl()
    });
  }

  getVragenlijst(id:string){
    this.vragenlijstService.getById(id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((response:VragenLijst)=>{
      this.vragenlijst = response;
      this.fillFields();
    });
  }

  initiateKlasGroepen() {
    this.klasgroepService.getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe((responseKlasgroeppen: Klasgroep[]) => {
        this.klasgroepen = responseKlasgroeppen;
      });
  }

  initiateVakken(){
    this.vakService.getAll()
    .pipe(takeUntil(this.destroy$))
    .subscribe((response:Vak[])=>{
      this.vakken = response;
    });
  }

  fillFields(){
    this.myform.setValue({
      klasgroep:this.vragenlijst?.klasgroepen[0],
      vak:this.vragenlijst?.vak
    });

    this.myform.controls['klasgroep'].setValue(this.vragenlijst?.klasgroepen[0]._id);
    this.myform.controls['vak'].setValue(this.vragenlijst?.vak._id);
  }

  getGebruiker(){
    return this.authService.getGebruikersId();
  }

  submit(){
    this.editVragenlijst();
  }

  editVragenlijst():void{
    const editVragenlijst:VragenLijstPut={
      klasgroepen:[this.myform.value.klasgroep],
      vak:this.myform.value.vak,
      gebruiker:this.getGebruiker(),
      reacties:[]
    }

    this.routeSub=this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params=>{
      this.vragenlijstService
      .update(params['id'],editVragenlijst)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response:APIResponse)=>{
        console.log(response);
        if (response.message ==="Vragenlijst updated!"){
          this.showMessage("Success");
          this.router.navigate(['/survey']);
        }else{
          this.showMessage("something has gone wrong");
        }
      })
    })
  }

  showMessage(message:string){
    alert(message);
  }





}
