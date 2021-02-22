import { PaymentType } from './enumList';

export interface Payment {
  id: number;
  type: PaymentType;
  total: number;
  currentlyPaid: number;
  leftToPay: number;
  createdAt: Date;
  updatedAt: Date;
  orderId: number;
}
