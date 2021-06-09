import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/core/base/base.component';
import { APIResponse } from 'src/app/core/models/APIResponse.model';
import { Klasgroep, KlasgroepPut } from 'src/app/core/models/klasgroep.model';
import { KlasgroepService } from 'src/app/core/services/klasgroep.service';

@Component({
  selector: 'app-classgroup-edit',
  templateUrl: './classgroup-edit.component.html',
  styleUrls: ['./classgroup-edit.component.sass']
})
export class ClassgroupEditComponent extends BaseComponent implements OnInit {

  klasgroep: Klasgroep | undefined
  myform = new FormGroup({});

  constructor(
    private route: ActivatedRoute,
    private klasgroepService: KlasgroepService) {
    super()
  }

  ngOnInit(): void {
    this.myform = new FormGroup({
      naam:new FormControl(),
      aantalStudenten:new FormControl()
    });
    this.getKlasgroep();

    this.myform.value.naam.setValue(this.klasgroep?.naam);
    this.myform.value.aantalStudenten.setValue(this.klasgroep?.aantalStudenten);
  }

  submit(){
    
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

  editKlasgroep(): void {
    const editKlasgroep: KlasgroepPut = {
      naam: "string",
      aantalStudenten: 12
    };

    const id = this.route.snapshot.data.id;

    this.klasgroepService
      .update(id, editKlasgroep)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: APIResponse) => {

      });
  }

}
