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


}
