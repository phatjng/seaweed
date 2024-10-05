import { sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";
import { user } from "../user/user.sql";
import { timestamps } from "../util/sql";

export const account = sqliteTable(
  "accounts",
  {
    ...timestamps,

    id: text("id").primaryKey(),
    email: text("email").notNull(),
    hashedPassword: text("hashed_password").notNull(),

    userID: text("user_id")
      .references(() => user.id)
      .notNull(),
  },
  (t) => {
    return {
      emailIDX: uniqueIndex("email_idx").on(t.email),
    };
  },
);
