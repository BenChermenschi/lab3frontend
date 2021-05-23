
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";


@Injectable({ providedIn: 'root' })
export class IdResolver implements Resolve<string> {

    constructor() { }
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        return route.paramMap.get('id')
    }
}