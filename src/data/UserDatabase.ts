import { CustomError } from "../error/CustomError";
import { follow, user } from "../model/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  private static TABLE_NAME = "users_cookenu";

  public createUser = async (user: user) => {
    try {
      UserDatabase.connection.initialize()

      await UserDatabase.connection
        .insert(user)
        .into(UserDatabase.TABLE_NAME);

    } catch (error: any) {
      throw new CustomError(400, error.message)
    } finally {
      console.log("conexão encerrada!");
      UserDatabase.connection.destroy();
    }
  }

  public findUser = async (email: string) => {
    try {
      UserDatabase.connection.initialize()
      const result = await UserDatabase.connection(UserDatabase.TABLE_NAME)
        .select()
        .where({ email });

      return result[0];
    } catch (error: any) {
      throw new CustomError(400, error.message);
    } finally {
      console.log("conexão encerrada!");
      UserDatabase.connection.destroy();
    }
  }

  public profileInfo = async () => {
    try{
     
    }catch(error:any){
      throw new CustomError(400, error.message);

    }
  }

  public followUser = async (input:follow)=>{
    try{
      await UserDatabase.connection()
      .insert(input)
      .into("follow_cookenu")

    }catch(error:any){
      throw new CustomError(400, error.message);
    }

  }
}
