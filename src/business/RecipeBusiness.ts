import { CustomError, InvalidBody } from "../error/CustomError"
import { IdGenerator } from "../services/generateId"
import { RecipeInputDTO } from "../model/RecipeInputDTO"
import { recipe } from "../model/recipe"
import { RecipeDatabase } from "../data/RecipeDatabase"

const recipeDatabase = new RecipeDatabase()

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

      await recipeDatabase.createRecipe(recipe)

    } catch (error: any) {
      throw new CustomError(400, error.message)
    }
  }

  public seeFeed = async (id_user:string) => {
    try{
      if (!id_user){
        throw new InvalidBody()
      }

      return await recipeDatabase.seeFeed(id_user)
      
    }catch(error:any){
      throw new CustomError(400, error.message)

    }
  }


}



