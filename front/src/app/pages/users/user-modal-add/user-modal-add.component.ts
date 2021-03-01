import { Component, Input, OnDestroy } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Roles } from '../../../interfaces/roles';
import { StatesService } from '../../../services/states.service';
import { Users } from '../../../interfaces/users';
import { BridgeService } from '../../../services/bridge.service';
import { UtilsService } from '../../../services/utils.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ResponsesApi } from '../../../interfaces/responses-api';

@Component({
  selector: 'ngx-user-modal-add',
  templateUrl: './user-modal-add.component.html',
  styleUrls: ['./user-modal-add.component.scss'],
})
export class UserModalAddComponent implements OnDestroy {

  @Input() title: string;
  /** Liste des rôles */
  public roles: Roles[] = this._stateService.roles;
  /** Information de l'utilisateur */
  public user: Users = {email: '', firstName: '', lastName: '', role: '', phoneNumber: ''};

  /** Subject utilisé pour le unsubscribe de tout les obs */
  private destroyed = new Subject();

  constructor(private _stateService: StatesService,
              private _bridgeService: BridgeService,
              private _utilsService: UtilsService,
              protected ref: NbDialogRef<UserModalAddComponent>) {}


  public isValid(): boolean {
    return this.user.email === '' ||
      this.user.firstName === '' ||
      this.user.lastName === '' ||
      this.user.role === '' ||
      this.user.phoneNumber === '';
  }

  public onCreate(): void {
    if (!this.isValid()) {
        this._bridgeService.addUsers(this.user, this.user.role)
          .pipe(takeUntil(this.destroyed))
          .subscribe(
            (res: ResponsesApi<any>) => {
              if (res) {
                this._utilsService.showToast(res.message);
                this._bridgeService.getUsers()
                  .pipe(takeUntil(this.destroyed))
                  .subscribe((user) => {
                  this._stateService.users = user.data['users'];
                  this.ref.close();
                });
              }
            },
            (err) => {
              this._utilsService.showToast(err.error.message, 'danger');
            },
          );
      }
    }

  public dismiss() {
    this.ref.close();
  }

  /**
   * Détruit les observables
   */
  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

}
