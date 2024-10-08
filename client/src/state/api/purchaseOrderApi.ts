import { baseApi } from './baseApi';

export interface PurchaseOrder {
  id: string;
  supplierID: string;
  employeeID: string;
  orderDate: Date;
  totalAmount: number;
  status: string;
  expectedDeliveryDate: Date;
}

export interface NewPurchaseOrder {
    id: string;
    supplierID: string;
    employeeID: string;
    orderDate: Date;
    totalAmount: number;
    status: string;
    expectedDeliveryDate: Date;
}



export const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPurchaseOrder: build.query<PurchaseOrder[], { search?: string }>({
      query: ({ search }) => ({
        url: "/purchaseOrder",
        params: (search ? { search } : {}) 
      }),
      providesTags: ["PurchaseOrder"]
    }),
    createPurchaseOrder: build.mutation<PurchaseOrder, NewPurchaseOrder>({
      query: (newProduct) => ({
        url: "/PurchaseOrder",
        method: "POST",
        body: newProduct
      }),
      invalidatesTags: ["PurchaseOrder", "DashboardMetrics"]
    }),
  }),
});

export const { useCreatePurchaseOrderMutation, useGetPurchaseOrderQuery } = productApi;