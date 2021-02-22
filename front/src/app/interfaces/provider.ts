import { Stocklist } from './stocklist';
import { Component } from './component';

export interface Provider {
  id: number;
  name: string;
  reference: string;
  logoUrl: string;
  createdAt: Date;
  updatedAt: Date;
  stockists?: Stocklist[];
  components?: Component[];
}
