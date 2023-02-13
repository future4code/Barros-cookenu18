import { Request, Response } from "express";
import { RecipeBusiness } from "../business/RecipeBusiness";
import { RecipeInputDTO } from "../model/RecipeInputDTO";

export class RecipeController {

  public createRecipe = async (req: Request, res: Response) => {
    try {
      const { title, description, creation_date, id_author } = req.body

      const input: RecipeInputDTO = {
        title,
        description,
        creation_date,
        id_author
      }

      const recipeBusiness = new RecipeBusiness();
      await recipeBusiness.createRecipe(input);

      res.status(201).send({ message: "Receira cadastrada com sucesso" });

    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }

}


