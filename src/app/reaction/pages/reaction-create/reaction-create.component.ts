import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/core/base/base.component';
import { APIResponse } from 'src/app/core/models/APIResponse.model';
import { ReactiePost } from 'src/app/core/models/reactie.model';
import { VragenLijst, VragenlijstDetailed } from 'src/app/core/models/vragenLijst.model';
import { ReactieService } from 'src/app/core/services/reactie.service';
import { VragenlijstService } from 'src/app/core/services/vragenlijst.service';

@Component({
  selector: 'app-reaction-create',
  templateUrl: './reaction-create.component.html',
  styleUrls: ['./reaction-create.component.sass']
})
export class ReactionCreateComponent extends BaseComponent implements OnInit {


  myform = new FormGroup({});

  idValid:boolean |undefined;

  vragenlijst:VragenLijst | undefined;
  private routeSub:Subscription | undefined;
  Id:string="";


  constructor(private router:Router,private route:ActivatedRoute,private reactieService:ReactieService,private vragenlijstService:VragenlijstService) { 
    super();

  }

  ngOnInit(): void {
    this.initiateMyForm();


    this.routeSub=this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params=>{
      console.log(params['id']);
      this.Id = params['id'];
      //test if it exists here
      this.vragenlijstService
      .getById(this.Id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response:VragenlijstDetailed)=>{
      console.log(response._id);
        this.idValid=true;

      },(err:any)=>{
        console.log(err);
        if (err.status == 404) {
          this.idValid=false;
        }
      
      });
      



    });

  }

  initiateMyForm():void{
    this.myform=new FormGroup({
      benMee:new FormControl(),
      opnieuwUitleggen:new FormControl(),
      welkOnderdeel:new FormControl(),
      andereVragen:new FormControl()

    });
  }



  testVragenlijstExists(){
    

    
    

  }

  validateFields(){
    let valid = true;

    //Filled in?
    if (this.myform.value.benMee === null || this.myform.value.benMee === undefined ) {
      valid = false;
    }
    if (this.myform.value.opnieuwUitleggen === null || this.myform.value.opnieuwUitleggen === undefined ) {
     valid = false; 
    }
    

    //Data Rules
    //check validity of welkOnderdeel when its set to true
    if (JSON.parse(this.myform.value.opnieuwUitleggen)  === true) {
      
      if (this.myform.value.welkOnderdeel === null || this.myform.value.welkOnderdeel === undefined || this.myform.value.welkOnderdeel === "") {
        valid = false;
      }
    }

    //reset welkOnderdeel if its set to false
    if (JSON.parse(this.myform.value.opnieuwUitleggen)  ===false) {
      if (this.myform.value.welkOnderdeel != null  ) {
        this.myform.controls['welkOnderdeel'].setValue("");
      }
      if ( this.myform.value.welkOnderdeel != undefined) {
        this.myform.controls['welkOnderdeel'].setValue("");
      }
      if (this.myform.value.welkOnderdeel != "") {
        this.myform.controls['welkOnderdeel'].setValue("");
      }
    }

    //emptystring for if null or not defined
    if (this.myform.value.andereVragen === null || this.myform.value.andereVragen == undefined) {
      this.myform.controls['andereVragen'].setValue("");
    }

    return valid;
  }

  

  submit(){
    console.log(this.myform.value)



    if (this.validateFields() ===true) {
      console.log(this.myform.value);
      this.createReactie();
    }else{
      this.showMessage("Not all fields are valid, please check and try again");
    }

  }

  createReactie(): void{
    const newReactie: ReactiePost ={
      benMee:JSON.parse(this.myform.value.benMee),
      opnieuwUitleggen:JSON.parse(this.myform.value.opnieuwUitleggen),
      welkOnderdeel:this.myform.value.welkOnderdeel,
      andereVragen:this.myform.value.andereVragen,
      vragenlijst:this.Id
    }

    this.reactieService
    .create(newReactie)
    .pipe(takeUntil(this.destroy$))
    .subscribe((response:APIResponse)=>{
      console.log(response);
      this.router.navigate(['reaction/done']);
    },(err)=>{
      this.showMessage("something has gone wrong");
      console.log(err)
    })





    
  }


  showMessage(message:string){
    alert(message);
  }

}
