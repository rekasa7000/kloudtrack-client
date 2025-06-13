import { UserCreateInput, UserCreateResponse, UsersByOrganization } from "@/types/user";
import axiosInstance from "../client/axiosInstance";

export const createUser = async (user: UserCreateInput): Promise<UserCreateResponse> => {
  const response = await axiosInstance.post("user/", user);
  return response.data;
};

export const getUsersByOrganizationId = async (organizationId: number): Promise<UsersByOrganization> => {
  const response = await axiosInstance.get(`user/organization/${organizationId}`);
  return response.data;
};
