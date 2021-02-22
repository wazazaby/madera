import { Quotation } from './quotation';
import { Client } from './client';

export interface Commercial {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  administratorId?: number;
  quotations: Quotation[];
  clients: Client[];
}
