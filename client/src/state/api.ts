import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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

export interface PopularProduct extends Product {
  totalSold: number;
}

export interface NewProduct {
  organizationId: string;
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
}
export interface SaleProduct extends Product {
  quantity: number;
}

export interface Sale {
  // id: string;
  productId: string;
  // userId: string;
  // timestamp: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
}

export interface SalesSummary {
  id: string;
  period: string;
  totalSales: number;
  totalQuantity: number;
  averageOrderSize: number;
  sourceDataHash: string;
  createdAt: string;
  updatedAt: string;
}

export interface PurchaseSummary {
  id: string;
  period: string;
  totalPurchases: number;
  totalQuantity: number;
  averageOrderValue: number;
  sourceDataHash: string;
}

export interface ExpenseSummary {
  id: string;
  period: string;
  totalExpenses: number;
  sourceDataHash: string;
}

export interface ExpenseByCategorySummary {
  id: string;
  categoryName: string;
  amount: string;
  period: string;
}

export interface DashboardMetrics {
  popularProducts: PopularProduct[];
  salesSummary: SalesSummary[];
  purchaseSummary: PurchaseSummary[];
  expenseSummary: ExpenseSummary[];
  expenseByCategorySummary: ExpenseByCategorySummary[];
}

export interface User {
  id: string;
  organizationId: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'MEMBER';
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  reducerPath: "api",
  tagTypes: ["DashboardMetrics", "Products", "Users", "Expenses"],
  endpoints: (build) => ({
    getDashboardMetrics: build.query<DashboardMetrics, void>({
      query: () => "/dashboard",
      providesTags: ["DashboardMetrics"]
    }),
    getProducts: build.query<Product[], string | void>({
      query: (search) => ({
        url: "/products",
        params: search ? { search } : {}
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
    createSale: build.mutation<void, Sale[]>({
      query: (sales) => ({
        url: '/sales',
        method: 'POST',
        body: sales,
      }),
      invalidatesTags: ['Products', 'DashboardMetrics'],
    }),
    getUsers: build.query<User[], void>({
      query: () => "/users",
      providesTags: ["Users"]
    }),
    getExpensesByCategory: build.query<ExpenseByCategorySummary[], void>({
      query: () => "/expenses",
      providesTags: ["Expenses"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetProductsQuery,
  useCreateSaleMutation,
  useCreateProductMutation,
  useGetDashboardMetricsQuery,
  useGetExpensesByCategoryQuery,
} = api;