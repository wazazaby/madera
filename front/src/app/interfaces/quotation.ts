import { QuotationStatus } from './enumList';
import { Order } from './order';
import { Module } from './module';

export interface Quotation {
  id: number;
  label: string;
  shortDescription?: string;
  status: QuotationStatus;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  commercialId: number;
  clientId: number;
  orders: Order[];
  modules: Module[];
}
