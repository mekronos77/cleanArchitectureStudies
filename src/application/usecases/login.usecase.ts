import type { ILoginUser } from "../../DTOs/loginUser.dto";
import { Cryptography } from "../../infrastructure/services/hash.service";
import { JwtService } from "../../infrastructure/services/jwt.service";
import type { IUseCase } from "../../shared/iusecase.shared";
import type { IUserRepositoryTDO } from "../repositories/iuser.repository";

export class LoginUser implements IUseCase<ILoginUser, string> {
    constructor(private userRepository: IUserRepositoryTDO) {}
    async execute(props: ILoginUser): Promise<string> {

        const user = await this.userRepository.findByEmail(props.email)

        if(!user) {
            throw new Error("User do not exists.")
        }

        if (!await Cryptography.compare({ value: props.password, hash: user.password})) {
            throw new Error("incorrect password.")
        }

        const payload = {
            id: user.id
        }

        const jwt = new JwtService(process.env.JWT_SECRET!)

        const token = jwt.sign({ payload: payload })

        return token

    }
}