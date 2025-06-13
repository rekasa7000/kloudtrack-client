import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { USERS } from "../queries/query-keys";
import { createUser } from "@/api/services/user-service";

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      if (data.id) {
        queryClient.setQueryData([USERS.USERS_LIST], data);
      }
      toast.success("User created successfully!", {
        description: `${data.firstName} ${data.lastName} born!`,
        position: "top-right",
        duration: 5000,
        style: { backgroundColor: "green" },
        closeButton: true,
      });
    },
    onError: (error: any) => {
      toast.error("User creation error!", {
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
