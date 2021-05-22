import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/base/base.component';
import { Klasgroep } from 'src/app/core/models/klasgroep.model';
import { KlasgroepService } from 'src/app/core/services/klasgroep.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-survey-create',
  templateUrl: './survey-create.component.html',
  styleUrls: ['./survey-create.component.sass']
})
export class SurveyCreateComponent extends BaseComponent implements OnInit {

  klasgroepen: Klasgroep[] = [];

  constructor(private klasgroepService: KlasgroepService) {
    super()
  }

  ngOnInit(): void {
    this.initiateKlasGroepen();
  }

  initiateKlasGroepen() {
    this.klasgroepService.getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe((responseKlasgroeppen: Klasgroep[]) => {
        this.klasgroepen = responseKlasgroeppen;
        console.log(this.klasgroepen);
      })
  }
}
