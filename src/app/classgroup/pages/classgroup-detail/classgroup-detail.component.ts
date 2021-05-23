import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/core/base/base.component';
import { Klasgroep } from 'src/app/core/models/klasgroep.model';
import { KlasgroepService } from 'src/app/core/services/klasgroep.service';

@Component({
  selector: 'app-classgroup-detail',
  templateUrl: './classgroup-detail.component.html',
  styleUrls: ['./classgroup-detail.component.sass']
})
export class ClassgroupDetailComponent extends BaseComponent implements OnInit {

  klasgroep: Klasgroep | undefined

  constructor(private route: ActivatedRoute,
    private klasgroepService: KlasgroepService) {
    super();
  }

  ngOnInit(): void {
    this.getKlasgroep();
  }

  getKlasgroep(): void {
    const id = this.route.snapshot.data.id;

    this.klasgroepService
      .getById(id)
      .pipe(takeUntil(id))
      .subscribe((response: Klasgroep) => {
        this.klasgroep = response;
      })
  }

}
