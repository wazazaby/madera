import { PaymentTypeModel } from '../models/enumList';

export interface PaymentStatus {
  id: number;
  label: string;
  code: PaymentTypeModel;
}
