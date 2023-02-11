import { UserDatabase } from "../data/UserDatabase"
import { v4 as generateId } from 'uuid'
import { UserInputDTO } from "../model/UserInputDTO"
import { user, UserRole } from "../model/User"
import { CustomError } from "../error/CustomError"
import { HashManager } from "../services/HashManager"
import { InvalidBody, InvalidEmail, InvalidPassword, InvalidRole } from "../error/UserError"
import { TokenGenerator } from "../services/TokenGenerator"
import { IdGenerator } from "../services/generateId"

export class UserBusiness {

  public createUser = async (input: UserInputDTO) => {
    try {
      const { name, email, password, role } = input

      if (!email || !name || !password || !role) {
        throw new InvalidBody()
      }

      if(!email.includes("@")){
        throw new InvalidEmail()
      }

      if(password.length <= 6){
        throw new InvalidPassword()
      }

      const idGenerator = new IdGenerator()
      const id: string = idGenerator.generateId()
      const hashManager = new HashManager()
      const hashPassword: string = await hashManager.hash(password)

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

      const userDatabase = new UserDatabase()
      await userDatabase.createUser(user)

      const tokenGenerator = new TokenGenerator()
      const token = tokenGenerator.generateToken({ id, role })
      return token

    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    }
  }
}

/*

*/