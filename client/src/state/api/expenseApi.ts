import { baseApi } from './baseApi';

export interface ExpenseByCategorySummary {
  id: string;
  categoryName: string;
  amount: string;
  period: string;
}

export const expenseApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getExpensesByCategory: build.query<ExpenseByCategorySummary[], void>({
      query: () => "/expenses",
      providesTags: ["Expenses"],
    }),
  }),
});

export const { useGetExpensesByCategoryQuery } = expenseApi;