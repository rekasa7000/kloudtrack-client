export interface Login {
  email: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  userName: string;
  email: string;
  role: string;
  token: string;
}

export interface User {
  id: number;
  userName: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}
