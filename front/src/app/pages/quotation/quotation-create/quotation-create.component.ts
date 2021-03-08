import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { SoftClient } from '../../../interfaces/client';
import { StatesService } from '../../../services/states.service';
import { BridgeService } from '../../../services/bridge.service';
import { Subject } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Module } from '../../../interfaces/module';
import { Router } from '@angular/router';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'ngx-quotation-create',
  templateUrl: './quotation-create.component.html',
  styleUrls: ['./quotation-create.component.scss'],
})
export class QuotationCreateComponent implements OnInit, OnDestroy {

  public customers: SoftClient[] = [];
  public modules: Module[] = [];
  public clientId: SoftClient;
  public modulesId: Module[] = [];

  /** Subject utilisé pour le unsubscribe de tout les obs */
  private destroyed: Subject<any> = new Subject();

  constructor(private _stateService: StatesService,
              private _bridgeService: BridgeService,
              public router: Router,
              private _utilsService: UtilsService,
              private _formBuild: FormBuilder) { }

  public formQuotation: FormGroup = this._formBuild.group({
    clientId: new FormControl('', [Validators.required]),
    label: new FormControl('', [Validators.required]),
    shortDescription: new FormControl('',  [Validators.required]),
    modulesId: new FormControl([], [Validators.required]),
  });

  ngOnInit(): void {
    this.loadData();
  }

  /**
   * Crée un devis
   */
  public onCreate(): void {
    if (this.formQuotation.valid) {
      const mod = [];

      this.formQuotation.value.modulesId.forEach(m => {
        mod.push(m.id);
      });

      const data = {
        clientId: this.formQuotation.value.clientId.clientId,
        label: this.formQuotation.value.label,
        shortDescription: this.formQuotation.value.shortDescription,
        modulesId: mod,
      };

      this._bridgeService.addQuotation(data)
        .pipe(takeUntil(this.destroyed))
        .subscribe((res) => {
          this._utilsService.showToast(res.message);
          this.router.navigateByUrl(`pages/quotation/${res.data['quotation'].id}`).then();
        }, (err) => {
          this._utilsService.showToast(err.statusText, 'danger');
      });
    }
}

  /**
   * Charge la liste des clients par commercial
   */
  private loadData() {
    this._stateService.clientsAsObservable()
      .pipe(takeUntil(this.destroyed))
      .subscribe((client: SoftClient[]) => {
        if (client && client.length > 0) {
          this.customers = client;
          console.log('*ici', client);
        }
      });

    this._stateService.modulesAsObservable()
      .pipe(takeUntil(this.destroyed))
      .subscribe((module: Module[]) => {
        if (module && module.length > 0) {
          this.modules = module;
        }
      });
  }

  // Clean obs
  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

}
