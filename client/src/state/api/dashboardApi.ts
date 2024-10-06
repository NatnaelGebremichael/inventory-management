import { baseApi } from './baseApi';
import { PopularProduct } from './productApi';
import { ExpenseByCategorySummary } from './expenseApi';

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

export interface DashboardMetrics {
  popularProducts: PopularProduct[];
  salesSummary: SalesSummary[];
  purchaseSummary: PurchaseSummary[];
  expenseSummary: ExpenseSummary[];
  expenseByCategorySummary: ExpenseByCategorySummary[];
}

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getDashboardMetrics: build.query<DashboardMetrics, void>({
      query: () => "/dashboard",
      providesTags: ["DashboardMetrics"]
    }),
  }),
});

export const { useGetDashboardMetricsQuery } = dashboardApi;