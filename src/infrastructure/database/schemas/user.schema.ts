import { mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const usersTable = mysqlTable('users', {
    id: varchar({ length: 255 }).primaryKey().unique().notNull(),
    email: varchar({ length: 255 }).unique().notNull(),
    password: varchar({ length: 255 }).notNull(),
    nickname: varchar({ length: 255 }).notNull(),
})
