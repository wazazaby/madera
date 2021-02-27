import { Stocklist } from './stocklist';
import { Components } from './components';

export interface Provider {
  id: number;
  name: string;
  reference: string;
  logoUrl: string;
  createdAt: Date;
  updatedAt: Date;
  stockists?: Stocklist[];
  components?: Components[];
}
