import { Component, OnDestroy, OnInit } from '@angular/core';
import { SmartTableAdd, SmartTableDelete, SmartTableEdit } from '../../interfaces/SmartTableSetting';
import { Components } from '../../interfaces/components';
import { Subject } from 'rxjs';
import { StatesService } from '../../services/states.service';
import { BridgeService } from '../../services/bridge.service';
import { UtilsService } from '../../services/utils.service';
import { takeUntil } from 'rxjs/operators';
import { CreateComposantComponent } from './create-composant/create-composant.component';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-composants',
  templateUrl: './composants.component.html',
  styleUrls: ['./composants.component.scss'],
})
export class ComposantsComponent implements OnInit, OnDestroy {
  public columns = {
    label: {
      title: 'Label',
      type: 'string',
    },
    description: {
      title: 'Description',
      type: 'string',
    },
    shortDescription: {
      title: 'Courte description',
      type: 'string',
    },
    price: {
      title: 'Prix',
      type: 'number',
    },
    providerId: {
      title: 'Fournisseur',
      type: 'string',
    },
    reference: {
      title: 'Référence',
      type: 'string',
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
    updatedAt: {
      title: 'Modifier le',
      type: 'date',
      valuePrepareFunction: (date) => {
        return this._utilsService.formatDate(date);
      },
      editable: false,
      addable: false,
    },

  };

  public data: Components[] = [];

  /** Subject utilisé pour le unsubscribe de tout les obs */
  private destroyed = new Subject();

  constructor(private _stateService: StatesService,
              private _bridgeService: BridgeService,
              private _utilsService: UtilsService,
              private _dialogService: NbDialogService) { }
              

  ngOnInit(): void {
    this.loadComponents();
  }

  onCreate($event: SmartTableAdd<Components>) {

  }

  onEdit($event: SmartTableEdit<Components>) {

  }

  onDelete($event: SmartTableDelete<Components>) {

  }

  private loadComponents() {
    this._stateService.composentsAsObservable()
      .pipe(takeUntil(this.destroyed))
      .subscribe((compo: Components[]) => {
      if (compo && compo.length > 0) {
        this.data = compo;
      }
    });
  }

    public openModal() {
        console.log('on passe la')
        this._dialogService.open(CreateComposantComponent, {
            context: {
                title: 'Créer un composant',
            }
        });
    }

  /**
   * Détruit les observables
   */
  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

}
