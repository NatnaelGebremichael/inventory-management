import { baseApi } from './baseApi';

export interface newEmployees {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'MEMBER';
  createdAt: string;
}

export interface Employees {
  id: string;
  organizationId: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'MEMBER';
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export const EmployeesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getEmployees: build.query<Employees[], void>({
      query: () => "/users",
      providesTags: ["Employees"]
    }),
    createEmployees: build.mutation<Employees, newEmployees>({
      query: (newUser) => ({
        url: "/users/create",
        method: "POST",
        body: newUser
      }),
      invalidatesTags: ["Employees"]
    }),
    updateEmployees: build.mutation<Employees, Partial<Employees>>({
      query: (updatedUser) => ({
        url: `/users/${updatedUser.id}`,
        method: "PATCH",
        body: updatedUser
      }),
      invalidatesTags: ["Employees"]
    }),
  }),
});

export const { useGetEmployeesQuery, useCreateEmployeesMutation, useUpdateEmployeesMutation } = EmployeesApi;