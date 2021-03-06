import { Component, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { StatesService } from '../../../services/states.service';
import { BridgeService } from '../../../services/bridge.service';
import { UtilsService } from '../../../services/utils.service';
import { NbDialogRef } from '@nebular/theme';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Client } from '../../../interfaces/client';
import { ResponsesApi } from '../../../interfaces/responses-api';

@Component({
  selector: 'ngx-customers-modal-add',
  templateUrl: './customers-modal-add.component.html',
  styleUrls: ['./customers-modal-add.component.scss'],
})
export class CustomersModalAddComponent implements OnDestroy {

  @Input() title: string;

  /** Information de l'utilisateur */
  public formClient: FormGroup = this._formBuild.group({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
    city: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^(?:(?:\\+|00)33[\\s.-]{0,3}(?:\\(0\\)[\\s.-]{0,3})?|0)[1-9](?:(?:[\\s.-]?\\d{2}){4}|\\d{2}(?:[\\s.-]?\\d{3}){2})$')]),
    postalCode: new FormControl('', [Validators.required]),
    adressLine1: new FormControl('', [Validators.required]),
    quotation: new FormControl([]),
  });

  /** Subject utilisé pour le unsubscribe de tout les obs */
  private destroyed = new Subject();

  constructor(private _statesService: StatesService,
              private _bridgeService: BridgeService,
              private _utilsService: UtilsService,
              private _formBuild: FormBuilder,
              protected ref: NbDialogRef<CustomersModalAddComponent>) {}

  public onCreate(): void {
    if (this.formClient.valid) {
      const clientUser: any = {
        firstName: this.formClient.value.firstName,
        lastName: this.formClient.value.lastName,
        email: this.formClient.value.email,
        city: this.formClient.value.city,
        phoneNumber: this.formClient.value.phoneNumber,
        postalCode: this.formClient.value.postalCode,
        adressLine1: this.formClient.value.adressLine1,
        quotation: this.formClient.value.quotation,
      };

      this._bridgeService.addClient(clientUser)
        .pipe(takeUntil(this.destroyed))
        .subscribe(
          (res) => {
            this._bridgeService.getClients()
              .pipe(takeUntil(this.destroyed))
              .subscribe((clients: ResponsesApi<Client[]>) => {
                if (clients && clients.data && clients.data['clients'].length > 0) {
                  this._statesService.clients = this._utilsService.clientToSoft(clients.data['clients']);
                  this.ref.close();
                }
              });
        },
        (err) => {
          this._utilsService.showToast(err.error.message, 'danger');
        });
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
