import { CustomError, InvalidBody } from "../error/CustomError"
import { IdGenerator } from "../services/generateId"
import { RecipeInputDTO } from "../model/RecipeInputDTO"
import { recipe } from "../model/recipe"
import { RecipeDatabase } from "../data/RecipeDatabase"
import { TokenGenerator } from "../services/TokenGenerator"

export class RecipeBusiness {

  public createRecipe = async (input: RecipeInputDTO) => {
    try {
      const { title, description, creation_date, id_author } = input

      if (!title || !description || !creation_date) {
        throw new InvalidBody()
      }

      const idGenerator = new IdGenerator()
      const id: string = idGenerator.generateId()

      const recipe: recipe = {
        id,
        title,
        description,
        creation_date,
        id_author
      }

      const recipeDatabase = new RecipeDatabase()
      await recipeDatabase.createRecipe(recipe)

    } catch (error: any) {
      throw new CustomError(400, error.message)
    }
  }

 
}



