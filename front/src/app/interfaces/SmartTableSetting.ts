import { LocalDataSource } from 'ng2-smart-table';

export interface SmartTableSetting {
  add: {
    addButtonContent: string;
    createButtonContent: string;
    cancelButtonContent: string;
  };
  edit: {
    editButtonContent: string;
    saveButtonContent: string;
    cancelButtonContent: string;
  };
  delete: {
    deleteButtonContent: string;
    confirmDelete: boolean;
  };
  columns: any;
}

export interface SmartSelectConfig {
  value: string | number;
  title: string;
}

export interface SmartTableAdd<T> {
  confirm: any;
  newData: T | any;
  source: LocalDataSource;
}
export interface SmartTableEdit<T> {
  confirm: any;
  data: T | any;
  newData: T | any;
  source: LocalDataSource;
}
export interface SmartTableDelete<T> {
  confirm: any;
  data: T | any;
  source: LocalDataSource;
}
