export type user = {
  id:string,
  name:string,
  email:string,
  password:string,
  role: string
}

export enum UserRole{
  ADMIN="ADMIN",
  NORMAL="NORMAL"
}

export interface AuthenticationData {
  id: string;
  role:string
}
