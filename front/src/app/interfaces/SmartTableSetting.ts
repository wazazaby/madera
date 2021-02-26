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
