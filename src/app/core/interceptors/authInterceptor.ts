import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http"
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService:AuthService){

    }

    intercept(request: HttpRequest<any>, next: HttpHandler)
        : Observable<HttpEvent<any>> {

        //Add header here
        const token:string = this.authService.getTokenString();
        

        const customReq = request.clone({
            headers:request.headers.set('auth',token)
        });
        console.log("token = "+token);

        
        

        return next.handle(customReq)
    }
}