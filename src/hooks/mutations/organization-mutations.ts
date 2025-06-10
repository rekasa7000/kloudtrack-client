import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ORGANIZATION } from "../queries/query-keys";
import { createOrganizationService } from "@/api/services/organization-service";

export function useCreateOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrganizationService,
    onSuccess: (data) => {
      if (data.id) {
        queryClient.setQueryData([ORGANIZATION.ORGANIZATION_LIST], data);
      }
      toast.success("Organization created successfully!", {
        description: `Welcome! ${data.organizationName}`,
        position: "top-right",
        duration: 5000,
        style: { backgroundColor: "green" },
        closeButton: true,
      });
    },
    onError: (error: any) => {
      toast.error("Organization creation error!", {
        description: error.message,
        position: "top-right",
        duration: 5000,
        style: { backgroundColor: "red" },
        closeButton: true,
      });

      console.log(error);
    },
  });
}
