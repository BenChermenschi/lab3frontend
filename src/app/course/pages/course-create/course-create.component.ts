import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/core/base/base.component';
import { APIResponse } from 'src/app/core/models/APIResponse.model';
import { VakPost } from 'src/app/core/models/vak.model';
import { VakService } from 'src/app/core/services/vak.service';

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.sass']
})
export class CourseCreateComponent extends BaseComponent implements OnInit {

  myform = new FormGroup({});
  constructor(private vakService:VakService,private router:Router) {
    super();
   }

  ngOnInit(): void {
    this.myform = new FormGroup({
      naam:new FormControl()
    });
  }

  clearForm(){
    this.myform.reset();
  }

  submit(){
    this.createVak();
  }

  createVak(){
    let naam = this.myform.value.naam;

    const valid = this.validateFields();

    if(valid === true){
      const newVak : VakPost = {
        naam:naam
      }
    

    this.vakService
      .create(newVak)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response:APIResponse)=>{
        console.log(response);
        if (response.message === "vak created") {
          alert("creatie successvol");
          this.router.navigate(['/course']);
        }else{
          alert("creatie mislukt")
        }
      })
    }
  }

  validateFields(){
    let valid = true;
    if (this.myform.value.naam === null || this.myform.value.naam === "") {
      valid = false;
      
    }
    return valid;
  }

}
