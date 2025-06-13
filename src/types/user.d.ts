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

export interface UserCreateInput {
  userName: string;
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  role: Role;
  password: string;
  phone?: string | null;
  profilePicture?: string | null;
  createdByUserId?: number | null;
  confirmPassword?: string;
  organizationId?: string;
}

export interface UserCreateResponse {
  id: number;
  userName: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  role: $Enums.Role;
  password: string;
  phone: string | null;
  profilePicture: string | null;
  createdByUserId: number | null;
  passwordChangedAt: Date | null;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface UserUpdateInput {
  id?: number;
  userName?: string;
  firstName?: string | null;
  lastName?: string | null;
  email?: string;
  role?: Role;
  password?: string;
  phone?: string | null;
  profilePicture?: string | null;
  createdByUserId?: number | null;
  currentPassword?: string;
  confirmPassword?: string;
}

export interface ChangePasswordInput {
  userId: number;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ResetPasswordInput {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface AddUserToOrganizationInput {
  userId: number;
  organizationId: number;
  isAdmin?: boolean;
}

export interface AddUsersToOrganizationInput {
  userIds: number[];
  organizationId: number;
  isAdmin?: boolean;
}
