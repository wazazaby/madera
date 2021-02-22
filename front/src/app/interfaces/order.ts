import { OrderStatus } from './enumList';
import { Payment } from './payment';

export interface Order {
  id: number;
  status: OrderStatus;
  totalPaid: number;
  quotationId: number;
  payments: Payment[];
}
