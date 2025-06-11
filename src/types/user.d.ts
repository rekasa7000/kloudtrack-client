export interface UserDetails {
  profilePicture: string | null;
  id: number;
  userName: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  role: $Enums.Role;
  phone: string | null;
  createdByUserId: number | null;
  passwordChangedAt: Date | null;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface UsersByOrganization {
  users: UserDetails[];
  results: number;
  pagination: Pagination;
}
