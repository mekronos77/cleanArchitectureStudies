import { HttpError } from "../../core/errors/httpError.error";
import { newUserEntityCaller } from "../../domain/entities/user.entity";
import type { ICreateUserDTO } from "../../DTOs/createUser.dto";
import { Cryptography } from "../../infrastructure/services/hash.service";
import type { IUseCase } from "../../shared/iusecase.shared";
import type { IUserRepositoryTDO } from "../repositories/iuser.repository";

export class CreateUser implements IUseCase<ICreateUserDTO, { id: string }> {
  constructor(private userRepository: IUserRepositoryTDO) {}
  public async execute(props: ICreateUserDTO) {
    // props represent unvalidated data. Once a User instance is created and
    // returned, it means all the data has already passed validation.
    const passwordHashed = await Cryptography.hash({ text: props.password });

    const user = newUserEntityCaller({
      email: props.email,
      password: passwordHashed,
      avatar: props.avatar,
      nickname: props.nickname
    });

    const emailExists = await this.userRepository.findByEmail(user.email);
    // I chose to get it directly from the User instance because the entity
    // is responsible for handling validation.

    if (emailExists) {
      throw new HttpError(401, "Email already exists, try another one.");
    }

    await this.userRepository.save(user);

    return { id: user.id! };
  }
}
