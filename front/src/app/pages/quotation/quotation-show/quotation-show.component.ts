import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { StatesService } from '../../../services/states.service';
import { BridgeService } from '../../../services/bridge.service';
import { takeUntil } from 'rxjs/operators';
import { UtilsService } from '../../../services/utils.service';
import { NbDialogService } from '@nebular/theme';
import { AddPaymentComponent } from '../add-payment/add-payment.component';
import { PaymentHistoryComponent } from '../payment-history/payment-history.component';

@Component({
  selector: 'ngx-quotation-show',
  templateUrl: './quotation-show.component.html',
  styleUrls: ['./quotation-show.component.scss'],
})
export class QuotationShowComponent implements OnInit, OnDestroy {

  private id: number = 0;

  public quotation: any;

  /** Subject utilisé pour le unsubscribe de tout les obs */
  private destroyed = new Subject();

  constructor(private route: ActivatedRoute,
              public router: Router,
              private _dialogService: NbDialogService,
              private _stateService: StatesService,
              private _utilsService: UtilsService,
              private _bridgeService: BridgeService) {
    this.route.params.subscribe((res) => {
      if (res) {
        this.id = res.id;

        this._bridgeService.getQuotationById(this.id)
          .pipe(takeUntil(this.destroyed))
          .subscribe((quotation) => {
            if (quotation && quotation.data && quotation.data['quotation']) {
              this.quotation = quotation.data['quotation'];

              // Regroupe par module
              if (this.quotation && this.quotation.modules) {
                const mod = this.quotation.modules;
                const newMod = [];

                mod.forEach(m => {
                  const find = newMod.find(p => p.moduleId === m.moduleId);
                  if (find) {
                    find.count++;
                    newMod.splice(newMod.findIndex(p => p.moduleId === m.moduleId), 1);
                    newMod.push(find);
                  } else {
                    m.count = 1;
                    newMod.push(m);
                  }
                });

                newMod.sort((a, b) => {
                  if ( a.module.label < b.module.label ) {
                    return -1;
                  }
                  if ( a.module.label > b.module.label ) {
                    return 1;
                  }
                  return 0;
                });

                this.quotation.modules = newMod;
                this._stateService.paymentById = this.quotation;
              }
            }
          });
      }
    });
  }

  ngOnInit() {
    this._stateService.paymentByIdAsObservable()
      .pipe(takeUntil(this.destroyed))
      .subscribe((res) => {
        this.quotation = null;
        this.quotation = res;
    });
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  public redirect(id) {
    if (id > 0) {
      this.router.navigateByUrl(`pages/modules/${id}`).then();
    }
  }

  annuler() {
    this._bridgeService.denyQuotation(this.id)
      .pipe(takeUntil(this.destroyed))
      .subscribe((res) => {
        this.quotation.status = res.data['quotation'].status;
        this._utilsService.showToast(res.message, 'danger');
      });
  }

  valider() {
    this._bridgeService.approveQuotation(this.id)
      .pipe(takeUntil(this.destroyed))
      .subscribe((res) => {
        this.quotation.status = res.data['quotation'].status;
        this.quotation.orders = res.data['quotation'].orders;
        this._utilsService.showToast(res.message, 'success');
      });
  }

  getStatus() {
    if (this.quotation && this.quotation.status) {
      return this.quotation.status.label !== 'En attente';
    } else {
      return true;
    }
  }

  public addPayment(data: any) {
    this._dialogService.open(AddPaymentComponent, {
      context: {
        title: 'Ajouter un payement',
        data,
      },
    });
  }

  public showHistory(data: any) {
    this._dialogService.open(PaymentHistoryComponent, {
      context: {
        title: 'Historique des payements',
        data,
      },
    });
  }
}
