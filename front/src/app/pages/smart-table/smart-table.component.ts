import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableAdd, SmartTableDelete, SmartTableEdit } from '../../interfaces/SmartTableSetting';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SmartTableComponent implements OnInit, OnDestroy {

  // Paramètres des boutons du tableau
  private _setting: any = {
    mode: 'inline',
    actions: {
      add: false,
    },
    // add: {
    //   addButtonContent: '<i class="nb-plus"></i>',
    //   createButtonContent: '<i class="nb-checkmark"></i>',
    //   cancelButtonContent: '<i class="nb-close"></i>',
    //   confirmCreate: true,
    // },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: null,
  };

  // Init les intitulés de colonne
  @Input() public columns: any;
  // Charge les datas
  @Input() public data: any[];
  // Observe les ajout/modification de data
  @Input() public refresh: EventEmitter<any>;
  // Ajoute les actions de suppression et de modification
  @Input() public actions: boolean = true;
  // Init le tableau en data
  private _source: LocalDataSource = new LocalDataSource();
  /** Subject utilisé pour le unsubscribe de tout les obs */
  private destroyed = new Subject();

  @Output() public create: EventEmitter<SmartTableAdd<any>> = new EventEmitter<SmartTableAdd<any>>();
  @Output() public edit: EventEmitter<SmartTableEdit<any>> = new EventEmitter<SmartTableEdit<any>>();
  @Output() public delete: EventEmitter<SmartTableDelete<any>> = new EventEmitter<SmartTableDelete<any>>();
  @Output() public rowselect: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    if (this.columns) {
      this._setting.columns = this.columns;
    }

    if (this.data && this.data.length > 0) {
      this._source.load(this.data).then();
    }

    if (!this.actions) {
      this._setting.actions = {
        add: false,
        edit: false,
        delete: false,
      };
    }

    // Observe les changements sur la table
    if (this.refresh) {
      this.refresh
        .pipe(takeUntil(this.destroyed))
        .subscribe(res => {
          this.data = res;
          this._source.load(this.data).then();
          this._source.refresh();
        });
    }
  }

  public onCreate(event: SmartTableAdd<any>) {
    this.create.emit(event);
  }

  public onEdit(event: SmartTableEdit<any>) {
    this.edit.emit(event);
  }

  public onDelete(event: SmartTableDelete<any>) {
    if (window.confirm('Voulez vous supprimez cette élément ?')) {
      this.delete.emit(event);
    } else {
      event.confirm.reject();
    }
  }

  public rowSelect($event: any) {
    this.rowselect.emit($event);
  }

  /**
   * Alimente le tableau avec les datas
   * @return LocalDataSource
   */
  public getSource(): LocalDataSource {
    return this._source;
  }

  /**
   * Alimente la configuration du tableau
   * @return any
   */
  public getSetting(): any {
    return this._setting;
  }

  /**
   * Détruit les observables
   */
  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
