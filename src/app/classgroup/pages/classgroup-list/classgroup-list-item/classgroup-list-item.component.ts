import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/core/base/base.component';
import { Klasgroep } from 'src/app/core/models/klasgroep.model';

@Component({
  selector: '[app-classgroup-list-item]',
  templateUrl: './classgroup-list-item.component.html',
  styleUrls: ['./classgroup-list-item.component.sass']
})
export class ClassgroupListItemComponent extends BaseComponent implements OnInit {
  @Input() klasgroep:Klasgroep ;
  constructor(private router:Router) {
    super();
    this.klasgroep =  {_id:"",naam:"",aantalStudenten:0};
  }

  ngOnInit(): void {
  }

  selecteerKlasgroep(){
    this.router.navigate(['/classgroup/detail',this.klasgroep._id]);
  }

}
