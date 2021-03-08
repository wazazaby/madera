import { Component, OnDestroy, OnInit } from '@angular/core';
import { StatesService } from '../../services/states.service';
import { UtilsService } from '../../services/utils.service';
import { BridgeService } from '../../services/bridge.service';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { decodeJwtPayload, NbAuthService, NbAuthToken } from '@nebular/auth';

@Component({
  selector: 'ngx-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent implements OnDestroy {

  /** Subject utilisé pour le unsubscribe de tout les obs */
  private destroyed = new Subject();

  public user: any;

  constructor(private _stateService: StatesService,
              private _authService: NbAuthService,
              private _utilsService: UtilsService,
              private _bridgeService: BridgeService) {
    this._authService.getToken()
      .pipe(takeUntil(this.destroyed))
      .subscribe((token: NbAuthToken) => {
        if (token) {
          this.user = decodeJwtPayload(token.getValue());
        }
      });
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

}
