import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import {tap} from "rxjs/operators";

@Injectable()
export class AuthenticationguardInterceptor implements HttpInterceptor{


    constructor(private router: Router){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(localStorage.getItem('LoggedIn') == null){
            const clonedReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('LoggedIn'))
            });
            return next.handle(clonedReq).pipe(
                tap(
                    succ =>{},
                    err =>{
                        if(err.status == 401)
                        localStorage.removeItem('LoggedIn');
                        this.router.navigateByUrl('/login');
                    }
                )
            )
        }
        else
        return next.handle(req.clone())
    }

}