import { Component } from './component';
import { Quotation } from './quotation';

export interface Module {
  id: number;
  label: string;
  reference: string;
  shortDescription?: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  components: Component[];
  quotations: Quotation[];
}
