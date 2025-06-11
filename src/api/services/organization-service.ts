import { CreateOrganizationResponse, Organization, OrganizationsWithPaginations } from "@/types/organizations";
import axiosInstance from "../client/axiosInstance";

export const createOrganizationService = async (user: FormData): Promise<CreateOrganizationResponse> => {
  const response = await axiosInstance.post("organization/", user);
  return response.data;
};

export const getOrganizationsService = async (): Promise<OrganizationsWithPaginations> => {
  const response = await axiosInstance.get("organization/");
  return response.data;
};

export const getAllOrganizationService = async (): Promise<Organization[]> => {
  const response = await axiosInstance.get("organization/all");
  return response.data;
};
