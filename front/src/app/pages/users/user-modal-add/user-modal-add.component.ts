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
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
  public role: string = '';

  /** Subject utilisé pour le unsubscribe de tout les obs */
  private destroyed = new Subject();

  constructor(private _stateService: StatesService,
              private _bridgeService: BridgeService,
              private _utilsService: UtilsService,
              private _formBuild: FormBuilder,
              protected ref: NbDialogRef<UserModalAddComponent>) {
    // Supprime le rôle: client
    const indexFound = this.roles.findIndex(c => c.id === 4);
    this.roles.splice(indexFound, 1);
  }

  public formUser: FormGroup = this._formBuild.group({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^(?:(?:\\+|00)33[\\s.-]{0,3}(?:\\(0\\)[\\s.-]{0,3})?|0)[1-9](?:(?:[\\s.-]?\\d{2}){4}|\\d{2}(?:[\\s.-]?\\d{3}){2})$')]),
    role: new FormControl('', [Validators.required]),
  });

  public onCreate(): void {
    if (this.formUser.valid) {
      const newUser = {
        firstName: this.formUser.value.firstName,
        lastName: this.formUser.value.lastName,
        email: this.formUser.value.email,
        city: this.formUser.value.city,
        phoneNumber: this.formUser.value.phoneNumber,
        postalCode: this.formUser.value.postalCode,
        adressLine1: this.formUser.value.adressLine1,
        quotation: this.formUser.value.quotation,
        role: this.formUser.value.role,
      };

      this._bridgeService.addUsers(newUser, newUser.role)
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
