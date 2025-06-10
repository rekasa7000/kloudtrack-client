import { useQuery } from "@tanstack/react-query";
import { checkAuthService } from "../../api/services/auth-service";
import { AUTH_KEYS } from "./query-keys";

export const checkAuth = () =>
  useQuery({
    queryKey: [AUTH_KEYS.CHECK_AUTH],
    queryFn: checkAuthService,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
