import { UserDatabase } from "../data/UserDatabase"
import { UserInputDTO } from "../model/UserInputDTO"
import { LoginInputDTO, user, UserDTO, UserRole } from "../model/User"
import { CustomError, InvalidBody, InvalidEmail, InvalidPassword, InvalidRole, UserExist, UserNotFound } from "../error/CustomError"
import { HashManager } from "../services/HashManager"
import { TokenGenerator } from "../services/TokenGenerator"
import { IdGenerator } from "../services/generateId"

const hashManager = new HashManager()
const tokenGenerator = new TokenGenerator()
const userDatabase = new UserDatabase()

export class UserBusiness {

  public createUser = async (input: UserInputDTO) => {
    try {
      const { name, email, password, role } = input

      if (!email || !name || !password || !role) {
        throw new InvalidBody()
      }

      if (!email.includes("@")) {
        throw new InvalidEmail()
      }

      if (password.length <= 6) {
        throw new InvalidPassword()
      }

      const idGenerator = new IdGenerator()
      const id: string = idGenerator.generateId()
      const hashManager = new HashManager()
      const hashPassword: string = await hashManager.generateHash(password)

      if (role.toUpperCase() != UserRole.ADMIN && role.toUpperCase() != UserRole.NORMAL) {
        throw new InvalidRole();
      }

      const user: user = {
        id,
        name,
        email,
        password: hashPassword,
        role
      }

      if (email == user.email) {
        throw new UserExist()
      }

      const userDatabase = new UserDatabase()
      await userDatabase.createUser(user)

      const tokenGenerator = new TokenGenerator()
      const token = tokenGenerator.generateToken({ id, role })
      return token

    } catch (error: any) {
      throw new CustomError(400, error.message)
    }
  }

  public login = async (input: LoginInputDTO): Promise<string> => {
    try {
      const { email, password } = input;

      if (!email || !password) { throw new CustomError(400, 'Preencha os campos "email" e "password"'); }
      if (!email.includes("@")) { throw new InvalidEmail(); }

      const user = await userDatabase.findUser(email);

      if (!user) { throw new UserNotFound(); }

      const compareResult: boolean = await hashManager.compareHash(password, user.password)

      if (!compareResult) { throw new InvalidPassword() }

      const token = tokenGenerator.generateToken({ id: user.id, role: user.role });
      return token;

    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };

  public profileInfo = async ()=> {
    try {
      

    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };
}



