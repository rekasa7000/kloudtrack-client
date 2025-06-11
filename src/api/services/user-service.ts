import { UsersByOrganization } from "@/types/user";
import axiosInstance from "../client/axiosInstance";

export const getUsersByOrganizationId = async (organizationId: number): Promise<UsersByOrganization> => {
  const response = await axiosInstance.get(`user/organization/${organizationId}`);
  return response.data;
};
