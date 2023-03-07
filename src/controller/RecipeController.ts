import { Request, Response } from "express";
import { RecipeBusiness } from "../business/RecipeBusiness";
import { RecipeInputDTO } from "../model/RecipeInputDTO";
import { TokenGenerator } from "../services/TokenGenerator";

const recipeBusiness = new RecipeBusiness();
const tokenGenerator = new TokenGenerator()

export class RecipeController {

  public createRecipe = async (req: Request, res: Response) => {
    try {
      const dados= { 
        title: req.body.title, 
        description: req.body.description, 
        creation_date: req.body.creation_date, 
        id_author: req.body.id_author,
        token: req.headers.authorization as string
      }

      console.log(dados.token)

      const input: RecipeInputDTO = {
        title: dados.title,
        description: dados.description,
        creation_date: dados.creation_date,
        id_author: dados.id_author,
        token: dados.token
      }
      
      await recipeBusiness.createRecipe(input);

      res.status(201).send({ message: "Receira cadastrada com sucesso" });

    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }

  public seeFeed = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization 

      const feed = await recipeBusiness.seeFeed(token)
      
      res.status(201).send({ feed });

    } catch (error: any) {
      res.status(400).send(error.message);

    }
  }

}


