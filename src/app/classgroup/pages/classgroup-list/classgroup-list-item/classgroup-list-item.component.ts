import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Klasgroep } from 'src/app/core/models/klasgroep.model';

@Component({
  selector: 'app-classgroup-list-item',
  templateUrl: './classgroup-list-item.component.html',
  styleUrls: ['./classgroup-list-item.component.sass']
})
export class ClassgroupListItemComponent implements OnInit {
  @Input() klasgroep:Klasgroep ;
  constructor(private router:Router) {
    this.klasgroep =  {_id:"",naam:"",aantalStudenten:0};
  }

  ngOnInit(): void {
  }

}
