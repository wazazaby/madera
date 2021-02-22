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
  public dataCustomers: Client[] = this._stateService.clients;
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

  constructor(private _stateService: StatesService,
              private _bridgeService: BridgeService,
              private cdref: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.listenEvent();
  }

  private listenEvent() {
    this._stateService.clientsAsObservable()
      .pipe(takeUntil(this.destroyed))
      .subscribe((client: Client[]) => {
        if (client && client.length > 0) {
          this.dataCustomers = client;
          this.cdref.detectChanges();
        }
      });
  }

  onCreate($event: any) {
    const newUser: Client = {
      firstName: $event.newData.firstName,
      lastName: $event.newData.lastName,
      city: $event.newData.city,
      postalCode: $event.newData.postalCode,
      adressLine1: $event.newData.adressLine1,
      email: $event.newData.email,
      phoneNumber: $event.newData.phoneNumber,
      password: $event.newData.password,
      quotation: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this._bridgeService.addClient(newUser).subscribe((res) => {
      if (res && res.length > 0) {
        this.dataCustomers = res;
        $event.confirm.resolve();
      }
    });
    console.log('*evt onCreate customers', $event);
  }

  onEdit($event: any) {
    console.log('*evt onEdit customers', $event);
  }

  onDelete($event: any) {
    console.log('*evt onDelete customers', $event);
  }

  // Clean obs
  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
