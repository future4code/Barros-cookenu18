import { CustomError, InvalidBody } from "../error/CustomError"
import { IdGenerator } from "../services/generateId"
import { RecipeInputDTO } from "../model/RecipeInputDTO"
import { recipe } from "../model/recipe"
import { RecipeDatabase } from "../data/RecipeDatabase"
import { TokenGenerator } from "../services/TokenGenerator"

const recipeDatabase = new RecipeDatabase()
const idGenerator = new IdGenerator()
const tokenGenerator = new TokenGenerator()

export class RecipeBusiness {

  public createRecipe = async (input: RecipeInputDTO) => {
    try {
      const { title, description, creation_date, id_author, token } = input

      if (!title || !description || !creation_date) {
        throw new InvalidBody()
      }

      const id: string = idGenerator.generateId()
      const idAuthor = tokenGenerator.tokenData(token)

      const recipe: recipe = {
        id,
        title,
        description,
        creation_date,
        id_author:idAuthor.id
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



