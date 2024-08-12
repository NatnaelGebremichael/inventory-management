import { Product } from '@/state/api';

export interface SaleProduct extends Product {
  quantity: number;
}

export interface Sale {
  productId: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
}