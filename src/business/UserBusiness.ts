import { UserDatabase } from "../data/UserDatabase"
import { UserInputDTO } from "../model/UserInputDTO"
import { follow, followDTO, LoginInputDTO, user, UserDTO, UserRole } from "../model/User"
import { CustomError, InvalidBody, InvalidEmail, invalidFollow, InvalidPassword, InvalidRole, UserExist, UserNotFound } from "../error/CustomError"
import { HashManager } from "../services/HashManager"
import { TokenGenerator } from "../services/TokenGenerator"
import { IdGenerator } from "../services/generateId"

const hashManager = new HashManager()
const tokenGenerator = new TokenGenerator()
const idGenerator = new IdGenerator()
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
      const userExists = await userDatabase.findUser(email)
      if (userExists) { throw new UserExist() }


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

  public profileInfo = async (token: string) => {
    try {
      const idUser = tokenGenerator.tokenData(token)
      if (!idUser) { throw new InvalidBody() }

      const dadosUser = await userDatabase.profileInfo(idUser.id)
      return dadosUser
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };

  public followUser = async (input: followDTO) => {
    try {
      const { id_user, id_follow_user } = input

      if (!id_follow_user) {
        throw new invalidFollow()
      }

      const idUser = tokenGenerator.tokenData(id_user)
      const id: string = idGenerator.generateId()

      const follow: follow = {
        id: id,
        id_user: idUser.id,
        id_follow_user
      }

      await userDatabase.followUser(follow)

    } catch (error: any) {
      throw new CustomError(400, error.message);

    }
  }
}



