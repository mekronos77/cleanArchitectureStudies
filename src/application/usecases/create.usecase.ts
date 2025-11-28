import { User } from "../../domain/entities/user.entity";
import type { IUserRepository } from "../../domain/repositories/user.repository";

export interface ICreateUserDTO {
    email: string,
    password: string,
    nickname: string,
}

export class CreateUser {
    constructor(private userRepository: IUserRepository) {}
    public async execute(props: ICreateUserDTO) {
       try {
         // props represent unvalidated data. Once a User instance is created and
         // returned, it means all the data has already passed validation.
         const user = new User(props.email, props.password, props.nickname)

         const emailExists = await this.userRepository.findByEmail(user.email)
         // I chose to get it directly from the User instance because the entity
         // is responsible for handling validation.

         if (emailExists) {
             throw new Error("Email already exists, try another one.")
         }

         await this.userRepository.save(user)

       } catch (error) {
        throw error;
       }

    }
}
