import { Component, Input, OnInit } from '@angular/core';
import { UtilsService } from '../../../services/utils.service';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.scss'],
})
export class PaymentHistoryComponent {

  @Input() title: string;
  @Input() data: any;

  public columns = {
    value: {
      title: 'Montant',
      type: 'number',
    },
    createdAt: {
      title: 'Crée le',
      type: 'string',
      valuePrepareFunction: (date) => {
        return this._utilsService.formatDate(date);
      },
      editable: false,
      addable: false,
    },
  };

  constructor(private _utilsService: UtilsService,
              protected ref: NbDialogRef<PaymentHistoryComponent>) { }

  public dismiss() {
    this.ref.close();
  }

}
