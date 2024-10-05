import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { timestamps } from "../util/sql";

export const user = sqliteTable("users", {
  ...timestamps,

  id: text("id").primaryKey(),
  name: text("name").notNull(),
});
