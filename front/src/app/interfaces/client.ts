import { Quotation } from './quotation';

export interface Client {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  postalCode: number;
  adressLine1: string;
  adressLine2?: string;
  email: string;
  phoneNumber: string;
  password: string;
  quotation: Quotation[];
  createdAt: Date;
  updatedAt: Date;
}
