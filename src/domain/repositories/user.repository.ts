import { eq } from "drizzle-orm";
import { db } from "../../infrastructure/database/drizzle.database";
import { usersTable } from "../../infrastructure/database/schemas/user.schema";
import { User } from "../entities/user.entity";

export interface IUserRepositoryTDO {

    save(props: User): Promise<void>
    findByEmail(email: string): Promise<User | null>
    findById(id: string): Promise<User | null>
    update(user: User): Promise<void>
    delete(id: string): Promise<void>

}

export class UserRepository implements IUserRepositoryTDO {

    async save(props: User): Promise<void> {
        const values: typeof usersTable.$inferInsert = {
            email: props.email,
            password: props.password,
            nickname: props.nickname,
            id: props.id!, // this can be a string or undefined; if it's undefined, the entity generates a new UUID
        }

        await db.insert(usersTable).values(values).execute()
    }

    async findByEmail(email: string): Promise<User | null> {
        const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email))

        if (!user) {
            return null;
        }

        return new User(user.email, user.password, user.nickname, user.id)
    }

    async findById(id: string): Promise<User | null> {
        const [user] = await db.select().from(usersTable).where(eq(usersTable.id, id))

        if (!user) {
            return null;
        }

        return new User(user.email, user.password, user.nickname, user.id)
    }

    async update(user: User): Promise<void> {

      //
      // In this scenario, the User must receive all previous (or current) values
      // from the database record or update func. These values are passed to the User instance
      // through the constructor.
      //
      // After that, the client calls the update function inside the User entity,
      // sending only the new data that should be changed.
      //
      // The code then replaces the values received in the constructor with the
      // values sent to the update function. This means the current properties of
      // the instance become the ones defined in update.
      //
      // In this flow, sending the id is mandatory.
      //
      //

      const values: Omit<typeof usersTable.$inferInsert, 'id' | 'password'> = {
          email: user.email,
          nickname: user.nickname,
      }

      await db.update(usersTable).set(values).where(eq(usersTable.id, user.id!))
    }

    async delete(id: string): Promise<void> {

    }
}
