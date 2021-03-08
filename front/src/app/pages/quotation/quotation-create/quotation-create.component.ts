import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { SoftClient } from '../../../interfaces/client';
import { StatesService } from '../../../services/states.service';
import { BridgeService } from '../../../services/bridge.service';
import { Subject } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-quotation-create',
  templateUrl: './quotation-create.component.html',
  styleUrls: ['./quotation-create.component.scss'],
})
export class QuotationCreateComponent implements OnInit, OnDestroy {

  public customers: SoftClient[] = [];

  public clientId: number;

  /** Subject utilisé pour le unsubscribe de tout les obs */
  private destroyed: Subject<any> = new Subject();

  constructor(private _stateService: StatesService,
              private _bridgeService: BridgeService,
              private _formBuild: FormBuilder) { }

  public formQuotation: FormGroup = this._formBuild.group({
    clientId: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.loadClients();
  }

  /**
   * Crée un devis
   */
  public onCreate(): void {
    if (this.formQuotation.valid) {

    }
}

  /**
   * Charge la liste des clients par commercial
   */
  private loadClients() {
    this._stateService.clientsAsObservable()
      .pipe(takeUntil(this.destroyed))
      .subscribe((client: SoftClient[]) => {
        if (client && client.length > 0) {
          this.customers = client;
          console.log(client);
        }
      });
  }

  // Clean obs
  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

}
