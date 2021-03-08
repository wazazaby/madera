import { QuotationStatusModel } from '../models/enumList';

export interface QuotationStatus {
  id: number;
  label: string;
  code: QuotationStatusModel;
  createdAt: string;
}
