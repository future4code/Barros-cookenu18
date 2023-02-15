import { CustomError } from "../error/CustomError";
import { follow, user } from "../model/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  private static TABLE_NAME = "users_cookenu";

  public createUser = async (user: user) => {
    try {
      await UserDatabase.connection
        .insert(user)
        .into(UserDatabase.TABLE_NAME);

    } catch (error: any) {
      throw new CustomError(400, error.message)
    }
  }

  public findUser = async (email: string) => {
    try {
      const result = await UserDatabase.connection(UserDatabase.TABLE_NAME)
        .select()
        .where({ email });

      return result[0];
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  }

  public profileInfo = async (idUser:string) => {
    try{
      const result = await UserDatabase.connection(UserDatabase.TABLE_NAME)
        .select("*")
        .where({ id: idUser });

      return result[0];
     
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
