import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { UserInputDTO } from "../model/UserInputDTO";

export class UserController {
  public createUser = async(req: Request, res: Response)=> {
    try {
      const input: UserInputDTO={
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
      }

      const userBusiness = new UserBusiness();
      const token = await userBusiness.createUser(input);

      res.status(201).send({ message: "Usuário cadastrado com sucesso", token });

    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }
}
