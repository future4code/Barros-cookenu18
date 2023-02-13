export type user = {
  id: string,
  name: string,
  email: string,
  password: string,
  role: UserRole
}

export enum UserRole {
  ADMIN = "ADMIN",
  NORMAL = "NORMAL"
}

export interface AuthenticationData {
  id: string;
  role: string
}

export interface LoginInputDTO {
  email: string;
  password: string;
}
