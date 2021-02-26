import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { decodeJwtPayload, NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { NbRoleProvider } from '@nebular/security';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Users } from '../interfaces/users';
import { StatesService } from './states.service';

@Injectable({
  providedIn: 'root',
})
export class UtilsService implements NbRoleProvider {

  constructor(private _stateService: StatesService,
              private authService: NbAuthService) { }


  /**
   * Attribut le rôle à l'application
   * @return Observable<string> => rôle
   */
  public getRole(): Observable<string> {
    return this.authService.onTokenChange()
      .pipe(map((token: NbAuthJWTToken) => {
        const user: Users = decodeJwtPayload(token.getValue());
        return token.isValid() && user ? user.role.toLowerCase() : '';
      }));
  }

  /**
   * Formate la date pour un meilleur affichage
   * @param date: string
   * @return date formater
   */
  public formatDate(date: string): string {
    const newDate = new Date(date);
    return new DatePipe('en-EN').transform(newDate, 'dd/MM/yyyy HH:mm:ss');
  }

  /**
   * Fait correspondre l'id du rôle avec les rôles
   * @role: identifiant du rôle
   * @return label du rôle
   */
  public formatRole(role: number): string {
    const roles = this._stateService.roles;
    const roleFound = roles.find(r => r.id === role);
    return roleFound && roleFound.label ? roleFound.label : '';
  }

  public ifNodata(): boolean {
    return (this._stateService.clients.length === 0);
  }

}
