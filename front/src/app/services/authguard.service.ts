import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthguardService implements CanActivate {

  constructor(private authService: NbAuthService,
              private router: Router) {}

  // Vérifie si l'utilisateur est authentifier
  canActivate() {
    return this.authService.isAuthenticated()
      .pipe(tap(
        (authenticated: boolean) => {
          if (!authenticated) {
            this.router.navigate(['auth/login']);
          }
        }),
      );
  }
}
