import { UserRole } from "./User";

export interface UserInputDTO{
    name: string,
    email: string,
    password: string,
    role: UserRole
}