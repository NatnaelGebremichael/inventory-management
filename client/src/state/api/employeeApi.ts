import { baseApi } from './baseApi';

export interface newUser {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'MEMBER';
  createdAt: string;
}

export interface Employee {
  id: string;
  organizationId: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'MEMBER';
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export const employeeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<Employee[], void>({
      query: () => "/users",
      providesTags: ["Users"]
    }),
    createUser: build.mutation<newUser, newUser>({
      query: (newUser) => ({
        url: "/users/create",
        method: "POST",
        body: newUser
      }),
      invalidatesTags: ["Users"]
    }),
    updateUser: build.mutation<Employee, Partial<Employee>>({
      query: (updatedUser) => ({
        url: `/users/${updatedUser.id}`,
        method: "PATCH",
        body: updatedUser
      }),
      invalidatesTags: ["Users"]
    }),
  }),
});

export const { useGetUsersQuery, useCreateUserMutation, useUpdateUserMutation } = employeeApi;