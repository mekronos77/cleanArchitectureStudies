import { User } from "../../domain/entities/user.entity";
import type { IUserRepositoryTDO } from "../../domain/repositories/user.repository";
import type { IUseCase } from "../../shared/iusecase.shared";

export interface IUpdateUserDTO {
    id: string;
    email?: string,
    password?: string,
    nickname?: string,
}


export class UpdateUser implements IUseCase<IUpdateUserDTO, void> {
    constructor(private userRepository: IUserRepositoryTDO) {}
    public async execute(props: IUpdateUserDTO) {

        const currentUserData = await this.userRepository.findById(props.id)

        if (!currentUserData) {
             throw new Error("User do not exists anymore.")
        }

        const user = new User(currentUserData.email, currentUserData.password, currentUserData.nickname, currentUserData.id)

        user.update({ nickname: props.nickname, email: props.email })

        await this.userRepository.update(user)

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
