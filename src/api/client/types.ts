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
