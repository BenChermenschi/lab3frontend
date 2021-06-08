import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/core/base/base.component';
import { APIResponse } from 'src/app/core/models/APIResponse.model';
import { Klasgroep, KlasgroepPost } from 'src/app/core/models/klasgroep.model';
import { KlasgroepService } from 'src/app/core/services/klasgroep.service';

@Component({
  selector: 'app-classgroup-create',
  templateUrl: './classgroup-create.component.html',
  styleUrls: ['./classgroup-create.component.sass']
})
export class ClassgroupCreateComponent extends BaseComponent implements OnInit {

  constructor(private klasgroepService: KlasgroepService) {
    super()
  }

  ngOnInit(): void {
  }

  createKlasgroep() {
    const newKlasgroep: KlasgroepPost = {
      naam: "testgroup0806",
      aantalStudenten: 19
    }

    this.klasgroepService
      .create(newKlasgroep)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: APIResponse) => {
        console.log(response)
      })



  }

}
