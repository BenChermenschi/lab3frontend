import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/core/base/base.component';
import { Vak } from 'src/app/core/models/vak.model';
import { VakService } from 'src/app/core/services/vak.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.sass']
})
export class CourseListComponent extends BaseComponent implements OnInit {

  vakken:Vak[]=[]
  constructor(private vakService: VakService, private router:Router) {
    super()
   }

  ngOnInit(): void {
    this.getVakken()
  }

  getVakken():void{
    this.vakService
    .getAll().pipe(takeUntil(this.destroy$))
    .subscribe((response:Vak[])=>{
      this.vakken = response
    })
  }

}
