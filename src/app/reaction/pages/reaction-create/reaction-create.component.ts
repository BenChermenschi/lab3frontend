import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/core/base/base.component';
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

  vragenlijst:VragenLijst | undefined;
  private routeSub:Subscription | undefined;
  Id:string="";


  constructor(private router:Router,private route:ActivatedRoute,private reactieService:ReactieService,private vragenlijstService:VragenlijstService) { 
    super();

  }

  ngOnInit(): void {

    this.routeSub=this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params=>{
      console.log(params['id']);
      this.Id = params['id'];
      //test if it exists here

      
    });

  }

  testVragenlijstExists(){
    let valid;

    this.vragenlijstService
    .getById(this.Id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((response:VragenlijstDetailed)=>{
      console.log("test")
      console.log(response);
      if (response._id == null || response._id== undefined) {
        valid = false;
      }

    })
    return valid;

  }

  initiateForm(){
    
  }

  submit(){

  }

  createReactie(): void{

  }

}
