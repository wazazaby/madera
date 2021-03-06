import { Component, OnDestroy, OnInit } from '@angular/core';
import { SmartTableDelete, SmartTableEdit, SmartTableSelect } from '../../interfaces/SmartTableSetting';
import { StatesService } from '../../services/states.service';
import { BridgeService } from '../../services/bridge.service';
import { UtilsService } from '../../services/utils.service';
import { Module } from '../../interfaces/module';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss'],
})
export class ModulesComponent implements OnInit, OnDestroy {
  columns = {
    label: {
      title: 'Label',
      type: 'string',
    },
    reference: {
      title: 'Référence',
      type: 'string',
    },
    shortDescription: {
      title: 'Courte description',
      type: 'string',
    },
    description: {
      title: 'Description',
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

  data: Module[] = [];
  /** Subject utilisé pour le unsubscribe de tout les obs */
  private destroyed = new Subject();

  constructor(private _stateService: StatesService,
              private _bridgeService: BridgeService,
              private _utilsService: UtilsService,
              public router: Router) {}

  ngOnInit(): void {
    this.loadModules();
  }

  onEdit($event: SmartTableEdit<Module>) {

  }

  onDelete($event: SmartTableDelete<Module>) {

  }


  /**
   * Action au click sur la row du table
   * @param evt: event smart table select row
   * @return void
   */
  select(evt: SmartTableSelect<Module>) {
    if (evt && evt.data && evt.data.id > 0) {
      this.router.navigateByUrl(`pages/modules/${evt.data.id}`).then();
    }
  }

  private loadModules() {
    this._stateService.modulesAsObservable()
      .pipe(takeUntil(this.destroyed))
      .subscribe((module: Module[]) => {
      if (module && module.length > 0) {
        this.data = module;
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

  openModal() {

  }
}
