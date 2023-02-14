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

export interface InfoUser{
  id: string,
  token: string
}

export interface UserDTO{
  id: string,
  name:string,
  email:string
}

export interface followDTO{
  id_user: string,
  id_follow_user:string
}

export interface follow{
  id:string
  id_user: string,
  id_follow_user:string
}