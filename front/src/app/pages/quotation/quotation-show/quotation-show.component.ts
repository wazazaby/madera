import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { StatesService } from '../../../services/states.service';
import { BridgeService } from '../../../services/bridge.service';
import { takeUntil } from 'rxjs/operators';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'ngx-quotation-show',
  templateUrl: './quotation-show.component.html',
  styleUrls: ['./quotation-show.component.scss'],
})
export class QuotationShowComponent implements OnDestroy {

  private id: number = 0;

  public quotation: any;

  /** Subject utilisé pour le unsubscribe de tout les obs */
  private destroyed = new Subject();

  constructor(private route: ActivatedRoute,
              public router: Router,
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
            }
          });
      }
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
    this._utilsService.showToast('Devis annuler', 'danger');
  }

  valider() {
    this._utilsService.showToast('Devis valider', 'success');
  }
}
