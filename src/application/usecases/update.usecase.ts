import { HttpError } from "../../core/errors/httpError.error";
import { newUserEntityCaller } from "../../domain/entities/user.entity";
import type { IUpdateUserDTO } from "../../DTOs/updateUser.dto";
import type { IUseCase } from "../../shared/iusecase.shared";
import type { IUserRepositoryTDO } from "../repositories/iuser.repository";

export class UpdateUser implements IUseCase<IUpdateUserDTO, void> {
  constructor(private userRepository: IUserRepositoryTDO) {}
  public async execute(props: IUpdateUserDTO) {
    const currentUserData = await this.userRepository.findById(props.id);

    if (!currentUserData) {
      throw new HttpError(404, "User do not exists anymore.");
    }

    const user = newUserEntityCaller({
      email: currentUserData.email,
      password: currentUserData.password,
      nickname: currentUserData.nickname,
      avatar: currentUserData.avatar,
      id: currentUserData.id
    });

    user.update({ nickname: props.nickname, email: props.email, avatar: props.avatar });

    await this.userRepository.update(user);

    // The data sent by the user is optional, so the fields received by the update
    // function are also optional, except for the id.
    //
    // The id is not passed to the update function. It is only used in the
    // constructor and in the use case to load the user's current data from
    // the database.
    //
    // This creates an entity instance already filled with the existing values.
    // After that, the update function is called only to replace the fields the
    // user actually wants to change.
    //
    // What does this mean?
    // It means that layers like repositories or use cases will never receive a
    // User with empty or undefined properties. Only the fields that were really
    // updated are changed. All other fields keep the original values stored
    // in the database.
  }
}
