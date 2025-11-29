import type { IUpdateUserDTO } from "../../DTOs/updateUser.dto";
import type { IUserDTO } from "../../DTOs/user.dto";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
export class User implements IUserDTO {
  constructor(
    public email: string,
    public password: string,
    public nickname: string,
    public avatar: string,
    public id?: string
  ) {
    if (id === undefined) {
      this.id = crypto.randomUUID();
    }
  }

  public update(props: Omit<IUpdateUserDTO, "id">) {
    const allowed = Object.keys(props) as (keyof typeof props)[];
    allowed.forEach(key => {
      const value = props[key];
      if (value !== undefined) {
        (this as any)[key] = value;
      }
    });
  }
}

export function newUserEntityCaller(props: {
  email: string;
  password: string;
  nickname: string;
  avatar: string;
  id?: string;
}) {
  return new User(props.email, props.password, props.nickname, props.avatar, props.id);
}
