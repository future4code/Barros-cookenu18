import { CustomError } from "../error/CustomError";
import { recipe } from "../model/recipe";
import { user } from "../model/User";
import { BaseDatabase } from "./BaseDatabase";

export class RecipeDatabase extends BaseDatabase {
  private static TABLE_NAME = "recipes_cookenu";

  public createRecipe = async (recipe: recipe) => {
    try {
      RecipeDatabase.connection.initialize()

      await RecipeDatabase.connection
        .insert(recipe)
        .into(RecipeDatabase.TABLE_NAME);

    } catch (error: any) {
      throw new CustomError(400, error.message)
    } finally {
      console.log("conexão encerrada!");
      RecipeDatabase.connection.destroy();
    }
  }

  public seeFeed = async (id_user: string) => {
    try {
      const feed = await RecipeDatabase.connection.raw(`
        SELECT title, description, creation_date, id_author 
        FROM recipes_cookenu JOIN follow_cookenu ON id_author = follow_cookenu.id_follow_user
        WHERE id_user = "${id_user}";
    `)
      return feed[0]

    } catch (error: any) {
      throw new CustomError(400, error.message)
    }

  }


}
