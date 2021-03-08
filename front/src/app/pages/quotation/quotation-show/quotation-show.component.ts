import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { StatesService } from '../../../services/states.service';
import { BridgeService } from '../../../services/bridge.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ngx-quotation-show',
  templateUrl: './quotation-show.component.html',
  styleUrls: ['./quotation-show.component.scss'],
})
export class QuotationShowComponent implements OnInit, OnDestroy {

  private id: number = 0;

  private quotation: any;

  /** Subject utilisé pour le unsubscribe de tout les obs */
  private destroyed = new Subject();

  constructor(private route: ActivatedRoute,
              private _stateService: StatesService,
              private _bridgeService: BridgeService) {
    this.route.params.subscribe((res) => {
      if (res) {
        this.id = res.id;

        this._bridgeService.getQuotationById(this.id)
          .pipe(takeUntil(this.destroyed))
          .subscribe((quotation) => {
            console.log('*', quotation);
          });
      }
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

}
