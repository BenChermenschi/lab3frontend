import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/core/base/base.component';
import { APIResponse } from 'src/app/core/models/APIResponse.model';
import { Vak, VakPut } from 'src/app/core/models/vak.model';
import { VakService } from 'src/app/core/services/vak.service';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.sass']
})
export class CourseEditComponent extends BaseComponent implements OnInit {

  myform = new FormGroup({});
  vak$!:Observable<Vak>;


  constructor(private route:ActivatedRoute,
    private vakService:VakService,
    private router:Router) {
      super();
     }

  ngOnInit(): void {
    this.myform = new FormGroup({
      naam:new FormControl(),
      id:new FormControl()
    });

    this.vak$ = this.route.paramMap.pipe(
      switchMap((params:ParamMap)=>this.vakService.getById(params.get('id')!))
    );
  }


  submit(){

  }

  editVak(): void{
    const editVak:VakPut = {
      naam:this.myform.value.naam
    };

    const id = this.myform.value.id;

    this.vakService
      .update(id,editVak)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response:APIResponse)=>{
        //console.log(response);
        if (response.message === "Vak updated!") {
          this.router.navigate(['/course']);
        }else{
          this.showMessage("Er is iets misgelopen");
        }
      });

  }

  

}
