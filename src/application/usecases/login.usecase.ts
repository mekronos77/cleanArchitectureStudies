import { HttpError } from "../../core/errors/httpError.error";
import type { ILoginUser } from "../../DTOs/loginUser.dto";
import { Cryptography } from "../../infrastructure/services/hash.service";
import { jwtService } from "../../infrastructure/services/jwt.service";

import type { IUseCase } from "../../shared/iusecase.shared";
import type { IUserRepositoryTDO } from "../repositories/iuser.repository";

export class LoginUser implements IUseCase<ILoginUser, string> {
  constructor(private userRepository: IUserRepositoryTDO) {}
  async execute(props: ILoginUser): Promise<string> {
    const user = await this.userRepository.findByEmail(props.email);

    if (!user) {
      throw new HttpError(404, "User do not exists.");
    }

    if (!(await Cryptography.compare({ value: props.password, hash: user.password }))) {
      throw new HttpError(401, "incorrect password.");
    }

    const payload = {
      id: user.id
    };

    const token = jwtService.sign({ payload: payload }); // secret already comes in the instance in jwt.service.ts
    return token;
  }
}
