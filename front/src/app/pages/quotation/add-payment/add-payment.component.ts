import { Component, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StatesService } from '../../../services/states.service';
import { BridgeService } from '../../../services/bridge.service';
import { Subject } from 'rxjs';
import { NbDialogRef } from '@nebular/theme';
import { takeUntil } from 'rxjs/operators';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'ngx-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.scss'],
})
export class AddPaymentComponent implements OnDestroy {

  @Input() title: string;
  @Input() data: any;

  /** Subject utilisé pour le unsubscribe de tout les obs */
  private destroyed: Subject<any> = new Subject();

  public formPayment: FormGroup = this._formBuild.group({
    value: new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,}[.,]{0,1}[0-9]{0,2}')]),
  });

  constructor(private _formBuild: FormBuilder,
              private _stateService: StatesService,
              private _bridgeService: BridgeService,
              private _utilsService: UtilsService,
              protected ref: NbDialogRef<AddPaymentComponent>) { }


  public dismiss() {
    this.ref.close();
  }

  public valider() {
    if (this.formPayment.valid) {
      this._bridgeService.addPayment(this.formPayment.value.value, this.data.id)
        .pipe(takeUntil(this.destroyed))
        .subscribe((res) => {
          this._utilsService.showToast(res.message);
          const quotation: any = this._stateService.paymentById;

          if (quotation.orders) {
            const foundIndex = quotation.orders.payments.findIndex(p => p.id === this.data.id);
            if (foundIndex > -1) {
              quotation.orders.payments[foundIndex] = res.data['payment'];
            }
          }
          quotation.orders.totalPaid = res.data['totalPaid'];
          this._stateService.paymentById = quotation;
          this.ref.close();
        },
          (err) => {
            this._utilsService.showToast(err.error.message, 'danger');
          });
    }
  }


  // Clean obs
  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

}
