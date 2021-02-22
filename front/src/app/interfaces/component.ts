import { UsageUnit } from './enumList';
import { Module } from './module';

export interface Component {
  id: number;
  label: string;
  reference: string;
  shortDescription: string;
  description: string;
  unit: UsageUnit;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  providerId?: number;
  modules: Module[];
}
