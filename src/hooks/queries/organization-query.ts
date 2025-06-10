import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { ORGANIZATION } from "./query-keys";
import { getOrganizationsService } from "@/api/services/organization-service";
import { OrganizationsWithPaginations } from "@/types/organizations";

export const useGetOrganization = (): UseQueryResult<OrganizationsWithPaginations> => {
  return useQuery({
    queryKey: [ORGANIZATION.ORGANIZATION_LIST],
    queryFn: () => getOrganizationsService(),
    retry: false,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5000,
  });
};
