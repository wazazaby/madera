import { OrderStatusModel } from '../models/enumList';

export interface OrderStatus {
  id: number;
  label: string;
  code: OrderStatusModel;
}
