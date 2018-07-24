import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { AngularFireAuth } from "angularfire2/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _afAuth: AngularFireAuth,
    private _router: Router
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this._afAuth.authState.pipe(map(auth => {
      if (!auth) {
        this._router.navigate(['/login']);
        return false;
      } else {
        return true;
      }
    }))
  }
}
