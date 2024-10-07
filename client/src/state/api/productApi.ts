import { baseApi } from './baseApi';

export interface Product {
  id: string;
  organizationId: string;
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface NewProduct {
  name: string;
  price: number;
  stockQuantity: number;
  categoryId: string;
  description: string;
  reorderPoint: number;
  organizationId: string;
}

export interface PopularProduct extends Product {
  totalSold: number;
}


export const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<Product[], { organizationId: string; search?: string }>({
      query: ({ organizationId, search }) => ({
        url: "/products",
        params: { organizationId, ...(search ? { search } : {}) }
      }),
      providesTags: ["Products"]
    }),
    createProduct: build.mutation<Product, NewProduct>({
      query: (newProduct) => ({
        url: "/products",
        method: "POST",
        body: newProduct
      }),
      invalidatesTags: ["Products", "DashboardMetrics"]
    }),
  }),
});

export const { useGetProductsQuery, useCreateProductMutation } = productApi;