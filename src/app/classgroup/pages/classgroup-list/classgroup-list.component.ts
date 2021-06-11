import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/core/base/base.component';
import { APIResponse } from 'src/app/core/models/APIResponse.model';
import { Klasgroep } from 'src/app/core/models/klasgroep.model';
import { KlasgroepService } from 'src/app/core/services/klasgroep.service';

@Component({
  selector: 'app-classgroup-list',
  templateUrl: './classgroup-list.component.html',
  styleUrls: ['./classgroup-list.component.sass']
})
export class ClassgroupListComponent extends BaseComponent implements OnInit {

  klasgroepen: Klasgroep[] = []
  constructor(private klasgroepService: KlasgroepService,private router:Router) {
    super()
  }

  ngOnInit(): void {
    this.getKlasgroepen()
  }

  getKlasgroepen(): void {
    this.klasgroepService
      .getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: Klasgroep[]) => {
        this.klasgroepen = response
      })
  }

  editKlasgroep(id:string){
    this.router.navigate(['/classgroup/edit/',id]);
  }

  

  hasKlasgroepen() {
    return this.klasgroepen.length > 0
  }

  removeKlasgroep(id: string) {
    this.klasgroepService
      .delete(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: APIResponse) => {
        console.log("msg", response);
        this.getKlasgroepen();
        alert(response);
      })
  }

}
