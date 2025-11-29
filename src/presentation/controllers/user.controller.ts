import type { NextFunction, Request, Response } from "express";
import type { ICreateUserDTO } from "../../DTOs/createUser.dto";
import { CreateUser } from "../../application/usecases/create.usecase";
import { GetUserById } from "../../application/usecases/getUserById.usecase";
import { UserRepository } from "../../infrastructure/database/drizzle/repositories/user.repository";

export class UserController {
  userRepository = new UserRepository();
  public createAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password, avatar, nickname }: ICreateUserDTO = req.body;

      const createUser = new CreateUser(this.userRepository);

      const getUserById = new GetUserById(this.userRepository);

      const result = await createUser.execute({ email, password, avatar, nickname });

      const user = await getUserById.execute(result.id);

      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

  public async login(req: Request, res: Response, next: NextFunction) {}

  public async deleteAccount(req: Request, res: Response, next: NextFunction) {}

  public async getUser(req: Request, res: Response, next: NextFunction) {}

  public async updateUser(req: Request, res: Response, next: NextFunction) {}
}
