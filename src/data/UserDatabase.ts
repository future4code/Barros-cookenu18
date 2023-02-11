import { CustomError } from "../error/CustomError";
import { user } from "../model/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  private static TABLE_NAME = "users_cookenu";

  public createUser = async (user: user) => {
    try {
      UserDatabase.connection.initialize()
      await UserDatabase.connection.insert({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role
      })
        .into(UserDatabase.TABLE_NAME);
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    }finally{
      console.log("conexão encerrada!");
      UserDatabase.connection.destroy();
   }
  }
}
