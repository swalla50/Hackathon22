import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private Authguardservice: AuthenticationGuard,private router: Router) { }

  gettoken(){  
    return !!localStorage.getItem("LoggedIn");  
    }  
 
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('LoggedIn')!= null)
    {
      return true;
    }
    else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  
  
}
