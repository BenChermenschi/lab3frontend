import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";


@Injectable()
export class IsLoggedInGuard implements CanActivate {

    constructor(private authService: AuthService,
        private router: Router) { }

    canActivate(

        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        // your  logic goes here

        const isLoggedIn = this.authService.isLoggedIn()

        if (!isLoggedIn) {
            this.router.navigate(['/login'])
        }
        return isLoggedIn
    }
}

@Injectable()
export class IsAdminGuard implements CanActivate{
    constructor(private authService:AuthService, private router:Router){}

    canActivate(
        next:ActivatedRouteSnapshot,
        state: RouterStateSnapshot):boolean{
            const isAdmin = this.authService.isAdmin();

            
            if (!isAdmin) {
                this.router.navigate(['/dashboard']);
            }
            return true;
        }
    
}


@Injectable()
export class IsNotLoggedInGuard implements CanActivate {

    constructor(private authService: AuthService,
        private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {

        const isLoggedIn = this.authService.isLoggedIn()

        if (isLoggedIn) {
            this.router.navigate(['/dashboard'])
        }
        return true
    }
}


