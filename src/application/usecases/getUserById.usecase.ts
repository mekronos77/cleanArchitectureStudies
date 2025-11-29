import { newUserEntityCaller, User } from "../../domain/entities/user.entity";
import type { IUseCase } from "../../shared/iusecase.shared";
import type { IUserRepositoryTDO } from "../repositories/iuser.repository";

export class GetUserById implements IUseCase<string, User | null> {
  constructor(private userRepository: IUserRepositoryTDO) {}
  async execute(id: string): Promise<User | null> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      return null;
    }

    return newUserEntityCaller({
      email: user.email,
      password: user.password,
      nickname: user.nickname,
      avatar: user.avatar,
      id: user.id
    });
  }
}
