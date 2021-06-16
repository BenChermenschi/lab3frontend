import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http"
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { tap } from "rxjs/operators";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService:AuthService, private router:Router){

    }

    intercept(request: HttpRequest<any>, next: HttpHandler)
        : Observable<HttpEvent<any>> {

        //Add header here
        const token:string = this.authService.getTokenString();
        

        const customReq = request.clone({
            headers:request.headers.set('auth',token)
        });
        console.log("token = "+token);

        
        

        return next.handle(customReq).pipe(tap(()=>{},
        (err:any)=>{
            if (err instanceof HttpErrorResponse) {
                if (err.status == 401) {
                    alert("401");
                     this.router.navigate(['/login']);
                     this.authService.logout();
                }
                if (err.status == 403) {
                    
                    alert("403");
                    this.router.navigate(['/dashboard']);
                }
                
            }
        }));
    }
}


