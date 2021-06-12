import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/core/base/base.component';
import {APIResponse} from 'src/app/core/models/APIResponse.model';
import { VragenLijst } from 'src/app/core/models/vragenLijst.model';
import { VragenlijstService } from 'src/app/core/services/vragenlijst.service';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.sass']
})
export class SurveyListComponent extends BaseComponent implements OnInit {

  vragenlijsten:VragenLijst[] = [];
  constructor(private vragenlijstService: VragenlijstService,private router:Router) {
    super()
  }

  ngOnInit(): void {
    this.getVragenlijsten()
  }

  getVragenlijsten():void{
    this.vragenlijstService
      .getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response:VragenLijst[]) => {
      this.vragenlijsten = response
    })
  }

  hasVragenlijsten(){
    return this.vragenlijsten.length > 0;
  }

  editVragenlijst(id:string){
    this.router.navigate(['/survey/edit/',id]);
  }

  removeVragenlijst(id:string){
    this.vragenlijstService
    .delete(id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((response:APIResponse)=>{
      console.log('msg',response);
      this.getVragenlijsten();
      alert(response);
    })
  }

}
