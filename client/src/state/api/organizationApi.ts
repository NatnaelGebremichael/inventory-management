import { baseApi } from './baseApi';

export interface Organization {
    id: string,
    name: string,
    userId: string,
    createdAt: string,
    categories: string,
}

export const organizationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createOrganization: build.mutation<Organization, Omit<Organization, 'updatedAt' | 'deletedAt' | 'products' | 'categories'>>({
      query: (newOrg) => ({
        url: "/organizations",
        method: "POST",
        body: newOrg
      }),
      invalidatesTags: ["Organizations"]
    }),
  }),
});

export const { useCreateOrganizationMutation } = organizationApi;