import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableAdd, SmartTableDelete, SmartTableEdit } from '../../interfaces/SmartTableSetting';

@Component({
  selector: 'app-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SmartTableComponent implements OnInit {

  // Paramètres des boutons du tableau
  private _setting: any = {
    mode: 'inline',
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
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
  // Init le tableau en data
  private _source: LocalDataSource = new LocalDataSource();

  @Output() public create: EventEmitter<SmartTableAdd<any>> = new EventEmitter<SmartTableAdd<any>>();
  @Output() public edit: EventEmitter<SmartTableEdit<any>> = new EventEmitter<SmartTableEdit<any>>();
  @Output() public delete: EventEmitter<SmartTableDelete<any>> = new EventEmitter<SmartTableDelete<any>>();

  constructor() { }

  ngOnInit(): void {
    if (this.columns) {
      this._setting.columns = this.columns;
    }

    if (this.data && this.data.length > 0) {
      this._source.load(this.data).then();
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
}
