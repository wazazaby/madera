export interface Module {
  id: number;
  label: string;
  reference: string;
  shortDescription?: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  count?: number;
  components?: any[];
}
