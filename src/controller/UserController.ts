import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { InfoUser, LoginInputDTO } from "../model/User";
import { UserInputDTO } from "../model/UserInputDTO";
import { TokenGenerator } from "../services/TokenGenerator";

const userBusiness = new UserBusiness()

export class UserController {

  public createUser = async (req: Request, res: Response) => {
    try {
      const { name, email, password, role } = req.body

      const input: UserInputDTO = {
        name,
        email,
        password,
        role
      }

      const userBusiness = new UserBusiness();
      const token = await userBusiness.createUser(input);

      res.status(201).send({ message: "Usuário cadastrado com sucesso", token });

    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }

  public login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body
      const input: LoginInputDTO = {
        email,
        password
      }

      const token = await userBusiness.login(input)

      res.status(200).send({ message: "Usuário logado!", token });

    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }

  public profileInfo = async (req: Request, res: Response) => {
    try{

    } catch(error:any){
      res.status(400).send(error.message);

    } 

  }

}


