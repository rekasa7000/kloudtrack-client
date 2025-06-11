import { useQuery, queryOptions, UseQueryResult } from "@tanstack/react-query";
import { ORGANIZATION } from "./query-keys";
import { getAllOrganizationService, getOrganizationsService } from "@/api/services/organization-service";
import { OrganizationsWithPaginations, Organization } from "@/types/organizations";

export const getOrganizationQueryOptions = queryOptions({
  queryKey: [ORGANIZATION.ORGANIZATION_LIST],
  queryFn: () => getOrganizationsService(),
  retry: false,
  staleTime: 5 * 60 * 1000,
  refetchInterval: 5000,
});

export const getAllOrganizationQueryOptions = queryOptions({
  queryKey: [ORGANIZATION.ORGANIZATION_LIST],
  queryFn: () => getAllOrganizationService(),
  retry: false,
  staleTime: 5 * 60 * 1000,
  refetchInterval: 5000,
});

export const useGetOrganization = (): UseQueryResult<OrganizationsWithPaginations> => {
  return useQuery(getOrganizationQueryOptions);
};

export const useGetAllOrganization = (): UseQueryResult<Organization[]> => {
  return useQuery(getAllOrganizationQueryOptions);
};
