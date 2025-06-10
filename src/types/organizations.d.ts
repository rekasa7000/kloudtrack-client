export interface OrganizationDisplayPicture {
  name: string;
  content: string;
  size: number;
  type: string;
}

export interface CreateOrganizationInput {
  name: string;
  description: string;
  displayPicture: File | null;
}

export interface CreateOrganizationResponse {
  id: number;
  organizationName: string;
  description: string;
  displayPicture: string;
  createdAt: Date;
}

export interface PaginationResponse {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  limit: number;
}
export interface Organizations {
  id: number;
  organizationName: string;
  description: string | null;
  displayPicture: string | null;
  createdAt: Date;
  updatedAt: Date | null;
}
[];

export interface OrganizationsWithPaginations {
  data: Organizations;
  pagination: PaginationResponse;
}
