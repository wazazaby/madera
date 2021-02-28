import { PaymentTypeModel } from '../models/enumList';

export interface Payment {
  id: number;
  type: PaymentTypeModel;
  total: number;
  currentlyPaid: number;
  leftToPay: number;
  createdAt: Date;
  updatedAt: Date;
  orderId: number;
}
