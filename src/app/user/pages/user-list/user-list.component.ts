import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/core/base/base.component';
import { APIResponse } from 'src/app/core/models/APIResponse.model';
import { Gebruiker } from 'src/app/core/models/gebruiker.model';
import { GebruikerService } from 'src/app/core/services/gebruiker.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.sass']
})
export class UserListComponent extends BaseComponent implements OnInit {

  gebruikers:Gebruiker[]=[];
  constructor(private gebruikerService:GebruikerService, private router:Router) { 
    super();
  }

  ngOnInit(): void {
    this.getGebruikers();
  }

  getGebruikers(): void{
    this.gebruikerService
    .getAll().pipe(takeUntil(this.destroy$))
    .subscribe((response:Gebruiker[])=>{
      this.gebruikers = response;
    })
  }

  hasGebruiker(){
    return this.gebruikers.length >0;
  }

  editGebruiker(id:string){
    this.router.navigate(['/user/edit/',id]);
  }

  removeGebruiker(id:string){
    this.gebruikerService
      .delete(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response:APIResponse)=>{
        //console.log("msg",response);
        if  (response.message ==="user sucessfully deleted"){
          this.showMessage("Succesvol verwijderd");
          
        }else{
          this.showMessage("Er is iets misgelopen");
        }
        this.getGebruikers();
      
      })
  }

  showMessage(message:string){
    alert(message);
  }


}
