import { baseApi } from './baseApi';
import { Product } from './productApi';

export interface Sale {
  productId: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
}

export interface SaleProduct extends Product {
  quantity: number;
}

export const saleApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createSale: build.mutation<void, Sale[]>({
      query: (sales) => ({
        url: '/sales',
        method: 'POST',
        body: sales,
      }),
      invalidatesTags: ['Products', 'DashboardMetrics'],
    }),
  }),
});

export const { useCreateSaleMutation } = saleApi;