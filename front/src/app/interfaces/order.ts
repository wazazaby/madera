import { OrderStatusModel } from '../models/enumList';
import { Payment } from './payment';

export interface Order {
  id: number;
  status: OrderStatusModel;
  totalPaid: number;
  quotationId: number;
  payments: Payment[];
}
