import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { StatesService } from '../../services/states.service';
import { BridgeService } from '../../services/bridge.service';
import { Client } from '../../interfaces/client';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngx-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit, OnDestroy {

  /** Liste des clients */
  public customers: Client[] = [];
  /** Subject utilisé pour le unsubscribe de tout les obs */
  private destroyed = new Subject();

  constructor(private _stateService: StatesService,
              private _bridgeService: BridgeService,
              private cdref: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this._stateService.clientsAsObservable()
      .pipe(takeUntil(this.destroyed))
      .subscribe((client: Client[]) => {
        console.log('*customers', client);
        if (client && client.length > 0) {
          this.customers = client;
          this.cdref.detectChanges();
        }
      });
  }

  // Clean obs
  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

}
