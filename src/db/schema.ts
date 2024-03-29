import {pgTable, serial, text,index} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
export const passwords = pgTable("passwords", {
    id: serial('id').primaryKey(),
    platform: text('platform').notNull(),
    email: text('email').notNull(),
    password: text('password').notNull(),
    userId:text('userId').notNull(),
    createdAt:text('createdAt').default(sql`(CURRENT_TIMESTAMP)`).notNull()
},(table)=>{
    return {userIdIndex: index('passwords_userId_idx').on(table.userId)}
})

export interface PasswordType {
    id: number;
    platform: string;
    email: string;
    password: string;
    userId: string;
    createdAt: string;
}