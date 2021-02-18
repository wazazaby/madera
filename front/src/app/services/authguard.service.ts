import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthguardService implements CanActivate {

  constructor(
    private authService: NbAuthService,
    private router: Router,
  ) {
  }

  canActivate() {
    return this.authService.isAuthenticated().pipe(
      tap((authenticated: boolean) => {
        console.log('canActivate', authenticated);
        // TODO supprimer le !
        if (!authenticated) {
          this.router.navigate(['auth/login']);
        }
      }),
    );
  }
}
