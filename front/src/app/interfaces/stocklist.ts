import { Stock } from './stock';
import { Provider } from './provider';

export interface Stocklist {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  administratorId?: number;
  stocks: Stock[];
  providers: Provider[];
}
