import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../shared/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsGuestGuard implements CanActivate {
  constructor(
    private _authService: AuthService,
    private router: Router
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this._authService.isUserValid().pipe(map((data) => {
      if (data)
        this.router.navigate([''])
      return !data
    }))
  }

}
