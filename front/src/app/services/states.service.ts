import { Injectable } from '@angular/core';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { NbRoleProvider } from '@nebular/security';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StatesService implements NbRoleProvider {

  /** Utilisateur */
  private _user: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authService: NbAuthService) {}

  /**
   * Attribut le rôle à l'application
   * @return Observable<string> => rôle
   */
  public getRole(): Observable<string> {
    return this.authService.onTokenChange()
      .pipe(map((token: NbAuthJWTToken) => {
        console.log('*token', token);
        // return token.isValid() ? token.getPayload()['role'] : 'admin';
        // TODO à supprimer
        return 'admin';
      }));
  }
}
