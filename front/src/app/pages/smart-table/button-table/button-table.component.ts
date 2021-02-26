import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'ngx-button-table',
  template: `
    <button class="btn btn-outline-info" (click)="onClick()">{{ renderValue }}</button>
  `,
})
export class ButtonTableComponent implements ViewCell {

  public renderValue = 'Réinitialiser';

  @Input() value: string | number;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  onClick() {
    this.save.emit(this.rowData);
  }

}


