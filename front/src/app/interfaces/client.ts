import { Quotation } from './quotation';

export interface Client {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password?: string;
  createdAt: string;
  updatedAt: string;
  roleId: number;
  client: {
    id: number;
    city: string;
    postalCode: number;
    adressLine1: string;
    adressLine2: string;
    userId: number;
    commercialId: number;
    quotation?: Quotation[];
  };
}

export interface SoftClient {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password?: string;
  createdAt: string;
  updatedAt: string;
  roleId: number;
  city: string;
  postalCode: number;
  adressLine1: string;
  adressLine2: string;
  userId: number;
  commercialId: number;
  quotation?: Quotation[];

}
