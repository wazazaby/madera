import { ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { StatesService } from '../../services/states.service';
import { BridgeService } from '../../services/bridge.service';
import { SoftClient } from '../../interfaces/client';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CustomersModalAddComponent } from './customers-modal-add/customers-modal-add.component';
import { NbDialogService } from '@nebular/theme';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'ngx-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit, OnDestroy {

  /** Liste des clients */
  public dataCustomers: SoftClient[] = this._stateService.clients;
  /** Subject utilisé pour le unsubscribe de tout les obs */
  private destroyed: Subject<any> = new Subject();

  public columns: any = {
    firstName: {
      title: 'Nom',
      type: 'string',
    },
    lastName: {
      title: 'Prénom',
      type: 'string',
    },
    email: {
      title: 'E-mail',
      type: 'string',
    },
    city: {
      title: 'Ville',
      type: 'string',
    },
    postalCode: {
      title: 'Code postal',
      type: 'string',
    },
    adressLine1: {
      title: 'Rue',
      type: 'string',
    },
    phoneNumber: {
      title: 'Téléphone',
      type: 'string',
    },
  };

  public refresh: EventEmitter<SoftClient[]> = new EventEmitter<SoftClient[]>(null);

  constructor(private _stateService: StatesService,
              private _bridgeService: BridgeService,
              private cdref: ChangeDetectorRef,
              private _utilsService: UtilsService,
              private _dialogService: NbDialogService) {
  }

  ngOnInit(): void {
    this.loadClients();
  }

  private loadClients() {
    this._stateService.clientsAsObservable()
      .pipe(takeUntil(this.destroyed))
      .subscribe((client: SoftClient[]) => {
        if (client && client.length > 0) {
          this.dataCustomers = client;
          this.cdref.detectChanges();
          this.refresh.emit(this.dataCustomers);
        }
      });
  }

  onEdit($event: any) {
    this._utilsService.showToast('WIP', 'info');
    // console.log('*evt onEdit customers', $event);
  }

  onDelete($event: any) {
    this._utilsService.showToast('WIP', 'info');
    // console.log('*evt onDelete customers', $event);
  }

  // Clean obs
  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  public openModal() {
    this._dialogService.open(CustomersModalAddComponent, {
      context: {
        title: 'Ajouter un client',
      },
    });
  }
}
