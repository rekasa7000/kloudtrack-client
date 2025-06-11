import { useQuery, queryOptions, UseQueryResult } from "@tanstack/react-query";
import { USERS } from "./query-keys";
import { getUsersByOrganizationId } from "@/api/services/user-service";
import { UsersByOrganization } from "@/types/user";

export const getUsersByOrganizationIdQueryOptions = (organizationId: number) =>
  queryOptions({
    queryKey: [USERS.USERS_BY_ORGANIZATION, organizationId],
    queryFn: () => getUsersByOrganizationId(organizationId),
    retry: false,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5000,
  });

export const useGetUsersByOrganizationId = (organizationId: number): UseQueryResult<UsersByOrganization> => {
  return useQuery(getUsersByOrganizationIdQueryOptions(organizationId));
};
